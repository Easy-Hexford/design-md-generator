// Design theme types and configurations extracted from design.md files

export interface DesignTheme {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  colors: {
    pageBg: string;
    cardBg: string;
    primaryText: string;
    secondaryText: string;
    tertiaryText: string;
    accent: string;
    accentHover: string;
    accentLight: string;
    price: string;
    priceOriginal: string;
    link: string;
    success: string;
    navBg: string;
    navText: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    promotionBg: string;
    gradientStart?: string;
    gradientEnd?: string;
  };
  typography: {
    fontFamily: string;
    priceFont: string;
    headingWeight: number;
    bodyWeight: number;
    priceWeight: number;
    sizes: {
      hero: string;
      sectionHeading: string;
      subHeading: string;
      productTitle: string;
      priceLarge: string;
      priceSmall: string;
      body: string;
      caption: string;
    };
  };
  components: {
    card: {
      borderRadius: string;
      shadow: string;
      hoverShadow: string;
      border: string;
      padding: string;
    };
    button: {
      borderRadius: string;
      padding: string;
      fontWeight: number;
      background: string;
      hoverBackground: string;
    };
    badge: {
      borderRadius: string;
      padding: string;
      fontSize: string;
    };
    searchInput: {
      borderRadius: string;
      background: string;
      border: string;
    };
  };
  layout: {
    maxWidth: string;
    gridColumns: number;
    gap: string;
    baseUnit: number;
    style: 'grid' | 'waterfall';
  };
  shadows: {
    subtle: string;
    standard: string;
    elevated: string;
  };
}

// JD.com (京东) Design Theme
export const jdTheme: DesignTheme = {
  id: 'jd',
  name: '京东',
  nameEn: 'JD.com',
  description: '红色主题、信息密集、网格布局的电商设计风格',
  colors: {
    pageBg: '#f5f5f5',
    cardBg: '#ffffff',
    primaryText: '#333333',
    secondaryText: '#666666',
    tertiaryText: '#999999',
    accent: '#e1251b',
    accentHover: '#c91623',
    accentLight: '#fff1f0',
    price: '#e1251b',
    priceOriginal: '#999999',
    link: '#005aa0',
    success: '#52c41a',
    navBg: '#e1251b',
    navText: '#ffffff',
    border: '#eeeeee',
    badgeBg: '#e1251b',
    badgeText: '#ffffff',
    promotionBg: '#fff1f0',
  },
  typography: {
    fontFamily: '"Microsoft YaHei", "PingFang SC", "Helvetica Neue", sans-serif',
    priceFont: '"Microsoft YaHei", "PingFang SC", sans-serif',
    headingWeight: 700,
    bodyWeight: 400,
    priceWeight: 700,
    sizes: {
      hero: '28px',
      sectionHeading: '22px',
      subHeading: '18px',
      productTitle: '14px',
      priceLarge: '24px',
      priceSmall: '14px',
      body: '14px',
      caption: '12px',
    },
  },
  components: {
    card: {
      borderRadius: '8px',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      hoverShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
      border: 'none',
      padding: '0',
    },
    button: {
      borderRadius: '20px',
      padding: '8px 24px',
      fontWeight: 600,
      background: '#e1251b',
      hoverBackground: '#c91623',
    },
    badge: {
      borderRadius: '4px',
      padding: '2px 8px',
      fontSize: '12px',
    },
    searchInput: {
      borderRadius: '0 20px 20px 0',
      background: '#ffffff',
      border: '2px solid #e1251b',
    },
  },
  layout: {
    maxWidth: '1200px',
    gridColumns: 4,
    gap: '16px',
    baseUnit: 4,
    style: 'grid',
  },
  shadows: {
    subtle: '0 1px 4px rgba(0, 0, 0, 0.04)',
    standard: '0 2px 8px rgba(0, 0, 0, 0.08)',
    elevated: '0 4px 16px rgba(0, 0, 0, 0.12)',
  },
};

// Taobao (淘宝) Design Theme
export const taobaoTheme: DesignTheme = {
  id: 'taobao',
  name: '淘宝',
  nameEn: 'Taobao',
  description: '橙色主题、温暖圆润、瀑布流布局的发现式电商设计风格',
  colors: {
    pageBg: '#f5f5f5',
    cardBg: '#ffffff',
    primaryText: '#3c3c3c',
    secondaryText: '#7f7f7f',
    tertiaryText: '#b0b0b0',
    accent: '#ff5000',
    accentHover: '#e64800',
    accentLight: '#fff5f0',
    price: '#ff5000',
    priceOriginal: '#b0b0b0',
    link: '#ff6600',
    success: '#52c41a',
    navBg: '#ffffff',
    navText: '#3c3c3c',
    border: 'transparent',
    badgeBg: '#ff5000',
    badgeText: '#ffffff',
    promotionBg: '#fff5f0',
    gradientStart: '#ff5000',
    gradientEnd: '#ff2d54',
  },
  typography: {
    fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif',
    priceFont: '"DIN Alternate", "PingFang SC", sans-serif',
    headingWeight: 600,
    bodyWeight: 400,
    priceWeight: 700,
    sizes: {
      hero: '32px',
      sectionHeading: '20px',
      subHeading: '16px',
      productTitle: '14px',
      priceLarge: '22px',
      priceSmall: '12px',
      body: '14px',
      caption: '12px',
    },
  },
  components: {
    card: {
      borderRadius: '12px',
      shadow: '0 1px 6px rgba(0, 0, 0, 0.05)',
      hoverShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
      border: 'none',
      padding: '0',
    },
    button: {
      borderRadius: '24px',
      padding: '10px 28px',
      fontWeight: 600,
      background: 'linear-gradient(135deg, #ff5000, #ff2d54)',
      hoverBackground: 'linear-gradient(135deg, #e64800, #e6274c)',
    },
    badge: {
      borderRadius: '8px',
      padding: '2px 8px',
      fontSize: '11px',
    },
    searchInput: {
      borderRadius: '20px',
      background: '#f5f5f5',
      border: 'none',
    },
  },
  layout: {
    maxWidth: '1190px',
    gridColumns: 4,
    gap: '12px',
    baseUnit: 8,
    style: 'waterfall',
  },
  shadows: {
    subtle: '0 1px 6px rgba(0, 0, 0, 0.05)',
    standard: '0 2px 12px rgba(0, 0, 0, 0.08)',
    elevated: '0 4px 20px rgba(0, 0, 0, 0.12)',
  },
};

// All available themes
export const themes: DesignTheme[] = [jdTheme, taobaoTheme];

export function getThemeById(id: string): DesignTheme | undefined {
  return themes.find(t => t.id === id);
}
