const STORE = {
  '2020-09-27': {
    morning: {
      complete: true,
      prompts: [
        {
          prompt: `3 things I'm grateful for...`,
          responses: [
            'cats',
            'warm weather',
            'React.js'
          ],
        },
        {
          prompt: `3 things that will make today great...`,
          responses: [
            'take5',
            'talking to Mom and Dad on the phone',
            'a good workout'
          ],
        },
        {
          prompt: `My intention for today is...`,
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
          prompt: `3 great things that happened today were...`,
          responses: [
            null,
            null,
            null,
          ],
        },
        {
          prompt: `One thing I let go of today was...`,
          responses: [
            null,
          ],
        },
        {
          prompt: `I am excited about tomorrow because...`,
          responses: [
            null,
          ],
        },
      ],
    }
  },
  '2020-09-26': {
    morning: {
      complete: true,
      prompts: [
        {
          prompt: `3 things I'm grateful for...`,
          responses: [
            'cats',
            'warm weather',
            'React.js'
          ],
        },
        {
          prompt: `3 things that will make today great...`,
          responses: [
            'take5',
            'talking to Mom and Dad on the phone',
            'a good workout'
          ],
        },
        {
          prompt: `My intention for today is...`,
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
          prompt: `3 great things that happened today were...`,
          responses: [
            'I met a talking dog',
            'I ate a really great pear',
            'I went on a lovely walk',
          ],
        },
        {
          prompt: `One thing I let go of today was...`,
          responses: [
            'Obsessively tracking my Amazon packages',
          ],
        },
        {
          prompt: `I am excited about tomorrow because...`,
          responses: [
            'I get to see that talking dog again',
          ],
        },
      ],
    }
  },
  blank: {
    morning: {
      complete: false,
      prompts: [
        {
          prompt: `3 things I'm grateful for...`,
          responses: [
            null,
            null,
            null
          ],
        },
        {
          prompt: `3 things that will make today great...`,
          responses: [
            null,
            null,
            null
          ],
        },
        {
          prompt: `My intention for today is...`,
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
          prompt: `3 great things that happened today were...`,
          responses: [
            null,
            null,
            null,
          ],
        },
        {
          prompt: `One thing I let go of today was...`,
          responses: [
            null,
          ],
        },
        {
          prompt: `I am excited about tomorrow because...`,
          responses: [
            null,
          ],
        },
      ],
    }
  }
};

export default STORE;
