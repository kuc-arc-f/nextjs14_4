import LibCookie from './LibCookie';
//
const LibLayout = {
  /**
   *
   * @param key: any
   *
   * @return
   */  
  startProc : async function() : Promise<any>
  {
    //console.log("#Layout.startProc");
    let ret = false;
    if(typeof(window) === "undefined"){
      return false;
    }
    const parsedUrl = new URL(window.location.href);
    if(
        !(parsedUrl.pathname === '/login' ||
        parsedUrl.pathname === '/user/create'
        )
    )
    {
    console.log("LibLayout.pathname=", parsedUrl.pathname);
      const key = process.env.APP_NAME + "_auth";
      const uid = LibCookie.get_cookie(key);
      //console.log(uid);
      if(!uid){
        location.href = '/login';
        return;
      }
    }
    return ret;
  }
}
//LibLayout.startProc();

export default LibLayout;