import * as React from 'react';

import * as style from './Index.scss';
import {ReactNode} from 'react';
import {observer, MobXProviderContext} from 'mobx-react';
import {Button} from '@material-ui/core';


@observer
export default class Index extends React.Component {
  static contextType = MobXProviderContext;

  render (): ReactNode {
    return (
      <Button>
        Hui
      </Button>
    );
  }
}