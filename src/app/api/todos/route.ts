
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

    //データベース接続する関数
export async function main(){
  try{
    await prisma.$connect();
  } catch(err) {
    return Error("DB接続に失敗しました");
  } finally {
  }
}

//taskの全記事取得API
export const GET = async(req:Request, res: NextResponse) => {
  try{
    await main();
    //modelで設定したpost全件取得
    const posts = await prisma.post.findMany();
    return NextResponse.json({message: "Success", posts }, {status: 200});
  } catch(err) {
    return NextResponse.json({message: "Error", err }, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
};

//タスク投稿用API
export const POST = async(req:Request, res: NextResponse) => {
  try{
    const {content, filter} = await req.json();
    await main();
    const post = await prisma.post.create({data: {content, filter}});
    return NextResponse.json({message: "Success", post }, {status: 201});
  } catch(err) {
    return NextResponse.json({message: "Error", err }, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
};

