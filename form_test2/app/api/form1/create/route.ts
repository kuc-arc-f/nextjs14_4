import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import data from "../data"
//
export async function POST(req: Request) {
  const retObj = {ret: 500, message:""};
  try{  
    const reqJson = await req.json();
    //console.log(data.items);
    //console.log(reqJson);
    const myUUID = uuidv4();
    reqJson.id = myUUID;
    data.items.push(reqJson);
    //console.log(data.items);
    retObj.ret = 200;
    //@ts-ignore
    retObj.data = data.items;
    return NextResponse.json(retObj);
  } catch (error) {
    console.error(error);
    return NextResponse.json(retObj);
  }
}
