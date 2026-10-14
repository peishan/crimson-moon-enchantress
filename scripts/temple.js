/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — THE ICE TEMPLE (map: assets/maps/ice_temple.webp)
   Rooms are exactly the labels on the author's Ice Temple map (Volume 1). Nothing else is asserted about them.
   unlock = chapter after which the room is known; null = NOT SCHEDULED YET (waits for the chapter scripts; the Dev tab can reveal it).
   Provisional placements: the temple appears in ch18 (art), where Xiyu wakes "in the Ice Temple"; the entrance, main corridor and the
   Xiyu & Dongyue chamber are marked from there. The map itself is shown from TEMPLE_MAP_CH (exploration is planned from comic 023).
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
  {id:'ice_library',   lv:1, n:'Ice Library',                  kind:'key',    unlock:null, desc:'Shelves of books and a reading hall.'},
  {id:'audience_hall', lv:1, n:'Audience Hall',                kind:'room',   unlock:null, desc:'Assembly area.'},
  {id:'guest_chambers',lv:1, n:'Guest Chambers',               kind:'room',   unlock:null, desc:'Rooms for guests.'},
  {id:'followers',     lv:1, n:'Followers\' Quarters',         kind:'room',   unlock:null, desc:'Quarters for followers.'},
  {id:'storage',       lv:1, n:'Storage Room',                 kind:'room',   unlock:null, desc:'Storage.'},
  {id:'bath_passage',  lv:1, n:'Hidden Passage to Bath Chamber',kind:'stairs',unlock:null, desc:'A concealed passage from the chamber.'},
  {id:'bath_chamber',  lv:1, n:'Enchanted Bath Chamber',       kind:'room',   unlock:null, desc:'A glowing enchanted pool.'},
  {id:'ao_yun',        lv:1, n:'Ao Yun\'s Resting Place',      kind:'key',    unlock:null, desc:'Memorial chamber.'},
  {id:'central',       lv:1, n:'Sealed Central Chamber',       kind:'locked', unlock:null, desc:'Locked. Distinct from the magical entry barrier.'},
  {id:'maze_door',     lv:1, n:'Large Door to the Maze',       kind:'locked', unlock:null, desc:'The way down to Level 2.'},
  {id:'portal_path',   lv:1, n:'Path to the Departure Portal', kind:'room',   unlock:null, desc:'Leads to the departure portal.'},
  {id:'portal',        lv:1, n:'Departure Portal',             kind:'portal', unlock:null, desc:'Return to Muxue.'},
  // ---- Level 2: Sealed Maze
  {id:'maze_entry',    lv:2, n:'From Level 1 (Large Door)',    kind:'stairs', unlock:null, desc:'Entrance to the maze.'},
  {id:'trapped',       lv:2, n:'Trapped Icy Corridors',        kind:'trap',   unlock:null, desc:'Trapped corridors.'},
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
