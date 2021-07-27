import React from 'react';
import {MobXProviderContext} from 'mobx-react';
import {IRouterStore} from '../stores/types';
import {RouteComponentProps} from 'react-router';
import AsyncLoader from './LoadableComponents';

interface IProps {
  pathToFile: string
}


class StoreWrapper extends React.Component<RouteComponentProps & IProps> {
  static contextType = MobXProviderContext;
  RouterStore: IRouterStore = this.context.RouterStore;

  componentDidMount (): void {
    this.updateStore();
  }

  componentDidUpdate (): void {
    this.updateStore();
  }

  updateStore (): void {
    this.RouterStore.setRoute(
      this.props.location,
      this.props.match,
      this.props.history
    );
  }

  render (): React.ReactNode {
    return <AsyncLoader pathToPage={this.props.pathToFile} />;
  }
}

export default StoreWrapper;