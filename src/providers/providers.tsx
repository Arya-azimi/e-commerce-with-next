"use client";

import { ReactNode } from "react";
import {
  AuthProvider,
  CartProvider,
  NotificationProvider,
  WishlistProvider,
} from "@/context";
import { DataSync } from "@/components/data-sync";

interface AppProvidersProps {
  children: ReactNode;
}

function AppProviders({ children }: AppProvidersProps) {
  return (
    <NotificationProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <DataSync />
            {children}
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export { AppProviders };
