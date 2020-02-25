import React, { useEffect, useState } from 'react';
import './PropertyInputs.css';
import {
  editProperties,
  addProperty,
  getProperties
} from '../../redux/propertiesReducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import useInputs from '../../customHooks/useInputs';

const PropertyInputs = props => {
  const [editing, switchEdit] = useState(false);
  const [inputsObj, inputsArr, input] = useInputs(
    'property',
    props.match,
    props.properties
  );

  useEffect(() => {
    if (props.match.path === '/propertyinput/:prop_id') {
      switchEdit(pe => !pe);
    } else {
      switchEdit(false);
    }
    if (props.match.path === '/add/renter/propertyinputs/:prop_id') {
      switchEdit(false);
    }
    return () => {
      switchEdit(false);
    };
  }, []);
  return (
    <div>
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
      </div>
      <div>
        {editing ? (
          <button
            onClick={() => {
              props
                .editProperties(props.match.params.prop_id, {inputsObj})
                .then(() => props.history.goBack());
            }}
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => {
              console.log(inputsObj);
              props.addProperty(inputsObj);
            }}
          >
            <Link to={`/`}>Add</Link>
          </button>
        )}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ...state.properties
  };
}

export default connect(mapStateToProps, {
  editProperties,
  addProperty,
  getProperties
})(PropertyInputs);
