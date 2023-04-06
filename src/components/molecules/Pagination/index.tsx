import { parseAsPositiveInt } from "@/lib/util";
import { PaginationProps } from "@/lib/util/pagination";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnchorHTMLAttributes } from "react";
import styles from "./styles.module.css";

function isCurrent(
  a: number,
  b: number
): AnchorHTMLAttributes<HTMLAnchorElement> {
  return {
    "aria-current": (a == 0 && b == 1) || a == b ? "page" : undefined,
  };
}

export const Pagination = ({
  pathname,
  pagination,
}: {
  pathname: string;
  pagination: PaginationProps;
}) => {
  const router = useRouter();
  const page = parseAsPositiveInt(router.query.page) || 0;
  if (!pagination) return null;
  return (
    <nav aria-label="ページネーション">
      <ul className={styles.pagination}>
        {pagination?.items.map((item, index) => (
          <li key={index}>
            {typeof item === "number" ? (
              <Link
                href={{ pathname, query: { ...router.query, page: item } }}
                legacyBehavior
              >
                {/* TODO: legacyBehavior 不要でも aria属性が適用できるようになれば a要素は削除する */}
                <a {...isCurrent(page, item)}>{item.toString()}</a>
              </Link>
            ) : (
              <span>{item.toString()}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
