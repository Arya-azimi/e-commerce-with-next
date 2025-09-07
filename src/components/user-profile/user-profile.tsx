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
        buttonSubmit="ذخیره تغییرات" // متن مناسب
        submitButtonClass="bg-blue-600 hover:bg-blue-700" // استایل مناسب
      >
        <p className="mb-4">
          برای اعمال تغییرات، لطفا رمز عبور فعلی خود را وارد کنید:
        </p>
        <input
          className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="رمز عبور فعلی"
          type="password"
          value={modal.currentPassword}
          onChange={onPasswordChange}
        />
      </Modal>
    </>
  );
}
