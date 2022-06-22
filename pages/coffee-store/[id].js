import { useContext, useState, useEffect } from "react"
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import cls from 'classnames'
import { useRouter } from 'next/router'
import styles from '../../styles/coffee-store.module.css'

import coffeeStores from "../../data/coffee-stores.json"
import { fetchCoffeeStores } from "../../lib/coffee-stores"

import { StoreContext } from "../../store/store-context"

import { isEmpty } from "../../utils"

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log("params", params);

  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export default function CoffeeStore(initialProps) {
  const router = useRouter()

  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id; //dynamic id
        });
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id]);


  if(router.isFallback) {
    return <div>Loading...</div>
  }

  const {address, neighborhood, region, name, imgUrl} = coffeeStore

  console.log(coffeeStore);

  const handleUpvoteButton = () => {
    console.log("blablabla");
  }
  
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/" >
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image 
            src={imgUrl ||"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} 
            className={styles.storeImg} 
            width={600} 
            height={360} 
            alt={name} 
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          {address && (
              <div className={styles.iconWrapper}>
                <Image src="/assets/places.svg" width={24} height={24} />
                <p className={styles.text}>{address}</p>
              </div>
            )}
          {neighborhood ?  (
            <div className={styles.iconWrapper}>
              <Image src="/assets/nearMe.svg" width="24" height="24" />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          ) : (
            <div className={styles.iconWrapper}>
              <Image src="/assets/nearMe.svg" width="24" height="24" />
              <p className={styles.text}>{region}</p>
          </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/assets/star.svg" width={24} height={24} />
            <p className={styles.text}>1</p>
          </div>      
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up vote!</button>
        </div>
      </div>
    </div>
  )
}
