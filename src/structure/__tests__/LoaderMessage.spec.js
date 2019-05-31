jest.useFakeTimers();

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LoaderMessage from '../LoaderMessage';

describe('LoaderMessage', () => {
  afterEach(cleanup);

  it('should render a loader message', () => {
    const { queryByText, rerender } = render(
      <LoaderMessage
        isLoading={true}
        doneMsg="Done loading"
        loadingMsg="Busy loading"
      />
    );

    expect(queryByText('Busy loading')).not.toBeInTheDocument();
    expect(queryByText('Done loading')).not.toBeInTheDocument();

    jest.runTimersToTime(400);

    expect(queryByText('Busy loading')).toBeInTheDocument();
    expect(queryByText('Done loading')).not.toBeInTheDocument();

    rerender(
      <LoaderMessage
        isLoading={false}
        doneMsg="Done loading"
        loadingMsg="Busy loading"
      />
    );

    expect(queryByText('Busy loading')).not.toBeInTheDocument();
    expect(queryByText('Done loading')).toBeInTheDocument();

    jest.advanceTimersByTime(300);

    expect(queryByText('Done loading')).not.toBeInTheDocument();
  });

  it('should have an assertive live region', () => {
    const { container } = render(
      <LoaderMessage
        isLoading={true}
        doneMsg="Done loading"
        loadingMsg="Busy loading"
      />
    );

    expect(container.firstChild).toHaveAttribute('aria-live', 'assertive');
    expect(container.firstChild).toHaveAttribute('aria-atomic', 'true');
  });

  it('should not set the done message if toggled from a null prop', () => {
    const { queryByText } = render(
      <LoaderMessage
        isLoading={null}
        doneMsg="Done loading"
        loadingMsg="Busy loading"
      />
    );

    expect(queryByText('Busy loading')).not.toBeInTheDocument();
    expect(queryByText('Done loading')).not.toBeInTheDocument();
  });
});
