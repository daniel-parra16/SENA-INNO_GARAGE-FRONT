import { AlertTriangle, MoreHorizontal } from 'lucide-react';
import styles from './AlertsTable.module.css';

export default function AlertsTable() {
  const alerts = [
    {
      id: 1,
      vehicle: '2021 Tesla Model 3',
      plate: 'ABC-1234',
      color: 'Blue',
      service: 'Battery Replacement',
      delay: '2 days late',
      status: 'Awaiting Parts',
      statusColor: 'warning'
    },
    {
      id: 2,
      vehicle: '2019 Ford F-150',
      plate: 'XYZ-9876',
      color: 'Silver',
      service: 'Transmission Flush',
      delay: '4 hours late',
      status: 'In Progress',
      statusColor: 'info'
    },
    {
      id: 3,
      vehicle: '2023 BMW X5',
      plate: 'LUX-7777',
      color: 'Black',
      service: 'Annual Inspection',
      delay: '1 day late',
      status: 'Hold - Customer',
      statusColor: 'neutral'
    }
  ];

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <AlertTriangle color="var(--error-color)" size={20} />
          <h2 className={styles.title}>Recent Alerts - Delayed Repairs</h2>
        </div>
        <button className={styles.viewAllBtn}>View All</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>VEHICLE</th>
              <th>SERVICE</th>
              <th>DELAY</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map(alert => (
              <tr key={alert.id}>
                <td>
                  <div className={styles.vehicleInfo}>
                    <span className={styles.vehicleName}>{alert.vehicle}</span>
                    <span className={styles.vehicleDetails}>{alert.plate} • {alert.color}</span>
                  </div>
                </td>
                <td className={styles.cellText}>{alert.service}</td>
                <td className={styles.delayText}>{alert.delay}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[alert.statusColor]}`}>
                    <span className={styles.statusDot}></span>
                    {alert.status}
                  </span>
                </td>
                <td>
                  <button className={styles.actionBtn}>
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}