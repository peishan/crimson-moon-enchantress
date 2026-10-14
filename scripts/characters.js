/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — CHARACTER DATA (Season 1 cast)
   Classes / roles / elements / signature skills come from the Season 1
   Active Cast sheet (assets/cast/season1.webp). Numbers are first-pass.

   LEVEL GATES: every skill carries req:{lvl, flag?}. A skill unlocks when the
   hero reaches that level (and, if a flag is given, once that story beat has
   happened). A hero who joins late arrives near the party's average level, so
   they start with most early skills already open. Which CHAPTER each hero is
   gated behind lives in core.js (JOIN_CH / INTRO_CH) — see docs/CHAPTER_GATES.md.

   Skill schema:
     id, n, icon, mp, kind: phys|magic|heal|support
     tgt: foe | foes | ally | allies | self | allyDown
     pow (multiplier), fx: [...effects], once (1 use per battle), sig (cast-sheet skill)
     req: { lvl, flag }
   Effects (fx): burn slow bind charm silence | buff{stat,m,d} | shield{v,d}
     regen{v,d} | cleanse | analyze | revive | crit{d} | oath{d} | state{id,d}
   ===================================================================== */
const STATS = ['hp','mp','atk','mag','def','spd'];
const BOND_LEVELS = [0,20,60,120,200,300];   // cumulative bond points for bond level 0..5

