// Your "Output" tab should look like this
InnerSelf("output");
const modifier = (text) => {

    // ── COMMAND OUTPUT ───────────────────────────────────────────
    // A slash command was processed this turn.
    // input.js stored the formatted panel in RPG.commandOutput
    // and replaced the player's input with "\u200B", so the AI
    // generated nothing meaningful this turn.
    // We replace whatever the AI output with our panel only.
    if (RPG.commandOutput) {
        const panel = RPG.commandOutput;
        RPG.commandOutput = null;
        return { text: panel };
    }

    // ── NOTIFICATION QUEUE ───────────────────────────────────────
    // Display any queued system notifications after story text.
    // These are queued by RPG_notify() in library.js and triggered
    // by events like setup completion, level ups, title unlocks,
    // skill gains, quest completions, and class evolutions.
    //
    // Two cases:
    //   • Real story text  → append notifications below the story
    //   • Placeholder turn → show notifications alone (no AI text)
    const notifications = RPG_flushNotifications();
    if (notifications.length) {
        // Detect placeholder turns (setup answers, command turns that
        // somehow reach here). Zero-width chars + whitespace only = placeholder.
        const isPlaceholder = text.replace(/[\u200B-\u200D\s]/g, "").length === 0;
        const base = isPlaceholder ? "" : text.trimEnd();
        text = base
            ? base + "\n\n" + notifications.join("\n")
            : notifications.join("\n");
    }

    return { text };
};
modifier(text);
