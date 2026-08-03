// Your "Input" tab should look like this
InnerSelf("input");
const modifier = (text) => {

    const trimmed = text.trim();

    // ── SLASH COMMANDS ───────────────────────────────────────────
    const slashIdx = trimmed.indexOf("/");
    if (slashIdx !== -1) {
        const afterSlash = trimmed.slice(slashIdx + 1).trimEnd().replace(/[.,!?]+$/, "");
        const lower = afterSlash.toLowerCase();

        // /setclass ClassName
        if (lower.startsWith("setclass ")) {
            const className = afterSlash.slice(9).trim();
            if (className && state.RPG) {
                state.RPG.class.name                = className;
                state.RPG.player.startingClass      = className;
                state.RPG.player.classRevealPending = false;
                state.RPG.notifications.push(RPG_HR);
                state.RPG.notifications.push(`⚔  CLASS REGISTERED: ${className}`);
                state.RPG.notifications.push(RPG_HR);
                return { text: "\u200B" };
            }
        }

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
        if (handler && state.RPG) {
            state.RPG.commandOutput = handler();
            return { text: "\u200B" };
        }
    }

    return { text };
};
modifier(text);
