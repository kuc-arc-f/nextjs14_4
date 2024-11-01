"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TodoForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isPublic: 'public',
    foods: {
      orange: false,
      apple: false,
      banana: false,
      melon: false,
      grape: false
    },
    pubDates: ['', '', '', '', '', ''],
    quantities: ['', '', '', '', '', '']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // ここで送信処理を実装
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>新規 TODO 追加</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* タイトルと内容 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">タイトル</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="content">内容</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full"
              />
            </div>
          </div>

          {/* 公開設定 */}
          <div>
            <Label>公開設定</Label>
            <RadioGroup
              value={formData.isPublic}
              onValueChange={(value) => setFormData({...formData, isPublic: value})}
              className="flex space-x-4"
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

          {/* フード選択 */}
          <div className="space-y-2">
            <Label>フード選択</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries({
                orange: 'オレンジ',
                apple: 'リンゴ',
                banana: 'バナナ',
                melon: 'メロン',
                grape: 'ブドウ'
              }).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={formData.foods[key]}
                    onCheckedChange={(checked) => 
                      setFormData({
                        ...formData,
                        foods: {...formData.foods, [key]: checked}
                      })
                    }
                  />
                  <Label htmlFor={key}>{label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* 日付と数量 */}
          <div className="space-y-4">
            <Label>日付と数量</Label>
            <div className="grid gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="date"
                      value={formData.pubDates[index]}
                      onChange={(e) => {
                        const newDates = [...formData.pubDates];
                        newDates[index] = e.target.value;
                        setFormData({...formData, pubDates: newDates});
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="数量"
                      value={formData.quantities[index]}
                      onChange={(e) => {
                        const newQty = [...formData.quantities];
                        newQty[index] = e.target.value;
                        setFormData({...formData, quantities: newQty});
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            登録
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TodoForm;
