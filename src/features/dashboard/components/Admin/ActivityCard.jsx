import styles from "../../styles/dashboard.module.css";
export default function ActivityCard({

    title,

    value,

    icon,

    color

}) {

    return (

        <div className={styles.card}>

            <div
                className={styles.icon}
                style={{ color }}
            >
                {icon}
            </div>

            <div className={styles.info}>

                <h3>{value}</h3>

                <span>{title}</span>

            </div>

        </div>

    );

}