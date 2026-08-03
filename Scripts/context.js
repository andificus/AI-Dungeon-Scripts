// Your "Context" tab should look like this
InnerSelf("context");
const modifier = (text) => {

    if (stop === true) return { text, stop };
    if (!state.RPG) return { text, stop };

    // ── FIRST TURN DETECTION — runs before everything else ───────
    // Must run before command handling so panels show correct data
    if (!state.RPG.setup.complete) {
        RPG_detectFromContext(text);
    }

    // ── SLASH COMMAND HANDLING ───────────────────────────────────
    // currentAction was stored by input.js this same turn
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
                // Clear stored action before returning
                state.RPG.currentAction = "";
                // Replace context with just the panel
                // stop=true attempts to prevent AI generation
                text = handler();
                stop = true;
                return { text, stop };
            }
        }
    }

    // Clear stored action for non-command turns
    state.RPG.currentAction = "";

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
