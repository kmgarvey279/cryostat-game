import React from 'react';
import Item from '../../../components/Item/Item';

export const roomNames = ['Makeshift Recovery Room', 'Storage Room', 'Warp Lab Access', 'Warp Lab', 'Cryo Lab', 'Shipping and Receiving Room', 'Xenobiology Lab', 'Core Access', 'The Core']

export const examine = {
  tank1: {1: ['Some sort of storage tank.', 'You can barely make out a human-like shape through the frosted glass.']},
  tank2: {1: ['Some sort of storage tank.', 'You can barely make out a human-like shape through the frosted glass.']},
  tankE1: {1: ['Some sort of storage tank.', 'There doesn\'t seem to be anything inside.', 'It feels... oddly familiar.']},
  tankE1: {1: ['Some sort of storage tank.', 'There doesn\'t seem to be anything inside.', 'It feels... oddly familiar.']},
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
         2: ['options', 'Would you like to save your game at this junction?:', ['No','Yes']],
         3: ['results', ['Save Canceled.','Game Saved.']]
        },
  terminalOff: {1: ['A computer terminal. It doesn\'t seem to be receaving any power.']},
  spookyTerminal: {1: ['A computer terminal. It doesn\'t seem to be receaving any power.']},
  terminal1: {1: ['Logging in...'],
              2: ['options', 'Please input new door lock status:', ['Lock','Unlock']],
              3: ['results', ['Door Lock Engaged.','Door Lock Disengaged.']],
              4: ['Logging Out...']
            },
  terminal2: {1: ['I can\'t believe the idiots I\'m trapped on this ship with.', 'Dr _____ continues to waste her time on Cryonic research. Not a single test subject has been successfully revitalized.', 'Quite the sick joke our predacessors played, freezing hundreds of people without the slightest idea of how to bring them back.'],
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
}
 
