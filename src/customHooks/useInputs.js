import { useEffect, useState } from 'react';

const useInputs = (formName, match, properties) => {
  const [inputsObj, setInput] = useState(
    match.path.includes('/propertyinput/')
      ? getProp()
      : obj[formName]
  );
  const [inputsArr, setArr] = useState([]);

  const input = ({ name, value }) => {
    console.log(name,  value)
    setInput({ ...inputsObj, [name]: value })};

  function getProp() {
    return properties.find(
      property => +match.params.prop_id === property.prop_id
    );
  }

  useEffect(() => createArr(), []);

  function createArr() {
    setInput(
      match.path.includes('/propertyinput/')
        ? getProp()
        : obj[formName]
    );
    let arr = [];
    for (let key in obj[formName]) {
      arr.push(key);
    }
    setArr([...arr]);
  }

  return [inputsObj, inputsArr, input];
};

export default useInputs;

var obj = {
  expense: { amount: '' },
  property: {
    address: '',
    num_beds: '',
    num_baths: '',
    square_footage: '',
    acreage: '',
    rent: '',
    gas_company: '',
    electric_company: '',
    has_renter: '',
    fridge_included: '',
    dishwasher_included: '',
    washer_dryer_included: '',
    mortgage: '',
    tax_yearly: '',
    img_url: '',
    img_url2: '',
    img_url3: '',
    img_url4: '',
    img_url5: '',
    property_name: ''
  },
  login: { username: '', password: '' },
  register: {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    email: ''
  },
  renter: {
    first_name: '',
    last_name: '',
    phone_number: '',
    email: ''
  }, 
  expense: { 
    store: '',
    amount: '',
    prop_id: '',
    transaction_date: '',
    for_property: true
  }
};

