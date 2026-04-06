import React from 'react'
import styles from './categoryList.module.css'
import Image from 'next/image'
import Link from 'next/link'

// CategoryList là một component React hiển thị danh sách các thể loại phổ biến.*/

const getData = async () => {
  const res = await fetch("https://ccnlthd25-26-adqe.vercel.app/api/categories", {
    cache: "no-store" 
    });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const CategoryList = async() => {
  const data = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        { data?.map((item, index)=>(
          <Link 
            href={`/blog?cat=${item.slug}`}
            className={`${styles.category} ${styles[item.slug]}`}
            key={item._id || index}
          > 
          {item.img && (
            <Image 
              src ={item.img}
              alt="" 
              width={32}
              height={32}
              className={styles.image} 
            />
          )}
          {item.title}
        </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList
