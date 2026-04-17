import os, re
from PIL import Image

base = 'c:/Users/tonci/Desktop/public_html/ApartmentsTOJO/TOJO1'

# ── 1. Build image dimensions lookup ─────────────────────────────────────────
print("=== 1. Reading image dimensions ===")
img_dims = {}
for root, dirs, files in os.walk(os.path.join(base, 'images')):
    for fname in files:
        if fname.lower().endswith('.webp'):
            full = os.path.join(root, fname)
            rel  = full.replace(base + os.sep, '').replace('\\', '/')
            try:
                w, h = Image.open(full).size
                img_dims[rel] = (w, h)
            except:
                pass
print(f"  Found {len(img_dims)} images")

# ── 2. Minify CSS ─────────────────────────────────────────────────────────────
print("\n=== 2. Minifying CSS ===")
css_files = ['style.css', 'apartmani.css', 'kontakts.css']

def minify_css(content):
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)  # remove comments
    content = re.sub(r'\s+', ' ', content)                         # collapse whitespace
    content = re.sub(r'\s*([{}:;,>~+])\s*', r'\1', content)       # remove spaces around punctuation
    content = re.sub(r';\}', '}', content)                         # remove last semicolon in block
    return content.strip()

for fname in css_files:
    path = os.path.join(base, fname)
    if not os.path.exists(path): continue
    with open(path, 'r', encoding='utf-8') as f:
        orig = f.read()
    mini = minify_css(orig)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(mini)
    print(f"  {fname}: {len(orig):,} → {len(mini):,} bytes ({100-int(len(mini)/len(orig)*100)}% smaller)")

# ── 3. Minify JS ─────────────────────────────────────────────────────────────
print("\n=== 3. Minifying JS ===")
js_files = ['script.js', 'apartmani.js']

def minify_js(content):
    # Remove single-line comments (careful with URLs)
    content = re.sub(r'(?<!:)//(?!/).*?$', '', content, flags=re.MULTILINE)
    # Remove multi-line comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    # Collapse whitespace (not inside strings - simplified approach)
    content = re.sub(r'\n\s*\n', '\n', content)  # remove blank lines
    content = re.sub(r'[ \t]+', ' ', content)     # collapse horizontal space
    content = re.sub(r'\s*([{}();,=+\-*/<>!&|?:])\s*', r'\1', content)
    content = re.sub(r'\n', ' ', content)
    return content.strip()

for fname in js_files:
    path = os.path.join(base, fname)
    if not os.path.exists(path): continue
    with open(path, 'r', encoding='utf-8') as f:
        orig = f.read()
    mini = minify_js(orig)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(mini)
    print(f"  {fname}: {len(orig):,} → {len(mini):,} bytes ({100-int(len(mini)/len(orig)*100)}% smaller)")

# ── 4. Add width/height to img tags in all HTML files ────────────────────────
print("\n=== 4. Adding image dimensions ===")
html_files = [f for f in os.listdir(base) if f.endswith('.html') and 'google' not in f]

def add_dims_to_img(tag, img_dims):
    if 'width=' in tag and 'height=' in tag:
        return tag
    src_match = re.search(r'src=["\']([^"\']+)["\']', tag)
    if not src_match:
        return tag
    src = src_match.group(1)
    # Normalize src to relative path
    src_rel = src.replace('%20', ' ')
    if src_rel.startswith('images/') or src_rel.startswith('./images/'):
        key = src_rel.lstrip('./')
        dims = img_dims.get(key)
        if dims:
            w, h = dims
            tag = tag[:-1] + f' width="{w}" height="{h}">'
    return tag

total_added = 0
for fname in sorted(html_files):
    path = os.path.join(base, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content

    def replace_img(m):
        global total_added
        result = add_dims_to_img(m.group(0), img_dims)
        if result != m.group(0):
            total_added += 1
        return result

    content = re.sub(r'<img[^>]+>', replace_img, content)

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        added = content.count('width=') - original.count('width=')
        print(f"  {fname}: +{added} dimensions")

print(f"  Total: {total_added} images updated")

# ── 5. Fix HTML accessibility issues ─────────────────────────────────────────
print("\n=== 5. Fixing accessibility ===")

access_fixes = [
    # Fix buttons without accessible names (swiper nav buttons)
    ('<div class="swiper-button-next main-apt-next"></div>',
     '<div class="swiper-button-next main-apt-next" role="button" aria-label="Sljedeći apartman" tabindex="0"></div>'),
    ('<div class="swiper-button-prev main-apt-prev"></div>',
     '<div class="swiper-button-prev main-apt-prev" role="button" aria-label="Prethodni apartman" tabindex="0"></div>'),
    # Booking buttons without text context
    ('class="btn-book nav-cta-btn" id="nav-rezerviraj">REZERVIRAJ SAD',
     'class="btn-book nav-cta-btn" id="nav-rezerviraj" aria-label="Rezerviraj apartman sada">REZERVIRAJ SAD'),
]

for fname in sorted(html_files):
    path = os.path.join(base, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for old, new in access_fixes:
        content = content.replace(old, new)
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  {fname}: accessibility updated")

# ── 6. Fix link text issues ("DETALJI APARTMANA" same for all) ───────────────
print("\n=== 6. Fixing descriptive link text ===")
link_fixes = {
    'index.html': [
        ('href="ApartmanA1.html" class="btn-more">DETALJI APARTMANA',
         'href="apartmana1.html" class="btn-more" aria-label="Detalji apartmana A1">DETALJI APARTMANA'),
        ('href="ApartmanA2.html" class="btn-more">DETALJI APARTMANA',
         'href="apartmana2.html" class="btn-more" aria-label="Detalji apartmana A2">DETALJI APARTMANA'),
        ('href="ApartmanA3.html" class="btn-more">DETALJI APARTMANA',
         'href="apartmana3.html" class="btn-more" aria-label="Detalji apartmana A3">DETALJI APARTMANA'),
    ],
    'index-en.html': [
        ('href="ApartmanA1.html" class="btn-more">APARTMENT DETAILS',
         'href="apartmana1-en.html" class="btn-more" aria-label="Apartment A1 details">APARTMENT DETAILS'),
        ('href="ApartmanA2.html" class="btn-more">APARTMENT DETAILS',
         'href="apartmana2-en.html" class="btn-more" aria-label="Apartment A2 details">APARTMENT DETAILS'),
        ('href="ApartmanA3.html" class="btn-more">APARTMENT DETAILS',
         'href="apartmana3-en.html" class="btn-more" aria-label="Apartment A3 details">APARTMENT DETAILS'),
    ],
}
for fname, fixes in link_fixes.items():
    path = os.path.join(base, fname)
    if not os.path.exists(path): continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for old, new in fixes:
        content = content.replace(old, new)
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  {fname}: link text fixed")

print("\n=== All done! ===")
