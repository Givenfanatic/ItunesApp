import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';

//test the UI of the search form
describe('SearchForm', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<SearchForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
