// ==UserScript==
// @name         Offers
// @version      1.0.0
// @match        https://agar.io/*
// ==/UserScript==

(function () {
  "use strict";

  const PACK_PREFIX = "com.miniclip.agar.io.";
  const DEFAULT_CONFIG_URL = "https://configs-web.agario.miniclippt.com/live/v15";
  const DEFAULT_REVISION = "10907";

  const PROMO = [
    {id:"coins_16000promo",usd:4.99,coins:16000,dna:0,skins:[]},
    {id:"dailydeal1",usd:9.99,coins:7000,dna:0,skins:[{img:"Evil.png",color:"#7c0001",name:"Evil"}]},
    {id:"dailydeal2",usd:19.99,coins:32000,dna:0,skins:[{img:"Evil.png",color:"#7c0001",name:"Evil"}]},
    {id:"dailydeal3",usd:19.99,coins:32000,dna:0,skins:[{img:"Candy.png",color:"#AC0875",name:"Candy"}]},
    {id:"dailydeal4",usd:9.99,coins:14000,dna:0,skins:[{img:"Starball.png",color:"#7c0001",name:"Starball"}]},
    {id:"dailydeal5",usd:9.99,coins:7000,dna:0,skins:[{img:"Luchador.png",color:"#7c0001",name:"Luchador"}]},
    {id:"dailydeal6",usd:19.99,coins:32000,dna:0,skins:[{img:"Luchador.png",color:"#7c0001",name:"Luchador"}]},
    {id:"dailydeal7",usd:19.99,coins:32000,dna:0,skins:[{img:"Blueberry_Face.png",color:"#002C6C",name:"Blueberry"}]},
    {id:"dailydeal8",usd:9.99,coins:14000,dna:0,skins:[{img:"Neptune.png",color:"#002C6C",name:"Neptune"}]},
    {id:"dailydeal9",usd:9.99,coins:7000,dna:0,skins:[{img:"Nuclear.png",color:"#654217",name:"Nuclear"}]},
    {id:"dailydeal10",usd:19.99,coins:32000,dna:0,skins:[{img:"Nuclear.png",color:"#654217",name:"Nuclear"}]},
    {id:"dailydeal11",usd:9.99,coins:14000,dna:0,skins:[{img:"Wolf.png",color:"#4E114E",name:"Wolf"}]},
    {id:"dailydeal12",usd:4.99,coins:6500,dna:0,skins:[{img:"Cookie.png",color:"#654217",name:"Cookie"}]},
    {id:"dailydeal13",usd:4.99,coins:3250,dna:0,skins:[{img:"Grey.png",color:"#86ee32",name:"Grey"}]},
    {id:"dailydeal14",usd:9.99,coins:14000,dna:0,skins:[{img:"Grey.png",color:"#86ee32",name:"Grey"}]},
    {id:"dailydeal15",usd:4.99,coins:6500,dna:0,skins:[{img:"Hot_Dog.png",color:"#838383",name:"Hotdog"}]},
    {id:"dailydeal16",usd:1.99,coins:2500,dna:0,skins:[{img:"Apple.png",color:"#004F0F",name:"Apple"}]},
    {id:"dailydeal17",usd:4.99,coins:3250,dna:0,skins:[{img:"Comet.png",color:"#6c25ff",name:"Meteor"}]},
    {id:"dailydeal18",usd:9.99,coins:14000,dna:0,skins:[{img:"Comet.png",color:"#6c25ff",name:"Meteor"}]},
    {id:"dailydeal19",usd:4.99,coins:6500,dna:0,skins:[{img:"Breakfast.png",color:"#838383",name:"Breakfast"}]},
    {id:"dailydeal20",usd:1.99,coins:2500,dna:0,skins:[{img:"Banana.png",color:"#004F0F",name:"Banana"}]},
    {id:"dailydeal21",usd:9.99,coins:7000,dna:0,skins:[{img:"Jar_Brain.png",color:"#002C6C",name:"Jarbrain"}]},
    {id:"dailydeal22",usd:19.99,coins:32000,dna:0,skins:[{img:"Jar_Brain.png",color:"#002C6C",name:"Jarbrain"}]},
    {id:"dailydeal23",usd:19.99,coins:32000,dna:0,skins:[{img:"Bowling.png",color:"#000000",name:"Bowling"}]},
    {id:"dailydeal24",usd:9.99,coins:14000,dna:0,skins:[{img:"Uranus.png",color:"#002C6C",name:"Uranus"}]},
    {id:"dailydeal25",usd:9.99,coins:7000,dna:0,skins:[{img:"Laika.png",color:"#676e70",name:"Space Dog"}]},
    {id:"dailydeal26",usd:19.99,coins:32000,dna:0,skins:[{img:"Laika.png",color:"#676e70",name:"Space Dog"}]},
    {id:"dailydeal27",usd:19.99,coins:32000,dna:0,skins:[{img:"pig.png",color:"#AC0875",name:"Pig"}]},
    {id:"dailydeal28",usd:9.99,coins:14000,dna:0,skins:[{img:"Good.png",color:"#002C6C",name:"Good"}]},
    {id:"dailydeal29",usd:9.99,coins:7000,dna:0,skins:[{img:"Virus.png",color:"#4E114E",name:"Virus"}]},
    {id:"dailydeal30",usd:19.99,coins:32000,dna:0,skins:[{img:"Virus.png",color:"#4E114E",name:"Virus"}]},
    {id:"dailydeal31",usd:9.99,coins:14000,dna:0,skins:[{img:"Mouse.png",color:"#654217",name:"Mouse"}]},
    {id:"dailydeal32",usd:4.99,coins:6500,dna:0,skins:[{img:"Shuttle.png",color:"#2391d7",name:"Shuttle"}]},
    {id:"dailydeal33",usd:4.99,coins:3250,dna:0,skins:[{img:"Octopus.png",color:"#004F0F",name:"Octopus"}]},
    {id:"dailydeal34",usd:9.99,coins:14000,dna:0,skins:[{img:"Octopus.png",color:"#004F0F",name:"Octopus"}]},
    {id:"dailydeal35",usd:4.99,coins:6500,dna:0,skins:[{img:"Pluto.png",color:"#4E114E",name:"Pluto"}]},
    {id:"dailydeal36",usd:1.99,coins:2500,dna:0,skins:[{img:"UFO.png",color:"#28738c",name:"Ufo"}]},
    {id:"dailydeal37",usd:4.99,coins:3250,dna:0,skins:[{img:"Dog.png",color:"#654217",name:"Dog"}]},
    {id:"dailydeal38",usd:9.99,coins:14000,dna:0,skins:[{img:"Dog.png",color:"#654217",name:"Dog"}]},
    {id:"dailydeal39",usd:4.99,coins:6500,dna:0,skins:[{img:"Galaxy.png",color:"#000000",name:"Galaxy"}]},
    {id:"dailydeal40",usd:1.99,coins:2500,dna:0,skins:[{img:"Mercury.png",color:"#654217",name:"Mercury"}]},
    {id:"dailydeal41",usd:9.99,coins:7000,dna:0,skins:[{img:"zombie.png",color:"#004F0F",name:"Zombie"}]},
    {id:"dailydeal42",usd:19.99,coins:32000,dna:0,skins:[{img:"zombie.png",color:"#004F0F",name:"Zombie"}]},
    {id:"dailydeal43",usd:19.99,coins:32000,dna:0,skins:[{img:"Bomb.png",color:"#000000",name:"Bomb"}]},
    {id:"dailydeal44",usd:9.99,coins:14000,dna:0,skins:[{img:"Blackhole.png",color:"#000000",name:"Blackhole"}]},
    {id:"dailydeal45",usd:9.99,coins:7000,dna:0,skins:[{img:"Toxic.png",color:"#838383",name:"Toxic"}]},
    {id:"dailydeal46",usd:19.99,coins:32000,dna:0,skins:[{img:"Toxic.png",color:"#838383",name:"Toxic"}]},
    {id:"dailydeal47",usd:19.99,coins:32000,dna:0,skins:[{img:"Goldfish.png",color:"#002C6C",name:"Goldfish"}]},
    {id:"dailydeal48",usd:9.99,coins:14000,dna:0,skins:[{img:"Jupiter.png",color:"#654217",name:"Jupiter"}]},
    {id:"dailydeal49",usd:9.99,coins:7000,dna:0,skins:[{img:"Eye.png",color:"#838383",name:"Eye"}]},
    {id:"dailydeal50",usd:19.99,coins:32000,dna:0,skins:[{img:"Eye.png",color:"#838383",name:"Eye"}]},
    {id:"dailydeal51",usd:9.99,coins:14000,dna:0,skins:[{img:"Heart.png",color:"#AC0875",name:"Heart"}]},
    {id:"dailydeal52",usd:4.99,coins:6500,dna:0,skins:[{img:"Tiger_Pattern.png",color:"#654217",name:"Tigerpattern"}]},
    {id:"dailydeal53",usd:4.99,coins:3250,dna:0,skins:[{img:"toon.png",color:"#000000",name:"Toon"}]},
    {id:"dailydeal54",usd:9.99,coins:14000,dna:0,skins:[{img:"toon.png",color:"#000000",name:"Toon"}]},
    {id:"dailydeal55",usd:4.99,coins:6500,dna:0,skins:[{img:"Saturn.png",color:"#4E114E",name:"Saturn"}]},
    {id:"dailydeal56",usd:1.99,coins:2500,dna:0,skins:[{img:"Birdie.png",color:"#004F0F",name:"Birdie"}]},
    {id:"dailydeal57",usd:4.99,coins:3250,dna:0,skins:[{img:"Astronaut.png",color:"#090760",name:"Astronaut"}]},
    {id:"dailydeal58",usd:9.99,coins:14000,dna:0,skins:[{img:"Astronaut.png",color:"#090760",name:"Astronaut"}]},
    {id:"dailydeal59",usd:4.99,coins:6500,dna:0,skins:[{img:"Target.png",color:"#838383",name:"Target"}]},
    {id:"dailydeal60",usd:1.99,coins:2500,dna:0,skins:[{img:"Venus.png",color:"#654217",name:"Venus"}]},
    {id:"starterpack",usd:3.99,coins:5000,dna:250,skins:[{img:"Direction_Giver.png",color:"#0D476F",name:"Direction Giver"}],extras:["Mass Boost 3x 1h","Xp Boost 3x 1h"]},
    {id:"starterpack2",usd:3.99,coins:5000,dna:250,skins:[{img:"Health_Fixer.png",color:"#002F09",name:"Health Fixer"}],extras:["Mass Boost 3x 1h","Xp Boost 3x 1h"]},
    {id:"starterpack3",usd:3.99,coins:5000,dna:250,skins:[{img:"Thirst_Quencher.png",color:"#C83333",name:"Thirst Quencher"}],extras:["Mass Boost 3x 1h","Xp Boost 3x 1h"]},
    {id:"starterpack4",usd:3.99,coins:5000,dna:250,skins:[{img:"Tummy_Filler.png",color:"#F15353",name:"Tummy Filler"}],extras:["Mass Boost 3x 1h","Xp Boost 3x 1h"]},
    {id:"starterpack5",usd:3.99,coins:7000,dna:0,skins:[{img:"Panda.png",color:"#000000",name:"Panda"}],extras:["Mass Boost 2x 1h"]},
    {id:"starterpack6",usd:3.99,coins:7000,dna:0,skins:[{img:"Tomato_Face.png",color:"#7c0001",name:"Tomatoface"}],extras:["Mass Boost 2x 1h"]},
    {id:"starterpack7",usd:3.99,coins:7000,dna:0,skins:[{img:"Comet.png",color:"#6c25ff",name:"Meteor"}],extras:["Mass Boost 2x 1h"]},
    {id:"boosterpromo1",usd:4.99,coins:7000,dna:0,skins:[],extras:["Mass Boost 3x 24h"]},
    {id:"boosterpromo2",usd:9.99,coins:16000,dna:0,skins:[],extras:["Mass Boost 3x 24h","Xp Boost 3x 24h"]},
    {id:"boosterpromo3",usd:19.99,coins:50000,dna:0,skins:[{img:"monthly_web_husky.png",color:"#ff0000",name:"Husky"}],extras:["Mass Boost 3x 24h","Xp Boost 3x 24h"]},
    {id:"potionpromo1",usd:4.99,coins:1250,dna:0,skins:[],extras:["Potion Superior"]},
    {id:"potionpromo2",usd:9.99,coins:3250,dna:0,skins:[],extras:["Potion Epic"]},
    {id:"potionpromo3",usd:19.99,coins:7000,dna:0,skins:[],extras:["Potion Legendary"]},
    {id:"potionpromo4",usd:1.99,coins:3250,dna:0,skins:[],extras:["Potion Epic"]},
    {id:"potionpromo5",usd:4.99,coins:7000,dna:800,skins:[],extras:["Potion Legendary"]},
    {id:"potionpromo6",usd:9.99,coins:16000,dna:1800,skins:[],extras:["Potion Mythical"]},
    {id:"promo1coins_1250",usd:1.99,coins:1250,dna:0,skins:[]},
    {id:"promo1coins_125000",usd:99.99,coins:125000,dna:0,skins:[]},
    {id:"promo1coins_16000",usd:19.99,coins:16000,dna:0,skins:[]},
    {id:"promo1coins_3250",usd:4.99,coins:3250,dna:0,skins:[]},
    {id:"promo1coins_50000",usd:49.99,coins:50000,dna:0,skins:[]},
    {id:"promo1coins_7000",usd:9.99,coins:7000,dna:0,skins:[]},
    {id:"promo2coins_1250",usd:1.99,coins:1250,dna:0,skins:[]},
    {id:"promo2coins_125000",usd:69.99,coins:125000,dna:0,skins:[]},
    {id:"promo2coins_16000",usd:19.99,coins:16000,dna:0,skins:[]},
    {id:"promo2coins_3250",usd:4.99,coins:3250,dna:0,skins:[]},
    {id:"promo2coins_50000",usd:49.99,coins:50000,dna:0,skins:[]},
    {id:"promo2coins_7000",usd:9.99,coins:7000,dna:0,skins:[]},
    {id:"promo3coins_16000",usd:9.99,coins:16000,dna:0,skins:[]},
    {id:"promo3coins_50000",usd:19.99,coins:50000,dna:0,skins:[]},
    {id:"promotionpack1",usd:1.99,coins:3250,dna:0,skins:[{img:"egypt_scarab.png",color:"#182B27",name:"Egypt Scarab"}]},
    {id:"promotionpack2",usd:4.99,coins:16000,dna:0,skins:[{img:"egypt_mummy_king.png",color:"#E9B42B",name:"Egypt Mummy King"}]},
    {id:"promotionpack3",usd:9.99,coins:30000,dna:0,skins:[{img:"egypt_scarab.png",color:"#182B27",name:"Egypt Scarab"},{img:"egypt_anubis.png",color:"#EDBA2E",name:"Egypt Anubis"}]},
    {id:"promotionpack4",usd:4.99,coins:3250,dna:0,skins:[{img:"olympus_hades.png",color:"#04d984",name:"Olympus Hades"}]},
    {id:"promotionpack5",usd:9.99,coins:16000,dna:0,skins:[{img:"olympus_ares.png",color:"#310000",name:"Olympus Ares"}]},
    {id:"promotionpack6",usd:19.99,coins:50000,dna:0,skins:[{img:"olympus_hades.png",color:"#04d984",name:"Olympus Hades"},{img:"olympus_zeus.png",color:"#00deff",name:"Olympus Zeus"}]},
    {id:"promotionpack7",usd:1.99,coins:3250,dna:0,skins:[{img:"zombie_party_the_maw.png",color:"#c73076",name:"The Maw"}]},
    {id:"promotionpack8",usd:4.99,coins:16000,dna:0,skins:[{img:"zombie_party_walking_hand.png",color:"#5f3ff6",name:"Walking Hand"}]},
    {id:"promotionpack9",usd:9.99,coins:30000,dna:0,skins:[{img:"zombie_party_walking_hand.png",color:"#5f3ff6",name:"Walking Hand"},{img:"zombie_party_zombie_party.png",color:"#942187",name:"Zombie Party"}]},
    {id:"promotionpack10",usd:4.99,coins:3250,dna:0,skins:[{img:"rpg_games_scroll.png",color:"#9945ff",name:"Scroll"}]},
    {id:"promotionpack11",usd:9.99,coins:16000,dna:0,skins:[{img:"rpg_games_raid_boss.png",color:"#379aff",name:"Raid Boss"}]},
    {id:"promotionpack12",usd:19.99,coins:50000,dna:0,skins:[{img:"rpg_games_scroll.png",color:"#9945ff",name:"Scroll"},{img:"rpg_games_healing_potion.png",color:"#fd3ee7",name:"Healing Potion"}]},
    {id:"promotionpack13",usd:4.99,coins:3250,dna:0,skins:[{img:"excalibur_2017_king_lion.png",color:"#bf5b00",name:"King Lion"}]},
    {id:"promotionpack14",usd:9.99,coins:16000,dna:0,skins:[{img:"excalibur_2017_excalibur.png",color:"#000b4e",name:"Excalibur"}]},
    {id:"promotionpack15",usd:19.99,coins:50000,dna:0,skins:[{img:"excalibur_2017_king_lion.png",color:"#bf5b00",name:"King Lion"},{img:"excalibur_2017_magic_hat.png",color:"#0087e6",name:"Magic Hat"}]},
    {id:"promotionpack16",usd:4.99,coins:7000,dna:0,skins:[{img:"dawn_space_warden.png",color:"#00afaa",name:"Space Warden"}]},
    {id:"promotionpack17",usd:9.99,coins:16000,dna:0,skins:[{img:"dawn_evil_master.png",color:"#6f2432",name:"Evil Master"}]},
    {id:"promotionpack18",usd:19.99,coins:50000,dna:0,skins:[{img:"dawn_space_warden.png",color:"#00afaa",name:"Space Warden"},{img:"dawn_evil_master.png",color:"#6f2432",name:"Evil Master"}]},
    {id:"promotionpack19",usd:1.99,coins:3250,dna:0,skins:[{img:"Dead_Raider.png",color:"#0d142a",name:"Raider"}]},
    {id:"promotionpack20",usd:4.99,coins:16000,dna:0,skins:[{img:"Dead_Nuke.png",color:"#4a0808",name:"Nuke"}]},
    {id:"promotionpack21",usd:9.99,coins:30000,dna:0,skins:[{img:"Dead_Nuke.png",color:"#4a0808",name:"Nuke"},{img:"Dead_Raider.png",color:"#0d142a",name:"Raider"}]},
    {id:"promotionpack22",usd:1.99,coins:3250,dna:0,skins:[{img:"gladiators_cursed_blade.png",color:"#258de1",name:"Cursed Blade"}]},
    {id:"promotionpack23",usd:4.99,coins:16000,dna:0,skins:[{img:"gladiators_orc_grunt.png",color:"#096705",name:"Orc Grunt"}]},
    {id:"promotionpack24",usd:9.99,coins:30000,dna:0,skins:[{img:"gladiators_cursed_blade.png",color:"#258de1",name:"Cursed Blade"},{img:"gladiators_orc_warrior.png",color:"#da0303",name:"Orc Warrior"}]},
    {id:"promotionpack25",usd:4.99,coins:7000,dna:0,skins:[{img:"Champion.png",color:"#102831",name:"Champion"}]},
    {id:"promotionpack26",usd:9.99,coins:16000,dna:0,skins:[{img:"Jotun.png",color:"#70ecff",name:"Jotun"}]},
    {id:"promotionpack27",usd:19.99,coins:50000,dna:0,skins:[{img:"Champion.png",color:"#102831",name:"Champion"},{img:"Jotun.png",color:"#70ecff",name:"Jotun"}]},
    {id:"promotionpack28",usd:4.99,coins:3250,dna:0,skins:[{img:"moonlight_wendigo.png",color:"#161d66",name:"Moonlight Wendigo"}]},
    {id:"promotionpack29",usd:9.99,coins:16000,dna:0,skins:[{img:"moonlight_red_fiend.png",color:"#921b00",name:"Moonlight Red Fiend"}]},
    {id:"promotionpack30",usd:19.99,coins:50000,dna:0,skins:[{img:"moonlight_wendigo.png",color:"#161d66",name:"Moonlight Wendigo"},{img:"moonlight_night_hunter.png",color:"#62008b",name:"Moonlight Night Hunter"}]},
    {id:"promotionpack31",usd:4.99,coins:3250,dna:0,skins:[{img:"apocalypse_skin_scythe.png",color:"#003ddf",name:"Scythe"}]},
    {id:"promotionpack32",usd:9.99,coins:16000,dna:0,skins:[{img:"apocalypse_skin_soul_hunter.png",color:"#7b0017",name:"Soul Hunter"}]},
    {id:"promotionpack33",usd:19.99,coins:0,dna:1800,skins:[{img:"apocalypse_skin_scythe.png",color:"#003ddf",name:"Scythe"},{img:"apocalypse_skin_warhorse.png",color:"#9f0000",name:"Warhorse"}]},
    {id:"promotionpack34",usd:4.99,coins:3250,dna:0,skins:[{img:"mechanos_supremus.png",color:"#00dfff",name:"Supremus"}]},
    {id:"promotionpack35",usd:9.99,coins:16000,dna:0,skins:[{img:"mechanos_yellow_streak.png",color:"#e46b00",name:"Yellow Streak"}]},
    {id:"promotionpack36",usd:19.99,coins:0,dna:1800,skins:[{img:"mechanos_supremus.png",color:"#00dfff",name:"Supremus"},{img:"mechanos_mechatron.png",color:"#441297",name:"Mechatron"}]},
    {id:"zodiacpromo",usd:4.99,coins:5000,dna:0,skins:[{img:"zodiac_2017_skin_leo.png",color:"#3f1905",name:"Leo"}]},
    {id:"zodiacpromoweb",usd:4.99,coins:0,dna:800,skins:[{img:"starsigns_cancer.png",color:"#e900e9",name:"Starsign Cancer"}]},
    {id:"collector1",usd:4.99,coins:16000,dna:0,skins:[{img:"tms_skullartifact.png",color:"#9C001C",name:"Skull Artifact"}]},
    {id:"collector2",usd:14.99,coins:25000,dna:1800,skins:[{img:"tms_troldir.png",color:"#369700",name:"Troldir"}],extras:["Xp Boost 3x 1h","Mass Boost 2x 1h"]},
    {id:"collector3",usd:4.99,coins:0,dna:0,skins:[{img:"Predator_BaldEagle.png",color:"#FF5B5B",name:"Bald Eagle"}],extras:["Mass Boost 3x 1h","Xp Boost 3x 1h"]},
    {id:"collector4",usd:4.99,coins:5000,dna:0,skins:[{img:"Predator_Lion.png",color:"#FEA604",name:"African Lion"}]},
    {id:"promotionpack37",usd:5.99,coins:7500,dna:0,skins:[{img:"chikadahr.png",color:"#0e2800",name:"Chikadahr"}]},
    {id:"promotionpack38",usd:9.99,coins:10000,dna:450,skins:[{img:"squiggle.png",color:"#12003b",name:"Squiggle"}]},
    {id:"promotionpack39",usd:14.99,coins:15000,dna:1000,skins:[{img:"chikadahr.png",color:"#0e2800",name:"Chikadahr"},{img:"bubbabutt.png",color:"#550000",name:"Bubbabutt"}],extras:["Mass Boost 2x 24h","Xp Boost 2x 24h"]},
    {id:"promotionpack40",usd:1.99,coins:3250,dna:0,skins:[{img:"Journey_BullKing.png",color:"#620202",name:"Bull King"}]},
    {id:"promotionpack41",usd:4.99,coins:16000,dna:0,skins:[{img:"Journey_JadeDragon.png",color:"#072408",name:"Jade Dragon"}]},
    {id:"promotionpack42",usd:9.99,coins:30000,dna:0,skins:[{img:"Journey_BullKing.png",color:"#620202",name:"Bull King"},{img:"Journey_JadeDragon.png",color:"#072408",name:"Jade Dragon"}]},
    {id:"promotionpack43",usd:1.99,coins:3250,dna:0,skins:[{img:"dragon_razor.png",color:"#ff0200",name:"Dragon Razor"}]},
    {id:"promotionpack44",usd:4.99,coins:16000,dna:0,skins:[{img:"dragon_haze.png",color:"#00f36d",name:"Dragon Haze"}]},
    {id:"promotionpack45",usd:9.99,coins:30000,dna:0,skins:[{img:"dragon_razor.png",color:"#ff0200",name:"Dragon Razor"},{img:"dragon_viper.png",color:"#0057e8",name:"Dragon Viper"}]},
    {id:"promotionpack46",usd:2.99,coins:3700,dna:0,skins:[],extras:["Mass Boost 3x 24h"]},
    {id:"promotionpack47",usd:4.99,coins:6200,dna:0,skins:[{img:"titanomachy.png",color:"#770020",name:"Titanomachy"}]},
    {id:"promotionpack48",usd:12.99,coins:12000,dna:1300,skins:[{img:"ragnarok.png",color:"#5DEAF2",name:"Ragnarok"}]},
    {id:"promotionpack49",usd:4.99,coins:7000,dna:0,skins:[{img:"creatures_gryphon.png",color:"#050a50",name:"Gryphon"}]},
    {id:"promotionpack50",usd:9.99,coins:16000,dna:0,skins:[{img:"creatures_dark_wings.png",color:"#6f2432",name:"Dark Wings"}]},
    {id:"promotionpack51",usd:19.99,coins:50000,dna:0,skins:[{img:"creatures_gryphon.png",color:"#050a50",name:"Gryphon"},{img:"creatures_dark_wings.png",color:"#6f2432",name:"Dark Wings"}]},
    {id:"promotionpack52",usd:2.99,coins:1900,dna:0,skins:[{img:"samurai_war_mask.png",color:"#9945ff",name:"War Mask"}]},
    {id:"promotionpack53",usd:4.99,coins:5200,dna:0,skins:[{img:"samurai_rogue_samurai.png",color:"#0a397b",name:"Rogue Samurai"}]},
    {id:"promotionpack54",usd:9.99,coins:0,dna:2000,skins:[{img:"samurai_war_mask.png",color:"#9945ff",name:"War Mask"},{img:"samurai_skull_samurai.png",color:"#6c0214",name:"Skull Samurai"}]},
    {id:"promotionpack55",usd:4.99,coins:3250,dna:0,skins:[{img:"nvr_shuriken.png",color:"#540403",name:"Nvr Shuriken"}]},
    {id:"promotionpack56",usd:9.99,coins:16000,dna:0,skins:[{img:"nvr_steel_ram.png",color:"#C6FD50",name:"Nvr Steel Ram"}]},
    {id:"promotionpack57",usd:19.99,coins:0,dna:1800,skins:[{img:"nvr_shuriken.png",color:"#540403",name:"Nvr Shuriken"},{img:"nvr_shadow.png",color:"#5EA7FC",name:"Nvr Shadow"}]},
    {id:"promotionpack58",usd:2.99,coins:2500,dna:0,skins:[{img:"circus_grizzly.png",color:"#bd5837",name:"Grizzly"}]},
    {id:"promotionpack59",usd:4.99,coins:6000,dna:0,skins:[{img:"circus_bullet_man.png",color:"#f2bc00",name:"Bullet Man"}]},
    {id:"promotionpack60",usd:9.99,coins:0,dna:2500,skins:[{img:"circus_grizzly.png",color:"#bd5837",name:"Grizzly"},{img:"circus_wicked_clown.png",color:"#fb0000",name:"Wicked Clown"}]},
    {id:"promotionpack61",usd:2.99,coins:3700,dna:0,skins:[],extras:["Mass Boost 3x 24h"]},
    {id:"promotionpack62",usd:4.99,coins:6200,dna:0,skins:[{img:"rainbow_tusk.png",color:"#00FFC0",name:"Rainbow Tusk"}]},
    {id:"promotionpack63",usd:12.99,coins:12000,dna:1300,skins:[{img:"prismatic_jackal.png",color:"#00FFC0",name:"Prismatic Jackal"}]},
    {id:"promotionpack64",usd:1.99,coins:3250,dna:0,skins:[{img:"beast_fighters_ii_skin_karate_parrot.png",color:"#740031",name:"Karate Parrot"}]},
    {id:"promotionpack65",usd:4.99,coins:16000,dna:0,skins:[{img:"beast_fighters_ii_skin_raccoon_jutsu.png",color:"#8535af",name:"Raccoon Jutsu"}]},
    {id:"promotionpack66",usd:9.99,coins:30000,dna:0,skins:[{img:"beast_fighters_ii_skin_karate_parrot.png",color:"#740031",name:"Karate Parrot"},{img:"beast_fighters_ii_skin_frog_thai.png",color:"#98ff51",name:"Frog Thai"}]},
    {id:"promotionpack67",usd:4.99,coins:3250,dna:0,skins:[{img:"stone_age_amber.png",color:"#830f00",name:"Amber"}]},
    {id:"promotionpack68",usd:9.99,coins:16000,dna:0,skins:[{img:"stone_age_stone_tool.png",color:"#8d0000",name:"Stone Tool"}]},
    {id:"promotionpack69",usd:19.99,coins:0,dna:1800,skins:[{img:"stone_age_stone_tool.png",color:"#8d0000",name:"Stone Tool"},{img:"stone_age_fire_face.png",color:"#e70808",name:"Fire Face"}]},
    {id:"promotionpack70",usd:4.99,coins:7000,dna:0,skins:[{img:"time_travel_time_dude.png",color:"#bd0000",name:"Time Dude"}]},
    {id:"promotionpack71",usd:9.99,coins:16000,dna:0,skins:[{img:"time_travel_time_doctor.png",color:"#80d600",name:"Time Doctor"}]},
    {id:"promotionpack72",usd:19.99,coins:50000,dna:0,skins:[{img:"time_travel_time_dude.png",color:"#bd0000",name:"Time Dude"},{img:"time_travel_time_doctor.png",color:"#80d600",name:"Time Doctor"}]},
    {id:"promotionpack73",usd:4.99,coins:3250,dna:0,skins:[{img:"meme_alone.png",color:"#2cccff",name:"Alone"}]},
    {id:"promotionpack74",usd:9.99,coins:16000,dna:0,skins:[{img:"meme_yuno.png",color:"#fff977",name:"Yuno"}]},
    {id:"promotionpack75",usd:19.99,coins:0,dna:1800,skins:[{img:"meme_alone.png",color:"#2cccff",name:"Alone"},{img:"meme_rage.png",color:"#006149",name:"Rage"}]},
    {id:"promotionpack76",usd:2.99,coins:2200,dna:0,skins:[{img:"last_master_elite_pilot.png",color:"#00139b",name:"Last Master Elite Pilot"}]},
    {id:"promotionpack77",usd:4.99,coins:5500,dna:0,skins:[{img:"last_master_cyber_commando.png",color:"#8f0000",name:"Last Master Cyber Commando"}]},
    {id:"promotionpack78",usd:9.99,coins:0,dna:2300,skins:[{img:"last_master_elite_pilot.png",color:"#00139b",name:"Last Master Elite Pilot"},{img:"last_master_red_pulse.png",color:"#e40000",name:"Last Master Red Pulse"}]},
    {id:"promotionpack79",usd:29.99,coins:125000,dna:0,skins:[]},
    {id:"promotionpack80",usd:39.99,coins:125000,dna:0,skins:[]},
    {id:"promotionpack81",usd:59.99,coins:125000,dna:0,skins:[]},
    {id:"promotionpack82",usd:1.99,coins:3250,dna:0,skins:[],extras:["Potion Legendary"]},
    {id:"promotionpack83",usd:4.99,coins:16000,dna:0,skins:[{img:"master_of_thieves_merry_outlaw.png",color:"#69ca3f",name:"Merry Outlaw"}]},
    {id:"promotionpack84",usd:9.99,coins:30000,dna:0,skins:[{img:"master_of_thieves_tiny_jack.png",color:"#391a1c",name:"Tiny Jack"},{img:"master_of_thieves_jade.png",color:"#ff438c",name:"Jade"}]},
    {id:"promotionpack85",usd:4.99,coins:3250,dna:0,skins:[{img:"jungle_quest_general.png",color:"#2f200d",name:"General"}]},
    {id:"promotionpack86",usd:9.99,coins:16000,dna:0,skins:[{img:"jungle_quest_giant_skull.png",color:"#6301c6",name:"Giant Skull"}]},
    {id:"promotionpack87",usd:19.99,coins:0,dna:1800,skins:[{img:"jungle_quest_general.png",color:"#2f200d",name:"General"},{img:"jungle_quest_great_zilla.png",color:"#017cbe",name:"Great Zilla"}]},
    {id:"promotionpack88",usd:4.99,coins:5000,dna:0,skins:[],extras:["Mass Boost 3x 24h"]},
    {id:"promotionpack89",usd:9.99,coins:16000,dna:0,skins:[{img:"mjzs_surfinbird.png",color:"#DC0000",name:"Surfin Bird"}]},
    {id:"promotionpack90",usd:14.99,coins:25000,dna:1200,skins:[{img:"mjzs_jellydiver.png",color:"#40B6FF",name:"Jelly Diver"},{img:"mjzs_skullswords.png",color:"#F10000",name:"Skull Swords"}]},
    {id:"promotionpack91",usd:1.99,coins:3250,dna:0,skins:[{img:"Island_Scar.png",color:"#191928",name:"Scar"}]},
    {id:"promotionpack92",usd:4.99,coins:16000,dna:0,skins:[{img:"Island_Seer.png",color:"#f0cd02",name:"Seer"}]},
    {id:"promotionpack93",usd:9.99,coins:30000,dna:0,skins:[{img:"Island_Scar.png",color:"#191928",name:"Scar"},{img:"Island_Seer.png",color:"#f0cd02",name:"Seer"}]},
    {id:"promotionpack94",usd:4.99,coins:3250,dna:0,skins:[{img:"may_merchant_v2_mariachi.png",color:"#000103",name:"Mariachi"}]},
    {id:"promotionpack95",usd:9.99,coins:16000,dna:0,skins:[{img:"may_merchant_v2_suplex.png",color:"#ED1600",name:"Suplex"}]},
    {id:"promotionpack96",usd:14.99,coins:25000,dna:1200,skins:[{img:"may_merchant_v2_feather_dragon.png",color:"#9002A0",name:"Feather Dragon"}]},
    {id:"promotionpack97",usd:4.99,coins:9000,dna:250,skins:[],extras:["Mass Boost 3x 24h"]},
    {id:"promotionpack98",usd:9.99,coins:25000,dna:1200,skins:[{img:"wicked_vendetta.png",color:"#4D1AE2",name:"Wicked Vendetta"},{img:"mexican_skull.png",color:"#E77805",name:"Mexican Skull"}]},
    {id:"promotionpack99",usd:4.99,coins:3250,dna:355,skins:[]},
    {id:"promotionpack100",usd:14.99,coins:0,dna:1800,skins:[{img:"toco_bones.png",color:"#00373c",name:"Toco Bones"},{img:"party_bones.png",color:"#c8004e",name:"Party Bones"}]},
    {id:"promotionpack101",usd:1.99,coins:3250,dna:0,skins:[],extras:["Mass Boost 3x 24h"]},
    {id:"promotionpack102",usd:4.99,coins:16000,dna:0,skins:[{img:"SH_ArachnoKid.png",color:"#1b6281",name:"Cyber Kid"},{img:"Nuclear_Mutant.png",color:"#0f4419",name:"Mutant"}]},
    {id:"promotionpack103",usd:2.99,coins:15000,dna:250,skins:[],extras:["Mass Boost 3x 24h"]},
    {id:"promotionpack104",usd:7.99,coins:35000,dna:1200,skins:[{img:"punk.png",color:"#900101",name:"Punk"},{img:"wasted_mouse.png",color:"#225AE3",name:"Wasted Mouse"},{img:"mr_spanks.png",color:"#019228",name:"Mr Spanks"}]},
    {id:"promotionpack105",usd:4.99,coins:3250,dna:0,skins:[{img:"winter_ice_crystal.png",color:"#00a7fe",name:"Winter Ice Crystal"}]},
    {id:"promotionpack106",usd:9.99,coins:16000,dna:0,skins:[{img:"winter_dire_wolf.png",color:"#161d66",name:"Winter Dire Wolf"}]},
    {id:"promotionpack107",usd:19.99,coins:50000,dna:0,skins:[{img:"winter_dire_wolf.png",color:"#161d66",name:"Winter Dire Wolf"},{img:"winter_ice_lord.png",color:"#1690d4",name:"Winter Ice Lord"}]},
    {id:"promotionpack108",usd:4.99,coins:3250,dna:0,skins:[{img:"action_heroes_v2_slaughter.png",color:"#2296ef",name:"Slaughter"}]},
    {id:"promotionpack109",usd:9.99,coins:16000,dna:0,skins:[{img:"action_heroes_v2_slingblade.png",color:"#9542c8",name:"Slingblade"}]},
    {id:"promotionpack110",usd:19.99,coins:50000,dna:0,skins:[{img:"action_heroes_v2_slaughter.png",color:"#2296ef",name:"Slaughter"},{img:"action_heroes_v2_the_professional.png",color:"#ff2929",name:"The Professional"}]},
    {id:"promotionpack111",usd:5.99,coins:6500,dna:0,skins:[{img:"WickedFrosty.png",color:"#00DFFF",name:"Wicked Frosty"}]},
    {id:"promotionpack112",usd:9.99,coins:13500,dna:0,skins:[{img:"BigHorn.png",color:"#FFCC00",name:"Big Horn"}]},
    {id:"promotionpack113",usd:19.99,coins:22000,dna:2500,skins:[{img:"WickedFrosty.png",color:"#00DFFF",name:"Wicked Frosty"},{img:"BigHorn.png",color:"#FFCC00",name:"Big Horn"}],extras:["Mass Boost 3x 1h","Xp Boost 3x 1h"]},
    {id:"coins_20000",usd:24.99,coins:20000,dna:0,skins:[]},
    {id:"promotionpack114",usd:4.99,coins:8000,dna:0,skins:[{img:"WildCooper.png",color:"#6AD7EA",name:"Wild Cooper"}],extras:["Potion Epic"]},
    {id:"promotionpack115",usd:9.99,coins:0,dna:2800,skins:[{img:"TorchHeader.png",color:"#4E00FF",name:"Torch Header"}],extras:["Potion Legendary"]},
    {id:"promotionpack116",usd:4.99,coins:12000,dna:1200,skins:[{img:"dog_life.png",color:"#118DB9",name:"Dog Life"}]},
    {id:"promotionpack117",usd:9.99,coins:30000,dna:2200,skins:[{img:"dog_life.png",color:"#118DB9",name:"Dog Life"}]},
    {id:"promotionpack118",usd:14.99,coins:45000,dna:3500,skins:[{img:"dog_life.png",color:"#118DB9",name:"Dog Life"}]},
    {id:"promotionpack119",usd:19.99,coins:65000,dna:5500,skins:[{img:"dog_life.png",color:"#118DB9",name:"Dog Life"}]},
    {id:"promotionpack120",usd:2.99,coins:3500,dna:0,skins:[{img:"santa_rocket_deer.png",color:"#f51405",name:"Rocket Deer"}]},
    {id:"promotionpack121",usd:4.99,coins:6700,dna:0,skins:[{img:"santa_snow_biker.png",color:"#0097f7",name:"Snow Biker"}]},
    {id:"promotionpack122",usd:9.99,coins:0,dna:2600,skins:[{img:"santa_rocket_deer.png",color:"#f51405",name:"Rocket Deer"},{img:"santa_bad_santa.png",color:"#dc0000",name:"Bad Santa"}]},
    {id:"coins_40000",usd:38.99,coins:40000,dna:0,skins:[]},
    {id:"promotionpack123",usd:1.99,coins:0,dna:0,skins:[],extras:["Potion Golden"]},
    {id:"promotionpack124",usd:4.99,coins:16000,dna:0,skins:[{img:"retro_blue_swirl.png",color:"#0020e0",name:"Blue Swirl"}]},
    {id:"promotionpack125",usd:9.99,coins:30000,dna:0,skins:[{img:"retro_blue_swirl.png",color:"#0020e0",name:"Blue Swirl"},{img:"retro_jumper.png",color:"#d20000",name:"Jumper"}]},
    {id:"promotionpack126",usd:4.99,coins:3250,dna:0,skins:[{img:"may_merchant_v1_the_stranger.png",color:"#E56300",name:"The Stranger"}]},
    {id:"promotionpack127",usd:9.99,coins:16000,dna:0,skins:[{img:"may_merchant_v1_bull_skull.png",color:"#A11100",name:"Bull Skull"}]},
    {id:"promotionpack128",usd:14.99,coins:25000,dna:1200,skins:[{img:"may_merchant_v1_wild_pepper.png",color:"#F41600",name:"Wild Pepper"}]},
    {id:"promotionpack129",usd:4.99,coins:7000,dna:0,skins:[{img:"Colossus.png",color:"#15250a",name:"Colossus"}]},
    {id:"promotionpack130",usd:9.99,coins:16000,dna:0,skins:[{img:"Dark_Matter.png",color:"#6653cd",name:"Dark Matter"}]},
    {id:"promotionpack131",usd:19.99,coins:50000,dna:0,skins:[{img:"Colossus.png",color:"#15250a",name:"Colossus"},{img:"Dark_Matter.png",color:"#6653cd",name:"Dark Matter"}]},
    {id:"promotionpack132",usd:1.99,coins:5000,dna:0,skins:[],extras:["Mass Boost 3x 1h"]},
    {id:"promotionpack133",usd:4.99,coins:16000,dna:0,skins:[{img:"good_boy.png",color:"#002304",name:"Good Boy"}]},
    {id:"promotionpack134",usd:9.99,coins:30000,dna:0,skins:[{img:"murder_ball.png",color:"#380076",name:"Murder Ball"},{img:"wilson.png",color:"#464737",name:"Wilson"}]},
    {id:"promotionpack135",usd:4.99,coins:5000,dna:0,skins:[{img:"mgs_ada.png",color:"#AD0900",name:"Ada"}]},
    {id:"promotionpack136",usd:9.99,coins:16000,dna:0,skins:[{img:"mgs_watson.png",color:"#C05907",name:"Watson"}]},
    {id:"promotionpack137",usd:14.99,coins:25000,dna:1800,skins:[{img:"mgs_steamdiver.png",color:"#00AD89",name:"Steam Diver"}]},
    {id:"promotionpack138",usd:2.99,coins:1500,dna:0,skins:[],extras:["Potion Legendary"]},
    {id:"promotionpack139",usd:4.99,coins:6600,dna:0,skins:[{img:"carnival_2017_bird_mask.png",color:"#c60005",name:"Bird Mask"}]},
    {id:"promotionpack140",usd:9.99,coins:0,dna:2400,skins:[{img:"carnival_2017_trickster.png",color:"#0036ff",name:"Trickster"},{img:"carnival_2017_golden_mask.png",color:"#c90042",name:"Golden Mask"}]},
    {id:"promotionpack141",usd:4.99,coins:3250,dna:0,skins:[{img:"ghost_machine_cyber_agent.png",color:"#84ed26",name:"Cyber Agent"}]},
    {id:"promotionpack142",usd:9.99,coins:16000,dna:0,skins:[{img:"ghost_machine_droid.png",color:"#355360",name:"Droid"}]},
    {id:"promotionpack143",usd:19.99,coins:50000,dna:0,skins:[{img:"ghost_machine_cyber_agent.png",color:"#84ed26",name:"Cyber Agent"},{img:"ghost_machine_detective.png",color:"#950303",name:"Detective"}]},
    {id:"promotionpack144",usd:4.99,coins:3250,dna:0,skins:[{img:"steamworld_can_man.png",color:"#d0c7ac",name:"Steamworld Can Man"}]},
    {id:"promotionpack145",usd:9.99,coins:16000,dna:0,skins:[{img:"steamworld_the_tinker.png",color:"#ffc706",name:"Steamworld The Tinker"}]},
    {id:"promotionpack146",usd:19.99,coins:50000,dna:0,skins:[{img:"steamworld_can_man.png",color:"#d0c7ac",name:"Steamworld Can Man"},{img:"steamworld_think_tank.png",color:"#ff7d72",name:"Steamworld Think Tank"}]},
    {id:"promotionpack147",usd:1.99,coins:0,dna:0,skins:[],extras:["Potion Promo Valentines V3"]},
    {id:"promotionpack148",usd:4.99,coins:3250,dna:0,skins:[{img:"arcade_games_pixel_kong.png",color:"#ffe00f",name:"Pixel Kong"}]},
    {id:"promotionpack149",usd:9.99,coins:16000,dna:0,skins:[{img:"arcade_games_power_fighter.png",color:"#df2d19",name:"Power Fighter"}]},
    {id:"promotionpack150",usd:19.99,coins:0,dna:1800,skins:[{img:"arcade_games_pixel_kong.png",color:"#ffe00f",name:"Pixel Kong"},{img:"arcade_games_techno_kid.png",color:"#91f9ff",name:"Techno Kid"}]},
    {id:"promotionpack151",usd:4.99,coins:3250,dna:0,skins:[{img:"tms_soceress.png",color:"#F25100",name:"Sorceress"}]},
    {id:"promotionpack152",usd:9.99,coins:16000,dna:0,skins:[{img:"tms_gnomemage.png",color:"#EDC03B",name:"Gnome Mage"}]},
    {id:"promotionpack153",usd:14.99,coins:25000,dna:1800,skins:[{img:"tms_elvennoble.png",color:"#BC0292",name:"Elven Noble"}]},
    {id:"promotionpack154",usd:2.99,coins:1500,dna:0,skins:[{img:"anime_skull_bow.png",color:"#222222",name:"Skull Bow"}]},
    {id:"promotionpack155",usd:4.99,coins:4200,dna:0,skins:[{img:"anime_power_ninja.png",color:"#222222",name:"Power Ninja"}]},
    {id:"promotionpack156",usd:9.99,coins:0,dna:1200,skins:[{img:"anime_skull_bow.png",color:"#222222",name:"Skull Bow"},{img:"anime_giant_human.png",color:"#222222",name:"Giant Human"}]},
    {id:"promotionpack157",usd:4.99,coins:3250,dna:0,skins:[{img:"easter_2017_easter_chick.png",color:"#006cff",name:"Easter Chick"}]},
    {id:"promotionpack158",usd:9.99,coins:16000,dna:0,skins:[{img:"easter_2017_wacky_egg.png",color:"#350765",name:"Wacky Egg"}]},
    {id:"promotionpack159",usd:19.99,coins:50000,dna:0,skins:[{img:"easter_2017_easter_chick.png",color:"#006cff",name:"Easter Chick"},{img:"easter_2017_cool_bunny.png",color:"#d7006f",name:"Cool Bunny"}]},
    {id:"promotionpack160",usd:9.99,coins:16000,dna:0,skins:[{img:"rock_stars_superstar.png",color:"#506ee7",name:"Superstar"}]},
    {id:"promotionpack161",usd:19.99,coins:0,dna:1800,skins:[{img:"rock_stars_superstar.png",color:"#506ee7",name:"Superstar"},{img:"rock_stars_bad_boy.png",color:"#c90042",name:"Bad Boy"}]},
    {id:"promotionpack162",usd:4.99,coins:10000,dna:0,skins:[{img:"may_merchant_v3_cactus_flower.png",color:"#2348E3",name:"Cactus Flower"}]},
    {id:"promotionpack163",usd:14.99,coins:25000,dna:1200,skins:[{img:"may_merchant_v3_pepe_loco.png",color:"#F3BE00",name:"Pepe Loco"}],extras:["Mass Boost 2x 1h","Xp Boost 3x 1h"]},
    {id:"promotionpack164",usd:4.99,coins:16000,dna:0,skins:[{img:"beast_fighters_tiger.png",color:"#70ecff",name:"Kempo Tiger"},{img:"dawn_cosmo_pirate.png",color:"#005ac6",name:"Cosmo Pirate"}]},
    {id:"promotionpack165",usd:4.99,coins:0,dna:800,skins:[{img:"Horrorscope_Taurus.png",color:"#FF2359",name:"Viletauro"}]},
    {id:"promotionpack166",usd:4.99,coins:6000,dna:0,skins:[{img:"cinco_mayo_2017_crazy_sombrero.png",color:"#644b14",name:"Crazy Sombrero"}]},
    {id:"promotionpack167",usd:7.99,coins:12000,dna:0,skins:[{img:"may_merchant_v1_wild_pepper.png",color:"#F41600",name:"Wild Pepper"}]},
    {id:"promotionpack168",usd:9.99,coins:18000,dna:1100,skins:[{img:"cinco_mayo_2017_hot_taco.png",color:"#ffff1b",name:"Hot Taco"},{img:"cinco_mayo_2017_crazy_sombrero.png",color:"#644b14",name:"Crazy Sombrero"}]},
    {id:"promotionpack169",usd:4.99,coins:3250,dna:0,skins:[],extras:["Potion Legendary"]},
    {id:"promotionpack170",usd:9.99,coins:16000,dna:0,skins:[{img:"june_merchant_v2_power_mask.png",color:"#F5D502",name:"Power Mask"}]},
    {id:"promotionpack171",usd:14.99,coins:25000,dna:1200,skins:[{img:"june_merchant_v2_spike_fish.png",color:"#144939",name:"Spike Fish"},{img:"june_merchant_v2_cool_lion.png",color:"#EB0000",name:"Cool Lion"}]},
    {id:"promotionpack172",usd:4.99,coins:16000,dna:0,skins:[{img:"anime_eyepatch.png",color:"#222222",name:"Eyepatch"},{img:"stone_age_amber.png",color:"#830f00",name:"Amber"}]},
    {id:"promotionpack173",usd:4.99,coins:2500,dna:0,skins:[{img:"Dattebayo.png",color:"#222222",name:"Dattebayo"}]},
    {id:"promotionpack174",usd:7.99,coins:8000,dna:0,skins:[{img:"BlackLeg.png",color:"#222222",name:"Blackleg"}]},
    {id:"promotionpack175",usd:19.99,coins:20000,dna:1800,skins:[{img:"Dattebayo.png",color:"#222222",name:"Dattebayo"},{img:"BlackLeg.png",color:"#222222",name:"Blackleg"}]},
    {id:"promotionpack176",usd:9.99,coins:15000,dna:550,skins:[{img:"sugarrush_moofun.png",color:"#06f3e6",name:"Moofun"}]},
    {id:"promotionpack177",usd:14.99,coins:25000,dna:1500,skins:[{img:"sugarrush_wahfull.png",color:"#0069b7",name:"Wahfull"}]},
    {id:"promotionpack178",usd:4.99,coins:16000,dna:0,skins:[{img:"food_Terminita.png",color:"#9955b5",name:"Hard Shroom"},{img:"beast_fighters_ii_skin_frog_thai.png",color:"#98ff51",name:"Frog Thai"}]},
    {id:"promotionpack179",usd:9.99,coins:16000,dna:0,skins:[{img:"july_merchant_v2_mecha_toad.png",color:"#389CFF",name:"Mecha Toad"}]},
    {id:"promotionpack180",usd:14.99,coins:25000,dna:1200,skins:[{img:"july_merchant_v2_mecha_parrot.png",color:"#49D002",name:"Mecha Parrot"},{img:"july_merchant_v2_mecha_destroyer.png",color:"#F40202",name:"Mecha Destroyer"}]},
    {id:"promotionpack181",usd:4.99,coins:16000,dna:0,skins:[{img:"creatures_dark_wings.png",color:"#6f2432",name:"Dark Wings"},{img:"Treasure_SeaExplorer.png",color:"#032717",name:"Treasure Explorer"}]},
    {id:"promotionpack182",usd:4.99,coins:16000,dna:0,skins:[{img:"deadly_piranha.png",color:"#E80000",name:"Deadly Piranha"}]},
    {id:"promotionpack183",usd:14.99,coins:25000,dna:1200,skins:[{img:"madjawz.png",color:"#E80000",name:"Madjawz"}],extras:["Mass Boost 2x 24h","Xp Boost 3x 1h"]},
    {id:"promotionpack184",usd:4.99,coins:5000,dna:0,skins:[],extras:["Mass Boost 3x 1h"]},
    {id:"promotionpack185",usd:4.99,coins:3250,dna:0,skins:[],extras:["Mass Boost 3x 24h"]},
    {id:"promotionpack186",usd:9.99,coins:16000,dna:0,skins:[{img:"birthday_lol.png",color:"#cd5d22",name:"Birthday Lol"},{img:"Journey_BullKing.png",color:"#620202",name:"Bull King"}]},
    {id:"promotionpack187",usd:3.99,coins:2600,dna:0,skins:[{img:"anime_skull_ribbon.png",color:"#222222",name:"Skull Ribbon"}]},
    {id:"promotionpack188",usd:9.99,coins:10500,dna:0,skins:[{img:"anime_eyepatch.png",color:"#222222",name:"Eyepatch"}]},
    {id:"promotionpack189",usd:14.99,coins:0,dna:2500,skins:[{img:"anime_eyepatch.png",color:"#222222",name:"Eyepatch"},{img:"anime_mega_power.png",color:"#222222",name:"Mega Power"}]},
    {id:"coins_4900",usd:6.99,coins:4900,dna:0,skins:[]},
    {id:"promotionpack190",usd:9.99,coins:16000,dna:0,skins:[{img:"food_Hamburguer.png",color:"#0a3858",name:"Burger Face"},{img:"Sports_Basketball.png",color:"#620202",name:"Dunk"}]},
    {id:"promotionpack191",usd:9.99,coins:16000,dna:0,skins:[{img:"merchant_electronic_girl.png",color:"#44C3FF",name:"Electronic Girl"}]},
    {id:"promotionpack192",usd:14.99,coins:25000,dna:1200,skins:[{img:"merchant_techno_ninja.png",color:"#0D0594",name:"Techno Ninja"},{img:"merchant_cyber_punk.png",color:"#3DA900",name:"Cyber Punk"}]},
    {id:"promotionpack193",usd:4.99,coins:16000,dna:0,skins:[{img:"Dead_Nuke.png",color:"#4a0808",name:"Nuke"},{img:"Pumpkin.png",color:"#420000",name:"Pumpkin"}]},
    {id:"promotionpack194",usd:9.99,coins:16000,dna:0,skins:[{img:"Cactus.png",color:"#a20947",name:"Cactus"},{img:"Pirates_Monkey.png",color:"#262429",name:"Mad Monkey"}]},
    {id:"promotionpack195",usd:9.99,coins:16000,dna:0,skins:[{img:"divine_pearl.png",color:"#FA6406",name:"Divine Pearl"}]},
    {id:"promotionpack196",usd:14.99,coins:25000,dna:1200,skins:[{img:"evil_genie.png",color:"#09CBFB",name:"Evil Genie"},{img:"unknown_totem.png",color:"#891A25",name:"Unknown Totem"}]},
    {id:"promotionpack197",usd:4.99,coins:16000,dna:0,skins:[{img:"cinco_mayo_2017_hot_taco.png",color:"#ffff1b",name:"Hot Taco"},{img:"anime_mega_power.png",color:"#222222",name:"Mega Power"}]},
    {id:"promotionpack198",usd:9.99,coins:16000,dna:0,skins:[{img:"nightmare.png",color:"#00D98A",name:"Nightmare"}]},
    {id:"promotionpack199",usd:14.99,coins:25000,dna:1200,skins:[{img:"bewitched.png",color:"#0090BE",name:"Bewitched"},{img:"monday_worker.png",color:"#FE1515",name:"Monday Worker"}]},
    {id:"promotionpack200",usd:4.99,coins:16000,dna:0,skins:[{img:"moonlight_wendigo.png",color:"#161d66",name:"Moonlight Wendigo"},{img:"circus_wicked_clown.png",color:"#fb0000",name:"Wicked Clown"}]},
    {id:"promotionpack201",usd:9.99,coins:25000,dna:1200,skins:[{img:"beetoothven.png",color:"#CE0000",name:"Beetoothven"},{img:"tape_guy.png",color:"#F15400",name:"Tape Guy"}]},
    {id:"promotionpack202",usd:4.99,coins:9000,dna:400,skins:[],extras:["Mass Boost 2x 24h","Xp Boost 2x 24h"]},
    {id:"promotionpack203",usd:9.99,coins:20000,dna:1000,skins:[{img:"omnom_gator.png",color:"#026300",name:"Omnom Gator"}],extras:["Mass Boost 2x 24h","Xp Boost 2x 24h"]},
    {id:"promotionpack204",usd:14.99,coins:35000,dna:1500,skins:[{img:"omnom_snek.png",color:"#AC019D",name:"Omnom Snek"},{img:"omnom_lion.png",color:"#430100",name:"Omnom Lion"}],extras:["Mass Boost 2x 24h","Xp Boost 2x 24h"]},
    {id:"promotionpack205",usd:9.99,coins:25000,dna:1200,skins:[{img:"melting_man.png",color:"#08AAF5",name:"Melting Man"},{img:"crazy_rudolph.png",color:"#F8690D",name:"Crazy Rudolph"}]}
  ];
  const COIN = [
    {id:"1_skin_deadly_dancer",cost:4300,name:"Deadly Dancer",img:"deadly_dancer_low.png",color:"#7815ff"},
    {id:"1_skin_neo_torque",cost:2050,name:"Neo Torque",img:"neo_torque_low.png",color:"#f6b700"},
    {id:"1_skin_stunt_agent",cost:3020,name:"Stunt Agent",img:"stunt_agent_low.png",color:"#fff7d9"},
    {id:"1_skin_volt_vibe",cost:1390,name:"Volt Vibe",img:"volt_vibe_low.png",color:"#e9ac00"},
    {id:"1_skin_blazara",cost:4450,name:"Blazara",img:"blazara_low.png",color:"#fd750b"},
    {id:"1_skin_molten_beast",cost:3020,name:"Molten Beast",img:"molten_beast_low.png",color:"#1ff1f3"},
    {id:"1_skin_steel_sentinel",cost:5850,name:"Steel Sentinel",img:"steel_sentinel_low.png",color:"#c9ff8c"},
    {id:"1_skin_voltage",cost:2050,name:"Voltage",img:"voltage_low.png",color:"#35ffa0"},
    {id:"1_skin_general_grudge",cost:7500,name:"General Grudge",img:"general_grudge_low.png",color:"#f55f58"},
    {id:"1_skin_phantom_terror",cost:5850,name:"Phantom Terror",img:"phantom_terror_low.png",color:"#f2a601"},
    {id:"1_skin_crimson_comet",cost:3020,name:"Crimson Comet",img:"crimson_comet_low.png",color:"#02c1f2"},
    {id:"1_skin_captain_valor",cost:2050,name:"Captain Valor",img:"captain_valor_low.png",color:"#6fe60d"},
    {id:"1_skin_green_goggles",cost:1390,name:"Green Goggles",img:"green_goggles_low.png",color:"#F641FF"},
    {id:"1_skin_voidmaster",cost:7500,name:"Voidmaster",img:"voidmaster_low.png",color:"#623bd1"},
    {id:"1_skin_wonder_star",cost:4450,name:"Wonder Star",img:"wonder_star_low.png",color:"#6ddfdc"},
    {id:"1_skin_boomraptor",cost:3750,name:"Boomraptor",img:"boomraptor_low.png",color:"#fd363c"},
    {id:"1_skin_rainosaur",cost:2490,name:"Rainosaur",img:"rainosaur_low.png",color:"#0030ff"},
    {id:"1_skin_tricera_taco",cost:1390,name:"Tricera Taco",img:"tricera_taco_low.png",color:"#4d0b32"},
    {id:"1_skin_venom_veil",cost:8750,name:"Venom Veil",img:"venom_veil_low.png",color:"#262626"},
    {id:"1_skin_eclipse_eyes",cost:2900,name:"Eclipse Eyes",img:"eclipse_eyes_low.png",color:"#262626"},
    {id:"1_skin_moonshadow",cost:4800,name:"Moonshadow",img:"moonshadow_low.png",color:"#262626"},
    {id:"1_skin_gloomfangs",cost:4850,name:"Gloomfangs",img:"gloomfangs_low.png",color:"#ff242c"},
    {id:"1_skin_darkheart",cost:3250,name:"Darkheart",img:"darkheart_low.png",color:"#9446ae"},
    {id:"1_skin_stormpelt",cost:3100,name:"Stormpelt",img:"stormpelt_low.png",color:"#00802a"},
    {id:"1_skin_ghostpelt",cost:4700,name:"Ghostpelt",img:"ghostpelt_low.png",color:"#73ffb9"},
    {id:"1_skin_flame_roar",cost:2900,name:"Flame Roar",img:"flame_roar_low.png",color:"#e00000"},
    {id:"1_skin_frostbringer",cost:4350,name:"Frostbringer",img:"frostbringer_low.png",color:"#0084e1"},
    {id:"1_skin_ancient_fangs",cost:2900,name:"Ancient Fangs",img:"ancient_fangs_low.png",color:"#998864"},
    {id:"1_skin_jurassic_fury",cost:4350,name:"Jurassic Fury",img:"jurassic_fury_low.png",color:"#a35fb4"},
    {id:"1_skin_incinerator",cost:4100,name:"Incinerator",img:"incinerator_low.png",color:"#ffff54"},
    {id:"1_skin_glowstone",cost:2850,name:"Glowstone",img:"glowstone_low.png",color:"#a4fa53"},
    {id:"1_skin_steam_knight",cost:2950,name:"Steam Knight",img:"steam_knight_low.png",color:"#49382f"},
    {id:"1_skin_valve_guardian",cost:4500,name:"Valve Guardian",img:"valve_guardian_low.png",color:"#1d88c5"},
    {id:"1_skin_flamewrath",cost:3850,name:"Flamewrath",img:"flamewrath_low.png",color:"#f14800"},
    {id:"1_skin_drakon",cost:2500,name:"Drakon",img:"drakon_low.png",color:"#1791e6"},
    {id:"1_skin_peaceful_voyager",cost:2000,name:"Peaceful Voyager",img:"peaceful_voyager_low.png",color:"#3b63d1"},
    {id:"1_skin_celestial_dj",cost:3500,name:"Celestial Dj",img:"celestial_dj_low.png",color:"#daed2f"},
    {id:"1_skin_steel_emissary",cost:7000,name:"Steel Emissary",img:"steel_emissary_low.png",color:"#2ea8e5"},
    {id:"1_skin_cosmic_swimmer",cost:9500,name:"Cosmic Swimmer",img:"cosmic_swimmer_low.png",color:"#3dcc5a"},
    {id:"1_skin_eggocalypse",cost:7000,name:"Eggocalypse",img:"eggocalypse_low.png",color:"#014c7b"},
    {id:"1_skin_skele_bunny",cost:3500,name:"Skele Bunny",img:"skele_bunny_low.png",color:"#a5d9eb"},
    {id:"1_skin_rotten_root",cost:2000,name:"Rotten Root",img:"rotten_root_low.png",color:"#0779e7"},
    {id:"1_skin_blackout_bat",cost:2000,name:"Blackout Bat",img:"blackout_bat_low.png",color:"#000000"},
    {id:"1_skin_sea_lamp",cost:3500,name:"Sea Lamp",img:"sea_lamp_low.png",color:"#000000"},
    {id:"1_skin_night_stalker",cost:7000,name:"Night Stalker",img:"night_stalker_low.png",color:"#000000"},
    {id:"1_skin_derpy_raptor",cost:1390,name:"Derpy Raptor",img:"derpy_raptor_low.png",color:"#8932bb"},
    {id:"1_skin_derpy_ankylosaurus",cost:2490,name:"Derpy Ankylosaurus",img:"derpy_ankylosaurus_low.png",color:"#7e636a"},
    {id:"1_skin_derpy_mosasaurus",cost:3750,name:"Derpy Mosasaurus",img:"derpy_mosasaurus_low.png",color:"#194a85"},
    {id:"1_skin_ziggy",cost:3500,name:"Ziggy",img:"ziggy_low.png",color:"#0793e3"},
    {id:"1_skin_grinch",cost:4250,name:"Grinch",img:"Grinch_low.png",color:"#004F0F"},
    {id:"1_skin_santa",cost:4200,name:"Santa",img:"X-mas_low.png",color:"#002C6C"},
    {id:"1_skin_gingerbread",cost:1500,name:"Gingerbread",img:"GingerBreadMan_low.png",color:"#7c0001"},
    {id:"1_skin_cupid",cost:4900,name:"Cupid",img:"Cupid_low.png",color:"#a81edb"},
    {id:"1_skin_kiss_girl",cost:2900,name:"Kiss Girl",img:"KissGirl_low.png",color:"#067db4"},
    {id:"1_skin_kiss_boy",cost:2900,name:"Kiss Boy",img:"KissBoy_low.png",color:"#b42306"},
    {id:"1_skin_cupcake",cost:490,name:"Cupcake",img:"CupCake_low.png",color:"#035086"},
    {id:"1_skin_rainbow",cost:4900,name:"Rainbow",img:"Rainbow_low.png",color:"#0f077e"},
    {id:"1_skin_leprechaun",cost:5590,name:"Leprechaun",img:"Leprechaun_low.png",color:"#44ac01"},
    {id:"1_skin_leaf_clover",cost:2900,name:"Leaf Clover",img:"Leaf_Clover_low.png",color:"#d26601"},
    {id:"1_skin_horse_shoe",cost:1990,name:"Horse Shoe",img:"Horse_Shoe_low.png",color:"#66fc17"},
    {id:"1_skin_hat",cost:490,name:"Hat",img:"Hat_low.png",color:"#450f05"},
    {id:"1_skin_gold_pot",cost:3320,name:"Gold Pot",img:"Gold_Pot_low.png",color:"#0b28b3"},
    {id:"1_skin_boot",cost:690,name:"Boot",img:"Boot_low.png",color:"#5f088d"},
    {id:"1_skin_wacky_egg",cost:4200,name:"Wacky Egg",img:"easter_2017_wacky_egg_low.png",color:"#350765"},
    {id:"1_skin_easter_chick",cost:3700,name:"Easter Chick",img:"easter_2017_easter_chick_low.png",color:"#006cff"},
    {id:"1_skin_rabbit",cost:4900,name:"Rabbit",img:"Rabbit_low.png",color:"#58b2ff"},
    {id:"1_skin_rooster",cost:2900,name:"Rooster",img:"Rooster_low.png",color:"#e11e0b"},
    {id:"1_skin_easter_island",cost:1990,name:"Easter Island",img:"Easter_Island_low.png",color:"#6a1103"},
    {id:"1_skin_carrot",cost:690,name:"Carrot",img:"Carrot_low.png",color:"#63b83b"},
    {id:"1_skin_choco_egg",cost:490,name:"Choco Egg",img:"Choco_Egg_low.png",color:"#12609c"},
    {id:"1_skin_april_fool",cost:3320,name:"April Fool",img:"AprilFool_low.png",color:"#b645c7"},
    {id:"1_skin_pinata",cost:7500,name:"Pinata",img:"Pinhata_low.png",color:"#58b2ff"},
    {id:"1_skin_chupacabra",cost:6100,name:"Chupacabra",img:"ChupaCabra_low.png",color:"#6b1498"},
    {id:"1_skin_taco",cost:5500,name:"Taco",img:"Tortilha_low.png",color:"#8e3519"},
    {id:"1_skin_sombrero",cost:2500,name:"Sombrero",img:"Sombrero_low.png",color:"#045d27"},
    {id:"1_skin_hot_pepper",cost:4000,name:"Hot Pepper",img:"ChilliPepper_low.png",color:"#bc0012"},
    {id:"1_skin_stretch_dog",cost:3200,name:"Stretch Dog",img:"stretch_dog_low.png",color:"#0067ab"},
    {id:"1_skin_cactus",cost:1500,name:"Cactus",img:"Cactus_low.png",color:"#a20947"},
    {id:"1_skin_goblin",cost:4900,name:"Goblin",img:"Witch_low.png",color:"#4ead57"},
    {id:"1_skin_mask",cost:2900,name:"Mask",img:"Mask_low.png",color:"#ffc30c"},
    {id:"1_skin_crow",cost:900,name:"Crow",img:"Crow_low.png",color:"#dbdbdb"},
    {id:"1_skin_black_cat",cost:1990,name:"Black Cat",img:"BlackCat_low.png",color:"#18fd73"},
    {id:"1_skin_thirteen",cost:490,name:"Thirteen",img:"Thirteen_low.png",color:"#00bd23"},
    {id:"1_skin_eager_alien",cost:6700,name:"Eager Alien",img:"eager_alien_low.png",color:"#F79D00"},
    {id:"1_skin_spacehunter",cost:5100,name:"Spacehunter",img:"SpaceHunter_low.png",color:"#db0606"},
    {id:"1_skin_invader",cost:2900,name:"Invader",img:"AlienX_low.png",color:"#05243c"},
    {id:"1_skin_jellyblob",cost:1990,name:"Jellyblob",img:"JellyBlob_low.png",color:"#cc1da6"},
    {id:"1_skin_slimeface",cost:690,name:"Slimeface",img:"SlimeFace_low.png",color:"#8fffc9"},
    {id:"1_skin_greenman",cost:490,name:"Greenman",img:"GreenMan_low.png",color:"#2f4a0d"},
    {id:"1_skin_starplayer",cost:4900,name:"Starplayer",img:"Player_1_low.png",color:"#fa171f"},
    {id:"1_skin_striker",cost:2900,name:"Striker",img:"Player_2_low.png",color:"#78e8fd"},
    {id:"1_skin_soccer_shoe",cost:1990,name:"Soccer Shoe",img:"Soccer_Shoe_low.png",color:"#c7cbcc"},
    {id:"1_skin_glub",cost:690,name:"Glub",img:"Glub_low.png",color:"#82c231"},
    {id:"1_skin_soccerball",cost:490,name:"Soccerball",img:"Soccer_Ball_low.png",color:"#011d47"},
    {id:"1_skin_uncle_sam",cost:4900,name:"Uncle Sam",img:"Uncle_Sam_low.png",color:"#f93500"},
    {id:"1_skin_mighty",cost:2900,name:"Mighty",img:"Mighty_low.png",color:"#095090"},
    {id:"1_skin_stars_stripes",cost:1990,name:"Stars Stripes",img:"Stars_and_Stripes_low.png",color:"#0aa45a"},
    {id:"1_skin_skyrocket",cost:690,name:"Skyrocket",img:"Sky_Rocket_low.png",color:"#7268cd"},
    {id:"1_skin_crazy_ball",cost:490,name:"Crazy Ball",img:"Crazy_Ball_low.png",color:"#e1d9d3"},
    {id:"1_skin_surfer",cost:4900,name:"Surfer",img:"Surfer_low.png",color:"#ffff6a"},
    {id:"1_skin_icecream",cost:2900,name:"Icecream",img:"IcecreamFace_low.png",color:"#71e9ff"},
    {id:"1_skin_starfish",cost:1990,name:"Starfish",img:"StarFish_low.png",color:"#cf9b24"},
    {id:"1_skin_watermelon",cost:1990,name:"Watermelon",img:"Watermelon_low.png",color:"#1e735c"},
    {id:"1_skin_sunbath",cost:490,name:"Sunbath",img:"Sunbath_low.png",color:"#2173b8"},
    {id:"1_skin_cannonball",cost:7500,name:"Cannonball",img:"Pirates_CannonBall_low.png",color:"#060b0c"},
    {id:"1_skin_skull_claus",cost:5200,name:"Skull Claus",img:"skull_claus_low.png",color:"#BC0909"},
    {id:"1_skin_sir_bonesy",cost:2500,name:"Sir Bonesy",img:"sir_bonesy_low.png",color:"#24a900"},
    {id:"1_skin_angies_sammish",cost:3000,name:"Angies Sammish",img:"angies_sammish_low.png",color:"#960045"},
    {id:"1_skin_red_hot_watermelon",cost:1900,name:"Red Hot Watermelon",img:"red_hot_watermelon_low.png",color:"#ac0203"},
    {id:"1_skin_mr_banana",cost:950,name:"Mr Banana",img:"mr_banana_low.png",color:"#3c7d00"},
    {id:"1_skin_frankie_tomankie",cost:7500,name:"Frankie Tomankie",img:"Frankie_Tomankie_low.png",color:"#2D7B00"},
    {id:"1_skin_tjoops",cost:5100,name:"Tjoops",img:"Tjoops_low.png",color:"#F48B2C"},
    {id:"1_skin_gahhhlic",cost:1010,name:"Gahhhlic",img:"Gahhhlic_low.png",color:"#98478F"},
    {id:"1_skin_gotxu",cost:3500,name:"Gotxu",img:"Derpichu_low.png",color:"#000000"},
    {id:"1_skin_sliptoon",cost:2490,name:"Sliptoon",img:"sliptoon_low.png",color:"#FFCC00"},
    {id:"1_skin_tranqeeze",cost:1390,name:"Tranqeeze",img:"tranqeeze_low.png",color:"#00A76f"},
    {id:"1_skin_diver",cost:7300,name:"Diver",img:"Diver_low.png",color:"#1fa6ef"},
    {id:"1_skin_birthday_doge",cost:4900,name:"Birthday Doge",img:"birthday_doge_low.png",color:"#663710"},
    {id:"1_skin_birthday_sir",cost:2900,name:"Birthday Sir",img:"birthday_sir_low.png",color:"#871015"},
    {id:"1_skin_birthday_cia",cost:1990,name:"Birthday Cia",img:"birthday_cia_low.png",color:"#3a185c"},
    {id:"1_skin_birthday_wojak",cost:690,name:"Birthday Wojak",img:"birthday_wojak_low.png",color:"#2a490e"},
    {id:"1_skin_birthday_sanik",cost:490,name:"Birthday Sanik",img:"birthday_sanik_low.png",color:"#264bc3"},
    {id:"1_skin_burger_face",cost:4900,name:"Burger Face",img:"food_Hamburguer_low.png",color:"#0a3858"},
    {id:"1_skin_fries",cost:2900,name:"Fries",img:"food_French_Fries_low.png",color:"#e4cf32"},
    {id:"1_skin_jelly",cost:1990,name:"Jelly",img:"food_Jelly_Face_low.png",color:"#30bf94"},
    {id:"1_skin_soda_can",cost:690,name:"Soda Can",img:"food_Juice_Can_low.png",color:"#af38d3"},
    {id:"1_skin_hot_coffee",cost:490,name:"Hot Coffee",img:"food_Cofee_low.png",color:"#0c342a"},
    {id:"1_skin_sprinter",cost:4900,name:"Sprinter",img:"rio_athletic_low.png",color:"#001547"},
    {id:"1_skin_swimmer",cost:2900,name:"Swimmer",img:"rio_swimmer_low.png",color:"#00fcff"},
    {id:"1_skin_judo_fighter",cost:1990,name:"Judo Fighter",img:"rio_judo_low.png",color:"#ca0000"},
    {id:"1_skin_gymnast",cost:690,name:"Gymnast",img:"rio_gymnastic_low.png",color:"#005925"},
    {id:"1_skin_tennist",cost:490,name:"Tennist",img:"rio_tennis_low.png",color:"#cb1778"},
    {id:"1_skin_black_beard",cost:4900,name:"Black Beard",img:"Pirates_Captain_low.png",color:"#004649"},
    {id:"1_skin_captain_skull",cost:2900,name:"Captain Skull",img:"Pirates_SkullPirate_low.png",color:"#a40010"},
    {id:"1_skin_pirate_maiden",cost:1990,name:"Pirate Maiden",img:"Pirates_PirateGirl_low.png",color:"#980e60"},
    {id:"1_skin_rascal",cost:690,name:"Rascal",img:"Pirates_Rascal_low.png",color:"#ade3df"},
    {id:"1_skin_prey",cost:4900,name:"Prey",img:"Autumn_Prey_low.png",color:"#190909"},
    {id:"1_skin_spike",cost:4900,name:"Spike",img:"Sports_Volleyball_low.png",color:"#ff831e"},
    {id:"1_skin_backswing",cost:2900,name:"Backswing",img:"Sports_Golf_low.png",color:"#28d824"},
    {id:"1_skin_jab",cost:1990,name:"Jab",img:"Sports_BoxingGlub_low.png",color:"#00d4e8"},
    {id:"1_skin_touche",cost:690,name:"Touche",img:"Sports_Fencing_low.png",color:"#c80b0c"},
    {id:"1_skin_bullseye",cost:490,name:"Bullseye",img:"Sports_Target_low.png",color:"#246dd8"},
    {id:"1_skin_smyg",cost:4900,name:"Smyg",img:"Alien2_Smyg_low.png",color:"#930906"},
    {id:"1_skin_vega",cost:2900,name:"Vega",img:"Alien2_Vega_low.png",color:"#53DEF2"},
    {id:"1_skin_omicron",cost:1990,name:"Omicron",img:"Alien2_Omicron_low.png",color:"#CDD05D"},
    {id:"1_skin_neila",cost:690,name:"Neila",img:"Alien2_Neila_low.png",color:"#95F7C8"},
    {id:"1_skin_gamma",cost:490,name:"Gamma",img:"Alien2_Gamma_low.png",color:"#55C70F"},
    {id:"1_skin_kong",cost:4900,name:"Kong",img:"Journey_Kong_low.png",color:"#b70900"},
    {id:"1_skin_boar",cost:2900,name:"Boar",img:"Journey_Boar_low.png",color:"#b79ab2"},
    {id:"1_skin_water_spirit",cost:1990,name:"Water Spirit",img:"Journey_WaterSpirit_low.png",color:"#0d4f4e"},
    {id:"1_skin_monk",cost:690,name:"Monk",img:"Journey_Monk_low.png",color:"#d9deee"},
    {id:"1_skin_white_horse",cost:490,name:"White Horse",img:"Journey_WhiteHorse_low.png",color:"#bfd3e9"},
    {id:"1_skin_parrot",cost:490,name:"Parrot",img:"Pirates_Parrot_low.png",color:"#005925"},
    {id:"1_skin_badger",cost:2900,name:"Badger",img:"Autumn_Badger_low.png",color:"#002e72"},
    {id:"1_skin_maple",cost:1990,name:"Maple",img:"Autumn_Maple_low.png",color:"#902109"},
    {id:"1_skin_acorn",cost:690,name:"Acorn",img:"Autumn_Acorn_low.png",color:"#082f0a"},
    {id:"1_skin_squirrel",cost:490,name:"Squirrel",img:"Autumn_Squirrel_low.png",color:"#542c22"},
    {id:"1_skin_warrior",cost:4900,name:"Warrior",img:"Island_Warrior_low.png",color:"#9f0013"},
    {id:"1_skin_coconuts",cost:2900,name:"Coconuts",img:"Island_Coconuts_low.png",color:"#145d92"},
    {id:"1_skin_volcano",cost:1990,name:"Volcano",img:"Island_Volcano_low.png",color:"#000000"},
    {id:"1_skin_sea_turtle",cost:690,name:"Sea Turtle",img:"Island_Sea_Turtle_low.png",color:"#06402f"},
    {id:"1_skin_pinehead",cost:490,name:"Pinehead",img:"Island_Pinehead_low.png",color:"#91c823"},
    {id:"1_skin_devourer",cost:4900,name:"Devourer",img:"Dead_Devourer_low.png",color:"#670001"},
    {id:"1_skin_ranger",cost:2900,name:"Ranger",img:"Dead_Ranger_low.png",color:"#000000"},
    {id:"1_skin_desert_fox",cost:1990,name:"Desert Fox",img:"Dead_DesertFox_low.png",color:"#180445"},
    {id:"1_skin_biker",cost:690,name:"Biker",img:"Dead_Biker_low.png",color:"#041e18"},
    {id:"1_skin_viper",cost:490,name:"Viper",img:"Dead_Viper_low.png",color:"#3d0e26"},
    {id:"1_skin_simian_spectrum",cost:3300,name:"Simian Spectrum",img:"simian_spectrum_low.png",color:"#FF4600"},
    {id:"1_skin_iridian_tiger",cost:2390,name:"Iridian Tiger",img:"iridian_tiger_low.png",color:"#37FC1A"},
    {id:"1_skin_chromatic_peafowl",cost:1090,name:"Chromatic Peafowl",img:"chromatic_peafowl_low.png",color:"#E3FF00"},
    {id:"1_skin_mutant",cost:4900,name:"Mutant",img:"Nuclear_Mutant_low.png",color:"#0f4419"},
    {id:"1_skin_marauder",cost:2900,name:"Marauder",img:"Nuclear_Marauder_low.png",color:"#091a29"},
    {id:"1_skin_scavenger",cost:1990,name:"Scavenger",img:"Nuclear_Scavenger_low.png",color:"#1ca5b1"},
    {id:"1_skin_ogre",cost:690,name:"Ogre",img:"Nuclear_Ogre_low.png",color:"#841117"},
    {id:"1_skin_toxic_eater",cost:490,name:"Toxic Eater",img:"Nuclear_ToxicEater_low.png",color:"#291a3d"},
    {id:"1_skin_walko",cost:6500,name:"Walko",img:"walko_low.png",color:"#D40D00"},
    {id:"1_skin_calavera",cost:5200,name:"Calavera",img:"Calavera_low.png",color:"#236992"},
    {id:"1_skin_infernando",cost:3200,name:"Infernando",img:"Infernando_low.png",color:"#110819"},
    {id:"1_skin_vampire",cost:3500,name:"Vampire",img:"Vampire_low.png",color:"#7e0000"},
    {id:"1_skin_mummy",cost:2900,name:"Mummy",img:"Mummy_low.png",color:"#b2b2b2"},
    {id:"1_skin_werewolf",cost:1990,name:"Werewolf",img:"Werewolf_low.png",color:"#1e274c"},
    {id:"1_skin_phantom",cost:690,name:"Phantom",img:"Phantom_low.png",color:"#2c2c2c"},
    {id:"1_skin_undead",cost:490,name:"Undead",img:"Undead_low.png",color:"#0a092e"},
    {id:"1_skin_derpy_parasaurolophus",cost:3500,name:"Derpy Parasaurolophus",img:"derpy_parasaurolophus_low.png",color:"#15540E"},
    {id:"1_skin_derpy_triceratops",cost:2490,name:"Derpy Triceratops",img:"derpy_triceratops_low.png",color:"#00D0E3"},
    {id:"1_skin_derpy_dilophosaurus",cost:1390,name:"Derpy Dilophosaurus",img:"derpy_dilophosaurus_low.png",color:"#873400"},
    {id:"1_skin_krakenuts",cost:10000,name:"Krakenuts",img:"Krakenuts_low.png",color:"#0CFF00"},
    {id:"1_skin_skullberry",cost:5900,name:"Skullberry",img:"Skullberry_low.png",color:"#0CFF00"},
    {id:"1_skin_skeleton",cost:1990,name:"Skeleton",img:"Skeleton_low.png",color:"#000f04"},
    {id:"1_skin_skull_cactus",cost:690,name:"Skull Cactus",img:"Skull_Cactus_low.png",color:"#026d16"},
    {id:"1_skin_masked",cost:490,name:"Masked",img:"Masked_low.png",color:"#000000"},
    {id:"1_skin_black_dragon",cost:7000,name:"Black Dragon",img:"BlackDragon_low.png",color:"#000000"},
    {id:"1_skin_nightfury",cost:2500,name:"Nightfury",img:"Nightfury_low.png",color:"#000000"},
    {id:"1_skin_cyber_kid",cost:4900,name:"Cyber Kid",img:"SH_ArachnoKid_low.png",color:"#1b6281"},
    {id:"1_skin_iron_titan",cost:3320,name:"Iron Titan",img:"SH_IronKnight_low.png",color:"#310005"},
    {id:"1_skin_star_sentinel",cost:2900,name:"Star Sentinel",img:"SH_StarGirl_low.png",color:"#000000"},
    {id:"1_skin_the_tiger",cost:1990,name:"The Tiger",img:"SH_TigerMan_low.png",color:"#26881c"},
    {id:"1_skin_xray",cost:690,name:"Xray",img:"SH_X_Ray_low.png",color:"#74241a"},
    {id:"1_skin_major_eagle",cost:490,name:"Major Eagle",img:"SH_MajorEagle_low.png",color:"#00b2ea"},
    {id:"1_skin_leodroid",cost:8000,name:"Leodroid",img:"Leodroid_low.png",color:"#E50023"},
    {id:"1_skin_borggy",cost:5000,name:"Borggy",img:"Borggy_low.png",color:"#330F22"},
    {id:"1_skin_zapnaut",cost:3500,name:"Zapnaut",img:"Zapnaut_low.png",color:"#007EF0"},
    {id:"1_skin_the_grin",cost:5500,name:"The Grin",img:"TheGrin_low.png",color:"#283900"},
    {id:"1_skin_wendy_axe",cost:4000,name:"Wendy Axe",img:"WendyAxe_low.png",color:"#491F78"},
    {id:"1_skin_skelly",cost:3000,name:"Skelly",img:"Skelly_low.png",color:"#000559"},
    {id:"1_skin_ignis",cost:4900,name:"Ignis",img:"Ignis_low.png",color:"#270709"},
    {id:"1_skin_aer",cost:2900,name:"Aer",img:"Aer_low.png",color:"#486169"},
    {id:"1_skin_aqua",cost:1990,name:"Aqua",img:"Aqua_low.png",color:"#39bbd8"},
    {id:"1_skin_terra",cost:690,name:"Terra",img:"Terra_low.png",color:"#1e6725"},
    {id:"1_skin_creepy_cracker",cost:5500,name:"Creepy Cracker",img:"CreepyCracker_low.png",color:"#FFD800"},
    {id:"1_skin_gobbler",cost:4000,name:"Gobbler",img:"Gobbler_low.png",color:"#AE00FF"},
    {id:"1_skin_frenzy",cost:3000,name:"Frenzy",img:"Frenzy_low.png",color:"#00FF8A"},
    {id:"1_skin_steamworld_the_tinker",cost:6200,name:"Steamworld The Tinker",img:"steamworld_the_tinker_low.png",color:"#ffc706"},
    {id:"1_skin_sunflower",cost:4100,name:"Sunflower",img:"tms_sunflower_low.png",color:"#F8A40C"},
    {id:"1_skin_flying_cork",cost:3900,name:"Flying Cork",img:"new_year_2016_flying_cork_low.png",color:"#123826"},
    {id:"1_skin_happy",cost:2500,name:"Happy",img:"Happy_low.png",color:"#a90d5f"},
    {id:"1_skin_virginia",cost:1990,name:"Virginia",img:"Virginia_low.png",color:"#4a59e2"},
    {id:"1_skin_pilgrim",cost:690,name:"Pilgrim",img:"Pilgrim_low.png",color:"#311713"},
    {id:"1_skin_pie_slice",cost:690,name:"Pie Slice",img:"Pie_Slice_low.png",color:"#cd0000"},
    {id:"1_skin_mad_ramon",cost:7500,name:"Mad Ramon",img:"MadRamon_low.png",color:"#780B0B"},
    {id:"1_skin_dj_stice",cost:5200,name:"Dj Stice",img:"DJStice_low.png",color:"#FF5400"},
    {id:"1_skin_poppyns",cost:3800,name:"Poppyns",img:"Poppyns_low.png",color:"#FE57F9"},
    {id:"1_skin_agent_morel",cost:999999,name:"Agent Morel",img:"AgentMorel_low.png",color:"#E9FF2C"},
    {id:"1_skin_berserker",cost:4900,name:"Berserker",img:"Berserker_low.png",color:"#000000"},
    {id:"1_skin_icy_braid",cost:2900,name:"Icy Braid",img:"Icy_Braid_low.png",color:"#087f6e"},
    {id:"1_skin_viking",cost:1990,name:"Viking",img:"Viking_low.png",color:"#03151a"},
    {id:"1_skin_winter_wolf",cost:690,name:"Winter Wolf",img:"Winter_Wolf_low.png",color:"#324a5b"},
    {id:"1_skin_doomsday",cost:3300,name:"Doomsday",img:"doomsday_low.png",color:"#FF3600"},
    {id:"1_skin_world_end",cost:2390,name:"World End",img:"world_end_low.png",color:"#20CE99"},
    {id:"1_skin_reckoning",cost:1090,name:"Reckoning",img:"reckoning_low.png",color:"#FF364E"},
    {id:"1_skin_last_judgment",cost:890,name:"Last Judgment",img:"last_judgment_low.png",color:"#FFA200"},
    {id:"1_skin_magic_gerbil",cost:4900,name:"Magic Gerbil",img:"creatures_magic_gerbil_low.png",color:"#0f2158"},
    {id:"1_skin_firebird",cost:3320,name:"Firebird",img:"creatures_firebird_low.png",color:"#000000"},
    {id:"1_skin_basilisk",cost:2900,name:"Basilisk",img:"creatures_basilisk_low.png",color:"#1b6281"},
    {id:"1_skin_pixie",cost:1990,name:"Pixie",img:"creatures_pixie_low.png",color:"#3b2527"},
    {id:"1_skin_hobgoblin",cost:690,name:"Hobgoblin",img:"creatures_hobgoblin_low.png",color:"#310005"},
    {id:"1_skin_root_gnome",cost:490,name:"Root Gnome",img:"creatures_root_gnome_low.png",color:"#d7e644"},
    {id:"1_skin_cake_master",cost:3500,name:"Cake Master",img:"birthdaybonanza_cake_master_low.png",color:"#9C000B"},
    {id:"1_skin_pinata_warden",cost:2490,name:"Pinata Warden",img:"birthdaybonanza_pinata_warden_low.png",color:"#450A91"},
    {id:"1_skin_cyber_psychic",cost:3200,name:"Cyber Psychic",img:"august_merchant_cyber_psychic_low.png",color:"#4E0088"},
    {id:"1_skin_moon_ship",cost:2900,name:"Moon Ship",img:"dawn_moon_ship_low.png",color:"#000000"},
    {id:"1_skin_cosmo_pirate",cost:1990,name:"Cosmo Pirate",img:"dawn_cosmo_pirate_low.png",color:"#005ac6"},
    {id:"1_skin_star_pilot",cost:690,name:"Star Pilot",img:"dawn_star_pilot_low.png",color:"#04a4a4"},
    {id:"1_skin_cyber_guard",cost:850,name:"Cyber Guard",img:"dawn_cyber_guard_low.png",color:"#1b1b1b"},
    {id:"1_skin_harpy",cost:3500,name:"Harpy",img:"harpy_low.png",color:"#ff4f2e"},
    {id:"1_skin_thefaun",cost:2490,name:"Thefaun",img:"faun_low.png",color:"#ff7601"},
    {id:"1_skin_amphibian",cost:1390,name:"Amphibian",img:"amphibian_low.png",color:"#00d0e3"},
    {id:"1_skin_santa_claus",cost:3320,name:"Santa Claus",img:"xmas_2016_santa_claus_low.png",color:"#cd0000"},
    {id:"1_skin_elf_helper",cost:1990,name:"Elf Helper",img:"xmas_2016_elf_helper_low.png",color:"#4c1838"},
    {id:"1_skin_reindeer",cost:490,name:"Reindeer",img:"xmas_2016_reindeer_low.png",color:"#1a4534"},
    {id:"1_skin_street_bull",cost:3200,name:"Street Bull",img:"beast_fighters_bull_low.png",color:"#cf0000"},
    {id:"1_skin_rhino_boxer",cost:2100,name:"Rhino Boxer",img:"beast_fighters_rhino_low.png",color:"#363452"},
    {id:"1_skin_rogue_bunny",cost:1400,name:"Rogue Bunny",img:"beast_fighters_bunny_low.png",color:"#d50037"},
    {id:"1_skin_bruiser_goat",cost:1200,name:"Bruiser Goat",img:"beast_fighters_goat_low.png",color:"#00a8fa"},
    {id:"1_skin_cool_agent",cost:2900,name:"Cool Agent",img:"time_travel_cool_agent_low.png",color:"#e20000"},
    {id:"1_skin_chrono_ranger",cost:1990,name:"Chrono Ranger",img:"time_travel_chrono_ranger_low.png",color:"#ff4100"},
    {id:"1_skin_husky_brawl",cost:4900,name:"Husky Brawl",img:"beast_fighters_husky_low.png",color:"#f13004"},
    {id:"1_skin_pug",cost:3800,name:"Pug",img:"Pug_low.png",color:"#15250a"},
    {id:"1_skin_best_friends",cost:690,name:"Best Friends",img:"time_travel_best_friends_low.png",color:"#5de0ff"},
    {id:"1_skin_neon_bug",cost:5200,name:"Neon Bug",img:"retro_neon_bug_low.png",color:"#ff5ff9"},
    {id:"1_skin_dynamite_guy",cost:3200,name:"Dynamite Guy",img:"retro_dynamite_guy_low.png",color:"#0000ff"},
    {id:"1_skin_bubblesaurus",cost:2290,name:"Bubblesaurus",img:"retro_bubblesaurus_low.png",color:"#c8f7ff"},
    {id:"1_skin_duck_target",cost:990,name:"Duck Target",img:"retro_duck_target_low.png",color:"#000000"},
    {id:"1_skin_dumpling",cost:3100,name:"Dumpling",img:"chinese_new_year_dumpling_low.png",color:"#2f6ebc"},
    {id:"1_skin_china_dragon",cost:2190,name:"China Dragon",img:"chinese_new_year_china_dragon_low.png",color:"#fbaf29"},
    {id:"1_skin_carp",cost:890,name:"Carp",img:"chinese_new_year_carp_low.png",color:"#5de0ff"},
    {id:"1_skin_poet",cost:4500,name:"Poet",img:"rock_stars_poet_low.png",color:"#009dca"},
    {id:"1_skin_idol",cost:3200,name:"Idol",img:"rock_stars_idol_low.png",color:"#352265"},
    {id:"1_skin_rocker",cost:2500,name:"Rocker",img:"rock_stars_rocker_low.png",color:"#1c441e"},
    {id:"1_skin_virtuoso",cost:1800,name:"Virtuoso",img:"rock_stars_virtuoso_low.png",color:"#bd4449"},
    {id:"1_skin_heartbreaker",cost:750,name:"Heartbreaker",img:"rock_stars_heartbreaker_low.png",color:"#397bbf"},
    {id:"1_skin_king",cost:2900,name:"King",img:"master_of_thieves_king_low.png",color:"#006c9e"},
    {id:"1_skin_sheriff",cost:1990,name:"Sheriff",img:"master_of_thieves_sheriff_low.png",color:"#920000"},
    {id:"1_skin_thief",cost:690,name:"Thief",img:"master_of_thieves_thief_low.png",color:"#e58700"},
    {id:"1_skin_palm_tree",cost:690,name:"Palm Tree",img:"carnival_2017_palm_tree_low.png",color:"#00dfd7"},
    {id:"1_skin_songsmith",cost:2900,name:"Songsmith",img:"rock_legends_2_songsmith_low.png",color:"#b9ff75"},
    {id:"1_skin_diva",cost:1600,name:"Diva",img:"rock_legends_2_diva_low.png",color:"#dc0000"},
    {id:"1_skin_performer",cost:850,name:"Performer",img:"rock_legends_2_performer_low.png",color:"#fe31c2"},
    {id:"1_skin_behemoth",cost:2900,name:"Behemoth",img:"jungle_quest_behemoth_low.png",color:"#9fcd00"},
    {id:"1_skin_war_paint",cost:1990,name:"War Paint",img:"jungle_quest_war_paint_low.png",color:"#8c002f"},
    {id:"1_skin_huntsman",cost:690,name:"Huntsman",img:"jungle_quest_huntsman_low.png",color:"#38adb5"},
    {id:"1_skin_bad_clover",cost:2900,name:"Bad Clover",img:"st_patricks_2017_bad_clover_low.png",color:"#c11648"},
    {id:"1_skin_happy_hat",cost:1990,name:"Happy Hat",img:"st_patricks_2017_happy_hat_low.png",color:"#88be4c"},
    {id:"1_skin_horse_boot",cost:690,name:"Horse Boot",img:"st_patricks_2017_horse_boot_low.png",color:"#00b0ff"},
    {id:"1_skin_mystic_bird",cost:3100,name:"Mystic Bird",img:"excalibur_2017_mystic_bird_low.png",color:"#8a0303"},
    {id:"1_skin_seal_knight",cost:1990,name:"Seal Knight",img:"excalibur_2017_seal_knight_low.png",color:"#61c7d9"},
    {id:"1_skin_cat_cauldron",cost:1500,name:"Cat Cauldron",img:"excalibur_2017_cat_cauldron_low.png",color:"#f2d500"},
    {id:"1_skin_smelly",cost:4900,name:"Smelly",img:"april_fools_2017_smelly_low.png",color:"#93fa83"},
    {id:"1_skin_air_bag",cost:1990,name:"Air Bag",img:"april_fools_2017_air_bag_low.png",color:"#6df317"},
    {id:"1_skin_funny_face",cost:690,name:"Funny Face",img:"april_fools_2017_funny_face_low.png",color:"#7a3bc7"},
    {id:"1_skin_alien_tree",cost:2900,name:"Alien Tree",img:"space_pirates_alien_tree_low.png",color:"#0b69ed"},
    {id:"1_skin_power_badger",cost:1990,name:"Power Badger",img:"space_pirates_power_badger_low.png",color:"#56008b"},
    {id:"1_skin_starfighter",cost:690,name:"Starfighter",img:"space_pirates_starfighter_low.png",color:"#00fbff"},
    {id:"1_skin_primal",cost:2900,name:"Primal",img:"stone_age_primal_low.png",color:"#931114"},
    {id:"1_skin_silver_tusk",cost:1990,name:"Silver Tusk",img:"stone_age_silver_tusk_low.png",color:"#1ca2c4"},
    {id:"1_skin_sabertooth",cost:690,name:"Sabertooth",img:"stone_age_sabertooth_low.png",color:"#00d5f7"},
    {id:"1_skin_power_girl",cost:3100,name:"Power Girl",img:"anime_power_girl_low.png",color:"#222222"},
    {id:"1_skin_fallen",cost:2400,name:"Fallen",img:"anime_fallen_low.png",color:"#222222"},
    {id:"1_skin_wacky_hero",cost:950,name:"Wacky Hero",img:"anime_wacky_hero_low.png",color:"#222222"},
    {id:"1_skin_bat_ball",cost:2900,name:"Bat Ball",img:"pet_balls_bat_low.png",color:"#ffcc00"},
    {id:"1_skin_walrus_ball",cost:490,name:"Walrus Ball",img:"pet_balls_walrus_low.png",color:"#48f4ff"},
    {id:"1_skin_jellyfish_ball",cost:690,name:"Jellyfish Ball",img:"pet_balls_jellyfish_low.png",color:"#d241ff"},
    {id:"1_skin_universal_ranger",cost:2900,name:"Universal Ranger",img:"action_heroes_v2_universal_ranger_low.png",color:"#61c7d9"},
    {id:"1_skin_eclipse_hunter",cost:1990,name:"Eclipse Hunter",img:"action_heroes_v2_eclipse_hunter_low.png",color:"#14bc9c"},
    {id:"1_skin_apocalypse_rider",cost:690,name:"Apocalypse Rider",img:"action_heroes_v2_apocalypse_rider_low.png",color:"#cc1e1e"},
    {id:"1_skin_psycho_driller",cost:3320,name:"Psycho Driller",img:"mechanos_psycho_driller_low.png",color:"#760087"},
    {id:"1_skin_haste",cost:2900,name:"Haste",img:"mechanos_haste_low.png",color:"#04284e"},
    {id:"1_skin_cyber_scarab",cost:1990,name:"Cyber Scarab",img:"mechanos_cyber_scarab_low.png",color:"#780016"},
    {id:"1_skin_sonic_boom",cost:1400,name:"Sonic Boom",img:"mechanos_sonic_boom_low.png",color:"#1d97ca"},
    {id:"1_skin_steamworld_can_man",cost:6200,name:"Steamworld Can Man",img:"steamworld_can_man_low.png",color:"#d0c7ac"},
    {id:"1_skin_mr_boss",cost:2900,name:"Mr Boss",img:"independence_day_2017_mr_boss_low.png",color:"#a21414"},
    {id:"1_skin_celebration_hat",cost:1990,name:"Celebration Hat",img:"independence_day_2017_celebration_hat_low.png",color:"#61c7d9"},
    {id:"1_skin_star_eagle",cost:690,name:"Star Eagle",img:"independence_day_2017_star_eagle_low.png",color:"#ef0a0a"},
    {id:"1_skin_reptilian",cost:4500,name:"Reptilian",img:"gladiators_reptilian_low.png",color:"#ff131f"},
    {id:"1_skin_gladiatrix",cost:1990,name:"Gladiatrix",img:"gladiators_gladiatrix_low.png",color:"#00c0c7"},
    {id:"1_skin_helm",cost:690,name:"Helm",img:"gladiators_helm_low.png",color:"#007cfc"},
    {id:"1_skin_amazed",cost:4900,name:"Amazed",img:"birthday_2017_1_amazed_low.png",color:"#000000"},
    {id:"1_skin_bitter",cost:3500,name:"Bitter",img:"birthday_2017_1_bitter_low.png",color:"#000000"},
    {id:"1_skin_sad",cost:2900,name:"Sad",img:"birthday_2017_1_sad_low.png",color:"#000000"},
    {id:"1_skin_lovesick",cost:1990,name:"Lovesick",img:"birthday_2017_1_lovesick_low.png",color:"#000000"},
    {id:"1_skin_queasy",cost:2490,name:"Queasy",img:"birthday_2017_1_queasy_low.png",color:"#000000"},
    {id:"1_skin_mischievous",cost:3500,name:"Mischievous",img:"birthday_2017_2_mischievous_low.png",color:"#000000"},
    {id:"1_skin_tough",cost:3500,name:"Tough",img:"birthday_2017_2_tough_low.png",color:"#000000"},
    {id:"1_skin_full",cost:2490,name:"Full",img:"birthday_2017_2_full_low.png",color:"#000000"},
    {id:"1_skin_wicked",cost:1990,name:"Wicked",img:"birthday_2017_2_wicked_low.png",color:"#000000"},
    {id:"1_skin_sweaty",cost:2490,name:"Sweaty",img:"birthday_2017_2_sweaty_low.png",color:"#000000"},
    {id:"1_skin_zombie_dog",cost:2900,name:"Zombie Dog",img:"zombie_party_zombie_dog_low.png",color:"#0098d2"},
    {id:"1_skin_crazy_brain",cost:1990,name:"Crazy Brain",img:"zombie_party_crazy_brain_low.png",color:"#00ca23"},
    {id:"1_skin_dry_face",cost:690,name:"Dry Face",img:"zombie_party_dry_face_low.png",color:"#7dfece"},
    {id:"1_skin_mage",cost:3320,name:"Mage",img:"rpg_games_mage_low.png",color:"#30e4fb"},
    {id:"1_skin_paladin",cost:2900,name:"Paladin",img:"rpg_games_paladin_low.png",color:"#94fff8"},
    {id:"1_skin_archer",cost:1990,name:"Archer",img:"rpg_games_archer_low.png",color:"#55a602"},
    {id:"1_skin_rogue",cost:690,name:"Rogue",img:"rpg_games_rogue_low.png",color:"#ff610a"},
    {id:"1_skin_war_tank",cost:2900,name:"War Tank",img:"arcade_games_war_tank_low.png",color:"#a7cb0c"},
    {id:"1_skin_super_car",cost:1990,name:"Super Car",img:"arcade_games_super_car_low.png",color:"#8affff"},
    {id:"1_skin_gold_coin",cost:690,name:"Gold Coin",img:"arcade_games_gold_coin_low.png",color:"#e96901"},
    {id:"1_skin_olympus_medusa",cost:2200,name:"Olympus Medusa",img:"olympus_medusa_low.png",color:"#2aff5f"},
    {id:"1_skin_olympus_poseidon",cost:690,name:"Olympus Poseidon",img:"olympus_poseidon_low.png",color:"#9a43ff"},
    {id:"1_skin_olympus_hercules",cost:490,name:"Olympus Hercules",img:"olympus_hercules_low.png",color:"#53311a"},
    {id:"1_skin_nvr_insectoid",cost:1900,name:"Nvr Insectoid",img:"nvr_insectoid_low.png",color:"#283a4e"},
    {id:"1_skin_nvr_silent_fox",cost:690,name:"Nvr Silent Fox",img:"nvr_silent_fox_low.png",color:"#ab9a57"},
    {id:"1_skin_nvr_zap",cost:490,name:"Nvr Zap",img:"nvr_zap_low.png",color:"#130ecd"},
    {id:"1_skin_steamworld_steam_freak",cost:1900,name:"Steamworld Steam Freak",img:"steamworld_steam_freak_low.png",color:"#ff6c00"},
    {id:"1_skin_steamworld_dr_static",cost:690,name:"Steamworld Dr Static",img:"steamworld_dr_static_low.png",color:"#ff131f"},
    {id:"1_skin_steamworld_cogs",cost:490,name:"Steamworld Cogs",img:"steamworld_cogs_low.png",color:"#fff500"},
    {id:"1_skin_dragon_hydra",cost:1900,name:"Dragon Hydra",img:"dragon_hydra_low.png",color:"#2ef600"},
    {id:"1_skin_dragon_twin",cost:690,name:"Dragon Twin",img:"dragon_twin_low.png",color:"#00d8ff"},
    {id:"1_skin_dragon_griffin",cost:490,name:"Dragon Griffin",img:"dragon_griffin_low.png",color:"#ff0000"},
    {id:"1_skin_happy_soda",cost:5500,name:"Happy Soda",img:"new_year_2016_happy_soda_low.png",color:"#77ee11"},
    {id:"1_skin_egypt_egyptian_cat",cost:2900,name:"Egypt Egyptian Cat",img:"egypt_egyptian_cat_low.png",color:"#6BBDC7"},
    {id:"1_skin_egypt_pharaoh",cost:1990,name:"Egypt Pharaoh",img:"egypt_pharaoh_low.png",color:"#7C0002"},
    {id:"1_skin_egypt_cleopatra",cost:690,name:"Egypt Cleopatra",img:"egypt_cleopatra_low.png",color:"#F6E45F"},
    {id:"1_skin_egypt_ankh",cost:490,name:"Egypt Ankh",img:"egypt_ankh_low.png",color:"#5A00E6"},
    {id:"1_skin_geisha",cost:2300,name:"Geisha",img:"samurai_geisha_low.png",color:"#0042ff"},
    {id:"1_skin_elder_master",cost:1090,name:"Elder Master",img:"samurai_elder_master_low.png",color:"#038200"},
    {id:"1_skin_shogun",cost:890,name:"Shogun",img:"samurai_shogun_low.png",color:"#ff131f"},
    {id:"1_skin_moonlight_banshee",cost:1900,name:"Moonlight Banshee",img:"moonlight_banshee_low.png",color:"#00d587"},
    {id:"1_skin_moonlight_psycho",cost:690,name:"Moonlight Psycho",img:"moonlight_psycho_low.png",color:"#c70200"},
    {id:"1_skin_moonlight_metal_ghoul",cost:490,name:"Moonlight Metal Ghoul",img:"moonlight_metal_ghoul_low.png",color:"#038200"},
    {id:"1_skin_sunkey",cost:4000,name:"Sunkey",img:"Sunkey_low.png",color:"#222222"},
    {id:"1_skin_elBillion",cost:2300,name:"Elbillion",img:"ElBillion_low.png",color:"#222222"},
    {id:"1_skin_jaja",cost:1450,name:"Jaja",img:"Jaja_low.png",color:"#222222"},
    {id:"1_skin_bolt_samurai",cost:2200,name:"Bolt Samurai",img:"anime_bolt_samurai_low.png",color:"#222222"},
    {id:"1_skin_spinner_kid",cost:990,name:"Spinner Kid",img:"anime_spinner_kid_low.png",color:"#222222"},
    {id:"1_skin_mega_mecha",cost:850,name:"Mega Mecha",img:"anime_mega_mecha_low.png",color:"#222222"},
    {id:"1_skin_brooklyn",cost:3900,name:"Brooklyn",img:"Brooklyn_low.png",color:"#222222"},
    {id:"1_skin_baldman",cost:2100,name:"Baldman",img:"Baldman_low.png",color:"#222222"},
    {id:"1_skin_hunter_z",cost:1900,name:"Hunter Z",img:"HunterZ_low.png",color:"#222222"},
    {id:"1_skin_hello_reaper",cost:6500,name:"Hello Reaper",img:"HelloReaper_low.png",color:"#E10000"},
    {id:"1_skin_pumpkitty",cost:4500,name:"Pumpkitty",img:"Pumpkitty_low.png",color:"#AE0063"},
    {id:"1_skin_ghosties",cost:2500,name:"Ghosties",img:"Ghosties_low.png",color:"#9F9CFF"},
    {id:"1_skin_winter_goofy_yeti",cost:1900,name:"Winter Goofy Yeti",img:"winter_goofy_yeti_low.png",color:"#55ad14"},
    {id:"1_skin_winter_white_owl",cost:690,name:"Winter White Owl",img:"winter_white_owl_low.png",color:"#53554e"},
    {id:"1_skin_winter_snowboarder",cost:490,name:"Winter Snowboarder",img:"winter_snowboarder_low.png",color:"#61c7d9"},
    {id:"1_skin_the_oracle",cost:3200,name:"The Oracle",img:"circus_the_oracle_low.png",color:"#ff8a00"},
    {id:"1_skin_firespitter",cost:2290,name:"Firespitter",img:"circus_firespitter_low.png",color:"#ff131f"},
    {id:"1_skin_burly_man",cost:990,name:"Burly Man",img:"circus_burly_man_low.png",color:"#0084ff"},
    {id:"1_skin_ringmaster",cost:790,name:"Ringmaster",img:"circus_ringmaster_low.png",color:"#006e3d"},
    {id:"1_skin_the_reaper",cost:2900,name:"The Reaper",img:"apocalypse_the_reaper_low.png",color:"#233a91"},
    {id:"1_skin_the_scorcher",cost:1990,name:"The Scorcher",img:"apocalypse_the_scorcher_low.png",color:"#ac0b00"},
    {id:"1_skin_the_miasma",cost:690,name:"The Miasma",img:"apocalypse_the_miasma_low.png",color:"#00ac35"},
    {id:"1_skin_the_gaunt",cost:490,name:"The Gaunt",img:"apocalypse_the_gaunt_low.png",color:"#9112bb"},
    {id:"1_skin_zany_tree",cost:2300,name:"Zany Tree",img:"santa_zany_tree_low.png",color:"#58cc25"},
    {id:"1_skin_raspy_elf",cost:1090,name:"Raspy Elf",img:"santa_raspy_elf_low.png",color:"#6bb4ff"},
    {id:"1_skin_mad_cap",cost:890,name:"Mad Cap",img:"santa_mad_cap_low.png",color:"#d90000"},
    {id:"1_skin_last_master_duel_master",cost:2700,name:"Last Master Duel Master",img:"last_master_duel_master_low.png",color:"#ff0000"},
    {id:"1_skin_last_master_roller_bot",cost:1490,name:"Last Master Roller Bot",img:"last_master_roller_bot_low.png",color:"#ffd43e"},
    {id:"1_skin_last_master_space_warrior",cost:1290,name:"Last Master Space Warrior",img:"last_master_space_warrior_low.png",color:"#0084ff"},
    {id:"1_skin_gouache",cost:1900,name:"Gouache",img:"artshop_gouache_low.png",color:"#a7f5ff"},
    {id:"1_skin_splatter",cost:690,name:"Splatter",img:"artshop_splatter_low.png",color:"#fff500"},
    {id:"1_skin_pencil",cost:490,name:"Pencil",img:"artshop_pencil_low.png",color:"#d91e22"},
    {id:"1_skin_future_art",cost:1900,name:"Future Art",img:"future_art_low.png",color:"#a000ac"},
    {id:"1_skin_cave_painting",cost:690,name:"Cave Painting",img:"cave_painting_low.png",color:"#e3dd58"},
    {id:"1_skin_walrus_art",cost:490,name:"Walrus Art",img:"walrus_art_low.png",color:"#009fab"},
    {id:"1_skin_crazy_eye",cost:1900,name:"Crazy Eye",img:"darkdimension_crazyeye_low.png",color:"#e526cb"},
    {id:"1_skin_cave_troll",cost:690,name:"Cave Troll",img:"darkdimension_cavetroll_low.png",color:"#044c42"},
    {id:"1_skin_nice_doggy",cost:490,name:"Nice Doggy",img:"darkdimension_nicedoggy_low.png",color:"#12628f"},
    {id:"1_skin_furious",cost:1900,name:"Furious",img:"som_furious_low.png",color:"#25FA9D"},
    {id:"1_skin_cool_guy",cost:690,name:"Cool Guy",img:"som_coolguy_low.png",color:"#FF8417"},
    {id:"1_skin_circle",cost:490,name:"Circle",img:"som_circle_low.png",color:"#A956BE"},
    {id:"1_skin_shadow_man",cost:1900,name:"Shadow Man",img:"darkdimension_shadowman_low.png",color:"#5dd23f"},
    {id:"1_skin_infernus",cost:690,name:"Infernus",img:"darkdimension_infernus_low.png",color:"#91aaff"},
    {id:"1_skin_flying_saucer",cost:490,name:"Flying Saucer",img:"darkdimension_flyingsaucer_low.png",color:"#e92830"},
    {id:"1_skin_big_eyes",cost:1900,name:"Big Eyes",img:"som_bigeyes_low.png",color:"#4DABFF"},
    {id:"1_skin_necktie_cat",cost:3200,name:"Necktie Cat",img:"som_necktiecat_low.png",color:"#8AFE31"},
    {id:"1_skin_tea_time",cost:490,name:"Tea Time",img:"som_teatime_low.png",color:"#F42C00"},
    {id:"1_skin_pyramid_eye",cost:1900,name:"Pyramid Eye",img:"darkdimension_pyramideye_low.png",color:"#FACF50"},
    {id:"1_skin_eternal_snake",cost:690,name:"Eternal Snake",img:"darkdimension_eternalsnake_low.png",color:"#DEEA00"},
    {id:"1_skin_wolf_sigil",cost:490,name:"Wolf Sigil",img:"darkdimension_wolfsigil_low.png",color:"#051940"},
    {id:"1_skin_chirpy_raptor",cost:1900,name:"Chirpy Raptor",img:"som_chirpyraptor_low.png",color:"#BEE813"},
    {id:"1_skin_grandma",cost:690,name:"Grandma",img:"som_grandma_low.png",color:"#3384FE"},
    {id:"1_skin_theorist",cost:490,name:"Theorist",img:"som_theorist_low.png",color:"#F27301"},
    {id:"1_skin_radical_hand",cost:1900,name:"Radical Hand",img:"darkdimension_radicalsmile_low.png",color:"#2E2900"},
    {id:"1_skin_frost_hand",cost:690,name:"Frost Hand",img:"darkdimension_frosthand_low.png",color:"#322E48"},
    {id:"1_skin_omega",cost:490,name:"Omega",img:"darkdimension_omega_low.png",color:"#400201"},
    {id:"1_skin_clever",cost:2500,name:"Clever",img:"skinomatic_v4_clever_low.png",color:"#F2B949"},
    {id:"1_skin_idea",cost:690,name:"Idea",img:"skinomatic_v4_idea_low.png",color:"#41CF5A"},
    {id:"1_skin_surprised_cat",cost:5600,name:"Surprised Cat",img:"skinomatic_v4_surprised_cat_low.png",color:"#F67000"},
    {id:"1_skin_helmet",cost:1900,name:"Helmet",img:"darkdimension_helmet_low.png",color:"#420303"},
    {id:"1_skin_wolf_paw",cost:690,name:"Wolf Paw",img:"darkdimension_wolfpaw_low.png",color:"#313246"},
    {id:"1_skin_lead",cost:490,name:"Lead",img:"darkdimension_lead_low.png",color:"#312900"},
    {id:"1_skin_wacky_hyena",cost:1900,name:"Wacky Hyena",img:"skinomatic_v5_wacky_hyena_low.png",color:"#F00000"},
    {id:"1_skin_prankster",cost:4500,name:"Prankster",img:"skinomatic_v5_prankster_low.png",color:"#DC04FF"},
    {id:"1_skin_heavy_metal",cost:1200,name:"Heavy Metal",img:"skinomatic_v5_heavy_metal_low.png",color:"#1409C7"},
    {id:"1_skin_demonic_helmet",cost:1900,name:"Demonic Helmet",img:"darkdimension_demonic_helmet_low.png",color:"#323D9E"},
    {id:"1_skin_golden_axe",cost:690,name:"Golden Axe",img:"darkdimension_golden_axe_low.png",color:"#C73900"},
    {id:"1_skin_ice_griffin",cost:490,name:"Ice Griffin",img:"darkdimension_ice_griffin_low.png",color:"#84CAFF"},
    {id:"1_skin_birthosaur",cost:1900,name:"Birthosaur",img:"birthosaur_low.png",color:"#1409C7"},
    {id:"1_skin_tooth_troll",cost:4900,name:"Tooth Troll",img:"tooth_troll_low.png",color:"#4B2D01"},
    {id:"1_skin_grumpy_frog",cost:7000,name:"Grumpy Frog",img:"grumpy_frog_low.png",color:"#DD8600"},
    {id:"1_skin_egyptian_plague",cost:1900,name:"Egyptian Plague",img:"darkdimension_egyptian_plague_low.png",color:"#430001"},
    {id:"1_skin_killer_mask",cost:690,name:"Killer Mask",img:"darkdimension_killer_mask_low.png",color:"#2E2803"},
    {id:"1_skin_death_mouse",cost:490,name:"Death Mouse",img:"darkdimension_death_mouse_low.png",color:"#2E2F4B"},
    {id:"1_skin_mutant_herb",cost:4900,name:"Mutant Herb",img:"bountyhunter_mutant_herb_low.png",color:"#60A700"},
    {id:"1_skin_neptunus_spider",cost:2900,name:"Neptunus Spider",img:"bountyhunter_neptunus_spider_low.png",color:"#DE4B3C"},
    {id:"1_skin_dark_sorceress",cost:4900,name:"Dark Sorceress",img:"fantasy_portal_dark_sorceress_low.png",color:"#0229A7"},
    {id:"1_skin_princess_swift",cost:2900,name:"Princess Swift",img:"fantasy_portal_princess_swift_low.png",color:"#F37551"},
    {id:"1_skin_awkward",cost:4200,name:"Awkward",img:"skinomatic_awkward_low.png",color:"#FDF436"},
    {id:"1_skin_bad_pigeon",cost:1600,name:"Bad Pigeon",img:"skinomatic_bad_pigeon_low.png",color:"#2ADEFD"},
    {id:"1_skin_guinea_pig",cost:490,name:"Guinea Pig",img:"skinomatic_guinea_pig_low.png",color:"#21D326"},
    {id:"1_skin_defiled_scarecrow",cost:1900,name:"Defiled Scarecrow",img:"darkdimension_defiled_scarecrow_low.png",color:"#3A2900"},
    {id:"1_skin_midnight_yeti",cost:690,name:"Midnight Yeti",img:"darkdimension_midnight_yeti_low.png",color:"#420604"},
    {id:"1_skin_fallen_one",cost:490,name:"Fallen One",img:"darkdimension_fallen_one_low.png",color:"#312F48"},
    {id:"1_skin_metal_scorpion",cost:4900,name:"Metal Scorpion",img:"bountyhunter_metal_scorpion_low.png",color:"#334CF6"},
    {id:"1_skin_leech",cost:2900,name:"Leech",img:"bountyhunter_leech_low.png",color:"#9C0B0F"},
    {id:"1_skin_goddess_aona",cost:5300,name:"Goddess Aona",img:"goddess_aona_low.png",color:"#60D6E4"},
    {id:"1_skin_zula_gorgon",cost:3300,name:"Zula Gorgon",img:"zula_gorgan_low.png",color:"#8DC529"},
    {id:"1_skin_mr_charming",cost:1900,name:"Mr Charming",img:"mr_charming_low.png",color:"#F70616"},
    {id:"1_skin_mr_puzzled",cost:690,name:"Mr Puzzled",img:"mr_puzzled_low.png",color:"#2595DA"},
    {id:"1_skin_mr_strange",cost:490,name:"Mr Strange",img:"mr_strange_low.png",color:"#5AAC01"},
    {id:"1_skin_cursed_samurai",cost:1900,name:"Cursed Samurai",img:"darkdimension_cursed_samurai_low.png",color:"#302E49"},
    {id:"1_skin_fire_golem",cost:690,name:"Fire Golem",img:"darkdimension_fire_golem_low.png",color:"#3F0503"},
    {id:"1_skin_spectral_owl",cost:490,name:"Spectral Owl",img:"darkdimension_spectral_owl_low.png",color:"#2F2A04"},
    {id:"1_skin_araneaphyx",cost:2900,name:"Araneaphyx",img:"araneaphyx_low.png",color:"#FFED00"},
    {id:"1_skin_necro_strangler",cost:4900,name:"Necro Strangler",img:"necro_strangler_low.png",color:"#CE2226"},
    {id:"1_skin_ironfist_titus",cost:5300,name:"Ironfist Titus",img:"ironfist_titus_low.png",color:"#C8160F"},
    {id:"1_skin_wisgarus_dragonslayer",cost:3300,name:"Wisgarus Dragonslayer",img:"wisgarus_dragonslayer_low.png",color:"#0066FF"},
    {id:"1_skin_dracool",cost:1900,name:"Dracool",img:"dracool_low.png",color:"#DA0A04"},
    {id:"1_skin_blobby_boy",cost:690,name:"Blobby Boy",img:"blobby_boy_low.png",color:"#779924"},
    {id:"1_skin_frankie",cost:490,name:"Frankie",img:"frankie_low.png",color:"#00B04B"},
    {id:"1_skin_eleanor_of_light",cost:4900,name:"Eleanor Of Light",img:"eleanor_of_light_low.png",color:"#55DDEF"},
    {id:"1_skin_masked_menace",cost:2900,name:"Masked Menace",img:"masked_menace_low.png",color:"#8F02B6"},
    {id:"1_skin_cool_bunny",cost:5100,name:"Cool Bunny",img:"easter_2017_cool_bunny_low.png",color:"#d7006f"},
    {id:"1_skin_color_runner",cost:1900,name:"Color Runner",img:"color_runner_low.png",color:"#e82483"},
    {id:"1_skin_purple_hacker",cost:690,name:"Purple Hacker",img:"purple_hacker_low.png",color:"#3d277f"},
    {id:"1_skin_rainbow_slap",cost:490,name:"Rainbow Slap",img:"rainbow_slap_low.png",color:"#3551fe"},
    {id:"1_skin_techno_kat",cost:4500,name:"Techno Kat",img:"august_merchant_techno_kat_low.png",color:"#A872E7"},
    {id:"1_skin_chilled_homie",cost:4100,name:"Chilled Homie",img:"chilled_homie_low.png",color:"#FFC600"},
    {id:"1_skin_baddie",cost:3500,name:"Baddie",img:"baddie_low.png",color:"#1C1420"},
    {id:"1_skin_swag_royalty",cost:2900,name:"Swag Royalty",img:"swag_royalty_low.png",color:"#5E6D1E"},
    {id:"1_skin_bad_bone",cost:1900,name:"Bad Bone",img:"bad_bone_low.png",color:"#23127C"},
    {id:"1_skin_cyborg_clown",cost:6500,name:"Cyborg Clown",img:"cyborg_clown_low.png",color:"#00993d"},
    {id:"1_skin_electro_chick",cost:5500,name:"Electro Chick",img:"electro_chick_low.png",color:"#ffde00"},
    {id:"1_skin_bunnytron",cost:4500,name:"Bunnytron",img:"bunnytron_low.png",color:"#e5052a"},
    {id:"1_skin_drumstick",cost:920,name:"Drumstick",img:"food_Chicken_Leg_low.png",color:"#072a4e"},
    {id:"1_skin_toco",cost:6500,name:"Toco",img:"rio_toco_low.png",color:"#00382f"},
    {id:"1_skin_nuke",cost:6100,name:"Nuke",img:"Dead_Nuke_low.png",color:"#4a0808"},
    {id:"1_skin_techno_quack",cost:5500,name:"Techno Quack",img:"august_merchant_techno_quack_low.png",color:"#880008"},
    {id:"1_skin_wicked_cat",cost:5400,name:"Wicked Cat",img:"friday_the_13th_2017_wicked_cat_low.png",color:"#420000"},
    {id:"1_skin_giant_skull",cost:5100,name:"Giant Skull",img:"jungle_quest_giant_skull_low.png",color:"#6301c6"},
    {id:"1_skin_mechatron",cost:5000,name:"Mechatron",img:"mechanos_mechatron_low.png",color:"#441297"},
    {id:"1_skin_angry",cost:2900,name:"Angry",img:"birthday_2017_1_angry_low.png",color:"#000000"},
    {id:"1_skin_vicious",cost:2600,name:"Vicious",img:"birthday_2017_1_vicious_low.png",color:"#000000"},
    {id:"1_skin_rabid",cost:3200,name:"Rabid",img:"birthday_2017_2_rabid_low.png",color:"#000000"},
    {id:"1_skin_raid_boss",cost:5700,name:"Raid Boss",img:"rpg_games_raid_boss_low.png",color:"#379aff"},
    {id:"1_skin_giant_human",cost:3200,name:"Giant Human",img:"anime_giant_human_low.png",color:"#222222"},
    {id:"1_skin_alone",cost:5100,name:"Alone",img:"meme_alone_low.png",color:"#2cccff"},
    {id:"1_skin_yuno",cost:6700,name:"Yuno",img:"meme_yuno_low.png",color:"#fff977"},
    {id:"1_skin_rage",cost:7900,name:"Rage",img:"meme_rage_low.png",color:"#006149"},
    {id:"1_skin_silly_griffin",cost:5100,name:"Silly Griffin",img:"tms_sillygriffin_low.png",color:"#CE1104"},
    {id:"1_skin_deathly_mine",cost:4500,name:"Deathly Mine",img:"july_merchant_v1_deathly_mine_low.png",color:"#E6262D"},
    {id:"1_skin_bull_skull",cost:3800,name:"Bull Skull",img:"may_merchant_v1_bull_skull_low.png",color:"#A11100"},
    {id:"1_skin_skull_swords",cost:5000,name:"Skull Swords",img:"mjzs_skullswords_low.png",color:"#F10000"},
    {id:"1_skin_jelly_diver",cost:2600,name:"Jelly Diver",img:"mjzs_jellydiver_low.png",color:"#40B6FF"},
    {id:"1_skin_mecha_parrot",cost:7200,name:"Mecha Parrot",img:"july_merchant_v2_mecha_parrot_low.png",color:"#49D002"},
    {id:"1_skin_guardian",cost:5300,name:"Guardian",img:"guardian_low.png",color:"#E90000"},
    {id:"1_skin_gryphon",cost:4500,name:"Gryphon",img:"creatures_gryphon_low.png",color:"#050a50"},
    {id:"1_skin_bewitched",cost:2100,name:"Bewitched",img:"bewitched_low.png",color:"#0090BE"},
    {id:"1_skin_monday_worker",cost:2700,name:"Monday Worker",img:"monday_worker_low.png",color:"#FE1515"},
    {id:"1_skin_nightmare",cost:1600,name:"Nightmare",img:"nightmare_low.png",color:"#00D98A"},
    {id:"1_skin_big_banjo",cost:4200,name:"Big Banjo",img:"big_banjo_low.png",color:"#FEA741"},
    {id:"1_skin_chihuahua",cost:2100,name:"Chihuahua",img:"Chihuahua_low.png",color:"#0aa4d6"},
    {id:"1_skin_trickster",cost:5000,name:"Trickster",img:"carnival_2017_trickster_low.png",color:"#0036ff"},
    {id:"1_skin_maracas",cost:4500,name:"Maracas",img:"cinco_mayo_2017_maracas_low.png",color:"#00eaf9"},
    {id:"1_skin_golden_mask",cost:3400,name:"Golden Mask",img:"carnival_2017_golden_mask_low.png",color:"#c90042"},
    {id:"1_skin_electronic_girl",cost:3100,name:"Electronic Girl",img:"merchant_electronic_girl_low.png",color:"#44C3FF"},
    {id:"1_skin_samba",cost:1990,name:"Samba",img:"carnival_2017_samba_low.png",color:"#f1dc42"},
    {id:"1_skin_mountain",cost:2900,name:"Mountain",img:"carnival_2017_mountain_low.png",color:"#f510c7"},
    {id:"1_skin_dust_brain",cost:470,name:"Dust Brain",img:"Mummy_Ball_low.png",color:"#2aa15d"},
    {id:"1_skin_oculus_orbus",cost:680,name:"Oculus Orbus",img:"Eye_Ball_low.png",color:"#9b9d9f"},
    {id:"1_skin_screamin_meamie",cost:1970,name:"Screamin Meamie",img:"BaseballSmile_Ball_low.png",color:"#267c1e"},
    {id:"1_skin_hornhead",cost:3190,name:"Hornhead",img:"Cyclop_Ball_low.png",color:"#6b3462"},
    {id:"1_skin_skull_face",cost:4450,name:"Skull Face",img:"SkullBrain_Ball_low.png",color:"#6697ef"},
    {id:"1_skin_tender_heart_bear",cost:450,name:"Tender Heart Bear",img:"TenderHeart_Bear_low.png",color:"#BC4200"},
    {id:"1_skin_funshine_bear",cost:670,name:"Funshine Bear",img:"FunShine_Bear_low.png",color:"#CF801E"},
    {id:"1_skin_bright_heart_raccoon",cost:1920,name:"Bright Heart Raccoon",img:"BrightHeart_Racoon_low.png",color:"#392A7D"},
    {id:"1_skin_cozy_heart_penguin",cost:2990,name:"Cozy Heart Penguin",img:"CozyHeart_Penguin_low.png",color:"#76B1E4"},
    {id:"1_skin_lotsa_heart_elephant",cost:3370,name:"Lotsa Heart Elephant",img:"LotsaHeart_Elephant_low.png",color:"#B90E78"},
    {id:"1_skin_brave_heart_lion",cost:4890,name:"Brave Heart Lion",img:"BraveHeart_Lion_low.png",color:"#804203"},
    {id:"1_skin_party_mode",cost:50,name:"Party Mode",img:"party_mode_low.png",color:"#fbf4bd"},
    {id:"1_skin_venus",cost:250,name:"Venus",img:"Venus_low.png",color:"#654217"},
    {id:"1_skin_mercury",cost:270,name:"Mercury",img:"Mercury_low.png",color:"#654217"},
    {id:"1_skin_banana",cost:290,name:"Banana",img:"Banana_low.png",color:"#004F0F"},
    {id:"1_skin_birdie",cost:540,name:"Birdie",img:"Birdie_low.png",color:"#004F0F"},
    {id:"1_skin_ufo",cost:570,name:"Ufo",img:"UFO_low.png",color:"#28738c"},
    {id:"1_skin_apple",cost:590,name:"Apple",img:"Apple_low.png",color:"#004F0F"},
    {id:"1_skin_tigerpattern",cost:650,name:"Tigerpattern",img:"Tiger_Pattern_low.png",color:"#654217"},
    {id:"1_skin_shuttle",cost:750,name:"Shuttle",img:"Shuttle_low.png",color:"#2391d7"},
    {id:"1_skin_cookie",cost:890,name:"Cookie",img:"Cookie_low.png",color:"#654217"},
    {id:"1_skin_jupiter",cost:900,name:"Jupiter",img:"Jupiter_low.png",color:"#654217"},
    {id:"1_skin_good",cost:980,name:"Good",img:"Good_low.png",color:"#002C6C"},
    {id:"1_skin_neptune",cost:990,name:"Neptune",img:"Neptune_low.png",color:"#002C6C"},
    {id:"1_skin_blackhole",cost:1190,name:"Blackhole",img:"Blackhole_low.png",color:"#000000"},
    {id:"1_skin_uranus",cost:1250,name:"Uranus",img:"Uranus_low.png",color:"#002C6C"},
    {id:"1_skin_starball",cost:1290,name:"Starball",img:"Starball_low.png",color:"#7c0001"},
    {id:"1_skin_target",cost:1350,name:"Target",img:"Target_low.png",color:"#838383"},
    {id:"1_skin_galaxy",cost:1390,name:"Galaxy",img:"Galaxy_low.png",color:"#000000"},
    {id:"1_skin_breakfast",cost:1450,name:"Breakfast",img:"Breakfast_low.png",color:"#838383"},
    {id:"1_skin_saturn",cost:1470,name:"Saturn",img:"Saturn_low.png",color:"#4E114E"},
    {id:"1_skin_pluto",cost:1490,name:"Pluto",img:"Pluto_low.png",color:"#4E114E"},
    {id:"1_skin_hotdog",cost:1590,name:"Hotdog",img:"Hot_Dog_low.png",color:"#838383"},
    {id:"1_skin_heart",cost:1690,name:"Heart",img:"Heart_low.png",color:"#AC0875"},
    {id:"1_skin_mouse",cost:1750,name:"Mouse",img:"Mouse_low.png",color:"#654217"},
    {id:"1_skin_wolf",cost:1790,name:"Wolf",img:"Wolf_low.png",color:"#4E114E"},
    {id:"1_skin_goldfish",cost:1850,name:"Goldfish",img:"Goldfish_low.png",color:"#002C6C"},
    {id:"1_skin_rocket",cost:1890,name:"Rocket",img:"Rocket_low.png",color:"#34044a"},
    {id:"1_skin_pig",cost:1950,name:"Pig",img:"pig_low.png",color:"#AC0875"},
    {id:"1_skin_blueberry",cost:2150,name:"Blueberry",img:"Blueberry_Face_low.png",color:"#002C6C"},
    {id:"1_skin_bomb",cost:2250,name:"Bomb",img:"Bomb_low.png",color:"#000000"},
    {id:"1_skin_bowling",cost:2290,name:"Bowling",img:"Bowling_low.png",color:"#000000"},
    {id:"1_skin_candy",cost:2350,name:"Candy",img:"Candy_low.png",color:"#AC0875"},
    {id:"1_skin_frog",cost:2390,name:"Frog",img:"Frog_low.png",color:"#004F0F"},
    {id:"1_skin_hamburguer",cost:2450,name:"Hamburguer",img:"Hamburguer_low.png",color:"#654217"},
    {id:"1_skin_nose",cost:2490,name:"Nose",img:"Nose_low.png",color:"#AC0875"},
    {id:"1_skin_seal",cost:2550,name:"Seal",img:"Seal_low.png",color:"#004F0F"},
    {id:"1_skin_panda",cost:2650,name:"Panda",img:"Panda_low.png",color:"#000000"},
    {id:"1_skin_pizza",cost:2690,name:"Pizza",img:"Pizza_low.png",color:"#7c0001"},
    {id:"1_skin_snowman",cost:2750,name:"Snowman",img:"Snowman_low.png",color:"#002C6C"},
    {id:"1_skin_sun",cost:2850,name:"Sun",img:"Sun_low.png",color:"#7c0001"},
    {id:"1_skin_baseball",cost:2890,name:"Baseball",img:"Baseball_low.png",color:"#838383"},
    {id:"1_skin_basketball",cost:2950,name:"Basketball",img:"Basketball_low.png",color:"#654217"},
    {id:"1_skin_bug",cost:3150,name:"Bug",img:"Bug_low.png",color:"#7c0001"},
    {id:"1_skin_cloud",cost:3250,name:"Cloud",img:"Cloud_low.png",color:"#838383"},
    {id:"1_skin_muu",cost:3290,name:"Muu",img:"Muu_low.png",color:"#004F0F"},
    {id:"1_skin_tomatoface",cost:3350,name:"Tomatoface",img:"Tomato_Face_low.png",color:"#7c0001"},
    {id:"1_skin_mushroom",cost:3390,name:"Mushroom",img:"Mushroom_low.png",color:"#004F0F"},
    {id:"1_skin_donuts",cost:3450,name:"Donuts",img:"Donuts_low.png",color:"#838383"},
    {id:"1_skin_terrible",cost:3490,name:"Terrible",img:"Terrible_low.png",color:"#4E114E"},
    {id:"1_skin_ghost",cost:3550,name:"Ghost",img:"ghost_low.png",color:"#4E114E"},
    {id:"1_skin_appleface",cost:3590,name:"Appleface",img:"Apple_Face_low.png",color:"#004F0F"},
    {id:"1_skin_turtle",cost:3650,name:"Turtle",img:"Turtle_low.png",color:"#004F0F"},
    {id:"1_skin_brofist",cost:3750,name:"Brofist",img:"BroFist_low.png",color:"#7c0001"},
    {id:"1_skin_astronaut",cost:3790,name:"Astronaut",img:"Astronaut_low.png",color:"#090760"},
    {id:"1_skin_dog",cost:3890,name:"Dog",img:"Dog_low.png",color:"#654217"},
    {id:"1_skin_footprint",cost:3950,name:"Footprint",img:"FootPrint_low.png",color:"#654217"},
    {id:"1_skin_meteor",cost:4150,name:"Meteor",img:"Comet_low.png",color:"#6c25ff"},
    {id:"1_skin_pineappleface",cost:4490,name:"Pineappleface",img:"Pineapple_Face_low.png",color:"#654217"},
    {id:"1_skin_zebrapattern",cost:4590,name:"Zebrapattern",img:"Zebra_Pattern_low.png",color:"#838383"},
    {id:"1_skin_toon",cost:4650,name:"Toon",img:"toon_low.png",color:"#000000"},
    {id:"1_skin_octopus",cost:4790,name:"Octopus",img:"Octopus_low.png",color:"#004F0F"},
    {id:"1_skin_radar",cost:4950,name:"Radar",img:"Radar_low.png",color:"#004F0F"},
    {id:"1_skin_grey",cost:4990,name:"Grey",img:"Grey_low.png",color:"#86ee32"},
    {id:"1_skin_eye",cost:5250,name:"Eye",img:"Eye_low.png",color:"#838383"},
    {id:"1_skin_owl",cost:5490,name:"Owl",img:"Owl_low.png",color:"#000000"},
    {id:"1_skin_virus",cost:5650,name:"Virus",img:"Virus_low.png",color:"#4E114E"},
    {id:"1_skin_smile",cost:5850,name:"Smile",img:"smile_low.png",color:"#654217"},
    {id:"1_skin_army",cost:5990,name:"Army",img:"Army_low.png",color:"#004F0F"},
    {id:"1_skin_cat",cost:6250,name:"Cat",img:"Cat_low.png",color:"#AC0875"},
    {id:"1_skin_nuclear",cost:6490,name:"Nuclear",img:"Nuclear_low.png",color:"#654217"},
    {id:"1_skin_toxic",cost:6650,name:"Toxic",img:"Toxic_low.png",color:"#838383"},
    {id:"1_skin_space_dog",cost:6690,name:"Space Dog",img:"Laika_low.png",color:"#676e70"},
    {id:"1_skin_doggie",cost:6850,name:"Doggie",img:"Doggie_low.png",color:"#7c0001"},
    {id:"1_skin_face",cost:6990,name:"Face",img:"face_low.png",color:"#838383"},
    {id:"1_skin_willie",cost:7250,name:"Willie",img:"Willie_low.png",color:"#838383"},
    {id:"1_skin_luchador",cost:7490,name:"Luchador",img:"Luchador_low.png",color:"#7c0001"},
    {id:"1_skin_zombie",cost:7650,name:"Zombie",img:"zombie_low.png",color:"#004F0F"},
    {id:"1_skin_bite",cost:7850,name:"Bite",img:"Bite_low.png",color:"#AC0875"},
    {id:"1_skin_crazy",cost:7990,name:"Crazy",img:"Crazy_low.png",color:"#7c0001"},
    {id:"1_skin_hockey",cost:8250,name:"Hockey",img:"Hockey_low.png",color:"#838383"},
    {id:"1_skin_jarbrain",cost:8490,name:"Jarbrain",img:"Jar_Brain_low.png",color:"#002C6C"},
    {id:"1_skin_evil",cost:8650,name:"Evil",img:"Evil_low.png",color:"#7c0001"},
    {id:"1_skin_pirate",cost:8850,name:"Pirate",img:"Pirate_low.png",color:"#000000"},
    {id:"1_skin_evileye",cost:9250,name:"Evileye",img:"evil_eye_low.png",color:"#7c0001"},
    {id:"1_skin_halloween",cost:9490,name:"Halloween",img:"Halloween_low.png",color:"#7c0001"},
    {id:"1_skin_monster",cost:9650,name:"Monster",img:"Monster_low.png",color:"#7c0001"},
    {id:"1_skin_scarecrow",cost:9850,name:"Scarecrow",img:"Scarecrow_low.png",color:"#838383"},
    {id:"1_skin_spy",cost:9999,name:"Spy",img:"Spy_low.png",color:"#838383"}
  ];
  const state = {
    open: false,
    tab: "premium",
    query: "",
    busy: false,
    shadow: null,
    skinBase: null,
  };

  function ui(id) {
    return state.shadow ? state.shadow.getElementById(id) : null;
  }

  function getMC() {
    if (typeof unsafeWindow !== "undefined" && unsafeWindow.MC) {
      return unsafeWindow.MC;
    }

    return window.MC || null;
  }

  function getEnvConfig() {
    if (typeof unsafeWindow !== "undefined" && unsafeWindow.EnvConfig) {
      return unsafeWindow.EnvConfig;
    }

    return window.EnvConfig || null;
  }

  function detectSkinBase() {
    const env = getEnvConfig();
    const configUrl = (env && env.config_url) || DEFAULT_CONFIG_URL;
    const escaped = configUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(escaped + "/(\\d+)/");

    try {
      const entries = window.performance
        ? window.performance.getEntriesByType("resource")
        : [];

      for (const entry of entries) {
        const match = pattern.exec(entry.name || "");

        if (match) {
          return `${configUrl}/${match[1]}/`;
        }
      }
    } catch (_error) {
      void _error;
    }

    return `${configUrl}/${DEFAULT_REVISION}/`;
  }

  function skinUrl(img) {
    if (!state.skinBase) {
      state.skinBase = detectSkinBase();
    }

    return state.skinBase + img;
  }

  function formatNum(value) {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function setBusy(busy) {
    state.busy = busy;

    state.shadow
      ?.querySelectorAll(".op-price")
      .forEach((button) => {
        button.disabled = busy;
      });
  }

  function isReady() {
    const mc = getMC();

    if (!mc || typeof mc.makePurchase !== "function") {
      return false;
    }

    if (typeof mc.isUserLoggedIn === "function") {
      try {
        return Boolean(mc.isUserLoggedIn());
      } catch (_error) {
        return false;
      }
    }

    return true;
  }

  function purchase(id, label, priceText, isCoin) {
    if (state.busy) {
      return;
    }

    if (!isReady()) {
      window.alert("Please login");
      return;
    }

    if (!window.confirm(`Would you like to buy it??\n\n${label}\n${priceText}`)) {
      return;
    }

    const done = () => {
      setBusy(false);

      if (isCoin) {
        window.alert("please reload the page");
      }
    };

    try {
      setBusy(true);

      const result = getMC().makePurchase(id, true, true);

      if (result && typeof result.then === "function") {
        Promise.resolve(result).then(done, () => setBusy(false));
      } else {
        done();
      }
    } catch (_error) {
      setBusy(false);
    }
  }

  function skinCircle(skin, size) {
    if (!skin.img) {
      return skinFallback(skin.name || "?", skin.color, size);
    }

    const img = document.createElement("img");

    img.className = "op-skin";
    img.loading = "lazy";
    img.alt = skin.name || "";
    img.src = skinUrl(skin.img);

    if (size) {
      img.style.width = size + "px";
      img.style.height = size + "px";
    }

    if (skin.color) {
      img.style.borderColor = skin.color;
    }

    img.addEventListener("error", () => {
      img.replaceWith(skinFallback(skin.name || "?", skin.color, size));
    });

    return img;
  }

  function skinFallback(name, color, size) {
    const box = document.createElement("div");

    box.className = "op-skin op-skin-fallback";
    box.textContent = String(name).charAt(0).toUpperCase();

    if (size) {
      box.style.width = size + "px";
      box.style.height = size + "px";
    }

    if (color) {
      box.style.borderColor = color;
    }

    return box;
  }

  function thumb(skins) {
    const box = document.createElement("div");

    box.className = "op-thumb";

    if (!skins || !skins.length) {
      const empty = document.createElement("div");
      empty.className = "op-skin op-skin-empty";
      box.appendChild(empty);
      return box;
    }

    const size = skins.length >= 3 ? 62 : skins.length === 2 ? 80 : 112;

    skins.forEach((skin) => {
      box.appendChild(skinCircle(skin, size));
    });

    return box;
  }

  function amountText(p) {
    const parts = [];

    if (p.coins) {
      parts.push(formatNum(p.coins) + " coins");
    }

    if (p.dna) {
      parts.push(formatNum(p.dna) + " DNA");
    }

    return parts.join(" + ");
  }

  function nameLines(list) {
    return list.map((text, index) => (index === 0 ? text : "+ " + text));
  }

  function premiumLines(p) {
    if (p.skins.length) {
      return nameLines(p.skins.map((s) => s.name));
    }

    if (p.extras && p.extras.length) {
      return nameLines(p.extras);
    }

    if (p.coins) {
      return [formatNum(p.coins) + " Coins"];
    }

    if (p.dna) {
      return [formatNum(p.dna) + " DNA"];
    }

    return [p.id];
  }

  function premiumSub(p) {
    if (!p.skins.length && !(p.extras && p.extras.length)) {
      return p.dna && p.coins ? formatNum(p.dna) + " DNA" : "";
    }

    return amountText(p);
  }

  function card(thumbNode, lines, sub, priceText, priceMode, onBuy) {
    const box = document.createElement("div");

    box.className = "op-card";

    const nm = document.createElement("div");
    nm.className = "op-card-name";
    nm.title = lines.join(" ");

    lines.forEach((text) => {
      const line = document.createElement("div");
      line.className = "op-card-line";
      line.textContent = text;
      nm.appendChild(line);
    });

    const price = document.createElement("button");
    price.type = "button";
    price.className = "op-price";
    price.dataset.mode = priceMode;
    price.disabled = state.busy;
    price.addEventListener("click", onBuy);

    const priceLabel = document.createElement("span");
    priceLabel.textContent = priceText;
    price.appendChild(priceLabel);

    if (priceMode === "coin") {
      const coin = document.createElement("span");
      coin.className = "op-coin";
      price.appendChild(coin);
    }

    box.append(nm, thumbNode);

    if (sub) {
      const subEl = document.createElement("div");
      subEl.className = "op-card-sub";
      subEl.textContent = sub;
      box.appendChild(subEl);
    }

    box.appendChild(price);

    return box;
  }

  function matchQuery(text) {
    return String(text).toLowerCase().includes(state.query);
  }

  function renderPromoList(grid, predicate) {
    PROMO.forEach((p) => {
      if (!predicate(p)) {
        return;
      }

      const lines = premiumLines(p);

      if (state.query && !matchQuery(lines.join(" ")) && !matchQuery(p.id)) {
        return;
      }

      const id = PACK_PREFIX + p.id;
      const priceText = "$" + p.usd.toFixed(2);

      grid.appendChild(
        card(thumb(p.skins), lines, premiumSub(p), priceText, "usd", () => {
          purchase(id, lines.join(" "), priceText, false);
        })
      );
    });
  }

  function renderPremium(grid) {
    renderPromoList(grid, (p) => p.skins.length > 0);
  }

  function renderOther(grid) {
    renderPromoList(grid, (p) => p.skins.length === 0);
  }

  function renderCoin(grid) {
    COIN.forEach((c) => {
      if (state.query && !matchQuery(c.name) && !matchQuery(c.id)) {
        return;
      }

      const priceText = formatNum(c.cost);

      grid.appendChild(
        card(
          thumb([{ img: c.img, color: c.color, name: c.name }]),
          [c.name],
          "",
          priceText,
          "coin",
          () => {
            purchase(c.id, c.name, priceText + " coins", true);
          }
        )
      );
    });
  }

  function renderTab() {
    const grid = ui("op-grid");

    if (!grid) {
      return;
    }

    state.shadow.querySelectorAll("[data-tab]").forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === state.tab);
    });

    grid.replaceChildren();
    grid.scrollLeft = 0;

    if (state.tab === "coin") {
      renderCoin(grid);
    } else if (state.tab === "other") {
      renderOther(grid);
    } else {
      renderPremium(grid);
    }

    if (!grid.children.length) {
      const empty = document.createElement("div");
      empty.className = "op-empty";
      empty.textContent = "該当なし";
      grid.appendChild(empty);
    }

    updateArrows();
  }

  function setTab(tab) {
    state.tab = tab;
    renderTab();
  }

  function scrollByPage(direction) {
    const grid = ui("op-grid");

    if (!grid) {
      return;
    }

    grid.scrollBy({
      left: direction * Math.round(grid.clientWidth * 0.9),
      behavior: "smooth",
    });
  }

  function updateArrows() {
    const grid = ui("op-grid");
    const left = ui("op-arrow-left");
    const right = ui("op-arrow-right");

    if (!grid || !left || !right) {
      return;
    }

    const max = grid.scrollWidth - grid.clientWidth;

    left.disabled = grid.scrollLeft <= 2;
    right.disabled = grid.scrollLeft >= max - 2;
  }

  function setOpen(open) {
    state.open = Boolean(open);

    const overlay = ui("op-overlay");

    if (overlay) {
      overlay.hidden = !state.open;
    }

    if (state.open) {
      renderTab();
      window.requestAnimationFrame(updateArrows);
    }
  }

  function mountPanel() {
    if (document.getElementById("op-host")) {
      return;
    }

    const host = document.createElement("div");
    host.id = "op-host";
    document.documentElement.appendChild(host);

    const shadow = host.attachShadow({ mode: "open" });
    state.shadow = shadow;

    shadow.innerHTML = `
      <style>
        :host {
          all: initial;
          font-family: 'Ubuntu', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; }
        [hidden] { display: none !important; }
        button { font: inherit; cursor: pointer; }

        #op-overlay {
          position: fixed;
          inset: 0;
          z-index: 2147483646;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0, 0, 0, 0.5);
        }

        #op-panel {
          display: flex;
          flex-direction: column;
          width: 90%;
          max-width: 900px;
          height: 88%;
          max-height: 760px;
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 16px 50px rgba(0, 0, 0, 0.45);
          overflow: hidden;
        }

        .op-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 20px;
          border-bottom: 1px solid #ececec;
        }

        .op-title {
          color: #444;
          font-size: 20px;
          font-weight: bold;
        }

        #op-search {
          width: 240px;
          height: 34px;
          padding: 0 12px;
          border: 1px solid #d5d5d5;
          border-radius: 6px;
          background: #f6f6f6;
          color: #333;
          font-size: 13px;
          outline: none;
        }

        #op-search:focus { border-color: #57c1e8; background: #fff; }

        .op-contact {
          display: grid;
          place-items: center;
          height: 32px;
          margin-left: auto;
          padding: 0 14px;
          border-radius: 8px;
          background: #f0f0f0;
          color: #666;
          font-size: 13px;
          font-weight: bold;
          text-decoration: none;
        }

        .op-contact:hover { background: #e6e6e6; color: #444; }

        .op-close {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border: 0;
          border-radius: 8px;
          background: #f0f0f0;
          color: #888;
          font-size: 18px;
          line-height: 1;
        }

        .op-close:hover { background: #e6e6e6; color: #555; }

        .op-tabs {
          display: flex;
          gap: 6px;
          padding: 12px 20px 0;
        }

        .op-tab {
          padding: 11px 30px;
          border: 0;
          border-radius: 6px 6px 0 0;
          background: #57c1e8;
          color: #fff;
          font-size: 15px;
          font-weight: bold;
        }

        .op-tab:hover { background: #4fb6dd; }

        .op-tab.active {
          background: #fff;
          color: #3a3a3a;
          box-shadow: 0 -2px 0 #57c1e8 inset;
        }

        .op-stage {
          position: relative;
          flex: 1;
          display: flex;
          align-items: stretch;
          border-top: 2px solid #57c1e8;
          background: #fafafa;
          min-height: 0;
        }

        .op-arrow {
          flex: 0 0 auto;
          width: 46px;
          border: 0;
          background: transparent;
          color: #bcbcbc;
          font-size: 40px;
          font-weight: bold;
        }

        .op-arrow:hover:not(:disabled) { color: #7fd0ee; }
        .op-arrow:disabled { color: #e6e6e6; cursor: default; }

        #op-grid {
          flex: 1;
          height: 100%;
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 168px;
          align-items: center;
          gap: 14px;
          padding: 16px 6px;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          scrollbar-width: thin;
        }

        #op-grid::-webkit-scrollbar { height: 8px; }
        #op-grid::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: #d2d2d2;
        }

        .op-empty {
          align-self: center;
          padding: 0 20px;
          color: #999;
          font-size: 14px;
          font-weight: bold;
        }

        .op-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 300px;
          padding: 22px 12px 24px;
          border: 1px solid #e4e4e4;
          border-radius: 6px;
          background: #fff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .op-card:hover {
          border-color: #9bd67a;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);
        }

        .op-card-name {
          width: 100%;
          min-height: 34px;
          color: #555;
          font-size: 13px;
          font-weight: bold;
          text-align: center;
        }

        .op-card-line {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.3;
        }

        .op-thumb {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 100%;
          margin: auto 0;
          padding: 20px 0;
        }

        .op-skin {
          width: 112px;
          height: 112px;
          border-radius: 50%;
          border: 4px solid #b7b7b7;
          background: #f6f6f6;
          object-fit: cover;
        }

        .op-skin-empty { border-style: dashed; background: #fbfbfb; }

        .op-skin-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9a9a9a;
          font-size: 30px;
          font-weight: bold;
        }

        .op-card-sub {
          max-width: 100%;
          margin: 4px 0 8px;
          color: #111;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .op-price {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          height: 36px;
          margin-top: 8px;
          border: 0;
          border-radius: 5px;
          background: #5fbb2d;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
        }

        .op-price:hover:not(:disabled) { background: #6bcd34; }
        .op-price:active:not(:disabled) { background: #55a827; }
        .op-price:disabled { background: #bdbdbd; cursor: default; }

        .op-coin {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #ffe17a, #f5b100 70%);
          box-shadow: inset 0 0 0 2px #e0a000;
        }

      </style>

      <div id="op-overlay" hidden>
        <section id="op-panel" role="dialog" aria-label="shop">
          <header class="op-header">
            <span class="op-title">Shop</span>
            <input id="op-search" type="text" placeholder="search" autocomplete="off" spellcheck="false">
            <a id="op-contact" class="op-contact" href="https://x.com/pxuwo" target="_blank" rel="noopener noreferrer">Contact</a>
            <button id="op-close" class="op-close" type="button" aria-label="close">×</button>
          </header>

          <div class="op-tabs">
            <button class="op-tab active" type="button" data-tab="premium">Premium</button>
            <button class="op-tab" type="button" data-tab="coin">Coin</button>
            <button class="op-tab" type="button" data-tab="other">Other</button>
          </div>

          <div class="op-stage">
            <button id="op-arrow-left" class="op-arrow" type="button" aria-label="left">‹</button>
            <div id="op-grid"></div>
            <button id="op-arrow-right" class="op-arrow" type="button" aria-label="right">›</button>
          </div>
        </section>
      </div>
    `;

    ui("op-close").addEventListener("click", () => {
      setOpen(false);
    });

    ui("op-overlay").addEventListener("click", (event) => {
      if (event.target === ui("op-overlay")) {
        setOpen(false);
      }
    });

    ui("op-search").addEventListener("input", (event) => {
      state.query = event.target.value.trim().toLowerCase();
      renderTab();
    });

    state.shadow.querySelectorAll("[data-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        setTab(button.dataset.tab);
      });
    });

    ui("op-arrow-left").addEventListener("click", () => scrollByPage(-1));
    ui("op-arrow-right").addEventListener("click", () => scrollByPage(1));
    ui("op-grid").addEventListener("scroll", updateArrows);

    ui("op-grid").addEventListener("wheel", (event) => {
      if (event.deltaY !== 0 && event.deltaX === 0) {
        event.preventDefault();
        ui("op-grid").scrollLeft += event.deltaY;
      }
    }, { passive: false });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.open) {
        setOpen(false);
      }
    });
  }

  function mountLauncher() {
    const play = document.querySelector("#play");

    if (!play) {
      return;
    }

    let launcher = document.getElementById("op-launcher");

    if (launcher) {
      if (play.nextElementSibling !== launcher) {
        play.insertAdjacentElement("afterend", launcher);
      }
      return;
    }

    if (!document.getElementById("op-launcher-style")) {
      const style = document.createElement("style");
      style.id = "op-launcher-style";
      style.textContent = `
        #op-launcher {
          position: relative;
          z-index: 2;
          display: block;
          clear: both;
          width: 100%;
          margin: 40px 0 6px;
          padding: 12px 0;
          border: 0;
          border-radius: 4px;
          background: #57c1e8;
          color: #fff;
          font-family: 'Ubuntu', sans-serif;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }
        #op-launcher:hover { background: #49b4dc; }
      `;
      document.head.appendChild(style);
    }

    launcher = document.createElement("button");
    launcher.id = "op-launcher";
    launcher.type = "button";
    launcher.textContent = "Offers";
    launcher.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(true);
    });

    play.insertAdjacentElement("afterend", launcher);
  }

  function init() {
    mountPanel();
    mountLauncher();

    const observer = new MutationObserver(() => {
      mountLauncher();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.body) {
    init();
  } else {
    window.addEventListener("DOMContentLoaded", init, { once: true });
  }
})();
