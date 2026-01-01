import React, { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';

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

interface HeaderProps {
  menuItems?: MenuItem[];
}

const MENU_ORDER = ['Servicios', 'Soluciones', 'Plataformas', 'Sectores', 'Portfolio', 'Nosotros', 'Blog'];

export default function Header({ menuItems = [] }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ordenar menú según el orden especificado
  const orderedMenuItems = React.useMemo(() => {
    const itemMap = new Map<string, MenuItem>();
    menuItems.forEach(item => {
      itemMap.set(item.label, item);
    });

    return MENU_ORDER
      .map(label => itemMap.get(label))
      .filter((item): item is MenuItem => item !== undefined);
  }, [menuItems]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header Flotante Sticky */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
        style={{
          background: isScrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: isScrolled 
            ? '0 4px 20px rgba(27, 85, 133, 0.08)' 
            : '0 2px 10px rgba(27, 85, 133, 0.05)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img 
                  src="/images/logo-ecomm360-2026.png" 
                  alt="eComm360" 
                  className={`transition-all duration-300 ${
                    isScrolled ? 'h-10' : 'h-12'
                  }`}
                  style={{ maxWidth: '200px' }}
                />
              </a>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center space-x-1">
              {orderedMenuItems.map(item => {
                const hasSubmenu = item.childItems?.edges && item.childItems.edges.length > 0;
                
                return (
                  <div key={item.id} className="relative group">
                    {hasSubmenu ? (
                      <button
                        className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
                        style={{
                          color: '#1B5585',
                          fontFamily: "'Sora', sans-serif"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#55C7DC';
                          e.currentTarget.style.background = 'rgba(85, 199, 220, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#1B5585';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <span className="flex items-center space-x-1">
                          <span>{item.label}</span>
                          <svg 
                            className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>
                    ) : (
                      <a
                        href={item.url || '#'}
                        className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
                        style={{
                          color: '#1B5585',
                          fontFamily: "'Sora', sans-serif"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#55C7DC';
                          e.currentTarget.style.background = 'rgba(85, 199, 220, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#1B5585';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        {item.label}
                      </a>
                    )}

                    {/* Desktop Submenu */}
                    {hasSubmenu && (
                      <div 
                        className="absolute left-0 top-full mt-2 w-64 rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                        style={{
                          background: 'rgba(255, 255, 255, 0.98)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          boxShadow: '0 10px 40px rgba(27, 85, 133, 0.15)',
                          border: '1px solid rgba(27, 85, 133, 0.1)'
                        }}
                      >
                        {item.childItems.edges.map(({ node: subItem }) => (
                          <a
                            key={subItem.id}
                            href={subItem.url || '#'}
                            className="block px-5 py-2.5 text-sm transition-all duration-200"
                            style={{
                              color: '#646464',
                              fontFamily: "'Inter', sans-serif"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#1B5585';
                              e.currentTarget.style.background = 'rgba(85, 199, 220, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#646464';
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <a 
                href="/contacto" 
                className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #1B5585 0%, #55C7DC 100%)',
                  fontFamily: "'Sora', sans-serif"
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col space-y-1.5 p-2"
              aria-label="Menú"
            >
              <span
                className="w-6 h-0.5 rounded transition-all duration-300"
                style={{
                  background: '#1B5585',
                  transform: isMobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none'
                }}
              />
              <span
                className="w-6 h-0.5 rounded transition-all duration-300"
                style={{
                  background: '#1B5585',
                  opacity: isMobileMenuOpen ? 0 : 1
                }}
              />
              <span
                className="w-6 h-0.5 rounded transition-all duration-300"
                style={{
                  background: '#1B5585',
                  transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={orderedMenuItems}
      />

      {/* Spacer para que el contenido no quede debajo del header */}
      <div className={`transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`} />
    </>
  );
}
