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
   {id:'soulbound_moonfire',n:'Linked Moonfire',icon:'🔥',mp:14,kind:'magic',tgt:'foes',pow:1.5,fx:[{k:'burn',d:2}],withAlly:'dongyue',boost:1.35,req:{att:3,flag:'soul_bond'},desc:'Fire carried on the ancient bond-spell that links them (not a permanent soul bond): stronger while Dongyue fights beside her.'},
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
   {id:'soul_link',n:'Shared Strength',icon:'💞',mp:12,kind:'support',tgt:'ally',fx:[{k:'regen',v:.08,d:3},{k:'buff',stat:'mag',m:1.25,d:3},{k:'cleanse'}],req:{lvl:12,flag:'soul_bond'},desc:'The bond-spell of Chapter 20 lets him lend an ally his strength (it is not a permanent soul bond). Steady regeneration, MAG up, ailments cleared.'},
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
 /* ===== VOLUME 2 PARTY MEMBERS (not joinable in Volume 1; joining chapters to be decided by the author) =====
    Cangyuan joins at V2 comic 007 (chapter 46, about Lv 46), Xining at V2 comic 014 (chapter 53, about Lv 53). Skill unlock levels are
    spread from each join over Volume 2: PLACEHOLDERS to retune as more chapters arrive. Class design from the author's brief. */
 cangyuan:{
  vol2:true, n:'Shen Cangyuan', zh:'沈沧渊', icon:'🧵', title:'Keeper of Forbidden Knowledge',
  cls:'Forbidden Spirit Weaver', role:'Control · Arcane Support · Debuffer', combat:'Spirit-thread controller',
  elements:'Spirit Threads · Forbidden Arts · Dark Crimson',
  identity:'A mystic cultivator, spirit weaver and keeper of forbidden knowledge. Calm, perceptive and unafraid of Xiyu\'s nature, he seeks the truth behind Yan\'s corruption and the secrets of the Blood Moon. He does not overpower enemies: he changes how their powers behave, binds their movements and creates openings.',
  quote:'You burn with a light the world fears. Let me be the one who understands its shape.',
  base:{hp:86,mp:48,atk:7,mag:13,def:8,spd:12}, grow:{hp:8.8,mp:4.4,atk:.7,mag:2.0,def:1,spd:.9},
  skills:[
   {id:'spirit_thread',n:'Spirit Thread',icon:'🧵',mp:3,kind:'magic',tgt:'foe',pow:1.1,fx:[{k:'thread',v:1}],req:{lvl:46},sig:true,desc:'Fine spiritual threads strike for moderate magic damage and mark the target Threadbound (stacks): control effects on a Threadbound foe last longer and are harder to resist, even for bosses.'},
   {id:'binding_seal',n:'Binding Seal',icon:'🔏',mp:8,kind:'magic',tgt:'foe',pow:.6,fx:[{k:'bind',d:2},{k:'slow',d:3}],req:{lvl:46},sig:true,desc:'A spiritual seal immobilises a foe. Strong enemies shrug off the full bind but are always slowed (reduced speed and casting).'},
   {id:'inverted_meridian',n:'Inverted Meridian',icon:'🌀',mp:12,kind:'magic',tgt:'foe',pow:.8,fx:[{k:'silence',d:2},{k:'strip'},{k:'strain',v:.10,self:true}],req:{lvl:48},sig:true,desc:'FORBIDDEN. Redirects a foe\'s unstable spiritual energy: interrupts its spells (silence) and shatters its barrier and buffs. Cost: the strain damages his own channels (10% HP, growing with each use this battle).'},
   {id:'steady_the_current',n:'Inverted Meridian: Steady',icon:'🪢',mp:10,kind:'support',tgt:'ally',fx:[{k:'cool',v:40},{k:'cleanse'},{k:'strain',v:.10,self:true}],req:{lvl:48},desc:'FORBIDDEN. Turns the technique inward to stabilise an ally\'s dangerous power: cools 40 heat (Xiyu\'s curse) and clears ailments. Same strain cost.'},
   {id:'crimson_resonance',n:'Crimson Resonance',icon:'🌹',mp:20,kind:'magic',tgt:'foes',pow:1.6,needAlly:'xiyu',res:true,withAlly:'xiyu',boost:1.35,fx:[{k:'link',d:3},{k:'heatup',v:8}],req:{lvl:50},sig:true,desc:'COMBINATION with Xiyu. He weaves a formation around her spell, striking and linking every foe for enormous damage. Unstable: it adds heat to Xiyu (much more if she is already burning).'},
   {id:'formation_breaker',n:'Thread-Breaker Formation',icon:'🔗',mp:22,kind:'magic',tgt:'foe',pow:2.0,needAlly:'xiyu',res:true,withAlly:'xiyu',boost:1.3,fx:[{k:'strip'},{k:'thread',v:2}],req:{lvl:52,res:3},sig:true,desc:'COMBINATION with Xiyu (needs Crimson Thread Resonance 3). His weaving holds a structure open while her crimson spell breaks it: strips a foe\'s barrier, layer and enhancements, and marks it Threadbound ×2.'},
   {id:'ten_thousand_threads',n:'Ten Thousand Threads Formation',icon:'🕸️',mp:24,kind:'magic',tgt:'foes',pow:.9,fx:[{k:'link',d:4},{k:'thread',v:1},{k:'slow',d:2}],req:{lvl:54},sig:true,desc:'ULTIMATE. A wide formation links the enemy group: damage and control applied to one linked foe spreads to the others. Strong against groups, weak against a lone boss (nothing to link).'},
  ],
  passive:'Resonance of Two Currents: with Xiyu in the fight, Cangyuan redirects some of her spell energy. Her heat gain is reduced by 25% and each spell she casts has a 35% chance to echo through his threads for extra damage. It does not make her corruption harmless.'},
 xining:{
  vol2:true, n:'Lu Xining', zh:'陆惜宁', icon:'🌿', title:'Compassionate Physician',
  cls:'Spirit Physician', role:'Healer · Cleanser · Support', combat:'Physician',
  elements:'Healing Arts · Herbal Medicine · Spirit Diagnosis',
  identity:'A gentle and intelligent physician with a kind heart and quiet strength. She saved Dongyue\'s life and later became an important companion in the party. Behind her calm smile lies a woman who has also known loss, yet continues to care for others.',
  quote:'I only wish to heal what still hurts... even if I cannot heal myself.',
  base:{hp:80,mp:46,atk:4,mag:12,def:7,spd:11}, grow:{hp:8.2,mp:4.2,atk:.4,mag:1.9,def:.9,spd:.8},
  skills:[
   {id:'gentle_meridian',n:'Gentle Meridian',icon:'💧',mp:5,kind:'heal',tgt:'ally',pow:.7,fx:[{k:'regen',v:.06,d:3}],req:{lvl:53},sig:true,desc:'Restorative energy into one ally: a heal, then recovery over a few turns. Best used before an injury becomes critical.'},
   {id:'clear_spirit',n:'Clear Spirit',icon:'🍃',mp:6,kind:'support',tgt:'ally',fx:[{k:'cleanse1'}],req:{lvl:53},sig:true,desc:'Removes one ordinary poison, minor curse or debilitating status. Severe curses need investigation, special ingredients, or a specialist such as Cangyuan.'},
   {id:'physicians_insight',n:'Physician\'s Insight',icon:'🔍',mp:7,kind:'support',tgt:'foe',fx:[{k:'analyze'},{k:'expose',d:3}],req:{lvl:55},sig:true,clue:true,desc:'Diagnosis: reveals an enemy\'s weakness and hidden injuries (it takes 15% more damage for 3 turns). Outside combat it can unlock clues about the deaths and the spreading corruption (story hooks to be added).'},
   {id:'herb_pouch',n:'Herb Pouch',icon:'🧺',mp:0,kind:'heal',tgt:'ally',pow:.55,item:'frost_herb',req:{lvl:53},desc:'Herbs, bandages and needles: a modest heal that needs no mana but uses one Frost Herb. Her answer to running dry.'},
   {id:'quiet_sanctuary',n:'Quiet Sanctuary',icon:'🕊️',mp:16,kind:'heal',tgt:'allies',pow:.9,needAlly:'dongyue',withAlly:'dongyue',boost:1.3,fx:[{k:'shield',v:.15,d:3}],req:{lvl:57},sig:true,desc:'COMBINATION with Dongyue. He guards her while she heals the whole party and shields them, better when he trusts her assessment. (Passive: with Dongyue standing, Xining takes 20% less damage.)'},
   {id:'diagnosis_and_severance',n:'Diagnosis and Severance',icon:'✂️',mp:18,kind:'magic',tgt:'foe',pow:1.1,needAlly:'cangyuan',withAlly:'cangyuan',boost:1.3,fx:[{k:'analyze'},{k:'strip'},{k:'bind',d:2}],req:{lvl:58},sig:true,desc:'COMBINATION with Cangyuan. She identifies the structure of a curse or disturbance; he isolates and binds it: strips the foe\'s barrier and buffs, exposes it and binds it.'},
   {id:'sanctuary_still_waters',n:'Sanctuary of Still Waters',icon:'🌊',mp:26,kind:'heal',tgt:'allies',pow:.8,fx:[{k:'regen',v:.07,d:4},{k:'ward',d:4},{k:'cleanse'},{k:'buff',stat:'def',m:.7,d:4,self:true}],req:{lvl:61},sig:true,desc:'ULTIMATE. A protective healing field: the party heals over time and resists status effects (70%). It needs her concentration: her own DEF drops while it holds.'},
  ],
  passive:'A Physician\'s Resolve: repeated treatments become more efficient (each heal this battle cuts her healing MP costs by 5%, up to 30%), and she can heal with herbs when her mana is gone (Herb Pouch).'},
 /* ===== VOLUME 6 GUEST (author's sheet): a temporary story-required guest, not a core party member. He joins at the first chapter of Volume 6 (VOL6_START)
    for the demon-capture arc; GUESTS in core.js holds the window (end chapter not set yet: the author will give it). Later returns (e.g. Volume 8 at Yilong) are planned, not built. */
 suliechen:{
  vol2:true, guest:true, n:'Su Liechen', zh:'苏烈尘', icon:'🗡️', title:'Demon Slayer · Tracker',
  cls:'Demon Slayer / Tracker (Guest)', role:'Control · Restraint · Support', combat:'Capture specialist',
  elements:'Ice · Restraint · Sealing',
  identity:'A wandering demon slayer who tracks and captures demons across remote regions. He believes some demons should not be killed, as their death can bring greater disasters. His reasons remain unclear, and he keeps his past private. He travels independently, but is willing to cooperate with the party when their goals align.',
  quote:'Some truths should be captured, not destroyed.',
  base:{hp:84,mp:40,atk:11,mag:9,def:8,spd:13}, grow:{hp:8.6,mp:3.6,atk:1.3,mag:1.1,def:1,spd:1},
  skills:[
   {id:'frost_trace',n:'Frost Trace',icon:'🗡️',mp:0,kind:'phys',tgt:'foe',pow:1.0,fx:[{k:'slow',d:1}],req:{lvl:1},sig:true,desc:'A swift sword strike imbued with cold energy. Deals damage and may slow the target.'},
   {id:'sealing_talismans',n:'Sealing Talismans',icon:'📜',mp:7,kind:'magic',tgt:'foe',pow:.7,fx:[{k:'bind',d:2}],req:{lvl:1},sig:true,desc:'Binding talismans thrown from range. A good chance to bind the target (strong enemies may resist).'},
   {id:'binding_net',n:'Binding Net',icon:'⛓️',mp:10,kind:'phys',tgt:'foe',pow:.5,fx:[{k:'bind',d:3}],req:{lvl:1},sig:true,desc:'Capture chains or a net immobilise a target for longer than the talismans.'},
   {id:'silent_veil',n:'Silent Veil',icon:'🌫️',mp:12,kind:'support',tgt:'allies',fx:[{k:'buff',stat:'def',m:1.25,d:3},{k:'ward',d:3}],req:{lvl:1},desc:'Hides the party\'s presence: allies take less damage for a few turns and resist status effects. (Out of battle it has no effect yet.)'},
   {id:'subdue_not_slay',n:'Subdue, Not Slay',icon:'🕸️',mp:14,kind:'support',tgt:'foe',hpBelow:.35,fx:[{k:'subdue'}],req:{lvl:1},sig:true,desc:'UNIQUE. Subdues a weakened enemy instead of killing it: it is captured alive and leaves the fight (bosses cannot be captured, only bound). Captured foes give their drops twice and +25% XP when the battle is won. Only usable on a foe at 35% HP or below.'},
  ],
  passive:'Restraint: the bind and slow effects he applies last one turn longer. He does not take the killing blow if he can avoid it.'},
};
const ROSTER = Object.keys(CHARACTERS);
