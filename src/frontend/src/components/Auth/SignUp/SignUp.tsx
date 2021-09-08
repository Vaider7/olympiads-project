import React, {ReactNode} from 'react';
import {observer} from 'mobx-react';

@observer
export default class SignUp extends React.Component {

  render (): ReactNode {
    return 'It\'s SignUp page';
  }
}