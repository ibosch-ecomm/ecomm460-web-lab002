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
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Menu */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-40 transform transition-transform duration-300 pointer-events-none ${
          isOpen ? 'translate-y-0 pointer-events-auto' : '-translate-y-full'
        }`}
      >
        <nav className="absolute top-20 left-0 right-0 mx-4 bg-white rounded-2xl shadow-lg max-h-[calc(100vh-100px)] overflow-y-auto">
          {/* Header del menú */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Menú</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Cerrar menú"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Elementos del menú */}
          <div className="divide-y divide-gray-100">
            {menuItems.map(item => (
              <div key={item.id}>
                <div className="flex items-center justify-between">
                  <a
                    href={item.url || '#'}
                    className="flex-1 px-6 py-4 text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    onClick={onClose}
                  >
                    {item.label}
                  </a>

                  {/* Botón de expansión para submenús */}
                  {item.childItems?.edges && item.childItems.edges.length > 0 && (
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className="px-4 py-4 text-gray-500 hover:text-gray-900 transition-colors"
                      aria-label={`Expandir ${item.label}`}
                    >
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          expandedItems.has(item.id) ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Submenú (Acordeón) */}
                {item.childItems?.edges && item.childItems.edges.length > 0 && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedItems.has(item.id) ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="bg-gray-50 divide-y divide-gray-100">
                      {item.childItems.edges.map(({ node: subItem }) => (
                        <a
                          key={subItem.id}
                          href={subItem.url || '#'}
                          className="block px-6 py-3 pl-12 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          onClick={onClose}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button en el menú móvil */}
          <div className="p-6 border-t border-gray-100">
            <button className="w-full btn-primary text-base">Contactar</button>
          </div>
        </nav>
      </div>
    </>,
    document.body
  );
}
