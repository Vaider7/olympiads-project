import React from 'react';
import {MobXProviderContext} from 'mobx-react';
import {IRouterStore} from '../stores/types';
import RouterStore from '../stores/RouterStore';
import {RouteComponentProps} from 'react-router';

interface IProps {
  pathToFile: string
}


class StoreWrapper extends React.Component<RouteComponentProps> {
  static contextType = MobXProviderContext;
  RouterStore: IRouterStore = this.context.RouterStore;

  componentDidMount () {
    this.updateStore();
  }

  componentDidUpdate () {
    this.updateStore();
  }

  updateStore () {
    this.RouterStore.setRoute(
      this.props.location,
      this.props.match,
      this.props.history
    );
  }
}