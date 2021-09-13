import React, {ReactNode} from 'react';

export default class ErrorBoundary extends React.Component<{children: ReactNode}> {
  state = {hasError: false}

  static getDerivedStateFromError (): {hasError: boolean} {

    return {hasError: true};
  }

  render (): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          Произошла ошибка.
          Обновите странцицу или повторите попытку позднее
        </div>
      );
    }

    return this.props.children;
  }
}