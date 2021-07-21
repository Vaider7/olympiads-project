import {MobXProviderContext, ProviderProps} from 'mobx-react';
import React, {ReactComponentElement, ReactElement, ReactNode} from 'react';

const Provider = (props: ProviderProps): JSX.Element => {
  const {
    children,
    ...stores
  } = props;

  return (
    <MobXProviderContext.Provider value={{
      ...React.useContext(MobXProviderContext),
      ...stores
    }}
    >
      {children}
    </MobXProviderContext.Provider>);
};

export default Provider;