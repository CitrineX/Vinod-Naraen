import type { BlogPost } from '../types/blog';

// Using Vite's native static compiler macro to read the local files at build-time.
// query: '?raw' ensures Vite treats it as a raw string instead of an asset URL.
const blogModules = import.meta.glob('../content/blog/*.md', { eager: true, query: '?raw', import: 'default' });

function parseFrontmatter(rawString: string): { frontmatter: Record<string, any>; body: string } {
  let raw = rawString;
  
  // Fallback: If Vite unexpectedly compiles the file as a Data URI (Base64) in production, decode it first.
  if (typeof raw === 'string' && raw.startsWith('data:')) {
    const base64Match = raw.match(/base64,(.*)$/);
    if (base64Match) {
      try {
        // Decode Base64 safely handling UTF-8
        raw = decodeURIComponent(escape(atob(base64Match[1])));
      } catch (e) {
        console.error("Failed to decode base64 markdown:", e);
      }
    }
  }

  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw };

  const frontmatterStr = match[1];
  const body = match[2];
  const frontmatter: Record<string, any> = {};

  let currentKey = '';
  let isArray = false;
  const arrayValues: string[] = [];

  // Loop that separates frontmatter fields from the markdown description text
  for (const line of frontmatterStr.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (isArray && trimmed.startsWith('- ')) {
      arrayValues.push(trimmed.slice(2).replace(/^["']|["']$/g, ''));
      continue;
    } else if (isArray) {
      frontmatter[currentKey] = [...arrayValues];
      arrayValues.length = 0;
      isArray = false;
    }

    const kvMatch = trimmed.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      const value = kvMatch[2].trim();
      if (!value) {
        isArray = true;
      } else {
        frontmatter[currentKey] = value.replace(/^["']|["']$/g, '');
      }
    }
  }

  if (isArray && arrayValues.length > 0) {
    frontmatter[currentKey] = [...arrayValues];
  }

  return { frontmatter, body };
}

function markdownToHtml(md: string): string {
  let html = md;
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/^>\s*(.*$)/gm, '<blockquote>$1</blockquote>');
  html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  html = html.replace(/^\d+\.\s*(.*$)/gm, '<li>$1</li>');
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  html = html.replace(/^(?!<[hubloa])(.*\S.*)$/gm, '<p>$1</p>');
  return html;
}

export function getAllBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, raw] of Object.entries(blogModules)) {
    // Depending on Vite version, `as: 'raw'` returns a string directly or an object with default export.
    const content = typeof raw === 'string' ? raw : (raw as any).default || String(raw);
    const { frontmatter, body } = parseFrontmatter(content);

    const slug = path.split('/').pop()?.replace('.md', '') || '';

    posts.push({
      id: (frontmatter.id as string) || slug,
      slug: (frontmatter.slug as string) || slug,
      title: (frontmatter.title as string) || 'Untitled',
      date: (frontmatter.date as string) || '',
      body: markdownToHtml(body),
      excerpt: frontmatter.excerpt as string,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    });
  }

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
