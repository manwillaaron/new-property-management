import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import useInputs from '../../customHooks/useInputs';

const ExpenseInputs = props => {
  const [inputsObj, inputsArr, input] = useInputs('expense');
  function clg(){
      console.log(inputsObj)
  }
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
        <button onClick={()=>clg()}>submit</button>
    </div>
  );
};

export default withRouter(ExpenseInputs);
