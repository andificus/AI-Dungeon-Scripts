// Your "Context" tab should look like this
InnerSelf("context");
const modifier = (text) => {

    if (stop === true) return { text, stop };
    if (!state.RPG) return { text, stop };

    // ── FIRST TURN DETECTION ─────────────────────────────────────
    if (!state.RPG.setup.complete) {
        RPG_detectFromContext(text);
    }

    // ── SYSTEM MEMO INJECTION ────────────────────────────────────
    const memo = RPG_buildContextMemo();
    if (memo) {
        const marker = "Recent Story:";
        const idx    = text.indexOf(marker);
        if (idx !== -1) {
            text = text.slice(0, idx).trimEnd()
                + "\n\n" + memo + "\n\n"
                + text.slice(idx);
        } else {
            text = memo + "\n\n" + text;
        }
    }

    return { text, stop };
};
modifier(text);
