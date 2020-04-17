import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import useInputs from '../../customHooks/useInputs';
import { connect } from 'react-redux';
import { getProperties } from '../../redux/propertiesReducer';
import axios from 'axios';
import './ExpenseInput.css';

const ExpenseInputs = props => {
  const [propertyName, setPropName] = useState('');
  const [yesOrNo, setForProperty] = useState('');
  const [updated, update] = useState(true);
  const [inputsObj, inputsArr, input] = useInputs(
    'expense',
    props.match,
    props.properties
  );
  const [toggleDropDown, setPropChoice] = useState(false);

  useEffect(() => {
    props.getProperties().then(_ => update(!updated));
  }, []);

  function handleProperty({ name, value }) {
    console.log(name, value);
    if (name === 'prop_id') {
      setPropName(value);
      const [foundProperty] = props.properties.filter(proper =>
        proper.property_name.toLowerCase().includes(value.toLowerCase())
      );
      console.log(foundProperty);

      input({ name, value: foundProperty.prop_id });
    } else if (name === 'for_property') {
      setForProperty(value);
      if (value.toLowerCase() === 'yes') {
        input({ name, value: true });
        setPropChoice(true);
      } else {
        setPropChoice(false);
        input({ name, value: false });
      }
    }
  }

  function submitExpense() {
    // const { store, amount, transaction_date, for_property } = inputsObj;
    console.log(inputsObj);
    axios
      .post(`/api/add/expense`, { ...inputsObj, property_name: propertyName })
      .then(_ => props.history.push('/dash/expense'))
      .catch(err => console.log({ err }));
  }

  return (
    <div id="inputs-page">
      <div id="inputs-container">
        {inputsArr.map(inp =>
          inp === 'for_property' ? (
            <div>
              <select
                key={inp}
                placeholder={``}
                name={`${inp}`}
                value={yesOrNo}
                onChange={e => handleProperty(e.target)}
                required
              >
                <option value="" disabled defaultValue hidden>
                  Bought for a property
                </option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          ) : inp === 'prop_id' && toggleDropDown ? (
            <div>
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
            </div>
          ) : (
            inp !== 'prop_id' && (
              <div>
                <input
                  className={inp === 'transaction_date' && 'date-picker'}
                  style={{ width: '150px' }}
                  key={inp}
                  type={
                    (inp === 'transaction_date' && 'date') ||
                    (inp === 'amount' && 'number')
                  }
                  min={inp === 'amount' && '1'}
                  step={inp === 'amount' && 'any'}
                  placeholder={`${inp.split('_').join(' ')}`}
                  name={`${inp}`}
                  value={inputsObj[inp]}
                  onChange={e => input(e.target)}
                />
              </div>
            )
          )
        )}
        <button onClick={() => submitExpense()}>submit</button>
      </div>
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
