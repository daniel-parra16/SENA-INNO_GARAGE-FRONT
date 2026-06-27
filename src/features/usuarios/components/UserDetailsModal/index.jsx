import { X } from 'lucide-react';
import styles from './UserDetailsModal.module.css';

const formatRole = (role) => role?.replace('ROLE_', '').toLowerCase().replace(/^./, (c) => c.toUpperCase());

const formatAddress = (address) => {
    if (!address) return 'Sin información';
    const parts = [address.tipoVia, address.numero, address.numeroSecundario, address.numeroTercero, address.complemento]
        .filter(Boolean);
    return parts.length > 0 ? parts.join(' ') : 'Sin información';
};

export default function UserDetailsModal({ isOpen, onClose, user }) {
    if (!isOpen || !user) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div>
                        <h2 className={styles.title}>Hoja de vida del usuario</h2>
                        <p className={styles.subtitle}>{user.nombre} {user.apellido}</p>
                    </div>
                    <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar detalles">
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.content}>
                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Datos personales</h3>
                        <div className={styles.grid}>
                            <div><span className={styles.label}>Nombre</span><p>{user.nombre} {user.apellido}</p></div>
                            <div><span className={styles.label}>Documento</span><p>{user.documento?.tipo} {user.documento?.numero}</p></div>
                            <div><span className={styles.label}>Correo</span><p>{user.correo}</p></div>
                            <div><span className={styles.label}>Teléfono</span><p>{user.telefono}</p></div>
                            <div><span className={styles.label}>Estado</span><p>{user.status ? 'Activo' : 'Inactivo'}</p></div>
                            <div><span className={styles.label}>Último acceso</span><p>{user.lastLogin || 'Sin registro'}</p></div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Roles</h3>
                        <div className={styles.badgeList}>
                            {(user.roles || []).map((role) => (
                                <span key={role} className={styles.badge}>{formatRole(role)}</span>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Dirección</h3>
                        <p>{formatAddress(user.direccion)}</p>
                    </section>

                    {(user.roles || []).includes('ROLE_MECANICO') && (
                        <section className={styles.section}>
                            <h3 className={styles.sectionTitle}>Información de mecánico</h3>
                            <div className={styles.grid}>
                                <div><span className={styles.label}>Especialidades</span><p>{(user.mecanicoPerfil?.especialidades || user.mecanico?.especialidades || []).join(', ') || 'Sin especialidades'}</p></div>
                                <div><span className={styles.label}>Años de experiencia</span><p>{user.mecanicoPerfil?.aniosExperiencia ?? user.mecanico?.aniosExperiencia ?? '0'}</p></div>
                                <div><span className={styles.label}>Disponible</span><p>{user.mecanicoPerfil?.disponible || user.mecanico?.disponible ? 'Sí' : 'No'}</p></div>
                                <div><span className={styles.label}>Creado por</span><p>{user.mecanicoPerfil?.creadoBy || 'No disponible'}</p></div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
