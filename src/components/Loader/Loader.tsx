import styles from "./loader.module.css";

interface Props {
    style?: "black" | "indigo";
    className?: string;
}

export default function Loader({ style, className }: Props) {
    return (
        <div className={`${styles.containerLoader} ${className}`}>
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
