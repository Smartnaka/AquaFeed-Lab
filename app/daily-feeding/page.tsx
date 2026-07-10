"use client";

import { useState } from "react";
import { calculateDailyFeeding } from "@/lib/calculations";
import { saveCalculation } from "@/lib/storage";
import { formatGram, formatKg } from "@/lib/utils";
import type { DailyFeedingResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResultActions } from "@/components/ResultActions";

export default function Daily() {
  const [weight, setWeight] = useState("28");
  const [count, setCount] = useState("500");
  const [result, setResult] = useState<DailyFeedingResult | null>(null);
  const [error, setError] = useState("");

  function submit() {
    setError("");
    const w = Number(weight);
    const c = Number(count);

    if (!w || !c || w <= 0 || c <= 0) {
      setError("Enter positive values for fish weight and quantity.");
      return;
    }

    const r = calculateDailyFeeding(w, c);
    setResult(r);
    saveCalculation(r);
  }

  return (
    <div className="space-y-6">
      <section className="beginner-note">
        <p className="font-semibold text-foreground">Step 1: Calculate how much feed your fish need today.</p>
        <p>
          You only need two numbers: the average weight of one fish and the total number of fish. The calculator chooses the feeding rate for you.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Daily Fish Feed Ration Calculator</CardTitle>
            <CardDescription>Enter your stock details, then calculate one clear daily ration.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <label className="block text-sm font-medium">
              Average fish weight (grams)
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} min="0" />
              <span className="mt-1 block text-xs font-normal text-muted-foreground">Example: if one fish weighs about 28 g, enter 28.</span>
            </label>
            <label className="block text-sm font-medium">
              Total number of fish
              <Input type="number" value={count} onChange={(e) => setCount(e.target.value)} min="0" />
              <span className="mt-1 block text-xs font-normal text-muted-foreground">Count the fish in the pond, tank, hapas, or cage.</span>
            </label>
            {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <Button className="w-full md:w-auto" onClick={submit}>
              Calculate daily ration
            </Button>
          </CardContent>
        </Card>

        {result ? (
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>{result.explanation}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 text-center sm:grid-cols-3">
                <div className="rounded-lg bg-secondary p-3"><b>{result.feedingPercentage}%</b><p className="text-xs">feeding rate</p></div>
                <div className="rounded-lg bg-secondary p-3"><b>{formatGram(result.dailyGrams)}</b><p className="text-xs">per day</p></div>
                <div className="rounded-lg bg-secondary p-3"><b>{formatKg(result.dailyKg)}</b><p className="text-xs">per day</p></div>
              </div>
              <p className="text-sm text-muted-foreground">Formula: average fish weight × feeding percentage as a decimal × total number of fish.</p>
              <ResultActions title="Daily Feeding Result" lines={[`Feeding rate: ${result.feedingPercentage}%`, `Daily grams: ${formatGram(result.dailyGrams)}`, `Daily kilograms: ${formatKg(result.dailyKg)}`, result.explanation]} />
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>No calculation yet</CardTitle>
              <CardDescription>Your result will appear here after you enter the two values and calculate.</CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
