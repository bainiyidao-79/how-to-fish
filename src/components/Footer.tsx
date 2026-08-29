import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t bg-background/50 py-8 text-sm text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <p>
          {siteConfig.name} — Fan-made wiki. Not affiliated with the game developer.
        </p>
      </div>
    </footer>
  );
}
