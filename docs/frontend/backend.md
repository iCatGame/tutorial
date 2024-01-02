# 隐私数据使用后端数据库

## pinata
文档中的使用方法
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

:::tip 注意

与标准的React项目不同，next.js的编译过程分为SSR和CSR两部分，所有component在编写过程中，养成良好习惯，头部加上`'use client';`

:::