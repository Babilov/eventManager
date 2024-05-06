import axios from "axios";
import { constants } from "@/constants";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  return async (
    email: string,
    password: string,
    setError: (e: string) => void,
  ) => {
    try {
      const res = await axios.post(`${constants.API_URL}/auth/login`, {
        email,
        password,
      });
      const token = res.data.access_token;
      localStorage.setItem("token", token);
      return router.push("/profile");
    } catch (e: any) {
      setError(
        e.response?.data?.message || "Ошибка во время выполнения запроса",
      );
      console.log(e);
    }
  };
};
