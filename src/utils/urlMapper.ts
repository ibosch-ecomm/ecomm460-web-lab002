/**
 * Convierte URLs absolutas de WordPress a rutas relativas locales
 */
export function convertWordPressUrl(url: string): string {
  if (!url) return '#';
  
  // Si ya es una ruta relativa, devolverla tal cual
  if (url.startsWith('/')) {
    return url;
  }
  
  // Si es una URL absoluta de WordPress, extraer el path
  try {
    const urlObj = new URL(url);
    
    // Verificar si es del dominio de WordPress
    if (urlObj.hostname === 'web2025.ecomm360.net' || urlObj.hostname === 'www.ecomm360.es') {
      // Devolver el pathname (que incluye el slash inicial)
      return urlObj.pathname;
    }
    
    // Si es de otro dominio, devolver la URL completa
    return url;
  } catch (e) {
    // Si no es una URL válida, devolver tal cual
    return url;
  }
}

/**
 * Procesa un item del menú y convierte su URL
 */
export function processMenuItem(item: any) {
  return {
    ...item,
    url: convertWordPressUrl(item.url),
    childItems: item.childItems?.edges ? {
      edges: item.childItems.edges.map(({ node }: any) => ({
        node: {
          ...node,
          url: convertWordPressUrl(node.url)
        }
      }))
    } : undefined
  };
}

/**
 * Procesa todos los items del menú
 */
export function processMenuItems(menuItems: any[]) {
  return menuItems.map(processMenuItem);
}
