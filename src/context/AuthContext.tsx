import { createContext, useState, useContext, ReactNode } from "react";
import { toast } from "sonner";


interface AuthState {
  token: string | null;
  user: any | null;
}

interface AuthContextProps extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setToken: (token: string | null) => void;
  setUser: (user: any | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("registered_users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const mockToken = "mock-jwt-token";
      setToken(mockToken);
      setUser(foundUser);
      localStorage.setItem("auth_token", mockToken);
      localStorage.setItem("auth_user", JSON.stringify(foundUser));
    } else {
      toast.error("Email atau password salah.");
      throw new Error("Invalid credentials");
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("registered_users") || "[]");
    const exists = users.find((u: any) => u.email === email);
    if (exists) {
      toast.error("Email sudah terdaftar.");
      throw new Error("Email already registered");
    }
    const newUser = { id: Date.now().toString(), name: fullName, email, password };
    users.push(newUser);
    localStorage.setItem("registered_users", JSON.stringify(users));
    toast.success("Registrasi berhasil.");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
