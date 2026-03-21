import styles from './TechnicianList.module.css';

export default function TechnicianList() {
  const technicians = [
    {
      id: 1,
      name: 'Mark Stevens',
      status: 'ACTIVE',
      statusColor: 'active',
      progress: 85,
      avatarColor: '#dcfce7'
    },
    {
      id: 2,
      name: 'Jane Doe',
      status: 'BREAK',
      statusColor: 'break',
      progress: 40,
      avatarColor: '#d1fae5'
    },
    {
      id: 3,
      name: 'Robert King',
      status: 'ACTIVE',
      statusColor: 'active',
      progress: 70,
      avatarColor: '#ccfbf1'
    }
  ];

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Technician Availability</h3>
      <div className={styles.list}>
        {technicians.map(tech => (
          <div key={tech.id} className={styles.technicianItem}>
            <div 
              className={styles.avatar} 
              style={{ backgroundColor: tech.avatarColor }}
            >
              {/* placeholder avatar */}
            </div>
            <div className={styles.info}>
              <div className={styles.infoHeader}>
                <span className={styles.name}>{tech.name}</span>
                <span className={`${styles.status} ${styles[tech.statusColor]}`}>
                  {tech.status}
                </span>
              </div>
              <div className={styles.progressBarBg}>
                <div 
                  className={`${styles.progressBarFill} ${styles[tech.statusColor + 'Bg']}`} 
                  style={{ width: `${tech.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}