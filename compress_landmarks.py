import os
from PIL import Image

base = 'c:/Users/tonci/Desktop/public_html/ApartmentsTOJO/TOJO1/images/Znamenitosti'

# The 7 main background images used as CSS backgrounds - these load all at once
targets = [
    'Bedem.webp',
    'Krka.webp',
    'Šibenik.webp',
    'Primošten.webp',
    'Kornati.webp',
    'Barone.webp',
    'KanalSvAnte.webp',
]

MAX_WIDTH = 900
MAX_HEIGHT = 600
QUALITY = 78

for fname in targets:
    path = os.path.join(base, fname)
    if not os.path.exists(path):
        print(f'MISSING: {fname}')
        continue

    orig_size = os.path.getsize(path)
    img = Image.open(path).convert('RGB')
    w, h = img.size

    # Resize maintaining aspect ratio
    ratio = min(MAX_WIDTH / w, MAX_HEIGHT / h)
    if ratio < 1.0:
        new_w = int(w * ratio)
        new_h = int(h * ratio)
        img = img.resize((new_w, new_h), Image.LANCZOS)
    else:
        new_w, new_h = w, h

    img.save(path, 'WEBP', quality=QUALITY, method=6)
    new_size = os.path.getsize(path)

    pct = int((1 - new_size / orig_size) * 100)
    print(f'{fname}: {orig_size//1024}KB -> {new_size//1024}KB ({pct}% smaller), {w}x{h} -> {new_w}x{new_h}')

print('\nDone!')
