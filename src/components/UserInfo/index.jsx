import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, login, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={login} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{login}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
