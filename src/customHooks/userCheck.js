import useAxios from 'axios-hooks'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useCall =  url => {
  const [{ data, loading, error }, refetch] = useAxios(url)
  console.log(loading)
  if (loading) return 'Loading...'
  if (error) return 'Error!'
// console.log(data)
  if(data.id) return data
  else refetch()
};


