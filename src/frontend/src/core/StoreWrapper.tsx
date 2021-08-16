import React from 'react';
import {MobXProviderContext} from 'mobx-react';
import {IRouterStore, IStoreWrapperProps} from '../types';
import {RouteComponentProps} from 'react-router';
import AsyncLoader from './LoadableComponents';
import ErrorBoundary from './ErrorBoundary';


interface IStoreWrapper extends RouteComponentProps, IStoreWrapperProps {}

class StoreWrapper extends React.Component<IStoreWrapper> {
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
    return (
      <ErrorBoundary>
        <AsyncLoader pathToPage={this.props.pathToFile} />
      </ErrorBoundary>
    );
  }
}

export default StoreWrapper;