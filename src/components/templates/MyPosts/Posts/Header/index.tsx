import { SelectFilterOption } from "@/components/molecules/SelectFilterOption";
import { parseAsNonEmptyString } from "@/lib/util";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

const options = [
  { value: "all", label: "すべて" },
  { value: "public", label: "公開" },
  { value: "private", label: "下書き" },
];

export const Header = () => {
  const { query, push } = useRouter();
  const defaultValue = parseAsNonEmptyString(query.status) || "all";
  return (
    <header className={styles.header}>
      <h2 className={styles.heading}>投稿記事一覧</h2>
      <SelectFilterOption
        title="公開ステータス"
        options={options}
        selectProps={{
          defaultValue,
          onChange: (event) => {
            const status = event.target.value;
            push({ query: { ...query, status } });
          },
        }}
      />
    </header>
  );
};
