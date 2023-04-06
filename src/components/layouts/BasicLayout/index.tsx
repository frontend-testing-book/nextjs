import { AlertDialogProvider } from "@/components/organisms/AlertDialog";
import { LoginUserInfoProvider } from "@/components/providers/LoginUserInfo";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { ReactElement, ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./styles.module.css";

export const BasicLayoutProviders = ({ children }: { children: ReactNode }) => {
  return (
    <LoginUserInfoProvider>
      <ToastProvider>
        <AlertDialogProvider>{children}</AlertDialogProvider>
      </ToastProvider>
    </LoginUserInfoProvider>
  );
};

export const BasicLayout = (page: ReactElement) => {
  return (
    <BasicLayoutProviders>
      <div className={styles.root}>
        <Header />
        <main>{page}</main>
      </div>
      <Footer />
    </BasicLayoutProviders>
  );
};
