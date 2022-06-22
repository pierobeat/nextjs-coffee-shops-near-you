import Link from 'next/link'
import { useRouter } from 'next/router'

export default function CoffeeStore() {
  const router = useRouter()

  // console.log(router);

  return (
    <div>
      <h1>Coffee Store</h1>
      <h2>{router.query.dynamic}</h2>
    </div>
  )
}