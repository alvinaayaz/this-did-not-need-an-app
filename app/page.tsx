"use client";

import { useMemo, useState } from "react";

type Case = {
  id: string;
  department: string;
  title: string;
  keywords: string[];
  aliases: string[];
  situation: string[];
  actualProblem: string;
  thoughtLevel: string;
  assessment: string;
  recommendation: string;
  compliance: string;
};

const CASES: Case[] = [
  {
    id: "008421",
    department: "TEXTING",
    title: "THE REPLY LATER SITUATION",
    keywords: [
      "reply",
      "respond",
      "message",
      "text",
      "answer",
      "reply later",
      "respond later",
      "text back",
    ],
    aliases: [
      "don't want to reply",
      "forgot to reply",
      "will reply later",
      "need to reply",
    ],
    situation: [
      "You saw the message.",
      "You mentally replied.",
      "You considered several versions of the reply.",
      "You decided you'd answer when you were \"in the right mood.\"",
      "It has now been several hours.",
      "You are still not in the right mood.",
    ],
    actualProblem: "Replying takes approximately 14 seconds.",
    thoughtLevel: "Unreasonably high",
    assessment:
      "The message is not difficult. You have simply made it an event.",
    recommendation: "Reply.",
    compliance: "Low",
  },
  {
    id: "004821",
    department: "SOCIAL MEDIA",
    title: "THE ACCIDENTAL STORY VIEW",
    keywords: [
      "story",
      "viewed",
      "view",
      "watched",
      "instagram story",
      "accidentally watched",
      "accidentally viewed",
    ],
    aliases: ["saw their story", "watched their story", "viewed their story"],
    situation: [
      "You opened their profile for one completely unrelated reason.",
      "You watched the story.",
      "They posted it approximately three minutes ago.",
      "You immediately exited Instagram.",
      "You have now remembered that they can see who viewed it.",
    ],
    actualProblem: "They can see that you viewed it.",
    thoughtLevel: "Catastrophic",
    assessment: "The evidence is already in their possession.",
    recommendation: "Do absolutely nothing.",
    compliance: "Very low",
  },
  {
    id: "006314",
    department: "TEXTING",
    title: "THE TYPING BUBBLE INCIDENT",
    keywords: [
      "typing",
      "three dots",
      "dots",
      "typing bubble",
      "was typing",
      "stopped typing",
      "typing disappeared",
    ],
    aliases: ["they were typing", "typing then stopped", "stopped typing"],
    situation: [
      "They started typing.",
      "You watched the three dots appear.",
      "They disappeared.",
      "They appeared again.",
      "They disappeared again.",
      "You have now constructed several possible explanations.",
    ],
    actualProblem: "They may have deleted what they typed.",
    thoughtLevel: "Deeply unnecessary",
    assessment:
      "You are currently investigating a message that was never sent.",
    recommendation: "Wait for the actual message.",
    compliance: "Unknown",
  },
  {
    id: "007119",
    department: "FRIEND CONSULTATION",
    title: "THE SCREENSHOT THAT CHANGED NOTHING",
    keywords: [
      "screenshot",
      "screen shot",
      "sent screenshot",
      "chat screenshot",
      "conversation screenshot",
      "asked my friend",
    ],
    aliases: [
      "sent it to my friend",
      "friend said just reply",
      "sent screenshot to friend",
    ],
    situation: [
      "You screenshotted the conversation.",
      "You sent it to your friend.",
      "Your friend said: \"Just reply normally.\"",
      "This was not the answer you wanted.",
      "You sent another screenshot.",
      "Your friend is now providing unpaid customer support.",
    ],
    actualProblem: "You already know what you should do.",
    thoughtLevel: "Requires external consultation",
    assessment:
      "The friend has been consulted. The case remains open.",
    recommendation:
      "Stop sending screenshots and make the decision yourself.",
    compliance: "Historically poor",
  },
  {
    id: "003708",
    department: "TEXT FORENSICS",
    title: "THE 'OKAY' INVESTIGATION",
    keywords: [
      "okay",
      "ok",
      "k",
      "fine",
      "alright",
      "rude",
      "dry",
      "annoyed",
      "angry",
      "tone",
    ],
    aliases: ["they said okay", "why did they say okay", "just said okay"],
    situation: [
      "They said: \"okay.\"",
      "You have considered whether the full stop matters.",
      "You have considered whether the timing matters.",
      "You have considered whether they sound annoyed.",
      "You have considered several alternate meanings.",
    ],
    actualProblem: "The message contains four letters.",
    thoughtLevel: "17 tabs open",
    assessment:
      "Insufficient evidence for the investigation currently underway.",
    recommendation:
      "Read the message literally and move on.",
    compliance: "Extremely unlikely",
  },
  {
    id: "005932",
    department: "DIGITAL SURVEILLANCE",
    title: "THE ONLINE STATUS PROBLEM",
    keywords: [
      "online",
      "active",
      "last seen",
      "online status",
      "active now",
      "checking online",
      "seen online",
    ],
    aliases: [
      "checking if they're online",
      "they are online",
      "why are they online",
    ],
    situation: [
      "You don't want to message them.",
      "You also don't want them to think you don't want to message them.",
      "So you checked whether they're online.",
      "Then you checked again.",
      "You now know their recent activity pattern.",
    ],
    actualProblem:
      "You are monitoring activity instead of making a decision.",
    thoughtLevel: "Suspiciously detailed",
    assessment:
      "The online indicator has provided no useful information.",
    recommendation: "Close the app.",
    compliance: "Poor",
  },
  {
    id: "009144",
    department: "PUBLIC APPEARANCE",
    title: "THE OUTFIT NOBODY NOTICED",
    keywords: [
      "outfit",
      "clothes",
      "dress",
      "wear",
      "what to wear",
      "changed clothes",
      "mirror",
      "appearance",
    ],
    aliases: [
      "nobody noticed",
      "spent forever choosing clothes",
      "changed my outfit",
    ],
    situation: [
      "You spent 45 minutes deciding what to wear.",
      "You changed twice.",
      "You took a mirror picture.",
      "You deleted the mirror picture.",
      "You finally went outside.",
      "Nobody mentioned the outfit.",
    ],
    actualProblem:
      "Nobody mentioning it does not mean nobody noticed.",
    thoughtLevel: "45-minute preparation",
    assessment: "The outfit survived the event.",
    recommendation: "Keep wearing the outfit.",
    compliance: "Acceptable",
  },
  {
    id: "002561",
    department: "PROFILE INVESTIGATION",
    title: "THE 'I'LL JUST CHECK' INCIDENT",
    keywords: [
      "profile",
      "check profile",
      "stalk",
      "stalking",
      "followers",
      "following",
      "old post",
      "old picture",
      "2023",
      "2022",
      "bio",
    ],
    aliases: [
      "checked their profile",
      "looked through their profile",
      "ended up on old posts",
    ],
    situation: [
      "You opened their profile for approximately four seconds.",
      "You noticed a new follower.",
      "You checked who it was.",
      "Then you checked who they follow.",
      "Then you found something from several years ago.",
      "You are now somewhere on the internet you did not need to be.",
    ],
    actualProblem: "You kept checking.",
    thoughtLevel: "Beyond original jurisdiction",
    assessment:
      "The investigation has moved significantly beyond its original purpose.",
    recommendation: "Leave the profile.",
    compliance: "Compromised",
  },
  {
    id: "001873",
    department: "TEXT FORENSICS",
    title: "THE MESSAGE REWRITE DEPARTMENT",
    keywords: [
      "sure",
      "yeah sure",
      "rewrite",
      "rewrote",
      "deleted message",
      "deleted it",
      "typing and deleting",
      "draft",
      "sentence",
    ],
    aliases: [
      "kept rewriting",
      "kept deleting the message",
      "rewrote my message",
    ],
    situation: [
      "You typed: \"yeah sure.\"",
      "Then: \"yeah, sure.\"",
      "Then: \"yeahh sure.\"",
      "Then: \"yeah sure haha.\"",
      "You deleted everything.",
      "You eventually sent: \"sure.\"",
      "You are now concerned that \"sure\" sounded angry.",
    ],
    actualProblem:
      "You sent the shortest possible version after considering every possible version.",
    thoughtLevel: "Disproportionate",
    assessment:
      "The recipient probably read \"sure\" as \"sure.\"",
    recommendation:
      "Do not send a follow-up explaining the tone of \"sure.\"",
    compliance: "Please don't",
  },
  {
    id: "000917",
    department: "MEMORY & REGRET",
    title: "THE THING YOU SAID THREE DAYS AGO",
    keywords: [
      "three days ago",
      "days ago",
      "last week",
      "what i said",
      "said something",
      "embarrassing",
      "embarrassed",
      "cringe",
      "regret",
      "replaying",
    ],
    aliases: [
      "can't stop thinking about it",
      "why did i say that",
      "keep thinking about something i said",
    ],
    situation: [
      "Nobody reacted strangely.",
      "Nobody mentioned it again.",
      "The conversation continued normally.",
      "It is now several days later.",
      "Your brain has decided this is the appropriate time to review the footage.",
      "You have found a better response.",
    ],
    actualProblem: "The conversation is already over.",
    thoughtLevel: "Historically excessive",
    assessment: "There is no active case.",
    recommendation: "Let the past remain unemployed.",
    compliance: "Not expected",
  },

  {
    id: "014622",
    department: "SOCIAL MEDIA",
    title: "THE PROFILE PICTURE CHANGE",
    keywords: [
      "profile picture",
      "profile photo",
      "new profile picture",
      "changed profile picture",
      "changed their picture",
      "new dp",
      "changed dp",
    ],
    aliases: [
      "they changed their profile picture",
      "their profile picture changed",
    ],
    situation: [
      "You opened their profile for no particular reason.",
      "Their profile picture is different.",
      "You noticed immediately.",
      "You have now started wondering when they changed it.",
      "You are also wondering why they changed it.",
      "You are not sure why this information matters.",
    ],
    actualProblem: "Someone changed their profile picture.",
    thoughtLevel: "Unreasonably investigative",
    assessment:
      "A new photograph has been assigned significance without supporting evidence.",
    recommendation: "Continue with your day.",
    compliance: "Poor",
  },
  {
    id: "019304",
    department: "SOCIAL MEDIA",
    title: "THE WRONG PERSON LIKE",
    keywords: [
      "accidentally liked",
      "accidental like",
      "liked an old post",
      "old post like",
      "unliked",
      "unliked it",
      "wrong like",
    ],
    aliases: [
      "liked their old picture",
      "accidentally liked their post",
      "liked something from years ago",
    ],
    situation: [
      "You were scrolling through someone's profile.",
      "You went too far.",
      "You accidentally liked a post from 2021.",
      "You removed the like approximately 0.7 seconds later.",
      "You have now considered deleting Instagram.",
    ],
    actualProblem: "You touched the wrong button.",
    thoughtLevel: "Catastrophic",
    assessment:
      "The like may have generated a notification. The department cannot determine whether it was seen.",
    recommendation: "Do nothing.",
    compliance: "Very low",
  },
  {
    id: "016805",
    department: "TEXTING",
    title: "THE MESSAGE PREVIEW INCIDENT",
    keywords: [
      "notification",
      "message preview",
      "preview",
      "notification preview",
      "haven't opened",
      "not opened",
      "read the notification",
    ],
    aliases: [
      "saw the message in the notification",
      "saw part of their message",
      "haven't opened the chat",
    ],
    situation: [
      "You saw part of their message in the notification.",
      "You know approximately what it says.",
      "You have not opened the chat.",
      "You are waiting until you are in the correct mood to read it.",
      "The message has been sitting there the entire time.",
    ],
    actualProblem: "You have not opened the chat.",
    thoughtLevel: "Unnecessarily scheduled",
    assessment:
      "The message has not become more difficult while remaining unopened.",
    recommendation: "Open it.",
    compliance: "Low",
  },
  {
    id: "018442",
    department: "GROUP CHAT MANAGEMENT",
    title: "THE GROUP CHAT SILENCE",
    keywords: [
      "group chat",
      "group",
      "nobody replied",
      "no one replied",
      "no reply",
      "ignored",
      "left me on seen",
    ],
    aliases: [
      "nobody replied to the group",
      "sent something in the group",
      "someone was online",
    ],
    situation: [
      "You sent a message in the group.",
      "Nobody replied.",
      "One person was online.",
      "Another person viewed the message.",
      "Someone sent a completely unrelated reel.",
      "Your original message remains unanswered.",
    ],
    actualProblem: "Nobody replied to your message.",
    thoughtLevel: "Moderate to severe",
    assessment:
      "The department cannot establish whether this was intentional.",
    recommendation: "Do not send \"guys??\"",
    compliance: "Extremely low",
  },
  {
    id: "013761",
    department: "SOCIAL MEDIA",
    title: "THE FOLLOW REQUEST WAITING ROOM",
    keywords: [
      "follow request",
      "followed",
      "follow back",
      "followed me",
      "following back",
      "request",
      "not followed back",
    ],
    aliases: [
      "they haven't followed me back",
      "they didn't follow back",
      "waiting for them to follow",
    ],
    situation: [
      "You followed them.",
      "They did not follow you back.",
      "You checked once.",
      "Then again.",
      "Then you opened Instagram for an unrelated reason and checked again.",
      "It has been 31 minutes.",
    ],
    actualProblem: "They have not followed you back.",
    thoughtLevel: "Disproportionate",
    assessment:
      "31 minutes is not currently recognized as a meaningful unit of social rejection.",
    recommendation: "Wait.",
    compliance: "Poor",
  },
  {
    id: "017530",
    department: "SOCIAL MEDIA",
    title: "THE OLD COMMENT DISCOVERY",
    keywords: [
      "old comment",
      "comment from",
      "2021",
      "2020",
      "2019",
      "old comments",
      "scrolling",
    ],
    aliases: [
      "found an old comment",
      "saw their old comment",
      "ended up somewhere unrelated",
    ],
    situation: [
      "You were looking at their profile.",
      "You scrolled.",
      "You found a comment from 2022.",
      "You read it.",
      "Then you opened the profile of the person who wrote it.",
      "You are now somewhere completely unrelated to why you opened Instagram.",
    ],
    actualProblem: "You kept scrolling.",
    thoughtLevel: "None at first. Then far too much.",
    assessment:
      "The investigation has left its original jurisdiction.",
    recommendation: "Close Instagram.",
    compliance: "Unknown",
  },
  {
    id: "015244",
    department: "SOCIAL MEDIA",
    title: "THE 'I'LL WATCH IT LATER' STORY",
    keywords: [
      "watch later",
      "watch it later",
      "story expired",
      "expired story",
      "missed story",
      "story disappeared",
    ],
    aliases: [
      "forgot to watch their story",
      "story expired before i watched it",
      "waited too long for the story",
    ],
    situation: [
      "You saw their story.",
      "You thought, \"I'll watch it properly later.\"",
      "You did not.",
      "You remembered at 11:48 PM.",
      "You opened Instagram.",
      "The story expired at 11:42 PM.",
    ],
    actualProblem: "You waited six minutes too long.",
    thoughtLevel: "Embarrassingly high",
    assessment:
      "The department has no authority over expired stories.",
    recommendation: "Accept the loss.",
    compliance: "12%",
  },
  {
    id: "012890",
    department: "SOCIAL MEDIA",
    title: "THE CLOSE FRIENDS QUESTION",
    keywords: [
      "close friends",
      "close friend",
      "green circle",
      "green ring",
      "close friends story",
      "cf story",
    ],
    aliases: [
      "i'm on their close friends",
      "why am i on close friends",
      "they added me to close friends",
    ],
    situation: [
      "They posted something to Close Friends.",
      "You are on Close Friends.",
      "You have no idea why.",
      "You have now started reviewing previous interactions.",
      "You are trying to determine when you were apparently promoted to this position.",
    ],
    actualProblem: "You are on someone's Close Friends list.",
    thoughtLevel: "Under investigation",
    assessment:
      "No formal promotion letter has been issued.",
    recommendation: "Watch the story normally.",
    compliance: "Extremely low",
  },
  {
    id: "011627",
    department: "TEXT FORENSICS",
    title: "THE UNSENT MESSAGE",
    keywords: [
      "unsent",
      "didn't send",
      "did not send",
      "draft message",
      "saved draft",
      "drafts",
    ],
    aliases: [
      "typed a message but didn't send",
      "wrote it but didn't send",
      "message sitting in drafts",
    ],
    situation: [
      "You typed the entire message.",
      "You read it twice.",
      "You decided it was too much.",
      "You deleted half of it.",
      "You decided it was now too little.",
      "The message remains unsent.",
    ],
    actualProblem: "You have not decided whether to send it.",
    thoughtLevel: "Administrative",
    assessment:
      "The draft is doing all the work while you do none of it.",
    recommendation: "Either send it or delete it.",
    compliance: "Unclear",
  },
  {
    id: "010439",
    department: "SOCIAL MEDIA",
    title: "THE STORY REWATCH",
    keywords: [
      "rewatch",
      "re-watched",
      "watched again",
      "story again",
      "viewed again",
      "watching again",
    ],
    aliases: [
      "watched their story twice",
      "rewatched their story",
      "watched the story again",
    ],
    situation: [
      "You watched the story once.",
      "You watched it again.",
      "You were checking one small detail.",
      "You checked another small detail.",
      "You are now aware that you have watched the same 8-second video four times.",
    ],
    actualProblem: "The video is eight seconds long.",
    thoughtLevel: "Forensic",
    assessment:
      "The department has not identified additional information in the fourth viewing.",
    recommendation: "Leave the story alone.",
    compliance: "Questionable",
  },
  {
    id: "018913",
    department: "TEXT FORENSICS",
    title: "THE FULL STOP CASE",
    keywords: [
      "full stop",
      "period",
      "punctuation",
      "punctuation mark",
      "dot at the end",
      "period at the end",
    ],
    aliases: [
      "why did they use a full stop",
      "they put a period",
      "they used a period",
    ],
    situation: [
      "They normally text casually.",
      "This time they used a full stop.",
      "You noticed.",
      "You checked previous messages.",
      "They have used full stops before.",
      "You are still concerned about this one.",
    ],
    actualProblem: "There is a full stop.",
    thoughtLevel: "Forensic",
    assessment:
      "Punctuation has been promoted to circumstantial evidence.",
    recommendation: "Let the sentence end.",
    compliance: "Poor",
  },
  {
    id: "019825",
    department: "TEXTING",
    title: "THE DOUBLE TEXT QUESTION",
    keywords: [
      "double text",
      "double texting",
      "double-text",
      "text again",
      "message again",
      "follow up",
      "follow-up",
      "send another message",
    ],
    aliases: [
      "should i double text",
      "should i text again",
      "want to send another message",
    ],
    situation: [
      "You sent one message.",
      "They have not replied.",
      "You have another completely unrelated thought.",
      "You are now wondering whether sending it would count as double texting.",
      "You have spent longer deciding this than the second message would take to send.",
    ],
    actualProblem: "You want to send another message.",
    thoughtLevel: "Unnecessarily mathematical",
    assessment:
      "There is currently no international limit on consecutive messages.",
    recommendation: "Send it if you actually need to.",
    compliance: "Dependent on confidence",
  },
  {
    id: "014308",
    department: "SOCIAL MEDIA",
    title: "THE ARCHIVE INCIDENT",
    keywords: [
      "archive",
      "archived post",
      "archived picture",
      "archive post",
      "removed post",
      "deleted post",
    ],
    aliases: [
      "they archived a post",
      "why did they archive",
      "they removed their picture",
    ],
    situation: [
      "You noticed one of their posts disappeared.",
      "You checked again.",
      "It was still gone.",
      "You checked another post.",
      "Then another.",
      "You are now monitoring their profile changes.",
    ],
    actualProblem: "Someone archived a post.",
    thoughtLevel: "Moderately alarming",
    assessment:
      "The post has been removed from public view. No further evidence is available.",
    recommendation: "Allow the post to remain archived.",
    compliance: "Good luck",
  },
  {
    id: "016741",
    department: "SOCIAL MEDIA",
    title: "THE BIO CHANGE",
    keywords: [
      "bio",
      "changed bio",
      "new bio",
      "bio changed",
      "instagram bio",
      "profile bio",
    ],
    aliases: [
      "they changed their bio",
      "why did they change their bio",
      "noticed their bio",
    ],
    situation: [
      "Their bio is different.",
      "You noticed within the same day.",
      "You read the new bio several times.",
      "You compared it mentally to the old one.",
      "You are now wondering if one sentence was directed at someone.",
    ],
    actualProblem: "They changed their bio.",
    thoughtLevel: "Unnecessarily interpretive",
    assessment:
      "The department cannot determine the intended audience of a profile description.",
    recommendation: "Do not decode the bio.",
    compliance: "Very low",
  },
  {
    id: "013095",
    department: "SOCIAL MEDIA",
    title: "THE ACTIVE AT 2AM CASE",
    keywords: [
      "2am",
      "2 am",
      "3am",
      "3 am",
      "late night",
      "late at night",
      "online at night",
    ],
    aliases: [
      "they were online at 2am",
      "why were they online so late",
      "saw them online at night",
    ],
    situation: [
      "You were awake late at night.",
      "You checked Instagram.",
      "They were online.",
      "You noticed the time.",
      "You started wondering why they were awake.",
      "You have no information beyond the green dot.",
    ],
    actualProblem: "Another person was awake at 2 AM.",
    thoughtLevel: "Unlicensed surveillance",
    assessment:
      "Being online at 2 AM is not a complete biography.",
    recommendation: "Go to sleep.",
    compliance: "Historically weak",
  },
  {
    id: "017264",
    department: "PUBLIC APPEARANCE",
    title: "THE HELLO THAT FELT WEIRD",
    keywords: [
      "hello",
      "hi",
      "greet",
      "greeting",
      "said hi",
      "said hello",
      "awkward hello",
    ],
    aliases: [
      "my hello was awkward",
      "i said hi weirdly",
      "that hello was weird",
    ],
    situation: [
      "You saw someone you know.",
      "You said hello.",
      "They said hello back.",
      "You kept walking.",
      "You have now replayed the exact way you said hello.",
      "You believe your voice sounded different.",
    ],
    actualProblem: "You said hello to someone.",
    thoughtLevel: "Post-event analysis",
    assessment:
      "No abnormal greeting activity has been confirmed.",
    recommendation: "Continue saying hello when appropriate.",
    compliance: "Hopefully normal",
  },
  {
    id: "011583",
    department: "PUBLIC APPEARANCE",
    title: "THE WALKING PAST SOMEONE CASE",
    keywords: [
      "walked past",
      "walking past",
      "passed by",
      "walk past",
      "saw them in public",
      "saw them outside",
    ],
    aliases: [
      "walked past them",
      "we walked past each other",
      "saw them but didn't say hi",
    ],
    situation: [
      "You saw them in public.",
      "You were close enough to say hello.",
      "Neither of you said anything.",
      "You continued walking.",
      "You have since considered whether you should have said something.",
    ],
    actualProblem: "Two people walked past each other.",
    thoughtLevel: "Retrospectively severe",
    assessment:
      "The opportunity to say hello has passed without incident.",
    recommendation: "Do not reconstruct the hallway footage.",
    compliance: "Uncertain",
  },
  {
    id: "019441",
    department: "FRIENDSHIP",
    title: "THE INVITATION CALCULATION",
    keywords: [
      "invite",
      "invited",
      "invitation",
      "inviting",
      "party",
      "hangout",
      "plans",
    ],
    aliases: [
      "should i invite them",
      "they didn't invite me",
      "why wasn't i invited",
    ],
    situation: [
      "Someone made plans.",
      "You found out about the plans.",
      "You were not directly invited.",
      "You have now reviewed several previous invitations.",
      "You are trying to determine whether this is information or evidence.",
    ],
    actualProblem: "You were not invited to one thing.",
    thoughtLevel: "Comparative",
    assessment:
      "One invitation does not currently establish a pattern.",
    recommendation: "Do not build a spreadsheet.",
    compliance: "Low",
  },
  {
    id: "015607",
    department: "FRIENDSHIP",
    title: "THE REPLY THAT SOUNDED DIFFERENT",
    keywords: [
      "sounds different",
      "sounded different",
      "different tone",
      "tone changed",
      "acting different",
      "behaving different",
    ],
    aliases: [
      "they seem different",
      "they're acting different",
      "their replies feel different",
    ],
    situation: [
      "Their reply was shorter than usual.",
      "You noticed immediately.",
      "You compared it to their previous replies.",
      "You are now looking for a pattern.",
      "No direct evidence has been submitted.",
    ],
    actualProblem: "The reply was shorter.",
    thoughtLevel: "Pattern recognition",
    assessment:
      "A single short reply is insufficient to establish a behavioral trend.",
    recommendation: "Wait for more than one data point.",
    compliance: "Moderate",
  },
  {
    id: "010774",
    department: "DAILY LIFE",
    title: "THE SUPERMARKET AISLE INCIDENT",
    keywords: [
      "supermarket",
      "store",
      "shop",
      "aisle",
      "shopping",
      "forgot what i needed",
      "forgot what i came for",
    ],
    aliases: [
      "forgot what i came for",
      "forgot what i needed",
      "stood in the aisle",
    ],
    situation: [
      "You entered the store knowing exactly what you needed.",
      "You reached the relevant aisle.",
      "You forgot what you needed.",
      "You stood there for approximately thirty seconds.",
      "You checked your phone.",
      "You remembered after walking away.",
    ],
    actualProblem: "Your brain temporarily misplaced one item.",
    thoughtLevel: "Mildly concerning",
    assessment:
      "The item has been successfully recovered from memory.",
    recommendation: "Go back to the aisle.",
    compliance: "Excellent",
  },
  {
    id: "012476",
    department: "DAILY LIFE",
    title: "THE FRIDGE CHECK",
    keywords: [
      "fridge",
      "refrigerator",
      "opened the fridge",
      "open fridge",
      "checking fridge",
      "nothing in the fridge",
    ],
    aliases: [
      "opened the fridge again",
      "keep checking the fridge",
      "nothing changed in the fridge",
    ],
    situation: [
      "You opened the fridge.",
      "There was nothing interesting.",
      "You closed it.",
      "You opened it again approximately four minutes later.",
      "The contents have not changed.",
    ],
    actualProblem: "You expected new food to appear.",
    thoughtLevel: "Optimistic",
    assessment:
      "The refrigerator is not currently known to generate meals.",
    recommendation: "Close the fridge.",
    compliance: "Temporary",
  },
  {
    id: "018026",
    department: "DAILY LIFE",
    title: "THE CHARGER ANGLE PROBLEM",
    keywords: [
      "charger",
      "charging",
      "phone charger",
      "charging cable",
      "cable",
      "plug",
      "charging port",
    ],
    aliases: [
      "charger only works at an angle",
      "phone only charges at an angle",
      "have to hold the charger",
    ],
    situation: [
      "Your phone is charging.",
      "It only charges if the cable is positioned at a specific angle.",
      "You found the angle.",
      "You are now sitting unusually still.",
      "Moving the cable would endanger the connection.",
    ],
    actualProblem: "The charger is not making reliable contact.",
    thoughtLevel: "Physically committed",
    assessment:
      "The charging arrangement is temporary and deeply inconvenient.",
    recommendation: "Replace the cable.",
    compliance: "Will continue until cable dies",
  },
  {
    id: "014950",
    department: "DAILY LIFE",
    title: "THE BEDTIME CALCULATION",
    keywords: [
      "sleep",
      "bedtime",
      "going to bed",
      "sleeping",
      "wake up",
      "hours of sleep",
      "sleep schedule",
    ],
    aliases: [
      "should i sleep now",
      "calculating how much sleep",
      "keep calculating bedtime",
    ],
    situation: [
      "You know you should go to sleep.",
      "You checked the time.",
      "You calculated how many hours you could get.",
      "You checked again ten minutes later.",
      "You recalculated.",
      "You are still awake.",
    ],
    actualProblem: "You are using sleep calculations instead of sleeping.",
    thoughtLevel: "Numerically impressive",
    assessment:
      "The available sleep decreases while the calculation continues.",
    recommendation: "Put the phone down and go to sleep.",
    compliance: "Historically poor",
  },
];

