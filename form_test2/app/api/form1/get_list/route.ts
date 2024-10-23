import { NextResponse } from "next/server";
import data from "../data"
//
export async function POST(req: Request) {
  const retObj = {ret: 500, message:""};
  try{  
    const reqJson = await req.json();
    retObj.ret = 200;
    //@ts-ignore
    retObj.data = data.items;
    return NextResponse.json(retObj);
  } catch (error) {
    console.error(error);
    return NextResponse.json(retObj);
  }
}
