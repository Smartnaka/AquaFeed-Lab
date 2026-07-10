export type IngredientCategory = "Protein source" | "Energy source" | "Fixed additive";
export type Ingredient = { id: string; name: string; category: IngredientCategory; proteinPercentage: number; editable?: boolean };
export type DailyFeedingResult = { kind: "daily"; id: string; createdAt: string; averageWeightGrams: number; fishCount: number; feedingPercentage: number; dailyGrams: number; dailyKg: number; explanation: string };
export type FormulationIngredientResult = { id: string; name: string; category: IngredientCategory; proteinPercentage: number; weightKg: number };
export type FormulationResult = { kind: "formulation"; id: string; createdAt: string; totalFeedKg: number; targetProteinPercentage: number; highProteinAverage: number; lowProteinAverage: number; proteinMixPercentage: number; energyMixPercentage: number; fixedPercentage: number; ingredients: FormulationIngredientResult[]; totalKg: number; explanation: string };
export type CalculationRecord = DailyFeedingResult | FormulationResult;
