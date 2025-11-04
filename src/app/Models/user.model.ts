export interface UserLogin {
  Username: string;
  Password: string;
}

export interface UserRegister {
  Username: string;
  Email: string;
  Password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    Id: number;
    Username: string;
    Email: string;
  };
}