---
sidebar_position: 13
---

# 编写 iCat 详情页

iCat 详情页用于展示宠物猫的详细信息以及用户交互功能。

## 编写相关组件

iCat 详情页应实现的功能包括：

- iCat 基本信息展示，包括昵称、成长阶段、健康度。饥饿度。排泄物、亲密度等
- iCat 相关操作按钮，包括修改昵称、撸猫、铲屎、治疗、检查、喂食、埋葬等。并根据小猫的不同状态渲染不同的按钮。其中，喂食和修改昵称应该使用单独的`Modal`组件进行渲染。

首先编写喂食组件。

在`components`文件夹下创建新文件`FeedCard.jsx`，并填入以下代码：

```jsx title="FeedCard.jsx"
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { Avatar, Card } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ContractFunctionExecutionError } from "viem";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import iCatAbi from "@/lib/abi/catAbi.json";

export const FeedCard = ({ tokenId, style }) => {
  
  const { address } = useAccount();
  const [amount, setAmount] = useState(undefined);

  const food = {
    'leftover': 0,
    'fishchip': 1,
    'tin': 2
  }

  const foodTrans = {
    'leftover': '剩饭',
    'fishchip': '小鱼干',
    'tin': '鱼罐头'
  }

  const { data, isError } = useContractRead({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi,
    functionName: 'foodBalance',
    args: [address, food[style]]
  })

  const { config, error } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi,
    functionName: 'feedCat',
    args: [tokenId, food[style], amount]
  })
  const { data: tx, isLoading, isSuccess, write } = useContractWrite(config);
  const addRecentTransaction = useAddRecentTransaction();

  useEffect(() => {
    // console.log(data, error)
    if (isSuccess) {
      addRecentTransaction({
        hash: tx?.hash || "",
        description: `购买${foodTrans[style]}`
      })
    }
    if (error instanceof ContractFunctionExecutionError) {
      // console.log('message:', error.metaMessages)
      if (error.metaMessages[0] == "Error: foodNotEnough()") {
        toast.error("该种食物不足！");
      }
    }
  }, [data, isError, isSuccess, error])

  return (
    <div className="hover:drop-shadow-lg">
      <Card
        cover={
          <img alt={`${style}`} src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"></img>
        }
        actions={[
          <div className="flex items-center space-x-2 justify-center">
            <input 
              className="bg-gray-100 rounded-full h-[30px] pl-3 w-[130px]"
              type="number"
              placeholder="请输入数量"
              value={amount}
              onChange={a => {setAmount(a.target.value)}}
            />
            <button disabled={!write} onClick={() => write?.()} className={`rounded-xl text-neutral-100 font-[100] transition tracking-wide w-[90px] h-[30px] outline-none ${isLoading ? "bg-emerald-500" : isSuccess ? 'bg-amber-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {isLoading ? `喂食中...` : isSuccess ? `喂食成功！` : `投喂${foodTrans[style]}`}
            </button>
          </div>
        ]}
      >
        <Card.Meta 
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title={`${foodTrans[style]}`}
          description={`余额：${data}个`}
        />
      </Card>
    </div>
  )
}
```

然后创建新文件`FeedModal.jsx`，并填入以下代码：

```jsx title="FeedModal.jsx"
import { Card, Modal } from "antd";
import { useState } from "react";
import { FeedCard } from "./FeedCard";

export const FeedModal = ({ tokenId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal} className={`rounded-xl px-8 py-3 text-neutral-100 font-[500] transition tracking-wide w-[200px] outline-none bg-blue-600 hover:bg-blue-700`}>
        喂食
      </button>
      <Modal 
        title="选择投喂的食物："
        open={isModalOpen}
        onCancel={handleCancel}
        closable={true}
        maskClosable={true}
        footer={null}
        destroyOnClose={true}
        width={800}
      >
        <div className="flex flex-row space-x-8">
          <FeedCard tokenId={tokenId} style={`leftover`} />
          <FeedCard tokenId={tokenId} style={`fishchip`} />
          <FeedCard tokenId={tokenId} style={`tin`} />
        </div>
      </Modal>
    </>
  )
}
```

然后创建`Assets.jsx`，并填入以下代码：

```jsx title="Assets.jsx"
import Image from "next/image";
import { useAccount, useContractReads, useContractWrite, usePrepareContractWrite } from "wagmi";
import iCatAbi from "@/lib/abi/catAbi.json";
import eggAbi from "@/lib/abi/eggAbi.json";
import { Loader } from "./Loader";
import Button from "./Button";
import { FeedModal } from "./FeedModal";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

