"""
Genera las capturas del README con datos FALSOS (ninguna cuenta real).
Generates the README screenshots with FAKE data (no real accounts).

    pip install playwright && python tools/screenshots.py
"""
import json, random, re, pathlib, urllib.parse
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "docs"
SCRIPT = (ROOT / "scanner.js").read_text(encoding="utf-8")
random.seed(7)

FIRST = ["Valentina", "Santiago", "Mariana", "Mateo", "Isabella", "Sebastián", "Camila", "Nicolás", "Lucía", "Samuel",
         "Sofía", "Tomás", "Daniela", "Martín", "Gabriela", "Emilio", "Paula", "Julián", "Antonia", "Andrés"]
LAST = ["Rojas", "Gómez", "Pardo", "Ríos", "Vega", "Mora", "Silva", "Cruz", "Duarte", "Luna", "Castro", "Reyes"]
BRANDS = ["cafe.del.barrio", "pixel.studio", "ruta.andina", "the.daily.plant", "lofi.beats.co", "bici.urbana",
          "cocina.en.casa", "moda.minimal", "fotos.nocturnas", "viajes.lentos", "diseno.grafico.co", "arte.digital",
          "memes.del.dia", "podcast.curioso", "tech.en.espanol", "yoga.mananero", "libros.y.cafe", "street.food.bog"]

