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
/* ===== Proof Workshop data (added October 2026) =====
   Four stages per problem: watch the steps, choose the reasons, put the steps in a valid order,
   then explain the proof in her own words.
   Each step: s = statement, r = reason id (see REASONS), did = what she did in plain words,
   needs = ids of steps that must come earlier (used to accept any valid order). */
(() => {
  const esc = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const f = n => Math.round(n * 10) / 10;
  const pt = (cx, cy, deg, r) => [cx + r * Math.cos(deg * Math.PI / 180), cy - r * Math.sin(deg * Math.PI / 180)];
  const head = (x, y, deg) => { const a = pt(x, y, deg + 158, 15), b = pt(x, y, deg + 202, 15); return `<path d="M${f(x)} ${f(y)}L${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}Z" fill="#334155"/>`; };
  const ray = (cx, cy, deg, len) => { const a = pt(cx, cy, deg, len); return `<line x1="${f(cx)}" y1="${f(cy)}" x2="${f(a[0])}" y2="${f(a[1])}" stroke="#334155" stroke-width="3.5"/>${head(a[0], a[1], deg)}`; };
  const line = (cx, cy, deg, len) => ray(cx, cy, deg, len) + ray(cx, cy, deg + 180, len);
  const text = (x, y, t, size = 21, fill = '#172638', weight = 700) => `<text x="${f(x)}" y="${f(y)}" text-anchor="middle" dominant-baseline="middle" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(t)}</text>`;
  const at = (cx, cy, deg, r, t, size, fill) => { const p = pt(cx, cy, deg, r); return text(p[0], p[1], t, size, fill); };
  const box = (cx, cy, deg, s = 17) => { const a = pt(cx, cy, deg, s), c = pt(cx, cy, deg + 90, s); return `<path d="M${f(a[0])} ${f(a[1])}L${f(a[0] + c[0] - cx)} ${f(a[1] + c[1] - cy)}L${f(c[0])} ${f(c[1])}" fill="none" stroke="#b91c1c" stroke-width="2.5"/>`; };
  const dot = (x, y) => `<circle cx="${f(x)}" cy="${f(y)}" r="5.5" fill="#172638"/>`;
  const svg = (desc, body, h = 260) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 ${h}" role="img" aria-label="${esc(desc)}"><title>${esc(desc)}</title>${body}</svg>`;
  const note = (h, t = 'Diagram not to scale') => text(300, h - 14, t, 15, '#475569', 400);

  // Plain words first, book name second. "did" is written the way she would say it.
  const REASONS = {
    given:      {name: 'Given', short: 'Given', did: 'I copied it from the problem, or from a mark on the picture.'},
    suppl:      {name: 'Supplement Theorem', short: 'Suppl. Thm.', did: 'Two angles sit side by side on a straight line (a linear pair), so I added them to 180.'},
    compl:      {name: 'Complement Theorem', short: 'Compl. Thm.', did: 'Two angles sit side by side and fill a right angle, so I added them to 90.'},
    vert:       {name: 'Vertical Angles Theorem', short: 'Vert. ∠s Thm.', did: 'Two angles are across from each other in an X, so they are congruent.'},
    angadd:     {name: 'Angle Addition Postulate', short: '∠ Add. Post.', did: 'Two smaller angles make one bigger angle, so part + part = whole.'},
    deflinear:  {name: 'Definition of linear pair', short: 'Def. of linear pair', did: 'Two angles are side by side and their outer sides make a straight line.'},
    perp:       {name: 'Perpendicular lines form four right angles', short: 'Right Angle Theorem', did: 'The lines meet at a right-angle box, so every angle at that point is 90.'},
    congsupp:   {name: 'Congruent Supplements Theorem', short: '≅ Suppl. Thm.', did: 'Two angles each add to 180 with the same angle, so they are congruent.'},
    congcomp:   {name: 'Congruent Complements Theorem', short: '≅ Compl. Thm.', did: 'Two angles each add to 90 with the same angle, so they are congruent.'},
    segadd:     {name: 'Segment Addition Postulate', short: 'Seg. Add. Post.', did: 'Two short pieces make the whole segment, so part + part = whole.'},
    midpt:      {name: 'Definition of midpoint', short: 'Def. of midpoint', did: 'The midpoint cuts the segment into two equal pieces.'},
    defcong:    {name: 'Definition of congruent angles', short: 'Def. of ≅ ∠s', did: 'I switched between ≅ (congruent angles) and = (equal measures).'},
    defcongseg: {name: 'Definition of congruent segments', short: 'Def. of ≅ segments', did: 'I switched between ≅ (congruent segments) and = (equal lengths).'},
    defsupp:    {name: 'Definition of supplementary angles', short: 'Def. of suppl. ∠s', did: 'I switched between the word supplementary and the sum 180.'},
    defcomp:    {name: 'Definition of complementary angles', short: 'Def. of compl. ∠s', did: 'I switched between the word complementary and the sum 90.'},
    defright:   {name: 'Definition of right angle', short: 'Def. of rt. ∠', did: 'I switched between the words right angle and the number 90.'},
    subst:      {name: 'Substitution Property', short: 'Subst.', did: 'I plugged in a value or expression, or I combined like terms and did the arithmetic.'},
    add:        {name: 'Addition Property of Equality', short: 'Add. Prop.', did: 'I added the same number to both sides.'},
    sub:        {name: 'Subtraction Property of Equality', short: 'Subt. Prop.', did: 'I subtracted the same amount from both sides.'},
    mult:       {name: 'Multiplication Property of Equality', short: 'Mult. Prop.', did: 'I multiplied both sides by the same number.'},
    div:        {name: 'Division Property of Equality', short: 'Div. Prop.', did: 'I divided both sides by the same number.'},
    dist:       {name: 'Distributive Property', short: 'Dist. Prop.', did: 'I multiplied the number outside the parentheses by each term inside.'},
    refl:       {name: 'Reflexive Property', short: 'Refl. Prop.', did: 'Something is equal to itself: a = a, or ∠1 ≅ ∠1.'},
    sym:        {name: 'Symmetric Property', short: 'Sym. Prop.', did: 'I flipped the two sides: a = b became b = a.'},
    trans:      {name: 'Transitive Property', short: 'Trans. Prop.', did: 'a = b and b = c, so a = c.'},
    detach:     {name: 'Law of Detachment', short: 'Law of Detachment', did: 'The fact matches the IF part of a true rule, so the THEN part is true.'},
    syllog:     {name: 'Law of Syllogism', short: 'Law of Syllogism', did: 'Two if-then rules connect through the same middle part, so I joined them.'},
    matchif:    {name: 'The fact matches the IF part', short: 'Matches IF part', did: 'I compared the fact with the IF part (the hypothesis) of the rule.'},
    matchthen:  {name: 'The fact matches the THEN part', short: 'Matches THEN part', did: 'The fact matches only the THEN part. That gives no valid conclusion.'}
  };
  // Default wrong choices: the names she is most likely to mix up with the right one.
  const MIXUPS = {
    given: ['subst', 'defcong'], suppl: ['compl', 'vert'], compl: ['suppl', 'angadd'], vert: ['suppl', 'defcong'],
    angadd: ['segadd', 'compl'], deflinear: ['suppl', 'vert'], perp: ['suppl', 'defright'], congsupp: ['suppl', 'vert'], congcomp: ['compl', 'congsupp'],
    segadd: ['angadd', 'midpt'], midpt: ['segadd', 'defcongseg'], defcong: ['vert', 'subst'], defcongseg: ['segadd', 'subst'],
    defsupp: ['suppl', 'defcomp'], defcomp: ['compl', 'defsupp'], defright: ['given', 'compl'], subst: ['add', 'trans'],
    add: ['sub', 'subst'], sub: ['add', 'div'], mult: ['div', 'dist'], div: ['mult', 'sub'], dist: ['subst', 'mult'],
    refl: ['sym', 'trans'], sym: ['refl', 'trans'], trans: ['subst', 'sym'], detach: ['syllog', 'matchthen'],
    syllog: ['detach', 'matchif'], matchif: ['matchthen', 'syllog'], matchthen: ['matchif', 'detach']
  };
  const FINDER = [
    {title: 'It came from the problem', ids: ['given']},
    {title: 'I looked at an angle picture', ids: ['suppl', 'compl', 'vert', 'angadd', 'deflinear', 'perp', 'congsupp', 'congcomp']},
    {title: 'I looked at a segment picture', ids: ['segadd', 'midpt']},
    {title: 'I switched between words and numbers', ids: ['defcong', 'defcongseg', 'defsupp', 'defcomp', 'defright']},
    {title: 'I did algebra', ids: ['subst', 'add', 'sub', 'mult', 'div', 'dist']},
    {title: 'I linked equal things', ids: ['refl', 'sym', 'trans']},
    {title: 'I used an if-then rule', ids: ['detach', 'syllog', 'matchthen']}
  ];
  const D = {esc, pt, ray, line, text, at, box, dot, svg, note};
  GEO_DATA.reasons = REASONS;
  GEO_DATA.reasonMixups = MIXUPS;
  GEO_DATA.reasonFinder = FINDER;
  GEO_DATA.workshop = [];
  GEO_DATA._draw = D;
})();

