from pathlib import Path

from PIL import Image, ImageDraw

SIZE = 1024
SCALE = 4
canvas = Image.new("RGB", (SIZE * SCALE, SIZE * SCALE), "#F7F0E6")
draw = ImageDraw.Draw(canvas)

def points(items):
    return [(int(x * SCALE), int(y * SCALE)) for x, y in items]

# Terracotta outer arch / doorway silhouette.
draw.polygon(points([(190, 1024), (190, 382), (235, 270), (320, 180), (430, 118), (512, 96), (594, 118), (704, 180), (789, 270), (834, 382), (834, 1024)]), fill="#B9654A")
# Warm cream inner opening to create the arch cut-out.
draw.polygon(points([(306, 1024), (306, 412), (338, 330), (398, 260), (460, 222), (512, 206), (564, 222), (626, 260), (686, 330), (718, 412), (718, 1024)]), fill="#F7F0E6")
# Sage interior panel / floor-plan plane.
draw.polygon(points([(366, 1024), (366, 455), (396, 382), (438, 334), (512, 300), (586, 334), (628, 382), (658, 455), (658, 1024)]), fill="#7F947B")
# Angular terracotta threshold lines.
draw.rectangle((366 * SCALE, 862 * SCALE, 658 * SCALE, 916 * SCALE), fill="#B9654A")
draw.polygon(points([(366, 916), (512, 844), (658, 916), (658, 968), (512, 896), (366, 968)]), fill="#D47A5F")
# Cream sun / small cut-out accent.
draw.ellipse((448 * SCALE, 180 * SCALE, 576 * SCALE, 308 * SCALE), fill="#F7F0E6")
# Small sage floor-plan marker.
draw.rectangle((466 * SCALE, 468 * SCALE, 558 * SCALE, 494 * SCALE), fill="#F7F0E6")

icon = canvas.resize((SIZE, SIZE), Image.Resampling.LANCZOS)
output_paths = [
    Path("/home/ubuntu/roomwise-ai/assets/images/icon.png"),
    Path("/home/ubuntu/roomwise-ai/assets/images/splash-icon.png"),
    Path("/home/ubuntu/roomwise-ai/assets/images/favicon.png"),
    Path("/home/ubuntu/roomwise-ai/assets/images/android-icon-foreground.png"),
]
for output_path in output_paths:
    icon.save(output_path, format="PNG", optimize=True)
