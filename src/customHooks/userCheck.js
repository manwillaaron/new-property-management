import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = (url, push, path) => {
  const [data, setData] = useState(url);
  const call = () => {
    axios
    .get('api/admin')
    .then(res => {
      setData(res.data);
      if (res.data.renterCheck === true && path === '/loading')
        return push('/renter');
      if (res.data.id && !res.data.renterCheck && path === '/loading')
        return push('/');
    })
    .catch(_ => push('/login'));
  }
  return [data, call];
};
