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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSticky
            ? 'py-2 backdrop-blur-xl bg-white bg-opacity-80 shadow-soft'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isSticky
                ? 'rounded-2xl px-6 py-3 glass-container'
                : 'rounded-3xl px-8 py-4 glass-container'
            }`}
          >
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">e</span>
                </div>
                <span className="font-bold text-xl text-gray-900 hidden sm:inline group-hover:text-blue-600 transition-colors">
                  eComm360
                </span>
              </a>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-1">
              {orderedMenuItems.map(item => (
                <div key={item.id} className="relative group">
                  <a
                    href={item.url || '#'}
                    className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                  >
                    {item.label}
                  </a>

                  {/* Desktop Submenu */}
                  {item.childItems?.edges && item.childItems.edges.length > 0 && (
                    <div className="absolute left-0 mt-0 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                      {item.childItems.edges.map(({ node: subItem }) => (
                        <a
                          key={subItem.id}
                          href={subItem.url || '#'}
                          className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="btn-primary text-sm">Contactar</button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col space-y-1.5 focus:outline-none"
              aria-label="Abrir menú"
            >
              <span
                className={`w-6 h-0.5 bg-gray-900 rounded transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-gray-900 rounded transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-gray-900 rounded transition-all duration-300 ${
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
      <div className="h-24 md:h-20" />
    </>
  );
}
