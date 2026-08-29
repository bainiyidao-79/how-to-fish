export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; children: NavLink[] };

export type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;

  // 官方链接
  platformUrl?: string;
  discordUrl?: string;
  youtubeChannelUrl?: string;

  // 导航（侧边栏目录树）
  nav: NavGroup[];

  // 首页 YouTube 视频
  heroVideo?: {
    youtubeId: string;
    title?: string;
    description?: string;
  };

  // 可选：FAQ
  faq?: { question: string; answer: string }[];
};

export const siteConfig: SiteConfig = {
  name: "How to Fish Wiki",
  shortName: "How to Fish Wiki",
  description:
    "The How to Fish wiki — a physics-based 1-4 player fishing simulator by Dazed Games. Learn what the game is, how it plays, and when it launched on Steam.",
  heroTitle: "How to Fish Wiki",
  heroSubtitle:
    "Guides and answers for the physics-based co-op fishing sim by Dazed Games",
  primaryCtaLabel: "What is How to Fish?",
  primaryCtaHref: "/intro/how-to-fish-game",

  platformUrl: "https://store.steampowered.com/app/4001890/How_to_Fish/",
  discordUrl: "",
  youtubeChannelUrl: "",

  // 导航按实际内容增减：当前 3 篇文章（intro x2 + release x1）
  nav: [
    {
      title: "Game Info",
      children: [
        { label: "What is How to Fish?", href: "/intro/how-to-fish-game" },
        { label: "How to Fish on Steam", href: "/intro/how-to-fish-game-steam" },
      ],
    },
    {
      title: "Release",
      children: [
        {
          label: "Release Date",
          href: "/release/how-to-fish-game-release-date",
        },
      ],
    },
  ],

  // 首页嵌入素材采集到的 YouTube 游戏视频
  heroVideo: {
    youtubeId: "BFwwWlf9qGQ",
    title: "How to Fish — Gameplay Video",
    description:
      "Watch How to Fish in action — a 1-4 player physics based fishing simulator on Steam.",
  },

  faq: [
    {
      question: "What is How to Fish?",
      answer:
        "How to Fish is a 1-4 player physics based fishing simulator by Dazed Games. You crash into a small island while boating, and to work your way back home you have to learn How to Fish.",
    },
    {
      question: "When did How to Fish come out?",
      answer:
        "How to Fish released on Steam on August 20, 2026.",
    },
    {
      question: "Is How to Fish multiplayer?",
      answer:
        "Yes — it supports 1 to 4 players in physics-based co-op fishing.",
    },
    {
      question: "Where can I play How to Fish?",
      answer:
        "How to Fish is available on Steam for PC.",
    },
  ],
};
