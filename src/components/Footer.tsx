import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background/60 py-8 text-sm text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>
            {siteConfig.name} — Fan-made wiki. Not affiliated with the game
            developer.
          </p>
          {siteConfig.platformUrl && (
            <a
              href={siteConfig.platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/70 transition hover:text-foreground"
            >
              Official Store Page ↗
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