(() => {
  const {line, at, svg, note} = GEO_DATA._draw;
  const findFrame = 'First, I see that ___, so ___ (reason: ___). Next, I plug in the expressions: ___ (Substitution). Then I solve: ___ (reason for each move). So the angles are ___ (Substitution).';
  GEO_DATA.workshop.push(
  {
    id: 'w-28-11', group: 'find', lesson: '2-8', source: 'Book 2-8, #11',
    title: 'Linear pair with x',
    prompt: 'm∠9 = 3x + 12 and m∠10 = x − 24. Find the measure of each numbered angle. Name the reason for each step.',
    visual: svg('A straight line crossed by a second line. Angle 9 is above the line and angle 10 is below it, on the same side of the crossing line.',
      line(300, 120, 0, 250) + line(300, 120, 115, 115) + at(300, 120, 57, 44, '9') + at(300, 120, 328, 46, '10') + note(250), 250),
    visualText: '∠9 and ∠10 sit side by side on a straight line.',
    steps: [
      {id: 'a', s: 'm∠9 + m∠10 = 180', r: 'suppl', did: '∠9 and ∠10 sit side by side on the straight line, so they add to 180.', needs: []},
      {id: 'b', s: '(3x + 12) + (x − 24) = 180', r: 'subst', did: 'I plugged in the two expressions from the problem.', needs: ['a']},
      {id: 'c', s: '4x − 12 = 180', r: 'subst', did: 'I combined like terms: 3x + x = 4x, and 12 − 24 = −12.', needs: ['b'], opts: ['subst', 'add', 'dist']},
      {id: 'd', s: '4x = 192', r: 'add', did: 'I added 12 to both sides.', needs: ['c']},
      {id: 'e', s: 'x = 48', r: 'div', did: 'I divided both sides by 4.', needs: ['d']},
      {id: 'f', s: 'm∠9 = 3(48) + 12 = 156', r: 'subst', did: 'I plugged 48 in for x.', needs: ['e']},
      {id: 'g', s: 'm∠10 = 48 − 24 = 24', r: 'subst', did: 'I plugged 48 in for x.', needs: ['e']}
    ],
    check: '156 + 24 = 180. The answer key in the back of your book also says 156 and 24.',
    explainPrompt: 'Explain how you found m∠9 and m∠10. Say each step in order and name its reason.',
    frame: findFrame,
    model: '∠9 and ∠10 form a linear pair, so m∠9 + m∠10 = 180 by the Supplement Theorem. By Substitution, (3x + 12) + (x − 24) = 180, so 4x − 12 = 180. By the Addition Property, 4x = 192. By the Division Property, x = 48. By Substitution, m∠9 = 156 and m∠10 = 24.',
    key: 'Correct values: x = 48, m∠9 = 156, m∠10 = 24. Key reason: Supplement Theorem (linear pair adds to 180). Algebra reasons: Substitution (plugging in and combining like terms; also accept Simplify), Addition Property of Equality, Division Property of Equality. Order: the 180 equation comes before solving; x is found before the angles.'
  },
  {
    id: 'w-28-12', group: 'find', lesson: '2-8', source: 'Book 2-8, #12',
    title: 'Vertical angles with x',
    prompt: 'm∠3 = 2x + 23 and m∠4 = 5x − 112. Find the measure of each numbered angle. Name the reason for each step.',
    visual: svg('Two lines cross like an X. Angle 3 is the top angle and angle 4 is the bottom angle.',
      line(300, 120, 33.5, 195) + line(300, 120, 146.5, 195) + at(300, 120, 90, 42, '3') + at(300, 120, 270, 42, '4') + note(250), 250),
    visualText: '∠3 and ∠4 are across from each other in the X.',
    steps: [
      {id: 'a', s: '∠3 ≅ ∠4', r: 'vert', did: '∠3 and ∠4 are across from each other where the lines cross.', needs: []},
      {id: 'b', s: 'm∠3 = m∠4', r: 'defcong', did: 'Congruent angles have equal measures, so I switched ≅ to =.', needs: ['a']},
      {id: 'c', s: '2x + 23 = 5x − 112', r: 'subst', did: 'I plugged in the two expressions from the problem.', needs: ['b']},
      {id: 'd', s: '23 = 3x − 112', r: 'sub', did: 'I subtracted 2x from both sides.', needs: ['c']},
      {id: 'e', s: '135 = 3x', r: 'add', did: 'I added 112 to both sides.', needs: ['d']},
      {id: 'f', s: '45 = x', r: 'div', did: 'I divided both sides by 3. This is the same as x = 45.', needs: ['e']},
      {id: 'g', s: 'm∠3 = 2(45) + 23 = 113', r: 'subst', did: 'I plugged 45 in for x.', needs: ['f']},
      {id: 'h', s: 'm∠4 = 5(45) − 112 = 113', r: 'subst', did: 'I plugged 45 in for x.', needs: ['f']}
    ],
    check: 'Both angles are 113, so they match, as vertical angles must.',
    explainPrompt: 'Explain how you found m∠3 and m∠4. Say each step in order and name its reason.',
    frame: findFrame,
    model: '∠3 and ∠4 are vertical angles, so ∠3 ≅ ∠4 by the Vertical Angles Theorem, and m∠3 = m∠4 by the Definition of congruent angles. By Substitution, 2x + 23 = 5x − 112. By the Subtraction Property, 23 = 3x − 112. By the Addition Property, 135 = 3x. By the Division Property, x = 45. By Substitution, m∠3 = 113 and m∠4 = 113.',
    key: 'Correct values: x = 45, m∠3 = m∠4 = 113. Key reason: Vertical Angles Theorem, then Definition of congruent angles to write equal measures (accept "vertical angles are equal" as a described reason). Algebra: Substitution, Subtraction Property, Addition Property, Division Property (other valid solving orders are fine). Order: equal-measure equation before solving; x before the angle values.'
  },
  {
    id: 'w-28-13', group: 'find', lesson: '2-8', source: 'Book 2-8, #13 (worked in the back of your book)',
    title: 'Linear pair, then vertical angles',
    prompt: 'm∠6 = 2x − 21 and m∠7 = 3x − 34. Find the measure of each numbered angle. Name the reason for each step.',
    visual: svg('Two lines cross like an X. Angle 6 is the top angle, angle 7 is the right angle, and angle 8 is the bottom angle.',
      line(300, 120, 53.5, 125) + line(300, 120, 126.5, 125) + at(300, 120, 90, 40, '6') + at(300, 120, 0, 40, '7') + at(300, 120, 270, 40, '8') + note(250), 250),
    visualText: '∠6 and ∠7 are neighbors on a straight line. ∠8 is across from ∠6.',
    steps: [
      {id: 'a', s: 'm∠6 + m∠7 = 180', r: 'suppl', did: '∠6 and ∠7 sit side by side on a straight line, so they add to 180.', needs: []},
      {id: 'b', s: '(2x − 21) + (3x − 34) = 180', r: 'subst', did: 'I plugged in the two expressions from the problem.', needs: ['a']},
      {id: 'c', s: '5x − 55 = 180', r: 'subst', did: 'I combined like terms: 2x + 3x = 5x, and −21 − 34 = −55.', needs: ['b'], opts: ['subst', 'add', 'dist']},
      {id: 'd', s: '5x = 235', r: 'add', did: 'I added 55 to both sides.', needs: ['c']},
      {id: 'e', s: 'x = 47', r: 'div', did: 'I divided both sides by 5.', needs: ['d']},
      {id: 'f', s: 'm∠6 = 2(47) − 21 = 73', r: 'subst', did: 'I plugged 47 in for x.', needs: ['e']},
      {id: 'g', s: 'm∠7 = 3(47) − 34 = 107', r: 'subst', did: 'I plugged 47 in for x.', needs: ['e']},
      {id: 'h', s: '∠8 ≅ ∠6', r: 'vert', did: '∠8 and ∠6 are across from each other in the X.', needs: []},
      {id: 'i', s: 'm∠8 = m∠6', r: 'defcong', did: 'Congruent angles have equal measures, so I switched ≅ to =.', needs: ['h']},
      {id: 'j', s: 'm∠8 = 73', r: 'subst', did: 'I plugged in m∠6 = 73.', needs: ['i', 'f']}
    ],
    check: '73 + 107 = 180, and ∠8 matches ∠6. This is the same answer as page R28 in your book.',
    explainPrompt: 'Explain how you found m∠6, m∠7 and m∠8. Say each step in order and name its reason.',
    frame: findFrame,
    model: '∠6 and ∠7 form a linear pair, so m∠6 + m∠7 = 180 by the Supplement Theorem. By Substitution, (2x − 21) + (3x − 34) = 180, so 5x − 55 = 180. By the Addition Property, 5x = 235. By the Division Property, x = 47. By Substitution, m∠6 = 73 and m∠7 = 107. ∠8 and ∠6 are vertical angles, so ∠8 ≅ ∠6 by the Vertical Angles Theorem. By the Definition of congruent angles, m∠8 = m∠6, so m∠8 = 73 by Substitution.',
    key: 'Correct values: x = 47, m∠6 = 73, m∠7 = 107, m∠8 = 73. Reasons: Supplement Theorem for m∠6 + m∠7 = 180; Substitution, Addition Property, Division Property for the algebra (accept Simplify for combining); Vertical Angles Theorem for ∠8 ≅ ∠6; Definition of congruent angles for m∠8 = m∠6. Order: x must be found before m∠6 and m∠7; m∠6 must be known before m∠8 = 73. Finding ∠8 by a linear pair with ∠7 (180 − 107) is also correct with the Supplement Theorem.'
  });
})();

(() => {
  const {line, ray, at, box, svg, note} = GEO_DATA._draw;
  const findFrame = 'First, I see that ___, so ___ (reason: ___). Next, I plug in the expressions: ___ (Substitution). Then I solve: ___ (reason for each move). So the angles are ___ (Substitution).';
  const proofFrame = 'We are given ___. By ___, ___. Since ___, ___ by ___. So ___ by ___.';
  GEO_DATA.workshop.push(
  {
    id: 'w-pt-12', group: 'find', lesson: '2-8', source: 'Chapter 2 Practice Test, #12',
    title: 'Right angle split in two',
    prompt: 'm∠1 = x and m∠2 = x − 6. Find the measure of each numbered angle. Name the reason for each step.',
    visual: svg('A straight line. Below it, a ray goes straight down and makes a right angle, angle 3, on the right. A slanted ray splits the left side into angle 1 and angle 2.',
      line(300, 70, 0, 255) + ray(300, 70, 270, 150) + ray(300, 70, 225, 175) + box(300, 70, 270) +
      at(300, 70, 202.5, 58, '1') + at(300, 70, 247.5, 58, '2') + at(300, 70, 315, 50, '3') + note(260), 260),
    visualText: 'The box marks ∠3 as a right angle. ∠1 and ∠2 fill the other right angle.',
    steps: [
      {id: 'a', s: 'm∠3 = 90', r: 'defright', did: 'The box shows that ∠3 is a right angle, and a right angle measures 90.', needs: []},
      {id: 'b', s: 'm∠1 + m∠2 = 90', r: 'compl', did: '∠1 and ∠2 sit side by side and fill the left right angle, so they add to 90. The left side is a right angle too, because the line is straight: 180 − 90 = 90.', needs: ['a']},
      {id: 'c', s: 'x + (x − 6) = 90', r: 'subst', did: 'I plugged in the two expressions from the problem.', needs: ['b']},
      {id: 'd', s: '2x − 6 = 90', r: 'subst', did: 'I combined like terms: x + x = 2x.', needs: ['c'], opts: ['subst', 'add', 'dist']},
      {id: 'e', s: '2x = 96', r: 'add', did: 'I added 6 to both sides.', needs: ['d']},
      {id: 'f', s: 'x = 48', r: 'div', did: 'I divided both sides by 2.', needs: ['e']},
      {id: 'g', s: 'm∠1 = 48', r: 'subst', did: 'm∠1 = x, so I plugged in 48.', needs: ['f']},
      {id: 'h', s: 'm∠2 = 48 − 6 = 42', r: 'subst', did: 'I plugged 48 in for x.', needs: ['f']}
    ],
    check: '48 + 42 = 90, and 48 + 42 + 90 = 180 for the whole straight line.',
    explainPrompt: 'Explain how you found m∠1, m∠2 and m∠3. Say each step in order and name its reason.',
    frame: findFrame,
    model: 'The box shows ∠3 is a right angle, so m∠3 = 90 by the Definition of right angle. ∠1 and ∠2 fill the other right angle, so m∠1 + m∠2 = 90 by the Complement Theorem. By Substitution, x + (x − 6) = 90, so 2x − 6 = 90. By the Addition Property, 2x = 96. By the Division Property, x = 48. By Substitution, m∠1 = 48 and m∠2 = 42.',
    key: 'Values: x = 48, m∠1 = 48, m∠2 = 42, m∠3 = 90. Reasons: Definition of right angle for m∠3 = 90 (also accept perpendicular lines form right angles); Complement Theorem for m∠1 + m∠2 = 90 (also accept m∠1 + m∠2 + m∠3 = 180 because the angles fill a straight line, using the Supplement Theorem or Angle Addition); Substitution, Addition Property, Division Property for the algebra.'
  },
  {
    id: 'w-sg-40', group: 'find', lesson: '2-8', source: 'Study Guide and Review, #40 to #42',
    title: 'Find three angles without x',
    prompt: 'Find m∠5, m∠6 and m∠7. Name the reason for each step.',
    visual: svg('A horizontal line. A vertical line crosses it with a right-angle box on the upper left; angle 5 is on the upper right. A slanted line crosses the horizontal line farther right; angle 6 is upper left, angle 7 is upper right, and the lower left angle is 53 degrees.',
      line(300, 120, 0, 265) + ray(170, 235, 90, 207) + ray(170, 235, 53, 268) + box(170, 120, 90) +
      at(170, 120, 45, 34, '5') + at(256.7, 120, 116.5, 36, '6') + at(256.7, 120, 26.5, 42, '7') + at(256.7, 120, 206.5, 52, '53°', 18) + note(270), 270),
    visualText: 'The box marks a right angle. The 53° angle is below the line, left of the slanted line.',
    steps: [
      {id: 'a', s: 'm∠5 + 90 = 180', r: 'suppl', did: '∠5 and the marked right angle sit side by side on the straight line, so they add to 180.', needs: []},
      {id: 'b', s: 'm∠5 = 90', r: 'sub', did: 'I subtracted 90 from both sides.', needs: ['a']},
      {id: 'c', s: 'm∠6 + 53 = 180', r: 'suppl', did: '∠6 and the 53° angle sit side by side on the slanted line, so they add to 180.', needs: []},
      {id: 'd', s: 'm∠6 = 127', r: 'sub', did: 'I subtracted 53 from both sides.', needs: ['c']},
      {id: 'e', s: '∠7 ≅ the 53° angle', r: 'vert', did: '∠7 and the 53° angle are across from each other where the lines cross.', needs: []},
      {id: 'f', s: 'm∠7 = 53', r: 'defcong', did: 'Congruent angles have equal measures, so I switched ≅ to =.', needs: ['e']}
    ],
    check: '127 + 53 = 180. That fits, because ∠6 and ∠7 are also neighbors on the straight line.',
    explainPrompt: 'Explain how you found m∠5, m∠6 and m∠7. Say each step and name its reason.',
    frame: 'For ∠5: ___ because ___. For ∠6: ___ because ___. For ∠7: ___ because ___.',
    model: '∠5 and the right angle form a linear pair, so m∠5 + 90 = 180 by the Supplement Theorem, and m∠5 = 90 by the Subtraction Property. ∠6 and the 53° angle form a linear pair, so m∠6 + 53 = 180 by the Supplement Theorem, and m∠6 = 127 by the Subtraction Property. ∠7 and the 53° angle are vertical angles, so they are congruent by the Vertical Angles Theorem, and m∠7 = 53 by the Definition of congruent angles.',
    key: 'Values: m∠5 = 90, m∠6 = 127, m∠7 = 53. Reasons: ∠5 by Supplement Theorem with the marked right angle, then Subtraction Property (also accept perpendicular lines form four right angles); ∠6 by Supplement Theorem with the 53° angle, then Subtraction Property; ∠7 by Vertical Angles Theorem, then Definition of congruent angles. Also correct: m∠7 = 180 − 127 by the Supplement Theorem. The three angles can be explained in any order.'
  },
  {
    id: 'w-28-15', group: 'proof', lesson: '2-8', source: 'Book 2-8, #15 (worked in the back of your book)',
    title: 'Prove two angles are supplementary',
    prompt: 'Given: ∠5 ≅ ∠6. Prove: ∠4 and ∠6 are supplementary.',
    visual: svg('A horizontal line with two rays going up from it. At the left point, angle 5 is left of the ray and angle 4 is right of it. At the right point, angle 6 is right of the ray.',
      line(300, 175, 0, 265) + ray(200, 175, 62, 150) + ray(400, 175, 118, 150) +
      at(200, 175, 121, 36, '5') + at(200, 175, 31, 40, '4') + at(400, 175, 59, 40, '6') + note(230), 230),
    visualText: '∠4 and ∠5 sit side by side on the straight line.',
    steps: [
      {id: 'a', s: '∠5 ≅ ∠6', r: 'given', did: 'It is the Given line of the problem.', needs: []},
      {id: 'b', s: 'm∠5 = m∠6', r: 'defcong', did: 'Congruent angles have equal measures, so I switched ≅ to =.', needs: ['a']},
      {id: 'c', s: '∠4 and ∠5 are supplementary', r: 'suppl', did: '∠4 and ∠5 sit side by side on the straight line (a linear pair). The answer key in your book writes "Def. of linear pairs" here. Use the name your teacher uses.', needs: []},
      {id: 'd', s: 'm∠4 + m∠5 = 180', r: 'defsupp', did: 'I switched the word supplementary to the sum 180.', needs: ['c']},
      {id: 'e', s: 'm∠4 + m∠6 = 180', r: 'subst', did: 'I replaced m∠5 with m∠6, because they are equal.', needs: ['d', 'b']},
      {id: 'f', s: '∠4 and ∠6 are supplementary', r: 'defsupp', did: 'I switched the sum 180 back to the word supplementary.', needs: ['e']}
    ],
    check: 'The last line matches the Prove line exactly. That is how you know the proof is finished.',
    explainPrompt: 'Explain why ∠4 and ∠6 must be supplementary. Say each step in order and name its reason.',
    frame: proofFrame,
    model: 'We are given ∠5 ≅ ∠6, so m∠5 = m∠6 by the Definition of congruent angles. ∠4 and ∠5 form a linear pair, so they are supplementary by the Supplement Theorem. By the Definition of supplementary angles, m∠4 + m∠5 = 180. By Substitution, m∠4 + m∠6 = 180. So ∠4 and ∠6 are supplementary by the Definition of supplementary angles.',
    key: 'Chain: Given ∠5 ≅ ∠6 → m∠5 = m∠6 (Definition of congruent angles); ∠4 and ∠5 are a linear pair, so supplementary (Supplement Theorem; the book key says Def. of linear pairs; accept either) → m∠4 + m∠5 = 180 (Definition of supplementary angles) → m∠4 + m∠6 = 180 (Substitution) → ∠4 and ∠6 are supplementary (Definition of supplementary angles). The substitution step needs both m∠5 = m∠6 and the 180 equation first.'
  });
})();

