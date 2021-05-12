import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './AccordionItem.css'
import DataTable from './DataTable'
import { capitaliseString } from '../data/utils'

function AccordionItem({
    groupIndex = null,
    groupKey = '',
    itemData = [],
    fields = []
  }) {

  const [accordionOpen, setAccordionOpen] = useState(false)
  const [tableHeight, setTableHeight] = useState('0')
  const tableRef = useRef() // tableRef is used to get content height data for CSS transition

  const handleClick = (e) => {
    e.preventDefault()
    setTableHeight(accordionOpen ? 0 : `${tableRef.current.scrollHeight}px`)
    setAccordionOpen(!accordionOpen)
  }

  if (fields.length) {
    return (
      // Each AccordionItem contains a groupKey header and a table with all relevant itemData
      <li className={accordionOpen ? `open` : ``}>
        <button
          onClick={handleClick}
          aria-controls={`content-${groupIndex}`}
          aria-expanded={accordionOpen}
          id={`accordion-control-${groupIndex}`}>
          {capitaliseString(groupKey)}
        </button>
        <div
          ref={tableRef}
          style={{maxHeight:`${tableHeight}`}}
          className={`acc-item-content`}
          aria-hidden={!accordionOpen}
          id={`content-${groupIndex}`}>
          <DataTable fields={fields} itemData={itemData} />
        </div>
      </li>
    ) 
  }
  return null
}

AccordionItem.propTypes = {
  groupIndex: PropTypes.number,
  groupKey: PropTypes.string,
  itemData: PropTypes.array,
  fields: PropTypes.array
}

export default AccordionItem