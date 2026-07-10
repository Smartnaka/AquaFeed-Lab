"use client";
import { defaultIngredients } from "./ingredients";
import type { CalculationRecord, Ingredient } from "./types";
const HISTORY_KEY = "aquafeed.history";
const INGREDIENT_KEY = "aquafeed.ingredients";
export function getHistory(): CalculationRecord[] { if (typeof window === "undefined") return []; return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]"); }
export function saveCalculation(record: CalculationRecord) { const next = [record, ...getHistory()].slice(0, 25); localStorage.setItem(HISTORY_KEY, JSON.stringify(next)); }
export function clearHistory() { localStorage.removeItem(HISTORY_KEY); }
export function getIngredients(): Ingredient[] { if (typeof window === "undefined") return defaultIngredients; return JSON.parse(localStorage.getItem(INGREDIENT_KEY) ?? JSON.stringify(defaultIngredients)); }
export function saveIngredients(items: Ingredient[]) { localStorage.setItem(INGREDIENT_KEY, JSON.stringify(items)); }
