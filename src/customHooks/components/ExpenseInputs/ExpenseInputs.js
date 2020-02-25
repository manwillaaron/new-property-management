import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import useInputs from '../../customHooks/useInputs';
import { connect } from 'react-redux';
import { getProperties } from '../../redux/propertiesReducer';
import axios from 'axios';

const ExpenseInputs = props => {
  const [propertyName, setPropName] = useState('');
  const [yesOrNo, setForProperty] = useState('');
  const [updated, update] = useState(false);
  const [inputsObj, inputsArr, input] = useInputs(
    'expense',
    props.match,
    props.properties
  );

  useEffect(() => {
    props.getProperties().then(_ => update(!updated));
  }, []);

  function handleProperty({ name, value }) {
    if (name === 'prop_id') {
      setPropName(value);
      const [foundProperty] = props.properties.filter(proper =>
        proper.property_name.toLowerCase().includes(value.toLowerCase())
      );
      input({ name, value: foundProperty.prop_id });
    } else if (name === 'for_property') {
      setForProperty(value);
      if (value === 'yes') {
        input({ name, value: true });
      } else {
        input({ name, value: false });
      }
    }
  }

  function submitExpense() {
    axios
      .post('/api/expense/add', inputsObj)
      .then(_ => props.history.push('/expenses'));
  }
  return (
    <div>
      {inputsArr.map(inp =>
        inp === 'for_property' ? (
          <select
            key={inp}
            placeholder={`${inp}`}
            name={`${inp}`}
            value={yesOrNo}
            onChange={e => input(e.target)}
            required
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        ) : inp === 'prop_id' ? (
          <select
            key={inp}
            name={`${inp}`}
            value={propertyName}
            onChange={e => handleProperty(e.target)}
            required
          >
            <option value="" disabled defaultValue hidden>
              Choose Property
            </option>
            {props.properties.map((proper, i) => (
              <option key={proper + i} placeholder="property name">
                {proper.property_name}
              </option>
            ))}
          </select>
        ) : (
          <input
            key={inp}
            placeholder={`${inp}`}
            name={`${inp}`}
            value={inputsObj[inp]}
            onChange={e => input(e.target)}
          />
        )
      )}
      <button onClick={() => submitExpense()}>submit</button>
    </div>
  );
};

function mapStateToProps(state) {
  return { ...state.properties };
}

export default withRouter(
  connect(mapStateToProps, {
    getProperties
  })(ExpenseInputs)
);
