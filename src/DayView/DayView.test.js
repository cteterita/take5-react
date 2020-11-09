import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import DayView from './DayView';

const exampleProps = {
  match: {
    params: {
      date: '2021-01-01',
    },
  },
  history: {
    push: () => {},
  },
};

describe('DayView component', () => {
  it('renders without errors', () => {
    const { match, history } = exampleProps;
    const div = document.createElement('div');
    ReactDOM.render(<DayView match={match} history={history} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders as expected while loading', () => {
    const { match, history } = exampleProps;
    const tree = renderer.create(
      <DayView match={match} history={history} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
