/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — RELATIONSHIPS (Trust & Approval)
   Three values per pair of characters (not per player): trust (t), affection (a), understanding (u), each 0..100.
     trust         unlocks personal conversations (family, past relationships, regrets)
     affection     romantic development (only shown for romantic pairs)
     understanding built by listening, reciprocal conversation and acknowledging differences
   Numbers are never shown to the player: the Confidants tab shows descriptions only.
   Trust unlocks the OPPORTUNITY TO ASK, never the right to an answer: every conversation has a "not now" option that costs nothing,
   pressing for an answer strains trust and closes the topic until a later chapter. No chastity, purity or virginity value exists,
   nobody is required to disclose, and having had former partners never lowers anyone's standing (see docs/RELATIONSHIPS.md).
   Save: G.rel = { 'a|b': {t,a,u} } (ids sorted) · G.convo = { conversationId: {done, opt, retry, nn} }
   ===================================================================== */
const REL_STAGES = [[0,'Guarded'],[20,'Growing trust'],[40,'Confided in you'],[60,'Deep understanding'],[80,'Established intimacy']];
const REL_ROMANTIC = ['dongyue|xiyu','cangyuan|xiyu','dongyue|xining'];   // pairs where affection is shown (Xiyu and Dongyue stop being one from chapter 70: author decision)
const relRomantic = k => REL_ROMANTIC.includes(k) && !(k === 'dongyue|xiyu' && G.ch >= 70);
const relKey = (a,b) => [a,b].sort().join('|');
const relGet = (a,b) => { G.rel = G.rel || {}; const k = relKey(a,b); return G.rel[k] || (G.rel[k] = {t:0, a:0, u:0}); };
const relClamp = v => Math.max(0, Math.min(100, Math.round(v)));
function relAdd(a, b, d){ const r = relGet(a,b); ['t','a','u'].forEach(k => { if(d[k]) r[k] = relClamp(r[k] + d[k]); }); }
const relStage = t => REL_STAGES.reduce((s,[min,label]) => t >= min ? label : s, REL_STAGES[0][1]);
const relAffection = a => a < 10 ? 'Undefined' : a < 30 ? 'Curious' : a < 50 ? 'Warm' : a < 70 ? 'Fond' : 'Devoted';
const relUnderstanding = u => u < 15 ? 'Little understood' : u < 40 ? 'Beginning to understand' : u < 70 ? 'Understood' : 'Deeply understood';

