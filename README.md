# System Anomaly — An Isekai/LitRPG AI Dungeon Scenario

> *"Appraisal failed. Target level: [UNQUANTIFIABLE]. Recommending immediate evacuation."*

A gritty high fantasy LitRPG scenario for AI Dungeon with a full scripted RPG engine, optional cheat toggles, dynamic NPC brains, and auto-generated world cards. Built to be played your way — from a regular person grinding their way up the guild ranks to an absolute anomaly the System cannot quantify.

---

## Features

### The LitRPG Engine
- Stat screens tracking STR, AGI, INT, WIS, VIT, LUK, HP, and MP
- Class and Job evolution paths (Novice → Sword Saint, etc.)
- Skill system with ranks and descriptions
- Quest tracking with live objective progress
- Inventory with coin tracking (Gold, Silver, Copper)
- Title and Achievement system for your most ridiculous feats
- Dual hierarchy: Guild Ranks (F → S) vs. true System Levels (1 → 100+)
- Karma / Reputation alignment (Divine Savior ↔ Apocalyptic God of Destruction)
- Bestiary / Threat Classification (Hazard, Disaster, Calamity, Catastrophe)

### Optional Cheat Toggles
Chosen at the start via button selection — no typing required:

| Toggle | What It Does |
|---|---|
| **The System Anomaly (Level: ∞)** | Your power is unquantifiable. Appraisal skills shatter on contact. You are immune to conventional damage. |
| **The Omniscient AI Assistant (Great Sage)** | A hyper-intelligent tactical voice lives in your mind, delivering threat analysis and strategic advice mid-narration. |

Both cheats are enabled together via the **Anomaly Path** option, or disabled entirely via **Standard Hero**. The economy stays intact regardless — coin tracking is part of the LitRPG experience.

### Origin Choices
Chosen at the start via button — no typing required:

- **Isekai — Reincarnation** — died on Earth, reborn here with a new body and intact memories
- **Isekai — Transmigration** — physically pulled from Earth with your original body, no warning
- **Native — Late Bloomer** — born here, thirties, finally registering at the guild
- **Native — Awakened** — born here, lived normally until the System switched on one day

Each origin changes how the story opens, what knowledge the player has, how NPCs react to their backstory, and what narrative threads the AI pursues.

### World Tone
Set by the scenario creator as **Gritty High Fantasy / Heroic Adventure** — dangerous world, real consequences, earned triumphs. Immersive at all times, no fourth-wall breaks.

### NPC Social Hierarchy
NPCs outside the player's party react entirely to their **Guild Rank**, not their true power. An F-rank adventurer gets dismissed and condescended to regardless of what they can actually do. This creates natural dramatic tension — especially on the Anomaly Path.

### Companion Realism
Party members feel like real people. Earned trust, natural banter, genuine fear in danger, authentic reactions to victory. They push back, have opinions, and grow alongside the player.

### NPC Intelligence (powered by Inner-Self by LewdLeah)
Named characters have internal monologues, secret motivations, and realistic reactions to the player's capabilities.

### Living World Cards (powered by Auto-Cards via Inner-Self)
Locations, factions, and named entities are automatically tracked in story cards as you play, building a living reference of your world as you go.

### Slash Commands

| Command | Description |
|---|---|
| `/stats` | Display your current stat screen |
| `/skills` | List all known skills |
| `/inventory` | Open your inventory and coin purse |
| `/quests` | View active quest log |
| `/titles` | View your title collection |
| `/achievements` | View the achievement room |
| `/karma` | Check your current alignment |
| `/party` | View companion status |
| `/setclass [name]` | Record your class after an in-game crystal reveal |
| `/help` | List all available commands |

---

## Scenario Structure

The scenario uses a **Multiple Choice** opening with two levels of selection before character creation:

```
Level 1 — Origin Selection (4 buttons)
├── Isekai — Reincarnation
├── Isekai — Transmigration
├── Native — Late Bloomer
└── Native — Awakened

Level 2 — Power Level (2 buttons, same for each origin)
├── Standard Hero    → Character Creator (no cheats)
└── The Anomaly Path → Character Creator (System Anomaly + Great Sage)
```

Eight Character Creator sub-scenarios handle the actual character setup. Scripts and Story Cards are set once at the parent level and inherit to all sub-scenarios automatically.

---

## Installation

