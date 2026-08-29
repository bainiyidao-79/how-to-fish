import Link from "next/link";
import { siteConfig } from "@/config/site";
import { HeroVideo } from "@/components/HeroVideo";

export function HomeView() {
  return (
    <div className="flex flex-1">
      {/* 主内容区 */}
      <main className="flex-1 p-6 lg:p-8">
        {/* Hero 区 */}
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {siteConfig.heroTitle}
          </h1>
          <p className="mt-2 text-muted-foreground">{siteConfig.heroSubtitle}</p>

          {/* YouTube 视频区 */}
          <div className="mt-6">
            <HeroVideo />
          </div>

          {/* CTA 按钮 */}
          <div className="mt-6 flex gap-3">
            <Link
              href={siteConfig.primaryCtaHref}
              className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              {siteConfig.primaryCtaLabel}
            </Link>
          </div>
        </section>

        {/* 栏目卡片区（按 nav 自动生成） */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Explore the Wiki
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.nav.map((group) =>
              group.children.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border p-4 transition hover:bg-muted/50"
                >
                  <div className="text-sm font-medium text-foreground">
                    {item.label}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {group.title}
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* FAQ 区（可选） */}
        {siteConfig.faq && siteConfig.faq.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-foreground">FAQ</h2>
            <div className="space-y-3">
              {siteConfig.faq.map((item, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-foreground">
                    {item.question}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