def mk_users(n, prefix):
    users = []
    for i in range(n):
        if i % 4 == 0:
            u = random.choice(BRANDS) + (str(i) if i >= len(BRANDS) * 4 else "")
            name = u.replace(".", " ").title()
        else:
            f, l = random.choice(FIRST), random.choice(LAST)
            base = re.sub(r"[^a-z]", "", (f + l).lower().replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u"))
            u = f"{base}{random.choice(['', '_', '.'])}{random.randint(1, 999)}"
            name = f"{f} {l}"
        users.append({"pk": f"{prefix}{i}", "username": u, "full_name": name,
                      "is_verified": i % 11 == 3, "is_private": i % 5 == 2,
                      "profile_pic_url": f"https://www.instagram.com/mockpic/{prefix}{i}.svg"})
    return users

FOLLOWING = mk_users(412, "f")
MUTUAL = FOLLOWING[:325]                          # 87 no te siguen de vuelta
FANS = mk_users(58, "x")
FOLLOWERS = MUTUAL + FANS
random.shuffle(FOLLOWERS)

PALETTES = [("#FF7A9A", "#FFB86B"), ("#8198FF", "#6EE7F9"), ("#7CE38B", "#2BB3A3"), ("#C38BFF", "#FF7AD9"),
            ("#FFC870", "#FF7A5C"), ("#5CC8FF", "#8198FF")]

def avatar(key):
    a, b = PALETTES[hash(key) % len(PALETTES)]
    u = next((x for x in FOLLOWING + FANS if x["pk"] == key), None)
    ini = "".join(w[0] for w in (u["full_name"] if u else "?").split()[:2]).upper()
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="{a}"/><stop offset="1" stop-color="{b}"/></linearGradient></defs>
<rect width="80" height="80" fill="url(#g)"/><text x="40" y="50" font-family="DejaVu Sans" font-size="28" font-weight="700"
text-anchor="middle" fill="#fff">{ini}</text></svg>"""

FEED = """<!doctype html><html><head><meta charset="utf-8"><title>Instagram</title><style>
body{margin:0;background:#fafafa;font-family:system-ui,sans-serif}
.side{position:fixed;left:0;top:0;bottom:0;width:230px;border-right:1px solid #e3e3e3;background:#fff;padding:28px 18px}
.side i{display:block;height:14px;border-radius:7px;background:#e9e9ee;margin:0 0 26px}
.side i:first-child{height:26px;width:120px;margin-bottom:40px;background:#dcdce2}
.feed{margin-left:300px;width:470px;padding-top:28px}
.stories{display:flex;gap:14px;margin-bottom:26px}.stories b{width:60px;height:60px;border-radius:50%;background:conic-gradient(#ffb86b,#ff7a9a,#c38bff,#ffb86b);padding:3px}
.stories b:after{content:"";display:block;width:100%;height:100%;border-radius:50%;background:#e4e4ea;border:3px solid #fafafa;box-sizing:border-box}
.post{background:#fff;border:1px solid #e3e3e3;border-radius:10px;margin-bottom:22px;overflow:hidden}
.post .h{display:flex;gap:10px;align-items:center;padding:12px}.post .h b{width:34px;height:34px;border-radius:50%;background:#e4e4ea}
.post .h i{height:12px;width:130px;border-radius:6px;background:#e4e4ea}
.post .img{height:420px;background:linear-gradient(135deg,#e8e6f5,#f5e9ee)}
</style></head><body><div class="side"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
<div class="feed"><div class="stories">""" + "<b></b>" * 6 + """</div>
<div class="post"><div class="h"><b></b><i></i></div><div class="img"></div></div>
<div class="post"><div class="h"><b></b><i></i></div><div class="img"></div></div></div></body></html>"""

def handler(slow, checkpoint_after=None):
    def handle(route):
        url = route.request.url
        p = urllib.parse.urlparse(url)
        q = urllib.parse.parse_qs(p.query)
        if p.path.startswith("/mockpic/"):
            return route.fulfill(body=avatar(p.path.split("/")[-1][:-4]), content_type="image/svg+xml")
        if p.path.startswith("/graphql/"):
            key = "edge_follow" if "3dec7e2c" in url else "edge_followed_by"
            n = len(FOLLOWING) if key == "edge_follow" else len(FOLLOWERS)
            return route.fulfill(json={"data": {"user": {key: {"count": n}}}, "status": "ok"})
        m = re.match(r"/api/v1/friendships/\d+/(following|followers)/", p.path)
        if m:
            arr = FOLLOWING if m.group(1) == "following" else FOLLOWERS
            start = int(q.get("max_id", ["0"])[0])
            if checkpoint_after is not None and m.group(1) == "followers" and start >= checkpoint_after:
                return route.fulfill(status=400, json={"message": "checkpoint_required", "checkpoint_url": "/challenge/", "status": "fail"})
            size = 25 if slow else 50
            chunk = arr[start:start + size]
            nxt = start + size if start + size < len(arr) else None
            return route.fulfill(json={"users": chunk, "next_max_id": nxt, "status": "ok"})
        return route.fulfill(body=FEED, content_type="text/html")
    return handle

def run():
    with sync_playwright() as pw:
        br = pw.chromium.launch()
        def page_for(locale, slow=False, checkpoint_after=None):
            ctx = br.new_context(viewport={"width": 1280, "height": 820}, device_scale_factor=2, locale=locale)
            ctx.add_cookies([{"name": "ds_user_id", "value": "123456", "domain": "www.instagram.com", "path": "/"}])
            ctx.route("**/*", handler(slow, checkpoint_after))
            # Acelera las pausas solo en esta simulación / speeds up pauses only in this simulation
            ctx.add_init_script("window.__qnmsSpeed = 0.04")
            pg = ctx.new_page()
            pg.goto("https://www.instagram.com/")
            return ctx, pg

        # 1) Escaneando (ES)
        ctx, pg = page_for("es-CO", slow=True)
        pg.evaluate(SCRIPT)
        pg.wait_for_function("document.querySelector('#qnms .bar i') && parseFloat(document.querySelectorAll('#qnms .bar i')[0].style.width) > 60", timeout=240000)
        pg.screenshot(path=str(OUT / "escaneando.png"))
        ctx.close()

        # 2) Resultados ES, 3) pestaña fans, 4) inglés
        ctx, pg = page_for("es-CO")
        pg.evaluate(SCRIPT)
        pg.wait_for_selector("#qnms .big", timeout=240000)
        pg.wait_for_timeout(800)
        # marca un par como abiertos y excluye uno para que se vea vivo
        pg.evaluate("""() => { const ls = [...document.querySelectorAll('#qnms li')];
            ls[2]?.querySelector('a.u')?.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));
            ls[5]?.querySelector('a.u')?.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true})); }""")
        pg.screenshot(path=str(OUT / "resultados-es.png"))
        pg.locator("#qnms").screenshot(path=str(OUT / "panel-es.png"))

        pg.click("#qnms .lang")
        pg.wait_for_timeout(300)
        pg.screenshot(path=str(OUT / "results-en.png"))
        pg.locator("#qnms").screenshot(path=str(OUT / "panel-en.png"))

        pg.click("#qnms .lang")  # vuelve a ES
        pg.fill("#qnms input[type=search]", "cafe")
        pg.wait_for_timeout(300)
        pg.locator("#qnms").screenshot(path=str(OUT / "buscar.png"))
        pg.fill("#qnms input[type=search]", "")
        pg.click("#qnms .tabs button:nth-child(2)")
        pg.wait_for_timeout(300)
        pg.locator("#qnms").screenshot(path=str(OUT / "no-los-sigues.png"))
        # Enfriamiento: volver a escanear enseguida muestra el aviso de 30 min
        pg.click("#qnms .row2 button:nth-child(3)")
        pg.wait_for_selector("#qnms .warn")
        assert "1 h" in pg.inner_text("#qnms .warn"), "cooldown missing"
        print("cooldown ok")
        ctx.close()

        # 5) Instagram muestra el aviso de "comportamiento automatizado": el escaneo se detiene
        for loc, name in [("es-CO", "aviso-es.png"), ("en-US", "notice-en.png")]:
            ctx, pg = page_for(loc, checkpoint_after=100)
            pg.evaluate(SCRIPT)
            pg.wait_for_selector("#qnms .bd > .warn", timeout=240000)
            pg.locator("#qnms").screenshot(path=str(OUT / name))
            print(name, pg.inner_text("#qnms .bd > .warn")[:80])
            ctx.close()
        br.close()

if __name__ == "__main__":
    run()
    print("ok")
