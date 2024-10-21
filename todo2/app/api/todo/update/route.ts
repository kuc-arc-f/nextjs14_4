import { NextResponse } from "next/server";

//
export async function POST(req: Request) {
  try{  
    const reqJson = await req.json();
      const url = process.env.API_URI; 
      const path = "/test/update";	
console.log("path=", url + path);
      const body: any = JSON.stringify(reqJson);		
      const res = await fetch(url + path, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
//console.log(json);
    return NextResponse.json(json);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ret: 'NG', msg: 'sendPost_msg'});
  }
}
