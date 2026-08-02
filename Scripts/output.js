// Your "Output" tab should look like this
InnerSelf("output");
const modifier = (text) => {

    // ── TAG PROCESSING ───────────────────────────────────────────
    // Scan for all system update tags the AI may have appended.
    // Parse them, update state and story cards, then strip from
    // visible text. Players never see the raw tags.

    // Economy tags — update inventory story card if found
    if (text.includes("[LOOT:")) {
        if (RPG_parseLootTag(text)) {
            RPG_updateInventoryCard();
            text = text.replace(/\s*\[LOOT:[^\]]*\]/gi, "").trimEnd();
        }
    }

    // Quest tags — update quest story card if found
    if (text.includes("[QUEST:")) {
        if (RPG_parseQuestTag(text)) {
            text = text.replace(/\s*\[QUEST:[^\]]*\]/gi, "").trimEnd();
        }
    }

    // All other system tags — karma, skills, titles, achievements,
    // companions, class evolution, XP, HP, MP
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
