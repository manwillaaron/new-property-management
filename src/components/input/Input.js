import React from 'react'

const Input = props => (
    <div>
    <input
      placeholder={props.text.split('_').join(' ')}
      className="property-inputs"
      value={props.val}
      onChange={e => props.handleChange(e)}
      name={props.text}
    />
  </div>
)

export default Input;