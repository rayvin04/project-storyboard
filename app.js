(() => {
  const WEBHOOK_URL = "https://n8n.47-131-239-128.sslip.io/webhook/project-storyboard";
  const MAX_LENGTH = 30000;
  const COLUMNS = ["Scene", "Timestamp", "Voiceover", "What's happening", "Background", "Hand-drawn characters & props", "On-screen text", "Transitions/Motion"];
  const SAMPLE = `Why Your Fingers Wrinkle in the Bath\n\nAfter a long bath, your fingertips look like tiny raisins. It seems like the water has soaked into your skin, but that is not what is happening.\n\nThe outer layer of your skin is waterproof. The wrinkling is controlled by your nervous system. When your fingers stay wet for a while, nerves narrow blood vessels beneath the skin. The tissue volume changes, and the surface folds inward.\n\nScientists think the grooves may help water drain away, giving wet fingers a better grip. The pattern looks a little like tire treads. Researchers have found clues that support the idea, though it is not fully settled.\n\nSo your fingers are not simply getting waterlogged. Your body is actively changing their shape while they soak.`;

  const $ = (id) => document.getElementById(id);
  const form = $("storyboard-form");
  const scriptInput = $("script-input");
  const count = $("script-count");
  const createButton = $("create-button");
  const buttonLabel = $("button-label");
  const sampleButton = $("load-sample");
  const downloadButton = $("download-csv");
  const notice = $("notice");
  const progress = $("progress");
  const progressLabel = $("progress-label");
  const emptyState = $("empty-state");
  const summary = $("result-summary");
  const tableWrap = $("table-wrap");
  const sceneRows = $("scene-rows");
  const resultBadge = $("result-badge");
  const tableHint = $("table-hint");
  const themeToggle = $("theme-toggle");
  const themeLabel = $("theme-label");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  let busy = false;
  let downloadCsv = "";
  let resultTitle = "";

  function applyTheme(theme, persist = false) {
    const resolvedTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = resolvedTheme;
    const isDark = resolvedTheme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    themeToggle.title = `Switch to ${isDark ? "light" : "dark"} mode`;
    themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
    themeColor.content = isDark ? "#111722" : "#e9edf2";
    if (persist) {
      try { localStorage.setItem("project-storyboard-theme", resolvedTheme); } catch { /* Theme still applies for this session. */ }
    }
  }

  function setInputState() {
    const length = scriptInput.value.length;
    count.textContent = `${length.toLocaleString()} / ${MAX_LENGTH.toLocaleString()}`;
    createButton.disabled = busy || length < 20 || length > MAX_LENGTH;
  }

  function showNotice(message, isError = false) {
    notice.textContent = message;
    notice.hidden = !message;
    notice.classList.toggle("is-error", isError);
  }

  function setBusy(value) {
    busy = value;
    scriptInput.disabled = value;
    sampleButton.disabled = value;
    buttonLabel.textContent = value ? "Building your storyboard…" : "Create storyboard";
    progress.hidden = !value;
    progressLabel.textContent = "Reading your script and planning each scene…";
    setInputState();
  }

  function deriveTitle(script) {
    const lines = script.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (!lines.length) return "Untitled storyboard";
    const first = lines[0].replace(/^[#>*\s]+/, "").replace(/[.?!:;]+$/, "").trim();
    if (first.length <= 110) return first;
    const sentence = script.trim().match(/^.{1,110}?[.!?](?:\s|$)/s);
    return (sentence?.[0] || first.slice(0, 110)).trim().replace(/[.?!]+$/, "");
  }

  function parseCsv(text) {
    const rows = [];
    let row = [], cell = "", quoted = false;
    for (let i = 0; i < text.length; i += 1) {
      const ch = text[i];
      if (quoted) {
        if (ch === '"' && text[i + 1] === '"') { cell += '"'; i += 1; }
        else if (ch === '"') quoted = false;
        else cell += ch;
      } else if (ch === '"') quoted = true;
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n") { row.push(cell.replace(/\r$/, "")); if (row.some((item) => item.trim())) rows.push(row); row = []; cell = ""; }
      else cell += ch;
    }
    if (cell.length || row.length) { row.push(cell.replace(/\r$/, "")); if (row.some((item) => item.trim())) rows.push(row); }
    if (rows.length < 2) return [];
    const headers = rows.shift().map((header) => header.trim());
    return rows.map((values) => Object.fromEntries(headers.map((header, i) => [header, values[i] ?? ""])));
  }

  function toScenes(payload) {
    const queue = [payload];
    const seen = new Set();
    while (queue.length) {
      let item = queue.shift();
      if (item == null || seen.has(item)) continue;
      if (typeof item === "string") {
        const trimmed = item.trim();
        if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
          try { queue.unshift(JSON.parse(trimmed)); continue; } catch { /* try as CSV below */ }
        }
        if (/\bScene\b\s*,/.test(trimmed.split(/\r?\n/, 1)[0])) return { scenes: parseCsv(trimmed), csv: trimmed };
        continue;
      }
      if (typeof item !== "object") continue;
      seen.add(item);
      if (Array.isArray(item)) {
        if (item.length && typeof item[0] === "object") return { scenes: item, csv: "" };
        for (const child of item) queue.push(child);
        continue;
      }
      const csv = item.storyboardCsv || item.storyboardCSV || item.csvContent || item.csv || item.storyboard_csv;
      if (typeof csv === "string" && csv.trim()) return { scenes: parseCsv(csv), csv };
      for (const key of ["scenes", "storyboard", "rows", "result", "data", "output", "response", "body"]) {
        if (item[key] != null) queue.push(item[key]);
      }
    }
    return { scenes: [], csv: "" };
  }

  function sceneValue(scene, ...keys) {
    for (const key of keys) if (scene?.[key] != null) return scene[key];
    return "";
  }

  function cleanScene(scene, index) {
    if (Array.isArray(scene)) return Object.fromEntries(COLUMNS.map((key, i) => [key, scene[i] ?? ""]));
    return {
      "Scene": sceneValue(scene, "Scene", "scene", "sceneNumber", "scene_number") || String(index + 1),
      "Timestamp": sceneValue(scene, "Timestamp", "timestamp"),
      "Voiceover": sceneValue(scene, "Voiceover", "voiceover", "narration"),
      "What's happening": sceneValue(scene, "What's happening", "whatsHappening", "whatIsHappening", "action", "visualAction"),
      "Background": sceneValue(scene, "Background", "background", "setting"),
      "Hand-drawn characters & props": sceneValue(scene, "Hand-drawn characters & props", "handDrawnCharactersProps", "charactersAndProps", "characters_props"),
      "On-screen text": sceneValue(scene, "On-screen text", "onScreenText", "onscreenText", "text"),
      "Transitions/Motion": sceneValue(scene, "Transitions/Motion", "transitionsMotion", "transition", "motion")
    };
  }

  function escapeCsv(value) {
    const text = String(value ?? "");
    return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  }

  function makeCsv(scenes) {
    return [COLUMNS.join(","), ...scenes.map((scene) => COLUMNS.map((column) => escapeCsv(scene[column])).join(","))].join("\r\n");
  }

  function wordCount(text) { return text.trim().split(/\s+/).filter(Boolean).length; }

  function render(payload, originalScript) {
    const found = toScenes(payload);
    const scenes = found.scenes.map(cleanScene);
    if (!scenes.length) throw new Error("The workflow finished without returning storyboard scenes. Check the n8n execution for this request.");
    sceneRows.replaceChildren();
    for (const scene of scenes) {
      const tr = document.createElement("tr");
      for (const col of COLUMNS) {
        const td = document.createElement("td");
        td.textContent = String(scene[col] ?? "").trim() || "—";
        tr.appendChild(td);
      }
      sceneRows.appendChild(tr);
    }
    const title = (payload?.title || payload?.scriptTitle || deriveTitle(originalScript)).trim();
    resultTitle = title;
    $("story-title").textContent = title;
    $("scene-count").textContent = `${scenes.length} ${scenes.length === 1 ? "scene" : "scenes"}`;
    $("word-count").textContent = `${wordCount(originalScript).toLocaleString()} words`;
    downloadCsv = found.csv || makeCsv(scenes);
    summary.hidden = false;
    tableWrap.hidden = false;
    tableHint.hidden = false;
    emptyState.hidden = true;
    resultBadge.hidden = false;
    downloadButton.disabled = false;
    showNotice(`Storyboard complete — ${scenes.length} scenes are ready to review.`);
  }

  function slugify(value) {
    return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70) || "storyboard";
  }

  function download() {
    const blob = new Blob(["\ufeff", downloadCsv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(resultTitle)}-storyboard.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function submit(event) {
    event.preventDefault();
    const script = scriptInput.value.trim();
    if (busy || script.length < 20 || script.length > MAX_LENGTH) return;
    showNotice("");
    emptyState.hidden = false;
    summary.hidden = true;
    tableWrap.hidden = true;
    tableHint.hidden = true;
    resultBadge.hidden = true;
    downloadButton.disabled = true;
    sceneRows.replaceChildren();
    setBusy(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 240000);
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        cache: "no-store",
        signal: controller.signal,
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({ title: deriveTitle(script), script, mode: "storyboardOnly" })
      });
      const text = await response.text();
      let data;
      try { data = text ? JSON.parse(text) : {}; }
      catch { throw new Error(`n8n returned unreadable data (HTTP ${response.status}). Check the matching workflow execution.`); }
      if (!response.ok || data?.ok === false) {
        const message = typeof data?.error === "string" ? data.error : data?.error?.message;
        throw new Error(message || `Workflow request failed (HTTP ${response.status}). Check the n8n execution for details.`);
      }
      render(data, script);
    } catch (error) {
      emptyState.hidden = true;
      if (error?.name === "AbortError") showNotice("Storyboard planning did not finish within 4 minutes. Check the matching n8n execution before resubmitting; it may still be running.", true);
      else if (error instanceof TypeError) showNotice("Could not reach the storyboard webhook. Check that the AWS workflow is active and its CORS origin includes this Vercel site.", true);
      else showNotice(error?.message || "Storyboard creation failed. Check the n8n execution and try again.", true);
    } finally {
      window.clearTimeout(timeout);
      setBusy(false);
    }
  }

  scriptInput.addEventListener("input", setInputState);
  form.addEventListener("submit", submit);
  sampleButton.addEventListener("click", () => { scriptInput.value = SAMPLE; scriptInput.dispatchEvent(new Event("input", { bubbles: true })); scriptInput.focus(); });
  downloadButton.addEventListener("click", download);
  themeToggle.addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true);
  });
  applyTheme(document.documentElement.dataset.theme || "light");
  setInputState();
})();

