"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from 'lucide-react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    public: 'public',
    food_orange: false,
    food_apple: false,
    food_banana: false,
    pub_date: '',
    qty1: '',
    qty2: '',
    qty3: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    if (editingTodo) {
      setTodos(todos.map(todo => 
        todo.id === editingTodo.id ? { ...formData, id: todo.id } : todo
      ));
    } else {
      setTodos([...todos, { ...formData, id: Date.now() }]);
    }
    resetForm();
    setIsOpen(false);
  };

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
      qty3: ''
    });
    setEditingTodo(null);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setFormData(todo);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search todos..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              Add New Todo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingTodo ? 'Edit Todo' : 'Add New Todo'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Input
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                />
              </div>
              <RadioGroup
                name="public"
                value={formData.public}
                onValueChange={(value) => setFormData(prev => ({ ...prev, public: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private">Private</Label>
                </div>
              </RadioGroup>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="food_orange"
                    name="food_orange"
                    checked={formData.food_orange}
                    onCheckedChange={(checked) =>{
                      //@ts-ignore
                      setFormData(prev => ({ ...prev, food_orange: checked }));
                    }}
                  />
                  <Label htmlFor="food_orange">Orange</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="food_apple"
                    name="food_apple"
                    checked={formData.food_apple}
                    onCheckedChange={(checked) =>{
                      //@ts-ignore
                      setFormData(prev => ({ ...prev, food_apple: checked }));
                    }}
                  />
                  <Label htmlFor="food_apple">Apple</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="food_banana"
                    name="food_banana"
                    checked={formData.food_banana}
                    onCheckedChange={(checked) => {
                      //@ts-ignore
                      setFormData(prev => ({ ...prev, food_banana: checked }))
                    }}
                  />
                  <Label htmlFor="food_banana">Banana</Label>
                </div>
              </div>
              <div>
                <Label htmlFor="pub_date">Publication Date</Label>
                <Input
                  type="date"
                  id="pub_date"
                  name="pub_date"
                  value={formData.pub_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="qty1">Quantity 1</Label>
                  <Input
                    type="text"
                    id="qty1"
                    name="qty1"
                    value={formData.qty1}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="qty2">Quantity 2</Label>
                  <Input
                    type="text"
                    id="qty2"
                    name="qty2"
                    value={formData.qty2}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="qty3">Quantity 3</Label>
                  <Input
                    type="text"
                    id="qty3"
                    name="qty3"
                    value={formData.qty3}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingTodo ? 'Update Todo' : 'Add Todo'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left font-medium">Title</th>
              <th className="px-4 py-2 text-left font-medium">Content</th>
              <th className="px-4 py-2 text-left font-medium">Status</th>
              <th className="px-4 py-2 text-left font-medium">Foods</th>
              <th className="px-4 py-2 text-left font-medium">Date</th>
              <th className="px-4 py-2 text-left font-medium">Quantities</th>
              <th className="px-4 py-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <tr key={todo.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{todo.title}</td>
                <td className="px-4 py-2">{todo.content}</td>
                <td className="px-4 py-2">{todo.public}</td>
                <td className="px-4 py-2">
                  {[
                    todo.food_orange && 'Orange',
                    todo.food_apple && 'Apple',
                    todo.food_banana && 'Banana'
                  ].filter(Boolean).join(', ')}
                </td>
                <td className="px-4 py-2">{todo.pub_date}</td>
                <td className="px-4 py-2">
                  {[todo.qty1, todo.qty2, todo.qty3].filter(Boolean).join(', ')}
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(todo)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoApp;
