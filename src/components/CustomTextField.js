import * as React from 'react';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields(props) {
    const {label,variant,onChange, error, helperText} = props
  return (
    
      <TextField onChange={onChange} label={label} variant={variant} error={error} helperText={helperText}/>
  );
}

