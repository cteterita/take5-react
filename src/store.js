const STORE = {
  '2020-09-27': {
    morning: {
      complete: true,
      prompts: [
        {
          prompt: '3 things I\'m grateful for...',
          promptId: 1,
          responses: [
            'cats',
            'warm weather',
            'React.js',
          ],
        },
        {
          prompt: '3 things that will make today great...',
          promptId: 2,
          responses: [
            'take5',
            'talking to Mom and Dad on the phone',
            'a good workout',
          ],
        },
        {
          prompt: 'My intention for today is...',
          promptId: 3,
          responses: [
            'focus',
          ],
        },
      ],
    },
    evening: {
      complete: false,
      prompts: [
        {
          prompt: '3 great things that happened today were...',
          promptId: 4,
          responses: [
            null,
            null,
            null,
          ],
        },
        {
          prompt: 'One thing I let go of today was...',
          promptId: 5,
          responses: [
            null,
          ],
        },
        {
          prompt: 'I am excited about tomorrow because...',
          promptId: 6,
          responses: [
            null,
          ],
        },
      ],
    },
  },
  '2020-09-26': {
    morning: {
      complete: true,
      prompts: [
        {
          prompt: '3 things I\'m grateful for...',
          promptId: 1,
          responses: [
            'cats',
            'warm weather',
            'React.js',
          ],
        },
        {
          prompt: '3 things that will make today great...',
          promptId: 2,
          responses: [
            'take5',
            'talking to Mom and Dad on the phone',
            'a good workout',
          ],
        },
        {
          prompt: 'My intention for today is...',
          promptId: 3,
          responses: [
            'focus',
          ],
        },
      ],
    },
    evening: {
      complete: true,
      prompts: [
        {
          prompt: '3 great things that happened today were...',
          promptId: 4,
          responses: [
            'I met a talking dog',
            'I ate a really great pear',
            'I went on a lovely walk',
          ],
        },
        {
          prompt: 'One thing I let go of today was...',
          promptId: 5,
          responses: [
            'Obsessively tracking my Amazon packages',
          ],
        },
        {
          prompt: 'I am excited about tomorrow because...',
          promptId: 6,
          responses: [
            'I get to see that talking dog again',
          ],
        },
      ],
    },
  },
  blank: {
    morning: {
      complete: false,
      prompts: [
        {
          prompt: '3 things I\'m grateful for...',
          promptId: 1,
          responses: [
            null,
            null,
            null,
          ],
        },
        {
          prompt: '3 things that will make today great...',
          promptId: 2,
          responses: [
            null,
            null,
            null,
          ],
        },
        {
          prompt: 'My intention for today is...',
          promptId: 3,
          responses: [
            null,
          ],
        },
      ],
    },
    evening: {
      complete: false,
      prompts: [
        {
          prompt: '3 great things that happened today were...',
          promptId: 4,
          responses: [
            null,
            null,
            null,
          ],
        },
        {
          prompt: 'One thing I let go of today was...',
          promptId: 5,
          responses: [
            null,
          ],
        },
        {
          prompt: 'I am excited about tomorrow because...',
          promptId: 6,
          responses: [
            null,
          ],
        },
      ],
    },
  },
};

export default STORE;
