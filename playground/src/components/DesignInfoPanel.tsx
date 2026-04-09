import React from 'react';
import { DesignTheme } from '@/data/themes';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DesignInfoPanelProps {
  theme: DesignTheme;
}

export const DesignInfoPanel: React.FC<DesignInfoPanelProps> = ({ theme }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        marginBottom: '16px',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: theme.colors.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            {theme.name[0]}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#1f2937' }}>
              {theme.name} ({theme.nameEn}) 设计规范
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
              {theme.description}
            </div>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp size={20} color="#6b7280" />
        ) : (
          <ChevronDown size={20} color="#6b7280" />
        )}
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div
          style={{
            padding: '0 20px 20px',
            borderTop: '1px solid #f3f4f6',
          }}
        >
          {/* Color Palette */}
          <div style={{ marginTop: '16px' }}>
            <h4
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              色彩系统
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { label: '主色', color: theme.colors.accent },
                { label: '页面背景', color: theme.colors.pageBg },
                { label: '卡片背景', color: theme.colors.cardBg },
                { label: '主文本', color: theme.colors.primaryText },
                { label: '次文本', color: theme.colors.secondaryText },
                { label: '价格', color: theme.colors.price },
                { label: '导航', color: theme.colors.navBg },
                { label: '边框', color: theme.colors.border },
                { label: '促销背景', color: theme.colors.promotionBg },
              ].map(({ label, color }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    background: '#f9fafb',
                    borderRadius: '6px',
                    fontSize: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px',
                      background: color,
                      border: '1px solid #e5e7eb',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ color: '#6b7280' }}>{label}</span>
                  <code
                    style={{
                      fontSize: '11px',
                      color: '#9ca3af',
                      fontFamily: 'monospace',
                    }}
                  >
                    {color}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div style={{ marginTop: '16px' }}>
            <h4
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              字体排版
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px',
              }}
            >
              <InfoItem label="主字体" value={theme.typography.fontFamily.split(',')[0].replace(/"/g, '')} />
              <InfoItem label="价格字体" value={theme.typography.priceFont.split(',')[0].replace(/"/g, '')} />
              <InfoItem label="标题字重" value={String(theme.typography.headingWeight)} />
              <InfoItem label="正文字重" value={String(theme.typography.bodyWeight)} />
              <InfoItem label="标题大小" value={theme.typography.sizes.sectionHeading} />
              <InfoItem label="正文大小" value={theme.typography.sizes.body} />
            </div>
          </div>

          {/* Components */}
          <div style={{ marginTop: '16px' }}>
            <h4
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              组件样式
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px',
              }}
            >
              <InfoItem label="卡片圆角" value={theme.components.card.borderRadius} />
              <InfoItem label="按钮圆角" value={theme.components.button.borderRadius} />
              <InfoItem label="卡片阴影" value={theme.components.card.shadow.slice(0, 30) + '...'} />
              <InfoItem label="布局方式" value={theme.layout.style === 'grid' ? '网格布局' : '瀑布流'} />
              <InfoItem label="最大宽度" value={theme.layout.maxWidth} />
              <InfoItem label="间距基数" value={`${theme.layout.baseUnit}px`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div
    style={{
      padding: '8px 12px',
      background: '#f9fafb',
      borderRadius: '6px',
    }}
  >
    <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>{label}</div>
    <div style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{value}</div>
  </div>
);

export default DesignInfoPanel;
