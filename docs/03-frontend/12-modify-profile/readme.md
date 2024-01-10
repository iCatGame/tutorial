---
sidebar_position: 12
---

# 设置个人主页页面

个人信息在最开始被初始化为随机信息，如果想更改的话需要一个页面来设置。

## 配置 IPFS

本项目为区块链项目，因此包括用户头像、背景图片等图像会存放在区块链文件系统 IPFS 中。在本项目中，我们使用 IPFS 提供商 pinata。

- 到 [pinata 官网](https://app.pinata.cloud/register)注册一个新账号并登录。在 [api Keys](https://app.pinata.cloud/developers/api-keys) 页面创建一个新的 api key，分别复制 API Key、API Secret、JWT备用。

- 在`.env.local`中创建新项：

```env
#pinta
NEXT_PUBLIC_PINATA_API_KEY=
NEXT_PUBLIC_PINATA_API_SECRET=
NEXT_PUBLIC_PINATA_JWT=
```

并将上面复制好的分别填入其中。

- 最后，为了使项目能够跨域访问 pinata 的网址以获取图像，我们需要对 Next.js 进行配置以开启跨域白名单。

在[这里](https://app.pinata.cloud/gateway)查看 pinata 为你分配的访问域名，复制备用。

打开项目根目录下的`next.config.js`，添加至以下内容：

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '***.mypinata.cloud',  // 填入刚刚复制好的域名
        port: '',
        pathname: '/ipfs/**',
      }
    ]
  },
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};
  
module.exports = nextConfig;
```



## 编写后端接口

在`pages/api`文件夹下创建新文件`update_profile.js`，并填入以下代码：

```js
import { ironOptions } from '@/lib/iron';
import { createClient } from '@supabase/supabase-js';
import { withIronSessionApiRoute } from 'iron-session/next';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