const FALLBACK: Case = {
  id: "000000",
  department: "GENERAL",
  title: "THE THING YOU'RE MAKING INTO A THING",
  keywords: [],
  aliases: [],
  situation: [
    "Something has happened.",
    "It was probably not that serious.",
    "You have nevertheless been thinking about it.",
    "You have now brought it to a website.",
  ],
  actualProblem:
    "You are thinking about it more than the situation requires.",
  thoughtLevel: "Higher than necessary",
  assessment:
    "Further investigation is unlikely to improve the situation.",
  recommendation: "Do nothing for a while.",
  compliance: "We will see",
};

const examples = [
  "I accidentally watched their story",
  "I don't want to reply but I keep thinking about it",
  "They were typing and then stopped",
  "I sent a screenshot of the chat to my friend",
  "They just said okay",
  "I keep checking if they're online",
  "I spent forever choosing what to wear",
  "I checked their profile and ended up looking at old posts",
  "I rewrote my message five times",
  "I keep thinking about something I said three days ago",
  "They changed their profile picture",
  "I accidentally liked their old post",
  "I saw part of their message in the notification",
  "Nobody replied in the group chat",
  "They haven't followed me back",
  "I found an old comment on their profile",
  "I forgot to watch their story and it expired",
  "I'm on their close friends list",
  "I typed a message but didn't send it",
  "I watched their story four times",
  "Why did they use a full stop",
  "Should I double text",
  "They archived a post",
  "They changed their bio",
  "They were online at 2am",
  "I said hi and it sounded weird",
  "I walked past them and didn't say hello",
  "They made plans and didn't invite me",
  "Their reply felt different",
  "I opened the fridge again",
];

