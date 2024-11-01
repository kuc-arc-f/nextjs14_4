import { NextResponse } from "next/server";

//
export async function POST(req: Request) {
  const retObj = {ret: 500, message : "", data: {} }
  try{  
    const reqJson = await req.json();
    const url = process.env.API_URI; 
    const path = "/api/ai_table1/update";	
console.log("path=", url + path);
    const body: any = JSON.stringify(reqJson);
    console.log(reqJson);
    //return NextResponse.json(retObj);		
    const res = await fetch(url + path, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},      
      body: body
    });
    const json = await res.json()
//console.log(json);
    retObj.ret = 200;
    return NextResponse.json(retObj);
  } catch (error) {
    console.error(error);
    return NextResponse.json(retObj);
  }
}
