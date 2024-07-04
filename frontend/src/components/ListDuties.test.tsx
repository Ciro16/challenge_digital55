import { render } from '@testing-library/react';
import { describe, test } from 'vitest'
import ListDuties from './ListDuties';

describe('<ListDuties />', () => {
  test('ListDuties Component render correctly', () => {
    const { asFragment } = render(<ListDuties />);
    expect(asFragment()).toMatchSnapshot();
  })
})
