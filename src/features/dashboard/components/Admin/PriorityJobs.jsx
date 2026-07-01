import PriorityJobItem from "./PriorityJobItem";

import styles from "../../styles/dashboard.module.css";

export default function PriorityJobs({ data }) {

    return (

        <div className={styles.container}>

            <h2>

                Trabajos Prioritarios

            </h2>

            <table className={styles.table}>

                <thead>

                    <tr>

                        <th>Vehículo</th>

                        <th>Cliente</th>

                        <th>Estado</th>

                        <th>Retraso</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        data.map(job => (

                            <PriorityJobItem

                                key={job.id}

                                job={job}

                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}