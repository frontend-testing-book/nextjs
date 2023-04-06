import GitHub from "./assets/github.svg";
import Twitter from "./assets/twitter.svg";
import styles from "./styles.module.css";

type Props = {
  githubAccount?: string;
  twitterAccount?: string;
};

export const Accounts = (props: Props) => {
  return (
    <div className={styles.accounts}>
      {props.githubAccount && (
        <p className={styles.github}>
          <a
            href={`https://github.com/${props.githubAccount}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub /> <span>{props.githubAccount}</span>
          </a>
        </p>
      )}
      {props.twitterAccount && (
        <p className={styles.twitter}>
          <a
            href={`https://twitter.com/${props.twitterAccount}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter /> <span>{props.twitterAccount}</span>
          </a>
        </p>
      )}
    </div>
  );
};
