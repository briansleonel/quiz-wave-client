import styles from "./loader.module.css";

interface Props {
    style?: "black" | "indigo";
}

export default function Loader({ style }: Props) {
    return (
        <div className={styles.containerLoader}>
            <span
                className={`${styles.elementLoader} ${
                    style === "black" ? styles.elementLoaderBlack : ""
                } ${style === "indigo" ? styles.elementLoaderIndigo : ""}`}
            ></span>
            <span
                className={`${styles.elementLoader} ${
                    style === "black" ? styles.elementLoaderBlack : ""
                } ${style === "indigo" ? styles.elementLoaderIndigo : ""}`}
            ></span>
            <span
                className={`${styles.elementLoader} ${
                    style === "black" ? styles.elementLoaderBlack : ""
                } ${style === "indigo" ? styles.elementLoaderIndigo : ""}`}
            ></span>
            <span
                className={`${styles.elementLoader} ${
                    style === "black" ? styles.elementLoaderBlack : ""
                } ${style === "indigo" ? styles.elementLoaderIndigo : ""}`}
            ></span>
            <span
                className={`${styles.elementLoader} ${
                    style === "black" ? styles.elementLoaderBlack : ""
                } ${style === "indigo" ? styles.elementLoaderIndigo : ""}`}
            ></span>
        </div>
    );
}
