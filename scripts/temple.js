/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — THE ICE TEMPLE (map: assets/maps/ice_temple.webp)
   Rooms are exactly the labels on the author's Ice Temple map (Volume 1). Nothing else is asserted about them.
   unlock = chapter after which the room is known; null = NOT SCHEDULED YET (waits for the chapter scripts; the Dev tab can reveal it).
   Placements follow the scripts: the temple appears in ch18 (entrance, corridor, the chamber); library ch24; frozen maze ch26; casket chamber ch27;
   Red Assembly Hall ch34 (as the Audience Hall); hidden bath passage and bath chamber ch37; departure portal ch39. Those matched to map rooms by name
   are marked provisional. The map is shown from TEMPLE_MAP_CH = 23 ("Exploring the Ice Temple").
   kind: room | key (important location) | locked | stairs | portal | trap
   ===================================================================== */
const TEMPLE_MAP = 'assets/maps/ice_temple.webp';
const TEMPLE_MAP_CH = 23;   // provisional: exploration planned from comic 023
const TEMPLE_LEVELS = [
  {lv:1, n:'Level 1 · Upper Temple', sub:'Main exploration and story areas'},
  {lv:2, n:'Level 2 · Sealed Maze', sub:'Trapped corridors, puzzles and powerful foes'},
  {lv:3, n:'Level 3 · Underground Chamber', sub:'Hidden rooms and unexplored areas'},
];
const TEMPLE_ROOMS = [
  // ---- Level 1: Upper Temple
  {id:'entrance',      lv:1, n:'Temple Entrance / Icy Ascent', kind:'room',   unlock:18,   desc:'The icy ascent into the temple.'},
  {id:'main_corridor', lv:1, n:'Main Corridor',                kind:'room',   unlock:18,   desc:'Connects the rooms of the upper temple.'},
  {id:'xd_chamber',    lv:1, n:'Xiyu & Dongyue\'s Chamber',    kind:'key',    unlock:18,   desc:'A chamber with a bed and a hot spring pool.'},
  {id:'ice_library',   lv:1, n:'Ice Library',                  kind:'key',    unlock:24,   desc:'Where Xiao Tian finds the book Secrets of the Ice Temple.'},
  {id:'audience_hall', lv:1, n:'Audience Hall',                kind:'room',   unlock:34,   desc:'Assembly area. The Red Assembly Hall of ch34 (provisional).'},
  {id:'guest_chambers',lv:1, n:'Guest Chambers',               kind:'room',   unlock:null, desc:'Rooms for guests.'},
  {id:'followers',     lv:1, n:'Followers\' Quarters',         kind:'room',   unlock:null, desc:'Quarters for followers.'},
  {id:'storage',       lv:1, n:'Storage Room',                 kind:'room',   unlock:null, desc:'Storage.'},
  {id:'bath_passage',  lv:1, n:'Hidden Passage to Bath Chamber',kind:'stairs',unlock:37,   desc:'A hidden lever in Xiyu\'s room opens a concealed passage.'},
  {id:'bath_chamber',  lv:1, n:'Enchanted Bath Chamber',       kind:'room',   unlock:37,   desc:'Waterfalls, blossoms and lanterns; its magic changes with the emotions of those inside.'},
  {id:'ao_yun',        lv:1, n:'Ao Yun\'s Resting Place',      kind:'key',    unlock:27,   desc:'Memorial chamber with the glass casket (provisional: the casket chamber of ch27; ch39 names it Ao Yun\'s).'},
  {id:'central',       lv:1, n:'Sealed Central Chamber',       kind:'locked', unlock:null, desc:'Locked. Distinct from the magical entry barrier.'},
  {id:'maze_door',     lv:1, n:'Large Door to the Maze',       kind:'locked', unlock:26,   desc:'The way down to Level 2 (provisional placement).'},
  {id:'portal_path',   lv:1, n:'Path to the Departure Portal', kind:'room',   unlock:39,   desc:'Leads to the departure portal.'},
  {id:'portal',        lv:1, n:'Departure Portal',             kind:'portal', unlock:39,   desc:'Return to Muxue.'},
  // ---- Level 2: Sealed Maze
  {id:'maze_entry',    lv:2, n:'From Level 1 (Large Door)',    kind:'stairs', unlock:26,   desc:'Entrance to the maze.'},
  {id:'trapped',       lv:2, n:'Trapped Icy Corridors',        kind:'trap',   unlock:26,   desc:'The frozen maze of ch26 (provisional).'},
  {id:'side_passages', lv:2, n:'Side Passages (Traps)',        kind:'trap',   unlock:null, desc:'Side passages with traps.'},
  {id:'puzzle',        lv:2, n:'Stone Puzzle Chamber',         kind:'key',    unlock:null, desc:'A stone puzzle.'},
  {id:'arena',         lv:2, n:'Monster Arena (Two Horned Beasts)', kind:'key',unlock:null, desc:'An arena guarded by two horned beasts.'},
  {id:'floor_opens',   lv:2, n:'Floor Opens (to Level 3)',     kind:'stairs', unlock:null, desc:'The floor opens to the level below.'},
  // ---- Level 3: Underground Chamber
  {id:'fall',          lv:3, n:'From Level 2 (Fallen through floor)', kind:'stairs', unlock:null, desc:'Where a fall from Level 2 lands.'},
  {id:'haystack',      lv:3, n:'Haystack Landing Chamber',     kind:'room',   unlock:null, desc:'A chamber with haystacks.'},
  {id:'potions',       lv:3, n:'Potion Shelf (Two Red Potions)', kind:'key',  unlock:null, desc:'A shelf holding two red potions.'},
  {id:'chests',        lv:3, n:'Locked Chests',                kind:'locked', unlock:null, desc:'Locked chests.'},
  {id:'dark_corridor', lv:3, n:'Dark Corridor and Heavy Door (Unexplored)', kind:'locked', unlock:null, desc:'Unexplored.'},
];
const TEMPLE_ICON = {room:'🚪', key:'📍', locked:'🔒', stairs:'🪜', portal:'🌀', trap:'⚠️'};
const roomFound = r => !!(G.temple && G.temple.found[r.id]) || (r.unlock!==null && G.ch >= r.unlock);
const templeOpen = () => G.ch >= 18;
const templeMapOpen = () => G.ch >= TEMPLE_MAP_CH || !!G.flags.temple_map;
function templeReveal(all){ G.temple = G.temple || {found:{}}; TEMPLE_ROOMS.forEach(r => { if(all) G.temple.found[r.id] = true; }); G.flags.temple_map = !!all || G.flags.temple_map; save(); }