(() => {
  const {ray, at, box, dot, text, svg} = GEO_DATA._draw;
  const proofFrame = 'We are given ___. By ___, ___. Since ___, ___ by ___. So ___ by ___.';
  const fan = () => {
    const F = [300, 250], rays = [['A', 150], ['B', 115], ['C', 90], ['D', 65], ['E', 30]];
    let s = rays.map(([n, d]) => ray(F[0], F[1], d, 215) + (() => { const p = GEO_DATA._draw.pt(F[0], F[1], d, 165); return dot(p[0], p[1]); })() + at(F[0], F[1], d + 6, 182, n, 19)).join('');
    s += [['1', 132.5], ['2', 102.5], ['3', 77.5], ['4', 47.5]].map(([n, d]) => at(F[0], F[1], d, 70, n, 18)).join('');
    return s + dot(F[0], F[1]) + text(F[0], F[1] + 20, 'F', 19);
  };
  const tick = (x, y) => `<path d="M${x - 4} ${y - 11}L${x + 4} ${y + 11}" stroke="#b91c1c" stroke-width="3"/>`;
  GEO_DATA.workshop.push(
  {
    id: 'w-28-14', group: 'proof', lesson: '2-8', source: 'Book 2-8, #14',
    title: 'Prove two angles are complementary',
    prompt: 'Given: ∠ABC is a right angle. Prove: ∠ABD and ∠CBD are complementary.',
    visual: svg('Point B is the corner of a right angle. Ray BA goes up and ray BC goes right. Ray BD is between them.',
      ray(220, 215, 90, 185) + ray(220, 215, 0, 250) + ray(220, 215, 30, 250) + box(220, 215, 0) +
      dot(220, 70) + text(198, 70, 'A', 19) + dot(370, 215) + text(370, 240, 'C', 19) + dot(350, 140) + text(338, 116, 'D', 19) + dot(220, 215) + text(202, 238, 'B', 19), 255),
    visualText: 'Ray BD splits the right angle ABC into two smaller angles.',
    steps: [
      {id: 'a', s: '∠ABC is a right angle', r: 'given', did: 'It is the Given line of the problem.', needs: []},
      {id: 'b', s: 'm∠ABC = 90', r: 'defright', did: 'I switched the words right angle to the number 90.', needs: ['a']},
      {id: 'c', s: 'm∠ABD + m∠DBC = m∠ABC', r: 'angadd', did: 'Ray BD splits ∠ABC into two smaller angles, so part + part = whole.', needs: []},
      {id: 'd', s: 'm∠ABD + m∠DBC = 90', r: 'subst', did: 'I replaced m∠ABC with 90.', needs: ['b', 'c']},
      {id: 'e', s: '∠ABD and ∠CBD are complementary', r: 'defcomp', did: 'I switched the sum 90 to the word complementary. ∠DBC and ∠CBD are the same angle; the middle letter is the corner.', needs: ['d']}
    ],
    check: 'The last line matches the Prove line. Page R28 in your book shows the same steps for #17.',
    explainPrompt: 'Explain why ∠ABD and ∠CBD must be complementary. Say each step in order and name its reason.',
    frame: proofFrame,
    model: 'We are given that ∠ABC is a right angle, so m∠ABC = 90 by the Definition of right angle. Ray BD splits ∠ABC, so m∠ABD + m∠DBC = m∠ABC by the Angle Addition Postulate. By Substitution, m∠ABD + m∠DBC = 90. So ∠ABD and ∠CBD are complementary by the Definition of complementary angles.',
    key: 'Chain: Given right angle → m∠ABC = 90 (Definition of right angle); m∠ABD + m∠DBC = m∠ABC (Angle Addition Postulate); m∠ABD + m∠DBC = 90 (Substitution); complementary (Definition of complementary angles). A shorter valid proof: Given, then the Complement Theorem directly.'
  },
  {
    id: 'w-sg-43', group: 'proof', lesson: '2-8', source: 'Study Guide and Review, #43',
    title: 'Prove two big angles are congruent',
    prompt: 'Given: ∠1 ≅ ∠4 and ∠2 ≅ ∠3. Prove: ∠AFC ≅ ∠EFC.',
    visual: svg('Five rays come out of point F: FA, FB, FC, FD and FE, from left to right. Angle 1 is between FA and FB, angle 2 between FB and FC, angle 3 between FC and FD, and angle 4 between FD and FE.', fan(), 280),
    visualText: '∠AFC is made of ∠1 and ∠2. ∠EFC is made of ∠4 and ∠3.',
    steps: [
      {id: 'a', s: '∠1 ≅ ∠4 and ∠2 ≅ ∠3', r: 'given', did: 'It is the Given line of the problem.', needs: []},
      {id: 'b', s: 'm∠1 = m∠4 and m∠2 = m∠3', r: 'defcong', did: 'Congruent angles have equal measures, so I switched ≅ to =.', needs: ['a']},
      {id: 'c', s: 'm∠AFC = m∠1 + m∠2', r: 'angadd', did: '∠1 and ∠2 together make ∠AFC, so part + part = whole.', needs: []},
      {id: 'd', s: 'm∠EFC = m∠4 + m∠3', r: 'angadd', did: '∠4 and ∠3 together make ∠EFC, so part + part = whole.', needs: []},
      {id: 'e', s: 'm∠EFC = m∠1 + m∠2', r: 'subst', did: 'I replaced m∠4 with m∠1 and m∠3 with m∠2, because they are equal.', needs: ['b', 'd']},
      {id: 'f', s: 'm∠AFC = m∠EFC', r: 'subst', did: 'Both angles equal m∠1 + m∠2, so they equal each other. The Transitive Property also works here.', needs: ['c', 'e'], opts: ['subst', 'vert', 'angadd']},
      {id: 'g', s: '∠AFC ≅ ∠EFC', r: 'defcong', did: 'Equal measures mean congruent angles, so I switched = back to ≅.', needs: ['f']}
    ],
    check: 'The proof starts with ≅, switches to = to do the adding, and switches back to ≅ at the end.',
    explainPrompt: 'Explain why ∠AFC ≅ ∠EFC. Say each step in order and name its reason.',
    frame: proofFrame,
    model: 'We are given ∠1 ≅ ∠4 and ∠2 ≅ ∠3, so m∠1 = m∠4 and m∠2 = m∠3 by the Definition of congruent angles. By the Angle Addition Postulate, m∠AFC = m∠1 + m∠2 and m∠EFC = m∠4 + m∠3. By Substitution, m∠EFC = m∠1 + m∠2, so m∠AFC = m∠EFC. So ∠AFC ≅ ∠EFC by the Definition of congruent angles.',
    key: 'Chain: Given → equal measures (Definition of congruent angles); m∠AFC = m∠1 + m∠2 and m∠EFC = m∠4 + m∠3 (Angle Addition Postulate); m∠EFC = m∠1 + m∠2 (Substitution); m∠AFC = m∠EFC (Substitution or Transitive Property); ∠AFC ≅ ∠EFC (Definition of congruent angles). Adding the equations with the Addition Property of Equality is also valid.'
  },
  {
    id: 'w-pt-8', group: 'algebra', lesson: '2-6', source: 'Chapter 2 Practice Test, #8',
    title: 'Algebra proof: solve and justify',
    prompt: 'Given: 3(x − 4) = 2x + 7. Prove: x = 19.',
    visual: '', visualText: '',
    steps: [
      {id: 'a', s: '3(x − 4) = 2x + 7', r: 'given', did: 'It is the Given line of the problem.', needs: []},
      {id: 'b', s: '3x − 12 = 2x + 7', r: 'dist', did: 'I multiplied 3 by x and by 4.', needs: ['a']},
      {id: 'c', s: 'x − 12 = 7', r: 'sub', did: 'I subtracted 2x from both sides.', needs: ['b']},
      {id: 'd', s: 'x = 19', r: 'add', did: 'I added 12 to both sides.', needs: ['c']}
    ],
    check: '3(19 − 4) = 3 × 15 = 45, and 2(19) + 7 = 45. Both sides match.',
    explainPrompt: 'Explain how you proved x = 19. Say each step in order and name its reason.',
    frame: 'We are given ___. By the ___, ___. By the ___, ___. So x = 19 by the ___.',
    model: 'We are given 3(x − 4) = 2x + 7. By the Distributive Property, 3x − 12 = 2x + 7. By the Subtraction Property, x − 12 = 7. By the Addition Property, x = 19.',
    key: 'Reasons: Given; Distributive Property; Subtraction Property of Equality (subtract 2x); Addition Property of Equality (add 12). Another valid order (add 12 first, then subtract 2x) is fine with matching reasons.'
  },
  {
    id: 'w-26-7', group: 'algebra', lesson: '2-7', source: 'Like Book 2-6, #7 (page R25)',
    title: 'Congruent segments to an equation',
    prompt: 'Given: AB ≅ CD, AB = 4x − 6 and CD = 22. Prove: x = 7.',
    visual: svg('Segment AB is labeled 4x minus 6. Segment CD is labeled 22. Each has one tick mark, which means they are congruent.',
      `<path d="M110 70H490M110 170H490" stroke="#334155" stroke-width="4"/>` + dot(110, 70) + dot(490, 70) + dot(110, 170) + dot(490, 170) +
      text(110, 100, 'A', 19) + text(490, 100, 'B', 19) + text(110, 200, 'C', 19) + text(490, 200, 'D', 19) +
      text(300, 42, '4x − 6', 21) + text(300, 142, '22', 21) + tick(300, 70) + tick(300, 170), 225),
    visualText: 'The matching tick marks mean the segments are congruent.',
    steps: [
      {id: 'a', s: 'AB ≅ CD', r: 'given', did: 'It is the Given line of the problem.', needs: []},
      {id: 'b', s: 'AB = CD', r: 'defcongseg', did: 'Congruent segments have equal lengths, so I switched ≅ to =.', needs: ['a']},
      {id: 'c', s: '4x − 6 = 22', r: 'subst', did: 'I plugged in AB = 4x − 6 and CD = 22.', needs: ['b']},
      {id: 'd', s: '4x = 28', r: 'add', did: 'I added 6 to both sides.', needs: ['c']},
      {id: 'e', s: 'x = 7', r: 'div', did: 'I divided both sides by 4.', needs: ['d']}
    ],
    check: '4(7) − 6 = 28 − 6 = 22. It matches CD.',
    explainPrompt: 'Explain how you proved x = 7. Say each step in order and name its reason.',
    frame: proofFrame,
    model: 'We are given AB ≅ CD, so AB = CD by the Definition of congruent segments. By Substitution, 4x − 6 = 22. By the Addition Property, 4x = 28. By the Division Property, x = 7.',
    key: 'Reasons: Given; Definition of congruent segments (≅ to =); Substitution; Addition Property of Equality; Division Property of Equality. The ≅ to = switch must come before the equation.'
  },
  {
    id: 'w-pt-7', group: 'logic', lesson: '2-4', source: 'Chapter 2 Practice Test, #7',
    title: 'Is the conclusion valid?',
    prompt: 'Given: If a lawyer passes the bar exam, then he or she can practice law. Candice passed the bar exam. Conclusion: Candice can practice law. Is the conclusion valid? Explain your reasoning.',
    visual: '', visualText: '',
    steps: [
      {id: 'a', s: 'Rule: If a lawyer passes the bar exam, then he or she can practice law.', r: 'given', did: 'It is the rule given in the problem.', needs: [], opts: ['given', 'detach', 'syllog']},
      {id: 'b', s: 'Fact: Candice passed the bar exam.', r: 'given', did: 'It is the fact given in the problem.', needs: [], opts: ['given', 'detach', 'syllog']},
      {id: 'c', s: 'The fact matches the IF part of the rule.', r: 'matchif', did: 'I compared the fact with the IF part: passes the bar exam.', needs: ['a', 'b']},
      {id: 'd', s: 'Candice can practice law. The conclusion is valid.', r: 'detach', did: 'The fact matches the IF part of a true rule, so the THEN part is true.', needs: ['c']}
    ],
    check: 'If the fact had matched only the THEN part, the conclusion would be invalid.',
    explainPrompt: 'Is the conclusion valid? Explain using the IF part, the THEN part, and the name of the law.',
    frame: 'The rule is: if ___, then ___. The fact is ___. The fact matches the ___ part. So ___ by the ___.',
    model: 'Valid. The rule says: if a lawyer passes the bar exam, then he or she can practice law. The fact, Candice passed the bar exam, matches the IF part. So by the Law of Detachment, Candice can practice law.',
    key: 'Valid by the Law of Detachment: the fact matches the hypothesis (IF part), so the conclusion (THEN part) follows. Not the Law of Syllogism, because there is only one rule.'
  });
})();

