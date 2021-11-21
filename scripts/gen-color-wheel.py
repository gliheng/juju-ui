# This script is used to generate gradient background image for color wheel
 
from PIL import Image, ImageColor
import math

w = 320
h = 320

def get_pixel(x, y):
    angle = math.atan2(y - h / 2, x - w / 2)
    hue = int(angle / (2 * math.pi) * 360) + 180
    return ImageColor.getrgb('hsl({}, 100%, 50%)'.format(hue))

im = Image.new('RGB', (w, h))
for x in range(w):
    for y in range(h):
        c = get_pixel(x, y)
        im.putpixel((x, y), c)

# im.rotate(180).save('color-wheel.png', 'PNG')
im.show()