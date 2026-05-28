const QUESTIONS_DATA = {
  "mc": [
    // ── LITERARY TERMS (23) ───────────────────────────────────────────────────
    {
      "unit":"lt","exam":true,
      "q":"What is imagery in literature?",
      "correct":"Language that appeals to the senses: sight, sound, smell, taste, or touch",
      "wrong":["A comparison using 'like' or 'as'","The central message or lesson of a text","A direct comparison without 'like' or 'as'"],
      "exp":"Imagery is sensory language — it puts the reader inside the scene. In Night, Wiesel uses imagery of smoke, flames, and corpses to create visceral horror that stays with the reader."
    },
    {
      "unit":"lt","exam":true,
      "q":"What is the theme of a text?",
      "correct":"The central message or lesson",
      "wrong":["The time and place of a story","The author's attitude toward the subject","The feeling or atmosphere experienced by the reader"],
      "exp":"Theme is the big idea or lesson the whole text is exploring. Both Night and R&J explore themes like hatred, loss of innocence, and failed communication."
    },
    {
      "unit":"lt","exam":true,
      "q":"What is tone in literature?",
      "correct":"The author's or speaker's attitude toward the subject",
      "wrong":["The feeling or atmosphere experienced by the reader","The central message of a text","How an author reveals a character's personality"],
      "exp":"Remember: tone = the writer's attitude. Wiesel's tone in Night is somber and reflective. Mood is the reader's feeling — dark and hopeless. Author → Tone. Reader → Mood."
    },
    {
      "unit":"lt","exam":true,
      "q":"What is mood in literature?",
      "correct":"The feeling or atmosphere experienced by the reader",
      "wrong":["The author's attitude toward the subject","A repeated image or pattern throughout a text","The literal dictionary meaning of a word"],
      "exp":"Mood is what you feel as you read. Night's mood is grief, dread, and despair. R&J shifts from romantic to tragic. Mood = reader's emotional experience."
    },
    {
      "unit":"lt","exam":true,
      "q":"What is the key difference between a simile and a metaphor?",
      "correct":"A simile uses 'like' or 'as'; a metaphor makes a direct comparison without them",
      "wrong":["A simile is longer than a metaphor","A simile compares people; a metaphor compares objects","A simile appears only in poetry; a metaphor appears only in prose"],
      "exp":"The only test: does it use 'like' or 'as'? 'Juliet is the sun' = metaphor (direct). 'Juliet shines like the sun' = simile. Romeo's balcony speech uses metaphor."
    },
    {
      "unit":"lt","exam":false,
      "q":"What is personification?",
      "correct":"Giving human qualities to something nonhuman",
      "wrong":["A comparison using 'like' or 'as'","A story with both a literal and a deeper symbolic meaning","An oversimplified belief about a group of people"]
    },
    {
      "unit":"lt","exam":true,
      "q":"What is foreshadowing?",
      "correct":"Hints or clues in a text about what will happen later",
      "wrong":["A scene that interrupts the present to show something from the past","A character speaking their thoughts aloud, often alone on stage","The emotional association of a word beyond its dictionary meaning"],
      "exp":"Friar Lawrence's 'These violent delights have violent ends' is the clearest foreshadowing in R&J — it predicts the ending exactly. Mrs. Schächter's fire visions in Night also foreshadow what awaits."
    },
    {
      "unit":"lt","exam":true,
      "q":"What is a soliloquy?",
      "correct":"A long speech where a character speaks their thoughts aloud, often alone on stage",
      "wrong":["A comparison using 'like' or 'as'","Hints or clues about what will happen later","The central message or lesson of a text"],
      "exp":"Shakespeare uses soliloquies to let us hear what characters really think — their private thoughts. The balcony scene and Juliet's 'What's in a name?' are both soliloquies."
    },
    {
      "unit":"lt","exam":true,
      "q":"What is dramatic irony?",
      "correct":"When the audience knows something that the characters in the story do not know",
      "wrong":["A comparison using 'like' or 'as'","A character speaking their thoughts aloud on stage","Two contradictory words placed together"],
      "exp":"Dramatic irony peaks in Acts 4–5 of R&J: the audience knows Juliet is alive while Romeo believes she is dead. We watch him drink poison next to a living person — our foreknowledge makes it agonizing."
    },
    {
      "unit":"lt","exam":true,
      "q":"What is a memoir?",
      "correct":"A nonfiction account based on personal experience and memory",
      "wrong":["A fictional story with a deeper symbolic meaning","A story told entirely through letters or journal entries","A collection of poems about a single subject"],
      "exp":"Night is the only memoir in this exam. Unlike fiction, it is Wiesel's actual testimony — which gives it particular moral and historical weight. Knowing this genre matters for understanding its purpose."
    },
    {
      "unit":"lt","exam":false,
      "q":"What is an oxymoron?",
      "correct":"Two contradictory words placed together — for example, 'sweet sorrow'",
      "wrong":["A comparison using 'like' or 'as'","A repeated image or pattern throughout a text","Giving human qualities to something nonhuman"]
    },
    {
      "unit":"lt","exam":true,
      "q":"Iambic pentameter is best described as:",
      "correct":"A poetic rhythm with 10 syllables per line, alternating unstressed and stressed syllables (da-DUM × 5)",
      "wrong":["A 14-line poem with a specific rhyme scheme","A type of speech where a character summarizes the plot","A narrative device where the story is told backward"],
      "exp":"Count the beats: 'but SOFT! what LIGHT through YON-der WIN-dow BREAKS?' — 10 syllables, 5 pairs of unstressed-stressed. Shakespeare uses it for noble characters."
    },
    {
      "unit":"lt","exam":false,
      "q":"What is denotation?",
      "correct":"The literal dictionary definition of a word",
      "wrong":["The emotional or cultural association of a word beyond its literal meaning","The main message or lesson of a text","The author's attitude toward a subject"]
    },
    {
      "unit":"lt","exam":false,
      "q":"What is connotation?",
      "correct":"The emotional or cultural association of a word, beyond its literal meaning",
      "wrong":["The literal dictionary definition of a word","The time and place where a story takes place","How an author reveals a character's personality"]
    },
    {
      "unit":"lt","exam":true,
      "q":"What is the difference between a symbol and a motif?",
      "correct":"A symbol represents a bigger idea; a motif is a repeated image, word, or pattern throughout a text",
      "wrong":["A symbol always appears visually; a motif is always spoken aloud","A symbol appears only at the end; a motif only at the beginning","A symbol is used in poetry; a motif is used only in drama"],
      "exp":"'Night' and 'darkness' are motifs in Night — they repeat across the whole memoir. The corpse in the mirror at the end is a symbol — one powerful image representing Elie's spiritual death."
    },
    {
      "unit":"lt","exam":false,
      "q":"What is an allegory?",
      "correct":"A story with both a literal meaning and a deeper symbolic meaning",
      "wrong":["A story told by a narrator not involved in the events","A direct comparison without 'like' or 'as'","A nonfiction account based on personal memory"]
    },
    {
      "unit":"lt","exam":true,
      "q":"Internal conflict involves:",
      "correct":"A struggle within a character's own mind, emotions, or conscience",
      "wrong":["A struggle between two opposing characters","A struggle between a character and nature","A struggle between a character and society's laws"],
      "exp":"In Night, Elie's crisis of faith is internal conflict. His struggle against Nazi oppression is external. In R&J, Romeo's guilt after killing Tybalt is internal; the feud is external. Both characters experience both types."
    },
    {
      "unit":"lt","exam":false,
      "q":"What is characterization?",
      "correct":"How an author reveals a character's personality — through actions, words, thoughts, appearance, and others' reactions",
      "wrong":["The central message or lesson of a text","The time and place where a story takes place","Hints or clues about future events"]
    },
    {
      "unit":"lt","exam":true,
      "q":"In plot structure, the climax is:",
      "correct":"The major turning point or moment of highest tension",
      "wrong":["The introduction of characters and background conflict","The events that build tension toward the main conflict","The point where the conflict ends or reaches closure"],
      "exp":"In R&J, the climax is Act 3: Mercutio's death, Tybalt's death, Romeo's banishment. Everything before is rising action; everything after spirals toward tragedy."
    },
    {
      "unit":"lt","exam":true,
      "q":"What is exposition in plot structure?",
      "correct":"The introduction of the setting, characters, and background conflict",
      "wrong":["The major turning point of the story","The events after the climax as consequences unfold","The point where the conflict is fully resolved"],
      "exp":"The five parts in order: Exposition → Rising Action → Climax → Falling Action → Resolution. Know them all. In R&J, Act 1 is mostly exposition establishing the feud and characters."
    },
    {
      "unit":"lt","exam":false,
      "q":"What is a stereotype?",
      "correct":"An oversimplified belief about an entire group of people",
      "wrong":["A repeated image or pattern throughout a text","A comparison that gives human qualities to something nonhuman","A story with a deeper symbolic meaning beneath the surface"]
    },
    {
      "unit":"lt","exam":false,
      "q":"What is subtext?",
      "correct":"A hidden or underlying meaning beneath what a character literally says",
      "wrong":["A repeated image or pattern in a text","The literal surface meaning of a character's speech","The emotional atmosphere created for the reader"]
    },
    {
      "unit":"lt","exam":false,
      "q":"What is a flashback?",
      "correct":"A scene that interrupts the present action to show something that happened in the past",
      "wrong":["A hint or clue about events that will happen later","A moment when a character speaks their thoughts aloud on stage","A comparison giving human qualities to something nonhuman"]
    },

    // ── NIGHT (25) ────────────────────────────────────────────────────────────
    {
      "unit":"night","exam":true,
      "q":"Who is Moishe the Beadle, and what role does he play in Night?",
      "correct":"Elie's spiritual mentor who is deported early, witnesses Nazi atrocities, returns to warn the community, and is ignored",
      "wrong":["Elie's father who guides him through the concentration camps","A camp guard who secretly shows small acts of kindness to prisoners","A rabbi who continues to lead prayer services inside the camps"],
      "exp":"Moishe's ignored warning establishes Night's central pattern: people who see the danger are dismissed. His story makes the tragedy feel preventable — which makes it even more devastating."
    },
    {
      "unit":"night","exam":true,
      "q":"What does Mrs. Schächter see in her visions on the cattle car?",
      "correct":"Fire and flames, which foreshadow what they will find at the camps",
      "wrong":["Dead bodies piled along the railroad tracks","A vast darkness with no light or hope","A group of prisoners being marched into a forest"],
      "exp":"Mrs. Schächter's visions are literal foreshadowing — she sees the crematorium flames before anyone else. She is silenced and tied up. Her visions prove completely true. Another ignored warning."
    },
    {
      "unit":"night","exam":true,
      "q":"What does 'night' primarily symbolize throughout Wiesel's memoir?",
      "correct":"Suffering, spiritual darkness, the absence of God, loss of innocence, and death",
      "wrong":["Hope and eventual freedom from the camps","The death of the body but survival of the spirit","The literal working hours prisoners endured in the dark"],
      "exp":"The title is itself symbolic. Night appears at every major horror: the first night at Birkenau, the death marches, his father's death. It represents total darkness — literal and spiritual."
    },
    {
      "unit":"night","exam":true,
      "q":"What is the significance of the 'Never shall I forget' passage?",
      "correct":"It marks the permanent destruction of Elie's faith and identity after his first night at Birkenau",
      "wrong":["It is Elie's vow to survive and tell the world what happened","It is a prayer Elie recites to find strength during the worst moments","It describes the night Elie is separated from his father"],
      "exp":"This passage functions as an inverted prayer — echoing the structure of Jewish memorial prayer but recording loss instead of praise. It marks the permanent shattering of Elie's faith."
    },
    {
      "unit":"night","exam":true,
      "q":"Why does Elie refuse to fast during Yom Kippur in Chapter 5?",
      "correct":"His father urges him to eat to preserve his strength, and Elie also sees it as a silent protest against a God he is questioning",
      "wrong":["He has completely lost his faith and sees no point in any religious observance","He is too physically exhausted and weak to consider fasting","The camp guards force prisoners to work and eat on Jewish holidays"],
      "exp":"Both reasons matter. His father's practical advice is the immediate cause. But Elie's own rebellion — refusing to observe a God who seems absent — is the deeper significance. It shows his evolving spiritual crisis."
    },
    {
      "unit":"night","exam":false,
      "q":"In Chapter 5, why does Elie run fast during the SS doctor's examination?",
      "correct":"He wants to appear healthy and avoid being selected for liquidation",
      "wrong":["He is terrified of the doctor and tries to escape the line","He wants to reach his father before they are separated","He is trying to show he can still work in order to earn extra food"]
    },
    {
      "unit":"night","exam":false,
      "q":"Why is Elie put in the camp hospital?",
      "correct":"His foot becomes swollen and infected, requiring surgery to save his leg",
      "wrong":["He collapses from exhaustion during a forced work detail","He received a severe wound during a beating by the guards","He has a high fever and is near death from infection"]
    },
    {
      "unit":"night","exam":true,
      "q":"What happened to the prisoners who stayed in the hospital when the camp was evacuated?",
      "correct":"They were liberated by the advancing Russian army",
      "wrong":["They were executed by the retreating Nazi guards","They were transferred to a camp farther from the front lines","They were left to starve without food or care"],
      "exp":"Situational irony: Elie and his father left the hospital to survive — but the hospital was liberated. Their survival instinct put them in greater danger. This is the key irony of Chapter 5."
    },
    {
      "unit":"night","exam":true,
      "q":"Which literary device appears in this quote from Night: 'I've got more faith in Hitler than in anyone else. He's the only one who has kept his promises to the Jewish people.'",
      "correct":"Irony",
      "wrong":["Simile","Metaphor","Personification"],
      "exp":"This is dark verbal irony. The speaker means the opposite of what the words literally say — Hitler's 'promise' was genocide. Praising Hitler for 'reliability' is bitterly, tragically ironic."
    },
    {
      "unit":"night","exam":false,
      "q":"What does the 'black flame' metaphor symbolize in Night?",
      "correct":"The hell of the Holocaust — destructive force, literal fire, and the soot from the crematorium chimneys",
      "wrong":["The smoke rising from prayer candles in abandoned synagogues","The darkness of the night sky that the prisoners endured","The burning hatred that drove the Nazi ideology"]
    },
    {
      "unit":"night","exam":true,
      "q":"What does Juliek's violin playing after the death march represent?",
      "correct":"Rebellion — he creates beauty and humanity in a place designed to destroy both",
      "wrong":["Surrender to despair after giving up hope of survival","A private act of prayer in defiance of the camp guards","The last act of a person who knows he will not survive"],
      "exp":"Juliek defies the camp's purpose: by creating beauty in a place designed to destroy it, he asserts that human dignity cannot be fully erased. He dies that night. His final act is one of Night's most powerful moments of resistance."
    },
    {
      "unit":"night","exam":false,
      "q":"In the 'Never shall I forget' passage, what does the 'silent sky' suggest?",
      "correct":"God does not appear to be responding to the suffering of the prisoners",
      "wrong":["The night air is peaceful despite the horror occurring below","There is hope in the natural world even in the darkest moments","The prisoners have accepted their fate and stopped calling out to God"]
    },
    {
      "unit":"night","exam":false,
      "q":"Which details from Night's bread-on-the-train scene show dehumanization?",
      "correct":"Men trampling and mauling each other; prisoners compared to beasts of prey; spectators watching with amusement",
      "wrong":["Guards throwing bread only to prisoners who showed obedience","Prisoners sharing small amounts equally to preserve human dignity","Prisoners refusing the bread as an act of collective protest"]
    },
    {
      "unit":"night","exam":false,
      "q":"What inheritance does Elie's father give him before the selection in Chapter 5?",
      "correct":"A spoon and a knife",
      "wrong":["A prayer shawl and a small book of Psalms","His wedding ring and a photograph of the family","An address in Hungary where a cousin had escaped"]
    },
    {
      "unit":"night","exam":true,
      "q":"What does Elie do when he wakes up and discovers his father has died?",
      "correct":"He does not weep",
      "wrong":["He cries out and searches the barracks","He falls to his knees and prays for the first time in months","He tries to find the guard responsible for his father's death"],
      "exp":"The absence of tears is not coldness — it is total emotional depletion. Wiesel is brutally honest about this. After his father's death, he dreams only of soup. The camps have stripped even grief from him."
    },
    {
      "unit":"night","exam":false,
      "q":"After his father's death, what does Elie dream about?",
      "correct":"Soup",
      "wrong":["His mother and sister back in Sighet","Being freed and returning home to his family","His father's face telling him to survive and remember"]
    },
    {
      "unit":"night","exam":true,
      "q":"In the final mirror passage of Night, what does the 'corpse' Elie sees symbolize?",
      "correct":"Elie's spiritual death — the permanent loss of his innocence, faith, and former identity",
      "wrong":["The physical suffering and starvation Elie survived","All of the prisoners who died while Elie was unable to help them","The literal toll of malnutrition on Elie's physical body"],
      "exp":"The mirror passage is the memoir's closing image. The corpse is not literally Elie — it represents the person he was before the Holocaust. That person did not survive, even though Elie's body did."
    },
    {
      "unit":"night","exam":true,
      "q":"Why does Wiesel refer to his mirror reflection as 'his' and 'he' rather than 'my' and 'I'?",
      "correct":"To highlight the psychological separation between himself and the person who endured the Holocaust",
      "wrong":["To create emotional distance that makes the trauma easier for readers","Because the memoir was originally written in French and lost nuance in translation","To protect his identity and preserve anonymity after the war"],
      "exp":"By using third person, Wiesel creates distance from the person in the mirror — showing the psychological split between survivor and victim. They feel like two different people."
    },
    {
      "unit":"night","exam":true,
      "q":"In Night, 'cargo' refers to:",
      "correct":"The Jewish prisoners — treating human beings as freight rather than people",
      "wrong":["The belongings stripped from prisoners upon arrival","Food supplies the prisoners were forced to transport","The bodies of those who died during the march"],
      "exp":"Calling prisoners 'cargo' is a dehumanization technique. By treating people as freight, the Nazis removed their identity. Word choice matters: this is connotation — 'cargo' implies lifeless objects, not people."
    },
    {
      "unit":"night","exam":false,
      "q":"What does Elie realize when he watches Rabbi Eliahu's son leave his father behind?",
      "correct":"He understands he himself may be capable of abandoning his own father under extreme pressure",
      "wrong":["He is grateful that his own father is still strong enough to keep pace","He decides to help Rabbi Eliahu even if it risks his own life","He loses all remaining faith in the idea of Jewish community and solidarity"]
    },
    {
      "unit":"night","exam":false,
      "q":"Of approximately 100 prisoners on the train to Buchenwald, how many survive the journey?",
      "correct":"12",
      "wrong":["27","50","3"]
    },
    {
      "unit":"night","exam":true,
      "q":"Night is classified as which genre?",
      "correct":"Memoir — a nonfiction account based on personal experience and memory",
      "wrong":["Historical novel — fiction based on real events","Autobiography — a full account of a person's entire life","Allegory — a fictional story with symbolic meaning"],
      "exp":"This distinction matters for the exam. Night is a memoir, not a novel or autobiography. It is Wiesel's firsthand testimony — its power comes from being true."
    },
    {
      "unit":"night","exam":false,
      "q":"What did Moishe the Beadle and Mrs. Schächter have in common?",
      "correct":"Both warned the community about the coming danger and were ignored or dismissed",
      "wrong":["Both were family members of Elie who died during the deportation","Both escaped the camps and returned to warn others from firsthand experience","Both were religious leaders who helped sustain faith inside the camps"]
    },
    {
      "unit":"night","exam":false,
      "q":"Why do the Jewish prisoners defy the order to gather in the Appellplatz near the end of Night?",
      "correct":"They are warned that the Germans intend to shoot them there before the camp is liberated",
      "wrong":["They are too exhausted to move from the barracks","They are staging a protest against the camp's conditions","They have heard the liberating army is only hours away"]
    },

    // ── ROMEO AND JULIET (34) ─────────────────────────────────────────────────
    {
      "unit":"rj","exam":true,
      "q":"What punishment does Prince Escalus threaten if the Montague and Capulet families fight in the streets again?",
      "correct":"Death",
      "wrong":["Banishment from Verona","Heavy fines and public imprisonment","Loss of their noble titles and estates"],
      "exp":"The punishment is death — not exile or a fine. This establishes deadly stakes from the very first scene. The feud has already escalated to a level where the Prince threatens execution."
    },
    {
      "unit":"rj","exam":false,
      "q":"Why is Romeo depressed at the beginning of Act 1?",
      "correct":"He is lovesick over a girl named Rosaline who does not return his affection",
      "wrong":["His father has fallen ill and left the family in debt","He has been secretly banished for a previous offense","He is grieving the recent death of a close friend"]
    },
    {
      "unit":"rj","exam":false,
      "q":"What does Paris ask Lord Capulet's permission to do?",
      "correct":"Marry Juliet",
      "wrong":["Court Juliet without a formal commitment","Take Juliet to the royal court as a guest","Arrange a formal truce between the two feuding families"]
    },
    {
      "unit":"rj","exam":false,
      "q":"Why does Lord Capulet hesitate to give Paris permission to marry Juliet right away?",
      "correct":"Juliet is too young, and he wants her to have some say in the decision",
      "wrong":["He has already secretly promised Juliet to another suitor","He believes Paris is not wealthy enough for his family's status","He does not fully trust Paris's intentions toward his daughter"]
    },
    {
      "unit":"rj","exam":true,
      "q":"How old is Juliet at the beginning of Romeo and Juliet?",
      "correct":"13, almost 14 years old",
      "wrong":["16","18","17"],
      "exp":"The text specifies she is 13 and her birthday (which would make her 14) is two weeks away. This age makes her vulnerability and the adults' choices around her even more significant."
    },
    {
      "unit":"rj","exam":false,
      "q":"Which character is described as hotheaded, witty, and playful — Romeo's close friend?",
      "correct":"Mercutio",
      "wrong":["Benvolio","Tybalt","Paris"]
    },
    {
      "unit":"rj","exam":false,
      "q":"How do Romeo and Juliet react when they discover each other's family identities at the Capulet party?",
      "correct":"They are shocked and devastated — they have fallen in love with an enemy",
      "wrong":["They agree to meet secretly the following morning","They decide their love is impossible and part immediately","They immediately make plans to elope and leave Verona"]
    },
    {
      "unit":"rj","exam":true,
      "q":"In the balcony scene, when Juliet says 'Wherefore art thou Romeo?' she means:",
      "correct":"'Why are you Romeo?' — she wishes he had a different family name",
      "wrong":["'Where are you, Romeo?' — she is looking for him in the garden","'How are you, Romeo?' — she is asking about his emotional state","'Who are you, Romeo?' — she does not yet know who is below"],
      "exp":"'Wherefore' = 'why,' not 'where.' This is a famous misread. Juliet is lamenting WHY Romeo must be a Montague, not searching for his location. It directly leads into 'What's in a name?'"
    },
    {
      "unit":"rj","exam":false,
      "q":"Why is Friar Lawrence surprised by Romeo's request to be married to Juliet?",
      "correct":"Romeo was weeping over Rosaline just a short time ago and has suddenly fallen for someone new",
      "wrong":["Marriage between a Montague and a Capulet is forbidden by the Prince","He does not know who Juliet is","He believes Romeo is far too young for marriage"]
    },
    {
      "unit":"rj","exam":true,
      "q":"Why does Friar Lawrence agree to marry Romeo and Juliet?",
      "correct":"He hopes their marriage will end the feud between the families",
      "wrong":["He owes a debt of loyalty to the Montague family","Romeo threatens to harm himself if Friar Lawrence refuses","He has received a vision telling him to help them"],
      "exp":"Friar Lawrence's motivation is peace, not love. He sees the marriage as a diplomatic solution. This good intention combined with a fatally flawed plan makes him partly responsible for the tragedy."
    },
    {
      "unit":"rj","exam":false,
      "q":"What language did Shakespeare write in?",
      "correct":"Early Modern English",
      "wrong":["Middle English","Classical Latin","Old English"]
    },
    {
      "unit":"rj","exam":true,
      "q":"Friar Lawrence's line 'These violent delights have violent ends' suggests:",
      "correct":"Powerful, uncontrolled emotions can lead to destructive consequences",
      "wrong":["Violent crimes will always be punished by death in Verona","Romeo and Juliet's love is sinful and must be stopped","Romeo will soon start a fight he cannot finish"],
      "exp":"This line is foreshadowing — it predicts the play's ending exactly. 'Violent delights' = intense, uncontrolled passion. 'Violent ends' = destruction. Romeo does not heed the warning."
    },
    {
      "unit":"rj","exam":false,
      "q":"Which quote from Act 2 shows that Juliet is serious and cautious about the relationship?",
      "correct":"'If that thy bent of love be honorable, / Thy purpose marriage, send me word tomorrow'",
      "wrong":["'O Romeo, Romeo! wherefore art thou Romeo?'","'What's in a name? That which we call a rose / By any other name would smell as sweet'","'Good night, good night! Parting is such sweet sorrow'"]
    },
    {
      "unit":"rj","exam":false,
      "q":"Why does Romeo refuse to fight Tybalt when challenged in Act 3?",
      "correct":"He has secretly married Juliet and now considers Tybalt family",
      "wrong":["He is afraid of Tybalt's skill with a sword","The Prince has already forbidden him to fight in public","He has taken a religious vow of nonviolence through Friar Lawrence"]
    },
    {
      "unit":"rj","exam":false,
      "q":"What causes Mercutio's death in Act 3?",
      "correct":"Romeo tries to stop the fight between Mercutio and Tybalt, and Tybalt stabs Mercutio under Romeo's arm",
      "wrong":["Tybalt challenges Mercutio directly and kills him in a fair duel","Romeo accidentally strikes Mercutio while defending himself","Tybalt throws a weapon that unexpectedly hits Mercutio"]
    },
    {
      "unit":"rj","exam":true,
      "q":"What is Romeo's punishment for killing Tybalt?",
      "correct":"Banishment from Verona",
      "wrong":["Death by the Prince's order","Imprisonment for life in Verona's dungeon","A heavy fine and loss of his noble title"],
      "exp":"Romeo is banished, not executed — Prince Escalus shows mercy because Tybalt killed Mercutio first. But Romeo sees banishment as worse than death: he cannot be with Juliet. This sets up Acts 4 and 5."
    },
    {
      "unit":"rj","exam":false,
      "q":"What does Paris believe caused Juliet's extreme sadness in Act 3?",
      "correct":"Tybalt's death",
      "wrong":["Her fear of marrying someone she does not love","Her isolation from being confined to her room by her parents","The ongoing violence of the feud between the families"]
    },
    {
      "unit":"rj","exam":false,
      "q":"How does Shakespeare use night and day in Act 3?",
      "correct":"Night brings safety and privacy for Romeo and Juliet; day brings danger and violence",
      "wrong":["Night represents hope for the future; day represents the painful present","Day is when the lovers are together; night is when they are separated","Night is when deaths occur; day is when hope and life return"]
    },
    {
      "unit":"rj","exam":false,
      "q":"Why does Juliet visit Friar Lawrence in Act 4?",
      "correct":"To seek help avoiding the arranged marriage to Paris",
      "wrong":["To confess that she is already secretly married to Romeo","To ask him to carry a letter to Romeo in exile","To request his blessing for the plan to take the sleeping potion"]
    },
    {
      "unit":"rj","exam":true,
      "q":"What does Friar Lawrence's plan in Act 4 involve?",
      "correct":"Juliet drinks a potion that makes her appear dead; she will awaken and escape with Romeo",
      "wrong":["Juliet escapes to Mantua while Friar Lawrence delays the wedding indefinitely","Juliet pretends to agree to marry Paris but secretly flees with Romeo","Juliet tells her father the truth about her marriage and asks for forgiveness"],
      "exp":"The plan has too many moving parts and depends on perfect timing and communication. Its fatal flaw is relying on a letter — which never arrives. This is the seed of the tragedy."
    },
    {
      "unit":"rj","exam":true,
      "q":"Which literary device is most prominent when everyone believes Juliet is dead in Acts 4 and 5?",
      "correct":"Dramatic irony — the audience knows she is still alive while the characters do not",
      "wrong":["Foreshadowing — it hints at her actual death later in the play","Metaphor — death is directly compared to sleep throughout","Allegory — Juliet's 'death' stands for the death of the feud"],
      "exp":"Dramatic irony peaks here. We watch Romeo weep over a living Juliet and drink poison — we know the truth he doesn't. Our foreknowledge makes the tragedy of Act 5 unbearable."
    },
    {
      "unit":"rj","exam":true,
      "q":"What critical communication failure causes the tragic ending in Act 5?",
      "correct":"Friar Lawrence's letter explaining the plan never reaches Romeo in Mantua",
      "wrong":["Juliet is unable to send Romeo a message before she takes the potion","Balthasar delivers the letter to the wrong person","The Nurse refuses to carry any more messages for Juliet"],
      "exp":"The chain: letter → Friar John quarantined → letter never delivered → Balthasar brings only news of Juliet's 'death' → Romeo buys poison → rushes to tomb → both die. One communication failure = both deaths."
    },
    {
      "unit":"rj","exam":false,
      "q":"What false news does Balthasar bring to Romeo in Act 5?",
      "correct":"That Juliet is dead",
      "wrong":["That the Prince has issued a pardon for Romeo","That Tybalt's family is planning revenge against him","That Juliet has agreed to marry Paris"]
    },
    {
      "unit":"rj","exam":false,
      "q":"Why does Romeo believe the apothecary will sell him poison?",
      "correct":"The apothecary is desperately poor and needs money",
      "wrong":["Romeo threatens to expose the apothecary's illegal activities","The apothecary owes Romeo a debt from a past favor","The apothecary believes Romeo is acting in self-defense"]
    },
    {
      "unit":"rj","exam":true,
      "q":"Which literary device appears when Juliet takes Romeo's dagger and calls it 'O happy dagger!'?",
      "correct":"Irony — the instrument of death is called 'happy'",
      "wrong":["Metaphor — she directly compares herself to a victim","Personification — she speaks to the dagger as if it were alive","Simile — she compares her death to Romeo's using 'like' or 'as'"],
      "exp":"'Happy' means Juliet will use the dagger to reunite with Romeo in death. Calling a murder weapon 'happy' is classic irony — the word means the opposite of what the situation actually is."
    },
    {
      "unit":"rj","exam":false,
      "q":"What does the final scene of Act 5 primarily accomplish?",
      "correct":"It provides closure and moral commentary on the destructive consequences of the family feud",
      "wrong":["It shifts all blame from Romeo and Juliet to Friar Lawrence","It shows that fate alone caused the tragedy, not human choices","It ends with the Prince rewarding all who tried to help the lovers"]
    },
    {
      "unit":"rj","exam":true,
      "q":"What is the meaning of Juliet's 'What's in a name?' speech?",
      "correct":"A person's name or family label does not define who they truly are",
      "wrong":["Juliet is ashamed of her own family name and wishes to change it","Names are the most important things people carry through life","Romeo's name has brought him nothing but trouble and conflict"],
      "exp":"Juliet argues that 'Montague' is just a label — it doesn't define who Romeo actually is. This challenges the entire premise of the feud: fighting over a name. This is key to the play's theme."
    },
    {
      "unit":"rj","exam":true,
      "q":"Who says 'A plague o' both your houses!' and why?",
      "correct":"Mercutio, as he is dying — he curses both families because their feud caused his death",
      "wrong":["The Prince, after banishing Romeo for killing Tybalt","Friar Lawrence, after his plan fails and both lovers die","Romeo, as he lies dying beside Juliet in the tomb"],
      "exp":"Mercutio is neither Montague nor Capulet — he has no stake in the feud — but he dies for it. His dying curse is also a statement of theme: the feud destroys even those not part of it."
    },
    {
      "unit":"rj","exam":true,
      "q":"Which character most clearly illustrates the theme of fate vs. free will in Act 3?",
      "correct":"Romeo, whose impulsive choices directly lead to catastrophic consequences for everyone",
      "wrong":["Juliet, who follows Friar Lawrence's plan without questioning it","Mercutio, who is swept along by events entirely outside his control","The Prince, whose decisions create the conditions for the tragedy"],
      "exp":"Romeo's free will is on full display in Act 3: he chooses to stop the fight (leading to Mercutio's death), then chooses to kill Tybalt (leading to banishment). His choices, not fate alone, drive the tragedy."
    },
    {
      "unit":"rj","exam":false,
      "q":"Which best describes Juliet's character in the balcony scene?",
      "correct":"Cautious and thoughtful — she seeks reassurance and a serious commitment before fully giving herself to Romeo",
      "wrong":["Reckless and impulsive, making promises she knows she cannot keep","Shy and reluctant, unwilling to admit her true feelings to Romeo","Passive and obedient, waiting for Romeo to make all of the decisions"]
    },
    {
      "unit":"rj","exam":true,
      "q":"Which theme is most directly reinforced by Romeo and Juliet's deaths?",
      "correct":"The destructive effects of hatred and the failure to communicate",
      "wrong":["The power of true love to overcome any obstacle over time","The importance of obeying parents and authority figures","The danger of placing too much trust in others to carry messages"],
      "exp":"The Prince's final line: 'All are punished.' The feud created conditions where tragedy became inevitable. Hatred — not fate alone — destroyed two innocent lives."
    },
    {
      "unit":"rj","exam":false,
      "q":"Which character is Juliet's cousin — aggressive, violent, and always looking for a fight?",
      "correct":"Tybalt",
      "wrong":["Benvolio","Paris","Mercutio"]
    },
    {
      "unit":"rj","exam":false,
      "q":"What does Paris's behavior at Juliet's tomb reveal about his character?",
      "correct":"He is possessive and believes he has a right to Juliet and to her grave",
      "wrong":["He is genuinely heartbroken but willing to let Romeo see Juliet one last time","He is brave and noble, dying to protect the Capulet family's honor","He has learned the truth and is trying to stop the plan before it is too late"]
    },
    {
      "unit":"rj","exam":false,
      "q":"What development in Act 3 most directly escalates the tragedy toward its ending?",
      "correct":"The arranged marriage between Paris and Juliet",
      "wrong":["Romeo's decision to attend the Capulet party","Mercutio's fatal challenge of Tybalt","Juliet's decision to keep her marriage secret from her parents"]
    }
  ],

  "fr": [
    // ── LITERARY TERMS (11) ───────────────────────────────────────────────────
    {
      "u":"lt","exam":true,
      "q":"What is imagery? Give one example from Night.",
      "a":"Imagery is language that appeals to the senses: sight, sound, smell, taste, or touch. Example from Night: smoke and flames rising from the crematoria (sight/smell), the silence of the barracks after a death (sound), the biting cold of the death march (touch).",
      "note":"Any specific sensory detail from Night counts. The key is identifying WHICH sense is being appealed to."
    },
    {
      "u":"lt","exam":true,
      "q":"List the five parts of plot and define each one.",
      "a":"1. Exposition: introduces setting, characters, and background conflict. 2. Rising Action: events build tension. 3. Climax: the major turning point of highest tension. 4. Falling Action: consequences unfold after the climax. 5. Resolution: the conflict ends or reaches closure.",
      "note":"These five parts apply to both Night and Romeo and Juliet. Know them in order."
    },
    {
      "u":"lt","exam":true,
      "q":"What is the difference between tone and mood?",
      "a":"Tone is the author's attitude toward the subject (e.g., tragic, bitter, reflective). Mood is the feeling or atmosphere experienced by the reader (e.g., hopeless, tense, sorrowful). Tone is the writer's — mood is the reader's.",
      "note":"Think: tone = author's feelings about the subject. Mood = reader's emotional experience. In Night, Wiesel's tone is somber and reflective; the mood created for the reader is heavy and tragic."
    },
    {
      "u":"lt","exam":false,
      "q":"What is the difference between a symbol and a motif? Give an example from Night or Romeo and Juliet.",
      "a":"A symbol represents a bigger idea (example: the mirror in Night represents Elie's spiritual death). A motif is a repeated image, word, or pattern throughout a text (example: 'night' or 'darkness' is a repeated motif in Night connected to suffering and loss).",
      "note":"A symbol is usually one powerful moment; a motif appears again and again across the whole text."
    },
    {
      "u":"lt","exam":true,
      "q":"What is dramatic irony? Give a clear example from Romeo and Juliet.",
      "a":"Dramatic irony is when the audience knows something that the characters do not know. Example: The audience knows Juliet is not really dead — she took a sleeping potion — but Romeo believes she is dead and kills himself. The tragedy happens because of this information gap.",
      "note":"Dramatic irony creates tension because we watch characters make decisions based on false information that we, the audience, know is wrong."
    },
    {
      "u":"lt","exam":false,
      "q":"Define simile, metaphor, and personification, and give one example of each.",
      "a":"Simile: a comparison using 'like' or 'as' (e.g., 'Her eyes shone like stars'). Metaphor: a direct comparison without 'like' or 'as' (e.g., 'Juliet is the sun'). Personification: giving human qualities to something nonhuman (e.g., 'the night whispered their secrets').",
      "note":"'Juliet is the sun' from Romeo and Juliet is the classic metaphor to know. It is NOT a simile because it does not use 'like' or 'as.'"
    },
    {
      "u":"lt","exam":false,
      "q":"What is iambic pentameter and where does it appear in our texts?",
      "a":"Iambic pentameter is a poetic rhythm with 10 syllables per line, alternating unstressed and stressed syllables: da-DUM da-DUM da-DUM da-DUM da-DUM. Romeo and Juliet is written largely in iambic pentameter. Example: 'But SOFT! What LIGHT through YON-der WIN-dow BREAKS?'",
      "note":"Count the beats: 5 pairs of unstressed + stressed = 10 syllables. Shakespeare uses it primarily for noble characters."
    },
    {
      "u":"lt","exam":true,
      "q":"What is foreshadowing? Give one example from Romeo and Juliet.",
      "a":"Foreshadowing is hints or clues in a text about what will happen later. Example: Friar Lawrence's warning 'These violent delights have violent ends.' Example: Romeo's fear before the party that something dangerous will result. Example: Juliet's vision of Romeo as a corpse as he descends from the balcony.",
      "note":"Shakespeare uses foreshadowing constantly. Any moment where a character predicts doom that later comes true counts."
    },
    {
      "u":"lt","exam":false,
      "q":"What is a soliloquy? Why does Shakespeare use them?",
      "a":"A soliloquy is a long speech where a character speaks their thoughts aloud, often alone on stage. Shakespeare uses them to let the audience hear a character's true feelings, motivations, and inner conflicts — things that other characters cannot hear.",
      "note":"Famous soliloquies include Romeo's balcony speech and Juliet's 'What's in a name?' speech. They are a window into the character's private mind."
    },
    {
      "u":"lt","exam":false,
      "q":"What is the difference between denotation and connotation?",
      "a":"Denotation is the literal dictionary definition of a word. Connotation is the emotional or cultural association a word carries beyond its literal meaning. Example: 'home' denotation = a building; connotation = warmth, safety, belonging.",
      "note":"Authors choose words carefully based on connotation, not just denotation. Calling prisoners 'cargo' in Night carries a devastating connotation beyond its dictionary meaning."
    },
    {
      "u":"lt","exam":true,
      "q":"What is the difference between internal and external conflict? Give one example from each text.",
      "a":"Internal conflict: a struggle inside a character's own mind or conscience. External conflict: a struggle against an outside force — a person, society, or nature.\nNight — Internal: Elie's crisis of faith and guilt over his father's death. External: Elie vs. Nazi oppression.\nR&J — Internal: Romeo's guilt and grief after killing Tybalt. External: Romeo and Juliet vs. the family feud.",
      "note":"Characters in both texts experience both types simultaneously — that layering is what makes them complex. The internal and external conflicts often intensify each other."
    },

    // ── NIGHT (10) ────────────────────────────────────────────────────────────
    {
      "u":"night","exam":true,
      "q":"Who is Moishe the Beadle and what role does he play in Night?",
      "a":"Moishe the Beadle is a poor, humble man who is Elie's spiritual mentor and teaches him Jewish mysticism before the war. He is deported early with other foreign Jews, witnesses Nazi atrocities, miraculously escapes, and returns to warn the community — but no one believes him. He represents the danger of ignoring warnings.",
      "note":"Moishe is the first major example of 'ignored warnings' — Night's central pattern. His character also shows Elie's early spiritual life before everything changes."
    },
    {
      "u":"night","exam":true,
      "q":"What does 'night' symbolize throughout Elie Wiesel's memoir? Give at least three meanings.",
      "a":"Night symbolizes: (1) suffering and hopelessness, (2) spiritual darkness and the silence of God, (3) loss of innocence and identity, (4) death and trauma, (5) the overall experience of the Holocaust as an endless, unrelenting darkness. Night marks every major moment of horror in the memoir.",
      "note":"The title itself is symbolic. The word 'night' recurs throughout the book to mark moments of terror: deportation, arrival at Auschwitz, the death of his father."
    },
    {
      "u":"night","exam":true,
      "q":"What happens in the 'Never shall I forget' passage, and why is it significant?",
      "a":"After arriving at Birkenau and seeing the flames of the crematoria, Elie makes a vow to never forget the night that permanently shattered his faith and identity. The passage shows his spiritual and psychological transformation — his loss of faith in God, humanity, and his former self. It functions like a prayer turned inside out.",
      "note":"This passage is structured as a kind of anti-prayer. It begins like the Kaddish (a Jewish memorial prayer) but is a declaration of loss rather than praise."
    },
    {
      "u":"night","exam":false,
      "q":"Describe the bread-on-the-train scene. Which literary devices show dehumanization?",
      "a":"After the death march, German bystanders throw bread onto the train to watch the starving prisoners fight. Men trample and maul each other; prisoners are compared to 'beasts of prey.' A young man kills his own elderly father for a crust of bread and is then killed by others. Literary devices: simile (beasts of prey), imagery (sensory details of violence), motif (bread as survival), irony (charity turned into spectacle).",
      "note":"This scene shows the ultimate result of dehumanization — people stripped of humanity and reduced to pure survival instinct. Elie watches with horror, recognizing the depth of what the camps have done."
    },
    {
      "u":"night","exam":true,
      "q":"What does Juliek's violin playing symbolize, and why does it matter?",
      "a":"Juliek plays a fragment of Beethoven on his violin after the death march, surrounded by dying men. This represents rebellion — he creates beauty and humanity in a place designed to destroy both. It is an act of resistance: asserting that art, spirit, and humanity cannot be completely eliminated even in the worst conditions.",
      "note":"Juliek dies that night. His final act — playing music amid death — is one of the most powerful moments in the memoir. Wiesel calls it an act of defiance."
    },
    {
      "u":"night","exam":true,
      "q":"Describe the final mirror passage in Night and explain what it symbolizes.",
      "a":"After liberation, Elie looks in a mirror and sees a corpse staring back at him. This symbolizes his spiritual death — the loss of his innocence, faith, and former identity. He uses 'his' and 'he' rather than 'my' and 'I' to show the psychological separation between his pre-Holocaust self and who he has become. 'The look in his eyes has never left me' = permanent, haunting trauma.",
      "note":"The mirror passage is the closing image of the memoir. Elie sees not survival but transformation into someone barely recognizable — the corpse is who the Holocaust made him."
    },
    {
      "u":"night","exam":true,
      "q":"What is the role of 'ignored warnings' in Night? Give two specific examples.",
      "a":"Ignored warnings are a central pattern in Night. Example 1: Moishe the Beadle returns from deportation to warn the community about Nazi killings, but people dismiss him as crazy. Example 2: Mrs. Schächter screams about flames she sees during the train journey, and the other passengers silence her — but her visions prove true. Both examples show how denial and indifference allowed the Holocaust to unfold.",
      "note":"This pattern connects to Wiesel's later speech 'The Perils of Indifference' — the idea that ignoring suffering makes you complicit in it."
    },
    {
      "u":"night","exam":true,
      "q":"Describe the circumstances of Elie's father's death and what Elie does when he discovers his father is gone.",
      "a":"Elie's father grows increasingly weak at Buchenwald, beaten by guards and crying out for water. When Elie wakes up one morning, his father has been taken from his bunk and replaced by another prisoner. He does not weep. This devastating reaction shows how completely the camps stripped Elie of normal human emotional response.",
      "note":"The absence of tears is not coldness — it is total emotional depletion. Wiesel is honest about this. After his father's death, he dreams only of soup. That detail says everything."
    },
    {
      "u":"night","exam":false,
      "q":"What is ironic about Elie and his father's decision to leave the hospital and join the evacuation?",
      "a":"Elie and his father are in the camp hospital when the camp is evacuated. They decide to leave with the other prisoners rather than stay. Irony: the prisoners who remained in the hospital were liberated by the Russian army shortly after. By choosing to march — trying to survive — they actually put themselves in greater danger. Their survival instinct nearly killed them.",
      "note":"This is a perfect exam example of situational irony. The 'safe' choice (staying sick in the hospital) turned out to be the better one."
    },
    {
      "u":"night","exam":false,
      "q":"What connections exist between Night and the Holocaust speaker's story shared in class?",
      "a":"The speaker shared her mother's Holocaust experience, which involved: family separation, being placed in an orphanage, learning French in another orphanage, difficulty maintaining family contact, eventual reconnection with surviving relatives. Connections to Night include: family separation, trauma, survival, loss, displacement, the lasting impact of the Holocaust, and the difficult process of reconnecting with identity after the war.",
      "note":"Both stories show that the Holocaust affected survivors differently — some were in camps; others were hidden or displaced. The common threads are separation, loss, and long-term trauma."
    },

    // ── ROMEO AND JULIET (9) ──────────────────────────────────────────────────
    {
      "u":"rj","exam":true,
      "q":"What is the dramatic significance of the balcony scene in Act 2?",
      "a":"The balcony scene establishes the secrecy and speed of Romeo and Juliet's relationship. Juliet is cautious — she warns against swearing love by the 'inconstant moon' and takes the lead by asking for a commitment (marriage). The scene creates dramatic irony (we know their families are enemies) and contains the famous oxymoron: 'Parting is such sweet sorrow.'",
      "note":"Juliet is NOT passive here. She is cautious and practical, demanding a commitment rather than just words. This is key characterization — she is more levelheaded than Romeo."
    },
    {
      "u":"rj","exam":true,
      "q":"What are the two major events in Act 3 that change the direction of the play? What theme do they reinforce?",
      "a":"Event 1: Mercutio's death — Romeo tries to stop the fight; Tybalt kills Mercutio under Romeo's arm. Romeo then kills Tybalt in revenge. Event 2: Romeo is banished from Verona by Prince Escalus. These reinforce the theme that impulsive choices have devastating consequences — private emotions escalate into public violence and permanent separation.",
      "note":"Act 3 is the climax. Everything before it is rising action; after it, the falling action moves relentlessly toward tragedy."
    },
    {
      "u":"rj","exam":true,
      "q":"What communication failure causes the deaths of Romeo and Juliet, and what is the theme?",
      "a":"Friar Lawrence's letter explaining that Juliet is not really dead — only sleeping from a potion — never reaches Romeo in Mantua. Friar John is quarantined and cannot deliver it. Romeo hears only that Juliet is dead (from Balthasar), buys poison, and rushes to the tomb. He kills himself; Juliet awakens and kills herself. Theme: silence, secrecy, and failed communication lead to tragedy.",
      "note":"Know the chain: letter → quarantine → Balthasar's false report → Romeo's false belief → death. One communication failure = both deaths."
    },
    {
      "u":"rj","exam":false,
      "q":"What is Friar Lawrence's role in Romeo and Juliet? Is he responsible for the tragedy?",
      "a":"Friar Lawrence marries Romeo and Juliet secretly, gives Juliet the sleeping potion, and plans her escape. His intentions are good — he hopes the marriage will end the feud. However, his plan depends on risky secrecy and poor communication. His reliance on a letter (which fails) is a direct cause of both deaths. He is partly responsible: not through malice, but through a flawed plan that could not withstand chance or urgency.",
      "note":"Shakespeare does not make Friar Lawrence purely guilty — he is a good person whose plan fails. That is part of the 'fate vs. free will' debate."
    },
    {
      "u":"rj","exam":true,
      "q":"What does the ending of Romeo and Juliet suggest about fate, free will, and human choices?",
      "a":"Both fate and free will are at work. Fate: the lovers are 'star-crossed' from the beginning; chance intervenes (Friar John's quarantine). Free will: Romeo's impulsive choice to kill Tybalt, his rush to the tomb, and Juliet's use of the dagger are all choices. The tragedy results from the combination of an unjust situation (the feud), impulsive human choices, and bad luck. Shakespeare warns that hatred creates conditions where tragedy becomes almost inevitable.",
      "note":"The Prince's final speech sums it up: 'All are punished.' Everyone who maintained the feud bears some responsibility."
    },
    {
      "u":"rj","exam":false,
      "q":"Why does Romeo refuse to fight Tybalt, and what are the consequences?",
      "a":"Romeo refuses to fight because he has just secretly married Juliet, making Tybalt family. He tries to make peace. The consequence: Mercutio, infuriated by Romeo's refusal, fights Tybalt himself and is mortally wounded. Romeo then kills Tybalt in rage and is banished. His act of love (avoiding the fight) leads to his best friend's death — a tragic irony.",
      "note":"This moment shows how the feud corrupts everything — even Romeo's desire for peace leads to violence because he cannot explain himself without revealing the secret marriage."
    },
    {
      "u":"rj","exam":false,
      "q":"How does Shakespeare use night and day as symbols throughout Romeo and Juliet?",
      "a":"Night = safety, love, and privacy for Romeo and Juliet (balcony scene, wedding night, tomb visit). Day = danger, violence, and the public world of the feud (street fights, banishment, the public wedding with Paris). Night shields the lovers; day destroys them. Ironically, their final reunion (and deaths) happens at night — the one setting that should have protected them.",
      "note":"This light/dark motif connects to Romeo's description of Juliet as 'the sun.' She brings light into his darkness, but that light also exposes them to danger."
    },
    {
      "u":"rj","exam":false,
      "q":"Describe Mercutio's character and the significance of his death in Act 3.",
      "a":"Mercutio is Romeo's witty, hotheaded, and loyal friend — neither Montague nor Capulet, making his death especially tragic. When Romeo refuses to fight Tybalt (for reasons Mercutio doesn't understand), Mercutio steps in and is killed. His dying curse — 'A plague o' both your houses!' — directly blames the feud. His death is the turning point: it transforms Romeo from a hopeful newlywed into a man driven by rage and revenge.",
      "note":"Mercutio is often seen as the play's most vibrant character. His death at the play's midpoint marks the shift from comedy to tragedy."
    },
    {
      "u":"rj","exam":false,
      "q":"How does Lord Capulet's treatment of Juliet in Act 4 contribute to the tragedy?",
      "a":"After Juliet refuses to marry Paris, Lord Capulet erupts in rage, threatening to disown and abandon her if she disobeys. Lady Capulet and the Nurse also abandon her emotionally. This leaves Juliet completely alone with no trusted adult to turn to except Friar Lawrence. His risky plan becomes her only option — which directly leads to the tragic ending.",
      "note":"Capulet's behavior shows how adult authority and pressure to obey push Juliet into a corner. Her isolation is a key driver of the tragedy."
    },

    // ── GENERAL / ESSAY (5) ───────────────────────────────────────────────────
    {
      "u":"gen","exam":true,
      "q":"What is the essay question for the final exam, and what should each of the four paragraphs contain?",
      "a":"Prompt: How do Night and Romeo and Juliet show the effects of hatred, failed communication, and human choices? P1 (Intro): introduce both texts, give context, state thesis. P2 (Night): discuss ignored warnings, dehumanization, loss of faith, family separation, mirror image. P3 (R&J): discuss family feud, secrecy, failed message, impulsive choices, deaths. P4 (Conclusion): restate thesis, explain larger lesson, connect both works to human responsibility.",
      "note":"Don't just summarize plot — ANALYZE. Use strong verbs: reveals, suggests, emphasizes, symbolizes, foreshadows, demonstrates."
    },
    {
      "u":"gen","exam":true,
      "q":"Name three high-priority themes that appear in BOTH Night and Romeo and Juliet.",
      "a":"1. Family Separation: Night — Elie loses mother, sister, father; R&J — Romeo and Juliet are separated by family hatred. 2. Silence and Failed Communication: Night — warnings ignored; R&J — Friar Lawrence's letter fails. 3. Loss of Innocence: Night — Elie loses faith and childhood; R&J — young love becomes tragic because of adult conflict.",
      "note":"Other valid cross-text themes: Choices and Consequences, Death and Identity. Know at least three pairs well enough to write about them."
    },
    {
      "u":"gen","exam":true,
      "q":"What MLA guidelines should you follow when writing a literary analysis essay?",
      "a":"Use an introduction with a clear thesis. Use text evidence — specific quotes or details. Explain each quote — WHY does it matter? Use parenthetical citations if required. Avoid summary-only writing. Explain what the evidence SHOWS about theme. Use strong analytical verbs: reveals, suggests, emphasizes, symbolizes, foreshadows, demonstrates.",
      "note":"The biggest mistake is summarizing the plot instead of analyzing meaning. After every sentence, ask: 'What does this SHOW or MEAN?'"
    },
    {
      "u":"gen","exam":false,
      "q":"Why did Elie Wiesel write Night, and what is his main message?",
      "a":"Wiesel wrote Night to bear witness to the Holocaust and ensure it is never forgotten. His main message: indifference to suffering is dangerous and complicit — when people ignore warnings or the suffering of others, they allow atrocities to happen. He also explores what the Holocaust does to faith, identity, and humanity. His memoir is both a testimony and a warning.",
      "note":"Wiesel's Nobel Prize speech and 'The Perils of Indifference' expand this message. The act of writing — refusing to be silent — is itself a form of resistance."
    },
    {
      "u":"gen","exam":false,
      "q":"Why did Shakespeare write Romeo and Juliet, and what is the play's central message?",
      "a":"Shakespeare used the familiar story of the feuding families to explore hatred, impulsive passion, and the tragedy that results when young people are caught in adult conflicts. Central message: hatred — whether a family feud or systemic social hatred — destroys innocence and creates conditions where tragedy becomes inevitable. Love alone cannot overcome the systemic hatred of an entire community.",
      "note":"The play ends with the Prince's line: 'All are punished.' The message is social and moral — everyone who maintained the feud bears responsibility for the deaths."
    }
  ],

  "essays": [
    {
      "tag": "★ ON EXAM · 4-Paragraph Literary Analysis · Connects Both Texts",
      "starred": true,
      "prompt": "How do Night and Romeo and Juliet both show the effects of hatred, failed communication, and human choices on innocent people? Write a 4-paragraph literary analysis essay connecting both texts.",
      "hint": "P1: Introduce both texts + thesis. P2: Night — ignored warnings, dehumanization, Elie's loss of faith/identity. P3: R&J — family feud, secrecy, failed letter, Romeo's impulsive choices. P4: Conclusion — connect both to human responsibility. Use: reveals, emphasizes, symbolizes, foreshadows.",
      "key": "Both Night and Romeo and Juliet explore how hatred, silence, and impulsive human choices lead to devastating consequences.\nNight: Moishe the Beadle's ignored warnings foreshadow the Holocaust. Dehumanization strips prisoners of identity. Elie's loss of faith culminates in the mirror passage — he sees a corpse where his former self once stood.\nRomeo and Juliet: The ancient feud destroys two innocent lives. Friar Lawrence's letter fails to reach Romeo. Romeo's impulsive decision to buy poison and rush to the tomb causes both deaths.\nBoth texts warn: indifference and hatred do not stay contained — they destroy the innocent and the guilty alike."
    },
    {
      "tag": "Night Symbolism · Deep Dive",
      "starred": false,
      "prompt": "How does Elie Wiesel use symbolism in Night to show Elie's loss of innocence and faith? Discuss at least TWO specific symbols or passages.",
      "hint": "Focus on: 'night' as symbol of spiritual darkness, 'Never shall I forget' (faith shattered), mirror passage (identity destroyed), Juliek's violin (rebellion), 'silent sky' (God's absence). Give specific details from each passage.",
      "key": "Wiesel uses symbolism throughout Night to trace Elie's transformation from a faithful boy into a spiritually shattered survivor.\nSymbol 1: 'Night' represents suffering, the silence of God, and the destruction of innocence. Night marks every major horror: deportation, arrival, his father's death.\nSymbol 2: The 'Never shall I forget' passage marks the moment Elie's faith permanently breaks — structured as an anti-prayer.\nSymbol 3: The mirror passage — Elie sees a corpse. This symbolizes spiritual death: his innocence, faith, and former identity are gone.\nWiesel's symbolism shows that the Holocaust does not just kill bodies — it kills the inner life of its survivors."
    },
    {
      "tag": "Romeo and Juliet · Fate vs. Free Will",
      "starred": false,
      "prompt": "How do both fate and free will contribute to the tragedy in Romeo and Juliet? Use specific examples from at least THREE acts to support your answer.",
      "hint": "Fate evidence: 'star-crossed lovers' prologue, Friar John's quarantine, chance timing. Free will evidence: Romeo's choice to kill Tybalt (Act 3), his rush to buy poison (Act 5), Juliet's use of the dagger, Friar Lawrence's risky plan. Argue both forces are at work — not one alone.",
      "key": "Shakespeare suggests that both fate and free will create the tragedy.\nFate: The prologue calls them 'star-crossed lovers.' Chance plays a role: Friar John is quarantined by accident. Timing is always slightly off.\nFree will: Romeo chooses to kill Tybalt (Act 3). He chooses to buy poison and rush to the tomb without confirmation (Act 5). Juliet chooses to use the dagger. Friar Lawrence chooses a plan that relies on secrecy.\nConclusion: Neither fate alone nor free will alone explains the tragedy — both forces collide. Shakespeare shows that unjust situations + impulsive choices + bad luck = inevitable tragedy."
    },
    {
      "tag": "Romeo and Juliet · Dramatic Irony",
      "starred": false,
      "prompt": "How does Shakespeare use dramatic irony in Romeo and Juliet to create tension and tragedy? Give at least TWO specific examples and explain the effect of each.",
      "hint": "Define dramatic irony first: audience knows something characters don't. Examples: 1. We know Romeo and Juliet are married; most characters don't. 2. We know Juliet isn't really dead; Romeo doesn't. For each: name the moment, what we know vs. what the character believes, and the emotional effect.",
      "key": "Dramatic irony is when the audience knows something the characters do not — and Shakespeare uses it throughout R&J to create heartbreak and tension.\nExample 1: After the secret wedding (Act 2), the audience knows Romeo and Juliet are married. Characters like Tybalt, the Capulets, and Paris do not. This makes every interaction more tense.\nExample 2: When everyone believes Juliet is dead (Acts 4-5), the audience knows she took a sleeping potion. Watching Romeo weep at her 'corpse' and drink poison is agonizing — we want to intervene but cannot.\nEffect: Dramatic irony makes the audience feel the weight of what is coming. Shakespeare creates a sense of helplessness that intensifies the tragedy."
    },
    {
      "tag": "Cross-Text Character Comparison",
      "starred": false,
      "prompt": "Compare how Elie in Night and Romeo in Romeo and Juliet are both changed by circumstances beyond their full control. What do their transformations reveal about each text's theme?",
      "hint": "Elie: from devout, innocent boy → spiritually shattered survivor (Holocaust forces this). Romeo: from lovesick, impulsive youth → reckless man driven to death by the feud. Both changed by forces larger than themselves. Theme connection: systemic hatred — Holocaust or family feud — destroys individuals. Focus on TRANSFORMATION, not just plot summary.",
      "key": "Both Elie and Romeo experience profound transformations driven by forces larger than themselves.\nElie (Night): Begins as a deeply religious boy. The Holocaust systematically destroys his faith, family, and identity. By the end, he sees a 'corpse' in the mirror. His transformation reveals Night's theme: dehumanization and indifference destroy not just life but the inner self.\nRomeo (R&J): Begins as a lovesick, impulsive teenager. The family feud forces him into impossible situations. Each impulsive choice accelerates his downfall. His transformation reveals R&J's theme: when systemic hatred defines a society, even love cannot survive.\nBoth texts: Individual transformation is a symptom of a society that has failed to confront hatred."
    }
  ]
};