/* ===== More Lesson 2-8 practice (new problems, not from the book) ===== */
(() => {
  const {line, ray, at, box, text, svg, note} = GEO_DATA._draw;
  const findFrame = 'First, I see that ___, so ___ (reason: ___). Next, I plug in the expressions: ___ (Substitution). Then I solve: ___ (reason for each move). So the angles are ___ (Substitution).';
  const src = 'New practice problem';
  GEO_DATA.workshop.push(
  {
    id: 'w-n-comp', group: 'find', lesson: '2-8', source: src,
    title: 'Two angles in a right angle, with x',
    prompt: 'The box marks a right angle. m∠1 = 2x + 5 and m∠2 = 3x − 10. Find x, m∠1 and m∠2. Name the reason for each step.',
    visual: svg('A right angle with a box in the corner. A ray inside it splits it into angle 1 on top and angle 2 on the bottom.',
      ray(220, 215, 90, 185) + ray(220, 215, 0, 270) + ray(220, 215, 47, 250) + box(220, 215, 0) +
      at(220, 215, 68.5, 64, '1') + at(220, 215, 23.5, 74, '2') + note(250), 250),
    visualText: '∠1 and ∠2 sit side by side and fill the right angle.',
    steps: [
      {id: 'a', s: 'm∠1 + m∠2 = 90', r: 'compl', did: '∠1 and ∠2 sit side by side and fill the right angle, so they add to 90.', needs: []},
      {id: 'b', s: '(2x + 5) + (3x − 10) = 90', r: 'subst', did: 'I plugged in the two expressions from the problem.', needs: ['a']},
      {id: 'c', s: '5x − 5 = 90', r: 'subst', did: 'I combined like terms: 2x + 3x = 5x, and 5 − 10 = −5.', needs: ['b'], opts: ['subst', 'add', 'dist']},
      {id: 'd', s: '5x = 95', r: 'add', did: 'I added 5 to both sides.', needs: ['c']},
      {id: 'e', s: 'x = 19', r: 'div', did: 'I divided both sides by 5.', needs: ['d']},
      {id: 'f', s: 'm∠1 = 2(19) + 5 = 43', r: 'subst', did: 'I plugged 19 in for x.', needs: ['e']},
      {id: 'g', s: 'm∠2 = 3(19) − 10 = 47', r: 'subst', did: 'I plugged 19 in for x.', needs: ['e']}
    ],
    check: '43 + 47 = 90.',
    explainPrompt: 'Explain how you found m∠1 and m∠2. Say each step in order and name its reason.',
    frame: findFrame,
    model: '∠1 and ∠2 fill a right angle, so m∠1 + m∠2 = 90 by the Complement Theorem. By Substitution, (2x + 5) + (3x − 10) = 90, so 5x − 5 = 90. By the Addition Property, 5x = 95. By the Division Property, x = 19. By Substitution, m∠1 = 43 and m∠2 = 47.',
    key: 'Values: x = 19, m∠1 = 43, m∠2 = 47. Key reason: Complement Theorem (adjacent angles that fill a right angle add to 90). Algebra: Substitution (accept Simplify for combining), Addition Property, Division Property.'
  },
  {
    id: 'w-n-equal', group: 'find', lesson: '2-8', source: src,
    title: 'Two equal angles in a right angle',
    prompt: 'Given: ∠5 ≅ ∠6. The box marks ∠4 as a right angle. Find m∠4, m∠5 and m∠6. Name the reason for each step.',
    visual: svg('A straight line. A ray goes straight up from it. The box marks angle 4 on the left as a right angle. On the right, another ray splits the space into angle 5 on top and angle 6 below.',
      line(300, 195, 0, 265) + ray(300, 195, 90, 170) + ray(300, 195, 45, 200) + box(300, 195, 90) +
      at(300, 195, 135, 56, '4') + at(300, 195, 67.5, 64, '5') + at(300, 195, 22.5, 70, '6') + note(245), 245),
    visualText: 'The box marks ∠4. ∠5 and ∠6 fill the right side.',
    steps: [
      {id: 'a', s: 'm∠4 = 90', r: 'defright', did: 'The box shows that ∠4 is a right angle, and a right angle measures 90.', needs: []},
      {id: 'b', s: 'm∠5 + m∠6 = 90', r: 'compl', did: '∠5 and ∠6 sit side by side and fill the right side, which is also a right angle because the line is straight: 180 − 90 = 90.', needs: ['a']},
      {id: 'c', s: '∠5 ≅ ∠6', r: 'given', did: 'It is the Given line of the problem.', needs: []},
      {id: 'd', s: 'm∠5 = m∠6', r: 'defcong', did: 'Congruent angles have equal measures, so I switched ≅ to =.', needs: ['c']},
      {id: 'e', s: 'm∠5 + m∠5 = 90', r: 'subst', did: 'I replaced m∠6 with m∠5, because they are equal.', needs: ['b', 'd']},
      {id: 'f', s: '2(m∠5) = 90', r: 'subst', did: 'I combined like terms: one m∠5 plus one m∠5 is two of them.', needs: ['e'], opts: ['subst', 'add', 'mult']},
      {id: 'g', s: 'm∠5 = 45', r: 'div', did: 'I divided both sides by 2.', needs: ['f']},
      {id: 'h', s: 'm∠6 = 45', r: 'subst', did: 'm∠6 = m∠5, and m∠5 = 45.', needs: ['g', 'd']}
    ],
    check: '45 + 45 = 90, and 90 + 90 = 180 for the whole straight line.',
    explainPrompt: 'Explain how you found m∠4, m∠5 and m∠6. Say each step in order and name its reason.',
    frame: findFrame,
    model: 'The box shows ∠4 is a right angle, so m∠4 = 90 by the Definition of right angle. ∠5 and ∠6 fill the right angle on the other side, so m∠5 + m∠6 = 90 by the Complement Theorem. We are given ∠5 ≅ ∠6, so m∠5 = m∠6 by the Definition of congruent angles. By Substitution, m∠5 + m∠5 = 90, so 2(m∠5) = 90. By the Division Property, m∠5 = 45, and m∠6 = 45 by Substitution.',
    key: 'Values: m∠4 = 90, m∠5 = 45, m∠6 = 45. Reasons: Definition of right angle; Complement Theorem for m∠5 + m∠6 = 90 (also accept: the right side is a right angle because perpendicular lines form four right angles, or because m∠4 + m∠5 + m∠6 = 180 on the straight line); Given and Definition of congruent angles for m∠5 = m∠6; Substitution; Division Property. Writing x for each equal angle (2x = 90) is fine.'
  },
  {
    id: 'w-n-x64', group: 'find', lesson: '2-8', source: src,
    title: 'One angle in an X, find the other three',
    prompt: 'Two lines cross. m∠1 = 64. Find m∠2, m∠3 and m∠4. Name the reason for each step.',
    visual: svg('Two lines cross like an X. Angle 1 is the top angle, angle 2 is on the right, angle 3 is the bottom angle and angle 4 is on the left.',
      line(300, 135, 58, 140) + line(300, 135, 122, 140) + at(300, 135, 90, 42, '1') + at(300, 135, 0, 46, '2') + at(300, 135, 270, 42, '3') + at(300, 135, 180, 46, '4') + note(285), 285),
    visualText: 'Neighbors in the X sit on a straight line. Opposite angles are across from each other.',
    steps: [
      {id: 'a', s: 'm∠1 + m∠2 = 180', r: 'suppl', did: '∠1 and ∠2 sit side by side on a straight line, so they add to 180.', needs: []},
      {id: 'b', s: '64 + m∠2 = 180', r: 'subst', did: 'I plugged in m∠1 = 64.', needs: ['a']},
      {id: 'c', s: 'm∠2 = 116', r: 'sub', did: 'I subtracted 64 from both sides.', needs: ['b']},
      {id: 'd', s: '∠3 ≅ ∠1', r: 'vert', did: '∠3 and ∠1 are across from each other in the X.', needs: []},
      {id: 'e', s: 'm∠3 = 64', r: 'defcong', did: 'Congruent angles have equal measures, and m∠1 = 64.', needs: ['d']},
      {id: 'f', s: '∠4 ≅ ∠2', r: 'vert', did: '∠4 and ∠2 are across from each other in the X.', needs: []},
      {id: 'g', s: 'm∠4 = 116', r: 'defcong', did: 'Congruent angles have equal measures, and m∠2 = 116.', needs: ['f', 'c']}
    ],
    check: 'Each pair of neighbors adds to 180: 64 + 116 = 180. All four add to 360.',
    explainPrompt: 'Explain how you found m∠2, m∠3 and m∠4. Say each step and name its reason.',
    frame: 'For ∠2: ___ because ___. For ∠3: ___ because ___. For ∠4: ___ because ___.',
    model: '∠1 and ∠2 form a linear pair, so m∠1 + m∠2 = 180 by the Supplement Theorem. By Substitution, 64 + m∠2 = 180, and m∠2 = 116 by the Subtraction Property. ∠3 and ∠1 are vertical angles, so ∠3 ≅ ∠1 by the Vertical Angles Theorem, and m∠3 = 64 by the Definition of congruent angles. In the same way, ∠4 ≅ ∠2 by the Vertical Angles Theorem, so m∠4 = 116.',
    key: 'Values: m∠2 = 116, m∠3 = 64, m∠4 = 116. Reasons: Supplement Theorem for a linear pair, then Substitution and Subtraction Property; Vertical Angles Theorem plus Definition of congruent angles for ∠3 and ∠4. Also correct: finding ∠4 or ∠3 from a linear pair with the Supplement Theorem.'
  },
  {
    id: 'w-n-suppdef', group: 'find', lesson: '2-8', source: src,
    title: 'Supplementary, but not side by side',
    prompt: '∠P and ∠Q are supplementary. m∠P = 4x + 12 and m∠Q = 2x + 6. Find x, m∠P and m∠Q. Name the reason for each step.',
    visual: svg('Two separate angles that do not touch. Angle P is wide and angle Q is narrow.',
      ray(110, 200, 0, 160) + ray(110, 200, 120, 150) + text(110, 226, 'P', 19) + at(110, 200, 60, 62, '(4x + 12)°', 17) +
      ray(380, 200, 0, 170) + ray(380, 200, 60, 160) + text(380, 226, 'Q', 19) + at(380, 200, 30, 92, '(2x + 6)°', 17) + note(260, 'The angles do not touch, so they are not a linear pair'), 260),
    visualText: 'The two angles do not touch. Only the problem tells you they are supplementary.',
    steps: [
      {id: 'a', s: '∠P and ∠Q are supplementary', r: 'given', did: 'It is the Given line of the problem.', needs: []},
      {id: 'b', s: 'm∠P + m∠Q = 180', r: 'defsupp', did: 'The problem says the angles are supplementary, so I used what the word means: the sum is 180. They are not side by side, so this is not the Supplement Theorem.', needs: ['a'], opts: ['defsupp', 'suppl', 'defcomp']},
      {id: 'c', s: '(4x + 12) + (2x + 6) = 180', r: 'subst', did: 'I plugged in the two expressions from the problem.', needs: ['b']},
      {id: 'd', s: '6x + 18 = 180', r: 'subst', did: 'I combined like terms: 4x + 2x = 6x, and 12 + 6 = 18.', needs: ['c'], opts: ['subst', 'add', 'dist']},
      {id: 'e', s: '6x = 162', r: 'sub', did: 'I subtracted 18 from both sides.', needs: ['d']},
      {id: 'f', s: 'x = 27', r: 'div', did: 'I divided both sides by 6.', needs: ['e']},
      {id: 'g', s: 'm∠P = 4(27) + 12 = 120', r: 'subst', did: 'I plugged 27 in for x.', needs: ['f']},
      {id: 'h', s: 'm∠Q = 2(27) + 6 = 60', r: 'subst', did: 'I plugged 27 in for x.', needs: ['f']}
    ],
    check: '120 + 60 = 180.',
    explainPrompt: 'Explain how you found m∠P and m∠Q. Say each step in order and name its reason.',
    frame: findFrame,
    model: 'We are given that ∠P and ∠Q are supplementary, so m∠P + m∠Q = 180 by the Definition of supplementary angles. By Substitution, (4x + 12) + (2x + 6) = 180, so 6x + 18 = 180. By the Subtraction Property, 6x = 162. By the Division Property, x = 27. By Substitution, m∠P = 120 and m∠Q = 60.',
    key: 'Values: x = 27, m∠P = 120, m∠Q = 60. The 180 equation comes from the Definition of supplementary angles because the problem states they are supplementary. If she names the Supplement Theorem for that step, mark reasons as missing and explain that these angles are not a linear pair, so the reason is the Definition of supplementary angles. Algebra: Substitution, Subtraction Property, Division Property.'
  });
})();

