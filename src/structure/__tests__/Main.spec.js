import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Helmet from 'react-helmet';
import Main from '../Main';

describe('Main', () => {
  let oldScrollTo = null;

  beforeEach(() => {
    oldScrollTo = global.window.scrollTo;
    global.window.scrollTo = jest.fn();
  });

  afterEach(() => {
    cleanup();
    global.window.scrollTo = oldScrollTo;
  });

  it('should render with standard heading and set the title', () => {
    const { container } = render(
      <Main headingText="Demo heading" location={{}}>
        <p>Page content</p>
      </Main>
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(Helmet.peek().title).toEqual([
      'Demo heading',
      ' | Ultimate Ice Cream',
    ]);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should focus the heading if the state dictates', () => {
    const { container } = render(
      <Main headingText="Demo heading" location={{ state: { focus: true } }}>
        <p>Page content</p>
      </Main>
    );

    const heading = container.firstChild.querySelector('h2');

    expect(document.activeElement).toEqual(heading);
  });

  it('should not focus the heading if the state is absent', () => {
    const { container } = render(
      <Main headingText="Demo heading" location={{}}>
        <p>Page content</p>
      </Main>
    );

    const heading = container.firstChild.querySelector('h2');

    expect(document.activeElement).not.toEqual(heading);
  });

  it('It should allow for custom heading levels', () => {
    const { container } = render(
      <Main headingText="Demo heading" headingLevel="3" location={{}}>
        <p>Page content</p>
      </Main>
    );

    expect(container.firstChild.querySelector('h3')).toHaveTextContent(
      'Demo heading'
    );
  });
});
