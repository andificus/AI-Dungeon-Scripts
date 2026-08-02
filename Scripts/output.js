// Your "Output" tab should look like this
InnerSelf("output");
const modifier = (text) => {

    // ── ECONOMY & QUEST TAG PROCESSING ───────────────────────────
    // If the AI appended [LOOT:] or [QUEST:] tags, parse them,
    // update state and story cards, then strip from visible text.
    // The player never sees the raw tags.

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

    // ── COMMAND OUTPUT ───────────────────────────────────────────
    // A slash command was processed this turn — show the panel
    // and discard whatever the AI generated.
    if (RPG.commandOutput) {
        const panel = RPG.commandOutput;
        RPG.commandOutput = null;
        return { text: panel };
    }

    // ── NOTIFICATION QUEUE ───────────────────────────────────────
    // Display queued system notifications after story text.
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