/* ===== Exam focus and more Lesson 2-8 practice (Wednesday's exam covers 2-8 only) ===== */
(() => {
  const {line, ray, at, box, text, svg, note} = GEO_DATA._draw;
  GEO_DATA.focus = ['2-8'];
  GEO_DATA.focusLabel = 'Wednesday’s exam: Lesson 2-8, Proving Angle Relationships';
  const t = GEO_DATA.topics.find(x => x.id === '2-8');
  t.rule.push(
    'Reason names from the picture: neighbors on a straight line → <b>Supplement Theorem</b>; neighbors that fill a right angle → <b>Complement Theorem</b>; across from each other in an X → <b>Vertical Angles Theorem</b>; small angles that make a bigger one → <b>Angle Addition Postulate</b>.',
    '<b>Congruent Supplements / Congruent Complements Theorems:</b> two angles that each add to 180 (or to 90) with the same angle are congruent.',
    '<b>Right angles:</b> perpendicular lines form four right angles, and all right angles are congruent.'
  );
  t.guided.push(
    {prompt: 'm∠1 + m∠2 = 180, because ∠1 and ∠2 form a linear pair. Which reason?', options: ['Supplement Theorem', 'Complement Theorem', 'Vertical Angles Theorem'], correct: 0, why: 'Neighbors on a straight line add to 180. That is the Supplement Theorem.'},
    {prompt: 'Given ∠5 ≅ ∠6, we write m∠5 = m∠6. Which reason?', options: ['Vertical Angles Theorem', 'Definition of congruent angles', 'Substitution Property'], correct: 1, why: 'Switching between ≅ and = is the Definition of congruent angles.'}
  );
  const q = (id, prompt, hint, key, model, terms, extra = {}) => ({id, prompt, hint, key, model, expectedTerms: terms, visual: '', visualText: '', ...extra});
  t.questions.push(
    q('2-8-i', 'Name the reason: ∠1 and ∠2 form a linear pair, so m∠1 + m∠2 = 180.', 'The two angles sit side by side on a straight line.',
      'Supplement Theorem (a linear pair is supplementary). Also accept Definition of linear pair together with supplementary angles adding to 180.',
      'Supplement Theorem. The angles are neighbors on a straight line, so they add to 180.', ['Supplement Theorem']),
    q('2-8-j', 'Name the reason: ∠3 and ∠4 are vertical angles, so ∠3 ≅ ∠4.', 'They are across from each other where two lines cross.',
      'Vertical Angles Theorem.', 'Vertical Angles Theorem. Angles across from each other in an X are congruent.', ['Vertical Angles Theorem']),
    q('2-8-k', 'Name the reason: ∠5 ≅ ∠6, so m∠5 = m∠6.', 'The step switches ≅ to =.',
      'Definition of congruent angles.', 'Definition of congruent angles. It lets you switch between ≅ and =.', ['Definition of congruent angles']),
    q('2-8-l', 'Name the reason: ray BD is inside ∠ABC, so m∠ABD + m∠DBC = m∠ABC.', 'Two smaller angles make one bigger angle.',
      'Angle Addition Postulate.', 'Angle Addition Postulate. Part + part = whole.', ['Angle Addition Postulate']),
    q('2-8-m', 'Name the reason: the problem says ∠P and ∠Q are supplementary, so m∠P + m∠Q = 180.', 'The problem says the word supplementary. It does not show a linear pair.',
      'Definition of supplementary angles. Not the Supplement Theorem, because the angles are not shown as a linear pair.',
      'Definition of supplementary angles. The problem says the word, and the word means the sum is 180.', ['Definition of supplementary angles']),
    q('2-8-n', 'Two angles fill a right angle. One measures 3x and the other measures 2x + 10. Find x and both angles. Name the reason for your first equation.', 'They fill a right angle, so they add to 90.',
      '3x + (2x + 10) = 90 by the Complement Theorem, so 5x + 10 = 90, 5x = 80, x = 16. The angles are 48 and 42 (48 + 42 = 90).',
      'By the Complement Theorem, 3x + (2x + 10) = 90. So 5x + 10 = 90, 5x = 80, and x = 16. The angles are 48 and 42.', ['Complement Theorem'],
      {setup: {prompt: 'Which equation comes first?', options: ['Sum is 90 degrees', 'Sum is 180 degrees', 'Equal measures'], correct: 0, explain: 'The angles fill a right angle: Complement Theorem.', equation: '3x + (2x + 10) = 90'},
       visual: svg('A right angle split into two angles by a ray. The top angle is 3x and the bottom angle is 2x plus 10.', ray(230, 205, 90, 175) + ray(230, 205, 0, 280) + ray(230, 205, 42, 250) + box(230, 205, 0) + at(230, 205, 66, 86, '3x°', 18) + at(230, 205, 21, 128, '(2x + 10)°', 18) + note(240), 240),
       visualText: 'The box shows the two angles together make a right angle.'}),
    q('2-8-o', 'Two lines cross. One angle measures 4x + 20. The angle across from it measures 6x − 10. Find x and the angle measure. Name the theorem.', 'Angles across from each other in an X are equal.',
      '4x + 20 = 6x − 10 by the Vertical Angles Theorem (and Definition of congruent angles), so 30 = 2x and x = 15. Each angle is 80.',
      'By the Vertical Angles Theorem, 4x + 20 = 6x − 10. So 30 = 2x, and x = 15. Each angle is 80.', ['Vertical Angles Theorem'],
      {setup: {prompt: 'What do vertical angles tell you?', options: ['Equal measures', 'Sum is 90 degrees', 'Sum is 180 degrees'], correct: 0, explain: 'Vertical angles are congruent, so their measures are equal.', equation: '4x + 20 = 6x − 10'},
       visual: svg('Two lines cross. The top angle is 4x plus 20. The bottom angle, across from it, is 6x minus 10.', line(300, 120, 40, 175) + line(300, 120, 140, 175) + at(300, 120, 90, 46, '(4x + 20)°', 18) + at(300, 120, 270, 46, '(6x − 10)°', 18) + note(250), 250),
       visualText: 'The two labeled angles are across from each other.'}),
    q('2-8-p', '∠1 and ∠2 are complementary. ∠1 and ∠3 are complementary. m∠2 = 35. What is m∠3? Name the theorem.', 'Both ∠2 and ∠3 add to 90 with the same angle, ∠1.',
      'm∠3 = 35, by the Congruent Complements Theorem (∠2 ≅ ∠3). Also accept the arithmetic: m∠1 = 55, so m∠3 = 90 − 55 = 35.',
      'm∠3 = 35. ∠2 and ∠3 are both complementary to ∠1, so they are congruent by the Congruent Complements Theorem.', ['Congruent Complements Theorem']),
    q('2-8-q', 'Two lines are perpendicular. How many right angles do they form? What is the measure of each angle?', 'Perpendicular lines meet at a right-angle box.',
      'Four right angles, each 90 degrees. Perpendicular lines form four right angles.',
      'They form four right angles, and each one measures 90.', [],
      {visual: svg('Two perpendicular lines cross. A box marks one right angle.', line(300, 115, 0, 200) + line(300, 115, 90, 95) + box(300, 115, 0) + note(230), 230),
       visualText: 'One box is shown. Look at the other three angles.'}),
    q('2-8-r', '∠1 and ∠2 are congruent, and they form a linear pair. What is the measure of each angle? Explain why.', 'They add to 180, and they are equal.',
      'Each is 90. A linear pair adds to 180 (Supplement Theorem), and the angles are equal, so each is 180 ÷ 2 = 90. Two congruent angles that form a linear pair are right angles.',
      'Each angle is 90. They add to 180 because they are a linear pair, and they are equal, so 180 ÷ 2 = 90.', []),
    q('2-8-s', 'In a two-column proof, the Given line says ∠1 ≅ ∠2. What reason do you write when you change it to m∠1 = m∠2? What reason do you write when you change back to ≅ at the end?', 'It is the same reason both times.',
      'Definition of congruent angles, both times.', 'Definition of congruent angles, both times. It is the reason for switching between ≅ and =.', ['Definition of congruent angles']),
    q('2-8-t', 'How do you know which theorem to use? When do you use the Supplement Theorem, and when do you use the Complement Theorem?', 'Look at what the two angles fill: a straight line, or a right angle.',
      'Supplement Theorem: two neighboring angles on a straight line (a linear pair) add to 180. Complement Theorem: two neighboring angles that fill a right angle add to 90.',
      'Use the Supplement Theorem when two neighbors sit on a straight line; they add to 180. Use the Complement Theorem when two neighbors fill a right angle; they add to 90.', ['Supplement Theorem', 'Complement Theorem'])
  );
})();

