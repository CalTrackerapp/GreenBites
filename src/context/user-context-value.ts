import { createContext } from "react";
import type { UserContextValue } from "./user-context";

export const UserContext = createContext<UserContextValue | null>(null);

