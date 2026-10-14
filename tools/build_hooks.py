#!/usr/bin/env python3
"""Rebuild scripts/hooks.js from docs/CHAPTER_HOOKS.md (the author's consolidated hook list), applying the corrections below.
   Corrections exist where the approved scripts (docs/GAME_ADAPTATION_SCRIPT*.md) or the author's confirmations disagree with the hook file.
   Hooks the scripts do not confirm stay flagged provisional (p:true). Run from the repo root:  python3 tools/build_hooks.py"""
import re, json
src=open('docs/CHAPTER_HOOKS.md',encoding='utf-8').read()
secs=re.split(r'\n## Comic Chapter (\d{3}) — ',src)[1:]
H={}
TITLES={}
for i in range(0,len(secs),2):
    n=int(secs[i]); body=secs[i+1]; TITLES[n]=body.split('\n',1)[0].strip()
    st=re.search(r'\*\*Status:\*\*\s*(.*?)\s{2,}\n',body+'\n')
    chap_prov = bool(st and re.search(r'reconstruct|placeholder|unavailable|based on|continuation|to confirm',st.group(1),re.I))
    out=[]
    for m in re.finditer(r'^- `([a-z0-9_]+)` — (.*?)(?: \*\((.*?)\)\*)?\s*$',body,re.M):
        hid,desc,typ=m.group(1),m.group(2).strip(),(m.group(3) or '')
        if hid.endswith('_source_pending'): continue                       # editorial marker, not a gameplay event
        kind='event' if re.search(r'one-time|chapter transition',typ) else 'state'
        out.append({'id':hid,'d':desc.rstrip('.'),'t':kind,'p':bool(re.search(r'provisional',typ,re.I)) and 'author-confirmed' not in typ,'s':'author' if 'author-confirmed' in typ else 'hooks'})
    H[n]=out

# ---- corrections: the approved scripts / author confirmations win ----
# the file reuses one id for a one-time event (035) and a persistent state (039): they must be distinct
RENAME={(39,'xiyu_questions_yan_motives'):'xiyu_doubts_about_yan_persist'}
for (n,old),new in RENAME.items():
    for h in H[n]:
        if h['id']==old: h['id']=new
REMOVE={(26,'teleportation_event_started'),(26,'party_location_changed'),(25,'lower_ice_passages_entered'),(25,'frozen_maze_route_suspected'),   # 025 is "His Magic" (page), not a frozen-passage bridge
        (31,'ritual_almanac_found'),(31,'muxue_yan_observes_dongyue')}   # both are in 030 on the page   # (the ch23 library hook is right: the page shows the library found in 023)   # script 026 is the glass room, Hoko and the platform
