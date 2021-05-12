import React from 'react'
import {render, screen, waitFor, fireEvent} from '@testing-library/react'
import SortableList from '../components/SortableList'
import { fetchData } from '../data/api'
import { COPY, FILTERS } from '../data/CONSTANTS'

/* PLEASE NOTE:
// I have been unable to find a solution to the 'act' error associated
// with subsequent state update calls within the useEffect hook.
// Essentially, React is complaining that there are updates within the
// app, which are missing assertions.
// Namely: setPrimaryDataGroup, setSecondaryDataGroup, setDataFields.
// 
// For now I have left this as is, tests passing, but with a warning.
// Further investigation is required to resolve this issue.
*/

// Setup sample data, returned to fetchData
const mockData = {
  'records': [
    {
      [FILTERS.primaryFilter]: 'VALUE'
    },
  ],
  'fields': [
    {
      [FILTERS.idKey]: [FILTERS.primaryFilter]
    }
  ]
}

// Setup jest mock for fetchData api calls
jest.mock('../data/api')

beforeEach(() => 
  // Mock API call to trigger successful render
  fetchData.mockResolvedValue(mockData)
)

afterEach(() =>
  // Reset Jest mocks for any future tests
  jest.resetAllMocks()
)

describe('SortableList component', () => {

  test('default state is loaded prior to useEffect logic', async () => {

    // Render the component
    render(<SortableList />)

    // Check default state exists
    expect(screen.getByText(`${COPY.loading}`)).toBeInTheDocument()

    // On resolve
    await waitFor(() => {
      // Check default state has been removed following data retrieval
      expect(screen.queryByText(`${COPY.loading}`)).not.toBeInTheDocument()
    })
  })

  test('check display once data is loaded via fetchData', async () => {

    // Render the component
    render(<SortableList />)

    // On resolve
    await waitFor(() => {
      // Check for api call
      expect(fetchData).toHaveBeenCalledTimes(1)
      // Check for button text
      expect(screen.getByText(`Sort by ${COPY.secondaryToggle}`)).toBeInTheDocument()
    })
  })

  test('check display when sort logic is toggled', async () => {

    // Render the component
    render(<SortableList />)

    // On resolve
    await waitFor(() => {
      // Check for api call
      expect(fetchData).toHaveBeenCalledTimes(1)
      
      // Click toggle button to update state
      fireEvent.click(screen.getByRole('button', {name: `Sort by ${COPY.secondaryToggle}`}))
      // Check for change in button text
      expect(screen.queryByText(`Sort by ${COPY.secondaryToggle}`)).not.toBeInTheDocument()
      expect(screen.getByRole('button', {name: `Sort by ${COPY.primaryToggle}`})).toBeInTheDocument()
      
      // Click toggle button to toggle state back to primaryFilter 
      fireEvent.click(screen.getByRole('button', {name: `Sort by ${COPY.primaryToggle}`}))
      // Check for change in button text
      expect(screen.queryByText(`Sort by ${COPY.primaryToggle}`)).not.toBeInTheDocument()
      expect(screen.queryByText(`${FILTERS.primaryFilter}`)).toBeInTheDocument()
      // Check text values
      expect(screen.getByRole('button', {name: `Sort by ${COPY.secondaryToggle}`})).toBeInTheDocument()
    })
  })

})