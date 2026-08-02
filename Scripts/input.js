// Your "Input" tab should look like this
InnerSelf("input");
const modifier = (text) => {

    const trimmed = text.trim();
    const lower   = trimmed.toLowerCase();

    // ── SLASH COMMANDS ───────────────────────────────────────────
    if (trimmed.startsWith("/")) {
        const cmd = lower.slice(1).trim();

        // /setclass ClassName — records class after in-game crystal reveal
        if (cmd.startsWith("setclass ")) {
            const className = trimmed.slice(10).trim(); // slice "/setclass "
            if (className) {
                RPG.class.name                = className;
                RPG.player.startingClass      = className;
                RPG.player.classRevealPending = false;
                RPG_notify(RPG_HR);
                RPG_notify(`⚔  CLASS REGISTERED: ${className}`);
                RPG_notify("Your stat screen now reflects your true class.");
                RPG_notify(RPG_HR);
                return { text: "\u200B" };
            }
        }

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
    }

    return { text };
};
modifier(text);
