import { createContext, useContext } from 'react';

const CurrentUserContext = createContext();
CurrentUserContext.displayName = 'CurrentUserContext';

export const useCurrentUserContext = () => useContext(CurrentUserContext);

export default CurrentUserContext;
