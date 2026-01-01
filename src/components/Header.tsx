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
  const [isSticky, setIsSticky] = useState(false);
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
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header Flotante */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isSticky ? 'py-2' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Contenedor Flotante con Glassmorphism */}
          <div
            className={`
              flex items-center justify-between
              transition-all duration-500
              ${isSticky
                ? 'rounded-2xl px-6 py-3 glass-container shadow-medium'
                : 'rounded-3xl px-8 py-4 glass-container shadow-soft'
              }
            `}
            style={{
              background: isSticky 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(27, 85, 133, 0.1)'
            }}
          >
            {/* Logo eComm360 */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center group">
                <img 
                  src="/images/logo-ecomm360.png" 
                  alt="eComm360" 
                  className={`transition-all duration-300 ${
                    isSticky ? 'h-10' : 'h-12'
                  }`}
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
                        className="
                          px-4 py-2 rounded-xl
                          text-[#1B5585] hover:text-[#55C7DC]
                          hover:bg-[rgba(85,199,220,0.1)]
                          transition-all duration-300
                          font-medium font-['Sora']
                          flex items-center space-x-1
                        "
                      >
                        <span>{item.label}</span>
                        <svg 
                          className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ) : (
                      <a
                        href={item.url || '#'}
                        className="
                          px-4 py-2 rounded-xl
                          text-[#1B5585] hover:text-[#55C7DC]
                          hover:bg-[rgba(85,199,220,0.1)]
                          transition-all duration-300
                          font-medium font-['Sora']
                        "
                      >
                        {item.label}
                      </a>
                    )}

                    {/* Desktop Submenu */}
                    {hasSubmenu && (
                      <div 
                        className="
                          absolute left-0 top-full mt-2 w-64
                          bg-white rounded-2xl shadow-strong
                          opacity-0 invisible
                          group-hover:opacity-100 group-hover:visible
                          transition-all duration-300
                          py-3 z-50
                          border border-[rgba(27,85,133,0.1)]
                        "
                        style={{
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)'
                        }}
                      >
                        {item.childItems.edges.map(({ node: subItem }) => (
                          <a
                            key={subItem.id}
                            href={subItem.url || '#'}
                            className="
                              block px-5 py-2.5
                              text-sm text-[#646464]
                              hover:text-[#1B5585]
                              hover:bg-[rgba(85,199,220,0.05)]
                              transition-all duration-200
                              font-['Inter']
                            "
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
            <div className="hidden lg:flex items-center space-x-4">
              <a href="/contacto" className="btn-primary text-sm">
                Contactar
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col space-y-1.5 focus:outline-none p-2"
              aria-label="Abrir menú"
            >
              <span
                className={`w-6 h-0.5 bg-[#1B5585] rounded transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-[#1B5585] rounded transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-[#1B5585] rounded transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
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

      {/* Spacer */}
      <div className={`transition-all duration-300 ${isSticky ? 'h-20' : 'h-28'}`} />
    </>
  );
}
