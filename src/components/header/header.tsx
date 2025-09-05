"use client";

import { useState } from "react";
import { ShoppingCart, Modal, Wishlist } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate.push("/");
  };

  return (
    <>
      <header className="bg-white shadow h-[8vh] flex justify-between items-center">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            فروشگاه
          </Link>
          <nav className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 ml-4 hover:text-gray-900 transition-colors"
            >
              خانه
            </Link>
            <Link
              href="/products"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              محصولات
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  سلام، {user.username}
                </Link>
                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  خروج
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ورود
              </Link>
            )}
            <Wishlist />
            <ShoppingCart />
          </nav>
        </div>
      </header>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="خروج از حساب کاربری"
      >
        <p>آیا برای خروج از حساب کاربری خود مطمئن هستید؟</p>
      </Modal>
    </>
  );
}

export { Header };
