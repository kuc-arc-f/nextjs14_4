"use client";

import { useState, useEffect } from 'react';
import { z } from 'zod';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  FilterFn,
  GlobalFiltering,
  //GlobalFilterFn,
} from "@tanstack/react-table";

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

// TodoApp.tsx
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
import { toast } from "@/hooks/use-toast";
import { ArrowUpDown, Plus, Pencil, Trash2, Search } from 'lucide-react';
//
import Head from '@/components/Head';
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
const storageKey = "next14_4_form5";
//
// グローバル検索フィルター関数
//@ts-ignore
const fuzzyFilter: GlobalFilterFn<any> = (row, columnId, value, addMeta) => {
  const itemValue = row.getValue(columnId);
  if (itemValue == null) return false;
  
  const searchValue = value.toLowerCase();
  const itemString = String(itemValue).toLowerCase();
  
  return itemString.includes(searchValue);
};

//
const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<TodoType | null>(null);
  const [formData, setFormData] = useState<Omit<TodoType, 'id'>>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  //
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  //
  useEffect(() => {
    (async () => {
      const item = window.localStorage.getItem(storageKey);
      if(item) {
        const d = JSON.parse(item);
        console.log(JSON.parse(item));
        setTodos(d);
      }
    })()
  }, []);
  // TODOsが変更されたらLocalStorageに保存
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }, [todos]);

  // カラム定義
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const title: string = row.getValue("title");
        //@ts-ignore
        return <div className="font-medium">{title}</div>
      },
    },   
    {
      accessorKey: "action",
      header: ({ column }) => {
        return (<div className="text-center font-medium">Action</div>)
      },
      cell: ({ row }) => {
        const  payment= row.original;
        //flex gap-2 
        return (
        <div className="text-end">
          <Button variant="outline" size="icon"
          onClick={() => {
            console.log("id=", payment.id);
            console.log(payment);
            handleEdit(payment)
          }}><Pencil className="h-4 w-4" />
          </Button>      
          <Button className="mx-2"
            variant="destructive" size="icon"
            onClick={() => {
              console.log("id=", payment.id);
              handleDelete(payment.id);
            }}
          ><Trash2 className="h-4 w-4" />
          </Button>
        </div>
        )
      },
    },
  ];
  //
  const table = useReactTable({
    data: todos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: fuzzyFilter,
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
  });
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
console.log("#handleSubmit");
    if (!validateForm()) return;

    if (isEditMode && currentTodo) {
      setTodos(todos.map(todo => 
        todo.id === currentTodo.id ? { ...formData, id: todo.id } : todo
      ));
      toast({
        title: "更新完了",
        description: "TODOが正常に更新されました。",
      });
    } else {
      const newTodo = { ...formData, id: Date.now() };
      setTodos([...todos, newTodo]);
      toast({
        title: "作成完了",
        description: "新しいTODOが作成されました。",
      });
    }
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
      <h1 className="text-3xl font-bold">Form5</h1>
      <hr className="my-2" />
      {/* グローバル検索 */}
      <div className="flex-1 flex items-center gap-x-2">
        <Search className="h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search all columns..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="mt-2 mb-4 flex items-center gap-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>新規TODO</Button>
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


      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

    </div>
  </>
  );
};

export default TodoApp;
