"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, type NavGroup } from "@/config/site";

function NavItem({ label, href }: { label: string; href: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`flex min-h-8 items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors ${
        isActive
          ? "font-medium text-foreground bg-muted"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      }`}
    >
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </Link>
  );
}

function NavGroup({ group }: { group: NavGroup }) {
  return (
    <div className="mb-4">
      <div className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
        {group.title}
      </div>
      <div className="space-y-0.5">
        {group.children.map((item) => (
          <NavItem key={item.href} label={item.label} href={item.href} />
        ))}
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background/50 lg:block">
      <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto p-4">
        <div className="mb-4 text-sm font-semibold text-foreground">
          {siteConfig.shortName}
        </div>
        {siteConfig.nav.map((group) => (
          <NavGroup key={group.title} group={group} />
        ))}
      </div>
    </aside>
  );
}
