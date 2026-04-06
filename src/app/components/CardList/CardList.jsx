import React from 'react'
import styles from './cardList.module.css'
import Pagination from '../Pagination/Pagination'
import Card from '../Card/Card'

const getData = async (page, cat) => {
  const res = await fetch(`https://ccnlthd25-26-adqe.vercel.app/api/posts?page=${page}&cat=${cat || ""}`, {
    cache: "no-store", 
    });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const CardList = async({page, cat}) => {
  
  const {posts, count} = await getData(page, cat);

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page-1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tin mới nhất</h1>
      <div className={styles.posts}>

        {posts?.map((item, index)=>(
          <Card item={item} key={item._id || index}/>
      ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext}/>
    </div>
  )
}

export default CardList
