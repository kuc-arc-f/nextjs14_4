//import {Link } from 'react-router-dom';
//
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
//
import ClientUtil from '../lib/ClientUtil';
import HttpCommon from "../lib/HttpCommon";
//
function Page() {
    //
  const procLogout = async function(){
    try {
      console.log("#procLogout");
      const json = await HttpCommon.post({}, "/api/user/logout");
      console.log(json);
      if(json.ret !== 200){
        alert("Error, Logout");
      }else{
        alert("OK, Logout");
        location.href = '/';
      }
    } catch (e) {
      console.error(e);
    } 
  }
  //
  return (
  <div className="navigate_wrap bg-green-100 py-0.5">
    <NavigationMenu className="">
      <NavigationMenuList>
        {/*  */}
        <NavigationMenuItem className="text-green-600 mx-2">
          <a href="/">home</a>
        </NavigationMenuItem>
        <NavigationMenuItem className="text-green-600 mx-2">
          <a href="/about">about</a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
  );
}
export default Page;
/*
*/