/* Story beats that move a relationship when a chapter completes (small, deliberate; conversations do the rest). [a, b, {t,a,u}] */
const REL_CH = {
  364:[['xiyu','cangyuan',{t:3}]],
  311:[['xiyu','cangyuan',{t:3}]],
  270:[['xiyu','cangyuan',{t:4,a:4}]],
  8:[['dongyue','xiyu',{t:5}]], 14:[['xiaotian','xiyu',{t:6}],['dongyue','xiaotian',{t:30,u:20}]], 15:[['yaxing','xiyu',{t:6}]], 11:[['dongyue','xiyu',{t:5,a:5}]], 16:[['dongyue','xiyu',{t:5,a:3}]], 18:[['dongyue','xiyu',{t:5,a:3}]], 20:[['dongyue','xiyu',{t:5,a:3}]],
  21:[['dongyue','xiyu',{t:5,a:2}]], 26:[['xiaotian','xiyu',{t:4}],['yaxing','xiyu',{t:4}]], 34:[['xiaotian','xiyu',{t:4}],['yaxing','xiyu',{t:4}],['dongyue','xiaotian',{t:5}]], 36:[['dongyue','xiaotian',{t:5,u:5}]], 29:[['dongyue','xiyu',{t:5,a:6}]], 33:[['dongyue','xiyu',{t:5,a:5,u:5}]], 37:[['dongyue','xiyu',{t:5,a:5}]],
  38:[['dongyue','xiyu',{t:8,a:5,u:10}]], 39:[['dongyue','xiyu',{t:2,u:5}],['dongyue','xiaotian',{t:5}]], 40:[['dongyue','xiyu',{t:-5}]],
  41:[['cangyuan','xiyu',{t:3}]], 42:[['cangyuan','xiyu',{t:3}]], 46:[['cangyuan','xiyu',{t:5}]], 47:[['cangyuan','xiyu',{t:5,a:3}]], 48:[['cangyuan','xiyu',{t:8,u:5}]],
  49:[['cangyuan','xiyu',{t:3,u:3}]], 51:[['cangyuan','xiyu',{a:6,u:2}]], 53:[['cangyuan','xiyu',{a:3}],['xining','xiyu',{t:5}],['xining','dongyue',{t:8,u:5,a:3}],['cangyuan','xining',{t:3}]],
  52:[['xining','dongyue',{t:10,u:5,a:5}]], 54:[['xining','xiyu',{t:5,u:3}],['cangyuan','xining',{t:3}],['cangyuan','dongyue',{t:3}]],
  55:[['cangyuan','xiyu',{a:4,u:3}],['xining','dongyue',{t:3,u:3}],['xining','xiyu',{t:3}]], 56:[['cangyuan','xiyu',{t:5,u:5}],['cangyuan','dongyue',{t:2}],['xining','dongyue',{t:2}]],
  57:[['cangyuan','xiyu',{t:5,u:4}]], 58:[['cangyuan','xiyu',{t:3}]], 59:[['cangyuan','xiyu',{t:5,u:3}]], 60:[['cangyuan','xiyu',{t:5,a:3,u:4}],['xining','dongyue',{t:2,u:2,a:2}]],
  61:[['cangyuan','xiyu',{t:4,a:15,u:3}]],
  62:[['cangyuan','xiyu',{t:4,a:6,u:3}]], 63:[['cangyuan','xiyu',{t:3,u:3}]], 64:[['cangyuan','xiyu',{t:4,u:4}],['dongyue','xining',{t:2,u:2}]], 65:[['cangyuan','xiyu',{t:3,u:2}]],
  66:[['cangyuan','xiyu',{t:6,a:4,u:4}],['cangyuan','dongyue',{t:3}],['cangyuan','xining',{t:3}]], 67:[['cangyuan','xiyu',{t:3,a:8}],['xining','dongyue',{t:4,u:4,a:3}]],
  68:[['cangyuan','xiyu',{t:2,u:2}]], 69:[['cangyuan','xiyu',{t:2,u:2}]],
  70:[['dongyue','xiyu',{t:3,u:6,a:-20}]],   // an honest end to the romance: the hurt is real, and so is the friendship
  72:[['xiaotian','dongyue',{t:2}],['cangyuan','xiyu',{u:2}]], 73:[['xiaotian','xiyu',{t:2}]], 74:[['xiaotian','cangyuan',{t:3}]], 75:[['cangyuan','xiyu',{t:2,u:2}]],
  76:[['cangyuan','xiyu',{t:3,u:3}],['xiaotian','dongyue',{t:2}]], 77:[['xiyu','xining',{t:2}],['dongyue','xiyu',{t:2,u:2}]],
  78:[['cangyuan','xiyu',{t:6,a:15,u:5}],['dongyue','xiyu',{t:3,u:3}]],
  79:[['cangyuan','xiyu',{t:4,a:6,u:4}]], 80:[['cangyuan','xiyu',{t:5,u:5}]], 81:[['cangyuan','xiyu',{t:2,u:2}],['xiaotian','xiyu',{t:2}]], 82:[['xiaotian','dongyue',{t:2,u:2}],['xiaotian','xining',{t:2}]],
  83:[['xiaotian','dongyue',{t:3,u:3}],['xiaotian','xining',{t:3,u:3}]], 84:[['xiaotian','cangyuan',{t:3,u:3}],['cangyuan','xiyu',{t:2,u:2}]], 85:[['xining','xiaotian',{t:2}]],
  87:[['xining','dongyue',{t:4,u:4,a:3}],['xiaotian','dongyue',{t:3}]],
  88:[['xiaotian','dongyue',{t:3,u:3}],['cangyuan','xiyu',{t:2,u:2}]], 89:[['xiaotian','dongyue',{t:3,u:2}],['cangyuan','xiyu',{t:2,u:2}]], 90:[['xiaotian','xining',{t:2,u:2}],['cangyuan','xiyu',{t:1,u:2}]],
  91:[['xiaotian','dongyue',{t:3,u:3}],['cangyuan','xiyu',{t:2,u:2}]], 92:[['xiaotian','dongyue',{t:2}],['cangyuan','xiyu',{t:2}]], 93:[['xiaotian','dongyue',{t:2}]], 94:[['xiaotian','dongyue',{t:3,u:3}],['xiaotian','xining',{t:2}]],
  97:[['xiaotian','dongyue',{t:3,u:3}]], 98:[['xiaotian','dongyue',{t:2,u:2}],['xiaotian','xiyu',{t:2}]], 99:[['xiaotian','xiyu',{t:3,u:2}],['xiaotian','cangyuan',{t:3,u:2}],['xiaotian','xining',{t:2,u:2}],['xiaotian','dongyue',{t:2,u:3}]],
  100:[['xiaotian','dongyue',{t:3,u:3}]], 101:[['xining','dongyue',{t:3,u:3}],['xiaotian','dongyue',{t:2,u:2}]], 102:[['xiaotian','dongyue',{t:2}]], 103:[['xiaotian','dongyue',{t:2,u:2}],['xiaotian','xiyu',{t:2}]],
  105:[['xiaotian','cangyuan',{t:2,u:2}]], 106:[['xiaotian','dongyue',{t:3,u:3}]], 107:[['xiaotian','xiyu',{t:3,u:2}],['xiaotian','cangyuan',{t:2}]],
 
 
  105:[['xiaotian','dongyue',{t:3,u:3}],['xiaotian','xining',{t:3,u:3}]], 106:[['xiaotian','xiyu',{t:2,u:2}],['xiaotian','cangyuan',{t:2,u:2}]], 107:[['xiaotian','dongyue',{t:4,u:4}],['xiaotian','xining',{t:3,u:3}]], 103:[['xiaotian','dongyue',{t:2,u:2}]],
  126:[['xiyu','yaxing',{t:3,u:3}],['xining','yaxing',{t:2,u:2}]], 127:[['dongyue','yaxing',{t:3,u:3}],['xiaotian','yaxing',{t:3,u:3}],['cangyuan','yaxing',{t:2,u:2}]], 129:[['xiaotian','hoko',{t:1}]],
  133:[['xiaotian','yaxing',{t:1}]], 136:[['dongyue','yaxing',{t:2,u:2}],['xiyu','yaxing',{t:1}]], 140:[['hoko','xiyu',{t:2}]], 141:[['cangyuan','xiyu',{t:2,u:2}],['dongyue','xiyu',{t:2,u:2}]],
  171:[['hoko','xiyu',{t:2,u:1}],['hoko','dongyue',{t:1}]], 176:[['cangyuan','yaxing',{t:2,u:2}]], 186:[['yaxing','xiyu',{t:1}],['xining','cangyuan',{t:1}]],
  209:[['cangyuan','xiyu',{t:2,u:2}],['xining','dongyue',{t:1}],['yaxing','xiaotian',{t:2,u:2}]],
  231:[['xiyu','cangyuan',{t:1}],['xiaotian','dongyue',{t:1}]],
  203:[['dongyue','yaxing',{t:2,u:2}]], 207:[['cangyuan','xiyu',{t:2,u:2}]], 208:[['cangyuan','xiyu',{t:3,u:3}]], 204:[['cangyuan','xiyu',{t:2,u:2}]],
 
  117:[['cangyuan','xiyu',{t:2}]],
 
  86:[['cangyuan','xiyu',{t:2,u:3}],['xining','dongyue',{t:3,u:3,a:2}],['xiaotian','dongyue',{t:2}]], 95:[['xiaotian','dongyue',{t:2,u:2}]], 96:[['xiaotian','dongyue',{t:4,u:4}],['cangyuan','xiyu',{t:2,u:2}]],
};
/* Consequences that apply when a story flag is SET (so a hidden event and its discovery can be separate): e.g. when comic 031's enchantment is
   written in, the chapter sets xiyu_enchanted_dongyue (hidden, no effect) and, only when Dongyue learns the truth, dongyue_learned_of_enchantment.
   Applied once per flag (G.convo['_f_'+flag]). Dongyue's memory is not touched here. Chapters 70-71 are not in the game yet. */
