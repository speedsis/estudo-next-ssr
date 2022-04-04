import { Key, useEffect, useState } from 'react'

import { GetServerSideProps, NextPage } from 'next'
import { http } from '../utils/uttp'
import useSWR from 'swr'

type User = {
  name: string
}

type UserPageProps = {
  users: User[]
}

// const url = 'https://my-json-server.typicode.com/speedsis/estudo-next-ssr/users'

const fetcher = (url: string) => http.get(url).then((res) => res.data)

const Pagina1Page: NextPage<UserPageProps> = (props) => {
  const { users: usersProp } = props

  const { data: users, error } = useSWR('api/users', fetcher, {
    fallbackData: usersProp,
    // refreshInterval: 1000,
    shouldRetryOnError: true,
  })

  // *** modelo SPA ***//
  //   const [users, setUsers] = useState([])

  //   useEffect(() => {
  //     axios
  //       .get('http://127.0.0.1:3002/db.json')
  //       .then((response) => setUsers(response.data.users))
  //   }, [])

  return (
    <div>
      <h1>UsersPage</h1>
      <ul>
        {users.map((user: any, key) => (
          <li key={key}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Pagina1Page

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { data } = await axios.get('http://localhost:3002/db.json')

//   const users = data.users

//   return {
//     props: {
//       users,
//     },
//   }
// }

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await http.get('api/users')

  return {
    props: {
      users: data,
    },
  }
}