(() => {
  const {pt, line, ray, at, dot, text, svg, note} = GEO_DATA._draw;
  const findFrame = 'First, I see that ___, so ___ (reason: ___). Next, I plug in the expressions: ___ (Substitution). Then I solve: ___ (reason for each move). So the angles are ___ (Substitution).';
  const proofFrame = 'We are given ___. By ___, ___. Since ___, ___ by ___. So ___ by ___.';
  const src = 'New practice problem';
  const named = (cx, cy, list) => list.map(([n, d, len, r]) => { const p = pt(cx, cy, d, r); const q = pt(cx, cy, d + (d > 90 ? -9 : 9), r + 6); return ray(cx, cy, d, len) + dot(p[0], p[1]) + text(q[0], q[1] - 14, n, 19); }).join('') + dot(cx, cy);
  GEO_DATA.workshop.push(
  {
    id: 'w-n-angadd', group: 'find', lesson: '2-8', source: src,
    title: 'Part + part = whole, with x',
    prompt: 'Ray BD is inside ∠ABC. m∠ABC = 110, m∠ABD = 3x + 5 and m∠DBC = 2x + 15. Find x, m∠ABD and m∠DBC. Name the reason for each step.',
    visual: svg('Angle ABC with vertex B. Ray BD is inside it, splitting it into angle ABD on top and angle DBC on the bottom.',
      named(200, 220, [['A', 110, 190, 150], ['D', 51, 250, 165], ['C', 0, 290, 175]]) + text(200, 245, 'B', 19) +
      at(200, 220, 80.5, 100, '(3x + 5)°', 16) + at(200, 220, 25.5, 118, '(2x + 15)°', 16) + note(265), 265),
    visualText: 'Ray BD splits ∠ABC into two smaller angles.',
    steps: [
      {id: 'a', s: 'm∠ABD + m∠DBC = m∠ABC', r: 'angadd', did: 'Ray BD splits ∠ABC into two smaller angles, so part + part = whole.', needs: []},
      {id: 'b', s: '(3x + 5) + (2x + 15) = 110', r: 'subst', did: 'I plugged in the two expressions and m∠ABC = 110.', needs: ['a']},
      {id: 'c', s: '5x + 20 = 110', r: 'subst', did: 'I combined like terms: 3x + 2x = 5x, and 5 + 15 = 20.', needs: ['b'], opts: ['subst', 'add', 'dist']},
      {id: 'd', s: '5x = 90', r: 'sub', did: 'I subtracted 20 from both sides.', needs: ['c']},
      {id: 'e', s: 'x = 18', r: 'div', did: 'I divided both sides by 5.', needs: ['d']},
      {id: 'f', s: 'm∠ABD = 3(18) + 5 = 59', r: 'subst', did: 'I plugged 18 in for x.', needs: ['e']},
      {id: 'g', s: 'm∠DBC = 2(18) + 15 = 51', r: 'subst', did: 'I plugged 18 in for x.', needs: ['e']}
    ],
    check: '59 + 51 = 110.',
    explainPrompt: 'Explain how you found m∠ABD and m∠DBC. Say each step in order and name its reason.',
    frame: findFrame,
    model: 'Ray BD splits ∠ABC, so m∠ABD + m∠DBC = m∠ABC by the Angle Addition Postulate. By Substitution, (3x + 5) + (2x + 15) = 110, so 5x + 20 = 110. By the Subtraction Property, 5x = 90. By the Division Property, x = 18. By Substitution, m∠ABD = 59 and m∠DBC = 51.',
    key: 'Values: x = 18, m∠ABD = 59, m∠DBC = 51. Key reason: Angle Addition Postulate (part + part = whole). Algebra: Substitution (accept Simplify for combining), Subtraction Property, Division Property.'
  },
  {
    id: 'w-n-congsupp', group: 'find', lesson: '2-8', source: src,
    title: 'Two angles supplementary to the same angle',
    prompt: '∠1 and ∠2 are supplementary. ∠3 and ∠2 are supplementary. m∠1 = 4x + 7 and m∠3 = 6x − 25. Find x, m∠1 and m∠3. Name the reason for each step.',
    visual: '', visualText: '',
    steps: [
      {id: 'a', s: '∠1 and ∠2 are supplementary, and ∠3 and ∠2 are supplementary', r: 'given', did: 'It is the Given line of the problem.', needs: []},
      {id: 'b', s: '∠1 ≅ ∠3', r: 'congsupp', did: '∠1 and ∠3 each add to 180 with the same angle, ∠2, so they are congruent.', needs: ['a']},
      {id: 'c', s: 'm∠1 = m∠3', r: 'defcong', did: 'Congruent angles have equal measures, so I switched ≅ to =.', needs: ['b']},
      {id: 'd', s: '4x + 7 = 6x − 25', r: 'subst', did: 'I plugged in the two expressions from the problem.', needs: ['c']},
      {id: 'e', s: '7 = 2x − 25', r: 'sub', did: 'I subtracted 4x from both sides.', needs: ['d']},
      {id: 'f', s: '32 = 2x', r: 'add', did: 'I added 25 to both sides.', needs: ['e']},
      {id: 'g', s: '16 = x', r: 'div', did: 'I divided both sides by 2. This is the same as x = 16.', needs: ['f']},
      {id: 'h', s: 'm∠1 = 4(16) + 7 = 71', r: 'subst', did: 'I plugged 16 in for x.', needs: ['g']},
      {id: 'i', s: 'm∠3 = 6(16) − 25 = 71', r: 'subst', did: 'I plugged 16 in for x.', needs: ['g']}
    ],
    check: 'Both angles are 71. Then m∠2 = 180 − 71 = 109, which works for both pairs.',
    explainPrompt: 'Explain how you found m∠1 and m∠3. Say each step in order and name its reason.',
    frame: findFrame,
    model: '∠1 and ∠3 are both supplementary to ∠2, so ∠1 ≅ ∠3 by the Congruent Supplements Theorem. By the Definition of congruent angles, m∠1 = m∠3. By Substitution, 4x + 7 = 6x − 25. By the Subtraction Property, 7 = 2x − 25. By the Addition Property, 32 = 2x. By the Division Property, x = 16. By Substitution, m∠1 = 71 and m∠3 = 71.',
    key: 'Values: x = 16, m∠1 = m∠3 = 71 (and m∠2 = 109). Key reason: Congruent Supplements Theorem, then Definition of congruent angles. Algebra: Substitution, Subtraction Property, Addition Property, Division Property (other valid solving orders are fine).'
  },
  {
    id: 'w-28-gp3', group: 'proof', lesson: '2-8', source: 'Book 2-8, Guided Practice 3',
    title: 'Prove two angles are congruent using complements',
    prompt: 'Given: ∠ABE and ∠DBC are right angles. Prove: ∠ABD ≅ ∠EBC.',
    visual: svg('Four rays come out of point B: BA up and to the left, BD straight up, BE up and to the right, and BC to the right.',
      named(300, 235, [['A', 140, 200, 150], ['D', 90, 205, 160], ['E', 50, 200, 150], ['C', 0, 240, 175]]) + text(300, 260, 'B', 19), 275),
    visualText: '∠ABE is made of ∠ABD and ∠DBE. ∠DBC is made of ∠DBE and ∠EBC.',
    steps: [
      {id: 'a', s: '∠ABE and ∠DBC are right angles', r: 'given', did: 'It is the Given line of the problem.', needs: []},
      {id: 'b', s: 'm∠ABE = 90 and m∠DBC = 90', r: 'defright', did: 'I switched the words right angle to the number 90.', needs: ['a']},
      {id: 'c', s: 'm∠ABD + m∠DBE = m∠ABE and m∠DBE + m∠EBC = m∠DBC', r: 'angadd', did: 'Each right angle is split into two smaller angles, so part + part = whole.', needs: []},
      {id: 'd', s: 'm∠ABD + m∠DBE = 90 and m∠DBE + m∠EBC = 90', r: 'subst', did: 'I replaced each big angle with 90.', needs: ['b', 'c']},
      {id: 'e', s: '∠ABD and ∠DBE are complementary, and ∠DBE and ∠EBC are complementary', r: 'defcomp', did: 'I switched each sum of 90 to the word complementary.', needs: ['d']},
      {id: 'f', s: '∠ABD ≅ ∠EBC', r: 'congcomp', did: '∠ABD and ∠EBC each add to 90 with the same angle, ∠DBE, so they are congruent.', needs: ['e']}
    ],
    check: 'The last line matches the Prove line exactly.',
    explainPrompt: 'Explain why ∠ABD ≅ ∠EBC. Say each step in order and name its reason.',
    frame: proofFrame,
    model: 'We are given that ∠ABE and ∠DBC are right angles, so m∠ABE = 90 and m∠DBC = 90 by the Definition of right angle. By the Angle Addition Postulate, m∠ABD + m∠DBE = m∠ABE and m∠DBE + m∠EBC = m∠DBC. By Substitution, both sums equal 90, so ∠ABD and ∠DBE are complementary, and ∠DBE and ∠EBC are complementary, by the Definition of complementary angles. So ∠ABD ≅ ∠EBC by the Congruent Complements Theorem.',
    key: 'Chain: Given; Definition of right angle; Angle Addition Postulate; Substitution; Definition of complementary angles; Congruent Complements Theorem. Also accept the Complement Theorem to go straight from the right angles to complementary pairs. Also valid: both angles equal 90 minus m∠DBE, then Definition of congruent angles.'
  },
  {
    id: 'w-n-vertproof', group: 'proof', lesson: '2-8', source: 'Like Book 2-8, Example 3',
    title: 'Prove that vertical angles are congruent',
    prompt: 'Given: ∠1 and ∠3 are vertical angles. Prove: ∠1 ≅ ∠3.',
    visual: svg('Two lines cross like an X. Angle 1 is the top angle, angle 2 is on the right, angle 3 is the bottom angle and angle 4 is on the left.',
      line(300, 130, 50, 150) + line(300, 130, 130, 150) + at(300, 130, 90, 42, '1') + at(300, 130, 0, 46, '2') + at(300, 130, 270, 42, '3') + at(300, 130, 180, 46, '4') + note(270), 270),
    visualText: '∠2 is a neighbor of both ∠1 and ∠3.',
    steps: [
      {id: 'a', s: '∠1 and ∠3 are vertical angles', r: 'given', did: 'It is the Given line of the problem.', needs: []},
      {id: 'b', s: '∠1 and ∠2 form a linear pair, and ∠2 and ∠3 form a linear pair', r: 'deflinear', did: 'Each pair sits side by side, and their outer sides make a straight line.', needs: ['a']},
      {id: 'c', s: '∠1 and ∠2 are supplementary, and ∠2 and ∠3 are supplementary', r: 'suppl', did: 'A linear pair adds to 180, so each pair is supplementary.', needs: ['b']},
      {id: 'd', s: '∠1 ≅ ∠3', r: 'congsupp', did: '∠1 and ∠3 each add to 180 with the same angle, ∠2, so they are congruent.', needs: ['c']}
    ],
    check: 'This proof is the reason the Vertical Angles Theorem is true. You cannot use that theorem to prove itself.',
    explainPrompt: 'Explain why ∠1 ≅ ∠3. Say each step in order and name its reason.',
    frame: proofFrame,
    model: 'We are given that ∠1 and ∠3 are vertical angles. ∠1 and ∠2 form a linear pair, and ∠2 and ∠3 form a linear pair, by the Definition of linear pair. So each pair is supplementary by the Supplement Theorem. ∠1 and ∠3 are both supplementary to ∠2, so ∠1 ≅ ∠3 by the Congruent Supplements Theorem.',
    key: 'Chain: Given; Definition of linear pair; Supplement Theorem; Congruent Supplements Theorem. Also valid: m∠1 + m∠2 = 180 and m∠2 + m∠3 = 180, then Substitution and the Subtraction Property give m∠1 = m∠3, then Definition of congruent angles. Do not accept the Vertical Angles Theorem as the reason for the last step, because that theorem is what is being proved.'
  });
  const order = ['find', 'proof', 'algebra', 'logic'];
  GEO_DATA.workshop.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group));
  delete GEO_DATA._draw;
})();

/* ===== Picture highlights =====
   angles: key -> [vertex x, vertex y, start degree, end degree, radius] (degrees counterclockwise from the right),
           or {seg: [x1, y1, x2, y2]} for a segment.
   hl: step id -> keys to light up. Keys separated by spaces share a color (equal parts).
       Groups separated by | get different colors (parts that add together). */
