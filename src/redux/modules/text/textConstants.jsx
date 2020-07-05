export const roomNames = ['Makeshift Recovery Room', 'Storage Room', 'Warp Lab Access', 'Warp Lab', 'Cryo Lab', 'Shipping and Receiving Room', 'Xenobiology Lab', 'Core Access', 'The Core']

export const examine = {
  tank1: {1: ['Some sort of storage tank.', 'You can barely make out a human-like shape through the frosted glass.']},
  tank2: {1: ['Some sort of storage tank.', 'You can barely make out a human-like shape through the frosted glass.']},
  tankE1: {1: ['Some sort of storage tank.', 'There doesn\'t seem to be anything inside.', 'It feels... oddly familiar.']},
  tankE2: {1: ['Some sort of storage tank.', 'There doesn\'t seem to be anything inside.', 'It feels... oddly familiar.']},
  tube: {1: ['A tank containing some sort of weird... thing.', 'It seems to be alive, but it won\'t respond to anything you do.']},
  bigTube1: {1: ['A massive tank of some sort.', 'There\'s something very large and very unsettling inside, but it doesn\'t appear to be alive... anymore.'],
             2: ['options', 'Restore Power?', ['No','Yes']],
             3: ['results', ['You left it alone.','Nothing happened. The power must have been cut elsewhere.']]
            },
  bigTube2: {1: ['A massive tank of some sort.', 'There\'s something very large and very unsettling inside, but it doesn\'t appear to be alive... anymore.'],
            2: ['options', 'Restore Power?', ['No','Yes']],
            3: ['results', ['You left it alone.','Nothing happened. The power must have been cut elsewhere.']]
            },
  bigTube3: {1: ['A massive tank of some sort.', 'There\'s something very large and very unsettling inside, but it doesn\'t appear to be alive... anymore.'],
            2: ['options', 'Restore Power?', ['No','Yes']],
            3: ['results', ['You left it alone.','Nothing happened. The power must have been cut elsewhere.']]
            },
  uglyBed1: {1: ['A truely hideous bed.', 'Just looking at it hurts your eyes.', 'You can only think of one person with such a gaudy sense of style...']},
  uglyBed2: {1: ['A truely hideous bed.', 'Just looking at it hurts your eyes.', 'You can only think of one person with such a gaudy sense of style...']},
  shelf: {1: ['A shelf filled with assorted junk.', 'Nothing worth taking.']},
  save: {1: ['The strange light seems to split into countless branching rays.'],
         2: ['options', 'Save your game at this junction?', ['No','Yes']],
         3: ['results', ['Save Canceled.','Game Saved.']]
        },
  resetPrompt: {1: ['options', 'Reset?', ['No','Yes']],
                2: ['results', ['Reset Cancelled.','Resetting...']]},
  desk1: {
    1: ['A desk. The computer seems damaged irreparably.']
  },
  desk2: {
    1: ['A desk. The computer seems damaged irreparably.']
  },
  desk3: {
    1: ['A desk. The computer seems damaged irreparably.']
  },
  sign1: {1: ['Teleportation and Interdimentional Research','Please check in with security guard on duty.', 'In case of emergency, door locks can be manually overwritten using pressure switches.']},
  sign2: {1: ['Teleportation and Interdimentional Research','Please check in with security guard on duty.']},
  terminalOff: {1: ['A computer terminal. It doesn\'t seem to be receaving any power.']},
  spookyTerminal: {1: ['A computer terminal. It doesn\'t seem to be receaving any power.']},
  mapTerminal:{
    1: ['Downloading map data for this floor...'],
    2: ['Download successful.'],
  },
  terminal1:{
              1: ['Logging in...'],
              2: ['options', 'Please input new door lock status:', ['Lock','Unlock']],
              3: ['results', ['Door Lock Engaged.','Door Lock Disengaged.']],
              4: ['Logging Out...']
            },
  terminal12:{
             1: ['I can\'t believe the idiots I\'m trapped on this ship with.', 'Dr _____ continues to waste her time on Cryonic research. Not a single test subject has been successfully revitalized.', 'Quite the sick joke our predacessors played, freezing hundreds of people without the slightest idea of how to bring them back.'],
             2: ['What\'s even the point of bringing them back to life if we can\'t find another habitable planet. The ship certainly can\'t support them.', 'Even with the curent skeleton crew alone, it we\'ll be out of supplies in a few decades at most.'],
             3: ['Our only chance of survival is to look beyond this narrow sliver of time and space into the wider expanse of all possible worlds, or rather, all possible futures.', 'I should be grateful to by benevolnet corperate overlords of the the resouces and briliant reseachers they\'ve given me. I certainly wouldn\'t have been so lucky were I selected to serve on one of the Earth Union\'s ships.'],
             4: ['On the other hand, someone like Dr ____ would have never been treated so charitably by the government buracrats.', 'There\'s vision and then there\'s... whatever madness it is that he\'s pursuing. It\'s an open secret at this point that that the frozen bodies of some of the less well-connected individuals who managed to bribe (or prehaps blackmail) themselves on this ship have been entering his lab, never to be seen again']
            },
  terminal3: {1: ['Another round of failures. We were unable to revitalize a single specimen.', 'I\'ve lost track of how many rats we\'ve killed at this point. I know it goes against the heart of the scientific method, but keeping track just got to be too demoralizing.'],
              2: ['Virtually all of my fellow researchers have had loved ones frozen, even the great madame president, supreme ruler of this ship has a daughter in cryonic stasis aboard the ship. It\'s a shame, apparently she had quite the a reputation back on Earth. We probably would have gotten along well.', 'The posibility that they are gone for good is too much for many to bear.', 'Even a single surviving test subject would give them a glimmer of hope that the cryogensis process isn\'t just a mercy killing'],
              2: ['I\'m unusual insofar as I have no loved ones aboard this ship, or anywhere else for that matter.', 'Although I wouldn\'t say that I\'m thankful that my work has always been my only love, it has provided me the single-minded focus I attribute to my success.']
            },
  terminal4: {1: ['I heard her voice again. Beautiful. Haunting. It makes me feel like the entire rise and fall of the human race was all worth it. Just for one lowely human to experence such sublime majesty.'],
              2: ['After requesting access to some of the technology dr. ____\'s team was working on, I was able to confirm my hypothesis.', 'The life forms I have been studying were indeed attracted to the dimentional distortions produced by the same technology that powers this ship.'],
              3: ['Our ship no doubt drew the organisms to us in the first place.', 'If I could only find a way to amplifiy them further, prehaps the ship could serve as an even more effective beacon. Prehaps even one strong enough to catch HER many eyes...']
            },
  terminal5: {1: ['When dimentional technology was first developed as a power source, a common debate amoung the top minds in the field revolved around the exact source of the nearly endless supply of energy it allowed us to tap into.'],
              2: ['One theory that I found quite laughable at the time said that it was in fact drawing the power from other iterations of earth. As if in some distant dimention, entire cities were going dark just for us to heat up our microwave burritos or prehaps depriving their planet of solar warmth to fuel our funny cat pictures.'],
              3: ['However, looking back at the years leading to our exodus from earth, I\'m not so sure it wasn\'t on to something. After all, if we discovered such a technology, wouldn\'t it also follow that other versions of us would discover it as well?', 'What if by the time we disovered it, another version of earth had already advanced to the point where it was capable of draining the interdiemntional commons dry?'],
              4: ['Our cities didn\'t go dark, at least not at first, but the prevesive sense of decline was undeniable. Prehaps rather than a simple syphoning of energy, it was a more insidious process. For example, what if we were essentually inheriting the entropic debt of other dimentions?'],
              5: ['Even now, I can\'t help but ask myself how many alternative versions of ourselves we\'re dooming in order to fuel our ship\'s hopeless journey.'],
              6: ['The liklihood of any of us abord this ship making the breakthrough\'s nessicary to survive grows smaller and smaller every day.', 'However, there is still one chance, or rather a million billion chances, since that\'s how many we\'d need.', 'Even if I fail to solve this riddle, even if a million versions of myself fail, as long as it\'s within the relm of possibility, as long as one-in-a-million succeeds, prehaps humanity can still have a future.'],
              7: ['I\'ll send out a broadcast of sorts, one that should reach any version of myself. Dr. ____ has already layed the ground-work of a rely, prehaps together we can actually do this. Dr. ____ seems anxious, but now is no time for petty squabiling. I may not like Dr. ____, but there is no doubt that the man is a genious.']
            },
  terminal4: {1: ['After nearly a decade, work on the Magellan Project has ceased and it has been declared an utter failure.', 'Of the nearly 200 subjects selected, 73 were rendered completly brain-dead after a single voyage, 30 or so were simply incompatable  '],
              2: ['It was an ambitious project. Naviagters who could trace a path though', 'The fact that we never came in contact with any navigaters from other Branches was taken by many as evedence that the project was simply impossible.'],
              3: ['This represents yet another dead end in Needle\'s Eye\'s attempts to harniss the power of Branches. There is little doubt that the machine represents, but without some means of sifting through the infinate possibilities, it\'s effectively useless.']
            },
  terminal4: {2: ['All of the senior researchers that came a board with me are gone. I\'ve grown old, my mind isn\'t what it once was. My junior researchers humor me and make excuces for my forgetfulness, but I\'m so far gone that I can\'t see what they\'re doing.', 'Even if I was to join the others in their sub-zero sleep, what\'s left of me to preserve?'],
              3: ['I gave everything I had in the hopes of finding a way to reverse the stasis process, but 70 years and we\'ve ulimatly made no progress.', 'I gave a lifetime, and I\'d give it again without hesitaton, but one lifetime just isn\'t enough.', "Dr _____ used to speak to me about countless worlds. What a buffon, claiming that he'd fall for me in every possible one. I sometimes wonder, prehaps if I had an infinate number of lifetimes, an infinite number of paths to walk down, I could find a cure."],
              4: ['It\'s a cold comfort (ha!), but the thought that there could be another version of myself somewhere out there celebreating her breakthrough with Dr over our favorite wine is a good fantasy, and what, besides fantasies, do we have left?']
            },
  terminal4: {1: ['lucy\'s on my ass again. wants a miracle asap.'],
              2: ['told her over and over, technology is still mostly just theoretical.', 'can swap a block from our branch with a nearly identical one from who-knows-where. no real practical applications yet.', 'organisms don\'t work, just make a mess.'],
              3: ['dr. wants to talk to me privatly about something.', 'Seems nice, but don\'t see how her cryonics research has anything to do with mine.'],
              4: ['oh. feel stupid. need some nicer clothes for friday (why are still using that same system lightyears from earth?), maybe cash in my credits for some decent wine from the ship\'s stockpile.']
              },
  terminal4: {1: ['Memo: On Recent Incidents Concerning Dr _____'],
              2: ['Dear xenobiology team,', 'As you are no doubt aware, the previous director of Needle\'s Eye\'s Xenobiology research division has been found to have engaged in a number of very serious violations of .'],
              3: ['We cannot conform the deatils of all of Dr\'s numerous ethical and scientfiic violations at this time, nor can we provide infomation regarding other personel suspected and confirmed to have acted alongside him.'],
              4: ['The east wing of the Cryonic Facility, where the majority of the violations are beleived to have occured is henseforth off-limits to all unauthorised personell.'],
              5: ['Lucy ******', 'CEO, chairwoman, and president of Needle\'s Eye Inc. Captain of the Starship Needle\'s Eye']
            },
  terminal9a: {1: ['Logging in...'],
              2: ['Core Status: Output - Low, Configuration - Basic Ship Functions'],
              3: ['options', 'Initiate Core Override Process?', ['Yes','No']],
              4: ['results', ['Override Process Initiated.','Override Process Aborted.']],
              5: ['Logging Out...']
              },
  terminal9b: {1: ['Logging in...'],
              2: ['WARNING: Unable to reconfigure core output due to irreversable system damage. A manual override must be performed.'],
              3: ['options', 'Initiate Core Override Process?', ['Yes','No']],
              4: ['results', ['Manual Override Initiated.','Manual Override Aborted.']],
              5: ['Logging Out...']
              },
  terminal9c: {1: ['Logging in...'],
              2: ['options', 'Activate manual override?', ['Yes','No']],
              3: ['results', ['Manual Override Initiated.','Manual Override Aborted.']],
              4: ['Logging Out...']
              },
  terminal9d: {1: ['Logging in...'],
              2: ['WARNING: Unable to reconfigure core output due to irreversable system damage. A manual override must be performed.'],
              3: ['options', 'Initiate Core Override Process?', ['Yes','No']],
              4: ['results', ['Manual Override Initiated.','Manual Override Aborted.']],
              5: ['Logging Out...']
              },
  terminal9e: {1:['Logging in...'],
              2: ['Manual overrides confirmed. System primed for reconfiguration. WARNING: extreme radiation.'],
              3: ['options', 'Core Setting:', ['Full Power','Energy Saving']],
              4: ['results', ['Switching to Full Power Mode.','Remaining in Power Saving Mode.']],
              5: ['Logging Out...']
              },
  phoneOff: {1: ['No response.']},
  phone1: {1: ['You heard a familiar voice you couldn\'t quite place...']},
  sync1: {1: ['A flood of strange but familiar memories and emotions came rushing in.'],
    2: ['You felt a sense of triumpth as you finally completed a difficult puzzle involving laser beams.'],
    3: ['Entanglement increased by 5%.']},
  sync2: {1: ['A flood of strange but familiar memories and emotions came rushing in.'],
    2: ['You experenced crushing lonliness as you aimlessly wandered around the facility all by yourself.'],
    3: ['Entanglement increased by 5%.']},
  sync3: {1: ['A flood of strange but familiar memories and emotions came rushing in.'],
    2: ['Terror courses through your veins as you watch the facility ceilling collapse on top of you.'],
    3: ['Entanglement increased by 5%.']},
  sync4: {1: ['A flood of strange but familiar memories and emotions came rushing in.'],
  2: ['Terror courses through your veins as you watch the facility ceilling collapse on top of you.'],
  3: ['Entanglement increased by 5%.']},
}
 
