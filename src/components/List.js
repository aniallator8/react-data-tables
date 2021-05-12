import React, { useState } from 'react'

function List(props) {
  const [list, setList] = useState(props.list)
  
  const changeOrder = (item, target) => {
    let newList = [...list]
    newList.splice(target, 1)
    newList.unshift(item)
    console.log({newList})
    return newList
  }

  const handleClick = (e, item, index) => {
    e.preventDefault()
    const newList = changeOrder(item, index)
    setList(newList)
  }

  return <div className="list">
    {list.map((item, index) => {
      return <li key={index} onClick={(e) => handleClick(e, item, index)}>{item}</li>
    })}
  </div>
}

export default List