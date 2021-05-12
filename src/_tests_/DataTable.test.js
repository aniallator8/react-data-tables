import React from 'react'
import {render, screen} from '@testing-library/react'
import DataTable from '../components/DataTable'

const fields = [
  'Field One',
  'Field Two'
]
const itemData = [
  {
    'Property1': 'Value1',
    'Property2': 'Value2',
  }
]

describe('DataTable component', () => {

  test('renders component and props', () => {
    // Render the component
    const { container } = render(<DataTable
        fields={fields}
        data={itemData} />)

    // Check component loads
    expect(container).toBeInTheDocument()
    // Check props are displayed correctly
    expect(screen.getByText(`${fields[0]}`)).toBeInTheDocument()
    expect(screen.getByText(`${fields[1]}`)).toBeInTheDocument()
  })

  test('renders props correctly without fields array', () => {
    // Render the component without fields
    render(<DataTable data={itemData} />)

    // Check props are displayed correctly
    expect(screen.queryByText(`${fields[0]}`)).not.toBeInTheDocument()
    expect(screen.queryByText(`${fields[1]}`)).not.toBeInTheDocument()
  })

})