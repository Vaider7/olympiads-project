import React from 'react';
import {Button as MaterialButton, makeStyles} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core/Button/Button';


const useStyles = makeStyles({
  root: {
    '&.MuiButton-outlined': {
      borderRadius: '100px',
      transitionProperty: 'color, background-color',
      textTransform: 'none',
      fontWeight: 400,
      fontSize: '14px',
      height: '56px',
      backgroundColor: '#00A5F7',
      color: '#fff',
      border: 'none',
      '&:hover, &:focus': {backgroundColor: '#0094f7'},
      '&.Mui-disabled': {
        color: '#595959',
        backgroundColor: '#E6E6E6'
      }
    }
  }
});

const Button = (props: ButtonProps): JSX.Element => {
  const classes = useStyles();

  return (
    <MaterialButton {...props} classes={{root: classes.root}}>
      {props.children}
    </MaterialButton>
  );
};

export default Button;