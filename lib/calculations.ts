import { defaultIngredients } from "./ingredients";
import type { DailyFeedingResult, FormulationResult, Ingredient } from "./types";
const feedingRates = [{ w: 10, p: 8 }, { w: 25, p: 7 }, { w: 50, p: 6 }, { w: 100, p: 5 }, { w: 250, p: 4 }, { w: 500, p: 3 }, { w: 750, p: 2 }, { w: 1000, p: 1 }];
const id = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;
export function getFeedingPercentage(weight: number) { return feedingRates.find((r) => weight <= r.w)?.p ?? 1; }
export function calculateDailyFeeding(averageWeightGrams: number, fishCount: number): DailyFeedingResult {
  const feedingPercentage = getFeedingPercentage(averageWeightGrams);
  const dailyGrams = averageWeightGrams * (feedingPercentage / 100) * fishCount;
  return { kind: "daily", id: id(), createdAt: new Date().toISOString(), averageWeightGrams, fishCount, feedingPercentage, dailyGrams, dailyKg: dailyGrams / 1000, explanation: `${averageWeightGrams}g × ${feedingPercentage / 100} × ${fishCount} fish = ${dailyGrams.toFixed(0)}g/day` };
}
export function calculateFormulation(totalFeedKg: number, targetProteinPercentage: number, ingredients: Ingredient[] = defaultIngredients): FormulationResult {
  const proteins = ingredients.filter((i) => i.category === "Protein source");
  const energy = ingredients.filter((i) => i.category === "Energy source");
  const fixed = ingredients.filter((i) => i.category === "Fixed additive");
  const highProteinAverage = proteins.reduce((s, i) => s + i.proteinPercentage, 0) / proteins.length;
  const lowProteinAverage = energy.reduce((s, i) => s + i.proteinPercentage, 0) / energy.length;
  if (targetProteinPercentage <= lowProteinAverage || targetProteinPercentage >= highProteinAverage) throw new Error(`Target protein must be between ${lowProteinAverage.toFixed(1)}% and ${highProteinAverage.toFixed(1)}%.`);
  const proteinPart = targetProteinPercentage - lowProteinAverage;
  const energyPart = highProteinAverage - targetProteinPercentage;
  const parts = proteinPart + energyPart;
  const fixedPercentage = 2;
  const variableKg = totalFeedKg * (1 - fixedPercentage / 100);
  const proteinMixPercentage = (proteinPart / parts) * 100;
  const energyMixPercentage = (energyPart / parts) * 100;
  const proteinKg = variableKg * (proteinMixPercentage / 100);
  const energyKg = variableKg * (energyMixPercentage / 100);
  const proteinTotal = proteins.reduce((s, i) => s + i.proteinPercentage, 0);
  const energyTotal = energy.reduce((s, i) => s + i.proteinPercentage, 0);
  const rows = [
    ...proteins.map((i) => ({ ...i, weightKg: proteinKg * (i.proteinPercentage / proteinTotal) })),
    ...energy.map((i) => ({ ...i, weightKg: energyKg * (i.proteinPercentage / energyTotal) })),
    ...fixed.map((i) => ({ ...i, weightKg: (totalFeedKg * fixedPercentage / 100) / fixed.length }))
  ];
  return { kind: "formulation", id: id(), createdAt: new Date().toISOString(), totalFeedKg, targetProteinPercentage, highProteinAverage, lowProteinAverage, proteinMixPercentage, energyMixPercentage, fixedPercentage, ingredients: rows, totalKg: rows.reduce((s, r) => s + r.weightKg, 0), explanation: `Pearson square: protein part ${proteinPart.toFixed(1)}, energy part ${energyPart.toFixed(1)}, normalized across 98% of the batch plus 2% fixed additives.` };
}
