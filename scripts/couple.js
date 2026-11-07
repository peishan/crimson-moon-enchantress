/* =====================================================================
   YA'XING AND QIUMIN: the relationship route (private)
   Opens when the splash after Volume 21 comic 014 (chapter 664, "The Night They Chose") is closed, like Xiyu and Cangyuan's finale splash.
   Opens: (1) "A quiet hour together", once per game day (G.bondDay.yq): trust, affection and understanding between them rise, both recover a little,
   and a "Closeness" level (0-5) grows; (2) a party synergy "Together by choice" (+6% ATK, MAG, DEF, SPD to both when they fight in the same party; see PAIR_SYN in core.js).
   It stays private in the story: Xiyu, Cangyuan and Xiao Tian know; Hoko and Xiao Yan mind their own business; Yihai and Dongyue do not know (docs/YIHAI_CREW_PLAN.md).
   ===================================================================== */
const YQ_FLAG = 'yaxing_qiumin_together', YQ_MAX = 5;
const yqOpen = () => !!(G && G.flags && G.flags[YQ_FLAG]);
function yqUnlock(){
  if(yqOpen()) return [];
  G.flags[YQ_FLAG] = true; G.hooks = G.hooks || {}; G.hooks[YQ_FLAG] = G.ch || 664; save();
  return ['✦ Story: Ya\'Xing and Qiumin choose each other','✦ A private bond opens: a quiet hour together (once a day), and a party synergy whenever they fight side by side.'];
}
const yqLv = () => Math.min(YQ_MAX, (G && G.yq) || 0);
function doYqTime(){
  if(!yqOpen()) return ['This bond is not open yet.'];
  if(!G.party.includes('yaxing') || !G.party.includes('qiumin') || isAway('yaxing') || isAway('qiumin')) return ['They both need to be with the party.'];
  G.bondDay = G.bondDay || {};
  if(G.bondDay.yq === G.day) return ['They have already shared a quiet hour today.'];
  G.bondDay.yq = G.day; const before = yqLv(); G.yq = Math.min(YQ_MAX, before + 1);
  relAdd('qiumin', 'yaxing', {t:2, a:2, u:1});
  ['yaxing','qiumin'].forEach(id => { const s = statsOf(id); if(typeof healUnit === 'function') healUnit(id, Math.round(s.hp*.15), Math.round(s.mp*.15)); });
  const out = ['💜 Ya\'Xing and Qiumin share a quiet hour, away from the books and the investigation. Both recover a little.'];
  if(G.yq > before) out.push('✦ Closeness '+G.yq+'/'+YQ_MAX+'.'); else out.push('Their closeness is at its fullest for now.');
  return out;
}
function yqHtml(){
  if(!G.party.includes('qiumin') || !G.party.includes('yaxing') || !yqOpen()) return '';
  const done = G.bondDay && G.bondDay.yq === G.day;
  return `<h4>💜 Ya'Xing and Qiumin</h4><div class="sm">A private bond: they chose each other at the Ice Temple. Closeness ${yqLv()}/${YQ_MAX}. When they fight side by side both gain +6% to ATK, MAG, DEF and SPD (Together by choice). Not everyone knows.</div>
   <button ${done ? 'disabled' : ''} onclick="act(doYqTime)">💜 A quiet hour together ${done ? '(done today)' : ''}</button>
   ${done ? `<img class="pg" src="assets/events/yaxing_qiumin.webp" alt="Ya'Xing and Qiumin at the Ice Temple" onerror="this.style.display='none'">` : ''}`;
}
