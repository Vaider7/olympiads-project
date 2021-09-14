import React, {ReactNode} from 'react';
import ErrorPage from '../components/shared/ErrorPage/ErrorPage';

export default class ErrorBoundary extends React.Component<{children: ReactNode}> {
  state = {hasError: false}

  static getDerivedStateFromError (): {hasError: boolean} {

    return {hasError: true};
  }

  render (): ReactNode {
    if (this.state.hasError) {
      return <ErrorPage />;
    }

    return this.props.children;
  }
}