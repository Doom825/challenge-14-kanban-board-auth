import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  username: string;
  exp: number;
}

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) return null;
    return jwtDecode<DecodedToken>(token);
  }

  loggedIn() {
    const token = this.getToken();
    return Boolean(token) && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    try {
      const { exp } = jwtDecode<DecodedToken>(token);
      // exp is in seconds since epoch
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem("id_token") || "";
  }

  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/"); // go to app’s home
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/login");
  }
}

export default new AuthService();
