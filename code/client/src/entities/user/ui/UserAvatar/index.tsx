import { getFirstChars } from '../../utils/getFirsrtChars';
import styles from './UserAvatar.module.css';
import type { UserType } from '../../model';

type Props = {
  user: UserType;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
};

export default function UserAvatar({
  user,
  size = 'medium',
  onClick = () => {},
  className = '',
}: Props) {
  const firstChars = getFirstChars(user.username);

  return (
    <div
      className={`${styles.avatar} ${styles[size]} ${className}`}
      onClick={onClick}
    >
      <span className={styles.initials}>{firstChars}</span>
    </div>
  );
}
