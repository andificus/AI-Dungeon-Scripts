// Your "Output" tab should look like this
InnerSelf("output");
const modifier = (text) => {

    // ── LOOT TAG PROCESSING ──────────────────────────────────────
    // If the AI appended a [LOOT:...] tag, parse it, update state
    // and the inventory story card, then strip the tag from the
    // visible text. The player never sees the raw tag.
    if (text.includes("[LOOT:")) {
        const found = RPG_parseLootTag(text);
        if (found) {
            RPG_updateInventoryCard();
            text = text.replace(/\s*\[LOOT:[^\]]*\]/gi, "").trimEnd();
        }
    }

    // ── COMMAND OUTPUT ───────────────────────────────────────────
    // A slash command was processed this turn — show the panel
    // and discard whatever the AI generated (was a "\u200B" turn).
    if (RPG.commandOutput) {
        const panel = RPG.commandOutput;
        RPG.commandOutput = null;
        return { text: panel };
    }

    // ── NOTIFICATION QUEUE ───────────────────────────────────────
    // Display any queued system notifications after story text.
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
