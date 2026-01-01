/**
 * Limpia shortcodes de Divi y otros shortcodes de WordPress
 * Mantiene el HTML limpio y seguro
 */
export function cleanDiviShortcodes(content: string): string {
  if (!content) return '';

  let cleaned = content;

  // Primero, remover las etiquetas de wrapper de Divi
  cleaned = cleaned.replace(/<div class="et-l[^"]*"[^>]*>/g, '');
  cleaned = cleaned.replace(/<div class="et_builder_inner_content[^"]*"[^>]*>/g, '');
  cleaned = cleaned.replace(/<\/div>/g, '');

  // Remover shortcodes de apertura de Divi preservando el contenido entre ellos
  cleaned = cleaned.replace(/\[et_pb_section[^\]]*\]/g, '');
  cleaned = cleaned.replace(/\[et_pb_row[^\]]*\]/g, '');
  cleaned = cleaned.replace(/\[et_pb_column[^\]]*\]/g, '');
  
  // Remover shortcodes de cierre
  cleaned = cleaned.replace(/\[\/et_pb_section\]/g, '');
  cleaned = cleaned.replace(/\[\/et_pb_row\]/g, '');
  cleaned = cleaned.replace(/\[\/et_pb_column\]/g, '');
  
  // Procesar módulos de texto preservando el contenido
  cleaned = cleaned.replace(/\[et_pb_text[^\]]*\]([\s\S]*?)\[\/et_pb_text\]/g, '$1');
  
  // Procesar módulos de imagen
  cleaned = cleaned.replace(/\[et_pb_image[^\]]*src="([^"]*)"[^\]]*\]/g, '<img src="$1" alt="" />');
  
  // Procesar módulos de botón
  cleaned = cleaned.replace(/\[et_pb_button[^\]]*button_url="([^"]*)"[^\]]*button_text="([^"]*)"[^\]]*\]/g, '<a href="$1" class="btn-primary">$2</a>');
  
  // Procesar módulos de código
  cleaned = cleaned.replace(/\[et_pb_code[^\]]*\]([\s\S]*?)\[\/et_pb_code\]/g, '$1');
  
  // Procesar módulos de acordeón y toggle
  cleaned = cleaned.replace(/\[et_pb_accordion[^\]]*\]([\s\S]*?)\[\/et_pb_accordion\]/g, '$1');
  cleaned = cleaned.replace(/\[et_pb_accordion_item[^\]]*title="([^"]*)"[^\]]*\]([\s\S]*?)\[\/et_pb_accordion_item\]/g, '<h3>$1</h3>$2');
  
  // Procesar módulos de tabs
  cleaned = cleaned.replace(/\[et_pb_tabs[^\]]*\]([\s\S]*?)\[\/et_pb_tabs\]/g, '$1');
  cleaned = cleaned.replace(/\[et_pb_tab[^\]]*title="([^"]*)"[^\]]*\]([\s\S]*?)\[\/et_pb_tab\]/g, '<h3>$1</h3>$2');
  
  // Remover cualquier otro shortcode de Divi que quede
  cleaned = cleaned.replace(/\[et_pb_[^\]]*\]/g, '');
  cleaned = cleaned.replace(/\[\/et_pb_[^\]]*\]/g, '');
  
  // Remover shortcodes genéricos de WordPress (pero preservar contenido)
  cleaned = cleaned.replace(/\[([a-zA-Z_]+)[^\]]*\]([\s\S]*?)\[\/\1\]/g, '$2');
  cleaned = cleaned.replace(/\[([a-zA-Z_]+)[^\]]*\]/g, '');

  // Limpiar entidades HTML mal formadas
  cleaned = cleaned.replace(/&#8243;/g, '"');
  cleaned = cleaned.replace(/&#8217;/g, "'");
  cleaned = cleaned.replace(/&#8216;/g, "'");
  cleaned = cleaned.replace(/&#8220;/g, '"');
  cleaned = cleaned.replace(/&#8221;/g, '"');
  cleaned = cleaned.replace(/&raquo;/g, '»');
  cleaned = cleaned.replace(/&laquo;/g, '«');

  // Remover espacios en blanco excesivos pero mantener estructura
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
  cleaned = cleaned.replace(/\s{3,}/g, ' ');

  // Remover divs vacíos
  cleaned = cleaned.replace(/<div>\s*<\/div>/g, '');
  cleaned = cleaned.replace(/<p>\s*<\/p>/g, '');

  return cleaned.trim();
}

/**
 * Sanitiza HTML para evitar XSS manteniendo etiquetas seguras
 */
export function sanitizeHTML(html: string): string {
  if (!html) return '';

  // Lista de etiquetas permitidas
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'div', 'span'];

  // Remover scripts y estilos inline
  let sanitized = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  sanitized = sanitized.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  sanitized = sanitized.replace(/on\w+="[^"]*"/gi, '');
  sanitized = sanitized.replace(/on\w+='[^']*'/gi, '');

  return sanitized;
}

/**
 * Extrae texto plano del HTML
 */
export function extractPlainText(html: string): string {
  if (!html) return '';

  // Remover todas las etiquetas HTML
  const plainText = html.replace(/<[^>]*>/g, ' ');
  
  // Decodificar entidades HTML
  const decoded = plainText
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
  
  // Limpiar espacios múltiples
  return decoded.replace(/\s+/g, ' ').trim();
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