(() => {
  const set = (id, angles, hl) => { const w = GEO_DATA.workshop.find(x => x.id === id); if (w) { w.angles = angles; w.hl = hl; } };
  // expr: the expression that belongs to each angle, colored to match its angle in the steps.
  const expr = (id, map) => { const w = GEO_DATA.workshop.find(x => x.id === id); if (w) w.expr = map; };
  set('w-28-11', {'9': [300, 120, 0, 115, 60], '10': [300, 120, 295, 360, 62]},
    {a: '9|10', b: '9|10', f: '9', g: '10'});
  set('w-28-12', {'3': [300, 120, 33.5, 146.5, 56], '4': [300, 120, 213.5, 326.5, 56]},
    {a: '3 4', b: '3 4', c: '3 4', g: '3', h: '4'});
  set('w-28-13', {'6': [300, 120, 53.5, 126.5, 54], '7': [300, 120, -53.5, 53.5, 54], '8': [300, 120, 233.5, 306.5, 54]},
    {a: '6|7', b: '6|7', f: '6', g: '7', h: '8 6', i: '8 6', j: '8'});
  set('w-pt-12', {'1': [300, 70, 180, 225, 72], '2': [300, 70, 225, 270, 72], '3': [300, 70, 270, 360, 64]},
    {a: '3', b: '1|2', c: '1|2', g: '1', h: '2'});
  set('w-sg-40', {'5': [170, 120, 0, 90, 48], 'R': [170, 120, 90, 180, 30], '6': [256.7, 120, 53, 180, 50], '7': [256.7, 120, 0, 53, 58], 'a53': [256.7, 120, 180, 233, 68]},
    {a: '5|R', b: '5', c: '6|a53', d: '6', e: '7 a53', f: '7'});
  set('w-28-15', {'5': [200, 175, 62, 180, 50], '4': [200, 175, 0, 62, 54], '6': [400, 175, 0, 118, 54]},
    {a: '5 6', b: '5 6', c: '4|5', d: '4|5', e: '4|6', f: '4|6'});
  set('w-28-14', {'ABC': [220, 215, 0, 90, 46], 'ABD': [220, 215, 30, 90, 72], 'DBC': [220, 215, 0, 30, 72]},
    {a: 'ABC', b: 'ABC', c: 'ABD|DBC', d: 'ABD|DBC', e: 'ABD|DBC'});
  set('w-sg-43', {'1': [300, 250, 115, 150, 84], '2': [300, 250, 90, 115, 84], '3': [300, 250, 65, 90, 84], '4': [300, 250, 30, 65, 84], 'AFC': [300, 250, 90, 150, 110], 'EFC': [300, 250, 30, 90, 110]},
    {a: '1 4|2 3', b: '1 4|2 3', c: '1|2', d: '4|3', e: 'EFC', f: 'AFC EFC', g: 'AFC EFC'});
  set('w-26-7', {'AB': {seg: [110, 70, 490, 70]}, 'CD': {seg: [110, 170, 490, 170]}},
    {a: 'AB CD', b: 'AB CD', c: 'AB CD'});
  set('w-n-comp', {'1': [220, 215, 47, 90, 80], '2': [220, 215, 0, 47, 90]},
    {a: '1|2', b: '1|2', f: '1', g: '2'});
  set('w-n-equal', {'4': [300, 195, 90, 180, 70], '5': [300, 195, 45, 90, 78], '6': [300, 195, 0, 45, 84]},
    {a: '4', b: '5|6', c: '5 6', d: '5 6', e: '5', f: '5', g: '5', h: '6'});
  set('w-n-x64', {'1': [300, 135, 58, 122, 58], '2': [300, 135, -58, 58, 60], '3': [300, 135, 238, 302, 58], '4': [300, 135, 122, 238, 60]},
    {a: '1|2', b: '1|2', c: '2', d: '3 1', e: '3', f: '4 2', g: '4'});
  set('w-n-suppdef', {'P': [110, 200, 0, 120, 92], 'Q': [380, 200, 0, 60, 108]},
    {a: 'P|Q', b: 'P|Q', c: 'P|Q', g: 'P', h: 'Q'});
  set('w-n-angadd', {'ABC': [200, 220, 0, 110, 60], 'ABD': [200, 220, 51, 110, 120], 'DBC': [200, 220, 0, 51, 138]},
    {a: 'ABD|DBC', b: 'ABD|DBC', f: 'ABD', g: 'DBC'});
  set('w-28-gp3', {'ABE': [300, 235, 50, 140, 64], 'DBC': [300, 235, 0, 90, 96], 'ABD': [300, 235, 90, 140, 84], 'DBE': [300, 235, 50, 90, 84], 'EBC': [300, 235, 0, 50, 84]},
    {a: 'ABE|DBC', b: 'ABE|DBC', c: 'ABD|DBE|EBC', d: 'ABD|DBE|EBC', e: 'ABD|DBE|EBC', f: 'ABD EBC'});
  set('w-n-vertproof', {'1': [300, 130, 50, 130, 58], '2': [300, 130, -50, 50, 60], '3': [300, 130, 230, 310, 58], '4': [300, 130, 130, 230, 60]},
    {a: '1 3', b: '1|2|3', c: '1|2|3', d: '1 3'});
  expr('w-28-11', {'9': '3x + 12', '10': 'x − 24'});
  expr('w-28-12', {'3': '2x + 23', '4': '5x − 112'});
  expr('w-28-13', {'6': '2x − 21', '7': '3x − 34'});
  expr('w-pt-12', {'2': 'x − 6'});
  expr('w-n-comp', {'1': '2x + 5', '2': '3x − 10'});
  expr('w-n-suppdef', {'P': '4x + 12', 'Q': '2x + 6'});
  expr('w-n-angadd', {'ABD': '3x + 5', 'DBC': '2x + 15'});
  expr('w-26-7', {'AB': '4x − 6'});
})();

