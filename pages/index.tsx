import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';



const Home: NextPage = () => {
  return (
    <div className={styles.home__container}>
      <section className={styles.home__intro}>
        <img src="img/bcg.png" alt="todo-list" />
        <Button variant="contained">NEW TODO LIST</Button>
      </section>
      <section className={styles.home__lists}>
        <h1 className={styles.home__listsTitle}>TODO LISTS:</h1>
        <Button variant="outlined" className={styles.home__listsBtn}>List 1</Button>
        <Button variant="outlined" className={styles.home__listsBtn}>List 2</Button>
        <Button variant="outlined" className={styles.home__listsBtn}>List 3</Button>
      </section>
    </div>
  )
}

export default Home
