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
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'top-2' : ''}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className={`bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 transition-all duration-300 ${isScrolled ? 'py-3 px-6' : 'py-4 px-8'}`}>
            <div className="flex items-center justify-between">
              
              {/* Logo */}
              <a href="/" className="flex-shrink-0">
                <img 
                  src="/images/logo-ecomm360-2026.png" 
                  alt="eComm360" 
                  className={`transition-all duration-300 ${isScrolled ? 'h-9' : 'h-11'}`}
                />
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {orderedMenuItems.map(item => {
                  const hasSubmenu = item.childItems?.edges && item.childItems.edges.length > 0;
                  
                  return (
                    <div key={item.id} className="relative group">
                      {hasSubmenu ? (
                        <button className="px-3 py-2 text-sm font-medium text-blue-900 hover:text-cyan-500 hover:bg-cyan-50 rounded-lg transition-colors flex items-center gap-1">
                          {item.label}
                          <svg className="w-4 h-4 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      ) : (
                        <a href={item.url} className="px-3 py-2 text-sm font-medium text-blue-900 hover:text-cyan-500 hover:bg-cyan-50 rounded-lg transition-colors">
                          {item.label}
                        </a>
                      )}

                      {/* Submenu */}
                      {hasSubmenu && (
                        <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                          {item.childItems.edges.map(({ node: subItem }) => (
                            <a
                              key={subItem.id}
                              href={subItem.url}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
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
              <a 
                href="/contacto" 
                className="hidden lg:block px-5 py-2 bg-gradient-to-r from-blue-900 to-cyan-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Contactar
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2"
                aria-label="Menú"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-blue-900 rounded transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`w-full h-0.5 bg-blue-900 rounded transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`w-full h-0.5 bg-blue-900 rounded transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
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
      <div className="h-24" />
    </>
  );
}
