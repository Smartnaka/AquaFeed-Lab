import Link from "next/link";

const links = [
  ["/daily-feeding", "1. Daily ration"],
  ["/formulation", "2. Feed mix"],
  ["/ingredients", "Ingredients"],
  ["/history", "History"],
];

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-lg font-bold text-primary">
          🐟 AquaFeed Lab
        </Link>
        <div className="flex gap-2 overflow-x-auto pb-1 text-sm md:flex-wrap md:overflow-visible md:pb-0">
          {links.map(([href, label]) => (
            <Link
              className="whitespace-nowrap rounded-full border border-transparent bg-secondary/70 px-3 py-2 font-medium transition hover:border-primary/30 hover:bg-secondary"
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
