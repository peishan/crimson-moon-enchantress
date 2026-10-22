/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — THE ICE TEMPLE (map: assets/maps/ice_temple.webp)
   Rooms are exactly the labels on the author's Ice Temple map (Volume 1). Nothing else is asserted about them.
   unlock = chapter after which the room is known; null = NOT SCHEDULED YET (waits for the chapter scripts; the Dev tab can reveal it).
   Placements follow the scripts: the temple appears in ch18 (entrance, corridor, the chamber); library and the locked central door ch23; maze, puzzle, horned-beast arena, the fall, haystack landing, potions and chests ch24; casket chamber ch27;
   Red Assembly Hall ch34 (as the Audience Hall); hidden bath passage and bath chamber ch37; departure portal ch39. Those matched to map rooms by name
   are marked provisional. The map is shown from TEMPLE_MAP_CH = 23 ("Exploring the Ice Temple").
   kind: room | key (important location) | locked | stairs | portal | trap
   ===================================================================== */
const TEMPLE_MAP = 'assets/maps/ice_temple.webp';
const TEMPLE_MAP_LOWER = 'assets/maps/ice_temple_lower_v4.webp', TEMPLE_MAP_LOWER_CH = 118;   // Volume 4 lower-level map (author)
const TEMPLE_MAP_V4 = 'assets/maps/ice_temple_v4.webp', TEMPLE_MAP_V4_CH = 117;   // Volume 4 investigation map (author), shown from the first chapter of Volume 4
const TEMPLE_MAP_CH = 23;   // provisional: exploration planned from comic 023
const TEMPLE_LEVELS = [
  {lv:1, n:'Level 1 · Upper Temple', sub:'Main exploration and story areas'},
  {lv:2, n:'Level 2 · Sealed Maze', sub:'Trapped corridors, puzzles and powerful foes'},
  {lv:3, n:'Level 3 · Underground Chamber', sub:'Hidden rooms and unexplored areas'},
  {lv:4, n:'Lower Level (Volume 4)', sub:'The route from the lower grounds, the library branch and the vault. Unlock chapters follow Volume 4 comics 007-014.'},
];
const TEMPLE_ROOMS = [
  // ---- Level 1: Upper Temple
  {id:'entrance',      lv:1, n:'Temple Entrance / Icy Ascent', kind:'room',   unlock:18,   desc:'The icy ascent into the temple.'},
  {id:'main_corridor', lv:1, n:'Main Corridor',                kind:'room',   unlock:18,   desc:'Connects the rooms of the upper temple.'},
  {id:'xd_chamber',    lv:1, n:'Xiyu & Dongyue\'s Chamber',    kind:'key',    unlock:18,   desc:'A chamber with a bed and a hot spring pool.'},
  {id:'ice_library',   lv:1, n:'Ice Library',                  kind:'key',    unlock:23,   desc:'Where Xiao Tian finds the book Secrets of the Ice Temple.'},
  {id:'audience_hall', lv:1, n:'Audience Hall',                kind:'room',   unlock:34,   desc:'Assembly area. The Red Assembly Hall of ch34 (provisional).'},
  {id:'guest_chambers',lv:1, n:'Guest Chambers',               kind:'room',   unlock:null, desc:'Rooms for guests.'},
  {id:'followers',     lv:1, n:'Followers\' Quarters',         kind:'room',   unlock:null, desc:'Quarters for followers.'},
  {id:'storage',       lv:1, n:'Storage Room',                 kind:'room',   unlock:null, desc:'Storage.'},
  {id:'bath_passage',  lv:1, n:'Hidden Passage to Bath Chamber',kind:'stairs',unlock:37,   desc:'A hidden lever in Xiyu\'s room opens a concealed passage.'},
  {id:'bath_chamber',  lv:1, n:'Enchanted Bath Chamber',       kind:'room',   unlock:37,   desc:'Waterfalls, blossoms and lanterns; its magic changes with the emotions of those inside.'},
  {id:'ao_yun',        lv:1, n:'Ao Yun\'s Resting Place',      kind:'key',    unlock:27,   desc:'Memorial chamber with the glass casket (provisional: the casket chamber of ch27; ch39 names it Ao Yun\'s).'},
  {id:'central',       lv:1, n:'Sealed Central Chamber',       kind:'locked', unlock:23, desc:'Locked. Distinct from the magical entry barrier.'},
  {id:'maze_door',     lv:1, n:'Large Door to the Maze',       kind:'locked', unlock:24,   desc:'The way down to Level 2 (provisional placement).'},
  {id:'portal_path',   lv:1, n:'Path to the Departure Portal', kind:'room',   unlock:39,   desc:'Leads to the departure portal.'},
  {id:'portal',        lv:1, n:'Departure Portal',             kind:'portal', unlock:39,   desc:'Return to Muxue.'},
  // ---- Level 2: Sealed Maze
  {id:'maze_entry',    lv:2, n:'From Level 1 (Large Door)',    kind:'stairs', unlock:24,   desc:'Entrance to the maze.'},
  {id:'trapped',       lv:2, n:'Trapped Icy Corridors',        kind:'trap',   unlock:24,   desc:'The frozen maze of ch26 (provisional).'},
  {id:'side_passages', lv:2, n:'Side Passages (Traps)',        kind:'trap',   unlock:24, desc:'Side passages with traps.'},
  {id:'puzzle',        lv:2, n:'Stone Puzzle Chamber',         kind:'key',    unlock:24, desc:'A stone puzzle.'},
  {id:'arena',         lv:2, n:'Monster Arena (Two Horned Beasts)', kind:'key',unlock:24, desc:'An arena guarded by two horned beasts.'},
  {id:'floor_opens',   lv:2, n:'Floor Opens (to Level 3)',     kind:'stairs', unlock:24, desc:'The floor opens to the level below.'},
  // ---- Level 3: Underground Chamber
  {id:'fall',          lv:3, n:'From Level 2 (Fallen through floor)', kind:'stairs', unlock:24, desc:'Where a fall from Level 2 lands.'},
  {id:'haystack',      lv:3, n:'Haystack Landing Chamber',     kind:'room',   unlock:24, desc:'A chamber with haystacks.'},
  {id:'potions',       lv:3, n:'Potion Shelf (Two Red Potions)', kind:'key',  unlock:24, desc:'A shelf holding two red potions.'},
  {id:'chests',        lv:3, n:'Locked Chests',                kind:'locked', unlock:24, desc:'Locked chests.'},
  {id:'dark_corridor', lv:3, n:'Dark Corridor and Heavy Door (Unexplored)', kind:'locked', unlock:24, desc:'Unexplored.'},
  // ---- Lower Level (Volume 4, author's map). Main route: entrance > guardian hall > sealed passage > main corridor > upper staircase. Library branch off the main corridor leads to the hidden vault.
  {id:'v4_entrance',  lv:4, n:'1 · Temple Entrance',        kind:'room',   unlock:118, desc:'The party enters the Ice Temple from the lower grounds.'},
  {id:'v4_guardian',  lv:4, n:'2 · Guardian Hall',          kind:'key',    unlock:122, desc:'Ancient statues stand guard in the frozen hall. First guardian encounter.'},
  {id:'v4_sealed',    lv:4, n:'3 · Sealed Passage',         kind:'room',   unlock:123, desc:'An ice seal blocks the way, later opened by the party.'},
  {id:'v4_corridor',  lv:4, n:'4 · Main Corridor',          kind:'room',   unlock:122, desc:'The central hallway connecting the areas of the lower level.'},
  {id:'v4_stairs',    lv:4, n:'5 · Upper Staircase',        kind:'stairs', unlock:122, desc:'Leads to the next level up.'},
  {id:'v4_library',   lv:4, n:'6 · Inner Library',          kind:'key',    unlock:129, desc:'Rows of ancient scrolls and manuals on the temple\'s history and magic. Xining\'s scripture; the Muxue inscription.'},
  {id:'v4_switch',    lv:4, n:'7 · Hidden Switch',          kind:'locked', unlock:129, desc:'Found by moving books in the library.'},
  {id:'v4_vault',     lv:4, n:'8 · Treasure Vault',         kind:'key',    unlock:130, desc:'Hidden behind a switch. Ancient treasures: equipment and Ya\'Xing\'s Skyshard.'},
  {id:'v4_maze',      lv:4, n:'Upper Maze',                 kind:'trap',   unlock:131, desc:'The upper-floor maze above the vault: illusion formations, spiritual beasts and a Minotaur guarding the central passage.'},
  {id:'v4_sealedch',   lv:4, n:'Sealed Chamber (Muxue seal)', kind:'key',   unlock:138, desc:'An enormous circular seal; the Muxue clan was entrusted to guard what lies beyond.'},
  {id:'v4_commanders', lv:4, n:'Commanders\' Chamber',      kind:'key',    unlock:139, desc:'Four vacant commander stations: North, South, East and West.'},
  {id:'v4_portal',    lv:4, n:'Portal (upper floor)',       kind:'portal', unlock:129, desc:'The Muxue inscription reveals a portal on an upper floor. Its exact location is unknown. The maze and the tormentors\' location are not mapped yet.'},
];
const TEMPLE_ICON = {room:'🚪', key:'📍', locked:'🔒', stairs:'🪜', portal:'🌀', trap:'⚠️'};
const roomFound = r => !!(G.temple && G.temple.found[r.id]) || (r.unlock!==null && G.ch >= r.unlock);
const templeOpen = () => G.ch >= 18;
const templeMapOpen = () => G.ch >= TEMPLE_MAP_CH || !!G.flags.temple_map;
function templeReveal(all){ G.temple = G.temple || {found:{}}; TEMPLE_ROOMS.forEach(r => { if(all) G.temple.found[r.id] = true; }); G.flags.temple_map = !!all || G.flags.temple_map; save(); }
