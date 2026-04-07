import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export const SearchBar = ({
  placeholder = "Buscar...",
  value,
  onChange,
  className = '',
  variant = 'default' // 'default' o 'header'
}) => {
  return (
    <div className={`${styles.searchBar} ${styles[variant]} ${className}`}>
      <Search className={styles.searchIcon} size={18} />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};