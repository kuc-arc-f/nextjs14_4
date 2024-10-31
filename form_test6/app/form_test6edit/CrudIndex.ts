import HttpCommon from '../../lib/HttpCommon';
//
const CrudIndex = {
  /**
   *
   * @param
   *
   * @return
   */
  getList :async function (): Promise<any>
  {
    try{
      const postItem = {
        userId: 0,
      }
      console.log(postItem); 
      const json = await HttpCommon.post(postItem, "/api/form1/get_list");
console.log(json);      
      let items: any[] = [];
      items = json.data;
//console.log(items);
      const out: any[] = [];
      items.forEach((row) => {
        row.text = row.title;
        out.push(row);
      });
      return out;
    } catch (e) {
      console.error(e);
      throw new Error("Error, getList");
    } 
  },  
  /**
   *
   * @param
   *
   * @return
   */
  addItem : async function(item: any) : Promise<any>
  {
    try{
      let ret = false;
console.log(item);
      const json = await HttpCommon.post(item, "/api/form1/create");
      //console.log(json);
      if (json.ret === 200) {
          ret = true;
      }
      return ret;
    } catch (e) {
      console.error("Error, addItem");
      console.error(e);
      throw new Error('Error , addItem');
    }
  },
    /**
   *
   * @param
   *
   * @return
   */
  delete : async function(id: number) : Promise<any>
  {
    try{
      let ret = false;
      const item = {id: id}
console.log(item);
      const json = await HttpCommon.post(item, "/api/form1/delete");
      //console.log(json);
      if (json.ret === 200) {
          ret = true;
      }
      return ret;
    } catch (e) {
      console.error("Error, delete");
      console.error(e);
      throw new Error('Error , delete');
    }
  },
  /**
  * 
  * @param
  *
  * @return
  */ 
  update:  async function(values: any) {
    try{
//console.log("#getList");
      let item  = values;     
      const json = await HttpCommon.post(item, "/api/form1/update");
      let items = json;
console.log(json);
      return items;
    } catch (e) {
      console.error(e);
    } 
  }, 
}

export default CrudIndex;
