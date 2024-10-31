"use client";
import React, { useState, useEffect } from 'react';
import { z } from 'zod';


export const TodoSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, "タイトルは2文字以上で入力してください"),
  content: z.string().min(1, "内容を入力してください"),
  public: z.enum(["public", "private"]),
  food_orange: z.boolean(),
  food_apple: z.boolean(),
  food_banana: z.boolean(),
  food_melon: z.boolean(),
  food_grape: z.boolean(),
  pub_date1: z.string(),
  pub_date2: z.string(),
  pub_date3: z.string(),
  pub_date4: z.string(),
  pub_date5: z.string(),
  pub_date6: z.string(),
  qty1: z.string().min(1, "数量1を入力してください"),
  qty2: z.string().min(1, "数量2を入力してください"),
  qty3: z.string().min(1, "数量3を入力してください"),
  qty4: z.string().min(1, "数量4を入力してください"),
  qty5: z.string().min(1, "数量5を入力してください"),
  qty6: z.string().min(1, "数量6を入力してください"),
});
export type TodoType = z.infer<typeof TodoSchema>;

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 初期値の取得
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 値が変更されたときにlocalStorageを更新
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

// TodoApp.tsx
//import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
//import { Search } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { ArrowUpDown, Plus, Pencil, Trash2, Search } from 'lucide-react';
//
//import Head from '../components/Head';
//
const initialFormData: Omit<TodoType, 'id'> = {
  title: '',
  content: '',
  public: 'public',
  food_orange: true,
  food_apple: true,
  food_banana: true,
  food_melon: true,
  food_grape: true,
  pub_date1: '',
  pub_date2: '',
  pub_date3: '',
  pub_date4: '',
  pub_date5: '',
  pub_date6: '',
  qty1: '0',
  qty2: '0',
  qty3: '0',
  qty4: '0',
  qty5: '0',
  qty6: '0',
};

type ValidationErrors = {
  [key in keyof TodoType]?: string[];
};
const storageKey = "next14_4_form6";
let form1_id: number = 0;
//
const saveStorage = function(items){
  try{    
    localStorage.setItem(storageKey, JSON.stringify(items));
  } catch (error) {
    console.error(`Error setting localStorage:`, error);
  }
}
//
interface MyComponentProps {
  message: string;
  type_create: number;
  formData: any;
  errors: {};
  form_id: number;
}
//
const Compo: React.FC<MyComponentProps> = (props: any) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<TodoType | null>(null);
  const [formData, setFormData] = useState<Omit<TodoType, 'id'>>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
