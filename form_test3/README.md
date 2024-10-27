# form_test3

 Version: 0.9.1

 Author  :

 date    : 2024/10/26

 update  :

***

localStorage data save

* vercel example
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
        API_URI : "https://localhost",
    }, 
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};
export default nextConfig;
```


***