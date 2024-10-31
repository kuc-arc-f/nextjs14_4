"use client";
import Head from '../../components/Head'
import HeadLogin from '../../components/HeadLogin'

import ClientUtil from '../../lib/ClientUtil';
import HttpCommon from "../../lib/HttpCommon";
import LibCookie from '../../lib/LibCookie'
//
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
//
export default function Home() {
  //
  const procLogin = async function(){
    //location.reload();
    try {
      console.log("#cbFunc");
      const values = ClientUtil.getInputValue("form1"); 
      console.log(values);
      const json = await HttpCommon.post(values, "/api/user/login");
      console.log(json);
      if(json.ret !== 200){
        alert("Error, Login");
      }else{
        alert("OK");
        const key = process.env.APP_NAME + "_auth"
        const uid: string | undefined = process.env.AUTH_USER_ID;
        LibCookie.set_cookie(key, uid);
        location.href = '/';
      }
    } catch (e) {
      console.error(e);
    } 
  }
  const handleClick = () => {
    alert('Button clicked!');
  };
  //
  return (
  <div className="">
    <HeadLogin />
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px] my-4" id="form1">
        <CardHeader>
          <CardTitle className="text-4xl text-gray-700 font-bold my-2">
            Login
          </CardTitle>
          <hr className="my-2" />
          <CardDescription>email , password input please 
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email :</Label>
                <Input id="email" name="email" placeholder="" />
                <hr className="my-2" />
                <Label htmlFor="">Password :</Label>
                <Input type="password"
                id="password" name="password" placeholder="" />

              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="">
          <Button onClick={procLogin}
            className="w-full">GO</Button>
        </CardFooter>
      </Card>
    </div>

  </div>
  );
}
//