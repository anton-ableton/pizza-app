import axiosInstance from "./axiosInstance";

export const requestOtp = (phone: string) => {
  return axiosInstance.post("/auth/otp", { phone });
};

export const signIn = (phone: string, code: number) => {
  return axiosInstance.post("/users/signin", { phone, code });
};

export const getSession = () => {
  return axiosInstance.get("/users/session");
};

export const updateProfile = (phone: string, profile: {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  city: string;
}) => {
  return axiosInstance.patch("/users/profile", {
    phone,
    profile,
  });
};