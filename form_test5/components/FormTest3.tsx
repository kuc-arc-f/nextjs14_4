"use client";
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

// zodスキーマの定義
const todoSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, "タイトルは2文字以上で入力してください"),
  content: z.string().min(1, "内容を入力してください"),
  public: z.enum(["public", "private"]),
  food_orange: z.boolean(),
  food_apple: z.boolean(),
  food_banana: z.boolean(),
  pub_date: z.string(),
  qty1: z.string().min(1, "数量1を入力してください"),
  qty2: z.string().min(1, "数量2を入力してください"),
  qty3: z.string().min(1, "数量3を入力してください"),
});

// TypeScriptの型定義
type TodoType = z.infer<typeof todoSchema>;
type ValidationErrors = {
  [K in keyof TodoType]?: string;
};

// LocalStorage関連の定数
//const LOCAL_STORAGE_KEY = 'todos';
const LOCAL_STORAGE_KEY = 'next14_4todos';

// LocalStorage操作用のユーティリティ関数
const saveToLocalStorage = (todos: TodoType[]) => {
  console.log(todos);
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadFromLocalStorage = (): TodoType[] => {
  try {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      console.log(parsedTodos)
      // バリデーションチェック
      return z.array(todoSchema).parse(parsedTodos);
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  return [];
};

const TodoApp = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  const [formData, setFormData] = useState<TodoType>({
    title: '',
    content: '',
    public: 'public',
    food_orange: false,
    food_apple: false,
    food_banana: false,
    pub_date: '',
    qty1: '',
    qty2: '',
    qty3: '',
  });

  // 初回レンダリング時にLocalStorageからデータを読み込む
  useEffect(() => {
    const loadedTodos = loadFromLocalStorage();
    setTodos(loadedTodos);
  }, []);

  // todosが更新されたらLocalStorageに保存
  useEffect(() => {
    saveToLocalStorage(todos);
  }, [todos]);

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      public: 'public',
      food_orange: false,
      food_apple: false,
      food_banana: false,
      pub_date: '',
      qty1: '',
      qty2: '',
      qty3: '',
    });
    setEditingTodo(null);
    setErrors({});
  };

  const validateForm = () => {
    try {
      todoSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof TodoType] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const newTodos = editingTodo
      ? todos.map(todo => todo.id === editingTodo.id ? { ...formData, id: todo.id } : todo)
      : [...todos, { ...formData, id: Date.now() }];

    setTodos(newTodos);
    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (todo: TodoType) => {
    setEditingTodo(todo);
    setFormData(todo);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">TODOリスト</h1>
          <p className="text-sm text-gray-600 mt-1">
            保存済みTODO: {todos.length}件
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              新規TODO作成
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingTodo ? 'TODO編集' : '新規TODO作成'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">タイトル</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <span className="text-sm text-red-500">{errors.title}</span>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="content">内容</Label>
                <Input
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className={errors.content ? "border-red-500" : ""}
                />
                {errors.content && (
                  <span className="text-sm text-red-500">{errors.content}</span>
                )}
              </div>

              <div className="grid gap-2">
                <Label>公開設定</Label>
                <RadioGroup
                  value={formData.public}
                  onValueChange={(value: "public" | "private") => 
                    setFormData({ ...formData, public: value })}
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

              <div className="grid gap-2">
                <Label>フルーツ選択</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.food_orange}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, food_orange: !!checked })}
                      id="orange"
                    />
                    <Label htmlFor="orange">オレンジ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.food_apple}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, food_apple: !!checked })}
                      id="apple"
                    />
                    <Label htmlFor="apple">りんご</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.food_banana}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, food_banana: !!checked })}
                      id="banana"
                    />
                    <Label htmlFor="banana">バナナ</Label>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pub_date">公開日</Label>
                <Input
                  type="date"
                  id="pub_date"
                  value={formData.pub_date}
                  onChange={(e) => setFormData({ ...formData, pub_date: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="qty1">数量1</Label>
                  <Input
                    id="qty1"
                    value={formData.qty1}
                    onChange={(e) => setFormData({ ...formData, qty1: e.target.value })}
                    className={errors.qty1 ? "border-red-500" : ""}
                  />
                  {errors.qty1 && (
                    <span className="text-sm text-red-500">{errors.qty1}</span>
                  )}
                </div>
                <div>
                  <Label htmlFor="qty2">数量2</Label>
                  <Input
                    id="qty2"
                    value={formData.qty2}
                    onChange={(e) => setFormData({ ...formData, qty2: e.target.value })}
                    className={errors.qty2 ? "border-red-500" : ""}
                  />
                  {errors.qty2 && (
                    <span className="text-sm text-red-500">{errors.qty2}</span>
                  )}
                </div>
                <div>
                  <Label htmlFor="qty3">数量3</Label>
                  <Input
                    id="qty3"
                    value={formData.qty3}
                    onChange={(e) => setFormData({ ...formData, qty3: e.target.value })}
                    className={errors.qty3 ? "border-red-500" : ""}
                  />
                  {errors.qty3 && (
                    <span className="text-sm text-red-500">{errors.qty3}</span>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit}>
                {editingTodo ? '更新' : '作成'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="TODOを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="space-y-4">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{todo.title}</h3>
                <p className="text-sm text-gray-600">{todo.content}</p>
                <div className="mt-2 text-sm">
                  <p>公開設定: {todo.public === 'public' ? '公開' : '非公開'}</p>
                  <p>公開日: {todo.pub_date}</p>
                  <p>
                    フルーツ: {[
                      todo.food_orange && 'オレンジ',
                      todo.food_apple && 'りんご',
                      todo.food_banana && 'バナナ'
                    ].filter(Boolean).join(', ') || 'なし'}
                  </p>
                  <p>数量: {todo.qty1}, {todo.qty2}, {todo.qty3}</p>
                </div>
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(todo)}
                >
                  編集
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => todo.id && handleDelete(todo.id)}
                >
                  削除
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
