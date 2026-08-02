// Your "Input" tab should look like this
InnerSelf("input");
const modifier = (text) => {

    const trimmed = text.trim();
    const lower   = trimmed.toLowerCase();

    // ── SLASH COMMANDS ───────────────────────────────────────────
    // Character creation is now handled by AID's Character Creator.
    // This tab only needs to handle slash commands during gameplay.
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
        // Unrecognized /command — pass through (keeps /ac working)
    }

    // ── NORMAL INPUT ─────────────────────────────────────────────
    return { text };
};
modifier(text);
