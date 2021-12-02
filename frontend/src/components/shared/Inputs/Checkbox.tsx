import React from 'react';

import {Checkbox as MUICheckbox, CheckboxProps, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  checked: {
    color: '#00A5F7 !important',
    '&:hover': {
      'background-color': 'rgb(0, 165, 247, 0.05)'
    }
  },
  colorSecondary: {
    '&:hover': {
      'background-color': 'rgb(0, 165, 247, 0.05) !important'
    }
  }
});

const Checkbox = (props: CheckboxProps): JSX.Element => {
  const classes = useStyles();

  return <MUICheckbox {...props} classes={{checked: classes.checked, colorSecondary: classes.colorSecondary}} />;
};

export default Checkbox;