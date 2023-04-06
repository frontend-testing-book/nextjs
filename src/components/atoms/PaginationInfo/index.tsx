import styles from "./styles.module.css";

export const PaginationInfo = ({
  start,
  end,
  hitCount,
}: {
  start: number;
  end: number;
  hitCount: number;
}) => {
  return (
    <section aria-label="現在表示中の一覧概要" className={styles.module}>
      <p>{`${hitCount}件中`}</p>
      <p role="presentation">/</p>
      <p>{`${start}〜${end}`}</p>
    </section>
  );
};
