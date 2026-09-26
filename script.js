// Aetherion showcase: command search/filter + click-to-copy. No dependencies.
(function () {
  const search = document.getElementById("cmd-search");
  const chips = Array.from(document.querySelectorAll(".chip"));
  const groups = Array.from(document.querySelectorAll(".cmd-group"));
  const empty = document.getElementById("cmd-empty");
  let filter = "all";

  function apply() {
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
  }

  search.addEventListener("input", apply);
  chips.forEach((chip) =>
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      filter = chip.dataset.filter;
      apply();
    })
  );

  const toast = document.getElementById("toast");
  let timer;
  function notify(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove("show"), 1600);
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
})();
