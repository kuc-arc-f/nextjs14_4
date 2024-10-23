import { NextResponse } from "next/server";

//
export async function POST(req: Request) {
  const retObj = {ret: 500, message: ""};
  try{  
    const reqJson = await req.json();
    //console.log(reqJson);
    const body: any = JSON.stringify(reqJson);	
console.log("AUTH_USER_MAIL= ", process.env.AUTH_USER_MAIL);
    if(process.env.AUTH_USER_MAIL === reqJson.email
      && process.env.AUTH_PASSWORD === reqJson.password
    ) {
      console.log("OK");
      const key = process.env.APP_NAME + "_auth"
      retObj.ret = 200;
      return NextResponse.json(retObj);
    }
//console.log(json);
    retObj.ret = 400;
    return NextResponse.json(retObj);
  } catch (error) {
    console.error(error);
    return NextResponse.json(retObj);
  }
}
