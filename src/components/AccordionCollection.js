import React from 'react'
import PropTypes from 'prop-types'
import './AccordionCollection.css'
import AccordionItem from './AccordionItem'

function AccordionCollection( { data = {}, fields = [] } ) {
  
  if (fields.length) {
    return (
      // Each Accordion contains one entry from our data
      <ul className="accordion-collection">
        {Object.entries(data).map(([key = '', value = []], index) =>
          (<AccordionItem
            key={key}
            groupIndex={index}
            groupKey={key}
            itemData={value}
            fields={fields} />)
        )}
      </ul>
    )
  }
  return null
}

AccordionCollection.propTypes = {
  data: PropTypes.object,
  fields: PropTypes.array
}

export default AccordionCollection