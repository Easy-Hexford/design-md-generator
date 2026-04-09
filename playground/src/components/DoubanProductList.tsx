import React from 'react';
import { Product, formatPrice, formatSales } from '@/data/products';
import { doubanTheme } from '@/data/themes';
import { Star, Search } from 'lucide-react';

interface DoubanProductListProps {
  products: Product[];
}

const theme = doubanTheme;

export const DoubanProductList: React.FC<DoubanProductListProps> = ({ products }) => {
  return (
    <div style={{ background: theme.colors.pageBg, minHeight: '100vh' }}>
      {/* Navigation Bar - Douban style: clean white with green accent */}
      <nav
        style={{
          background: theme.colors.navBg,
          borderBottom: `1px solid ${theme.colors.border}`,
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: theme.layout.maxWidth,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            {/* Douban Logo */}
            <span
              style={{
                color: theme.colors.accent,
                fontSize: '22px',
                fontWeight: 700,
                fontFamily: theme.typography.fontFamily,
                letterSpacing: '2px',
              }}
            >
              豆瓣
            </span>
            {/* Nav Links */}
            <div style={{ display: 'flex', gap: '20px' }}>
              {['首页', '书影音', '小组', '市集'].map((item, i) => (
                <span
                  key={item}
                  style={{
                    color: i === 3 ? theme.colors.accent : theme.colors.secondaryText,
                    fontSize: '14px',
                    fontFamily: theme.typography.fontFamily,
                    cursor: 'pointer',
                    fontWeight: i === 3 ? 600 : 400,
                    borderBottom: i === 3 ? `2px solid ${theme.colors.accent}` : '2px solid transparent',
                    paddingBottom: '2px',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          {/* Search Bar - Douban style: simple with border */}
          <div style={{ flex: 1, maxWidth: '360px', margin: '0 24px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: theme.components.searchInput.border,
                borderRadius: theme.components.searchInput.borderRadius,
                background: theme.components.searchInput.background,
                padding: '0 12px',
              }}
            >
              <Search size={16} color={theme.colors.tertiaryText} />
              <input
                type="text"
                placeholder="搜索好物"
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px',
                  fontFamily: theme.typography.fontFamily,
                  background: 'transparent',
                  color: theme.colors.primaryText,
                }}
              />
            </div>
          </div>
          {/* User Area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: theme.colors.border,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: theme.colors.tertiaryText,
              }}
            >
              U
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div
        style={{
          maxWidth: theme.layout.maxWidth,
          margin: '0 auto',
          padding: '24px 16px',
        }}
      >
        {/* Section Header - Douban style: understated */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: `1px solid ${theme.colors.border}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '3px',
                height: '18px',
                background: theme.colors.accent,
                borderRadius: '2px',
              }}
            />
            <h2
              style={{
                fontSize: theme.typography.sizes.sectionHeading,
                fontWeight: theme.typography.headingWeight,
                color: theme.colors.primaryText,
                fontFamily: theme.typography.fontFamily,
                margin: 0,
              }}
            >
              豆瓣市集 · 精选好物
            </h2>
          </div>
          <span
            style={{
              color: theme.colors.accent,
              fontSize: '13px',
              cursor: 'pointer',
              fontFamily: theme.typography.fontFamily,
            }}
          >
            查看全部 &gt;
          </span>
        </div>

        {/* Filter Tags - Douban style */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          {['全部', '数码', '图书', '生活', '美妆', '服饰'].map((tag, i) => (
            <span
              key={tag}
              style={{
                padding: '4px 14px',
                borderRadius: theme.components.button.borderRadius,
                fontSize: '13px',
                fontFamily: theme.typography.fontFamily,
                cursor: 'pointer',
                background: i === 0 ? theme.colors.accent : 'transparent',
                color: i === 0 ? '#ffffff' : theme.colors.secondaryText,
                border: i === 0 ? 'none' : `1px solid ${theme.colors.border}`,
                transition: 'all 0.2s',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${theme.layout.gridColumns}, 1fr)`,
            gap: theme.layout.gap,
          }}
        >
          {products.map((product) => (
            <DoubanProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const DoubanProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: theme.colors.cardBg,
        borderRadius: theme.components.card.borderRadius,
        border: theme.components.card.border,
        boxShadow: isHovered ? theme.components.card.hoverShadow : theme.components.card.shadow,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: isHovered ? 'translateY(-1px)' : 'none',
      }}
    >
      {/* Product Image */}
      <div
        style={{
          position: 'relative',
          paddingBottom: '100%',
          background: '#fafafa',
          overflow: 'hidden',
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          }}
          loading="lazy"
        />
        {/* Badge - Douban style: subtle green */}
        {product.badge && (
          <span
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: theme.colors.badgeBg,
              color: theme.colors.badgeText,
              padding: theme.components.badge.padding,
              borderRadius: theme.components.badge.borderRadius,
              fontSize: theme.components.badge.fontSize,
              fontWeight: 500,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: '12px' }}>
        {/* Title - Douban style: clean, no clutter */}
        <h3
          style={{
            fontSize: theme.typography.sizes.productTitle,
            fontWeight: theme.typography.bodyWeight,
            color: theme.colors.primaryText,
            fontFamily: theme.typography.fontFamily,
            margin: '0 0 8px 0',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '42px',
          }}
        >
          {product.title}
        </h3>

        {/* Rating - Douban style: iconic star rating */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '8px',
          }}
        >
          <div style={{ display: 'flex', gap: '1px' }}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                fill={i < Math.floor(product.rating) ? '#ffa500' : '#e0e0e0'}
                color={i < Math.floor(product.rating) ? '#ffa500' : '#e0e0e0'}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: '12px',
              color: '#ffa500',
              fontWeight: 600,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {product.rating}
          </span>
          <span
            style={{
              fontSize: '11px',
              color: theme.colors.tertiaryText,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            ({formatSales(product.sales)})
          </span>
        </div>

        {/* Tags - Douban style: minimal bordered tags */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '10px', flexWrap: 'wrap' }}>
          {product.tags.map((tag) => (
            <span
              key={tag}
              style={{
                color: theme.colors.accent,
                padding: '1px 6px',
                borderRadius: '3px',
                fontSize: '11px',
                fontFamily: theme.typography.fontFamily,
                border: `1px solid ${theme.colors.accent}55`,
                background: theme.colors.promotionBg,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price - Douban style: restrained, not screaming */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '6px',
          }}
        >
          <span
            style={{
              color: theme.colors.price,
              fontSize: theme.typography.sizes.priceLarge,
              fontWeight: theme.typography.priceWeight,
              fontFamily: theme.typography.priceFont,
            }}
          >
            ¥{formatPrice(product.price)}
          </span>
          <span
            style={{
              color: theme.colors.priceOriginal,
              fontSize: theme.typography.sizes.priceSmall,
              textDecoration: 'line-through',
              fontFamily: theme.typography.fontFamily,
            }}
          >
            ¥{formatPrice(product.originalPrice)}
          </span>
        </div>

        {/* Shop */}
        <div
          style={{
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: `1px solid ${theme.colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              color: theme.colors.tertiaryText,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {product.shop}
          </span>
        </div>

        {/* Action Button - Douban style: green, flat, small radius */}
        <button
          style={{
            width: '100%',
            marginTop: '10px',
            background: theme.components.button.background,
            color: '#fff',
            border: 'none',
            padding: theme.components.button.padding,
            borderRadius: theme.components.button.borderRadius,
            fontSize: '13px',
            fontWeight: theme.components.button.fontWeight,
            fontFamily: theme.typography.fontFamily,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = theme.components.button.hoverBackground)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = theme.components.button.background)
          }
        >
          想要
        </button>
      </div>
    </div>
  );
};

export default DoubanProductList;
