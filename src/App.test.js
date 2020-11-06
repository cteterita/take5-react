import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';

describe('App component', () => {
  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders as expected', () => {
    const tree = renderer.create(<BrowserRouter><App /></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
