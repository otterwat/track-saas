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
      'Never ran in my life', 
      '1', 
      '2', 
      '3'
    ],
  },
  {
    id: 2,
    text: 'testing',
    options: [
      '0', 
      '1', 
      '2', 
      '3'
    ],
  },
  {
    id: 3,
    text: 'testing',
    options: [
      '0', 
      '1', 
      '2', 
      '3'
    ],
  },
];