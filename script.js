// Lumo showcase: command search/filter, click-to-copy, scroll reveal. No dependencies, no tracking.
(function () {
  const toast = document.getElementById("toast");
  let timer;
  function notify(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove("show"), 1600);
  }

  // command search + filter (index page only)
  const search = document.getElementById("cmd-search");
  if (search) {
    const chips = Array.from(document.querySelectorAll(".chip"));
    const groups = Array.from(document.querySelectorAll(".cmd-group"));
    const empty = document.getElementById("cmd-empty");
    let filter = "all";
    const apply = () => {
      const q = (search.value || "").trim().toLowerCase();
      let shown = 0;
      groups.forEach((g) => {
        const inCat = filter === "all" || g.dataset.group === filter;
        let visible = 0;
        g.querySelectorAll(".cmd").forEach((c) => {
          const ok = inCat && (!q || c.dataset.search.includes(q));
          c.hidden = !ok;
          if (ok) visible++;
        });
        g.hidden = visible === 0;
        shown += visible;
      });
      empty.hidden = shown !== 0;
    };
    search.addEventListener("input", apply);
    chips.forEach((chip) =>
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        filter = chip.dataset.filter;
        apply();
      })
    );
  }

  document.querySelectorAll(".cmd-name").forEach((btn) =>
    btn.addEventListener("click", () => {
      const text = btn.dataset.copy;
      if (!text) { notify("Right-click a message → Apps → " + btn.textContent); return; }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => notify("Copied " + text), () => notify(text));
      } else {
        notify(text);
      }
    })
  );

  // scroll reveal (elements are visible by default if JS or IntersectionObserver is unavailable)
  const items = document.querySelectorAll(".reveal");
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduce) {
    items.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  }

  // close the mobile menu after picking a link or pressing Escape
  const menu = document.querySelector(".nav-menu");
  if (menu) {
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) menu.removeAttribute("open"); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") menu.removeAttribute("open"); });
  }

  // open the FAQ entry that the URL hash points to
  function openHash() {
    const el = location.hash && document.getElementById(location.hash.slice(1));
    if (el && el.tagName === "DETAILS") el.open = true;
  }
  openHash();
  window.addEventListener("hashchange", openHash);
  // theme: Dark (default) / Light / Auto. Saved only in this browser (localStorage). The head script applies it before first paint.
  (function () {
    const root = document.documentElement;
    const KEY = "aeth-theme";
    const ORDER = ["dark", "light", "auto"];  // valid choices
    const mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
    const read = () => { let v = "dark"; try { v = localStorage.getItem(KEY) || v; } catch (e) {} return ORDER.includes(v) ? v : "dark"; };
    const apply = (pref) => {
      const eff = pref === "auto" ? (mq && mq.matches ? "light" : "dark") : pref;
      root.setAttribute("data-theme-pref", pref);
      root.setAttribute("data-theme", eff);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", eff === "light" ? "#f5f7fb" : "#0b0d14");
      document.querySelectorAll("[data-theme-set]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.themeSet === pref)));
      const names = { dark: "Dark", light: "Light", auto: "Auto" };
      document.querySelectorAll("[data-theme-menu]").forEach((b) => { b.setAttribute("aria-label", "Appearance: " + names[pref] + ". Theme and seasonal options"); b.title = "Appearance: " + names[pref]; });
    };
    const save = (pref) => { try { localStorage.setItem(KEY, pref); } catch (e) {} apply(pref); };
    // the top-bar button opens a small menu: Appearance (Dark / Light / Auto) and Seasonal (lumo-holiday.js handles those buttons)
    const pop = (open, focusBtn) => {
      document.querySelectorAll("[data-theme-menu]").forEach((b) => {
        const m = document.getElementById(b.getAttribute("aria-controls"));
        if (!m) return;
        m.hidden = !open;
        b.setAttribute("aria-expanded", String(open));
        if (!open && focusBtn) b.focus();
      });
    };
    document.addEventListener("click", (e) => {
      const set = e.target.closest("[data-theme-set]");
      if (set) { save(set.dataset.themeSet); return; }
      const btn = e.target.closest("[data-theme-menu]");
      if (btn) { pop(btn.getAttribute("aria-expanded") !== "true"); return; }
      if (!e.target.closest(".theme-menu")) pop(false);
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && document.querySelector('[data-theme-menu][aria-expanded="true"]')) pop(false, true); });
    if (mq) { const f = () => { if (read() === "auto") apply("auto"); }; mq.addEventListener ? mq.addEventListener("change", f) : mq.addListener(f); }
    window.addEventListener("storage", (e) => { if (e.key === KEY) apply(read()); });
    apply(read());
  })();
})();