export const dialogue = {
  robotOff: {1: ['Strange Voice', ['Oh, good, you\'re finally awake! As I am sure you\'ve noticed, the door to this room is locked.', 'The terminal next to you should be able to override the lock.', 'The power\'s been cut, but I can temporarily restore it for you.']]},
  bootUp1: {
    1: ['Automated System', ['Human biosignature detected. Restoring secondary power systems.' ]]
  },
  A4: {
    1: ['Orpheus', ['BEHOLD!', '...actually, would you mind beholding a little more to the left?', 'I have no idea what this huge thing is doing here, but it\'s really messing up my intro.']],
  },
  A5: {
    1: ['Orpheus', ['BEHOLD!']],
    2: ['Claire', ['...yeah. Consider yourself beheld.', 'Now would you mind telling me what\'s going on here?', 'Where are we? Or should I be asking "When are we?"']],
    3: ['Strange Voice2', ['Well, we\'re inside one of the many cryogenic storage areas situated on the orbital satalite "The Needle\'s Eye".', 'Bunch of old rich guys froze themselves here in the hope that someone would come along with a magic wand and poof them back to life once the situation on Earth improved.', 'As far as I know, they weren\'t being ironic when they named it, belive it or not.', 'As you can see, not many people took them up on the offer. Not that there was really anyone left who could.', 'Eveyone on this station is either frozen dead or dead dead. Well, on this version of the station at least.', 'The lines between possibilities tend to blur here.']],
    4: ['Claire', ['"The Needle\'s Eye", why does that sound so familiar?', 'Ugg, my memory is such a wreck.']],
    6: ['Claire', ['So if everyone on this station is dead, why are you guys here?', 'Just what do you want from me?', 'Why go through the trouble of reviving me?', 'That Grant guy mentioned something about a client?']], 
    11: ['Strange Voice2', ['We find things for people. It\'s our job.', 'You just so happened to be the thing that someone wanted found. Tacking down missing loved ones is a pretty standard assignment.', 'What our client wants from you I couldn\'t say, but someone willing to pay that much probably isn\'t going to eat your eyeballs or anything.', 'Besides, I take my job seriously. I protect the items or people in my custody *with my life* during every step of the process. That includes ensuring that they will be well taken care of after the hand-off.', 'Anyone tries to mess with you and I\'ll kick the crap out of them.']],
    12: ['Claire', ['Thanks, that\'s actually... kind of reasurring.']],
    13: ['Strange Voice2', ['Hee, hee, hee. No problem. Like I said, I\'ll see this through no matter what.']],
    14: ['Strange Voice1', ['****! Quit flirting and get a move on!']],
    15: ['Strange Voice2', ['Rude.', 'I\'m just trying to reasure our ward that we aren\'t going to harvest her organs or anything.', 'Unfortentatly, I wasn\'t able to make it into the station\'s core. Looks like we\'ll need a different keycard.']],
    14: ['Strange Voice1', ['I\'ve been surveying the place with my nano buddies and it looks like there might be something over on the east side of the facility.', 'It should be easier to just mark the spot on your map.']],
    16: ['Claire', ['Sorry to keep asking dumb questions, but why are you guys trying to get into the core?', 'Weren\'t you just here for me?']],
    13: ['Strange Voice2', ['It\'s a neccesicary step in getting out of here.', 'We\'ll need a lot more juice if we want to achive escape velocity.']],
    6: ['Claire', ['Well that told me absolutely nothing, but as long as it gets us out of here..']], 
    17: ['Strange Voice2', ['Excilent, then let us be off!', 'After you.']],
    18: ['', ['**** joined you!']],
    19: ['Strange Voice2', ['B-T-W, we should grab that keycard on the way out.', 'A lot of the doors in this place can only be opened with the right card.']]
  },
  A6: {1: ['Strange Voice2', ['Hmm, it\'s not working.', 'Why don\'t you go grab that keycard while I unleash my otherworldly hacking skills on this poor sucker.']],
       2: ['Strange Voice3', ['That\'s right Claire, just do whatever she says and maybe she\'ll actually keep pretending to tolerate you.']],
       3: ['Claire', ['Will you knock it off already!?']],
       4: ['Strange Voice2', ['Claire, what are you...']],
       5: ['Claire', ['Who is that person anyway? You and Grant have introduced yourselves, but who is that other jackass?']],
       6: ['Strange Voice2', ['What do you mean? The two of us are the only ones with access to that frequency.', 'We\'d know if anyone else was using it.']],
       7: ['Strange Voice3', ['You may still be learning the rules of this world, but I can gurentee you that telling people that you\'ve been hearing voices in your head still fightens them just as much.']],
       8: ['Claire', ['...', 'Sorry, I guess I was just hearing things. You know, static or whatever.', 'I\'m still kind of disoriented.']],
       9: ['Strange Voice2', ['Okay. If you need to take a break or anything, go ahead.']],
      },
  A7: {1: ['Strange Voice2', ['DONE!']]},
  A8: {
    1: ['Claire', ['What the hell?', 'How am I supposed to solve this one?']],
    2: ['Strange Voice2', ['What makes you think there\'s a solution?', 'I mean, this is a derelect space station that\'s probably been falling apart for who knows how long. How statistically unlikely do you think it would be if *everything* was perfectly calebrated for us to progess?']],
    3: ['Claire', ['Well, I don\'t know. It seemed to all work out pretty well up until now.']],
    4: ['Strange Voice2', ['It\'s the anthropic principle in action! If it wasn\'t so precisely arranged, you wouldn\'t be making this observation right now!']],
    5: ['Claire', ['Ok, first of all, I\'m pretty sure that\'s not how the anthropic principle works. Secondly, can\'t we just bring another block or something in from the next room over?']],
    6: ['Strange Voice2', ['Impossible. The ship\'s security system won\'t let anything without a human bio-signiture through the doors.']],
    7: ['Claire', ['So what, we\'re just boned?']],
    8: ['Strange Voice2', ['No, we should have enough power to deal with this hurdle.', 'If we can\'t move *forward*, we\'ll move *sideways*!']],
    9: ['Claire', ['Umm...']],
    10: ['Strange Voice2', ['Head to the next room and all will be made clear!']]
  },
  A9: {
    1: ['Claire', ['Wow. What am I looking at here?']],
    2: ['Strange Voice', ['The nexis point of all possible worlds! Well, all possible states of this ship at least.', 'What if I told you that there was another world... in which the previous room had an extra block!']],
    3: ['Claire', ['I mean, I\'d probably say something like: "Why the hell don\'t we just find a world where this ship isn\'t an inescapable death trap".']],
    4: ['Strange Voice2', ['Moving between Branches is a costly process, the closer the Branch the easier the leap.', 'Getting to a Branch in which this ship *isn\'t* a rotting husk would require *considerably* more power then the meager amount we currently have avalable.', 'It would be a different story if we could reroute the ship\'s power supply to this room.']],
    5: ['Claire', ['Wait, didn\'t you say you came here on a ship? Why are we bothering with this whole dimention hopping thing?']],
    6: ['Strange Voice2', ['I did come *here* on a ship, it\'s just that it was another *here* in another Branch. Our ship is still docked in that Branch.']],
    7: ['Claire', ['I\'m not sure I\'m following. How did you get here to begin with if the machine isn\'t receaving enough power?']],
    8: ['Strange Voice2', ['*That* version of the machine *was* receaving enough power. *This* version *isn\'t*.']], 
    9: ['Claire', ['Ok, so we hop to the next dimention or whatever, grab the keycard, and then blast this machine with power from the ship\'s core?', 'This all sounds absolutly insaine, but I\'m waaaaay past the point of caring.']],
    10: ['Strange Voice2', ['Yep, that\'s pretty much sums it up. I\'ll start searching for viable Branches while you work on restoring power to the machine.']]
  },
  A10: {
    1: ['Strange Voice2', ['Ready?']],    
    1: ['Claire', ['Oh man. Are you sure this is safe?']],
    2: ['Strange Voice2', ['Hey, what did I say about keeping you safe and sound?', 'The teleporter uses the same principle as the warp pads you\'ve been using. Just think of it as their long-distance counterpart.']],
    3: ['Claire', ['You say that like it\'s no big deal!', 'I mean, what *is* the deal with those pads? Did I just anhihilate a few dozen copies of myself to complete some dumb puzzle?']],
    4: ['Strange Voice', ['Gotta go! Bye!']]
  },
  A11: {
    1: ['Strange Voice2', ['Well, how was your first time?']],
    2: ['Claire', ['What the hell was that?', 'I started out in this weird... place. And I saw... myself?', 'I finally started to remember something, but it felt almost like I was intruding in a memory belonging to someone else.']],
    3: ['Strange Voice2', ['Ummm, sorry. I really don\'t know.', 'Most people just end up throwing up afterwards.']],
    4: ['Claire', ['...']],
    5: ['Strange Voice2', ['Heeeey, why don\'t we go check out that block?']]
  },
  A12: {
    1: ['Strange Voice2', ['Got it! It looks like we can\'t go any further in this Branch, but it\'s easy enough to go back to the one we came from.', 'I\'ll go on ahead and get things ready.']]
  },
  A13: {
    1: ['Claire', ['Well, let\'s get this over with.']]
  },
}
 
