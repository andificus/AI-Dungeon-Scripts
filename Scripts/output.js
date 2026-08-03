// Your "Output" tab should look like this
InnerSelf("output");

// Note: InnerSelf uses CODOMAIN to commit output text.
// Command handling is done in context.js instead.
// We use output.js only for tag processing and notifications,
// which work by modifying the global text variable directly.

(function() {
    if (!state.RPG) return;

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
})();