const CHARACTERS = {
 xiyu:{
  n:'Muxue Xiyu', zh:'慕雪细雨', icon:'🌙', title:'The Moon Witch',
  cls:'Moon Witch / Elemental Mage', role:'Ranged Damage · Debuffer', combat:'Elemental caster',
  elements:'Moon · Fire · Enchantment',
  identity:'The last descendant of the Muxue clan and proprietress of the Crimson Fairy. Her beauty conceals a formidable power, and her magic comes with a sensual side effect that she can never fully escape.',
  quote:'Power is not a dream. It is my burden, and my choice.',
  base:{hp:70,mp:40,atk:6,mag:15,def:6,spd:10}, grow:{hp:7.5,mp:4,atk:.7,mag:2.2,def:.8,spd:.9},
  skills:[
   {id:'fireball_blast',n:'Fireball Blast',icon:'🔥',mp:5,kind:'magic',tgt:'foe',pow:1.6,fx:[{k:'burn',d:2}],req:{lvl:1},sig:true,desc:'A focused ball of fire. Leaves the target burning.'},
   {id:'crimson_moon',n:'Crimson Moon',icon:'🌙',mp:9,kind:'magic',tgt:'foes',pow:1.0,fx:[{k:'slow',d:2}],req:{lvl:3},sig:true,desc:'The Blood Moon\'s light washes over every foe, bruising and slowing them.'},
   {id:'illusion_veil',n:'Illusion Veil',icon:'🪭',mp:7,kind:'support',tgt:'foe',fx:[{k:'charm',d:2}],req:{lvl:6},sig:true,desc:'A veil of enchantment: the foe is charmed and loses its turns.'},
   {id:'meteor_shower',n:'Meteor Shower',icon:'☄️',mp:16,kind:'magic',tgt:'foes',pow:1.9,fx:[{k:'burn',d:2}],req:{lvl:10},sig:true,desc:'Fire rains from the sky onto every enemy.'},
   {id:'soulbound_moonfire',n:'Soulbound Moonfire',icon:'🔥',mp:14,kind:'magic',tgt:'foes',pow:1.5,fx:[{k:'burn',d:2}],withAlly:'dongyue',boost:1.35,req:{att:3,flag:'soul_bond'},desc:'Fire carried on the soul-bond: stronger while Dongyue fights beside her.'},
   {id:'eclipse_barrage',n:'Eclipse Barrage',icon:'🌑',mp:28,kind:'magic',tgt:'foes',pow:2.8,fx:[{k:'burn',d:3},{k:'slow',d:2}],req:{lvl:32},desc:'PLACEHOLDER (gameplay). A late-game blast of eclipse fire and frost-dark light across every foe.'},
   {id:'blood_moon_surge',n:'Blood Moon Surge',icon:'🩸',mp:0,kind:'support',tgt:'self',once:true,fx:[{k:'state',id:'bloodmoon',d:4}],req:{lvl:20},desc:'The eclipse she was born beneath answers her: MAG +30% and spells cost half for 4 turns. Once per battle.'},
  ]},
 dongyue:{
  n:'Zhan Dongyue', zh:'展东悦', icon:'🧭', title:'The Cursed Wanderer',
  cls:'Battle Cleric / Spellblade', role:'Frontline · Healing · Support', combat:'Spellblade healer',
  elements:'Spiritual Energy · Light · Sword Arts',
  identity:'The eldest young master of the Zhans, bearing a mysterious curse yet blessed with extraordinary healing abilities. Calm, compassionate and unwavering, he chooses to walk beside Xiyu, no matter the danger.',
  quote:'Your wounds are mine to heal. Your burdens, mine to share.',
  base:{hp:95,mp:32,atk:12,mag:11,def:11,spd:9}, grow:{hp:10,mp:3,atk:1.6,mag:1.5,def:1.4,spd:.8},
  skills:[
   {id:'spirit_blade',n:'Spirit Blade',icon:'🗡️',mp:4,kind:'phys',tgt:'foe',pow:1.5,req:{lvl:1},sig:true,desc:'A sword strike lent edge by spiritual energy.'},
   {id:'healing_blessing',n:'Healing Blessing',icon:'🌿',mp:6,kind:'heal',tgt:'ally',pow:1.0,req:{lvl:1},sig:true,desc:'A warm blessing that heals one ally.'},
   {id:'guardian_ward',n:'Guardian Ward',icon:'🛡️',mp:8,kind:'support',tgt:'ally',fx:[{k:'shield',v:.25,d:3},{k:'buff',stat:'def',m:1.25,d:3}],req:{lvl:4},sig:true,desc:'A barrier of light around one ally, and DEF up.'},
   {id:'restoration',n:'Restoration',icon:'✨',mp:14,kind:'heal',tgt:'allies',pow:.8,fx:[{k:'cleanse'}],req:{lvl:9},sig:true,desc:'Heals the whole party and clears ailments.'},
   {id:'spirit_expulsion',n:'Spirit Expulsion',icon:'👁️',mp:9,kind:'magic',tgt:'foe',pow:1.2,antiMagic:2.2,req:{lvl:8,flag:'imp_expelled'},desc:'Learned by driving the imp out of Wang Xi\'er (Chapter 13). Devastating against imps and spirits.'},
   {id:'cooling_blessing',n:'Cooling Blessing',icon:'🌬️',mp:10,kind:'support',tgt:'ally',fx:[{k:'cool',v:30},{k:'regen',v:.06,d:3},{k:'cleanse'}],req:{att:2,flag:'soul_bond'},desc:'A blessing that cools the curse\'s heat (30), steadies an ally and clears ailments.'},
   {id:'soul_link',n:'Soul Link',icon:'💞',mp:12,kind:'support',tgt:'ally',fx:[{k:'regen',v:.08,d:3},{k:'buff',stat:'mag',m:1.25,d:3},{k:'cleanse'}],req:{lvl:12,flag:'soul_bond'},desc:'The bond of Chapter 20: he lends an ally his strength. Steady regeneration, MAG up, ailments cleared.'},
   {id:'radiant_sanctuary',n:'Radiant Sanctuary',icon:'🌟',mp:26,kind:'heal',tgt:'allies',pow:1.5,fx:[{k:'shield',v:.2,d:3},{k:'cleanse'}],req:{lvl:30},desc:'PLACEHOLDER (gameplay). A sanctuary of light: heals the whole party, shields them and clears ailments.'},
   {id:'ancient_rite',n:'Ancient Healing Rite',icon:'📜',mp:22,kind:'heal',tgt:'allyDown',pow:1.4,fx:[{k:'revive'}],req:{lvl:16,flag:'ancient_rite'},desc:'The ancient incantation he used to save Xiyu (Chapter 18): raises a fallen ally.'},
  ]},
 yaxing:{
  n:'Ya\'Xing', zh:'亚星', icon:'⚓', title:'The Steady Sailor',
  cls:'Ranger / Navigator', role:'Ranged Damage · Utility', combat:'Archer and trapper',
  elements:'Bow · Throwing Knives · Traps',
  identity:'A practical and dependable crewman who handles the ship\'s rigging and keeps the party grounded. Skilled in navigation, survival and scouting, he brings balance and humour to the group.',
  quote:'As long as we move forward, there\'s always a way.',
  base:{hp:78,mp:22,atk:13,mag:3,def:7,spd:12}, grow:{hp:8,mp:2,atk:1.9,mag:.4,def:.9,spd:1.1},
  skills:[
   {id:'piercing_shot',n:'Piercing Shot',icon:'🏹',mp:3,kind:'phys',tgt:'foe',pow:1.5,req:{lvl:1},sig:true,desc:'A precise arrow from a distance.'},
   {id:'binding_trap',n:'Binding Trap',icon:'🪤',mp:6,kind:'phys',tgt:'foe',pow:.6,fx:[{k:'bind',d:2}],req:{lvl:4},sig:true,desc:'A snare that holds the foe in place.'},
   {id:'eagle_eye',n:'Eagle Eye',icon:'🦅',mp:5,kind:'support',tgt:'self',fx:[{k:'crit',d:3},{k:'analyze'}],req:{lvl:7},sig:true,desc:'A scout\'s focus: guaranteed crits for 3 turns, and reveals an enemy.'},
   {id:'survival_instinct',n:'Survival Instinct',icon:'🧭',mp:11,kind:'support',tgt:'allies',fx:[{k:'regen',v:.05,d:3},{k:'cleanse'}],req:{lvl:12},sig:true,desc:'Practical know-how: the party recovers steadily and shakes off ailments.'},
   {id:'arrow_storm',n:'Arrow Storm',icon:'🌧️',mp:24,kind:'phys',tgt:'foes',pow:1.9,req:{lvl:28},desc:'PLACEHOLDER (gameplay). A storm of arrows and knives on every enemy.'},
   {id:'knife_volley',n:'Knife Volley',icon:'🔪',mp:10,kind:'phys',tgt:'foes',pow:1.1,req:{lvl:16},desc:'A fan of throwing knives that hits every enemy.'},
  ]},
 xiaotian:{
  n:'Xiao Tian', zh:'萧天', icon:'🍃', title:'The Silent Blade',
  cls:'Martial Artist / Striker', role:'Melee Damage · Mobility', combat:'Martial striker',
  elements:'Unarmed · Gauntlets · Short Blade',
  identity:'Dongyue\'s sworn younger brother and a mysterious youth with a forgotten past. His exceptional martial arts and agility make him a vital force in battle, while his recurring dreams hint at hidden truths.',
  quote:'Even without memories, I know where I stand.',
  base:{hp:88,mp:20,atk:15,mag:3,def:8,spd:14}, grow:{hp:9,mp:2,atk:2.1,mag:.4,def:1,spd:1.2},
  skills:[
   {id:'flowing_strikes',n:'Flowing Strikes',icon:'💠',mp:3,kind:'phys',tgt:'foe',pow:1.4,req:{lvl:1},sig:true,desc:'A chain of strikes that never breaks rhythm.'},
   {id:'heaven_step',n:'Heaven Step',icon:'🌬️',mp:5,kind:'support',tgt:'self',fx:[{k:'buff',stat:'spd',m:1.3,d:3},{k:'buff',stat:'eva',m:1.5,d:3}],req:{lvl:4},sig:true,desc:'Light-footed: SPD up and much harder to hit.'},
   {id:'counter_surge',n:'Counter Surge',icon:'🔁',mp:7,kind:'support',tgt:'self',fx:[{k:'oath',d:2}],req:{lvl:8},sig:true,desc:'Draws attacks and strikes back at whoever lands a blow.'},
   {id:'lotus_burst',n:'Lotus Burst',icon:'🪷',mp:14,kind:'phys',tgt:'foes',pow:1.6,req:{lvl:13},sig:true,desc:'A blossoming burst of force hitting every enemy.'},
   {id:'thousand_petals',n:'Thousand Petals',icon:'🌸',mp:26,kind:'phys',tgt:'foes',pow:2.2,req:{lvl:30},desc:'PLACEHOLDER (gameplay). A thousand strikes in one breath, hitting every enemy.'},
   {id:'silent_edge',n:'Silent Edge',icon:'🗡️',mp:10,kind:'phys',tgt:'foe',pow:2.3,crit:true,req:{lvl:18},desc:'The short blade, drawn without a sound. Always a critical hit.'},
  ]},
 yan:{
  n:'Muxue Yan', zh:'慕雪岩', icon:'❄️', title:'The Ancient Sage',
  cls:'Ancient Sage / Control Mage', role:'Battlefield Control · Support', combat:'Control caster',
  elements:'Ice · Sealing · Ancient Magic',
  identity:'An ancient figure of the Muxue clan, once imprisoned for thousands of years within the Xuancang Mountains. His true intentions remain a mystery, but his knowledge may hold the key to the clan\'s lost secrets.',
  quote:'Chains cannot imprison what time cannot erase.',
  base:{hp:90,mp:50,atk:6,mag:16,def:9,spd:8}, grow:{hp:8.5,mp:4.5,atk:.6,mag:2.3,def:1.1,spd:.7},
  skills:[
   {id:'ice_shard',n:'Ice Shard',icon:'🧊',mp:4,kind:'magic',tgt:'foe',pow:1.5,req:{lvl:1},desc:'A lance of ice.'},
   {id:'frost_domain',n:'Frost Domain',icon:'❄️',mp:11,kind:'magic',tgt:'foes',pow:.9,fx:[{k:'slow',d:3}],req:{lvl:28},sig:true,desc:'Freezes the ground itself: every foe takes frost damage and is slowed.'},
   {id:'sealing_chains',n:'Sealing Chains',icon:'⛓️',mp:9,kind:'magic',tgt:'foe',pow:.7,fx:[{k:'bind',d:2},{k:'silence',d:2}],req:{lvl:31},sig:true,desc:'Ancient chains bind and silence a single foe.'},
   {id:'time_ward',n:'Time Ward',icon:'⏳',mp:13,kind:'support',tgt:'allies',fx:[{k:'shield',v:.2,d:3},{k:'buff',stat:'spd',m:1.2,d:3}],req:{lvl:34},sig:true,desc:'Time itself shields the party: a barrier and SPD up.'},
   {id:'celestial_art',n:'Celestial Art',icon:'🌌',mp:22,kind:'magic',tgt:'foes',pow:2.1,fx:[{k:'slow',d:2}],req:{lvl:38},sig:true,desc:'Ancient magic of the heavens, striking every foe.'},
  ]},
};
const ROSTER = Object.keys(CHARACTERS);
