// Your "Input" tab should look like this
InnerSelf("input");
const modifier = (text) => {

    const trimmed = text.trim();
    const lower   = trimmed.toLowerCase();

    // ── SETUP PHASE ──────────────────────────────────────────────
    // Character creation is in progress.
    // Pass the player's answer to the setup parser.
    // If the answer was consumed, return a zero-width space so AID
    // still generates output (the next question from context.js)
    // but the raw answer ("3", "Warrior", "yes") doesn't appear
    // in the story. Inner-Self also skips these turns correctly
    // since it treats zero-width space turns as non-events.
    if (!RPG.setup.complete) {
        const consumed = RPG_parseSetupInput(trimmed);
        if (consumed) {
            return { text: "\u200B" };
        }
        // Input not recognized for this step (e.g. typo on origin choice)
        // Let it pass through so the AI can naturally prompt again
        return { text };
    }

    // ── SLASH COMMANDS ───────────────────────────────────────────
    // Detect /command syntax and display the appropriate panel.
    // Command output is stored in RPG.commandOutput and displayed
    // by output.js prepending it before the AI's generated text.
    // The player's input is replaced with zero-width space so the
    // AI doesn't generate story content for a command turn.
    if (trimmed.startsWith("/")) {
        const cmd = lower.slice(1).trim();

        // Map commands to their formatter functions
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
            // Store output — output.js picks this up and displays it
            RPG.commandOutput = handler();
            // Zero-width space: turn still processes but AI generates nothing visible
            return { text: "\u200B" };
        }

        // Unrecognized /command — let Inner-Self and the AI handle it
        // (Also keeps /ac working for Auto-Cards commands)
    }

    // ── NORMAL INPUT ─────────────────────────────────────────────
    // Pass through to Inner-Self and the AI unchanged
    return { text };
};
modifier(text);
