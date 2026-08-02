// Your "Context" tab should look like this
InnerSelf("context");
const modifier = (text) => {

    // Respect Inner-Self / Auto-Cards stop signals
    if (stop === true) return { text, stop };

    // ── FIRST TURN DETECTION ─────────────────────────────────────
    // On the very first turn, the Character Creator's filled-in
    // opening text is in context. We read it to extract the player's
    // cheat selection and character details, then mark setup complete.
    if (!RPG.setup.complete) {
        RPG_detectFromContext(text);
    }

    // ── SYSTEM MEMO INJECTION ────────────────────────────────────
    // Inject player identity and active cheat blocks before
    // "Recent Story:" every turn so the AI always knows who the
    // player is and which systems are running.
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
