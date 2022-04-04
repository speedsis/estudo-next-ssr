import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    _id: string,
    isActive: boolean,
    picture: string,
    age: number,
    name: string,
    gender: string,
    company: string,
    email: string,
    phone: string,
    address: string
}


const url = 'https://my-json-server.typicode.com/speedsis/estudo-next-ssr/users'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData[]>
) {
  const { data } = await axios.get(url);
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  const body = req.body 
  console.log(body)

  res.status(200).send(data);
}


 
