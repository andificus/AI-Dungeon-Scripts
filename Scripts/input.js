// Your "Input" tab should look like this
InnerSelf("input");
const modifier = (text) => {
    // Slash commands are handled in output.js via history inspection.
    // We do NOT intercept here so the original text is preserved in history.
    // The only exception is /setclass which needs to update state immediately.

    const trimmed = text.trim();
    const slashIdx = trimmed.indexOf("/");
    if (slashIdx !== -1) {
        const afterSlash = trimmed.slice(slashIdx + 1).replace(/[.,!?\s]+$/, "");
        if (afterSlash.toLowerCase().startsWith("setclass ")) {
            const className = afterSlash.slice(9).trim();
            if (className && state.RPG) {
                state.RPG.class.name                = className;
                state.RPG.player.startingClass      = className;
                state.RPG.player.classRevealPending = false;
                state.RPG.notifications.push(RPG_HR);
                state.RPG.notifications.push(`⚔  CLASS REGISTERED: ${className}`);
                state.RPG.notifications.push(RPG_HR);
            }
        }
    }

    return { text };
};
modifier(text);
