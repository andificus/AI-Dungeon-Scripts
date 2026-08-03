// Your "Output" tab should look like this
InnerSelf("output");
const modifier = (text) => {

    if (!state.RPG) return { text };

    // ── SLASH COMMAND DETECTION ──────────────────────────────────
    // Check the player's last action directly from history.
    // This bypasses cross-tab variable sharing entirely.
    // Works regardless of input mode (Do/Story).
    const lastAction = (history.length > 0)
        ? (history[history.length - 1].text || history[history.length - 1].input || "")
        : "";

    const slashIdx = lastAction.indexOf("/");
    if (slashIdx !== -1) {
        const afterSlash = lastAction.slice(slashIdx + 1).replace(/[.,!?\s]+$/, "");
        const lower = afterSlash.toLowerCase();

        // /setclass is handled in input.js — skip it here
        if (!lower.startsWith("setclass")) {
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
