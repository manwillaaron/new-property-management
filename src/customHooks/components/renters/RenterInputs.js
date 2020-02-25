import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RenterInputs.css';
import { connect } from 'react-redux';
import { addRenter, editRenter } from '../../redux/renterReducer';
import useInputs from '../../customHooks/useInputs';

function RenterInputs(props) {
  const [prop_id] = useState(props.match.params.prop_id);
  const [inputsObj, inputsArr, input] = useInputs(
    'renter',
    props.match,
    props.properties
  );
  return (
    <div>
      {inputsArr.map(inp => (
        <input
          key={inp}
          placeholder={`${inp}`}
          name={`${inp}`}
          value={inputsObj[inp]}
          onChange={e => input(e.target)}
        />
      ))}
        <Link onClick={() => props.addRenter({ prop_id, ...inputsObj })} to={`/moreinfo/${prop_id}`}>Add</Link>
    </div>
  );
}

export default connect(null, {
  addRenter,
  editRenter
})(RenterInputs);
