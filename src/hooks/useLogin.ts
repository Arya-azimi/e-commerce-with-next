import { useAuth, useAuthForm, useNotification } from "./";
import { UI_MESSAGES, ERROR_MESSAGES } from "@/constants";
import { useRouter } from "next/navigation";

function useLogin() {
  const { username, password, handleChange } = useAuthForm();
  const { login } = useAuth();
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      try {
        await login(username, password);
        showNotification(UI_MESSAGES.LOGIN_SUCCESS, "success");
        router.push("/");
      } catch (error) {
        console.error("Login failed:", error);
        const errorMessage =
          error instanceof Error ? error.message : ERROR_MESSAGES.LOGIN_FAILED;
        showNotification(errorMessage, "error");
      }
    }
  };

  return {
    username,
    password,
    handleChange,
    handleLogin,
  };
}

export { useLogin };
