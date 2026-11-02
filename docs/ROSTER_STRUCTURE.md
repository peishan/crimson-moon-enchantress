# Cast structure (author direction, modelled on Tribute)

Not one permanent party: a changing ensemble. A character can stay central to the story without travelling in every journey.

## Four categories
1. **Central protagonists:** Xiyu, Cangyuan, Dongyue, Xining. Their stories continue when they are apart (Xining recovering in Yilong does not make her less central).
2. **Travelling companions** (join and leave by the volume's story): Xiao Tian (swordsmanship), Ya'Xing (navigation, travel, combat), Hoko (traps, exploration, languages), Xiao Yan (wayfinding, mechanisms, spatial knowledge), Su Liechen (demon hunting, restraints, sealing), **Qiumin** (scholarship, investigation; joins in Volume 15, chapter not decided), Yun Long (specialised spiritual knowledge and combat; Xining's active-party stand-in for now).
3. **Persistent allies** (connected, not permanent members): **Donglin** (Yilong base caretaker and a trained ally who may occasionally join a mission), Yun He (healer, mentor, celestial overseer), Ming Yue (family, healer, Yilong ally), Hoko during absences. Tribute's example is Adrian.
4. **Regional and influential allies:** kings, village leaders, healers, masters, officials. They give help, information, shelter or supplies, take part in particular arcs, and return when their region or history matters. A former companion keeps their role in this category; their relationship does not end when they stop travelling.

## Three concepts the game keeps apart
- **Story cast:** everyone important to the narrative.
- **Available companions:** who can currently go with the protagonists (today: `G.party`, minus anyone in `G.away`).
- **Active expedition party:** the subset chosen for a journey or mission (today: `G.active`, no hard cap after the canon four travel together; `PARTY_CAP = null`).
A big encounter can field a larger expedition; a personal investigation fewer. These already map onto the code, so no engine change is needed yet.

## By volume (planned)
- **Volume 14 · The Demon Hunter's Trail:** Liechen's history and demon-hunting expertise are central; he joins fully at comic 055 (chapter 507). Built.
- **Volume 15 · family and the missing voyage:** Qiumin joins the travelling group, Donglin becomes an important Yilong ally, Xining remains with Ming Yue. Qiumin's character sheet and portrait are in the game (hidden until her chapter is set in `core.js`: `JOIN_CH` and `INTRO_CH`).
- **Luiterra arcs (inter-world):** Hoko may leave to visit his family and rejoin when travel to Luiterra unlocks; other companions join as the world's mysteries need. Hoko's guest window is currently open-ended (`GUESTS.hoko.to = Infinity`); give a leave and a return chapter when they exist (`CH_AWAY` and `CH_BACK`).

## Donglin and the Yilong base
Donglin is the Yilong base caretaker and a persistent ally; the Muxue base caretaker is still to be established by the author. No chapter shows Donglin yet, so nothing is built beyond this note and the base art list.
