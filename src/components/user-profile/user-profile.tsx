"use client";

import { useProfile } from "@/hooks";
import { Modal } from "../modal";
import { DashboardForm } from "../dashboard-form";

export function UserProfile() {
  const {
    user,
    form,
    modal,
    onChange,
    onSubmit,
    onConfirm,
    onCloseModal,
    onPasswordChange,
  } = useProfile();

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <DashboardForm
          user={user}
          username={form.username}
          password={form.password}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={onCloseModal}
        onConfirm={onConfirm}
        title="تایید هویت"
        buttonSubmit="تایید"
      >
        <input
          className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md"
          placeholder="رمز عبور فعلی خود را وارد کنید"
          type="password"
          value={modal.currentPassword}
          onChange={onPasswordChange}
        />
      </Modal>
    </>
  );
}