const REL_FLAG = { dongyue_learned_of_enchantment: [['dongyue','xiyu',{t:-25,u:-8}]] };
function relOnFlag(f){ if(!REL_FLAG[f]) return; G.convo = G.convo || {}; if(G.convo['_f_'+f]) return; G.convo['_f_'+f] = true; REL_FLAG[f].forEach(([a,b,d]) => relAdd(a,b,d)); }
function relStory(n){ (REL_CH[n] || []).forEach(([a,b,d]) => relAdd(a,b,d)); }

/* ---------- conversations ----------
   option.kind: 'listen'/'ask' (counts, once) · 'notnow' (costs nothing, stays available; small gain once) · 'press' (strains trust, closed until the next chapter)
   option.need = minimum trust for that question. option.flags = things the player now knows (G.flags + hooks). */
const CONVOS = [
  { id:'xining_dongyue_family', a:'xining', b:'dongyue', ch:53, trust:15, title:'Xining asks about his parents', who:'Xining → Dongyue',
    lead:'Xining has noticed that Dongyue is capable and considerate, yet uncomfortable when other people decide what is best for him. Over the evening tea she asks, gently, about his parents.',
    options:[
      {id:'listen', kind:'listen', t:'Listen.', fx:{t:10,u:8}, flags:['knows_dongyue_family_control'],
       reply:['Dongyue: "My parents feared what my healing could become. The fear turned into control: where I went, whom I healed, what I was allowed to want."','Xining does not offer a cure for it. "That sounds exhausting." "It was."'],
       learned:'Xining understands why he stiffens when others decide for him.'},
      {id:'why_left', kind:'ask', t:'Ask why he left Yilong.', need:30, needNote:'He isn\'t ready for that question yet.', fx:{t:8,u:10}, flags:['knows_why_dongyue_left_yilong'],
       reply:['Dongyue: "Leaving was my first attempt at deciding for myself. I\'m still learning what that means."','Xining: "Then I won\'t tell you what it should mean."'],
       learned:'A later choice about returning to Yilong can be met with more care.'},
      {id:'notnow', kind:'notnow', t:'Let him keep it private.', fx:{t:1},
       reply:['Dongyue: "Family matters are private."','Xining: "Then they\'re yours. Ask me again when you want someone to listen."']},
      {id:'press', kind:'press', t:'Press him: it can\'t be that private.', fx:{t:-6},
       reply:['Dongyue: "I said it was private."','He steps back, and the easy quiet between them is gone. Perhaps another day.']},
    ]},
  { id:'dongyue_xining_muxue', a:'dongyue', b:'xining', ch:53, trust:15, title:'Dongyue asks why she came to Muxue', who:'Dongyue → Xining',
    lead:'Dongyue asks Xining why she came to Muxue at all.',
    options:[
      {id:'listen', kind:'listen', t:'Listen.', fx:{t:8,u:6,a:2}, flags:['knows_why_xining_came'],
       reply:['Xining: "Someone was hurt, and I might be able to help. I couldn\'t simply ignore the suffering."','"That isn\'t an easy way to live." "It isn\'t. I prefer it."']},
      {id:'master', kind:'ask', t:'Ask what she hopes to learn.', need:30, needNote:'She isn\'t ready to say.', fx:{t:8,u:8}, flags:['xining_master_question_hinted'],
       reply:['Xining: "There are questions my master left unanswered. I think this corruption touches one of them. I\'ll say more when I\'m sure."'],
       learned:'Her master\'s unanswered question is a thread for later.'},
      {id:'notnow', kind:'notnow', t:'Say she needn\'t explain.', fx:{t:1},
       reply:['Xining: "Thank you. I\'ll tell you when it matters."']},
      {id:'press', kind:'press', t:'Doubt that kindness is the whole reason.', fx:{t:-6},
       reply:['Xining: "If you want to question my reasons, do it openly."','The warmth between them cools for now.']},
    ]},
  { id:'xiyu_cangyuan_cost', a:'xiyu', b:'cangyuan', ch:61, trust:25, title:'Xiyu asks what it cost him', who:'Xiyu → Cangyuan',
    lead:'Once the door is behind them, Xiyu does not ask what the woman did. She asks about the one he remembers, and what it cost him.',
    options:[
      {id:'listen', kind:'listen', t:'Ask what it cost him, and let him choose how much to say.', fx:{t:10,u:10,a:3}, flags:['cangyuan_shared_what_hurt'],
       reply:['Cangyuan: "I trusted her deeply and believed I understood her. What hurt wasn\'t only losing her. It was discovering that what I understood was incomplete."','He says nothing else, and Xiyu does not ask for more. "That\'s enough for today."'],
       learned:'When Cangyuan withdraws, Xiyu can ask what he needs instead of assuming he wants to be left alone.'},
      {id:'notnow', kind:'notnow', t:'Tell him he needn\'t tell her anything yet.', fx:{t:3,u:2,a:2},
       reply:['Cangyuan: "You\'re doing it again. Being kind."','"Is that a problem?" "Not yet."']},
      {id:'press', kind:'press', t:'Ask him what she did to him.', fx:{t:-8},
       reply:['Cangyuan: "Ask me when the door is open, not before."','The distance returns, politely.']},
    ]},
  { id:'cangyuan_xiyu_past', a:'cangyuan', b:'xiyu', ch:61, trust:25, title:'Cangyuan asks about her past', who:'Cangyuan → Xiyu',
    lead:'Cangyuan asks about the people she has loved. He promises to listen without keeping score.',
    options:[
      {id:'honest', kind:'listen', t:'Tell him honestly.', fx:{t:10,u:8,a:6}, flags:['cangyuan_knows_xiyu_history'],
       reply:['Xiyu: "I loved Xu Hanshan once, sincerely. His abandonment, and the way he treated me, wore that love away until nothing was left."','"Dongyue came under very different circumstances: the Ice Temple ritual, then the wedding. I haven\'t decided what those mean for what comes next."','Cangyuan does not compare himself to them or ask her to prove anything. "Thank you for trusting me with it."'],
       learned:'Cangyuan will not compete with her past or demand that she prove her feelings.'},
      {id:'why', kind:'ask', t:'Ask why he wants to know.', fx:{t:6,u:6,a:3},
       reply:['Cangyuan: "Because I\'d rather learn who you are than guess at who you\'ve been."']},
      {id:'notnow', kind:'notnow', t:'Tell him only what she wants to.', fx:{t:3,u:2},
       reply:['Xiyu: "Some of it is mine to keep."','Cangyuan: "Then keep it."']},
      {id:'press', kind:'press', t:'Tell him it is none of his business.', fx:{t:-5},
       reply:['Cangyuan: "Fair."','He lets it go, and does not ask again today.']},
    ]},
  { id:'dongyue_xiaotian_dream', a:'dongyue', b:'xiaotian', ch:40, trust:40, title:'Dongyue asks about the woman in grey', who:'Dongyue → Xiao Tian',
    lead:'Late one evening Dongyue asks his sworn younger brother about the dreams he mutters about in his sleep: the woman in grey who calls him "son".',
    options:[
      {id:'listen', kind:'listen', t:'Let him talk.', fx:{t:8,u:8}, flags:['xiao_tian_shared_the_dream'],
       reply:['Xiao Tian, for once without a joke: "She says \'son\'. I can\'t see her face. I wake up and I know it mattered, and I don\'t know why."','Dongyue: "Then we find out, together. You don\'t have to be ready first."'],
       learned:'Dongyue will back his search for the woman in grey, without pushing him to remember faster.'},
      {id:'notnow', kind:'notnow', t:'Tell him they can talk another night.', fx:{t:1},
       reply:['Xiao Tian: "Ha, good. I was about to make a terrible joke."','Dongyue: "Make it. Then we\'ll see."']},
      {id:'press', kind:'press', t:'Press him to remember her face.', fx:{t:-6},
       reply:['Xiao Tian: "If I could, I would! Stop it, it hurts."','The silence afterwards is not a kind one.']},
    ]},
  { id:'dongyue_xiaotian_master', a:'dongyue', b:'xiaotian', ch:40, trust:50, title:'Xiao Tian tells him about his master', who:'Xiao Tian → Dongyue',
    lead:'After a hard fight Xiao Tian sits apart from the others. Dongyue joins him, and he finally speaks about the mountain, his martial brothers and his master, all killed.',
    options:[
      {id:'listen', kind:'listen', t:'Listen.', fx:{t:10,u:10}, flags:['xiao_tian_shared_his_loss'],
       reply:['Xiao Tian: "They were my brothers, and my master. They were killed over gold by people in iron masks. I have to get stronger before I find them."','Dongyue: "You are not doing it alone."'],
       learned:'Dongyue understands why Xiao Tian trains so hard, and will fight beside him rather than for him.'},
      {id:'notnow', kind:'notnow', t:'Sit beside him in silence.', fx:{t:2},
       reply:['Xiao Tian does not say anything either. After a while he leans against Dongyue\'s shoulder, and neither remarks on it.']},
      {id:'press', kind:'press', t:'Tell him revenge will not bring anyone back.', fx:{t:-7},
       reply:['Xiao Tian: "I know what it won\'t do. Let me have it anyway."','He walks off, and Dongyue lets him go.']},
    ]},
];
const convoState = id => (G.convo = G.convo || {})[id] || {};
function convoBlock(c){   // '' when it can be opened, otherwise a plain-words reason
  if(!isRecruited(c.a) || !isRecruited(c.b)) return 'Both of them must be in the party.';
  if(G.ch < c.ch) return 'Not yet.';   // not part of the story yet (the list hides these)
  const st = convoState(c.id);
  if(st.done) return 'done';
  if(st.retry && G.ch < st.retry) return 'They have said what they will for now. Try again after the next chapter.';
  if(relGet(c.a,c.b).t < c.trust) return 'They don\'t know each other well enough yet.';
  return '';
}
const convoVisible = c => isRecruited(c.a) && isRecruited(c.b) && G.ch >= c.ch;