### Step 1 — Inner-Self and Auto-Cards (Already Included)
`Scripts/library.js` already contains **Inner-Self** and **Auto-Cards** by [LewdLeah](https://github.com/LewdLeah), included with full credit and permission under the MIT License. You do not need to install them separately.

If you want to explore LewdLeah's original work or follow updates to either project:
→ [Inner-Self on GitHub](https://github.com/LewdLeah/Inner-Self)
→ [Auto-Cards on GitHub](https://github.com/LewdLeah/Auto-Cards)
→ [LewdLeah's GitHub Profile](https://github.com/LewdLeah)

### Step 2 — Configure Inner-Self's MainSettings
In `Scripts/library.js`, find the `MainSettings` class near the top and set:

```javascript
IS_AC_ENABLED_BY_DEFAULT: true
PERCENTAGE_OF_RECENT_STORY_USED_FOR_BRAINS: 20
IS_CONFIG_CARD_PINNED_BY_DEFAULT: true
```

And update `DEFAULT_BANNED_TITLES_LIST` to include:
```
System, Anomaly, Great Sage, Player, Status, Quest, Inventory, Karma, Guild Rank, Level
```

### Step 3 — Install the Scripts
In your scenario editor go to **Details → Scripting → Enable Scripts → Edit Scripts**.

For each tab, paste the full contents of the corresponding file from this repo. Inner-Self's code goes first in the Library tab — our RPG engine is appended after it.

| AI Dungeon Tab | File |
|---|---|
| Library | `Scripts/library.js` (Inner-Self + our RPG engine combined) |
| Input | `Scripts/input.js` |
| Context | `Scripts/context.js` |
| Output | `Scripts/output.js` |

### Step 4 — Build the Scenario Structure

**Parent scenario — Multiple Choice opening:**
- Paste `scenario/prompts/MainPrompt.md` as the description
- Leave all Plot Essentials, Author's Note, and AI Instructions empty here
- Scripts and Story Cards are set here and inherit automatically

**Add three Level 1 choices:**
- Isekai — Reincarnation
- Isekai — Transmigration
- Native — Late Bloomer
- Native — Awakened

**Each origin leads to a Level 2 Multiple Choice sub-scenario:**
- Paste `scenario/prompts/Level2_Cheats.md` as the description
- Add two choices: Standard Hero and The Anomaly Path
- Set Author's Note and AI Instructions here (see Step 5)

**Each Level 2 choice leads to a Character Creator sub-scenario:**
Use the eight files in `scenario/prompts/CC_*.md`. Set Author's Note and AI Instructions in each (see Step 5). Leave Plot Essentials empty.

### Step 5 — Set Author's Note and AI Instructions
In every Level 2 and Character Creator sub-scenario, paste these fields:

**Author's Note:** contents of `scenario/authors_note.md`

**AI Instructions:**
```
This is a LitRPG scenario with scripted RPG systems. A [PLAYER] block appears in context each turn — treat it as authoritative truth about the player. Do not generate your own stat screens, level numbers, or system notifications. Do not invent quest names or skill names the player has not encountered. When enemies attempt to scan the player and System Anomaly is active, their equipment fails. When the player's class is Unknown, end crystal reveal scenes with: Type /setclass ClassName to record your class. Write in second person.

WORLD RULE — DUAL HIERARCHY: Guild Ranks (F through S) are public and reflect reputation. System Levels (1 to 100+) are the hidden truth. Most citizens only understand Guild Ranks. Never conflate the two.

WORLD RULE — THE SYSTEM: The metaphysical framework cataloguing all living things is generally believed to be infallible. It is not.
```

### Step 6 — Add Story Cards
Go to the **World Info** tab on the parent scenario and create four story cards using the files in `scenario/world_info/`. These inherit to all sub-scenarios automatically.

For each card:
- Set Type to Custom
- Set Name and Triggers as shown in the file header
- Paste the Entry section (under 1000 characters each)

### Step 7 — After First Launch
When the adventure first starts, Inner-Self creates a **Configure Inner Self** story card. Open it and enter your character's first name in the player character name field so Inner-Self can use it for NPC brain interactions.

---

## Script Architecture

```
library.js   — Inner-Self (by LewdLeah) + our RPG Engine appended after
               Handles: state management, first-turn detection, all formatters,
               karma, guild rank, notifications, context memo builder

input.js     — Slash command parser
               Handles: /stats /skills /inventory /quests /titles
                        /achievements /karma /party /setclass /help

context.js   — Dynamic context injection every turn
               Handles: first-turn cheat/origin detection from Character Creator,
                        System Memo injection before Recent Story each turn

output.js    — Notification display and command panel rendering
               Handles: slash command panels, level-up banners,
                        title/achievement notifications
```

The Context Modifier builds a compressed System Memo each turn injecting only active systems. A Standard Hero player's context contains no cheat text whatsoever — zero token cost for unused features.

---

## Credits

See [CREDITS.md](./CREDITS.md) for full attribution.

This scenario is built on top of **Inner-Self** and **Auto-Cards** by [LewdLeah](https://github.com/LewdLeah), used and modified with full permission under the MIT License. LewdLeah's work powers the NPC brain system and automatic world card generation that makes this scenario's world feel alive.

---

## License

MIT — free to use, modify, and publish in your own scenarios. See [LICENSE](./LICENSE).

If you build something with this, feel free to link back. ❤️
