import { useState, useCallback } from "react";
import type { AnswerRecord, QuizMode } from "../types";

const STORAGE_KEY = "ringo_progress";

function loadRecords(): AnswerRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AnswerRecord[]) : [];
  } catch {
    return [];
  }
}

function saveRecords(records: AnswerRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function useProgress() {
  const [records, setRecords] = useState<AnswerRecord[]>(loadRecords);

  const addRecord = useCallback((record: AnswerRecord) => {
    setRecords((prev) => {
      const next = [...prev, record];
      saveRecords(next);
      return next;
    });
  }, []);

  const getStats = useCallback(
    (wordId?: string, mode?: QuizMode) => {
      const filtered = records.filter(
        (r) =>
          (wordId === undefined || r.wordId === wordId) &&
          (mode === undefined || r.mode === mode)
      );
      const correct = filtered.filter((r) => r.correct).length;
      return { correct, total: filtered.length };
    },
    [records]
  );

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRecords([]);
  }, []);

  return { records, addRecord, getStats, reset };
}
