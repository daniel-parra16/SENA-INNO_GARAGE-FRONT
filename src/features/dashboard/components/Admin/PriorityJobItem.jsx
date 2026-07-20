import styles from "../../styles/dashboard.module.css";
export default function PriorityJobItem({ job }) {

    return (

        <tr>

            <td>

                <div className={styles.vehicle}>

                    <strong>

                        {job.vehiculo}

                    </strong>

                    <span>

                        {job.placa}

                    </span>

                </div>

            </td>

            <td>

                {job.cliente}

            </td>

            <td>

                <span className={styles.estado}>

                    {job.estado}

                </span>

            </td>

            <td>

                <span className={styles.retraso}>

                    {job.retraso}

                </span>

            </td>

        </tr>

    );

}