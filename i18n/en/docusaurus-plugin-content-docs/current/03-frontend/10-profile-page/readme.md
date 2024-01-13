---
sidebar_position: 10
---

# 编写个人主页页面

在本小节中，我们会将上一小节中编写的个人主页的组件放进个人主页的页面中。

## 编写`Profile`组件

`<Profile />`组件接受一个参数`profile`，根据`profile`中的钱包地址与当前浏览器环境中的钱包地址是否一样返回不同的组件。

将宠物猫、宠物蛋、物品分别放在三个`<Tab />`中，宠物猫为默认显示的`<Tab />`。在`components`文件夹下创建`Profile.jsx`文件，填入以下代码：

```jsx title="Profile.jsx"
import React, { useEffect, useState } from 'react';
import { Avatar, Card, Layout } from 'antd';
import { ProfileImage } from './ProfileImage';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ProfileCover } from './ProfileCover';
import Link from 'next/link';
import EggCards from './EggCards';
import CatCards from './CatCards';
import { Stuff } from './Stuff';

const Profile = ({ profile }) => {
  const { address } = useAccount();

  const [activeTabKey, setActiveTabKey] = useState('iCat');
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const tabList = [
    {
      key: "Egg",
      label: "Egg"
    },
    {
      key: "iCat",
      label: "iCat"
    },
    address == profile?.address &&
    {
      key: "stuff",
      label: "物品"
    }
  ];
  const contentList = {
    iCat: <div className='flex justify-center lg:justify-start'>
            <CatCards address={profile?.address} />
          </div>,
    Egg: <div className='flex justify-center lg:justify-start'>
          <EggCards address={profile?.address} />
        </div>,
    stuff: address === profile?.address ? <Stuff /> : null
  }

  return (
    <div>
      <ProfileCover profile={profile} />
      <div className='mt-[-170px]'>
        <ProfileImage profile={profile} />
        <div className='flex justify-between'>
          <div>
            <p className='text-2xl font-bold px-8 pt-6'>
                {profile?.nick_name || 'User'}
            </p>
            <p className='text-sm text-gray-500 px-8 pb-4 pt-3'>
                {profile?.bio || "该用户没有留下简介。"}
            </p>
          </div>
          {address == profile?.address &&
            <Link href="/settings" className='flex flex-row px-8 text-gray-500 hover:text-black gap-x-[5px]'>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <p>编辑</p>
            </Link>
            }
        </div>
        <div className='bg-gradient-to-b'>
            <Card 
              className='mx-2 text-left lg:mx-8'
              bordered={false}
              tabList={tabList}
              activeTabKey={activeTabKey}
              onTabChange={onTabChange}
            >
              {contentList[activeTabKey]}
            </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile;
```



## 编写`profile`页面

`/profile`页面应该能实现的功能为：打开该网页的时候，首先判断用户是否登录，如果未登录则渲染未登录页面，如果已登陆的话则根据钱包地址调用后端接口获取`profile`，过程中渲染出加载中页面，当获取成功之后渲染出最终的`profile`页面。

根据上述过程，我们仍需要编写未登录和加载中两个 components。

在`components`文件夹中创建新文件`NotLoggedIn.jsx`，填入以下代码：

```jsx titile="NotLoggedIn.jsx"
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const NotLoggedIn = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-[600px] mx-auto text-center mt-10">
        <h1 className="text-2xl font-semibold mb-4">请登录</h1>
        <p className="text-base mb-6">
          点击下面按钮链接钱包登录到iCat
        </p>
        <div className="flex justify-center items-center">
          <ConnectButton label="链接钱包"/>
        </div>
      </div>
    </div>
  );
};
```

在`components`文件夹下创建新文件`Loader.jsx`，并填入以下代码：

```jsx title="Loader.jsx"
export const Loader = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="border-t-[6px] border-blue-400 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  };
```

这段代码使用 tailwindcss 渲染除了一个旋转的半圆作为加载中界面。

在`app/`文件夹下创建新文件夹`profile`，在其中创建新文件`page.jsx`，填入以下代码：

```jsx
"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { useSelector } from "react-redux";
import HeaderApp from "@/components/HeaderApp";
import FooterApp from "@/components/FooterApp";
import Profile from "@/components/Profile";
import { Toaster } from "react-hot-toast";
import { NotLoggedIn } from "@/components/NotLoggedIn";

const ProfilePage = () => {
  const router = useRouter();
  const address = useSelector((state) => state.address.address);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async ( address ) => {
    try {
      const responce = await fetch(`/api/get_profile?address=${address}`, {
        method: 'GET',
        headers: {
          Accepts: 'application/json'
        }
      });
      const data = (await responce.json())[0];
      return data;
    }
    catch (e) {
      return {};
    }
  }

  useEffect(() => {
    async function getProfile() {
      console.log('address:', address)
      const profileRes = await fetchProfile(address);

      setProfile(profileRes);
    }
    if (address && !profile) {
      setProfile(null);
      getProfile();
    }
  }, [address, profile]);

  return (
    <>
      <HeaderApp />
      <Toaster />
      {!!profile ? (
        <Profile
          profile={profile}
        />
      ) : 
      ((!!address && !profile) ? (
        <Loader />
      ) : (
        <NotLoggedIn />
      ))
      }

      <FooterApp />
    </>
  );
};

export default ProfilePage;

```

然后打开[http://localhost:3000/profile](http://localhost:3000/profile)，就可以看到渲染出的个人主页页面啦！