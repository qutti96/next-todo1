import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { main } from "../route";

const prisma = new PrismaClient();

//idタスク取得API
export const GET = async(req:Request, res: NextResponse) => {
  try{
    const id: number = parseInt(req.url.split("/todos/")[1]);
    await main();
    const post = await prisma.post.findFirst({ where: {id} }); //http://localhost:3000/api/todos/3
    return NextResponse.json({message: "Success", post }, {status: 200});
  } catch(err) {
    return NextResponse.json({message: "Error", err }, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
};

//idタスク編集API
export const PUT = async(req:Request, res: NextResponse) => {
  try{
    const id: number = parseInt(req.url.split("/todos/")[1]);
    //情報を取得する
    const {content, filter} = await req.json();
    await main();
    const post = await prisma.post.update({
      data: { content, filter},
      where: {id}
    });
    return NextResponse.json({message: "Success", post }, {status: 200});
  } catch(err) {
    return NextResponse.json({message: "Error", err }, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
};

//idタスク削除用API
export const DELETE = async(req:Request, res: NextResponse) => {
  try{
    const id: number = parseInt(req.url.split("/todos/")[1]);
    await main();
    const post = await prisma.post.delete({
      where: {id}
    });
    return NextResponse.json({message: "Success", post }, {status: 200});
  } catch(err) {
    return NextResponse.json({message: "Error", err }, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
};
