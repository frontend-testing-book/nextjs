import Link from "next/link";
import { useRouter } from "next/router";
import { AnchorHTMLAttributes } from "react";
import styles from "./styles.module.css";

function isCurrent(flag: boolean): AnchorHTMLAttributes<HTMLAnchorElement> {
  if (!flag) return {};
  return { "aria-current": "page" };
}

type Props = { onCloseMenu: () => void };

export const Nav = ({ onCloseMenu }: Props) => {
  const { pathname } = useRouter();
  return (
    <nav aria-label="ナビゲーション" className={styles.nav}>
      <button
        aria-label="メニューを閉じる"
        className={styles.closeMenu}
        onClick={onCloseMenu}
      ></button>
      <ul className={styles.list}>
        <li>
          <Link href={`/my/posts`} legacyBehavior>
            <a
              {...isCurrent(
                pathname.startsWith("/my/posts") &&
                  pathname !== "/my/posts/create"
              )}
            >
              My Posts
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/my/posts/create`} legacyBehavior>
            <a {...isCurrent(pathname === "/my/posts/create")}>Create Post</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