/* ===== Merged from the reviewed Section 2-8 file (October 2026) ===== */
(() => {
  const D = GEO_DATA, W = id => D.workshop.find(w => w.id === id), S = (w, s) => W(w).steps.find(x => x.id === s);
  // New reason names for Lesson 2-8: perpendicular lines, right angles, and the properties of angle congruence.
  Object.assign(D.reasons, {"defperp":{"name":"Definition of perpendicular lines","short":"Def. of perpendicular","did":"Lines that meet to form a right angle are perpendicular."},"rightcong":{"name":"All right angles are congruent","short":"Right-angle congruence","did":"Each angle is a right angle, so the two angles are congruent."},"congrightsupp":{"name":"Congruent supplementary angles are right angles","short":"Congruent + supplementary ⇒ right","did":"The angles have equal measures and their measures add to 180 degrees, so each measures 90 degrees."},"reflcong":{"name":"Reflexive Property of Congruence","short":"Reflexive ≅","did":"An angle is congruent to itself: ∠A ≅ ∠A."},"symcong":{"name":"Symmetric Property of Congruence","short":"Symmetric ≅","did":"If ∠A ≅ ∠B, then ∠B ≅ ∠A. I reverse the two angle names."},"transcong":{"name":"Transitive Property of Congruence","short":"Transitive ≅","did":"If ∠A ≅ ∠B and ∠B ≅ ∠C, then ∠A ≅ ∠C. The matching middle angle connects them."}});
  Object.assign(D.reasonMixups, {"defperp":["defright","vert"],"rightcong":["defright","vert"],"congrightsupp":["compl","vert"],"reflcong":["symcong","transcong"],"symcong":["reflcong","transcong"],"transcong":["reflcong","symcong"]});
  for (const [k, did] of Object.entries({"given":"I used a fact stated in the problem or explicitly marked on the diagram. A shape merely looking equal or perpendicular is not enough.","congsupp":"Two angles are supplementary to the same angle, or to congruent angles, so those two angles are congruent.","congcomp":"Two angles are complementary to the same angle, or to congruent angles, so those two angles are congruent.","div":"I divided both sides by the same nonzero number. Dividing by zero is not allowed.","dist":"I multiplied the factor outside parentheses by every term inside, including each sign. For example, 3(x − 4) = 3x − 12."})) D.reasons[k].did = did;
  const pic = D.reasonFinder.find(g => g.ids.includes('suppl')); pic.ids = pic.ids.filter(id => id !== 'perp');
  D.reasonFinder.splice(D.reasonFinder.indexOf(pic) + 1, 0,
    {title: 'I connected right angles and perpendicular lines', ids: ['defperp', 'perp', 'rightcong', 'congrightsupp']},
    {title: 'I connected congruent angles', ids: ['reflcong', 'symcong', 'transcong']});
  // Combining like terms is itself the Distributive Property, so it can't be a wrong choice there.
  for (const w of D.workshop) for (const s of w.steps) if (s.opts && /combined like terms/.test(s.did)) s.opts = s.opts.map(o => o === 'dist' ? 'div' : o);
  // Book answer-key style: switch to equal measures first, then substitute the number.
  Object.assign(W('w-n-x64'), {steps: [{"id":"a","s":"m∠1 + m∠2 = 180","r":"suppl","did":"∠1 and ∠2 sit side by side on a straight line, so they add to 180.","needs":[]},{"id":"b","s":"64 + m∠2 = 180","r":"subst","did":"I plugged in m∠1 = 64.","needs":["a"]},{"id":"c","s":"m∠2 = 116","r":"sub","did":"I subtracted 64 from both sides.","needs":["b"]},{"id":"d","s":"∠3 ≅ ∠1","r":"vert","did":"∠3 and ∠1 are across from each other in the X.","needs":[]},{"id":"e-measure","s":"m∠3 = m∠1","r":"defcong","did":"Congruent angles have equal measures.","needs":["d"]},{"id":"e","s":"m∠3 = 64","r":"subst","did":"I replace m∠1 with 64, using its known measure.","needs":["e-measure"]},{"id":"f","s":"∠4 ≅ ∠2","r":"vert","did":"∠4 and ∠2 are across from each other in the X.","needs":[]},{"id":"g-measure","s":"m∠4 = m∠2","r":"defcong","did":"Congruent angles have equal measures.","needs":["f"]},{"id":"g","s":"m∠4 = 116","r":"subst","did":"I replace m∠2 with 116, using its known measure.","needs":["g-measure","c"]}], model: "A linear pair gives m∠1 + m∠2 = 180 by the Supplement Theorem. Substitute 64 for m∠1, then subtract 64 to get m∠2 = 116. Vertical angles are congruent, so ∠3 ≅ ∠1 and ∠4 ≅ ∠2 by the Vertical Angles Theorem. Their measures are equal by the definition of congruent angles. Substitution then gives m∠3 = 64 and m∠4 = 116."});
  W('w-n-x64').hl = {a: '1|2', b: '1|2', c: '2', d: '3 1', 'e-measure': '3 1', e: '3', f: '4 2', 'g-measure': '4 2', g: '4'};
  // Steps that join two equal measures: Substitution and the Transitive Property both work.
  for (const [w, s, opts] of [['w-28-13', 'j'], ['w-28-14', 'd'], ['w-sg-43', 'f', ['subst', 'vert', 'angadd']], ['w-28-gp3', 'd'], ['w-n-equal', 'h'], ['w-n-x64', 'e'], ['w-n-x64', 'g']]) {
    const st = S(w, s); st.acceptedReasons = ['subst', 'trans']; st.opts = opts || ['subst', 'add', 'vert'];
    if (!/Transitive/.test(st.did)) st.did += ' The Transitive Property also works here.';
  }
  // Three short proofs for the 2-8 theorems about right angles and congruent complements or supplements.
  D.workshop.push(...[{"id":"w-28-right-pair","group":"proof","lesson":"2-8","source":"Section 2-8 focused practice","title":"Congruent linear-pair angles are right angles","prompt":"Given: ∠1 and ∠2 form a linear pair, and ∠1 ≅ ∠2. Prove that both are right angles.","visual":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 600 260\" role=\"img\" aria-label=\"Two congruent adjacent angles form a linear pair. No right-angle mark is given.\"><title>Two congruent adjacent angles form a linear pair. No right-angle mark is given.</title><g font-family=\"Verdana,Arial,sans-serif\" fill=\"#172638\"><path d=\"M70 185H530M300 185V35\" fill=\"none\" stroke=\"#334155\" stroke-width=\"4\"/><path d=\"M252 185A48 48 0 0 1 300 137M300 137A48 48 0 0 1 348 185\" fill=\"none\" stroke=\"#5925a7\" stroke-width=\"3\"/><path d=\"M261 146l10 10M329 156l10-10\" stroke=\"#5925a7\" stroke-width=\"3\"/><text x=\"234\" y=\"130\" font-size=\"26\">1</text><text x=\"348\" y=\"130\" font-size=\"26\">2</text><text x=\"300\" y=\"221\" text-anchor=\"middle\" font-size=\"20\">Given: ∠1 ≅ ∠2; the outer rays are opposite.</text><text x=\"300\" y=\"249\" text-anchor=\"middle\" font-size=\"15\">Diagram not to scale. No right-angle mark is given.</text></g></svg>","visualText":"The outer rays are opposite and the matching arc marks show ∠1 ≅ ∠2. There is no given right-angle mark.","steps":[{"id":"a","s":"∠1 and ∠2 form a linear pair, and ∠1 ≅ ∠2","r":"given","did":"These two facts are stated in the problem.","needs":[]},{"id":"b","s":"∠1 and ∠2 are supplementary","r":"suppl","did":"The Supplement Theorem applies to the given linear pair.","needs":["a"]},{"id":"c","s":"∠1 and ∠2 are right angles","r":"congrightsupp","did":"The angles are both congruent and supplementary, so each is a right angle.","needs":["a","b"]},{"id":"d","s":"m∠1 = 90° and m∠2 = 90°","r":"defright","did":"A right angle measures 90 degrees.","needs":["c"]}],"check":"Check that every conclusion follows from the givens or an earlier statement.","explainPrompt":"Explain why the conclusion follows. Name the reason for each step.","frame":"We are given ____. Therefore ____ by ____.","model":"The angles form a linear pair, so they are supplementary by the Supplement Theorem. They are also given to be congruent. Congruent supplementary angles are right angles, so both are right angles. Each measures 90° by the definition of right angle.","key":"The angles form a linear pair, so they are supplementary by the Supplement Theorem. They are also given to be congruent. Congruent supplementary angles are right angles, so both are right angles. Each measures 90° by the definition of right angle. Accept another mathematically valid proof with matching reasons."},{"id":"w-28-congruent-complements","group":"proof","lesson":"2-8","source":"Section 2-8 focused practice","title":"Complements of congruent angles","prompt":"Given: ∠A is complementary to ∠C; ∠B is complementary to ∠D; ∠C ≅ ∠D. Prove ∠A ≅ ∠B.","visual":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 600 260\" role=\"img\" aria-label=\"A bar diagram showing two angle-measure sums of 90 degrees, with congruent angles C and D.\"><title>A bar diagram showing two angle-measure sums of 90 degrees, with congruent angles C and D.</title><g font-family=\"Verdana,Arial,sans-serif\" fill=\"#172638\"><text x=\"300\" y=\"28\" text-anchor=\"middle\" font-size=\"21\">Each row totals 90°</text><rect x=\"75\" y=\"50\" width=\"260\" height=\"50\" fill=\"#ede9fe\" stroke=\"#5925a7\" stroke-width=\"2\"/><rect x=\"335\" y=\"50\" width=\"190\" height=\"50\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"2\"/><text x=\"205\" y=\"83\" text-anchor=\"middle\" font-size=\"22\">m∠A</text><text x=\"430\" y=\"83\" text-anchor=\"middle\" font-size=\"22\">m∠C</text><rect x=\"75\" y=\"125\" width=\"260\" height=\"50\" fill=\"#ede9fe\" stroke=\"#5925a7\" stroke-width=\"2\"/><rect x=\"335\" y=\"125\" width=\"190\" height=\"50\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"2\"/><text x=\"205\" y=\"158\" text-anchor=\"middle\" font-size=\"22\">m∠B</text><text x=\"430\" y=\"158\" text-anchor=\"middle\" font-size=\"22\">m∠D</text><text x=\"300\" y=\"211\" text-anchor=\"middle\" font-size=\"21\">Given: ∠C ≅ ∠D</text><text x=\"300\" y=\"246\" text-anchor=\"middle\" font-size=\"14\">Bars represent angle measures. Widths are schematic.</text></g></svg>","visualText":"The angle measures in each pair sum to 90°. Angles C and D are given to be congruent. The bars represent angle measures, not segments.","steps":[{"id":"a","s":"∠A and ∠C are complementary; ∠B and ∠D are complementary; ∠C ≅ ∠D","r":"given","did":"All three facts are given.","needs":[]},{"id":"b","s":"∠A ≅ ∠B","r":"congcomp","did":"These angles are complements of congruent angles, so they are congruent.","needs":["a"]}],"check":"Check that every conclusion follows from the givens or an earlier statement.","explainPrompt":"Explain why the conclusion follows. Name the reason for each step.","frame":"We are given ____. Therefore ____ by ____.","model":"∠A and ∠B are complementary to the congruent angles ∠C and ∠D. Therefore ∠A ≅ ∠B by the Congruent Complements Theorem.","key":"∠A and ∠B are complementary to the congruent angles ∠C and ∠D. Therefore ∠A ≅ ∠B by the Congruent Complements Theorem. Accept another mathematically valid proof with matching reasons."},{"id":"w-28-congruent-supplements","group":"proof","lesson":"2-8","source":"Section 2-8 focused practice","title":"Supplements of congruent angles","prompt":"Given: ∠A is supplementary to ∠C; ∠B is supplementary to ∠D; ∠C ≅ ∠D. Prove ∠A ≅ ∠B.","visual":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 600 260\" role=\"img\" aria-label=\"A bar diagram showing two angle-measure sums of 180 degrees, with congruent angles C and D.\"><title>A bar diagram showing two angle-measure sums of 180 degrees, with congruent angles C and D.</title><g font-family=\"Verdana,Arial,sans-serif\" fill=\"#172638\"><text x=\"300\" y=\"28\" text-anchor=\"middle\" font-size=\"21\">Each row totals 180°</text><rect x=\"75\" y=\"50\" width=\"260\" height=\"50\" fill=\"#ede9fe\" stroke=\"#5925a7\" stroke-width=\"2\"/><rect x=\"335\" y=\"50\" width=\"190\" height=\"50\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"2\"/><text x=\"205\" y=\"83\" text-anchor=\"middle\" font-size=\"22\">m∠A</text><text x=\"430\" y=\"83\" text-anchor=\"middle\" font-size=\"22\">m∠C</text><rect x=\"75\" y=\"125\" width=\"260\" height=\"50\" fill=\"#ede9fe\" stroke=\"#5925a7\" stroke-width=\"2\"/><rect x=\"335\" y=\"125\" width=\"190\" height=\"50\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"2\"/><text x=\"205\" y=\"158\" text-anchor=\"middle\" font-size=\"22\">m∠B</text><text x=\"430\" y=\"158\" text-anchor=\"middle\" font-size=\"22\">m∠D</text><text x=\"300\" y=\"211\" text-anchor=\"middle\" font-size=\"21\">Given: ∠C ≅ ∠D</text><text x=\"300\" y=\"246\" text-anchor=\"middle\" font-size=\"14\">Bars represent angle measures. Widths are schematic.</text></g></svg>","visualText":"The angle measures in each pair sum to 180°. Angles C and D are given to be congruent. The bars represent angle measures, not segments.","steps":[{"id":"a","s":"∠A and ∠C are supplementary; ∠B and ∠D are supplementary; ∠C ≅ ∠D","r":"given","did":"All three facts are given.","needs":[]},{"id":"b","s":"∠A ≅ ∠B","r":"congsupp","did":"These angles are supplements of congruent angles, so they are congruent.","needs":["a"]}],"check":"Check that every conclusion follows from the givens or an earlier statement.","explainPrompt":"Explain why the conclusion follows. Name the reason for each step.","frame":"We are given ____. Therefore ____ by ____.","model":"∠A and ∠B are supplementary to the congruent angles ∠C and ∠D. Therefore ∠A ≅ ∠B by the Congruent Supplements Theorem.","key":"∠A and ∠B are supplementary to the congruent angles ∠C and ∠D. Therefore ∠A ≅ ∠B by the Congruent Supplements Theorem. Accept another mathematically valid proof with matching reasons."}]);
  for (const id of ['w-28-right-pair', 'w-28-congruent-complements', 'w-28-congruent-supplements']) W(id).source = 'New practice problem';
  Object.assign(W('w-28-right-pair'), {angles: {'1': [300, 185, 90, 180, 50], '2': [300, 185, 0, 90, 50]}, hl: {a: '1 2', b: '1|2', c: '1 2', d: '1 2'}});
  // Easiest first: no algebra, then algebra, then the longer proofs.
  const order = ['w-n-x64', 'w-sg-40', 'w-n-comp', 'w-n-angadd', 'w-28-11', 'w-28-12', 'w-28-13', 'w-pt-12', 'w-n-equal', 'w-n-suppdef', 'w-n-congsupp',
    'w-28-congruent-supplements', 'w-28-congruent-complements', 'w-28-right-pair', 'w-n-vertproof', 'w-28-14', 'w-28-15', 'w-28-gp3', 'w-sg-43', 'w-pt-8', 'w-26-7', 'w-pt-7'];
  D.workshop.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  // Lesson 2-8: fuller rules, model answers that name each reason, and nine more questions.
  const t = D.topics.find(x => x.id === '2-8');
  t.rule.splice(5, t.rule.length - 5,
    '<b>Congruent Supplements / Congruent Complements Theorems:</b> angles supplementary (or complementary) to the same angle, or to congruent angles, are congruent.',
    '<b>Right angles:</b> perpendicular lines form four right angles, all right angles are congruent, and two congruent angles that form a linear pair are right angles.',
    '<b>Congruence of angles</b> is reflexive (∠A ≅ ∠A), symmetric (if ∠A ≅ ∠B, then ∠B ≅ ∠A) and transitive (if ∠A ≅ ∠B and ∠B ≅ ∠C, then ∠A ≅ ∠C).',
    'Use only the labels and marks in the picture. Do not guess a measure from how an angle looks.');
  for (const [id, m] of Object.entries({"2-8-e":"Vertical angles are congruent, so their measures are equal. Substitute to get 2x + 10 = 50. Subtract 10 from both sides to get 2x = 40, then divide both sides by 2 to get x = 20.","2-8-f":"The linear pairs give m∠1 + m∠2 = 180° and m∠2 + m∠3 = 180° by the Supplement Theorem. Both sums equal 180°, so they equal each other. Subtract m∠2 from both sides to get m∠1 = m∠3. Therefore ∠1 ≅ ∠3 by the definition of congruent angles."})) t.questions.find(q => q.id === id).model = m;
  t.questions.push(...[{"id":"2-8-w","prompt":"Ray BD is inside ∠ABC. m∠ABC = 110° and m∠ABD = 59°. Find m∠DBC and name the postulate you use.","key":"51°. The Angle Addition Postulate gives 59 + m∠DBC = 110. Subtract 59 from both sides.","model":"51°. The Angle Addition Postulate gives 59 + m∠DBC = 110. Subtract 59 from both sides.","expectedTerms":["Angle Addition Postulate"],"hint":"Say what the given relationship tells you. Then connect that action to a reason in the Reason Finder.","visual":"","visualText":""},{"id":"2-8-x","prompt":"∠A and ∠B are both right angles. Why are they congruent?","key":"All right angles are congruent. Both have measure 90°. Accept Right Angle Congruence Theorem or equivalent theorem wording.","model":"All right angles are congruent. Both have measure 90°. Accept Right Angle Congruence Theorem or equivalent theorem wording.","expectedTerms":["All right angles are congruent"],"hint":"Say what the given relationship tells you. Then connect that action to a reason in the Reason Finder.","visual":"","visualText":""},{"id":"2-8-y","prompt":"∠A is complementary to ∠C. ∠B is complementary to ∠D. Given ∠C ≅ ∠D, what follows about ∠A and ∠B? Name the theorem.","key":"∠A ≅ ∠B by the Congruent Complements Theorem. Complements of congruent angles are congruent.","model":"∠A ≅ ∠B by the Congruent Complements Theorem. Complements of congruent angles are congruent.","expectedTerms":["Congruent Complements Theorem"],"hint":"Say what the given relationship tells you. Then connect that action to a reason in the Reason Finder.","visual":"","visualText":""},{"id":"2-8-z","prompt":"∠A is supplementary to ∠C. ∠B is supplementary to ∠D. Given ∠C ≅ ∠D, what follows about ∠A and ∠B? Name the theorem.","key":"∠A ≅ ∠B by the Congruent Supplements Theorem. Supplements of congruent angles are congruent.","model":"∠A ≅ ∠B by the Congruent Supplements Theorem. Supplements of congruent angles are congruent.","expectedTerms":["Congruent Supplements Theorem"],"hint":"Say what the given relationship tells you. Then connect that action to a reason in the Reason Finder.","visual":"","visualText":""},{"id":"2-8-aa","prompt":"Given m∠A = m∠B, which reason lets you write ∠A ≅ ∠B?","key":"Definition of congruent angles. Equal angle measures mean congruent angles.","model":"Definition of congruent angles. Equal angle measures mean congruent angles.","expectedTerms":["Definition of congruent angles"],"hint":"Say what the given relationship tells you. Then connect that action to a reason in the Reason Finder.","visual":"","visualText":""},{"id":"2-8-ab","prompt":"Name the property: ∠A ≅ ∠A.","key":"Reflexive Property of Congruence. An angle is congruent to itself.","model":"Reflexive Property of Congruence. An angle is congruent to itself.","expectedTerms":["Reflexive Property of Congruence"],"hint":"Say what the given relationship tells you. Then connect that action to a reason in the Reason Finder.","visual":"","visualText":""},{"id":"2-8-ac","prompt":"Name the property: if ∠A ≅ ∠B, then ∠B ≅ ∠A.","key":"Symmetric Property of Congruence. The order of the angle names is reversed.","model":"Symmetric Property of Congruence. The order of the angle names is reversed.","expectedTerms":["Symmetric Property of Congruence"],"hint":"Say what the given relationship tells you. Then connect that action to a reason in the Reason Finder.","visual":"","visualText":""},{"id":"2-8-u","prompt":"Name the property: if ∠A ≅ ∠B and ∠B ≅ ∠C, then ∠A ≅ ∠C.","key":"Transitive Property of Congruence. Both are linked through ∠B.","model":"Transitive Property of Congruence. Both are linked through ∠B.","expectedTerms":["Transitive Property of Congruence"],"hint":"Say what the given relationship tells you. Then connect that action to a reason in the Reason Finder.","visual":"","visualText":""},{"id":"2-8-v","prompt":"In an angle proof, m∠1 + 40 = 180 becomes m∠1 = 140. Name the property and explain the action.","key":"Subtraction Property of Equality. Subtract 40 from both sides, then simplify.","model":"Subtraction Property of Equality. Subtract 40 from both sides, then simplify.","expectedTerms":["Subtraction Property of Equality"],"hint":"Say what the given relationship tells you. Then connect that action to a reason in the Reason Finder.","visual":"","visualText":""}]);
})();
