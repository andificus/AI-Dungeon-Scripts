// Your "Input" tab should look like this
InnerSelf("input");
const modifier = (text) => {

    const trimmed = text.trim();
    const lower   = trimmed.toLowerCase();

    // ── SETUP PHASE ──────────────────────────────────────────────
    if (!RPG.setup.complete) {

        // Guard 1: Skip on the very first turn.
        // history.length === 0 means the opening text is being
        // processed — we never want to parse that as a setup answer.
        if (history.length === 0) return { text };

        // Guard 2: Skip long inputs.
        // Player setup answers are short (a number, a name, a word).
        // Anything over 300 chars is AI-generated story content or
        // the opening prompt echoed back — not a player answer.
        if (trimmed.length > 300) return { text };

        const consumed = RPG_parseSetupInput(trimmed);
        if (consumed) {
            return { text: "\u200B" };
        }
        // Input not recognized for this step — let it pass through
        return { text };
    }

    // ── SLASH COMMANDS ───────────────────────────────────────────
    if (trimmed.startsWith("/")) {
        const cmd = lower.slice(1).trim();

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
            RPG.commandOutput = handler();
            return { text: "\u200B" };
        }
        // Unrecognized /command — let Inner-Self handle it (/ac etc.)
    }

    // ── NORMAL INPUT ─────────────────────────────────────────────
    return { text };
};
modifier(text);
