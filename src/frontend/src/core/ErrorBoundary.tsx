import React, {ReactNode} from 'react';

class ErrorBoundary extends React.Component<{children: ReactNode}> {
  state = {hasError: false}

  static getDerivedStateFromError (): Record<string, unknown> {

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

export default ErrorBoundary;