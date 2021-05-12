import React from 'react'
import PropTypes from 'prop-types'
import { COPY } from '../data/CONSTANTS'
import './DataTable.css'

function DataTable( { fields = [], itemData = [] } ) {

  const headerContent = fields.map((item, index) =>
    (<th scope="col" key={`header-${index}`}>{item}</th>)
  )

  const tableContent = itemData.map((item, index) =>
    (<tr key={`row-${index}`}>
      {Object.entries(item)
        // Map entries to display all related contents
        .map(([key, value], index) =>
          // Return a <th> for the first row of each item.
          // Reference: https://webaim.org/techniques/tables/data#headers
          index > 0
            ? (<td key={`body-${index}`}>{value}</td>)
            : (<th scope="row" key={`body-${index}`}>{value}</th>)
        )
      }
    </tr>)
  )

  if (fields.length) {
    return (
      <table>
        <caption>{COPY.tableCaption}</caption>
        {fields &&
        <thead>
          <tr>
            {headerContent}
          </tr>
        </thead>
        }
        <tbody>
          {tableContent}
        </tbody>
      </table>
    ) 
  }
  return null
}

DataTable.propTypes = {
  itemData: PropTypes.array,
  fields: PropTypes.array
}

export default DataTable