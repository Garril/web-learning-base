import React from 'react';
import styles from './index.module.scss';
import { add } from '../../utils';

export function Header() {
  return <div className={styles.header}>
    Header {add(1,2)}
    <p className={styles.inner}>Inner</p>
  </div>
  /* 运行时class名做了hash处理，防止样式污染 */
}