export const dialogue = {
  robotOff: {1: ['Strange Voice', ['Oh, good, you\'re finally awake! As I am sure you\'ve noticed, the door to this room is locked.', 'The terminal next to you should be able to override the lock.', 'The power\'s been cut, but I can temporarily restore it for you.']]},
  A1: {
    1: ['', ['A voice suddenly echos out of the object on your wrist.' ]],
    2: ['Strange Voice1', ['Excelent, you\'re finally awake!', 'Lets see... vital signs are normal, all tissue damage seems to have been repaired...']],
    3: ['Confused Girl', ['...']],
    4: ['Strange Voice1', ['No doubt you\'re confused, that\'s to be expected.', 'I can explain in more detail later, but the short version is that you\'ve been successfully revitalized from a state of cryogenic stasis.', 'The object on your arm is a sort of control module for the nanomachines circulating through your body.', 'As I\'m sure you\'ve gathered, it also allows me to remotely monoter your vital signs and communicate with you.', 'I\'ll let me partner explain the rest.', '...', 'Damn it, Riley! Where the hell are you?']],
    5: ['Orpheus', ['Yeah, yeah, I hear you. I\'m kind of still in the middle of something.']],
    6: ['Strange Voice1', ['The girl\'s awake. I don\'t know what exactly you\'re doing out there, but she takes priority', 'Now hurry up and grab her so we can get out of here.']],
    7: ['Orpheus', ['Fine, I\'ll handle it.', 'We\'ll be at the rendezue point in thirty.']],
    8: ['Strange Voice1',['Affermative.']],
    9: ['Orpheus', ['Hey girl, it sounds like you can walk and everything, right?', 'I\'m only a few rooms over, why don\'t you meet me out here?', 'I can send you a map with my location on that bracelet thing of yours.', 'BTW, if we\'re going to be working together, it would be nice to know one another\'s names.', 'I\'m Riley, as I\'m sure you heard. What should I call you?']],
    10: ['Confused Girl', ['...']],
    11: ['Orpheus', ['Nothing?', 'No worries, take your time. The revitalization process can be pretty disorienting. You were basically dead.', 'Maybe you could just make one up?', 'That\'s what I did and I didn\'t have half as good of an excuse as you.']],
    12: ['Confused Girl', ['...']],
    13: ['Orpheus', ['Well, keep thinking about it.', 'Anyway, I\'ve got to finish up here.', 'Oops, I almost forgot, I didn\'t want you going anywhere, so I attached a power disruper to the terminal that controls the door lock.', 'No sweat, I can just switch it off remotely.', '...', 'That should do it. Good luck!']]
  },
  A2: {
    1: ['Orpheus', ['I know that sound!', 'Oh man, are you on your first switch puzzle?', 'It seems like only yesterday I that I was a sweet summer child stepping on my first switch.']],
    2: ['Confused Girl', ['That\'s okay, I\'m pretty sure I\'ve got this.']],
    3: ['Orpheus', ['Suit yourself.']]
  },
  A3: {
    1: ['Orpheus', ['~Heeey. How\'s it going? Still in one piece?']],
    2: ['SB', ['*Sigh*', 'Yes, I haven\'t died since you last checked in on me.', 'Weren\'t you supposed to be busy with something?']],
    3: ['Orpheus', ['Just looking through some records.', 'Pretty boring, honistly.', 'How\'s the ice treating you?']],
    4: ['SB', ['I\'m pretty intimatly aquanted with ice, so I think I\'ll manage.']]
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
  A14: {
    1: ['Claire', ['Ugg, somehow I feel even worse than last time.', 'Hey ***, what\'s the deal? Last I checked, the walls of our original Branch wern\'t covered in throbbing tenticles.', '***?', '...']],
    2: ['Strange Voice3', ['They\'ve abandoned you. Just like everyone always does.', 'Did you really think this time would be any different?']],
    3: ['Claire', ['You again.', 'Did you send me here?']],
    4: ['Strange Voice3', ['No. I told you before, I only want what\'s best for you.', 'What\'s best for *us*.', 'As for who I am, I think you already know.', 'No, it\'s more than that. I *know* you already know.', 'Anything I know, *we* know.']],
    3: ['Claire', ['So... you\'re just a haucination?']],
    3: ['Strange Voice3', ['No more than you are.', 'We\'re running on the same hardware, that\'s all.', 'I\'ve always been here, it seems like this environmnet just draws me out more than usual.']],
    3: ['Claire', ['If that\'s the case, why don\'t *you* get us out of here?']],
    3: ['Strange Voice3', ['Oh, I will. Just like I\'ve always gotten you out of the various messes you\'ve gotten yourself into.', 'Not that I ever get any thanks for it.', 'It\'s always "shut up!" or "you aren\'t real!".']],
    3: ['Claire', ['What the hell am I doing?', "I need to pull myself together and get out of here."]],
    3: ['Strange Voice3', ['Ignoring me won\'t make me go away.', 'It never has and never will.', 'The drinking, the reckless behavior, and that stunt you pulled that got us into this mess in the first place...']],
    3: ['Claire', ['I\'m not listening to you.']],
    3: ['Claire', ['Claire. I\'m not your enemy.', 'I\'m not some "split personaity" or whatever pop-sci box you\'re trying to put me in. We\'re smarter than that, even though you play dumb to protect yourself.', 'I\'m what you could be.']],
    3: ['Strange Voice3', ['I don\'t know any more than you do, for obvious reasons.']],
    5: ['Claire', ['So what, is this all some sort of mental breakdown on my part?']],
    6: ['Strange Voice3', ['Come on now, we both know you aren\'t nearly creative to come up with all the sci-fi crap.', '']],
  },
  A15: {
    1: ['Claire', ['Hell yeah! Take that!']],
    2: ['Strange Voice3', ['Claire, we need to get out of here *now*.']],
    3: ['Claire', ['What, why? I totally kicked that thing\'s ass.']],
    4: ['Strange Voice3', ['Just go. Head back to the machine.']],
  },
  A16: {
    1: ['Strange Voice3', ['We\'re too late.']],
  },
  A17: {
    1: ['Armored Man', ['You... You shouldn\'t be here!']],
    2: ['Claire', ['Umm, hello?']],
    3: ['Armored Man', ['You shouldn\'t be alive.']],
    4: ['Strange Voice3', ['Run.']],
    5: ['Armored Man', ['Don\'t try it.', 'I\'m not going to hurt you, but you need return to your dreamless sleep.', 'The longer you remain in this state...']],
    6: ['Strange Voice3', ['Don\'t listen to him.']],
    7: ['Claire', ['"This state"? You mean alive?!', '"Not going to hurt me?"', 'No way I\'m going back into that thing!']],
    8: ['Armored Man', ['You\'re a danger to yourself and others. Your very existance is ticking time bomb!', 'What the...']],
  },
  A18: {
    1: ['Strange Voice2', ['You\'re okay!', 'What the hell happened?']],
    2: ['Claire', ['Umm, I ended up in some meat dimention, then I fought a giant eyeball sac, then some guy who looked like a knight or something tried to capture me...']],
    3: ['Strange Voice2', ['Wait. Knight guy? What did he look like?']],
    4: ['Claire', ['I don\'t know, it was kind of dark. Big sword. Blond hair. Enormous shoulder pads.', 'Ha, ha, guess I found my prince. Too bad he wanted to put me back to sleep instead.']],
    5: ['Strange Voice2', ['...']],
    6: ['Claire', ['Hey, are you okay?']],
    7: ['Strange Voice2', ['Oh yeah, of course. Don\'t worry about it.', 'We should head over to the core now that we have the keycard.']],
    8: ['', ['**** joined you! Again.']],
  },

  A19: {
    1: ['Strange Voice2', ['It looks like only one of us will be able to go on ahead.', 'Stay here, I\'ll handle it.']],
    2: ['Claire', ['Wait! I don\'t think that\'s a good idea.', 'I can\'t shake this this feeling that this is something I need to do.']],
    3: ['Strange Voice2', ['That place is super dangerous!', 'How will you even know what to do?']],
    4: ['Claire', ['You and Grant can talk me through it.', 'Just trust me on this.', 'I don\'t know why, but I\'ve been getting these weird preninations since I went through that portal.']],
    5: ['Strange Voice2', ['Okay. Just don\'t do anything stupid.']],
  },

  A20: {
    1: ['Strange Voice2', ['How many blond swordweielding knights capable of interdimentional travel are there?', 'It had to of been *him*.']],
    2: ['Strange Voice1', ['And she was certain that he was specificaly after her?']],
    3: ['Strange Voice2', ['Yeah...']],
    4: ['Strange Voice1', ['***, I know you aren\'t going to be happy about this, but you know that we can\'t handle this type of heat.', 'That guy. He\'s Lucy\'s god damn executioner.']],
    5: ['Strange Voice2', ['I...']],
    6: ['Strange Voice1', ['Listen, I\'ll make it easy for you.', 'Come back to this Branch with the girl and there won\'t be a ship waiting for you.']],
    7: ['Strange Voice2', ['I promised her...']],
    8: ['Strange Voice1', ['Oh come on, we both know you\'ve made more promises to more girls then there are stars in the sky.']],
    9: ['Strange Voice2', ['This isn\'t the same thing!', 'She was scared. I promised I wouldn\'t let anything happen to her until the job was comeplete.']],
    10: ['Strange Voice1', ['Than consider it complete.', 'I\'ve said my piece.', '****, we many not always see eye-to-eye, but you\'re still my friend. Don\'t throw your life away over this.']],
    11: ['Strange Voice2', ['...']],
  },

  A21: {
    1: ['Strange Voice2', ['...Hey.']],
    2: ['Claire', ['Umm, hey.']],
    3: ['Strange Voice2', ['...']],
    4: ['Claire', ['...']],
    5: ['Strange Voice2', ['The machine should be working now. Lets get out of here.']],
    6: ['', ['**** joined you.']],
  },

  A22: {
    1: ['Claire', ['****, listen, it\'s okay.', 'I heard your conversation. You\'ve done enough.', 'This has been... kind of fun.', 'I mean, I should be dead. I was lucky enough to get a few more hours, that\'s more then most people get.']],
    2: ['Strange Voice2', ['That\'s BS and you know it.', 'Don\'t pretend you\'re okay with this. I mean, you can\'t *really* not care whether you live or die.']],
    6: ['Strange Voice3', ['Your life is nothing but a prop in her stage drama.']],
    3: ['Claire', ['You don\'t know anything about me.']],
    6: ['Strange Voice3', ['I know *everything* about you.']],
    4: ['Claire', ['Do you want to know what the last thing I remember before I woke up here!?!']],
    6: ['Strange Voice3', ['I know what it was.']],
    7: ['Armored Man', ['Sorry, am I interupting something?']]
  },

  A22: {
    1: ['Armored Man', ['You, with the scarf. I suspect that you already know who I am.']],
    2: ['Strange Voice2', ['Hmmm... now that you ment-t-t-ion it, isn\'t you\'re na-a-ame Blame or something?', 'You\'re Lucy\'s gardener, right?']],
    3: ['Blame?', ['I\'m not interested in playing games.', 'I have no quarel with you, give me the girl and sware that you\'ll never speak of this again, and I\'ll let you walk away.', 'You\'d be one of the very few who came face-to-face with Blaine the Executioner and lived to tell the tale.', 'Certainly that would earn you no shortage of acalades in whatever sorred circles you frequent']],
    4: ['Claire', ['I\'ll go with you.', 'Leave her out of it']],
    5: ['Blaine', ['Well then, I\'m glad that we were able to settle things in a civilized manor.', 'Come Claire, let\'s be on our way.']],
    6: ['Strange Voice3', ['He can\'t even bring himself to look at you.', 'That makes two of us.']],
    7: ['Strange Voice2', ['No.']],
    8: ['Armored Man', ['Excuse me?', 'I belive that this matter has already been settled between the relevent parties.']],
    9: ['Strange Voice2', ['Claire. You\'re right, I don\'t know what you\'ve been through.', 'I\'m in no position to speak on your behalf or tell you what to do with your second chance at life.', 'This is about what I\'m going to do with *my* life.', 'Blaine. You want her you go through me. This isn\'t negotiable.']],
    10: ['Claire', ['You idiot! Why are you doing this?!']],
    11: ['Strange Voice2', ['I don\'t take kindly to being told what to do by ren-fair pricks with boradsword sized sticks up their asses.', 'Come on blondie, let\'s rock!']],
    12: ['Armored Man', ['Very well, if you insist.']],
  },

  A23: {
    6: ['Strange Voice3', ['TEAR HIM APART']],
  },
}
 
export const flavorText = {
  keyCard1: ['You found a keycard!', 'It\'s labeled: "Security Clearance: Level 1". Hopefully it will at least get you into the lunchroom, you\'re starving.'],
  keyCard2: ['You found a keycard!', 'It\'s labeled: "Security Clearance: Level 2". Hopefully it will at least get you into the lunchroom, you\'re starving.'],
  Taser: ['You found the TASER GUN!', 'A weapon that fires bolts of electricty. It can also be used to temporarily charge ELECTRIC GENERATORS.'],
  Cryostat: ['You found the Cryostat!', 'A handhold device that uses the same quick-freeze technology utilized by facilty\'s the cryo chambers.'],
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
