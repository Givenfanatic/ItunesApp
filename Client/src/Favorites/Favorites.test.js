import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Favorites from './Favorites';

describe('Favorites', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('should render "You do not currently have any favorites" when favorites array is empty', async () => {
    const { getByText } = render(<Favorites />);
    await waitFor(() => {
      expect(getByText('You do not currently have any favorites, got the search screen to add some!')).toBeInTheDocument();
    });
  });

  it('should render favorites when favorites array is not empty', async () => {
    const favoritesData = [
      {
        trackId: 1,
        url: 'example.com/image1.jpg',
        trackname: 'Track 1',
        Artist: 'Artist 1',
      },
      {
        trackId: 2,
        url: 'example.com/image2.jpg',
        trackname: 'Track 2',
        Artist: 'Artist 2',
      },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(favoritesData),
    });

    const { getByText, getAllByText, queryByText } = render(<Favorites />);

    await waitFor(() => {
      expect(queryByText('You do not currently have any favorites, got the search screen to add some!')).toBeNull();
      expect(getByText('Track 1')).toBeInTheDocument();
      expect(getByText('Track 2')).toBeInTheDocument();
      expect(getAllByText('Remove from Favorites')).toHaveLength(2);
    });
  });

  // Add more test cases as needed...
});
