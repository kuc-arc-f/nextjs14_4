"use client";

import React , {useState} from 'react';
import Head from '../../components/Head'
// 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from '@/lib/utils'; 
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CrudIndex from './CrudIndex';
import Form from '../form_test6create/Form'
//
let data: any[] = [];
let formData: any = {};
let form1typeCreate = 0; // 1: Create
let form1_id: number = 0;
let form1_radio1 = true;
let form1_radio2 = false;
//
export default function Page(){
  const [updatetime, setUpdatetime] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  //
  React.useEffect(() => {
    (async() => {
      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get('id') || "";
      form1_id = Number(id);
      //console.log("form1_id=", id);
      setUpdatetime(new Date().toString());
    })()
  }, []);
  //
  const getFormId = function(){
    return form1_id;
  }
  //
  return(
  <>
    <Head />
    <div className="container mx-auto my-2 px-8 bg-white list3_main_wrap">
      {(form1typeCreate !== 1)?(
        <Form message={`Edit`} 
        type_create={form1typeCreate} formData={formData} errors={errors} 
        form_id={form1_id} />
      ): null}
      <hr className="my-2" />

    </div>  
  </>
  );
}
