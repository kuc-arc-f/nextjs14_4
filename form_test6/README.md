# form_test6

 Version: 0.9.1

 Author  :

 date    : 2024/10/30

 update  :

***

form edit example , localStorage data save

***
### Setup
* next.config.mjs

```
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        APP_NAME: "next14_4",
        AUTH_USER_MAIL:"test@example.com",
        AUTH_PASSWORD: "1234",
        AUTH_USER_ID: "1",
        NEXTAUTH_SECRET: "1234",
        API_URI : "https://localhost",
    }, 
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};
export default nextConfig;
```

***
### Prompt

```
コード生成して欲しいです。
TODO アプリ、shadcn/ui  Next.js 使用したいです。

項目は、下記を追加したい。
title: INPUTタグ type=text
content: INPUTタグ textarea
public(公開、非公開) INPUTタグ type=radio
food_orange: INPUTタグ type=checkbox
food_apple: INPUTタグ type=checkbox
food_banana:  INPUTタグ type=checkbox
food_melon:  INPUTタグ type=checkbox
food_grape:  INPUTタグ type=checkbox
pub_date1: INPUTタグ type=date
pub_date2: INPUTタグ type=date
pub_date3: INPUTタグ type=date
pub_date4: INPUTタグ type=date
pub_date5: INPUTタグ type=date
pub_date6: INPUTタグ type=date
qty1: INPUTタグ type=text
qty2: INPUTタグ type=text
qty3: INPUTタグ type=text
qty4: INPUTタグ type=text
qty5: INPUTタグ type=text
qty6: INPUTタグ type=text

・TODOの追加機能を、ダイアログで編集したいです。
・TODOの編集機能を、ダイアログで編集したいです。
・TODOの削除機能を、追加したいです。
・TODOの検索機能を、追加したいです。
```

***
```
コード生成して欲しいです。
TypeScriptで
TODO アプリ、バリデーション追加したい。react-hook-form未使用にしたい
npmは zod 使用したい

項目は、下記になります。
title: １文字以下は。エラー
content: 未入力は。エラー
qty1: 未入力は。エラー
qty2: 未入力は。エラー
qty3: 未入力は。エラー
qty4: 未入力は。エラー
qty5: 未入力は。エラー
qty6: 未入力は。エラー
```

***

```
コード生成して欲しいです。
上記の、
データを、 localStorageに保存してほしい
```
***