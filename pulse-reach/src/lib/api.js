export async function sendTestEmail({ to, subject }) {
    // Simulated network delay
    await new Promise((r) => setTimeout(r, 600));
    // Fake success
    return { ok: true, id: crypto.randomUUID(), to, subject };
}

export async function sendBulkEmails({ list, perDelay = 250 }) {
    // Simulate chunked sending
    const results = [];
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        await new Promise((r) => setTimeout(r, perDelay));
        const ok = Math.random() > 0.03; // ~97% success
        results.push({ email: item.email, ok });
    }
    return results;
}