import React from 'react'
import { Link } from 'gatsby'

import styles from './logo.module.css'

const LogoComponent = () => (
  <svg className={styles.container}>
    <circle className={styles.circle} cx="28.7" cy="29" r="27.3"/>
    <circle className={styles.circle} cx="28.7" cy="29" r="27.3"/>
    <circle className={styles.circle} cx="28.7" cy="29" r="27.3"/>
    <circle className={styles.circle} cx="28.7" cy="29" r="27.3"/>
    <path className={styles.letters} d="M38.4,24.6v14.2c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.3,0.3-0.6,0.3h-1.6c-0.3,0-0.6-0.1-0.6-0.3
      c-0.1-0.2-0.1-0.4-0.1-0.6V24.6H31c-0.4,0-0.6-0.1-0.7-0.2c-0.1-0.1-0.2-0.3-0.2-0.7v-1.1c0-0.2,0-0.4,0.1-0.6
      c0.1-0.2,0.3-0.3,0.6-0.3h12c0.3,0,0.6,0.1,0.6,0.3c0.1,0.2,0.1,0.4,0.1,0.6v1.1c0,0.4,0,0.6-0.1,0.7c-0.1,0.1-0.3,0.2-0.7,0.2H38.4
      "/>
    <path className={styles.letters} d="M18,22L18,22c-0.1-0.2-0.3-0.4-0.6-0.4h-1.7c-0.2,0-0.4,0.1-0.5,0.2C15,22,15,22.2,15,22.4l0,0.9
      l5.7,8.4c0.4,0.6,0.8,1.2,1.3,1.9c0.6,0.9,1.3,1.9,1.9,2.8c0.2,0.3,0.4,0.6,0.6,0.9l1.4,2.1c0.1,0.2,0.3,0.3,0.6,0.3H28
      c0.2,0,0.4-0.1,0.5-0.2c0.1-0.1,0.2-0.3,0.2-0.5v-0.8L18,22"/>
  </svg>
)


export default LogoComponent
