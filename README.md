# System Anomaly — An Isekai/LitRPG AI Dungeon Scenario

> *"Appraisal failed. Target level: [UNQUANTIFIABLE]. Recommending immediate evacuation."*

A highly customizable Isekai/LitRPG scenario for AI Dungeon with a full scripted RPG engine, optional cheat toggles, dynamic NPC brains, and auto-generated world cards. Built to be played your way — from balanced hero to absolute god-tier anomaly.

---

## Features

### The LitRPG Engine
- Stat screens tracking STR, AGI, INT, WIS, VIT, LUK, HP, MP, and XP
- Class and Job evolution paths (Novice → Sword Saint, etc.)
- Skill system with ranks and descriptions
- Quest tracking with live objective progress
- Inventory with spatial storage magic
- Title and Achievement system for your most ridiculous feats
- Dual hierarchy: Guild Ranks (F → S) vs. true System Levels (1 → 100+)
- Karma / Reputation alignment (Divine Savior ↔ Cataclysmic Demon Lord)
- Bestiary / Threat Classification (Hazard, Disaster, Calamity, Catastrophe)

### Optional Cheat Toggles (Player Choice at Start)
Players choose which — if any — of these to enable before the story begins:

| Toggle | What It Does |
|---|---|
| **The System Anomaly (Level: ∞)** | Your power is unquantifiable. Appraisal skills shatter. You are immune to conventional damage. |
| **The Omniscient AI Assistant (Great Sage)** | A hyper-intelligent tactical voice lives in your head, interrupting the narrator with threat analysis and level readings. |
| **The Economy Bypass (Infinite Synthesis Writ)** | You never track coin. Any purchase, no matter the scale, is simply fulfilled. |

### Origin Choices
Players are not locked into Isekai. At character creation, choose from:
- **Isekai — Reincarnation** (died on Earth, reborn in this world)
- **Isekai — Transmigration** (pulled from Earth with your body)
- **Native — Late Bloomer** (born here, 30s, finally dragging yourself to the Adventurers Guild)
- **Native — Awakened** (born here, System suddenly activated with no explanation)

### NPC Intelligence (powered by Inner-Self)
Named characters have internal monologues, secret motivations, and realistic panic reactions to the player's god-like power. The Great Sage, when enabled, runs as a full NPC brain.

### Living World Cards (powered by Auto-Cards via Inner-Self)
Locations, factions, and named entities are automatically tracked in story cards as you play, building a living reference of your world.

### Slash Commands
| Command | Description |
|---|---|
| `/stats` | Display your current stat screen |
| `/skills` | List all known skills |
| `/inventory` | Open your spatial storage |
| `/quests` | View active quest log |
| `/titles` | View your title collection |
| `/achievements` | View the achievement room |
| `/karma` | Check your current alignment |
| `/party` | View companion status |
| `/help` | List all available commands |

---

## Installation

### Step 1 — Install Inner-Self (Required Dependency)
This scenario requires **Inner-Self by LewdLeah** to be installed first.
Inner-Self handles NPC brains and, when configured, Auto-Cards world-building.

→ [Inner-Self on GitHub](https://github.com/LewdLeah/Inner-Self)

Follow LewdLeah's installation guide, then return here.

### Step 2 — Configure Inner-Self
In the Inner-Self config story card, set:
```
Install Auto-Cards: true
```
This enables automatic world card generation alongside NPC brain functionality.

### Step 3 — Install Our Scripts
After Inner-Self is in place:

1. Open your scenario in the AI Dungeon editor
2. Go to **DETAILS → Scripting → EDIT SCRIPTS**
3. For each tab below, paste the contents of the corresponding file **after** the existing Inner-Self code:

| AI Dungeon Tab | File |
|---|---|
| Input | `scripts/input.js` |
| Context | `scripts/context.js` |
| Output | `scripts/output.js` |
| Library | `scripts/library.js` |

4. Click the yellow **SAVE** button

### Step 4 — Set the Opening
1. Go to the **PLOT** tab
2. Set Opening type to **Character Creator**
3. Paste the contents of `scenario/prompt.md` into the opening field
4. Paste `scenario/memory.md` into the Memory field
5. Paste `scenario/authors_note.md` into the Author's Note field

### Step 5 — Add World Info Cards
For each file in `scenario/world_info/`, create a new World Info entry in AI Dungeon and paste the contents. These cover static lore the scripts don't handle dynamically.

---

## How Character Creation Works

The opening presents a System Initialization Screen — an in-world interface styled as a divine reincarnation terminal. Players fill out their character in order:

1. **Origin** — Isekai or Native, and which variant
2. **Name, Gender, Race/Species**
3. **Appearance and Personality**
4. **Past Life / Former Occupation** (based on origin)
5. **Starting Class** — or type `Evaluate In-Game` to have it revealed dramatically at a guild or magic crystal
6. **Starting Location**
7. **World Tone** — Comedic, Grimdark, Heroic, or Balanced
8. **Cheat Toggles** — Enable/Disable each of the three optional systems

Once submitted, the scripts lock in the player's choices, set up the state object, and the story begins.

---

## Script Architecture

```
library.js    — Core RPG Engine + state management + formatting helpers
input.js      — Slash command parser and interceptor
context.js    — Dynamic memory injection every turn from state
output.js     — System notification formatting (level-ups, titles, skill unlocks)
```

The Context Modifier builds a compressed System Memo each turn from the live state object, injecting only what is active. Players with no cheats enabled see no cheat text in the AI's context. This keeps the context window lean regardless of how many systems are running.

---

## Credits

See [CREDITS.md](./CREDITS.md) for full attribution.

This scenario is built on top of **Inner-Self** and **Auto-Cards** by [LewdLeah](https://github.com/LewdLeah), used and modified with full permission under the MIT License.

---

## License

MIT — free to use, modify, and publish in your own scenarios. See [LICENSE](./LICENSE).

If you build something cool with this, feel free to link back. ❤️
