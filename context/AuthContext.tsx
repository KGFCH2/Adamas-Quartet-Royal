
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { AuthService } from '../services/mockBackend';

interface AuthContextType extends AuthState {
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
  checkAuth: () => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  welcomeNotification: string | null;
  setWelcomeNotification: (msg: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [welcomeNotification, setWelcomeNotification] = useState<string | null>(null);

  const checkAuth = () => {
    const user = AuthService.getCurrentUser();
    setState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const { user, isFirstLogin } = await AuthService.login(email);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      if (isFirstLogin) {
        setWelcomeNotification(`Welcome Scroll dispatched from babinbid05@gmail.com to ${user.email}. Check your imperial registry!`);
      }
      setAuthModalOpen(false);
    } catch (error) {
      console.error(error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const register = async (name: string, email: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const { user, isFirstLogin } = await AuthService.register(name, email);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      if (isFirstLogin) {
        setWelcomeNotification(`Welcome Scroll dispatched from babinbid05@gmail.com to ${user.email}. Check your imperial registry!`);
      }
      setAuthModalOpen(false);
    } catch (error) {
      console.error(error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!state.user) return;
    try {
      const updatedUser = await AuthService.updateProfile(state.user.id, updates);
      setState(prev => ({ ...prev, user: updatedUser }));
    } catch (error) {
      console.error("Failed to update sovereign profile:", error);
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const deleteAccount = async () => {
    if (!state.user) return;
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await AuthService.deleteAccount(state.user.id);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      ...state, 
      login, 
      register, 
      updateProfile,
      logout, 
      deleteAccount, 
      checkAuth, 
      isAuthModalOpen, 
      setAuthModalOpen,
      welcomeNotification,
      setWelcomeNotification
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