const Assets = ({ tokenId }) => {
  const [isDead, setIsDead] = useState(false);
  const [owner, setOwner] = useState("");
  const { address } = useAccount();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  const iCatCA = {
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi
  }
  
  const { data , isSuccess } = useContractReads({
    contracts: [
      {
        ...iCatCA,
        functionName: 'tokenURI',
        args: [tokenId]
      },
      {
        ...iCatCA,
        functionName: 'detail',
        args: [tokenId]
      },
      {
        ...iCatCA,
        functionName: 'calculateHealth',
        args: [tokenId]
      },
      {
        ...iCatCA,
        functionName: 'calculateFeces',
        args: [tokenId]
      },
      {
        ...iCatCA,
        functionName: 'calculateHunger',
        args: [tokenId]
      },
      {
        ...iCatCA,
        functionName: 'calculateIntimacy',
        args: [tokenId]
      }, 
      {
        ...iCatCA,
        functionName: 'ownerOf',
        args: [tokenId]
      }
    ]
  })
  // console.log(data, isSuccess)

  const stage = {
    0: "幼生期",
    1: "成长期",
    2: "成熟期"
  }

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi,
    functionName: 'changeNickname',
    args: [tokenId, newNickname]
  })

  const { data: tx, isLoading, isSuccess: isWSuccess, write } = useContractWrite(config);

  const addRecentTransaction = useAddRecentTransaction();

  useEffect(() => {
    if (isSuccess) {
      if (data?.[2].result == 0) {
        toast.error("哎呀，由于你的疏忽，这只猫咪已经死亡了，将它埋葬吧！");
        setIsDead(true);
      }
      setOwner(data?.[6].result);
      // console.log('aaa', isModalOpen)
    }
    if (isWSuccess) {
      toast.success("修改成功！");
      setIsModalOpen(false);
      addRecentTransaction({
        hash: tx?.hash || "",
        description: `修改昵称`
      })
    }
  }, [isSuccess, owner, isWSuccess]);

  return (
    isSuccess ?
    <div className="lg:mx-[204px] md:mx-8 my-0 gap-[20px] max-w-[1280px] px-10 pt-[40px] pb-[60px] gap-y-5 flex-col flex">
      <Toaster />
      <div className="grid grid-rows-1 lg:grid-cols-[320px,1fr] container gap-10 relative antialiased justify-center">
        <div className="aspect-square bg-white bg-clip-border bg-opacity-100 bg-origin-padding bg-no-repeat bg-auto rounded-xl box-border text-black block overflow-hidden relative antialiased h-[320px]">
          <Image src={"/images/qr.png"} width={300} height={300}/>
        </div>
        <div className="box-border text-black gap-5 gap-y-5 display-flex flex-col h-[180px] m-0 w-full antialiased">
          <div className="flex flex-row justify-center lg:justify-start items-center gap-1">
            <p className="box-border text-black block font-sans font-extrabold text-3xl md:justify-center h-10 antialiased">
              iCat #{tokenId} {data?.[1]?.result[0]} {isDead && "(已死亡☠️)"}
            </p>
            {
              !isDead && 
              owner == address && 
              <div className="relative">
                <div
                  className="flex flex-row justify-center items-center font-extrabold cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" onClick={() => setIsModalOpen(true)}>
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <Modal 
                    title="给你的iCat取个名字吧！"
                    open={isModalOpen}
                    closable={true}
                    maskClosable={true}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                  >
                    <div className="flex flex-col justify-center items-center gap-4 pt-4">
                      <input type='text' placeholder="请输入新昵称" className="ps-3 focus:outline-none w-[50%] h-[30px] drop-shadow rounded-lg" value={newNickname} onChange={a => {setNewNickname(a.target.value)}}/>
                      <button disabled={!write} onClick={() => write?.()} className={`rounded-xl px-8 py-3 text-neutral-100 font-[500] transition tracking-wide w-[200px] outline-none ${isLoading ? "bg-emerald-500" : isWSuccess ? 'bg-amber-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                        {isLoading ? `修改中...` : isWSuccess ? `修改成功！` : `修改昵称`}
                      </button>
                    </div>
                  </Modal>
                </div>
                {isHovered && (
                  <div className="flex justify-center items-center opacity-50 absolute top-[100%] left-0 w-40 bg-gray-300 p-2 rounded shadow-lg">
                    修改你的iCat名字
                  </div>
                )}
              </div>
            }
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:w-auto w-full gap-4 font-mono text-black text-sm text-center font-bold leading-6 rounded-lg pt-10 container">
            <div className="p-4 rounded-lg shadow-lg bg-white drop-shadow-2xl">
              阶段：{stage[data?.[1].result[3]]}
            </div>
            <div className="p-4 rounded-lg shadow-lg bg-white drop-shadow-2xl">
              健康度：{Number(data?.[2].result)}
            </div>
            <div className="p-4 rounded-lg shadow-lg bg-white drop-shadow-2xl">
              饥饿度：{Number(data?.[4].result)}
            </div>
            <div className="p-4 rounded-lg shadow-lg bg-white drop-shadow-2xl">
              排泄物：{Number(data?.[3].result)}
            </div>
            <div className="p-4 rounded-lg shadow-lg bg-white drop-shadow-2xl">
              亲密度：{Number(data?.[5].result)}
            </div>
          </div>
        </div>
      </div>
      <div className="border border-none rounded-xl box-border text-black block font-sans w-full mt-10 antialiased pt-[220px] lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-20 gap-y-10 font-mono text-white text-sm text-center justify-center items-center font-bold leading-6 bg-stripes-fuchsia rounded-lg p-4">
          {!isDead && <div className="flex flex-col justify-center items-center"> 
            <Button tokenId={tokenId} name={"撸猫"} func={"pet"} />
          </div>}
          {!isDead && <div className="flex flex-col justify-center items-center"> 
            <Button tokenId={tokenId} name={"铲屎"} func={"clearFeces"} />
          </div>}
          {!isDead && <div className="flex flex-col justify-center items-center"> 
            <Button tokenId={tokenId} name={"治疗"} func={"cure"} />
          </div>}
          <div className="flex flex-col justify-center items-center"> 
            <Button tokenId={tokenId} name={"检查"} func={"examCat"} />
          </div>
          {!isDead && <div className="flex flex-col justify-center items-center"> 
            <FeedModal tokenId={tokenId}/>
          </div>}
          <div className="flex flex-col justify-center items-center"> 
            <Button tokenId={tokenId} name={"埋葬"} func={"buryCat"} />
          </div>
        </div>
      </div>
    </div>
    :
    <Loader />
  )
}

export default Assets;
```

## 编写前端页面

在`app`文件夹下创建新文件`asset/[tokenId]/page.jsx`，并填入以下代码：

```jsx
"use client"

import Assets from "@/components/Assets";
import FooterApp from "@/components/FooterApp";
import HeaderApp from "@/components/HeaderApp";
import { useContractRead } from "wagmi";
import icatAbi from "@/lib/abi/catAbi";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { NotFound } from "@/components/NotFound";


const AssetPage = ({ params }) => {
  const [isValidTokenId, setIsValidTokenId] = useState(true);

  const { data, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: icatAbi,
    functionName: 'ownerOf',
    args: [params.tokenId]
  })

  useEffect(() => {
    if (data == undefined || data == '0x0000000000000000000000000000000000000000') {
      setIsValidTokenId(false);
    }
    // console.log('asset available?', isValidTokenId)
  }, [isLoading, isValidTokenId])

  return (
    <div>
        <HeaderApp />
        {
          isLoading ?
          <Loader />
          :
          (
            !isValidTokenId ?
            <NotFound />
            :
            <Assets tokenId={params.tokenId} />
          )
        }
        <FooterApp />
    </div>
  )
}

export default AssetPage;
```

至此，整个项目的前端全部编写完毕！