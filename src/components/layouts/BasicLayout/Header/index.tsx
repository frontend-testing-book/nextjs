import { LinkButton } from "@/components/atoms/LinkButton";
import { useLoginUserInfoState } from "@/components/providers/LoginUserInfo";
import clsx from "clsx";
import { useRouter } from "next/router";
import { memo } from "react";
import { Heading } from "./Heading";
import { LoginUser } from "./LoginUser";
import { Nav } from "./Nav";
import styles from "./styles.module.css";
import { useDrawerMenu } from "./useDrawerMenu";

export const Header = memo(function HeaderBase() {
  const { value } = useLoginUserInfoState();
  const { menuRef, isOpen, handleCloseMenu, handleOpenMenu } = useDrawerMenu();
  const router = useRouter();
  return (
    <header className={styles.header}>
      <Heading />
      {value ? (
        <>
          <button
            aria-label="メニューを開く"
            aria-controls="drawer"
            aria-expanded={isOpen}
            className={styles.openMenu}
            onClick={handleOpenMenu}
          >
            <span />
          </button>
          <div
            id="drawer"
            ref={menuRef}
            className={clsx(styles.menu, isOpen && styles.isOpen)}
          >
            <Nav onCloseMenu={handleCloseMenu} />
            <LoginUser {...value} />
          </div>
        </>
      ) : (
        router.asPath !== "/login" && (
          <LinkButton href={"/login"}>ログイン</LinkButton>
        )
      )}
    </header>
  );
});
