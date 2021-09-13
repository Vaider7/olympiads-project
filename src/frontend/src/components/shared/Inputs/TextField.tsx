import React from 'react';
import {TextField as MaterialTextField, makeStyles, TextFieldProps} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {color: '#00A5F7'},
    '& .MuiOutlinedInput-root': {
      '& fieldset': {borderColor: '#BFBFBF'},
      '&:hover fieldset': {borderColor: '#00A5F7'},
      '&.Mui-focused fieldset': {borderColor: '#00A5F7'}
    },
    '& .MuiInput-underline:after': {borderBottomColor: '#00A5F7'},
    '& .MuiInput-underline.Mui-error:after': {
      transform: 'scaleX(1)',
      borderBottomColor: '#f44336'
    },
    '& .Mui-error': {color: '#f44336 !important'}
  }
});

const TextField = (props: TextFieldProps): JSX.Element => {
  const classes = useStyles();

  return (
    <MaterialTextField
      classes={{root: classes.root}}
      {...props}
    />
  );

};

export default TextField;