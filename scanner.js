// Who doesn't follow me? / ¿Quién no me sigue? — v9
// Escáner de seguidores para Instagram que se pega en la consola del navegador.
// Unfollower scanner for Instagram that you paste into the browser console.
//
// ES: Solo lectura. No sigue ni deja de seguir a nadie. Nada sale de tu navegador.
// EN: Read-only. It never follows or unfollows anyone. Nothing leaves your browser.
//
// Licencia MIT / MIT license
(async () => {
  "use strict";

  // ---------- Idiomas / Languages ----------
  const I18N = {
    es: {
      locale: "es-CO",
      notOnIG: "Abre www.instagram.com con tu sesión iniciada y vuelve a pegar el código.",
      title: "¿Quién no me sigue?",
      minimize: "Minimizar", close: "Cerrar", langBtn: "EN", langTitle: "Switch to English",
      sessionErr: "Instagram no reconoce tu sesión. Recarga la página, inicia sesión y vuelve a pegar el código.",
      apiFail: (c, n) => `Instagram no respondió bien (${c}) tras ${n} intentos. Espera unos minutos y vuelve a escanear.`,
      retry: (c, a, m, s) => `Instagram pidió una pausa (${c}). Reintento ${a} de ${m} en ${s} s…`,
      offline: "sin conexión",
      readingFollowing: "Leyendo las cuentas que sigues…",
      readingFollowers: "Leyendo tus seguidores…",
      checking: "Comprobando quién te sigue de vuelta…",
      checked: "Comprobados",
      shortPause: (n) => `Pausa para cuidar tu cuenta (${n} s)…`,
      calm: "Vamos despacio a propósito para cuidar tu cuenta. Si Instagram muestra un aviso de «comportamiento automatizado», no te asustes: no es un bloqueo y tu cuenta no se borra. Ciérralo, recarga la página y espera unas horas antes de volver a escanear.",
      eta: (m) => `Tiempo estimado: unos ${m} min. Puedes minimizar el panel (–) y dejarlo trabajando.`,
      igWarn: "Instagram pausó el escaneo y puede que te muestre un aviso de «comportamiento automatizado». Es solo una precaución, no un bloqueo: ciérralo, recarga la página (F5) e inicia sesión de nuevo si te lo pide. Espera unas horas antes de volver a escanear.",
      slowDown: "Instagram pidió bajar el ritmo, así que el escaneo se detuvo de inmediato para cuidar tu cuenta. Vuelve a intentarlo en unas horas.",
      cooldown: (ago) => `Tu último escaneo fue hace ${ago}. Para no llamar la atención de Instagram, conviene esperar al menos 1 hora entre escaneos.`,
      seeSaved: "Ver resultados guardados", scanAnyway: "Escanear de todos modos",
      preparing: "Preparando…",
      intro: "Revisando las cuentas que sigues. Solo lectura: no se sigue ni se deja de seguir a nadie.",
      following: "Seguidos", followers: "Seguidores",
      cancel: "Cancelar", cancelled: "Escaneo cancelado.", startOver: "Empezar de nuevo", rescan: "Volver a escanear",
      meta: (f, m) => `Sigues a ${f} cuentas; ${m} te siguen de vuelta. `,
      scannedNow: "Escaneado ahora mismo.",
      scannedAgo: (a) => `Escaneado hace ${a}.`, days: "días",
      warnFollowing: (g, e) => `Instagram entregó ${g} de las ${e} cuentas que sigues.`,
      tabNon: (n) => `No te siguen (${n})`,
      statFollowing: "Cuentas que sigues", statBack: "Te siguen de vuelta", statExcluded: "Excluidas",
      scanTitle: "Escaneando tu cuenta", show: "Mostrar panel",
      tabExc: (n) => `Excluidos (${n})`,
      search: "Buscar por usuario o nombre",
      sortNew: "Seguidos más recientemente", sortOld: "Seguidos hace más tiempo", sortAz: "Alfabético",
      hideV: "Ocultar verificadas", hideSeen: "Ocultar abiertas",
      copy: "Copiar lista", csv: "Descargar CSV",
      copied: "Lista copiada.", copyFail: "No se pudo copiar automáticamente. La lista quedó impresa en la consola.",
      csvHead: "usuario,nombre,verificada,privada,perfil", yes: "sí", no: "no",
      files: { non: "no-me-siguen", exc: "excluidos" },
      tagOpened: "Abierto", tagVerified: "Verificada", tagPrivate: "Privada",
      open: "Abrir", exclude: "Excluir", restore: "Restaurar",
      emptyFilter: "Ninguna cuenta coincide con los filtros.",
      empty: { non: "Todas las cuentas que sigues te siguen de vuelta.", exc: "No has excluido ninguna cuenta." },
      more: (n) => `Mostrar más (${n} restantes)`,
      bigOne: "cuenta que sigues no te sigue de vuelta.",
      bigMany: "cuentas que sigues no te siguen de vuelta.",
      done: (n) => `Listo: ${n} cuentas no te siguen de vuelta.`,
    },
    en: {
      locale: "en-US",
      notOnIG: "Open www.instagram.com while logged in and paste the code again.",
      title: "Who doesn't follow me?",
      minimize: "Minimize", close: "Close", langBtn: "ES", langTitle: "Cambiar a español",
      sessionErr: "Instagram doesn't recognize your session. Reload the page, log in and paste the code again.",
      apiFail: (c, n) => `Instagram didn't respond properly (${c}) after ${n} attempts. Wait a few minutes and scan again.`,
      retry: (c, a, m, s) => `Instagram asked for a break (${c}). Retry ${a} of ${m} in ${s} s…`,
      offline: "offline",
      readingFollowing: "Reading the accounts you follow…",
      readingFollowers: "Reading your followers…",
      checking: "Checking who follows you back…",
      checked: "Checked",
      shortPause: (n) => `Pausing to keep your account safe (${n} s)…`,
      calm: "We go slowly on purpose to keep your account safe. If Instagram shows a \"suspected automated behavior\" notice, don't panic: it's not a ban and your account won't be deleted. Dismiss it, reload the page and wait a few hours before scanning again.",
      eta: (m) => `Estimated time: about ${m} min. You can minimize the panel (–) and let it work.`,
      igWarn: "Instagram paused the scan and may show you a \"suspected automated behavior\" notice. It's just a precaution, not a ban: dismiss it, reload the page (F5) and log in again if asked. Wait a few hours before scanning again.",
      slowDown: "Instagram asked us to slow down, so the scan stopped right away to keep your account safe. Try again in a few hours.",
      cooldown: (ago) => `Your last scan was ${ago} ago. To avoid drawing Instagram's attention, wait at least 1 hour between scans.`,
      seeSaved: "See saved results", scanAnyway: "Scan anyway",
      preparing: "Getting ready…",
      intro: "Checking the accounts you follow. Read-only: nobody gets followed or unfollowed.",
      following: "Following", followers: "Followers",
      cancel: "Cancel", cancelled: "Scan cancelled.", startOver: "Start over", rescan: "Scan again",
      meta: (f, m) => `You follow ${f} accounts; ${m} follow you back. `,
      scannedNow: "Scanned just now.",
      scannedAgo: (a) => `Scanned ${a} ago.`, days: "days",
      warnFollowing: (g, e) => `Instagram returned ${g} of the ${e} accounts you follow.`,
      tabNon: (n) => `Not following back (${n})`,
      statFollowing: "Accounts you follow", statBack: "Follow you back", statExcluded: "Excluded",
      scanTitle: "Scanning your account", show: "Show panel",
      tabExc: (n) => `Excluded (${n})`,
      search: "Search by username or name",
      sortNew: "Most recently followed", sortOld: "Followed longest ago", sortAz: "Alphabetical",
      hideV: "Hide verified", hideSeen: "Hide opened",
      copy: "Copy list", csv: "Download CSV",
      copied: "List copied.", copyFail: "Couldn't copy automatically. The list was printed to the console.",
      csvHead: "username,name,verified,private,profile", yes: "yes", no: "no",
      files: { non: "not-following-back", exc: "excluded" },
      tagOpened: "Opened", tagVerified: "Verified", tagPrivate: "Private",
      open: "Open", exclude: "Exclude", restore: "Restore",
      emptyFilter: "No accounts match the filters.",
      empty: { non: "Everyone you follow follows you back.", exc: "You haven't excluded any accounts." },
      more: (n) => `Show more (${n} left)`,
      bigOne: "account you follow doesn't follow you back.",
      bigMany: "accounts you follow don't follow you back.",
      done: (n) => `Done: ${n} accounts don't follow you back.`,
    },
  };

  const APP_ID = "936619743392459";
  const KEYS = { cache: "qnms-cache-v5", excluded: "qnms-excluded-v2", seen: "qnms-seen-v2", lang: "qnms-lang" };
  // Ritmo conservador / Conservative pace
  const PACE = {
    page: [1000, 1800],      // 1–1,8 s entre páginas / between pages
    breakEvery: 25,          // descanso cada 25 páginas / break every 25 pages
    break: [8000, 12000],    // 8–12 s
    phase: [5000, 10000],    // entre leer tus seguidos y comprobarlos / between reading and checking
    checkBatch: 100,         // cuentas comprobadas por consulta / accounts checked per request
    cooldown: 60 * 60 * 1000,      // 1 h entre escaneos / between scans
    cacheAge: 6 * 60 * 60 * 1000,  // resultados guardados 6 h / saved results for 6 h
  };
  const SPEED = Number(window.__qnmsSpeed) || 1; // solo para pruebas / tests only
  const between = ([a, b]) => (a + Math.random() * (b - a)) * SPEED;
  try { localStorage.removeItem("qnms-cache-v4"); } catch {} // caché de versiones anteriores / old cache
  const uid = (document.cookie.match(/(?:^|; )ds_user_id=(\d+)/) || [])[1];

  // ---------- Utilidades / Utilities ----------
  const store = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
  };

  let lang = store.get(KEYS.lang, null);
  if (!I18N[lang]) lang = /^es\b/i.test(navigator.language || "") ? "es" : "en";
  const t = () => I18N[lang];

  if (location.hostname !== "www.instagram.com" || !uid) {
    alert(I18N.es.notOnIG + "\n\n" + I18N.en.notOnIG);
    return;
  }

  class Cancel extends Error {}
  let cancelled = false;

  const nf = (n) => Number(n).toLocaleString(t().locale);
  const sleep = async (ms) => {
    const end = Date.now() + ms;
    while (Date.now() < end) {
      if (cancelled) throw new Cancel();
      await new Promise((r) => setTimeout(r, Math.min(250, end - Date.now())));
    }
  };
  function h(tag, props = {}, ...kids) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === "class") e.className = v;
      else if (k === "style") e.style.cssText = v;
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    e.append(...kids.filter((x) => x != null && x !== false && x !== ""));
    return e;
  }

  // Texto traducible: se vuelve a pintar al cambiar de idioma.
  // Translatable text: repainted whenever the language changes.
  const i18nNodes = new Set();
  function tr(el, fn) {
    const paint = () => { if (el.isConnected || !panel) fn(el); else i18nNodes.delete(paint); };
    fn(el);
    i18nNodes.add(paint);
    return el;
  }
  const T = (tag, key, props = {}) => tr(h(tag, props), (el) => { el.textContent = t()[key]; });
  let onLangChange = null; // la vista actual puede añadir su propio repintado

  // ---------- Estilos y panel / Styles and panel ----------
  document.getElementById("qnms")?.remove();
  document.getElementById("qnms-style")?.remove();

  const style = h("style", { id: "qnms-style" });
  style.textContent = `
#qnms{--bg:#0B0F1A;--s1:#131A29;--s2:#1A2234;--ln:#252F46;--tx:#E9EDF5;--mu:#8D98AF;--ac:#8198FF;--pk:#FF7A9A;--gr:#5FD39A;
  position:fixed;inset:0;z-index:2147483646;display:flex;flex-direction:column;background:var(--bg);color:var(--tx);
  font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;-webkit-font-smoothing:antialiased}
#qnms *{box-sizing:border-box}
#qnms .hd{display:flex;align-items:center;gap:10px;height:64px;padding:0 max(20px,calc((100vw - 1200px)/2));border-bottom:1px solid var(--ln);background:rgba(11,15,26,.92);flex-shrink:0}
#qnms .hd b{flex:1;font-size:17px;display:flex;align-items:center;gap:10px;letter-spacing:-.01em}
#qnms .hd b::before{content:"";width:22px;height:22px;border-radius:7px;background:linear-gradient(135deg,#FFB86B,#FF7A9A 45%,#8198FF);flex-shrink:0}
#qnms button,#qnms a.btn{font:inherit;font-size:14px;cursor:pointer;border-radius:10px;border:1px solid var(--ln);background:var(--s2);color:var(--tx);padding:8px 14px;text-decoration:none;white-space:nowrap;text-align:center;transition:border-color .15s,background .15s}
#qnms button:hover,#qnms a.btn:hover{border-color:var(--ac)}
#qnms .hd button{width:38px;height:38px;padding:0;font-size:18px;line-height:1}
#qnms .hd .lang{width:auto;padding:0 12px;font-size:13px;font-weight:700;letter-spacing:.05em;color:var(--ac)}
#qnms .pri{background:var(--ac)!important;border-color:var(--ac)!important;color:#0B1022!important;font-weight:600}
#qnms .pri:hover{filter:brightness(1.08)}
#qnms .bd{flex:1;overflow:auto}
#qnms .wrap{max-width:1240px;margin:0 auto;padding:32px 20px 64px}
#qnms p{margin:0 0 12px}
#qnms .muted{color:var(--mu)}
#qnms .warn{background:#3A2A12;color:#FFC870;border-radius:12px;padding:12px 16px;margin:0 0 14px}
#qnms .err{background:#3A1E2A;color:#FF9AB2;border-radius:12px;padding:12px 16px;margin:0 0 14px}
#qnms .box{max-width:640px;margin:6vh auto 0;background:var(--s1);border:1px solid var(--ln);border-radius:20px;padding:32px}
#qnms .box h2{margin:0 0 10px;font-size:26px;letter-spacing:-.02em}
#qnms .box .row2{margin-top:18px}
#qnms .prow{margin:18px 0 0}
#qnms .prow .lbl{display:flex;justify-content:space-between;font-weight:600}
#qnms .bar{height:10px;background:var(--s2);border-radius:99px;overflow:hidden;margin:8px 0 0}
#qnms .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--ac),#A8B6FF);border-radius:99px;transition:width .4s}
#qnms .status{margin-top:20px}
#qnms .hero{display:grid;grid-template-columns:1.5fr repeat(3,1fr);gap:14px;margin-bottom:22px}
#qnms .stat{background:var(--s1);border:1px solid var(--ln);border-radius:18px;padding:20px 22px;display:flex;flex-direction:column;justify-content:flex-end}
#qnms .stat .n{font-size:34px;font-weight:800;letter-spacing:-.03em;line-height:1.1}
#qnms .stat .k{color:var(--mu);font-size:14px}
#qnms .stat.main{background:linear-gradient(135deg,#2A1830,#1A1E36);border-color:#3A2A48}
#qnms .stat.main .n{font-size:68px;color:var(--pk)}
#qnms .stat.main .k{color:#C9CFDD;font-size:15px}
#qnms .stat.main .meta{color:var(--mu);font-size:13px;margin-top:8px}
#qnms .bar2{position:sticky;top:0;z-index:2;background:var(--bg);padding:12px 0 14px;margin-bottom:6px;display:flex;flex-wrap:wrap;gap:10px;align-items:center;border-bottom:1px solid var(--ln)}
#qnms .tabs{display:flex;gap:4px;background:var(--s2);border-radius:12px;padding:4px}
#qnms .tabs button{border:0;background:transparent;color:var(--mu);padding:7px 14px}
#qnms .tabs button.on{background:var(--tx);color:#111;font-weight:600}
#qnms input[type=search],#qnms select{font:inherit;font-size:14px;color:var(--tx);background:var(--s2);border:1px solid var(--ln);border-radius:10px;padding:9px 12px;height:40px}
#qnms input[type=search]{flex:1 1 220px;min-width:180px}
#qnms .checks{display:flex;gap:14px;color:var(--mu);font-size:14px}
#qnms .checks label{display:flex;gap:6px;align-items:center;cursor:pointer;white-space:nowrap}
#qnms .acts2{display:flex;gap:8px;flex-wrap:wrap}
#qnms .row2{display:flex;gap:10px;flex-wrap:wrap}
#qnms .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px;margin-top:16px}
#qnms .card{background:var(--s1);border:1px solid var(--ln);border-radius:18px;padding:22px 16px 16px;display:flex;flex-direction:column;align-items:center;text-align:center;min-width:0;transition:border-color .15s,transform .15s}
#qnms .card:hover{border-color:#3A4870;transform:translateY(-2px)}
#qnms .av{position:relative;width:84px;height:84px;border-radius:50%;flex-shrink:0;margin-bottom:12px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:28px;color:#fff;overflow:hidden}
#qnms .av img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
#qnms .card a.u{color:var(--tx);font-weight:650;font-size:15.5px;text-decoration:none;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#qnms .card a.u:hover{text-decoration:underline}
#qnms .fn{color:var(--mu);font-size:13.5px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-height:20px}
#qnms .tags{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;min-height:22px;margin:8px 0 14px}
#qnms .tag{font-size:11.5px;border-radius:99px;padding:2px 9px;background:#202B52;color:var(--ac);white-space:nowrap}
#qnms .tag.seen{background:var(--s2);color:var(--mu)}
#qnms .card .acts{display:flex;gap:8px;width:100%;margin-top:auto}
#qnms .card .acts>*{flex:1}
#qnms .card.seen{opacity:.6}
#qnms .empty{grid-column:1/-1;padding:60px 0;text-align:center;color:var(--mu)}
#qnms .more{display:block;margin:22px auto 0;padding:10px 22px}
@media (max-width:900px){#qnms .hero{grid-template-columns:1fr 1fr}#qnms .stat.main{grid-column:1/-1}}
@media (max-width:520px){#qnms .stat.main .n{font-size:52px}#qnms .grid{grid-template-columns:1fr 1fr}#qnms .box{padding:22px}}
#qnms-pill{position:fixed;right:20px;bottom:20px;z-index:2147483646;font:600 14px system-ui,-apple-system,sans-serif;color:#0B1022;background:#8198FF;border:0;border-radius:99px;padding:12px 18px;box-shadow:0 10px 30px rgba(0,0,0,.4);cursor:pointer}
`;
  document.head.append(style);

  const body = h("div", { class: "bd" });
  const langBtn = h("button", { class: "lang", onclick: () => setLang(lang === "es" ? "en" : "es") });
  document.getElementById("qnms-pill")?.remove();
  const prevOverflow = document.documentElement.style.overflow;
  const lockScroll = (on) => { document.documentElement.style.overflow = on ? "hidden" : prevOverflow; };
  const pill = tr(h("button", { id: "qnms-pill", style: "display:none", onclick: () => { pill.style.display = "none"; panel.style.display = ""; lockScroll(true); } }),
    (el) => { el.textContent = "👀 " + t().show; });
  const minBtn = h("button", { onclick: () => { panel.style.display = "none"; pill.style.display = ""; lockScroll(false); } }, "–");
  const closeBtn = h("button", { onclick: () => { cancelled = true; panel.remove(); pill.remove(); style.remove(); lockScroll(false); } }, "×");
  let panel = null;
  panel = h("div", { id: "qnms" },
    h("div", { class: "hd" }, T("b", "title"), langBtn, minBtn, closeBtn),
    body
  );
  const paintHeader = () => {
    langBtn.textContent = t().langBtn;
    langBtn.title = t().langTitle;
    minBtn.title = t().minimize;
    closeBtn.title = t().close;
    panel.setAttribute("lang", lang);
  };
  paintHeader();
  document.body.append(panel, pill);
  lockScroll(true);

  function setLang(l) {
    lang = l;
    store.set(KEYS.lang, l);
    paintHeader();
    for (const paint of [...i18nNodes]) paint();
    onLangChange?.();
  }

  // ---------- Peticiones a Instagram / Instagram requests ----------
  const csrf = () => (document.cookie.match(/(?:^|; )csrftoken=([^;]+)/) || [])[1] || "";
  async function api(url, setStatus, maxAttempts = 3, body = null) {
    for (let attempt = 1; ; attempt++) {
      if (cancelled) throw new Cancel();
      let res = null;
      try {
        const headers = { "x-ig-app-id": APP_ID, "x-requested-with": "XMLHttpRequest" };
        if (body) Object.assign(headers, { "x-csrftoken": csrf(), "content-type": "application/x-www-form-urlencoded" });
        res = await fetch(url, { method: body ? "POST" : "GET", headers, body, credentials: "include" });
      } catch { /* sin conexión / offline */ }
      const j = res ? await res.json().catch(() => null) : null;
      if (res && res.ok && j && j.status !== "fail") return j;
      const code = res ? res.status : 0;
      // Instagram pidió verificar la cuenta (aviso de "comportamiento automatizado"): parar de inmediato.
      // Instagram wants to verify the account ("automated behavior" notice): stop right away.
      const msg = String(j?.message || "");
      if (/challenge|checkpoint/.test(res?.url || "") || j?.checkpoint_url || j?.challenge || j?.spam ||
          /checkpoint|challenge|feedback_required|login_required/i.test(msg)) throw new Error("igWarn");
      if (code === 401) throw new Error("sessionErr");
      // Con 429 no insistimos: como mucho 2 esperas largas y luego se detiene.
      // On 429 we don't push: at most 2 long waits, then stop.
      if (code === 429) throw new Error("slowDown"); // al primer 429 se detiene / stop on first 429
      if (attempt >= maxAttempts) throw Object.assign(new Error("apiFail"), { args: [code || null, attempt] });
      const wait = 15000 * attempt * SPEED;
      setStatus?.(() => t().retry(code || t().offline, attempt, maxAttempts - 1, Math.round(wait / 1000)));
      await sleep(wait);
    }
  }

  const idOf = (u) => String(u.pk ?? u.pk_id ?? u.id);

  async function getAll(kind, onProgress, setStatus) {
    const label = () => (kind === "following" ? t().readingFollowing : t().readingFollowers);
    const map = new Map();
    let maxId = "", pages = 0;
    do {
      const url = `https://www.instagram.com/api/v1/friendships/${uid}/${kind}/?count=50` +
        (kind === "followers" ? "&search_surface=follow_list_page" : "") +
        (maxId ? `&max_id=${encodeURIComponent(maxId)}` : "");
      const d = await api(url, setStatus);
      for (const u of d.users || []) map.set(idOf(u), u);
      const next = d.next_max_id != null ? String(d.next_max_id) : "";
      if (next && next === maxId) break; // evita bucles si Instagram repite el cursor
      maxId = next;
      pages++;
      onProgress(map.size);
      console.log(`[qnms] ${kind}: ${map.size}`);
      if (maxId) {
        // Ritmo prudente: 1–1,8 s entre páginas y 8–12 s de descanso cada 25 páginas.
        // Careful pace: 1–1.8 s between pages and an 8–12 s break every 25 pages.
        if (pages % PACE.breakEvery === 0) {
          const ms = between(PACE.break);
          setStatus(() => t().shortPause(Math.round(ms / 1000 / SPEED)));
          await sleep(ms);
        } else {
          await sleep(between(PACE.page));
        }
        setStatus(label);
      }
    } while (maxId);
    return [...map.values()];
  }

  // Pregunta a Instagram, en grupos de 100, si cada cuenta que sigues te sigue de vuelta.
  // Mucho más rápido que leer todos tus seguidores. / Asks Instagram, 100 at a time, whether each
  // account you follow follows you back. Much faster than reading all your followers.
  async function checkBack(ids, onProgress, setStatus) {
    const back = new Map();
    for (let i = 0, n = 0; i < ids.length; i += PACE.checkBatch, n++) {
      if (n) {
        if (n % PACE.breakEvery === 0) {
          const ms = between(PACE.break);
          setStatus(() => t().shortPause(Math.round(ms / 1000 / SPEED)));
          await sleep(ms);
          setStatus(() => t().checking);
        } else await sleep(between(PACE.page));
      }
      const chunk = ids.slice(i, i + PACE.checkBatch);
      const d = await api("https://www.instagram.com/api/v1/friendships/show_many/", setStatus, 1,
        "user_ids=" + encodeURIComponent(chunk.join(",")));
      const st = d.friendship_statuses || {};
      for (const id of chunk) {
        if (!st[id] || typeof st[id].followed_by !== "boolean") throw new Error("noCheck");
        back.set(id, st[id].followed_by);
      }
      onProgress(Math.min(ids.length, i + chunk.length));
    }
    return back;
  }

  const errText = (e) => (e.message === "sessionErr" ? t().sessionErr
    : e.message === "igWarn" ? t().igWarn
    : e.message === "slowDown" ? t().slowDown
    : e.message === "apiFail" ? t().apiFail(e.args[0] ?? t().offline, e.args[1])
    : e.message);

  const view = (...kids) => body.replaceChildren(h("div", { class: "wrap" }, h("div", { class: "box" }, ...kids)));

  // ---------- Escaneo / Scan ----------
  const ago = (m) => m < 60 ? `${nf(m)} min` : m < 48 * 60 ? `${nf(Math.floor(m / 60))} h` : `${nf(Math.floor(m / 1440))} ${t().days}`;
  async function scan(force) {
    const prev = store.get(KEYS.cache, null);
    if (force !== true && prev && prev.uid === uid && Date.now() - prev.at < PACE.cooldown) {
      onLangChange = null;
      const mins = () => ago(Math.max(1, Math.round((Date.now() - prev.at) / 60000)));
      view(
        tr(h("div", { class: "warn" }), (el) => { el.textContent = t().cooldown(mins()); }),
        h("div", { class: "row2" },
          T("button", "seeSaved", { class: "pri", onclick: () => showResults(prev) }),
          T("button", "scanAnyway", { onclick: () => scan(true) })));
      return;
    }
    cancelled = false;
    onLangChange = null;
    const bars = {};
    let statusFn = () => t().preparing;
    const status = tr(h("p", { class: "muted status" }), (el) => { el.textContent = statusFn(); });
    const setStatus = (fn) => { statusFn = fn; status.textContent = fn(); };
    const last = {};
    let etaMin = null;
    const eta = tr(h("p", { class: "muted", style: "font-size:12.5px" }), (el) => { el.textContent = etaMin ? t().eta(nf(etaMin)) : ""; });
    let secondLabel = "checked";
    const progressRow = (key) => {
      const num = h("span", {}, "0"), tot = h("span", { class: "muted" }), fill = h("i");
      bars[key] = { num, tot, fill };
      const lbl = key === "following" ? T("span", key) : tr(h("span"), (el) => { el.textContent = t()[secondLabel]; });
      bars[key].lbl = lbl;
      return h("div", { class: "prow" },
        h("div", { class: "lbl" }, lbl, h("span", {}, num, tot)),
        h("div", { class: "bar" }, fill));
    };
    const update = (key, n, total) => {
      last[key] = [n, total];
      const b = bars[key];
      b.num.textContent = nf(n);
      b.tot.textContent = total ? " / " + nf(total) : "";
      b.fill.style.width = total ? Math.min(100, (n / total) * 100) + "%" : "40%";
    };
    onLangChange = () => { for (const k in last) update(k, ...last[k]); };

    view(
      T("h2", "scanTitle"),
      T("p", "intro"),
      T("p", "calm", { class: "muted", style: "font-size:13.5px" }),
      progressRow("following"),
      progressRow("second"),
      status,
      eta,
      T("button", "cancel", { onclick: () => { cancelled = true; } })
    );

    try {
      // Totales del perfil (solo para la barra de progreso y el aviso de datos incompletos).
      // Profile totals (only for the progress bar and the incomplete-data warning).
      let info = null;
      try {
        const count = async (hash, key) => {
          const r = await fetch(`https://www.instagram.com/graphql/query/?query_hash=${hash}&variables={"id":"${uid}","include_reel":"true","fetch_mutual":"false","first":"1"}`, { credentials: "include" });
          const j = await r.json();
          return j?.data?.user?.[key]?.count ?? null;
        };
        info = { following: await count("3dec7e2c57367ef3da3d987d89f9dbc8", "edge_follow") };
        console.log("[qnms] totals:", info);
        if (info.following != null) {
          const pages = Math.ceil(info.following / 50) + Math.ceil(info.following / PACE.checkBatch);
          const avg = (x) => (x[0] + x[1]) / 2;
          const secs = pages * avg(PACE.page) / 1000 + Math.floor(pages / PACE.breakEvery) * avg(PACE.break) / 1000 + avg(PACE.phase) / 1000;
          etaMin = Math.max(1, Math.round(secs / 60));
          eta.textContent = t().eta(nf(etaMin));
        }
      } catch (e) { console.warn("[qnms] Could not read profile totals", e); }

      setStatus(() => t().readingFollowing);
      const following = await getAll("following", (n) => update("following", n, info?.following), setStatus);
      {
        const ms = between(PACE.phase);
        setStatus(() => t().shortPause(Math.round(ms / 1000 / SPEED)));
        await sleep(ms);
      }
      const ids = following.map(idOf);
      let followsBack;
      try {
        setStatus(() => t().checking);
        const back = await checkBack(ids, (n) => update("second", n, ids.length), setStatus);
        followsBack = (id) => back.get(id) === true;
      } catch (e) {
        if (e.message !== "noCheck" && e.message !== "apiFail") throw e;
        // Plan B: si Instagram no responde la comprobación rápida, se leen tus seguidores como antes.
        // Fallback: if the quick check fails, read your followers like before.
        console.warn("[qnms] quick check unavailable, reading followers instead", e.message, e.args || "");
        secondLabel = "followers";
        bars.second.lbl.textContent = t().followers;
        setStatus(() => t().readingFollowers);
        const followers = await getAll("followers", (n) => update("second", n, null), setStatus);
        const set = new Set(followers.map(idOf));
        followsBack = (id) => set.has(id);
      }

      const slim = (u, i) => ({
        id: idOf(u), u: u.username, n: u.full_name || "", v: !!u.is_verified, p: !!u.is_private,
        pic: u.profile_pic_url || "", i,
      });

      const data = {
        uid, at: Date.now(), expected: info,
        counts: { following: following.length },
        mutual: ids.filter(followsBack).length,
        nonFollowers: following.map(slim).filter((x) => !followsBack(x.id)),
      };

      store.set(KEYS.cache, data);
      console.log(t().done(data.nonFollowers.length));
      showResults(data);
    } catch (e) {
      onLangChange = null;
      if (e instanceof Cancel) {
        if (document.body.contains(panel)) {
          view(T("p", "cancelled"), T("button", "startOver", { class: "pri", onclick: () => scan(true) }));
        }
        return;
      }
      console.error(e);
      view(
        tr(h("div", { class: e.message === "igWarn" || e.message === "slowDown" ? "warn" : "err" }), (el) => { el.textContent = errText(e); }),
        T("button", "rescan", { class: "pri", onclick: () => scan() }));
    }
  }

  // ---------- Resultados / Results ----------
  // Los perfiles abiertos solo se recuerdan mientras el panel está abierto: al volver a pegar
  // el código todo aparece como la primera vez. / Opened profiles are only remembered while
  // the panel is open: paste the code again and everything looks like the first time.
  const seen = new Set();
  try { localStorage.removeItem(KEYS.seen); } catch {} // borra marcas de versiones anteriores / clears marks from older versions
  function showResults(data) {
    const excluded = new Set(store.get(KEYS.excluded, []));
    const st = { tab: "non", q: "", hideV: false, hideSeen: false, sort: "new", limit: 120 };

    const big = h("div", { class: "n" });
    const bigTxt = h("div", { class: "k" });
    const meta = h("div", { class: "meta" });
    const statN = { f: h("div", { class: "n" }), b: h("div", { class: "n", style: "color:var(--gr)" }), e: h("div", { class: "n" }) };
    const hero = h("div", { class: "hero" },
      h("div", { class: "stat main" }, big, bigTxt, meta),
      h("div", { class: "stat" }, statN.f, T("div", "statFollowing", { class: "k" })),
      h("div", { class: "stat" }, statN.b, T("div", "statBack", { class: "k" })),
      h("div", { class: "stat" }, statN.e, T("div", "statExcluded", { class: "k" })));
    const warnBox = h("div");

    const paintStatic = () => {
      const mins = Math.round((Date.now() - data.at) / 60000);
      meta.textContent = t().meta(nf(data.counts.following), nf(data.mutual)) +
        (mins < 1 ? t().scannedNow : t().scannedAgo(ago(mins)));
      const warnings = [];
      const exp = data.expected;
      if (exp && exp.following && data.counts.following < exp.following * 0.97) {
        warnings.push(t().warnFollowing(nf(data.counts.following), nf(exp.following)));
      }
      warnBox.replaceChildren(...warnings.map((w) => h("div", { class: "warn" }, w)));
      search.placeholder = t().search;
      for (const o of sort.options) o.textContent = t()[o.dataset.k];
    };

    const tabs = {};
    const mkTab = (key) => (tabs[key] = h("button", { onclick: () => { st.tab = key; st.limit = 120; render(); } }));
    const tabsEl = h("div", { class: "tabs" }, mkTab("non"), mkTab("exc"));

    const search = h("input", { type: "search" });
    search.addEventListener("input", () => { st.q = search.value.trim().toLowerCase().replace(/^@/, ""); st.limit = 120; render(); });

    const sort = h("select", { onchange: (e) => { st.sort = e.target.value; render(); } },
      h("option", { value: "new", "data-k": "sortNew" }),
      h("option", { value: "old", "data-k": "sortOld" }),
      h("option", { value: "az", "data-k": "sortAz" }));

    const check = (key) => {
      const cb = h("input", { type: "checkbox" });
      cb.addEventListener("change", () => { st[key] = cb.checked; st.limit = 120; render(); });
      return h("label", {}, cb, T("span", key));
    };

    const listEl = h("div", { class: "grid" });
    const moreBtn = h("button", { class: "more", onclick: () => { st.limit += 120; render(); } });

    const current = () => {
      let arr;
      if (st.tab === "exc") arr = data.nonFollowers.filter((x) => excluded.has(x.id));
      else arr = data.nonFollowers.filter((x) => !excluded.has(x.id));
      if (st.q) arr = arr.filter((x) => x.u.toLowerCase().includes(st.q) || x.n.toLowerCase().includes(st.q));
      if (st.hideV) arr = arr.filter((x) => !x.v);
      if (st.hideSeen) arr = arr.filter((x) => !seen.has(x.id));
      arr = arr.slice();
      if (st.sort === "az") arr.sort((a, b) => a.u.localeCompare(b.u));
      else if (st.sort === "old") arr.sort((a, b) => b.i - a.i);
      else arr.sort((a, b) => a.i - b.i);
      return arr;
    };

    const copyList = async () => {
      const text = current().map((x) => x.u).join("\n");
      try { await navigator.clipboard.writeText(text); alert(t().copied); }
      catch { console.log(text); alert(t().copyFail); }
    };

    const downloadCsv = () => {
      const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
      const rows = current().map((x) => [x.u, x.n, x.v ? t().yes : t().no, x.p ? t().yes : t().no, `https://www.instagram.com/${x.u}/`].map(esc).join(","));
      const csv = "﻿" + t().csvHead + "\n" + rows.join("\n");
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const a = h("a", { href: url, download: `${t().files[st.tab]}-${new Date().toISOString().slice(0, 10)}.csv` });
      document.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    };

    const GRADS = [["#FFB86B", "#FF7A9A"], ["#8198FF", "#6EE7F9"], ["#7CE38B", "#2BB3A3"], ["#C38BFF", "#FF7AD9"], ["#FFC870", "#FF7A5C"], ["#5CC8FF", "#8198FF"]];
    // Foto de perfil con iniciales de respaldo: si Instagram no deja cargar la foto, se ven las iniciales.
    // Profile photo with initials fallback: if Instagram won't load the photo, the initials show.
    function avatar(x) {
      const g = GRADS[[...x.u].reduce((a, c) => a + c.charCodeAt(0), 0) % GRADS.length];
      const ini = ((x.n || x.u).replace(/[^\p{L}\p{N} ]/gu, "").trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("") || x.u[0] || "?").toUpperCase();
      const box = h("div", { class: "av", style: `background:linear-gradient(135deg,${g[0]},${g[1]})` }, ini);
      if (x.pic) {
        const img = h("img", { alt: "", loading: "lazy", decoding: "async" });
        let tries = 0;
        img.addEventListener("error", () => {
          tries++;
          if (tries === 1) { img.referrerPolicy = "no-referrer"; img.src = x.pic; }
          else if (tries === 2) { img.removeAttribute("referrerpolicy"); img.crossOrigin = "anonymous"; img.src = x.pic; }
          else img.remove();
        });
        img.src = x.pic;
        box.append(img);
      }
      return box;
    }

    function row(x) {
      const url = `https://www.instagram.com/${x.u}/`;
      const card = h("div", { class: seen.has(x.id) ? "card seen" : "card" });
      const seenTag = h("span", { class: "tag seen" }, t().tagOpened);
      const tags = h("div", { class: "tags" },
        seen.has(x.id) && seenTag,
        x.v && h("span", { class: "tag" }, t().tagVerified),
        x.p && h("span", { class: "tag" }, t().tagPrivate));
      const mark = () => {
        if (seen.has(x.id)) return;
        seen.add(x.id);
        card.classList.add("seen"); tags.prepend(seenTag);
      };
      const name = h("a", { class: "u", href: url, target: "_blank", rel: "noopener", onclick: mark, title: "@" + x.u }, "@" + x.u);
      const acts = h("div", { class: "acts" },
        h("a", { class: "btn pri", href: url, target: "_blank", rel: "noopener", onclick: mark }, t().open),
        h("button", {
          onclick: () => {
            excluded.has(x.id) ? excluded.delete(x.id) : excluded.add(x.id);
            store.set(KEYS.excluded, [...excluded]);
            render();
          },
        }, st.tab === "exc" ? t().restore : t().exclude));
      card.append(avatar(x), name, h("div", { class: "fn", title: x.n }, x.n || " "), tags, acts);
      return card;
    }

    function render() {
      const nonCount = data.nonFollowers.filter((x) => !excluded.has(x.id)).length;
      const excCount = data.nonFollowers.length - nonCount;
      big.textContent = nf(nonCount);
      bigTxt.textContent = nonCount === 1 ? t().bigOne : t().bigMany;
      tabs.non.textContent = t().tabNon(nf(nonCount));
      tabs.exc.textContent = t().tabExc(nf(excCount));
      statN.f.textContent = nf(data.counts.following);
      statN.b.textContent = nf(data.mutual);
      statN.e.textContent = nf(excCount);
      for (const [k, b] of Object.entries(tabs)) b.classList.toggle("on", k === st.tab);

      const arr = current();
      listEl.replaceChildren();
      if (!arr.length) {
        const msg = st.q || st.hideV || st.hideSeen ? t().emptyFilter : t().empty[st.tab];
        listEl.append(h("div", { class: "empty" }, msg));
      } else {
        arr.slice(0, st.limit).forEach((x) => listEl.append(row(x)));
      }
      moreBtn.hidden = arr.length <= st.limit;
      moreBtn.textContent = t().more(nf(arr.length - st.limit));
    }

    onLangChange = () => { paintStatic(); render(); };

    body.replaceChildren(h("div", { class: "wrap" },
      hero,
      warnBox,
      h("div", { class: "bar2" },
        tabsEl, search, sort,
        h("div", { class: "checks" }, check("hideV"), check("hideSeen")),
        h("div", { class: "acts2" },
          T("button", "copy", { onclick: copyList }),
          T("button", "csv", { onclick: downloadCsv }),
          T("button", "rescan", { onclick: () => scan() }))),
      listEl,
      moreBtn
    ));
    paintStatic();
    render();
  }

  // ---------- Inicio / Start ----------
  const cached = store.get(KEYS.cache, null);
  if (cached && cached.uid === uid && Date.now() - cached.at < PACE.cacheAge) showResults(cached);
  else scan();
})();
