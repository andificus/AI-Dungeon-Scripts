// Your "Output" tab should look like this
InnerSelf("output");
const modifier = (text) => {

    if (!state.RPG) return { text };

    // ── SLASH COMMAND DETECTION ──────────────────────────────────
    // Read the player's last action from history.
    // Since input.js no longer modifies slash commands, the original
    // text is in history and we can reliably detect commands here.
    if (history && history.length > 0) {
        const last = history[history.length - 1];
        const action = (last.text || last.input || last.rawText || "").trim();
        const slashIdx = action.indexOf("/");

        if (slashIdx !== -1) {
            const afterSlash = action.slice(slashIdx + 1).replace(/[.,!?\s]+$/, "");
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
                    return { text: handler() };
                }
            }
        }
    }

    // ── TAG PROCESSING ───────────────────────────────────────────
    if (text.includes("[LOOT:")) {
        if (RPG_parseLootTag(text)) {
            RPG_updateInventoryCard();
            text = text.replace(/\s*\[LOOT:[^\]]*\]/gi, "").trimEnd();
        }
    }

    if (text.includes("[QUEST:")) {
        if (RPG_parseQuestTag(text)) {
            text = text.replace(/\s*\[QUEST:[^\]]*\]/gi, "").trimEnd();
        }
    }

    const hasSystemTag = (
        text.includes("[KARMA:")     ||
        text.includes("[SKILL:")     ||
        text.includes("[TITLE:")     ||
        text.includes("[ACH:")       ||
        text.includes("[COMPANION:") ||
        text.includes("[EVOLVE:")    ||
        text.includes("[XP:")        ||
        text.includes("[HP:")        ||
        text.includes("[MP:")
    );
    if (hasSystemTag) {
        RPG_parseSystemTags(text);
        text = RPG_stripSystemTags(text);
    }

    // ── NOTIFICATION QUEUE ───────────────────────────────────────
    const notifications = RPG_flushNotifications();
    if (notifications.length) {
        const isPlaceholder = text.replace(/[\u200B-\u200D\s]/g, "").length === 0;
        const base = isPlaceholder ? "" : text.trimEnd();
        text = base
            ? base + "\n\n" + notifications.join("\n")
            : notifications.join("\n");
    }

    return { text };
};
modifier(text);
