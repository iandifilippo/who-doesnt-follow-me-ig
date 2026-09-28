"""Genera banner, guía de pasos y comparación ES/EN. / Builds banner, steps guide and ES/EN comparison."""
import pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"

BASE = """<!doctype html><meta charset=utf-8><style>
*{box-sizing:border-box}body{margin:0;font-family:"DejaVu Sans",system-ui,sans-serif;color:#E7EBF3}
.wrap{background:radial-gradient(1200px 500px at 85% -10%,#2a2f5c 0,transparent 60%),radial-gradient(900px 400px at -10% 120%,#3a1e3a 0,transparent 60%),#10141F}
</style>"""

BANNER = BASE + """<style>
.wrap{width:1280px;height:420px;display:flex;align-items:center;padding:0 72px;gap:56px;position:relative;overflow:hidden}
.l{flex:1}.kick{font-size:17px;letter-spacing:.14em;text-transform:uppercase;color:#8198FF;font-weight:700}
h1{font-size:56px;line-height:1.05;margin:14px 0 6px;letter-spacing:-.02em}
h2{font-size:30px;font-weight:400;color:#98A2B8;margin:0 0 26px}
.pills{display:flex;gap:10px;flex-wrap:wrap}.pills span{border:1px solid #2F3A52;background:#161C2A;border-radius:99px;padding:8px 16px;font-size:17px}
.card{width:330px;background:#161C2A;border-radius:22px;padding:26px;box-shadow:0 30px 80px rgba(0,0,0,.5);transform:rotate(3deg)}
.big{font-size:92px;font-weight:800;color:#FF7A9A;line-height:1}.m{color:#98A2B8;font-size:17px;margin-top:6px}
.row{display:flex;align-items:center;gap:12px;margin-top:16px}.av{width:38px;height:38px;border-radius:50%}
.row i{flex:1;height:12px;border-radius:6px;background:#2A3448}.row b{width:58px;height:28px;border-radius:8px;background:#8198FF}
</style><div class=wrap><div class=l><div class=kick>Instagram · unfollower scanner</div>
<h1>Who doesn't follow me?</h1><h2>/ ¿Quién no me sigue?</h2>
<div class=pills><span>🔒 Solo lectura · Read-only</span><span>🌐 Español / English</span><span>⚡ Sin instalar nada · No install</span></div></div>
<div class=card><div class=big>87</div><div class=m>cuentas no te siguen de vuelta</div>
<div class=row><div class=av style="background:linear-gradient(135deg,#8198FF,#6EE7F9)"></div><i></i><b></b></div>
<div class=row><div class=av style="background:linear-gradient(135deg,#FF7A9A,#FFB86B)"></div><i></i><b></b></div>
<div class=row><div class=av style="background:linear-gradient(135deg,#7CE38B,#2BB3A3)"></div><i></i><b></b></div></div></div>"""

def steps(lang):
    s = {
        "es": [("1", "Abre Instagram", "Entra a <code>instagram.com</code> en tu computador con tu sesión iniciada."),
               ("2", "Abre la consola", "Presiona <kbd>F12</kbd> (o <kbd>Cmd ⌥ J</kbd> en Mac) y elige la pestaña <b>Console</b>."),
               ("3", "Pega y presiona Enter", "Copia todo <code>scanner.js</code>, pégalo en la consola y dale <kbd>Enter</kbd>. ¡Listo!")],
        "en": [("1", "Open Instagram", "Go to <code>instagram.com</code> on your computer while logged in."),
               ("2", "Open the console", "Press <kbd>F12</kbd> (or <kbd>Cmd ⌥ J</kbd> on Mac) and pick the <b>Console</b> tab."),
               ("3", "Paste and hit Enter", "Copy all of <code>scanner.js</code>, paste it in the console and press <kbd>Enter</kbd>. Done!")],
    }[lang]
    cards = "".join(f"""<div class=c><div class=n>{n}</div><h3>{t}</h3><p>{d}</p></div>""" + ("<div class=arr>→</div>" if n != "3" else "") for n, t, d in s)
    return BASE + """<style>.wrap{width:1280px;padding:48px 56px;display:flex;align-items:stretch;gap:14px}
.c{flex:1;background:#161C2A;border:1px solid #2A3448;border-radius:20px;padding:28px 26px}
.n{width:52px;height:52px;border-radius:50%;background:#8198FF;color:#0E1424;font-weight:800;font-size:26px;display:flex;align-items:center;justify-content:center}
h3{font-size:25px;margin:18px 0 8px}p{font-size:18px;line-height:1.5;color:#B4BCCD;margin:0}
code{background:#232E52;color:#A9B8FF;padding:2px 7px;border-radius:6px;font-size:16px}
kbd{border:1px solid #3A4662;border-bottom-width:3px;background:#1F2739;border-radius:6px;padding:1px 7px;font-size:15px;color:#E7EBF3;font-family:inherit}
.arr{align-self:center;font-size:34px;color:#3A4662}</style><div class=wrap>""" + cards + "</div>"

def compare():
    es = (DOCS / "panel-es.png").as_uri(); en = (DOCS / "panel-en.png").as_uri()
    return BASE + f"""<style>.wrap{{width:1280px;padding:44px 60px;display:flex;gap:40px;justify-content:center;align-items:flex-start}}
figure{{margin:0;text-align:center}}img{{width:500px;border-radius:18px;box-shadow:0 24px 60px rgba(0,0,0,.5)}}
figcaption{{margin-top:16px;font-size:20px;color:#98A2B8}}figcaption b{{color:#E7EBF3}}</style>
<div class=wrap><figure><img src="{es}"><figcaption><b>Español</b> · botón EN para cambiar</figcaption></figure>
<figure><img src="{en}"><figcaption><b>English</b> · ES button to switch</figcaption></figure></div>"""

with sync_playwright() as pw:
    br = pw.chromium.launch()
    pg = br.new_page(viewport={"width": 1280, "height": 400}, device_scale_factor=2)
    for name, html in [("banner", BANNER), ("pasos-es", steps("es")), ("steps-en", steps("en")), ("es-en", compare())]:
        f = DOCS / f"_{name}.html"; f.write_text(html, encoding="utf-8")
        pg.goto(f.as_uri()); pg.wait_for_timeout(300)
        pg.locator(".wrap").screenshot(path=str(DOCS / f"{name}.png"))
        f.unlink()
    br.close()
print("ok")
