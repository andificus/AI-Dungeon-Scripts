// Your "Context" tab should look like this
InnerSelf("context");
const modifier = (text) => {

    if (stop === true) return { text, stop };
    if (!state.RPG) return { text, stop };

    // ── FIRST TURN DETECTION ─────────────────────────────────────
    if (!state.RPG.setup.complete) {
        RPG_detectFromContext(text);
    }

    // ── UPDATE STATS STORY CARD ──────────────────────────────────
    // Keeps the Status Screen card current every turn.
    // The card auto-injects when /stats appears in recent story.
    RPG_updateStatsCard();

    // ── SLASH COMMAND HANDLING ───────────────────────────────────
    const currentAction = (state.RPG.currentAction || "").trim();
    state.RPG.currentAction = "";
    const sidx = currentAction.indexOf("/");

    if (sidx !== -1) {
        const afterSlash = currentAction.slice(sidx + 1).replace(/[.,!?\s]+$/, "");
        const lower = afterSlash.toLowerCase();

        if (!lower.startsWith("setclass") && !lower.startsWith("ac")) {
            const cmd = afterSlash.split(/[\s.,!?]/)[0].toLowerCase();

            const validCmds = ["stats","skills","inventory","inv","quests","quest",
                               "titles","title","achievements","ach","karma","party","help"];

            if (validCmds.includes(cmd)) {
                // Inject a strong override at the bottom of context.
                // The Status Screen story card also injects for /stats.
                // Combined, these force the AI to output only the panel.
                text = text.trimEnd() + "\n\n[SYSTEM: The player has typed /" + cmd + ". Output ONLY the Status Screen card content that appears in World Lore above. No story. No narration. No additions. Output it verbatim and stop.]";
                return { text, stop };
            }
        }
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
