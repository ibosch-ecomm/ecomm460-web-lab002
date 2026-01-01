import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface MenuItem {
  id: string;
  label: string;
  url: string;
  order: number;
  childItems?: {
    edges: Array<{
      node: {
        id: string;
        label: string;
        url: string;
        order: number;
      };
    }>;
  };
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
}

export default function MobileMenu({ isOpen, onClose, menuItems }: MobileMenuProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setOpenSubmenu(null);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleSubmenu = (itemId: string) => {
    setOpenSubmenu(openSubmenu === itemId ? null : itemId);
  };

  if (!mounted) return null;

  const menuContent = (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-300"
        style={{ opacity: isOpen ? 0.5 : 0 }}
        onClick={onClose}
      />

      {/* Menu Panel Fullscreen */}
      <div
        className={`absolute inset-y-0 right-0 w-full bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          maxWidth: '100%',
          overflowY: 'auto'
        }}
      >
        {/* Header del menú */}
        <div 
          className="sticky top-0 z-10 flex items-center justify-between p-6 border-b"
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderColor: 'rgba(27, 85, 133, 0.1)'
          }}
        >
          <img 
            src="/images/logo-ecomm360.png" 
            alt="eComm360" 
            className="h-10"
            style={{ maxWidth: '180px' }}
          />
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all duration-200"
            style={{ color: '#1B5585' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(85, 199, 220, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const hasSubmenu = item.childItems?.edges && item.childItems.edges.length > 0;
              const isSubmenuOpen = openSubmenu === item.id;

              return (
                <li key={item.id}>
                  {hasSubmenu ? (
                    <>
                      {/* Item con submenú */}
                      <button
                        onClick={() => toggleSubmenu(item.id)}
                        className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 text-left"
                        style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: '#1B5585',
                          background: isSubmenuOpen ? 'rgba(85, 199, 220, 0.08)' : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(85, 199, 220, 0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = isSubmenuOpen ? 'rgba(85, 199, 220, 0.08)' : 'transparent';
                        }}
                      >
                        <span>{item.label}</span>
                        <svg
                          className="w-6 h-6 transition-transform duration-300"
                          style={{
                            transform: isSubmenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            color: '#55C7DC'
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Submenú con acordeón */}
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          maxHeight: isSubmenuOpen ? `${item.childItems.edges.length * 60}px` : '0px'
                        }}
                      >
                        <ul className="ml-4 mt-2 space-y-1">
                          {item.childItems.edges.map(({ node: subItem }) => (
                            <li key={subItem.id}>
                              <a
                                href={subItem.url || '#'}
                                onClick={onClose}
                                className="block p-3 pl-6 rounded-lg transition-all duration-200"
                                style={{
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: '1rem',
                                  color: '#646464',
                                  borderLeft: '3px solid transparent'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(85, 199, 220, 0.05)';
                                  e.currentTarget.style.borderLeftColor = '#55C7DC';
                                  e.currentTarget.style.color = '#1B5585';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.borderLeftColor = 'transparent';
                                  e.currentTarget.style.color = '#646464';
                                }}
                              >
                                {subItem.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    /* Item sin submenú */
                    <a
                      href={item.url || '#'}
                      onClick={onClose}
                      className="block p-4 rounded-xl transition-all duration-200"
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#1B5585'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(85, 199, 220, 0.08)';
                        e.currentTarget.style.color = '#55C7DC';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#1B5585';
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          {/* CTA Button */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(27, 85, 133, 0.1)' }}>
            <a
              href="/contacto"
              onClick={onClose}
              className="block w-full text-center p-4 rounded-xl font-semibold text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #1B5585 0%, #55C7DC 100%)',
                fontFamily: "'Sora', sans-serif",
                fontSize: '1.125rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(27, 85, 133, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Contactar
            </a>
          </div>
        </nav>
      </div>
    </div>
  );

  return createPortal(menuContent, document.body);
}
