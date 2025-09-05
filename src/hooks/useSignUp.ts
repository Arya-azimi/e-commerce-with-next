import { useAuth, useAuthForm, useNotification } from "./";
import { UI_MESSAGES, ERROR_MESSAGES } from "@/constants";
import { useRouter } from "next/router";

function useSignUp() {
  const { username, password, handleChange } = useAuthForm();
  const { signup } = useAuth();
  const navigate = useRouter();
  const { showNotification } = useNotification();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      try {
        await signup(username, password);
        showNotification(UI_MESSAGES.SIGNUP_SUCCESS, "success");
        navigate.push("/");
      } catch (error) {
        console.error("Sign up failed:", error);
        const errorMessage =
          error instanceof Error ? error.message : ERROR_MESSAGES.SIGNUP_FAILED;
        showNotification(errorMessage, "error");
      }
    }
  };

  return {
    username,
    password,
    handleChange,
    handleSignUp,
  };
}

export { useSignUp };
