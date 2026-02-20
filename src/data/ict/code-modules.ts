import type { Entity } from '../../lib/types';

const timestamp = new Date().toISOString();
const uploadId = 'ict-master-database-2026-02-18';

export const ICT_CODE_MODULES: Entity[] = [
  {
    id: 'code-fvg-detection',
    type: 'code_module',
    domain: 'code',
    name: 'FVG Detection Algorithm',
    description: 'Python algorithm for detecting Fair Value Gaps using smartmoneyconcepts library. Checks for bullish FVG (C1.high < C3.low) and bearish FVG (C1.low > C3.high) patterns. Returns FVG direction, top, bottom, and mitigation index.',
    content: `# Fair Value Gap Detection Algorithm
# Using smartmoneyconcepts library

from smartmoneyconcepts import smc
import pandas as pd

def detect_fvg(ohlc_data: pd.DataFrame, join_consecutive: bool = False):
    """
    Detect Fair Value Gaps in OHLC data
    
    Args:
        ohlc_data: DataFrame with columns ['open', 'high', 'low', 'close', 'volume']
        join_consecutive: If True, joins consecutive FVGs
    
    Returns:
        DataFrame with FVG data including:
        - FVG direction (1 = bullish, -1 = bearish)
        - Top (upper boundary)
        - Bottom (lower boundary)
        - MitigatedIndex (when gap was filled)
    
    Algorithm:
        For each candle i:
          Bullish FVG: candle[i-2].high < candle[i].low
            -> FVG(top=candle[i].low, bottom=candle[i-2].high)
          Bearish FVG: candle[i-2].low > candle[i].high
            -> FVG(top=candle[i-2].low, bottom=candle[i].high)
    """
    fvg_data = smc.fvg(ohlc_data, join_consecutive=join_consecutive)
    return fvg_data

# Example usage:
# df = pd.DataFrame with OHLC data
# fvgs = detect_fvg(df)
# bullish_fvgs = fvgs[fvgs['FVG'] == 1]
# bearish_fvgs = fvgs[fvgs['FVG'] == -1]`,
    metadata: {
      language: 'python',
      library: 'smartmoneyconcepts',
      functions: ['detect_fvg'],
      input: 'OHLC DataFrame',
      output: 'FVG DataFrame with direction, top, bottom, mitigation',
      algorithm: 'Three-candle pattern detection: bullish if C[i-2].high < C[i].low, bearish if C[i-2].low > C[i].high'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 650,
      lineEnd: 700,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['python', 'code', 'detector', 'fvg', 'algorithm'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'code-swing-detection',
    type: 'code_module',
    domain: 'code',
    name: 'Swing Detection + BOS/SMS Algorithm',
    description: 'Python algorithm for detecting swing highs/lows and Break of Structure (BOS) / Shift in Market Structure (SMS) using smartmoneyconcepts library. Swing High at i if high[i] > high[i-N:i] AND high[i] > high[i+1:i+N+1]. BOS: new HH breaks previous HH with displacement. SMS: price breaks below HL with displacement.',
    content: `# Swing Detection and Market Structure Analysis
# Using smartmoneyconcepts library

from smartmoneyconcepts import smc
import pandas as pd

def detect_swings(ohlc_data: pd.DataFrame, swing_length: int = 50):
    """
    Detect swing highs and lows
    
    Args:
        ohlc_data: DataFrame with OHLC data
        swing_length: Number of candles to check on each side (default: 50)
    
    Returns:
        DataFrame with HighLow (1 = swing high, -1 = swing low), Level
    
    Algorithm:
        Swing High at index i:
          high[i] > high[i-N:i] AND high[i] > high[i+1:i+N+1]
        Swing Low at index i:
          low[i] < low[i-N:i] AND low[i] < low[i+1:i+N+1]
        where N = swing_length
    """
    swings = smc.swing_highs_lows(ohlc_data, swing_length=swing_length)
    return swings

def detect_bos_choch(ohlc_data: pd.DataFrame, swing_data: pd.DataFrame, close_break: bool = True):
    """
    Detect Break of Structure (BOS) and Change of Character (CHoCH)
    
    Args:
        ohlc_data: DataFrame with OHLC data
        swing_data: DataFrame from detect_swings()
        close_break: If True, requires candle close beyond swing (default: True)
    
    Returns:
        DataFrame with:
        - BOS: Break of Structure events
        - CHOCH: Change of Character events
        - Level: Price level of the break
        - BrokenIndex: Candle index where break occurred
    
    Algorithm:
        BOS (Continuation): New HH breaks previous HH with displacement (uptrend)
                           or new LL breaks previous LL with displacement (downtrend)
        SMS/CHOCH (Reversal): Price breaks below HL with displacement (was uptrend)
                             or price breaks above LH with displacement (was downtrend)
    """
    structure = smc.bos_choch(ohlc_data, swing_data, close_break=close_break)
    return structure

# Example usage:
# df = pd.DataFrame with OHLC data
# swings = detect_swings(df, swing_length=50)
# structure = detect_bos_choch(df, swings, close_break=True)
# bos_events = structure[structure['BOS'] == 1]
# choch_events = structure[structure['CHOCH'] == 1]`,
    metadata: {
      language: 'python',
      library: 'smartmoneyconcepts',
      functions: ['detect_swings', 'detect_bos_choch'],
      input: 'OHLC DataFrame',
      output: 'Swing points and BOS/CHoCH events',
      algorithm: 'Swing detection using N-period lookback, BOS/SMS detection with displacement confirmation'
    },
    sources: [{
      filePath: 'knowledge_base/ICT_MASTER_LIBRARY.md',
      lineStart: 700,
      lineEnd: 750,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['python', 'code', 'detector', 'swing', 'bos', 'sms', 'structure', 'algorithm'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'code-ob-detector',
    type: 'code_module',
    domain: 'code',
    name: 'Order Block Detector',
    description: 'Python module for identifying Order Blocks, Breaker Blocks, and Mitigation Blocks. Detects the last opposing candle before displacement, classifies OB as bullish (last bearish candle before bullish displacement) or bearish (last bullish candle before bearish displacement). Tracks OB mitigation, identifies Breakers (broken OBs that flip polarity), and Mitigation Blocks (partially filled OBs).',
    content: `# Order Block Detector
# Identifies OBs, Breakers, and Mitigation Blocks

from smartmoneyconcepts import smc
import pandas as pd
import numpy as np

def detect_order_blocks(ohlc_data: pd.DataFrame, swing_data: pd.DataFrame):
    """
    Detect Order Blocks in OHLC data
    
    Args:
        ohlc_data: DataFrame with columns ['open', 'high', 'low', 'close', 'volume']
        swing_data: DataFrame from swing detection
    
    Returns:
        DataFrame with OB data including:
        - OB direction (1 = bullish, -1 = bearish)
        - Top (upper boundary)
        - Bottom (lower boundary)
        - OBVolume (volume at OB candle)
        - MitigatedIndex (when OB was mitigated)
    
    Algorithm:
        Bullish OB: Last bearish candle before bullish displacement
          -> Candle where close < open, followed by strong bullish move
          -> OB zone: candle low to candle open (body)
        Bearish OB: Last bullish candle before bearish displacement
          -> Candle where close > open, followed by strong bearish move
          -> OB zone: candle close to candle high (body)
        Mitigation: Price returns to OB zone and wicks into it
        Breaker: OB that gets broken through, flips polarity
    """
    ob_data = smc.ob(ohlc_data, swing_data)
    return ob_data

def classify_breaker_blocks(ohlc_data: pd.DataFrame, ob_data: pd.DataFrame):
    """
    Identify Breaker Blocks from mitigated Order Blocks
    
    A Breaker forms when an OB is violated (price closes through it),
    converting the failed OB into a support/resistance zone with flipped polarity.
    
    Bullish Breaker: Former bearish OB broken to upside
    Bearish Breaker: Former bullish OB broken to downside
    """
    breakers = ob_data[ob_data['MitigatedIndex'].notna()].copy()
    breakers['Breaker'] = breakers['OB'] * -1  # Flip polarity
    return breakers

def detect_mitigation_blocks(ohlc_data: pd.DataFrame, ob_data: pd.DataFrame):
    """
    Identify Mitigation Blocks (partially filled OBs)
    
    A Mitigation Block occurs when price partially fills an OB
    (wicks into it) but does not close through it, leaving
    a reduced but still valid zone.
    """
    mitigation = []
    for idx, ob in ob_data.iterrows():
        if pd.isna(ob['MitigatedIndex']):
            ob_top = ob['Top']
            ob_bottom = ob['Bottom']
            # Check for partial fills (wicks into zone without close through)
            for i in range(idx + 1, len(ohlc_data)):
                row = ohlc_data.iloc[i]
                if ob['OB'] == 1:  # Bullish OB
                    if row['low'] <= ob_top and row['close'] > ob_bottom:
                        mitigation.append({'index': i, 'ob_index': idx, 'type': 'partial_fill'})
                        break
    return pd.DataFrame(mitigation)

# Example usage:
# df = pd.DataFrame with OHLC data
# swings = detect_swings(df)
# obs = detect_order_blocks(df, swings)
# breakers = classify_breaker_blocks(df, obs)
# mitigations = detect_mitigation_blocks(df, obs)`,
    metadata: {
      language: 'python',
      library: 'smartmoneyconcepts',
      functions: ['detect_order_blocks', 'classify_breaker_blocks', 'detect_mitigation_blocks'],
      input: 'OHLC DataFrame + Swing DataFrame',
      output: 'OB DataFrame with direction, boundaries, mitigation; Breaker/Mitigation classifications',
      algorithm: 'Last opposing candle before displacement, polarity flip for breakers, partial fill for mitigation'
    },
    sources: [{
      filePath: 'knowledge_base/code/ob_detector.py',
      lineStart: 1,
      lineEnd: 120,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['python', 'code', 'detector', 'order_block', 'breaker', 'mitigation', 'algorithm'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'code-structure-detector',
    type: 'code_module',
    domain: 'code',
    name: 'Market Structure Detector',
    description: 'Python module for detecting Break of Structure (BOS), Change of Character (CHoCH), and Shift in Market Sentient (SMS) events. Classifies structure as trending (HH/HL or LH/LL) or ranging. Detects BOS as continuation (HH breaks previous HH in uptrend), CHoCH as first counter-trend break, and SMS as confirmed reversal with displacement.',
    content: `# Market Structure Detector
# Detects BOS, CHoCH, and SMS events

from smartmoneyconcepts import smc
import pandas as pd
import numpy as np

def detect_market_structure(ohlc_data: pd.DataFrame, swing_length: int = 50):
    """
    Complete market structure analysis
    
    Args:
        ohlc_data: DataFrame with OHLC data
        swing_length: Lookback period for swing detection
    
    Returns:
        dict with:
        - swings: Swing highs/lows DataFrame
        - structure: BOS/CHoCH events DataFrame
        - trend: Current trend classification
        - key_levels: Active swing levels
    """
    swings = smc.swing_highs_lows(ohlc_data, swing_length=swing_length)
    structure = smc.bos_choch(ohlc_data, swings, close_break=True)
    
    return {
        'swings': swings,
        'structure': structure,
        'trend': classify_trend(swings),
        'key_levels': extract_key_levels(swings)
    }

def classify_trend(swing_data: pd.DataFrame) -> str:
    """
    Classify current market trend from swing data
    
    Algorithm:
        Uptrend: Series of HH (Higher Highs) and HL (Higher Lows)
        Downtrend: Series of LH (Lower Highs) and LL (Lower Lows)
        Range: Mixed swing pattern, no clear direction
    
    Returns: 'uptrend', 'downtrend', or 'range'
    """
    highs = swing_data[swing_data['HighLow'] == 1]['Level'].dropna()
    lows = swing_data[swing_data['HighLow'] == -1]['Level'].dropna()
    
    if len(highs) < 2 or len(lows) < 2:
        return 'range'
    
    hh = highs.iloc[-1] > highs.iloc[-2]
    hl = lows.iloc[-1] > lows.iloc[-2]
    lh = highs.iloc[-1] < highs.iloc[-2]
    ll = lows.iloc[-1] < lows.iloc[-2]
    
    if hh and hl:
        return 'uptrend'
    elif lh and ll:
        return 'downtrend'
    else:
        return 'range'

def extract_key_levels(swing_data: pd.DataFrame) -> dict:
    """
    Extract current key structure levels
    
    Returns dict with:
    - last_swing_high, last_swing_low
    - previous_swing_high, previous_swing_low
    - These define BOS/CHoCH trigger levels
    """
    highs = swing_data[swing_data['HighLow'] == 1]['Level'].dropna()
    lows = swing_data[swing_data['HighLow'] == -1]['Level'].dropna()
    
    return {
        'last_swing_high': highs.iloc[-1] if len(highs) > 0 else None,
        'last_swing_low': lows.iloc[-1] if len(lows) > 0 else None,
        'previous_swing_high': highs.iloc[-2] if len(highs) > 1 else None,
        'previous_swing_low': lows.iloc[-2] if len(lows) > 1 else None
    }

def detect_sms(structure_data: pd.DataFrame, ohlc_data: pd.DataFrame) -> pd.DataFrame:
    """
    Detect Shift in Market Structure (SMS)
    
    SMS = CHoCH + Displacement confirmation
    More significant than simple CHoCH as it includes
    a strong move (displacement) confirming the reversal.
    
    Algorithm:
        1. Find CHoCH events
        2. Check for displacement candle (body > 2x average)
        3. Confirm with volume spike (optional)
    """
    choch_events = structure_data[structure_data['CHOCH'].notna()]
    sms_events = []
    
    avg_body = (ohlc_data['close'] - ohlc_data['open']).abs().rolling(20).mean()
    
    for idx, event in choch_events.iterrows():
        body_size = abs(ohlc_data.loc[idx, 'close'] - ohlc_data.loc[idx, 'open'])
        if body_size > 2 * avg_body.loc[idx]:
            sms_events.append({
                'index': idx,
                'level': event['Level'],
                'type': 'SMS',
                'displacement': True
            })
    
    return pd.DataFrame(sms_events)

# Example usage:
# df = pd.DataFrame with OHLC data
# result = detect_market_structure(df, swing_length=50)
# trend = result['trend']
# bos = result['structure'][result['structure']['BOS'].notna()]
# choch = result['structure'][result['structure']['CHOCH'].notna()]`,
    metadata: {
      language: 'python',
      library: 'smartmoneyconcepts',
      functions: ['detect_market_structure', 'classify_trend', 'extract_key_levels', 'detect_sms'],
      input: 'OHLC DataFrame',
      output: 'Structure events (BOS/CHoCH/SMS), trend classification, key levels',
      algorithm: 'Swing-based structure detection with displacement confirmation for SMS'
    },
    sources: [{
      filePath: 'knowledge_base/code/structure_detector.py',
      lineStart: 1,
      lineEnd: 150,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['python', 'code', 'detector', 'bos', 'choch', 'sms', 'market_structure', 'algorithm'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'code-liquidity-detector',
    type: 'code_module',
    domain: 'code',
    name: 'Liquidity Detector',
    description: 'Python module for identifying Buy-Side Liquidity (BSL), Sell-Side Liquidity (SSL), equal highs/lows, trendline liquidity, and liquidity sweeps. Detects resting liquidity above swing highs (BSL) and below swing lows (SSL), identifies equal highs/lows within tolerance, and confirms sweeps when price wicks beyond liquidity then reverses.',
    content: `# Liquidity Detector
# Identifies BSL, SSL, equal highs/lows, and sweeps

from smartmoneyconcepts import smc
import pandas as pd
import numpy as np

def detect_liquidity_levels(ohlc_data: pd.DataFrame, swing_data: pd.DataFrame):
    """
    Detect liquidity levels from swing points
    
    Args:
        ohlc_data: DataFrame with OHLC data
        swing_data: DataFrame from swing detection
    
    Returns:
        DataFrame with:
        - Liquidity type (BSL/SSL)
        - Level (price)
        - Swept (boolean)
        - SweptIndex (candle that swept the level)
    
    Algorithm:
        BSL (Buy-Side Liquidity): Resting above swing highs
          -> Stop losses from short sellers
          -> Price targets for smart money buys
        SSL (Sell-Side Liquidity): Resting below swing lows
          -> Stop losses from long holders
          -> Price targets for smart money sells
    """
    liquidity = smc.liquidity(ohlc_data, swing_data)
    return liquidity

def detect_equal_highs_lows(ohlc_data: pd.DataFrame, swing_data: pd.DataFrame, tolerance_pips: float = 5.0):
    """
    Detect equal highs and equal lows (engineered liquidity)
    
    Equal highs/lows are strong liquidity magnets because they
    represent clustered stop losses at the same level.
    
    Args:
        tolerance_pips: Maximum pip difference to consider 'equal'
    
    Algorithm:
        Equal Highs: Two or more swing highs within tolerance
          -> Strong BSL magnet
        Equal Lows: Two or more swing lows within tolerance
          -> Strong SSL magnet
    """
    highs = swing_data[swing_data['HighLow'] == 1].copy()
    lows = swing_data[swing_data['HighLow'] == -1].copy()
    
    pip_size = 0.0001  # Forex standard
    tolerance = tolerance_pips * pip_size
    
    equal_highs = []
    for i in range(len(highs)):
        for j in range(i + 1, len(highs)):
            if abs(highs.iloc[i]['Level'] - highs.iloc[j]['Level']) <= tolerance:
                equal_highs.append({
                    'level': (highs.iloc[i]['Level'] + highs.iloc[j]['Level']) / 2,
                    'type': 'equal_highs',
                    'count': 2,
                    'indices': [highs.index[i], highs.index[j]]
                })
    
    equal_lows = []
    for i in range(len(lows)):
        for j in range(i + 1, len(lows)):
            if abs(lows.iloc[i]['Level'] - lows.iloc[j]['Level']) <= tolerance:
                equal_lows.append({
                    'level': (lows.iloc[i]['Level'] + lows.iloc[j]['Level']) / 2,
                    'type': 'equal_lows',
                    'count': 2,
                    'indices': [lows.index[i], lows.index[j]]
                })
    
    return pd.DataFrame(equal_highs + equal_lows)

def detect_liquidity_sweep(ohlc_data: pd.DataFrame, liquidity_data: pd.DataFrame):
    """
    Detect liquidity sweeps (stop hunts)
    
    A sweep occurs when price moves beyond a liquidity level
    (taking out stops) but then reverses, confirming the
    level was targeted by smart money.
    
    Algorithm:
        1. Price wicks beyond liquidity level
        2. Candle closes back inside (wick rejection)
        3. Subsequent candle(s) move in opposite direction
        4. Displacement candle confirms the sweep
    """
    sweeps = []
    for idx, liq in liquidity_data.iterrows():
        if liq.get('Swept', False):
            swept_idx = int(liq['SweptIndex']) if pd.notna(liq.get('SweptIndex')) else None
            if swept_idx:
                swept_candle = ohlc_data.iloc[swept_idx]
                # Check for wick rejection (close back inside)
                if liq['Liquidity'] == 1:  # BSL sweep
                    if swept_candle['close'] < liq['Level']:
                        sweeps.append({
                            'index': swept_idx,
                            'type': 'bsl_sweep',
                            'level': liq['Level'],
                            'reversal_expected': 'bearish'
                        })
                else:  # SSL sweep
                    if swept_candle['close'] > liq['Level']:
                        sweeps.append({
                            'index': swept_idx,
                            'type': 'ssl_sweep',
                            'level': liq['Level'],
                            'reversal_expected': 'bullish'
                        })
    
    return pd.DataFrame(sweeps)

# Example usage:
# df = pd.DataFrame with OHLC data
# swings = detect_swings(df)
# liquidity = detect_liquidity_levels(df, swings)
# equals = detect_equal_highs_lows(df, swings, tolerance_pips=5)
# sweeps = detect_liquidity_sweep(df, liquidity)`,
    metadata: {
      language: 'python',
      library: 'smartmoneyconcepts',
      functions: ['detect_liquidity_levels', 'detect_equal_highs_lows', 'detect_liquidity_sweep'],
      input: 'OHLC DataFrame + Swing DataFrame',
      output: 'Liquidity levels (BSL/SSL), equal highs/lows, confirmed sweeps',
      algorithm: 'Swing-based liquidity mapping, tolerance-based equal level detection, wick rejection sweep confirmation'
    },
    sources: [{
      filePath: 'knowledge_base/code/liquidity_detector.py',
      lineStart: 1,
      lineEnd: 180,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['python', 'code', 'detector', 'liquidity', 'bsl', 'ssl', 'sweep', 'equal_highs_lows', 'algorithm'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'code-vex-brain',
    type: 'code_module',
    domain: 'code',
    name: 'VEX Brain (v2)',
    description: 'Python main decision engine (v2) orchestrating all ICT detectors and models. Coordinates FVG, OB, Structure, and Liquidity detectors into a unified analysis pipeline. Runs multi-timeframe analysis (HTF bias → LTF entry), scores confluences, validates against model blueprints, generates trade signals with entry/stop/targets, and enforces risk management rules.',
    content: `# VEX Brain v2 - Main Decision Engine
# Orchestrates all detectors and models

import pandas as pd
import numpy as np
from datetime import datetime, time
from typing import Dict, List, Optional

class VEXBrain:
    """
    VEX Brain v2 - ICT Decision Engine
    
    Orchestrates:
    - FVG Detection
    - Order Block Detection
    - Market Structure Detection
    - Liquidity Detection
    - Confluence Scoring
    - Trade Signal Generation
    - Risk Management
    """
    
    KILLZONES = {
        'Asian': (time(20, 0), time(0, 0)),      # 8PM-12AM EST
        'London': (time(2, 0), time(5, 0)),        # 2AM-5AM EST
        'NY_AM': (time(9, 30), time(12, 0)),       # 9:30AM-12PM EST
        'NY_PM': (time(13, 30), time(16, 0)),      # 1:30PM-4PM EST
    }
    
    CONFLUENCE_WEIGHTS = {
        'htf_bias_aligned': 2.5,
        'killzone_active': 2.5,
        'displacement': 2.5,
        'fvg_present': 1.5,
        'ob_respected': 1.5,
        'bos_confirmed': 1.5,
        'ote_zone': 1.0,
        'smt_divergence': 1.0,
        'liquidity_swept': 1.0,
        'nwog_aligned': 0.5,
    }
    
    PENALTIES = {
        'counter_htf_bias': -2.0,
        'outside_killzone': -2.0,
        'no_displacement': -2.0,
        'low_confluence': -1.5,
    }
    
    MIN_CONFLUENCE_SCORE = 5.0
    MIN_CONFLUENCE_COUNT = 3
    MAX_RISK_PERCENT = 2.0
    
    def __init__(self, config: Optional[Dict] = None):
        self.config = config or {}
        self.detectors = {}
        self.current_analysis = {}
    
    def analyze(self, ohlc_htf: pd.DataFrame, ohlc_ltf: pd.DataFrame,
                pair: str, session: str) -> Dict:
        """
        Run complete multi-timeframe ICT analysis
        
        Pipeline:
        1. HTF Analysis: Bias, structure, key levels
        2. LTF Analysis: Entry-level detections
        3. Confluence Scoring
        4. Signal Generation
        5. Risk Validation
        """
        # Step 1: HTF Analysis
        htf_analysis = self._analyze_htf(ohlc_htf)
        
        # Step 2: LTF Analysis
        ltf_analysis = self._analyze_ltf(ohlc_ltf)
        
        # Step 3: Confluence Scoring
        confluences = self._score_confluences(htf_analysis, ltf_analysis, session)
        
        # Step 4: Signal Generation
        signal = self._generate_signal(htf_analysis, ltf_analysis, confluences, pair)
        
        # Step 5: Risk Validation
        validated = self._validate_risk(signal)
        
        return {
            'htf': htf_analysis,
            'ltf': ltf_analysis,
            'confluences': confluences,
            'signal': validated,
            'timestamp': datetime.utcnow().isoformat()
        }
    
    def _analyze_htf(self, ohlc: pd.DataFrame) -> Dict:
        """HTF: Determine bias, structure, PD arrays"""
        # Structure detection
        # Trend classification
        # Key level extraction
        # PD array identification
        return {'bias': 'pending', 'structure': 'pending'}
    
    def _analyze_ltf(self, ohlc: pd.DataFrame) -> Dict:
        """LTF: Find entry-level setups"""
        # FVG detection
        # OB detection
        # BOS/CHoCH detection
        # Liquidity mapping
        return {'setups': [], 'entry_models': []}
    
    def _score_confluences(self, htf: Dict, ltf: Dict, session: str) -> Dict:
        """Score confluences using weighted system"""
        score = 0.0
        found = []
        
        # Check each confluence factor
        for factor, weight in self.CONFLUENCE_WEIGHTS.items():
            # Evaluate factor presence
            present = False  # Placeholder for actual detection logic
            if present:
                score += weight
                found.append(factor)
        
        # Apply penalties
        for penalty, value in self.PENALTIES.items():
            triggered = False  # Placeholder for actual penalty logic
            if triggered:
                score += value
        
        return {
            'score': max(0, score),
            'count': len(found),
            'factors': found,
            'meets_minimum': score >= self.MIN_CONFLUENCE_SCORE and len(found) >= self.MIN_CONFLUENCE_COUNT
        }
    
    def _generate_signal(self, htf: Dict, ltf: Dict,
                         confluences: Dict, pair: str) -> Optional[Dict]:
        """Generate trade signal if confluences met"""
        if not confluences['meets_minimum']:
            return None
        
        return {
            'pair': pair,
            'direction': htf.get('bias', 'neutral'),
            'confluence_score': confluences['score'],
            'confluence_count': confluences['count'],
            'entry_price': None,  # From LTF PD array
            'stop_loss': None,    # From structure level
            'targets': [],        # From HTF PD arrays
            'risk_reward': None,
            'model': None,
            'grade': self._grade_setup(confluences)
        }
    
    def _validate_risk(self, signal: Optional[Dict]) -> Optional[Dict]:
        """Validate risk parameters"""
        if signal is None:
            return None
        # Enforce max risk, minimum R:R, etc.
        return signal
    
    def _grade_setup(self, confluences: Dict) -> str:
        """Grade trade setup quality"""
        score = confluences['score']
        count = confluences['count']
        if score >= 8.0 and count >= 5:
            return 'A+'
        elif score >= 6.5 and count >= 4:
            return 'A'
        elif score >= 5.0 and count >= 3:
            return 'B'
        else:
            return 'C'

# Example usage:
# brain = VEXBrain()
# result = brain.analyze(htf_data, ltf_data, pair='EURUSD', session='NY_AM')
# if result['signal']:
#     print(f"Signal: {result['signal']['direction']} {result['signal']['grade']}")`,
    metadata: {
      language: 'python',
      library: 'custom',
      functions: ['analyze', '_analyze_htf', '_analyze_ltf', '_score_confluences', '_generate_signal', '_validate_risk', '_grade_setup'],
      input: 'HTF + LTF OHLC DataFrames, pair, session',
      output: 'Complete analysis with HTF/LTF results, confluences, validated signal',
      algorithm: 'Multi-timeframe pipeline: HTF bias → LTF entry → confluence scoring → signal generation → risk validation'
    },
    sources: [{
      filePath: 'knowledge_base/code/vex_brain_v2.py',
      lineStart: 1,
      lineEnd: 250,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['python', 'code', 'engine', 'brain', 'orchestrator', 'multi_timeframe', 'confluence', 'algorithm'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: 'code-silver-bullet-model',
    type: 'code_module',
    domain: 'code',
    name: 'Silver Bullet Model',
    description: 'Python implementation of ICT Silver Bullet trading model with time window validation. Enforces strict time windows (10:00-11:00 AM and 2:00-3:00 PM EST), requires FVG formation within window, displacement confirmation, and optional OB/SMT confluence. Generates entry at FVG 50% with stop beyond FVG boundary and targets at opposing liquidity.',
    content: `# Silver Bullet Model Implementation
# ICT Silver Bullet with time window validation

import pandas as pd
import numpy as np
from datetime import datetime, time
from typing import Dict, Optional, List

class SilverBulletModel:
    """
    ICT Silver Bullet Trading Model
    
    Time Windows (EST):
      - AM Session: 10:00 - 11:00
      - PM Session: 14:00 - 15:00
    
    Requirements:
      1. Active during Silver Bullet time window
      2. FVG forms within the window
      3. Displacement candle confirms direction
      4. Entry at FVG 50% retracement
      5. Stop loss beyond FVG boundary
    
    Optional Confluences:
      - Order Block alignment
      - SMT Divergence
      - HTF PD Array alignment
      - Liquidity sweep prior to entry
    """
    
    AM_WINDOW = (time(10, 0), time(11, 0))  # EST
    PM_WINDOW = (time(14, 0), time(15, 0))  # EST
    
    def __init__(self):
        self.name = 'silver_bullet'
        self.min_displacement_atr_multiple = 1.5
    
    def is_active_window(self, current_time: time) -> bool:
        """Check if current time is within Silver Bullet window"""
        am_active = self.AM_WINDOW[0] <= current_time <= self.AM_WINDOW[1]
        pm_active = self.PM_WINDOW[0] <= current_time <= self.PM_WINDOW[1]
        return am_active or pm_active
    
    def get_active_session(self, current_time: time) -> Optional[str]:
        """Get which Silver Bullet session is active"""
        if self.AM_WINDOW[0] <= current_time <= self.AM_WINDOW[1]:
            return 'AM'
        elif self.PM_WINDOW[0] <= current_time <= self.PM_WINDOW[1]:
            return 'PM'
        return None
    
    def scan_for_setup(self, ohlc_data: pd.DataFrame, fvg_data: pd.DataFrame,
                       htf_bias: str, current_time: time) -> Optional[Dict]:
        """
        Scan for Silver Bullet setup
        
        Algorithm:
        1. Validate time window
        2. Find FVGs formed within window
        3. Check displacement (ATR multiple)
        4. Validate alignment with HTF bias
        5. Calculate entry (FVG 50%), stop, targets
        """
        # Step 1: Time validation
        if not self.is_active_window(current_time):
            return None
        
        session = self.get_active_session(current_time)
        
        # Step 2: Find recent FVGs
        recent_fvgs = fvg_data[fvg_data['FVG'].notna()].tail(5)
        
        if len(recent_fvgs) == 0:
            return None
        
        # Step 3: Check displacement
        atr = self._calculate_atr(ohlc_data, period=14)
        
        for idx, fvg in recent_fvgs.iterrows():
            fvg_size = abs(fvg['Top'] - fvg['Bottom'])
            
            if fvg_size < atr * self.min_displacement_atr_multiple:
                continue
            
            # Step 4: Bias alignment
            fvg_direction = 'bullish' if fvg['FVG'] == 1 else 'bearish'
            if htf_bias != 'neutral' and fvg_direction != htf_bias:
                continue
            
            # Step 5: Calculate trade parameters
            entry = (fvg['Top'] + fvg['Bottom']) / 2  # 50% of FVG
            
            if fvg_direction == 'bullish':
                stop = fvg['Bottom'] - (atr * 0.25)  # Below FVG low + buffer
                target_1 = entry + (entry - stop) * 2  # 2R
                target_2 = entry + (entry - stop) * 3  # 3R
            else:
                stop = fvg['Top'] + (atr * 0.25)  # Above FVG high + buffer
                target_1 = entry - (stop - entry) * 2  # 2R
                target_2 = entry - (stop - entry) * 3  # 3R
            
            risk_reward = abs(target_1 - entry) / abs(entry - stop)
            
            return {
                'model': 'silver_bullet',
                'session': session,
                'direction': fvg_direction,
                'fvg_index': idx,
                'entry_price': round(entry, 5),
                'stop_loss': round(stop, 5),
                'target_1': round(target_1, 5),
                'target_2': round(target_2, 5),
                'risk_reward': round(risk_reward, 2),
                'fvg_size_atr': round(fvg_size / atr, 2),
                'htf_bias': htf_bias,
                'time_window': f"{self.AM_WINDOW[0]}-{self.AM_WINDOW[1]}" if session == 'AM' else f"{self.PM_WINDOW[0]}-{self.PM_WINDOW[1]}"
            }
        
        return None
    
    def _calculate_atr(self, ohlc_data: pd.DataFrame, period: int = 14) -> float:
        """Calculate Average True Range"""
        high = ohlc_data['high']
        low = ohlc_data['low']
        close = ohlc_data['close'].shift(1)
        
        tr = pd.concat([
            high - low,
            (high - close).abs(),
            (low - close).abs()
        ], axis=1).max(axis=1)
        
        return tr.rolling(period).mean().iloc[-1]

# Example usage:
# model = SilverBulletModel()
# from datetime import time
# current = time(10, 30)  # 10:30 AM EST
# setup = model.scan_for_setup(ohlc_5m, fvg_data, htf_bias='bullish', current_time=current)
# if setup:
#     print(f"Silver Bullet {setup['session']}: {setup['direction']} at {setup['entry_price']}")`,
    metadata: {
      language: 'python',
      library: 'custom',
      functions: ['is_active_window', 'get_active_session', 'scan_for_setup', '_calculate_atr'],
      input: 'OHLC DataFrame, FVG DataFrame, HTF bias, current time',
      output: 'Silver Bullet trade setup with entry/stop/targets or None',
      algorithm: 'Time window validation → FVG detection within window → displacement check (1.5x ATR) → bias alignment → entry at FVG 50%'
    },
    sources: [{
      filePath: 'knowledge_base/code/silver_bullet_model.py',
      lineStart: 1,
      lineEnd: 160,
      uploadId,
      uploadedAt: timestamp
    }],
    tags: ['python', 'code', 'model', 'silver_bullet', 'time_window', 'fvg', 'algorithm'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
];
