import React, { createContext, useCallback, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
interface AuthState {
  id: string;
  email: string;
  token: string;
}

interface AuthContextData {
  user?: AuthState
  setUserAuth(credentials: AuthState, userExistBoll?: boolean): Promise<void>;
  deleteUserAuth(): Promise<void>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<AuthState>();

  const setUserAuth = useCallback(async (user: AuthState, userExistBoll: boolean) => {

    if (userExistBoll) return setUser(user)

    await AsyncStorage.setItem('@boatTravel:user', JSON.stringify(user))

    setUser(user)

  }, [])
  const deleteUserAuth = useCallback(async () => {
    await AsyncStorage.removeItem('@boatTravel:user')

    setUser(undefined)
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUserAuth, deleteUserAuth }}>
      {children}
    </AuthContext.Provider>
  );

};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
export default AuthContext;