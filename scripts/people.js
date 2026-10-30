/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — PEOPLE (cast portrait cards)
   Cards: assets/cast/people/<id>.webp (512px, captions from the author's portrait set).
   intro = chapter in which the script first shows or names them; they unlock in the Cast tab once it is complete.
   intro:99 = in the author's portrait set but NOT yet in chapters 1-20 (hidden until Season 1 content reaches them).
   Roles are the captions on the portrait set. Nothing else is asserted about them here.
   ===================================================================== */
const PEOPLE = [
  {id:'muxue_xiyu',    n:'Muxue Xiyu',    zh:'慕雪细雨', role:'Moon Witch',            intro:1},
  {id:'zhan_dongyue',  n:'Zhan Dongyue',  zh:'展东悦',   role:'Battle Cleric',         intro:2},
  {id:'ya_xing',       n:'Ya\'Xing',      zh:'亚星',     role:'Ranger / Navigator',    intro:2},
  {id:'xiao_tian',     n:'Xiao Tian',     zh:'萧天',     role:'Martial Artist',        intro:2},
  {id:'long_raya',     n:'Long Ra\'ya',   zh:'龙拉雅',   role:'Village Mayor',         intro:3},
  {id:'abu',           n:'A\'Bu',         zh:'阿布',     role:'Mystic Sage · Witch Doctor', intro:3},
  {id:'sister_qing',   n:'Sister Qing',   zh:'清姐',     role:'Inn Cook',              intro:9},
  {id:'xu_hanshan',    n:'Xu Hanshan',    zh:'徐寒山',   role:'Former Friend',         intro:1},
  {id:'wang_xier',     n:'Wang Xi\'er',   zh:'王夕儿',   role:'Hanshan\'s Wife',       intro:10},
  {id:'pei_xinyi',     n:'Pei Xinyi',     zh:'裴心怡',   role:'Cousin',                intro:13},
  {id:'muxue_fangyi',  n:'Muxue Fangyi',  zh:'慕雪方逸', role:'Granduncle',            intro:16},
  {id:'muxue_yan',     n:'Muxue Yan',     zh:'慕雪岩',   role:'Ancient Sage',          intro:17},
  {id:'ice_temple',    n:'The Ice Temple',zh:'冰之神殿', role:'Key Location',          intro:18},
  {id:'lady_peony',    n:'Lady Peony',    zh:'牡丹夫人', role:'Xiyu\'s Late Mother',   intro:19},
  {id:'minami',        n:'Minami',        zh:'南汐',     role:'Moon Deity (Legend)',   intro:19},
  {id:'ma_qi',         n:'Ma Qi',         zh:'马七',     role:'Inn Waiter',            intro:99},
  {id:'xiao_bai',      n:'Xiao Bai',      zh:'小白',     role:'Spirit Companion',      intro:99},
  {id:'zhan_yihai',    n:'Zhan Yihai',    zh:'展逸海',   role:'Dongyue\'s Father',     intro:99},
  {id:'ming_yue',      n:'Ming Yue',      zh:'明月',     role:'Dongyue\'s Mother · Healer of Zhan Manor', intro:425},
  {id:'ao_yun',        n:'Ao Yun',        zh:'敖云',     role:'Beloved of Muxue Yan',  intro:99},
  // portraits still to be generated (assets/cast/people/<id>.webp); until then a placeholder is shown. Chinese names to be confirmed.
  {id:'hoko',          n:'Hoko',          zh:'',         role:'Explorer of Luiterra',  intro:26, todo:true},
  {id:'anong',         n:'Anong',         zh:'',         role:'Captured Rebel',        intro:34, todo:true},
  {id:'yamon',         n:'Yamon',         zh:'',         role:'Captured Rebel',        intro:34, todo:true},
  {id:'commander_west',n:'Commander West',zh:'',         role:'Commander',             intro:34, todo:true},
];
const personKnown = p => G.ch >= p.intro;
