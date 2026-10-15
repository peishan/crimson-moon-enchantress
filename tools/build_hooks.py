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
REMOVE={(38,'anong_yamon_pureblooded_demons_revealed'),(38,'dongyue_hurt_by_withheld_truth'),(38,'yan_decides_to_return_to_muxue'),(26,'teleportation_event_started'),(26,'party_location_changed'),(25,'lower_ice_passages_entered'),(25,'frozen_maze_route_suspected'),   # 025 is "His Magic" (page), not a frozen-passage bridge
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
 39:[A('dongyue_keeps_choosing_her','Dongyue agrees to give her time and keeps choosing her every day','state',s='author')],
 22:[A('scroll_final_union_is_separate','The scroll: after the final stage the pair are united as mates for life; the ritual can preserve her life but the final union is a separate matter (author-edited page)','state',s='author')],
 31:[A('dongyue_chooses_her_not_the_bond','Dongyue: "I\'m here because I choose you. Not because of a bond." (author-edited page)','state',s='author')],
 26:[A('white_robed_group_flees_from_xiyu','White-robed priests with polar bears and white wolves flee when they recognise Xiyu'),
     A('glass_enclosure_broken','Xiyu breaks the glass enclosure with magic'),
     A('hoko_rescued','Hoko, an explorer of Luiterra trapped for about a month, is freed'),
     A('teleport_platform_unlocked','Hoko unlocks a teleportation platform with a white key')],
 27:[A('teleport_arrival_chamber_reached','Xiyu, Dongyue and Hoko arrive in a brighter chamber'),A('dongyue_heals_xiyu_hand','Dongyue heals Xiyu\'s injured hand'),
     A('coloured_blossoms_seen','Blossoms of many colours ring the casket, each with a different magical property'),A('yuner_name_heard','Xiyu hears a melody and the name "Yun\'er"','state')],
}
DESC={'xiao_tian_revenge_motivation_revealed':'Xiao Tian\'s goals: find the woman in his dreams, and avenge his master and martial brothers, who were killed (author-confirmed)',
      'xiao_tian_recovery_incomplete':'Xiao Tian\'s memories only partly return and much stays a blur (ch036 page: he is Feng Xia)',
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

# ---- Volume 2 (internal chapters 40+ = V2 comic 001+), from the comic pages ----
V2H={
 60:[('formation_reacts_to_cangyuan','The sealed door and its formation react whenever Cangyuan approaches','state'),('hidden_restriction_inscription_found','Xining finds a later-added inscription: a restriction placed on whoever enters','event'),('xiyu_asks_if_ruyue_mattered','Xiyu asks if the woman was important to him: "Yes... it\'s remembering what I believed about her"','event'),('cangyuan_wont_pretend_to_know','"This time, I won\'t pretend I know what awaits us."','state'),('voice_says_he_took_too_long','"You always did take too long to understand."','event')],
 61:[('secondary_passage_found','An inscription describes a secondary passage that predates the alteration','state'),('closeness_worth_choosing','Cangyuan: closeness gives people something to lose, and something worth choosing','event'),('xiyu_kisses_cangyuan','Xiyu chooses to kiss Cangyuan; she tells him not to mistake it for a promise','event'),('xiyu_cangyuan_relationship_changed','Something between Xiyu and Cangyuan has changed, and neither wishes to undo it','state')],
 55:[('fragment_residue_still_active','The fragment is secured but its residue stays active','state'),('xiyu_questions_her_heart','Xiyu admits she was disappointed when he let go: "Why is my heart so difficult to control?"','state'),('cangyuan_does_not_ask','Cangyuan finds Xiyu in the garden and does not ask what is wrong','event'),('ward_network_lines_converge','Lines on the fragment converge on places where the island\'s wards have failed','event'),('broken_ward_network_unlocked','Investigation unlocked: The Broken Ward Network','state')],
 56:[('spirit_weaving_signature_recognised','Cangyuan recognises the technique: Spirit Weaving leaves a signature','event'),('cangyuan_remembers_teacher','A memory of a woman patiently teaching him to guide spiritual threads','state'),('fragment_linked_to_network','Xining: the fragment is linked to multiple locations; it is part of a network','state'),('eastern_shrine_old_name_found','An abandoned shrine in the eastern reaches carries an old, almost erased name','event')],
 57:[('abandoned_shrine_reached','The group reaches the abandoned shrine; its gate bears the hooked symbol','event'),('shrine_inscription_is_a_record','The inscription is a record, not a ward','event'),('shen_ruyue_name_found','A name is carved beneath the first pattern: Shen Ruyue','event'),('record_deliberately_altered','Part of the record was deliberately altered by someone who knows the original technique','state'),('voice_greets_cangyuan','"Cangyuan. You took your time coming home."','event'),('seal_opens_slightly','The seal opens only slightly','event')],
 58:[('seal_recognises_cangyuan','The second seal responds to Cangyuan\'s spiritual signature','event'),('seal_crimson_markings_added','Crimson markings were added to the formation after the original seal','state'),('techniques_react_on_touch','Xiyu\'s and Cangyuan\'s techniques react when their hands touch','event'),('corridor_entered','The party enters the corridor beyond the second door','event'),('scratched_portrait_seen','A row of faded portraits, one deliberately scratched away','event'),('unknown_woman_speaks','"Ask the man beside you what he left here."','event')],
 59:[('portrait_gallery_examined','The portrait gallery is examined','event'),('departure_record_fragment_found','A torn departure record is found behind the empty frame','event'),('cangyuan_past_clue_found','A clue to Cangyuan\'s past: his hand hovers over the frame as in his memory','event'),('second_door_stays_closed','The second door stays closed (second_door_open = false)','state'),('ruyue_identity_unconfirmed','Shen Ruyue\'s identity and her relationship with Cangyuan remain unconfirmed','state'),('xiyu_respects_cangyuan_privacy','Xiyu is curious without being cruel; she does not demand his secrets','state')],
 49:[('formation_three_rings_revealed','The formation has three functions: concealment, regulation and containment','state'),('formation_hides_the_inner_ring','The outer structure may be hiding the inner one from someone','state'),('hidden_eye_symbol_reached','The black filament reaches the hidden eye symbol beneath the sanctuary','event'),('veil_is_thinning','"The veil is thinning. At last, I can sense her."','state')],
 50:[('first_breach_beneath_sanctuary','The hidden eye closes beneath the sanctuary; lanterns turn black','event'),('island_wards_failing','Protective wards are failing outward from the sanctuary','state'),('eastern_shrine_inscription_erased_from_inside','The shrine inscription was erased from the inside; its mark matches the sanctuary symbol','event'),('first_door_found','"Blood of the returned... You have found the first door."','state')],
 51:[('xiyu_stopped_from_touching_mark','Cangyuan stops Xiyu from touching the shrine mark: it may recognise her','event'),('xiyu_notices_cangyuan','Xiyu finds herself thinking about Cangyuan\'s hand','state')],
 52:[('xining_treats_dongyue','Xining treats Dongyue\'s spiritual exhaustion','event'),('dongyue_feels_ease_with_xining','Dongyue feels an unfamiliar ease with Xining','state'),('xiyu_cangyuan_sleeves_brush','Xiyu does not move away when her sleeve brushes Cangyuan\'s','event')],
 40:[('wedding_ceremonial_no_papers_filed','Back in Muxue no papers were filed: the wedding stays a ceremony Yan arranged for his daughter\'s happiness, not a binding union (author-confirmed)','state'),('volume_2_started','Volume 2 begins: the return to Muxue','event'),('xiyu_asks_for_separate_residence','Xiyu asks for a separate residence and time apart','state'),('yan_dark_energy_beneath_skin','Dark energy creeps beneath Yan\'s skin; his eyes briefly change','state'),('xiyu_spell_twists_once','Her spell twists into a shape she did not intend, once','event')],
 41:[('cangyuan_met','Xiyu meets Shen Cangyuan in the market','event'),('talisman_wisps_released','A merchant\'s talisman splits and releases spirit wisps','event'),('cangyuan_offer_terms_agreed','His terms: no secrets about the technique, no experiments without consent, tell her of dangers','state')],
 42:[('spirit_weaving_test_held','The courtyard test','event'),('black_vein_beneath_island_seen','A black vein runs through the stone beneath the island','event'),('dongyue_hurt_xiyu_withheld_strangeness','Dongyue is hurt she did not tell him','state'),('ancient_formation_cracks','The ancient formation far below cracks','event')],
 43:[('xiyu_visits_yan_sanctuary','Xiyu visits her father in the sanctuary','event'),('blood_answers_blood','Her touch makes the formation vibrate','event'),('sealed_chamber_memory_seen','She sees a sealed chamber wrapped in chains and crimson light','event'),('yan_forbids_her_to_seek_it','"Whatever you saw, do not seek it again"','state')],
 44:[('yan_reinforces_seal_alone','Yan tries to reinforce the seal alone','event'),('voice_answers_through_yan','A voice answers through Yan: "You never asked what was standing on the other side"','event'),('broken_jade_seal_found','Xiyu notices a broken jade seal','event'),('door_she_was_born_to_open','"A door she was born to open"','state')],
 45:[('jade_fragment_shown_to_cangyuan','Xiyu shows Cangyuan the fragment','event'),('older_binding_system_identified','An older system of spiritual binding','state'),('cangyuan_has_seen_pattern_before','He has seen the pattern once, not here','state'),('cangyuan_offers_to_investigate_records','He offers to investigate the old records; she asks to be told about her family','event')],
 46:[('spirit_weaving_taught','Cangyuan teaches Xiyu Spirit Weaving','event'),('black_filament_separated_and_sealed','A black filament is separated from her spell and sealed in a jade vessel','event'),('cangyuan_joins_party','Shen Cangyuan joins the party (author-confirmed: V2 comic 007)','state'),('filament_is_learning','"It isn\'t merely waking. It\'s learning."','state')],
 47:[('vessel_reacts_to_xiyu','The sealed vessel reacts to Xiyu','state'),('sanctuary_comparison_planned','They plan to compare the filament with the original formation','event'),('cangyuan_past_people_died','He met a similar formation where people died','state'),('yan_says_she_has_begun_to_answer','"She has already begun to answer."','event')],
 53:[('xining_joins_party','Lu Xining joins the party (author-confirmed: V2 comic 014)','state'),('red_lantern_bounty_available','The first bounty becomes available','state')],
 54:[('red_lantern_notice_read','A ward has failed; travellers vanish after sunset','event'),('survivor_interviewed','The survivor: "It took something away"; his meridians are not damaged in the usual way','event'),('ward_corruption_found_inside_formation','The corruption was already inside the ward','event'),('red_lantern_shadow_defeated','The shadow is defeated and its anchor severed','event'),('corrupted_fragment_obtained','A small black-red fragment is left in the road','state'),('first_bounty_reward_claimed','The guard pays the reward','event'),('island_wards_being_tested','"Someone, or something, is testing the island\'s wards"','state'),('unknown_voice_trail_followed','"They have begun to follow the trail."','event')],
 48:[('sanctuary_enters_original_formation','They enter the original formation','event'),('xiyu_birth_memories_seen','Memories of her birth: the blood moon, the elders\' foresight, her parents leaving her','event'),('xiyu_is_the_key','"You are the key. Your blood can open it. Or keep it shut."','state'),('sealed_thing_was_a_truth','"What they sealed wasn\'t just a monster. It was a truth."','state'),('filament_speaks_open','The filament speaks: "You remember... Open..."','event')],
}
for n,lst in V2H.items():
    H[n]=[{'id':i,'d':d,'t':t,'p':False,'s':'art'} for i,d,t in lst]

assert not [i for i in {h['id'] for v in H.values() for h in v} if len([1 for v in H.values() for h in v if h['id']==i])>1], 'duplicate hook id'
js=("/* Chapter hooks per comic chapter. GENERATED by tools/build_hooks.py from docs/CHAPTER_HOOKS.md plus corrections (the approved scripts win).\n"
    "   t: 'event' = fires once, never replays; 'state' = persistent condition that later chapters can check (hook(id)).\n"
    "   p: provisional (not confirmed by an approved script). s: where it comes from: hooks file, script, or art. */\n"
    "const HOOKS = "+json.dumps({str(k):v for k,v in sorted(H.items())},ensure_ascii=False,indent=0)+";\n"
    "const HOOK_TITLES = "+json.dumps({str(k):v for k,v in sorted(TITLES.items())},ensure_ascii=False)+";\n")
open('scripts/hooks.js','w',encoding='utf-8').write(js)
print(sum(len(v) for v in H.values()),'hooks;',sum(1 for v in H.values() for h in v if h['p']),'provisional;',sum(1 for v in H.values() for h in v if h['s']!='hooks'),'added by corrections')
