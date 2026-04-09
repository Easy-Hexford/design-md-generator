import React, { useState } from 'react';
import { themes, DesignTheme } from '@/data/themes';
import { products } from '@/data/products';
import { JDProductList } from '@/components/JDProductList';
import { TaobaoProductList } from '@/components/TaobaoProductList';
import { DesignInfoPanel } from '@/components/DesignInfoPanel';
import { Palette, LayoutGrid, Eye } from 'lucide-react';

function App() {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(themes[0].id);
  const selectedTheme = themes.find((t) => t.id === selectedThemeId) || themes[0];

  const renderProductList = () => {
    switch (selectedThemeId) {
      case 'jd':
        return <JDProductList products={products} />;
      case 'taobao':
        return <TaobaoProductList products={products} />;
      default:
        return <JDProductList products={products} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Playground Header */}
      <header
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Palette size={20} color="#fff" />
            </div>
            <div>
              <h1
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#0f172a',
                  margin: 0,
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                Design Playground
              </h1>
              <p
                style={{
                  fontSize: '12px',
                  color: '#94a3b8',
                  margin: 0,
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                电商设计风格预览 · 同一数据，不同风格
              </p>
            </div>
          </div>

          {/* Theme Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LayoutGrid size={16} color="#64748b" />
            <span
              style={{
                fontSize: '13px',
                color: '#64748b',
                fontFamily: 'system-ui, sans-serif',
                marginRight: '4px',
              }}
            >
              选择风格：
            </span>
            <div
              style={{
                display: 'flex',
                gap: '6px',
                background: '#f1f5f9',
                padding: '4px',
                borderRadius: '10px',
              }}
            >
              {themes.map((theme) => (
                <ThemeButton
                  key={theme.id}
                  theme={theme}
                  isSelected={selectedThemeId === theme.id}
                  onClick={() => setSelectedThemeId(theme.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Design Info Panel */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '16px 24px 0',
        }}
      >
        <DesignInfoPanel theme={selectedTheme} />
      </div>

      {/* Preview Area */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px 40px',
        }}
      >
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          }}
        >
          {/* Preview Header */}
          <div
            style={{
              background: '#ffffff',
              padding: '10px 16px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Eye size={14} color="#94a3b8" />
            <span
              style={{
                fontSize: '13px',
                color: '#64748b',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              预览 · {selectedTheme.name} ({selectedTheme.nameEn}) 风格
            </span>
            <div style={{ flex: 1 }} />
            {/* Browser dots */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ff5f57',
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#febc2e',
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#28c840',
                }}
              />
            </div>
          </div>

          {/* Rendered Product List */}
          <div style={{ background: selectedTheme.colors.pageBg }}>
            {renderProductList()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Theme selector button component
const ThemeButton: React.FC<{
  theme: DesignTheme;
  isSelected: boolean;
  onClick: () => void;
}> = ({ theme, isSelected, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      background: isSelected ? '#ffffff' : 'transparent',
      boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontFamily: 'system-ui, sans-serif',
    }}
  >
    <div
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '6px',
        background: theme.colors.accent,
        border: isSelected ? `2px solid ${theme.colors.accent}` : '2px solid transparent',
      }}
    />
    <span
      style={{
        fontSize: '13px',
        fontWeight: isSelected ? 600 : 400,
        color: isSelected ? '#0f172a' : '#64748b',
      }}
    >
      {theme.name}
    </span>
  </button>
);

export default App;
