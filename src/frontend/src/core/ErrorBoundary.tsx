import React, {ReactNode} from 'react';

export default class ErrorBoundary extends React.Component<{children: ReactNode}> {
  state = {hasError: false}

  static getDerivedStateFromError (): {hasError: boolean} {

    return {hasError: true};
  }

  render (): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          Что-то пошло по пизде. Чекай консоль
        </div>
      );
    }

    return this.props.children;
  }
}