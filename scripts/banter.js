/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — QUIET MOMENTS (party banter)
   Short exchanges that surface after a rest, between companions who are with the party and past the chapter given.
   One per rest, each only once (G.banterSeen). No rewards: warmth, comic relief and the bonds the story is about.
   Themes: Xiyu and Cangyuan (destined love), Dongyue and Xining (a trial of the heavens), Xiao Tian and Ya'Xing (brothers).
   ===================================================================== */
const BANTER = [
  {id:'xc_thread', who:['xiyu','cangyuan'], ch:60, t:['Xiyu: "You keep looking at my sleeve."','Cangyuan: "The thread has loosened. It has done that three times this week."','Xiyu: "It only loosens when you stand that close."','Cangyuan: "Then I will stand farther away."','Xiyu: "...Don\'t."']},
  {id:'xc_dream', who:['xiyu','cangyuan'], ch:78, t:['Xiyu: "I dreamed of a bridge last night. I knew you were on the other side before I saw your face."','Cangyuan: "Did you cross it?"','Xiyu: "I woke up first."','Cangyuan: "Then tonight, cross faster."']},
  {id:'xc_tea', who:['xiyu','cangyuan'], ch:120, t:['Cangyuan: "You are not drinking your tea."','Xiyu: "It tastes like somewhere I have been before."','Cangyuan: "That is plum blossom. I have no memory of it either. I only know I want you to finish it."']},
  {id:'xc_choice', who:['xiyu','cangyuan'], ch:210, t:['Xiyu: "If we were meant to find each other, I would still choose you anyway."','Cangyuan: "Destiny only gets the first move. The rest is ours."']},
  {id:'dx_trial', who:['dongyue','xining'], ch:80, t:['Xining: "Dongyue, you have been staring at the same bandage for ten minutes."','Dongyue: "I am checking that it is straight."','Xining: "It is straight. It was straight nine minutes ago."','Dongyue: "Then I am checking you are all right."','Xining: "...That one is harder to answer."']},
  {id:'dx_heavens', who:['dongyue','xining'], ch:130, t:['Dongyue: "An old teacher once told me every healer faces a trial before they learn what they are for."','Xining: "And yours?"','Dongyue: "I think it is standing very close to someone I cannot afford to lose."','Xining: "Then perhaps it is mine too."']},
  {id:'dx_herbs', who:['dongyue','xining'], ch:100, t:['Xining: "You sorted my herbs by colour again."','Dongyue: "It is faster."','Xining: "It is wrong. Frost herb goes with the cold ones."','Dongyue: "It is blue."','Xining: "I am going to teach you botany if it is the last thing I do."']},
  {id:'xtya_spar', who:['xiaotian','yaxing'], ch:60, t:['Ya\'Xing: "You dropped your guard on the left again."','Xiao Tian: "I let you have that one."','Ya\'Xing: "You let me have four."','Xiao Tian: "Brothers share."']},
  {id:'xtya_night', who:['xiaotian','yaxing'], ch:130, t:['Xiao Tian: "Do you ever think about who we were before the Ice Temple?"','Ya\'Xing: "Sometimes. Then I remember you snore, and I am glad I only know who you are now."','Xiao Tian: "That was almost kind."','Ya\'Xing: "Do not get used to it."']},
  {id:'hoko_map', who:['hoko','xiyu'], ch:119, t:['Hoko: "I have found a shortcut."','Xiyu: "Last time your shortcut ended in a swamp."','Hoko: "A scenic swamp."','Xiyu: "We are bringing a rope."']},
  {id:'xy_lists', who:['yanwatcher','xining'], ch:239, t:['Xiao Yan: "I made a list of everyone\'s boots."','Xining: "Why?"','Xiao Yan: "Because Hoko\'s are wet again, and I would like it noted that I warned him."']},
  {id:'xy_rest', who:['yanwatcher','dongyue'], ch:239, t:['Dongyue: "You have checked the door four times."','Xiao Yan: "It might have changed."','Dongyue: "Doors are not known for that."','Xiao Yan: "You have not travelled with Hoko."']},
  {id:'all_fire', who:['xiyu','dongyue','xining','xiaotian'], ch:120, t:['Xiao Tian: "Who is cooking tonight?"','Xining: "Not Dongyue."','Dongyue: "I resent that."','Xiyu: "You put the herbs in the soup and the soup in the herbs."','Dongyue: "It was a creative arrangement."']},
  {id:'xc_crimson', who:['xiyu','cangyuan'], ch:100, t:['Cangyuan: "Your hair is tangled in the thread again."','Xiyu: "Then untangle it."','Cangyuan: "It will take a while."','Xiyu: "Good."']},
  {id:'tya_cloak', who:['xiaotian','yaxing'], ch:100, t:['Ya\'Xing: "That is my cloak."','Xiao Tian: "It was on the floor."','Ya\'Xing: "It was drying."','Xiao Tian: "Then it is nicely dry now. You are welcome."']},
  {id:'xx_tea', who:['xiyu','xining'], ch:150, t:['Xining: "You are holding the cup but not drinking."','Xiyu: "I am thinking."','Xining: "Then think faster. It is going cold, and I made it with the good leaves."','Xiyu: "You used the good leaves on me?"','Xining: "Do not make it a speech. Drink."']},
  {id:'xd_maps', who:['xiyu','dongyue'], ch:180, t:['Dongyue: "You have marked the same bridge three times."','Xiyu: "It keeps coming up."','Dongyue: "Bridges do that. It is their whole job."']},
  {id:'dxt_boots', who:['dongyue','xiaotian'], ch:200, t:['Xiao Tian: "Your boots are on the wrong feet."','Dongyue: "They are not."','Xiao Tian: "Walk to the door."','Dongyue: "...Do not tell Xining."']},
  {id:'xyx_cloak', who:['xining','yaxing'], ch:200, t:['Ya\'Xing: "That is a lot of herbs for one afternoon."','Xining: "It is a normal amount of herbs."','Ya\'Xing: "It is four sacks."','Xining: "It is a normal amount of sacks."']},
  {id:'hy_wet', who:['hoko','yanwatcher'], ch:260, t:['Xiao Yan: "The path has a wet patch."','Hoko: "I saw it."','Xiao Yan: "You are standing in it."','Hoko: "I am testing how wet."']},
  {id:'xh_rope', who:['xiyu','hoko'], ch:260, t:['Xiyu: "You brought the rope."','Hoko: "I always bring the rope."','Xiyu: "You brought it last time and did not use it."','Hoko: "That is how you know it works."']},
  {id:'xc_snow', who:['xiyu','cangyuan'], ch:300, t:['Cangyuan: "It is snowing on your shoulder."','Xiyu: "It is snowing on both of us."','Cangyuan: "Mine does not count. You are the one who gets cold."','Xiyu: "Stand a little closer, then."']},
  {id:'all_rain', who:['xiyu','dongyue','xining','xiaotian'], ch:300, t:['Xiao Tian: "I think the rain is lighter on the left."','Dongyue: "It is raining the same everywhere."','Xining: "He walked on the left all day. Let him have it."','Xiyu: "Left it is."']},
];
const banterPresent = ids => ids.every(i => G.party.includes(i) && !(G.away && G.away[i]));
function nextBanter(){
  G.banterSeen = G.banterSeen || {};
  const ok = BANTER.filter(b => !G.banterSeen[b.id] && G.ch >= b.ch && banterPresent(b.who));
  if(!ok.length) return [];
  const b = ok[Math.floor(Math.random()*ok.length)];
  G.banterSeen[b.id] = G.day;
  return b.t.map((l,i) => (i ? '   ' : '💬 ')+l);
}
