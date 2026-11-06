/* Chemistry Unit 3 teaching data: Electrons and Atomic Structure practice test.
   Keep beside chem-unit3.html. No network or API keys are required to read lessons,
   answer the practice test questions, or see the explanations.

   Every practice test question, answer choice and definition below is copied word for word from the
   teacher's practice test. The teaching lines (asks, hint, why, wrong) are the study help.

   Version 3 adds three things, and none of them is the teacher's wording:
     set: "P"  extra practice questions inside lessons 7 to 10 (and the own-words questions s4 to s10)
     set: "B"  Practice Test B: new questions on the same ideas, plus the two class handouts
     lessons 7 to 10: levels and orbitals, orbital diagrams, periodic table blocks, periodic trends

   Text rules: **word** shows as bold. {orb:2p:ud,u,-} draws labeled orbital boxes (u = arrow up, d = arrow down,
   - = empty). {box:u,u,-} draws boxes alone. {dots:X:7} draws a symbol with dots. Raised numbers and charges are typed as ² ⁶ ¹⁰ ⁺ ⁻ and the page
   draws them larger. For another unit: copy this file, change the content, and point the HTML's
   script tag at the copy. */
const CHEM_DATA = {
  title: "Chemistry Unit 3",
  subtitle: "Electrons and Atomic Structure",
  storeKey: "chem_unit3_progress_v1",
  matchingPoints: 1,
  mcPoints: 2,

  /* Section I answer bank, exactly as printed. */
  bank: {
    A: "An electron in the outermost occupied energy level.",
    B: "The part of the electromagnetic spectrum that human eyes can see.",
    C: "The distance from one wave crest to the next.",
    D: "A negatively charged ion formed by gaining electrons.",
    E: "A written description of where an atom’s electrons are arranged.",
    F: "A small packet of light energy.",
    G: "A chemical symbol surrounded by dots for its valence electrons.",
    H: "How many waves pass a point each second.",
    I: "A positively charged ion formed by losing electrons.",
    J: "A region where an electron is likely to be found.",
    K: "When an atom’s electrons are at their lowest available energies.",
    L: "The idea that many atoms become more stable with eight outer electrons."
  },

  sections: {
    I: { name: "Section I: Matching", note: "12 questions, 1 point each. Match each term with its definition from the answer bank. Use each letter once." },
    II: { name: "Section II: Multiple Choice", note: "25 questions, 2 points each. Pick the best answer." },
    III: { name: "Section III", note: "Written answers. You may use a periodic table." }
  },

  /* Practice Test B, Section I: this bank holds terms. Each question shows a definition. */
  bankB: {
    A: "Anion", B: "Atomic radius", C: "Aufbau principle", D: "Cation", E: "Electronegativity", F: "Excited state",
    G: "Hund’s rule", H: "Ionization energy", I: "Orbital", J: "Pauli exclusion principle", K: "Photon", L: "Sublevel"
  },
  sectionsB: {
    I: { name: "Test B · Section I: Matching", note: "12 questions, 1 point each. Read each definition. Pick the term from the word bank. Use each letter once." },
    II: { name: "Test B · Section II: Multiple Choice", note: "25 questions, 2 points each. The questions are in mixed order. Pick the best answer." },
    III: { name: "Test B · Section III", note: "Written answers. You may use a periodic table." }
  },

  /* Shown on the first screen until every new lesson has been opened. */
  whatsNew: {
    title: "New on this page",
    items: [
      { text: "**Lesson 7** explains energy levels, sublevels, and orbitals one step at a time. It works through question 20." },
      { text: "**Lessons 8, 9, and 10** teach your two class handouts: orbital diagrams, periodic table blocks, and periodic trends." },
      { text: "**Practice Test B** has new questions on the same ideas.", needs: "B" },
      { text: "**Ask a question** is at the bottom of each lesson screen. Talk or type, and an AI tutor answers.", needs: "ask" }
    ]
  },

  lessons: [

    /* ───────────────────────── Lesson 1 ───────────────────────── */
    {
      id: "L1", num: 1,
      title: "Light and waves",
      pic: "waves",
      rules: [
        "Light travels as a wave.",
        "**Wavelength** is the distance from one wave crest to the next.",
        "**Frequency** is how many waves pass a point each second.",
        "Short wavelength goes with high frequency. Long wavelength goes with low frequency.",
        "A **photon** is a small packet of light energy.",
        "Higher frequency means more energy in each photon.",
        "**Visible light** is the part of the electromagnetic spectrum that human eyes can see."
      ],
      watch: [
        { title: "Compare red light and violet light",
          steps: [
            { say: "Look at the two waves. The red wave is on top. The violet wave is on the bottom.", pic: "waves" },
            { say: "The violet wave has crests that are close together. That is a short wavelength.", pic: "waves" },
            { say: "Close crests mean more waves pass a point each second. That is a high frequency.", pic: "waves" },
            { say: "High frequency means more energy. So a violet photon has more energy than a red photon.", pic: "waves" }
          ] }
      ],
      together: [
        { prompt: "Wave X has a long wavelength. What is its frequency?",
          options: ["Low", "High", "Zero"], answer: 0,
          why: "Long wavelength goes with low frequency. One goes up when the other goes down." },
        { prompt: "Photon 1 has a low frequency. Photon 2 has a high frequency. Which photon has more energy?",
          options: ["Photon 1", "Photon 2", "They are equal"], answer: 1,
          why: "Higher frequency means more energy. Photon 2 has the higher frequency." }
      ],
      extraLetters: [],
      questions: ["m1", "m2", "m3", "m4", "q13", "q16"]
    },

    /* ───────────────────────── Lesson 2 ───────────────────────── */
    {
      id: "L2", num: 2,
      title: "Energy levels: ground state and excited state",
      pic: "jump",
      rules: [
        "Electrons are found in energy levels around the nucleus. Level 1 is closest to the nucleus.",
        "Level 1 holds up to 2 electrons. Level 2 holds up to 8 electrons.",
        "**Ground state** means the atom’s electrons are at their lowest available energies.",
        "When an atom absorbs energy, an electron can move up to a higher energy level. That is the **excited state**.",
        "The excited electron then moves back down to a lower energy level.",
        "When the electron moves down, the atom gives off light. That light is a photon."
      ],
      watch: [
        { title: "Follow one electron in a sodium atom",
          steps: [
            { say: "This is a Bohr model of sodium. The gray circle in the middle is the nucleus. The rings are energy levels.", pic: "na-plain" },
            { say: "Count the electrons on each ring: 2, then 8, then 1. Sodium has 11 electrons.", pic: "na-count" },
            { say: "The 1 electron on the outer ring is the valence electron. Right now it is in its ground state.", pic: "na-ground" },
            { say: "The atom absorbs energy. The valence electron moves up to the next ring. Now it is in an excited state.", pic: "na-up" },
            { say: "The electron moves back down to its ground state. The atom gives off light. That light is a photon.", pic: "na-down" }
          ] }
      ],
      together: [
        { prompt: "An electron moves from level 2 up to level 4. What did the atom do?",
          options: ["It absorbed energy", "It gave off light", "It lost a proton"], answer: 0,
          why: "Moving up to a higher level takes energy. So the atom absorbed energy." },
        { prompt: "A neutral atom has 5 electrons. How many are in its first energy level?",
          options: ["2", "3", "5"], answer: 0,
          why: "Level 1 fills first and holds only 2. The other 3 electrons go in level 2." }
      ],
      extraLetters: ["A", "E", "J"],
      questions: ["m5", "q14", "q15", "q17", "w1a", "s1a", "w1b", "w1c"]
    },

    /* ───────────────────────── Lesson 3 ───────────────────────── */
    {
      id: "L3", num: 3,
      title: "Electron configuration",
      also: "L7", alsoText: "New: Lesson 7 explains levels, sublevels, and orbitals one step at a time.",
      pic: "config",
      rules: [
        "An **electron configuration** is a written description of where an atom’s electrons are arranged.",
        "Read 1s² in three parts. The 1 is the energy level. The s is the sublevel. The raised 2 is the number of electrons.",
        "An **orbital** is a region where an electron is likely to be found. One orbital holds up to 2 electrons.",
        "An s sublevel holds up to 2 electrons. A p sublevel holds up to 6. A d sublevel holds up to 10.",
        "Electrons fill the lowest-energy sublevel first.",
        "The filling order is 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d.",
        "Look at two spots in that order. 4s fills before 3d. 5s fills before 4d.",
        "Add the raised numbers. The total is the number of electrons. In a neutral atom, that equals the atomic number."
      ],
      watch: [
        { title: "Write the configuration for phosphorus (P)", builder: { symbol: "P", name: "Phosphorus", z: 15 } },
        { title: "Write the configuration for titanium (Ti)", builder: { symbol: "Ti", name: "Titanium", z: 22, quick: 5 } }
      ],
      together: [
        { prompt: "Which sublevel fills right after 3p?",
          options: ["4s", "3d", "4p"], answer: 0,
          why: "The filling order is 3p, then 4s, then 3d. 4s fills before 3d." },
        { prompt: "Nitrogen has 7 electrons. Which configuration is correct?",
          options: ["1s² 2s² 2p³", "1s² 2s⁵", "1s² 2p⁵"], answer: 0,
          why: "1s holds 2. Then 2s holds 2. The last 3 electrons go in 2p. Check: 2 + 2 + 3 = 7." },
        { prompt: "How many electrons can a d sublevel hold?",
          options: ["6", "10", "14"], answer: 1,
          why: "An s sublevel holds 2. A p sublevel holds 6. A d sublevel holds 10." }
      ],
      extraLetters: ["A", "K"],
      questions: ["m6", "m7", "q18", "q19", "q20", "w2a", "w2b", "w2c", "w2d", "w41a", "s41a", "w41b"]
    },

    /* ───────────────────────── Lesson 4 ───────────────────────── */
    {
      id: "L4", num: 4,
      title: "Valence electrons and the octet rule",
      pic: "groups",
      rules: [
        "A **valence electron** is an electron in the outermost occupied energy level.",
        "Elements in the same main-group column have the same number of valence electrons.",
        "Group 1 has 1 valence electron. Group 2 has 2.",
        "For groups 13 to 18, use the last digit. Group 13 has 3. Group 17 has 7. Group 18 has 8.",
        "The **octet rule**: many atoms become more stable with eight outer electrons.",
        "Atoms gain, lose, or share electrons to get a full outer level.",
        "Neon already has 8 outer electrons. Its outer level is full, so neon is generally unreactive."
      ],
      watch: [
        { title: "Find the valence electrons in sulfur (S)",
          steps: [
            { say: "Find sulfur on the periodic table. Its atomic number is 16. A neutral atom has 16 electrons.", pic: "s-plain" },
            { say: "Fill the energy levels. Level 1 gets 2. Level 2 gets 8. Level 3 gets the last 6.", pic: "s-count" },
            { say: "The outermost occupied level is level 3. It has 6 electrons. So sulfur has 6 valence electrons.", pic: "s-valence" },
            { say: "Check with the periodic table. Sulfur is in group 16. The last digit is 6.", pic: "groups" },
            { say: "Octet rule: sulfur has 6 outer electrons and is more stable with 8. It needs 2 more.", pic: "s-valence" }
          ] }
      ],
      together: [
        { prompt: "Nitrogen is in group 15. How many valence electrons does it have?",
          options: ["3", "5", "15"], answer: 1,
          why: "For groups 13 to 18, use the last digit. The last digit of 15 is 5." },
        { prompt: "An atom has 2 electrons in level 1, 8 in level 2, and 1 in level 3. How many valence electrons does it have?",
          options: ["1", "8", "11"], answer: 0,
          why: "Only the outermost occupied level counts. Level 3 has 1 electron." }
      ],
      extraLetters: ["G", "J"],
      questions: ["m8", "m9", "q21", "q22", "q23", "q24", "q25", "q26", "s4"]
    },

    /* ───────────────────────── Lesson 5 ───────────────────────── */
    {
      id: "L5", num: 5,
      title: "Ions: cations and anions",
      pic: "ions",
      rules: [
        "A neutral atom has the same number of protons and electrons.",
        "An ion is an atom that gained or lost electrons. The number of protons never changes.",
        "Electrons have a negative charge.",
        "When an atom loses electrons, it becomes a positive ion. A positive ion is a **cation**.",
        "When an atom gains electrons, it becomes a negative ion. A negative ion is an **anion**.",
        "Charge = protons minus electrons.",
        "Atoms with 1 or 2 valence electrons lose them. Group 1 forms 1+ ions. Group 2 forms 2+ ions.",
        "Atoms with 6 or 7 valence electrons gain electrons to reach 8. Group 17 forms 1− ions. Group 16 forms 2− ions."
      ],
      watch: [
        { title: "What ion does oxygen form?",
          steps: [
            { say: "A neutral oxygen atom has 8 protons and 8 electrons.", pic: "o-neutral" },
            { say: "Oxygen is in group 16. It has 6 valence electrons.", pic: "o-neutral" },
            { say: "Oxygen is more stable with 8 outer electrons. It gains 2 electrons. Now it has 10 electrons.", pic: "o-ion" },
            { say: "The protons did not change. Charge = 8 protons − 10 electrons = −2.", pic: "o-ion" },
            { say: "Write the ion as O²⁻. It is negative, so it is an anion.", pic: "o-ion" }
          ] }
      ],
      together: [
        { prompt: "Potassium is in group 1. Which ion does it form?",
          options: ["K⁺", "K⁻", "K²⁺"], answer: 0,
          why: "Group 1 atoms have 1 valence electron. They lose it and become 1+ ions." },
        { prompt: "An ion has 12 protons and 10 electrons. What is its charge?",
          options: ["2+", "2−", "0"], answer: 0,
          why: "Charge = protons − electrons = 12 − 10 = +2. Write it as 2+." }
      ],
      extraLetters: ["A", "L"],
      questions: ["m10", "m11", "q27", "q28", "q29", "q30", "q31", "q32", "s5"]
    },

    /* ───────────────────────── Lesson 6 ───────────────────────── */
    {
      id: "L6", num: 6,
      title: "Lewis dot diagrams",
      pic: "lewis",
      rules: [
        "A **Lewis dot diagram** is a chemical symbol surrounded by dots for its valence electrons.",
        "The number of dots equals the number of valence electrons.",
        "Elements in the same column get the same number of dots.",
        "A Lewis dot diagram never has more than 8 dots."
      ],
      watch: [
        { title: "Draw the Lewis dot diagram for phosphorus (P)",
          steps: [
            { say: "Find phosphorus on the periodic table. It is in group 15.", pic: "groups" },
            { say: "Use the last digit of the group number. Phosphorus has 5 valence electrons.", pic: "groups" },
            { say: "Write the symbol P. Draw 5 dots around it. That is the Lewis dot diagram.", pic: "lewis-p" }
          ] }
      ],
      together: [
        { prompt: "Magnesium is in group 2. How many dots go around Mg?",
          options: ["2", "8", "12"], answer: 0,
          why: "Group 2 has 2 valence electrons. So Mg gets 2 dots." },
        { prompt: "Which element gets 8 dots?",
          options: ["Argon", "Chlorine", "Sulfur"], answer: 0,
          why: "Argon is in group 18, so it has 8 valence electrons. Chlorine has 7. Sulfur has 6." }
      ],
      extraLetters: ["A", "E", "L"],
      questions: ["m12", "q33", "q34", "q35", "q36", "q37"]
    },

    /* ───────────────────────── Lesson 7 (new) ─────────────────────────
       Goes deeper on the idea behind question 20, using the class handout "Electron Configurations" (the boarding house). */
    {
      id: "L7", num: 7, isNew: true,
      title: "Levels, sublevels, and orbitals",
      from: "This lesson goes with question 20 and with your class handout “Electron Configurations” (the boarding house).",
      pic: "levels",
      rules: [
        "An atom has **energy levels**. Each level has a number: 1, 2, 3, 4, and higher. Level 1 is closest to the nucleus and has the lowest energy.",
        "Each energy level is split into **sublevels**. The sublevels are named s, p, d, and f.",
        "Level 1 has 1 sublevel: 1s. Level 2 has 2 sublevels: 2s and 2p. Level 3 has 3 sublevels: 3s, 3p, and 3d.",
        "Each sublevel is made of **orbitals**. An s sublevel has 1 orbital. A p sublevel has 3 orbitals. A d sublevel has 5. An f sublevel has 7.",
        "One orbital holds up to 2 electrons. So s holds 2, p holds 6, d holds 10, and f holds 14.",
        "Each electron goes in the lowest-energy sublevel that still has room.",
        "A sublevel must be full before the next sublevel gets any electrons.",
        "In the same level, s is lower in energy than p. So 2s fills before 2p."
      ],
      words: [
        { t: "Energy level", d: "One of the numbered levels around the nucleus where electrons are found. Level 1 has the lowest energy." },
        { t: "Sublevel", d: "A set of orbitals in an energy level that have the same energy. Its name is a letter: s, p, d, or f." },
        { t: "Orbital", d: "A region where an electron is likely to be found. One orbital holds up to 2 electrons." }
      ],
      watch: [
        { title: "Place lithium’s 3 electrons (question 20)",
          steps: [
            { say: "Lithium has atomic number 3. A neutral lithium atom has 3 electrons to place. Each box in the picture is 1 orbital.", pic: "orbx:1s:-;2s:-;2p:-,-,-" },
            { say: "Each electron goes in the lowest sublevel that has room. The lowest sublevel is 1s. Electron 1 goes in 1s.", pic: "orbx:1s:u;2s:-;2p:-,-,-" },
            { say: "Electron 2 also goes in 1s. The 1s sublevel has 1 orbital, and 1 orbital holds 2 electrons. Now 1s is full.", pic: "orbx:1s:ud;2s:-;2p:-,-,-" },
            { say: "Electron 3 cannot go in 1s, because 1s is full. It goes in the next sublevel up. That is 2s.", pic: "orbx:1s:ud;2s:u;2p:-,-,-" },
            { say: "Now write what the picture shows. 1s has 2 electrons, so write 1s². 2s has 1 electron, so write 2s¹. Lithium is 1s² 2s¹. That is choice C.", pic: "orbx:1s:ud;2s:u;2p:-,-,-" }
          ] },
        { title: "Why the other three choices in question 20 are wrong",
          steps: [
            { say: "Choice A is 1s³. That puts 3 electrons in 1s. The 1s sublevel has only 1 orbital, and 1 orbital holds only 2 electrons. So 1s³ is not possible.", pic: "orbx:1s!:uud;2s:-;2p:-,-,-|Choice A: 1s³" },
            { say: "Choice B is 1s² 2p¹. It skips 2s. The 2s sublevel is lower in energy than 2p. So 2s must get electrons before 2p does.", pic: "orbx:1s:ud;2s!:-;2p:u,-,-|Choice B: 1s² 2p¹" },
            { say: "Choice D is 1s¹ 2s². It leaves 1s with only 1 electron. The 1s sublevel must be full before 2s gets any electrons.", pic: "orbx:1s!:u;2s:ud;2p:-,-,-|Choice D: 1s¹ 2s²" },
            { say: "Choice C is 1s² 2s¹. 1s is full with 2 electrons. The third electron is in 2s, the next sublevel. Every rule is followed. Choice C is correct.", pic: "orbx:1s:ud;2s:u;2p:-,-,-|Choice C: 1s² 2s¹" }
          ] },
        { title: "Read 1s² 2s² 2p⁴ one part at a time",
          steps: [
            { say: "This is the configuration for oxygen. It has three parts: 1s², 2s², and 2p⁴.", pic: "orb:O" },
            { say: "In each part, the first number is the energy level. The letter is the sublevel. The raised number is how many electrons are in that sublevel.", pic: "config" },
            { say: "1s² means 2 electrons in the s sublevel of level 1. 2s² means 2 electrons in the s sublevel of level 2. 2p⁴ means 4 electrons in the p sublevel of level 2.", pic: "orb:O" },
            { say: "Add the raised numbers: 2 + 2 + 4 = 8. Oxygen has 8 electrons. Level 1 holds 2 of them. Level 2 holds the other 6.", pic: "orb:O" }
          ] }
      ],
      together: [
        { prompt: "How many orbitals does a p sublevel have?",
          options: ["3", "6", "1"], answer: 0,
          why: "A p sublevel has 3 orbitals. Each orbital holds 2 electrons, so a p sublevel holds 6 electrons." },
        { prompt: "Beryllium has 4 electrons. Electrons 1 and 2 are in 1s. Electron 3 is in 2s. Where does electron 4 go?",
          options: ["2s", "1s", "2p"], answer: 0,
          why: "1s is full with 2 electrons. The 2s sublevel holds 2 electrons, and it has only 1 so far. So electron 4 goes in 2s." },
        { prompt: "Boron has 5 electrons. Where does electron 5 go?",
          options: ["2p", "2s", "3s"], answer: 0,
          why: "1s holds 2 and 2s holds 2. That is 4 electrons, and both sublevels are full. The next sublevel up is 2p." }
      ],
      extraLetters: [],
      questions: ["p7d", "p7c", "p7e", "p7f", "p7g", "p7h", "p7a", "p7b", "s7"]
    },

    /* ───────────────────────── Lesson 8 (new) ─────────────────────────
       Class handout "Electron Configurations", Model 2: orbital diagrams, Aufbau, Pauli, Hund. */
    {
      id: "L8", num: 8, isNew: true,
      title: "Orbital diagrams and the three rules",
      from: "This lesson goes with your class handout “Electron Configurations” (Model 2, the boxes and arrows).",
      pic: "orbkey",
      rules: [
        "An **orbital diagram** shows each orbital as a box and each electron as an arrow.",
        "The **Aufbau principle**: electrons fill the lowest-energy sublevel first. The result is the **ground state**.",
        "The **Pauli exclusion principle**: one orbital holds at most 2 electrons, and the 2 electrons have opposite spins. Draw one arrow up and one arrow down.",
        "**Hund’s rule**: in a sublevel, each orbital gets 1 electron before any orbital gets 2. The single electrons all have the same spin, so their arrows point the same way.",
        "The number of arrows equals the number of electrons.",
        "To check a diagram, ask three questions. Are the lower sublevels full? Does each pair have one arrow up and one arrow down? Does every box in the last sublevel have 1 arrow before any box has 2?"
      ],
      words: [
        { t: "Orbital diagram", d: "A drawing that shows each orbital as a box and each electron as an arrow." },
        { t: "Aufbau principle", d: "Electrons fill the lowest-energy sublevel first." },
        { t: "Pauli exclusion principle", d: "One orbital holds at most 2 electrons, and the 2 electrons have opposite spins." },
        { t: "Hund’s rule", d: "In a sublevel, each orbital gets 1 electron before any orbital gets 2. The single electrons have the same spin." }
      ],
      watch: [
        { title: "Draw the orbital diagram for nitrogen (7 electrons)",
          steps: [
            { say: "Nitrogen has atomic number 7. A neutral nitrogen atom has 7 electrons, so you will draw 7 arrows.", pic: "orbx:1s:-;2s:-;2p:-,-,-" },
            { say: "Aufbau principle: start at the lowest sublevel, 1s. It holds 2 electrons. Draw one arrow up and one arrow down. Electrons left: 5.", pic: "orbx:1s:ud;2s:-;2p:-,-,-" },
            { say: "Next is 2s. It also holds 2 electrons. Draw one arrow up and one arrow down. Electrons left: 3.", pic: "orbx:1s:ud;2s:ud;2p:-,-,-" },
            { say: "The last 3 electrons go in 2p. Hund’s rule: put 1 arrow in each box before you make any pair.", pic: "orbx:1s:ud;2s:ud;2p:u,u,u" },
            { say: "All three single arrows point up. There is no pair in 2p, because each box got only 1 electron.", pic: "orbx:1s:ud;2s:ud;2p:u,u,u" },
            { say: "Write the configuration from the diagram. Count the arrows in each sublevel: 1s² 2s² 2p³. Check: 2 + 2 + 3 = 7.", pic: "orbx:1s:ud;2s:ud;2p:u,u,u" }
          ] },
        { title: "Draw the orbital diagram for sulfur (16 electrons)",
          steps: [
            { say: "Sulfur has atomic number 16. A neutral sulfur atom has 16 electrons, so you will draw 16 arrows.", pic: "orbx:1s:-;2s:-;2p:-,-,-;3s:-;3p:-,-,-" },
            { say: "Fill 1s with 2. Fill 2s with 2. Fill 2p with 6. That places 10 electrons. Electrons left: 6.", pic: "orbx:1s:ud;2s:ud;2p:ud,ud,ud;3s:-;3p:-,-,-" },
            { say: "Next is 3s. It holds 2. Now 12 electrons are placed. Electrons left: 4.", pic: "orbx:1s:ud;2s:ud;2p:ud,ud,ud;3s:ud;3p:-,-,-" },
            { say: "The last 4 electrons go in 3p. Hund’s rule: put 1 arrow in each of the 3 boxes first. That uses 3 electrons. Electrons left: 1.", pic: "orbx:1s:ud;2s:ud;2p:ud,ud,ud;3s:ud;3p:u,u,u" },
            { say: "The last electron makes a pair in the first 3p box. Now 3p has 4 arrows: one pair and two single arrows.", pic: "orbx:1s:ud;2s:ud;2p:ud,ud,ud;3s:ud;3p:ud,u,u" },
            { say: "Count every arrow: 2 + 2 + 6 + 2 + 4 = 16. The configuration is 1s² 2s² 2p⁶ 3s² 3p⁴.", pic: "orbx:1s:ud;2s:ud;2p:ud,ud,ud;3s:ud;3p:ud,u,u" },
            { say: "A common mistake is to fill all three 3p boxes with pairs. That is 18 arrows. An atom with 18 electrons is argon, not sulfur. Always count the electrons that are left.", pic: "orbx:1s:ud;2s:ud;2p:ud,ud,ud;3s:ud;3p!:ud,ud,ud|The mistake: 18 arrows" }
          ] },
        { title: "Check three student answers for nitrogen (class handout, question 14)",
          steps: [
            { say: "Nitrogen has 7 electrons. A correct diagram has 1s full, 2s full, and 1 arrow in each 2p box. Now check each answer on your handout.", pic: "orbx:1s:ud;2s:ud;2p:u,u,u;3s:-;3p:-,-,-|A correct diagram for nitrogen" },
            { say: "Answer a. Look at 2s. It has only 1 arrow, but 2p and 3s already have arrows. Lower sublevels must be full first. Answer a is wrong. It breaks the Aufbau principle.", pic: "orbx:1s:ud;2s!:u;2p:u,u,-;3s!:u;3p:-,-,-|Answer a" },
            { say: "Answer a has one more problem. Count the arrows: 2 + 1 + 2 + 1 = 6. Nitrogen has 7 electrons.", pic: "orbx:1s:ud;2s!:u;2p:u,u,-;3s!:u;3p:-,-,-|Answer a" },
            { say: "Answer b. 1s is full. 2s is full. Each 2p box has 1 arrow, and all three arrows point the same way. Answer b is right.", pic: "orbx:1s:ud;2s:ud;2p:d,d,d;3s:-;3p:-,-,-|Answer b" },
            { say: "In answer b the single arrows point down. That is allowed. Hund’s rule says the single arrows must all point the same way. Most people draw them pointing up.", pic: "orbx:1s:ud;2s:ud;2p:d,d,d;3s:-;3p:-,-,-|Answer b" },
            { say: "Answer c. Look at 2p. The first box has a pair, but the third box is empty. Each box must get 1 arrow before any box gets 2. Answer c is wrong. It breaks Hund’s rule.", pic: "orbx:1s:ud;2s:ud;2p!:ud,u,-;3s:-;3p:-,-,-|Answer c" }
          ] }
      ],
      together: [
        { prompt: "Carbon has 2 electrons in 2p. Which drawing follows Hund’s rule?",
          options: ["{orb:2p:u,u,-}", "{orb:2p:ud,-,-}", "{orb:2p:u,d,-}"], answer: 0,
          why: "Each box gets 1 arrow before any pair is made. The two single arrows point the same way." },
        { prompt: "One orbital holds 2 electrons. How do you draw them?",
          options: ["One arrow up and one arrow down", "Two arrows up", "Two arrows down"], answer: 0,
          why: "The Pauli exclusion principle says 2 electrons in one orbital have opposite spins. So draw one arrow up and one arrow down." },
        { prompt: "Oxygen has 4 electrons in 2p. How many 2p boxes have a pair?",
          options: ["1", "2", "0"], answer: 0,
          why: "Put 1 arrow in each of the 3 boxes first. That uses 3 electrons. The 4th electron makes 1 pair." }
      ],
      extraLetters: [],
      questions: ["p8a", "p8b", "p8c", "p8d", "p8g", "p8e", "p8f", "s8"]
    },

    /* ───────────────────────── Lesson 9 (new) ─────────────────────────
       Class worksheet "Periodic Table | Electron Blocks & Trends", Part 1. */
    {
      id: "L9", num: 9, isNew: true,
      title: "Periodic table blocks and ion charges",
      from: "This lesson goes with your class worksheet “Periodic Table: Electron Blocks & Trends” (Part 1).",
      pic: "blocks",
      rules: [
        "The periodic table has four blocks: s, p, d, and f.",
        "The **s block** is groups 1 and 2, plus helium. The **d block** is groups 3 to 12. The **p block** is groups 13 to 18. The **f block** is the two rows at the bottom.",
        "The width of a block equals the number of electrons its sublevel holds. The s block is 2 columns wide. The p block is 6. The d block is 10. The f block is 14.",
        "The block tells you which sublevel is filling. The column tells you how many electrons are in it. Group 1 ends in s¹. Group 13 ends in p¹. Group 17 ends in p⁵.",
        "For the s block and the p block, the level number is the row number. For the d block, the level number is the row number minus 1.",
        "Read the table from left to right, one row at a time. That gives the filling order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p.",
        "The main groups are groups 1, 2, and 13 to 18. Your worksheet calls them the representative elements.",
        "Their ion charges: group 1 is 1+. Group 2 is 2+. Group 13 is 3+. Group 14 is 4+ or 4−. Group 15 is 3−. Group 16 is 2−. Group 17 is 1−. Group 18 is 0.",
        "The charge comes from the valence electrons. Atoms with 1, 2, or 3 valence electrons lose them. Atoms with 5, 6, or 7 gain electrons to reach 8."
      ],
      words: [
        { t: "Block", d: "A part of the periodic table where the same kind of sublevel is filling: s, p, d, or f." },
        { t: "Group", d: "A column of the periodic table." },
        { t: "Period", d: "A row of the periodic table." }
      ],
      watch: [
        { title: "Use the table to find the end of chlorine’s configuration",
          steps: [
            { say: "Find chlorine, Cl, on the periodic table. It is in row 3 and group 17.", pic: "blocks:Cl" },
            { say: "Group 17 is in the p block. Row 3 means level 3. So the last sublevel is 3p.", pic: "blocks:Cl" },
            { say: "Count across the p block. Group 13 is p¹. Group 14 is p². Group 15 is p³. Group 16 is p⁴. Group 17 is p⁵.", pic: "blocks:Cl" },
            { say: "So chlorine’s configuration ends in 3p⁵. The full configuration is 1s² 2s² 2p⁶ 3s² 3p⁵.", pic: "build:Cl" },
            { say: "Now find the ion charge. Group 17 atoms have 7 valence electrons. They gain 1 electron to reach 8. The ion is Cl⁻. Its charge is 1−.", pic: "ion:Cl" }
          ] },
        { title: "Use the table to write the configuration for iron (Fe)",
          steps: [
            { say: "Find iron, Fe. It is in row 4 and group 8. Its atomic number is 26.", pic: "blocks:Fe" },
            { say: "Read the rows in order. Row 1 fills 1s². Row 2 fills 2s² 2p⁶. Row 3 fills 3s² 3p⁶. That places 18 electrons.", pic: "blocks:Fe" },
            { say: "Row 4 starts in the s block. That fills 4s². Now 20 electrons are placed.", pic: "blocks:Fe" },
            { say: "Next in row 4 is the d block. For the d block, the level number is the row number minus 1. So this sublevel is 3d.", pic: "blocks:Fe" },
            { say: "Count across the d block from group 3 to group 8. That is 6 columns. So iron has 3d⁶.", pic: "blocks:Fe" },
            { say: "Answer: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶. Check: 2 + 2 + 6 + 2 + 6 + 2 + 6 = 26.", pic: "build:Fe" }
          ] }
      ],
      together: [
        { prompt: "Sodium is in group 1. Which block is it in?",
          options: ["s block", "p block", "d block"], answer: 0,
          why: "Groups 1 and 2 are the s block." },
        { prompt: "How many columns wide is the p block?",
          options: ["6", "2", "10"], answer: 0,
          why: "A p sublevel holds 6 electrons, so the p block is 6 columns wide. It is groups 13 to 18." },
        { prompt: "Group 16 atoms form ions with which charge?",
          options: ["2−", "2+", "6−"], answer: 0,
          why: "Group 16 atoms have 6 valence electrons. They gain 2 electrons to reach 8. Gaining 2 electrons gives a 2− charge." }
      ],
      extraLetters: [],
      questions: ["p9a", "p9g", "p9c", "p9b", "p9f", "p9d", "p9e", "s9"]
    },

    /* ───────────────────────── Lesson 10 (new) ─────────────────────────
       Class worksheet "Periodic Table | Electron Blocks & Trends", Part 2. The four "check your understanding"
       questions from the worksheet are the two worked examples and the first two "do one together" questions. */
    {
      id: "L10", num: 10, isNew: true,
      title: "Periodic trends",
      from: "This lesson goes with your class worksheet “Periodic Table: Electron Blocks & Trends” (Part 2).",
      pic: "trends",
      rules: [
        "**Atomic radius** is the size of an atom.",
        "Atomic radius gets larger going down a group. Each row down adds one more energy level.",
        "Atomic radius gets smaller going left to right across a row. Each atom has more protons, and they pull the electrons closer.",
        "**Ionization energy** is the energy needed to remove one electron from an atom.",
        "**Electronegativity** is how strongly an atom pulls on the electrons in a bond.",
        "Ionization energy and electronegativity both get larger going left to right across a row. Both get larger going up a group.",
        "To compare two elements, find both on the periodic table. If they are in the same row, compare left and right. If they are in the same group, compare up and down.",
        "On your worksheet, each arrow points toward the larger value. The arrows that point right and up are ionization energy and electronegativity. The arrows that point left and down are atomic radius."
      ],
      words: [
        { t: "Atomic radius", d: "The size of an atom." },
        { t: "Ionization energy", d: "The energy needed to remove one electron from an atom." },
        { t: "Electronegativity", d: "How strongly an atom pulls on the electrons in a bond." }
      ],
      watch: [
        { title: "Which has a larger atomic radius, Na or Cl? (class worksheet, question 1)",
          steps: [
            { say: "Find both elements on the periodic table. Sodium, Na, is in row 3, group 1. Chlorine, Cl, is in row 3, group 17.", pic: "blocks:Na,Cl" },
            { say: "They are in the same row. So compare left and right. Sodium is on the left. Chlorine is on the right.", pic: "blocks:Na,Cl" },
            { say: "Atomic radius gets smaller going left to right. So the atom on the left is the larger one.", pic: "trends" },
            { say: "Answer: Na has the larger atomic radius.", pic: "blocks:Na,Cl" }
          ] },
        { title: "Which has higher ionization energy, Li or K? (class worksheet, question 2)",
          steps: [
            { say: "Find both elements. Lithium, Li, is in group 1, row 2. Potassium, K, is in group 1, row 4.", pic: "blocks:Li,K" },
            { say: "They are in the same group. So compare up and down. Lithium is higher on the table. Potassium is lower.", pic: "blocks:Li,K" },
            { say: "Ionization energy gets larger going up a group. So the atom that is higher has the higher ionization energy.", pic: "trends" },
            { say: "Answer: Li has the higher ionization energy. Its outer electron is closer to the nucleus, so it takes more energy to remove.", pic: "blocks:Li,K" }
          ] }
      ],
      together: [
        { prompt: "Which is more electronegative, O or S?",
          options: ["O", "S", "They are equal"], answer: 0,
          why: "Oxygen and sulfur are in the same group. Oxygen is higher on the table. Electronegativity gets larger going up a group." },
        { prompt: "Which has a larger atomic radius, C or Si?",
          options: ["Si", "C", "They are equal"], answer: 0,
          why: "Carbon and silicon are in the same group. Silicon is lower on the table, so it has one more energy level. Atomic radius gets larger going down a group." },
        { prompt: "In which two directions does ionization energy get larger?",
          options: ["Right and up", "Left and down", "Right and down"], answer: 0,
          why: "Ionization energy gets larger going left to right across a row. It also gets larger going up a group." }
      ],
      extraLetters: [],
      questions: ["p10f", "p10e", "p10a", "p10b", "p10c", "p10d", "s10"]
    }
  ],


  /* kind "match": Section I. answer is the letter in the bank above. */
  questions: [
    { id: "m1", kind: "match", sec: "I", n: 1, lesson: "L1", term: "Wavelength", answer: "C",
      hint: "Wavelength is a length. Look for the definition that is a distance.",
      why: "Wavelength is a length, and a length is a distance. Definition C is the only one that says “distance.”" },
    { id: "m2", kind: "match", sec: "I", n: 2, lesson: "L1", term: "Frequency", answer: "H",
      hint: "Frequent means often. Look for the definition that counts how many.",
      why: "Frequency is a count of waves. Definition H says “how many waves pass a point each second.”" },
    { id: "m3", kind: "match", sec: "I", n: 3, lesson: "L1", term: "Visible light", answer: "B",
      hint: "Visible means it can be seen. Look for the definition about seeing.",
      why: "Visible means it can be seen. Definition B says “human eyes can see.”" },
    { id: "m4", kind: "match", sec: "I", n: 4, lesson: "L1", term: "Photon", answer: "F",
      hint: "“Photo” means light. Look for the definition about light energy.",
      why: "A photon is one small packet of light energy. Definition F says “packet of light energy.”" },
    { id: "m5", kind: "match", sec: "I", n: 5, lesson: "L2", term: "Ground state", answer: "K",
      hint: "Ground state is the lowest energy. Look for the word “lowest.”",
      why: "In the ground state, the electrons have the lowest energy they can have. Definition K says “lowest available energies.”" },
    { id: "m6", kind: "match", sec: "I", n: 6, lesson: "L3", term: "Electron configuration", answer: "E",
      hint: "A configuration is an arrangement that you write down. Look for “written description.”",
      why: "An electron configuration, like 1s² 2s² 2p⁶, is written down. Definition E says “a written description” of how the electrons “are arranged.”" },
    { id: "m7", kind: "match", sec: "I", n: 7, lesson: "L3", term: "Orbital", answer: "J",
      hint: "An orbital is a place. It is not an electron. Look for the word “region.”",
      why: "An orbital is a region of space. Definition J says “a region where an electron is likely to be found.”" },
    { id: "m8", kind: "match", sec: "I", n: 8, lesson: "L4", term: "Valence electron", answer: "A",
      hint: "Valence electrons are the outer electrons. Look for the word “outermost.”",
      why: "A valence electron is in the outermost occupied energy level. Definition A says exactly that." },
    { id: "m9", kind: "match", sec: "I", n: 9, lesson: "L4", term: "Octet rule", answer: "L",
      hint: "“Oct” means eight. An octagon has eight sides. Look for the word “eight.”",
      why: "An octet is a group of eight. Definition L says atoms become more stable with “eight outer electrons.”" },
    { id: "m10", kind: "match", sec: "I", n: 10, lesson: "L5", term: "Cation", answer: "I",
      hint: "The letter t in cation looks like a plus sign. Look for “positively charged.”",
      why: "A cation is a positive ion. It forms when an atom loses electrons. Definition I says both parts." },
    { id: "m11", kind: "match", sec: "I", n: 11, lesson: "L5", term: "Anion", answer: "D",
      hint: "Anion: A Negative ION. Look for “negatively charged.”",
      why: "An anion is a negative ion. It forms when an atom gains electrons. Definition D says both parts." },
    { id: "m12", kind: "match", sec: "I", n: 12, lesson: "L6", term: "Lewis dot diagram", answer: "G",
      hint: "Look for the definition that has the word “dots.”",
      why: "A Lewis dot diagram is a chemical symbol with dots around it. The dots are the valence electrons. Definition G says that." },

    /* kind "mc": Section II. answer is the position of the correct choice: 0 = A, 1 = B, 2 = C, 3 = D.
       wrong[] explains each wrong choice, in the same order as options. */
    { id: "q13", kind: "mc", sec: "II", n: 13, lesson: "L1", pic: "waves",
      prompt: "If a wave has a shorter wavelength, its frequency is usually _____.",
      options: ["higher", "lower", "zero", "unchanged"], answer: 0,
      asks: "The wave’s crests get closer together. Does its frequency go up or down?",
      hint: "Wavelength and frequency go in opposite directions.",
      why: "Shorter waves are packed closer together. So more waves pass a point each second. More waves each second is a higher frequency.",
      wrong: ["", "Lower frequency goes with a longer wavelength, not a shorter one.", "Zero frequency would mean no waves pass at all.", "Wavelength and frequency are linked. When one changes, the other changes too."] },

    { id: "q14", kind: "mc", sec: "II", n: 14, lesson: "L2", pic: "na-up",
      prompt: "An atom absorbs energy. What may happen to one of its electrons?",
      options: ["It becomes a proton.", "It moves to a higher energy level.", "It loses all its charge.", "It turns into a neutron."], answer: 1,
      asks: "The atom takes in energy. What can one electron do with that energy?",
      hint: "Absorbing energy moves an electron up.",
      why: "When an atom absorbs energy, an electron can move up to a higher energy level. That is the excited state.",
      wrong: ["An electron stays an electron. It cannot become a proton.", "", "An electron always has a negative charge. Absorbing energy does not remove it.", "An electron stays an electron. It cannot turn into a neutron."] },

    { id: "q15", kind: "mc", sec: "II", n: 15, lesson: "L2", pic: "na-down",
      prompt: "When an excited electron moves to a lower energy level, the atom may _____.",
      options: ["gain a proton", "stop having electrons", "give off light", "become a different element"], answer: 2,
      asks: "An electron drops from a higher energy level to a lower one. What can the atom do then?",
      hint: "Moving down releases energy. Think about what that energy becomes.",
      why: "When the electron moves down, the atom releases the extra energy. The energy leaves as light, which is a photon.",
      wrong: ["Protons are in the nucleus. An electron changing levels does not add a proton.", "The electron only moves to a lower level. It is still in the atom.", "", "The number of protons decides the element. The protons did not change."] },

    { id: "q16", kind: "mc", sec: "II", n: 16, lesson: "L1", pic: "waves",
      prompt: "Two photons are compared. Photon A has a higher frequency than photon B. Which photon has more energy?",
      options: ["Photon B", "Both have zero energy", "They have equal energy", "Photon A"], answer: 3,
      asks: "Which photon has more energy: the one with the higher frequency or the one with the lower frequency?",
      hint: "Frequency and energy go up together.",
      why: "Higher frequency means more energy. Photon A has the higher frequency, so Photon A has more energy.",
      wrong: ["Photon B has the lower frequency, so it has less energy.", "Every photon carries energy. A photon is a packet of light energy.", "Their frequencies are different, so their energies are different.", ""] },

    { id: "q17", kind: "mc", more: "L7", sec: "II", n: 17, lesson: "L2", pic: "bohr:O",
      prompt: "A neutral oxygen atom has 8 electrons. How many are in its first energy level?",
      options: ["1", "4", "2", "6"], answer: 2,
      asks: "Oxygen has 8 electrons in total. How many of them are in level 1, the level closest to the nucleus?",
      hint: "Level 1 fills first. It holds only a small number of electrons.",
      why: "Level 1 fills first and holds up to 2 electrons. Oxygen puts 2 in level 1 and the other 6 in level 2.",
      wrong: ["Level 1 fills completely before level 2 starts. Full means 2, not 1.", "Level 1 cannot hold 4 electrons. Its limit is 2.", "", "6 is the number of electrons in oxygen’s second level."] },

    { id: "q18", kind: "mc", more: "L7", sec: "II", n: 18, lesson: "L3", pic: "build:C",
      prompt: "Which element has the configuration 1s² 2s² 2p²?",
      options: ["Carbon", "Oxygen", "Neon", "Nitrogen"], answer: 0,
      asks: "Add the raised numbers to count the electrons. Which element has that many electrons?",
      hint: "2 + 2 + 2 = 6. Find atomic number 6 on the periodic table.",
      why: "Add the raised numbers: 2 + 2 + 2 = 6 electrons. A neutral atom with 6 electrons has atomic number 6. That is carbon.",
      wrong: ["", "Oxygen has 8 electrons. Its configuration is 1s² 2s² 2p⁴.", "Neon has 10 electrons. Its configuration is 1s² 2s² 2p⁶.", "Nitrogen has 7 electrons. Its configuration is 1s² 2s² 2p³."] },

    { id: "q19", kind: "mc", more: "L7", sec: "II", n: 19, lesson: "L3", pic: "config",
      prompt: "What is the maximum number of electrons in a p sublevel?",
      options: ["2", "6", "8", "10"], answer: 1,
      asks: "What is the most electrons that a p sublevel can hold?",
      hint: "An s sublevel holds 2. A d sublevel holds 10. The p sublevel is between them.",
      why: "A p sublevel holds up to 6 electrons. It has 3 orbitals, and each orbital holds 2.",
      wrong: ["2 is the maximum for an s sublevel.", "", "8 is a full outer level: 2 in s plus 6 in p. It is not the p sublevel alone.", "10 is the maximum for a d sublevel."] },

    { id: "q20", kind: "mc", more: "L7", sec: "II", n: 20, lesson: "L3", pic: "build:Li",
      prompt: "Which configuration is correct for a neutral lithium atom (3 electrons)?",
      options: ["1s³", "1s² 2p¹", "1s² 2s¹", "1s¹ 2s²"], answer: 2,
      asks: "Lithium has 3 electrons. Which choice puts them in the correct sublevels?",
      hint: "1s fills first and holds only 2. The next sublevel in the filling order is 2s.",
      why: "1s fills first and holds 2 electrons. The third electron goes in the next sublevel, which is 2s. So lithium is 1s² 2s¹.",
      wrong: ["An s sublevel holds at most 2 electrons. 1s³ is not possible.", "After 1s comes 2s. The 2s sublevel fills before 2p.", "", "1s must be full, with 2 electrons, before 2s gets any."] },

    { id: "q21", kind: "mc", sec: "II", n: 21, lesson: "L4", pic: "groups",
      prompt: "Elements in the same main-group column usually have the same number of _____.",
      options: ["protons", "neutrons", "energy levels", "valence electrons"], answer: 3,
      asks: "What is the same for every element in one column of the periodic table?",
      hint: "Think about the electrons in the outermost level.",
      why: "Elements in the same main-group column have the same number of valence electrons. That is why they react in similar ways.",
      wrong: ["Every element has a different number of protons.", "The number of neutrons is different from element to element.", "The number of energy levels goes up as you move down a column. Elements in the same row share that number.", ""] },

    { id: "q22", kind: "mc", sec: "II", n: 22, lesson: "L4", pic: "bohr:O:valence",
      prompt: "How many valence electrons does oxygen have?",
      options: ["2", "6", "8", "16"], answer: 1,
      asks: "How many electrons are in oxygen’s outermost occupied energy level?",
      hint: "Oxygen is in group 16. Use the last digit.",
      why: "Oxygen has 8 electrons: 2 in level 1 and 6 in level 2. Level 2 is the outermost level, so oxygen has 6 valence electrons.",
      wrong: ["2 is the number of electrons in oxygen’s first level. That is an inner level.", "", "8 is oxygen’s total number of electrons, not only the outer ones.", "16 is oxygen’s group number on the periodic table. Only the last digit, 6, is the valence count."] },

    { id: "q23", kind: "mc", sec: "II", n: 23, lesson: "L4", pic: "bohr:Ne:valence",
      prompt: "Why is neon generally unreactive?",
      options: ["It has no protons.", "Its nucleus is empty.", "Its outer energy level is full.", "It has only one electron."], answer: 2,
      asks: "Why does neon usually not react with other atoms?",
      hint: "Count neon’s outer electrons. Then think about the octet rule.",
      why: "Neon has 2 electrons in level 1 and 8 in level 2. Its outer level is full, so it does not need to gain, lose, or share electrons.",
      wrong: ["Neon has 10 protons.", "Neon’s nucleus holds its 10 protons and its neutrons.", "", "Neon has 10 electrons. Hydrogen is the element with one electron."] },

    { id: "q24", kind: "mc", sec: "II", n: 24, lesson: "L4", pic: "bohr:F:valence",
      prompt: "A neutral atom has 2 electrons in its first level and 7 in its second. How many valence electrons does it have?",
      options: ["2", "5", "9", "7"], answer: 3,
      asks: "How many electrons are in this atom’s outermost occupied level?",
      hint: "The second level is the outermost level here. Do not add. Do not subtract.",
      why: "Valence electrons are the electrons in the outermost occupied level. Here that is the second level, which has 7.",
      wrong: ["2 is the first level. That is the inner level, not the outermost one.", "5 comes from subtracting 7 − 2. Valence electrons are counted, not subtracted.", "9 is the total number of electrons, 2 + 7. Only the outermost level counts.", ""] },

    { id: "q25", kind: "mc", sec: "II", n: 25, lesson: "L4", pic: "bohr:Cl:valence",
      prompt: "Which element most likely wants to gain one electron to complete an octet?",
      options: ["Chlorine", "Magnesium", "Sodium", "Neon"], answer: 0,
      asks: "Which element has 7 valence electrons, so it needs only 1 more to make 8?",
      hint: "Gaining 1 to make 8 means it has 7 now. Which group has 7 valence electrons?",
      why: "Chlorine is in group 17, so it has 7 valence electrons. It gains 1 electron to make 8.",
      wrong: ["", "Magnesium has 2 valence electrons. It loses 2 electrons.", "Sodium has 1 valence electron. It loses 1 electron.", "Neon already has 8 outer electrons. It does not need any more."] },

    { id: "q26", kind: "mc", sec: "II", n: 26, lesson: "L4", pic: "bohr:Ne:valence",
      prompt: "Why do many atoms gain, lose, or share electrons when bonding?",
      options: ["To change their number of protons", "To reach a more stable outer electron arrangement", "To remove their nucleus", "To create more neutrons"], answer: 1,
      asks: "What do atoms get from gaining, losing, or sharing electrons?",
      hint: "Think about the octet rule.",
      why: "Atoms gain, lose, or share electrons to get a full outer level. A full outer level is a more stable arrangement. That is the octet rule.",
      wrong: ["Bonding uses electrons only. The protons stay in the nucleus and do not change.", "", "An atom always keeps its nucleus.", "Bonding does not make neutrons. Neutrons stay in the nucleus."] },

    { id: "q27", kind: "mc", sec: "II", n: 27, lesson: "L5", pic: "ion:Na",
      prompt: "An atom loses an electron. Its new charge is _____.",
      options: ["negative", "zero", "positive", "always 2−"], answer: 2,
      asks: "An atom gives away one electron. Is the atom now positive, negative, or neutral?",
      hint: "An electron is negative. After losing one, the atom has more protons than electrons.",
      why: "Electrons are negative. When the atom loses one, it has one more proton than electrons. More protons means a positive charge.",
      wrong: ["An atom becomes negative when it gains electrons, not when it loses them.", "Zero is the charge of the neutral atom, before it lost the electron.", "", "2− means the atom gained two electrons. This atom lost one."] },

    { id: "q28", kind: "mc", sec: "II", n: 28, lesson: "L5", pic: "ion:Cl",
      prompt: "A chlorine atom gains one electron. What ion does it become?",
      options: ["Cl⁺", "Cl²⁺", "Cl²⁻", "Cl⁻"], answer: 3,
      asks: "Chlorine takes in one extra electron. How do you write that ion?",
      hint: "One extra electron means one extra negative charge.",
      why: "Chlorine has 17 protons. After gaining 1 electron it has 18 electrons. Charge = 17 − 18 = −1. That is written Cl⁻.",
      wrong: ["Cl⁺ would mean chlorine lost one electron.", "Cl²⁺ would mean chlorine lost two electrons.", "Cl²⁻ would mean chlorine gained two electrons. It gained one.", ""] },

    { id: "q29", kind: "mc", sec: "II", n: 29, lesson: "L5", pic: "ion:Na",
      prompt: "How many electrons does a sodium ion (Na⁺) have? Sodium has 11 protons.",
      options: ["10", "11", "12", "22"], answer: 0,
      asks: "Na⁺ is a sodium atom that lost one electron. How many electrons are left?",
      hint: "A neutral sodium atom has 11 electrons. The + sign means one electron is gone.",
      why: "A neutral sodium atom has 11 protons and 11 electrons. The + sign means it lost 1 electron. 11 − 1 = 10 electrons.",
      wrong: ["", "11 is the number of electrons in the neutral atom. Na⁺ has lost one.", "12 would mean sodium gained an electron. A positive ion has lost electrons.", "22 is 11 protons plus 11 electrons. The question asks only about electrons."] },

    { id: "q30", kind: "mc", sec: "II", n: 30, lesson: "L5", pic: "ion:Mg",
      prompt: "Which ion is a magnesium atom most likely to form?",
      options: ["Mg⁻", "Mg²⁺", "Mg²⁻", "Mg⁺"], answer: 1,
      asks: "What charge does magnesium have after it becomes an ion?",
      hint: "Magnesium is in group 2. It has 2 valence electrons, and it loses both.",
      why: "Magnesium is in group 2, so it has 2 valence electrons. It loses both. Losing 2 electrons gives a 2+ charge: Mg²⁺.",
      wrong: ["A negative charge means the atom gained an electron. Magnesium loses electrons.", "", "2− means the atom gained two electrons. Magnesium loses two.", "Mg⁺ has lost only one electron. Magnesium loses both valence electrons to get a full outer level."] },

    { id: "q31", kind: "mc", sec: "II", n: 31, lesson: "L5", pic: "ion:F",
      prompt: "Which atom is most likely to form a 1− ion?",
      options: ["Calcium", "Aluminum", "Fluorine", "Sodium"], answer: 2,
      asks: "Which atom gains exactly one electron when it becomes an ion?",
      hint: "An atom with 7 valence electrons gains 1. Which group has 7 valence electrons?",
      why: "A 1− ion forms when an atom gains 1 electron. Fluorine is in group 17. It has 7 valence electrons and gains 1 to make 8.",
      wrong: ["Calcium is in group 2. It loses 2 electrons and forms Ca²⁺.", "Aluminum is in group 13. It loses 3 electrons and forms Al³⁺.", "", "Sodium is in group 1. It loses 1 electron and forms Na⁺."] },

    { id: "q32", kind: "mc", sec: "II", n: 32, lesson: "L5", pic: "ion:F",
      prompt: "A neutral atom has 9 protons and 9 electrons. It gains one electron. Which statement is true?",
      options: ["It now has 8 electrons and a 1+ charge.", "It now has 9 electrons and no charge.", "It now has 10 protons and a 1− charge.", "It now has 10 electrons and a 1− charge."], answer: 3,
      asks: "The atom starts with 9 protons and 9 electrons. One electron is added. What are the new numbers and the new charge?",
      hint: "Only the number of electrons changes. Then use charge = protons − electrons.",
      why: "Gaining one electron makes 9 + 1 = 10 electrons. The protons stay at 9. Charge = 9 − 10 = −1, which is written 1−.",
      wrong: ["8 electrons and a 1+ charge is what happens when the atom loses an electron.", "9 electrons and no charge is the atom before it gained the electron.", "The number of protons does not change. Only electrons are gained.", ""] },

    { id: "q33", kind: "mc", sec: "II", n: 33, lesson: "L6", pic: "lewis:C",
      prompt: "How many dots should appear around the symbol for neutral carbon?",
      options: ["2", "4", "6", "8"], answer: 1,
      asks: "How many valence electrons does carbon have? That is the number of dots.",
      hint: "Carbon is in group 14. Use the last digit.",
      why: "The number of dots equals the number of valence electrons. Carbon is in group 14, so it has 4 valence electrons and 4 dots.",
      wrong: ["2 is the number of electrons in carbon’s first level. Dots show only the outer electrons.", "", "6 is carbon’s total number of electrons. Dots show only the valence electrons.", "8 dots is a full octet, like neon. Carbon has 4 valence electrons."] },

    { id: "q34", kind: "mc", sec: "II", n: 34, lesson: "L6", pic: "lewis:F",
      prompt: "Which element should have seven dots in its Lewis dot diagram?",
      options: ["Oxygen", "Neon", "Fluorine", "Boron"], answer: 2,
      asks: "Which element has 7 valence electrons?",
      hint: "Seven valence electrons means group 17.",
      why: "Seven dots means 7 valence electrons. Fluorine is in group 17, so it has 7 valence electrons.",
      wrong: ["Oxygen is in group 16. It gets 6 dots.", "Neon is in group 18. It gets 8 dots.", "", "Boron is in group 13. It gets 3 dots."] },

    { id: "q35", kind: "mc", sec: "II", n: 35, lesson: "L6", pic: "lewis:Na",
      prompt: "A student puts two dots around the symbol Na. What is the best correction?",
      options: ["Add six more dots.", "Change Na to Ne.", "Remove both dots.", "Remove one dot."], answer: 3,
      asks: "How many dots should sodium have? Fix the student’s drawing.",
      hint: "Sodium is in group 1. How many valence electrons is that?",
      why: "Sodium is in group 1, so it has 1 valence electron. It should have 1 dot. Two dots is one too many, so remove one dot.",
      wrong: ["Adding six would make 8 dots. Sodium has 1 valence electron, not 8.", "The drawing is about sodium. Changing the symbol does not fix sodium’s dots. Neon would need 8 dots, not 2.", "Zero dots would mean no valence electrons. Sodium has 1.", ""] },

    { id: "q36", kind: "mc", sec: "II", n: 36, lesson: "L6", pic: "lewis:O,S",
      prompt: "Which pair of elements should have the same number of dots in their Lewis diagrams?",
      options: ["Oxygen and sulfur", "Sodium and magnesium", "Carbon and nitrogen", "Fluorine and neon"], answer: 0,
      asks: "Which two elements have the same number of valence electrons?",
      hint: "Elements in the same column have the same number of valence electrons.",
      why: "Oxygen and sulfur are both in group 16. Each has 6 valence electrons, so each gets 6 dots.",
      wrong: ["", "Sodium is in group 1 and gets 1 dot. Magnesium is in group 2 and gets 2 dots.", "Carbon is in group 14 and gets 4 dots. Nitrogen is in group 15 and gets 5 dots.", "Fluorine is in group 17 and gets 7 dots. Neon is in group 18 and gets 8 dots."] },

    { id: "q37", kind: "mc", sec: "II", n: 37, lesson: "L6", pic: "lewis:N,P",
      prompt: "A neutral element has five valence electrons. How many dots go in its Lewis diagram?",
      options: ["3", "5", "7", "10"], answer: 1,
      asks: "The element has 5 valence electrons. How many dots is that?",
      hint: "The number of dots and the number of valence electrons are the same.",
      why: "The number of dots equals the number of valence electrons. Five valence electrons means five dots. Nitrogen and phosphorus are examples.",
      wrong: ["3 is how many more electrons it needs to reach 8. The dots show the electrons it has now.", "", "7 dots is for an element with 7 valence electrons.", "A Lewis dot diagram never has more than 8 dots."] },

    /* Section III. The paper numbers these questions 1, 2 and 41. Each part is its own screen. */
    { id: "w1a", kind: "bohrLabel", sec: "III", n: "1", part: "a", lesson: "L2",
      stem: "Consider the Bohr model below. Then answer the following questions based on the Bohr model below.",
      prompt: "a. Label what parts A, B, and C represent.",
      asks: "The picture shows one atom. One electron moves up and then moves back down. Say what each labeled part shows.",
      hint: "Arrow A points away from the nucleus. Arrow B points back toward the nucleus. The zigzag C leaves the atom.",
      labels: [
        "The electron absorbs energy and moves up to a higher energy level.",
        "The electron moves back down to its lower energy level.",
        "The atom gives off light (a photon).",
        "The electron leaves the atom, and the atom becomes an ion.",
        "A proton moves out of the nucleus."
      ],
      answer: { A: 0, B: 1, C: 2 },
      clue: {
        A: "Arrow A points away from the nucleus. It goes from the 4th ring up to the 5th ring.",
        B: "Arrow B points back toward the nucleus. It goes from the 5th ring down to the 4th ring.",
        C: "The zigzag C starts where the electron moves down. It points out of the atom. It is not an electron."
      },
      whyParts: {
        A: "Arrow A shows the electron moving up, from the 4th ring to the 5th ring. Moving up takes energy, so the atom absorbed energy.",
        B: "Arrow B shows the electron moving back down to the 4th ring. The 4th ring is its ground state.",
        C: "When the electron moves down, the atom gives off the extra energy as light. The zigzag is that light, a photon."
      },
      model: [
        "A: The electron absorbs energy and moves up to a higher energy level (the excited state).",
        "B: The electron moves back down to its lower energy level (the ground state).",
        "C: The atom gives off light (a photon)."
      ] },

    { id: "w1b", kind: "bohrTap", target: "ground", sec: "III", n: "1", part: "b", lesson: "L2",
      stem: "Consider the Bohr model below. Then answer the following questions based on the Bohr model below.",
      prompt: "b. Shade in the valence electron that is in its ground state.",
      asks: "Find the valence electron before it absorbed any energy. Tap it to shade it.",
      hint: "The valence electron is in the outermost occupied energy level. Find the farthest ring that has a filled electron on it.",
      why: "Count the electrons on each ring: 2, 8, 8, 1. The single electron on the 4th ring is the valence electron. That ring is its lowest available level, so that is its ground state.",
      note: "This atom has 2 + 8 + 8 + 1 = 19 electrons. Atomic number 19 is potassium (K).",
      wrongTap: {
        inner: "That electron is on an inner ring. The valence electron is in the outermost occupied level.",
        excited: "The empty circle shows where the electron is after it absorbs energy. That is the excited state, not the ground state."
      } },

    { id: "w1c", kind: "bohrTap", target: "excited", prev: "w1b", sec: "III", n: "1", part: "c", lesson: "L2",
      stem: "Consider the Bohr model below. Then answer the following questions based on the Bohr model below.",
      prompt: "c. Place a star on the valence electron that is in its excited state.",
      asks: "Find where the valence electron is after it absorbed energy. Tap that spot to put a star on it.",
      hint: "Follow arrow A. It starts at the ground state and ends at the excited state.",
      why: "Arrow A shows the electron moving up after the atom absorbs energy. The empty circle on the 5th ring is where the electron lands. That is the excited state.",
      wrongTap: {
        inner: "That electron is on an inner ring. It did not move.",
        ground: "That is the valence electron in its ground state, on the 4th ring. The excited state is one ring higher."
      } },

    { id: "w2a", kind: "config", sec: "III", n: "2", part: "a", lesson: "L3",
      stem: "Write out the complete electron configuration for each:",
      prompt: "a. Cl",
      symbol: "Cl", name: "Chlorine", z: 17, answer: "1s² 2s² 2p⁶ 3s² 3p⁵",
      asks: "List every sublevel that holds electrons in a chlorine atom. Write them in filling order. Start at 1s.",
      hint: "Chlorine’s atomic number is 17, so place 17 electrons. The filling order starts 1s, 2s, 2p, 3s, 3p.",
      why: "Chlorine has 17 electrons. 1s², 2s², 2p⁶ and 3s² hold 12 electrons. The last 5 go in 3p, so it ends in 3p⁵." },

    { id: "w2b", kind: "config", sec: "III", n: "2", part: "b", lesson: "L3",
      stem: "Write out the complete electron configuration for each:",
      prompt: "b. V",
      symbol: "V", name: "Vanadium", z: 23, answer: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d³",
      asks: "List every sublevel that holds electrons in a vanadium atom. Write them in filling order. Start at 1s.",
      hint: "Vanadium’s atomic number is 23. After 3p, the next sublevel is 4s. After 4s comes 3d.",
      why: "Vanadium has 23 electrons. The sublevels through 3p⁶ hold 18. Then 4s² makes 20. The last 3 go in 3d, so it ends in 3d³." },

    { id: "w2c", kind: "config", sec: "III", n: "2", part: "c", lesson: "L3",
      stem: "Write out the complete electron configuration for each:",
      prompt: "c. Si",
      symbol: "Si", name: "Silicon", z: 14, answer: "1s² 2s² 2p⁶ 3s² 3p²",
      asks: "List every sublevel that holds electrons in a silicon atom. Write them in filling order. Start at 1s.",
      hint: "Silicon’s atomic number is 14, so place 14 electrons. The filling order starts 1s, 2s, 2p, 3s, 3p.",
      why: "Silicon has 14 electrons. 1s², 2s², 2p⁶ and 3s² hold 12 electrons. The last 2 go in 3p, so it ends in 3p²." },

    { id: "w2d", kind: "config", sec: "III", n: "2", part: "d", lesson: "L3",
      stem: "Write out the complete electron configuration for each:",
      prompt: "d. Mo",
      symbol: "Mo", name: "Molybdenum", z: 42, answer: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁶ 5s² 4d⁴",
      alt: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁶ 5s¹ 4d⁵",
      asks: "List every sublevel that holds electrons in a molybdenum atom. Write them in filling order. Start at 1s.",
      hint: "Molybdenum’s atomic number is 42. After 4p, the next sublevel is 5s. After 5s comes 4d.",
      why: "Molybdenum has 42 electrons. The sublevels through 4p⁶ hold 36. Then 5s² makes 38. The last 4 go in 4d, so the filling order gives 4d⁴.",
      note: "Molybdenum is one of a few exceptions to the filling order. The real atom ends in 5s¹ 4d⁵. Both ways have 42 electrons. If your class learned the exceptions, write 5s¹ 4d⁵. If not, write 5s² 4d⁴. Ask your teacher which one to write." },

    { id: "w41a", kind: "seFind", sec: "III", n: "41", part: "a", lesson: "L3",
      stem: "Consider the following **incorrect** electron configuration for Selenium: 1s²2s²2p⁶3s²3d¹⁰3p⁶4s²4p⁴",
      prompt: "a. Identify what is wrong and why it is wrong.",
      chips: ["1s²", "2s²", "2p⁶", "3s²", "3d¹⁰", "3p⁶", "4s²", "4p⁴"], wrongChip: 4,
      asks: "One part of this configuration is written in the wrong place. Find that part. Then say why it is wrong.",
      hint: "Say the filling order while you point at each part: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p.",
      chipWhy: "3d¹⁰ is written right after 3s². In the filling order, 3p and 4s both come before 3d.",
      chipWrong: "That part is in the correct place. Compare each part with the filling order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p.",
      reasons: [
        "3d fills after 4s. Electrons fill the lowest-energy sublevels first, so 3p and 4s fill before 3d.",
        "A d sublevel can hold only 6 electrons, so 3d¹⁰ has too many.",
        "The total number of electrons is wrong for selenium.",
        "The 4p sublevel should have 6 electrons, not 4."
      ],
      reason: 0,
      reasonWrong: [
        "",
        "A d sublevel holds up to 10 electrons. 3d¹⁰ is a correct amount.",
        "Selenium has 34 electrons. The raised numbers add up to 34: 2 + 2 + 6 + 2 + 10 + 6 + 2 + 4. The total is correct.",
        "Selenium has only 4 electrons left for 4p. 4p⁴ is correct."
      ],
      why: "3d¹⁰ is in the wrong place. Electrons fill the lowest-energy sublevels first. The 3d sublevel is higher in energy than 3p and 4s, so it fills after them.",
      model: "3d¹⁰ is in the wrong place. It is written before 3p⁶ and 4s². Electrons fill the lowest-energy sublevels first, and 3d fills after 4s." },

    { id: "w41b", kind: "config", sec: "III", n: "41", part: "b", lesson: "L3",
      stem: "Consider the following **incorrect** electron configuration for Selenium: 1s²2s²2p⁶3s²3d¹⁰3p⁶4s²4p⁴",
      prompt: "b. Write the correct electron configuration for Selenium.",
      symbol: "Se", name: "Selenium", z: 34, answer: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁴",
      asks: "Write selenium’s configuration again with every sublevel in filling order.",
      hint: "Move 3d¹⁰ so it comes after 4s². Keep every raised number the same.",
      why: "Selenium has 34 electrons. In filling order: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁴. Check: 2 + 2 + 6 + 2 + 6 + 2 + 10 + 4 = 34." },

    /* kind "say": the same Section III question, answered in her own words by voice or typing.
       "key" holds grading notes for the online checker. "model" is the short answer shown by "Show model answer".
       These two are part of the lessons. The practice test uses the tap-and-choose versions above. */
    { id: "s1a", kind: "say", sec: "III", n: "1", part: "a", lesson: "L2", figure: true,
      stem: "Consider the Bohr model below. Then answer the following questions based on the Bohr model below.",
      prompt: "a. Label what parts A, B, and C represent.",
      hint: "Say three short sentences. Start each one with its letter: “A is …”, “B is …”, “C is …”.",
      key: "A: the electron absorbs energy and moves up to a higher energy level (it becomes excited). B: the electron falls back down to its lower energy level (it returns to the ground state). C: light is given off (a photon; energy is released or emitted). All three parts are needed for got_it. For C accept light, photon, or energy released. Accept any clear wording for moving up and for moving back down.",
      model: [
        "A: The electron absorbs energy and moves up to a higher energy level (the excited state).",
        "B: The electron moves back down to its lower energy level (the ground state).",
        "C: The atom gives off light (a photon)."
      ],
      expectedTerms: [],
      visualText: "Bohr model of one atom. The rings hold 2, 8, 8 and 1 electrons. Arrow A points from the single electron on the 4th ring out to an empty circle on the 5th ring. Arrow B points from that empty circle back to the 4th ring. C is a zigzag shape that starts where arrow B starts and points away from the atom." },

    { id: "s41a", kind: "say", sec: "III", n: "41", part: "a", lesson: "L3",
      stem: "Consider the following **incorrect** electron configuration for Selenium: 1s²2s²2p⁶3s²3d¹⁰3p⁶4s²4p⁴",
      prompt: "a. Identify what is wrong and why it is wrong.",
      hint: "Say two things. First, which part is in the wrong place. Second, the rule about which sublevels fill first.",
      key: "What is wrong: 3d10 is in the wrong place. It is written right after 3s2, before 3p6 and 4s2. Why: electrons fill the lowest-energy sublevels first (the filling order is 1s 2s 2p 3s 3p 4s 3d 4p), so 3p and 4s fill before 3d. For got_it the answer must name 3d as the part in the wrong place and give a reason about filling order or energy, for example that 3d fills after 4s. The total of 34 electrons is correct, so an answer that says the number of electrons is wrong is not_yet.",
      model: "3d¹⁰ is in the wrong place. It is written before 3p⁶ and 4s². Electrons fill the lowest-energy sublevels first, and 3d fills after 4s.",
      expectedTerms: [],
      visualText: "" },

    /* ══════════════ set "P": extra practice inside lessons 7 to 10. These are not the teacher's questions. ══════════════
       "fig" is a picture shown inside the question. "pic" is the picture shown with the explanation. */

    /* ── Lesson 7: levels, sublevels, orbitals ── */
    { id: "p7d", kind: "mc", set: "P", lesson: "L7", pic: "levels",
      prompt: "What is the maximum number of electrons in one orbital?",
      options: ["1", "2", "6", "8"], answer: 1,
      asks: "How many electrons fit in a single orbital?",
      hint: "In your class model, one orbital is one bunk bed.",
      why: "One orbital holds up to 2 electrons. This is true for every orbital in every sublevel.",
      wrong: ["An orbital can hold 1 electron, but it has room for 1 more.", "", "6 is the maximum for a whole p sublevel. A p sublevel has 3 orbitals.", "8 is the maximum for all of level 2. Level 2 has 4 orbitals."] },

    { id: "p7c", kind: "mc", set: "P", lesson: "L7", pic: "levels",
      prompt: "How many orbitals are in a d sublevel?",
      options: ["1", "3", "5", "10"], answer: 2,
      asks: "A d sublevel is made of orbitals. How many orbitals?",
      hint: "An s sublevel has 1 orbital. A p sublevel has 3. Each one goes up by 2.",
      why: "A d sublevel has 5 orbitals. Each orbital holds 2 electrons, so a d sublevel holds 10 electrons.",
      wrong: ["1 is the number of orbitals in an s sublevel.", "3 is the number of orbitals in a p sublevel.", "", "10 is the number of electrons a d sublevel holds. It is not the number of orbitals."] },

    { id: "p7e", kind: "mc", set: "P", lesson: "L7", pic: "levels",
      prompt: "Which sublevels are in energy level 2?",
      options: ["2s only", "2s and 2p", "2s, 2p, and 2d", "1s and 2s"], answer: 1,
      asks: "Energy level 2 is split into sublevels. Which ones?",
      hint: "Level 1 has 1 sublevel. Level 2 has 2 sublevels. Level 3 has 3 sublevels.",
      why: "Level 2 has 2 sublevels: 2s and 2p. Together they hold 2 + 6 = 8 electrons.",
      wrong: ["Level 2 has 2 sublevels, not 1. It also has 2p.", "", "There is no 2d sublevel. The d sublevels start in level 3.", "1s is in level 1, not in level 2."] },

    { id: "p7f", kind: "mc", set: "P", lesson: "L7", pic: "config",
      prompt: "In 3p⁴, what does the 4 tell you?",
      options: ["The energy level", "The number of orbitals in the sublevel", "The number of electrons in the sublevel", "The number of sublevels in the level"], answer: 2,
      asks: "The raised number in 3p⁴ is 4. What does that number count?",
      hint: "On your class handout, you drew a box around the numbers of electrons.",
      why: "The raised number is the number of electrons in that sublevel. 3p⁴ means 4 electrons are in the 3p sublevel.",
      wrong: ["The energy level is the first number. In 3p⁴ the energy level is 3.", "A p sublevel always has 3 orbitals. The 4 does not count orbitals.", "", "Level 3 has 3 sublevels: 3s, 3p, and 3d. The 4 does not count sublevels."] },

    { id: "p7g", kind: "mc", set: "P", lesson: "L7", pic: "model",
      prompt: "In your class boarding house model, one bunk bed stands for one _____.",
      options: ["energy level", "sublevel", "orbital", "electron"], answer: 2,
      asks: "A bunk bed holds 2 boarders. Which part of the atom holds 2 electrons?",
      hint: "Say the two lists in order. Floor, room, bunk bed, boarder. Energy level, sublevel, orbital, electron.",
      why: "A bunk bed holds 2 boarders. An orbital holds 2 electrons. So one bunk bed stands for one orbital.",
      wrong: ["A floor of the house stands for an energy level.", "A room stands for a sublevel. The sunny room is s. The pink room is p.", "", "A boarder stands for an electron."] },

    { id: "p7h", kind: "mc", set: "P", lesson: "L7", pic: "orbx:1s:ud;2s:ud;2p:u,u,-|Carbon: 2s is full before 2p gets any electrons.",
      prompt: "In the boarding house, the pink room on a floor opens only when all of the bunks in the sunny room on that floor are occupied. What does this mean for an atom?",
      options: ["A p sublevel gets electrons only after the s sublevel in that level is full.", "A p sublevel fills before the s sublevel in that level.", "An s sublevel holds more electrons than a p sublevel.", "Level 2 fills before level 1."], answer: 0,
      asks: "The sunny room is the s sublevel. The pink room is the p sublevel. Which one fills first?",
      hint: "Look at the manager’s code 1s² 2s² 2p². The 2s is full before 2p has any electrons.",
      why: "The sunny room is the s sublevel, and the pink room is the p sublevel. In the same level, s is lower in energy than p. So s fills completely before p gets any electrons.",
      wrong: ["", "It is the other way. The s sublevel fills first, because it is lower in energy.", "An s sublevel holds 2 electrons. A p sublevel holds 6. The p sublevel holds more.", "Level 1 has the lowest energy, so level 1 fills first."] },

    { id: "p7a", kind: "mc", set: "P", lesson: "L7", pic: "orb:Be",
      prompt: "Which configuration is correct for a neutral beryllium atom (4 electrons)?",
      options: ["1s⁴", "1s² 2s²", "1s² 2p²", "1s¹ 2s³"], answer: 1,
      asks: "Beryllium has 4 electrons. Which choice puts them in the correct sublevels?",
      hint: "1s holds only 2. The next sublevel is 2s, and it also holds 2.",
      why: "1s fills first and holds 2 electrons. The other 2 electrons go in 2s. So beryllium is 1s² 2s².",
      wrong: ["An s sublevel holds at most 2 electrons. 1s⁴ is not possible.", "", "After 1s comes 2s. The 2s sublevel fills before 2p.", "1s must be full before 2s gets any electrons. Also, an s sublevel cannot hold 3."] },

    { id: "p7b", kind: "mc", set: "P", lesson: "L7", pic: "orb:F",
      prompt: "Which configuration is correct for a neutral fluorine atom (9 electrons)?",
      options: ["1s² 2s⁷", "1s² 2p⁷", "1s² 2s² 2p⁶", "1s² 2s² 2p⁵"], answer: 3,
      asks: "Fluorine has 9 electrons. Which choice puts them in the correct sublevels?",
      hint: "Fill 1s with 2. Fill 2s with 2. Then count how many electrons are left for 2p.",
      why: "1s holds 2 and 2s holds 2. That is 4 electrons. The other 5 go in 2p. Check: 2 + 2 + 5 = 9.",
      wrong: ["An s sublevel holds at most 2 electrons. 2s⁷ is not possible.", "This skips 2s. Also, a p sublevel holds at most 6, so 2p⁷ is not possible.", "The raised numbers add up to 10. Fluorine has 9 electrons. This configuration is neon.", ""] },

    /* ── Lesson 8: orbital diagrams ── */
    { id: "p8a", kind: "mc", set: "P", lesson: "L8",
      fig: "orbx:1s:ud;2s:ud;2p:ud,-,-", pic: "orbx:1s:ud;2s:ud;2p:u,u,-|A correct diagram for carbon",
      prompt: "A student drew this orbital diagram for carbon (6 electrons). Which rule does it break?",
      options: ["The Aufbau principle", "The Pauli exclusion principle", "Hund’s rule", "It does not break a rule."], answer: 2,
      asks: "Look at the 2p boxes. Are the 2 electrons placed the right way?",
      hint: "Carbon has 2 electrons in 2p, and 2p has 3 boxes. Should the 2 electrons share one box?",
      why: "The 2 electrons in 2p are paired in one box, but two 2p boxes are empty. Hund’s rule says each box gets 1 electron before any box gets 2.",
      wrong: ["1s and 2s are full before 2p starts. The Aufbau principle is followed.", "Each pair has one arrow up and one arrow down. The Pauli exclusion principle is followed.", "", "One rule is broken. Look at 2p: a pair was made while two boxes are empty."] },

    { id: "p8b", kind: "mc", set: "P", lesson: "L8",
      fig: "orbx:1s:ud;2s:u;2p:u,u,-", pic: "orbx:1s:ud;2s:ud;2p:u,-,-|A correct diagram for boron",
      prompt: "A student drew this orbital diagram for boron (5 electrons). Which rule does it break?",
      options: ["The Aufbau principle", "The Pauli exclusion principle", "Hund’s rule", "It does not break a rule."], answer: 0,
      asks: "Check the sublevels from the bottom to the top. Is each one full before the next one starts?",
      hint: "Look at 2s. How many electrons does 2s hold when it is full?",
      why: "2s has only 1 electron, but 2p already has electrons. The Aufbau principle says a lower sublevel fills before the next one starts.",
      wrong: ["", "No box has 2 arrows that point the same way. The Pauli exclusion principle is followed.", "In 2p, each electron is in its own box. Hund’s rule is followed.", "One rule is broken. Look at 2s: it is not full."] },

    { id: "p8c", kind: "mc", set: "P", lesson: "L8",
      fig: "orbx:1s:ud;2s:uu;2p:-,-,-", pic: "orbx:1s:ud;2s:ud;2p:-,-,-|A correct diagram for beryllium",
      prompt: "A student drew this orbital diagram for beryllium (4 electrons). Which rule does it break?",
      options: ["The Aufbau principle", "The Pauli exclusion principle", "Hund’s rule", "It does not break a rule."], answer: 1,
      asks: "Look at each box that has 2 arrows. Which way do the arrows point?",
      hint: "Two electrons in one orbital have opposite spins.",
      why: "The 2s box has 2 arrows that both point up. The Pauli exclusion principle says 2 electrons in one orbital have opposite spins: one arrow up and one arrow down.",
      wrong: ["1s is full before 2s starts. The Aufbau principle is followed.", "", "Hund’s rule is about a sublevel with more than one box. The 2s sublevel has only 1 box.", "One rule is broken. Look at the two arrows in 2s."] },

    { id: "p8d", kind: "mc", set: "P", lesson: "L8", pic: "orb:P",
      prompt: "Phosphorus has 3 electrons in its 3p sublevel. Which drawing of 3p is correct?",
      options: ["{orb:3p:ud,u,-}", "{orb:3p:u,u,u}", "{orb:3p:uu,u,-}", "{orb:3p:u,d,u}"], answer: 1,
      asks: "Three electrons go into three boxes. How does Hund’s rule place them?",
      hint: "Put 1 arrow in each box before you make any pair.",
      why: "Hund’s rule puts 1 electron in each of the 3 boxes. All three single arrows point the same way.",
      wrong: ["A pair was made while one box is empty. That breaks Hund’s rule.", "", "The first box has 2 arrows that point the same way. That breaks the Pauli exclusion principle.", "The single arrows do not all point the same way. That breaks Hund’s rule."] },

    { id: "p8g", kind: "mc", set: "P", lesson: "L8", pic: "orbkey",
      prompt: "Two electrons are in the same orbital. What must be true?",
      options: ["They have the same spin.", "They have opposite spins.", "They are in different sublevels.", "They have no charge."], answer: 1,
      asks: "One orbital holds 2 electrons. How are those 2 electrons different from each other?",
      hint: "Think of a pair in a box: one arrow up and one arrow down.",
      why: "The Pauli exclusion principle says 2 electrons in the same orbital have opposite spins. That is why a pair is drawn with one arrow up and one arrow down.",
      wrong: ["Two electrons with the same spin cannot share an orbital.", "", "An orbital is inside one sublevel. Both electrons are in that sublevel.", "Every electron has a negative charge."] },

    { id: "p8e", kind: "orbFill", set: "P", lesson: "L8",
      symbol: "S", name: "Sulfur", z: 16, subs: ["1s", "2s", "2p", "3s", "3p"],
      prompt: "Complete the orbital diagram for sulfur (16 electrons).",
      asks: "Place 16 arrows in the boxes. Follow the three rules.",
      hint: "Fill 1s, 2s, 2p, and 3s first. That places 12 electrons. Then place the last 4 in 3p. Put 1 in each box before you make a pair.",
      why: "Sulfur has 16 electrons. 1s, 2s, 2p, and 3s hold 12. The last 4 go in 3p: 1 in each box, and then 1 pair. So 3p has one pair and two single arrows." },

    { id: "p8f", kind: "orbFill", set: "P", lesson: "L8",
      symbol: "Cl", name: "Chlorine", z: 17, subs: ["1s", "2s", "2p", "3s", "3p"],
      prompt: "Complete the orbital diagram for chlorine (17 electrons).",
      asks: "Place 17 arrows in the boxes. Follow the three rules.",
      hint: "Fill 1s, 2s, 2p, and 3s first. That places 12 electrons. Then place the last 5 in 3p. Put 1 in each box before you make a pair.",
      why: "Chlorine has 17 electrons. 1s, 2s, 2p, and 3s hold 12. The last 5 go in 3p: 1 in each box, and then 2 pairs. So 3p has two pairs and one single arrow." },

    /* ── Lesson 9: periodic table blocks and ion charges ── */
    { id: "p9a", kind: "mc", set: "P", lesson: "L9", pic: "blocks:Mg",
      prompt: "Magnesium is in group 2. Which block of the periodic table is it in?",
      options: ["s block", "p block", "d block", "f block"], answer: 0,
      asks: "Find group 2 on the periodic table. Which block is it part of?",
      hint: "The s block is 2 columns wide. It is on the left side of the table.",
      why: "Groups 1 and 2 are the s block. Magnesium is in group 2, so its last electrons are in an s sublevel: 3s².",
      wrong: ["", "The p block is groups 13 to 18.", "The d block is groups 3 to 12.", "The f block is the two rows at the bottom of the table."] },

    { id: "p9g", kind: "mc", set: "P", lesson: "L9", pic: "blocks:He",
      prompt: "Helium is in group 18. Which block is helium in?",
      options: ["s block", "p block", "d block", "f block"], answer: 0,
      asks: "Helium has 2 electrons. Which sublevel holds them?",
      hint: "Write helium’s configuration. It has only 2 electrons.",
      why: "Helium’s configuration is 1s². Its electrons are in an s sublevel, so helium is in the s block. Your worksheet says to include helium in the s block.",
      wrong: ["", "The other group 18 elements are in the p block. Helium is different, because level 1 has no p sublevel.", "The d block is groups 3 to 12.", "The f block is the two rows at the bottom of the table."] },

    { id: "p9c", kind: "mc", set: "P", lesson: "L9", pic: "blocks",
      prompt: "What is the maximum number of electrons in an f sublevel?",
      options: ["6", "10", "14", "18"], answer: 2,
      asks: "How many electrons does a full f sublevel hold?",
      hint: "Count how many columns wide the f block is.",
      why: "An f sublevel has 7 orbitals, and each orbital holds 2 electrons. 7 × 2 = 14. The f block is 14 columns wide.",
      wrong: ["6 is the maximum for a p sublevel.", "10 is the maximum for a d sublevel.", "", "18 is the number of groups on the periodic table. No sublevel holds 18."] },

    { id: "p9b", kind: "mc", set: "P", lesson: "L9", pic: "blocks:P",
      prompt: "An element is in row 3 and group 15. What does its configuration end in?",
      options: ["3p³", "3p⁵", "3s³", "5p³"], answer: 0,
      asks: "Use the row to find the level. Use the block and the column to find the sublevel and its number of electrons.",
      hint: "Group 15 is the third column of the p block.",
      why: "Row 3 means level 3. Group 15 is in the p block, and it is the third column of that block. So the configuration ends in 3p³. The element is phosphorus.",
      wrong: ["", "3p⁵ is group 17, the fifth column of the p block.", "An s sublevel holds at most 2 electrons. Also, group 15 is in the p block.", "The level comes from the row, which is 3. The 5 in the group number 15 is not the level."] },

    { id: "p9f", kind: "mc", set: "P", lesson: "L9", pic: "blocks",
      prompt: "Row 4 of the periodic table fills which sublevels, in order from left to right?",
      options: ["4s, 4p, 4d", "4s, 3d, 4p", "3d, 4s, 4p", "4s, 4d, 4p"], answer: 1,
      asks: "Read row 4 from left to right. Which sublevel does each block fill?",
      hint: "For the d block, the level number is the row number minus 1.",
      why: "Row 4 starts in the s block with 4s. Next is the d block. Its level is 4 − 1 = 3, so it is 3d. Last is the p block with 4p.",
      wrong: ["The d block in row 4 is 3d, not 4d. It also comes before the p block.", "", "The s block is on the left, so 4s comes first.", "The d block in row 4 is 3d, not 4d."] },

    { id: "p9d", kind: "mc", set: "P", lesson: "L9", pic: "ion:Al",
      prompt: "Aluminum is in group 13. Which ion does it form?",
      options: ["Al⁺", "Al³⁺", "Al³⁻", "Al⁵⁺"], answer: 1,
      asks: "How many valence electrons does aluminum have? Does it lose them or gain more?",
      hint: "Group 13 has 3 valence electrons. Atoms with 1, 2, or 3 valence electrons lose them.",
      why: "Aluminum has 3 valence electrons. It loses all 3. Losing 3 negative electrons gives a 3+ charge, so the ion is Al³⁺.",
      wrong: ["Aluminum loses all 3 of its valence electrons, not only 1.", "", "A 3− charge means the atom gained 3 electrons. Aluminum loses electrons.", "Aluminum has 3 valence electrons, not 5."] },

    { id: "p9e", kind: "mc", set: "P", lesson: "L9", pic: "blocks",
      prompt: "Which group forms ions with a 3− charge?",
      options: ["Group 3", "Group 13", "Group 15", "Group 17"], answer: 2,
      asks: "A 3− charge means the atom gained 3 electrons. Which group needs 3 more electrons to reach 8?",
      hint: "8 − 3 = 5. Which group has 5 valence electrons?",
      why: "Group 15 atoms have 5 valence electrons. They gain 3 electrons to reach 8. Gaining 3 electrons gives a 3− charge.",
      wrong: ["Group 3 is in the d block. It is not one of the main groups.", "Group 13 atoms have 3 valence electrons. They lose them and form 3+ ions.", "", "Group 17 atoms gain 1 electron. They form 1− ions."] },

    /* ── Lesson 10: periodic trends ── */
    { id: "p10f", kind: "mc", set: "P", lesson: "L10", pic: "trends",
      prompt: "On your worksheet, one of the three arrows across the top points to the left. Which property does it show?",
      options: ["Atomic radius", "Ionization energy", "Electronegativity", "Atomic number"], answer: 0,
      asks: "Each arrow points toward the larger value. Which property gets larger going from right to left?",
      hint: "Two of the properties get larger going to the right. One gets larger going to the left.",
      why: "Atomic radius gets larger going from right to left across a row. So the arrow that points left is atomic radius.",
      wrong: ["", "Ionization energy gets larger going to the right.", "Electronegativity gets larger going to the right.", "Atomic number gets larger going to the right."] },

    { id: "p10e", kind: "mc", set: "P", lesson: "L10", pic: "bohr:K",
      prompt: "Going down a group, atomic radius gets larger. What is the reason?",
      options: ["Each row down adds one more energy level.", "Each row down takes away protons.", "The atoms lose their electrons.", "The nucleus gets smaller."], answer: 0,
      asks: "Why are the atoms lower on the table bigger?",
      hint: "Compare lithium in row 2 with potassium in row 4. Count their energy levels.",
      why: "Each row down adds one more energy level. The outer electrons are farther from the nucleus, so the atom is larger.",
      wrong: ["", "Going down a group, the number of protons goes up, not down.", "A neutral atom keeps all of its electrons. Atoms lower in a group have more electrons.", "Going down a group, the nucleus gains protons and neutrons. It does not get smaller."] },

    { id: "p10a", kind: "mc", set: "P", lesson: "L10", pic: "blocks:Li,Na,K,Rb",
      prompt: "Which of these atoms has the largest atomic radius?",
      options: ["Li", "Na", "K", "Rb"], answer: 3,
      asks: "All four elements are in group 1. Which one is the biggest atom?",
      hint: "Atomic radius gets larger going down a group.",
      why: "Li, Na, K, and Rb are all in group 1. Rb is the lowest on the table, so it has the most energy levels. It is the largest atom.",
      wrong: ["Li is at the top of the group. It has the fewest energy levels, so it is the smallest.", "Na is lower than Li, but K and Rb are lower than Na.", "K is lower than Na, but Rb is lower than K.", ""] },

    { id: "p10b", kind: "mc", set: "P", lesson: "L10", pic: "blocks:Na,Mg,Si,Cl",
      prompt: "Which of these atoms has the smallest atomic radius?",
      options: ["Na", "Mg", "Si", "Cl"], answer: 3,
      asks: "All four elements are in row 3. Which one is the smallest atom?",
      hint: "Atomic radius gets smaller going left to right across a row.",
      why: "Na, Mg, Si, and Cl are all in row 3. Cl is farthest to the right. It has the most protons pulling on its electrons, so it is the smallest atom.",
      wrong: ["Na is farthest to the left, so it is the largest of the four.", "Mg is to the left of Si and Cl, so it is larger than both.", "Si is to the left of Cl, so Si is larger than Cl.", ""] },

    { id: "p10c", kind: "mc", set: "P", lesson: "L10", pic: "blocks:K,Ca,Ge,Br",
      prompt: "Which of these atoms has the highest ionization energy?",
      options: ["K", "Ca", "Ge", "Br"], answer: 3,
      asks: "All four elements are in row 4. Which one needs the most energy to remove an electron?",
      hint: "Ionization energy gets larger going left to right across a row.",
      why: "K, Ca, Ge, and Br are all in row 4. Br is farthest to the right, so it has the highest ionization energy. It takes the most energy to remove one of its electrons.",
      wrong: ["K is farthest to the left. Its outer electron is the easiest to remove.", "Ca is on the left side of the row. Its ionization energy is low.", "Ge is to the left of Br, so its ionization energy is lower.", ""] },

    { id: "p10d", kind: "mc", set: "P", lesson: "L10", pic: "blocks:F,Cl,Br,I",
      prompt: "Which of these atoms is the most electronegative?",
      options: ["F", "Cl", "Br", "I"], answer: 0,
      asks: "All four elements are in group 17. Which one pulls most strongly on the electrons in a bond?",
      hint: "Electronegativity gets larger going up a group.",
      why: "F, Cl, Br, and I are all in group 17. F is at the top, so it is the most electronegative. Fluorine is the most electronegative of all the elements.",
      wrong: ["", "Cl is below F, so it is less electronegative than F.", "Br is below Cl, so it is less electronegative than Cl.", "I is the lowest of the four, so it is the least electronegative."] },

    /* ── own-words questions for the lessons (voice or typing, checked by the online AI checker) ── */
    { id: "s4", kind: "say", set: "P", lesson: "L4",
      prompt: "Explain why argon is generally unreactive.",
      hint: "Say how many valence electrons argon has. Then say what that means for its outer energy level.",
      key: "Argon is in group 18 and has 8 valence electrons, so its outer energy level is full (a full octet). Because the outer level is full, argon is stable and does not need to gain, lose, or share electrons, so it is generally unreactive. For got_it the answer must say that argon's outer level (outer shell) is full OR that it has 8 valence electrons / a full octet. Accept 'it already has a full outer shell'.",
      model: "Argon has 8 valence electrons, so its outer energy level is full. It does not need to gain, lose, or share electrons. That is why argon is generally unreactive.",
      expectedTerms: [], visualText: "" },

    { id: "s5", kind: "say", set: "P", lesson: "L5",
      prompt: "Explain why sodium forms Na⁺ and not Na⁻.",
      hint: "Sodium has 1 valence electron. Say what sodium does with that electron. Then say what happens to the charge.",
      key: "Sodium (group 1) has 1 valence electron. It loses that 1 electron (which is easier than gaining 7) and then has a full outer level. After losing one negative electron it has 11 protons and 10 electrons, so its charge is 1+ (Na+, a cation). Na- would mean sodium gained an electron, which it does not do. For got_it the answer must say that sodium loses one electron (or loses its valence electron) AND that losing an electron makes the charge positive (or leaves more protons than electrons).",
      model: "Sodium has 1 valence electron. It loses that 1 electron to get a full outer level. Then it has 11 protons and 10 electrons, so its charge is 1+.",
      expectedTerms: [], visualText: "" },

    { id: "s7", kind: "say", set: "P", lesson: "L7",
      stem: "A student wrote this configuration for lithium: 1s³",
      prompt: "Explain why 1s³ is not possible. Then say the correct configuration for lithium.",
      hint: "Say how many orbitals 1s has. Say how many electrons 1 orbital holds. Then say where the third electron goes.",
      key: "1s has only one orbital, and one orbital holds at most 2 electrons, so 1s (an s sublevel) holds at most 2 electrons. The third electron must go in the next sublevel, 2s. The correct configuration is 1s2 2s1. For got_it the answer must say that 1s (or an s sublevel, or one orbital) holds at most 2 electrons AND either give 1s2 2s1 or say that the third electron goes in 2s. Accept 'only 2 electrons fit in 1s' without the word orbital.",
      model: "The 1s sublevel has 1 orbital, and 1 orbital holds at most 2 electrons. So the third electron goes in 2s. The correct configuration is 1s² 2s¹.",
      expectedTerms: [], visualText: "" },

    { id: "s8", kind: "say", set: "P", lesson: "L8",
      prompt: "Explain Hund’s rule in your own words. Use the 2p sublevel of nitrogen as your example.",
      hint: "Nitrogen has 3 electrons in 2p. Say how many electrons go in each box. Then say which way the arrows point.",
      key: "Hund's rule: within one sublevel, each orbital gets one electron before any orbital gets a second electron (no pairs until every orbital in the sublevel has one), and the single electrons have the same spin (their arrows point the same way). Nitrogen example: 2p has 3 orbitals and 3 electrons, so each 2p orbital (box) has 1 electron and there are no pairs. For got_it the answer must say that each orbital/box gets one electron before any pairs form. The same-spin part and the nitrogen example are welcome but not required. An answer that says electrons pair up first is not_yet.",
      model: "Hund’s rule says each orbital in a sublevel gets 1 electron before any orbital gets 2. Nitrogen has 3 electrons in 2p, so each 2p box gets 1 arrow. All three arrows point the same way.",
      expectedTerms: [], visualText: "Nitrogen's orbital diagram: 1s has a pair, 2s has a pair, and each of the three 2p boxes has one arrow pointing up." },

    { id: "s9", kind: "say", set: "P", lesson: "L9", fig: "blocks",
      prompt: "Explain how the periodic table shows that 4s fills before 3d.",
      hint: "Look at row 4. Say which block comes first when you read from left to right. Say which sublevel each block fills.",
      key: "Reading row 4 (period 4) of the periodic table from left to right, the s block (groups 1 and 2: K and Ca) comes first and fills 4s. The d block (groups 3 to 12) comes after it and fills 3d (for the d block the level is the row number minus 1). Then the p block fills 4p. Because the s block comes before the d block in row 4, 4s fills before 3d. For got_it the answer must say that in row 4 the s block (or K and Ca, or groups 1 and 2) comes before the d block (or groups 3 to 12, or the transition metals) and connect that to 4s filling before 3d. Accept 'row 4 goes 4s, then 3d, then 4p'.",
      model: "Read row 4 from left to right. The s block comes first, and it fills 4s. The d block comes next, and it fills 3d. So 4s fills before 3d.",
      expectedTerms: [], visualText: "Outline of the periodic table colored by block. Row 4 is labeled 4s in the s block (groups 1-2), 3d in the d block (groups 3-12), and 4p in the p block (groups 13-18)." },

    { id: "s10", kind: "say", set: "P", lesson: "L10",
      prompt: "Explain why a potassium atom is larger than a lithium atom.",
      hint: "Find both in group 1. Say which one is lower on the table. Then say what each row down adds.",
      key: "Potassium (K) and lithium (Li) are both in group 1. Potassium is lower on the periodic table (row 4) than lithium (row 2), so potassium has more occupied energy levels (4 instead of 2). Its outer electrons are farther from the nucleus, so the atom is larger (it has a larger atomic radius). For got_it the answer must give the reason: potassium has more energy levels (or more shells or rings), or its outer electrons are farther from the nucleus. An answer that only says 'it is lower on the table' or 'radius increases down a group' without that reason is almost.",
      model: "Potassium and lithium are both in group 1. Potassium is lower on the table, so it has more energy levels: 4 instead of 2. Its outer electrons are farther from the nucleus, so the atom is larger.",
      expectedTerms: [], visualText: "" },

    /* ══════════════ set "B": Practice Test B. New questions on the same ideas, plus the two class handouts. ══════════════
       These are not the teacher's questions. Same shape and scoring as the teacher's paper: 12 matching (1 point each),
       25 multiple choice (2 points each, in mixed order), then written parts. Test B questions appear only on the test,
       never inside a lesson. "twin" names the Test A question on the same idea: if the Test A one was right and this one
       is missed, the results page points it out. */

    /* ── Section I: matching. The question shows a definition. The bank (bankB) holds the terms.
          "near" lists the other terms offered when a missed question is practiced with support. ── */
    { id: "bm1", kind: "match", set: "B", sec: "I", n: 1, lesson: "L2", answer: "F", near: ["I", "K"],
      term: "The state of an atom after an electron absorbs energy and moves up to a higher energy level.",
      hint: "The electron absorbed energy and moved up. This is the opposite of the ground state.",
      why: "After an electron absorbs energy and moves up, the atom is in an excited state. The lowest-energy arrangement is called the ground state." },
    { id: "bm2", kind: "match", set: "B", sec: "I", n: 2, lesson: "L7", answer: "L", near: ["F", "I"],
      term: "A set of orbitals in an energy level that have the same energy. Its name is a letter: s, p, d, or f.",
      hint: "The definition says it is a set of orbitals, and its name is a letter.",
      why: "A sublevel is a set of orbitals that have the same energy. The sublevels are named s, p, d, and f." },
    { id: "bm3", kind: "match", set: "B", sec: "I", n: 3, lesson: "L8", answer: "C", near: ["G", "J"],
      term: "The rule that electrons fill the lowest-energy sublevel first.",
      hint: "Your handout says “aufbau” means filling up.",
      why: "The Aufbau principle is about the order of filling. Electrons fill the lowest-energy sublevel first." },
    { id: "bm4", kind: "match", set: "B", sec: "I", n: 4, lesson: "L10", answer: "B", near: ["E", "H"],
      term: "The size of an atom.",
      hint: "A radius is the distance from the center of a circle to its edge.",
      why: "Atomic radius is the size of an atom. It gets larger going down a group." },
    { id: "bm5", kind: "match", set: "B", sec: "I", n: 5, lesson: "L5", answer: "D", near: ["A", "K"], twin: "m10",
      term: "A positive ion. It forms when an atom loses electrons.",
      hint: "The letter t in this word looks like a plus sign.",
      why: "A cation is a positive ion. Losing negative electrons leaves more protons than electrons." },
    { id: "bm6", kind: "match", set: "B", sec: "I", n: 6, lesson: "L8", answer: "J", near: ["C", "G"],
      term: "The rule that one orbital holds at most 2 electrons, and the 2 electrons have opposite spins.",
      hint: "This rule is about 2 electrons that share one orbital.",
      why: "The Pauli exclusion principle is about one orbital. It holds at most 2 electrons, drawn as one arrow up and one arrow down." },
    { id: "bm7", kind: "match", set: "B", sec: "I", n: 7, lesson: "L10", answer: "H", near: ["B", "E"],
      term: "The energy needed to remove one electron from an atom.",
      hint: "The definition starts with “the energy.” Removing an electron makes an ion.",
      why: "Ionization energy is the energy needed to remove one electron from an atom. Removing an electron turns the atom into an ion." },
    { id: "bm8", kind: "match", set: "B", sec: "I", n: 8, lesson: "L7", answer: "I", near: ["F", "L"], twin: "m7",
      term: "A region where an electron is likely to be found. It holds up to 2 electrons.",
      hint: "It is a region, and it holds 2. In your class model it is a bunk bed.",
      why: "An orbital is a region where an electron is likely to be found. One orbital holds up to 2 electrons." },
    { id: "bm9", kind: "match", set: "B", sec: "I", n: 9, lesson: "L1", answer: "K", near: ["F", "H"], twin: "m4",
      term: "One small packet of light energy.",
      hint: "“Photo” means light.",
      why: "A photon is one small packet of light energy. An atom gives off a photon when an electron moves down to a lower energy level." },
    { id: "bm10", kind: "match", set: "B", sec: "I", n: 10, lesson: "L8", answer: "G", near: ["C", "J"],
      term: "The rule that each orbital in a sublevel gets 1 electron before any orbital gets 2.",
      hint: "This rule is about placing electrons in the boxes of one sublevel.",
      why: "Hund’s rule says each orbital in a sublevel gets 1 electron before any orbital gets 2. The single electrons have the same spin." },
    { id: "bm11", kind: "match", set: "B", sec: "I", n: 11, lesson: "L5", answer: "A", near: ["D", "K"], twin: "m11",
      term: "A negative ion. It forms when an atom gains electrons.",
      hint: "This word starts with the letters of: A Negative ION.",
      why: "An anion is a negative ion. Gaining negative electrons leaves more electrons than protons." },
    { id: "bm12", kind: "match", set: "B", sec: "I", n: 12, lesson: "L10", answer: "E", near: ["B", "H"],
      term: "How strongly an atom pulls on the electrons in a bond.",
      hint: "Part of this word is “negativ.” Electrons are negative.",
      why: "Electronegativity is how strongly an atom pulls on the electrons in a bond. Fluorine is the most electronegative element." },

    /* ── Section II: multiple choice, in mixed order ── */
    { id: "b13", kind: "mc", set: "B", sec: "II", n: 13, lesson: "L1", twin: "q13", fig: "wavesxy", pic: "waves",
      prompt: "Look at the two waves. Which wave has the higher frequency?",
      options: ["Wave X", "Wave Y", "They have the same frequency.", "A wave does not have a frequency."], answer: 0,
      asks: "Compare how close together the crests are. Which wave has more waves passing a point each second?",
      hint: "Crests that are close together mean a short wavelength. A short wavelength goes with a high frequency.",
      why: "Wave X has crests that are close together, so its wavelength is shorter. A shorter wavelength means more waves pass a point each second. That is a higher frequency.",
      wrong: ["", "Wave Y has crests that are far apart. That is a long wavelength, which goes with a low frequency.", "The two waves have different wavelengths, so their frequencies are different.", "Every wave has a frequency. Frequency is how many waves pass a point each second."] },

    { id: "b14", kind: "mc", set: "B", sec: "II", n: 14, lesson: "L7", twin: "q20", pic: "orb:B",
      prompt: "Which configuration is correct for a neutral boron atom (5 electrons)?",
      options: ["1s² 2s³", "1s² 2p³", "1s² 2s² 2p¹", "1s¹ 2s² 2p²"], answer: 2,
      asks: "Boron has 5 electrons. Which choice puts them in the correct sublevels?",
      hint: "Fill 1s with 2. Fill 2s with 2. Count how many electrons are left.",
      why: "1s holds 2 and 2s holds 2. That is 4 electrons. The fifth electron goes in the next sublevel, which is 2p. So boron is 1s² 2s² 2p¹.",
      wrong: ["An s sublevel holds at most 2 electrons. 2s³ is not possible.", "This skips 2s. The 2s sublevel fills before 2p.", "", "1s must be full, with 2 electrons, before 2s gets any."] },

    { id: "b15", kind: "mc", set: "B", sec: "II", n: 15, lesson: "L8",
      fig: "orbx:1s:ud;2s:ud;2p:ud,ud,u;3s:u;3p:-,-,-", pic: "orbx:1s:ud;2s:ud;2p:ud,ud,ud;3s:-;3p:-,-,-|A correct diagram for neon",
      prompt: "A student drew this orbital diagram for neon (10 electrons). Which rule does it break?",
      options: ["The Pauli exclusion principle", "The Aufbau principle", "Hund’s rule", "It does not break a rule."], answer: 1,
      asks: "Check the sublevels from the bottom to the top. Is each one full before the next one starts?",
      hint: "Look at 2p. A p sublevel holds 6 electrons. How many does this one have?",
      why: "2p has only 5 electrons, but there is already an electron in 3s. The Aufbau principle says a lower sublevel fills before the next one starts. The last electron belongs in 2p.",
      wrong: ["Each pair has one arrow up and one arrow down. The Pauli exclusion principle is followed.", "", "In 2p, every box has at least 1 arrow. No pair was made while a box was empty. Hund’s rule is followed.", "One rule is broken. Look at 2p: it is not full, but 3s has an electron."] },

    { id: "b16", kind: "mc", set: "B", sec: "II", n: 16, lesson: "L2", twin: "q15", pic: "na-down",
      prompt: "An electron moves from level 3 down to level 1. What does the atom do?",
      options: ["It absorbs energy.", "It gains a proton.", "It becomes an ion.", "It gives off light."], answer: 3,
      asks: "The electron goes to a lower energy level. What happens to the extra energy?",
      hint: "Moving up takes in energy. Moving down gives energy out.",
      why: "When an electron moves down to a lower energy level, the atom releases the extra energy. The energy leaves as light, which is a photon.",
      wrong: ["An atom absorbs energy when an electron moves up, not down.", "Protons are in the nucleus. An electron changing levels does not add a proton.", "The electron is still in the atom. The atom did not gain or lose an electron, so it is not an ion.", ""] },

    { id: "b17", kind: "mc", set: "B", sec: "II", n: 17, lesson: "L3", twin: "q18", pic: "build:Al",
      prompt: "Which element has the configuration 1s² 2s² 2p⁶ 3s² 3p¹?",
      options: ["Aluminum", "Silicon", "Magnesium", "Sodium"], answer: 0,
      asks: "Add the raised numbers to count the electrons. Which element has that many electrons?",
      hint: "2 + 2 + 6 + 2 + 1 = 13. Find atomic number 13 on the periodic table.",
      why: "Add the raised numbers: 2 + 2 + 6 + 2 + 1 = 13 electrons. A neutral atom with 13 electrons has atomic number 13. That is aluminum.",
      wrong: ["", "Silicon has 14 electrons. Its configuration ends in 3p².", "Magnesium has 12 electrons. Its configuration ends in 3s².", "Sodium has 11 electrons. Its configuration ends in 3s¹."] },

    { id: "b18", kind: "mc", set: "B", sec: "II", n: 18, lesson: "L5", twin: "q29", pic: "ion:Mg",
      prompt: "An ion has 12 protons and 10 electrons. Which ion is it?",
      options: ["Mg²⁻", "Ne²⁺", "Na⁺", "Mg²⁺"], answer: 3,
      asks: "The number of protons names the element. Protons minus electrons gives the charge.",
      hint: "Find atomic number 12 on the periodic table. Then work out 12 − 10.",
      why: "12 protons means the element is magnesium. Charge = protons − electrons = 12 − 10 = +2. So the ion is Mg²⁺.",
      wrong: ["The ion has more protons than electrons, so its charge is positive, not negative.", "The number of protons names the element. Neon has 10 protons, but this ion has 12.", "Na⁺ has 10 electrons, but sodium has 11 protons. This ion has 12 protons.", ""] },

    { id: "b19", kind: "mc", set: "B", sec: "II", n: 19, lesson: "L7", twin: "q19", pic: "levels",
      prompt: "What is the maximum number of electrons in a d sublevel?",
      options: ["5", "6", "10", "14"], answer: 2,
      asks: "How many electrons does a full d sublevel hold?",
      hint: "A d sublevel has 5 orbitals. Each orbital holds 2 electrons.",
      why: "A d sublevel has 5 orbitals, and each orbital holds 2 electrons. 5 × 2 = 10. The d block of the periodic table is 10 columns wide.",
      wrong: ["5 is the number of orbitals in a d sublevel. Each orbital holds 2 electrons.", "6 is the maximum for a p sublevel.", "", "14 is the maximum for an f sublevel."] },

    { id: "b20", kind: "mc", set: "B", sec: "II", n: 20, lesson: "L4", twin: "q24", pic: "bohr:P:valence",
      prompt: "A neutral atom has the configuration 1s² 2s² 2p⁶ 3s² 3p³. How many valence electrons does it have?",
      options: ["15", "5", "8", "3"], answer: 1,
      asks: "Valence electrons are in the outermost occupied energy level. Which level is that, and how many electrons are in it?",
      hint: "The outermost level here is level 3. Add the electrons in 3s and 3p.",
      why: "The outermost occupied level is level 3. It has 2 electrons in 3s and 3 electrons in 3p. 2 + 3 = 5 valence electrons. The element is phosphorus.",
      wrong: ["15 is the total number of electrons. Only the outermost level counts.", "", "8 is the number of electrons in level 2. Here, level 2 is an inner level.", "3 counts only the 3p electrons. The 2 electrons in 3s are also in level 3."] },

    { id: "b21", kind: "mc", set: "B", sec: "II", n: 21, lesson: "L6", twin: "q34", fig: "dots:X:6", pic: "lewis:S",
      prompt: "This is the Lewis dot diagram for element X. Which element can X be?",
      options: ["Carbon", "Chlorine", "Sulfur", "Nitrogen"], answer: 2,
      asks: "Count the dots. Which element has that many valence electrons?",
      hint: "There are 6 dots. Group 16 elements have 6 valence electrons.",
      why: "The diagram has 6 dots, so X has 6 valence electrons. Sulfur is in group 16, so it has 6 valence electrons.",
      wrong: ["Carbon is in group 14. It has 4 valence electrons, so it gets 4 dots.", "Chlorine is in group 17. It has 7 valence electrons, so it gets 7 dots.", "", "Nitrogen is in group 15. It has 5 valence electrons, so it gets 5 dots."] },

    { id: "b22", kind: "mc", set: "B", sec: "II", n: 22, lesson: "L8", pic: "orb:O",
      prompt: "Oxygen has 4 electrons in its 2p sublevel. Which drawing of 2p is correct?",
      options: ["{orb:2p:ud,ud,-}", "{orb:2p:ud,u,u}", "{orb:2p:u,u,uu}", "{orb:2p:ud,d,u}"], answer: 1,
      asks: "Four electrons go into three boxes. Where does each one go?",
      hint: "Put 1 arrow in each box first. Then the 4th electron makes one pair.",
      why: "Hund’s rule puts 1 electron in each of the 3 boxes first. The 4th electron then makes a pair in one box, with its arrow pointing the opposite way. So 2p has one pair and two single arrows that point the same way.",
      wrong: ["Two pairs were made while one box is empty. That breaks Hund’s rule.", "", "The last box has 2 arrows that point the same way. That breaks the Pauli exclusion principle.", "The two single arrows point in different directions. Single arrows in a sublevel point the same way."] },

    { id: "b23", kind: "mc", set: "B", sec: "II", n: 23, lesson: "L9", pic: "blocks:Fe",
      prompt: "Iron’s configuration ends in 3d⁶. Which block of the periodic table is iron in?",
      options: ["s block", "p block", "d block", "f block"], answer: 2,
      asks: "The last sublevel in the configuration is a d sublevel. Which block fills d sublevels?",
      hint: "The block has the same letter as the sublevel that is filling.",
      why: "Iron’s last electrons go into a d sublevel, so iron is in the d block. The d block is groups 3 to 12.",
      wrong: ["The s block is groups 1 and 2. Those configurations end in s¹ or s².", "The p block is groups 13 to 18. Those configurations end in p¹ to p⁶.", "", "The f block is the two rows at the bottom. Those configurations end in an f sublevel."] },

    { id: "b24", kind: "mc", set: "B", sec: "II", n: 24, lesson: "L7", pic: "levels",
      prompt: "Which of these sublevels does not exist?",
      options: ["2d", "1s", "3p", "4f"], answer: 0,
      asks: "Each level has only some sublevels. Which choice names a sublevel that its level does not have?",
      hint: "Level 1 has only s. Level 2 has s and p. Level 3 has s, p, and d.",
      why: "Level 2 has only 2 sublevels: 2s and 2p. The d sublevels start in level 3, so there is no 2d.",
      wrong: ["", "Level 1 has one sublevel, and it is 1s.", "Level 3 has s, p, and d sublevels. 3p exists.", "Level 4 has s, p, d, and f sublevels. 4f exists."] },

    { id: "b25", kind: "mc", set: "B", sec: "II", n: 25, lesson: "L10", pic: "blocks:Be,Mg,Ca,Ba",
      prompt: "Which of these atoms has the largest atomic radius?",
      options: ["Be", "Mg", "Ca", "Ba"], answer: 3,
      asks: "All four elements are in group 2. Which one is the biggest atom?",
      hint: "Atomic radius gets larger going down a group.",
      why: "Be, Mg, Ca, and Ba are all in group 2. Ba is the lowest on the table, so it has the most energy levels. It is the largest atom.",
      wrong: ["Be is at the top of the group. It has the fewest energy levels, so it is the smallest.", "Mg is higher on the table than Ca and Ba, so it is smaller than both.", "Ca is above Ba, so it has fewer energy levels and is smaller.", ""] },

    { id: "b26", kind: "mc", set: "B", sec: "II", n: 26, lesson: "L5", twin: "q32", pic: "ion:S",
      prompt: "How many electrons does the ion S²⁻ have? Sulfur has 16 protons.",
      options: ["14", "16", "18", "32"], answer: 2,
      asks: "A 2− charge means the atom gained electrons. How many electrons does it have now?",
      hint: "A neutral sulfur atom has 16 electrons. A 2− ion has gained 2 more.",
      why: "A neutral sulfur atom has 16 electrons. The 2− charge means it gained 2 electrons. 16 + 2 = 18 electrons.",
      wrong: ["14 would mean sulfur lost 2 electrons. That ion would be 2+, not 2−.", "16 is the number of electrons in a neutral sulfur atom, before it gains any.", "", "32 comes from doubling 16. Gaining 2 electrons means adding 2, not doubling."] },

    { id: "b27", kind: "mc", set: "B", sec: "II", n: 27, lesson: "L1", twin: "q16", pic: "waves",
      prompt: "Photon P has more energy than photon Q. Which statement must be true?",
      options: ["Photon P has a longer wavelength.", "Photon P has a higher frequency.", "Photon Q has a higher frequency.", "The two photons have the same frequency."], answer: 1,
      asks: "More energy goes with which kind of frequency: higher or lower?",
      hint: "Energy and frequency go up together.",
      why: "Higher frequency means more energy. Photon P has more energy, so photon P has the higher frequency. It also has the shorter wavelength.",
      wrong: ["A longer wavelength goes with a lower frequency and less energy. Photon P has more energy.", "", "A higher frequency would give photon Q more energy. But photon P has more energy.", "Photons with the same frequency have the same energy. These two have different energies."] },

    { id: "b28", kind: "mc", set: "B", sec: "II", n: 28, lesson: "L9", pic: "blocks",
      prompt: "Elements in group 15 form ions with which charge?",
      options: ["5+", "3+", "5−", "3−"], answer: 3,
      asks: "Group 15 atoms have 5 valence electrons. Do they lose 5 electrons, or gain 3 to reach 8?",
      hint: "Atoms with 5, 6, or 7 valence electrons gain electrons to reach 8.",
      why: "Group 15 atoms have 5 valence electrons. They gain 3 electrons to reach 8. Gaining 3 negative electrons gives a 3− charge.",
      wrong: ["Group 15 atoms do not lose their 5 valence electrons. They gain 3 instead.", "3+ is the charge for group 13. Those atoms lose 3 electrons.", "The 5 is the number of valence electrons. The atom gains 3 electrons, so the charge is 3−.", ""] },

    { id: "b29", kind: "mc", set: "B", sec: "II", n: 29, lesson: "L3", pic: "config",
      prompt: "Which sublevel fills right after 4s?",
      options: ["3d", "4p", "4d", "5s"], answer: 0,
      asks: "Say the filling order. What comes after 4s?",
      hint: "Read row 4 of the periodic table from left to right: s block, then d block, then p block.",
      why: "The filling order is 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p. After 4s comes 3d.",
      wrong: ["", "4p fills after 3d, not right after 4s.", "4d fills after 5s. It is in row 5 of the periodic table.", "5s fills after 4p."] },

    { id: "b30", kind: "mc", set: "B", sec: "II", n: 30, lesson: "L4", twin: "q25", pic: "ion:Ca",
      prompt: "Which element most likely loses two electrons to get a full outer level?",
      options: ["Oxygen", "Calcium", "Argon", "Lithium"], answer: 1,
      asks: "Which element has 2 valence electrons?",
      hint: "Atoms with 1 or 2 valence electrons lose them. Which group has 2 valence electrons?",
      why: "Calcium is in group 2, so it has 2 valence electrons. It loses both, and then its outer level is full.",
      wrong: ["Oxygen has 6 valence electrons. It gains 2 electrons.", "", "Argon already has 8 valence electrons. It does not gain or lose any.", "Lithium has 1 valence electron. It loses 1 electron, not 2."] },

    { id: "b31", kind: "mc", set: "B", sec: "II", n: 31, lesson: "L2", twin: "q17", pic: "bohr:Mg",
      prompt: "A neutral magnesium atom has 12 electrons. How many are in its third energy level?",
      options: ["2", "8", "10", "12"], answer: 0,
      asks: "Fill level 1, then level 2. How many electrons are left for level 3?",
      hint: "Level 1 holds 2. Level 2 holds 8. Subtract those from 12.",
      why: "Level 1 holds 2 electrons and level 2 holds 8. That is 10 electrons. The last 2 electrons are in level 3.",
      wrong: ["", "8 is the number of electrons in level 2.", "10 is the number of electrons in levels 1 and 2 together.", "12 is the total number of electrons in the atom."] },

    { id: "b32", kind: "mc", set: "B", sec: "II", n: 32, lesson: "L6", twin: "q35", pic: "lewis:O",
      prompt: "A student draws 5 dots around the symbol O for oxygen. What is the best correction?",
      options: ["Remove one dot.", "Remove three dots.", "Change O to C.", "Add one more dot."], answer: 3,
      asks: "How many valence electrons does oxygen have? Compare that number with 5 dots.",
      hint: "Oxygen is in group 16. Use the last digit.",
      why: "Oxygen is in group 16, so it has 6 valence electrons. Its Lewis dot diagram needs 6 dots. The student drew 5, so add one more dot.",
      wrong: ["Removing one dot leaves 4. Oxygen needs 6 dots.", "Removing three dots leaves 2. Oxygen needs 6 dots.", "Carbon has 4 valence electrons, so 5 dots is wrong for C too. The element is oxygen, so fix the dots.", ""] },

    { id: "b33", kind: "mc", set: "B", sec: "II", n: 33, lesson: "L7", pic: "levels",
      prompt: "How many electrons can energy level 2 hold in total?",
      options: ["2", "6", "8", "18"], answer: 2,
      asks: "Level 2 has two sublevels. Add what each one holds.",
      hint: "2s holds 2 electrons. 2p holds 6 electrons.",
      why: "Level 2 has the sublevels 2s and 2p. 2s holds 2 electrons and 2p holds 6. 2 + 6 = 8.",
      wrong: ["2 is what 2s holds. Level 2 also has 2p.", "6 is what 2p holds. Level 2 also has 2s.", "", "18 is the total for level 3, which has s, p, and d sublevels."] },

    { id: "b34", kind: "mc", set: "B", sec: "II", n: 34, lesson: "L5", twin: "q31", pic: "ion:S",
      prompt: "Which atom is most likely to form a 2− ion?",
      options: ["Potassium", "Aluminum", "Bromine", "Sulfur"], answer: 3,
      asks: "A 2− ion forms when an atom gains 2 electrons. Which atom has 6 valence electrons?",
      hint: "Group 16 atoms have 6 valence electrons. They gain 2 to reach 8.",
      why: "Sulfur is in group 16, so it has 6 valence electrons. It gains 2 electrons to reach 8. That gives a 2− charge.",
      wrong: ["Potassium is in group 1. It loses 1 electron and forms a 1+ ion.", "Aluminum is in group 13. It loses 3 electrons and forms a 3+ ion.", "Bromine is in group 17. It gains 1 electron and forms a 1− ion.", ""] },

    { id: "b35", kind: "mc", set: "B", sec: "II", n: 35, lesson: "L8", pic: "orbkey",
      prompt: "Which rule says that electrons fill the lowest-energy sublevel first?",
      options: ["The Aufbau principle", "Hund’s rule", "The octet rule", "The Pauli exclusion principle"], answer: 0,
      asks: "Three rules are used for orbital diagrams. Which one is about the order in which the sublevels fill?",
      hint: "Your handout says “aufbau” means filling up.",
      why: "The Aufbau principle says electrons fill the lowest-energy sublevel first. The arrangement it gives is the ground state.",
      wrong: ["", "Hund’s rule is about one sublevel: each orbital gets 1 electron before any orbital gets 2.", "The octet rule says many atoms become more stable with eight outer electrons.", "The Pauli exclusion principle says 2 electrons in one orbital have opposite spins."] },

    { id: "b36", kind: "mc", set: "B", sec: "II", n: 36, lesson: "L9", pic: "blocks:Br",
      prompt: "An element is in row 4 and group 17. What does its configuration end in?",
      options: ["4p⁷", "4p⁵", "3p⁵", "4s⁵"], answer: 1,
      asks: "Use the row to find the level. Use the block and the column to find the sublevel and its number of electrons.",
      hint: "Group 17 is the fifth column of the p block.",
      why: "Row 4 means level 4. Group 17 is in the p block, and it is the fifth column of that block. So the configuration ends in 4p⁵. The element is bromine.",
      wrong: ["A p sublevel holds at most 6 electrons. The 7 in the group number 17 is not the number of p electrons.", "", "3p⁵ is in row 3. That element is chlorine. This element is in row 4.", "An s sublevel holds at most 2 electrons. Also, group 17 is in the p block."] },

    { id: "b37", kind: "mc", set: "B", sec: "II", n: 37, lesson: "L10", pic: "blocks:Na,Al,P,Cl",
      prompt: "Which of these atoms is the most electronegative?",
      options: ["P", "Na", "Cl", "Al"], answer: 2,
      asks: "All four elements are in row 3. Which one pulls most strongly on the electrons in a bond?",
      hint: "Electronegativity gets larger going left to right across a row.",
      why: "Na, Al, P, and Cl are all in row 3. Cl is farthest to the right, so it is the most electronegative.",
      wrong: ["P is to the left of Cl, so it is less electronegative than Cl.", "Na is farthest to the left, so it is the least electronegative of the four.", "", "Al is on the left side of the row, so its electronegativity is low."] },

    /* ── Section III: written parts. Question 1 uses a different Bohr model (FIG.B): sodium, with the letters in a new order. ── */
    { id: "bw1a", kind: "bohrLabel", set: "B", bohr: "B", sec: "III", n: "1", part: "a", lesson: "L2", twin: "w1a",
      stem: "Look at the Bohr model below. Then answer the questions about it.",
      prompt: "a. Say what parts A, B, and C show.",
      asks: "The picture shows one atom. One electron moves up and then moves back down. Say what each labeled part shows.",
      hint: "Arrow B points away from the nucleus. Arrow C points back toward the nucleus. The zigzag A leaves the atom.",
      labels: [
        "The electron absorbs energy and moves up to a higher energy level.",
        "The electron moves back down to its lower energy level.",
        "The atom gives off light (a photon).",
        "The electron leaves the atom, and the atom becomes an ion.",
        "A proton moves out of the nucleus."
      ],
      answer: { A: 2, B: 0, C: 1 },
      clue: {
        A: "The zigzag A starts where the electron moves down. It points out of the atom. It is not an electron.",
        B: "Arrow B points away from the nucleus. It goes from the 3rd ring up to the 4th ring.",
        C: "Arrow C points back toward the nucleus. It goes from the 4th ring down to the 3rd ring."
      },
      whyParts: {
        A: "When the electron moves down, the atom gives off the extra energy as light. The zigzag is that light, a photon.",
        B: "Arrow B shows the electron moving up, from the 3rd ring to the 4th ring. Moving up takes energy, so the atom absorbed energy.",
        C: "Arrow C shows the electron moving back down to the 3rd ring. The 3rd ring is its ground state."
      },
      model: [
        "A: The atom gives off light (a photon).",
        "B: The electron absorbs energy and moves up to a higher energy level (the excited state).",
        "C: The electron moves back down to its lower energy level (the ground state)."
      ] },

    { id: "bw1b", kind: "bohrTap", target: "ground", set: "B", bohr: "B", sec: "III", n: "1", part: "b", lesson: "L2", twin: "w1b",
      stem: "Look at the Bohr model below. Then answer the questions about it.",
      prompt: "b. Shade in the valence electron that is in its ground state.",
      asks: "Find the valence electron before it absorbed any energy. Tap it to shade it.",
      hint: "The valence electron is in the outermost occupied energy level. Find the farthest ring that has a filled electron on it.",
      why: "Count the electrons on each ring: 2, 8, 1. The single electron on the 3rd ring is the valence electron. That ring is its lowest available level, so that is its ground state.",
      note: "This atom has 2 + 8 + 1 = 11 electrons. Atomic number 11 is sodium (Na).",
      wrongTap: {
        inner: "That electron is on an inner ring. The valence electron is in the outermost occupied level.",
        excited: "The empty circle shows where the electron is after it absorbs energy. That is the excited state, not the ground state."
      } },

    { id: "bw1c", kind: "bohrTap", target: "excited", prev: "bw1b", set: "B", bohr: "B", sec: "III", n: "1", part: "c", lesson: "L2", twin: "w1c",
      stem: "Look at the Bohr model below. Then answer the questions about it.",
      prompt: "c. Place a star on the valence electron that is in its excited state.",
      asks: "Find where the valence electron is after it absorbed energy. Tap that spot to put a star on it.",
      hint: "Follow arrow B. It starts at the ground state and ends at the excited state.",
      why: "Arrow B shows the electron moving up after the atom absorbs energy. The empty circle on the 4th ring is where the electron lands. That is the excited state.",
      wrongTap: {
        inner: "That electron is on an inner ring. It did not move.",
        ground: "That is the valence electron in its ground state, on the 3rd ring. The excited state is one ring higher."
      } },

    { id: "bw2a", kind: "config", set: "B", sec: "III", n: "2", part: "a", lesson: "L3", twin: "w2a",
      stem: "Write the complete electron configuration for each element:",
      prompt: "a. S",
      symbol: "S", name: "Sulfur", z: 16, answer: "1s² 2s² 2p⁶ 3s² 3p⁴",
      asks: "List every sublevel that holds electrons in a sulfur atom. Write them in filling order. Start at 1s.",
      hint: "Sulfur’s atomic number is 16, so place 16 electrons. The filling order starts 1s, 2s, 2p, 3s, 3p.",
      why: "Sulfur has 16 electrons. 1s², 2s², 2p⁶ and 3s² hold 12 electrons. The last 4 go in 3p, so it ends in 3p⁴." },

    { id: "bw2b", kind: "config", set: "B", sec: "III", n: "2", part: "b", lesson: "L3", twin: "w2b",
      stem: "Write the complete electron configuration for each element:",
      prompt: "b. Mn",
      symbol: "Mn", name: "Manganese", z: 25, answer: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁵",
      asks: "List every sublevel that holds electrons in a manganese atom. Write them in filling order. Start at 1s.",
      hint: "Manganese’s atomic number is 25. After 3p, the next sublevel is 4s. After 4s comes 3d.",
      why: "Manganese has 25 electrons. The sublevels through 3p⁶ hold 18. Then 4s² makes 20. The last 5 go in 3d, so it ends in 3d⁵." },

    { id: "bw2c", kind: "config", set: "B", sec: "III", n: "2", part: "c", lesson: "L3", twin: "w2c",
      stem: "Write the complete electron configuration for each element:",
      prompt: "c. K",
      symbol: "K", name: "Potassium", z: 19, answer: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹",
      asks: "List every sublevel that holds electrons in a potassium atom. Write them in filling order. Start at 1s.",
      hint: "Potassium’s atomic number is 19. The sublevels through 3p hold 18 electrons. Where does the last one go?",
      why: "Potassium has 19 electrons. The sublevels through 3p⁶ hold 18. The last electron goes in the next sublevel, 4s. So it ends in 4s¹." },

    { id: "bw2d", kind: "config", set: "B", sec: "III", n: "2", part: "d", lesson: "L3", twin: "w2d",
      stem: "Write the complete electron configuration for each element:",
      prompt: "d. Zr",
      symbol: "Zr", name: "Zirconium", z: 40, answer: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁶ 5s² 4d²",
      asks: "List every sublevel that holds electrons in a zirconium atom. Write them in filling order. Start at 1s.",
      hint: "Zirconium’s atomic number is 40. After 4p, the next sublevel is 5s. After 5s comes 4d.",
      why: "Zirconium has 40 electrons. The sublevels through 4p⁶ hold 36. Then 5s² makes 38. The last 2 go in 4d, so it ends in 4d²." },

    { id: "bw3a", kind: "seFind", set: "B", sec: "III", n: "3", part: "a", lesson: "L7", twin: "w41a",
      stem: "Consider the following **incorrect** electron configuration for Calcium: 1s²2s²2p⁶3s²3p⁸",
      prompt: "a. Identify what is wrong and why it is wrong.",
      chips: ["1s²", "2s²", "2p⁶", "3s²", "3p⁸"], wrongChip: 4,
      step1: "Tap the part that is wrong.", wrongLine: "is not possible.",
      asks: "One part of this configuration is not possible. Find that part. Then say why it is wrong.",
      hint: "Check each raised number. An s sublevel holds at most 2 electrons. A p sublevel holds at most 6.",
      chipWhy: "A p sublevel has 3 orbitals, so it holds at most 6 electrons. 3p⁸ has 2 too many.",
      chipWrong: "That part is correct. Check each raised number: an s sublevel holds at most 2, and a p sublevel holds at most 6.",
      reasons: [
        "A p sublevel holds at most 6 electrons. The last 2 electrons go in the next sublevel, 4s.",
        "The total number of electrons is wrong for calcium.",
        "3p should be written before 3s.",
        "The 8 electrons belong in 3s, because an s sublevel can hold 8."
      ],
      reason: 0,
      reasonWrong: [
        "",
        "Calcium has 20 electrons. The raised numbers add up to 20: 2 + 2 + 6 + 2 + 8. The total is correct.",
        "3s fills before 3p. That order is correct.",
        "An s sublevel holds at most 2 electrons."
      ],
      why: "3p⁸ is not possible. A p sublevel holds at most 6 electrons. After 3p is full, the next 2 electrons go in 4s.",
      model: "3p⁸ is wrong. A p sublevel holds at most 6 electrons. The last 2 electrons go in 4s." },

    { id: "bw3b", kind: "config", set: "B", sec: "III", n: "3", part: "b", lesson: "L7", twin: "w41b",
      stem: "Consider the following **incorrect** electron configuration for Calcium: 1s²2s²2p⁶3s²3p⁸",
      prompt: "b. Write the correct electron configuration for Calcium.",
      symbol: "Ca", name: "Calcium", z: 20, answer: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s²",
      asks: "Write calcium’s configuration again so that no sublevel holds too many electrons.",
      hint: "Change 3p⁸ to 3p⁶. Put the other 2 electrons in the next sublevel.",
      why: "Calcium has 20 electrons. In filling order: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s². Check: 2 + 2 + 6 + 2 + 6 + 2 = 20." },

    { id: "bw4a", kind: "orbFill", set: "B", sec: "III", n: "4", part: "a", lesson: "L8",
      stem: "Complete the orbital diagram for each atom.",
      prompt: "a. Carbon (6 electrons)",
      symbol: "C", name: "Carbon", z: 6, subs: ["1s", "2s", "2p", "3s", "3p"],
      asks: "Place 6 arrows in the boxes. Follow the three rules.",
      hint: "Fill 1s and 2s first. That places 4 electrons. Then place the last 2 in 2p. Put 1 in each box before you make a pair.",
      why: "Carbon has 6 electrons. 1s and 2s hold 4. The last 2 go in 2p, 1 in each of two boxes. So 2p has two single arrows and one empty box." },

    { id: "bw4b", kind: "orbFill", set: "B", sec: "III", n: "4", part: "b", lesson: "L8",
      stem: "Complete the orbital diagram for each atom.",
      prompt: "b. Phosphorus (15 electrons)",
      symbol: "P", name: "Phosphorus", z: 15, subs: ["1s", "2s", "2p", "3s", "3p"],
      asks: "Place 15 arrows in the boxes. Follow the three rules.",
      hint: "Fill 1s, 2s, 2p, and 3s first. That places 12 electrons. Then place the last 3 in 3p, 1 in each box.",
      why: "Phosphorus has 15 electrons. 1s, 2s, 2p, and 3s hold 12. The last 3 go in 3p, 1 in each box. So 3p has three single arrows and no pair." },

  ]
};
if (typeof window !== 'undefined') window.CHEM_DATA = CHEM_DATA;