def A(i,d,t='event',p=False,s='script'): return {'id':i,'d':d,'t':t,'p':p,'s':s}
ADD={
 7:[A('xiyu_magic_cannot_touch_dongyue','Her fireball, lightning and meteor shower pass harmlessly around Dongyue'),A('dongyue_offers_robe','Dongyue offers his robe and helps fasten it'),A('xiyu_dongyue_first_kiss','Their first kiss',s='art')],
 8:[A('dongyue_confesses_feelings','Dongyue says he has fallen for her and will not abandon her'),A('xiyu_threatens_dongyue_to_keep_secret','Xiyu threatens him with her dagger if he tells anyone'),A('yilong_kiss_means_marriage_told','In Yilong such a kiss means a marriage pledge')],
 15:[A('ya_xing_joins_party','Ya\'Xing joins the quest (author-confirmed)','state')],
 18:[A('ice_temple_appears','The hidden Ice Temple gradually reveals itself around the travellers'),A('ice_temple_entered','The party is inside the temple; Dongyue carries Xiyu to rest','state')],
 20:[A('xiyu_feels_dongyue_emotions','Xiyu can feel his emotions: the spell may have bonded their souls','state',s='script')],
 21:[A('dongyue_shamanic_ability_revealed','Dongyue can use shamanic magic; his family feared it')],
 23:[A('magical_berries_found','Five colours of magical berries: red strength, blue intelligence, green dexterity, orange health, black unknown',s='art'),
     A('ice_temple_central_door_locked','The central room\'s door will not budge; she feels someone she awaits is inside','state',s='art'),
     A('muxue_yunxi_infant_in_ice_learned','The books record Yan and Ao Yun\'s infant daughter Yunxi, believed frozen in ice',s='art'),
     A('muxue_yan_search_started','Find Muxue Yan to exit the temple','state',s='art')],
 24:[A('ice_maze_door_opened','Dongyue solves the stone arrangement and opens the maze',s='art'),A('horned_beasts_fought','Ice monsters, then two minotaur-like beasts; Xiyu\'s meteor swarm',s='art'),
     A('floor_opens_party_falls','A beast pulls a switch; Xiyu and Dongyue fall to the underground level',s='art'),A('companions_separated','Xiao Tian and Ya\'Xing are separated from them; their fate is unknown','state',s='art')],
 25:[A('minami_voice_heard','Minami speaks in Xiyu\'s mind: she must grow stronger and cannot die',s='art'),A('dongyue_draws_poison','Dongyue cuts the wound and draws the slow-acting poison out',s='art'),
     A('dongyue_venom_immunity','A childhood encounter gave him immunity to the venom','state',s='art'),A('green_scrolls_empower_dongyue','The green scrolls vanish once read; his magic is stronger','state',s='art'),
     A('xiyu_dongyue_agree_to_be_one','"Yes, us. From now on, we will be one."','state',s='art'),A('soul_bond_ten_days_remaining','Ten days left','state',s='art')],
 27:[A('muxue_yan_appears_to_party','A dark figure appears from the mist: Ancestor Yan',s='art'),A('yan_says_xiyu_not_his_descendant','"No. You are not." Yet he names her the rightful owner of Muxue',s='art'),A('xiyu_child_vision_seen','A vision of a man, a baby and a woman: "Is that child... me?"',s='art')],
 29:[A('yan_ambitions_revealed','Yan\'s chambers: Ao Yun\'s casket, his plan, Yunxi frozen by a spell, "With her, my ambitions can finally be fulfilled"',s='art'),A('yan_lured_hoko','Yan lured Hoko\'s crew; the platform needed a Muxue\'s blood and someone worthy',s='art')],
 30:[A('xiyu_dreams_of_baby_in_crib','Xiyu dreams of being the baby, with Ao Yun and a younger Yan',s='art'),A('dongyue_meets_yan','Dongyue bows to Yan and asks how to save Xiyu',s='art'),A('bonds_of_life_explained','The Bonds of Life are made from the tendon of one of Yan\'s sons',s='art'),
     A('ritual_chamber_found','Ao Yun\'s ritual chamber, northeast, behind a red jewelled door',s='art'),A('ritual_book_dark_fear_found','The fifth book, Dark Fear, holds the ritual',s='art'),A('yan_watches_through_mystic_mirror','Yan watches Dongyue through Ao Yun\'s mystic mirror',s='art')],
 34:[A('companions_found_recuperating','Xiao Tian and Ya\'Xing are found, recuperating in the rooms',s='art'),A('yan_announces_marriage_in_three_days','The marriage of his successor Xiyu and Dongyue in three days',s='art'),
     A('xiyu_sees_yan_memory_of_infant','Yan\'s memory: she realises he is her father and she may be Muxue Yunxi, the infant frozen in time',s='art')],
 36:[A('xiao_tian_true_name_feng_xia','He is Feng Xia, not the childish Xiao Tian',s='art')],
 38:[A('anong_yamon_pureblooded_demons_revealed','Anong and Yamon are purebloods whose appetite for torture and experimentation is worse than imagined',s='art'),A('dongyue_hurt_by_withheld_truth','Dongyue is hurt that Xiyu kept the matter from him, but he is not leaving',s='art'),A('yan_decides_to_return_to_muxue','Yan calls an emergency assembly: return to Muxue at once; he will seal the temple',s='art')],
 26:[A('white_robed_group_flees_from_xiyu','White-robed priests with polar bears and white wolves flee when they recognise Xiyu'),
     A('glass_enclosure_broken','Xiyu breaks the glass enclosure with magic'),
     A('hoko_rescued','Hoko, an explorer of Luiterra trapped for about a month, is freed'),
     A('teleport_platform_unlocked','Hoko unlocks a teleportation platform with a white key')],
 27:[A('teleport_arrival_chamber_reached','Xiyu, Dongyue and Hoko arrive in a brighter chamber'),A('dongyue_heals_xiyu_hand','Dongyue heals Xiyu\'s injured hand'),
     A('coloured_blossoms_seen','Blossoms of many colours ring the casket, each with a different magical property'),A('yuner_name_heard','Xiyu hears a melody and the name "Yun\'er"','state')],
}
DESC={'xiao_tian_recovery_incomplete':'Xiao Tian\'s memories only partly return and much stays a blur (ch036 page: he is Feng Xia)',
      'ya_xing_recovery_incomplete':'Ya\'Xing: constant itching and allergic reactions, barely able to walk, cannot speak clearly, bursts into insane laughter; his mind is damaged (ch036/039 pages)'}
for n,lst in H.items():
    for h in lst:
        if h['id'] in DESC: h['d']=DESC[h['id']]; h['s']='author'
for n,lst in ADD.items(): H[n]=H.get(n,[])+lst
for n,hid in REMOVE: H[n]=[h for h in H[n] if h['id']!=hid]
# 023: re-flag the library hook removal; 031/032/035/036 have no approved script: everything there stays provisional
for n,lst in H.items():                                   # every chapter now has its page; a hook is provisional only if the page does not show it
    for h in lst:
        if h['s'] in ('art','author','script'): h['p']=False
PROV={'dongyue_reveals_frozen_order':'On the 036 page Xiyu threatens Dongyue with the Frozen Order; he does not explain it. Lore wording unverified'}
for n,lst in H.items():
    for h in lst:
        if h['id'] in PROV: h['p']=True; h['d']=PROV[h['id']]
assert not [i for i in {h['id'] for v in H.values() for h in v} if len([1 for v in H.values() for h in v if h['id']==i])>1], 'duplicate hook id'
js=("/* Chapter hooks per comic chapter. GENERATED by tools/build_hooks.py from docs/CHAPTER_HOOKS.md plus corrections (the approved scripts win).\n"
    "   t: 'event' = fires once, never replays; 'state' = persistent condition that later chapters can check (hook(id)).\n"
    "   p: provisional (not confirmed by an approved script). s: where it comes from: hooks file, script, or art. */\n"
    "const HOOKS = "+json.dumps({str(k):v for k,v in sorted(H.items())},ensure_ascii=False,indent=0)+";\n"
    "const HOOK_TITLES = "+json.dumps({str(k):v for k,v in sorted(TITLES.items())},ensure_ascii=False)+";\n")
open('scripts/hooks.js','w',encoding='utf-8').write(js)
print(sum(len(v) for v in H.values()),'hooks;',sum(1 for v in H.values() for h in v if h['p']),'provisional;',sum(1 for v in H.values() for h in v if h['s']!='hooks'),'added by corrections')
