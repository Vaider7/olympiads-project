import React from 'react';

import {Radio as MUIRadio, makeStyles, RadioProps} from '@material-ui/core';

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

const Radio = (props: RadioProps): JSX.Element => {
  const classes = useStyles();

  return <MUIRadio classes={{checked: classes.checked, colorSecondary: classes.colorSecondary}} {...props} />;
};

export default Radio;