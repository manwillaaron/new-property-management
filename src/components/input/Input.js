import React from 'react'

const Input = props => (
    <div>
    <input
      placeholder={props.input.text.split('_').join(' ')}
      className="property-inputs"
      value={props.input.val}
      onChange={e => props.handleChange(e)}
      name={props.input.text}
    />
  </div>
)

export default Input;