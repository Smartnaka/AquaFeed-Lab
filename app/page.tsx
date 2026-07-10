import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const starterSteps = [
  {
    step: "1",
    title: "Find today’s feed amount",
    description: "Start here if you know the average fish weight and number of fish in your pond or tank.",
    href: "/daily-feeding",
    action: "Calculate daily ration",
  },
  {
    step: "2",
    title: "Mix a feed batch",
    description: "Use this when you want ingredient weights for a target crude protein percentage.",
    href: "/formulation",
    action: "Formulate feed",
  },
  {
    step: "3",
    title: "Adjust your ingredient list",
    description: "Review the default protein values before formulating if your local ingredients differ.",
    href: "/ingredients",
    action: "Review ingredients",
  },
];

const plainLanguageFeatures = [
  "Uses simple pond records: fish weight, fish count, batch size, and target protein.",
  "Shows the formula notes beside results so beginners can understand each answer.",
  "Keeps calculation history on this device only, with print and PDF export options.",
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="hero-pattern overflow-hidden rounded-3xl p-6 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Beginner-friendly fish feeding tools
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Know what to feed, then know how to mix it.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              AquaFeed Lab separates daily ration planning from feed formulation, so you can move one clear step at a time without digging through cluttered screens.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/daily-feeding">Start with daily ration</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/formulation">I already know my batch size</Link>
              </Button>
            </div>
          </div>
          <Card className="border-primary/20 bg-white/90 shadow-lg">
            <CardHeader>
              <CardTitle>New here? Use this order</CardTitle>
              <CardDescription>Follow the cards below from top to bottom.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {starterSteps.map((item) => (
                <Link
                  className="group flex gap-4 rounded-2xl border bg-white p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  href={item.href}
                  key={item.step}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {item.step}
                  </span>
                  <span>
                    <span className="block font-semibold group-hover:text-primary">{item.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{item.description}</span>
                    <span className="mt-2 block text-sm font-semibold text-primary">{item.action} →</span>
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {plainLanguageFeatures.map((feature) => (
          <Card key={feature}>
            <CardContent className="flex gap-3 p-5 text-muted-foreground">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
              <p>{feature}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
