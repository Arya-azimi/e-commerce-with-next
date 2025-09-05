import { useCallback } from "react";
import { useAuth, useConfirmModal, useProfileForm } from "@/hooks";

function useProfile() {
  const { user } = useAuth();
  const { isOpen, password, open, close, onPasswordChange } = useConfirmModal();

  const { form, onChange, updateUser } = useProfileForm({
    onSuccess: close,
  });

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (form.username || form.password) {
        open();
      }
    },
    [form, open]
  );

  const onConfirm = useCallback(async () => {
    await updateUser(password);
  }, [updateUser, password]);

  return {
    user,
    form,
    modal: { isOpen, currentPassword: password },
    onChange,
    onSubmit,
    onConfirm,
    onCloseModal: close,
    onPasswordChange,
  };
}

export { useProfile };
