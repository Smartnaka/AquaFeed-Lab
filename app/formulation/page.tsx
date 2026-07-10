"use client";

import { useState } from "react";
import { calculateFormulation } from "@/lib/calculations";
import { getIngredients, saveCalculation } from "@/lib/storage";
import type { FormulationResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { ResultActions } from "@/components/ResultActions";

export default function Formulation() {
  const [kg, setKg] = useState("10");
  const [target, setTarget] = useState("25");
  const [result, setResult] = useState<FormulationResult | null>(null);
  const [error, setError] = useState("");

  function submit() {
    setError("");
    try {
      const total = Number(kg);
      const t = Number(target);
      if (!total || !t || total <= 0 || t <= 0) throw new Error("Enter positive values for feed quantity and target protein.");
      const r = calculateFormulation(total, t, getIngredients());
      setResult(r);
      saveCalculation(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to calculate formulation.");
    }
  }

  return (
    <div className="space-y-6">
      <section className="beginner-note">
        <p className="font-semibold text-foreground">Step 2: Turn your target protein into ingredient weights.</p>
        <p>
          Enter the total feed you want to make and the crude protein target. If you are unsure about ingredient protein values, check the Ingredients page first.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Fish Feed Formulation Calculator</CardTitle>
          <CardDescription>Uses average protein and energy groups, Pearson square normalization, and 2% fixed additives.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <label className="text-sm font-medium">
            Total feed quantity (kg)
            <Input type="number" value={kg} onChange={(e) => setKg(e.target.value)} />
            <span className="mt-1 block text-xs font-normal text-muted-foreground">Example: enter 10 to make a 10 kg batch.</span>
          </label>
          <label className="text-sm font-medium">
            Target crude protein (%)
            <Input type="number" value={target} onChange={(e) => setTarget(e.target.value)} />
            <span className="mt-1 block text-xs font-normal text-muted-foreground">Example: many grow-out feeds use targets around 25% CP.</span>
          </label>
          <div className="flex items-end">
            <Button className="w-full" onClick={submit}>Formulate feed</Button>
          </div>
          {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700 md:col-span-3">{error}</p>}
        </CardContent>
      </Card>

      {result ? (
        <Card>
          <CardHeader>
            <CardTitle>Batch result: {result.totalKg.toFixed(2)} kg</CardTitle>
            <CardDescription>{result.explanation}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-4">
              <div className="rounded-lg bg-secondary p-3">Protein avg: <b>{result.highProteinAverage.toFixed(1)}%</b></div>
              <div className="rounded-lg bg-secondary p-3">Energy avg: <b>{result.lowProteinAverage.toFixed(1)}%</b></div>
              <div className="rounded-lg bg-secondary p-3">Protein mix: <b>{result.proteinMixPercentage.toFixed(1)}%</b></div>
              <div className="rounded-lg bg-secondary p-3">Fixed: <b>{result.fixedPercentage}%</b></div>
            </div>
            <Table><THead><TR><TH>Ingredient</TH><TH>Category</TH><TH>Protein %</TH><TH>Weight kg</TH></TR></THead><TBody>{result.ingredients.map((i) => <TR key={i.id}><TD>{i.name}</TD><TD>{i.category}</TD><TD>{i.proteinPercentage}%</TD><TD>{i.weightKg.toFixed(2)}</TD></TR>)}</TBody></Table>
            <ResultActions title="Feed Formulation Result" lines={[`Target protein: ${result.targetProteinPercentage}%`, `Total feed: ${result.totalKg.toFixed(2)} kg`, ...result.ingredients.map((i) => `${i.name}: ${i.weightKg.toFixed(2)} kg`)]} />
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed"><CardHeader><CardTitle>Empty result</CardTitle><CardDescription>Run a formulation to see ingredient quantities in a table.</CardDescription></CardHeader></Card>
      )}
    </div>
  );
}
