import type { Ingredient } from "./types";
export const defaultIngredients: Ingredient[] = [
  { id: "fish-meal", name: "Fish meal", category: "Protein source", proteinPercentage: 72, editable: true },
  { id: "soybean-meal", name: "Soybean meal", category: "Protein source", proteinPercentage: 40, editable: true },
  { id: "groundnut-cake", name: "Groundnut cake", category: "Protein source", proteinPercentage: 44, editable: true },
  { id: "yellow-maize", name: "Yellow maize", category: "Energy source", proteinPercentage: 10, editable: true },
  { id: "rice-bran", name: "Rice bran", category: "Energy source", proteinPercentage: 12, editable: true },
  { id: "premix", name: "Premix", category: "Fixed additive", proteinPercentage: 0, editable: true },
  { id: "lysine", name: "Lysine", category: "Fixed additive", proteinPercentage: 0, editable: true },
  { id: "methionine", name: "Methionine", category: "Fixed additive", proteinPercentage: 0, editable: true },
  { id: "binder", name: "Binder", category: "Fixed additive", proteinPercentage: 0, editable: true },
  { id: "vegetable-oil", name: "Vegetable oil", category: "Fixed additive", proteinPercentage: 0, editable: true },
  { id: "salt", name: "Salt", category: "Fixed additive", proteinPercentage: 0, editable: true }
];