let CV = null;   // the conversation being played: {id, res}
function openConvo(id){ CV = {id, res:null}; render(); }
function closeConvo(){ CV = null; render(); }
function pickConvo(id, optId){
  const c = CONVOS.find(x => x.id === id), o = c && c.options.find(x => x.id === optId); if(!c || !o || convoBlock(c)) return;
  if(o.need && relGet(c.a,c.b).t < o.need) return;
  const st = convoState(id); G.convo[id] = st;
  const before = Object.assign({}, relGet(c.a,c.b)), fx = o.fx || {};
  if(o.kind === 'notnow'){ if(!st.nn){ st.nn = true; relAdd(c.a, c.b, fx); } }
  else { relAdd(c.a, c.b, fx); if(o.kind === 'press') st.retry = G.ch + 1; else { st.done = true; st.opt = o.id; } }
  (o.flags || []).forEach(f => { G.flags[f] = true; if(!G.hooks[f]) G.hooks[f] = G.ch; });
  const notes = [];
  if(fx.t > 0 && o.kind !== 'notnow') notes.push('Trust deepened.'); else if(fx.t < 0) notes.push('Trust strained.');
  if(fx.u > 0 && o.kind !== 'notnow') notes.push('Understanding grew.');
  if(fx.a > 0 && relRomantic(relKey(c.a,c.b)) && o.kind !== 'notnow') notes.push('Something warmer stirred.');
  if(o.kind === 'notnow') notes.push('Respecting the answer costs nothing. You can ask again later.');
  if(o.kind === 'press') notes.push('This topic is closed until the next chapter.');
  CV = {id, res:{opt:o, notes, learned:o.learned || ''}}; save(); render();
}