//console.log(props);
//console.log("type_create=", props.type_create);
//console.log("props.form_id=", props.form_id);

  //
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(storageKey);
      if(item) {
        const items = JSON.parse(item);
        console.log(JSON.parse(item));
        setTodos(items);
        if(props.type_create !== 1) {
          const searchParams = new URLSearchParams(window.location.search);
          const id = searchParams.get('id') || "";
          form1_id = Number(id);
          //console.log("useEffect.form1_id=", form1_id);
          //console.log(items);
          editOpen(form1_id, items);
        }else{
          setIsDialogOpen(true);
        }
      }
      //console.log(todos)
    } catch (error) {
      console.error('Failed :', error);
    }
  }, []);
  //
  const editOpen = function(id: number, items: any[])
  {
    console.log("#editOpen=", id);
    let target = items.filter((todo) => todo.id === id);
    if(target.length > 0){
      const row =  target[0];
      //console.log(row);
      handleEdit(row);
    }
  }
  //
  const validateForm = (): boolean => {
    try {
      TodoSchema.parse({ ...formData });
      setErrors({});
      return true;
    } catch (error) {
console.error(error);
      if (error instanceof z.ZodError) {
        const formattedErrors: ValidationErrors = {};
        error.errors.forEach((err) => {
          if (err.path) {
            const field = err.path[0] as keyof TodoType;
            if (!formattedErrors[field]) {
              formattedErrors[field] = [];
            }
            formattedErrors[field]?.push(err.message);
          }
        });
        setErrors(formattedErrors);
        
        const errorMessages = error.errors.map(err => err.message).join('\n');
        toast({
          title: "入力エラー",
          description: errorMessages,
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (): void => {
console.log("#handleSubmit.isEditMode=" , isEditMode);
    if (!validateForm()) return;

    if (isEditMode && currentTodo) {
      const out: any[] = [];
      const target = todos;
      target.forEach((item) => {
        //console.log(item)
        if(item.id === currentTodo.id){
          out.push(formData);
        }else{
          out.push(item);
        }
      });
      saveStorage(out);
      setTodos(out);
      toast({
        title: "更新完了",
        description: "TODOが正常に更新されました。",
      });
    } else {
      //@ts-ignore
      formData.id = Date.now();
      const target = todos;
      target.push(formData);
      //console.log(formData);
      saveStorage(target);
      location.reload();
      toast({
        title: "作成完了",
        description: "新しいTODOが作成されました。",
      });
    }
    location.href = "/form_test6";
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = (): void => {
    setFormData(initialFormData);
    setErrors({});
    setIsEditMode(false);
    setCurrentTodo(null);
  };

  const handleEdit = (todo: TodoType): void => {
    setIsEditMode(true);
    setCurrentTodo(todo);
    setFormData(todo);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number): void => {
    const confirmed = window.confirm('このTODOを削除してもよろしいですか？');
    if (confirmed) {
      setTodos(todos.filter(todo => todo.id !== id));
      toast({
        title: "削除完了",
        description: "TODOが削除されました。",
      });
    }
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
  <>
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Form6</h1>
      <hr className="my-2" />
      <div>
        <a href="/form_test6">
          <Button variant="outline" className="mx-2">Back
          </Button>
        </a>
        <Button onClick={() => setIsDialogOpen(true)}>
        {isEditMode ? 'TODO編集' : '新規TODO作成'}
        </Button>
      </div>

      <div className="mt-2 mb-4 flex items-center gap-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <hr />
          <DialogTrigger asChild>
            {/*
            <Button onClick={() => setIsDialogOpen(true)}>
            {isEditMode ? 'TODO編集' : '新規TODO作成'}
            </Button>
            */}
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'TODO編集' : '新規TODO作成'}</DialogTitle>
            </DialogHeader>
            {/* フォームの内容は変更なし */}
            <div className="grid gap-4">
              <div>
                <Label htmlFor="title">タイトル</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
                )}
              </div>

              <div>
                <Label htmlFor="content">内容</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className={errors.content ? 'border-red-500' : ''}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">{errors.content[0]}</p>
                )}
              </div>

              <div>
                <Label>公開設定</Label>
                <RadioGroup
                  name="public"
                  value={formData.public}
                  onValueChange={(value: "public" | "private") => 
                    setFormData(prev => ({ ...prev, public: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public">公開</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private">非公開</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>フルーツ選択</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['orange', 'apple', 'banana', 'melon', 'grape'].map((fruit) => (
                    <div key={fruit} className="flex items-center space-x-2">
                      <Checkbox
                        id={`food_${fruit}`}
                        name={`food_${fruit}`}
                        checked={formData[`food_${fruit as 'orange' | 'apple' | 'banana' | 'melon' | 'grape'}`]}
                        onCheckedChange={(checked: boolean) =>
                          setFormData(prev => ({ 
                            ...prev, 
                            [`food_${fruit}`]: checked 
                          }))
                        }
                      />
                      <Label htmlFor={`food_${fruit}`}>{fruit}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={`date${num}`}>
                    <Label htmlFor={`pub_date${num}`}>日付{num}</Label>
                    <Input
                      type="date"
                      id={`pub_date${num}`}
                      name={`pub_date${num}`}
                      value={formData[`pub_date${num as 1 | 2 | 3 | 4 | 5 | 6}`]}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={`qty${num}`}>
                    <Label htmlFor={`qty${num}`}>数量{num}</Label>
                    <Input
                      type="text"
                      id={`qty${num}`}
                      name={`qty${num}`}
                      value={formData[`qty${num as 1 | 2 | 3 | 4 | 5 | 6}`]}
                      onChange={handleInputChange}
                      className={errors[`qty${num}`] ? 'border-red-500' : ''}
                    />
                    {errors[`qty${num}`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[`qty${num}`]![0]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <Button onClick={handleSubmit}>
                {isEditMode ? '更新' : '作成'}
              </Button>
            </div>
            {/* ... 前のコードと同じ ... */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </>
  );
};

export default Compo;
