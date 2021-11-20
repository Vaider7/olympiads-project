import React, {ReactNode} from 'react';
import {observer} from 'mobx-react';

@observer
export default class Olympiad extends React.Component {
  render (): ReactNode {
    return (
      <div>Хеллоу ворлд</div>
    );

  }
}