import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * localStorage-backed replacement for @github/spark/hooks useKV.
 * Same signature: [value, setter, deleter]
 * 
 * The setter accepts either a new value or an updater function (oldValue) => newValue.
 * Values are JSON-serialized to localStorage under the prefix "kv:".
 */

const KV_PREFIX = 'ict-kv:';

// In-memory subscribers so multiple useKV calls with the same key stay in sync
const listeners = new Map<string, Set<(value: any) => void>>();

function notify(key: string, value: any) {
  const subs = listeners.get(key);
  if (subs) {
    for (const fn of subs) fn(value);
  }
}

function readFromStorage<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(KV_PREFIX + key);
    if (raw === null) return undefined;
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

function writeToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(KV_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[useKV] Failed to write key "${key}" to localStorage:`, e);
  }
}

function deleteFromStorage(key: string): void {
  try {
    localStorage.removeItem(KV_PREFIX + key);
  } catch (e) {
    console.warn(`[useKV] Failed to delete key "${key}" from localStorage:`, e);
  }
}

export function useKV<T = string>(
  key: string,
  initialValue?: T
): readonly [T | undefined, (newValue: T | ((oldValue?: T) => T)) => void, () => void] {
  const [value, setValueState] = useState<T | undefined>(() => {
    const stored = readFromStorage<T>(key);
    return stored !== undefined ? stored : initialValue;
  });

  // Keep a ref to the latest value for the updater function
  const valueRef = useRef(value);
  valueRef.current = value;

  // Subscribe to cross-hook updates for the same key
  useEffect(() => {
    if (!listeners.has(key)) {
      listeners.set(key, new Set());
    }
    const subs = listeners.get(key)!;
    const handler = (newVal: any) => {
      setValueState(newVal);
    };
    subs.add(handler);

    return () => {
      subs.delete(handler);
      if (subs.size === 0) listeners.delete(key);
    };
  }, [key]);

  const setValue = useCallback(
    (newValue: T | ((oldValue?: T) => T)) => {
      const resolved =
        typeof newValue === 'function'
          ? (newValue as (oldValue?: T) => T)(valueRef.current)
          : newValue;

      writeToStorage(key, resolved);
      setValueState(resolved);
      notify(key, resolved);
    },
    [key]
  );

  const deleteValue = useCallback(() => {
    deleteFromStorage(key);
    setValueState(undefined);
    notify(key, undefined);
  }, [key]);

  return [value, setValue, deleteValue] as const;
}
