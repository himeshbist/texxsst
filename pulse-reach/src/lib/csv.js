import Papa from "papaparse";

export function parseCSV(file) {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (h) => h.trim().toLowerCase(),
            complete: (res) => resolve(res.data || []),
            error: reject,
        });
    });
}

export function applyMergeTags(template, data) {
    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
        const v = data?.[key];
        return v == null ? "" : String(v);
    });
}

export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}