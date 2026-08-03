// Your "Input" tab should look like this
InnerSelf("input");
const modifier = (text) => {
    // state is always accessible — create local RPG alias
    const RPG = state.RPG;
    if (!RPG) return { text };

    const trimmed = text.trim();

    // ── SLASH COMMANDS ───────────────────────────────────────────
    // Scan for "/" anywhere — handles Do mode ("You /stats")
    // and Story mode ("/stats") equally
    const slashIdx = trimmed.indexOf("/");
    if (slashIdx !== -1) {
        const afterSlash = trimmed.slice(slashIdx + 1).trimEnd().replace(/[.,!?]+$/, "");

        // /setclass ClassName
        if (afterSlash.toLowerCase().startsWith("setclass ")) {
            const className = afterSlash.slice(9).trim();
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
            RPG.commandOutput = handler();
            return { text: "\u200B" };
        }
    }

    return { text };
};
modifier(text);
