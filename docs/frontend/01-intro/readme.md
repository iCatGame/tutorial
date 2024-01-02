---
sidebar_position: 1
---

# 技术栈简介

本项目前端的开发需要用到的技术栈包括 [Next.js](https://nextjs.org/)、[Tailwindcss](https://tailwindcss.com/)、[Wagmi](https://wagmi.sh/) / [Viem](https://viem.sh/) 和 [RainbowKit](https://www.rainbowkit.com/)，下面对这几个工具分别进行简单介绍。

## Next.js 

Next.js 是一个基于 React 的全栈式开发框架，用于构建现代、可扩展的 Web 应用程序。它提供了许多开发所需的工具和功能，使得构建 React 应用变得更加简单和高效。以下列举了 Next.js 的主要特点：


Next.js 是一个基于 React 的开发框架，用于构建现代、可扩展的 Web 应用程序。它提供了许多开发所需的工具和功能，使得构建 React 应用变得更加简单和高效。以下是 Next.js 的一些主要特点和功能：

1. **服务器渲染 (SSR) 和静态生成 (SSG):** Next.js 支持服务器渲染和静态生成，这意味着你可以在服务器上动态生成页面内容，也可以在构建时生成静态 HTML 文件，提高应用的性能和搜索引擎优化。
2. **路由系统:** Next.js 提供简单的文件系统基础的路由系统，使得页面之间的导航变得直观和容易管理。每个 React 组件都可以作为一个页面，页面路由可以通过文件结构自动映射。
3. **热模块替换 (HMR):** 开发时，Next.js 支持热模块替换，允许你在不刷新整个页面的情况下即时看到代码变更的效果。
4. **自动代码拆分 (Automatic Code Splitting):** Next.js 自动将代码拆分成小块，只加载当前页面所需的代码，提高应用的性能和加载速度。
5. **插件和中间件系统:** Next.js 具有丰富的插件系统，允许你通过插件扩展和自定义应用的功能。同时，中间件系统使得在处理请求和响应时添加自定义逻辑变得更加灵活。
6. **支持 TypeScript:** Next.js 对 TypeScript 提供原生支持，使得你可以使用 TypeScript 来编写应用程序，提供更好的类型检查和开发体验。
7. **静态文件服务:** Next.js 可以方便地为静态资源（如图像、样式表等）提供服务，使其能够直接通过 URL 访问。

总体而言，Next.js 是一个强大的 React 框架，适用于构建各种规模的 Web 应用程序，无论是单页面应用 (SPA) 还是多页面应用 (MPA)。它简化了很多常见的开发任务，提高了开发效率，并提供了许多性能优化的功能。

:::tip

与标准的React项目不同，next.js的编译过程分为 SSR 和 CSR 两部分，所以在编写 component 的过程中，养成良好习惯，头部加上`'use client';`

:::

## Tailwindcss

Tailwind CSS 是一个实用的、高度可定制的 CSS 框架，它专注于提供一组小型、可复用的单一责任的类，以构建现代的、响应式的用户界面。与传统的CSS框架（如Bootstrap）不同，Tailwind CSS 不提供预定义的组件，而是专注于原子类的使用，使开发者能够更灵活地构建自己的界面。

tailwindcss对比传统 css 最大的优势就是省去了大量繁琐的样式规则，如下代码是传统 css：

```html
<!-- 传统 CSS -->
/* HTML 文件 */
<div class="container">
  <div class="header">
    <h1 class="title">Hello World</h1>
  </div>
</div>

/* CSS 文件 */
.container {
  margin: 0 auto;
  padding: 20px;
}

.header {
  background-color: #333;
  color: #fff;
  padding: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;

```

以下则是能够实现相同功能的 tailwindcss 语句：

```html
<!-- Tailwind CSS -->
<div class="container mx-auto p-4">
  <div class="bg-gray-800 text-white p-2">
    <h1 class="text-2xl font-bold">Hello World</h1>
  </div>
</div>
```

另外，tailwindcss 还具有包括但不限于**可读性强**、**可定制性强**、**响应式设计简单**、**无需预处理器**等优点。因此，在本项目中，我们选用 tailwindcss 编写 UI。

## Wagmi / Viem

与 ethers.js 类似，viem也是一个用于与以太坊区块链及其生态系统进行交互的 JavaScript 库，与 ethers.js 不同的是，使用 viem 编写的脚本或者前端，比 ethers.js 具有更快的响应速度和更小的代码体积，性能更优。

**wagmi** 是一个基于 viem 开发的 React Hook 的集合，包含了你与以太坊交互所需的一切。wagmi 使连接钱包、显示 ENS 和余额信息、签署消息、与合约交互等变得简单——所有这些都有缓存、重复请求降重和持久化。

## RainbowKit

RainbowKit 是一个基于 wagmi / viem 开发的 React 库，可以轻松地将钱包连接添加到您的dapp。 它直观、响应迅速且可自定义。 它直观、响应迅速且可自定义。