/* ---------- the Confidants tab ---------- */
const relationsOpen = () => G.party.length >= 2;
function relPairsHtml(){
  const ids = G.party.filter(id => CHARACTERS[id]); const rows = [];
  for(let i=0;i<ids.length;i++) for(let j=i+1;j<ids.length;j++){
    const a = ids[i], b = ids[j], k = relKey(a,b), r = G.rel && G.rel[k]; if(!r || (!r.t && !r.a && !r.u)) continue;
    const bits = [`<b>${relStage(r.t)}</b>`, relUnderstanding(r.u)];
    if(k === 'dongyue|xiyu' && G.ch >= 70) bits.push(G.ch >= 78 ? 'Friend, crewmate and ally' : 'Close, but not romantic');
    else if(relRomantic(k) && r.a > 0) bits.push('Affection: '+relAffection(r.a));
    rows.push(`<div class="li">${CHARACTERS[a].icon||''} ${first(a)} ↔ ${CHARACTERS[b].icon||''} ${first(b)}<div class="sm">${bits.join(' · ')}</div></div>`);
  }
  return rows.join('') || '<div class="sm">Nobody has opened up to anyone yet.</div>';
}
function convoCardHtml(c){
  const why = convoBlock(c), st = convoState(c.id), done = why === 'done';
  if(done){ const o = c.options.find(x => x.id === st.opt); return `<div class="card lock" style="cursor:default"><span class="big">💬</span><div class="fl"><b>${c.title}</b><div class="sm">${c.who} · talked: ${o ? o.t.replace(/\.$/,'') : 'done'}</div></div></div>`; }
  return `<div class="card ${why?'lock':''}" style="cursor:default"><span class="big">💬</span><div class="fl"><b>${c.title}</b><div class="sm">${c.who}</div>${why?`<div class="sm" style="color:#9aa">${why}</div>`:`<button class="pri" onclick="openConvo('${c.id}')">Talk</button>`}</div></div>`;
}
function convoPlayHtml(){
  const c = CONVOS.find(x => x.id === CV.id); if(!c) { CV = null; return ''; }
  if(CV.res){
    const r = CV.res;
    return `<div class="panel"><h3>${c.title}</h3><div class="sm"><i>${r.opt.t}</i></div>${r.opt.reply.map(l => `<div style="margin:6px 0">${l}</div>`).join('')}
      <div class="sm" style="margin-top:6px">${r.notes.join(' ')}</div>${r.learned?`<div class="panel good" style="margin-top:6px">✦ You learned: ${r.learned}</div>`:''}<button class="pri" onclick="closeConvo()">Done</button></div>`;
  }
  const t = relGet(c.a,c.b).t;
  return `<div class="panel"><h3>${c.title}</h3><div style="margin:6px 0">${c.lead}</div>${c.options.map(o => { const lock = o.need && t < o.need;
    return `<div style="margin:4px 0"><button ${lock?'disabled':''} onclick="pickConvo('${c.id}','${o.id}')">${o.t}</button>${lock?` <span class="sm" style="color:#9aa">${o.needNote}</span>`:''}</div>`; }).join('')}
    <button onclick="closeConvo()">◀ Leave it for now</button></div>`;
}
function learnedHtml(){
  const rows = [];
  CONVOS.forEach(c => { const st = convoState(c.id); if(!st.done) return; const o = c.options.find(x => x.id === st.opt); if(o && o.learned) rows.push(`<div class="li">✦ ${o.learned}</div>`); });
  return rows.length ? `<h4>What you have learned</h4>${rows.join('')}` : '';
}
function rConfidants(){
  if(!relationsOpen()) return '<h2>Confidants</h2><div class="sm">🔒 Opens once someone travels with Xiyu.</div>';
  if(CV) return `<h2>Confidants</h2>${convoPlayHtml()}`;
  const list = CONVOS.filter(convoVisible).map(convoCardHtml).join('');
  return `<h2>Confidants</h2><div class="sm">Trust is earned by listening, respecting boundaries and keeping confidences. A question is an invitation, not a right: it is always fine to leave something unasked.</div>
    ${synergyHtml()}<h4>Quiet time</h4>${quietHtml()}<h4>How they stand</h4>${relPairsHtml()}<h4>Conversations</h4>${list || '<div class="sm">Nothing to talk about yet.</div>'}${learnedHtml()}${personalHtml()}`;
}

