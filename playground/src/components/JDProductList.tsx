import React from 'react';
import { Product, formatPrice, formatSales } from '@/data/products';
import { jdTheme } from '@/data/themes';
import { Star, ShoppingCart } from 'lucide-react';

interface JDProductListProps {
  products: Product[];
}

const theme = jdTheme;

export const JDProductList: React.FC<JDProductListProps> = ({ products }) => {
  return (
    <div style={{ background: theme.colors.pageBg, minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <nav
        style={{
          background: theme.colors.navBg,
          padding: '10px 0',
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
            padding: '0 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span
              style={{
                color: theme.colors.navText,
                fontSize: '24px',
                fontWeight: 700,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              JD
            </span>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['首页', '秒杀', '优惠券', '排行榜'].map((item) => (
                <span
                  key={item}
                  style={{
                    color: theme.colors.navText,
                    fontSize: '14px',
                    fontFamily: theme.typography.fontFamily,
                    cursor: 'pointer',
                    opacity: 0.9,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          {/* Search Bar */}
          <div style={{ flex: 1, maxWidth: '500px', margin: '0 24px' }}>
            <div style={{ display: 'flex' }}>
              <input
                type="text"
                placeholder="搜索商品"
                style={{
                  flex: 1,
                  padding: '8px 16px',
                  border: theme.components.searchInput.border,
                  borderRight: 'none',
                  borderRadius: '20px 0 0 20px',
                  outline: 'none',
                  fontSize: '14px',
                  fontFamily: theme.typography.fontFamily,
                }}
              />
              <button
                style={{
                  background: theme.colors.accent,
                  color: '#fff',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '0 20px 20px 0',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontFamily: theme.typography.fontFamily,
                }}
              >
                搜索
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ShoppingCart size={20} color={theme.colors.navText} />
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div
        style={{
          maxWidth: theme.layout.maxWidth,
          margin: '0 auto',
          padding: '20px 16px',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <h2
            style={{
              fontSize: theme.typography.sizes.sectionHeading,
              fontWeight: theme.typography.headingWeight,
              color: theme.colors.primaryText,
              fontFamily: theme.typography.fontFamily,
              margin: 0,
            }}
          >
            为你推荐
          </h2>
          <span
            style={{
              color: theme.colors.link,
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: theme.typography.fontFamily,
            }}
          >
            查看更多 &gt;
          </span>
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
            <JDProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const JDProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: theme.colors.cardBg,
        borderRadius: theme.components.card.borderRadius,
        boxShadow: isHovered
          ? theme.components.card.hoverShadow
          : theme.components.card.shadow,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {/* Product Image */}
      <div
        style={{
          position: 'relative',
          paddingBottom: '100%',
          background: '#f8f8f8',
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
          }}
          loading="lazy"
        />
        {/* Badge */}
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
              fontWeight: 600,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: '12px' }}>
        {/* Title */}
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

        {/* Tags */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
          {product.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: theme.colors.promotionBg,
                color: theme.colors.accent,
                padding: '1px 6px',
                borderRadius: '2px',
                fontSize: '11px',
                fontFamily: theme.typography.fontFamily,
                border: `1px solid ${theme.colors.accent}33`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
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

        {/* Rating & Sales */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(product.rating) ? '#f7a64c' : '#ddd'}
                color={i < Math.floor(product.rating) ? '#f7a64c' : '#ddd'}
              />
            ))}
            <span
              style={{
                fontSize: '12px',
                color: theme.colors.secondaryText,
                marginLeft: '4px',
                fontFamily: theme.typography.fontFamily,
              }}
            >
              {product.rating}
            </span>
          </div>
          <span
            style={{
              fontSize: '12px',
              color: theme.colors.tertiaryText,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {formatSales(product.sales)}人已购
          </span>
        </div>

        {/* Shop */}
        <div
          style={{
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: `1px solid ${theme.colors.border}`,
          }}
        >
          <span
            style={{
              fontSize: '12px',
              color: theme.colors.secondaryText,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {product.shop}
          </span>
        </div>

        {/* Action Button */}
        <button
          style={{
            width: '100%',
            marginTop: '10px',
            background: theme.components.button.background,
            color: '#fff',
            border: 'none',
            padding: theme.components.button.padding,
            borderRadius: theme.components.button.borderRadius,
            fontSize: '14px',
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
          加入购物车
        </button>
      </div>
    </div>
  );
};

export default JDProductList;
