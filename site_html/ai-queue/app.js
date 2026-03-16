(() => {
  const model = window.APP_CONTENT;
  if (!model) return;

  const state = {
    files: model.files.map((file) => ({ ...file, ai: { ...file.ai } })),
    search: "",
    chip: "all",
    onlyUnorganized: false,
    sort: { key: "modifiedDate", dir: "desc" },
    selectedIds: new Set(),
    activeFileId: null,
    changes: [],
    modal: null,
    toastTimer: null
  };

  const rootTopbar = document.querySelector("#topbar-root");
  const rootList = document.querySelector("#list-root");
  const rootSide = document.querySelector("#sidepanel-root");
  const rootStatus = document.querySelector("#status-root");
  const rootModal = document.querySelector("#modal-root");
  const rootToast = document.querySelector("#toast-root");

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const typeIcon = (type) => {
    const map = {
      Image: "file-image.svg",
      PDF: "file-pdf.svg",
      Word: "file-word.svg",
      Excel: "file-excel.svg",
      Outlook: "file-outlook.svg"
    };
    const icon = map[type] || "file-generic.svg";
    return `<img class="file-icon" src="../img/file-icons/${icon}" alt="" loading="lazy" decoding="async" />`;
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const formatSize = (sizeKB) => (sizeKB >= 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`);

  const statusClass = (status) => {
    if (status === "Proposta pronta") return "ready";
    if (status === "Applicato") return "applied";
    if (status === "Errore") return "error";
    return "other";
  };

  const sortLabel = (key) => {
    if (state.sort.key !== key) return "";
    return state.sort.dir === "asc" ? "▲" : "▼";
  };

  const ariaSort = (key) => {
    if (state.sort.key !== key) return "none";
    return state.sort.dir === "asc" ? "ascending" : "descending";
  };

  const isRecent = (iso) => {
    const d = new Date(iso).getTime();
    if (Number.isNaN(d)) return false;
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - d <= sevenDays;
  };

  const isUnorganized = (file) => file.status !== "Applicato";
  const canApply = (file) => file.status !== "Applicato" && file.status !== "Errore";
  const canSelect = (file) => file.status !== "Applicato";

  const matchesChip = (file) => {
    switch (state.chip) {
      case "image":
        return file.type === "Image";
      case "pdf":
        return file.type === "PDF";
      case "word":
        return file.type === "Word";
      case "excel":
        return file.type === "Excel";
      case "outlook":
        return file.type === "Outlook";
      case "large":
        return file.sizeKB > 5120;
      case "recent":
        return isRecent(file.modifiedDate);
      default:
        return true;
    }
  };

  const filteredFiles = () => {
    const q = state.search.trim().toLowerCase();

    return state.files
      .filter((file) => {
        if (state.onlyUnorganized && !isUnorganized(file)) return false;
        if (!matchesChip(file)) return false;
        if (!q) return true;

        const haystack = [file.name, file.type, file.ai.suggestedFolder, file.ai.suggestedName, file.ai.reason]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => {
        let cmp = 0;
        switch (state.sort.key) {
          case "name":
            cmp = a.name.localeCompare(b.name, "it");
            break;
          case "modifiedDate":
            cmp = new Date(a.modifiedDate).getTime() - new Date(b.modifiedDate).getTime();
            break;
          case "type":
            cmp = a.type.localeCompare(b.type, "it");
            break;
          case "sizeKB":
            cmp = a.sizeKB - b.sizeKB;
            break;
          case "status": {
            const order = {
              "Da analizzare": 1,
              Analizzato: 2,
              "Proposta pronta": 3,
              Applicato: 4,
              Errore: 5
            };
            cmp = (order[a.status] || 99) - (order[b.status] || 99);
            break;
          }
          default:
            cmp = 0;
        }
        return state.sort.dir === "asc" ? cmp : -cmp;
      });
  };

  const getFileById = (id) => state.files.find((file) => file.id === id) || null;

  const getLastActiveChange = (fileId) => {
    for (let i = state.changes.length - 1; i >= 0; i -= 1) {
      const c = state.changes[i];
      if (c.fileId === fileId && !c.undone) return c;
    }
    return null;
  };

  const showToast = (message) => {
    rootToast.innerHTML = `<div class="toast">${escapeHtml(message)}</div>`;
    if (state.toastTimer) window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => {
      rootToast.innerHTML = "";
    }, 2200);
  };

  const renderTopbar = (filesView) => {
    const selectedCount = Array.from(state.selectedIds).length;

    rootTopbar.innerHTML = `
      <div class="container topbar">
        <h1>${escapeHtml(model.ui.title)}</h1>
        <p class="subtitle">${escapeHtml(model.ui.subtitle)}</p>

        <div class="topbar-controls">
          <input
            id="search-input"
            class="search-input"
            type="search"
            placeholder="Cerca file, tipo o destinazione suggerita"
            value="${escapeHtml(state.search)}"
            aria-label="Cerca file"
          />

          <label class="toggle-wrap" for="toggle-unorganized">
            <input id="toggle-unorganized" type="checkbox" ${state.onlyUnorganized ? "checked" : ""} />
            Solo non organizzati
          </label>

          <div style="display:flex; gap:8px; justify-content:flex-end;">
            <button id="apply-selected-btn" class="btn btn-primary" ${selectedCount ? "" : "disabled"}>Applica selezionati</button>
            <button id="export-report-btn" class="btn btn-secondary">Esporta report</button>
          </div>
        </div>

        <div class="chips-row" role="tablist" aria-label="Filtri rapidi">
          ${model.chips
            .map(
              (chip) =>
                `<button class="chip ${state.chip === chip.key ? "active" : ""}" data-chip="${chip.key}" aria-pressed="${
                  state.chip === chip.key
                }">${escapeHtml(chip.label)}</button>`,
            )
            .join("")}
        </div>
      </div>
    `;

    const btnApply = rootTopbar.querySelector("#apply-selected-btn");
    if (btnApply) {
      btnApply.disabled = selectedCount === 0;
      btnApply.setAttribute("aria-disabled", String(selectedCount === 0));
    }
  };

  const tableHeader = () => `
    <thead>
      <tr>
        <th><input id="select-all" type="checkbox" aria-label="Seleziona tutti" /></th>
        <th aria-sort="${ariaSort("name")}"><button class="sort-btn" data-sort="name">Nome <span>${sortLabel("name")}</span></button></th>
        <th aria-sort="${ariaSort("modifiedDate")}"><button class="sort-btn" data-sort="modifiedDate">Data modifica <span>${sortLabel("modifiedDate")}</span></button></th>
        <th aria-sort="${ariaSort("type")}"><button class="sort-btn" data-sort="type">Tipo <span>${sortLabel("type")}</span></button></th>
        <th aria-sort="${ariaSort("sizeKB")}"><button class="sort-btn" data-sort="sizeKB">Dimensione <span>${sortLabel("sizeKB")}</span></button></th>
        <th aria-sort="${ariaSort("status")}"><button class="sort-btn" data-sort="status">Stato <span>${sortLabel("status")}</span></button></th>
        <th>Suggerimento AI</th>
        <th>Azioni</th>
      </tr>
    </thead>
  `;

  const rowTemplate = (file) => {
    const selected = state.selectedIds.has(file.id);
    return `
      <tr class="row status-${statusClass(file.status)} ${state.activeFileId === file.id ? "selected" : ""}" data-row-id="${file.id}" tabindex="0" role="button" aria-label="Apri dettagli ${escapeHtml(file.name)}">
        <td>
          <input class="select-file" data-id="${file.id}" type="checkbox" ${selected ? "checked" : ""} ${canSelect(file) ? "" : "disabled"} aria-label="Seleziona ${escapeHtml(file.name)}" />
        </td>
        <td>
          <span class="file-cell">
            <span aria-hidden="true">${typeIcon(file.type)}</span>
            <span class="file-name" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</span>
          </span>
        </td>
        <td>${escapeHtml(formatDate(file.modifiedDate))}</td>
        <td>${escapeHtml(file.type)}</td>
        <td>${escapeHtml(formatSize(file.sizeKB))}</td>
        <td><span class="badge ${statusClass(file.status)}">${escapeHtml(file.status)}</span></td>
        <td><span class="suggestion" title="${escapeHtml(`${file.ai.suggestedFolder}/${file.ai.suggestedName}`)}">${escapeHtml(
          `${file.ai.suggestedFolder}/${file.ai.suggestedName}`,
        )}</span></td>
        <td>
          <span class="row-actions">
            <button class="btn-inline action-preview" data-id="${file.id}">Preview</button>
            <button class="btn-inline action-apply" data-id="${file.id}" ${canApply(file) ? "" : "disabled"}>Applica</button>
            <button class="btn-inline action-ignore" data-id="${file.id}" ${file.status === "Applicato" ? "disabled" : ""}>Ignora</button>
          </span>
        </td>
      </tr>
    `;
  };

  const mobileCardTemplate = (file) => `
    <article class="file-card status-${statusClass(file.status)}" data-row-id="${file.id}" tabindex="0">
      <div class="file-cell">
        <span aria-hidden="true">${typeIcon(file.type)}</span>
        <strong title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</strong>
      </div>
      <div class="kv"><span>Data</span><span>${escapeHtml(formatDate(file.modifiedDate))}</span></div>
      <div class="kv"><span>Tipo</span><span>${escapeHtml(file.type)}</span></div>
      <div class="kv"><span>Dimensione</span><span>${escapeHtml(formatSize(file.sizeKB))}</span></div>
      <div class="kv"><span>Stato</span><span class="badge ${statusClass(file.status)}">${escapeHtml(file.status)}</span></div>
      <div class="kv"><span>Suggerimento AI</span><span title="${escapeHtml(`${file.ai.suggestedFolder}/${file.ai.suggestedName}`)}">${escapeHtml(
        `${file.ai.suggestedFolder}/${file.ai.suggestedName}`,
      )}</span></div>
      <div style="display:flex; gap:8px;">
        <input class="select-file" data-id="${file.id}" type="checkbox" ${state.selectedIds.has(file.id) ? "checked" : ""} ${
          canSelect(file) ? "" : "disabled"
        } aria-label="Seleziona ${escapeHtml(file.name)}" />
        <button class="btn-inline action-preview" data-id="${file.id}">Preview</button>
        <button class="btn-inline action-apply" data-id="${file.id}" ${canApply(file) ? "" : "disabled"}>Applica</button>
        <button class="btn-inline action-ignore" data-id="${file.id}" ${file.status === "Applicato" ? "disabled" : ""}>Ignora</button>
      </div>
    </article>
  `;

  const renderList = (filesView) => {
    rootList.className = "list-area";
    rootList.innerHTML = `
      <div class="table-wrap">
        <table class="table" aria-label="Coda file AI">
          ${tableHeader()}
          <tbody>
            ${filesView.map(rowTemplate).join("") || `<tr><td colspan="8" style="color:var(--muted)">Nessun file trovato</td></tr>`}
          </tbody>
        </table>
      </div>

      <div class="mobile-cards">
        ${filesView.map(mobileCardTemplate).join("") || `<div class="file-card">Nessun file trovato</div>`}
      </div>
    `;

    const selectableVisible = filesView.filter(canSelect).map((f) => f.id);
    const selectedVisible = selectableVisible.filter((id) => state.selectedIds.has(id));

    const selectAll = rootList.querySelector("#select-all");
    if (selectAll) {
      selectAll.checked = selectableVisible.length > 0 && selectedVisible.length === selectableVisible.length;
      selectAll.indeterminate = selectedVisible.length > 0 && selectedVisible.length < selectableVisible.length;
    }
  };

  const renderSidepanel = () => {
    const file = getFileById(state.activeFileId);
    if (!file) {
      rootSide.className = "sidepanel empty";
      rootSide.innerHTML = `<div>Seleziona una riga per aprire i dettagli</div>`;
      return;
    }

    const lastChange = getLastActiveChange(file.id);
    const targetPath = `C:/Organized/${file.ai.suggestedFolder}`;

    rootSide.className = "sidepanel";
    rootSide.innerHTML = `
      <h2>${typeIcon(file.type)} ${escapeHtml(file.name)}</h2>
      <div class="meta">
        <div class="kv"><span>Percorso attuale</span><span title="${escapeHtml(file.currentPath)}">${escapeHtml(file.currentPath)}</span></div>
        <div class="kv"><span>Percorso suggerito</span><span title="${escapeHtml(targetPath)}">${escapeHtml(targetPath)}</span></div>
        <div class="kv"><span>Rename suggerito</span><span>${escapeHtml(file.ai.suggestedName)}</span></div>
        <div class="kv"><span>Tipo</span><span>${escapeHtml(file.type)}</span></div>
        <div class="kv"><span>Dimensione</span><span>${escapeHtml(formatSize(file.sizeKB))}</span></div>
        <div class="kv"><span>Data modifica</span><span>${escapeHtml(formatDate(file.modifiedDate))}</span></div>
        <div class="kv"><span>Confidence</span><span>${file.ai.confidence}%</span></div>
        <div class="kv"><span>Motivo AI</span><span>${escapeHtml(file.ai.reason)}</span></div>
      </div>

      <div class="before-after">Prima: ${escapeHtml(file.currentPath)}/${escapeHtml(file.name)}\nDopo: ${escapeHtml(targetPath)}/${escapeHtml(
        file.ai.suggestedName,
      )}</div>

      <div class="panel-actions">
        <button class="btn btn-secondary panel-preview" data-id="${file.id}">Preview</button>
        <button class="btn btn-primary panel-apply" data-id="${file.id}" ${canApply(file) ? "" : "disabled"}>Applica proposta</button>
        <button class="btn btn-secondary panel-undo" data-id="${file.id}" ${lastChange ? "" : "disabled"}>Annulla</button>
      </div>
    `;
  };

  const renderStatusbar = (filesView) => {
    const selectedCount = Array.from(state.selectedIds).length;
    const readyCount = state.files.filter((f) => f.status === "Proposta pronta").length;

    rootStatus.innerHTML = `
      <div class="container statusbar-inner">
        <span>${filesView.length} file • ${selectedCount} selezionati • ${readyCount} proposte pronte</span>
        <span>Mod: ${escapeHtml(model.settings.PREVIEW_MODE ? "Preview/confirm" : "Diretta")}</span>
      </div>
    `;
  };

  const previewBody = (file) => {
    if (file.type === "Image") return "Anteprima immagine (placeholder): miniatura non disponibile offline.";
    if (file.type === "PDF") return "Sintesi PDF: documento con testo amministrativo e riferimenti a fornitore/cliente.";
    if (file.type === "Word") return "Sintesi Word: bozza procedura operativa con sezioni introduzione, scope e passi.";
    if (file.type === "Excel") return "Sintesi Excel: report tabellare con indicatori mensili e fogli per reparto.";
    if (file.type === "Outlook") return "Sintesi email: thread cliente con richiesta supporto e allegato tecnico.";
    return "Anteprima non disponibile per questo tipo file.";
  };

  const renderModal = () => {
    if (!state.modal) {
      rootModal.innerHTML = "";
      return;
    }

    if (state.modal.type === "preview") {
      const file = getFileById(state.modal.fileId);
      if (!file) {
        state.modal = null;
        rootModal.innerHTML = "";
        return;
      }

      rootModal.innerHTML = `
        <div class="modal" data-close-modal="true">
          <div class="modal-card" role="dialog" aria-modal="true" aria-label="Preview file">
            <div class="modal-head">
              <strong>Preview: ${escapeHtml(file.name)}</strong>
              <button class="icon-btn" aria-label="Chiudi preview" data-close-modal="true">✕</button>
            </div>
            <div class="preview-box">${escapeHtml(previewBody(file))}</div>
          </div>
        </div>
      `;
      return;
    }

    if (state.modal.type === "confirm-apply") {
      const count = state.modal.fileIds.length;
      rootModal.innerHTML = `
        <div class="modal" data-close-modal="true">
          <div class="modal-card" role="dialog" aria-modal="true" aria-label="Conferma applicazione">
            <div class="modal-head">
              <strong>Conferma applicazione</strong>
              <button class="icon-btn" aria-label="Chiudi conferma" data-close-modal="true">✕</button>
            </div>
            <p>Stai per applicare ${count} proposta/e. Continuare?</p>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-primary" data-confirm-apply="true">Conferma</button>
              <button class="btn btn-secondary" data-close-modal="true">Annulla</button>
            </div>
          </div>
        </div>
      `;
    }
  };

  const applyFiles = (ids) => {
    let applied = 0;

    ids.forEach((id) => {
      const file = getFileById(id);
      if (!file || !canApply(file)) return;

      const targetPath = `C:/Organized/${file.ai.suggestedFolder}`;
      state.changes.push({
        timestamp: new Date().toISOString(),
        fileId: file.id,
        fromName: file.name,
        fromPath: file.currentPath,
        toName: file.ai.suggestedName,
        toPath: targetPath,
        status: "Applicato",
        previousStatus: file.status,
        undone: false
      });

      file.name = file.ai.suggestedName;
      file.currentPath = targetPath;
      file.status = "Applicato";
      state.selectedIds.delete(file.id);
      applied += 1;
    });

    if (applied > 0) showToast(`${applied} proposta/e applicate`);
    rerender();
  };

  const requestApply = (ids) => {
    const eligible = ids.filter((id) => {
      const file = getFileById(id);
      return !!file && canApply(file);
    });

    if (!eligible.length) {
      showToast("Nessun file applicabile nella selezione");
      return;
    }

    if (model.settings.PREVIEW_MODE) {
      state.modal = { type: "confirm-apply", fileIds: eligible };
      renderModal();
      return;
    }

    applyFiles(eligible);
  };

  const undoFile = (fileId) => {
    const file = getFileById(fileId);
    const change = getLastActiveChange(fileId);
    if (!file || !change) {
      showToast("Nessuna modifica da annullare");
      return;
    }

    file.name = change.fromName;
    file.currentPath = change.fromPath;
    file.status = change.previousStatus || "Proposta pronta";
    change.undone = true;
    showToast("Ultima applicazione annullata");
    rerender();
  };

  const ignoreFile = (fileId) => {
    const file = getFileById(fileId);
    if (!file || file.status === "Applicato") return;
    file.status = "Analizzato";
    state.selectedIds.delete(file.id);
    showToast("File marcato come ignorato");
    rerender();
  };

  const exportReport = () => {
    const payload = {
      timestamp: new Date().toISOString(),
      appliedChanges: state.changes
        .filter((c) => !c.undone)
        .map((c) => ({
          fileId: c.fileId,
          fromName: c.fromName,
          fromPath: c.fromPath,
          toName: c.toName,
          toPath: c.toPath,
          status: c.status
        }))
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    a.href = url;
    a.download = `ai-organizer-report-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast("Report esportato");
  };

  const rerender = () => {
    const filesView = filteredFiles();

    if (state.activeFileId && !getFileById(state.activeFileId)) state.activeFileId = null;

    renderTopbar(filesView);
    renderList(filesView);
    renderSidepanel();
    renderStatusbar(filesView);
    renderModal();
  };

  rootTopbar.addEventListener("input", (event) => {
    const target = event.target;
    if (target.id === "search-input") {
      state.search = target.value;
      rerender();
      return;
    }

    if (target.id === "toggle-unorganized") {
      state.onlyUnorganized = target.checked;
      rerender();
    }
  });

  rootTopbar.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-chip]");
    if (chip) {
      state.chip = chip.getAttribute("data-chip");
      rerender();
      return;
    }

    if (event.target.id === "apply-selected-btn") {
      requestApply(Array.from(state.selectedIds));
      return;
    }

    if (event.target.id === "export-report-btn") {
      exportReport();
    }
  });

  rootList.addEventListener("click", (event) => {
    const target = event.target;

    const sortBtn = target.closest("[data-sort]");
    if (sortBtn) {
      const key = sortBtn.getAttribute("data-sort");
      if (state.sort.key === key) {
        state.sort.dir = state.sort.dir === "asc" ? "desc" : "asc";
      } else {
        state.sort.key = key;
        state.sort.dir = "asc";
      }
      rerender();
      return;
    }

    if (target.closest(".action-preview")) {
      const id = target.closest(".action-preview").getAttribute("data-id");
      state.modal = { type: "preview", fileId: id };
      renderModal();
      return;
    }

    if (target.closest(".action-apply")) {
      const id = target.closest(".action-apply").getAttribute("data-id");
      requestApply([id]);
      return;
    }

    if (target.closest(".action-ignore")) {
      const id = target.closest(".action-ignore").getAttribute("data-id");
      ignoreFile(id);
      return;
    }

    const row = target.closest("[data-row-id]");
    if (row && !target.closest("button") && target.tagName !== "INPUT") {
      state.activeFileId = row.getAttribute("data-row-id");
      rerender();
    }
  });

  rootList.addEventListener("keydown", (event) => {
    const row = event.target.closest("[data-row-id]");
    if (!row) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      state.activeFileId = row.getAttribute("data-row-id");
      rerender();
    }
  });

  rootList.addEventListener("change", (event) => {
    const target = event.target;

    if (target.id === "select-all") {
      const filesView = filteredFiles();
      filesView.forEach((file) => {
        if (!canSelect(file)) return;
        if (target.checked) state.selectedIds.add(file.id);
        else state.selectedIds.delete(file.id);
      });
      rerender();
      return;
    }

    if (target.classList.contains("select-file")) {
      const id = target.getAttribute("data-id");
      if (target.checked) state.selectedIds.add(id);
      else state.selectedIds.delete(id);
      rerender();
    }
  });

  rootSide.addEventListener("click", (event) => {
    const target = event.target;

    if (target.closest(".panel-preview")) {
      const id = target.closest(".panel-preview").getAttribute("data-id");
      state.modal = { type: "preview", fileId: id };
      renderModal();
      return;
    }

    if (target.closest(".panel-apply")) {
      const id = target.closest(".panel-apply").getAttribute("data-id");
      requestApply([id]);
      return;
    }

    if (target.closest(".panel-undo")) {
      const id = target.closest(".panel-undo").getAttribute("data-id");
      undoFile(id);
    }
  });

  rootModal.addEventListener("click", (event) => {
    const close = event.target.closest("[data-close-modal]");
    if (close) {
      state.modal = null;
      renderModal();
      return;
    }

    if (event.target.matches("[data-confirm-apply]")) {
      const ids = state.modal?.fileIds || [];
      state.modal = null;
      applyFiles(ids);
    }
  });

  rerender();
})();
