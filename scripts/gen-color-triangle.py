# This script is used to generate gradient background image for color wheel
 
from PIL import Image, ImageColor

w = 500
h = 500

def get_pixel(x, y):
    scale = (h / 2 - abs(y - h / 2)) / h * 2
    xx = x * scale
    if x > w: return None
    s = int(x / w * 100)
    v = int(y / h * 100)
    return int(xx), ImageColor.getrgb('hsl(0, {}%, {}%)'.format(s, 100 - v))

im = Image.new('RGB', (w, h))
for x in range(w):
    for y in range(h):
        xx, c = get_pixel(x, y)
        if not c: continue
        im.putpixel((xx, y), c)

im.show()

# print(get_pixel(0, 0))
# print(get_pixel(500, 250))