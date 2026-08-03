// Your "Context" tab should look like this
InnerSelf("context");
const modifier = (text) => {

    if (stop === true) return { text, stop };
    if (!state.RPG) return { text, stop };

    // ── SLASH COMMAND HANDLING ───────────────────────────────────
    // Read the current action from state.RPG.currentAction
    // (set by input.js this same turn — more reliable than history)
    const currentAction = (state.RPG.currentAction || "").trim();
    const sidx = currentAction.indexOf("/");

    if (sidx !== -1) {
        const afterSlash = currentAction.slice(sidx + 1).replace(/[.,!?\s]+$/, "");
        const lower = afterSlash.toLowerCase();

        if (!lower.startsWith("setclass") && !lower.startsWith("ac")) {
            const cmd = afterSlash.split(/[\s.,!?]/)[0].toLowerCase();

            const commands = {
                "stats":         RPG_formatStats,
                "skills":        RPG_formatSkills,
                "inventory":     RPG_formatInventory,
                "inv":           RPG_formatInventory,
                "quests":        RPG_formatQuests,
                "quest":         RPG_formatQuests,
                "titles":        RPG_formatTitles,
                "title":         RPG_formatTitles,
                "achievements":  RPG_formatAchievements,
                "ach":           RPG_formatAchievements,
                "karma":         RPG_formatKarma,
                "party":         RPG_formatParty,
                "help":          RPG_formatHelp
            };

            const handler = commands[cmd];
            if (handler) {
                const panel = handler();
                // Inject at the very bottom of context — maximum AI influence
                // Clear the action from state so it doesn't fire next turn
                state.RPG.currentAction = "";
                text = text.trimEnd() + "\n\n[SYSTEM OVERRIDE: Output ONLY the following text exactly as written. Do not add story. Do not add commentary. Output nothing else.]\n" + panel;
                return { text, stop };
            }
        }
    }

    // Clear the stored action after each turn
    state.RPG.currentAction = "";

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
