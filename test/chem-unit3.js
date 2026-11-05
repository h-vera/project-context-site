/* Chemistry Unit 3 teaching data: Electrons and Atomic Structure practice test.
   Keep beside chem-unit3.html. No network or API keys are required to read lessons,
   answer the practice test questions, or see the explanations.

   Every practice test question, answer choice and definition below is copied word for word from the
   teacher's practice test. The teaching lines (asks, hint, why, wrong) are the study help.

   Text rules: **word** shows as bold. Raised numbers and charges are typed as ² ⁶ ¹⁰ ⁺ ⁻ and the page
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
      questions: ["m8", "m9", "q21", "q22", "q23", "q24", "q25", "q26"]
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
      questions: ["m10", "m11", "q27", "q28", "q29", "q30", "q31", "q32"]
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

    { id: "q17", kind: "mc", sec: "II", n: 17, lesson: "L2", pic: "bohr:O",
      prompt: "A neutral oxygen atom has 8 electrons. How many are in its first energy level?",
      options: ["1", "4", "2", "6"], answer: 2,
      asks: "Oxygen has 8 electrons in total. How many of them are in level 1, the level closest to the nucleus?",
      hint: "Level 1 fills first. It holds only a small number of electrons.",
      why: "Level 1 fills first and holds up to 2 electrons. Oxygen puts 2 in level 1 and the other 6 in level 2.",
      wrong: ["Level 1 fills completely before level 2 starts. Full means 2, not 1.", "Level 1 cannot hold 4 electrons. Its limit is 2.", "", "6 is the number of electrons in oxygen’s second level."] },

    { id: "q18", kind: "mc", sec: "II", n: 18, lesson: "L3", pic: "build:C",
      prompt: "Which element has the configuration 1s² 2s² 2p²?",
      options: ["Carbon", "Oxygen", "Neon", "Nitrogen"], answer: 0,
      asks: "Add the raised numbers to count the electrons. Which element has that many electrons?",
      hint: "2 + 2 + 2 = 6. Find atomic number 6 on the periodic table.",
      why: "Add the raised numbers: 2 + 2 + 2 = 6 electrons. A neutral atom with 6 electrons has atomic number 6. That is carbon.",
      wrong: ["", "Oxygen has 8 electrons. Its configuration is 1s² 2s² 2p⁴.", "Neon has 10 electrons. Its configuration is 1s² 2s² 2p⁶.", "Nitrogen has 7 electrons. Its configuration is 1s² 2s² 2p³."] },

    { id: "q19", kind: "mc", sec: "II", n: 19, lesson: "L3", pic: "config",
      prompt: "What is the maximum number of electrons in a p sublevel?",
      options: ["2", "6", "8", "10"], answer: 1,
      asks: "What is the most electrons that a p sublevel can hold?",
      hint: "An s sublevel holds 2. A d sublevel holds 10. The p sublevel is between them.",
      why: "A p sublevel holds up to 6 electrons. It has 3 orbitals, and each orbital holds 2.",
      wrong: ["2 is the maximum for an s sublevel.", "", "8 is a full outer level: 2 in s plus 6 in p. It is not the p sublevel alone.", "10 is the maximum for a d sublevel."] },

    { id: "q20", kind: "mc", sec: "II", n: 20, lesson: "L3", pic: "build:Li",
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

    { id: "w1c", kind: "bohrTap", target: "excited", sec: "III", n: "1", part: "c", lesson: "L2",
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
      visualText: "" }
  ]
};
if (typeof window !== 'undefined') window.CHEM_DATA = CHEM_DATA;