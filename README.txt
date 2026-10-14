THE CRIMSON MOON'S ENCHANTRESS (绯月妖姬) — a game adaptation by Yuchen Sky
Season 1: comic chapters 1-20 scripted and illustrated so far (comic art exists to at least 022). Mobile-first static site (GitHub Pages), no build step.
Open index.html. Save key: crimson_moon_v1 (localStorage).

Built on the Tribute / Daybreak: Crimson Tide layout (multi-script, no framework).

scripts/characters.js  the five Season-1 heroes: classes, stats, skills + LEVEL GATES (req:{lvl,flag})
scripts/chapters.js    CHAPTER_DESIGN 1-20 (from docs/GAME_ADAPTATION_SCRIPT.md), bond banners, story flags
scripts/script.js      the short-form script as data (generated from the .md): the in-game text reader
scripts/core.js        state, save, JOIN_CH / INTRO_CH (party gates), chapter level gates, XP, bond
scripts/enemies.js     enemies, items, Wilds zones, loot
scripts/battle.js      turn-based engine
scripts/journal.js     chapters, completion, chapter battle (ch13), dev jump
scripts/storypopup.js  full-screen reader (comic art, or script text if art is missing)
scripts/savedata.js    Save tab: export/import, GitHub Gist backup, auto backup
scripts/ui.js          tabs: Journal, Party, Gates, Wilds, Cast, Training, Items, Bestiary, Save, Dev
docs/CHAPTER_GATES.md  which chapter / level gates each party member  (READ THIS)

COMIC ART: put PNG/JPG files in assets/comics/ named by chapter: ch01.png, ch02.png ... ch20.png
(extra pages: ch01_2.png, ch01_3.png). The Pages workflow converts them to WebP on push (images taller than
15000px are sliced into pages). Until a chapter's art exists, the reader shows its script text instead.

Assets: assets/splash.webp (cover), assets/cast/season1.webp (Active Cast sheet), assets/cast/people/*.webp (20 portrait cards, scripts/people.js),
assets/party/<id>.webp (caption-free avatars cropped from the portrait set: replace with finals any time).

NOT BUILT YET (carried over from the sibling games when wanted): auto-battle, skill trees / evolution, gear,
daily rewards, map/travel, bond skills. Chapters 21+ need a script. See docs/ART_AUDIT.md for the comic-art vs script tally.
