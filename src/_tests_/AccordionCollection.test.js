import React from 'react'
import {render, screen} from '@testing-library/react'
import AccordionCollection from '../components/AccordionCollection'

const fields = [
  'Field One',
  'Field Two'
]
const data = {
  'Group': [
    {
      'Property': 'Value'
    }
  ]
}

describe('AccordionCollection component', () => {

  test('renders component and passes props', () => {
    // Render the component
    const { container } = render(<AccordionCollection
        fields={fields}
        data={data} />)

    // Check component loads
    expect(container).toBeInTheDocument()
    // Check props are passed down
    expect(screen.getByText(`${fields[0]}`)).toBeInTheDocument()
  })

})