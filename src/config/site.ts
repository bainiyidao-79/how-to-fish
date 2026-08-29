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
  /** Hero 区顶部小徽章文字（如 "WIKI GUIDE"），空串则不显示 */
  eyebrow?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;

  // 官方链接
  platformUrl?: string;
  discordUrl?: string;
  youtubeChannelUrl?: string;

  // 顶部导航（Header 用的平铺链接；不填则取 nav 第一组前 4 项）
  topNav?: NavLink[];

  // 侧边栏目录树（按实际内容增减，不做死链接）
  nav: NavGroup[];

  // 首页 YouTube 视频（官方频道代表作 > 播放量最高热门视频）
  heroVideo?: {
    youtubeId: string;
    title?: string;
    description?: string;
  };

  // 首页「Trending Now」：精选文章（不填则整块隐藏）
  trending?: { label: string; href: string; description?: string }[];

  // 首页「What is <Game>?」介绍区（不填则整块隐藏）
  gameIntro?: {
    title?: string;
    paragraphs: string[];
    facts?: { label: string; value: string }[];
  };

  // 底部 CTA 大横幅（光晕容器，不填则整块隐藏）
  ctaBanner?: {
    title: string;
    description?: string;
    buttonLabel: string;
    buttonHref: string;
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
  eyebrow: "Wiki Guide",
  primaryCtaLabel: "What is How to Fish?",
  primaryCtaHref: "/intro/how-to-fish-game",

  platformUrl: "https://store.steampowered.com/app/4001890/How_to_Fish/",
  discordUrl: "",
  youtubeChannelUrl: "",

  // 顶部导航（全部指向真实内容，无死链）
  topNav: [
    { label: "What is How to Fish?", href: "/intro/how-to-fish-game" },
    { label: "How to Fish on Steam", href: "/intro/how-to-fish-game-steam" },
    { label: "Release Date", href: "/release/how-to-fish-game-release-date" },
  ],

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

  // Trending Now：当前全部 3 篇真实文章
  trending: [
    {
      label: "What is How to Fish?",
      href: "/intro/how-to-fish-game",
      description:
        "A 1-4 player physics based fishing simulator — crash into an island, learn to fish, fight bosses, collect rare fish.",
    },
    {
      label: "How to Fish on Steam",
      href: "/intro/how-to-fish-game-steam",
      description:
        "Steam APP 4001890 by Dazed Games — launch offer, pricing, and where to buy.",
    },
    {
      label: "How to Fish Release Date",
      href: "/release/how-to-fish-game-release-date",
      description:
        "Released on Steam on August 20, 2026 with a 38% introductory discount.",
    },
  ],

  // What is 区块：全部基于已验证的真实素材事实
  gameIntro: {
    title: "What is How to Fish?",
    paragraphs: [
      "How to Fish is a 1-4 player physics based fishing simulator developed and published by Dazed Games.",
      "While drinking and boating, you suddenly crash into a small island. To work your way back home, you have to learn How to Fish — fish fish, kill fish, sell fish, and earn money to buy better gear. Complete quests and fight bosses to progress to new islands, try to collect the rare variant of every fish, hit trick shots for extra money, and gamble for even more.",
    ],
    facts: [
      { label: "Developer", value: "Dazed Games" },
      { label: "Players", value: "1-4 players" },
      { label: "Genre", value: "Physics based fishing simulator" },
      { label: "Platform", value: "Steam (PC)" },
      { label: "Release date", value: "August 20, 2026" },
    ],
  },

  // 底部 CTA 大横幅
  ctaBanner: {
    title: "Need a Guide for How to Fish?",
    description:
      "Start with the basics — what the game is, how it plays on Steam, and everything we know about its release.",
    buttonLabel: "Read the Wiki",
    buttonHref: "/intro/how-to-fish-game",
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
