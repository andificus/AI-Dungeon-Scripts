// Your "Context" tab should look like this
InnerSelf("context");
const modifier = (text) => {

    // ── Respect Inner-Self / Auto-Cards stop signals ─────────────
    // If Auto-Cards triggered a card generation event, stop is true.
    // Inner-Self handles that case — we stay out of the way.
    if (stop === true) return { text, stop };

    // ── SETUP PHASE ──────────────────────────────────────────────
    // Character creation is in progress.
    // Inject the current setup prompt at the END of context so the
    // AI generates the next question instead of launching into story.
    if (!RPG.setup.complete) {
        const prompt = RPG_setupPrompt();
        if (prompt) {
            text = text.trimEnd() + "\n\n" + prompt + "\n";
        }
        return { text, stop };
    }

    // ── GAMEPLAY PHASE ───────────────────────────────────────────
    // Inject the System Memo just BEFORE "Recent Story:" so the AI
    // always knows who the player is, which cheats are active, and
    // what quests are running — every single turn.
    //
    // Injection point:
    //   [Memory]
    //   [World Lore / Story Cards]
    //   [NPC Brains — injected by Inner-Self above this]
    //   ← WE INJECT HERE
    //   Recent Story:
    //   [Story history]
    //
    // Only active systems appear in the memo.
    // Disabled cheats inject nothing — zero token cost.
    const memo = RPG_buildContextMemo();
    if (memo) {
        const marker = "Recent Story:";
        const idx    = text.indexOf(marker);
        if (idx !== -1) {
            // Insert memo just before the Recent Story section
            text = text.slice(0, idx).trimEnd()
                + "\n\n" + memo + "\n\n"
                + text.slice(idx);
        } else {
            // Fallback: marker not found — prepend to top of context
            text = memo + "\n\n" + text;
        }
    }

    return { text, stop };
};
modifier(text);
