import { render, screen } from '@testing-library/react';
import { describe, test } from 'vitest';
import CreateDuty from './CreateDuty';
import { Duty } from '../types/duty';

describe('<CreateDuty />', () => {
  test('CreateDuty component render correctly', () => {
    const duties: Duty[] = [
      {
        id: '1',
        name: "Clean the house"
      },
      {
        id: '2',
        name: "Do exercisee"
      },
    ];

    const setDuties = () => { };
    const notify = () => { };

    const { asFragment } = render(
      <CreateDuty duties={duties} setDuties={setDuties} notify={notify} />
    );

    const createButton = screen.getByText('Create Duty');
    createButton.click();

    expect(asFragment()).toMatchSnapshot();
  });
})
