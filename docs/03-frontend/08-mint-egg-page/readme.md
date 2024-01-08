---
sidebar_position: 8
---

# 编写铸造宠物蛋页面

在本小节中，我们将完成宠物蛋铸造页面的编写。

## 编写页头和页脚

DAPP 中的所有页面都应包含着一个页头和一个页脚。因此在编写页面主体之前，我们会先编写页头和页脚的 component 。

### 页头（`HeaderApp`）

页头从左至右应包含网站 Logo、跳转其他页面的链接、搜索框（完善其他页面之后再添加）、签到按钮/积分展示框以及前面 RainbowKit 设置全局展示的钱包组件。代码如下所示：

```jsx title="HeaderApp.jsx"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Checkin } from './Checkin';
import { useSelector } from 'react-redux';

const HeaderApp = () => {

  const address = useSelector((state) => state.address.address);

  return (
    <nav className='flex items-center justify-start space-x-8 bg-slate-50 container drop-shadow-xl'>
      <Link href={"/"} className="flex items-center font-medium text-white text-lg">
        <Image
          src={`/images/logo.png`}
          width={64}
          height={64}
          alt=""
          priority
          className="relative w-16 h-16 mr-auto md:mr-0 flex-shrink-0 !important"
        />
      </Link>
      <ul className='flex sm:items-center space-x-5'>
        <li>
          <Link href={"/profile"} className='hover:text-black text-gray-400'>
            主页
          </Link>
        </li>
        <li>
          <Link href="/mint" className='hover:text-black text-gray-400'>
            铸造
          </Link>
        </li>
      </ul>
      {!!address && <div className='overflow-hidden'>
        <Checkin />
      </div>}
    </nav>
  );
};
export default HeaderApp;
```



### 页脚（`FooterApp`）

页脚从左至右从上至下应包括项目简介、相关链接、版权、以及联系方式。代码如下：

```jsx title="FooterApp.jsx"
import { GithubFilled } from "@ant-design/icons";
import Link from "next/link";

const FooterApp = () => {
  return (
    <div className="bg-footer bg-black">
      <div className="text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-row justify-between gap-10">
            <div className="flex flex-col gap-6">
              <div className="text-xl font-bold">
                <Link href="/" passHref className="hover:text-white">
                  iCat
                </Link>
              </div>
              <div className="text-sm">
                基于AIGC的区块链游戏，玩家可以通过游戏体验到区块链
                <br /> 和AIGC的乐趣，开发者可以学习在Web3.0开发
              </div>
            </div>
            <div className="flex flex-col gap-6 text-xs">
              <div className="text-xl font-semibold">相关链接</div>
              <div className="flex gap-4">
                <a
                  href="https://github.com/iCat/frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <GithubFilled />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10"></div>
          <div className="flex justify-between items-center gap-10 mt-10 text-xs">
            <div>© {new Date().getFullYear()} iCat. All rights reserved.</div>
            <div className="flex gap-4 text-xs">
              <a
                href="https://game-tutorial-beta.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                开发文档
              </a>
              <a
                href="https://github.com/iCat/frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                源代码
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterApp;
```

之后 DAPP 中的每个页面都需要引用这两个 components 而无需额外编写页头和页脚。

## 编写页面主体

页面主体我们同样编写一个单独的 component，方便日后 debug。

在`components`文件夹下创建文件`Mint.jsx`，放入以下代码：

```jsx title="Mint.jsx"
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ConnectButton, useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import abi from "@/lib/abi/eggAbi";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

const Mint = () => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_EGG_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'mint',
    args: []
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const addRecentTransaction = useAddRecentTransaction();

  useEffect(() => {
    if (isSuccess) {
      addRecentTransaction({
        hash: data?.hash || "",
        description: "铸造Egg"
      })
    }
  }, [data, isSuccess])

  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={true}
      />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto border rounded-lg p-4 bg-white drop-shadow-2xl">
            <h1 className="text-2xl font-semibold text-center pt-8">铸造iCat Egg</h1>
            <div className="relative overflow-hidden flex flex-col items-center justify-center gap-18 p-4 w-full">
              <img src="/images/qr.png" alt="" className="w-[80%] h-[80%] object-contain md:w-[300px] lg:w-[300px]" />
            </div>
            <div className="w-full space-x-5 flex items-center justify-center">
              <button disabled={!write} onClick={() => write?.()} className={`rounded-xl px-8 py-3 text-neutral-100 font-[500] transition tracking-wide w-[200px] outline-none ${isLoading ? "bg-emerald-500" : isSuccess ? 'bg-amber-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {isLoading ? "铸造中..." : isSuccess ? "铸造成功！" : "铸造"}
              </button>
              {isSuccess && 
                <Link href="/profile">
                  <button className="rounded-xl px-8 py-3 text-neutral-100 font-[500] transition tracking-wide w-[200px] outline-none bg-blue-600 hover:bg-blue-700">
                    个人主页
                  </button>
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mint;
```

然后打开`app/mint/page.jsx`，将代码更改为以下内容并保存：

```jsx
"use client";

import { Loader } from '@/components/Loader';
import React from 'react';
import Mint from '@/components/Mint';
import FooterApp from '@/components/FooterApp';
import HeaderApp from '@/components/HeaderApp';

const MintPage = () => {
  return (
    <>
      <HeaderApp />
      <Mint/>
      <FooterApp />
    </>
  );
};

export default MintPage;
```

然后打开[http://localhost:3000/mint](http://localhost:3000/mint)，就可以看到渲染好的页面啦！
