import {MobXProviderContext, ProviderProps} from 'mobx-react';
import React, {ReactElement} from 'react';

const Provider = (props: ProviderProps): ReactElement => {
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