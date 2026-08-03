// Your "Context" tab should look like this
InnerSelf("context");
const modifier = (text) => {

    if (stop === true) return { text, stop };
    if (!state.RPG) return { text, stop };

    // ── SLASH COMMAND HANDLING ───────────────────────────────────
    // Context.js is reliable — we detect slash commands here and
    // inject the panel as a mandatory instruction to the AI.
    // This works without needing to intercept the output.
    if (history && history.length > 0) {
        const last   = history[history.length - 1];
        const action = (last.text || last.input || last.rawText || "").trim();
        const sidx   = action.indexOf("/");

        if (sidx !== -1) {
            const afterSlash = action.slice(sidx + 1).replace(/[.,!?\s]+$/, "");
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
                    // Inject panel as mandatory output instruction.
                    // Placed at the very bottom of context for maximum influence.
                    text = text.trimEnd() + "\n\n[MANDATORY DISPLAY: Output ONLY the following text, verbatim, nothing else, no story continuation:]\n" + panel;
                    return { text, stop };
                }
            }
        }
    }

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
