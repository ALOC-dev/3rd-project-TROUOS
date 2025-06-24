This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# 이시대맛집(TROUOS)
- asdf
- asdf

## Features
- asdf
- asdf
## Tech Stack
- asdf
## Project Structure

```bash
│  
│  .env
│  .gitignore
│  dump.rdb
│  eslint.config.mjs
│  next-env.d.ts
│  next.config.ts
│  package-lock.json
│  package.json
│  postcss.config.mjs
│  README.md
│  tsconfig.json
│  
├─.next
├─node_modules        
├─prisma
│  │  schema.prisma
│  └─migrations
├─public  
└─src
    ├─app
    │  │  globals.css
    │  │  layout.tsx
    │  │  page.tsx
    │  │  providers.tsx
    │  ├─api
    │  │  ├─auth
    │  │  │  └─[...nextauth]
    │  │  │          route.ts       
    │  │  ├─login
    │  │  │      route.ts      
    │  │  ├─restaurants
    │  │  │      route.ts     
    │  │  ├─send-code
    │  │  │      route.ts     
    │  │  ├─sign-up
    │  │  │      route.ts   
    │  │  └─verify-code
    │  │          route.ts    
    │  └─[signup]
    │          layout.tsx
    │          page.tsx
    │          signup.module.css        
    ├─components
    │  ├─Filter
    │  │      DiningOption.tsx
    │  │      FilterSelector.tsx
    │  │      FoodCategory.tsx
    │  ├─Irumae
    │  │      Irumae.tsx   
    │  ├─KeywordBox
    │  │      KeywordBox.tsx
    │  ├─SearchBar
    │  │      SearchBar.tsx
    │  └─SubTitle
    │          SubTitle.tsx       
    ├─lib
    │      prisma.ts
    │      redis.ts
    └─types
            kakao.d.ts
            next-auth.d.ts
```

## Team Members
|Backend|Frontend|Frontend|Frontend|Frontend|
|:---:|:---:|:---:|:---:|:---:|
| 🐰 | 🦙 |👽 |🐧 |🐣 |
|이채우|최문기|백형우|정지윤|김연현|

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
