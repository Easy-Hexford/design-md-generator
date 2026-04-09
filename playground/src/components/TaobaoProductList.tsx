import React from 'react';
import { Product, formatPrice, formatSales } from '@/data/products';
import { taobaoTheme } from '@/data/themes';
import { Search, Heart, ShoppingBag } from 'lucide-react';

interface TaobaoProductListProps {
  products: Product[];
}

const theme = taobaoTheme;

export const TaobaoProductList: React.FC<TaobaoProductListProps> = ({ products }) => {
  return (
    <div style={{ background: theme.colors.pageBg, minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <nav
        style={{
          background: theme.colors.navBg,
          padding: '12px 0',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          borderBottom: '1px solid #f0f0f0',
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
                color: theme.colors.accent,
                fontSize: '26px',
                fontWeight: 700,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              淘宝
            </span>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['首页', '直播', '猜你喜欢', '新品'].map((item, i) => (
                <span
                  key={item}
                  style={{
                    color: i === 0 ? theme.colors.accent : theme.colors.navText,
                    fontSize: '15px',
                    fontWeight: i === 0 ? 600 : 400,
                    fontFamily: theme.typography.fontFamily,
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  {item}
                  {i === 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '20px',
                        height: '3px',
                        background: theme.colors.accent,
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
          {/* Search Bar */}
          <div style={{ flex: 1, maxWidth: '480px', margin: '0 24px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: theme.components.searchInput.background,
                borderRadius: theme.components.searchInput.borderRadius,
                padding: '8px 16px',
              }}
            >
              <Search size={16} color={theme.colors.tertiaryText} />
              <input
                type="text"
                placeholder="搜索你想要的宝贝"
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '14px',
                  fontFamily: theme.typography.fontFamily,
                  marginLeft: '8px',
                  color: theme.colors.primaryText,
                }}
              />
              <button
                style={{
                  background: theme.components.button.background,
                  color: '#fff',
                  border: 'none',
                  padding: '6px 20px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontFamily: theme.typography.fontFamily,
                  fontWeight: 500,
                }}
              >
                搜索
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ShoppingBag size={20} color={theme.colors.primaryText} />
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
        {/* Category Chips */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}
        >
          {['猜你喜欢', '数码家电', '美妆护肤', '运动户外', '家居生活', '母婴玩具'].map(
            (cat, i) => (
              <span
                key={cat}
                style={{
                  background: i === 0 ? theme.colors.accentLight : '#fff',
                  color: i === 0 ? theme.colors.accent : theme.colors.secondaryText,
                  padding: '6px 16px',
                  borderRadius: '16px',
                  fontSize: '13px',
                  fontFamily: theme.typography.fontFamily,
                  fontWeight: i === 0 ? 500 : 400,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: i === 0 ? `1px solid ${theme.colors.accent}22` : '1px solid #eee',
                }}
              >
                {cat}
              </span>
            )
          )}
        </div>

        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
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
            猜你喜欢
          </h2>
          <span
            style={{
              marginLeft: '8px',
              fontSize: '13px',
              color: theme.colors.tertiaryText,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            根据你的浏览推荐
          </span>
        </div>

        {/* Waterfall Product Grid */}
        <div
          style={{
            columnCount: theme.layout.gridColumns,
            columnGap: theme.layout.gap,
          }}
        >
          {products.map((product, index) => (
            <TaobaoProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TaobaoProductCard: React.FC<{ product: Product; index: number }> = ({
  product,
  index,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  // Simulate waterfall with varying image heights
  const imageHeights = [280, 320, 240, 300, 260, 340, 250, 310, 270, 290, 330, 220];
  const imageHeight = imageHeights[index % imageHeights.length];

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
        marginBottom: theme.layout.gap,
        breakInside: 'avoid',
      }}
    >
      {/* Product Image */}
      <div
        style={{
          position: 'relative',
          height: `${imageHeight}px`,
          background: '#f8f8f8',
          overflow: 'hidden',
        }}
      >
        <img
          src={`${product.image}?h=${imageHeight}`}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          loading="lazy"
        />
        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            transform: isLiked ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <Heart
            size={16}
            fill={isLiked ? '#ff2d54' : 'none'}
            color={isLiked ? '#ff2d54' : '#999'}
          />
        </button>
        {/* Live Badge */}
        {product.tags.includes('热卖') && (
          <span
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              background: `linear-gradient(135deg, ${theme.colors.gradientStart}, ${theme.colors.gradientEnd})`,
              color: '#fff',
              padding: theme.components.badge.padding,
              borderRadius: theme.components.badge.borderRadius,
              fontSize: theme.components.badge.fontSize,
              fontWeight: 600,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            🔥 热卖
          </span>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: '10px 12px 14px' }}>
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
          }}
        >
          {product.title}
        </h3>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                style={{
                  background: theme.colors.accentLight,
                  color: theme.colors.accent,
                  padding: '1px 6px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontFamily: theme.typography.fontFamily,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span
              style={{
                color: theme.colors.price,
                fontSize: '13px',
                fontWeight: 400,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              ¥
            </span>
            <span
              style={{
                color: theme.colors.price,
                fontSize: theme.typography.sizes.priceLarge,
                fontWeight: theme.typography.priceWeight,
                fontFamily: theme.typography.priceFont,
                lineHeight: 1,
              }}
            >
              {formatPrice(product.price)}
            </span>
            <span
              style={{
                color: theme.colors.priceOriginal,
                fontSize: theme.typography.sizes.priceSmall,
                textDecoration: 'line-through',
                fontFamily: theme.typography.fontFamily,
                marginLeft: '4px',
              }}
            >
              ¥{formatPrice(product.originalPrice)}
            </span>
          </div>
        </div>

        {/* Sales & Shop */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '6px',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              color: theme.colors.tertiaryText,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {formatSales(product.sales)}人付款
          </span>
          <span
            style={{
              fontSize: '12px',
              color: theme.colors.secondaryText,
              fontFamily: theme.typography.fontFamily,
              maxWidth: '100px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.shop}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaobaoProductList;
