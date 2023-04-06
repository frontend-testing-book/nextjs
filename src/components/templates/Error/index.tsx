import { Err } from "@/lib/error";
import Caution from "./assets/caution.svg";
import styles from "./styles.module.css";

type Props = Err;

const messages = {
  400: { message: "不正なリクエストです" },
  401: { message: "ログインしてください" },
  404: { message: "ページが見つかりませんでした" },
  405: { message: "許可されていないリクエストです" },
  500: { message: "サーバーエラーが発生しました" },
};

export const Error = (props: Props) => {
  return (
    <div className={styles.module}>
      <Caution />
      <p>{messages[props.status].message}</p>
    </div>
  );
};
