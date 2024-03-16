import React from 'react'
import { useState } from 'react'

export default function Player({initialName , symbol , isActive , onChange }) {
  const [isEditing , setIsEditing] = useState(false)
  const [playerName , setPlayerName] = useState(initialName)
  function handleEditClick() {
  //setIsEditing(!isEditing) every time depend on initial value in state 
    setIsEditing(editing => !editing) // latest available value in state 
    if (isEditing) {
      onChange(symbol , playerName);
      
      
    }
  }
  //make function handleChange to get value of input 
  function handleChange(e) {
    setPlayerName(e.target.value)
      
  }
  return (
    <li className={isActive ? 'active ': '' }>
    <span className="player">
   { isEditing ? <input type="text" required  Value={playerName} onChange={handleChange}/>    
  : <span className="player-name">{playerName}</span> 
  }
  
    <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick= {handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
  </li>
  )
}
