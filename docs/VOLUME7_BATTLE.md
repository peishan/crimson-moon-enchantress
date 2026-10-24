# Volume 7: the final confrontation (author's proposal, working canon)

**Prototype built** (Training Room → "V7 CONFRONTATION (prototype): Xiao Tian leads"; not yet attached to a chapter). The real fight waits for the chapters (the plan ends at chapter 030, Xiao Tian returning to the estate, placing his master's keepsake beside the manual).

**Rule:** everyone contributes, but Xiao Tian remains the protagonist of his revenge. The others make sure he gets to face his enemies himself; they do not defeat them for him.

## The bargain and the silence
The surviving hired fighters were paid to attack the master's estate and search for specific information. The contract limited what they were told and required them to keep the employer's identity and the contract's details secret. Some may know only an intermediary, a meeting place or a method of payment. Their silence is a real constraint. Defeating them proves their guilt without exposing the mastermind; the exact extent of what they know is settled later.

## Roles
- **Xiao Tian:** main fighter; martial training and retained techniques; photographic memory for martial movements lets him adapt to familiar stances and counters; lands the decisive blows on the principal perpetrators. Fights for his master and fallen companions, not to prove he is strong.
- **Xiyu:** precise magical amplification (perception, bursts of speed and power); watches for anger making him overextend.
- **Cangyuan:** protective barriers, disrupting formations, bursts of magic to stop multiple fighters surrounding Xiao Tian; coordinates with Xiyu; knows when to trust Xiao Tian to finish.
- **Xining:** a quiet blessing before the fight (steady breath, resolve, endurance); not invulnerability; asks him to return alive.
- **Dongyue:** healer and observer; heals when openings arise, notices failing breath or balance, calls warnings without directing every move.
- **Hoko:** tactical disruption (escape routes, weak terrain, splitting the group, ropes and distractions); keeps reinforcements from the main fight.
- **Ya'Xing:** flank guard with Skyshard (intercepts weapons, forces retreats); watches for anyone fleeing.
- **Xiao Yan:** battlefield control and containment (blocks passages, unstable ground, tracks surrendered or incapacitated fighters, keeps the fight away from civilians).

## Three stages
1. The hired group holds formation; Ya'Xing guards the flank, Hoko breaks the formation, Xiao Yan stops encirclement.
2. Xiao Tian finds his rhythm; Xiyu and Cangyuan amplify and protect; his instincts return; Dongyue heals a serious wound; Xining's blessing keeps him steady.
3. The formation breaks; Xiao Tian defeats the principal perpetrators himself while the party secures the others and the evidence.

## Aftermath
The survivors confirm they were hired and bound to silence, with limited details about the job and the search, but no reliable identity for the employer. The revenge is successful but not all-knowing.

## Build notes (when the chapters exist)
- A chapter battle where Xiao Tian is the lead and the others are supporters: ally skills in this fight could be limited to support effects (barrier, amplify, heal, bind, flank guard) and Xiao Tian's damage the only way to finish the named perpetrators; a "Xiao Tian lead" flag could prevent the others from landing a finishing blow on them.
- Staged enemy waves (formation, rhythm, principal perpetrators), a blessing buff applied before the fight (Xining), and the Training Ledger kept optional.

## Prototype (built)
- `scripts/confrontation.js` holds the spec (`v7ConfrontationSpec(lv, {rewards, chapter})`); the rules live in `scripts/battle.js` (`spec.lead`, `spec.stages`, `spec.blessing`).
- **Lead rules:** Xiao Tian deals more damage with Xiyu (+10%) and Cangyuan (+5%) alive; every other ally's damage is reduced to 60%, so they support rather than win it. The principal perpetrators cannot be killed by anyone else: a fatal hit leaves them at 1 HP and the attacker holds them in place (bound) for him. If Xiao Tian falls, Dongyue can raise him with the Ancient Healing Rite (always available to her in this fight, revives at 40% HP); if he is down or out of MP, the battle is lost. The principals target him 60% of the time.
- **Blessing:** Xining's pre-fight blessing gives him a 15% barrier and +15% DEF.
- **Stage 1:** hired fighters and a captain in formation (damage halved until Cangyuan strips it or it falters on its own).
- **Stage 2:** rhythm (ATK +20%, crit) and Dongyue mends him (+30% HP). Hoko's presence removes one fighter; Xiao Yan's presence removes another.
- **Stage 3:** two masked principals; resolve (crit for three turns). Only he can finish them.
- Enemy art is missing (icons are used); the hired fighters' stats and names are placeholders.
