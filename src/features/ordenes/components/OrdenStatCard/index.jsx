import styles from './OrdenStatCard.module.css';

export default function OrdenStatCard({ title, estados, getCount, onClickEstado }) {

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.list}>
        {estados.map((estado) => (
          <div key={estado} className={styles.item}>
            <span className={styles.estado}>
              {estado.replace(/_/g, ' ').toLowerCase()}
            </span>

            <button
              className={styles.countBtn}
              onClick={() => onClickEstado(estado)}
            >
              {getCount(estado)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}