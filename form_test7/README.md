# form_test7

 Version: 0.9.1

 Author  :

 date    : 2024/10/31

 update  :

***

D1 database + form edit

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