const handler = async (req, res) => {
  const { method, url } = req;
  // console.log(req.body)

  switch (method) {
    case "POST":
      // console.log(req.body)
      const { address, nick_name, bio, avatar, cover } = JSON.parse(req.body); // 解析查询参数
      // console.log(address, nick_name, bio, avatar, cover)
      const { error } = await supabase
        .from('users')
        .update({
          nick_name : nick_name || null,
          bio       : bio       || null,
          avatar    : avatar    || null,
          cover     : cover     || null
        })
        .eq('address', address);

      console.log(error);
      
      if (error) {
        res.status(400).json({ ok: error, error: error });
      }
      else {
        res.status(200).json({ ok: true });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
```



## 编写前端

在`components`文件夹下创建`Setting.jsx`，并填入以下代码：

```jsx
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  message,
  Upload,
} from 'antd';
import AntdImgCrop from 'antd-img-crop';
import { useAccount } from 'wagmi';
import { toast, Toaster } from 'react-hot-toast';

const Settings = ({ profile }) => {

  const [isSuccess, setIsSuccess] = useState(false);
  const [nick_name, setNick_name] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFileList, setAvatarFileList] = useState([]);
  const [coverFileList, setCoverFileList] = useState([]);
  const { address } = useAccount();


  const normFile = (e) => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = async (values) => {
    // console.log(values, avatarFileList, coverFileList);
    const resSet = await fetch('/api/update_profile', {
      method: "POST",
      body: JSON.stringify({
        address: address,
        nick_name: values.nick_name,
        bio: values.bio,
        avatar: 'https://上面复制的域名/ipfs/' + avatarFileList[0].response.IpfsHash,
        cover: 'https://上面复制的域名/ipfs/' + coverFileList[0].response.IpfsHash
      })
    })
    // console.log(resSet)
    if (resSet.status == 200) {
      setIsSuccess(() => true);
      toast.success("设置成功")
    }
    else {
      console.log(resSet?.error)
      toast.error("出错了，原因请查看浏览器控制台");
    }
  }

  const onFinishFailed = async (err) => {
    toast.error("出错了，原因请查看浏览器控制台");
    console.log(err)
  }

  const beforeUpload = async (file) => {
    console.log(file)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传png或jpg图片!');
    }
    return isJpgOrPng;
  }

  useEffect(() => {
    // console.log('profile', profile)
    setNick_name(profile?.nick_name);
    setBio(profile?.bio);
  }, [profile, avatarFileList, coverFileList])

  return (
    <div className="bg-white min-h-screen">
      <Toaster />
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col content-center items-center justify-center gap-4 max-w-2xl mx-auto border rounded-lg p-20 bg-white drop-shadow-2xl">
          <h1 className="text-2xl font-semibold text-center">设置</h1>
          <div className="relative overflow-hidden flex flex-col gap-18 p-20 bg-gray-200 rounded-lg w-full content-center items-center justify-center">
            <Form labelCol={{ span: 4, }} wrapperCol={{ span: 14, }} layout="horizontal" className='max-w-[600px]' onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{
              'nick_name': profile?.nick_name,
              'bio': profile?.bio
            }}>
              <Form.Item label="昵称" name="nick_name">
                <Input value={nick_name}/>
              </Form.Item>
              <Form.Item label="简介" name="bio">
                <Input value={bio} />
              </Form.Item>
              <Form.Item label="头像" valuePropName="fileList" getValueFromEvent={normFile} name="avatar" extra="头像比例为1:1">
                <AntdImgCrop rotationSlider showGrid showReset aspect={1/1} cropShape='round' modalCancel="取消" modalOk='确定' name="avatar">
                  <Upload.Dragger
                    beforeUpload={beforeUpload}
                    action='https://api.pinata.cloud/pinning/pinFileToIPFS' 
                    headers={{
                      Pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY, 
                      Pinata_secret_api_key:process.env.NEXT_PUBLIC_PINATA_API_SECRET 
                    }} 
                    maxCount={1} 
                    listType="picture-card"
                    fileList={avatarFileList}
                    onChange={({ fileList }) => setAvatarFileList(fileList)}
                  >
                    <div>
                      <UploadOutlined />
                      <div className='mt-2'>
                          上传
                      </div>
                    </div>
                  </Upload.Dragger>
                </AntdImgCrop>
              </Form.Item>
              <Form.Item label="封面" valuePropName="fileList" getValueFromEvent={normFile} name="cover">
                <AntdImgCrop rotationSlider showGrid showReset aspect={1500/250} modalCancel="取消" modalOk='确定' name="cover">
                  <Upload.Dragger 
                  beforeUpload={beforeUpload} 
                  action='https://api.pinata.cloud/pinning/pinFileToIPFS' 
                    headers={{
                      Pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY, 
                      Pinata_secret_api_key:process.env.NEXT_PUBLIC_PINATA_API_SECRET 
                    }} 
                  maxCount={1} 
                  listType="picture-card"
                  fileList={coverFileList}
                  onChange={({ fileList }) => setCoverFileList(fileList)}
                  >
                    <div>
                      <UploadOutlined />
                      <div className='mt-2'>
                          上传
                      </div>
                    </div>
                  </Upload.Dragger>
                </AntdImgCrop>
              </Form.Item>
              <Form.Item className='flex justify-start pt-2'>
                <Button htmlType="submit" className={`rounded-xl px-8 py-3 text-neutral-100 font-[500] transition tracking-wide w-[200px] h-12 outline-none flex justify-center items-center ${isSuccess ? 'bg-amber-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                  {isSuccess ? "设置成功！" : "设置"}
                </Button>
              </Form.Item>

            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings;
```

:::info

如果你是在后端编写和 IPFS 相关代码的话，可以用 pinata 官方 sdk：
```jsx
import PinataClient from '@pinata/sdk';
  // 创建pinata client
  // 使用api key + api secret方式
  const pinata = new PinataClient(process.env.NEXT_PUBLIC_PINATA_API_KEY, process.env.NEXT_PUBLIC_PINATA_API_SECRET);
  // 使用jwt方式
  // const pinata = new PinataClient({ pinataJWTKey: process.env.NEXT_PUBLIC_PINATA_JWT });
  const fs = require('fs');
const readableStreamForFile = fs.createReadStream('./yourfile.png');
const options = {
    pinataMetadata: {
        name: MyCustomName,
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};
const res = await pinata.pinFileToIPFS(readableStreamForFile, options)
console.log(res)
```

:::

在`app`文件夹下创建新文件`settings/page.js`，并填入以下代码：

```jsx
"use client";

import FooterApp from '@/components/FooterApp';
import HeaderApp from '@/components/HeaderApp';
import { Loader } from '@/components/Loader';
import { NotLoggedIn } from '@/components/NotLoggedIn';
import Settings from '@/components/Settings';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function SettingsPage() {
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
      // console.log('res:', data)
      return data;
    }
    catch (e) {
      return {};
    }
  }

  useEffect(() => {
    async function getProfile() {
      // console.log('address:', address)
      const profileRes = await fetchProfile(address);
      // console.log(address, profileRes)
      setProfile(profileRes);
    }
    if (address) {
      // setProfile(null);
      getProfile();
    }
  }, [address]);
  return (
    <div>
      <HeaderApp />
      {!!profile ? (
        address == profile?.address ? (
          <Settings
            profile={profile}
          />
        ) :
        <ConnectButton className="h-full" />
      ) : 
      (!!address ? (
        <Loader />
      ) : (
        <NotLoggedIn />
      ))
      }
      <FooterApp />
    </div>
  )
}
```

保存后打开[http://localhost:3000/settings](http://localhost:3000/settings)，登录后就可以更改个人设置了。