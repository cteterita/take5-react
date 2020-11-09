import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import JournalEntry from './JournalEntry';

const exampleProps = {
  saveEntry: () => {},
  type: 'morning',
  entryData: {
    complete: true,
    prompts: [
      {
        prompt: 'Example prompt!',
        promptId: 1,
        responses: [
          'Example response 1',
          'Example response 2',
        ],
      },
    ],
  },
};

describe('JournalEntry component', () => {
  it('renders without errors', () => {
    const { saveEntry, type, entryData } = exampleProps;
    const div = document.createElement('div');
    ReactDOM.render(<JournalEntry saveEntry={saveEntry} type={type} entryData={entryData} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders as expected', () => {
    const { saveEntry, type, entryData } = exampleProps;
    const tree = renderer.create(
      <JournalEntry saveEntry={saveEntry} type={type} entryData={entryData} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
