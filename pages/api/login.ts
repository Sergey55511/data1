// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const user = await prisma.users.findMany({
      where: {
        login: req.body.login.toLowerCase(),
        password: req.body.password,
        activ: true
      },
    });
    console.log (user)
    console.dir(user, { depth: null });
    //   Cookies.set('myCookieName', 'some-value', {
    //     httpOnly: true // true by default
    // })
    if (user.length){
      res.status(200).json({
        message: "Вход выполнен",
      });
    } else{
      res.status(401).json({
        message: "Отказ в доступе",
      });
    }
    
  }
}