function synergyHtml(){
  const rows = PAIR_SYN.filter(p => isRecruited(p.a) && isRecruited(p.b) && p.open()).map(p => { const on = pairSynActive(p, G.active); return `<div class="li">${on?'✔':'○'} <b>${first(p.a)} + ${first(p.b)}</b> · ${p.label} +${Math.round(p.pct*100)}% <span class="sm">${on?'active in this party':'when both fight in the same party'}</span></div>`; }).join('');
  const bond = relationshipOpen() ? `<div class="li">${isRecruited('cangyuan') && G.active.includes('xiyu') && G.active.includes('cangyuan') ? '✔' : '○'} <b>Xiyu + Cangyuan</b> · Bond of Choice +${4+2*resLv()}%</div>` : '';
  return `<h4>Party synergies</h4><div class="sm">Allies who fight in the same party gain stat bonuses (ATK, MAG, DEF, SPD). Anyone you trust adds a little more (Comradeship, up to +5%).</div>${rows}${bond}`;
}
function quietHtml(){
  const cos = G.party.filter(id => id !== 'xiyu'); if(!cos.length) return '<div class="sm">Nobody is with her yet.</div>';
  return `<div class="sm">Once a day Xiyu can spend an hour with a companion: her heat settles and they understand each other a little better. It builds trust only up to a point; deeper trust comes from conversations and the story.</div>`
    + cos.map(id => `<button ${quietTimeReady(id)?'':'disabled'} onclick="act(()=>doQuietTime('${id}'))">🍵 ${first(id)}</button>`).join('')
    + (G.bondDay.quiet === G.day ? '<div class="sm">She has already spent quiet time today.</div>' : '');
}
