import React from 'react'
import styles from './Spinner.module.css'

const Spinner = ( {className=""} ) => {
  return (
      <div className={`${styles.skFoldingCube} ${className}`}>
          <div className={`${styles.skCube1} ${styles.skCube}`}></div>
          <div className={`${styles.skCube2} ${styles.skCube}`}></div>
          <div className={`${styles.skCube4} ${styles.skCube}`}></div>
          <div className={`${styles.skCube3} ${styles.skCube}`}></div>
      </div>
  );
}

export default Spinner