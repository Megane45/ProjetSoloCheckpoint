import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const LoginContext = createContext();
export const useLogin = () => useContext(LoginContext);

export function LoginProvider({ children }) {
  const [user, setUser] = useState();

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
}
LoginProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
