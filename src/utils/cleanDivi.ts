/**
 * Limpia shortcodes de Divi y otros shortcodes de WordPress
 * Mantiene el HTML limpio y seguro
 */
export function cleanDiviShortcodes(content: string): string {
  if (!content) return '';

  // Remover shortcodes de Divi
  let cleaned = content.replace(/\[et_pb_[^\]]*\]/g, '');

  // Remover otros shortcodes comunes de WordPress
  cleaned = cleaned.replace(/\[[^\]]*\]/g, '');

  // Remover espacios en blanco excesivos
  cleaned = cleaned.replace(/\n\s*\n/g, '\n');

  return cleaned.trim();
}

/**
 * Sanitiza HTML para evitar XSS manteniendo etiquetas seguras
 */
export function sanitizeHTML(html: string): string {
  if (!html) return '';

  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre'];

  // Crear un elemento temporal para parsear HTML
  const temp = document.createElement('div');
  temp.innerHTML = html;

  // Remover scripts y estilos
  const scripts = temp.querySelectorAll('script, style');
  scripts.forEach(script => script.remove());

  // Limpiar atributos peligrosos
  const allElements = temp.querySelectorAll('*');
  allElements.forEach(element => {
    // Remover todos los atributos excepto los permitidos
    const attrs = Array.from(element.attributes);
    attrs.forEach(attr => {
      if (!['href', 'src', 'alt', 'title'].includes(attr.name)) {
        element.removeAttribute(attr.name);
      }
    });

    // Validar URLs en href y src
    if (element.hasAttribute('href')) {
      const href = element.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#')) {
        element.removeAttribute('href');
      }
    }

    if (element.hasAttribute('src')) {
      const src = element.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('/')) {
        element.removeAttribute('src');
      }
    }
  });

  return temp.innerHTML;
}

/**
 * Extrae texto plano del HTML
 */
export function extractPlainText(html: string): string {
  if (!html) return '';

  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
}

/**
 * Genera un excerpt del contenido
 */
export function generateExcerpt(content: string, length: number = 160): string {
  const plainText = extractPlainText(content);
  if (plainText.length <= length) {
    return plainText;
  }
  return plainText.substring(0, length).trim() + '...';
}
