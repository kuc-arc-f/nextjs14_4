# todo2

 Version: 0.9.1

 Author  :

 date    : 2024/10/20

 update  :

***

d1 + shadcn/ui + Next.js

***
### workers + D1 database

https://github.com/kuc-arc-f/hono_34api

***
### Setup
* next.config.mjs

```
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        APP_NAME: "next14_4",
        API_URI : "https://localhost",
    }, 
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};
export default nextConfig;
```


***