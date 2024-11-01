"use client";

import React from 'react'
import {useState} from 'react';
import Head from '../../components/Head'
//import LoadingBox from '../../components/LoadingBox'
// 
import { cn } from '@/lib/utils'; 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from 'date-fns';
import CrudIndex from './CrudIndex';
import Form from './Form'
//
let data: any[] = [];
let formData: any = {};
let form1typeCreate = 1; // 1: Create
let form1_id = 0;
let form1_radio1 = true;
let form1_radio2 = false;

//
export default function Page(){
  const [updatetime, setUpdatetime] = React.useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  //
  React.useEffect(() => {
    (async() => {
      initProc();
    })()
  }, []);
  //
  const initProc = function(){
    try {
      const date = new Date();
      console.log("date=", format(date, 'yyyy-MM-dd'));
      form1typeCreate = 1;
      formData.num1 = 0;
      formData.num2 = 0;
      formData.radio1 = true;
      formData.radio2 = false;
      formData.pub_date = format(date, 'yyyy-MM-dd');
      setUpdatetime(new Date().toString());
    } catch (e) {
      console.error(e);
    }
  }
  //
  return(
  <>
    <Head />
    <div className="container mx-auto my-2 px-8 bg-white list3_main_wrap">
      {(form1typeCreate === 1)?(
        <Form message={"Create"} 
        type_create={form1typeCreate} formData={formData} errors={errors} 
        form_id={0} />
      ):null}
      

    </div>  
  </>
  );
}
