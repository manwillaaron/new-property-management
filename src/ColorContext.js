import React from 'react'

 let colors = {
  blue: '#03619c',
  yellow: '#8c8f03',
  red: '#9c0312',
  change: (c) => {
      colors.red = c
  }
};

const ColorContext = React.createContext(colors);
export default ColorContext