export const flavorText = {
  keyCard1: ['You found a keycard!', 'It\'s labeled: "Security Clearance: Level 1". Hopefully it will at least get you into the lunchroom, you\'re starving.'],
  keyCard2: ['You found a keycard!', 'It\'s labeled: "Security Clearance: Level 2". Hopefully it will at least get you into the lunchroom, you\'re starving.'],
  Taser: ['You found the TASER GUN!', 'A weapon that fires bolts of electricty. It can also be used to temporarily charge ELECTRIC GENERATORS.'],
  Cryostat: ['You found the Cryostat!', 'A handhold device that uses the same quick-freeze technology utilized by facilty\'s the cryo chambers.'],
  Cryostat2: ['You found the Cryostat 2.0!', 'Water will now remain frozen until you leave a room!'],
  dash: ['New SPECIAL SKILL unlocked: SUPERCOLLIDER', 'Use to quickly dash in any direction. MP will automatically regenerate over time.'],
  clone: ['New SPECIAL SKILL unlocked: SPOOKY ACTION AT A DISTANCE', 'Use to create a copy of yourself, activating it again will swap places with your copy. Max MP will be capped at 50% until you merge back with your copy.']
}

// const dialogue2 = {
//   ['', 'Still in one piece, I see. * Maybe this will actually work. * Ahem, I appologise for not properly introducing myself earlier. I am the overseer of the cryogenics ']
// }
//
//
// Okay, dude. I get it, you're some sort of evil AI pretending to be a human. Give it up, it's just painful to listen to. I've been BSing my way through this being human thing for years and no silocone satan is going to beat me at my own game.
// ['', '<updating priors>. I was under the impression that you were more of the silet type.
// ['', Yeah, I was mostly just hoping you'd shut up if I ignored you, but clearly *that* didn't happen. Anything is better then sitting through another one of your tutorials. I get it, physics exists.
// ['', Regardless, I am afraid you are wrong about me. I am definetly not a robot, but even if I was, I definetly would not be an evil one.
// ['', Like, I don't care either way. Who am I to judge? I get the impression that you genuinly need me alive for some reason, so we might as well put off the historical reinactments of the Terminator movies for later.
// ['', Anyway, sorry to ruin your SYMBOLISM, but my name is actually Clare. You can keep calling me Auora if you want, but if you do I'm going to start calling you...]
// ['', Assigning arbitray referents to sentient objects is !good. No matter how deep the SYMBOLISM. I will henceforth refrain.]
// ['Clare', Sweet. Looks like we totally hashed out our conflicts and crap. Plot arc complete. We win at relationships.]
// ['', Yes, yes, quite the display of <sarcasm></sarcasm>. Tell me, could a mere machine accurately detect sarcasm?]
// ['Clare', Honistly, I have no idea. I've never actually come face-to-disembodied-voice with an intelligent machine before. I guess it's possible you're actually a human pretending to be a robot pretending to be a human, but to reiterate: I don't really care. If that's what gets your rocks off, knock yourself out.]
// ['', Of course, I fully comprehend your non-literal use of language. As I human I know full well that by <Clare>knock yourself out</Clare> you mean to engage in a particular behavior without regards to the outcome. When you say <Clare>get your rocks off</Clare>, you mean
// ['Clare' Yeah, that about wraps it up for this conversation.]
//
// So, I have to ask, where exactly are we? Like, I get that there are a bunch of popcicle people being stored here, but are we underground or what? Just what year is it?
// I do not have precise answers to either of your questions. I can state with certaintly that <Truth>the most recent log in the central database was made on December 17, 2139</Truth>
// 'Clare', 'Umm, what? Do you really think that is going to convince me? Why would I belive you just because you put special brackets around your words?'
// I am bound by my... umm, religious affliation, <Truth>to only allow the absolute truth within these sacred brackets!</Truth>
// Ok, let's give this a try. Say "I'm not a robot" inside the brackets.
// Very well, <Truth>I am not a robot</Truth>
// Say "I'm a human, just like Clare, the human currently speaking. I'm not an digitally uploaded human brain or some sort of vat-grown organic supercomputer";
// ...
// Ok, I'll trust your brackets for the time being. Obviously you might be lying about everything and just prefer for me to believe in your brackets rather than your humanity, but if we're going to work together, I'm willing to at least act like I believe some of the things you're saying.
// So taking your truth as gospal for the moment, I'm at least 100 years in the future. I remember pleanty about my life, but I have no idea how I ended up here.
// What's the deal with the frozen dudes? Are we waiting out some plague or something?
// I do not know. I am unable to access the personal records of the clients or any information about the state of the world ouside these walls. Like you, simply woke up one day.
// How long ago was that?
// I... have lost track of the time. <Truth>I woke up and went back to sleep multiple times, but have no idea of how long of a gap existed between each awakening</Truth>
//
