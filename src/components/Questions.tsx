export type Question = {
  id: number;
  text: string;
  options: string[];
};

export const questions: Question[] = [
  {
    id: 1,
    text: 'What level of running experience do you have?',
    options: [
      `I've never ran in my life`, 
      `I've run a few times`, 
      `I'm a regular runner`, 
      `I'm an experienced runner`
    ],
  },

  {
    id: 2,
    text: 'How often do you run per week?',
    options: [
      `Never in my life`, 
      `1-2 times per week`, 
      `3 times per week`, 
      `4+ times per week`
    ],
  },

  {
    id: 3,
    text: 'Do you run casually or competitively?',
    options: [
      `Casually`, 
      `Competitively`, 
      `Both`, 
      `Neither`
    ],
  },

  {
    id: 4,
    text: 'What is your primary goal for running?',
    options: [
      `To stay fit and healthy or lose weight`, 
      `To compete in races`, 
      `To enjoy a hobby or social activity`, 
      `To hit a goal speed, distance, or personal best`
    ],
  },

  {
    id: 5,
    text: 'What is your preferred running distance?',
    options: [
      `Midpace track (400m, 800m, 1600m)`,
      `Cross Country (5km, 10km)`,
      `Marathons and ultra-marathons`,
      `I'm not sure yet`
    ]
  }
];