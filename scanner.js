// Who doesn't follow me? / ¿Quién no me sigue? — v7
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
      shortPause: (n) => `Pausa para cuidar tu cuenta (${n} s)…`,
      calm: "Vamos despacio a propósito para cuidar tu cuenta. Si Instagram muestra un aviso de «comportamiento automatizado», no te asustes: no es un bloqueo y tu cuenta no se borra. Ciérralo, recarga la página y espera unas horas antes de volver a escanear.",
      eta: (m) => `Tiempo estimado: unos ${m} min. Puedes minimizar el panel (–) y dejarlo trabajando.`,
      igWarn: "Instagram pausó el escaneo y puede que te muestre un aviso de «comportamiento automatizado». Es solo una precaución, no un bloqueo: ciérralo, recarga la página (F5) e inicia sesión de nuevo si te lo pide. Espera unas horas antes de volver a escanear.",
      slowDown: "Instagram pidió bajar el ritmo, así que el escaneo se detuvo de inmediato para cuidar tu cuenta. Vuelve a intentarlo en unas horas.",
      cooldown: (ago) => `Tu último escaneo fue hace ${ago}. Para no llamar la atención de Instagram, conviene esperar al menos 1 hora entre escaneos.`,
      seeSaved: "Ver resultados guardados", scanAnyway: "Escanear de todos modos",
      preparing: "Preparando…",
      intro: "Leyendo tus listas desde Instagram. Solo lectura: no se sigue ni se deja de seguir a nadie.",
      following: "Seguidos", followers: "Seguidores",
      cancel: "Cancelar", cancelled: "Escaneo cancelado.", startOver: "Empezar de nuevo", rescan: "Volver a escanear",
      meta: (f, fl, m) => `Sigues a ${f}, te siguen ${fl}, ${m} mutuos. `,
      scannedNow: "Escaneado ahora mismo.",
      scannedAgo: (a) => `Escaneado hace ${a}.`, days: "días",
      warnFollowers: (g, e) => `Instagram entregó ${g} de tus ${e} seguidores. Algunas cuentas podrían aparecer por error en "No te siguen"; conviene volver a escanear más tarde.`,
      warnFollowing: (g, e) => `Instagram entregó ${g} de las ${e} cuentas que sigues.`,
      tabNon: (n) => `No te siguen (${n})`,
      tabFans: (n) => `No los sigues (${n})`,
      tabExc: (n) => `Excluidos (${n})`,
      search: "Buscar por usuario o nombre",
      sortNew: "Seguidos más recientemente", sortOld: "Seguidos hace más tiempo", sortAz: "Alfabético",
      hideV: "Ocultar verificadas", hideSeen: "Ocultar abiertas",
      copy: "Copiar lista", csv: "Descargar CSV",
      copied: "Lista copiada.", copyFail: "No se pudo copiar automáticamente. La lista quedó impresa en la consola.",
      csvHead: "usuario,nombre,verificada,privada,perfil", yes: "sí", no: "no",
      files: { non: "no-me-siguen", fans: "no-los-sigo", exc: "excluidos" },
      tagOpened: "Abierto", tagVerified: "Verificada", tagPrivate: "Privada",
      open: "Abrir", exclude: "Excluir", restore: "Restaurar",
      emptyFilter: "Ninguna cuenta coincide con los filtros.",
      empty: { non: "Todas las cuentas que sigues te siguen de vuelta.", fans: "Sigues a todas las cuentas que te siguen.", exc: "No has excluido ninguna cuenta." },
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
      shortPause: (n) => `Pausing to keep your account safe (${n} s)…`,
      calm: "We go slowly on purpose to keep your account safe. If Instagram shows a \"suspected automated behavior\" notice, don't panic: it's not a ban and your account won't be deleted. Dismiss it, reload the page and wait a few hours before scanning again.",
      eta: (m) => `Estimated time: about ${m} min. You can minimize the panel (–) and let it work.`,
      igWarn: "Instagram paused the scan and may show you a \"suspected automated behavior\" notice. It's just a precaution, not a ban: dismiss it, reload the page (F5) and log in again if asked. Wait a few hours before scanning again.",
      slowDown: "Instagram asked us to slow down, so the scan stopped right away to keep your account safe. Try again in a few hours.",
      cooldown: (ago) => `Your last scan was ${ago} ago. To avoid drawing Instagram's attention, wait at least 1 hour between scans.`,
      seeSaved: "See saved results", scanAnyway: "Scan anyway",
      preparing: "Getting ready…",
      intro: "Reading your lists from Instagram. Read-only: nobody gets followed or unfollowed.",
      following: "Following", followers: "Followers",
      cancel: "Cancel", cancelled: "Scan cancelled.", startOver: "Start over", rescan: "Scan again",
      meta: (f, fl, m) => `You follow ${f}, ${fl} follow you, ${m} mutual. `,
      scannedNow: "Scanned just now.",
      scannedAgo: (a) => `Scanned ${a} ago.`, days: "days",
      warnFollowers: (g, e) => `Instagram returned ${g} of your ${e} followers. Some accounts might show up by mistake under "Not following back"; try scanning again later.`,
      warnFollowing: (g, e) => `Instagram returned ${g} of the ${e} accounts you follow.`,
      tabNon: (n) => `Not following back (${n})`,
      tabFans: (n) => `You don't follow (${n})`,
      tabExc: (n) => `Excluded (${n})`,
      search: "Search by username or name",
      sortNew: "Most recently followed", sortOld: "Followed longest ago", sortAz: "Alphabetical",
      hideV: "Hide verified", hideSeen: "Hide opened",
      copy: "Copy list", csv: "Download CSV",
      copied: "List copied.", copyFail: "Couldn't copy automatically. The list was printed to the console.",
      csvHead: "username,name,verified,private,profile", yes: "yes", no: "no",
      files: { non: "not-following-back", fans: "i-dont-follow", exc: "excluded" },
      tagOpened: "Opened", tagVerified: "Verified", tagPrivate: "Private",
      open: "Open", exclude: "Exclude", restore: "Restore",
      emptyFilter: "No accounts match the filters.",
      empty: { non: "Everyone you follow follows you back.", fans: "You follow everyone who follows you.", exc: "You haven't excluded any accounts." },
      more: (n) => `Show more (${n} left)`,
      bigOne: "account you follow doesn't follow you back.",
      bigMany: "accounts you follow don't follow you back.",
      done: (n) => `Done: ${n} accounts don't follow you back.`,
    },
  };

  const APP_ID = "936619743392459";
  const KEYS = { cache: "qnms-cache-v4", excluded: "qnms-excluded-v2", seen: "qnms-seen-v2", lang: "qnms-lang" };
  // Ritmo conservador / Conservative pace
  const PACE = {
    page: [1800, 3000],      // 1,8–3 s entre páginas de 50 cuentas / between pages of 50 accounts
    breakEvery: 10,          // descanso cada 10 páginas / break every 10 pages
    break: [20000, 30000],   // 20–30 s
    phase: [10000, 20000],   // entre "seguidos" y "seguidores" / between following and followers
    cooldown: 60 * 60 * 1000,      // 1 h entre escaneos / between scans
    cacheAge: 6 * 60 * 60 * 1000,  // resultados guardados 6 h / saved results for 6 h
  };
  const SPEED = Number(window.__qnmsSpeed) || 1; // solo para pruebas / tests only
  const between = ([a, b]) => (a + Math.random() * (b - a)) * SPEED;
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
#qnms{position:fixed;top:16px;right:16px;bottom:16px;width:min(430px,calc(100vw - 32px));z-index:2147483646;display:flex;flex-direction:column;background:#161C2A;color:#E7EBF3;font:14px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.45);overflow:hidden}
#qnms.min{bottom:auto}
#qnms *{box-sizing:border-box}
#qnms .hd{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid #2A3448}
#qnms .hd b{flex:1;font-size:15px}
#qnms button,#qnms a.btn{font:inherit;cursor:pointer;border-radius:8px;border:1px solid #2F3A52;background:#1F2739;color:#E7EBF3;padding:6px 10px;text-decoration:none;white-space:nowrap}
#qnms button:hover{border-color:#8198FF}
#qnms .lang{font-size:12px;font-weight:700;letter-spacing:.04em;padding:5px 9px;color:#8198FF}
#qnms .pri{background:#8198FF!important;border-color:#8198FF!important;color:#0E1424!important;font-weight:600}
#qnms .bd{flex:1;overflow:auto;padding:14px 16px 18px}
#qnms.min .bd{display:none}
#qnms p{margin:0 0 10px}
#qnms .big{font-size:52px;font-weight:800;line-height:1;color:#FF7A9A;letter-spacing:-.02em}
#qnms .muted{color:#98A2B8}
#qnms .warn{background:#3A2A12;color:#FFC870;border-radius:10px;padding:10px 12px;margin:10px 0}
#qnms .err{background:#3A1E2A;color:#FF9AB2;border-radius:10px;padding:10px 12px;margin:0 0 12px}
#qnms .bar{height:6px;background:#2A3448;border-radius:99px;overflow:hidden;margin:6px 0 14px}
#qnms .bar i{display:block;height:100%;width:0;background:#8198FF;transition:width .3s}
#qnms .tabs{display:flex;gap:4px;background:#1F2739;border-radius:10px;padding:3px;margin:14px 0 10px}
#qnms .tabs button{flex:1;border:0;background:transparent;color:#98A2B8;padding:7px 4px;white-space:normal;line-height:1.2}
#qnms .tabs button.on{background:#E7EBF3;color:#161C2A;font-weight:600}
#qnms input[type=search],#qnms select{width:100%;font:inherit;color:#E7EBF3;background:#1F2739;border:1px solid #2F3A52;border-radius:8px;padding:7px 10px}
#qnms .row2{display:flex;gap:8px;margin:8px 0}
#qnms .row2>*{flex:1}
#qnms .checks{display:flex;gap:14px;flex-wrap:wrap;margin:6px 0 10px;color:#98A2B8}
#qnms .checks label{display:flex;gap:6px;align-items:center;cursor:pointer}
#qnms ul{list-style:none;margin:0;padding:0}
#qnms li{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid #232C40}
#qnms li img{width:38px;height:38px;border-radius:50%;background:#2A3448;flex-shrink:0;object-fit:cover}
#qnms li .who{flex:1;min-width:0}
#qnms li a.u{color:#E7EBF3;font-weight:600;text-decoration:none;overflow-wrap:anywhere}
#qnms li a.u:hover{text-decoration:underline}
#qnms li.seen a.u{color:#7D879C}
#qnms .tag{font-size:11px;border-radius:99px;padding:1px 7px;margin-left:5px;background:#232E52;color:#8198FF;white-space:nowrap}
#qnms .tag.seen{background:#2A3448;color:#98A2B8}
#qnms .fn{display:block;font-size:12px;color:#98A2B8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#qnms .acts{display:flex;gap:6px;flex-shrink:0}
#qnms .empty{padding:24px 0;text-align:center;color:#98A2B8}
`;
  document.head.append(style);

  const body = h("div", { class: "bd" });
  const langBtn = h("button", { class: "lang", onclick: () => setLang(lang === "es" ? "en" : "es") });
  const minBtn = h("button", { onclick: () => panel.classList.toggle("min") }, "–");
  const closeBtn = h("button", { onclick: () => { cancelled = true; panel.remove(); style.remove(); } }, "×");
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
  document.body.append(panel);

  function setLang(l) {
    lang = l;
    store.set(KEYS.lang, l);
    paintHeader();
    for (const paint of [...i18nNodes]) paint();
    onLangChange?.();
  }

  // ---------- Peticiones a Instagram / Instagram requests ----------
  async function api(url, setStatus, maxAttempts = 3) {
    for (let attempt = 1; ; attempt++) {
      if (cancelled) throw new Cancel();
      let res = null;
      try {
        res = await fetch(url, { headers: { "x-ig-app-id": APP_ID, "x-requested-with": "XMLHttpRequest" }, credentials: "include" });
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
        // Ritmo prudente: 1,8–3 s entre páginas y 20–30 s de descanso cada 10 páginas.
        // Careful pace: 1.8–3 s between pages and a 20–30 s break every 10 pages.
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

  const errText = (e) => (e.message === "sessionErr" ? t().sessionErr
    : e.message === "igWarn" ? t().igWarn
    : e.message === "slowDown" ? t().slowDown
    : e.message === "apiFail" ? t().apiFail(e.args[0] ?? t().offline, e.args[1])
    : e.message);

  // ---------- Escaneo / Scan ----------
  const ago = (m) => m < 60 ? `${nf(m)} min` : m < 48 * 60 ? `${nf(Math.floor(m / 60))} h` : `${nf(Math.floor(m / 1440))} ${t().days}`;
  async function scan(force) {
    const prev = store.get(KEYS.cache, null);
    if (force !== true && prev && prev.uid === uid && Date.now() - prev.at < PACE.cooldown) {
      onLangChange = null;
      const mins = () => ago(Math.max(1, Math.round((Date.now() - prev.at) / 60000)));
      body.replaceChildren(
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
    const status = tr(h("p", { class: "muted" }), (el) => { el.textContent = statusFn(); });
    const setStatus = (fn) => { statusFn = fn; status.textContent = fn(); };
    const last = {};
    let etaMin = null;
    const eta = tr(h("p", { class: "muted", style: "font-size:12.5px" }), (el) => { el.textContent = etaMin ? t().eta(nf(etaMin)) : ""; });
    const progressRow = (key) => {
      const num = h("span", {}, "0"), tot = h("span", { class: "muted" }), fill = h("i");
      bars[key] = { num, tot, fill };
      return h("div", {},
        h("div", { style: "display:flex;justify-content:space-between" }, T("span", key), h("span", {}, num, tot)),
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

    body.replaceChildren(
      T("p", "intro"),
      T("p", "calm", { class: "muted", style: "font-size:12.5px" }),
      progressRow("following"),
      progressRow("followers"),
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
        info = {
          following: await count("3dec7e2c57367ef3da3d987d89f9dbc8", "edge_follow"),
          _: await sleep(between([2000, 4000])),
          followers: await count("c76146de99bb02f6415203be841dd25a", "edge_followed_by"),
        };
        console.log("[qnms] totals:", info);
        if (info.following != null && info.followers != null) {
          const pages = Math.ceil(info.following / 50) + Math.ceil(info.followers / 50);
          const avg = (x) => (x[0] + x[1]) / 2;
          const secs = pages * avg(PACE.page) / 1000 + Math.floor(pages / PACE.breakEvery) * avg(PACE.break) / 1000 + avg(PACE.phase) / 1000;
          etaMin = Math.max(1, Math.round(secs / 60));
          eta.textContent = t().eta(nf(etaMin));
        }
      } catch (e) { console.warn("[qnms] Could not read profile totals", e); }

      setStatus(() => t().readingFollowing);
      const following = await getAll("following", (n) => update("following", n, info?.following), setStatus);
      setStatus(() => t().readingFollowers);
      {
        const ms = between(PACE.phase);
        setStatus(() => t().shortPause(Math.round(ms / 1000 / SPEED)));
        await sleep(ms);
        setStatus(() => t().readingFollowers);
      }
      const followers = await getAll("followers", (n) => update("followers", n, info?.followers), setStatus);

      const followerIds = new Set(followers.map(idOf));
      const followingIds = new Set(following.map(idOf));
      const slim = (u, i) => ({
        id: idOf(u), u: u.username, n: u.full_name || "", v: !!u.is_verified, p: !!u.is_private,
        pic: u.profile_pic_url || "", i,
      });

      const data = {
        uid, at: Date.now(), expected: info,
        counts: { following: following.length, followers: followers.length },
        mutual: following.filter((u) => followerIds.has(idOf(u))).length,
        nonFollowers: following.map(slim).filter((x) => !followerIds.has(x.id)),
        fans: followers.map(slim).filter((x) => !followingIds.has(x.id)),
      };

      // Caché (sin fotos de los "fans" para no llenar el almacenamiento)
      // Cache (without "fans" photos so storage doesn't fill up)
      store.set(KEYS.cache, { ...data, fans: data.fans.map(({ pic, ...rest }) => rest) });
      console.log(t().done(data.nonFollowers.length));
      showResults(data);
    } catch (e) {
      onLangChange = null;
      if (e instanceof Cancel) {
        if (document.body.contains(panel)) {
          body.replaceChildren(T("p", "cancelled"), T("button", "startOver", { class: "pri", onclick: () => scan(true) }));
        }
        return;
      }
      console.error(e);
      body.replaceChildren(
        tr(h("div", { class: e.message === "igWarn" || e.message === "slowDown" ? "warn" : "err" }), (el) => { el.textContent = errText(e); }),
        T("button", "rescan", { class: "pri", onclick: () => scan() }));
    }
  }

  // ---------- Resultados / Results ----------
  function showResults(data) {
    const excluded = new Set(store.get(KEYS.excluded, []));
    const seen = new Set(store.get(KEYS.seen, []));
    const st = { tab: "non", q: "", hideV: false, hideSeen: false, sort: "new", limit: 150 };

    const big = h("div", { class: "big" });
    const bigTxt = h("div", { class: "muted", style: "margin-top:4px" });
    const meta = h("p", { class: "muted", style: "margin-top:10px" });
    const warnBox = h("div");

    const paintStatic = () => {
      const mins = Math.round((Date.now() - data.at) / 60000);
      meta.textContent = t().meta(nf(data.counts.following), nf(data.counts.followers), nf(data.mutual)) +
        (mins < 1 ? t().scannedNow : t().scannedAgo(ago(mins)));
      const warnings = [];
      const exp = data.expected;
      if (exp && exp.followers && data.counts.followers < exp.followers * 0.97) {
        warnings.push(t().warnFollowers(nf(data.counts.followers), nf(exp.followers)));
      }
      if (exp && exp.following && data.counts.following < exp.following * 0.97) {
        warnings.push(t().warnFollowing(nf(data.counts.following), nf(exp.following)));
      }
      warnBox.replaceChildren(...warnings.map((w) => h("div", { class: "warn" }, w)));
      search.placeholder = t().search;
      for (const o of sort.options) o.textContent = t()[o.dataset.k];
    };

    const tabs = {};
    const mkTab = (key) => (tabs[key] = h("button", { onclick: () => { st.tab = key; st.limit = 150; render(); } }));
    const tabsEl = h("div", { class: "tabs" }, mkTab("non"), mkTab("fans"), mkTab("exc"));

    const search = h("input", { type: "search" });
    search.addEventListener("input", () => { st.q = search.value.trim().toLowerCase().replace(/^@/, ""); st.limit = 150; render(); });

    const sort = h("select", { onchange: (e) => { st.sort = e.target.value; render(); } },
      h("option", { value: "new", "data-k": "sortNew" }),
      h("option", { value: "old", "data-k": "sortOld" }),
      h("option", { value: "az", "data-k": "sortAz" }));

    const check = (key) => {
      const cb = h("input", { type: "checkbox" });
      cb.addEventListener("change", () => { st[key] = cb.checked; st.limit = 150; render(); });
      return h("label", {}, cb, T("span", key));
    };

    const listEl = h("ul");
    const moreBtn = h("button", { style: "width:100%;margin-top:10px", onclick: () => { st.limit += 150; render(); } });

    const current = () => {
      let arr;
      if (st.tab === "fans") arr = data.fans;
      else if (st.tab === "exc") arr = data.nonFollowers.filter((x) => excluded.has(x.id));
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

    function row(x) {
      const url = `https://www.instagram.com/${x.u}/`;
      const li = h("li", { class: seen.has(x.id) ? "seen" : null });
      const seenTag = h("span", { class: "tag seen" }, t().tagOpened);
      const mark = () => {
        if (seen.has(x.id)) return;
        seen.add(x.id); store.set(KEYS.seen, [...seen]);
        li.classList.add("seen"); name.after(seenTag);
      };
      const img = h("img", { src: x.pic || null, alt: "", loading: "lazy", referrerpolicy: "no-referrer" });
      img.addEventListener("error", () => { img.removeAttribute("src"); });
      const name = h("a", { class: "u", href: url, target: "_blank", rel: "noopener", onclick: mark }, "@" + x.u);
      const who = h("div", { class: "who" }, name,
        seen.has(x.id) && seenTag,
        x.v && h("span", { class: "tag" }, t().tagVerified),
        x.p && h("span", { class: "tag" }, t().tagPrivate),
        x.n && h("span", { class: "fn" }, x.n));
      const acts = h("div", { class: "acts" }, h("a", { class: "btn pri", href: url, target: "_blank", rel: "noopener", onclick: mark }, t().open));
      if (st.tab !== "fans") {
        acts.append(h("button", {
          onclick: () => {
            excluded.has(x.id) ? excluded.delete(x.id) : excluded.add(x.id);
            store.set(KEYS.excluded, [...excluded]);
            render();
          },
        }, st.tab === "exc" ? t().restore : t().exclude));
      }
      li.append(img, who, acts);
      return li;
    }

    function render() {
      const nonCount = data.nonFollowers.filter((x) => !excluded.has(x.id)).length;
      const excCount = data.nonFollowers.length - nonCount;
      big.textContent = nf(nonCount);
      bigTxt.textContent = nonCount === 1 ? t().bigOne : t().bigMany;
      tabs.non.textContent = t().tabNon(nf(nonCount));
      tabs.fans.textContent = t().tabFans(nf(data.fans.length));
      tabs.exc.textContent = t().tabExc(nf(excCount));
      for (const [k, b] of Object.entries(tabs)) b.classList.toggle("on", k === st.tab);

      const arr = current();
      listEl.replaceChildren();
      if (!arr.length) {
        const msg = st.q || st.hideV || st.hideSeen ? t().emptyFilter : t().empty[st.tab];
        listEl.append(h("li", { class: "empty" }, msg));
      } else {
        arr.slice(0, st.limit).forEach((x) => listEl.append(row(x)));
      }
      moreBtn.hidden = arr.length <= st.limit;
      moreBtn.textContent = t().more(nf(arr.length - st.limit));
    }

    onLangChange = () => { paintStatic(); render(); };

    body.replaceChildren(
      big, bigTxt, meta,
      warnBox,
      tabsEl,
      search,
      h("div", { class: "row2" }, sort),
      h("div", { class: "checks" }, check("hideV"), check("hideSeen")),
      h("div", { class: "row2" },
        T("button", "copy", { onclick: copyList }),
        T("button", "csv", { onclick: downloadCsv }),
        T("button", "rescan", { onclick: () => scan() })),
      listEl,
      moreBtn
    );
    paintStatic();
    render();
  }

  // ---------- Inicio / Start ----------
  const cached = store.get(KEYS.cache, null);
  if (cached && cached.uid === uid && Date.now() - cached.at < PACE.cacheAge) showResults(cached);
  else scan();
})();
