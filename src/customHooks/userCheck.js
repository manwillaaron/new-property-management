import { useState } from 'react';
import axios from 'axios';

export const useAxios = (url, push, path) => {
  const [data, setData] = useState(url);
  const call = () => {
    axios
    .get('/api/admin')
    .then(res => {
      setData(res.data);
      if (res.data === true && path === '/loading')
        return push('/renter');
      if (!res.data && path === '/loading')
        return push('/');
    })
    .catch(() => push('/login'));
  }
  return [data, call];
};
