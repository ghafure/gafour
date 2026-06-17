(function () {
  "use strict";

  const STORAGE_KEY = "sales-record-system.records.v1";
  const SETTINGS_KEY = "sales-record-system.settings.v1";
  const currency = new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR"
  });
  const dateFormatter = new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const icons = {
    layout: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>',
    table: '<svg viewBox="0 0 24 24"><path d="M4 5h16v14H4z"></path><path d="M4 10h16"></path><path d="M9 5v14"></path></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>',
    chart: '<svg viewBox="0 0 24 24"><path d="M4 19V5"></path><path d="M4 19h16"></path><rect x="7" y="12" width="3" height="5"></rect><rect x="12" y="8" width="3" height="9"></rect><rect x="17" y="10" width="3" height="7"></rect></svg>',
    download: '<svg viewBox="0 0 24 24"><path d="M12 4v10"></path><path d="m7 9 5 5 5-5"></path><path d="M5 20h14"></path></svg>',
    upload: '<svg viewBox="0 0 24 24"><path d="M12 20V10"></path><path d="m7 15 5-5 5 5"></path><path d="M5 4h14"></path></svg>',
    menu: '<svg viewBox="0 0 24 24"><path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"></circle><path d="m16 16 4 4"></path></svg>',
    money: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v10"></path><path d="M15 9.5c-.7-.7-1.8-1-3-1-1.7 0-3 .8-3 2s1.3 1.8 3 2 3 .8 3 2-1.3 2-3 2c-1.2 0-2.3-.3-3-1"></path></svg>',
    check: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="m8 12 3 3 5-6"></path></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l4 2"></path></svg>',
    receipt: '<svg viewBox="0 0 24 24"><path d="M7 3h10a2 2 0 0 1 2 2v16l-3-2-2 2-2-2-2 2-2-2-3 2V5a2 2 0 0 1 2-2Z"></path><path d="M9 8h6"></path><path d="M9 12h6"></path><path d="M9 16h4"></path></svg>',
    save: '<svg viewBox="0 0 24 24"><path d="M5 4h12l2 2v14H5z"></path><path d="M8 4v6h8V4"></path><path d="M8 20v-6h8v6"></path></svg>',
    print: '<svg viewBox="0 0 24 24"><path d="M7 8V4h10v4"></path><path d="M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"></path><path d="M7 14h10v6H7z"></path></svg>',
    filter: '<svg viewBox="0 0 24 24"><path d="M4 5h16l-6 7v5l-4 2v-7Z"></path></svg>',
    eye: '<svg viewBox="0 0 24 24"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
    edit: '<svg viewBox="0 0 24 24"><path d="M4 20h4l11-11a2.8 2.8 0 0 0-4-4L4 16v4Z"></path><path d="m13 7 4 4"></path></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M6 7l1 14h10l1-14"></path><path d="M9 7V4h6v3"></path></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12"></path><path d="M18 6 6 18"></path></svg>'
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const sampleRecords = [
    {
      id: crypto.randomUUID(),
      invoiceNo: "INV-2026-001",
      saleDate: "2026-06-01",
      customer: "Acme Corporation",
      item: "Website Design Service",
      quantity: 1,
      unitPrice: 4200,
      taxRate: 8,
      discount: 0,
      status: "Paid",
      method: "Bank Transfer",
      notes: "Initial design and launch package."
    },
    {
      id: crypto.randomUUID(),
      invoiceNo: "INV-2026-002",
      saleDate: "2026-06-04",
      customer: "Global Tech Ltd.",
      item: "Consulting Service",
      quantity: 3,
      unitPrice: 850,
      taxRate: 6,
      discount: 100,
      status: "Paid",
      method: "Credit Card",
      notes: "Workshop delivery and support."
    },
    {
      id: crypto.randomUUID(),
      invoiceNo: "INV-2026-003",
      saleDate: "2026-06-07",
      customer: "Sunrise Retail",
      item: "Product A",
      quantity: 12,
      unitPrice: 95,
      taxRate: 6,
      discount: 50,
      status: "Pending",
      method: "Bank Transfer",
      notes: "Awaiting payment confirmation."
    },
    {
      id: crypto.randomUUID(),
      invoiceNo: "INV-2026-004",
      saleDate: "2026-06-10",
      customer: "Bright Future Inc.",
      item: "Maintenance Service",
      quantity: 1,
      unitPrice: 1200,
      taxRate: 6,
      discount: 0,
      status: "Partial",
      method: "E-Wallet",
      notes: "Deposit received."
    },
    {
      id: crypto.randomUUID(),
      invoiceNo: "INV-2026-005",
      saleDate: "2026-06-14",
      customer: "City Ventures",
      item: "Product B",
      quantity: 4,
      unitPrice: 320,
      taxRate: 6,
      discount: 0,
      status: "Pending",
      method: "Cash",
      notes: ""
    }
  ];

  const state = {
    records: loadRecords(),
    selectedRecordId: null
  };

  const els = {};

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    hydrateIcons();
    cacheElements();
    seedDefaults();
    setInitialDates();
    bindEvents();
    resetForm();
    render();
    registerServiceWorker();
  }

  function hydrateIcons() {
    document.querySelectorAll("[data-icon]").forEach((node) => {
      node.innerHTML = icons[node.dataset.icon] || "";
    });
  }

  function cacheElements() {
    [
      "globalSearch", "salesForm", "recordId", "invoiceNo", "saleDate", "customer", "item",
      "quantity", "unitPrice", "taxRate", "discount", "status", "method", "notes", "formTotal",
      "resetFormButton", "cancelEditButton", "entryTitle", "entrySubtitle", "recordsBody",
      "recordsMeta", "emptyState", "fromDate", "toDate", "statusFilter", "methodFilter",
      "clearFiltersButton", "exportCsvButton", "backupButton", "importButton", "importFile",
      "printButton", "barChart", "bestMonth", "outstandingSummary", "chartYear", "storageStatus",
      "toast", "recordDialog", "recordDetail", "closeDialogButton", "dialogEditButton",
      "dialogPrintButton", "menuButton"
    ].forEach((id) => {
      els[id] = document.getElementById(id);
    });

    els.kpiTotalSales = document.getElementById("kpiTotalSales");
    els.kpiTotalCount = document.getElementById("kpiTotalCount");
    els.kpiPaid = document.getElementById("kpiPaid");
    els.kpiPaidCount = document.getElementById("kpiPaidCount");
    els.kpiPending = document.getElementById("kpiPending");
    els.kpiPendingCount = document.getElementById("kpiPendingCount");
    els.kpiAverage = document.getElementById("kpiAverage");
    els.kpiLatest = document.getElementById("kpiLatest");
    els.sidebar = document.querySelector(".sidebar");
  }

  function seedDefaults() {
    const settings = getSettings();
    if (!settings.seeded && state.records.length === 0) {
      state.records = sampleRecords;
      saveRecords();
      saveSettings({ ...settings, seeded: true });
    }
  }

  function setInitialDates() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    els.fromDate.value = toInputDate(firstDay);
    els.toDate.value = toInputDate(today);
  }

  function bindEvents() {
    els.salesForm.addEventListener("submit", onSaveRecord);
    ["quantity", "unitPrice", "taxRate", "discount"].forEach((id) => {
      els[id].addEventListener("input", updateFormTotal);
    });

    els.resetFormButton.addEventListener("click", resetForm);
    els.cancelEditButton.addEventListener("click", resetForm);
    els.clearFiltersButton.addEventListener("click", clearFilters);
    els.exportCsvButton.addEventListener("click", exportCsv);
    els.backupButton.addEventListener("click", exportJson);
    document.querySelector("[data-action='backup']").addEventListener("click", exportJson);
    els.importButton.addEventListener("click", () => els.importFile.click());
    els.importFile.addEventListener("change", importFile);
    els.printButton.addEventListener("click", () => window.print());
    els.dialogPrintButton.addEventListener("click", () => window.print());
    els.closeDialogButton.addEventListener("click", () => els.recordDialog.close());
    els.dialogEditButton.addEventListener("click", () => {
      if (state.selectedRecordId) {
        editRecord(state.selectedRecordId);
        els.recordDialog.close();
      }
    });
    els.menuButton.addEventListener("click", () => els.sidebar.classList.toggle("open"));

    [els.globalSearch, els.fromDate, els.toDate, els.statusFilter, els.methodFilter, els.chartYear].forEach((element) => {
      element.addEventListener("input", render);
      element.addEventListener("change", render);
    });

    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.scrollTarget);
        if (target) {
          target.scrollIntoView({ block: "start", behavior: "smooth" });
        }
        els.sidebar.classList.remove("open");
      });
    });
  }

  function onSaveRecord(event) {
    event.preventDefault();
    const record = {
      id: els.recordId.value || crypto.randomUUID(),
      invoiceNo: clean(els.invoiceNo.value),
      saleDate: els.saleDate.value,
      customer: clean(els.customer.value),
      item: clean(els.item.value),
      quantity: numberValue(els.quantity.value),
      unitPrice: numberValue(els.unitPrice.value),
      taxRate: numberValue(els.taxRate.value),
      discount: numberValue(els.discount.value),
      status: els.status.value,
      method: els.method.value,
      notes: clean(els.notes.value)
    };

    const existingIndex = state.records.findIndex((item) => item.id === record.id);
    if (existingIndex >= 0) {
      state.records[existingIndex] = record;
      showToast("Sales record updated.");
    } else {
      state.records.unshift(record);
      showToast("Sales record saved.");
    }

    saveRecords();
    resetForm();
    render();
  }

  function resetForm() {
    els.recordId.value = "";
    els.invoiceNo.value = nextInvoiceNo();
    els.saleDate.value = toInputDate(new Date());
    els.customer.value = "";
    els.item.value = "";
    els.quantity.value = "1";
    els.unitPrice.value = "";
    els.taxRate.value = "6";
    els.discount.value = "0";
    els.status.value = "Pending";
    els.method.value = "Bank Transfer";
    els.notes.value = "";
    els.entryTitle.textContent = "New Sales Entry";
    els.entrySubtitle.textContent = "Create a complete sales record with payment status.";
    els.cancelEditButton.hidden = true;
    updateFormTotal();
  }

  function editRecord(id) {
    const record = state.records.find((item) => item.id === id);
    if (!record) return;

    els.recordId.value = record.id;
    els.invoiceNo.value = record.invoiceNo;
    els.saleDate.value = record.saleDate;
    els.customer.value = record.customer;
    els.item.value = record.item;
    els.quantity.value = record.quantity;
    els.unitPrice.value = record.unitPrice;
    els.taxRate.value = record.taxRate;
    els.discount.value = record.discount;
    els.status.value = record.status;
    els.method.value = record.method;
    els.notes.value = record.notes || "";
    els.entryTitle.textContent = "Edit Sales Entry";
    els.entrySubtitle.textContent = record.invoiceNo;
    els.cancelEditButton.hidden = false;
    updateFormTotal();
    document.getElementById("entry").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function deleteRecord(id) {
    const record = state.records.find((item) => item.id === id);
    if (!record) return;
    const ok = window.confirm(`Delete ${record.invoiceNo} for ${record.customer}?`);
    if (!ok) return;

    state.records = state.records.filter((item) => item.id !== id);
    saveRecords();
    render();
    showToast("Sales record deleted.");
  }

  function viewRecord(id) {
    const record = state.records.find((item) => item.id === id);
    if (!record) return;

    state.selectedRecordId = id;
    const total = calculateTotal(record);
    const subtotal = record.quantity * record.unitPrice;
    const tax = subtotal * (record.taxRate / 100);
    els.recordDetail.innerHTML = [
      detailItem("Invoice No.", record.invoiceNo),
      detailItem("Date", formatDate(record.saleDate)),
      detailItem("Customer", record.customer),
      detailItem("Product / Service", record.item),
      detailItem("Quantity", record.quantity),
      detailItem("Unit Price", currency.format(record.unitPrice)),
      detailItem("Subtotal", currency.format(subtotal)),
      detailItem("Tax", currency.format(tax)),
      detailItem("Discount", currency.format(record.discount)),
      detailItem("Total Amount", currency.format(total)),
      detailItem("Payment Status", record.status),
      detailItem("Payment Method", record.method),
      detailItem("Notes", record.notes || "-", "full")
    ].join("");
    els.recordDialog.showModal();
  }

  function detailItem(label, value, className) {
    return `<div class="detail-item ${className || ""}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(String(value))}</strong></div>`;
  }

  function updateFormTotal() {
    const record = {
      quantity: numberValue(els.quantity.value),
      unitPrice: numberValue(els.unitPrice.value),
      taxRate: numberValue(els.taxRate.value),
      discount: numberValue(els.discount.value)
    };
    els.formTotal.textContent = currency.format(calculateTotal(record));
  }

  function render() {
    fillChartYears();
    const filtered = getFilteredRecords();
    renderKpis(filtered);
    renderChart();
    renderTable(filtered);
    els.storageStatus.textContent = `${state.records.length} records stored`;
  }

  function renderKpis(records) {
    const total = sum(records, calculateTotal);
    const paidRecords = records.filter((item) => item.status === "Paid");
    const pendingRecords = records.filter((item) => item.status === "Pending" || item.status === "Partial");
    const paid = sum(paidRecords, calculateTotal);
    const pending = sum(pendingRecords, calculateTotal);
    const average = records.length ? total / records.length : 0;
    const latest = [...records].sort((a, b) => b.saleDate.localeCompare(a.saleDate))[0];

    els.kpiTotalSales.textContent = currency.format(total);
    els.kpiTotalCount.textContent = `${records.length} records`;
    els.kpiPaid.textContent = currency.format(paid);
    els.kpiPaidCount.textContent = `${paidRecords.length} paid`;
    els.kpiPending.textContent = currency.format(pending);
    els.kpiPendingCount.textContent = `${pendingRecords.length} outstanding`;
    els.kpiAverage.textContent = currency.format(average);
    els.kpiLatest.textContent = latest ? `Latest ${formatDate(latest.saleDate)}` : "No records yet";
  }

  function renderChart() {
    const year = Number(els.chartYear.value) || new Date().getFullYear();
    const totals = new Array(12).fill(0);
    state.records.forEach((record) => {
      const date = new Date(`${record.saleDate}T00:00:00`);
      if (date.getFullYear() === year) {
        totals[date.getMonth()] += calculateTotal(record);
      }
    });

    const max = Math.max(...totals, 1);
    const bestIndex = totals.indexOf(Math.max(...totals));
    els.bestMonth.textContent = totals[bestIndex] > 0 ? `${months[bestIndex]} ${currency.format(totals[bestIndex])}` : "-";
    const outstanding = sum(state.records.filter((item) => item.status !== "Paid"), calculateTotal);
    els.outstandingSummary.textContent = currency.format(outstanding);

    els.barChart.innerHTML = totals.map((total, index) => {
      const height = Math.max(4, Math.round((total / max) * 210));
      return `
        <div class="bar" style="--bar-height: ${height}px">
          <span class="bar-value">${currency.format(total)}</span>
          <span class="bar-fill" style="height: ${height}px"></span>
          <span class="bar-label">${months[index]}</span>
        </div>
      `;
    }).join("");
  }

  function renderTable(records) {
    els.recordsMeta.textContent = `Showing ${records.length} of ${state.records.length} records`;
    els.emptyState.hidden = records.length > 0;
    els.recordsBody.innerHTML = records.map((record) => {
      const subtotal = record.quantity * record.unitPrice;
      const tax = subtotal * (record.taxRate / 100);
      return `
        <tr>
          <td>${escapeHtml(record.invoiceNo)}</td>
          <td>${formatDate(record.saleDate)}</td>
          <td>${escapeHtml(record.customer)}</td>
          <td>${escapeHtml(record.item)}</td>
          <td class="num">${formatNumber(record.quantity)}</td>
          <td class="num">${currency.format(record.unitPrice)}</td>
          <td class="num">${currency.format(tax)}</td>
          <td class="num">${currency.format(record.discount)}</td>
          <td class="num"><strong>${currency.format(calculateTotal(record))}</strong></td>
          <td><span class="status-pill ${statusClass(record.status)}">${escapeHtml(record.status)}</span></td>
          <td>${escapeHtml(record.method)}</td>
          <td>
            <div class="row-actions">
              <button class="icon-button" type="button" aria-label="View ${escapeHtml(record.invoiceNo)}" data-view="${record.id}"><span class="icon">${icons.eye}</span></button>
              <button class="icon-button" type="button" aria-label="Edit ${escapeHtml(record.invoiceNo)}" data-edit="${record.id}"><span class="icon">${icons.edit}</span></button>
              <button class="danger-button" type="button" aria-label="Delete ${escapeHtml(record.invoiceNo)}" data-delete="${record.id}"><span class="icon">${icons.trash}</span></button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    els.recordsBody.querySelectorAll("[data-view]").forEach((button) => {
      button.addEventListener("click", () => viewRecord(button.dataset.view));
    });
    els.recordsBody.querySelectorAll("[data-edit]").forEach((button) => {
      button.addEventListener("click", () => editRecord(button.dataset.edit));
    });
    els.recordsBody.querySelectorAll("[data-delete]").forEach((button) => {
      button.addEventListener("click", () => deleteRecord(button.dataset.delete));
    });
  }

  function getFilteredRecords() {
    const query = clean(els.globalSearch.value).toLowerCase();
    const from = els.fromDate.value;
    const to = els.toDate.value;
    const status = els.statusFilter.value;
    const method = els.methodFilter.value;

    return [...state.records]
      .filter((record) => {
        const haystack = [
          record.invoiceNo,
          record.customer,
          record.item,
          record.status,
          record.method,
          record.notes
        ].join(" ").toLowerCase();
        return !query || haystack.includes(query);
      })
      .filter((record) => !from || record.saleDate >= from)
      .filter((record) => !to || record.saleDate <= to)
      .filter((record) => !status || record.status === status)
      .filter((record) => !method || record.method === method)
      .sort((a, b) => b.saleDate.localeCompare(a.saleDate) || b.invoiceNo.localeCompare(a.invoiceNo));
  }

  function clearFilters() {
    els.globalSearch.value = "";
    els.fromDate.value = "";
    els.toDate.value = "";
    els.statusFilter.value = "";
    els.methodFilter.value = "";
    render();
  }

  function fillChartYears() {
    const years = new Set(state.records.map((record) => new Date(`${record.saleDate}T00:00:00`).getFullYear()));
    years.add(new Date().getFullYear());
    const currentValue = els.chartYear.value || String(new Date().getFullYear());
    const options = [...years].sort((a, b) => b - a);
    els.chartYear.innerHTML = options.map((year) => `<option value="${year}">${year}</option>`).join("");
    els.chartYear.value = options.includes(Number(currentValue)) ? currentValue : String(options[0]);
  }

  function exportCsv() {
    const records = getFilteredRecords();
    const header = [
      "Invoice No", "Date", "Customer", "Product / Service", "Quantity", "Unit Price",
      "Tax Rate", "Discount", "Total Amount", "Payment Status", "Payment Method", "Notes"
    ];
    const rows = records.map((record) => [
      record.invoiceNo,
      record.saleDate,
      record.customer,
      record.item,
      record.quantity,
      record.unitPrice,
      record.taxRate,
      record.discount,
      calculateTotal(record).toFixed(2),
      record.status,
      record.method,
      record.notes || ""
    ]);
    const csv = [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
    downloadFile(csv, `sales-records-${toInputDate(new Date())}.csv`, "text/csv;charset=utf-8");
    showToast(`Exported ${records.length} records to CSV.`);
  }

  function exportJson() {
    const backup = {
      app: "Sales Record System",
      exportedAt: new Date().toISOString(),
      records: state.records
    };
    downloadFile(JSON.stringify(backup, null, 2), `sales-records-backup-${toInputDate(new Date())}.json`, "application/json");
    showToast("Backup JSON downloaded.");
  }

  function importFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = file.name.toLowerCase().endsWith(".csv")
          ? parseCsvRecords(String(reader.result))
          : parseJsonRecords(String(reader.result));

        if (!imported.length) {
          showToast("No records found in import file.");
          return;
        }

        const existingInvoices = new Set(state.records.map((record) => record.invoiceNo));
        const unique = imported.filter((record) => !existingInvoices.has(record.invoiceNo));
        state.records = [...unique, ...state.records];
        saveRecords();
        render();
        showToast(`Imported ${unique.length} new records.`);
      } catch (error) {
        showToast(`Import failed: ${error.message}`);
      } finally {
        els.importFile.value = "";
      }
    };
    reader.readAsText(file);
  }

  function parseJsonRecords(text) {
    const parsed = JSON.parse(text);
    const rows = Array.isArray(parsed) ? parsed : parsed.records;
    if (!Array.isArray(rows)) {
      throw new Error("JSON must contain a records array.");
    }
    return rows.map(normalizeRecord);
  }

  function parseCsvRecords(text) {
    const rows = parseCsv(text);
    if (rows.length < 2) return [];
    const headers = rows[0].map((item) => clean(item).toLowerCase());
    return rows.slice(1).filter((row) => row.some(Boolean)).map((row) => {
      const object = {};
      headers.forEach((header, index) => {
        object[header] = row[index] || "";
      });
      return normalizeRecord({
        invoiceNo: object["invoice no"] || object.invoice || object["invoice #"],
        saleDate: object.date,
        customer: object.customer,
        item: object["product / service"] || object.product || object.service,
        quantity: object.quantity,
        unitPrice: object["unit price"],
        taxRate: object["tax rate"],
        discount: object.discount,
        status: object["payment status"] || object.status,
        method: object["payment method"] || object.method,
        notes: object.notes
      });
    });
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let value = "";
    let quoted = false;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      const next = text[index + 1];
      if (quoted && char === '"' && next === '"') {
        value += '"';
        index += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (!quoted && char === ",") {
        row.push(value);
        value = "";
      } else if (!quoted && (char === "\n" || char === "\r")) {
        if (char === "\r" && next === "\n") index += 1;
        row.push(value);
        rows.push(row);
        row = [];
        value = "";
      } else {
        value += char;
      }
    }

    row.push(value);
    rows.push(row);
    return rows;
  }

  function normalizeRecord(input) {
    const record = {
      id: input.id || crypto.randomUUID(),
      invoiceNo: clean(input.invoiceNo || input.invoice_no || input.invoice || nextInvoiceNo()),
      saleDate: validDate(input.saleDate || input.sale_date || input.date) || toInputDate(new Date()),
      customer: clean(input.customer || "Imported Customer"),
      item: clean(input.item || input.product || input.service || "Imported Item"),
      quantity: numberValue(input.quantity || input.qty || 1),
      unitPrice: numberValue(input.unitPrice || input.unit_price || 0),
      taxRate: numberValue(input.taxRate || input.tax_rate || 0),
      discount: numberValue(input.discount || 0),
      status: clean(input.status || "Pending"),
      method: clean(input.method || "Bank Transfer"),
      notes: clean(input.notes || "")
    };

    if (!["Paid", "Pending", "Partial"].includes(record.status)) {
      record.status = "Pending";
    }
    return record;
  }

  function calculateTotal(record) {
    const subtotal = numberValue(record.quantity) * numberValue(record.unitPrice);
    const tax = subtotal * (numberValue(record.taxRate) / 100);
    return Math.max(0, subtotal + tax - numberValue(record.discount));
  }

  function loadRecords() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn(error);
      return [];
    }
  }

  function saveRecords() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.records));
  }

  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    } catch (error) {
      return {};
    }
  }

  function saveSettings(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  function nextInvoiceNo() {
    const year = new Date().getFullYear();
    const numbers = state.records
      .map((record) => record.invoiceNo)
      .filter((invoice) => invoice && invoice.includes(String(year)))
      .map((invoice) => Number((invoice.match(/(\d+)$/) || [0, 0])[1]))
      .filter(Boolean);
    const next = Math.max(0, ...numbers) + 1;
    return `INV-${year}-${String(next).padStart(3, "0")}`;
  }

  function numberValue(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
  }

  function sum(records, mapper) {
    return records.reduce((total, record) => total + mapper(record), 0);
  }

  function clean(value) {
    return String(value || "").trim();
  }

  function formatDate(value) {
    if (!value) return "-";
    return dateFormatter.format(new Date(`${value}T00:00:00`));
  }

  function toInputDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function validDate(value) {
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? "" : toInputDate(date);
  }

  function formatNumber(value) {
    return Number(value).toLocaleString("en-MY", { maximumFractionDigits: 2 });
  }

  function statusClass(status) {
    return {
      Paid: "status-paid",
      Pending: "status-pending",
      Partial: "status-partial"
    }[status] || "status-pending";
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
  }

  function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 2800);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator && location.protocol !== "file:") {
      navigator.serviceWorker.register("service-worker.js").catch(() => {});
    }
  }
})();
