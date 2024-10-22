"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

import Layout from "./Layout";
import CrudIndex from "../app/TodoList/CrudIndex";
//
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
//const newTodo: Todo | null = {id: 0, text: "", completed: false}
//
const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingTodoId, setDeletingTodoId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      getList();
    })()
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  /**
  *
  * @param
  *
  * @return
  */
  const getList = async function(){
    try {
      const result = await CrudIndex.getList();
      console.log(result);
      setTodos(result);
    } catch (e) {
      console.error(e);
    } 
  }

  const addTodo = async() => {
    if (newTodo.trim() !== '') {
      const newEntry = {
        id: Date.now(), title: newTodo, completed: false
      };
      const result = await CrudIndex.addItem(newEntry);
console.log(result);
      location.reload();
      //setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
      setIsAddDialogOpen(false);
    }
  };

  const updateTodo = async() => {
    if (editingTodo && editingTodo.text.trim() !== '') {
      let target = todos.filter((todo) => todo.id === editingTodo.id);
      //console.log(target);
      if(target.length > 0){
        //@ts-ignore
        target = editingTodo;
        //@ts-ignore
        target.title = target.text;
        console.log(target);
        let resulte = await CrudIndex.update(target);
        console.log(resulte);
        location.reload();
      } 
      //setTodos(todos.map(todo => todo.id === editingTodo.id ? editingTodo : todo));
      setIsEditDialogOpen(false);
      setEditingTodo(null);
    }
  };

  const deleteTodo = async (id: number | null) => {
    const result = await CrudIndex.delete(Number(id));
    //console.log(result);
    setTodos(todos.filter(todo => todo.id !== id));
    setIsDeleteDialogOpen(false);
    setDeletingTodoId(null);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  <Layout>
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4">TODO App</h1>
      
      <div className="mb-4">
        <Input
          type="text"
          placeholder="検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <Button onClick={() => setIsAddDialogOpen(true)} className="mb-4">
        新しいTODOを追加
      </Button>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between mb-2">
            <span
              className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <div>
              <Button onClick={() => { setEditingTodo(todo); setIsEditDialogOpen(true); }} className="mr-2">
                編集
              </Button>
              <Button onClick={() => { setDeletingTodoId(todo.id); setIsDeleteDialogOpen(true); }} variant="destructive">
                削除
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新しいTODOを追加</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="新しいTODOを入力..."
          />
          <DialogFooter>
            <Button onClick={addTodo}>追加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>TODOを編集</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={editingTodo?.text || ''}
            onChange={(e) => {
              //@ts-ignore
              setEditingTodo({ ...editingTodo, text: e.target.value })
             }
            }  
          />
          <DialogFooter>
            <Button onClick={updateTodo}>更新</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>TODOを削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteTodo(deletingTodoId)}>削除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>

  </Layout>
  );
};

export default TodoApp;
