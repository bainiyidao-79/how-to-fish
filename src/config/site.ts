export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; children: NavLink[] };

/** 首页轮播页（固定 3 篇；少于 3 篇时轮播按实际条数渲染） */
export type CarouselSlide = {
  /** 轮播配图（放 public/images/，宽高比按 790:292 裁切） */
  image: string;
  title: string;
  href: string;
};

/** 右侧游戏信息卡的字段行（原站字段：制作公司/发行公司/发售日期/游戏平台/游戏类型） */
export type GameInfoField = { label: string; value: string };

/** 左视频列的 YouTube 条目（官方频道代表作优先；2–4 个） */
export type VideoItem = { youtubeId: string; title: string };

/**
 * 主题色 token 名（供组件以 var() 引用）。
 * ⚠️ 色值唯一来源 = src/app/globals.css 的 @theme 块，本文件不重复定义色值。
 * 每站正式配色由 g-art-design 从游戏官方素材提取后覆盖 globals.css 的三个主槽位。
 */
export const themeTokens = {
  primary: "--color-primary",
  accent: "--color-accent",
  auxiliary: "--color-auxiliary",
} as const;

export type SiteConfig = {
  /** 游戏名（全站唯一来源） */
  name: string;
  shortName: string;

  /** SEO 三件套 */
  seo: {
    title: string;
    description: string;
    keywords: string;
  };

  /** Hero 大图区（无顶栏，Hero 直顶） */
  hero: {
    /** keyart 大图路径；同时用作内容页右栏 banner */
    image: string;
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };

  /** 首页横向轮播：3 篇，5s 自动换页 */
  carousel: {
    autoPlayMs: number;
    slides: CarouselSlide[];
  };

  /** 右侧游戏信息卡 */
  gameInfo: {
    title: string;
    /** 封面图路径（125×166 比例） */
    cover: string;
    fields: GameInfoField[];
    /** Steam 入口按钮（文案统一 View on Steam ↗） */
    ctaLabel: string;
    ctaHref: string;
  };

  /** 左视频列 YouTube id 列表（2–4 个，数量由右攻略区高度反推） */
  videos: VideoItem[];

  /** 官方链接（页脚展示；建议至少 1 条，其余留空则不渲染） */
  officialLinks: NavLink[];

  /** 全站攻略导航分组（首页攻略区 / 内容页右栏导航树共用；每站按真实内容增减） */
  nav: NavGroup[];

  /** 栏目简介（栏目页 L2 顶部一段话，key=section 目录名；缺省回退到「N guides…」） */
  sectionIntros?: Record<string, string>;

  /** 栏目兑底图池：内容页缺图时按栏目取图，避免与右栏 keyart 同图同屏（扬哥 2026-09-16） */
  sectionFallbackImages?: Record<string, string>;

  /** 页脚 */
  footer: {
    copyright: string;
    contactLabel: string;
    /** 联系方式（邮箱/表单链接文本）；不填则页脚不显示联系位 */
    contact?: string;
  };

  /** 广告位（骨架预制）：填入广告代码（HTML/JS）即生效；留空则完全不渲染不占位 */
  ads?: {
    /** 首页攻略区顶部 banner（内容区宽度） */
    contentBanner?: string;
    /** 页面底部 banner 广告位（页脚上方，每页都有） */
    footerBanner?: string;
    /** 正文中横幅广告位（728×90）：位置在第一屏之后，长文自动多插一个位（同一份代码可多处复用） */
    articleInline?: string;
    /** 正文第二坑位代码（扬哥 2026-09-16：长文双广告位时用不同代码/创意，避免同屏重复）；缺省回退 articleInline */
    articleInline2?: string;
    /** 左右浮动竖幅 160×600 旧写法：只填此字段=左右共用同一单元（同屏创意相同） */
    sideRail?: string;
    /** 左侧竖幅广告单元（独立 key=独立竞价/创意/统计；优先于 sideRail） */
    sideRailLeft?: string;
    /** 右侧竖幅广告单元（独立 key=独立竞价/创意/统计；优先于 sideRail） */
    sideRailRight?: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "How to Fish",
  shortName: "How to Fish",

  // ⚠️ 每站必改：SEO 三件套（title ≤60 字符 / description ≤160 字符）
  seo: {
    title: "How to Fish Wiki — Guides, Walkthrough & Game Info",
    description:
      "Fan-made How to Fish wiki: full island walkthrough, all fish & boss guides, weapons, multiplayer fixes and achievement help for Dazed Games' fishing sim.",
    keywords:
      "How to Fish, how to fish wiki, how to fish walkthrough, how to fish bosses, how to fish achievements, how to fish multiplayer",
  },

  // ⚠️ 每站必改：keyart 大图（放 public/images/）
  hero: {
    image: "/images/home/keyart.webp",
    eyebrow: "Wiki Guide",
    title: "How to Fish",
    subtitle: "Walkthrough · Fish & Bosses · Achievements",
  },

  // ⚠️ 每站必改：轮播 3 篇
  carousel: {
    autoPlayMs: 5000,
    slides: [
      {
        image: "/images/carousel/walkthrough.webp",
        title: "All Islands Walkthrough — Every Boss, Full Route",
        href: "/walkthrough/all-islands-walkthrough",
      },
      {
        image: "/images/carousel/whale.webp",
        title: "Bowhead Whale & the Final Boss",
        href: "/fish/bowhead-whale-final-boss",
      },
      {
        image: "/images/carousel/weapons.webp",
        title: "Best Weapons — Assault Rifle & SMG Upgrades",
        href: "/weapons/best-weapons",
      },
    ],
  },

  // ⚠️ 每站必改：信息卡字段（保持 5 行结构）
  gameInfo: {
    title: "How to Fish",
    cover: "/images/home/cover.webp",
    fields: [
      { label: "Developer", value: "Dazed Games" },
      { label: "Publisher", value: "Dazed Games" },
      { label: "Release Date", value: "August 20, 2026" },
      { label: "Platforms", value: "Steam (PC)" },
      { label: "Genre", value: "Physics-based fishing simulator" },
    ],
    ctaLabel: "View on Steam ↗",
    ctaHref: "https://store.steampowered.com/app/4001890/How_to_Fish/",
  },

  // ⚠️ 每站必改：YouTube 视频 id（2–4 个）
  videos: [
    { youtubeId: "BFwwWlf9qGQ", title: "How to Fish — Official Gameplay" },
  ],

  officialLinks: [
    { label: "Steam Page", href: "https://store.steampowered.com/app/4001890/How_to_Fish/" },
  ],

  // ⚠️ 导航按实际内容增减，不做死链接（有内容才留按钮）
  nav: [
    {
      title: "Guides",
      children: [
        { label: "What is How to Fish?", href: "/guides/how-to-fish-game" },
        { label: "How to Fish on Steam", href: "/guides/how-to-fish-game-steam" },
        { label: "Release Date", href: "/guides/how-to-fish-game-release-date" },
        { label: "268K Concurrent Players", href: "/guides/200k-concurrent-players" },
      ],
    },
    {
      title: "Walkthrough",
      children: [
        { label: "All Islands Walkthrough", href: "/walkthrough/all-islands-walkthrough" },
      ],
    },
    {
      title: "Fish & Bosses",
      children: [
        { label: "Lighthouse Island Fish", href: "/fish/lighthouse-island-fish" },
        { label: "Forest Island Fish", href: "/fish/forest-island-fish" },
        { label: "Desert Island Fish", href: "/fish/desert-island-fish" },
        { label: "Rock Island Fish", href: "/fish/rock-island-fish" },
        { label: "Lava Island Fish", href: "/fish/lava-island-fish" },
        { label: "Bowhead Whale & Final Boss", href: "/fish/bowhead-whale-final-boss" },
      ],
    },
    {
      title: "Weapons",
      children: [
        { label: "Best Weapons", href: "/weapons/best-weapons" },
      ],
    },
    {
      title: "Multiplayer",
      children: [
        { label: "Black Screen Fix", href: "/multiplayer/multiplayer-black-screen-fix" },
        { label: "Room Code Not Working", href: "/multiplayer/room-code-not-working" },
        { label: "Version Mismatch Fix", href: "/multiplayer/version-mismatch-fix" },
      ],
    },
    {
      title: "Tips & Tricks",
      children: [
        { label: "Dynamite Guide", href: "/tips/dynamite-guide" },
        { label: "Disable Friendly Fire", href: "/tips/disable-friendly-fire" },
        { label: "Change Scope Controls", href: "/tips/change-scope-attachments" },
      ],
    },
    {
      title: "Achievements",
      children: [
        { label: "Impressive (5x Multiplier)", href: "/achievements/impressive-achievement" },
        { label: "I'm the Bird Now", href: "/achievements/im-the-bird-now-achievement" },
        { label: "Handyman (Bare-Hand Boss)", href: "/achievements/handyman-achievement" },
        { label: "Everyone's Dream (Seagull)", href: "/achievements/everyones-dream-achievement" },
        { label: "Rich! Millionaire", href: "/achievements/rich-millionaire-achievement" },
        { label: "360 No Scope", href: "/achievements/360-no-scope-achievement" },
      ],
    },
  ],

  // 栏目简介（栏目页 L2 顶部一段话）
  sectionIntros: {
    guides:
      "Everything about How to Fish itself — what the game is, where to buy it, when it launched, and how its record-breaking Steam debut went down.",
    walkthrough:
      "The complete island-by-island route through How to Fish: exact buy orders, boss summons, and the fastest path from Lighthouse Island to the speedboat ending.",
    fish:
      "All 49 fish species across the five islands, with every mini-boss, main boss, summon requirement, and the rare-fish hunt on each shore.",
    weapons:
      "Every weapon that matters in How to Fish — damage numbers, upgrade order, and which gun carries each island.",
    multiplayer:
      "Fixes for How to Fish co-op: black screens, dead room codes, version mismatch errors, and the lobby settings that make four-player sessions work.",
    tips:
      "Practical How to Fish know-how: dynamite economics, friendly fire control, and the scope keybinds the game never explains.",
    achievements:
      "Step-by-step achievement help for How to Fish, using the official Steam achievement names and the cleanest unlock routes.",
  },

  // 栏目兑底图池：内容页缺图时按栏目取图，避免与右栏 keyart 同图同屏
  sectionFallbackImages: {
    guides: "/images/guides/200k-concurrent-players.webp",
    walkthrough: "/images/walkthrough/all-islands-walkthrough-1.webp",
    fish: "/images/fish/lighthouse-island-fish.webp",
    weapons: "/images/weapons/best-weapons-1.webp",
    multiplayer: "/images/multiplayer/room-code-not-working.webp",
    tips: "/images/tips/dynamite-guide.webp",
    achievements: "/images/achievements/impressive-achievement.webp",
  },

  footer: {
    copyright:
      "Fan-made wiki. Not affiliated with Dazed Games.",
    contactLabel: "Contact",
  },

  ads: {
    /** 左右浮动竖幅（原站 sidebar 单元迁移） */
    sideRail: `<script async="async" data-cfasync="false" src="https://pl31112755.profitableratecpmnetwork.com/09e0e9ff97264497701ef8a372063a7c/invoke.js"></script>
<div id="container-09e0e9ff97264497701ef8a372063a7c"></div>`,
    /** 页面底部 banner（原站 footerBanner 728×90 迁移） */
    footerBanner: `<script>
 atOptions = {
 'key' : '4b991ffec51fbc53b6d9e1f0846c03f2',
 'format' : 'iframe',
 'height' : 90,
 'width' : 728,
 'params' : {}
 };
</script>
<script src="https://www.highrevenueformat.com/4b991ffec51fbc53b6d9e1f0846c03f2/invoke.js"></script>`,
  },
};
