/* =====================================================================
   VOLUME 7 CONFRONTATION (prototype): Xiao Tian leads; the others make sure he faces his enemies himself.
   Lead battle rules live in battle.js (spec.lead, spec.stages, spec.blessing); see docs/VOLUME7_BATTLE.md.
   ===================================================================== */
const V7_PARTY = ['xiaotian','xiyu','cangyuan','xining','dongyue','hoko','yaxing','yanwatcher'];
function v7ConfrontationSpec(lv, opts){
  opts = opts || {};
  const F = (key, x) => Object.assign({key, lv}, x || {});
  return { lead:'xiaotian', blessing:true, allies:opts.allies || V7_PARTY, rewards:!!opts.rewards, chapter:opts.chapter, firstClear:opts.firstClear, onWin:opts.onWin,
    stages:[
      { msg:'— Stage 1: The hired group holds its formation. Ya\'Xing guards the flank; break the formation before it closes around him. —',
        foes:[F('hired_fighter',{formation:true}), F('hired_fighter',{formation:true}), F('hired_captain',{formation:true})] },
      { msg:'— Stage 2: The formation breaks, and Xiao Tian finds his rhythm. —', fx:['rhythm','mend'],
        foes:[F('hired_fighter'), F('hired_fighter',{skipIf:'hoko'}), F('hired_fighter',{skipIf:'yanwatcher'})] },
      { msg:'— Stage 3: The principals step forward. The others hold them in place; the end is his to deliver. —', fx:['resolve'],
        foes:[F('masked_principal',{perp:true}), F('masked_principal',{perp:true})] },
    ] };
}
