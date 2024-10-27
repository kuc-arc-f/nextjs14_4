import { NextResponse } from "next/server";
import data from "../data";
//
export async function POST(req: Request) {
  const retObj = {ret: 500, message:""};
  try{  
    const reqJson = await req.json();
console.log(reqJson);
    const out: any[] = [];
    data.items.forEach((item) => {
      //console.log(item)
      if(item.id === reqJson.id){
        item = reqJson;
        out.push(item);
      }else{
        out.push(item);
      }
    });
    data.items = out;
    //console.log(data.items);
    retObj.ret = 200;
    return NextResponse.json(retObj);
//console.log(json);
  } catch (error) {
    console.error(error);
    return NextResponse.json(retObj);
  }
}
