import { z } from 'zod';

export const Rank = z.enum([
  'Owner',
  'Deputy Owner',
  'Administrator',
  'Dogsbody',
  'Minion',
  'Recruit',
  'Pawn',
  'Private',
  'Corporal',
  'Novice',
  'Sergeant',
  'Cadet',
  'Page',
  'Noble',
  'Adept',
  'Legionnaire',
  'Lieutenant',
  'Proselyte',
  'Captain',
  'Major',
  'General',
  'Master',
  'Officer',
  'Commander',
  'Colonel',
  'Brigadier',
  'Admiral',
  'Marshal',
  'Opal',
  'Jade',
  'Red Topaz',
  'Sapphire',
  'Emerald',
  'Ruby',
  'Diamond',
  'Dragonstone',
  'Onyx',
  'Zenyte',
  'Kitten',
  'Bob',
  'Wily',
  'Hellcat',
  'Skulled',
  'Goblin',
  'Beast',
  'Imp',
  'Gnome Child',
  'Gnome Elder',
  'Short Green Guy',
  'Misthalinian',
  'Karamjan',
  'Asgarnian',
  'Kharidian',
  'Morytanian',
  'Wild',
  'Kandarin',
  'Fremennik',
  'Tirannian',
  'Brassican',
  'Saradominist',
  'Guthixian',
  'Zamorakian',
  'Serenist',
  'Bandosian',
  'Zarosian',
  'Armadylean',
  'Xerician',
  'Air',
  'Mind',
  'Water',
  'Earth',
  'Fire',
  'Body',
  'Cosmic',
  'Chaos',
  'Nature',
  'Law',
  'Death',
  'Astral',
  'Blood',
  'Soul',
  'Wrath',
  'Diseased',
  'Pine',
  'Wintumber',
  'Oak',
  'Willow',
  'Maple',
  'Yew',
  'Blisterwood',
  'Magic',
  'Attacker',
  'Enforcer',
  'Defender',
  'Ranger',
  'Priest',
  'Magician',
  'Runecrafter',
  'Medic',
  'Athlete',
  'Herbologist',
  'Thief',
  'Crafter',
  'Fletcher',
  'Miner',
  'Smith',
  'Fisher',
  'Cook',
  'Firemaker',
  'Lumberjack',
  'Slayer',
  'Farmer',
  'Constructor',
  'Hunter',
  'Skiller',
  'Competitor',
  'Holy',
  'Unholy',
  'Natural',
  'Sage',
  'Destroyer',
  'Mediator',
  'Legend',
  'Myth',
  'TzTok',
  'TzKal',
  'Maxed',
  'Anchor',
  'Apothecary',
  'Merchant',
  'Feeder',
  'Harpoon',
  'Carry',
  'Archer',
  'Battlemage',
  'Artillery',
  'Infantry',
  'Smiter',
  'Looter',
  'Saviour',
  'Sniper',
  'Crusader',
  'Spellcaster',
  'Mentor',
  'Prefect',
  'Leader',
  'Supervisor',
  'Superior',
  'Executive',
  'Senator',
  'Monarch',
  'Scavenger',
  'Labourer',
  'Worker',
  'Forager',
  'Hoarder',
  'Prospector',
  'Gatherer',
  'Collector',
  'Bronze',
  'Iron',
  'Steel',
  'Gold',
  'Mithril',
  'Adamant',
  'Rune',
  'Dragon',
  'Protector',
  'Bulwark',
  'Justiciar',
  'Sentry',
  'Guardian',
  'Warden',
  'Vanguard',
  'Templar',
  'Squire',
  'Duellist',
  'Striker',
  'Ninja',
  'Inquisitor',
  'Expert',
  'Knight',
  'Paladin',
  'Goon',
  'Brawler',
  'Bruiser',
  'Scourge',
  'Fighter',
  'Warrior',
  'Barbarian',
  'Berserker',
  'Staff',
  'Crew',
  'Helper',
  'Moderator',
  'Sheriff',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Pink',
  'Grey',
  'Wizard',
  'Trickster',
  'Illusionist',
  'Summoner',
  'Necromancer',
  'Warlock',
  'Witch',
  'Seer',
  'Assassin',
  'Cutpurse',
  'Bandit',
  'Scout',
  'Burglar',
  'Rogue',
  'Smuggler',
  'Brigand',
  'Oracle',
  'Pure',
  'Champion',
  'Epic',
  'Mystic',
  'Hero',
  'Trialist',
  'Defiler',
  'Scholar',
  'Councillor',
  'Recruiter',
  'Learner',
  'Scribe',
  'Assistant',
  'Teacher',
  'Coordinator',
  'Walker',
  'Speed-Runner',
  'Wanderer',
  'Pilgrim',
  'Vagrant',
  'Record-chaser',
  'Racer',
  'Strider',
  'Doctor',
  'Nurse',
  'Druid',
  'Healer',
  'Zealot',
  'Cleric',
  'Shaman',
  'Therapist',
  'Gamer',
  'Adventurer',
  'Explorer',
  'Achiever',
  'Quester',
  'Raider',
  'Completionist',
  'Elite',
  'Firestarter',
  'Specialist',
  'Burnt',
  'Pyromancer',
  'Prodigy',
  'Ignitor',
  'Artisan',
  'Legacy',
]);

export type Rank = z.infer<typeof Rank>;
