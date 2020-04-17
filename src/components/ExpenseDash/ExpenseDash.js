import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { getProperties } from '../../redux/propertiesReducer';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ExpenseDash(props) {
  const [dates, setDate] = useState({ start: formatDate(Date.now()-(1000*60*60*24)) , end: '' });
  const [property, setProperty] = useState(null);
  const [expenseList, setList] = useState([]);

  useEffect(() => {
    autoMonth({value:formatDate(Date.now()-(1000*60*60*24))})
    props.getProperties();
    axios.get('/api/current/expenses').then(res => setList([...res.data]))
  }, []);

  const setPropId = value => {
    axios.get(`/api/expenses/${value}`).then(res => {
      console.log(res.data);
      setList(res.data);
    });
    setProperty(value);
  };

  function appendLeadingZeroes(n) {
    if (n <= 9) {
      return '0' + n;
    }
    return n;
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  function autoMonth({ value }) {
    console.log(value, formatDate(Date.now()-(1000*60*60*24)))
    let monthChange = 1;
    let yearChange = 0;
    const dArr = value.split('-');
    if (+dArr[1] === 12) {
      monthChange = -11;
      yearChange = 1;
    }
    const month = appendLeadingZeroes(+dArr[1] + monthChange);
    const year = appendLeadingZeroes(+dArr[0] + yearChange);
    setDate(ps => {
      return {
        ...ps,
        start: value,
        end: `${year}-${month}-${dArr[2]}`
      };
    });
  }

  const startNum = +dates.start.split('-').join('');
  const endNum = +dates.end.split('-').join('');

  const filteredExpenses = expenseList.filter(ex => {
    console.log(dates.start)
    const exNum = +ex.transaction_date.split('-').join('');
    if (exNum > startNum && exNum < endNum) return true;
  });

  return (
    <div>
      <select onChange={e => setPropId(e.target.value)}>
        <option value="" defaultValue hidden>
          Choose Property
        </option>
        {props.properties.map((proper, i) => (
          <option
            key={proper.prop_id}
            value={proper.prop_id}
            placeholder="property name"
          >
            {proper.property_name}
          </option>
        ))}
      </select>
      <TextField
        id="date"
        type="date"
        label="Start date"
        defaultValue={formatDate(Date.now())}
        onChange={e => autoMonth(e.target)}
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        id="date"
        type="date"
        label="End date"
        onChange={e =>
          setDate({
            ...dates,
            end: e.target.value
          })
        }
        value={dates.end}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Link to="/input/expenses">add expense</Link>
      <div>
        {filteredExpenses.map(ex => (
          <div key={ex.id}>{ex.amount}</div>
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state.properties };
}

export default connect(mapStateToProps, { getProperties })(ExpenseDash);
