---
sidebar_position: 11
---

# 编写他人主页页面

他人主页页面在加载过程中会根据 url 中的参数 nick_name 来获取用户的 profile，如果不存在的话则渲染`NotFound`组件。

## 编写后端接口

根据上述分析，需要一个后端接口来根据 nick_name 获取 profile。在`pages/api`文件夹下创建新文件`get_detail.js`，填入以下代码：

```js
import { ironOptions } from '@/lib/iron';
import { createClient } from '@supabase/supabase-js';
import { withIronSessionApiRoute } from 'iron-session/next';
import { parse } from 'url';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


const handler = async (req, res) => {
  const { method, url } = req;
  const { query } = parse(url, true); // 解析查询参数

  switch (method) {
    case "GET":
      const nick_name = query.nick_name || ""; // 获取 nick_name 参数，如果没有则使用默认值
      const { data, error } = await supabase.from('users').select("*").eq('nick_name', nick_name);
      res.send(data)
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);

```

## 编写前端

### 编写 user 页面

首先先编写找不到用户的组件。在`components`文件夹下创建新文件`NotFound.jsx`，并填入以下代码：

```jsx title="NotFound.jsx"
import Link from "next/link";

export const NotFound = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-semibold mb-4">404 Not Found</h1>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          你进入了没有小猫的荒原哦
        </p>
        <Link href="/"  className="bg-blue-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-600">
            回到主页
        </Link>
      </div>
    </div>
  );
};
```

然后开始编写页面。在`app`文件夹下创建新文件夹`user`，在其中创建新文件夹`[nick_name]`，在其中创建新文件`page.jsx`，并填入以下代码：

```jsx
'use client'

import FooterApp from "@/components/FooterApp";
import HeaderApp from "@/components/HeaderApp";
import { Loader } from "@/components/Loader";
import { NotFound } from "@/components/NotFound";
import Profile from "@/components/Profile";
import React, { useEffect, useState } from "react";

const Dashboard = ({ params }) => {

    const [profile, setProfile] = useState(null);
    const [address, setAddress] = useState(`0x`);

    const fetchProfile = async(nick_name) => {
        try {
            const responce = await fetch(`/api/get_detail?nick_name=${nick_name}`, {
                method: 'GET',
                headers: {
                    Accepts: 'application/json'
                }
            });
            const data = (await responce.json());
            return data;
        }
        catch (e) {
            return {};
        }
    }

    useEffect(() => {
        async function getDetail() {
            const detailRes = await fetchProfile(params.nick_name);
            setProfile(detailRes);
        }
        getDetail();
    }, [profile])

    return (
        <div>
            <HeaderApp />
            {!!profile ? (
                profile.length == 0 ?
                <NotFound /> :
                <Profile
                profile={profile[0]}
                />
            ) : 
                <Loader />
            }
            <FooterApp />
        </div>
    )
}

export default Dashboard;
```

:::info

在 Next.js 中，用方括号扩住的文件夹用来表示动态路由，文件夹中的文件以下面的方式获取动态路由：

```jsx title="app/blog/[slug]/page.js"
export default function Page({ params }) {
  return <div>My Post: {params.slug}</div>
}
```



:::

至此，他人主页页面编写完毕。