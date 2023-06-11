import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  createContext,
  useState,
  useMemo,
} from "react";

import { User, UserContextType } from "../src/Types/types";

export const UserContext = createContext<UserContextType | null>(null);

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState<User>();
  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      <Component {...pageProps} />;
    </UserContext.Provider>
  );
}
