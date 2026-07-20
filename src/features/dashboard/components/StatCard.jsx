import styles from "../styles/dashboard.module.css";

export default function StatCard({
    title,
    value,
    icon,
    color = "#2563eb",
    description,
    onClick
}) {

    return (
        <div
            className={`${styles.card} ${styles.statCard} ${onClick ? styles.clickable : ""}`}
            onClick={onClick}
        >

            <div className={styles.statHeader}>

                <div>

                    <span className={styles.statTitle}>
                        {title}
                    </span>

                    {description && (
                        <p className={styles.statDescription}>
                            {description}
                        </p>
                    )}

                </div>

                {icon && (

                    <div
                        className={styles.statIcon}
                        style={{
                            color,
                            borderColor: color
                        }}
                    >

                        {icon}

                    </div>

                )}

            </div>

            <h2 className={styles.statValue}>

                {value}

            </h2>

        </div>
    );

}