function findCase(input: string): Case {
  const text = input.toLowerCase().trim();

  let bestCase: Case | null = null;
  let bestScore = 0;

  for (const item of CASES) {
    let score = 0;

    for (const keyword of item.keywords) {
      if (text.includes(keyword)) {
        score += keyword.includes(" ") ? 4 : 2;
      }
    }

    for (const alias of item.aliases) {
      if (text.includes(alias)) {
        score += 5;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestCase = item;
    }
  }

  return bestCase || FALLBACK;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<"home" | "checking" | "result">(
    "home"
  );
  const [caseFile, setCaseFile] = useState<Case | null>(null);
  const [caseNumber, setCaseNumber] = useState("");
  const [checkText, setCheckText] = useState("checking...");

  const detectedCase = useMemo(() => findCase(input), [input]);

  function diagnose() {
    if (!input.trim()) return;

    setStage("checking");
    setCheckText("checking...");

    setTimeout(() => {
      setCheckText("checking again...");
    }, 500);

    setTimeout(() => {
      setCheckText("unfortunately, yes.");
    }, 1000);

    setTimeout(() => {
      setCaseFile(detectedCase);
      setCaseNumber(
        Math.floor(100000 + Math.random() * 899999).toString()
      );
      setStage("result");
    }, 1500);
  }

  function reset() {
    setInput("");
    setCaseFile(null);
    setCaseNumber("");
    setStage("home");
  }

  function randomExample() {
    const example =
      examples[Math.floor(Math.random() * examples.length)];

    setInput(example);
  }

  return (
    <main
      className="min-h-screen"
      style={{
        background: "#fffff8",
        color: "#111",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div className="mx-auto max-w-[760px] px-5 py-5 sm:px-8">

        {/* HOME */}
        {stage === "home" && (
          <>
            <header className="border-b border-black pb-2">
              <div className="flex items-end justify-between">
                <div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      reset();
                    }}
                    className="text-[16px] font-bold underline"
                  >
                    THIS DID NOT NEED AN APP
                  </a>

                  <div className="mt-1 text-[11px] text-gray-600">
                    the website nobody asked for
                  </div>
                </div>

                <div className="hidden text-right text-[10px] text-gray-500 sm:block">
                  last updated: probably never
                  <br />
                  visitors: who knows
                </div>
              </div>
            </header>

            <div className="mt-2 bg-[#eeeeee] px-2 py-1 text-[11px]">
              <span>you are here:</span>{" "}
              <a href="#" className="underline">
                home
              </a>{" "}
              /{" "}
              <span>unnecessary problems</span>
            </div>

            <section className="mt-12">
              <p className="font-mono text-[12px]">
                hello internet stranger.
              </p>

              <h1 className="mt-4 max-w-[590px] text-[31px] font-bold leading-tight sm:text-[42px]">
                what is bothering you for absolutely no good reason?
              </h1>

              <p className="mt-5 max-w-[500px] text-[13px] leading-6">
                tell me the situation. it can be small. actually, small is
                better.
                <br />
                <br />
                this is not therapy. this is not medical advice. this is
                barely a website.
              </p>

              <div className="mt-8 max-w-[610px]">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                      diagnose();
                    }
                  }}
                  placeholder="type your problem here..."
                  className="min-h-[115px] w-full resize-y border border-black bg-white p-2 text-[13px] leading-5 outline-none"
                />

                <div className="mt-2">
                  <button
                    onClick={diagnose}
                    disabled={!input.trim()}
                    className="border border-black bg-[#eeeeee] px-3 py-1 text-[12px] hover:bg-[#dddddd] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    investigate
                  </button>

                  <button
                    onClick={randomExample}
                    className="ml-3 text-[11px] underline"
                  >
                    give me a problem instead
                  </button>
                </div>
              </div>
            </section>

            <section className="mt-20 border-t border-black pt-3">
              <p className="text-[11px] font-bold">
                some things people have apparently needed investigated:
              </p>

              <ul className="mt-3 list-inside list-disc space-y-1 text-[12px]">
                <li>accidentally watching someone's story</li>
                <li>thinking "okay" sounded rude</li>
                <li>rewriting a two-word message</li>
                <li>checking whether someone is online</li>
                <li>remembering something embarrassing from three days ago</li>
              </ul>
            </section>

            <footer className="mt-20 border-t border-gray-400 pt-3 pb-8 text-[10px] text-gray-500">
              <p>
                © 2026 THIS DID NOT NEED AN APP. made for no particular
                reason.
              </p>
              <p className="mt-1">
                please do not contact the webmaster about your case.
              </p>
            </footer>
          </>
        )}

        {/* CHECKING */}
        {stage === "checking" && (
          <section className="mt-24">
            <p className="font-mono text-[12px]">
              DEPARTMENT OF UNNECESSARY PROBLEMS
            </p>

            <hr className="my-3 border-black" />

            <p className="text-[15px]">
              your problem is being investigated.
            </p>

            <p className="mt-8 font-mono text-[13px]">
              {checkText}
            </p>

            <p className="mt-6 text-[11px] text-gray-500">
              please wait. there is not actually that much to investigate.
            </p>
          </section>
        )}

        {/* RESULT */}
        {stage === "result" && caseFile && (
          <>
            <header className="border-b border-black pb-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  reset();
                }}
                className="text-[16px] font-bold underline"
              >
                THIS DID NOT NEED AN APP
              </a>

              <div className="mt-1 text-[11px] text-gray-600">
                the website nobody asked for
              </div>
            </header>

            <div className="mt-2 bg-[#eeeeee] px-2 py-1 text-[11px]">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  reset();
                }}
                className="underline"
              >
                home
              </a>{" "}
              / case file / {caseNumber}
            </div>

            <section className="mt-10">
              <div className="text-[11px] text-gray-600">
                department: {caseFile.department.toLowerCase()}
              </div>

              <div className="mt-1 text-[11px] text-gray-600">
                case number: {caseNumber}
              </div>

              <div className="mt-1 text-[11px] text-gray-600">
                status: closed
              </div>

              <h1 className="mt-8 max-w-[650px] text-[27px] font-bold leading-tight sm:text-[36px]">
                {caseFile.title.toLowerCase()}
              </h1>

              <div className="mt-7 max-w-[590px] text-[14px] leading-7">
                {caseFile.situation.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>

              <div className="mt-9 max-w-[590px] border border-black bg-[#f2f2f2] p-3">
                <div className="text-[11px] font-bold">
                  actual problem:
                </div>

                <div className="mt-1 text-[13px]">
                  {caseFile.actualProblem}
                </div>
              </div>

              <div className="mt-4 max-w-[590px] border border-black bg-[#f2f2f2] p-3">
                <div className="text-[11px] font-bold">
                  amount of thought given:
                </div>

                <div className="mt-1 text-[13px]">
                  {caseFile.thoughtLevel}
                </div>
              </div>

              <div className="mt-9 max-w-[590px]">
                <div className="text-[11px] font-bold">
                  official assessment:
                </div>

                <p className="mt-2 text-[14px] leading-6">
                  {caseFile.assessment}
                </p>
              </div>

              <div className="mt-8 max-w-[590px]">
                <div className="text-[11px] font-bold">
                  recommendation:
                </div>

                <p className="mt-2 text-[15px] font-bold">
                  {caseFile.recommendation}
                </p>
              </div>

              <div className="mt-8 max-w-[590px] text-[11px]">
                likelihood of following recommendation:{" "}
                <b>{caseFile.compliance}</b>
              </div>
            </section>

            <section className="mt-12 max-w-[590px] border-t border-black pt-4">
              <button
                onClick={reset}
                className="text-[12px] underline"
              >
                ← submit another unnecessary problem
              </button>
            </section>

            <footer className="mt-20 border-t border-gray-400 pt-3 pb-8 text-[10px] text-gray-500">
              <p>
                THIS DID NOT NEED AN APP™
              </p>
              <p className="mt-1">
                case closed. probably.
              </p>
            </footer>
          </>
        )}
      </div>
    </main>
  );
}