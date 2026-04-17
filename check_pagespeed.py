import re, glob, os

base = 'c:/Users/tonci/Desktop/public_html/ApartmentsTOJO/TOJO1'
files = sorted(glob.glob(base + '/*.html'))

for fpath in files:
    fname = os.path.basename(fpath)
    if 'google' in fname.lower():
        continue
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Strip noscript blocks to avoid false positives
    clean = re.sub(r'<noscript>.*?</noscript>', '', content, flags=re.DOTALL)

    issues = []

    # Render-blocking CSS (not deferred via media=print)
    for m in re.finditer(r'<link([^>]+)>', clean):
        attrs = m.group(1)
        if 'stylesheet' in attrs and 'media="print"' not in attrs and 'fonts.googleapis' not in attrs:
            href_m = re.search(r'href="([^"]+)"', attrs)
            if href_m:
                issues.append('BLOCKING CSS: ' + href_m.group(1).split('/')[-1][:50])

    # Missing meta description
    if 'name="description"' not in content:
        issues.append('MISSING meta description')

    # Missing canonical
    if 'rel="canonical"' not in content:
        issues.append('MISSING canonical')

    # Missing viewport
    if 'name="viewport"' not in content:
        issues.append('MISSING viewport')

    # Images without alt (eager only)
    for m in re.finditer(r'<img([^>]+)>', content):
        attrs = m.group(1)
        if 'loading="lazy"' in attrs:
            continue
        if 'alt=' not in attrs:
            src_m = re.search(r'src="([^"]+)"', attrs)
            src = src_m.group(1).split('/')[-1][:40] if src_m else '?'
            issues.append('NO ALT on eager img: ' + src)

    # JS scripts without defer/async (check full tag, not just part before src)
    blocking_scripts = []
    for m in re.finditer(r'<script([^>]*)>', clean):
        full_attrs = m.group(1)
        src_m = re.search(r'src="([^"]+)"', full_attrs)
        if not src_m:
            continue
        src = src_m.group(1)
        if 'defer' not in full_attrs and 'async' not in full_attrs and 'cdn-cgi' not in src and 'googletagmanager' not in src:
            blocking_scripts.append(src.split('/')[-1][:40])
    if blocking_scripts:
        issues.append('BLOCKING JS: ' + ', '.join(blocking_scripts))

    # Hero preload?
    has_preload = 'rel="preload" as="image"' in content

    print('\n--- %s ---' % fname)
    if issues:
        for iss in issues:
            print('  [!] ' + iss)
    else:
        print('  [OK] no major issues')
    if has_preload:
        print('  [OK] hero preload present')
