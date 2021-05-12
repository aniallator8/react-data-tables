import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import AccordionItem from '../components/AccordionItem'

const groupIndex = 1
const groupKey = 'Group'
const fields = [
  'Field One',
  'Field Two'
]
const itemData = [
  {
    'Property': 'Value'
  }
]

describe('AccordionItem component', () => {

  test('renders component and passes props', () => {
    // Render the component
    const { container } = render(<AccordionItem
        groupIndex={groupIndex}
        groupKey={groupKey}
        fields={fields}
        data={itemData} />)

    // Check component loads
    expect(container).toBeInTheDocument()
    // Check props are passed down
    expect(screen.getByText(`${fields[0]}`)).toBeInTheDocument()
  })

  test('handles accordion header button appropriately', () => {
    // Render the component
    render(<AccordionItem
      groupIndex={groupIndex}
      groupKey={groupKey}
      fields={fields}
      data={itemData} />)

    // Check accordion content is not 'expanded' by default
    expect(screen.getByRole('button', {name: `Group`}))
      .toHaveAttribute('aria-expanded', 'false')
    // Fire button click event
    fireEvent.click(screen.getByRole('button', {name: `Group`}))
    // Check accordion has now expanded
    expect(screen.getByRole('button', {name: `Group`}))
      .toHaveAttribute('aria-expanded', 'true')
  })

})