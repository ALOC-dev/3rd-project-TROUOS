

# 🥘이시대맛집(TROUOS)
![image](https://github.com/user-attachments/assets/a4f40d2e-129d-416e-9568-f07996bf2c92)


**서울시립대학교 주변 음식점 정리 사이트**

## 📝Features

**메인 페이지**
![Image](https://github.com/user-attachments/assets/ae7c7b8f-ce8a-47f8-a5cd-f4a887b15721)

**회원가입 페이지**
![Image](https://github.com/user-attachments/assets/c281a580-4741-4e9c-83be-ebdb5007bdb4)

**음식점별 정보**

|||
|:---:|:---:|
|![image](https://github.com/user-attachments/assets/c2e2ad65-6e65-4697-88ac-c0ac812d58c7)|![image](https://github.com/user-attachments/assets/e293cfdc-a232-4305-8f8d-26fd42890231)|

## ⚙Tech Stack
|Next.js|AWS|MySQL|Redis|Github|
|:---:|:---:|:---:|:---:|:---:|
|![Image](https://github.com/user-attachments/assets/198b8159-4f44-4200-a074-8c63d80b5ae8) | ![Image](https://github.com/user-attachments/assets/c7734516-8b9b-4a63-b522-2751e9f19ab4) |![Image](https://github.com/user-attachments/assets/5b9b4365-0e66-45d1-8fad-4dd13ce4184d) |![Image](https://github.com/user-attachments/assets/051b5e00-c894-4533-a474-aac3ca47bbb0) |![Image](https://github.com/user-attachments/assets/20cd0de9-ee1b-46ba-9f84-0a3b7bd89c6c) |


## 🛠️Project Structure

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

## 💁‍♂️Team Members
|Backend|Frontend|Frontend|Frontend|Frontend|
|:---:|:---:|:---:|:---:|:---:|
| 🐰 | 🦙 |👽 |🐧 |🐣 |
|이채우|최문기|백형우|정지윤|김영현|

