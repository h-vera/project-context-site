/* Geometry Chapter 2 teaching data. Keep beside geometry-ch2-study-tool.html.
   No network or API keys are required to read lessons and use guided practice.
   "key" holds grading notes for the online checker. "model" (set near the end of this file)
   is the short answer shown to the student by "Show model answer". */
'use strict';
const GEO_DATA = {
  "title": "Geometry Chapter 2",
  "subtitle": "Reasoning and Proof",
  "storeKey": "geo_ch2_progress_v2",
  "days": [
    {
      "label": "Saturday",
      "topics": [
        "2-1",
        "2-2"
      ]
    },
    {
      "label": "Sunday",
      "topics": [
        "2-3",
        "2-4"
      ]
    },
    {
      "label": "Monday",
      "topics": [
        "2-5",
        "2-6"
      ]
    },
    {
      "label": "Tuesday",
      "topics": [
        "2-7",
        "2-8"
      ]
    }
  ],
  "topics": [
    {
      "id": "2-1",
      "title": "Inductive Reasoning and Conjecture",
      "rule": [
        "Inductive reasoning uses observed examples to suggest a pattern or prediction.",
        "That guess is called a <b>conjecture</b>. It can be wrong.",
        "A <b>counterexample</b> is one example that breaks the guess. One is enough to prove it false."
      ],
      "visual": "<svg viewBox=\"0 0 600 175\" role=\"img\" aria-label=\"The pattern 4, 10, 18, 28, 40, 54. Each jump grows by 2.\">\n  <g fill=\"none\" stroke=\"#94A3B8\" stroke-width=\"2.5\">\n    <path d=\"M68 84 Q100 34 132 84\"/><path d=\"M168 84 Q200 34 232 84\"/><path d=\"M268 84 Q300 34 332 84\"/><path d=\"M368 84 Q400 34 432 84\"/>\n  </g>\n  <path d=\"M468 84 Q500 34 532 84\" fill=\"none\" stroke=\"#6D28D9\" stroke-width=\"3\"/>\n  <g font-size=\"17\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#475569\">\n    <text x=\"100\" y=\"44\">+6</text><text x=\"200\" y=\"44\">+8</text><text x=\"300\" y=\"44\">+10</text><text x=\"400\" y=\"44\">+12</text>\n  </g>\n  <text x=\"500\" y=\"44\" font-size=\"17\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#6D28D9\">+14</text>\n  <g fill=\"#FFFFFF\" stroke=\"#64748B\" stroke-width=\"2\">\n    <circle cx=\"50\" cy=\"112\" r=\"28\"/><circle cx=\"150\" cy=\"112\" r=\"28\"/><circle cx=\"250\" cy=\"112\" r=\"28\"/><circle cx=\"350\" cy=\"112\" r=\"28\"/><circle cx=\"450\" cy=\"112\" r=\"28\"/>\n  </g>\n  <circle cx=\"550\" cy=\"112\" r=\"28\" fill=\"#EDE9FE\" stroke=\"#6D28D9\" stroke-width=\"3\"/>\n  <g font-size=\"22\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#1E293B\">\n    <text x=\"50\" y=\"120\">4</text><text x=\"150\" y=\"120\">10</text><text x=\"250\" y=\"120\">18</text><text x=\"350\" y=\"120\">28</text><text x=\"450\" y=\"120\">40</text>\n  </g>\n  <text x=\"550\" y=\"120\" font-size=\"22\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#4C1D95\">54</text>\n  <text x=\"300\" y=\"166\" font-size=\"16\" text-anchor=\"middle\" fill=\"#475569\">Each jump grows by 2, so the next jump is +14.</text>\n</svg>",
      "questions": [
        {
          "id": "2-1-a",
          "prompt": "In your own words, what is a conjecture?",
          "hint": "Think: what do you make after you spot a pattern?",
          "key": "A conjecture is a guess or conclusion based on a pattern of examples (inductive reasoning). It is not proven and can be wrong.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-1-b",
          "prompt": "The pattern starts 1, 4, 9, 16. Suggest the next number and explain your pattern.",
          "hint": "Find the jump between each pair of numbers.",
          "key": "25. The jumps are +3, +5, +7, so the next jump is +9, and 16 + 9 = 25. Also correct: they are square numbers, and 5 × 5 = 25. Other continuations are acceptable if a clearly stated consistent rule fits all the given terms. A finite list alone does not determine a unique continuation.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-1-c",
          "prompt": "Give a counterexample: “If a number is even, then it divides evenly by 4.”",
          "hint": "Try small even numbers. Does each one divide evenly by 4?",
          "key": "Any even number that does not divide evenly by 4, such as 2, 6, 10 or 14. Example: 2 is even, but 2 ÷ 4 is not a whole number.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-1-d",
          "prompt": "Why do ten examples usually not prove a claim about ALL cases? What does one counterexample do?",
          "hint": "Could there be an example nobody has tried yet?",
          "key": "If the ten examples are not every possible case, an untested case might fail. One counterexample disproves a universal claim. Checking all cases of a finite domain can establish a claim.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-1-e",
          "prompt": "Give a counterexample: “If two angles are supplementary, then one of them is obtuse.”",
          "hint": "Supplementary angles add to 180°. Can both angles be the same size?",
          "key": "Two right angles: 90° + 90° = 180°, so they are supplementary, but neither angle is obtuse.",
          "expectedTerms": [],
          "visual": "",
          "visualText": "",
          "support": "Supplementary means the measures add to 180 degrees. Obtuse means greater than 90 and less than 180 degrees."
        }
      ],
      "bridge": "Patterns suggest claims. Testing a claim prepares you to judge conditional statements.",
      "watch": [
        [
          "Observe",
          "The terms are 2, 5, 8, 11."
        ],
        [
          "Describe",
          "Each term increases by 3."
        ],
        [
          "Predict",
          "Using that rule, 11 + 3 = 14."
        ],
        [
          "Check the claim",
          "The next term is a prediction under this rule. One finite pattern does not prove a universal claim."
        ]
      ],
      "guided": [
        {
          "prompt": "Using the rule add 4, continue 1, 5, 9.",
          "options": [
            "12",
            "13",
            "14"
          ],
          "correct": 1,
          "why": "9 + 4 = 13."
        },
        {
          "prompt": "Claim: Every rectangle is a square. Which disproves it?",
          "options": [
            "A square",
            "A triangle",
            "A rectangle with sides 2 and 5"
          ],
          "correct": 2,
          "why": "The 2 by 5 rectangle satisfies rectangle but not square."
        }
      ]
    },
    {
      "id": "2-2",
      "title": "Logic",
      "rule": [
        "A <b>statement</b> is either true (T) or false (F).",
        "<span class=\"c-not\">NOT</span> flips it: true becomes false, and false becomes true.",
        "<b>AND</b> is true only when both parts are true.",
        "<b>OR</b> is true when at least one part is true. In math, OR includes both."
      ],
      "visual": "<svg viewBox=\"0 0 600 236\" role=\"img\" aria-label=\"AND is only the overlap: 5 students. OR is everything inside the circles: 25 students.\">\n  <line x1=\"300\" y1=\"16\" x2=\"300\" y2=\"226\" stroke=\"#CBD5E1\" stroke-width=\"2\"/>\n  <text x=\"150\" y=\"32\" font-size=\"18\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1E293B\">AND: both</text>\n  <text x=\"450\" y=\"32\" font-size=\"18\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1E293B\">OR: at least one</text>\n  <path d=\"M150 75.25 A62 62 0 0 1 150 174.75 A62 62 0 0 1 150 75.25 Z\" fill=\"#C4B5FD\"/>\n  <path d=\"M450 75.25 A62 62 0 1 0 450 174.75 A62 62 0 1 0 450 75.25 Z\" fill=\"#C4B5FD\"/>\n  <g fill=\"none\" stroke=\"#475569\" stroke-width=\"2\">\n    <circle cx=\"113\" cy=\"125\" r=\"62\"/><circle cx=\"187\" cy=\"125\" r=\"62\"/><circle cx=\"413\" cy=\"125\" r=\"62\"/><circle cx=\"487\" cy=\"125\" r=\"62\"/>\n  </g>\n  <g font-size=\"13\" text-anchor=\"middle\" fill=\"#475569\">\n    <text x=\"86\" y=\"112\">hockey</text><text x=\"214\" y=\"112\">sail</text><text x=\"386\" y=\"112\">hockey</text><text x=\"514\" y=\"112\">sail</text>\n  </g>\n  <g font-size=\"21\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1E293B\">\n    <text x=\"86\" y=\"138\">12</text><text x=\"150\" y=\"133\">5</text><text x=\"214\" y=\"138\">8</text>\n    <text x=\"386\" y=\"138\">12</text><text x=\"450\" y=\"133\">5</text><text x=\"514\" y=\"138\">8</text>\n  </g>\n  <text x=\"150\" y=\"216\" font-size=\"17\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#4C1D95\">Both: 5</text>\n  <text x=\"450\" y=\"216\" font-size=\"17\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#4C1D95\">Either: 12 + 5 + 8 = 25</text>\n</svg>",
      "questions": [
        {
          "id": "2-2-a",
          "prompt": "When is an AND statement true?",
          "hint": "Picture the two circles. Where do you have to stand?",
          "key": "Only when both parts are true. If either part is false, the AND statement is false.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-2-b",
          "prompt": "When is an OR statement false?",
          "hint": "OR is true most of the time. When does it fail?",
          "key": "Only when both parts are false. If at least one part is true, the OR statement is true.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-2-c",
          "prompt": "p: A square has 4 sides. q: A triangle has 4 sides. Is “p and q” true or false? Why?",
          "hint": "Check each part first. Is q true?",
          "key": "False. p is true but q is false (a triangle has 3 sides), and AND needs both parts to be true.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-2-d",
          "prompt": "p: A square has 4 sides. q: A triangle has 4 sides. Is p OR q true or false? Why?",
          "hint": "OR needs at least one true part.",
          "key": "True, because p is true. OR needs only one part to be true.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-2-e",
          "prompt": "10 students only play field hockey, 4 play field hockey and sail, and 6 only sail. How many play field hockey AND sail? How many play field hockey OR sail?",
          "hint": "AND is the overlap. OR is everything inside the circles.",
          "key": "AND: 4 (only the overlap). OR: 10 + 4 + 6 = 20.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-2-f",
          "prompt": "What does negation do to a statement?",
          "hint": "What word does a negation add?",
          "key": "Negation adds NOT. It gives the opposite meaning, so a true statement becomes false and a false statement becomes true. Example: the negation of “A rectangle is a quadrilateral” is “A rectangle is not a quadrilateral.”",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        }
      ],
      "bridge": "Logic tells you how whole statements depend on their parts. Next you will use IF and THEN.",
      "watch": [
        [
          "Check p",
          "p: A square has four sides. p is true."
        ],
        [
          "Check q",
          "q: A triangle has four sides. q is false."
        ],
        [
          "Combine with AND",
          "True AND false is false. Both parts must be true."
        ],
        [
          "Combine with OR",
          "True OR false is true. At least one part must be true."
        ]
      ],
      "guided": [
        {
          "prompt": "p is false. What is NOT p?",
          "options": [
            "True",
            "False"
          ],
          "correct": 0,
          "why": "NOT reverses the truth value."
        },
        {
          "prompt": "p is true and q is false. What is p AND q?",
          "options": [
            "True",
            "False"
          ],
          "correct": 1,
          "why": "AND needs both parts to be true."
        },
        {
          "prompt": "p is true and q is false. What is p OR q?",
          "options": [
            "True",
            "False"
          ],
          "correct": 0,
          "why": "OR needs at least one true part."
        }
      ]
    },
    {
      "id": "2-3",
      "title": "Conditional Statements",
      "rule": [
        "An if-then statement: <span class=\"c-if\">if p</span>, <span class=\"c-then\">then q</span>.",
        "The <span class=\"c-if\">hypothesis</span> is the part right after “if.” The <span class=\"c-then\">conclusion</span> is the part right after “then.”",
        "Converse: swap. Inverse: <span class=\"c-not\">NOT</span> both. Contrapositive: swap and <span class=\"c-not\">NOT</span> both.",
        "It is false only when the hypothesis is true and the conclusion is false."
      ],
      "visual": "<svg viewBox=\"0 0 600 268\" role=\"img\" aria-label=\"Four forms of an if-then statement. In this example the original and contrapositive are true, while the converse and inverse are false.\">\n  <rect x=\"8\" y=\"8\" width=\"284\" height=\"108\" rx=\"14\" fill=\"#EDE9FE\" stroke=\"#6D28D9\" stroke-width=\"2\"/>\n  <rect x=\"308\" y=\"8\" width=\"284\" height=\"108\" rx=\"14\" fill=\"#FEF3C7\" stroke=\"#B45309\" stroke-width=\"2\"/>\n  <rect x=\"8\" y=\"130\" width=\"284\" height=\"108\" rx=\"14\" fill=\"#FEF3C7\" stroke=\"#B45309\" stroke-width=\"2\"/>\n  <rect x=\"308\" y=\"130\" width=\"284\" height=\"108\" rx=\"14\" fill=\"#EDE9FE\" stroke=\"#6D28D9\" stroke-width=\"2\"/>\n  <g font-size=\"17\" font-weight=\"700\">\n    <text x=\"24\" y=\"36\" fill=\"#4C1D95\">Original</text><text x=\"324\" y=\"36\" fill=\"#78350F\">Converse</text>\n    <text x=\"24\" y=\"158\" fill=\"#78350F\">Inverse</text><text x=\"324\" y=\"158\" fill=\"#4C1D95\">Contrapositive</text>\n  </g>\n  <g font-size=\"15\" font-weight=\"700\" text-anchor=\"end\">\n    <text x=\"276\" y=\"36\" fill=\"#15803D\">TRUE</text><text x=\"576\" y=\"36\" fill=\"#B91C1C\">FALSE</text>\n    <text x=\"276\" y=\"158\" fill=\"#B91C1C\">FALSE</text><text x=\"576\" y=\"158\" fill=\"#15803D\">TRUE</text>\n  </g>\n  <g font-size=\"14\" fill=\"#475569\">\n    <text x=\"24\" y=\"58\">The starting statement</text><text x=\"324\" y=\"58\">Swap the two parts</text>\n    <text x=\"24\" y=\"180\">Put <tspan fill=\"#B91C1C\" font-weight=\"700\">NOT</tspan> in both parts</text>\n    <text x=\"324\" y=\"180\">Swap, and <tspan fill=\"#B91C1C\" font-weight=\"700\">NOT</tspan> in both</text>\n  </g>\n  <g font-size=\"15\" fill=\"#1E293B\">\n    <text x=\"24\" y=\"84\">If an angle is 30°,</text><text x=\"24\" y=\"104\">then it is acute.</text>\n    <text x=\"324\" y=\"84\">If an angle is acute,</text><text x=\"324\" y=\"104\">then it is 30°.</text>\n    <text x=\"24\" y=\"206\">If an angle is not 30°,</text><text x=\"24\" y=\"226\">then it is not acute.</text>\n    <text x=\"324\" y=\"206\">If an angle is not acute,</text><text x=\"324\" y=\"226\">then it is not 30°.</text>\n  </g>\n  <text x=\"300\" y=\"260\" font-size=\"15\" text-anchor=\"middle\" fill=\"#475569\">Original pairs with contrapositive. Converse pairs with inverse.</text>\n</svg>",
      "questions": [
        {
          "id": "2-3-a",
          "prompt": "Name the hypothesis and the conclusion: “If two angles form a linear pair, then they are supplementary.”",
          "hint": "The hypothesis comes right after “if.” The conclusion comes right after “then.”",
          "key": "Hypothesis: two angles form a linear pair. Conclusion: they are supplementary.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-3-b",
          "prompt": "Name the hypothesis and the conclusion: “The game is canceled if lightning is seen.”",
          "hint": "The word “if” is in the middle. What comes right after it?",
          "key": "Hypothesis: lightning is seen. Conclusion: the game is canceled. In this sentence the if-part comes second.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-3-c",
          "prompt": "Rewrite in if-then form: “Vertical angles are congruent.”",
          "hint": "Start with “If two angles are…”",
          "key": "If two angles are vertical angles, then they are congruent.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-3-d",
          "prompt": "When is an if-then statement false?",
          "hint": "Check the case where the IF part happens but the THEN part does not.",
          "key": "Only when the hypothesis is true and the conclusion is false. When the hypothesis is false, the statement counts as true.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-3-e",
          "prompt": "Say the converse of “If a shape is a square, then it has four sides.” Is the converse true?",
          "hint": "Swap the two parts. Then think of a shape with four sides that is not a square.",
          "key": "Converse: If a shape has four sides, then it is a square. It is false. Counterexample: a rectangle that is not a square has four sides.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-3-f",
          "prompt": "Say the contrapositive of “If a shape is a square, then it has four sides.” Is it true?",
          "hint": "Swap the two parts and put NOT in both.",
          "key": "Contrapositive: If a shape does not have four sides, then it is not a square. It is true, because the contrapositive always matches the original statement.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-3-g",
          "prompt": "Which forms always have the same truth value as each other?",
          "hint": "Original pairs with contrapositive. Which two forms remain?",
          "key": "The original statement and its contrapositive always match. The converse and the inverse always match.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "hint": "Keep the order and negate BOTH parts.",
          "expectedTerms": [],
          "visual": "",
          "visualText": "",
          "id": "2-3-h",
          "prompt": "Write the inverse: If a shape is a square, then it is a rectangle. Is the inverse true?",
          "key": "If a shape is not a square, then it is not a rectangle. False: a nonsquare rectangle is a counterexample."
        }
      ],
      "bridge": "Identify IF and THEN first. Deductive reasoning uses those same parts to justify conclusions.",
      "watch": [
        [
          "Original",
          "If a figure is a square, then it is a rectangle."
        ],
        [
          "Converse",
          "Switch parts: If it is a rectangle, then it is a square. False: a nonsquare rectangle."
        ],
        [
          "Inverse",
          "Negate both original parts: If it is not a square, then it is not a rectangle. False: the same nonsquare rectangle."
        ],
        [
          "Contrapositive",
          "Switch and negate both: If it is not a rectangle, then it is not a square. True."
        ]
      ],
      "guided": [
        {
          "prompt": "In If a figure is a square, then it is a rectangle, which is the hypothesis?",
          "options": [
            "It is a square",
            "It is a rectangle"
          ],
          "correct": 0,
          "why": "The hypothesis is the IF part."
        },
        {
          "prompt": "What operation makes the converse?",
          "options": [
            "Switch the parts",
            "Negate both only",
            "Switch and negate both"
          ],
          "correct": 0,
          "why": "Converse switches the two parts."
        },
        {
          "prompt": "Which always matches the original truth value?",
          "options": [
            "Converse",
            "Inverse",
            "Contrapositive"
          ],
          "correct": 2,
          "why": "Original and contrapositive are logically equivalent."
        }
      ]
    },
    {
      "id": "2-4",
      "title": "Deductive Reasoning",
      "rule": [
        "Deductive reasoning gives a conclusion that must follow when the starting facts are true and the reasoning is valid.",
        "<b>Law of Detachment:</b> the rule “if p, then q” plus the fact p gives q.",
        "<b>Law of Syllogism:</b> “if p, then q” plus “if q, then r” gives “if p, then r.”",
        "Knowing the THEN part is true does not let you conclude that the IF part is true from this rule alone."
      ],
      "visual": "<svg viewBox=\"0 0 600 332\" role=\"img\" aria-label=\"Law of Detachment and Law of Syllogism, each with a trap.\">\n  <text x=\"10\" y=\"24\" font-size=\"17\" font-weight=\"700\" fill=\"#1E293B\">Law of Detachment</text>\n  <text x=\"314\" y=\"24\" font-size=\"17\" font-weight=\"700\" fill=\"#1E293B\">Law of Syllogism</text>\n  <g fill=\"#FFFFFF\" stroke=\"#94A3B8\" stroke-width=\"2\">\n    <rect x=\"8\" y=\"38\" width=\"282\" height=\"64\" rx=\"12\"/><rect x=\"8\" y=\"134\" width=\"282\" height=\"64\" rx=\"12\"/>\n    <rect x=\"310\" y=\"38\" width=\"282\" height=\"64\" rx=\"12\"/><rect x=\"310\" y=\"134\" width=\"282\" height=\"64\" rx=\"12\"/>\n  </g>\n  <g fill=\"#EDE9FE\" stroke=\"#6D28D9\" stroke-width=\"2\">\n    <rect x=\"8\" y=\"228\" width=\"282\" height=\"64\" rx=\"12\"/><rect x=\"310\" y=\"228\" width=\"282\" height=\"64\" rx=\"12\"/>\n  </g>\n  <g font-size=\"15\" fill=\"#1E293B\">\n    <text x=\"22\" y=\"64\">Rule: If you are late,</text><text x=\"22\" y=\"88\">then you run a lap.</text>\n    <text x=\"22\" y=\"172\">Fact: Amelia is late.</text>\n    <text x=\"324\" y=\"64\">If it rains, then</text>\n    <text x=\"324\" y=\"88\"><tspan font-weight=\"700\" fill=\"#6D28D9\">practice is in the gym</tspan>.</text>\n    <text x=\"324\" y=\"160\">If <tspan font-weight=\"700\" fill=\"#6D28D9\">practice is in the gym</tspan>,</text>\n    <text x=\"324\" y=\"184\">then we do conditioning.</text>\n  </g>\n  <g font-size=\"16\" font-weight=\"700\" fill=\"#4C1D95\">\n    <text x=\"22\" y=\"266\">So: Amelia runs a lap.</text>\n    <text x=\"324\" y=\"254\">So: If it rains, then</text><text x=\"324\" y=\"278\">we do conditioning.</text>\n  </g>\n  <g font-size=\"24\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#475569\">\n    <text x=\"149\" y=\"126\">+</text><text x=\"451\" y=\"126\">+</text>\n  </g>\n  <g stroke=\"#475569\" stroke-width=\"2.5\"><line x1=\"149\" y1=\"200\" x2=\"149\" y2=\"216\"/><line x1=\"451\" y1=\"200\" x2=\"451\" y2=\"216\"/></g>\n  <g fill=\"#475569\"><polygon points=\"142,214 156,214 149,225\"/><polygon points=\"444,214 458,214 451,225\"/></g>\n  <g font-size=\"14\" font-weight=\"600\" fill=\"#B91C1C\">\n    <text x=\"10\" y=\"318\">Trap: fact matches the THEN part.</text>\n    <text x=\"312\" y=\"318\">Trap: middle parts do not match.</text>\n  </g>\n</svg>",
      "questions": [
        {
          "id": "2-4-a",
          "prompt": "What is the difference between inductive and deductive reasoning?",
          "hint": "One uses patterns. The other uses rules.",
          "key": "Inductive reasoning uses observed examples to make a conjecture. Deductive reasoning applies valid logic to facts or rules. Its conclusion must be true if the starting facts are true and the reasoning is valid.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-4-b",
          "prompt": "Inductive or deductive? “Every time Amelia wore her lucky hair tie, the team won, so she thinks they will win today.”",
          "hint": "Is this a rule, or a pattern of past games?",
          "key": "Inductive, because it is based on a pattern of past games, not on a rule or a fact.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-4-c",
          "prompt": "Rule: “If the whistle blows, then play stops.” Fact: “The whistle blows.” What can you conclude? Which law did you use?",
          "hint": "The fact matches the IF part of the rule.",
          "key": "Play stops. This uses the Law of Detachment.",
          "expectedTerms": [
            "Law of Detachment"
          ],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-4-d",
          "prompt": "Rule: “If it rains, then the sidewalk is wet.” Fact: “The sidewalk is wet.” Can you conclude that it rained? Why or why not?",
          "hint": "Could anything else make a sidewalk wet?",
          "key": "No, you cannot conclude that it rained from this rule and fact alone. A sprinkler could make the sidewalk wet. The fact matches the conclusion, not the hypothesis.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-4-e",
          "prompt": "“If a figure is a square, then it is a rectangle. If a figure is a rectangle, then it has four right angles.” What can you conclude? Which law did you use?",
          "hint": "Chain the two rules. Which phrase do they share?",
          "key": "If a figure is a square, then it has four right angles. This uses the Law of Syllogism.",
          "expectedTerms": [
            "Law of Syllogism"
          ],
          "visual": "",
          "visualText": ""
        }
      ],
      "bridge": "Valid reasoning links facts to conclusions. A proof records those links and their reasons.",
      "watch": [
        [
          "Rule",
          "If a figure is a square, then it is a rectangle."
        ],
        [
          "Fact",
          "Figure A is a square. This matches the IF part."
        ],
        [
          "Conclusion",
          "Figure A is a rectangle. This uses the Law of Detachment."
        ],
        [
          "Link two rules",
          "If square then rectangle, and if rectangle then quadrilateral, imply if square then quadrilateral. This uses the Law of Syllogism."
        ]
      ],
      "guided": [
        {
          "prompt": "Rule: If a figure is a triangle, it is a polygon. Fact: It is a triangle. Conclude:",
          "options": [
            "It is a polygon",
            "It is a square",
            "Nothing follows"
          ],
          "correct": 0,
          "why": "The fact matches the hypothesis: Detachment."
        },
        {
          "prompt": "If p then q, and if q then r. Which follows?",
          "options": [
            "If r then p",
            "If p then r",
            "If q then p"
          ],
          "correct": 1,
          "why": "The shared middle statement q connects the two rules."
        }
      ]
    },
    {
      "id": "2-5",
      "title": "Postulates and Paragraph Proofs",
      "rule": [
        "A <b>postulate</b> is a rule we accept without proof.",
        "A <b>theorem</b> is a rule that has been proven.",
        "In a <b>proof</b>, every statement needs a reason.",
        "“Exactly one” means one and no more. “At least two” means two or more."
      ],
      "visual": "<svg viewBox=\"0 0 600 178\" role=\"img\" aria-label=\"Four postulates: two points make exactly one line, three points not on a line make one plane, two crossing lines meet in one point, two crossing planes meet in a line.\">\n  <g fill=\"#FFFFFF\" stroke=\"#CBD5E1\" stroke-width=\"2\">\n    <rect x=\"7\" y=\"4\" width=\"135\" height=\"168\" rx=\"12\"/><rect x=\"157\" y=\"4\" width=\"135\" height=\"168\" rx=\"12\"/>\n    <rect x=\"307\" y=\"4\" width=\"135\" height=\"168\" rx=\"12\"/><rect x=\"457\" y=\"4\" width=\"135\" height=\"168\" rx=\"12\"/>\n  </g>\n  <line x1=\"17\" y1=\"90\" x2=\"132\" y2=\"40\" stroke=\"#475569\" stroke-width=\"3\"/>\n  <polygon points=\"165,100 195,40 284,40 254,100\" fill=\"#F1F5F9\" stroke=\"#94A3B8\" stroke-width=\"2\"/>\n  <g stroke=\"#475569\" stroke-width=\"3\"><line x1=\"322\" y1=\"35\" x2=\"427\" y2=\"95\"/><line x1=\"322\" y1=\"95\" x2=\"427\" y2=\"35\"/></g>\n  <g fill=\"#F1F5F9\" stroke=\"#94A3B8\" stroke-width=\"2\">\n    <polygon points=\"524,30 479,44 479,104 524,90\"/><polygon points=\"524,30 569,44 569,104 524,90\"/>\n  </g>\n  <line x1=\"524\" y1=\"30\" x2=\"524\" y2=\"90\" stroke=\"#6D28D9\" stroke-width=\"5\"/>\n  <g fill=\"#1E293B\">\n    <circle cx=\"51.5\" cy=\"75\" r=\"6\"/><circle cx=\"97.5\" cy=\"55\" r=\"6\"/>\n    <circle cx=\"202\" cy=\"82\" r=\"6\"/><circle cx=\"227\" cy=\"55\" r=\"6\"/><circle cx=\"249\" cy=\"80\" r=\"6\"/>\n  </g>\n  <circle cx=\"374.5\" cy=\"65\" r=\"7\" fill=\"#6D28D9\"/>\n  <g font-size=\"14\" fill=\"#475569\"><text x=\"45\" y=\"97\" text-anchor=\"middle\">A</text><text x=\"104\" y=\"77\" text-anchor=\"middle\">B</text></g>\n  <g font-size=\"14\" text-anchor=\"middle\" fill=\"#1E293B\">\n    <text x=\"74.5\" y=\"136\">2 points:</text><text x=\"74.5\" y=\"156\">exactly 1 line</text>\n    <text x=\"224.5\" y=\"136\">3 points not on</text><text x=\"224.5\" y=\"156\">a line: 1 plane</text>\n    <text x=\"374.5\" y=\"136\">2 lines cross:</text><text x=\"374.5\" y=\"156\">exactly 1 point</text>\n    <text x=\"524.5\" y=\"136\">2 planes cross:</text><text x=\"524.5\" y=\"156\">in a line</text>\n  </g>\n</svg>",
      "questions": [
        {
          "id": "2-5-a",
          "prompt": "What is the difference between a postulate and a theorem?",
          "hint": "Which one has been proven?",
          "key": "A postulate is accepted as true without proof. A theorem has been proven true using postulates, definitions and other theorems.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-5-b",
          "prompt": "How many lines pass through two distinct points?",
          "hint": "Look at the first picture.",
          "key": "Exactly one line passes through any two distinct points. Distinct means different points.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-5-c",
          "prompt": "Always, sometimes, or never: Two distinct intersecting lines meet in two points.",
          "hint": "Look at the picture of two crossing lines.",
          "key": "Never. Two lines that cross meet in exactly one point.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-5-d",
          "prompt": "Always, sometimes, or never: “Three points lie on the same line.”",
          "hint": "Can three points be on one line? Do they have to be?",
          "key": "Sometimes. Three points can lie on one line (collinear), but they do not have to.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-5-e",
          "prompt": "When two distinct planes intersect, what is their intersection?",
          "hint": "Look at the open-book picture.",
          "key": "They meet in a line.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-5-f",
          "prompt": "What does the Midpoint Theorem say?",
          "hint": "M is in the middle of segment AB.",
          "key": "If M is the midpoint of segment AB, then segments AM and MB are congruent. Their lengths satisfy AM = MB.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "hint": "The midpoint must be on the segment and make two equal parts.",
          "expectedTerms": [],
          "visual": "",
          "visualText": "",
          "id": "2-5-g",
          "prompt": "C is between A and B, and AC = CB. Explain why C is the midpoint of segment AB.",
          "key": "Since C is between A and B, it lies on segment AB. Since AC = CB, it divides AB into two equal-length segments. Therefore C is the midpoint of AB by the definition of midpoint."
        },
        {
          "hint": "Explain one step at a time.",
          "expectedTerms": [],
          "visual": "",
          "visualText": "",
          "id": "2-5-h",
          "prompt": "Why must three points be noncollinear to determine exactly one plane?",
          "key": "If they lie on one line, many planes can contain that line. Three noncollinear points determine exactly one plane."
        }
      ],
      "bridge": "Definitions and postulates supply reasons. Algebraic proofs use equality properties as reasons too.",
      "watch": [
        [
          "Given",
          "M is the midpoint of segment AB."
        ],
        [
          "Use the definition",
          "A midpoint lies on the segment and divides it into equal lengths. Therefore AM = MB."
        ],
        [
          "Connect to congruence",
          "Segments of equal length are congruent, by the definition of congruent segments."
        ],
        [
          "Write the paragraph",
          "Since M is the midpoint of AB, AM = MB by the definition of midpoint. Thus segments AM and MB are congruent."
        ]
      ],
      "guided": [
        {
          "prompt": "C is between A and B and AC = CB. What should you prove?",
          "options": [
            "C is outside AB",
            "C is the midpoint of AB",
            "AB = AC"
          ],
          "correct": 1,
          "why": "C is on the segment and makes two equal parts."
        },
        {
          "prompt": "Which reason connects those facts to the conclusion?",
          "options": [
            "Definition of midpoint",
            "Distributive Property",
            "Vertical Angles Theorem"
          ],
          "correct": 0,
          "why": "The definition needs location on the segment and equal lengths."
        }
      ]
    },
    {
      "id": "2-6",
      "title": "Algebraic Proof",
      "rule": [
        "An algebraic proof explains each algebraic step using a valid property.",
        "The left column contains statements. The right column gives reasons.",
        "Start with the given information and label those statements Given.",
        "Doing the arithmetic or combining like terms: your book calls this step the <b>Substitution Property</b>. Use the name your teacher uses."
      ],
      "visual": "<table class=\"proof\">\n  <thead><tr><th>Statement</th><th>Reason</th></tr></thead>\n  <tbody>\n    <tr><td>3(x − 2) = 12</td><td><span class=\"chip\">Given</span></td></tr>\n    <tr><td>3x − 6 = 12</td><td><span class=\"chip\">Distributive Property</span></td></tr>\n    <tr><td>3x − 6 + 6 = 12 + 6</td><td><span class=\"chip\">Addition Property of Equality</span></td></tr>\n    <tr><td>3x = 18</td><td><span class=\"chip\">Simplify</span></td></tr>\n    <tr><td>3x ÷ 3 = 18 ÷ 3</td><td><span class=\"chip\">Division Property of Equality</span></td></tr>\n    <tr><td>x = 6</td><td><span class=\"chip\">Simplify</span></td></tr>\n  </tbody>\n</table>",
      "questions": [
        {
          "id": "2-6-a",
          "prompt": "Name the property: “If x + 4 = 10, then x = 6.”",
          "hint": "What was done to both sides?",
          "key": "Subtraction Property of Equality, because 4 was subtracted from both sides.",
          "expectedTerms": [
            "Subtraction Property of Equality"
          ],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-6-b",
          "prompt": "Name the property: “If AB = CD, then CD = AB.”",
          "hint": "The two sides switched places.",
          "key": "Symmetric Property.",
          "expectedTerms": [
            "Symmetric Property"
          ],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-6-c",
          "prompt": "Name the property: “2(x + 5) = 2x + 10.”",
          "hint": "The 2 was multiplied into the parentheses.",
          "key": "Distributive Property.",
          "expectedTerms": [
            "Distributive Property"
          ],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-6-d",
          "prompt": "Name the property: “If a = b and b = c, then a = c.”",
          "hint": "It links a chain of equal things.",
          "key": "Transitive Property.",
          "expectedTerms": [
            "Transitive Property"
          ],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-6-e",
          "prompt": "Solve 2(x + 1) = 10. Say each step and the reason for it.",
          "hint": "You can distribute first, or divide both sides by 2 first.",
          "key": "One valid route: Given 2(x + 1) = 10. Distribute: 2x + 2 = 10. Subtract 2 from both sides: 2x = 8. Divide both sides by 2: x = 4. Also accept dividing both sides of the original equation by 2, giving x + 1 = 5, then subtracting 1. Accept valid combined simplification steps. For simplifying steps, accept either Substitution Property (the textbook's name) or Simplify.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-6-f",
          "prompt": "In a two-column proof, what goes in each column? How do you label the starting information?",
          "hint": "One column says what. The other says why.",
          "key": "Statements on the left and reasons on the right. Start with the given information, labeled Given in the reason column.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "hint": "A quantity is equal to itself.",
          "expectedTerms": [
            "Reflexive Property of Equality"
          ],
          "visual": "",
          "visualText": "",
          "id": "2-6-g",
          "prompt": "Name the property: AB = AB.",
          "key": "Reflexive Property of Equality."
        },
        {
          "hint": "The value 5 replaces a because a = 5.",
          "expectedTerms": [
            "Substitution Property of Equality"
          ],
          "visual": "",
          "visualText": "",
          "id": "2-6-h",
          "prompt": "Given a = 5 and a + b = 12, we write 5 + b = 12. Name the property.",
          "key": "Substitution Property of Equality."
        }
      ],
      "bridge": "Use equality properties to solve equations. Segment and angle facts tell you which equation to write.",
      "watch": [
        [
          "Given",
          "3(x − 2) = 12."
        ],
        [
          "Distribute",
          "3x − 6 = 12, by the Distributive Property."
        ],
        [
          "Add to both sides",
          "3x − 6 + 6 = 12 + 6. Reason: Addition Property of Equality."
        ],
        [
          "Simplify",
          "3x = 18. Your book calls this step the Substitution Property."
        ],
        [
          "Divide both sides",
          "3x ÷ 3 = 18 ÷ 3. Reason: Division Property of Equality."
        ],
        [
          "Simplify again",
          "x = 6. Reason: Substitution Property."
        ],
        [
          "Check",
          "3(6 − 2) = 3 × 4 = 12."
        ]
      ],
      "guided": [
        {
          "prompt": "Given x + 3 = 8, what operation isolates x?",
          "options": [
            "Add 3 to both sides",
            "Subtract 3 from both sides",
            "Multiply by 3"
          ],
          "correct": 1,
          "why": "Subtracting 3 gives x = 5."
        },
        {
          "prompt": "Why can a replace b when a = b?",
          "options": [
            "Substitution Property",
            "Distributive Property",
            "Reflexive Property"
          ],
          "correct": 0,
          "why": "Equal quantities can replace each other."
        },
        {
          "prompt": "If AB = CD, why can we write CD = AB?",
          "options": [
            "Symmetric Property",
            "Addition Property",
            "Distributive Property"
          ],
          "correct": 0,
          "why": "Symmetry allows reversing the equality."
        }
      ]
    },
    {
      "id": "2-7",
      "title": "Proving Segment Relationships",
      "rule": [
        "<b>Segment Addition Postulate:</b> if B is between A and C, then AB + BC = AC.",
        "Part + part = whole.",
        "Congruent segments (≅) have equal lengths (=). The reason for switching between ≅ and = is <b>Definition of congruent segments</b>."
      ],
      "visual": "<svg viewBox=\"0 0 600 152\" role=\"img\" aria-label=\"Segment Addition: AB is 3 and BC is 5, so AC is 8.\">\n  <path d=\"M60 52 V44 H236 V52\" fill=\"none\" stroke=\"#6D28D9\" stroke-width=\"3\"/>\n  <path d=\"M244 52 V44 H540 V52\" fill=\"none\" stroke=\"#B45309\" stroke-width=\"3\"/>\n  <text x=\"148\" y=\"34\" font-size=\"17\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#4C1D95\">AB = 3</text>\n  <text x=\"392\" y=\"34\" font-size=\"17\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#78350F\">BC = 5</text>\n  <line x1=\"60\" y1=\"76\" x2=\"540\" y2=\"76\" stroke=\"#475569\" stroke-width=\"3\"/>\n  <g fill=\"#1E293B\"><circle cx=\"60\" cy=\"76\" r=\"7\"/><circle cx=\"240\" cy=\"76\" r=\"7\"/><circle cx=\"540\" cy=\"76\" r=\"7\"/></g>\n  <g font-size=\"17\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#1E293B\"><text x=\"60\" y=\"104\">A</text><text x=\"240\" y=\"104\">B</text><text x=\"540\" y=\"104\">C</text></g>\n  <path d=\"M60 112 V120 H540 V112\" fill=\"none\" stroke=\"#475569\" stroke-width=\"2.5\"/>\n  <text x=\"300\" y=\"144\" font-size=\"17\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1E293B\">AC = 3 + 5 = 8</text>\n</svg>",
      "questions": [
        {
          "id": "2-7-a",
          "prompt": "What does the Segment Addition Postulate say?",
          "hint": "Two parts and a whole.",
          "key": "If B is between A and C on a line, then AB + BC = AC. The two parts add up to the whole segment.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-7-b",
          "prompt": "B is between A and C. AB = 5 and BC = 9. What is AC?",
          "hint": "Part + part = whole.",
          "key": "AC = 5 + 9 = 14.",
          "expectedTerms": [],
          "visual": "",
          "visualText": "",
          "setup": {
            "prompt": "How do the lengths relate?",
            "options": [
              "AB + BC = AC",
              "AB = BC",
              "AB + AC = BC"
            ],
            "correct": 0,
            "explain": "B is between A and C, so the two parts make AC.",
            "equation": "5 + 9 = AC"
          }
        },
        {
          "id": "2-7-c",
          "prompt": "B is between A and C. AB = x + 2, BC = 2x, and AC = 20. Find x.",
          "hint": "Write (x + 2) + 2x = 20.",
          "key": "(x + 2) + 2x = 20, so 3x + 2 = 20, so 3x = 18, so x = 6. Then AB = 8 and BC = 12.",
          "expectedTerms": [],
          "visual": "",
          "visualText": "",
          "setup": {
            "prompt": "Which relationship applies?",
            "options": [
              "AB = BC",
              "AB + BC = AC",
              "AB + BC = 90"
            ],
            "correct": 1,
            "explain": "Segment addition connects the two parts to the whole.",
            "equation": "(x + 2) + 2x = 20"
          }
        },
        {
          "id": "2-7-d",
          "prompt": "M is the midpoint of PQ. PM = 3x − 1 and MQ = x + 7. Find x.",
          "hint": "A midpoint makes two equal parts, so PM = MQ.",
          "key": "3x − 1 = x + 7, so 2x = 8, so x = 4. Then PM = MQ = 11 and PQ = 22.",
          "expectedTerms": [],
          "visual": "",
          "visualText": "",
          "setup": {
            "prompt": "What does midpoint tell you?",
            "options": [
              "PM = MQ",
              "PM + MQ = 180",
              "PM = PQ"
            ],
            "correct": 0,
            "explain": "The two parts have equal lengths.",
            "equation": "3x − 1 = x + 7"
          }
        },
        {
          "id": "2-7-e",
          "prompt": "In a proof, which reason lets you switch between congruent (≅) and equal (=) for segments?",
          "hint": "It is a definition.",
          "key": "Definition of congruent segments.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        }
      ],
      "bridge": "Identify the geometric relationship before choosing an equation. Use the same process for angles.",
      "watch": [
        [
          "Given",
          "B is between A and C. AB = 3 and BC = 5."
        ],
        [
          "Choose the relationship",
          "The two parts make the whole: AB + BC = AC. Segment Addition Postulate."
        ],
        [
          "Substitute and compute",
          "3 + 5 = AC, so AC = 8."
        ],
        [
          "Check",
          "The whole is longer than either positive-length part."
        ]
      ],
      "guided": [
        {
          "prompt": "M is the midpoint of AB. What relationship should you use?",
          "options": [
            "AM = MB",
            "AM + MB = 90",
            "AM = AB"
          ],
          "correct": 0,
          "why": "The midpoint creates equal-length parts."
        },
        {
          "prompt": "AM = x + 2 and MB = 8. Which equation?",
          "options": [
            "x + 2 = 8",
            "x + 2 + 8 = 180",
            "x = 8 + 2"
          ],
          "correct": 0,
          "why": "Replace AM and MB in AM = MB."
        },
        {
          "prompt": "Solve x + 2 = 8.",
          "options": [
            "x = 10",
            "x = 6",
            "x = 4"
          ],
          "correct": 1,
          "why": "Subtract 2 from both sides."
        }
      ]
    },
    {
      "id": "2-8",
      "title": "Proving Angle Relationships",
      "rule": [
        "A linear pair consists of adjacent angles whose noncommon sides are opposite rays. Their measures add to 180 degrees.",
        "Supplementary angles have measures totaling 180 degrees. They do not have to touch.",
        "Complementary angles have measures totaling 90 degrees. They do not have to touch.",
        "Vertical angles are opposite angles formed by two intersecting lines. They are congruent, so their measures are equal."
      ],
      "visual": "<svg viewBox=\"0 0 600 238\" role=\"img\" aria-label=\"Two crossing lines make angles 1 to 4. Neighbors add to 180 degrees and opposite angles are equal. A right angle split into 35 and 55 degrees.\">\n  <line x1=\"300\" y1=\"10\" x2=\"300\" y2=\"228\" stroke=\"#CBD5E1\" stroke-width=\"2\"/>\n  <path d=\"M150 110 L187.6 96.3 A40 40 0 0 0 119.4 84.3 Z\" fill=\"#DDD6FE\"/>\n  <path d=\"M150 110 L112.4 123.7 A40 40 0 0 0 180.6 135.7 Z\" fill=\"#DDD6FE\"/>\n  <path d=\"M150 110 L119.4 84.3 A40 40 0 0 0 112.4 123.7 Z\" fill=\"#FDE68A\"/>\n  <path d=\"M150 110 L180.6 135.7 A40 40 0 0 0 187.6 96.3 Z\" fill=\"#FDE68A\"/>\n  <g stroke=\"#475569\" stroke-width=\"3\"><line x1=\"37.2\" y1=\"151\" x2=\"262.8\" y2=\"69\"/><line x1=\"58.1\" y1=\"32.9\" x2=\"241.9\" y2=\"187.1\"/></g>\n  <g font-size=\"16\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1E293B\">\n    <text x=\"154\" y=\"89\">1</text><text x=\"176\" y=\"119\">2</text><text x=\"146\" y=\"140\">3</text><text x=\"124\" y=\"110\">4</text>\n  </g>\n  <g font-size=\"14\" text-anchor=\"middle\" fill=\"#475569\">\n    <text x=\"160\" y=\"59\">120°</text><text x=\"207\" y=\"124\">60°</text><text x=\"140\" y=\"169\">120°</text><text x=\"93\" y=\"105\">60°</text>\n  </g>\n  <g font-size=\"15\" text-anchor=\"middle\" fill=\"#1E293B\">\n    <text x=\"150\" y=\"212\">Linear pairs add to 180°.</text><text x=\"150\" y=\"231\">Vertical angles are congruent.</text>\n  </g>\n  <g stroke=\"#475569\" stroke-width=\"3\">\n    <line x1=\"360\" y1=\"190\" x2=\"580\" y2=\"190\"/><line x1=\"360\" y1=\"190\" x2=\"360\" y2=\"30\"/><line x1=\"360\" y1=\"190\" x2=\"499.3\" y2=\"92.5\"/>\n  </g>\n  <path d=\"M408 190 A48 48 0 0 0 399.3 162.5\" fill=\"none\" stroke=\"#6D28D9\" stroke-width=\"5\"/>\n  <path d=\"M399.3 162.5 A48 48 0 0 0 360 142\" fill=\"none\" stroke=\"#B45309\" stroke-width=\"5\"/>\n  <text x=\"425\" y=\"174\" font-size=\"16\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#4C1D95\">35°</text>\n  <text x=\"391\" y=\"134\" font-size=\"16\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#78350F\">55°</text>\n  <g font-size=\"15\" text-anchor=\"middle\" fill=\"#1E293B\">\n    <text x=\"450\" y=\"212\">Inside a right angle,</text><text x=\"450\" y=\"231\">the parts add to 90°.</text>\n  </g>\n</svg>",
      "questions": [
        {
          "id": "2-8-a",
          "prompt": "Where two lines cross, what is true about vertical angles? What is the theorem called?",
          "hint": "Look at angles 1 and 3 in the picture.",
          "key": "Vertical angles are congruent, so they have equal measures. This is the Vertical Angles Theorem.",
          "expectedTerms": [
            "Vertical Angles Theorem"
          ],
          "visual": "",
          "visualText": ""
        },
        {
          "id": "2-8-b",
          "prompt": "Angles 1 and 2 form a linear pair. Angle 1 is 130°. What is angle 2?",
          "hint": "A linear pair adds to 180°.",
          "key": "Angle 2 is 50°, because 180 − 130 = 50.",
          "expectedTerms": [],
          "visual": "",
          "visualText": "",
          "setup": {
            "prompt": "What does a linear pair tell you?",
            "options": [
              "Equal measures",
              "Sum is 90 degrees",
              "Sum is 180 degrees"
            ],
            "correct": 2,
            "explain": "A linear pair is supplementary.",
            "equation": "130 + m∠2 = 180"
          }
        },
        {
          "id": "2-8-c",
          "prompt": "Angles 1 and 2 are complementary. Angle 1 is 25°. What is angle 2?",
          "hint": "Complementary angles add to 90°.",
          "key": "Angle 2 is 65°, because 90 − 25 = 65.",
          "expectedTerms": [],
          "visual": "",
          "visualText": "",
          "setup": {
            "prompt": "What does complementary mean?",
            "options": [
              "Equal measures",
              "Sum is 90 degrees",
              "Sum is 180 degrees"
            ],
            "correct": 1,
            "explain": "Complementary angle measures total 90 degrees.",
            "equation": "25 + m∠2 = 90"
          }
        },
        {
          "id": "2-8-d",
          "prompt": "Angles 1 and 2 form a linear pair. Angle 1 = 3x + 10 and angle 2 = 2x + 20. Find x.",
          "hint": "Write (3x + 10) + (2x + 20) = 180.",
          "key": "(3x + 10) + (2x + 20) = 180, so 5x + 30 = 180, so 5x = 150, so x = 30. The angles are 100° and 80°.",
          "expectedTerms": [],
          "visual": "",
          "visualText": "",
          "setup": {
            "prompt": "Which relationship comes first?",
            "options": [
              "Equal measures",
              "Sum is 90 degrees",
              "Sum is 180 degrees"
            ],
            "correct": 2,
            "explain": "These angles form a linear pair.",
            "equation": "(3x + 10) + (2x + 20) = 180"
          }
        },
        {
          "id": "2-8-e",
          "prompt": "Angles 1 and 3 are vertical angles. Angle 1 = 2x + 10 and angle 3 = 50°. Find x.",
          "hint": "Vertical angles have equal measures, so 2x + 10 = 50.",
          "key": "2x + 10 = 50, so 2x = 40, so x = 20.",
          "expectedTerms": [],
          "visual": "",
          "visualText": "",
          "setup": {
            "prompt": "What do vertical angles tell you?",
            "options": [
              "Equal measures",
              "Sum is 90 degrees",
              "Sum is 180 degrees"
            ],
            "correct": 0,
            "explain": "Vertical angles have equal measures.",
            "equation": "2x + 10 = 50"
          }
        },
        {
          "id": "2-8-f",
          "prompt": "Why are vertical angles equal? Use linear pairs in your answer.",
          "hint": "Angles 1 and 3 each form a linear pair with angle 2.",
          "key": "Angles 1 and 2 form a linear pair, so m∠1 + m∠2 = 180°. Angles 2 and 3 also form a linear pair, so m∠2 + m∠3 = 180°. Subtracting m∠2 gives m∠1 = m∠3, so angles 1 and 3 are congruent. Also accept the Congruent Supplements Theorem with a correct explanation.",
          "expectedTerms": [],
          "visual": "",
          "visualText": ""
        },
        {
          "hint": "Check their sum. A linear pair must also be adjacent with opposite outer rays.",
          "expectedTerms": [],
          "visual": "",
          "visualText": "",
          "id": "2-8-g",
          "prompt": "Two separate angles measure 70 degrees and 110 degrees. Are they supplementary? Must they form a linear pair?",
          "key": "Yes, supplementary because 70 + 110 = 180. They do not have to form a linear pair; supplementary angles need not be adjacent."
        },
        {
          "hint": "Both measures equal 90 degrees minus the measure of C.",
          "expectedTerms": [],
          "visual": "",
          "visualText": "",
          "id": "2-8-h",
          "prompt": "Angles A and B are each complementary to angle C. What can you conclude about A and B?",
          "key": "Angles A and B are congruent: both have measure 90 degrees minus the measure of C. This is the Congruent Complements Theorem."
        }
      ],
      "bridge": "A complete solution identifies the relationship, writes the equation, solves it, and checks the angle measures.",
      "watch": [
        [
          "Identify the relationship",
          "Two adjacent angles have opposite outer rays. They form a linear pair."
        ],
        [
          "Write the equation",
          "Their measures add to 180 degrees. If one is 120 degrees, write 120 + x = 180."
        ],
        [
          "Solve",
          "Subtract 120 from both sides: x = 60 degrees."
        ],
        [
          "Check",
          "120 + 60 = 180. For vertical angles use equal measures; for complementary angles use a sum of 90 degrees."
        ]
      ],
      "guided": [
        {
          "prompt": "Two angles are vertical. Which relationship?",
          "options": [
            "Equal measures",
            "Sum is 90 degrees",
            "Sum is 180 degrees"
          ],
          "correct": 0,
          "why": "Vertical angles are congruent."
        },
        {
          "prompt": "Two angles form a linear pair. One measures 140 degrees. Which equation?",
          "options": [
            "140 + x = 90",
            "140 + x = 180",
            "x = 140"
          ],
          "correct": 1,
          "why": "A linear pair is supplementary."
        },
        {
          "prompt": "Solve 140 + x = 180.",
          "options": [
            "x = 40 degrees",
            "x = 50 degrees",
            "x = 140 degrees"
          ],
          "correct": 0,
          "why": "180 − 140 = 40 degrees."
        }
      ]
    }
  ],
  "version": 2,
  "legacyStoreKey": "geo_ch2_progress_v1"
};

// Diagrams show only the current question's givens. Solutions stay in the key.
(() => {
  const escapeText = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const label = (x,y,text,size=22) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="#172638">${escapeText(text)}</text>`;
  const svg = (description,body,height=210) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 ${height}" role="img" aria-label="${escapeText(description)}"><title>${escapeText(description)}</title>${body}</svg>`;
  const segment = (names,left,right,whole) => svg(`${names[1]} is between ${names[0]} and ${names[2]}. Left part ${left}; right part ${right}. ${whole || ''}`, `<path d="M60 100H540" stroke="#334155" stroke-width="4"/>${[60,300,540].map((x,i)=>`<circle cx="${x}" cy="100" r="6" fill="#172638"/>${label(x,135,names[i])}`).join('')}${label(180,70,left)}${label(420,70,right)}${whole?label(300,180,whole):''}`);
  const angles=(kind,a,b)=>{
    const desc = kind==='vertical'?`Two intersecting lines. Opposite angles have measures ${a} and ${b}.`:kind==='linear'?`Angles 1 and 2 form a linear pair. Their measures are ${a} and ${b}.`:`Two separate angles have measures ${a} and ${b}. They are complementary.`;
    if(kind==='vertical') return svg(desc,`<path d="M100 35L500 180M100 180L500 35" stroke="#334155" stroke-width="4" fill="none"/>${label(300,60,a)}${label(300,177,b)}${label(510,108,'∠2',18)}${label(300,207,'Diagram not to scale',16)}`,220);
    if(kind==='linear')return svg(desc,`<path d="M50 145H550M300 145L420 25" stroke="#334155" stroke-width="4" fill="none"/>${label(227,101,a)}${label(449,122,b)}${label(245,133,'1',17)}${label(348,133,'2',17)}${label(300,190,'Opposite outer rays form a straight line',18)}${label(300,217,'Diagram not to scale',16)}`,235);
    return svg(desc,`<path d="M50 145H235M50 145L195 70M345 145H550M345 145L405 25" stroke="#334155" stroke-width="4" fill="none"/>${label(148,128,a)}${label(444,110,b)}${label(300,193,'Complementary angles need not touch',18)}${label(300,222,'Diagram not to scale',16)}`,240);
  };
  const map={
    '2-1-b':[svg('Sequence 1, 4, 9, 16, unknown.',[1,4,9,16,'?'].map((v,i)=>`<circle cx="${60+i*120}" cy="90" r="35" fill="#ede9fe"/>${label(60+i*120,98,v)}`).join(''),165),'Suggest a rule that fits every shown term.'],
    '2-2-e':[svg('10 students only play field hockey; 4 do both; 6 only sail.',`<circle cx="240" cy="125" r="88" fill="#e0e7ff" fill-opacity=".5" stroke="#475569" stroke-width="3"/><circle cx="360" cy="125" r="88" fill="#e0e7ff" fill-opacity=".5" stroke="#475569" stroke-width="3"/>${label(180,28,'Field hockey',18)}${label(420,28,'Sail',18)}${label(208,132,'10')}${label(300,132,'4')}${label(393,132,'6')}`,235),'The numbers describe separate regions. Count the overlap once.'],
    '2-5-g':[segment(['A','C','B'],'AC','CB','Given AC = CB'),'C is between A and B. AC and CB have equal lengths.'],
    '2-5-f':[segment(['A','M','B'],'AM','MB','M is the midpoint'),'M is the midpoint of segment AB.'],
    '2-7-a':[segment(['A','B','C'],'AB','BC','Whole segment AC'),'B is between A and C.'],
    '2-7-b':[segment(['A','B','C'],'5','9','AC = ?'),'Find the length of the whole segment AC.'],
    '2-7-c':[segment(['A','B','C'],'x + 2','2x','AC = 20'),'Use the two parts and the given whole.'],
    '2-7-d':[segment(['P','M','Q'],'3x − 1','x + 7','M is the midpoint'),'The midpoint divides PQ into equal lengths.'],
    '2-8-b':[angles('linear','130°','?'),'Angles 1 and 2 form a linear pair.'],
    '2-8-c':[angles('complementary','25°','?'),'The two angles are complementary.'],
    '2-8-d':[angles('linear','(3x + 10)°','(2x + 20)°'),'The two angles form a linear pair.'],
    '2-8-e':[angles('vertical','(2x + 10)°','50°'),'The two labeled angles are vertical angles.'],
    '2-8-f':[svg('Two crossing lines. Angle 1 is above, angle 2 is right, angle 3 is below.',`<path d="M100 35L500 180M100 180L500 35" stroke="#334155" stroke-width="4" fill="none"/>${label(300,75,'1')}${label(410,112,'2')}${label(300,150,'3')}`),'Angles 1 and 3 each form a linear pair with angle 2.']
  };
  for(const t of GEO_DATA.topics) for(const q of t.questions) {
    if(map[q.id]) [q.visual,q.visualText]=map[q.id];
  }

  // Student-facing model answers: short and plain. The "key" fields above are for the grader only.
  const models={
    '2-1-a':'A conjecture is a guess based on a pattern. It might be wrong, because it is not proven.',
    '2-1-b':'25. The jumps are +3, +5, +7, so the next jump is +9, and 16 + 9 = 25.',
    '2-1-c':'2 is a counterexample. 2 is even, but 2 ÷ 4 is not a whole number.',
    '2-1-d':'Ten examples do not check every case, and an untested case could break the rule. One counterexample proves the claim false.',
    '2-1-e':'Two right angles. 90° + 90° = 180°, so they are supplementary, but neither one is obtuse.',
    '2-2-a':'An AND statement is true only when both parts are true.',
    '2-2-b':'An OR statement is false only when both parts are false.',
    '2-2-c':'False. p is true, but q is false because a triangle has 3 sides. AND needs both parts to be true.',
    '2-2-d':'True. p is true, and OR needs only one true part.',
    '2-2-e':'AND is the overlap: 4 students. OR is everyone inside the circles: 10 + 4 + 6 = 20 students.',
    '2-2-f':'Negation adds NOT. It flips the meaning, so true becomes false and false becomes true.',
    '2-3-a':'Hypothesis: two angles form a linear pair. Conclusion: they are supplementary.',
    '2-3-b':'Hypothesis: lightning is seen. Conclusion: the game is canceled.',
    '2-3-c':'If two angles are vertical angles, then they are congruent.',
    '2-3-d':'An if-then statement is false only when the hypothesis is true and the conclusion is false.',
    '2-3-e':'Converse: If a shape has four sides, then it is a square. It is false, because a rectangle that is not a square has four sides.',
    '2-3-f':'Contrapositive: If a shape does not have four sides, then it is not a square. It is true, because it always matches the original.',
    '2-3-g':'The original and the contrapositive always match. The converse and the inverse always match.',
    '2-3-h':'Inverse: If a shape is not a square, then it is not a rectangle. It is false, because a rectangle that is not a square breaks it.',
    '2-4-a':'Inductive reasoning uses a pattern of examples to make a guess. Deductive reasoning uses facts and rules, so the conclusion must be true.',
    '2-4-b':'Inductive. It is based on a pattern of past games, not on a rule.',
    '2-4-c':'Play stops. This uses the Law of Detachment.',
    '2-4-d':'No. The fact matches the THEN part, not the IF part. A sprinkler could also make the sidewalk wet.',
    '2-4-e':'If a figure is a square, then it has four right angles. This uses the Law of Syllogism.',
    '2-5-a':'A postulate is accepted as true without proof. A theorem has been proven.',
    '2-5-b':'Exactly one line.',
    '2-5-c':'Never. Two lines that cross meet in exactly one point.',
    '2-5-d':'Sometimes. Three points can be on one line, but they do not have to be.',
    '2-5-e':'Their intersection is a line.',
    '2-5-f':'If M is the midpoint of segment AB, then segment AM is congruent to segment MB.',
    '2-5-g':'C is between A and B, so C is on segment AB. AC = CB, so C splits AB into two equal parts. By the definition of midpoint, C is the midpoint.',
    '2-5-h':'If the three points are on one line, many different planes contain that line. If they are not on one line, exactly one plane goes through them.',
    '2-6-a':'Subtraction Property of Equality. 4 was subtracted from both sides.',
    '2-6-b':'Symmetric Property.',
    '2-6-c':'Distributive Property.',
    '2-6-d':'Transitive Property.',
    '2-6-e':'2(x + 1) = 10: Given. 2x + 2 = 10: Distributive Property. 2x + 2 − 2 = 10 − 2: Subtraction Property of Equality. 2x = 8: Substitution Property. 2x ÷ 2 = 8 ÷ 2: Division Property of Equality. x = 4: Substitution Property.',
    '2-6-f':'Statements go on the left, and reasons go on the right. The first line is labeled Given.',
    '2-6-g':'Reflexive Property.',
    '2-6-h':'Substitution Property. The 5 replaces a because a = 5.',
    '2-7-a':'If B is between A and C, then AB + BC = AC. The two parts add up to the whole.',
    '2-7-b':'AC = 5 + 9 = 14.',
    '2-7-c':'(x + 2) + 2x = 20, so 3x + 2 = 20, so 3x = 18, so x = 6.',
    '2-7-d':'PM = MQ, so 3x − 1 = x + 7. Then 2x = 8, so x = 4.',
    '2-7-e':'Definition of congruent segments.',
    '2-8-a':'Vertical angles are congruent, so their measures are equal. This is the Vertical Angles Theorem.',
    '2-8-b':'Angle 2 is 50°, because a linear pair adds to 180° and 180 − 130 = 50.',
    '2-8-c':'Angle 2 is 65°, because complementary angles add to 90° and 90 − 25 = 65.',
    '2-8-d':'(3x + 10) + (2x + 20) = 180, so 5x + 30 = 180, so 5x = 150, so x = 30.',
    '2-8-e':'Vertical angles are equal, so 2x + 10 = 50. Then 2x = 40, so x = 20.',
    '2-8-f':'Angles 1 and 2 add to 180°. Angles 2 and 3 add to 180°. So angles 1 and 3 both equal 180° minus angle 2, which means they are equal.',
    '2-8-g':'Yes, they are supplementary because 70 + 110 = 180. No, they do not have to form a linear pair, because supplementary angles do not have to touch.',
    '2-8-h':'Angles A and B are congruent. This is the Congruent Complements Theorem.'
  };
  for(const t of GEO_DATA.topics) for(const q of t.questions) q.model = models[q.id] || q.model || '';
  // Parent review and tests can read the same canonical data.
  if(typeof window!=='undefined') window.GEO_DATA=GEO_DATA;
  if(typeof module!=='undefined' && module.exports) module.exports=GEO_DATA;
})();