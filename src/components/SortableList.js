import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { fetchData } from '../data/api'
import { COPY, FILTERS } from '../data/CONSTANTS'
import { groupBy, getFields } from '../data/utils'
import AccordionCollection from './AccordionCollection'
import './SortableList.css'

function SortableList({fetchDomain = ''}) {

  // Setup state
  const [fieldData, setFieldData] = useState([])
  const [primaryDataGroup, setPrimaryDataGroup] = useState(null)
  const [secondaryDataGroup, setSecondaryDataGroup] = useState(null)
  const [toggleActive, setToggleActive] = useState(false)

  // Handle toggle button logic
  const handleToggle = e => {
    e.preventDefault()
    setToggleActive(!toggleActive)
  }

  // API call for data on component load
  useEffect(() => {
    fetchData(fetchDomain).then(data => {
      // Group data by primaryFilter, intially
      const primaryFilterGroup = groupBy(FILTERS.primaryFilter);
      setPrimaryDataGroup(primaryFilterGroup(data.records))
      // Also, group data by secondaryFilter for alternate sorting
      const secondaryFilterGroup = groupBy(FILTERS.secondaryFilter);
      setSecondaryDataGroup(secondaryFilterGroup(data.records))
      // Save fields to state for table display
      const fields = getFields(data.fields, FILTERS.idKey)
      setFieldData(fields)
    })
  }, [fetchDomain])

  if (fieldData.length) {
    return <div className="sortable-list">
      <div className="list-title">
        <h1>{COPY.pageTitle}, sorted by {toggleActive ? COPY.secondaryToggle : COPY.primaryToggle}</h1>
        {/* Display toggle button for filter type */}
        <span>Options:</span>
        <button onClick={handleToggle}>
          Sort by {toggleActive ? COPY.primaryToggle : COPY.secondaryToggle}
        </button>
      </div>
      {/* Display Accordion collection component */}
      <AccordionCollection
        fields={fieldData}
        data={toggleActive
          ? secondaryDataGroup
          : primaryDataGroup} />
    </div>
  } else {
    return <div className="sortable-list">
      <h3>{COPY.loading}</h3>
    </div>
  }
}

SortableList.propTypes = {
  fetchDomain: PropTypes.string
}

export default SortableList