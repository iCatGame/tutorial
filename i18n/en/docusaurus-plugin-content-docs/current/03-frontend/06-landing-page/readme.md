---
sidebar_position: 6
---

# 编写着陆页

着陆页（Landing Page）是用户登录一个网站之后看到的第一页，决定着用户对网站的第一印象，因此，我们要认真的编写这一页面。为了使页面更有趣味，我们会为主页添加动画效果，我们采用`gsap`库来实现动画效果。

## 配置`gsap`

- 首先到 [gsap 官网](https://gsap.com/pricing/)注册 gsap 账号然后复制 `auth token`备用。

- 在项目根目录下创建文件`.npmrc`，复制粘贴以下内容：

```npmrc
always-auth=true
@gsap:registry=https://npm.greensock.com
//npm.greensock.com/:_authToken=${AUTH_TOKEN}
```

- 然后将刚才复制的`auth token`粘贴到`${AUTH_TOKEN}`处，之后保存。

- 将`"gsap": "npm:@gsap/shockingly@^3.10.4",`添加到`package.json`中的`"dependencies"`中，并在终端执行`npm install`安装`gsap`包。

- 项目根目录下创建`components/use-isomorpphic-layout-effect.jsx`，粘贴以下代码并保存：

```jsx
import { useLayoutEffect, useEffect } from 'react';
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
export default useIsomorphicLayoutEffect;
```

- `components/`文件夹下创建`gsap.jsx`文件，粘贴以下代码并保存：

```jsx
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { SplitText } from 'gsap/dist/SplitText';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
}

export * from 'gsap/dist/gsap';
export * from 'gsap/dist/ScrollTrigger';
export * from 'gsap/dist/ScrollSmoother';
export * from 'gsap/dist/SplitText';
```



## 编写 component

编写 component 是现代前端开发的核心实践，通过将用户界面划分为独立的、可复用的模块，提高了代码的可维护性、可测试性和组织结构的清晰性。组件化的开发模式使得每个组件成为独立的单元，有助于团队成员专注于特定功能的开发，并提供了可重用性，降低了开发成本。这种模式为复杂应用的可扩展性提供了有效的解决方案，使得在大型项目中更容易管理和扩展应用。最终，组件化不仅提高了代码质量，还促进了团队协作，使得前端开发更加高效和灵活。我们要养成组件化的思维，因此，在我们编写的第一个页面，就会把页面分割为多个 component 分别进行编写。

整个着陆页应包含过场动画、主页面、导航栏、项目简介、项目特色、以及底部栏这六部分。因此，我们会将整个页面拆分为 6 部分进行编写，并汇总为一个页面。下面对六个部分进行分开讲述。

:::tip

注意，如果在下面的代码编写过程中出现任何和环境相关的问题，请按照下面方式解决：

<details>
  <summary>解决方案</summary>
  <div>
    将`next.config.js`更改为下面的内容：
    <details>
      <summary>`next.config.js`</summary>
      <div>
        ```js
        /** @type {import('next').NextConfig} */
        const nextConfig = {
            reactStrictMode: true,
            webpack: config => {
              config.resolve.fallback = { fs: false, net: false, tls: false };
              return config;
            },}

        module.exports = nextConfig
        ```
      </div>
    </details>
    将`package-lock.json`更改为以下内容：
    <details>
      <summary>`package-lock.json`</summary>
      <div>
        ```json
        {
          "name": "icat_front",
          "version": "1.0.0",
          "lockfileVersion": 2,
          "requires": true,
          "packages": {
            "": {
              "name": "icat_front",
              "version": "1.0.0",
              "license": "ISC",
              "dependencies": {
                "@ant-design/icons": "^5.2.5",
                "@rainbow-me/rainbowkit": "^1.0.1",
                "@rainbow-me/rainbowkit-siwe-next-auth": "^0.2.0",
                "@reduxjs/toolkit": "^1.9.5",
                "@supabase/supabase-js": "^2.25.0",
                "antd": "^5.8.3",
                "antd-img-crop": "^4.12.2",
                "buffer": "^6.0.3",
                "dotenv": "^16.0.3",
                "embla-carousel-autoplay": "^8.0.0-rc11",
                "embla-carousel-react": "^8.0.0-rc11",
                "ethers": "^5.7.2",
                "gsap": "npm:@gsap/shockingly@^3.10.4",
                "iron-session": "^6.3.1",
                "next": "^13.4.4",
                "next-auth": "^4.20.1",
                "react": "^18.2.0",
                "react-dom": "^18.2.0",
                "react-hot-toast": "^2.4.1",
                "react-redux": "^8.1.2",
                "siwe": "^2.1.4",
                "uuid": "^9.0.0",
                "viem": "^0.3.37",
                "wagmi": "^1.0.7"
              },
              "devDependencies": {
                "autoprefixer": "^10.4.14",
                "encoding": "^0.1.13",
                "postcss": "^8.4.27",
                "supports-color": "^8.1.1",
                "tailwindcss": "^3.3.3"
              },
              "engines": {
                "node": ">=18.0"
              }
            },
            "node_modules/@adraffy/ens-normalize": {
              "version": "1.9.0",
              "resolved": "https://registry.npmjs.org/@adraffy/ens-normalize/-/ens-normalize-1.9.0.tgz",
              "integrity": "sha512-iowxq3U30sghZotgl4s/oJRci6WPBfNO5YYgk2cIOMCHr3LeGPcsZjCEr+33Q4N+oV3OABDAtA+pyvWjbvBifQ=="
            },
            "node_modules/@alloc/quick-lru": {
              "version": "5.2.0",
              "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
              "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
              "dev": true,
              "engines": {
                "node": ">=10"
              },
              "funding": {
                "url": "https://github.com/sponsors/sindresorhus"
              }
            },
            "node_modules/@ant-design/colors": {
              "version": "7.0.0",
              "resolved": "https://registry.npmjs.org/@ant-design/colors/-/colors-7.0.0.tgz",
              "integrity": "sha512-iVm/9PfGCbC0dSMBrz7oiEXZaaGH7ceU40OJEfKmyuzR9R5CRimJYPlRiFtMQGQcbNMea/ePcoIebi4ASGYXtg==",
              "dependencies": {
                "@ctrl/tinycolor": "^3.4.0"
              }
            },
            "node_modules/@ant-design/cssinjs": {
              "version": "1.16.2",
              "resolved": "https://registry.npmjs.org/@ant-design/cssinjs/-/cssinjs-1.16.2.tgz",
              "integrity": "sha512-W+LT6Xm5sEYZn7ocMAIP9LvX99woxGg1aYu15o608/uUAaJDR7LrxBu/5cnMLa6AQK1829zdoKmRnRFOxAgzEg==",
              "dependencies": {
                "@babel/runtime": "^7.11.1",
                "@emotion/hash": "^0.8.0",
                "@emotion/unitless": "^0.7.5",
                "classnames": "^2.3.1",
                "csstype": "^3.0.10",
                "rc-util": "^5.35.0",
                "stylis": "^4.0.13"
              },
              "peerDependencies": {
                "react": ">=16.0.0",
                "react-dom": ">=16.0.0"
              }
            },
            "node_modules/@ant-design/icons": {
              "version": "5.2.5",
              "resolved": "https://registry.npmjs.org/@ant-design/icons/-/icons-5.2.5.tgz",
              "integrity": "sha512-9Jc59v5fl5dzmxqLWtRev3dJwU7Ya9ZheoI6XmZjZiQ7PRtk77rC+Rbt7GJzAPPg43RQ4YO53RE1u8n+Et97vQ==",
              "dependencies": {
                "@ant-design/colors": "^7.0.0",
                "@ant-design/icons-svg": "^4.3.0",
                "@babel/runtime": "^7.11.2",
                "classnames": "^2.2.6",
                "lodash.camelcase": "^4.3.0",
                "rc-util": "^5.31.1"
              },
              "engines": {
                "node": ">=8"
              },
              "peerDependencies": {
                "react": ">=16.0.0",
                "react-dom": ">=16.0.0"
              }
            },
            "node_modules/@ant-design/icons-svg": {
              "version": "4.3.0",
              "resolved": "https://registry.npmjs.org/@ant-design/icons-svg/-/icons-svg-4.3.0.tgz",
              "integrity": "sha512-WOgvdH/1Wl8Z7VXigRbCa5djO14zxrNTzvrAQzhWiBQtEKT0uTc8K1ltjKZ8U1gPn/wXhMA8/jE39SJl0WNxSg=="
            },
            "node_modules/@ant-design/react-slick": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@ant-design/react-slick/-/react-slick-1.0.2.tgz",
              "integrity": "sha512-Wj8onxL/T8KQLFFiCA4t8eIRGpRR+UPgOdac2sYzonv+i0n3kXHmvHLLiOYL655DQx2Umii9Y9nNgL7ssu5haQ==",
              "dependencies": {
                "@babel/runtime": "^7.10.4",
                "classnames": "^2.2.5",
                "json2mq": "^0.2.0",
                "resize-observer-polyfill": "^1.5.1",
                "throttle-debounce": "^5.0.0"
              },
              "peerDependencies": {
                "react": ">=16.9.0"
              }
            },
            "node_modules/@babel/runtime": {
              "version": "7.22.10",
              "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.22.10.tgz",
              "integrity": "sha512-21t/fkKLMZI4pqP2wlmsQAWnYW1PDyKyyUV4vCi+B25ydmdaYTKXPwCj0BzSUnZf4seIiYvSA3jcZ3gdsMFkLQ==",
              "dependencies": {
                "regenerator-runtime": "^0.14.0"
              },
              "engines": {
                "node": ">=6.9.0"
              }
            },
            "node_modules/@coinbase/wallet-sdk": {
              "version": "3.6.6",
              "resolved": "https://registry.npmjs.org/@coinbase/wallet-sdk/-/wallet-sdk-3.6.6.tgz",
              "integrity": "sha512-vX+epj/Ttjo7XRwlr3TFUUfW5GTRMvORpERPwiu7z2jl3DSVL4rXLmHt5y6LDPlUVreas2gumdcFbu0fLRG9Jg==",
              "dependencies": {
                "@metamask/safe-event-emitter": "2.0.0",
                "@solana/web3.js": "^1.70.1",
                "bind-decorator": "^1.0.11",
                "bn.js": "^5.1.1",
                "buffer": "^6.0.3",
                "clsx": "^1.1.0",
                "eth-block-tracker": "6.1.0",
                "eth-json-rpc-filters": "5.1.0",
                "eth-rpc-errors": "4.0.2",
                "json-rpc-engine": "6.1.0",
                "keccak": "^3.0.1",
                "preact": "^10.5.9",
                "qs": "^6.10.3",
                "rxjs": "^6.6.3",
                "sha.js": "^2.4.11",
                "stream-browserify": "^3.0.0",
                "util": "^0.12.4"
              },
              "engines": {
                "node": ">= 10.0.0"
              }
            },
            "node_modules/@coinbase/wallet-sdk/node_modules/clsx": {
              "version": "1.2.1",
              "resolved": "https://registry.npmjs.org/clsx/-/clsx-1.2.1.tgz",
              "integrity": "sha512-EcR6r5a8bj6pu3ycsa/E/cKVGuTgZJZdsyUYHOksG/UHIiKfjxzRxYJpyVBwYaQeOvghal9fcc4PidlgzugAQg==",
              "engines": {
                "node": ">=6"
              }
            },
            "node_modules/@ctrl/tinycolor": {
              "version": "3.6.0",
              "resolved": "https://registry.npmjs.org/@ctrl/tinycolor/-/tinycolor-3.6.0.tgz",
              "integrity": "sha512-/Z3l6pXthq0JvMYdUFyX9j0MaCltlIn6mfh9jLyQwg5aPKxkyNa0PTHtU1AlFXLNk55ZuAeJRcpvq+tmLfKmaQ==",
              "engines": {
                "node": ">=10"
              }
            },
            "node_modules/@emotion/hash": {
              "version": "0.8.0",
              "resolved": "https://registry.npmjs.org/@emotion/hash/-/hash-0.8.0.tgz",
              "integrity": "sha512-kBJtf7PH6aWwZ6fka3zQ0p6SBYzx4fl1LoZXE2RrnYST9Xljm7WfKJrU4g/Xr3Beg72MLrp1AWNUmuYJTL7Cow=="
            },
            "node_modules/@emotion/unitless": {
              "version": "0.7.5",
              "resolved": "https://registry.npmjs.org/@emotion/unitless/-/unitless-0.7.5.tgz",
              "integrity": "sha512-OWORNpfjMsSSUBVrRBVGECkhWcULOAJz9ZW8uK9qgxD+87M7jHRcvh/A96XXNhXTLmKcoYSQtBEX7lHMO7YRwg=="
            },
            "node_modules/@ethersproject/abi": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/abi/-/abi-5.7.0.tgz",
              "integrity": "sha512-351ktp42TiRcYB3H1OP8yajPeAQstMW/yCFokj/AthP9bLHzQFPlOrxOcwYEDkUAICmOHljvN4K39OMTMUa9RA==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/address": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/constants": "^5.7.0",
                "@ethersproject/hash": "^5.7.0",
                "@ethersproject/keccak256": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/strings": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/abstract-provider": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/abstract-provider/-/abstract-provider-5.7.0.tgz",
              "integrity": "sha512-R41c9UkchKCpAqStMYUpdunjo3pkEvZC3FAwZn5S5MGbXoMQOHIdHItezTETxAO5bevtMApSyEhn9+CHcDsWBw==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/networks": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/transactions": "^5.7.0",
                "@ethersproject/web": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/abstract-signer": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/abstract-signer/-/abstract-signer-5.7.0.tgz",
              "integrity": "sha512-a16V8bq1/Cz+TGCkE2OPMTOUDLS3grCpdjoJCYNnVBbdYEMSgKrU0+B90s8b6H+ByYTBZN7a3g76jdIJi7UfKQ==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/abstract-provider": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/address": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/address/-/address-5.7.0.tgz",
              "integrity": "sha512-9wYhYt7aghVGo758POM5nqcOMaE168Q6aRLJZwUmiqSrAungkG74gSSeKEIR7ukixesdRZGPgVqme6vmxs1fkA==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/keccak256": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/rlp": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/base64": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/base64/-/base64-5.7.0.tgz",
              "integrity": "sha512-Dr8tcHt2mEbsZr/mwTPIQAf3Ai0Bks/7gTw9dSqk1mQvhW3XvRlmDJr/4n+wg1JmCl16NZue17CDh8xb/vZ0sQ==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bytes": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/basex": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/basex/-/basex-5.7.0.tgz",
              "integrity": "sha512-ywlh43GwZLv2Voc2gQVTKBoVQ1mti3d8HK5aMxsfu/nRDnMmNqaSJ3r3n85HBByT8OpoY96SXM1FogC533T4zw==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/properties": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/bignumber": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/bignumber/-/bignumber-5.7.0.tgz",
              "integrity": "sha512-n1CAdIHRWjSucQO3MC1zPSVgV/6dy/fjL9pMrPP9peL+QxEg9wOsVqwD4+818B6LUEtaXzVHQiuivzRoxPxUGw==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "bn.js": "^5.2.1"
              }
            },
            "node_modules/@ethersproject/bytes": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/bytes/-/bytes-5.7.0.tgz",
              "integrity": "sha512-nsbxwgFXWh9NyYWo+U8atvmMsSdKJprTcICAkvbBffT75qDocbuggBU0SJiVK2MuTrp0q+xvLkTnGMPK1+uA9A==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/logger": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/constants": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/constants/-/constants-5.7.0.tgz",
              "integrity": "sha512-DHI+y5dBNvkpYUMiRQyxRBYBefZkJfo70VUkUAsRjcPs47muV9evftfZ0PJVCXYbAiCgght0DtcF9srFQmIgWA==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bignumber": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/contracts": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/contracts/-/contracts-5.7.0.tgz",
              "integrity": "sha512-5GJbzEU3X+d33CdfPhcyS+z8MzsTrBGk/sc+G+59+tPa9yFkl6HQ9D6L0QMgNTA9q8dT0XKxxkyp883XsQvbbg==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/abi": "^5.7.0",
                "@ethersproject/abstract-provider": "^5.7.0",
                "@ethersproject/abstract-signer": "^5.7.0",
                "@ethersproject/address": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/constants": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/transactions": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/hash": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/hash/-/hash-5.7.0.tgz",
              "integrity": "sha512-qX5WrQfnah1EFnO5zJv1v46a8HW0+E5xuBBDTwMFZLuVTx0tbU2kkx15NqdjxecrLGatQN9FGQKpb1FKdHCt+g==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/abstract-signer": "^5.7.0",
                "@ethersproject/address": "^5.7.0",
                "@ethersproject/base64": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/keccak256": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/strings": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/hdnode": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/hdnode/-/hdnode-5.7.0.tgz",
              "integrity": "sha512-OmyYo9EENBPPf4ERhR7oj6uAtUAhYGqOnIS+jE5pTXvdKBS99ikzq1E7Iv0ZQZ5V36Lqx1qZLeak0Ra16qpeOg==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/abstract-signer": "^5.7.0",
                "@ethersproject/basex": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/pbkdf2": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/sha2": "^5.7.0",
                "@ethersproject/signing-key": "^5.7.0",
                "@ethersproject/strings": "^5.7.0",
                "@ethersproject/transactions": "^5.7.0",
                "@ethersproject/wordlists": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/json-wallets": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/json-wallets/-/json-wallets-5.7.0.tgz",
              "integrity": "sha512-8oee5Xgu6+RKgJTkvEMl2wDgSPSAQ9MB/3JYjFV9jlKvcYHUXZC+cQp0njgmxdHkYWn8s6/IqIZYm0YWCjO/0g==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/abstract-signer": "^5.7.0",
                "@ethersproject/address": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/hdnode": "^5.7.0",
                "@ethersproject/keccak256": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/pbkdf2": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/random": "^5.7.0",
                "@ethersproject/strings": "^5.7.0",
                "@ethersproject/transactions": "^5.7.0",
                "aes-js": "3.0.0",
                "scrypt-js": "3.0.1"
              }
            },
            "node_modules/@ethersproject/json-wallets/node_modules/aes-js": {
              "version": "3.0.0",
              "resolved": "https://registry.npmjs.org/aes-js/-/aes-js-3.0.0.tgz",
              "integrity": "sha512-H7wUZRn8WpTq9jocdxQ2c8x2sKo9ZVmzfRE13GiNJXfp7NcKYEdvl3vspKjXox6RIG2VtaRe4JFvxG4rqp2Zuw=="
            },
            "node_modules/@ethersproject/keccak256": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/keccak256/-/keccak256-5.7.0.tgz",
              "integrity": "sha512-2UcPboeL/iW+pSg6vZ6ydF8tCnv3Iu/8tUmLLzWWGzxWKFFqOBQFLo6uLUv6BDrLgCDfN28RJ/wtByx+jZ4KBg==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bytes": "^5.7.0",
                "js-sha3": "0.8.0"
              }
            },
            "node_modules/@ethersproject/logger": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/logger/-/logger-5.7.0.tgz",
              "integrity": "sha512-0odtFdXu/XHtjQXJYA3u9G0G8btm0ND5Cu8M7i5vhEcE8/HmF4Lbdqanwyv4uQTr2tx6b7fQRmgLrsnpQlmnig==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ]
            },
            "node_modules/@ethersproject/networks": {
              "version": "5.7.1",
              "resolved": "https://registry.npmjs.org/@ethersproject/networks/-/networks-5.7.1.tgz",
              "integrity": "sha512-n/MufjFYv3yFcUyfhnXotyDlNdFb7onmkSy8aQERi2PjNcnWQ66xXxa3XlS8nCcA8aJKJjIIMNJTC7tu80GwpQ==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/logger": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/pbkdf2": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/pbkdf2/-/pbkdf2-5.7.0.tgz",
              "integrity": "sha512-oR/dBRZR6GTyaofd86DehG72hY6NpAjhabkhxgr3X2FpJtJuodEl2auADWBZfhDHgVCbu3/H/Ocq2uC6dpNjjw==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/sha2": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/properties": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/properties/-/properties-5.7.0.tgz",
              "integrity": "sha512-J87jy8suntrAkIZtecpxEPxY//szqr1mlBaYlQ0r4RCaiD2hjheqF9s1LVE8vVuJCXisjIP+JgtK/Do54ej4Sw==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/logger": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/providers": {
              "version": "5.7.2",
              "resolved": "https://registry.npmjs.org/@ethersproject/providers/-/providers-5.7.2.tgz",
              "integrity": "sha512-g34EWZ1WWAVgr4aptGlVBF8mhl3VWjv+8hoAnzStu8Ah22VHBsuGzP17eb6xDVRzw895G4W7vvx60lFFur/1Rg==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/abstract-provider": "^5.7.0",
                "@ethersproject/abstract-signer": "^5.7.0",
                "@ethersproject/address": "^5.7.0",
                "@ethersproject/base64": "^5.7.0",
                "@ethersproject/basex": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/constants": "^5.7.0",
                "@ethersproject/hash": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/networks": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/random": "^5.7.0",
                "@ethersproject/rlp": "^5.7.0",
                "@ethersproject/sha2": "^5.7.0",
                "@ethersproject/strings": "^5.7.0",
                "@ethersproject/transactions": "^5.7.0",
                "@ethersproject/web": "^5.7.0",
                "bech32": "1.1.4",
                "ws": "7.4.6"
              }
            },
            "node_modules/@ethersproject/providers/node_modules/ws": {
              "version": "7.4.6",
              "resolved": "https://registry.npmjs.org/ws/-/ws-7.4.6.tgz",
              "integrity": "sha512-YmhHDO4MzaDLB+M9ym/mDA5z0naX8j7SIlT8f8z+I0VtzsRbekxEutHSme7NPS2qE8StCYQNUnfWdXta/Yu85A==",
              "engines": {
                "node": ">=8.3.0"
              },
              "peerDependencies": {
                "bufferutil": "^4.0.1",
                "utf-8-validate": "^5.0.2"
              },
              "peerDependenciesMeta": {
                "bufferutil": {
                  "optional": true
                },
                "utf-8-validate": {
                  "optional": true
                }
              }
            },
            "node_modules/@ethersproject/random": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/random/-/random-5.7.0.tgz",
              "integrity": "sha512-19WjScqRA8IIeWclFme75VMXSBvi4e6InrUNuaR4s5pTF2qNhcGdCUwdxUVGtDDqC00sDLCO93jPQoDUH4HVmQ==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/rlp": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/rlp/-/rlp-5.7.0.tgz",
              "integrity": "sha512-rBxzX2vK8mVF7b0Tol44t5Tb8gomOHkj5guL+HhzQ1yBh/ydjGnpw6at+X6Iw0Kp3OzzzkcKp8N9r0W4kYSs9w==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/sha2": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/sha2/-/sha2-5.7.0.tgz",
              "integrity": "sha512-gKlH42riwb3KYp0reLsFTokByAKoJdgFCwI+CCiX/k+Jm2mbNs6oOaCjYQSlI1+XBVejwH2KrmCbMAT/GnRDQw==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "hash.js": "1.1.7"
              }
            },
            "node_modules/@ethersproject/signing-key": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/signing-key/-/signing-key-5.7.0.tgz",
              "integrity": "sha512-MZdy2nL3wO0u7gkB4nA/pEf8lu1TlFswPNmy8AiYkfKTdO6eXBJyUdmHO/ehm/htHw9K/qF8ujnTyUAD+Ry54Q==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "bn.js": "^5.2.1",
                "elliptic": "6.5.4",
                "hash.js": "1.1.7"
              }
            },
            "node_modules/@ethersproject/solidity": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/solidity/-/solidity-5.7.0.tgz",
              "integrity": "sha512-HmabMd2Dt/raavyaGukF4XxizWKhKQ24DoLtdNbBmNKUOPqwjsKQSdV9GQtj9CBEea9DlzETlVER1gYeXXBGaA==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/keccak256": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/sha2": "^5.7.0",
                "@ethersproject/strings": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/strings": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/strings/-/strings-5.7.0.tgz",
              "integrity": "sha512-/9nu+lj0YswRNSH0NXYqrh8775XNyEdUQAuf3f+SmOrnVewcJ5SBNAjF7lpgehKi4abvNNXyf+HX86czCdJ8Mg==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/constants": "^5.7.0",
                "@ethersproject/logger": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/transactions": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/transactions/-/transactions-5.7.0.tgz",
              "integrity": "sha512-kmcNicCp1lp8qanMTC3RIikGgoJ80ztTyvtsFvCYpSCfkjhD0jZ2LOrnbcuxuToLIUYYf+4XwD1rP+B/erDIhQ==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/address": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/constants": "^5.7.0",
                "@ethersproject/keccak256": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/rlp": "^5.7.0",
                "@ethersproject/signing-key": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/units": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/units/-/units-5.7.0.tgz",
              "integrity": "sha512-pD3xLMy3SJu9kG5xDGI7+xhTEmGXlEqXU4OfNapmfnxLVY4EMSSRp7j1k7eezutBPH7RBN/7QPnwR7hzNlEFeg==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/constants": "^5.7.0",
                "@ethersproject/logger": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/wallet": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/wallet/-/wallet-5.7.0.tgz",
              "integrity": "sha512-MhmXlJXEJFBFVKrDLB4ZdDzxcBxQ3rLyCkhNqVu3CDYvR97E+8r01UgrI+TI99Le+aYm/in/0vp86guJuM7FCA==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/abstract-provider": "^5.7.0",
                "@ethersproject/abstract-signer": "^5.7.0",
                "@ethersproject/address": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/hash": "^5.7.0",
                "@ethersproject/hdnode": "^5.7.0",
                "@ethersproject/json-wallets": "^5.7.0",
                "@ethersproject/keccak256": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/random": "^5.7.0",
                "@ethersproject/signing-key": "^5.7.0",
                "@ethersproject/transactions": "^5.7.0",
                "@ethersproject/wordlists": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/web": {
              "version": "5.7.1",
              "resolved": "https://registry.npmjs.org/@ethersproject/web/-/web-5.7.1.tgz",
              "integrity": "sha512-Gueu8lSvyjBWL4cYsWsjh6MtMwM0+H4HvqFPZfB6dV8ctbP9zFAO73VG1cMWae0FLPCtz0peKPpZY8/ugJJX2w==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/base64": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/strings": "^5.7.0"
              }
            },
            "node_modules/@ethersproject/wordlists": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/wordlists/-/wordlists-5.7.0.tgz",
              "integrity": "sha512-S2TFNJNfHWVHNE6cNDjbVlZ6MgE17MIxMbMg2zv3wn+3XSJGosL1m9ZVv3GXCf/2ymSsQ+hRI5IzoMJTG6aoVA==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/hash": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/strings": "^5.7.0"
              }
            },
            "node_modules/@jridgewell/gen-mapping": {
              "version": "0.3.3",
              "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.3.tgz",
              "integrity": "sha512-HLhSWOLRi875zjjMG/r+Nv0oCW8umGb0BgEhyX3dDX3egwZtB8PqLnjz3yedt8R5StBrzcg4aBpnh8UA9D1BoQ==",
              "dev": true,
              "dependencies": {
                "@jridgewell/set-array": "^1.0.1",
                "@jridgewell/sourcemap-codec": "^1.4.10",
                "@jridgewell/trace-mapping": "^0.3.9"
              },
              "engines": {
                "node": ">=6.0.0"
              }
            },
            "node_modules/@jridgewell/resolve-uri": {
              "version": "3.1.1",
              "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.1.tgz",
              "integrity": "sha512-dSYZh7HhCDtCKm4QakX0xFpsRDqjjtZf/kjI/v3T3Nwt5r8/qz/M19F9ySyOqU94SXBmeG9ttTul+YnR4LOxFA==",
              "dev": true,
              "engines": {
                "node": ">=6.0.0"
              }
            },
            "node_modules/@jridgewell/set-array": {
              "version": "1.1.2",
              "resolved": "https://registry.npmjs.org/@jridgewell/set-array/-/set-array-1.1.2.tgz",
              "integrity": "sha512-xnkseuNADM0gt2bs+BvhO0p78Mk762YnZdsuzFV018NoG1Sj1SCQvpSqa7XUaTam5vAGasABV9qXASMKnFMwMw==",
              "dev": true,
              "engines": {
                "node": ">=6.0.0"
              }
            },
            "node_modules/@jridgewell/sourcemap-codec": {
              "version": "1.4.15",
              "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.4.15.tgz",
              "integrity": "sha512-eF2rxCRulEKXHTRiDrDy6erMYWqNw4LPdQ8UQA4huuxaQsVeRPFl2oM8oDGxMFhJUWZf9McpLtJasDDZb/Bpeg==",
              "dev": true
            },
            "node_modules/@jridgewell/trace-mapping": {
              "version": "0.3.19",
              "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.19.tgz",
              "integrity": "sha512-kf37QtfW+Hwx/buWGMPcR60iF9ziHa6r/CZJIHbmcm4+0qrXiVdxegAH0F6yddEVQ7zdkjcGCgCzUu+BcbhQxw==",
              "dev": true,
              "dependencies": {
                "@jridgewell/resolve-uri": "^3.1.0",
                "@jridgewell/sourcemap-codec": "^1.4.14"
              }
            },
            "node_modules/@json-rpc-tools/provider": {
              "version": "1.7.6",
              "resolved": "https://registry.npmjs.org/@json-rpc-tools/provider/-/provider-1.7.6.tgz",
              "integrity": "sha512-z7D3xvJ33UfCGv77n40lbzOYjZKVM3k2+5cV7xS8G6SCvKTzMkhkUYuD/qzQUNT4cG/lv0e9mRToweEEVLVVmA==",
              "deprecated": "Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.",
              "dependencies": {
                "@json-rpc-tools/utils": "^1.7.6",
                "axios": "^0.21.0",
                "safe-json-utils": "^1.1.1",
                "ws": "^7.4.0"
              }
            },
            "node_modules/@json-rpc-tools/provider/node_modules/axios": {
              "version": "0.21.4",
              "resolved": "https://registry.npmjs.org/axios/-/axios-0.21.4.tgz",
              "integrity": "sha512-ut5vewkiu8jjGBdqpM44XxjuCjq9LAKeHVmoVfHVzy8eHgxxq8SbAVQNovDA8mVi05kP0Ea/n/UzcSHcTJQfNg==",
              "dependencies": {
                "follow-redirects": "^1.14.0"
              }
            },
            "node_modules/@json-rpc-tools/provider/node_modules/ws": {
              "version": "7.5.9",
              "resolved": "https://registry.npmjs.org/ws/-/ws-7.5.9.tgz",
              "integrity": "sha512-F+P9Jil7UiSKSkppIiD94dN07AwvFixvLIj1Og1Rl9GGMuNipJnV9JzjD6XuqmAeiswGvUmNLjr5cFuXwNS77Q==",
              "engines": {
                "node": ">=8.3.0"
              },
              "peerDependencies": {
                "bufferutil": "^4.0.1",
                "utf-8-validate": "^5.0.2"
              },
              "peerDependenciesMeta": {
                "bufferutil": {
                  "optional": true
                },
                "utf-8-validate": {
                  "optional": true
                }
              }
            },
            "node_modules/@json-rpc-tools/types": {
              "version": "1.7.6",
              "resolved": "https://registry.npmjs.org/@json-rpc-tools/types/-/types-1.7.6.tgz",
              "integrity": "sha512-nDSqmyRNEqEK9TZHtM15uNnDljczhCUdBmRhpNZ95bIPKEDQ+nTDmGMFd2lLin3upc5h2VVVd9tkTDdbXUhDIQ==",
              "deprecated": "Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.",
              "dependencies": {
                "keyvaluestorage-interface": "^1.0.0"
              }
            },
            "node_modules/@json-rpc-tools/utils": {
              "version": "1.7.6",
              "resolved": "https://registry.npmjs.org/@json-rpc-tools/utils/-/utils-1.7.6.tgz",
              "integrity": "sha512-HjA8x/U/Q78HRRe19yh8HVKoZ+Iaoo3YZjakJYxR+rw52NHo6jM+VE9b8+7ygkCFXl/EHID5wh/MkXaE/jGyYw==",
              "deprecated": "Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.",
              "dependencies": {
                "@json-rpc-tools/types": "^1.7.6",
                "@pedrouid/environment": "^1.0.1"
              }
            },
            "node_modules/@ledgerhq/connect-kit-loader": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@ledgerhq/connect-kit-loader/-/connect-kit-loader-1.0.2.tgz",
              "integrity": "sha512-TQ21IjcZOw/scqypaVFY3jHVqI7X7Hta3qN/us6FvTol3AY06UmrhhXGww0E9xHmAbdX241ddwXEiMBSQZFr9g=="
            },
            "node_modules/@lit-labs/ssr-dom-shim": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/@lit-labs/ssr-dom-shim/-/ssr-dom-shim-1.1.1.tgz",
              "integrity": "sha512-kXOeFbfCm4fFf2A3WwVEeQj55tMZa8c8/f9AKHMobQMkzNUfUj+antR3fRPaZJawsa1aZiP/Da3ndpZrwEe4rQ=="
            },
            "node_modules/@lit/reactive-element": {
              "version": "1.6.1",
              "resolved": "https://registry.npmjs.org/@lit/reactive-element/-/reactive-element-1.6.1.tgz",
              "integrity": "sha512-va15kYZr7KZNNPZdxONGQzpUr+4sxVu7V/VG7a8mRfPPXUyhEYj5RzXCQmGrlP3tAh0L3HHm5AjBMFYRqlM9SA==",
              "dependencies": {
                "@lit-labs/ssr-dom-shim": "^1.0.0"
              }
            },
            "node_modules/@metamask/safe-event-emitter": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/@metamask/safe-event-emitter/-/safe-event-emitter-2.0.0.tgz",
              "integrity": "sha512-/kSXhY692qiV1MXu6EeOZvg5nECLclxNXcKCxJ3cXQgYuRymRHpdx/t7JXfsK+JLjwA1e1c1/SBrlQYpusC29Q=="
            },
            "node_modules/@metamask/utils": {
              "version": "3.6.0",
              "resolved": "https://registry.npmjs.org/@metamask/utils/-/utils-3.6.0.tgz",
              "integrity": "sha512-9cIRrfkWvHblSiNDVXsjivqa9Ak0RYo/1H6tqTqTbAx+oBK2Sva0lWDHxGchOqA7bySGUJKAWSNJvH6gdHZ0gQ==",
              "dependencies": {
                "@types/debug": "^4.1.7",
                "debug": "^4.3.4",
                "semver": "^7.3.8",
                "superstruct": "^1.0.3"
              },
              "engines": {
                "node": ">=14.0.0"
              }
            },
            "node_modules/@metamask/utils/node_modules/superstruct": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/superstruct/-/superstruct-1.0.3.tgz",
              "integrity": "sha512-8iTn3oSS8nRGn+C2pgXSKPI3jmpm6FExNazNpjvqS6ZUJQCej3PUXEKM8NjHBOs54ExM+LPW/FBRhymrdcCiSg==",
              "engines": {
                "node": ">=14.0.0"
              }
            },
            "node_modules/@motionone/animation": {
              "version": "10.15.1",
              "resolved": "https://registry.npmjs.org/@motionone/animation/-/animation-10.15.1.tgz",
              "integrity": "sha512-mZcJxLjHor+bhcPuIFErMDNyrdb2vJur8lSfMCsuCB4UyV8ILZLvK+t+pg56erv8ud9xQGK/1OGPt10agPrCyQ==",
              "dependencies": {
                "@motionone/easing": "^10.15.1",
                "@motionone/types": "^10.15.1",
                "@motionone/utils": "^10.15.1",
                "tslib": "^2.3.1"
              }
            },
            "node_modules/@motionone/dom": {
              "version": "10.16.2",
              "resolved": "https://registry.npmjs.org/@motionone/dom/-/dom-10.16.2.tgz",
              "integrity": "sha512-bnuHdNbge1FutZXv+k7xub9oPWcF0hsu8y1HTH/qg6av58YI0VufZ3ngfC7p2xhMJMnoh0LXFma2EGTgPeCkeg==",
              "dependencies": {
                "@motionone/animation": "^10.15.1",
                "@motionone/generators": "^10.15.1",
                "@motionone/types": "^10.15.1",
                "@motionone/utils": "^10.15.1",
                "hey-listen": "^1.0.8",
                "tslib": "^2.3.1"
              }
            },
            "node_modules/@motionone/easing": {
              "version": "10.15.1",
              "resolved": "https://registry.npmjs.org/@motionone/easing/-/easing-10.15.1.tgz",
              "integrity": "sha512-6hIHBSV+ZVehf9dcKZLT7p5PEKHGhDwky2k8RKkmOvUoYP3S+dXsKupyZpqx5apjd9f+php4vXk4LuS+ADsrWw==",
              "dependencies": {
                "@motionone/utils": "^10.15.1",
                "tslib": "^2.3.1"
              }
            },
            "node_modules/@motionone/generators": {
              "version": "10.15.1",
              "resolved": "https://registry.npmjs.org/@motionone/generators/-/generators-10.15.1.tgz",
              "integrity": "sha512-67HLsvHJbw6cIbLA/o+gsm7h+6D4Sn7AUrB/GPxvujse1cGZ38F5H7DzoH7PhX+sjvtDnt2IhFYF2Zp1QTMKWQ==",
              "dependencies": {
                "@motionone/types": "^10.15.1",
                "@motionone/utils": "^10.15.1",
                "tslib": "^2.3.1"
              }
            },
            "node_modules/@motionone/svelte": {
              "version": "10.16.2",
              "resolved": "https://registry.npmjs.org/@motionone/svelte/-/svelte-10.16.2.tgz",
              "integrity": "sha512-38xsroKrfK+aHYhuQlE6eFcGy0EwrB43Q7RGjF73j/kRUTcLNu/LAaKiLLsN5lyqVzCgTBVt4TMT/ShWbTbc5Q==",
              "dependencies": {
                "@motionone/dom": "^10.16.2",
                "tslib": "^2.3.1"
              }
            },
            "node_modules/@motionone/types": {
              "version": "10.15.1",
              "resolved": "https://registry.npmjs.org/@motionone/types/-/types-10.15.1.tgz",
              "integrity": "sha512-iIUd/EgUsRZGrvW0jqdst8st7zKTzS9EsKkP+6c6n4MPZoQHwiHuVtTQLD6Kp0bsBLhNzKIBlHXponn/SDT4hA=="
            },
            "node_modules/@motionone/utils": {
              "version": "10.15.1",
              "resolved": "https://registry.npmjs.org/@motionone/utils/-/utils-10.15.1.tgz",
              "integrity": "sha512-p0YncgU+iklvYr/Dq4NobTRdAPv9PveRDUXabPEeOjBLSO/1FNB2phNTZxOxpi1/GZwYpAoECEa0Wam+nsmhSw==",
              "dependencies": {
                "@motionone/types": "^10.15.1",
                "hey-listen": "^1.0.8",
                "tslib": "^2.3.1"
              }
            },
            "node_modules/@motionone/vue": {
              "version": "10.16.2",
              "resolved": "https://registry.npmjs.org/@motionone/vue/-/vue-10.16.2.tgz",
              "integrity": "sha512-7/dEK/nWQXOkJ70bqb2KyNfSWbNvWqKKq1C8juj+0Mg/AorgD8O5wE3naddK0G+aXuNMqRuc4jlsYHHWHtIzVw==",
              "dependencies": {
                "@motionone/dom": "^10.16.2",
                "tslib": "^2.3.1"
              }
            },
            "node_modules/@next/env": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/env/-/env-13.5.6.tgz",
              "integrity": "sha512-Yac/bV5sBGkkEXmAX5FWPS9Mmo2rthrOPRQQNfycJPkjUAUclomCPH7QFVCDQ4Mp2k2K1SSM6m0zrxYrOwtFQw=="
            },
            "node_modules/@next/swc-darwin-arm64": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-darwin-arm64/-/swc-darwin-arm64-13.5.6.tgz",
              "integrity": "sha512-5nvXMzKtZfvcu4BhtV0KH1oGv4XEW+B+jOfmBdpFI3C7FrB/MfujRpWYSBBO64+qbW8pkZiSyQv9eiwnn5VIQA==",
              "cpu": [
                "arm64"
              ],
              "optional": true,
              "os": [
                "darwin"
              ],
              "engines": {
                "node": ">= 10"
              }
            },
            "node_modules/@next/swc-darwin-x64": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-darwin-x64/-/swc-darwin-x64-13.5.6.tgz",
              "integrity": "sha512-6cgBfxg98oOCSr4BckWjLLgiVwlL3vlLj8hXg2b+nDgm4bC/qVXXLfpLB9FHdoDu4057hzywbxKvmYGmi7yUzA==",
              "cpu": [
                "x64"
              ],
              "optional": true,
              "os": [
                "darwin"
              ],
              "engines": {
                "node": ">= 10"
              }
            },
            "node_modules/@next/swc-linux-arm64-gnu": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-gnu/-/swc-linux-arm64-gnu-13.5.6.tgz",
              "integrity": "sha512-txagBbj1e1w47YQjcKgSU4rRVQ7uF29YpnlHV5xuVUsgCUf2FmyfJ3CPjZUvpIeXCJAoMCFAoGnbtX86BK7+sg==",
              "cpu": [
                "arm64"
              ],
              "optional": true,
              "os": [
                "linux"
              ],
              "engines": {
                "node": ">= 10"
              }
            },
            "node_modules/@next/swc-linux-arm64-musl": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-musl/-/swc-linux-arm64-musl-13.5.6.tgz",
              "integrity": "sha512-cGd+H8amifT86ZldVJtAKDxUqeFyLWW+v2NlBULnLAdWsiuuN8TuhVBt8ZNpCqcAuoruoSWynvMWixTFcroq+Q==",
              "cpu": [
                "arm64"
              ],
              "optional": true,
              "os": [
                "linux"
              ],
              "engines": {
                "node": ">= 10"
              }
            },
            "node_modules/@next/swc-linux-x64-gnu": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-13.5.6.tgz",
              "integrity": "sha512-Mc2b4xiIWKXIhBy2NBTwOxGD3nHLmq4keFk+d4/WL5fMsB8XdJRdtUlL87SqVCTSaf1BRuQQf1HvXZcy+rq3Nw==",
              "cpu": [
                "x64"
              ],
              "optional": true,
              "os": [
                "linux"
              ],
              "engines": {
                "node": ">= 10"
              }
            },
            "node_modules/@next/swc-linux-x64-musl": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-musl/-/swc-linux-x64-musl-13.5.6.tgz",
              "integrity": "sha512-CFHvP9Qz98NruJiUnCe61O6GveKKHpJLloXbDSWRhqhkJdZD2zU5hG+gtVJR//tyW897izuHpM6Gtf6+sNgJPQ==",
              "cpu": [
                "x64"
              ],
              "optional": true,
              "os": [
                "linux"
              ],
              "engines": {
                "node": ">= 10"
              }
            },
            "node_modules/@next/swc-win32-arm64-msvc": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-win32-arm64-msvc/-/swc-win32-arm64-msvc-13.5.6.tgz",
              "integrity": "sha512-aFv1ejfkbS7PUa1qVPwzDHjQWQtknzAZWGTKYIAaS4NMtBlk3VyA6AYn593pqNanlicewqyl2jUhQAaFV/qXsg==",
              "cpu": [
                "arm64"
              ],
              "optional": true,
              "os": [
                "win32"
              ],
              "engines": {
                "node": ">= 10"
              }
            },
            "node_modules/@next/swc-win32-ia32-msvc": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-win32-ia32-msvc/-/swc-win32-ia32-msvc-13.5.6.tgz",
              "integrity": "sha512-XqqpHgEIlBHvzwG8sp/JXMFkLAfGLqkbVsyN+/Ih1mR8INb6YCc2x/Mbwi6hsAgUnqQztz8cvEbHJUbSl7RHDg==",
              "cpu": [
                "ia32"
              ],
              "optional": true,
              "os": [
                "win32"
              ],
              "engines": {
                "node": ">= 10"
              }
            },
            "node_modules/@next/swc-win32-x64-msvc": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-win32-x64-msvc/-/swc-win32-x64-msvc-13.5.6.tgz",
              "integrity": "sha512-Cqfe1YmOS7k+5mGu92nl5ULkzpKuxJrP3+4AEuPmrpFZ3BHxTY3TnHmU1On3bFmFFs6FbTcdF58CCUProGpIGQ==",
              "cpu": [
                "x64"
              ],
              "optional": true,
              "os": [
                "win32"
              ],
              "engines": {
                "node": ">= 10"
              }
            },
            "node_modules/@noble/curves": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/@noble/curves/-/curves-1.0.0.tgz",
              "integrity": "sha512-2upgEu0iLiDVDZkNLeFV2+ht0BAVgQnEmCk6JsOch9Rp8xfkMCbvbAZlA2pBHQc73dbl+vFOXfqkf4uemdn0bw==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://paulmillr.com/funding/"
                }
              ],
              "dependencies": {
                "@noble/hashes": "1.3.0"
              }
            },
            "node_modules/@noble/hashes": {
              "version": "1.3.0",
              "resolved": "https://registry.npmjs.org/@noble/hashes/-/hashes-1.3.0.tgz",
              "integrity": "sha512-ilHEACi9DwqJB0pw7kv+Apvh50jiiSyR/cQ3y4W7lOR5mhvn/50FLUfsnfJz0BDZtl/RR16kXvptiv6q1msYZg==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://paulmillr.com/funding/"
                }
              ]
            },
            "node_modules/@nodelib/fs.scandir": {
              "version": "2.1.5",
              "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
              "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
              "dev": true,
              "dependencies": {
                "@nodelib/fs.stat": "2.0.5",
                "run-parallel": "^1.1.9"
              },
              "engines": {
                "node": ">= 8"
              }
            },
            "node_modules/@nodelib/fs.stat": {
              "version": "2.0.5",
              "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
              "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
              "dev": true,
              "engines": {
                "node": ">= 8"
              }
            },
            "node_modules/@nodelib/fs.walk": {
              "version": "1.2.8",
              "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
              "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
              "dev": true,
              "dependencies": {
                "@nodelib/fs.scandir": "2.1.5",
                "fastq": "^1.6.0"
              },
              "engines": {
                "node": ">= 8"
              }
            },
            "node_modules/@panva/hkdf": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/@panva/hkdf/-/hkdf-1.1.1.tgz",
              "integrity": "sha512-dhPeilub1NuIG0X5Kvhh9lH4iW3ZsHlnzwgwbOlgwQ2wG1IqFzsgHqmKPk3WzsdWAeaxKJxgM0+W433RmN45GA==",
              "funding": {
                "url": "https://github.com/sponsors/panva"
              }
            },
            "node_modules/@peculiar/asn1-schema": {
              "version": "2.3.6",
              "resolved": "https://registry.npmjs.org/@peculiar/asn1-schema/-/asn1-schema-2.3.6.tgz",
              "integrity": "sha512-izNRxPoaeJeg/AyH8hER6s+H7p4itk+03QCa4sbxI3lNdseQYCuxzgsuNK8bTXChtLTjpJz6NmXKA73qLa3rCA==",
              "dependencies": {
                "asn1js": "^3.0.5",
                "pvtsutils": "^1.3.2",
                "tslib": "^2.4.0"
              }
            },
            "node_modules/@peculiar/json-schema": {
              "version": "1.1.12",
              "resolved": "https://registry.npmjs.org/@peculiar/json-schema/-/json-schema-1.1.12.tgz",
              "integrity": "sha512-coUfuoMeIB7B8/NMekxaDzLhaYmp0HZNPEjYRm9goRou8UZIC3z21s0sL9AWoCw4EG876QyO3kYrc61WNF9B/w==",
              "dependencies": {
                "tslib": "^2.0.0"
              },
              "engines": {
                "node": ">=8.0.0"
              }
            },
            "node_modules/@peculiar/webcrypto": {
              "version": "1.4.3",
              "resolved": "https://registry.npmjs.org/@peculiar/webcrypto/-/webcrypto-1.4.3.tgz",
              "integrity": "sha512-VtaY4spKTdN5LjJ04im/d/joXuvLbQdgy5Z4DXF4MFZhQ+MTrejbNMkfZBp1Bs3O5+bFqnJgyGdPuZQflvIa5A==",
              "dependencies": {
                "@peculiar/asn1-schema": "^2.3.6",
                "@peculiar/json-schema": "^1.1.12",
                "pvtsutils": "^1.3.2",
                "tslib": "^2.5.0",
                "webcrypto-core": "^1.7.7"
              },
              "engines": {
                "node": ">=10.12.0"
              }
            },
            "node_modules/@pedrouid/environment": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@pedrouid/environment/-/environment-1.0.1.tgz",
              "integrity": "sha512-HaW78NszGzRZd9SeoI3JD11JqY+lubnaOx7Pewj5pfjqWXOEATpeKIFb9Z4t2WBUK2iryiXX3lzWwmYWgUL0Ug=="
            },
            "node_modules/@rainbow-me/rainbowkit": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@rainbow-me/rainbowkit/-/rainbowkit-1.0.1.tgz",
              "integrity": "sha512-P+2lgHaN5X84K1e+MARUydyhYRS+nStN4H470QloBBWP5UsidHZpSJGd4qi0WFtfR6zBff96N6kmsfJo7PjFhQ==",
              "dependencies": {
                "@vanilla-extract/css": "1.9.1",
                "@vanilla-extract/dynamic": "2.0.2",
                "@vanilla-extract/sprinkles": "1.5.0",
                "clsx": "1.1.1",
                "qrcode": "1.5.0",
                "react-remove-scroll": "2.5.4"
              },
              "engines": {
                "node": ">=12.4"
              },
              "peerDependencies": {
                "react": ">=17",
                "react-dom": ">=17",
                "viem": "~0.3.19",
                "wagmi": "~1.0.1"
              }
            },
            "node_modules/@rainbow-me/rainbowkit-siwe-next-auth": {
              "version": "0.2.0",
              "resolved": "https://registry.npmjs.org/@rainbow-me/rainbowkit-siwe-next-auth/-/rainbowkit-siwe-next-auth-0.2.0.tgz",
              "integrity": "sha512-U0GPPc5tRhNSLgdLb4sU6eha7qxIJmfNbUmcGeQGh7IR/jw3xFdYYKYaHcEG8rB09/yfEMQodwJiV+vrjta6zQ==",
              "engines": {
                "node": ">=12.4"
              },
              "peerDependencies": {
                "@rainbow-me/rainbowkit": "1.0.x",
                "next-auth": ">=4.10.2 <=4.20.1",
                "react": ">=17",
                "siwe": "^2.1.4"
              }
            },
            "node_modules/@rainbow-me/rainbowkit/node_modules/clsx": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/clsx/-/clsx-1.1.1.tgz",
              "integrity": "sha512-6/bPho624p3S2pMyvP5kKBPXnI3ufHLObBFCfgx+LkeR5lg2XYy2hqZqUf45ypD8COn2bhgGJSUE+l5dhNBieA==",
              "engines": {
                "node": ">=6"
              }
            },
            "node_modules/@rc-component/color-picker": {
              "version": "1.4.1",
              "resolved": "https://registry.npmjs.org/@rc-component/color-picker/-/color-picker-1.4.1.tgz",
              "integrity": "sha512-vh5EWqnsayZa/JwUznqDaPJz39jznx/YDbyBuVJntv735tKXKwEUZZb2jYEldOg+NKWZwtALjGMrNeGBmqFoEw==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "@ctrl/tinycolor": "^3.6.0",
                "classnames": "^2.2.6",
                "rc-util": "^5.30.0"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/@rc-component/context": {
              "version": "1.3.0",
              "resolved": "https://registry.npmjs.org/@rc-component/context/-/context-1.3.0.tgz",
              "integrity": "sha512-6QdaCJ7Wn5UZLJs15IEfqy4Ru3OaL5ctqpQYWd5rlfV9wwzrzdt6+kgAQZV/qdB0MUPN4nhyBfRembQCIvBf+w==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "rc-util": "^5.27.0"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/@rc-component/mini-decimal": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/@rc-component/mini-decimal/-/mini-decimal-1.1.0.tgz",
              "integrity": "sha512-jS4E7T9Li2GuYwI6PyiVXmxTiM6b07rlD9Ge8uGZSCz3WlzcG5ZK7g5bbuKNeZ9pgUuPK/5guV781ujdVpm4HQ==",
              "dependencies": {
                "@babel/runtime": "^7.18.0"
              },
              "engines": {
                "node": ">=8.x"
              }
            },
            "node_modules/@rc-component/mutate-observer": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/@rc-component/mutate-observer/-/mutate-observer-1.1.0.tgz",
              "integrity": "sha512-QjrOsDXQusNwGZPf4/qRQasg7UFEj06XiCJ8iuiq/Io7CrHrgVi6Uuetw60WAMG1799v+aM8kyc+1L/GBbHSlw==",
              "dependencies": {
                "@babel/runtime": "^7.18.0",
                "classnames": "^2.3.2",
                "rc-util": "^5.24.4"
              },
              "engines": {
                "node": ">=8.x"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/@rc-component/portal": {
              "version": "1.1.2",
              "resolved": "https://registry.npmjs.org/@rc-component/portal/-/portal-1.1.2.tgz",
              "integrity": "sha512-6f813C0IsasTZms08kfA8kPAGxbbkYToa8ALaiDIGGECU4i9hj8Plgbx0sNJDrey3EtHO30hmdaxtT0138xZcg==",
              "dependencies": {
                "@babel/runtime": "^7.18.0",
                "classnames": "^2.3.2",
                "rc-util": "^5.24.4"
              },
              "engines": {
                "node": ">=8.x"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/@rc-component/tour": {
              "version": "1.8.1",
              "resolved": "https://registry.npmjs.org/@rc-component/tour/-/tour-1.8.1.tgz",
              "integrity": "sha512-CsrQnfKgNArxx2j1RNHVLZgVA+rLrEj06lIsl4KSynMqADsqz8eKvVkr0F3p9PA10948M6WEEZt5a/FGAbGR2A==",
              "dependencies": {
                "@babel/runtime": "^7.18.0",
                "@rc-component/portal": "^1.0.0-9",
                "@rc-component/trigger": "^1.3.6",
                "classnames": "^2.3.2",
                "rc-util": "^5.24.4"
              },
              "engines": {
                "node": ">=8.x"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/@rc-component/trigger": {
              "version": "1.15.3",
              "resolved": "https://registry.npmjs.org/@rc-component/trigger/-/trigger-1.15.3.tgz",
              "integrity": "sha512-C25WdL8PxX9UrE9S4vZsB2zU920S+pihN9S9mGd/DgfjM5XWYZBonLZfTWAZz54w9cYr5dt/Ln8futCesoBSZA==",
              "dependencies": {
                "@babel/runtime": "^7.18.3",
                "@rc-component/portal": "^1.1.0",
                "classnames": "^2.3.2",
                "rc-align": "^4.0.0",
                "rc-motion": "^2.0.0",
                "rc-resize-observer": "^1.3.1",
                "rc-util": "^5.33.0"
              },
              "engines": {
                "node": ">=8.x"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/@reduxjs/toolkit": {
              "version": "1.9.5",
              "resolved": "https://registry.npmjs.org/@reduxjs/toolkit/-/toolkit-1.9.5.tgz",
              "integrity": "sha512-Rt97jHmfTeaxL4swLRNPD/zV4OxTes4la07Xc4hetpUW/vc75t5m1ANyxG6ymnEQ2FsLQsoMlYB2vV1sO3m8tQ==",
              "dependencies": {
                "immer": "^9.0.21",
                "redux": "^4.2.1",
                "redux-thunk": "^2.4.2",
                "reselect": "^4.1.8"
              },
              "peerDependencies": {
                "react": "^16.9.0 || ^17.0.0 || ^18",
                "react-redux": "^7.2.1 || ^8.0.2"
              },
              "peerDependenciesMeta": {
                "react": {
                  "optional": true
                },
                "react-redux": {
                  "optional": true
                }
              }
            },
            "node_modules/@safe-global/safe-apps-provider": {
              "version": "0.15.2",
              "resolved": "https://registry.npmjs.org/@safe-global/safe-apps-provider/-/safe-apps-provider-0.15.2.tgz",
              "integrity": "sha512-BaoGAuY7h6jLBL7P+M6b7hd+1QfTv8uMyNF3udhiNUwA0XwfzH2ePQB13IEV3Mn7wdcIMEEUDS5kHbtAsj60qQ==",
              "dependencies": {
                "@safe-global/safe-apps-sdk": "7.9.0",
                "events": "^3.3.0"
              }
            },
            "node_modules/@safe-global/safe-apps-provider/node_modules/@safe-global/safe-apps-sdk": {
              "version": "7.9.0",
              "resolved": "https://registry.npmjs.org/@safe-global/safe-apps-sdk/-/safe-apps-sdk-7.9.0.tgz",
              "integrity": "sha512-S2EI+JL8ocSgE3uGNaDZCzKmwfhtxXZFDUP76vN0FeaY35itFMyi8F0Vhxu0XnZm3yLzJE3tp5px6GhuQFLU6w==",
              "dependencies": {
                "@safe-global/safe-gateway-typescript-sdk": "^3.5.3",
                "ethers": "^5.7.2"
              }
            },
            "node_modules/@safe-global/safe-apps-sdk": {
              "version": "7.11.0",
              "resolved": "https://registry.npmjs.org/@safe-global/safe-apps-sdk/-/safe-apps-sdk-7.11.0.tgz",
              "integrity": "sha512-RDamzPM1Lhhiiz0O+Dn6FkFqIh47jmZX+HCV/BBnBBOSKfBJE//IGD3+02zMgojXHTikQAburdPes9qmH1SA1A==",
              "dependencies": {
                "@safe-global/safe-gateway-typescript-sdk": "^3.5.3",
                "ethers": "^5.7.2"
              }
            },
            "node_modules/@safe-global/safe-gateway-typescript-sdk": {
              "version": "3.7.3",
              "resolved": "https://registry.npmjs.org/@safe-global/safe-gateway-typescript-sdk/-/safe-gateway-typescript-sdk-3.7.3.tgz",
              "integrity": "sha512-O6JCgXNZWG0Vv8FnOEjKfcbsP0WxGvoPJk5ufqUrsyBlHup16It6oaLnn+25nXFLBZOHI1bz8429JlqAc2t2hg==",
              "dependencies": {
                "cross-fetch": "^3.1.5"
              }
            },
            "node_modules/@scure/base": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/@scure/base/-/base-1.1.1.tgz",
              "integrity": "sha512-ZxOhsSyxYwLJj3pLZCefNitxsj093tb2vq90mp2txoYeBqbcjDjqFhyM8eUjq/uFm6zJ+mUuqxlS2FkuSY1MTA==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://paulmillr.com/funding/"
                }
              ]
            },
            "node_modules/@scure/bip32": {
              "version": "1.3.0",
              "resolved": "https://registry.npmjs.org/@scure/bip32/-/bip32-1.3.0.tgz",
              "integrity": "sha512-bcKpo1oj54hGholplGLpqPHRbIsnbixFtc06nwuNM5/dwSXOq/AAYoIBRsBmnZJSdfeNW5rnff7NTAz3ZCqR9Q==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://paulmillr.com/funding/"
                }
              ],
              "dependencies": {
                "@noble/curves": "~1.0.0",
                "@noble/hashes": "~1.3.0",
                "@scure/base": "~1.1.0"
              }
            },
            "node_modules/@scure/bip39": {
              "version": "1.2.0",
              "resolved": "https://registry.npmjs.org/@scure/bip39/-/bip39-1.2.0.tgz",
              "integrity": "sha512-SX/uKq52cuxm4YFXWFaVByaSHJh2w3BnokVSeUJVCv6K7WulT9u2BuNRBhuFl8vAuYnzx9bEu9WgpcNYTrYieg==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://paulmillr.com/funding/"
                }
              ],
              "dependencies": {
                "@noble/hashes": "~1.3.0",
                "@scure/base": "~1.1.0"
              }
            },
            "node_modules/@solana/buffer-layout": {
              "version": "4.0.1",
              "resolved": "https://registry.npmjs.org/@solana/buffer-layout/-/buffer-layout-4.0.1.tgz",
              "integrity": "sha512-E1ImOIAD1tBZFRdjeM4/pzTiTApC0AOBGwyAMS4fwIodCWArzJ3DWdoh8cKxeFM2fElkxBh2Aqts1BPC373rHA==",
              "dependencies": {
                "buffer": "~6.0.3"
              },
              "engines": {
                "node": ">=5.10"
              }
            },
            "node_modules/@solana/web3.js": {
              "version": "1.77.1",
              "resolved": "https://registry.npmjs.org/@solana/web3.js/-/web3.js-1.77.1.tgz",
              "integrity": "sha512-YWahzcQtQ3inR2+ZSqWsoJnXBppfd//7mbSFVFpyJWyE+vTtSfljdKVOosCY0ynu6AZaBLV1HYErc2wZOXUdeA==",
              "dependencies": {
                "@babel/runtime": "^7.12.5",
                "@noble/curves": "^1.0.0",
                "@noble/hashes": "^1.3.0",
                "@solana/buffer-layout": "^4.0.0",
                "agentkeepalive": "^4.2.1",
                "bigint-buffer": "^1.1.5",
                "bn.js": "^5.0.0",
                "borsh": "^0.7.0",
                "bs58": "^4.0.1",
                "buffer": "6.0.3",
                "fast-stable-stringify": "^1.0.0",
                "jayson": "^3.4.4",
                "node-fetch": "^2.6.7",
                "rpc-websockets": "^7.5.1",
                "superstruct": "^0.14.2"
              }
            },
            "node_modules/@spruceid/siwe-parser": {
              "version": "2.0.2",
              "resolved": "https://registry.npmjs.org/@spruceid/siwe-parser/-/siwe-parser-2.0.2.tgz",
              "integrity": "sha512-9WuA0ios2537cWYu39MMeH0O2KdrMKgKlOBUTWRTXQjCYu5B+mHCA0JkCbFaJ/0EjxoVIcYCXIW/DoPEpw+PqA==",
              "dependencies": {
                "@noble/hashes": "^1.1.2",
                "apg-js": "^4.1.1",
                "uri-js": "^4.4.1",
                "valid-url": "^1.0.9"
              }
            },
            "node_modules/@stablelib/aead": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/aead/-/aead-1.0.1.tgz",
              "integrity": "sha512-q39ik6sxGHewqtO0nP4BuSe3db5G1fEJE8ukvngS2gLkBXyy6E7pLubhbYgnkDFv6V8cWaxcE4Xn0t6LWcJkyg=="
            },
            "node_modules/@stablelib/binary": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/binary/-/binary-1.0.1.tgz",
              "integrity": "sha512-ClJWvmL6UBM/wjkvv/7m5VP3GMr9t0osr4yVgLZsLCOz4hGN9gIAFEqnJ0TsSMAN+n840nf2cHZnA5/KFqHC7Q==",
              "dependencies": {
                "@stablelib/int": "^1.0.1"
              }
            },
            "node_modules/@stablelib/bytes": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/bytes/-/bytes-1.0.1.tgz",
              "integrity": "sha512-Kre4Y4kdwuqL8BR2E9hV/R5sOrUj6NanZaZis0V6lX5yzqC3hBuVSDXUIBqQv/sCpmuWRiHLwqiT1pqqjuBXoQ=="
            },
            "node_modules/@stablelib/chacha": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/chacha/-/chacha-1.0.1.tgz",
              "integrity": "sha512-Pmlrswzr0pBzDofdFuVe1q7KdsHKhhU24e8gkEwnTGOmlC7PADzLVxGdn2PoNVBBabdg0l/IfLKg6sHAbTQugg==",
              "dependencies": {
                "@stablelib/binary": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "node_modules/@stablelib/chacha20poly1305": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/chacha20poly1305/-/chacha20poly1305-1.0.1.tgz",
              "integrity": "sha512-MmViqnqHd1ymwjOQfghRKw2R/jMIGT3wySN7cthjXCBdO+qErNPUBnRzqNpnvIwg7JBCg3LdeCZZO4de/yEhVA==",
              "dependencies": {
                "@stablelib/aead": "^1.0.1",
                "@stablelib/binary": "^1.0.1",
                "@stablelib/chacha": "^1.0.1",
                "@stablelib/constant-time": "^1.0.1",
                "@stablelib/poly1305": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "node_modules/@stablelib/constant-time": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/constant-time/-/constant-time-1.0.1.tgz",
              "integrity": "sha512-tNOs3uD0vSJcK6z1fvef4Y+buN7DXhzHDPqRLSXUel1UfqMB1PWNsnnAezrKfEwTLpN0cGH2p9NNjs6IqeD0eg=="
            },
            "node_modules/@stablelib/ed25519": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/@stablelib/ed25519/-/ed25519-1.0.3.tgz",
              "integrity": "sha512-puIMWaX9QlRsbhxfDc5i+mNPMY+0TmQEskunY1rZEBPi1acBCVQAhnsk/1Hk50DGPtVsZtAWQg4NHGlVaO9Hqg==",
              "dependencies": {
                "@stablelib/random": "^1.0.2",
                "@stablelib/sha512": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "node_modules/@stablelib/hash": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/hash/-/hash-1.0.1.tgz",
              "integrity": "sha512-eTPJc/stDkdtOcrNMZ6mcMK1e6yBbqRBaNW55XA1jU8w/7QdnCF0CmMmOD1m7VSkBR44PWrMHU2l6r8YEQHMgg=="
            },
            "node_modules/@stablelib/hkdf": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/hkdf/-/hkdf-1.0.1.tgz",
              "integrity": "sha512-SBEHYE16ZXlHuaW5RcGk533YlBj4grMeg5TooN80W3NpcHRtLZLLXvKyX0qcRFxf+BGDobJLnwkvgEwHIDBR6g==",
              "dependencies": {
                "@stablelib/hash": "^1.0.1",
                "@stablelib/hmac": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "node_modules/@stablelib/hmac": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/hmac/-/hmac-1.0.1.tgz",
              "integrity": "sha512-V2APD9NSnhVpV/QMYgCVMIYKiYG6LSqw1S65wxVoirhU/51ACio6D4yDVSwMzuTJXWZoVHbDdINioBwKy5kVmA==",
              "dependencies": {
                "@stablelib/constant-time": "^1.0.1",
                "@stablelib/hash": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "node_modules/@stablelib/int": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/int/-/int-1.0.1.tgz",
              "integrity": "sha512-byr69X/sDtDiIjIV6m4roLVWnNNlRGzsvxw+agj8CIEazqWGOQp2dTYgQhtyVXV9wpO6WyXRQUzLV/JRNumT2w=="
            },
            "node_modules/@stablelib/keyagreement": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/keyagreement/-/keyagreement-1.0.1.tgz",
              "integrity": "sha512-VKL6xBwgJnI6l1jKrBAfn265cspaWBPAPEc62VBQrWHLqVgNRE09gQ/AnOEyKUWrrqfD+xSQ3u42gJjLDdMDQg==",
              "dependencies": {
                "@stablelib/bytes": "^1.0.1"
              }
            },
            "node_modules/@stablelib/poly1305": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/poly1305/-/poly1305-1.0.1.tgz",
              "integrity": "sha512-1HlG3oTSuQDOhSnLwJRKeTRSAdFNVB/1djy2ZbS35rBSJ/PFqx9cf9qatinWghC2UbfOYD8AcrtbUQl8WoxabA==",
              "dependencies": {
                "@stablelib/constant-time": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "node_modules/@stablelib/random": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@stablelib/random/-/random-1.0.2.tgz",
              "integrity": "sha512-rIsE83Xpb7clHPVRlBj8qNe5L8ISQOzjghYQm/dZ7VaM2KHYwMW5adjQjrzTZCchFnNCNhkwtnOBa9HTMJCI8w==",
              "dependencies": {
                "@stablelib/binary": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "node_modules/@stablelib/sha256": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/sha256/-/sha256-1.0.1.tgz",
              "integrity": "sha512-GIIH3e6KH+91FqGV42Kcj71Uefd/QEe7Dy42sBTeqppXV95ggCcxLTk39bEr+lZfJmp+ghsR07J++ORkRELsBQ==",
              "dependencies": {
                "@stablelib/binary": "^1.0.1",
                "@stablelib/hash": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "node_modules/@stablelib/sha512": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/sha512/-/sha512-1.0.1.tgz",
              "integrity": "sha512-13gl/iawHV9zvDKciLo1fQ8Bgn2Pvf7OV6amaRVKiq3pjQ3UmEpXxWiAfV8tYjUpeZroBxtyrwtdooQT/i3hzw==",
              "dependencies": {
                "@stablelib/binary": "^1.0.1",
                "@stablelib/hash": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "node_modules/@stablelib/wipe": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/wipe/-/wipe-1.0.1.tgz",
              "integrity": "sha512-WfqfX/eXGiAd3RJe4VU2snh/ZPwtSjLG4ynQ/vYzvghTh7dHFcI1wl+nrkWG6lGhukOxOsUHfv8dUXr58D0ayg=="
            },
            "node_modules/@stablelib/x25519": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/@stablelib/x25519/-/x25519-1.0.3.tgz",
              "integrity": "sha512-KnTbKmUhPhHavzobclVJQG5kuivH+qDLpe84iRqX3CLrKp881cF160JvXJ+hjn1aMyCwYOKeIZefIH/P5cJoRw==",
              "dependencies": {
                "@stablelib/keyagreement": "^1.0.1",
                "@stablelib/random": "^1.0.2",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "node_modules/@supabase/functions-js": {
              "version": "2.1.1",
              "resolved": "https://registry.npmjs.org/@supabase/functions-js/-/functions-js-2.1.1.tgz",
              "integrity": "sha512-bIR1Puae6W+1/MzPfYBWOG/SCWGo4B5CB7c0ZZksvliNEAzhxNBJ0UFKYINcGdGtxG8ZC+1xr3utWpNZNwnoRw==",
              "dependencies": {
                "cross-fetch": "^3.1.5"
              }
            },
            "node_modules/@supabase/gotrue-js": {
              "version": "2.29.0",
              "resolved": "https://registry.npmjs.org/@supabase/gotrue-js/-/gotrue-js-2.29.0.tgz",
              "integrity": "sha512-QJepUxSXpgcyMhDtEusRyGtCcYSqy4wRDf3BQGqLUDaU/sRRclO07NCHW8nBqGW6KZZ6oNLfKX2AQz621dmIPw==",
              "dependencies": {
                "cross-fetch": "^3.1.5"
              }
            },
            "node_modules/@supabase/postgrest-js": {
              "version": "1.7.0",
              "resolved": "https://registry.npmjs.org/@supabase/postgrest-js/-/postgrest-js-1.7.0.tgz",
              "integrity": "sha512-wLADHZ5jm7LljF4GigK0H2vc1wGupBY2hGYfb4fVo0UuyMftmA6tOYy+ZpMH/vPq01CUFwXGwvIke6kyqh/QDg==",
              "dependencies": {
                "cross-fetch": "^3.1.5"
              }
            },
            "node_modules/@supabase/realtime-js": {
              "version": "2.7.3",
              "resolved": "https://registry.npmjs.org/@supabase/realtime-js/-/realtime-js-2.7.3.tgz",
              "integrity": "sha512-c7TzL81sx2kqyxsxcDduJcHL9KJdCOoKimGP6lQSqiZKX42ATlBZpWbyy9KFGFBjAP4nyopMf5JhPi2ZH9jyNw==",
              "dependencies": {
                "@types/phoenix": "^1.5.4",
                "@types/websocket": "^1.0.3",
                "websocket": "^1.0.34"
              }
            },
            "node_modules/@supabase/storage-js": {
              "version": "2.5.1",
              "resolved": "https://registry.npmjs.org/@supabase/storage-js/-/storage-js-2.5.1.tgz",
              "integrity": "sha512-nkR0fQA9ScAtIKA3vNoPEqbZv1k5B5HVRYEvRWdlP6mUpFphM9TwPL2jZ/ztNGMTG5xT6SrHr+H7Ykz8qzbhjw==",
              "dependencies": {
                "cross-fetch": "^3.1.5"
              }
            },
            "node_modules/@supabase/supabase-js": {
              "version": "2.25.0",
              "resolved": "https://registry.npmjs.org/@supabase/supabase-js/-/supabase-js-2.25.0.tgz",
              "integrity": "sha512-AEh0suSrjfpQCOhY7hLsgX6gr8XEUWshVkTq9IODiHTnAR6NHiEQ865LTeWu8gqCDf2XH1n20JcSmovIe3Xixw==",
              "dependencies": {
                "@supabase/functions-js": "^2.1.0",
                "@supabase/gotrue-js": "^2.26.0",
                "@supabase/postgrest-js": "^1.7.0",
                "@supabase/realtime-js": "^2.7.3",
                "@supabase/storage-js": "^2.5.1",
                "cross-fetch": "^3.1.5"
              }
            },
            "node_modules/@swc/helpers": {
              "version": "0.5.2",
              "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.2.tgz",
              "integrity": "sha512-E4KcWTpoLHqwPHLxidpOqQbcrZVgi0rsmmZXUle1jXmJfuIf/UWpczUJ7MZZ5tlxytgJXyp0w4PGkkeLiuIdZw==",
              "dependencies": {
                "tslib": "^2.4.0"
              }
            },
            "node_modules/@tanstack/query-core": {
              "version": "4.29.7",
              "resolved": "https://registry.npmjs.org/@tanstack/query-core/-/query-core-4.29.7.tgz",
              "integrity": "sha512-GXG4b5hV2Loir+h2G+RXhJdoZhJLnrBWsuLB2r0qBRyhWuXq9w/dWxzvpP89H0UARlH6Mr9DiVj4SMtpkF/aUA==",
              "funding": {
                "type": "github",
                "url": "https://github.com/sponsors/tannerlinsley"
              }
            },
            "node_modules/@tanstack/query-persist-client-core": {
              "version": "4.29.7",
              "resolved": "https://registry.npmjs.org/@tanstack/query-persist-client-core/-/query-persist-client-core-4.29.7.tgz",
              "integrity": "sha512-/QahvSq9/f8hetCsCd9MaOy6fAoPn0YDGDcl6TTobqdr9kHMgrM9laP9yKJFg2hm5/jIsrCMDO/iCnxBiUhrqw==",
              "dependencies": {
                "@tanstack/query-core": "4.29.7"
              },
              "funding": {
                "type": "github",
                "url": "https://github.com/sponsors/tannerlinsley"
              }
            },
            "node_modules/@tanstack/query-sync-storage-persister": {
              "version": "4.29.7",
              "resolved": "https://registry.npmjs.org/@tanstack/query-sync-storage-persister/-/query-sync-storage-persister-4.29.7.tgz",
              "integrity": "sha512-XWys8hez8eFIb9+oYNs0Jumfjz8afEwN52VSrHJEWg7gZO/Y/8ziI80cNlaDNB+60t7s3TaspKXT5z8DNFsCkQ==",
              "dependencies": {
                "@tanstack/query-persist-client-core": "4.29.7"
              },
              "funding": {
                "type": "github",
                "url": "https://github.com/sponsors/tannerlinsley"
              }
            },
            "node_modules/@tanstack/react-query": {
              "version": "4.29.7",
              "resolved": "https://registry.npmjs.org/@tanstack/react-query/-/react-query-4.29.7.tgz",
              "integrity": "sha512-ijBWEzAIo09fB1yd22slRZzprrZ5zMdWYzBnCg5qiXuFbH78uGN1qtGz8+Ed4MuhaPaYSD+hykn+QEKtQviEtg==",
              "dependencies": {
                "@tanstack/query-core": "4.29.7",
                "use-sync-external-store": "^1.2.0"
              },
              "funding": {
                "type": "github",
                "url": "https://github.com/sponsors/tannerlinsley"
              },
              "peerDependencies": {
                "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
                "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0",
                "react-native": "*"
              },
              "peerDependenciesMeta": {
                "react-dom": {
                  "optional": true
                },
                "react-native": {
                  "optional": true
                }
              }
            },
            "node_modules/@tanstack/react-query-persist-client": {
              "version": "4.29.7",
              "resolved": "https://registry.npmjs.org/@tanstack/react-query-persist-client/-/react-query-persist-client-4.29.7.tgz",
              "integrity": "sha512-KYUeESnthjjcfakpAei9Cz5gsIm1uDAVHrKcIAoARQwksk4j0KAo9ieExoIhL9v4mpTOlE9GsuZ/y06ANmaVaQ==",
              "dependencies": {
                "@tanstack/query-persist-client-core": "4.29.7"
              },
              "funding": {
                "type": "github",
                "url": "https://github.com/sponsors/tannerlinsley"
              },
              "peerDependencies": {
                "@tanstack/react-query": "4.29.7"
              }
            },
            "node_modules/@types/accepts": {
              "version": "1.3.5",
              "resolved": "https://registry.npmjs.org/@types/accepts/-/accepts-1.3.5.tgz",
              "integrity": "sha512-jOdnI/3qTpHABjM5cx1Hc0sKsPoYCp+DP/GJRGtDlPd7fiV9oXGGIcjW/ZOxLIvjGz8MA+uMZI9metHlgqbgwQ==",
              "dependencies": {
                "@types/node": "*"
              }
            },
            "node_modules/@types/body-parser": {
              "version": "1.19.2",
              "resolved": "https://registry.npmjs.org/@types/body-parser/-/body-parser-1.19.2.tgz",
              "integrity": "sha512-ALYone6pm6QmwZoAgeyNksccT9Q4AWZQ6PvfwR37GT6r6FWUPguq6sUmNGSMV2Wr761oQoBxwGGa6DR5o1DC9g==",
              "dependencies": {
                "@types/connect": "*",
                "@types/node": "*"
              }
            },
            "node_modules/@types/connect": {
              "version": "3.4.35",
              "resolved": "https://registry.npmjs.org/@types/connect/-/connect-3.4.35.tgz",
              "integrity": "sha512-cdeYyv4KWoEgpBISTxWvqYsVy444DOqehiF3fM3ne10AmJ62RSyNkUnxMJXHQWRQQX2eR94m5y1IZyDwBjV9FQ==",
              "dependencies": {
                "@types/node": "*"
              }
            },
            "node_modules/@types/content-disposition": {
              "version": "0.5.5",
              "resolved": "https://registry.npmjs.org/@types/content-disposition/-/content-disposition-0.5.5.tgz",
              "integrity": "sha512-v6LCdKfK6BwcqMo+wYW05rLS12S0ZO0Fl4w1h4aaZMD7bqT3gVUns6FvLJKGZHQmYn3SX55JWGpziwJRwVgutA=="
            },
            "node_modules/@types/cookie": {
              "version": "0.5.1",
              "resolved": "https://registry.npmjs.org/@types/cookie/-/cookie-0.5.1.tgz",
              "integrity": "sha512-COUnqfB2+ckwXXSFInsFdOAWQzCCx+a5hq2ruyj+Vjund94RJQd4LG2u9hnvJrTgunKAaax7ancBYlDrNYxA0g=="
            },
            "node_modules/@types/cookies": {
              "version": "0.7.7",
              "resolved": "https://registry.npmjs.org/@types/cookies/-/cookies-0.7.7.tgz",
              "integrity": "sha512-h7BcvPUogWbKCzBR2lY4oqaZbO3jXZksexYJVFvkrFeLgbZjQkU4x8pRq6eg2MHXQhY0McQdqmmsxRWlVAHooA==",
              "dependencies": {
                "@types/connect": "*",
                "@types/express": "*",
                "@types/keygrip": "*",
                "@types/node": "*"
              }
            },
            "node_modules/@types/debug": {
              "version": "4.1.8",
              "resolved": "https://registry.npmjs.org/@types/debug/-/debug-4.1.8.tgz",
              "integrity": "sha512-/vPO1EPOs306Cvhwv7KfVfYvOJqA/S/AXjaHQiJboCZzcNDb+TIJFN9/2C9DZ//ijSKWioNyUxD792QmDJ+HKQ==",
              "dependencies": {
                "@types/ms": "*"
              }
            },
            "node_modules/@types/express": {
              "version": "4.17.17",
              "resolved": "https://registry.npmjs.org/@types/express/-/express-4.17.17.tgz",
              "integrity": "sha512-Q4FmmuLGBG58btUnfS1c1r/NQdlp3DMfGDGig8WhfpA2YRUtEkxAjkZb0yvplJGYdF1fsQ81iMDcH24sSCNC/Q==",
              "dependencies": {
                "@types/body-parser": "*",
                "@types/express-serve-static-core": "^4.17.33",
                "@types/qs": "*",
                "@types/serve-static": "*"
              }
            },
            "node_modules/@types/express-serve-static-core": {
              "version": "4.17.35",
              "resolved": "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-4.17.35.tgz",
              "integrity": "sha512-wALWQwrgiB2AWTT91CB62b6Yt0sNHpznUXeZEcnPU3DRdlDIz74x8Qg1UUYKSVFi+va5vKOLYRBI1bRKiLLKIg==",
              "dependencies": {
                "@types/node": "*",
                "@types/qs": "*",
                "@types/range-parser": "*",
                "@types/send": "*"
              }
            },
            "node_modules/@types/hoist-non-react-statics": {
              "version": "3.3.1",
              "resolved": "https://registry.npmjs.org/@types/hoist-non-react-statics/-/hoist-non-react-statics-3.3.1.tgz",
              "integrity": "sha512-iMIqiko6ooLrTh1joXodJK5X9xeEALT1kM5G3ZLhD3hszxBdIEd5C75U834D9mLcINgD4OyZf5uQXjkuYydWvA==",
              "dependencies": {
                "@types/react": "*",
                "hoist-non-react-statics": "^3.3.0"
              }
            },
            "node_modules/@types/http-assert": {
              "version": "1.5.3",
              "resolved": "https://registry.npmjs.org/@types/http-assert/-/http-assert-1.5.3.tgz",
              "integrity": "sha512-FyAOrDuQmBi8/or3ns4rwPno7/9tJTijVW6aQQjK02+kOQ8zmoNg2XJtAuQhvQcy1ASJq38wirX5//9J1EqoUA=="
            },
            "node_modules/@types/http-errors": {
              "version": "2.0.1",
              "resolved": "https://registry.npmjs.org/@types/http-errors/-/http-errors-2.0.1.tgz",
              "integrity": "sha512-/K3ds8TRAfBvi5vfjuz8y6+GiAYBZ0x4tXv1Av6CWBWn0IlADc+ZX9pMq7oU0fNQPnBwIZl3rmeLp6SBApbxSQ=="
            },
            "node_modules/@types/keygrip": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@types/keygrip/-/keygrip-1.0.2.tgz",
              "integrity": "sha512-GJhpTepz2udxGexqos8wgaBx4I/zWIDPh/KOGEwAqtuGDkOUJu5eFvwmdBX4AmB8Odsr+9pHCQqiAqDL/yKMKw=="
            },
            "node_modules/@types/koa": {
              "version": "2.13.6",
              "resolved": "https://registry.npmjs.org/@types/koa/-/koa-2.13.6.tgz",
              "integrity": "sha512-diYUfp/GqfWBAiwxHtYJ/FQYIXhlEhlyaU7lB/bWQrx4Il9lCET5UwpFy3StOAohfsxxvEQ11qIJgT1j2tfBvw==",
              "dependencies": {
                "@types/accepts": "*",
                "@types/content-disposition": "*",
                "@types/cookies": "*",
                "@types/http-assert": "*",
                "@types/http-errors": "*",
                "@types/keygrip": "*",
                "@types/koa-compose": "*",
                "@types/node": "*"
              }
            },
            "node_modules/@types/koa-compose": {
              "version": "3.2.5",
              "resolved": "https://registry.npmjs.org/@types/koa-compose/-/koa-compose-3.2.5.tgz",
              "integrity": "sha512-B8nG/OoE1ORZqCkBVsup/AKcvjdgoHnfi4pZMn5UwAPCbhk/96xyv284eBYW8JlQbQ7zDmnpFr68I/40mFoIBQ==",
              "dependencies": {
                "@types/koa": "*"
              }
            },
            "node_modules/@types/mime": {
              "version": "1.3.2",
              "resolved": "https://registry.npmjs.org/@types/mime/-/mime-1.3.2.tgz",
              "integrity": "sha512-YATxVxgRqNH6nHEIsvg6k2Boc1JHI9ZbH5iWFFv/MTkchz3b1ieGDa5T0a9RznNdI0KhVbdbWSN+KWWrQZRxTw=="
            },
            "node_modules/@types/ms": {
              "version": "0.7.31",
              "resolved": "https://registry.npmjs.org/@types/ms/-/ms-0.7.31.tgz",
              "integrity": "sha512-iiUgKzV9AuaEkZqkOLDIvlQiL6ltuZd9tGcW3gwpnX8JbuiuhFlEGmmFXEXkN50Cvq7Os88IY2v0dkDqXYWVgA=="
            },
            "node_modules/@types/node": {
              "version": "20.2.4",
              "resolved": "https://registry.npmjs.org/@types/node/-/node-20.2.4.tgz",
              "integrity": "sha512-ni5f8Xlf4PwnT/Z3f0HURc3ZSw8UyrqMqmM3L5ysa7VjHu8c3FOmIo1nKCcLrV/OAmtf3N4kFna/aJqxsfEtnA=="
            },
            "node_modules/@types/phoenix": {
              "version": "1.6.0",
              "resolved": "https://registry.npmjs.org/@types/phoenix/-/phoenix-1.6.0.tgz",
              "integrity": "sha512-qwfpsHmFuhAS/dVd4uBIraMxRd56vwBUYQGZ6GpXnFuM2XMRFJbIyruFKKlW2daQliuYZwe0qfn/UjFCDKic5g=="
            },
            "node_modules/@types/prop-types": {
              "version": "15.7.5",
              "resolved": "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.5.tgz",
              "integrity": "sha512-JCB8C6SnDoQf0cNycqd/35A7MjcnK+ZTqE7judS6o7utxUCg6imJg3QK2qzHKszlTjcj2cn+NwMB2i96ubpj7w=="
            },
            "node_modules/@types/qs": {
              "version": "6.9.7",
              "resolved": "https://registry.npmjs.org/@types/qs/-/qs-6.9.7.tgz",
              "integrity": "sha512-FGa1F62FT09qcrueBA6qYTrJPVDzah9a+493+o2PCXsesWHIn27G98TsSMs3WPNbZIEj4+VJf6saSFpvD+3Zsw=="
            },
            "node_modules/@types/range-parser": {
              "version": "1.2.4",
              "resolved": "https://registry.npmjs.org/@types/range-parser/-/range-parser-1.2.4.tgz",
              "integrity": "sha512-EEhsLsD6UsDM1yFhAvy0Cjr6VwmpMWqFBCb9w07wVugF7w9nfajxLuVmngTIpgS6svCnm6Vaw+MZhoDCKnOfsw=="
            },
            "node_modules/@types/react": {
              "version": "18.2.20",
              "resolved": "https://registry.npmjs.org/@types/react/-/react-18.2.20.tgz",
              "integrity": "sha512-WKNtmsLWJM/3D5mG4U84cysVY31ivmyw85dE84fOCk5Hx78wezB/XEjVPWl2JTZ5FkEeaTJf+VgUAUn3PE7Isw==",
              "dependencies": {
                "@types/prop-types": "*",
                "@types/scheduler": "*",
                "csstype": "^3.0.2"
              }
            },
            "node_modules/@types/scheduler": {
              "version": "0.16.3",
              "resolved": "https://registry.npmjs.org/@types/scheduler/-/scheduler-0.16.3.tgz",
              "integrity": "sha512-5cJ8CB4yAx7BH1oMvdU0Jh9lrEXyPkar6F9G/ERswkCuvP4KQZfZkSjcMbAICCpQTN4OuZn8tz0HiKv9TGZgrQ=="
            },
            "node_modules/@types/send": {
              "version": "0.17.1",
              "resolved": "https://registry.npmjs.org/@types/send/-/send-0.17.1.tgz",
              "integrity": "sha512-Cwo8LE/0rnvX7kIIa3QHCkcuF21c05Ayb0ZfxPiv0W8VRiZiNW/WuRupHKpqqGVGf7SUA44QSOUKaEd9lIrd/Q==",
              "dependencies": {
                "@types/mime": "^1",
                "@types/node": "*"
              }
            },
            "node_modules/@types/serve-static": {
              "version": "1.15.1",
              "resolved": "https://registry.npmjs.org/@types/serve-static/-/serve-static-1.15.1.tgz",
              "integrity": "sha512-NUo5XNiAdULrJENtJXZZ3fHtfMolzZwczzBbnAeBbqBwG+LaG6YaJtuwzwGSQZ2wsCrxjEhNNjAkKigy3n8teQ==",
              "dependencies": {
                "@types/mime": "*",
                "@types/node": "*"
              }
            },
            "node_modules/@types/trusted-types": {
              "version": "2.0.3",
              "resolved": "https://registry.npmjs.org/@types/trusted-types/-/trusted-types-2.0.3.tgz",
              "integrity": "sha512-NfQ4gyz38SL8sDNrSixxU2Os1a5xcdFxipAFxYEuLUlvU2uDwS4NUpsImcf1//SlWItCVMMLiylsxbmNMToV/g=="
            },
            "node_modules/@types/use-sync-external-store": {
              "version": "0.0.3",
              "resolved": "https://registry.npmjs.org/@types/use-sync-external-store/-/use-sync-external-store-0.0.3.tgz",
              "integrity": "sha512-EwmlvuaxPNej9+T4v5AuBPJa2x2UOJVdjCtDHgcDqitUeOtjnJKJ+apYjVcAoBEMjKW1VVFGZLUb5+qqa09XFA=="
            },
            "node_modules/@types/websocket": {
              "version": "1.0.5",
              "resolved": "https://registry.npmjs.org/@types/websocket/-/websocket-1.0.5.tgz",
              "integrity": "sha512-NbsqiNX9CnEfC1Z0Vf4mE1SgAJ07JnRYcNex7AJ9zAVzmiGHmjKFEk7O4TJIsgv2B1sLEb6owKFZrACwdYngsQ==",
              "dependencies": {
                "@types/node": "*"
              }
            },
            "node_modules/@types/ws": {
              "version": "7.4.7",
              "resolved": "https://registry.npmjs.org/@types/ws/-/ws-7.4.7.tgz",
              "integrity": "sha512-JQbbmxZTZehdc2iszGKs5oC3NFnjeay7mtAWrdt7qNtAVK0g19muApzAy4bm9byz79xa2ZnO/BOBC2R8RC5Lww==",
              "dependencies": {
                "@types/node": "*"
              }
            },
            "node_modules/@vanilla-extract/css": {
              "version": "1.9.1",
              "resolved": "https://registry.npmjs.org/@vanilla-extract/css/-/css-1.9.1.tgz",
              "integrity": "sha512-pu2SFiff5jRhPwvGoj8cM5l/qIyLvigOmy22ss5DGjwV5pJYezRjDLxWumi2luIwioMWvh9EozCjyfH8nq+7fQ==",
              "dependencies": {
                "@emotion/hash": "^0.8.0",
                "@vanilla-extract/private": "^1.0.3",
                "ahocorasick": "1.0.2",
                "chalk": "^4.1.1",
                "css-what": "^5.0.1",
                "cssesc": "^3.0.0",
                "csstype": "^3.0.7",
                "deep-object-diff": "^1.1.0",
                "deepmerge": "^4.2.2",
                "media-query-parser": "^2.0.2",
                "outdent": "^0.8.0"
              }
            },
            "node_modules/@vanilla-extract/css/node_modules/chalk": {
              "version": "4.1.2",
              "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
              "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
              "dependencies": {
                "ansi-styles": "^4.1.0",
                "supports-color": "^7.1.0"
              },
              "engines": {
                "node": ">=10"
              },
              "funding": {
                "url": "https://github.com/chalk/chalk?sponsor=1"
              }
            },
            "node_modules/@vanilla-extract/css/node_modules/supports-color": {
              "version": "7.2.0",
              "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
              "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
              "dependencies": {
                "has-flag": "^4.0.0"
              },
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/@vanilla-extract/dynamic": {
              "version": "2.0.2",
              "resolved": "https://registry.npmjs.org/@vanilla-extract/dynamic/-/dynamic-2.0.2.tgz",
              "integrity": "sha512-U4nKaEQ8Kuz+exXEr51DUpyaOuzo24/S/k1YbDPQR06cYcNjQqvwFRnwWtZ+9ImocqM1wTKtzrdUgSTtLGIwAg==",
              "dependencies": {
                "@vanilla-extract/private": "^1.0.3"
              }
            },
            "node_modules/@vanilla-extract/private": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/@vanilla-extract/private/-/private-1.0.3.tgz",
              "integrity": "sha512-17kVyLq3ePTKOkveHxXuIJZtGYs+cSoev7BlP+Lf4916qfDhk/HBjvlYDe8egrea7LNPHKwSZJK/bzZC+Q6AwQ=="
            },
            "node_modules/@vanilla-extract/sprinkles": {
              "version": "1.5.0",
              "resolved": "https://registry.npmjs.org/@vanilla-extract/sprinkles/-/sprinkles-1.5.0.tgz",
              "integrity": "sha512-W58f2Rzz5lLmk0jbhgStVlZl5wEiPB1Ur3fRvUaBM+MrifZ3qskmFq/CiH//fEYeG5Dh9vF1qRviMMH46cX9Nw==",
              "peerDependencies": {
                "@vanilla-extract/css": "^1.0.0"
              }
            },
            "node_modules/@wagmi/chains": {
              "version": "0.3.1",
              "resolved": "https://registry.npmjs.org/@wagmi/chains/-/chains-0.3.1.tgz",
              "integrity": "sha512-NN5qziBLFeXnx0+3ywdiKKXUSW4H73Wc1jRrygl9GKXVPawU0GBMudwXUfV7VOu6E9vmG7Arj0pVsEwq63b2Ew==",
              "funding": [
                {
                  "type": "gitcoin",
                  "url": "https://wagmi.sh/gitcoin"
                },
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/wagmi-dev"
                }
              ],
              "peerDependencies": {
                "typescript": ">=4.9.4"
              },
              "peerDependenciesMeta": {
                "typescript": {
                  "optional": true
                }
              }
            },
            "node_modules/@wagmi/connectors": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/@wagmi/connectors/-/connectors-2.0.0.tgz",
              "integrity": "sha512-W7GFLdLaJiqISm65pwoe0DePLjL3klyugCwQwlunFXHNHvYSsoWkzDjb1H5XJwx9g+dTVNwJVg8TE7WfaUdilg==",
              "funding": [
                {
                  "type": "gitcoin",
                  "url": "https://wagmi.sh/gitcoin"
                },
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/wagmi-dev"
                }
              ],
              "dependencies": {
                "@coinbase/wallet-sdk": "^3.6.6",
                "@ledgerhq/connect-kit-loader": "^1.0.1",
                "@safe-global/safe-apps-provider": "^0.15.2",
                "@safe-global/safe-apps-sdk": "^7.9.0",
                "@walletconnect/ethereum-provider": "2.7.4",
                "@walletconnect/legacy-provider": "^2.0.0",
                "@web3modal/standalone": "^2.4.1",
                "abitype": "0.8.1",
                "eventemitter3": "^4.0.7"
              },
              "peerDependencies": {
                "@wagmi/chains": ">=0.3.0",
                "typescript": ">=4.9.4",
                "viem": "~0.3.35"
              },
              "peerDependenciesMeta": {
                "@wagmi/chains": {
                  "optional": true
                },
                "typescript": {
                  "optional": true
                }
              }
            },
            "node_modules/@wagmi/connectors/node_modules/abitype": {
              "version": "0.8.1",
              "resolved": "https://registry.npmjs.org/abitype/-/abitype-0.8.1.tgz",
              "integrity": "sha512-n8Di6AWb3i7HnEkBvecU6pG0a5nj5YwMvdAIwPLsQK95ulRy/XS113s/RXvSfTX1iOQJYFrEO3/q4SMWu7OwTA==",
              "peerDependencies": {
                "typescript": ">=4.9.4",
                "zod": "^3 >=3.19.1"
              },
              "peerDependenciesMeta": {
                "zod": {
                  "optional": true
                }
              }
            },
            "node_modules/@wagmi/core": {
              "version": "1.0.7",
              "resolved": "https://registry.npmjs.org/@wagmi/core/-/core-1.0.7.tgz",
              "integrity": "sha512-8TL/OYqHfJa4B79YUf/PVhnPH8Df7o8FoNQ0KfldaoT8d471SBZumzRr5pyNvnBxqvAnn11ZGaQThJs5WrLgrg==",
              "funding": [
                {
                  "type": "gitcoin",
                  "url": "https://wagmi.sh/gitcoin"
                },
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/wagmi-dev"
                }
              ],
              "dependencies": {
                "@wagmi/chains": "0.3.1",
                "@wagmi/connectors": "2.0.0",
                "abitype": "0.8.1",
                "eventemitter3": "^4.0.7",
                "zustand": "^4.3.1"
              },
              "peerDependencies": {
                "typescript": ">=4.9.4",
                "viem": "~0.3.35"
              },
              "peerDependenciesMeta": {
                "typescript": {
                  "optional": true
                }
              }
            },
            "node_modules/@wagmi/core/node_modules/abitype": {
              "version": "0.8.1",
              "resolved": "https://registry.npmjs.org/abitype/-/abitype-0.8.1.tgz",
              "integrity": "sha512-n8Di6AWb3i7HnEkBvecU6pG0a5nj5YwMvdAIwPLsQK95ulRy/XS113s/RXvSfTX1iOQJYFrEO3/q4SMWu7OwTA==",
              "peerDependencies": {
                "typescript": ">=4.9.4",
                "zod": "^3 >=3.19.1"
              },
              "peerDependenciesMeta": {
                "zod": {
                  "optional": true
                }
              }
            },
            "node_modules/@walletconnect/core": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/@walletconnect/core/-/core-2.7.4.tgz",
              "integrity": "sha512-nDJJZALZJI8l8JvjwZE4UmUzDzQBnTTJlQa/rc5MoGYtir0hfsQEl3sPkPcXbkkW5q+cHiynXsDcgM4740fmNQ==",
              "dependencies": {
                "@walletconnect/heartbeat": "1.2.1",
                "@walletconnect/jsonrpc-provider": "^1.0.12",
                "@walletconnect/jsonrpc-utils": "^1.0.7",
                "@walletconnect/jsonrpc-ws-connection": "^1.0.11",
                "@walletconnect/keyvaluestorage": "^1.0.2",
                "@walletconnect/logger": "^2.0.1",
                "@walletconnect/relay-api": "^1.0.9",
                "@walletconnect/relay-auth": "^1.0.4",
                "@walletconnect/safe-json": "^1.0.2",
                "@walletconnect/time": "^1.0.2",
                "@walletconnect/types": "2.7.4",
                "@walletconnect/utils": "2.7.4",
                "events": "^3.3.0",
                "lodash.isequal": "4.5.0",
                "uint8arrays": "^3.1.0"
              }
            },
            "node_modules/@walletconnect/crypto": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/@walletconnect/crypto/-/crypto-1.0.3.tgz",
              "integrity": "sha512-+2jdORD7XQs76I2Odgr3wwrtyuLUXD/kprNVsjWRhhhdO9Mt6WqVzOPu0/t7OHSmgal8k7SoBQzUc5hu/8zL/g==",
              "dependencies": {
                "@walletconnect/encoding": "^1.0.2",
                "@walletconnect/environment": "^1.0.1",
                "@walletconnect/randombytes": "^1.0.3",
                "aes-js": "^3.1.2",
                "hash.js": "^1.1.7",
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/crypto/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/encoding": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@walletconnect/encoding/-/encoding-1.0.2.tgz",
              "integrity": "sha512-CrwSBrjqJ7rpGQcTL3kU+Ief+Bcuu9PH6JLOb+wM6NITX1GTxR/MfNwnQfhLKK6xpRAyj2/nM04OOH6wS8Imag==",
              "dependencies": {
                "is-typedarray": "1.0.0",
                "tslib": "1.14.1",
                "typedarray-to-buffer": "3.1.5"
              }
            },
            "node_modules/@walletconnect/encoding/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/environment": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@walletconnect/environment/-/environment-1.0.1.tgz",
              "integrity": "sha512-T426LLZtHj8e8rYnKfzsw1aG6+M0BT1ZxayMdv/p8yM0MU+eJDISqNY3/bccxRr4LrF9csq02Rhqt08Ibl0VRg==",
              "dependencies": {
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/environment/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/ethereum-provider": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/@walletconnect/ethereum-provider/-/ethereum-provider-2.7.4.tgz",
              "integrity": "sha512-R5hcByY9zIsvyTHFUS+3xqtzs2REezED4tZFyXk0snJjWlnlL2EdeHaCjr5n+SIZDin4CMj1EAFC0ZrM4KoA4Q==",
              "dependencies": {
                "@walletconnect/jsonrpc-http-connection": "^1.0.4",
                "@walletconnect/jsonrpc-provider": "^1.0.11",
                "@walletconnect/jsonrpc-types": "^1.0.2",
                "@walletconnect/jsonrpc-utils": "^1.0.7",
                "@walletconnect/sign-client": "2.7.4",
                "@walletconnect/types": "2.7.4",
                "@walletconnect/universal-provider": "2.7.4",
                "@walletconnect/utils": "2.7.4",
                "events": "^3.3.0"
              },
              "peerDependencies": {
                "@web3modal/standalone": ">=2"
              },
              "peerDependenciesMeta": {
                "@web3modal/standalone": {
                  "optional": true
                }
              }
            },
            "node_modules/@walletconnect/events": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@walletconnect/events/-/events-1.0.1.tgz",
              "integrity": "sha512-NPTqaoi0oPBVNuLv7qPaJazmGHs5JGyO8eEAk5VGKmJzDR7AHzD4k6ilox5kxk1iwiOnFopBOOMLs86Oa76HpQ==",
              "dependencies": {
                "keyvaluestorage-interface": "^1.0.0",
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/events/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/heartbeat": {
              "version": "1.2.1",
              "resolved": "https://registry.npmjs.org/@walletconnect/heartbeat/-/heartbeat-1.2.1.tgz",
              "integrity": "sha512-yVzws616xsDLJxuG/28FqtZ5rzrTA4gUjdEMTbWB5Y8V1XHRmqq4efAxCw5ie7WjbXFSUyBHaWlMR+2/CpQC5Q==",
              "dependencies": {
                "@walletconnect/events": "^1.0.1",
                "@walletconnect/time": "^1.0.2",
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/heartbeat/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/jsonrpc-http-connection": {
              "version": "1.0.7",
              "resolved": "https://registry.npmjs.org/@walletconnect/jsonrpc-http-connection/-/jsonrpc-http-connection-1.0.7.tgz",
              "integrity": "sha512-qlfh8fCfu8LOM9JRR9KE0s0wxP6ZG9/Jom8M0qsoIQeKF3Ni0FyV4V1qy/cc7nfI46SLQLSl4tgWSfLiE1swyQ==",
              "dependencies": {
                "@walletconnect/jsonrpc-utils": "^1.0.6",
                "@walletconnect/safe-json": "^1.0.1",
                "cross-fetch": "^3.1.4",
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/jsonrpc-http-connection/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/jsonrpc-provider": {
              "version": "1.0.13",
              "resolved": "https://registry.npmjs.org/@walletconnect/jsonrpc-provider/-/jsonrpc-provider-1.0.13.tgz",
              "integrity": "sha512-K73EpThqHnSR26gOyNEL+acEex3P7VWZe6KE12ZwKzAt2H4e5gldZHbjsu2QR9cLeJ8AXuO7kEMOIcRv1QEc7g==",
              "dependencies": {
                "@walletconnect/jsonrpc-utils": "^1.0.8",
                "@walletconnect/safe-json": "^1.0.2",
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/jsonrpc-provider/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/jsonrpc-types": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/@walletconnect/jsonrpc-types/-/jsonrpc-types-1.0.3.tgz",
              "integrity": "sha512-iIQ8hboBl3o5ufmJ8cuduGad0CQm3ZlsHtujv9Eu16xq89q+BG7Nh5VLxxUgmtpnrePgFkTwXirCTkwJH1v+Yw==",
              "dependencies": {
                "keyvaluestorage-interface": "^1.0.0",
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/jsonrpc-types/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/jsonrpc-utils": {
              "version": "1.0.8",
              "resolved": "https://registry.npmjs.org/@walletconnect/jsonrpc-utils/-/jsonrpc-utils-1.0.8.tgz",
              "integrity": "sha512-vdeb03bD8VzJUL6ZtzRYsFMq1eZQcM3EAzT0a3st59dyLfJ0wq+tKMpmGH7HlB7waD858UWgfIcudbPFsbzVdw==",
              "dependencies": {
                "@walletconnect/environment": "^1.0.1",
                "@walletconnect/jsonrpc-types": "^1.0.3",
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/jsonrpc-utils/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/jsonrpc-ws-connection": {
              "version": "1.0.11",
              "resolved": "https://registry.npmjs.org/@walletconnect/jsonrpc-ws-connection/-/jsonrpc-ws-connection-1.0.11.tgz",
              "integrity": "sha512-TiFJ6saasKXD+PwGkm5ZGSw0837nc6EeFmurSPgIT/NofnOV4Tv7CVJqGQN0rQYoJUSYu21cwHNYaFkzNpUN+w==",
              "dependencies": {
                "@walletconnect/jsonrpc-utils": "^1.0.6",
                "@walletconnect/safe-json": "^1.0.2",
                "events": "^3.3.0",
                "tslib": "1.14.1",
                "ws": "^7.5.1"
              }
            },
            "node_modules/@walletconnect/jsonrpc-ws-connection/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/jsonrpc-ws-connection/node_modules/ws": {
              "version": "7.5.9",
              "resolved": "https://registry.npmjs.org/ws/-/ws-7.5.9.tgz",
              "integrity": "sha512-F+P9Jil7UiSKSkppIiD94dN07AwvFixvLIj1Og1Rl9GGMuNipJnV9JzjD6XuqmAeiswGvUmNLjr5cFuXwNS77Q==",
              "engines": {
                "node": ">=8.3.0"
              },
              "peerDependencies": {
                "bufferutil": "^4.0.1",
                "utf-8-validate": "^5.0.2"
              },
              "peerDependenciesMeta": {
                "bufferutil": {
                  "optional": true
                },
                "utf-8-validate": {
                  "optional": true
                }
              }
            },
            "node_modules/@walletconnect/keyvaluestorage": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@walletconnect/keyvaluestorage/-/keyvaluestorage-1.0.2.tgz",
              "integrity": "sha512-U/nNG+VLWoPFdwwKx0oliT4ziKQCEoQ27L5Hhw8YOFGA2Po9A9pULUYNWhDgHkrb0gYDNt//X7wABcEWWBd3FQ==",
              "dependencies": {
                "safe-json-utils": "^1.1.1",
                "tslib": "1.14.1"
              },
              "peerDependencies": {
                "@react-native-async-storage/async-storage": "1.x",
                "lokijs": "1.x"
              },
              "peerDependenciesMeta": {
                "@react-native-async-storage/async-storage": {
                  "optional": true
                },
                "lokijs": {
                  "optional": true
                }
              }
            },
            "node_modules/@walletconnect/keyvaluestorage/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/legacy-client": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/@walletconnect/legacy-client/-/legacy-client-2.0.0.tgz",
              "integrity": "sha512-v5L7rYk9loVnfvUf0mF+76bUPFaU5/Vh7mzL6/950CD/yoGdzYZ3Kj+L7mkC6HPMEGeQsBP1+sqBuiVGZ/aODA==",
              "dependencies": {
                "@walletconnect/crypto": "^1.0.3",
                "@walletconnect/encoding": "^1.0.2",
                "@walletconnect/jsonrpc-utils": "^1.0.4",
                "@walletconnect/legacy-types": "^2.0.0",
                "@walletconnect/legacy-utils": "^2.0.0",
                "@walletconnect/safe-json": "^1.0.1",
                "@walletconnect/window-getters": "^1.0.1",
                "@walletconnect/window-metadata": "^1.0.1",
                "detect-browser": "^5.3.0",
                "query-string": "^6.13.5"
              }
            },
            "node_modules/@walletconnect/legacy-modal": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/@walletconnect/legacy-modal/-/legacy-modal-2.0.0.tgz",
              "integrity": "sha512-jckNd8lMhm4X7dX9TDdxM3bXKJnaqkRs6K2Mo5j6GmbIF9Eyx40jZ5+q457RVxvM6ciZEDT5s1wBHWdWoOo+9Q==",
              "dependencies": {
                "@walletconnect/legacy-types": "^2.0.0",
                "@walletconnect/legacy-utils": "^2.0.0",
                "copy-to-clipboard": "^3.3.3",
                "preact": "^10.12.0",
                "qrcode": "^1.5.1"
              }
            },
            "node_modules/@walletconnect/legacy-modal/node_modules/qrcode": {
              "version": "1.5.3",
              "resolved": "https://registry.npmjs.org/qrcode/-/qrcode-1.5.3.tgz",
              "integrity": "sha512-puyri6ApkEHYiVl4CFzo1tDkAZ+ATcnbJrJ6RiBM1Fhctdn/ix9MTE3hRph33omisEbC/2fcfemsseiKgBPKZg==",
              "dependencies": {
                "dijkstrajs": "^1.0.1",
                "encode-utf8": "^1.0.3",
                "pngjs": "^5.0.0",
                "yargs": "^15.3.1"
              },
              "bin": {
                "qrcode": "bin/qrcode"
              },
              "engines": {
                "node": ">=10.13.0"
              }
            },
            "node_modules/@walletconnect/legacy-provider": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/@walletconnect/legacy-provider/-/legacy-provider-2.0.0.tgz",
              "integrity": "sha512-A8xPebMI1A+50HbWwTpFCbwP7G+1NGKdTKyg8BUUg3h3Y9JucpC1W6w/x0v1Xw7qFEqQnz74LoIN/A3ytH9xrQ==",
              "dependencies": {
                "@walletconnect/jsonrpc-http-connection": "^1.0.4",
                "@walletconnect/jsonrpc-provider": "^1.0.6",
                "@walletconnect/legacy-client": "^2.0.0",
                "@walletconnect/legacy-modal": "^2.0.0",
                "@walletconnect/legacy-types": "^2.0.0",
                "@walletconnect/legacy-utils": "^2.0.0"
              }
            },
            "node_modules/@walletconnect/legacy-types": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/@walletconnect/legacy-types/-/legacy-types-2.0.0.tgz",
              "integrity": "sha512-sOVrA7HUdbI1OwKyPOQU0/DdvTSVFlsXWpAk2K2WvP2erTkBWPMTJq6cv2BmKdoJ3p6gLApT7sd+jHi3OF71uw==",
              "dependencies": {
                "@walletconnect/jsonrpc-types": "^1.0.2"
              }
            },
            "node_modules/@walletconnect/legacy-utils": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/@walletconnect/legacy-utils/-/legacy-utils-2.0.0.tgz",
              "integrity": "sha512-CPWxSVVXw0kgNCxvU126g4GiV3mzXmC8IPJ15twE46aJ1FX+RHEIfAzFMFz2F2+fEhBxL63A7dwNQKDXorRPcQ==",
              "dependencies": {
                "@walletconnect/encoding": "^1.0.2",
                "@walletconnect/jsonrpc-utils": "^1.0.4",
                "@walletconnect/legacy-types": "^2.0.0",
                "@walletconnect/safe-json": "^1.0.1",
                "@walletconnect/window-getters": "^1.0.1",
                "@walletconnect/window-metadata": "^1.0.1",
                "detect-browser": "^5.3.0",
                "query-string": "^6.13.5"
              }
            },
            "node_modules/@walletconnect/logger": {
              "version": "2.0.1",
              "resolved": "https://registry.npmjs.org/@walletconnect/logger/-/logger-2.0.1.tgz",
              "integrity": "sha512-SsTKdsgWm+oDTBeNE/zHxxr5eJfZmE9/5yp/Ku+zJtcTAjELb3DXueWkDXmE9h8uHIbJzIb5wj5lPdzyrjT6hQ==",
              "dependencies": {
                "pino": "7.11.0",
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/logger/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/randombytes": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/@walletconnect/randombytes/-/randombytes-1.0.3.tgz",
              "integrity": "sha512-35lpzxcHFbTN3ABefC9W+uBpNZl1GC4Wpx0ed30gibfO/y9oLdy1NznbV96HARQKSBV9J9M/rrtIvf6a23jfYw==",
              "dependencies": {
                "@walletconnect/encoding": "^1.0.2",
                "@walletconnect/environment": "^1.0.1",
                "randombytes": "^2.1.0",
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/randombytes/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/relay-api": {
              "version": "1.0.9",
              "resolved": "https://registry.npmjs.org/@walletconnect/relay-api/-/relay-api-1.0.9.tgz",
              "integrity": "sha512-Q3+rylJOqRkO1D9Su0DPE3mmznbAalYapJ9qmzDgK28mYF9alcP3UwG/og5V7l7CFOqzCLi7B8BvcBUrpDj0Rg==",
              "dependencies": {
                "@walletconnect/jsonrpc-types": "^1.0.2",
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/relay-api/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/relay-auth": {
              "version": "1.0.4",
              "resolved": "https://registry.npmjs.org/@walletconnect/relay-auth/-/relay-auth-1.0.4.tgz",
              "integrity": "sha512-kKJcS6+WxYq5kshpPaxGHdwf5y98ZwbfuS4EE/NkQzqrDFm5Cj+dP8LofzWvjrrLkZq7Afy7WrQMXdLy8Sx7HQ==",
              "dependencies": {
                "@stablelib/ed25519": "^1.0.2",
                "@stablelib/random": "^1.0.1",
                "@walletconnect/safe-json": "^1.0.1",
                "@walletconnect/time": "^1.0.2",
                "tslib": "1.14.1",
                "uint8arrays": "^3.0.0"
              }
            },
            "node_modules/@walletconnect/relay-auth/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/safe-json": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@walletconnect/safe-json/-/safe-json-1.0.2.tgz",
              "integrity": "sha512-Ogb7I27kZ3LPC3ibn8ldyUr5544t3/STow9+lzz7Sfo808YD7SBWk7SAsdBFlYgP2zDRy2hS3sKRcuSRM0OTmA==",
              "dependencies": {
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/safe-json/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/sign-client": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/@walletconnect/sign-client/-/sign-client-2.7.4.tgz",
              "integrity": "sha512-hZoCB51GB4u32yxzYnxp8dpzXgo6E7ZWUVOgnihmoMPjgJahPtvB/Ip9jYxI3fuV+ZPQYNlxQgEvR9X+2fLz+g==",
              "dependencies": {
                "@walletconnect/core": "2.7.4",
                "@walletconnect/events": "^1.0.1",
                "@walletconnect/heartbeat": "1.2.1",
                "@walletconnect/jsonrpc-utils": "^1.0.7",
                "@walletconnect/logger": "^2.0.1",
                "@walletconnect/time": "^1.0.2",
                "@walletconnect/types": "2.7.4",
                "@walletconnect/utils": "2.7.4",
                "events": "^3.3.0"
              }
            },
            "node_modules/@walletconnect/time": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@walletconnect/time/-/time-1.0.2.tgz",
              "integrity": "sha512-uzdd9woDcJ1AaBZRhqy5rNC9laqWGErfc4dxA9a87mPdKOgWMD85mcFo9dIYIts/Jwocfwn07EC6EzclKubk/g==",
              "dependencies": {
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/time/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/types": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/@walletconnect/types/-/types-2.7.4.tgz",
              "integrity": "sha512-Nagfz8DqLxf0UlVd7xopgBX60EJp1xUEq7J30ALlTbWqEhCHuLK/qPk5vGdJ9Q6+ZDpTW9ShLq1DNf+5nVpVDQ==",
              "dependencies": {
                "@walletconnect/events": "^1.0.1",
                "@walletconnect/heartbeat": "1.2.1",
                "@walletconnect/jsonrpc-types": "^1.0.2",
                "@walletconnect/keyvaluestorage": "^1.0.2",
                "@walletconnect/logger": "^2.0.1",
                "events": "^3.3.0"
              }
            },
            "node_modules/@walletconnect/universal-provider": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/@walletconnect/universal-provider/-/universal-provider-2.7.4.tgz",
              "integrity": "sha512-suH3o5LpTX7hlx5lU98oLdEM0Ws5ZysjQ4Zr6EWIK1DVT8EDdWbw49ggJSW9IYRLQ2xG22jDvmTIdFAexYOgng==",
              "dependencies": {
                "@walletconnect/jsonrpc-http-connection": "^1.0.4",
                "@walletconnect/jsonrpc-provider": "^1.0.11",
                "@walletconnect/jsonrpc-types": "^1.0.2",
                "@walletconnect/jsonrpc-utils": "^1.0.7",
                "@walletconnect/logger": "^2.0.1",
                "@walletconnect/sign-client": "2.7.4",
                "@walletconnect/types": "2.7.4",
                "@walletconnect/utils": "2.7.4",
                "eip1193-provider": "1.0.1",
                "events": "^3.3.0"
              }
            },
            "node_modules/@walletconnect/utils": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/@walletconnect/utils/-/utils-2.7.4.tgz",
              "integrity": "sha512-2WEeKB9h/FQvyNmIBYwLtjdLm3Oo55EwtJoxkC00SA7xjf8jYxZ8q2y4P/CJP8oO5ruxBK5Ft0smKvPHXsE58Q==",
              "dependencies": {
                "@stablelib/chacha20poly1305": "1.0.1",
                "@stablelib/hkdf": "1.0.1",
                "@stablelib/random": "^1.0.2",
                "@stablelib/sha256": "1.0.1",
                "@stablelib/x25519": "^1.0.3",
                "@walletconnect/jsonrpc-utils": "^1.0.7",
                "@walletconnect/relay-api": "^1.0.9",
                "@walletconnect/safe-json": "^1.0.2",
                "@walletconnect/time": "^1.0.2",
                "@walletconnect/types": "2.7.4",
                "@walletconnect/window-getters": "^1.0.1",
                "@walletconnect/window-metadata": "^1.0.1",
                "detect-browser": "5.3.0",
                "query-string": "7.1.3",
                "uint8arrays": "^3.1.0"
              }
            },
            "node_modules/@walletconnect/utils/node_modules/query-string": {
              "version": "7.1.3",
              "resolved": "https://registry.npmjs.org/query-string/-/query-string-7.1.3.tgz",
              "integrity": "sha512-hh2WYhq4fi8+b+/2Kg9CEge4fDPvHS534aOOvOZeQ3+Vf2mCFsaFBYj0i+iXcAq6I9Vzp5fjMFBlONvayDC1qg==",
              "dependencies": {
                "decode-uri-component": "^0.2.2",
                "filter-obj": "^1.1.0",
                "split-on-first": "^1.0.0",
                "strict-uri-encode": "^2.0.0"
              },
              "engines": {
                "node": ">=6"
              },
              "funding": {
                "url": "https://github.com/sponsors/sindresorhus"
              }
            },
            "node_modules/@walletconnect/window-getters": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@walletconnect/window-getters/-/window-getters-1.0.1.tgz",
              "integrity": "sha512-vHp+HqzGxORPAN8gY03qnbTMnhqIwjeRJNOMOAzePRg4xVEEE2WvYsI9G2NMjOknA8hnuYbU3/hwLcKbjhc8+Q==",
              "dependencies": {
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/window-getters/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@walletconnect/window-metadata": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@walletconnect/window-metadata/-/window-metadata-1.0.1.tgz",
              "integrity": "sha512-9koTqyGrM2cqFRW517BPY/iEtUDx2r1+Pwwu5m7sJ7ka79wi3EyqhqcICk/yDmv6jAS1rjKgTKXlEhanYjijcA==",
              "dependencies": {
                "@walletconnect/window-getters": "^1.0.1",
                "tslib": "1.14.1"
              }
            },
            "node_modules/@walletconnect/window-metadata/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/@web3modal/core": {
              "version": "2.4.1",
              "resolved": "https://registry.npmjs.org/@web3modal/core/-/core-2.4.1.tgz",
              "integrity": "sha512-v6Y/eQJSI2YfUTv8rGqjFabqdk3ZPjx6Fe7j5Q8fw0ZWF1YRGM3mySG457qtKQ7D7E1kNKA3BHbaOZ3pgQoG6A==",
              "dependencies": {
                "buffer": "6.0.3",
                "valtio": "1.10.5"
              }
            },
            "node_modules/@web3modal/standalone": {
              "version": "2.4.1",
              "resolved": "https://registry.npmjs.org/@web3modal/standalone/-/standalone-2.4.1.tgz",
              "integrity": "sha512-ZrI5LwWeT9sd8A3FdIX/gBp3ZrzrX882Ln1vJN0LTCmeP2OUsYcW5bPxjv1PcJ1YUBY7Tg4aTgMUnAVTTuqb+w==",
              "dependencies": {
                "@web3modal/core": "2.4.1",
                "@web3modal/ui": "2.4.1"
              }
            },
            "node_modules/@web3modal/ui": {
              "version": "2.4.1",
              "resolved": "https://registry.npmjs.org/@web3modal/ui/-/ui-2.4.1.tgz",
              "integrity": "sha512-x1ceyd3mMJsIHs5UUTLvE+6qyCjhyjL6gB/wVmTDbwASHSQIVyshQJ+s7BwIEMP/pbAsYDg+/M8EiUuE+/E/kg==",
              "dependencies": {
                "@web3modal/core": "2.4.1",
                "lit": "2.7.4",
                "motion": "10.15.5",
                "qrcode": "1.5.3"
              }
            },
            "node_modules/@web3modal/ui/node_modules/qrcode": {
              "version": "1.5.3",
              "resolved": "https://registry.npmjs.org/qrcode/-/qrcode-1.5.3.tgz",
              "integrity": "sha512-puyri6ApkEHYiVl4CFzo1tDkAZ+ATcnbJrJ6RiBM1Fhctdn/ix9MTE3hRph33omisEbC/2fcfemsseiKgBPKZg==",
              "dependencies": {
                "dijkstrajs": "^1.0.1",
                "encode-utf8": "^1.0.3",
                "pngjs": "^5.0.0",
                "yargs": "^15.3.1"
              },
              "bin": {
                "qrcode": "bin/qrcode"
              },
              "engines": {
                "node": ">=10.13.0"
              }
            },
            "node_modules/abitype": {
              "version": "0.8.2",
              "resolved": "https://registry.npmjs.org/abitype/-/abitype-0.8.2.tgz",
              "integrity": "sha512-B1ViNMGpfx/qjVQi0RTc2HEFHuR9uoCoTEkwELT5Y7pBPtBbctYijz9BK6+Kd0hQ3S70FhYTO2dWWk0QNUEXMA==",
              "peerDependencies": {
                "typescript": ">=5.0.4",
                "zod": "^3 >=3.19.1"
              },
              "peerDependenciesMeta": {
                "zod": {
                  "optional": true
                }
              }
            },
            "node_modules/aes-js": {
              "version": "3.1.2",
              "resolved": "https://registry.npmjs.org/aes-js/-/aes-js-3.1.2.tgz",
              "integrity": "sha512-e5pEa2kBnBOgR4Y/p20pskXI74UEz7de8ZGVo58asOtvSVG5YAbJeELPZxOmt+Bnz3rX753YKhfIn4X4l1PPRQ=="
            },
            "node_modules/agentkeepalive": {
              "version": "4.3.0",
              "resolved": "https://registry.npmjs.org/agentkeepalive/-/agentkeepalive-4.3.0.tgz",
              "integrity": "sha512-7Epl1Blf4Sy37j4v9f9FjICCh4+KAQOyXgHEwlyBiAQLbhKdq/i2QQU3amQalS/wPhdPzDXPL5DMR5bkn+YeWg==",
              "dependencies": {
                "debug": "^4.1.0",
                "depd": "^2.0.0",
                "humanize-ms": "^1.2.1"
              },
              "engines": {
                "node": ">= 8.0.0"
              }
            },
            "node_modules/ahocorasick": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/ahocorasick/-/ahocorasick-1.0.2.tgz",
              "integrity": "sha512-hCOfMzbFx5IDutmWLAt6MZwOUjIfSM9G9FyVxytmE4Rs/5YDPWQrD/+IR1w+FweD9H2oOZEnv36TmkjhNURBVA=="
            },
            "node_modules/ansi-regex": {
              "version": "5.0.1",
              "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
              "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/ansi-styles": {
              "version": "4.3.0",
              "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
              "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
              "dependencies": {
                "color-convert": "^2.0.1"
              },
              "engines": {
                "node": ">=8"
              },
              "funding": {
                "url": "https://github.com/chalk/ansi-styles?sponsor=1"
              }
            },
            "node_modules/antd": {
              "version": "5.8.3",
              "resolved": "https://registry.npmjs.org/antd/-/antd-5.8.3.tgz",
              "integrity": "sha512-/DIGg/1UXyPdNLs9FYalfJO1LnnwMv2pnx9DS6ANSJwlo6fDxtb693IJWdaBuRlxgXJfARzxMNsPyFygy9N/Qw==",
              "dependencies": {
                "@ant-design/colors": "^7.0.0",
                "@ant-design/cssinjs": "^1.16.0",
                "@ant-design/icons": "^5.2.2",
                "@ant-design/react-slick": "~1.0.0",
                "@babel/runtime": "^7.18.3",
                "@ctrl/tinycolor": "^3.6.0",
                "@rc-component/color-picker": "~1.4.0",
                "@rc-component/mutate-observer": "^1.0.0",
                "@rc-component/tour": "~1.8.1",
                "@rc-component/trigger": "^1.15.0",
                "classnames": "^2.2.6",
                "copy-to-clipboard": "^3.2.0",
                "dayjs": "^1.11.1",
                "qrcode.react": "^3.1.0",
                "rc-cascader": "~3.14.0",
                "rc-checkbox": "~3.1.0",
                "rc-collapse": "~3.7.0",
                "rc-dialog": "~9.1.0",
                "rc-drawer": "~6.2.0",
                "rc-dropdown": "~4.1.0",
                "rc-field-form": "~1.36.0",
                "rc-image": "~7.1.0",
                "rc-input": "~1.1.0",
                "rc-input-number": "~8.0.2",
                "rc-mentions": "~2.5.0",
                "rc-menu": "~9.10.0",
                "rc-motion": "^2.7.3",
                "rc-notification": "~5.0.4",
                "rc-pagination": "~3.5.0",
                "rc-picker": "~3.13.0",
                "rc-progress": "~3.4.1",
                "rc-rate": "~2.12.0",
                "rc-resize-observer": "^1.2.0",
                "rc-segmented": "~2.2.0",
                "rc-select": "~14.7.1",
                "rc-slider": "~10.1.0",
                "rc-steps": "~6.0.1",
                "rc-switch": "~4.1.0",
                "rc-table": "~7.32.1",
                "rc-tabs": "~12.9.0",
                "rc-textarea": "~1.3.3",
                "rc-tooltip": "~6.0.0",
                "rc-tree": "~5.7.6",
                "rc-tree-select": "~5.11.0",
                "rc-upload": "~4.3.0",
                "rc-util": "^5.32.0",
                "scroll-into-view-if-needed": "^3.0.3",
                "throttle-debounce": "^5.0.0"
              },
              "funding": {
                "type": "opencollective",
                "url": "https://opencollective.com/ant-design"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/antd-img-crop": {
              "version": "4.12.2",
              "resolved": "https://registry.npmjs.org/antd-img-crop/-/antd-img-crop-4.12.2.tgz",
              "integrity": "sha512-xgxR3x2sg+tCBHMfx1gejEfhhvnIL2mpZ4OIPfQDJZTTfm9YpMqaqLF9qWbF9Nf83bXCdaQywYihcVGyw3niDg==",
              "dependencies": {
                "compare-versions": "6.0.0-rc.1",
                "react-easy-crop": "^4.7.4",
                "tslib": "^2.5.0"
              },
              "peerDependencies": {
                "antd": ">=4.0.0",
                "react": ">=16.8.0",
                "react-dom": ">=16.8.0"
              }
            },
            "node_modules/any-promise": {
              "version": "1.3.0",
              "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
              "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
              "dev": true
            },
            "node_modules/anymatch": {
              "version": "3.1.3",
              "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
              "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
              "dev": true,
              "dependencies": {
                "normalize-path": "^3.0.0",
                "picomatch": "^2.0.4"
              },
              "engines": {
                "node": ">= 8"
              }
            },
            "node_modules/apg-js": {
              "version": "4.1.3",
              "resolved": "https://registry.npmjs.org/apg-js/-/apg-js-4.1.3.tgz",
              "integrity": "sha512-XYyDcoBho8OpnWPRnedMwyL+76ovCtsESerHZEfY39dO4IrEqN97mdEYkOyHa0XTX5+3+U5FmpqPLttK0f7n6g=="
            },
            "node_modules/arg": {
              "version": "5.0.2",
              "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
              "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
              "dev": true
            },
            "node_modules/array-tree-filter": {
              "version": "2.1.0",
              "resolved": "https://registry.npmjs.org/array-tree-filter/-/array-tree-filter-2.1.0.tgz",
              "integrity": "sha512-4ROwICNlNw/Hqa9v+rk5h22KjmzB1JGTMVKP2AKJBOCgb0yL0ASf0+YvCcLNNwquOHNX48jkeZIJ3a+oOQqKcw=="
            },
            "node_modules/asn1js": {
              "version": "3.0.5",
              "resolved": "https://registry.npmjs.org/asn1js/-/asn1js-3.0.5.tgz",
              "integrity": "sha512-FVnvrKJwpt9LP2lAMl8qZswRNm3T4q9CON+bxldk2iwk3FFpuwhx2FfinyitizWHsVYyaY+y5JzDR0rCMV5yTQ==",
              "dependencies": {
                "pvtsutils": "^1.3.2",
                "pvutils": "^1.1.3",
                "tslib": "^2.4.0"
              },
              "engines": {
                "node": ">=12.0.0"
              }
            },
            "node_modules/async-mutex": {
              "version": "0.2.6",
              "resolved": "https://registry.npmjs.org/async-mutex/-/async-mutex-0.2.6.tgz",
              "integrity": "sha512-Hs4R+4SPgamu6rSGW8C7cV9gaWUKEHykfzCCvIRuaVv636Ju10ZdeUbvb4TBEW0INuq2DHZqXbK4Nd3yG4RaRw==",
              "dependencies": {
                "tslib": "^2.0.0"
              }
            },
            "node_modules/async-validator": {
              "version": "4.2.5",
              "resolved": "https://registry.npmjs.org/async-validator/-/async-validator-4.2.5.tgz",
              "integrity": "sha512-7HhHjtERjqlNbZtqNqy2rckN/SpOOlmDliet+lP7k+eKZEjPk3DgyeU9lIXLdeLz0uBbbVp+9Qdow9wJWgwwfg=="
            },
            "node_modules/atomic-sleep": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/atomic-sleep/-/atomic-sleep-1.0.0.tgz",
              "integrity": "sha512-kNOjDqAh7px0XWNI+4QbzoiR/nTkHAWNud2uvnJquD1/x5a7EQZMJT0AczqK0Qn67oY/TTQ1LbUKajZpp3I9tQ==",
              "engines": {
                "node": ">=8.0.0"
              }
            },
            "node_modules/autoprefixer": {
              "version": "10.4.14",
              "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.14.tgz",
              "integrity": "sha512-FQzyfOsTlwVzjHxKEqRIAdJx9niO6VCBCoEwax/VLSoQF29ggECcPuBqUMZ+u8jCZOPSy8b8/8KnuFbp0SaFZQ==",
              "dev": true,
              "funding": [
                {
                  "type": "opencollective",
                  "url": "https://opencollective.com/postcss/"
                },
                {
                  "type": "tidelift",
                  "url": "https://tidelift.com/funding/github/npm/autoprefixer"
                }
              ],
              "dependencies": {
                "browserslist": "^4.21.5",
                "caniuse-lite": "^1.0.30001464",
                "fraction.js": "^4.2.0",
                "normalize-range": "^0.1.2",
                "picocolors": "^1.0.0",
                "postcss-value-parser": "^4.2.0"
              },
              "bin": {
                "autoprefixer": "bin/autoprefixer"
              },
              "engines": {
                "node": "^10 || ^12 || >=14"
              },
              "peerDependencies": {
                "postcss": "^8.1.0"
              }
            },
            "node_modules/available-typed-arrays": {
              "version": "1.0.5",
              "resolved": "https://registry.npmjs.org/available-typed-arrays/-/available-typed-arrays-1.0.5.tgz",
              "integrity": "sha512-DMD0KiN46eipeziST1LPP/STfDU0sufISXmjSgvVsoU2tqxctQeASejWcfNtxYKqETM1UxQ8sp2OrSBWpHY6sw==",
              "engines": {
                "node": ">= 0.4"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/balanced-match": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
              "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
              "dev": true
            },
            "node_modules/base-x": {
              "version": "3.0.9",
              "resolved": "https://registry.npmjs.org/base-x/-/base-x-3.0.9.tgz",
              "integrity": "sha512-H7JU6iBHTal1gp56aKoaa//YUxEaAOUiydvrV/pILqIHXTtqxSkATOnDA2u+jZ/61sD+L/412+7kzXRtWukhpQ==",
              "dependencies": {
                "safe-buffer": "^5.0.1"
              }
            },
            "node_modules/base64-js": {
              "version": "1.5.1",
              "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
              "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA==",
              "funding": [
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/feross"
                },
                {
                  "type": "patreon",
                  "url": "https://www.patreon.com/feross"
                },
                {
                  "type": "consulting",
                  "url": "https://feross.org/support"
                }
              ]
            },
            "node_modules/bech32": {
              "version": "1.1.4",
              "resolved": "https://registry.npmjs.org/bech32/-/bech32-1.1.4.tgz",
              "integrity": "sha512-s0IrSOzLlbvX7yp4WBfPITzpAU8sqQcpsmwXDiKwrG4r491vwCO/XpejasRNl0piBMe/DvP4Tz0mIS/X1DPJBQ=="
            },
            "node_modules/bigint-buffer": {
              "version": "1.1.5",
              "resolved": "https://registry.npmjs.org/bigint-buffer/-/bigint-buffer-1.1.5.tgz",
              "integrity": "sha512-trfYco6AoZ+rKhKnxA0hgX0HAbVP/s808/EuDSe2JDzUnCp/xAsli35Orvk67UrTEcwuxZqYZDmfA2RXJgxVvA==",
              "hasInstallScript": true,
              "dependencies": {
                "bindings": "^1.3.0"
              },
              "engines": {
                "node": ">= 10.0.0"
              }
            },
            "node_modules/binary-extensions": {
              "version": "2.2.0",
              "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.2.0.tgz",
              "integrity": "sha512-jDctJ/IVQbZoJykoeHbhXpOlNBqGNcwXJKJog42E5HDPUwQTSdjCHdihjj0DlnheQ7blbT6dHOafNAiS8ooQKA==",
              "dev": true,
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/bind-decorator": {
              "version": "1.0.11",
              "resolved": "https://registry.npmjs.org/bind-decorator/-/bind-decorator-1.0.11.tgz",
              "integrity": "sha512-yzkH0uog6Vv/vQ9+rhSKxecnqGUZHYncg7qS7voz3Q76+TAi1SGiOKk2mlOvusQnFz9Dc4BC/NMkeXu11YgjJg=="
            },
            "node_modules/bindings": {
              "version": "1.5.0",
              "resolved": "https://registry.npmjs.org/bindings/-/bindings-1.5.0.tgz",
              "integrity": "sha512-p2q/t/mhvuOj/UeLlV6566GD/guowlr0hHxClI0W9m7MWYkL1F0hLo+0Aexs9HSPCtR1SXQ0TD3MMKrXZajbiQ==",
              "dependencies": {
                "file-uri-to-path": "1.0.0"
              }
            },
            "node_modules/bn.js": {
              "version": "5.2.1",
              "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-5.2.1.tgz",
              "integrity": "sha512-eXRvHzWyYPBuB4NBy0cmYQjGitUrtqwbvlzP3G6VFnNRbsZQIxQ10PbKKHt8gZ/HW/D/747aDl+QkDqg3KQLMQ=="
            },
            "node_modules/borsh": {
              "version": "0.7.0",
              "resolved": "https://registry.npmjs.org/borsh/-/borsh-0.7.0.tgz",
              "integrity": "sha512-CLCsZGIBCFnPtkNnieW/a8wmreDmfUtjU2m9yHrzPXIlNbqVs0AQrSatSG6vdNYUqdc83tkQi2eHfF98ubzQLA==",
              "dependencies": {
                "bn.js": "^5.2.0",
                "bs58": "^4.0.0",
                "text-encoding-utf-8": "^1.0.2"
              }
            },
            "node_modules/brace-expansion": {
              "version": "1.1.11",
              "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz",
              "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
              "dev": true,
              "dependencies": {
                "balanced-match": "^1.0.0",
                "concat-map": "0.0.1"
              }
            },
            "node_modules/braces": {
              "version": "3.0.2",
              "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.2.tgz",
              "integrity": "sha512-b8um+L1RzM3WDSzvhm6gIz1yfTbBt6YTlcEKAvsmqCZZFw46z626lVj9j1yEPW33H5H+lBQpZMP1k8l+78Ha0A==",
              "dev": true,
              "dependencies": {
                "fill-range": "^7.0.1"
              },
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/brorand": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/brorand/-/brorand-1.1.0.tgz",
              "integrity": "sha512-cKV8tMCEpQs4hK/ik71d6LrPOnpkpGBR0wzxqr68g2m/LB2GxVYQroAjMJZRVM1Y4BCjCKc3vAamxSzOY2RP+w=="
            },
            "node_modules/browserslist": {
              "version": "4.21.10",
              "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.21.10.tgz",
              "integrity": "sha512-bipEBdZfVH5/pwrvqc+Ub0kUPVfGUhlKxbvfD+z1BDnPEO/X98ruXGA1WP5ASpAFKan7Qr6j736IacbZQuAlKQ==",
              "dev": true,
              "funding": [
                {
                  "type": "opencollective",
                  "url": "https://opencollective.com/browserslist"
                },
                {
                  "type": "tidelift",
                  "url": "https://tidelift.com/funding/github/npm/browserslist"
                },
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/ai"
                }
              ],
              "dependencies": {
                "caniuse-lite": "^1.0.30001517",
                "electron-to-chromium": "^1.4.477",
                "node-releases": "^2.0.13",
                "update-browserslist-db": "^1.0.11"
              },
              "bin": {
                "browserslist": "cli.js"
              },
              "engines": {
                "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
              }
            },
            "node_modules/bs58": {
              "version": "4.0.1",
              "resolved": "https://registry.npmjs.org/bs58/-/bs58-4.0.1.tgz",
              "integrity": "sha512-Ok3Wdf5vOIlBrgCvTq96gBkJw+JUEzdBgyaza5HLtPm7yTHkjRy8+JzNyHF7BHa0bNWOQIp3m5YF0nnFcOIKLw==",
              "dependencies": {
                "base-x": "^3.0.2"
              }
            },
            "node_modules/buffer": {
              "version": "6.0.3",
              "resolved": "https://registry.npmjs.org/buffer/-/buffer-6.0.3.tgz",
              "integrity": "sha512-FTiCpNxtwiZZHEZbcbTIcZjERVICn9yq/pDFkTl95/AxzD1naBctN7YO68riM/gLSDY7sdrMby8hofADYuuqOA==",
              "funding": [
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/feross"
                },
                {
                  "type": "patreon",
                  "url": "https://www.patreon.com/feross"
                },
                {
                  "type": "consulting",
                  "url": "https://feross.org/support"
                }
              ],
              "dependencies": {
                "base64-js": "^1.3.1",
                "ieee754": "^1.2.1"
              }
            },
            "node_modules/bufferutil": {
              "version": "4.0.7",
              "resolved": "https://registry.npmjs.org/bufferutil/-/bufferutil-4.0.7.tgz",
              "integrity": "sha512-kukuqc39WOHtdxtw4UScxF/WVnMFVSQVKhtx3AjZJzhd0RGZZldcrfSEbVsWWe6KNH253574cq5F+wpv0G9pJw==",
              "hasInstallScript": true,
              "dependencies": {
                "node-gyp-build": "^4.3.0"
              },
              "engines": {
                "node": ">=6.14.2"
              }
            },
            "node_modules/busboy": {
              "version": "1.6.0",
              "resolved": "https://registry.npmjs.org/busboy/-/busboy-1.6.0.tgz",
              "integrity": "sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==",
              "dependencies": {
                "streamsearch": "^1.1.0"
              },
              "engines": {
                "node": ">=10.16.0"
              }
            },
            "node_modules/call-bind": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/call-bind/-/call-bind-1.0.2.tgz",
              "integrity": "sha512-7O+FbCihrB5WGbFYesctwmTKae6rOiIzmz1icreWJ+0aA7LJfuqhEso2T9ncpcFtzMQtzXf2QGGueWJGTYsqrA==",
              "dependencies": {
                "function-bind": "^1.1.1",
                "get-intrinsic": "^1.0.2"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/camelcase": {
              "version": "5.3.1",
              "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
              "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg==",
              "engines": {
                "node": ">=6"
              }
            },
            "node_modules/camelcase-css": {
              "version": "2.0.1",
              "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
              "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
              "dev": true,
              "engines": {
                "node": ">= 6"
              }
            },
            "node_modules/caniuse-lite": {
              "version": "1.0.30001519",
              "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001519.tgz",
              "integrity": "sha512-0QHgqR+Jv4bxHMp8kZ1Kn8CH55OikjKJ6JmKkZYP1F3D7w+lnFXF70nG5eNfsZS89jadi5Ywy5UCSKLAglIRkg==",
              "funding": [
                {
                  "type": "opencollective",
                  "url": "https://opencollective.com/browserslist"
                },
                {
                  "type": "tidelift",
                  "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
                },
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/ai"
                }
              ]
            },
            "node_modules/chokidar": {
              "version": "3.5.3",
              "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.5.3.tgz",
              "integrity": "sha512-Dr3sfKRP6oTcjf2JmUmFJfeVMvXBdegxB0iVQ5eb2V10uFJUCAS8OByZdVAyVb8xXNz3GjjTgj9kLWsZTqE6kw==",
              "dev": true,
              "funding": [
                {
                  "type": "individual",
                  "url": "https://paulmillr.com/funding/"
                }
              ],
              "dependencies": {
                "anymatch": "~3.1.2",
                "braces": "~3.0.2",
                "glob-parent": "~5.1.2",
                "is-binary-path": "~2.1.0",
                "is-glob": "~4.0.1",
                "normalize-path": "~3.0.0",
                "readdirp": "~3.6.0"
              },
              "engines": {
                "node": ">= 8.10.0"
              },
              "optionalDependencies": {
                "fsevents": "~2.3.2"
              }
            },
            "node_modules/chokidar/node_modules/glob-parent": {
              "version": "5.1.2",
              "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
              "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
              "dev": true,
              "dependencies": {
                "is-glob": "^4.0.1"
              },
              "engines": {
                "node": ">= 6"
              }
            },
            "node_modules/classnames": {
              "version": "2.3.2",
              "resolved": "https://registry.npmjs.org/classnames/-/classnames-2.3.2.tgz",
              "integrity": "sha512-CSbhY4cFEJRe6/GQzIk5qXZ4Jeg5pcsP7b5peFSDpffpe1cqjASH/n9UTjBwOp6XpMSTwQ8Za2K5V02ueA7Tmw=="
            },
            "node_modules/client-only": {
              "version": "0.0.1",
              "resolved": "https://registry.npmjs.org/client-only/-/client-only-0.0.1.tgz",
              "integrity": "sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA=="
            },
            "node_modules/cliui": {
              "version": "6.0.0",
              "resolved": "https://registry.npmjs.org/cliui/-/cliui-6.0.0.tgz",
              "integrity": "sha512-t6wbgtoCXvAzst7QgXxJYqPt0usEfbgQdftEPbLL/cvv6HPE5VgvqCuAIDR0NgU52ds6rFwqrgakNLrHEjCbrQ==",
              "dependencies": {
                "string-width": "^4.2.0",
                "strip-ansi": "^6.0.0",
                "wrap-ansi": "^6.2.0"
              }
            },
            "node_modules/color-convert": {
              "version": "2.0.1",
              "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
              "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
              "dependencies": {
                "color-name": "~1.1.4"
              },
              "engines": {
                "node": ">=7.0.0"
              }
            },
            "node_modules/color-name": {
              "version": "1.1.4",
              "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
              "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA=="
            },
            "node_modules/commander": {
              "version": "2.20.3",
              "resolved": "https://registry.npmjs.org/commander/-/commander-2.20.3.tgz",
              "integrity": "sha512-GpVkmM8vF2vQUkj2LvZmD35JxeJOLCwJ9cUkugyk2nuhbv3+mJvpLYYt+0+USMxE+oj+ey/lJEnhZw75x/OMcQ=="
            },
            "node_modules/compare-versions": {
              "version": "6.0.0-rc.1",
              "resolved": "https://registry.npmjs.org/compare-versions/-/compare-versions-6.0.0-rc.1.tgz",
              "integrity": "sha512-cFhkjbGY1jLFWIV7KegECbfuyYPxSGvgGkdkfM+ibboQDoPwg2FRHm5BSNTOApiauRBzJIQH7qvOJs2sW5ueKQ=="
            },
            "node_modules/compute-scroll-into-view": {
              "version": "3.0.3",
              "resolved": "https://registry.npmjs.org/compute-scroll-into-view/-/compute-scroll-into-view-3.0.3.tgz",
              "integrity": "sha512-nadqwNxghAGTamwIqQSG433W6OADZx2vCo3UXHNrzTRHK/htu+7+L0zhjEoaeaQVNAi3YgqWDv8+tzf0hRfR+A=="
            },
            "node_modules/concat-map": {
              "version": "0.0.1",
              "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
              "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
              "dev": true
            },
            "node_modules/cookie": {
              "version": "0.5.0",
              "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.5.0.tgz",
              "integrity": "sha512-YZ3GUyn/o8gfKJlnlX7g7xq4gyO6OSuhGPKaaGssGB2qgDUS0gPgtTvoyZLTt9Ab6dC4hfc9dV5arkvc/OCmrw==",
              "engines": {
                "node": ">= 0.6"
              }
            },
            "node_modules/copy-to-clipboard": {
              "version": "3.3.3",
              "resolved": "https://registry.npmjs.org/copy-to-clipboard/-/copy-to-clipboard-3.3.3.tgz",
              "integrity": "sha512-2KV8NhB5JqC3ky0r9PMCAZKbUHSwtEo4CwCs0KXgruG43gX5PMqDEBbVU4OUzw2MuAWUfsuFmWvEKG5QRfSnJA==",
              "dependencies": {
                "toggle-selection": "^1.0.6"
              }
            },
            "node_modules/cross-fetch": {
              "version": "3.1.6",
              "resolved": "https://registry.npmjs.org/cross-fetch/-/cross-fetch-3.1.6.tgz",
              "integrity": "sha512-riRvo06crlE8HiqOwIpQhxwdOk4fOeR7FVM/wXoxchFEqMNUjvbs3bfo4OTgMEMHzppd4DxFBDbyySj8Cv781g==",
              "dependencies": {
                "node-fetch": "^2.6.11"
              }
            },
            "node_modules/css-what": {
              "version": "5.1.0",
              "resolved": "https://registry.npmjs.org/css-what/-/css-what-5.1.0.tgz",
              "integrity": "sha512-arSMRWIIFY0hV8pIxZMEfmMI47Wj3R/aWpZDDxWYCPEiOMv6tfOrnpDtgxBYPEQD4V0Y/958+1TdC3iWTFcUPw==",
              "engines": {
                "node": ">= 6"
              },
              "funding": {
                "url": "https://github.com/sponsors/fb55"
              }
            },
            "node_modules/cssesc": {
              "version": "3.0.0",
              "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
              "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
              "bin": {
                "cssesc": "bin/cssesc"
              },
              "engines": {
                "node": ">=4"
              }
            },
            "node_modules/csstype": {
              "version": "3.1.2",
              "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.1.2.tgz",
              "integrity": "sha512-I7K1Uu0MBPzaFKg4nI5Q7Vs2t+3gWWW648spaF+Rg7pI9ds18Ugn+lvg4SHczUdKlHI5LWBXyqfS8+DufyBsgQ=="
            },
            "node_modules/d": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/d/-/d-1.0.1.tgz",
              "integrity": "sha512-m62ShEObQ39CfralilEQRjH6oAMtNCV1xJyEx5LpRYUVN+EviphDgUc/F3hnYbADmkiNs67Y+3ylmlG7Lnu+FA==",
              "dependencies": {
                "es5-ext": "^0.10.50",
                "type": "^1.0.1"
              }
            },
            "node_modules/dayjs": {
              "version": "1.11.9",
              "resolved": "https://registry.npmjs.org/dayjs/-/dayjs-1.11.9.tgz",
              "integrity": "sha512-QvzAURSbQ0pKdIye2txOzNaHmxtUBXerpY0FJsFXUMKbIZeFm5ht1LS/jFsrncjnmtv8HsG0W2g6c0zUjZWmpA=="
            },
            "node_modules/debug": {
              "version": "4.3.4",
              "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.4.tgz",
              "integrity": "sha512-PRWFHuSU3eDtQJPvnNY7Jcket1j0t5OuOsFzPPzsekD52Zl8qUfFIPEiswXqIvHWGVHOgX+7G/vCNNhehwxfkQ==",
              "dependencies": {
                "ms": "2.1.2"
              },
              "engines": {
                "node": ">=6.0"
              },
              "peerDependenciesMeta": {
                "supports-color": {
                  "optional": true
                }
              }
            },
            "node_modules/decamelize": {
              "version": "1.2.0",
              "resolved": "https://registry.npmjs.org/decamelize/-/decamelize-1.2.0.tgz",
              "integrity": "sha512-z2S+W9X73hAUUki+N+9Za2lBlun89zigOyGrsax+KUQ6wKW4ZoWpEYBkGhQjwAjjDCkWxhY0VKEhk8wzY7F5cA==",
              "engines": {
                "node": ">=0.10.0"
              }
            },
            "node_modules/decode-uri-component": {
              "version": "0.2.2",
              "resolved": "https://registry.npmjs.org/decode-uri-component/-/decode-uri-component-0.2.2.tgz",
              "integrity": "sha512-FqUYQ+8o158GyGTrMFJms9qh3CqTKvAqgqsTnkLI8sKu0028orqBhxNMFkFen0zGyg6epACD32pjVk58ngIErQ==",
              "engines": {
                "node": ">=0.10"
              }
            },
            "node_modules/deep-object-diff": {
              "version": "1.1.9",
              "resolved": "https://registry.npmjs.org/deep-object-diff/-/deep-object-diff-1.1.9.tgz",
              "integrity": "sha512-Rn+RuwkmkDwCi2/oXOFS9Gsr5lJZu/yTGpK7wAaAIE75CC+LCGEZHpY6VQJa/RoJcrmaA/docWJZvYohlNkWPA=="
            },
            "node_modules/deepmerge": {
              "version": "4.3.1",
              "resolved": "https://registry.npmjs.org/deepmerge/-/deepmerge-4.3.1.tgz",
              "integrity": "sha512-3sUqbMEc77XqpdNO7FRyRog+eW3ph+GYCbj+rK+uYyRMuwsVy0rMiVtPn+QJlKFvWP/1PYpapqYn0Me2knFn+A==",
              "engines": {
                "node": ">=0.10.0"
              }
            },
            "node_modules/delay": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/delay/-/delay-5.0.0.tgz",
              "integrity": "sha512-ReEBKkIfe4ya47wlPYf/gu5ib6yUG0/Aez0JQZQz94kiWtRQvZIQbTiehsnwHvLSWJnQdhVeqYue7Id1dKr0qw==",
              "engines": {
                "node": ">=10"
              },
              "funding": {
                "url": "https://github.com/sponsors/sindresorhus"
              }
            },
            "node_modules/depd": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
              "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
              "engines": {
                "node": ">= 0.8"
              }
            },
            "node_modules/detect-browser": {
              "version": "5.3.0",
              "resolved": "https://registry.npmjs.org/detect-browser/-/detect-browser-5.3.0.tgz",
              "integrity": "sha512-53rsFbGdwMwlF7qvCt0ypLM5V5/Mbl0szB7GPN8y9NCcbknYOeVVXdrXEq+90IwAfrrzt6Hd+u2E2ntakICU8w=="
            },
            "node_modules/detect-node-es": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/detect-node-es/-/detect-node-es-1.1.0.tgz",
              "integrity": "sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ=="
            },
            "node_modules/didyoumean": {
              "version": "1.2.2",
              "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
              "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
              "dev": true
            },
            "node_modules/dijkstrajs": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/dijkstrajs/-/dijkstrajs-1.0.3.tgz",
              "integrity": "sha512-qiSlmBq9+BCdCA/L46dw8Uy93mloxsPSbwnm5yrKn2vMPiy8KyAskTF6zuV/j5BMsmOGZDPs7KjU+mjb670kfA=="
            },
            "node_modules/dlv": {
              "version": "1.1.3",
              "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
              "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
              "dev": true
            },
            "node_modules/dom-align": {
              "version": "1.12.4",
              "resolved": "https://registry.npmjs.org/dom-align/-/dom-align-1.12.4.tgz",
              "integrity": "sha512-R8LUSEay/68zE5c8/3BDxiTEvgb4xZTF0RKmAHfiEVN3klfIpXfi2/QCoiWPccVQ0J/ZGdz9OjzL4uJEP/MRAw=="
            },
            "node_modules/dotenv": {
              "version": "16.0.3",
              "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-16.0.3.tgz",
              "integrity": "sha512-7GO6HghkA5fYG9TYnNxi14/7K9f5occMlp3zXAuSxn7CKCxt9xbNWG7yF8hTCSUchlfWSe3uLmlPfigevRItzQ==",
              "engines": {
                "node": ">=12"
              }
            },
            "node_modules/duplexify": {
              "version": "4.1.2",
              "resolved": "https://registry.npmjs.org/duplexify/-/duplexify-4.1.2.tgz",
              "integrity": "sha512-fz3OjcNCHmRP12MJoZMPglx8m4rrFP8rovnk4vT8Fs+aonZoCwGg10dSsQsfP/E62eZcPTMSMP6686fu9Qlqtw==",
              "dependencies": {
                "end-of-stream": "^1.4.1",
                "inherits": "^2.0.3",
                "readable-stream": "^3.1.1",
                "stream-shift": "^1.0.0"
              }
            },
            "node_modules/eip1193-provider": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/eip1193-provider/-/eip1193-provider-1.0.1.tgz",
              "integrity": "sha512-kSuqwQ26d7CzuS/t3yRXo2Su2cVH0QfvyKbr2H7Be7O5YDyIq4hQGCNTo5wRdP07bt+E2R/8nPCzey4ojBHf7g==",
              "dependencies": {
                "@json-rpc-tools/provider": "^1.5.5"
              }
            },
            "node_modules/electron-to-chromium": {
              "version": "1.4.488",
              "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.4.488.tgz",
              "integrity": "sha512-Dv4sTjiW7t/UWGL+H8ZkgIjtUAVZDgb/PwGWvMsCT7jipzUV/u5skbLXPFKb6iV0tiddVi/bcS2/kUrczeWgIQ==",
              "dev": true
            },
            "node_modules/elliptic": {
              "version": "6.5.4",
              "resolved": "https://registry.npmjs.org/elliptic/-/elliptic-6.5.4.tgz",
              "integrity": "sha512-iLhC6ULemrljPZb+QutR5TQGB+pdW6KGD5RSegS+8sorOZT+rdQFbsQFJgvN3eRqNALqJer4oQ16YvJHlU8hzQ==",
              "dependencies": {
                "bn.js": "^4.11.9",
                "brorand": "^1.1.0",
                "hash.js": "^1.0.0",
                "hmac-drbg": "^1.0.1",
                "inherits": "^2.0.4",
                "minimalistic-assert": "^1.0.1",
                "minimalistic-crypto-utils": "^1.0.1"
              }
            },
            "node_modules/elliptic/node_modules/bn.js": {
              "version": "4.12.0",
              "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.12.0.tgz",
              "integrity": "sha512-c98Bf3tPniI+scsdk237ku1Dc3ujXQTSgyiPUDEOe7tRkhrqridvh8klBv0HCEso1OLOYcHuCv/cS6DNxKH+ZA=="
            },
            "node_modules/embla-carousel": {
              "version": "8.0.0-rc11",
              "resolved": "https://registry.npmjs.org/embla-carousel/-/embla-carousel-8.0.0-rc11.tgz",
              "integrity": "sha512-Toeaug98PGYzSY56p/xsa+u4zbQbAXgGymwEDUc2wqT+1XCnnUsH42MClglhABJQbobwDYxOabhJrfXyJKUMig=="
            },
            "node_modules/embla-carousel-autoplay": {
              "version": "8.0.0-rc11",
              "resolved": "https://registry.npmjs.org/embla-carousel-autoplay/-/embla-carousel-autoplay-8.0.0-rc11.tgz",
              "integrity": "sha512-Yzy0cW1ggGL/bJUbp1n6csKiQVz8qYiMQLwsx+/k3bD3niZyXikWEQMSiDUeNHLNUksBAaqHwoLDsrP6Ci/ydg==",
              "peerDependencies": {
                "embla-carousel": "8.0.0-rc11"
              }
            },
            "node_modules/embla-carousel-react": {
              "version": "8.0.0-rc11",
              "resolved": "https://registry.npmjs.org/embla-carousel-react/-/embla-carousel-react-8.0.0-rc11.tgz",
              "integrity": "sha512-hXOAUMOIa0GF5BtdTTqBuKcjgU+ipul6thTCXOZttqnu2c6VS3SIzUUT+onIIEw+AptzKJcPwGcoAByAGa9eJw==",
              "dependencies": {
                "embla-carousel": "8.0.0-rc11",
                "embla-carousel-reactive-utils": "8.0.0-rc11"
              },
              "peerDependencies": {
                "react": "^16.8.0 || ^17.0.1 || ^18.0.0"
              }
            },
            "node_modules/embla-carousel-reactive-utils": {
              "version": "8.0.0-rc11",
              "resolved": "https://registry.npmjs.org/embla-carousel-reactive-utils/-/embla-carousel-reactive-utils-8.0.0-rc11.tgz",
              "integrity": "sha512-pDNVJNCn0dybLkHw93My+cMfkRQ5oLZff6ZCwgmrw+96aPiZUyo5ANywz8Lb70SWWgD/TNBRrtQCquvjHS31Sg==",
              "peerDependencies": {
                "embla-carousel": "8.0.0-rc11"
              }
            },
            "node_modules/emoji-regex": {
              "version": "8.0.0",
              "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
              "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A=="
            },
            "node_modules/encode-utf8": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/encode-utf8/-/encode-utf8-1.0.3.tgz",
              "integrity": "sha512-ucAnuBEhUK4boH2HjVYG5Q2mQyPorvv0u/ocS+zhdw0S8AlHYY+GOFhP1Gio5z4icpP2ivFSvhtFjQi8+T9ppw=="
            },
            "node_modules/encoding": {
              "version": "0.1.13",
              "resolved": "https://registry.npmjs.org/encoding/-/encoding-0.1.13.tgz",
              "integrity": "sha512-ETBauow1T35Y/WZMkio9jiM0Z5xjHHmJ4XmjZOq1l/dXz3lr2sRn87nJy20RupqSh1F2m3HHPSp8ShIPQJrJ3A==",
              "devOptional": true,
              "dependencies": {
                "iconv-lite": "^0.6.2"
              }
            },
            "node_modules/end-of-stream": {
              "version": "1.4.4",
              "resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.4.tgz",
              "integrity": "sha512-+uw1inIHVPQoaVuHzRyXd21icM+cnt4CzD5rW+NC1wjOUSTOs+Te7FOv7AhN7vS9x/oIyhLP5PR1H+phQAHu5Q==",
              "dependencies": {
                "once": "^1.4.0"
              }
            },
            "node_modules/es5-ext": {
              "version": "0.10.62",
              "resolved": "https://registry.npmjs.org/es5-ext/-/es5-ext-0.10.62.tgz",
              "integrity": "sha512-BHLqn0klhEpnOKSrzn/Xsz2UIW8j+cGmo9JLzr8BiUapV8hPL9+FliFqjwr9ngW7jWdnxv6eO+/LqyhJVqgrjA==",
              "hasInstallScript": true,
              "dependencies": {
                "es6-iterator": "^2.0.3",
                "es6-symbol": "^3.1.3",
                "next-tick": "^1.1.0"
              },
              "engines": {
                "node": ">=0.10"
              }
            },
            "node_modules/es6-iterator": {
              "version": "2.0.3",
              "resolved": "https://registry.npmjs.org/es6-iterator/-/es6-iterator-2.0.3.tgz",
              "integrity": "sha512-zw4SRzoUkd+cl+ZoE15A9o1oQd920Bb0iOJMQkQhl3jNc03YqVjAhG7scf9C5KWRU/R13Orf588uCC6525o02g==",
              "dependencies": {
                "d": "1",
                "es5-ext": "^0.10.35",
                "es6-symbol": "^3.1.1"
              }
            },
            "node_modules/es6-promise": {
              "version": "4.2.8",
              "resolved": "https://registry.npmjs.org/es6-promise/-/es6-promise-4.2.8.tgz",
              "integrity": "sha512-HJDGx5daxeIvxdBxvG2cb9g4tEvwIk3i8+nhX0yGrYmZUzbkdg8QbDevheDB8gd0//uPj4c1EQua8Q+MViT0/w=="
            },
            "node_modules/es6-promisify": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/es6-promisify/-/es6-promisify-5.0.0.tgz",
              "integrity": "sha512-C+d6UdsYDk0lMebHNR4S2NybQMMngAOnOwYBQjTOiv0MkoJMP0Myw2mgpDLBcpfCmRLxyFqYhS/CfOENq4SJhQ==",
              "dependencies": {
                "es6-promise": "^4.0.3"
              }
            },
            "node_modules/es6-symbol": {
              "version": "3.1.3",
              "resolved": "https://registry.npmjs.org/es6-symbol/-/es6-symbol-3.1.3.tgz",
              "integrity": "sha512-NJ6Yn3FuDinBaBRWl/q5X/s4koRHBrgKAu+yGI6JCBeiu3qrcbJhwT2GeR/EXVfylRk8dpQVJoLEFhK+Mu31NA==",
              "dependencies": {
                "d": "^1.0.1",
                "ext": "^1.1.2"
              }
            },
            "node_modules/escalade": {
              "version": "3.1.1",
              "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.1.1.tgz",
              "integrity": "sha512-k0er2gUkLf8O0zKJiAhmkTnJlTvINGv7ygDNPbeIsX/TJjGJZHuh9B2UxbsaEkmlEo9MfhrSzmhIlhRlI2GXnw==",
              "dev": true,
              "engines": {
                "node": ">=6"
              }
            },
            "node_modules/eth-block-tracker": {
              "version": "6.1.0",
              "resolved": "https://registry.npmjs.org/eth-block-tracker/-/eth-block-tracker-6.1.0.tgz",
              "integrity": "sha512-K9SY8+/xMBi4M5HHTDdxnpEqEEGjbNpzHFqvxyjMZej8InV/B+CkFRKM6W+uvrFJ7m8Zd1E0qUkseU3vdIDFYQ==",
              "dependencies": {
                "@metamask/safe-event-emitter": "^2.0.0",
                "@metamask/utils": "^3.0.1",
                "json-rpc-random-id": "^1.0.1",
                "pify": "^3.0.0"
              },
              "engines": {
                "node": ">=14.0.0"
              }
            },
            "node_modules/eth-json-rpc-filters": {
              "version": "5.1.0",
              "resolved": "https://registry.npmjs.org/eth-json-rpc-filters/-/eth-json-rpc-filters-5.1.0.tgz",
              "integrity": "sha512-fos+9xmoa1A2Ytsc9eYof17r81BjdJOUcGcgZn4K/tKdCCTb+a8ytEtwlu1op5qsXFDlgGmstTELFrDEc89qEQ==",
              "dependencies": {
                "@metamask/safe-event-emitter": "^2.0.0",
                "async-mutex": "^0.2.6",
                "eth-query": "^2.1.2",
                "json-rpc-engine": "^6.1.0",
                "pify": "^5.0.0"
              },
              "engines": {
                "node": ">=14.0.0"
              }
            },
            "node_modules/eth-json-rpc-filters/node_modules/pify": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/pify/-/pify-5.0.0.tgz",
              "integrity": "sha512-eW/gHNMlxdSP6dmG6uJip6FXN0EQBwm2clYYd8Wul42Cwu/DK8HEftzsapcNdYe2MfLiIwZqsDk2RDEsTE79hA==",
              "engines": {
                "node": ">=10"
              },
              "funding": {
                "url": "https://github.com/sponsors/sindresorhus"
              }
            },
            "node_modules/eth-query": {
              "version": "2.1.2",
              "resolved": "https://registry.npmjs.org/eth-query/-/eth-query-2.1.2.tgz",
              "integrity": "sha512-srES0ZcvwkR/wd5OQBRA1bIJMww1skfGS0s8wlwK3/oNP4+wnds60krvu5R1QbpRQjMmpG5OMIWro5s7gvDPsA==",
              "dependencies": {
                "json-rpc-random-id": "^1.0.0",
                "xtend": "^4.0.1"
              }
            },
            "node_modules/eth-rpc-errors": {
              "version": "4.0.2",
              "resolved": "https://registry.npmjs.org/eth-rpc-errors/-/eth-rpc-errors-4.0.2.tgz",
              "integrity": "sha512-n+Re6Gu8XGyfFy1it0AwbD1x0MUzspQs0D5UiPs1fFPCr6WAwZM+vbIhXheBFrpgosqN9bs5PqlB4Q61U/QytQ==",
              "dependencies": {
                "fast-safe-stringify": "^2.0.6"
              }
            },
            "node_modules/ethers": {
              "version": "5.7.2",
              "resolved": "https://registry.npmjs.org/ethers/-/ethers-5.7.2.tgz",
              "integrity": "sha512-wswUsmWo1aOK8rR7DIKiWSw9DbLWe6x98Jrn8wcTflTVvaXhAMaB5zGAXy0GYQEQp9iO1iSHWVyARQm11zUtyg==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://gitcoin.co/grants/13/ethersjs-complete-simple-and-tiny-2"
                },
                {
                  "type": "individual",
                  "url": "https://www.buymeacoffee.com/ricmoo"
                }
              ],
              "dependencies": {
                "@ethersproject/abi": "5.7.0",
                "@ethersproject/abstract-provider": "5.7.0",
                "@ethersproject/abstract-signer": "5.7.0",
                "@ethersproject/address": "5.7.0",
                "@ethersproject/base64": "5.7.0",
                "@ethersproject/basex": "5.7.0",
                "@ethersproject/bignumber": "5.7.0",
                "@ethersproject/bytes": "5.7.0",
                "@ethersproject/constants": "5.7.0",
                "@ethersproject/contracts": "5.7.0",
                "@ethersproject/hash": "5.7.0",
                "@ethersproject/hdnode": "5.7.0",
                "@ethersproject/json-wallets": "5.7.0",
                "@ethersproject/keccak256": "5.7.0",
                "@ethersproject/logger": "5.7.0",
                "@ethersproject/networks": "5.7.1",
                "@ethersproject/pbkdf2": "5.7.0",
                "@ethersproject/properties": "5.7.0",
                "@ethersproject/providers": "5.7.2",
                "@ethersproject/random": "5.7.0",
                "@ethersproject/rlp": "5.7.0",
                "@ethersproject/sha2": "5.7.0",
                "@ethersproject/signing-key": "5.7.0",
                "@ethersproject/solidity": "5.7.0",
                "@ethersproject/strings": "5.7.0",
                "@ethersproject/transactions": "5.7.0",
                "@ethersproject/units": "5.7.0",
                "@ethersproject/wallet": "5.7.0",
                "@ethersproject/web": "5.7.1",
                "@ethersproject/wordlists": "5.7.0"
              }
            },
            "node_modules/eventemitter3": {
              "version": "4.0.7",
              "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-4.0.7.tgz",
              "integrity": "sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw=="
            },
            "node_modules/events": {
              "version": "3.3.0",
              "resolved": "https://registry.npmjs.org/events/-/events-3.3.0.tgz",
              "integrity": "sha512-mQw+2fkQbALzQ7V0MY0IqdnXNOeTtP4r0lN9z7AAawCXgqea7bDii20AYrIBrFd/Hx0M2Ocz6S111CaFkUcb0Q==",
              "engines": {
                "node": ">=0.8.x"
              }
            },
            "node_modules/ext": {
              "version": "1.7.0",
              "resolved": "https://registry.npmjs.org/ext/-/ext-1.7.0.tgz",
              "integrity": "sha512-6hxeJYaL110a9b5TEJSj0gojyHQAmA2ch5Os+ySCiA1QGdS697XWY1pzsrSjqA9LDEEgdB/KypIlR59RcLuHYw==",
              "dependencies": {
                "type": "^2.7.2"
              }
            },
            "node_modules/ext/node_modules/type": {
              "version": "2.7.2",
              "resolved": "https://registry.npmjs.org/type/-/type-2.7.2.tgz",
              "integrity": "sha512-dzlvlNlt6AXU7EBSfpAscydQ7gXB+pPGsPnfJnZpiNJBDj7IaJzQlBZYGdEi4R9HmPdBv2XmWJ6YUtoTa7lmCw=="
            },
            "node_modules/eyes": {
              "version": "0.1.8",
              "resolved": "https://registry.npmjs.org/eyes/-/eyes-0.1.8.tgz",
              "integrity": "sha512-GipyPsXO1anza0AOZdy69Im7hGFCNB7Y/NGjDlZGJ3GJJLtwNSb2vrzYrTYJRrRloVx7pl+bhUaTB8yiccPvFQ==",
              "engines": {
                "node": "> 0.1.90"
              }
            },
            "node_modules/fast-glob": {
              "version": "3.3.1",
              "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.1.tgz",
              "integrity": "sha512-kNFPyjhh5cKjrUltxs+wFx+ZkbRaxxmZ+X0ZU31SOsxCEtP9VPgtq2teZw1DebupL5GmDaNQ6yKMMVcM41iqDg==",
              "dev": true,
              "dependencies": {
                "@nodelib/fs.stat": "^2.0.2",
                "@nodelib/fs.walk": "^1.2.3",
                "glob-parent": "^5.1.2",
                "merge2": "^1.3.0",
                "micromatch": "^4.0.4"
              },
              "engines": {
                "node": ">=8.6.0"
              }
            },
            "node_modules/fast-glob/node_modules/glob-parent": {
              "version": "5.1.2",
              "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
              "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
              "dev": true,
              "dependencies": {
                "is-glob": "^4.0.1"
              },
              "engines": {
                "node": ">= 6"
              }
            },
            "node_modules/fast-redact": {
              "version": "3.2.0",
              "resolved": "https://registry.npmjs.org/fast-redact/-/fast-redact-3.2.0.tgz",
              "integrity": "sha512-zaTadChr+NekyzallAMXATXLOR8MNx3zqpZ0MUF2aGf4EathnG0f32VLODNlY8IuGY3HoRO2L6/6fSzNsLaHIw==",
              "engines": {
                "node": ">=6"
              }
            },
            "node_modules/fast-safe-stringify": {
              "version": "2.1.1",
              "resolved": "https://registry.npmjs.org/fast-safe-stringify/-/fast-safe-stringify-2.1.1.tgz",
              "integrity": "sha512-W+KJc2dmILlPplD/H4K9l9LcAHAfPtP6BY84uVLXQ6Evcz9Lcg33Y2z1IVblT6xdY54PXYVHEv+0Wpq8Io6zkA=="
            },
            "node_modules/fast-stable-stringify": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/fast-stable-stringify/-/fast-stable-stringify-1.0.0.tgz",
              "integrity": "sha512-wpYMUmFu5f00Sm0cj2pfivpmawLZ0NKdviQ4w9zJeR8JVtOpOxHmLaJuj0vxvGqMJQWyP/COUkF75/57OKyRag=="
            },
            "node_modules/fastq": {
              "version": "1.15.0",
              "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.15.0.tgz",
              "integrity": "sha512-wBrocU2LCXXa+lWBt8RoIRD89Fi8OdABODa/kEnyeyjS5aZO5/GNvI5sEINADqP/h8M29UHTHUb53sUu5Ihqdw==",
              "dev": true,
              "dependencies": {
                "reusify": "^1.0.4"
              }
            },
            "node_modules/file-uri-to-path": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/file-uri-to-path/-/file-uri-to-path-1.0.0.tgz",
              "integrity": "sha512-0Zt+s3L7Vf1biwWZ29aARiVYLx7iMGnEUl9x33fbB/j3jR81u/O2LbqK+Bm1CDSNDKVtJ/YjwY7TUd5SkeLQLw=="
            },
            "node_modules/fill-range": {
              "version": "7.0.1",
              "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.0.1.tgz",
              "integrity": "sha512-qOo9F+dMUmC2Lcb4BbVvnKJxTPjCm+RRpe4gDuGrzkL7mEVl/djYSu2OdQ2Pa302N4oqkSg9ir6jaLWJ2USVpQ==",
              "dev": true,
              "dependencies": {
                "to-regex-range": "^5.0.1"
              },
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/filter-obj": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/filter-obj/-/filter-obj-1.1.0.tgz",
              "integrity": "sha512-8rXg1ZnX7xzy2NGDVkBVaAy+lSlPNwad13BtgSlLuxfIslyt5Vg64U7tFcCt4WS1R0hvtnQybT/IyCkGZ3DpXQ==",
              "engines": {
                "node": ">=0.10.0"
              }
            },
            "node_modules/find-up": {
              "version": "4.1.0",
              "resolved": "https://registry.npmjs.org/find-up/-/find-up-4.1.0.tgz",
              "integrity": "sha512-PpOwAdQ/YlXQ2vj8a3h8IipDuYRi3wceVQQGYWxNINccq40Anw7BlsEXCMbt1Zt+OLA6Fq9suIpIWD0OsnISlw==",
              "dependencies": {
                "locate-path": "^5.0.0",
                "path-exists": "^4.0.0"
              },
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/follow-redirects": {
              "version": "1.15.2",
              "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.15.2.tgz",
              "integrity": "sha512-VQLG33o04KaQ8uYi2tVNbdrWp1QWxNNea+nmIB4EVM28v0hmP17z7aG1+wAkNzVq4KeXTq3221ye5qTJP91JwA==",
              "funding": [
                {
                  "type": "individual",
                  "url": "https://github.com/sponsors/RubenVerborgh"
                }
              ],
              "engines": {
                "node": ">=4.0"
              },
              "peerDependenciesMeta": {
                "debug": {
                  "optional": true
                }
              }
            },
            "node_modules/for-each": {
              "version": "0.3.3",
              "resolved": "https://registry.npmjs.org/for-each/-/for-each-0.3.3.tgz",
              "integrity": "sha512-jqYfLp7mo9vIyQf8ykW2v7A+2N4QjeCeI5+Dz9XraiO1ign81wjiH7Fb9vSOWvQfNtmSa4H2RoQTrrXivdUZmw==",
              "dependencies": {
                "is-callable": "^1.1.3"
              }
            },
            "node_modules/fraction.js": {
              "version": "4.2.0",
              "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.2.0.tgz",
              "integrity": "sha512-MhLuK+2gUcnZe8ZHlaaINnQLl0xRIGRfcGk2yl8xoQAfHrSsL3rYu6FCmBdkdbhc9EPlwyGHewaRsvwRMJtAlA==",
              "dev": true,
              "engines": {
                "node": "*"
              },
              "funding": {
                "type": "patreon",
                "url": "https://www.patreon.com/infusion"
              }
            },
            "node_modules/fs.realpath": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
              "integrity": "sha512-OO0pH2lK6a0hZnAdau5ItzHPI6pUlvI7jMVnxUQRtw4owF2wk8lOSabtGDCTP4Ggrg2MbGnWO9X8K1t4+fGMDw==",
              "dev": true
            },
            "node_modules/function-bind": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.1.tgz",
              "integrity": "sha512-yIovAzMX49sF8Yl58fSCWJ5svSLuaibPxXQJFLmBObTuCr0Mf1KiPopGM9NiFjiYBCbfaa2Fh6breQ6ANVTI0A=="
            },
            "node_modules/get-caller-file": {
              "version": "2.0.5",
              "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
              "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
              "engines": {
                "node": "6.* || 8.* || >= 10.*"
              }
            },
            "node_modules/get-intrinsic": {
              "version": "1.2.1",
              "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.2.1.tgz",
              "integrity": "sha512-2DcsyfABl+gVHEfCOaTrWgyt+tb6MSEGmKq+kI5HwLbIYgjgmMcV8KQ41uaKz1xxUcn9tJtgFbQUEVcEbd0FYw==",
              "dependencies": {
                "function-bind": "^1.1.1",
                "has": "^1.0.3",
                "has-proto": "^1.0.1",
                "has-symbols": "^1.0.3"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/get-nonce": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/get-nonce/-/get-nonce-1.0.1.tgz",
              "integrity": "sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q==",
              "engines": {
                "node": ">=6"
              }
            },
            "node_modules/glob": {
              "version": "7.1.6",
              "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.6.tgz",
              "integrity": "sha512-LwaxwyZ72Lk7vZINtNNrywX0ZuLyStrdDtabefZKAY5ZGJhVtgdznluResxNmPitE0SAO+O26sWTHeKSI2wMBA==",
              "dev": true,
              "dependencies": {
                "fs.realpath": "^1.0.0",
                "inflight": "^1.0.4",
                "inherits": "2",
                "minimatch": "^3.0.4",
                "once": "^1.3.0",
                "path-is-absolute": "^1.0.0"
              },
              "engines": {
                "node": "*"
              },
              "funding": {
                "url": "https://github.com/sponsors/isaacs"
              }
            },
            "node_modules/glob-parent": {
              "version": "6.0.2",
              "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
              "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
              "dev": true,
              "dependencies": {
                "is-glob": "^4.0.3"
              },
              "engines": {
                "node": ">=10.13.0"
              }
            },
            "node_modules/glob-to-regexp": {
              "version": "0.4.1",
              "resolved": "https://registry.npmjs.org/glob-to-regexp/-/glob-to-regexp-0.4.1.tgz",
              "integrity": "sha512-lkX1HJXwyMcprw/5YUZc2s7DrpAiHB21/V+E1rHUrVNokkvB6bqMzT0VfV6/86ZNabt1k14YOIaT7nDvOX3Iiw=="
            },
            "node_modules/goober": {
              "version": "2.1.13",
              "resolved": "https://registry.npmjs.org/goober/-/goober-2.1.13.tgz",
              "integrity": "sha512-jFj3BQeleOoy7t93E9rZ2de+ScC4lQICLwiAQmKMg9F6roKGaLSHoCDYKkWlSafg138jejvq/mTdvmnwDQgqoQ==",
              "peerDependencies": {
                "csstype": "^3.0.10"
              }
            },
            "node_modules/gopd": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.0.1.tgz",
              "integrity": "sha512-d65bNlIadxvpb/A2abVdlqKqV563juRnZ1Wtk6s1sIR8uNsXR70xqIzVqxVf1eTqDunwT2MkczEeaezCKTZhwA==",
              "dependencies": {
                "get-intrinsic": "^1.1.3"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/graceful-fs": {
              "version": "4.2.11",
              "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
              "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ=="
            },
            "node_modules/gsap": {
              "name": "@gsap/shockingly",
              "version": "3.12.2",
              "resolved": "https://npm.greensock.com/@gsap%2fshockingly/-/shockingly-3.12.2.tgz",
              "integrity": "sha512-kYmkwAQ53GzBxs+e8pu/BCzUMrfJoBSEE1JI5HB6wUGDt9yuR/XTwSNfRCBzbuzy/zR9HgqubZnU59LhOiOzwA==",
              "license": "This package should only be used by individuals/companies with an active Club GreenSock membership (Shockingly Green or higher). See https://greensock.com/club/. Licensing: https://greensock.com/licensing/"
            },
            "node_modules/has": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/has/-/has-1.0.3.tgz",
              "integrity": "sha512-f2dvO0VU6Oej7RkWJGrehjbzMAjFp5/VKPp5tTpWIV4JHHZK1/BxbFRtf/siA2SWTe09caDmVtYYzWEIbBS4zw==",
              "dependencies": {
                "function-bind": "^1.1.1"
              },
              "engines": {
                "node": ">= 0.4.0"
              }
            },
            "node_modules/has-flag": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
              "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/has-proto": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/has-proto/-/has-proto-1.0.1.tgz",
              "integrity": "sha512-7qE+iP+O+bgF9clE5+UoBFzE65mlBiVj3tKCrlNQ0Ogwm0BjpT/gK4SlLYDMybDh5I3TCTKnPPa0oMG7JDYrhg==",
              "engines": {
                "node": ">= 0.4"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/has-symbols": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.3.tgz",
              "integrity": "sha512-l3LCuF6MgDNwTDKkdYGEihYjt5pRPbEg46rtlmnSPlUbgmB8LOIrKJbYYFBSbnPaJexMKtiPO8hmeRjRz2Td+A==",
              "engines": {
                "node": ">= 0.4"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/has-tostringtag": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.0.tgz",
              "integrity": "sha512-kFjcSNhnlGV1kyoGk7OXKSawH5JOb/LzUc5w9B02hOTO0dfFRjbHQKvg1d6cf3HbeUmtU9VbbV3qzZ2Teh97WQ==",
              "dependencies": {
                "has-symbols": "^1.0.2"
              },
              "engines": {
                "node": ">= 0.4"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/hash.js": {
              "version": "1.1.7",
              "resolved": "https://registry.npmjs.org/hash.js/-/hash.js-1.1.7.tgz",
              "integrity": "sha512-taOaskGt4z4SOANNseOviYDvjEJinIkRgmp7LbKP2YTTmVxWBl87s/uzK9r+44BclBSp2X7K1hqeNfz9JbBeXA==",
              "dependencies": {
                "inherits": "^2.0.3",
                "minimalistic-assert": "^1.0.1"
              }
            },
            "node_modules/hey-listen": {
              "version": "1.0.8",
              "resolved": "https://registry.npmjs.org/hey-listen/-/hey-listen-1.0.8.tgz",
              "integrity": "sha512-COpmrF2NOg4TBWUJ5UVyaCU2A88wEMkUPK4hNqyCkqHbxT92BbvfjoSozkAIIm6XhicGlJHhFdullInrdhwU8Q=="
            },
            "node_modules/hmac-drbg": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/hmac-drbg/-/hmac-drbg-1.0.1.tgz",
              "integrity": "sha512-Tti3gMqLdZfhOQY1Mzf/AanLiqh1WTiJgEj26ZuYQ9fbkLomzGchCws4FyrSd4VkpBfiNhaE1On+lOz894jvXg==",
              "dependencies": {
                "hash.js": "^1.0.3",
                "minimalistic-assert": "^1.0.0",
                "minimalistic-crypto-utils": "^1.0.1"
              }
            },
            "node_modules/hoist-non-react-statics": {
              "version": "3.3.2",
              "resolved": "https://registry.npmjs.org/hoist-non-react-statics/-/hoist-non-react-statics-3.3.2.tgz",
              "integrity": "sha512-/gGivxi8JPKWNm/W0jSmzcMPpfpPLc3dY/6GxhX2hQ9iGj3aDfklV4ET7NjKpSinLpJ5vafa9iiGIEZg10SfBw==",
              "dependencies": {
                "react-is": "^16.7.0"
              }
            },
            "node_modules/humanize-ms": {
              "version": "1.2.1",
              "resolved": "https://registry.npmjs.org/humanize-ms/-/humanize-ms-1.2.1.tgz",
              "integrity": "sha512-Fl70vYtsAFb/C06PTS9dZBo7ihau+Tu/DNCk/OyHhea07S+aeMWpFFkUaXRa8fI+ScZbEI8dfSxwY7gxZ9SAVQ==",
              "dependencies": {
                "ms": "^2.0.0"
              }
            },
            "node_modules/iconv-lite": {
              "version": "0.6.3",
              "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
              "integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
              "devOptional": true,
              "dependencies": {
                "safer-buffer": ">= 2.1.2 < 3.0.0"
              },
              "engines": {
                "node": ">=0.10.0"
              }
            },
            "node_modules/ieee754": {
              "version": "1.2.1",
              "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.2.1.tgz",
              "integrity": "sha512-dcyqhDvX1C46lXZcVqCpK+FtMRQVdIMN6/Df5js2zouUsqG7I6sFxitIC+7KYK29KdXOLHdu9zL4sFnoVQnqaA==",
              "funding": [
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/feross"
                },
                {
                  "type": "patreon",
                  "url": "https://www.patreon.com/feross"
                },
                {
                  "type": "consulting",
                  "url": "https://feross.org/support"
                }
              ]
            },
            "node_modules/immer": {
              "version": "9.0.21",
              "resolved": "https://registry.npmjs.org/immer/-/immer-9.0.21.tgz",
              "integrity": "sha512-bc4NBHqOqSfRW7POMkHd51LvClaeMXpm8dx0e8oE2GORbq5aRK7Bxl4FyzVLdGtLmvLKL7BTDBG5ACQm4HWjTA==",
              "funding": {
                "type": "opencollective",
                "url": "https://opencollective.com/immer"
              }
            },
            "node_modules/inflight": {
              "version": "1.0.6",
              "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
              "integrity": "sha512-k92I/b08q4wvFscXCLvqfsHCrjrF7yiXsQuIVvVE7N82W3+aqpzuUdBbfhWcy/FZR3/4IgflMgKLOsvPDrGCJA==",
              "dev": true,
              "dependencies": {
                "once": "^1.3.0",
                "wrappy": "1"
              }
            },
            "node_modules/inherits": {
              "version": "2.0.4",
              "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
              "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ=="
            },
            "node_modules/invariant": {
              "version": "2.2.4",
              "resolved": "https://registry.npmjs.org/invariant/-/invariant-2.2.4.tgz",
              "integrity": "sha512-phJfQVBuaJM5raOpJjSfkiD6BpbCE4Ns//LaXl6wGYtUBY83nWS6Rf9tXm2e8VaK60JEjYldbPif/A2B1C2gNA==",
              "dependencies": {
                "loose-envify": "^1.0.0"
              }
            },
            "node_modules/iron-session": {
              "version": "6.3.1",
              "resolved": "https://registry.npmjs.org/iron-session/-/iron-session-6.3.1.tgz",
              "integrity": "sha512-3UJ7y2vk/WomAtEySmPgM6qtYF1cZ3tXuWX5GsVX4PJXAcs5y/sV9HuSfpjKS6HkTL/OhZcTDWJNLZ7w+Erx3A==",
              "dependencies": {
                "@peculiar/webcrypto": "^1.4.0",
                "@types/cookie": "^0.5.1",
                "@types/express": "^4.17.13",
                "@types/koa": "^2.13.5",
                "@types/node": "^17.0.41",
                "cookie": "^0.5.0",
                "iron-webcrypto": "^0.2.5"
              },
              "engines": {
                "node": ">=12"
              },
              "peerDependencies": {
                "express": ">=4",
                "koa": ">=2",
                "next": ">=10"
              },
              "peerDependenciesMeta": {
                "express": {
                  "optional": true
                },
                "koa": {
                  "optional": true
                },
                "next": {
                  "optional": true
                }
              }
            },
            "node_modules/iron-session/node_modules/@types/node": {
              "version": "17.0.45",
              "resolved": "https://registry.npmjs.org/@types/node/-/node-17.0.45.tgz",
              "integrity": "sha512-w+tIMs3rq2afQdsPJlODhoUEKzFP1ayaoyl1CcnwtIlsVe7K7bA1NGm4s3PraqTLlXnbIN84zuBlxBWo1u9BLw=="
            },
            "node_modules/iron-webcrypto": {
              "version": "0.2.8",
              "resolved": "https://registry.npmjs.org/iron-webcrypto/-/iron-webcrypto-0.2.8.tgz",
              "integrity": "sha512-YPdCvjFMOBjXaYuDj5tiHst5CEk6Xw84Jo8Y2+jzhMceclAnb3+vNPP/CTtb5fO2ZEuXEaO4N+w62Vfko757KA==",
              "dependencies": {
                "buffer": "^6"
              },
              "funding": {
                "url": "https://github.com/sponsors/brc-dd"
              }
            },
            "node_modules/is-arguments": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/is-arguments/-/is-arguments-1.1.1.tgz",
              "integrity": "sha512-8Q7EARjzEnKpt/PCD7e1cgUS0a6X8u5tdSiMqXhojOdoV9TsMsiO+9VLC5vAmO8N7/GmXn7yjR8qnA6bVAEzfA==",
              "dependencies": {
                "call-bind": "^1.0.2",
                "has-tostringtag": "^1.0.0"
              },
              "engines": {
                "node": ">= 0.4"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/is-binary-path": {
              "version": "2.1.0",
              "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
              "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
              "dev": true,
              "dependencies": {
                "binary-extensions": "^2.0.0"
              },
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/is-callable": {
              "version": "1.2.7",
              "resolved": "https://registry.npmjs.org/is-callable/-/is-callable-1.2.7.tgz",
              "integrity": "sha512-1BC0BVFhS/p0qtw6enp8e+8OD0UrK0oFLztSjNzhcKA3WDuJxxAPXzPuPtKkjEY9UUoEWlX/8fgKeu2S8i9JTA==",
              "engines": {
                "node": ">= 0.4"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/is-core-module": {
              "version": "2.13.0",
              "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.13.0.tgz",
              "integrity": "sha512-Z7dk6Qo8pOCp3l4tsX2C5ZVas4V+UxwQodwZhLopL91TX8UyyHEXafPcyoeeWuLrwzHcr3igO78wNLwHJHsMCQ==",
              "dev": true,
              "dependencies": {
                "has": "^1.0.3"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/is-extglob": {
              "version": "2.1.1",
              "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
              "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
              "dev": true,
              "engines": {
                "node": ">=0.10.0"
              }
            },
            "node_modules/is-fullwidth-code-point": {
              "version": "3.0.0",
              "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
              "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/is-generator-function": {
              "version": "1.0.10",
              "resolved": "https://registry.npmjs.org/is-generator-function/-/is-generator-function-1.0.10.tgz",
              "integrity": "sha512-jsEjy9l3yiXEQ+PsXdmBwEPcOxaXWLspKdplFUVI9vq1iZgIekeC0L167qeu86czQaxed3q/Uzuw0swL0irL8A==",
              "dependencies": {
                "has-tostringtag": "^1.0.0"
              },
              "engines": {
                "node": ">= 0.4"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/is-glob": {
              "version": "4.0.3",
              "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
              "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
              "dev": true,
              "dependencies": {
                "is-extglob": "^2.1.1"
              },
              "engines": {
                "node": ">=0.10.0"
              }
            },
            "node_modules/is-number": {
              "version": "7.0.0",
              "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
              "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
              "dev": true,
              "engines": {
                "node": ">=0.12.0"
              }
            },
            "node_modules/is-typed-array": {
              "version": "1.1.10",
              "resolved": "https://registry.npmjs.org/is-typed-array/-/is-typed-array-1.1.10.tgz",
              "integrity": "sha512-PJqgEHiWZvMpaFZ3uTc8kHPM4+4ADTlDniuQL7cU/UDA0Ql7F70yGfHph3cLNe+c9toaigv+DFzTJKhc2CtO6A==",
              "dependencies": {
                "available-typed-arrays": "^1.0.5",
                "call-bind": "^1.0.2",
                "for-each": "^0.3.3",
                "gopd": "^1.0.1",
                "has-tostringtag": "^1.0.0"
              },
              "engines": {
                "node": ">= 0.4"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/is-typedarray": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/is-typedarray/-/is-typedarray-1.0.0.tgz",
              "integrity": "sha512-cyA56iCMHAh5CdzjJIa4aohJyeO1YbwLi3Jc35MmRU6poroFjIGZzUzupGiRPOjgHg9TLu43xbpwXk523fMxKA=="
            },
            "node_modules/isomorphic-ws": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/isomorphic-ws/-/isomorphic-ws-5.0.0.tgz",
              "integrity": "sha512-muId7Zzn9ywDsyXgTIafTry2sV3nySZeUDe6YedVd1Hvuuep5AsIlqK+XefWpYTyJG5e503F2xIuT2lcU6rCSw==",
              "peerDependencies": {
                "ws": "*"
              }
            },
            "node_modules/jayson": {
              "version": "3.7.0",
              "resolved": "https://registry.npmjs.org/jayson/-/jayson-3.7.0.tgz",
              "integrity": "sha512-tfy39KJMrrXJ+mFcMpxwBvFDetS8LAID93+rycFglIQM4kl3uNR3W4lBLE/FFhsoUCEox5Dt2adVpDm/XtebbQ==",
              "dependencies": {
                "@types/connect": "^3.4.33",
                "@types/node": "^12.12.54",
                "@types/ws": "^7.4.4",
                "commander": "^2.20.3",
                "delay": "^5.0.0",
                "es6-promisify": "^5.0.0",
                "eyes": "^0.1.8",
                "isomorphic-ws": "^4.0.1",
                "json-stringify-safe": "^5.0.1",
                "JSONStream": "^1.3.5",
                "lodash": "^4.17.20",
                "uuid": "^8.3.2",
                "ws": "^7.4.5"
              },
              "bin": {
                "jayson": "bin/jayson.js"
              },
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/jayson/node_modules/@types/node": {
              "version": "12.20.55",
              "resolved": "https://registry.npmjs.org/@types/node/-/node-12.20.55.tgz",
              "integrity": "sha512-J8xLz7q2OFulZ2cyGTLE1TbbZcjpno7FaN6zdJNrgAdrJ+DZzh/uFR6YrTb4C+nXakvud8Q4+rbhoIWlYQbUFQ=="
            },
            "node_modules/jayson/node_modules/isomorphic-ws": {
              "version": "4.0.1",
              "resolved": "https://registry.npmjs.org/isomorphic-ws/-/isomorphic-ws-4.0.1.tgz",
              "integrity": "sha512-BhBvN2MBpWTaSHdWRb/bwdZJ1WaehQ2L1KngkCkfLUGF0mAWAT1sQUQacEmQ0jXkFw/czDXPNQSL5u2/Krsz1w==",
              "peerDependencies": {
                "ws": "*"
              }
            },
            "node_modules/jayson/node_modules/uuid": {
              "version": "8.3.2",
              "resolved": "https://registry.npmjs.org/uuid/-/uuid-8.3.2.tgz",
              "integrity": "sha512-+NYs2QeMWy+GWFOEm9xnn6HCDp0l7QBD7ml8zLUmJ+93Q5NF0NocErnwkTkXVFNiX3/fpC6afS8Dhb/gz7R7eg==",
              "bin": {
                "uuid": "dist/bin/uuid"
              }
            },
            "node_modules/jayson/node_modules/ws": {
              "version": "7.5.9",
              "resolved": "https://registry.npmjs.org/ws/-/ws-7.5.9.tgz",
              "integrity": "sha512-F+P9Jil7UiSKSkppIiD94dN07AwvFixvLIj1Og1Rl9GGMuNipJnV9JzjD6XuqmAeiswGvUmNLjr5cFuXwNS77Q==",
              "engines": {
                "node": ">=8.3.0"
              },
              "peerDependencies": {
                "bufferutil": "^4.0.1",
                "utf-8-validate": "^5.0.2"
              },
              "peerDependenciesMeta": {
                "bufferutil": {
                  "optional": true
                },
                "utf-8-validate": {
                  "optional": true
                }
              }
            },
            "node_modules/jiti": {
              "version": "1.19.1",
              "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.19.1.tgz",
              "integrity": "sha512-oVhqoRDaBXf7sjkll95LHVS6Myyyb1zaunVwk4Z0+WPSW4gjS0pl01zYKHScTuyEhQsFxV5L4DR5r+YqSyqyyg==",
              "dev": true,
              "bin": {
                "jiti": "bin/jiti.js"
              }
            },
            "node_modules/jose": {
              "version": "4.14.4",
              "resolved": "https://registry.npmjs.org/jose/-/jose-4.14.4.tgz",
              "integrity": "sha512-j8GhLiKmUAh+dsFXlX1aJCbt5KMibuKb+d7j1JaOJG6s2UjX1PQlW+OKB/sD4a/5ZYF4RcmYmLSndOoU3Lt/3g==",
              "funding": {
                "url": "https://github.com/sponsors/panva"
              }
            },
            "node_modules/js-sha3": {
              "version": "0.8.0",
              "resolved": "https://registry.npmjs.org/js-sha3/-/js-sha3-0.8.0.tgz",
              "integrity": "sha512-gF1cRrHhIzNfToc802P800N8PpXS+evLLXfsVpowqmAFR9uwbi89WvXg2QspOmXL8QL86J4T1EpFu+yUkwJY3Q=="
            },
            "node_modules/js-tokens": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
              "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ=="
            },
            "node_modules/json-rpc-engine": {
              "version": "6.1.0",
              "resolved": "https://registry.npmjs.org/json-rpc-engine/-/json-rpc-engine-6.1.0.tgz",
              "integrity": "sha512-NEdLrtrq1jUZyfjkr9OCz9EzCNhnRyWtt1PAnvnhwy6e8XETS0Dtc+ZNCO2gvuAoKsIn2+vCSowXTYE4CkgnAQ==",
              "dependencies": {
                "@metamask/safe-event-emitter": "^2.0.0",
                "eth-rpc-errors": "^4.0.2"
              },
              "engines": {
                "node": ">=10.0.0"
              }
            },
            "node_modules/json-rpc-random-id": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/json-rpc-random-id/-/json-rpc-random-id-1.0.1.tgz",
              "integrity": "sha512-RJ9YYNCkhVDBuP4zN5BBtYAzEl03yq/jIIsyif0JY9qyJuQQZNeDK7anAPKKlyEtLSj2s8h6hNh2F8zO5q7ScA=="
            },
            "node_modules/json-stringify-safe": {
              "version": "5.0.1",
              "resolved": "https://registry.npmjs.org/json-stringify-safe/-/json-stringify-safe-5.0.1.tgz",
              "integrity": "sha512-ZClg6AaYvamvYEE82d3Iyd3vSSIjQ+odgjaTzRuO3s7toCdFKczob2i0zCh7JE8kWn17yvAWhUVxvqGwUalsRA=="
            },
            "node_modules/json2mq": {
              "version": "0.2.0",
              "resolved": "https://registry.npmjs.org/json2mq/-/json2mq-0.2.0.tgz",
              "integrity": "sha512-SzoRg7ux5DWTII9J2qkrZrqV1gt+rTaoufMxEzXbS26Uid0NwaJd123HcoB80TgubEppxxIGdNxCx50fEoEWQA==",
              "dependencies": {
                "string-convert": "^0.2.0"
              }
            },
            "node_modules/jsonparse": {
              "version": "1.3.1",
              "resolved": "https://registry.npmjs.org/jsonparse/-/jsonparse-1.3.1.tgz",
              "integrity": "sha512-POQXvpdL69+CluYsillJ7SUhKvytYjW9vG/GKpnf+xP8UWgYEM/RaMzHHofbALDiKbbP1W8UEYmgGl39WkPZsg==",
              "engines": [
                "node >= 0.2.0"
              ]
            },
            "node_modules/JSONStream": {
              "version": "1.3.5",
              "resolved": "https://registry.npmjs.org/JSONStream/-/JSONStream-1.3.5.tgz",
              "integrity": "sha512-E+iruNOY8VV9s4JEbe1aNEm6MiszPRr/UfcHMz0TQh1BXSxHK+ASV1R6W4HpjBhSeS+54PIsAMCBmwD06LLsqQ==",
              "dependencies": {
                "jsonparse": "^1.2.0",
                "through": ">=2.2.7 <3"
              },
              "bin": {
                "JSONStream": "bin.js"
              },
              "engines": {
                "node": "*"
              }
            },
            "node_modules/keccak": {
              "version": "3.0.3",
              "resolved": "https://registry.npmjs.org/keccak/-/keccak-3.0.3.tgz",
              "integrity": "sha512-JZrLIAJWuZxKbCilMpNz5Vj7Vtb4scDG3dMXLOsbzBmQGyjwE61BbW7bJkfKKCShXiQZt3T6sBgALRtmd+nZaQ==",
              "hasInstallScript": true,
              "dependencies": {
                "node-addon-api": "^2.0.0",
                "node-gyp-build": "^4.2.0",
                "readable-stream": "^3.6.0"
              },
              "engines": {
                "node": ">=10.0.0"
              }
            },
            "node_modules/keyvaluestorage-interface": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/keyvaluestorage-interface/-/keyvaluestorage-interface-1.0.0.tgz",
              "integrity": "sha512-8t6Q3TclQ4uZynJY9IGr2+SsIGwK9JHcO6ootkHCGA0CrQCRy+VkouYNO2xicET6b9al7QKzpebNow+gkpCL8g=="
            },
            "node_modules/lilconfig": {
              "version": "2.1.0",
              "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-2.1.0.tgz",
              "integrity": "sha512-utWOt/GHzuUxnLKxB6dk81RoOeoNeHgbrXiuGk4yyF5qlRz+iIVWu56E2fqGHFrXz0QNUhLB/8nKqvRH66JKGQ==",
              "dev": true,
              "engines": {
                "node": ">=10"
              }
            },
            "node_modules/lines-and-columns": {
              "version": "1.2.4",
              "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
              "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
              "dev": true
            },
            "node_modules/lit": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/lit/-/lit-2.7.4.tgz",
              "integrity": "sha512-cgD7xrZoYr21mbrkZIuIrj98YTMw/snJPg52deWVV4A8icLyNHI3bF70xsJeAgwTuiq5Kkd+ZR8gybSJDCPB7g==",
              "dependencies": {
                "@lit/reactive-element": "^1.6.0",
                "lit-element": "^3.3.0",
                "lit-html": "^2.7.0"
              }
            },
            "node_modules/lit-element": {
              "version": "3.3.2",
              "resolved": "https://registry.npmjs.org/lit-element/-/lit-element-3.3.2.tgz",
              "integrity": "sha512-xXAeVWKGr4/njq0rGC9dethMnYCq5hpKYrgQZYTzawt9YQhMiXfD+T1RgrdY3NamOxwq2aXlb0vOI6e29CKgVQ==",
              "dependencies": {
                "@lit-labs/ssr-dom-shim": "^1.1.0",
                "@lit/reactive-element": "^1.3.0",
                "lit-html": "^2.7.0"
              }
            },
            "node_modules/lit-html": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/lit-html/-/lit-html-2.7.4.tgz",
              "integrity": "sha512-/Jw+FBpeEN+z8X6PJva5n7+0MzCVAH2yypN99qHYYkq8bI+j7I39GH+68Z/MZD6rGKDK9RpzBw7CocfmHfq6+g==",
              "dependencies": {
                "@types/trusted-types": "^2.0.2"
              }
            },
            "node_modules/locate-path": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-5.0.0.tgz",
              "integrity": "sha512-t7hw9pI+WvuwNJXwk5zVHpyhIqzg2qTlklJOf0mVxGSbe3Fp2VieZcduNYjaLDoy6p9uGpQEGWG87WpMKlNq8g==",
              "dependencies": {
                "p-locate": "^4.1.0"
              },
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/lodash": {
              "version": "4.17.21",
              "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
              "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg=="
            },
            "node_modules/lodash.camelcase": {
              "version": "4.3.0",
              "resolved": "https://registry.npmjs.org/lodash.camelcase/-/lodash.camelcase-4.3.0.tgz",
              "integrity": "sha512-TwuEnCnxbc3rAvhf/LbG7tJUDzhqXyFnv3dtzLOPgCG/hODL7WFnsbwktkD7yUV0RrreP/l1PALq/YSg6VvjlA=="
            },
            "node_modules/lodash.isequal": {
              "version": "4.5.0",
              "resolved": "https://registry.npmjs.org/lodash.isequal/-/lodash.isequal-4.5.0.tgz",
              "integrity": "sha512-pDo3lu8Jhfjqls6GkMgpahsF9kCyayhgykjyLMNFTKWrpVdAQtYyB4muAMWozBB4ig/dtWAmsMxLEI8wuz+DYQ=="
            },
            "node_modules/loose-envify": {
              "version": "1.4.0",
              "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
              "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
              "dependencies": {
                "js-tokens": "^3.0.0 || ^4.0.0"
              },
              "bin": {
                "loose-envify": "cli.js"
              }
            },
            "node_modules/lru-cache": {
              "version": "6.0.0",
              "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
              "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
              "dependencies": {
                "yallist": "^4.0.0"
              },
              "engines": {
                "node": ">=10"
              }
            },
            "node_modules/media-query-parser": {
              "version": "2.0.2",
              "resolved": "https://registry.npmjs.org/media-query-parser/-/media-query-parser-2.0.2.tgz",
              "integrity": "sha512-1N4qp+jE0pL5Xv4uEcwVUhIkwdUO3S/9gML90nqKA7v7FcOS5vUtatfzok9S9U1EJU8dHWlcv95WLnKmmxZI9w==",
              "dependencies": {
                "@babel/runtime": "^7.12.5"
              }
            },
            "node_modules/merge2": {
              "version": "1.4.1",
              "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
              "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
              "dev": true,
              "engines": {
                "node": ">= 8"
              }
            },
            "node_modules/micromatch": {
              "version": "4.0.5",
              "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.5.tgz",
              "integrity": "sha512-DMy+ERcEW2q8Z2Po+WNXuw3c5YaUSFjAO5GsJqfEl7UjvtIuFKO6ZrKvcItdy98dwFI2N1tg3zNIdKaQT+aNdA==",
              "dev": true,
              "dependencies": {
                "braces": "^3.0.2",
                "picomatch": "^2.3.1"
              },
              "engines": {
                "node": ">=8.6"
              }
            },
            "node_modules/minimalistic-assert": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/minimalistic-assert/-/minimalistic-assert-1.0.1.tgz",
              "integrity": "sha512-UtJcAD4yEaGtjPezWuO9wC4nwUnVH/8/Im3yEHQP4b67cXlD/Qr9hdITCU1xDbSEXg2XKNaP8jsReV7vQd00/A=="
            },
            "node_modules/minimalistic-crypto-utils": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/minimalistic-crypto-utils/-/minimalistic-crypto-utils-1.0.1.tgz",
              "integrity": "sha512-JIYlbt6g8i5jKfJ3xz7rF0LXmv2TkDxBLUkiBeZ7bAx4GnnNMr8xFpGnOxn6GhTEHx3SjRrZEoU+j04prX1ktg=="
            },
            "node_modules/minimatch": {
              "version": "3.1.2",
              "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
              "integrity": "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==",
              "dev": true,
              "dependencies": {
                "brace-expansion": "^1.1.7"
              },
              "engines": {
                "node": "*"
              }
            },
            "node_modules/motion": {
              "version": "10.15.5",
              "resolved": "https://registry.npmjs.org/motion/-/motion-10.15.5.tgz",
              "integrity": "sha512-ejP6KioN4pigTGxL93APzOnvtLklParL59UQB2T3HWXQBxFcIp5/7YXFmkgiA6pNKKzjvnLhnonRBN5iSFMnNw==",
              "dependencies": {
                "@motionone/animation": "^10.15.1",
                "@motionone/dom": "^10.15.5",
                "@motionone/svelte": "^10.15.5",
                "@motionone/types": "^10.15.1",
                "@motionone/utils": "^10.15.1",
                "@motionone/vue": "^10.15.5"
              }
            },
            "node_modules/ms": {
              "version": "2.1.2",
              "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
              "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
            },
            "node_modules/multiformats": {
              "version": "9.9.0",
              "resolved": "https://registry.npmjs.org/multiformats/-/multiformats-9.9.0.tgz",
              "integrity": "sha512-HoMUjhH9T8DDBNT+6xzkrd9ga/XiBI4xLr58LJACwK6G3HTOPeMz4nB4KJs33L2BelrIJa7P0VuNaVF3hMYfjg=="
            },
            "node_modules/mz": {
              "version": "2.7.0",
              "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
              "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
              "dev": true,
              "dependencies": {
                "any-promise": "^1.0.0",
                "object-assign": "^4.0.1",
                "thenify-all": "^1.0.0"
              }
            },
            "node_modules/nanoid": {
              "version": "3.3.6",
              "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.6.tgz",
              "integrity": "sha512-BGcqMMJuToF7i1rt+2PWSNVnWIkGCU78jBG3RxO/bZlnZPK2Cmi2QaffxGO/2RvWi9sL+FAiRiXMgsyxQ1DIDA==",
              "funding": [
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/ai"
                }
              ],
              "bin": {
                "nanoid": "bin/nanoid.cjs"
              },
              "engines": {
                "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
              }
            },
            "node_modules/next": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/next/-/next-13.5.6.tgz",
              "integrity": "sha512-Y2wTcTbO4WwEsVb4A8VSnOsG1I9ok+h74q0ZdxkwM3EODqrs4pasq7O0iUxbcS9VtWMicG7f3+HAj0r1+NtKSw==",
              "dependencies": {
                "@next/env": "13.5.6",
                "@swc/helpers": "0.5.2",
                "busboy": "1.6.0",
                "caniuse-lite": "^1.0.30001406",
                "postcss": "8.4.31",
                "styled-jsx": "5.1.1",
                "watchpack": "2.4.0"
              },
              "bin": {
                "next": "dist/bin/next"
              },
              "engines": {
                "node": ">=16.14.0"
              },
              "optionalDependencies": {
                "@next/swc-darwin-arm64": "13.5.6",
                "@next/swc-darwin-x64": "13.5.6",
                "@next/swc-linux-arm64-gnu": "13.5.6",
                "@next/swc-linux-arm64-musl": "13.5.6",
                "@next/swc-linux-x64-gnu": "13.5.6",
                "@next/swc-linux-x64-musl": "13.5.6",
                "@next/swc-win32-arm64-msvc": "13.5.6",
                "@next/swc-win32-ia32-msvc": "13.5.6",
                "@next/swc-win32-x64-msvc": "13.5.6"
              },
              "peerDependencies": {
                "@opentelemetry/api": "^1.1.0",
                "react": "^18.2.0",
                "react-dom": "^18.2.0",
                "sass": "^1.3.0"
              },
              "peerDependenciesMeta": {
                "@opentelemetry/api": {
                  "optional": true
                },
                "sass": {
                  "optional": true
                }
              }
            },
            "node_modules/next-auth": {
              "version": "4.20.1",
              "resolved": "https://registry.npmjs.org/next-auth/-/next-auth-4.20.1.tgz",
              "integrity": "sha512-ZcTUN4qzzZ/zJYgOW0hMXccpheWtAol8QOMdMts+LYRcsPGsqf2hEityyaKyECQVw1cWInb9dF3wYwI5GZdEmQ==",
              "dependencies": {
                "@babel/runtime": "^7.20.13",
                "@panva/hkdf": "^1.0.2",
                "cookie": "^0.5.0",
                "jose": "^4.11.4",
                "oauth": "^0.9.15",
                "openid-client": "^5.4.0",
                "preact": "^10.6.3",
                "preact-render-to-string": "^5.1.19",
                "uuid": "^8.3.2"
              },
              "peerDependencies": {
                "next": "^12.2.5 || ^13",
                "nodemailer": "^6.6.5",
                "react": "^17.0.2 || ^18",
                "react-dom": "^17.0.2 || ^18"
              },
              "peerDependenciesMeta": {
                "nodemailer": {
                  "optional": true
                }
              }
            },
            "node_modules/next-auth/node_modules/uuid": {
              "version": "8.3.2",
              "resolved": "https://registry.npmjs.org/uuid/-/uuid-8.3.2.tgz",
              "integrity": "sha512-+NYs2QeMWy+GWFOEm9xnn6HCDp0l7QBD7ml8zLUmJ+93Q5NF0NocErnwkTkXVFNiX3/fpC6afS8Dhb/gz7R7eg==",
              "bin": {
                "uuid": "dist/bin/uuid"
              }
            },
            "node_modules/next-tick": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/next-tick/-/next-tick-1.1.0.tgz",
              "integrity": "sha512-CXdUiJembsNjuToQvxayPZF9Vqht7hewsvy2sOWafLvi2awflj9mOC6bHIg50orX8IJvWKY9wYQ/zB2kogPslQ=="
            },
            "node_modules/node-addon-api": {
              "version": "2.0.2",
              "resolved": "https://registry.npmjs.org/node-addon-api/-/node-addon-api-2.0.2.tgz",
              "integrity": "sha512-Ntyt4AIXyaLIuMHF6IOoTakB3K+RWxwtsHNRxllEoA6vPwP9o4866g6YWDLUdnucilZhmkxiHwHr11gAENw+QA=="
            },
            "node_modules/node-fetch": {
              "version": "2.6.11",
              "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-2.6.11.tgz",
              "integrity": "sha512-4I6pdBY1EthSqDmJkiNk3JIT8cswwR9nfeW/cPdUagJYEQG7R95WRH74wpz7ma8Gh/9dI9FP+OU+0E4FvtA55w==",
              "dependencies": {
                "whatwg-url": "^5.0.0"
              },
              "engines": {
                "node": "4.x || >=6.0.0"
              },
              "peerDependencies": {
                "encoding": "^0.1.0"
              },
              "peerDependenciesMeta": {
                "encoding": {
                  "optional": true
                }
              }
            },
            "node_modules/node-gyp-build": {
              "version": "4.6.0",
              "resolved": "https://registry.npmjs.org/node-gyp-build/-/node-gyp-build-4.6.0.tgz",
              "integrity": "sha512-NTZVKn9IylLwUzaKjkas1e4u2DLNcV4rdYagA4PWdPwW87Bi7z+BznyKSRwS/761tV/lzCGXplWsiaMjLqP2zQ==",
              "bin": {
                "node-gyp-build": "bin.js",
                "node-gyp-build-optional": "optional.js",
                "node-gyp-build-test": "build-test.js"
              }
            },
            "node_modules/node-releases": {
              "version": "2.0.13",
              "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.13.tgz",
              "integrity": "sha512-uYr7J37ae/ORWdZeQ1xxMJe3NtdmqMC/JZK+geofDrkLUApKRHPd18/TxtBOJ4A0/+uUIliorNrfYV6s1b02eQ==",
              "dev": true
            },
            "node_modules/normalize-path": {
              "version": "3.0.0",
              "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
              "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
              "dev": true,
              "engines": {
                "node": ">=0.10.0"
              }
            },
            "node_modules/normalize-range": {
              "version": "0.1.2",
              "resolved": "https://registry.npmjs.org/normalize-range/-/normalize-range-0.1.2.tgz",
              "integrity": "sha512-bdok/XvKII3nUpklnV6P2hxtMNrCboOjAcyBuQnWEhO665FwrSNRxU+AqpsyvO6LgGYPspN+lu5CLtw4jPRKNA==",
              "dev": true,
              "engines": {
                "node": ">=0.10.0"
              }
            },
            "node_modules/normalize-wheel": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/normalize-wheel/-/normalize-wheel-1.0.1.tgz",
              "integrity": "sha512-1OnlAPZ3zgrk8B91HyRj+eVv+kS5u+Z0SCsak6Xil/kmgEia50ga7zfkumayonZrImffAxPU/5WcyGhzetHNPA=="
            },
            "node_modules/oauth": {
              "version": "0.9.15",
              "resolved": "https://registry.npmjs.org/oauth/-/oauth-0.9.15.tgz",
              "integrity": "sha512-a5ERWK1kh38ExDEfoO6qUHJb32rd7aYmPHuyCu3Fta/cnICvYmgd2uhuKXvPD+PXB+gCEYYEaQdIRAjCOwAKNA=="
            },
            "node_modules/object-assign": {
              "version": "4.1.1",
              "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
              "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
              "dev": true,
              "engines": {
                "node": ">=0.10.0"
              }
            },
            "node_modules/object-hash": {
              "version": "2.2.0",
              "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-2.2.0.tgz",
              "integrity": "sha512-gScRMn0bS5fH+IuwyIFgnh9zBdo4DV+6GhygmWM9HyNJSgS0hScp1f5vjtm7oIIOiT9trXrShAkLFSc2IqKNgw==",
              "engines": {
                "node": ">= 6"
              }
            },
            "node_modules/object-inspect": {
              "version": "1.12.3",
              "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.12.3.tgz",
              "integrity": "sha512-geUvdk7c+eizMNUDkRpW1wJwgfOiOeHbxBR/hLXK1aT6zmVSO0jsQcs7fj6MGw89jC/cjGfLcNOrtMYtGqm81g==",
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/oidc-token-hash": {
              "version": "5.0.3",
              "resolved": "https://registry.npmjs.org/oidc-token-hash/-/oidc-token-hash-5.0.3.tgz",
              "integrity": "sha512-IF4PcGgzAr6XXSff26Sk/+P4KZFJVuHAJZj3wgO3vX2bMdNVp/QXTP3P7CEm9V1IdG8lDLY3HhiqpsE/nOwpPw==",
              "engines": {
                "node": "^10.13.0 || >=12.0.0"
              }
            },
            "node_modules/on-exit-leak-free": {
              "version": "0.2.0",
              "resolved": "https://registry.npmjs.org/on-exit-leak-free/-/on-exit-leak-free-0.2.0.tgz",
              "integrity": "sha512-dqaz3u44QbRXQooZLTUKU41ZrzYrcvLISVgbrzbyCMxpmSLJvZ3ZamIJIZ29P6OhZIkNIQKosdeM6t1LYbA9hg=="
            },
            "node_modules/once": {
              "version": "1.4.0",
              "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
              "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
              "dependencies": {
                "wrappy": "1"
              }
            },
            "node_modules/openid-client": {
              "version": "5.4.2",
              "resolved": "https://registry.npmjs.org/openid-client/-/openid-client-5.4.2.tgz",
              "integrity": "sha512-lIhsdPvJ2RneBm3nGBBhQchpe3Uka//xf7WPHTIglery8gnckvW7Bd9IaQzekzXJvWthCMyi/xVEyGW0RFPytw==",
              "dependencies": {
                "jose": "^4.14.1",
                "lru-cache": "^6.0.0",
                "object-hash": "^2.2.0",
                "oidc-token-hash": "^5.0.3"
              },
              "funding": {
                "url": "https://github.com/sponsors/panva"
              }
            },
            "node_modules/outdent": {
              "version": "0.8.0",
              "resolved": "https://registry.npmjs.org/outdent/-/outdent-0.8.0.tgz",
              "integrity": "sha512-KiOAIsdpUTcAXuykya5fnVVT+/5uS0Q1mrkRHcF89tpieSmY33O/tmc54CqwA+bfhbtEfZUNLHaPUiB9X3jt1A=="
            },
            "node_modules/p-limit": {
              "version": "2.3.0",
              "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.3.0.tgz",
              "integrity": "sha512-//88mFWSJx8lxCzwdAABTJL2MyWB12+eIY7MDL2SqLmAkeKU9qxRvWuSyTjm3FUmpBEMuFfckAIqEaVGUDxb6w==",
              "dependencies": {
                "p-try": "^2.0.0"
              },
              "engines": {
                "node": ">=6"
              },
              "funding": {
                "url": "https://github.com/sponsors/sindresorhus"
              }
            },
            "node_modules/p-locate": {
              "version": "4.1.0",
              "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-4.1.0.tgz",
              "integrity": "sha512-R79ZZ/0wAxKGu3oYMlz8jy/kbhsNrS7SKZ7PxEHBgJ5+F2mtFW2fK2cOtBh1cHYkQsbzFV7I+EoRKe6Yt0oK7A==",
              "dependencies": {
                "p-limit": "^2.2.0"
              },
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/p-try": {
              "version": "2.2.0",
              "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
              "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ==",
              "engines": {
                "node": ">=6"
              }
            },
            "node_modules/path-exists": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
              "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/path-is-absolute": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
              "integrity": "sha512-AVbw3UJ2e9bq64vSaS9Am0fje1Pa8pbGqTTsmXfaIiMpnr5DlDhfJOuLj9Sf95ZPVDAUerDfEk88MPmPe7UCQg==",
              "dev": true,
              "engines": {
                "node": ">=0.10.0"
              }
            },
            "node_modules/path-parse": {
              "version": "1.0.7",
              "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
              "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
              "dev": true
            },
            "node_modules/picocolors": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.0.0.tgz",
              "integrity": "sha512-1fygroTLlHu66zi26VoTDv8yRgm0Fccecssto+MhsZ0D/DGW2sm8E8AjW7NU5VVTRt5GxbeZ5qBuJr+HyLYkjQ=="
            },
            "node_modules/picomatch": {
              "version": "2.3.1",
              "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
              "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
              "dev": true,
              "engines": {
                "node": ">=8.6"
              },
              "funding": {
                "url": "https://github.com/sponsors/jonschlinkert"
              }
            },
            "node_modules/pify": {
              "version": "3.0.0",
              "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
              "integrity": "sha512-C3FsVNH1udSEX48gGX1xfvwTWfsYWj5U+8/uK15BGzIGrKoUpghX8hWZwa/OFnakBiiVNmBvemTJR5mcy7iPcg==",
              "engines": {
                "node": ">=4"
              }
            },
            "node_modules/pino": {
              "version": "7.11.0",
              "resolved": "https://registry.npmjs.org/pino/-/pino-7.11.0.tgz",
              "integrity": "sha512-dMACeu63HtRLmCG8VKdy4cShCPKaYDR4youZqoSWLxl5Gu99HUw8bw75thbPv9Nip+H+QYX8o3ZJbTdVZZ2TVg==",
              "dependencies": {
                "atomic-sleep": "^1.0.0",
                "fast-redact": "^3.0.0",
                "on-exit-leak-free": "^0.2.0",
                "pino-abstract-transport": "v0.5.0",
                "pino-std-serializers": "^4.0.0",
                "process-warning": "^1.0.0",
                "quick-format-unescaped": "^4.0.3",
                "real-require": "^0.1.0",
                "safe-stable-stringify": "^2.1.0",
                "sonic-boom": "^2.2.1",
                "thread-stream": "^0.15.1"
              },
              "bin": {
                "pino": "bin.js"
              }
            },
            "node_modules/pino-abstract-transport": {
              "version": "0.5.0",
              "resolved": "https://registry.npmjs.org/pino-abstract-transport/-/pino-abstract-transport-0.5.0.tgz",
              "integrity": "sha512-+KAgmVeqXYbTtU2FScx1XS3kNyfZ5TrXY07V96QnUSFqo2gAqlvmaxH67Lj7SWazqsMabf+58ctdTcBgnOLUOQ==",
              "dependencies": {
                "duplexify": "^4.1.2",
                "split2": "^4.0.0"
              }
            },
            "node_modules/pino-std-serializers": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/pino-std-serializers/-/pino-std-serializers-4.0.0.tgz",
              "integrity": "sha512-cK0pekc1Kjy5w9V2/n+8MkZwusa6EyyxfeQCB799CQRhRt/CqYKiWs5adeu8Shve2ZNffvfC/7J64A2PJo1W/Q=="
            },
            "node_modules/pirates": {
              "version": "4.0.6",
              "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.6.tgz",
              "integrity": "sha512-saLsH7WeYYPiD25LDuLRRY/i+6HaPYr6G1OUlN39otzkSTxKnubR9RTxS3/Kk50s1g2JTgFwWQDQyplC5/SHZg==",
              "dev": true,
              "engines": {
                "node": ">= 6"
              }
            },
            "node_modules/pngjs": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/pngjs/-/pngjs-5.0.0.tgz",
              "integrity": "sha512-40QW5YalBNfQo5yRYmiw7Yz6TKKVr3h6970B2YE+3fQpsWcrbj1PzJgxeJ19DRQjhMbKPIuMY8rFaXc8moolVw==",
              "engines": {
                "node": ">=10.13.0"
              }
            },
            "node_modules/postcss": {
              "version": "8.4.31",
              "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.31.tgz",
              "integrity": "sha512-PS08Iboia9mts/2ygV3eLpY5ghnUcfLV/EXTOW1E2qYxJKGGBUtNjN76FYHnMs36RmARn41bC0AZmn+rR0OVpQ==",
              "funding": [
                {
                  "type": "opencollective",
                  "url": "https://opencollective.com/postcss/"
                },
                {
                  "type": "tidelift",
                  "url": "https://tidelift.com/funding/github/npm/postcss"
                },
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/ai"
                }
              ],
              "dependencies": {
                "nanoid": "^3.3.6",
                "picocolors": "^1.0.0",
                "source-map-js": "^1.0.2"
              },
              "engines": {
                "node": "^10 || ^12 || >=14"
              }
            },
            "node_modules/postcss-import": {
              "version": "15.1.0",
              "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
              "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
              "dev": true,
              "dependencies": {
                "postcss-value-parser": "^4.0.0",
                "read-cache": "^1.0.0",
                "resolve": "^1.1.7"
              },
              "engines": {
                "node": ">=14.0.0"
              },
              "peerDependencies": {
                "postcss": "^8.0.0"
              }
            },
            "node_modules/postcss-js": {
              "version": "4.0.1",
              "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.0.1.tgz",
              "integrity": "sha512-dDLF8pEO191hJMtlHFPRa8xsizHaM82MLfNkUHdUtVEV3tgTp5oj+8qbEqYM57SLfc74KSbw//4SeJma2LRVIw==",
              "dev": true,
              "dependencies": {
                "camelcase-css": "^2.0.1"
              },
              "engines": {
                "node": "^12 || ^14 || >= 16"
              },
              "funding": {
                "type": "opencollective",
                "url": "https://opencollective.com/postcss/"
              },
              "peerDependencies": {
                "postcss": "^8.4.21"
              }
            },
            "node_modules/postcss-load-config": {
              "version": "4.0.1",
              "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-4.0.1.tgz",
              "integrity": "sha512-vEJIc8RdiBRu3oRAI0ymerOn+7rPuMvRXslTvZUKZonDHFIczxztIyJ1urxM1x9JXEikvpWWTUUqal5j/8QgvA==",
              "dev": true,
              "dependencies": {
                "lilconfig": "^2.0.5",
                "yaml": "^2.1.1"
              },
              "engines": {
                "node": ">= 14"
              },
              "funding": {
                "type": "opencollective",
                "url": "https://opencollective.com/postcss/"
              },
              "peerDependencies": {
                "postcss": ">=8.0.9",
                "ts-node": ">=9.0.0"
              },
              "peerDependenciesMeta": {
                "postcss": {
                  "optional": true
                },
                "ts-node": {
                  "optional": true
                }
              }
            },
            "node_modules/postcss-nested": {
              "version": "6.0.1",
              "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.0.1.tgz",
              "integrity": "sha512-mEp4xPMi5bSWiMbsgoPfcP74lsWLHkQbZc3sY+jWYd65CUwXrUaTp0fmNpa01ZcETKlIgUdFN/MpS2xZtqL9dQ==",
              "dev": true,
              "dependencies": {
                "postcss-selector-parser": "^6.0.11"
              },
              "engines": {
                "node": ">=12.0"
              },
              "funding": {
                "type": "opencollective",
                "url": "https://opencollective.com/postcss/"
              },
              "peerDependencies": {
                "postcss": "^8.2.14"
              }
            },
            "node_modules/postcss-selector-parser": {
              "version": "6.0.13",
              "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.0.13.tgz",
              "integrity": "sha512-EaV1Gl4mUEV4ddhDnv/xtj7sxwrwxdetHdWUGnT4VJQf+4d05v6lHYZr8N573k5Z0BViss7BDhfWtKS3+sfAqQ==",
              "dev": true,
              "dependencies": {
                "cssesc": "^3.0.0",
                "util-deprecate": "^1.0.2"
              },
              "engines": {
                "node": ">=4"
              }
            },
            "node_modules/postcss-value-parser": {
              "version": "4.2.0",
              "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
              "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
              "dev": true
            },
            "node_modules/preact": {
              "version": "10.15.0",
              "resolved": "https://registry.npmjs.org/preact/-/preact-10.15.0.tgz",
              "integrity": "sha512-nZSa8M2R2m1n7nJSBlzDpxRJaIsejrTO1vlFbdpFvyC8qM1iU+On2y0otfoUm6SRB5o0lF0CKDFxg6grEFU0iQ==",
              "funding": {
                "type": "opencollective",
                "url": "https://opencollective.com/preact"
              }
            },
            "node_modules/preact-render-to-string": {
              "version": "5.2.6",
              "resolved": "https://registry.npmjs.org/preact-render-to-string/-/preact-render-to-string-5.2.6.tgz",
              "integrity": "sha512-JyhErpYOvBV1hEPwIxc/fHWXPfnEGdRKxc8gFdAZ7XV4tlzyzG847XAyEZqoDnynP88akM4eaHcSOzNcLWFguw==",
              "dependencies": {
                "pretty-format": "^3.8.0"
              },
              "peerDependencies": {
                "preact": ">=10"
              }
            },
            "node_modules/pretty-format": {
              "version": "3.8.0",
              "resolved": "https://registry.npmjs.org/pretty-format/-/pretty-format-3.8.0.tgz",
              "integrity": "sha512-WuxUnVtlWL1OfZFQFuqvnvs6MiAGk9UNsBostyBOB0Is9wb5uRESevA6rnl/rkksXaGX3GzZhPup5d6Vp1nFew=="
            },
            "node_modules/process-warning": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/process-warning/-/process-warning-1.0.0.tgz",
              "integrity": "sha512-du4wfLyj4yCZq1VupnVSZmRsPJsNuxoDQFdCFHLaYiEbFBD7QE0a+I4D7hOxrVnh78QE/YipFAj9lXHiXocV+Q=="
            },
            "node_modules/proxy-compare": {
              "version": "2.5.1",
              "resolved": "https://registry.npmjs.org/proxy-compare/-/proxy-compare-2.5.1.tgz",
              "integrity": "sha512-oyfc0Tx87Cpwva5ZXezSp5V9vht1c7dZBhvuV/y3ctkgMVUmiAGDVeeB0dKhGSyT0v1ZTEQYpe/RXlBVBNuCLA=="
            },
            "node_modules/punycode": {
              "version": "2.3.0",
              "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.0.tgz",
              "integrity": "sha512-rRV+zQD8tVFys26lAGR9WUuS4iUAngJScM+ZRSKtvl5tKeZ2t5bvdNFdNHBW9FWR4guGHlgmsZ1G7BSm2wTbuA==",
              "engines": {
                "node": ">=6"
              }
            },
            "node_modules/pvtsutils": {
              "version": "1.3.2",
              "resolved": "https://registry.npmjs.org/pvtsutils/-/pvtsutils-1.3.2.tgz",
              "integrity": "sha512-+Ipe2iNUyrZz+8K/2IOo+kKikdtfhRKzNpQbruF2URmqPtoqAs8g3xS7TJvFF2GcPXjh7DkqMnpVveRFq4PgEQ==",
              "dependencies": {
                "tslib": "^2.4.0"
              }
            },
            "node_modules/pvutils": {
              "version": "1.1.3",
              "resolved": "https://registry.npmjs.org/pvutils/-/pvutils-1.1.3.tgz",
              "integrity": "sha512-pMpnA0qRdFp32b1sJl1wOJNxZLQ2cbQx+k6tjNtZ8CpvVhNqEPRgivZ2WOUev2YMajecdH7ctUPDvEe87nariQ==",
              "engines": {
                "node": ">=6.0.0"
              }
            },
            "node_modules/qrcode": {
              "version": "1.5.0",
              "resolved": "https://registry.npmjs.org/qrcode/-/qrcode-1.5.0.tgz",
              "integrity": "sha512-9MgRpgVc+/+47dFvQeD6U2s0Z92EsKzcHogtum4QB+UNd025WOJSHvn/hjk9xmzj7Stj95CyUAs31mrjxliEsQ==",
              "dependencies": {
                "dijkstrajs": "^1.0.1",
                "encode-utf8": "^1.0.3",
                "pngjs": "^5.0.0",
                "yargs": "^15.3.1"
              },
              "bin": {
                "qrcode": "bin/qrcode"
              },
              "engines": {
                "node": ">=10.13.0"
              }
            },
            "node_modules/qrcode.react": {
              "version": "3.1.0",
              "resolved": "https://registry.npmjs.org/qrcode.react/-/qrcode.react-3.1.0.tgz",
              "integrity": "sha512-oyF+Urr3oAMUG/OiOuONL3HXM+53wvuH3mtIWQrYmsXoAq0DkvZp2RYUWFSMFtbdOpuS++9v+WAkzNVkMlNW6Q==",
              "peerDependencies": {
                "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
              }
            },
            "node_modules/qs": {
              "version": "6.11.2",
              "resolved": "https://registry.npmjs.org/qs/-/qs-6.11.2.tgz",
              "integrity": "sha512-tDNIz22aBzCDxLtVH++VnTfzxlfeK5CbqohpSqpJgj1Wg/cQbStNAz3NuqCs5vV+pjBsK4x4pN9HlVh7rcYRiA==",
              "dependencies": {
                "side-channel": "^1.0.4"
              },
              "engines": {
                "node": ">=0.6"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/query-string": {
              "version": "6.14.1",
              "resolved": "https://registry.npmjs.org/query-string/-/query-string-6.14.1.tgz",
              "integrity": "sha512-XDxAeVmpfu1/6IjyT/gXHOl+S0vQ9owggJ30hhWKdHAsNPOcasn5o9BW0eejZqL2e4vMjhAxoW3jVHcD6mbcYw==",
              "dependencies": {
                "decode-uri-component": "^0.2.0",
                "filter-obj": "^1.1.0",
                "split-on-first": "^1.0.0",
                "strict-uri-encode": "^2.0.0"
              },
              "engines": {
                "node": ">=6"
              },
              "funding": {
                "url": "https://github.com/sponsors/sindresorhus"
              }
            },
            "node_modules/queue-microtask": {
              "version": "1.2.3",
              "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
              "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
              "dev": true,
              "funding": [
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/feross"
                },
                {
                  "type": "patreon",
                  "url": "https://www.patreon.com/feross"
                },
                {
                  "type": "consulting",
                  "url": "https://feross.org/support"
                }
              ]
            },
            "node_modules/quick-format-unescaped": {
              "version": "4.0.4",
              "resolved": "https://registry.npmjs.org/quick-format-unescaped/-/quick-format-unescaped-4.0.4.tgz",
              "integrity": "sha512-tYC1Q1hgyRuHgloV/YXs2w15unPVh8qfu/qCTfhTYamaw7fyhumKa2yGpdSo87vY32rIclj+4fWYQXUMs9EHvg=="
            },
            "node_modules/randombytes": {
              "version": "2.1.0",
              "resolved": "https://registry.npmjs.org/randombytes/-/randombytes-2.1.0.tgz",
              "integrity": "sha512-vYl3iOX+4CKUWuxGi9Ukhie6fsqXqS9FE2Zaic4tNFD2N2QQaXOMFbuKK4QmDHC0JO6B1Zp41J0LpT0oR68amQ==",
              "dependencies": {
                "safe-buffer": "^5.1.0"
              }
            },
            "node_modules/rc-align": {
              "version": "4.0.15",
              "resolved": "https://registry.npmjs.org/rc-align/-/rc-align-4.0.15.tgz",
              "integrity": "sha512-wqJtVH60pka/nOX7/IspElA8gjPNQKIx/ZqJ6heATCkXpe1Zg4cPVrMD2vC96wjsFFL8WsmhPbx9tdMo1qqlIA==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "classnames": "2.x",
                "dom-align": "^1.7.0",
                "rc-util": "^5.26.0",
                "resize-observer-polyfill": "^1.5.1"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-cascader": {
              "version": "3.14.1",
              "resolved": "https://registry.npmjs.org/rc-cascader/-/rc-cascader-3.14.1.tgz",
              "integrity": "sha512-fCsgjLIQqYZMhFj9UT+x2ZW4uobx7OP5yivcn6Xto5fuxHaldphsryzCeUVmreQOHEo0RP+032Ip9RDzrKVKJA==",
              "dependencies": {
                "@babel/runtime": "^7.12.5",
                "array-tree-filter": "^2.1.0",
                "classnames": "^2.3.1",
                "rc-select": "~14.7.0",
                "rc-tree": "~5.7.0",
                "rc-util": "^5.35.0"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-checkbox": {
              "version": "3.1.0",
              "resolved": "https://registry.npmjs.org/rc-checkbox/-/rc-checkbox-3.1.0.tgz",
              "integrity": "sha512-PAwpJFnBa3Ei+5pyqMMXdcKYKNBMS+TvSDiLdDnARnMJHC8ESxwPfm4Ao1gJiKtWLdmGfigascnCpwrHFgoOBQ==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "classnames": "^2.3.2",
                "rc-util": "^5.25.2"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-collapse": {
              "version": "3.7.1",
              "resolved": "https://registry.npmjs.org/rc-collapse/-/rc-collapse-3.7.1.tgz",
              "integrity": "sha512-N/7ejyiTf3XElNJBBpxqnZBUuMsQWEOPjB2QkfNvZ/Ca54eAvJXuOD1EGbCWCk2m7v/MSxku7mRpdeaLOCd4Gg==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "classnames": "2.x",
                "rc-motion": "^2.3.4",
                "rc-util": "^5.27.0"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-dialog": {
              "version": "9.1.0",
              "resolved": "https://registry.npmjs.org/rc-dialog/-/rc-dialog-9.1.0.tgz",
              "integrity": "sha512-5ry+JABAWEbaKyYsmITtrJbZbJys8CtMyzV8Xn4LYuXMeUx5XVHNyJRoqLFE4AzBuXXzOWeaC49cg+XkxK6kHA==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "@rc-component/portal": "^1.0.0-8",
                "classnames": "^2.2.6",
                "rc-motion": "^2.3.0",
                "rc-util": "^5.21.0"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-drawer": {
              "version": "6.2.0",
              "resolved": "https://registry.npmjs.org/rc-drawer/-/rc-drawer-6.2.0.tgz",
              "integrity": "sha512-spPkZ3WvP0U0vy5dyzSwlUJ/+vLFtjP/cTwSwejhQRoDBaexSZHsBhELoCZcEggI7LQ7typmtG30lAue2HEhvA==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "@rc-component/portal": "^1.1.1",
                "classnames": "^2.2.6",
                "rc-motion": "^2.6.1",
                "rc-util": "^5.21.2"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-dropdown": {
              "version": "4.1.0",
              "resolved": "https://registry.npmjs.org/rc-dropdown/-/rc-dropdown-4.1.0.tgz",
              "integrity": "sha512-VZjMunpBdlVzYpEdJSaV7WM7O0jf8uyDjirxXLZRNZ+tAC+NzD3PXPEtliFwGzVwBBdCmGuSqiS9DWcOLxQ9tw==",
              "dependencies": {
                "@babel/runtime": "^7.18.3",
                "@rc-component/trigger": "^1.7.0",
                "classnames": "^2.2.6",
                "rc-util": "^5.17.0"
              },
              "peerDependencies": {
                "react": ">=16.11.0",
                "react-dom": ">=16.11.0"
              }
            },
            "node_modules/rc-field-form": {
              "version": "1.36.2",
              "resolved": "https://registry.npmjs.org/rc-field-form/-/rc-field-form-1.36.2.tgz",
              "integrity": "sha512-tCF/JjUsnxW80Gk4E4ZH74ONsaQMxVTRtui6XhQB8DJc4FHWLLa5pP8zwhxtPKC5NaO0QZ0Cv79JggDubn6n2g==",
              "dependencies": {
                "@babel/runtime": "^7.18.0",
                "async-validator": "^4.1.0",
                "rc-util": "^5.32.2"
              },
              "engines": {
                "node": ">=8.x"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-image": {
              "version": "7.1.3",
              "resolved": "https://registry.npmjs.org/rc-image/-/rc-image-7.1.3.tgz",
              "integrity": "sha512-foMl1rcit1F0+vgxE5kf0c8TygQcHhILsOohQUL+JMUbzOo3OBFRcehJudYbqbCTArzCecS8nA1irUU9vvgQbg==",
              "dependencies": {
                "@babel/runtime": "^7.11.2",
                "@rc-component/portal": "^1.0.2",
                "classnames": "^2.2.6",
                "rc-dialog": "~9.1.0",
                "rc-motion": "^2.6.2",
                "rc-util": "^5.34.1"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-input": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/rc-input/-/rc-input-1.1.1.tgz",
              "integrity": "sha512-NTR1Z4em681L8/ewb2KR80RykSmN8I2mzqzJDCoUmTrV1BB9Hk5d7ha4TnfgdEPPL148N+603sW2LExSXk1IbA==",
              "dependencies": {
                "@babel/runtime": "^7.11.1",
                "classnames": "^2.2.1",
                "rc-util": "^5.18.1"
              },
              "peerDependencies": {
                "react": ">=16.0.0",
                "react-dom": ">=16.0.0"
              }
            },
            "node_modules/rc-input-number": {
              "version": "8.0.4",
              "resolved": "https://registry.npmjs.org/rc-input-number/-/rc-input-number-8.0.4.tgz",
              "integrity": "sha512-TP+G5b7mZtbwXJ/YEZXF/OgbEZ6iqD4+RSuxZJ8VGKGXDcdt0FKIvpFoNQr/knspdFC4OxA0OfsWfFWfN4XSyA==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "@rc-component/mini-decimal": "^1.0.1",
                "classnames": "^2.2.5",
                "rc-input": "~1.1.0",
                "rc-util": "^5.28.0"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-mentions": {
              "version": "2.5.0",
              "resolved": "https://registry.npmjs.org/rc-mentions/-/rc-mentions-2.5.0.tgz",
              "integrity": "sha512-rERXsbUTNVrb5T/iDC0ki/SRGWJnOVraDy6O25Us3FSpuUZ3uq2TPZB4fRk0Hss5kyiEPzz2sprhkI4b+F4jUw==",
              "dependencies": {
                "@babel/runtime": "^7.22.5",
                "@rc-component/trigger": "^1.5.0",
                "classnames": "^2.2.6",
                "rc-input": "~1.1.0",
                "rc-menu": "~9.10.0",
                "rc-textarea": "~1.3.0",
                "rc-util": "^5.22.5"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-menu": {
              "version": "9.10.0",
              "resolved": "https://registry.npmjs.org/rc-menu/-/rc-menu-9.10.0.tgz",
              "integrity": "sha512-g27kpXaAoJh/fkPZF65/d4V+w4DhDeqomBdPcGnkFAcJnEM4o21TnVccrBUoDedLKzC7wJRw1Q7VTqEsfEufmw==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "@rc-component/trigger": "^1.6.2",
                "classnames": "2.x",
                "rc-motion": "^2.4.3",
                "rc-overflow": "^1.3.1",
                "rc-util": "^5.27.0"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-motion": {
              "version": "2.7.3",
              "resolved": "https://registry.npmjs.org/rc-motion/-/rc-motion-2.7.3.tgz",
              "integrity": "sha512-2xUvo8yGHdOHeQbdI8BtBsCIrWKchEmFEIskf0nmHtJsou+meLd/JE+vnvSX2JxcBrJtXY2LuBpxAOxrbY/wMQ==",
              "dependencies": {
                "@babel/runtime": "^7.11.1",
                "classnames": "^2.2.1",
                "rc-util": "^5.21.0"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-notification": {
              "version": "5.0.5",
              "resolved": "https://registry.npmjs.org/rc-notification/-/rc-notification-5.0.5.tgz",
              "integrity": "sha512-uEz2jggourwv/rR0obe7RHEa63UchqX4k+e+Qt2c3LaY7U9Tc+L6ANhzgCKYSA/afm0ebjmNZHoB5Cv47xEOcA==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "classnames": "2.x",
                "rc-motion": "^2.6.0",
                "rc-util": "^5.20.1"
              },
              "engines": {
                "node": ">=8.x"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-overflow": {
              "version": "1.3.1",
              "resolved": "https://registry.npmjs.org/rc-overflow/-/rc-overflow-1.3.1.tgz",
              "integrity": "sha512-RY0nVBlfP9CkxrpgaLlGzkSoh9JhjJLu6Icqs9E7CW6Ewh9s0peF9OHIex4OhfoPsR92LR0fN6BlCY9Z4VoUtA==",
              "dependencies": {
                "@babel/runtime": "^7.11.1",
                "classnames": "^2.2.1",
                "rc-resize-observer": "^1.0.0",
                "rc-util": "^5.19.2"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-pagination": {
              "version": "3.5.0",
              "resolved": "https://registry.npmjs.org/rc-pagination/-/rc-pagination-3.5.0.tgz",
              "integrity": "sha512-lUBVtVVUn7gGsq4mTyVpcZQr+AMcljbMiL/HcCmSdFrcsK0iZVKwwbXDxhz2IV0JXUs9Hzepr5sQFaF+9ad/pQ==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "classnames": "^2.2.1",
                "rc-util": "^5.32.2"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-picker": {
              "version": "3.13.0",
              "resolved": "https://registry.npmjs.org/rc-picker/-/rc-picker-3.13.0.tgz",
              "integrity": "sha512-hJ+1lGkemnvsW+t+PjH9OAehHlj7wdD0G75T1HZj0IeZTqBE/5mmuf8E8MHYATNBqW409lAfk8GwjYm1WVMopg==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "@rc-component/trigger": "^1.5.0",
                "classnames": "^2.2.1",
                "rc-util": "^5.30.0"
              },
              "engines": {
                "node": ">=8.x"
              },
              "peerDependencies": {
                "date-fns": ">= 2.x",
                "dayjs": ">= 1.x",
                "luxon": ">= 3.x",
                "moment": ">= 2.x",
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              },
              "peerDependenciesMeta": {
                "date-fns": {
                  "optional": true
                },
                "dayjs": {
                  "optional": true
                },
                "luxon": {
                  "optional": true
                },
                "moment": {
                  "optional": true
                }
              }
            },
            "node_modules/rc-progress": {
              "version": "3.4.2",
              "resolved": "https://registry.npmjs.org/rc-progress/-/rc-progress-3.4.2.tgz",
              "integrity": "sha512-iAGhwWU+tsayP+Jkl9T4+6rHeQTG9kDz8JAHZk4XtQOcYN5fj9H34NXNEdRdZx94VUDHMqCb1yOIvi8eJRh67w==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "classnames": "^2.2.6",
                "rc-util": "^5.16.1"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-rate": {
              "version": "2.12.0",
              "resolved": "https://registry.npmjs.org/rc-rate/-/rc-rate-2.12.0.tgz",
              "integrity": "sha512-g092v5iZCdVzbjdn28FzvWebK2IutoVoiTeqoLTj9WM7SjA/gOJIw5/JFZMRyJYYVe1jLAU2UhAfstIpCNRozg==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "classnames": "^2.2.5",
                "rc-util": "^5.0.1"
              },
              "engines": {
                "node": ">=8.x"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-resize-observer": {
              "version": "1.3.1",
              "resolved": "https://registry.npmjs.org/rc-resize-observer/-/rc-resize-observer-1.3.1.tgz",
              "integrity": "sha512-iFUdt3NNhflbY3mwySv5CA1TC06zdJ+pfo0oc27xpf4PIOvfZwZGtD9Kz41wGYqC4SLio93RVAirSSpYlV/uYg==",
              "dependencies": {
                "@babel/runtime": "^7.20.7",
                "classnames": "^2.2.1",
                "rc-util": "^5.27.0",
                "resize-observer-polyfill": "^1.5.1"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-segmented": {
              "version": "2.2.2",
              "resolved": "https://registry.npmjs.org/rc-segmented/-/rc-segmented-2.2.2.tgz",
              "integrity": "sha512-Mq52M96QdHMsNdE/042ibT5vkcGcD5jxKp7HgPC2SRofpia99P5fkfHy1pEaajLMF/kj0+2Lkq1UZRvqzo9mSA==",
              "dependencies": {
                "@babel/runtime": "^7.11.1",
                "classnames": "^2.2.1",
                "rc-motion": "^2.4.4",
                "rc-util": "^5.17.0"
              },
              "peerDependencies": {
                "react": ">=16.0.0",
                "react-dom": ">=16.0.0"
              }
            },
            "node_modules/rc-select": {
              "version": "14.7.4",
              "resolved": "https://registry.npmjs.org/rc-select/-/rc-select-14.7.4.tgz",
              "integrity": "sha512-qRUpvMVXFy6rdHe+qzHXAqyQAfhErC/oY8dcRtoRjoz0lz2Nx3J+lLL5AnEbjnwlS+/kQTJUZ/65WyCwWwcLwQ==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "@rc-component/trigger": "^1.5.0",
                "classnames": "2.x",
                "rc-motion": "^2.0.1",
                "rc-overflow": "^1.3.1",
                "rc-util": "^5.16.1",
                "rc-virtual-list": "^3.5.2"
              },
              "engines": {
                "node": ">=8.x"
              },
              "peerDependencies": {
                "react": "*",
                "react-dom": "*"
              }
            },
            "node_modules/rc-slider": {
              "version": "10.1.1",
              "resolved": "https://registry.npmjs.org/rc-slider/-/rc-slider-10.1.1.tgz",
              "integrity": "sha512-gn8oXazZISEhnmRinI89Z/JD/joAaM35jp+gDtIVSTD/JJMCCBqThqLk1SVJmvtfeiEF/kKaFY0+qt4SDHFUDw==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "classnames": "^2.2.5",
                "rc-util": "^5.27.0"
              },
              "engines": {
                "node": ">=8.x"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-steps": {
              "version": "6.0.1",
              "resolved": "https://registry.npmjs.org/rc-steps/-/rc-steps-6.0.1.tgz",
              "integrity": "sha512-lKHL+Sny0SeHkQKKDJlAjV5oZ8DwCdS2hFhAkIjuQt1/pB81M0cA0ErVFdHq9+jmPmFw1vJB2F5NBzFXLJxV+g==",
              "dependencies": {
                "@babel/runtime": "^7.16.7",
                "classnames": "^2.2.3",
                "rc-util": "^5.16.1"
              },
              "engines": {
                "node": ">=8.x"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-switch": {
              "version": "4.1.0",
              "resolved": "https://registry.npmjs.org/rc-switch/-/rc-switch-4.1.0.tgz",
              "integrity": "sha512-TI8ufP2Az9oEbvyCeVE4+90PDSljGyuwix3fV58p7HV2o4wBnVToEyomJRVyTaZeqNPAp+vqeo4Wnj5u0ZZQBg==",
              "dependencies": {
                "@babel/runtime": "^7.21.0",
                "classnames": "^2.2.1",
                "rc-util": "^5.30.0"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-table": {
              "version": "7.32.2",
              "resolved": "https://registry.npmjs.org/rc-table/-/rc-table-7.32.2.tgz",
              "integrity": "sha512-2JlUXlsZNLYO5hMb/8GAHBp7+fAvuYHt8ps641DCEDttQWIBe049CGcL2aqol1xHQyDpXWTCWS69gmkKkCwD5w==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "@rc-component/context": "^1.3.0",
                "classnames": "^2.2.5",
                "rc-resize-observer": "^1.1.0",
                "rc-util": "^5.27.1"
              },
              "engines": {
                "node": ">=8.x"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-tabs": {
              "version": "12.9.0",
              "resolved": "https://registry.npmjs.org/rc-tabs/-/rc-tabs-12.9.0.tgz",
              "integrity": "sha512-2HnVowgMVrq0DfQtyu4mCd9E6pXlWNdM6VaDvOOHMsLYqPmpY+7zBqUC6YrrQ9xYXHciTS0e7TtjOHIvpVCHLQ==",
              "dependencies": {
                "@babel/runtime": "^7.11.2",
                "classnames": "2.x",
                "rc-dropdown": "~4.1.0",
                "rc-menu": "~9.10.0",
                "rc-motion": "^2.6.2",
                "rc-resize-observer": "^1.0.0",
                "rc-util": "^5.16.0"
              },
              "engines": {
                "node": ">=8.x"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-textarea": {
              "version": "1.3.4",
              "resolved": "https://registry.npmjs.org/rc-textarea/-/rc-textarea-1.3.4.tgz",
              "integrity": "sha512-wn0YjTpvcVolcfXa0HtzL+jgV2QcwtfB29RwNAKj8hMgZOju1V24M3TfEDjABeQEAQbUGbjMbISREOX/YSVKhg==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "classnames": "^2.2.1",
                "rc-input": "~1.1.0",
                "rc-resize-observer": "^1.0.0",
                "rc-util": "^5.27.0"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-tooltip": {
              "version": "6.0.1",
              "resolved": "https://registry.npmjs.org/rc-tooltip/-/rc-tooltip-6.0.1.tgz",
              "integrity": "sha512-MdvPlsD1fDSxKp9+HjXrc/CxLmA/s11QYIh1R7aExxfodKP7CZA++DG1AjrW80F8IUdHYcR43HAm0Y2BYPelHA==",
              "dependencies": {
                "@babel/runtime": "^7.11.2",
                "@rc-component/trigger": "^1.0.4",
                "classnames": "^2.3.1"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-tree": {
              "version": "5.7.9",
              "resolved": "https://registry.npmjs.org/rc-tree/-/rc-tree-5.7.9.tgz",
              "integrity": "sha512-1hKkToz/EVjJlMVwmZnpXeLXt/1iQMsaAq9m+GNkUbK746gkc7QpJXSN/TzjhTI5Hi+LOSlrMaXLMT0bHPqILQ==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "classnames": "2.x",
                "rc-motion": "^2.0.1",
                "rc-util": "^5.16.1",
                "rc-virtual-list": "^3.5.1"
              },
              "engines": {
                "node": ">=10.x"
              },
              "peerDependencies": {
                "react": "*",
                "react-dom": "*"
              }
            },
            "node_modules/rc-tree-select": {
              "version": "5.11.1",
              "resolved": "https://registry.npmjs.org/rc-tree-select/-/rc-tree-select-5.11.1.tgz",
              "integrity": "sha512-EDG1rYFu1iD2Y8fg0yEmm0LV3XqWOy+SpgOMvO5396NgAZ67t0zVTNK6FQkIxzdXf5ri742BkB/B8+Ah6+0Kxw==",
              "dependencies": {
                "@babel/runtime": "^7.10.1",
                "classnames": "2.x",
                "rc-select": "~14.7.0",
                "rc-tree": "~5.7.0",
                "rc-util": "^5.16.1"
              },
              "peerDependencies": {
                "react": "*",
                "react-dom": "*"
              }
            },
            "node_modules/rc-upload": {
              "version": "4.3.4",
              "resolved": "https://registry.npmjs.org/rc-upload/-/rc-upload-4.3.4.tgz",
              "integrity": "sha512-uVbtHFGNjHG/RyAfm9fluXB6pvArAGyAx8z7XzXXyorEgVIWj6mOlriuDm0XowDHYz4ycNK0nE0oP3cbFnzxiQ==",
              "dependencies": {
                "@babel/runtime": "^7.18.3",
                "classnames": "^2.2.5",
                "rc-util": "^5.2.0"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-util": {
              "version": "5.36.0",
              "resolved": "https://registry.npmjs.org/rc-util/-/rc-util-5.36.0.tgz",
              "integrity": "sha512-a4uUvT+UNHvYL+awzbN8H8zAjfduwY4KAp2wQy40wOz3NyBdo3Xhx/EAAPyDkHLoGm535jIACaMhIqExGiAjHw==",
              "dependencies": {
                "@babel/runtime": "^7.18.3",
                "react-is": "^16.12.0"
              },
              "peerDependencies": {
                "react": ">=16.9.0",
                "react-dom": ">=16.9.0"
              }
            },
            "node_modules/rc-virtual-list": {
              "version": "3.5.3",
              "resolved": "https://registry.npmjs.org/rc-virtual-list/-/rc-virtual-list-3.5.3.tgz",
              "integrity": "sha512-rG6IuD4EYM8K6oZ8Shu2BC/CmcTdqng4yBWkc/5fjWhB20bl6QwR2Upyt7+MxvfscoVm8zOQY+tcpEO5cu4GaQ==",
              "dependencies": {
                "@babel/runtime": "^7.20.0",
                "classnames": "^2.2.6",
                "rc-resize-observer": "^1.0.0",
                "rc-util": "^5.15.0"
              },
              "engines": {
                "node": ">=8.x"
              },
              "peerDependencies": {
                "react": "*",
                "react-dom": "*"
              }
            },
            "node_modules/react": {
              "version": "18.2.0",
              "resolved": "https://registry.npmjs.org/react/-/react-18.2.0.tgz",
              "integrity": "sha512-/3IjMdb2L9QbBdWiW5e3P2/npwMBaU9mHCSCUzNln0ZCYbcfTsGbTJrU/kGemdH2IWmB2ioZ+zkxtmq6g09fGQ==",
              "dependencies": {
                "loose-envify": "^1.1.0"
              },
              "engines": {
                "node": ">=0.10.0"
              }
            },
            "node_modules/react-dom": {
              "version": "18.2.0",
              "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-18.2.0.tgz",
              "integrity": "sha512-6IMTriUmvsjHUjNtEDudZfuDQUoWXVxKHhlEGSk81n4YFS+r/Kl99wXiwlVXtPBtJenozv2P+hxDsw9eA7Xo6g==",
              "dependencies": {
                "loose-envify": "^1.1.0",
                "scheduler": "^0.23.0"
              },
              "peerDependencies": {
                "react": "^18.2.0"
              }
            },
            "node_modules/react-easy-crop": {
              "version": "4.7.5",
              "resolved": "https://registry.npmjs.org/react-easy-crop/-/react-easy-crop-4.7.5.tgz",
              "integrity": "sha512-qKfI4PuhaH1jOLC3DQfQB0cE0z+3N7bfyPkPejQmylXNb8nstfPMH+oHj3gKgpBHLFUiQp/C1rY7sVCVgtjn3Q==",
              "dependencies": {
                "normalize-wheel": "^1.0.1",
                "tslib": "2.0.1"
              },
              "peerDependencies": {
                "react": ">=16.4.0",
                "react-dom": ">=16.4.0"
              }
            },
            "node_modules/react-easy-crop/node_modules/tslib": {
              "version": "2.0.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.0.1.tgz",
              "integrity": "sha512-SgIkNheinmEBgx1IUNirK0TUD4X9yjjBRTqqjggWCU3pUEqIk3/Uwl3yRixYKT6WjQuGiwDv4NomL3wqRCj+CQ=="
            },
            "node_modules/react-hot-toast": {
              "version": "2.4.1",
              "resolved": "https://registry.npmjs.org/react-hot-toast/-/react-hot-toast-2.4.1.tgz",
              "integrity": "sha512-j8z+cQbWIM5LY37pR6uZR6D4LfseplqnuAO4co4u8917hBUvXlEqyP1ZzqVLcqoyUesZZv/ImreoCeHVDpE5pQ==",
              "dependencies": {
                "goober": "^2.1.10"
              },
              "engines": {
                "node": ">=10"
              },
              "peerDependencies": {
                "react": ">=16",
                "react-dom": ">=16"
              }
            },
            "node_modules/react-is": {
              "version": "16.13.1",
              "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
              "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ=="
            },
            "node_modules/react-redux": {
              "version": "8.1.2",
              "resolved": "https://registry.npmjs.org/react-redux/-/react-redux-8.1.2.tgz",
              "integrity": "sha512-xJKYI189VwfsFc4CJvHqHlDrzyFTY/3vZACbE+rr/zQ34Xx1wQfB4OTOSeOSNrF6BDVe8OOdxIrAnMGXA3ggfw==",
              "dependencies": {
                "@babel/runtime": "^7.12.1",
                "@types/hoist-non-react-statics": "^3.3.1",
                "@types/use-sync-external-store": "^0.0.3",
                "hoist-non-react-statics": "^3.3.2",
                "react-is": "^18.0.0",
                "use-sync-external-store": "^1.0.0"
              },
              "peerDependencies": {
                "@types/react": "^16.8 || ^17.0 || ^18.0",
                "@types/react-dom": "^16.8 || ^17.0 || ^18.0",
                "react": "^16.8 || ^17.0 || ^18.0",
                "react-dom": "^16.8 || ^17.0 || ^18.0",
                "react-native": ">=0.59",
                "redux": "^4 || ^5.0.0-beta.0"
              },
              "peerDependenciesMeta": {
                "@types/react": {
                  "optional": true
                },
                "@types/react-dom": {
                  "optional": true
                },
                "react-dom": {
                  "optional": true
                },
                "react-native": {
                  "optional": true
                },
                "redux": {
                  "optional": true
                }
              }
            },
            "node_modules/react-redux/node_modules/react-is": {
              "version": "18.2.0",
              "resolved": "https://registry.npmjs.org/react-is/-/react-is-18.2.0.tgz",
              "integrity": "sha512-xWGDIW6x921xtzPkhiULtthJHoJvBbF3q26fzloPCK0hsvxtPVelvftw3zjbHWSkR2km9Z+4uxbDDK/6Zw9B8w=="
            },
            "node_modules/react-remove-scroll": {
              "version": "2.5.4",
              "resolved": "https://registry.npmjs.org/react-remove-scroll/-/react-remove-scroll-2.5.4.tgz",
              "integrity": "sha512-xGVKJJr0SJGQVirVFAUZ2k1QLyO6m+2fy0l8Qawbp5Jgrv3DeLalrfMNBFSlmz5kriGGzsVBtGVnf4pTKIhhWA==",
              "dependencies": {
                "react-remove-scroll-bar": "^2.3.3",
                "react-style-singleton": "^2.2.1",
                "tslib": "^2.1.0",
                "use-callback-ref": "^1.3.0",
                "use-sidecar": "^1.1.2"
              },
              "engines": {
                "node": ">=10"
              },
              "peerDependencies": {
                "@types/react": "^16.8.0 || ^17.0.0 || ^18.0.0",
                "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
              },
              "peerDependenciesMeta": {
                "@types/react": {
                  "optional": true
                }
              }
            },
            "node_modules/react-remove-scroll-bar": {
              "version": "2.3.4",
              "resolved": "https://registry.npmjs.org/react-remove-scroll-bar/-/react-remove-scroll-bar-2.3.4.tgz",
              "integrity": "sha512-63C4YQBUt0m6ALadE9XV56hV8BgJWDmmTPY758iIJjfQKt2nYwoUrPk0LXRXcB/yIj82T1/Ixfdpdk68LwIB0A==",
              "dependencies": {
                "react-style-singleton": "^2.2.1",
                "tslib": "^2.0.0"
              },
              "engines": {
                "node": ">=10"
              },
              "peerDependencies": {
                "@types/react": "^16.8.0 || ^17.0.0 || ^18.0.0",
                "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
              },
              "peerDependenciesMeta": {
                "@types/react": {
                  "optional": true
                }
              }
            },
            "node_modules/react-style-singleton": {
              "version": "2.2.1",
              "resolved": "https://registry.npmjs.org/react-style-singleton/-/react-style-singleton-2.2.1.tgz",
              "integrity": "sha512-ZWj0fHEMyWkHzKYUr2Bs/4zU6XLmq9HsgBURm7g5pAVfyn49DgUiNgY2d4lXRlYSiCif9YBGpQleewkcqddc7g==",
              "dependencies": {
                "get-nonce": "^1.0.0",
                "invariant": "^2.2.4",
                "tslib": "^2.0.0"
              },
              "engines": {
                "node": ">=10"
              },
              "peerDependencies": {
                "@types/react": "^16.8.0 || ^17.0.0 || ^18.0.0",
                "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
              },
              "peerDependenciesMeta": {
                "@types/react": {
                  "optional": true
                }
              }
            },
            "node_modules/read-cache": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
              "integrity": "sha512-Owdv/Ft7IjOgm/i0xvNDZ1LrRANRfew4b2prF3OWMQLxLfu3bS8FVhCsrSCMK4lR56Y9ya+AThoTpDCTxCmpRA==",
              "dev": true,
              "dependencies": {
                "pify": "^2.3.0"
              }
            },
            "node_modules/read-cache/node_modules/pify": {
              "version": "2.3.0",
              "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
              "integrity": "sha512-udgsAY+fTnvv7kI7aaxbqwWNb0AHiB0qBO89PZKPkoTmGOgdbrHDKD+0B2X4uTfJ/FT1R09r9gTsjUjNJotuog==",
              "dev": true,
              "engines": {
                "node": ">=0.10.0"
              }
            },
            "node_modules/readable-stream": {
              "version": "3.6.2",
              "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.2.tgz",
              "integrity": "sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==",
              "dependencies": {
                "inherits": "^2.0.3",
                "string_decoder": "^1.1.1",
                "util-deprecate": "^1.0.1"
              },
              "engines": {
                "node": ">= 6"
              }
            },
            "node_modules/readdirp": {
              "version": "3.6.0",
              "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
              "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
              "dev": true,
              "dependencies": {
                "picomatch": "^2.2.1"
              },
              "engines": {
                "node": ">=8.10.0"
              }
            },
            "node_modules/real-require": {
              "version": "0.1.0",
              "resolved": "https://registry.npmjs.org/real-require/-/real-require-0.1.0.tgz",
              "integrity": "sha512-r/H9MzAWtrv8aSVjPCMFpDMl5q66GqtmmRkRjpHTsp4zBAa+snZyiQNlMONiUmEJcsnaw0wCauJ2GWODr/aFkg==",
              "engines": {
                "node": ">= 12.13.0"
              }
            },
            "node_modules/redux": {
              "version": "4.2.1",
              "resolved": "https://registry.npmjs.org/redux/-/redux-4.2.1.tgz",
              "integrity": "sha512-LAUYz4lc+Do8/g7aeRa8JkyDErK6ekstQaqWQrNRW//MY1TvCEpMtpTWvlQ+FPbWCx+Xixu/6SHt5N0HR+SB4w==",
              "dependencies": {
                "@babel/runtime": "^7.9.2"
              }
            },
            "node_modules/redux-thunk": {
              "version": "2.4.2",
              "resolved": "https://registry.npmjs.org/redux-thunk/-/redux-thunk-2.4.2.tgz",
              "integrity": "sha512-+P3TjtnP0k/FEjcBL5FZpoovtvrTNT/UXd4/sluaSyrURlSlhLSzEdfsTBW7WsKB6yPvgd7q/iZPICFjW4o57Q==",
              "peerDependencies": {
                "redux": "^4"
              }
            },
            "node_modules/regenerator-runtime": {
              "version": "0.14.0",
              "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.14.0.tgz",
              "integrity": "sha512-srw17NI0TUWHuGa5CFGGmhfNIeja30WMBfbslPNhf6JrqQlLN5gcrvig1oqPxiVaXb0oW0XRKtH6Nngs5lKCIA=="
            },
            "node_modules/require-directory": {
              "version": "2.1.1",
              "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
              "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
              "engines": {
                "node": ">=0.10.0"
              }
            },
            "node_modules/require-main-filename": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-2.0.0.tgz",
              "integrity": "sha512-NKN5kMDylKuldxYLSUfrbo5Tuzh4hd+2E8NPPX02mZtn1VuREQToYe/ZdlJy+J3uCpfaiGF05e7B8W0iXbQHmg=="
            },
            "node_modules/reselect": {
              "version": "4.1.8",
              "resolved": "https://registry.npmjs.org/reselect/-/reselect-4.1.8.tgz",
              "integrity": "sha512-ab9EmR80F/zQTMNeneUr4cv+jSwPJgIlvEmVwLerwrWVbpLlBuls9XHzIeTFy4cegU2NHBp3va0LKOzU5qFEYQ=="
            },
            "node_modules/resize-observer-polyfill": {
              "version": "1.5.1",
              "resolved": "https://registry.npmjs.org/resize-observer-polyfill/-/resize-observer-polyfill-1.5.1.tgz",
              "integrity": "sha512-LwZrotdHOo12nQuZlHEmtuXdqGoOD0OhaxopaNFxWzInpEgaLWoVuAMbTzixuosCx2nEG58ngzW3vxdWoxIgdg=="
            },
            "node_modules/resolve": {
              "version": "1.22.4",
              "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.4.tgz",
              "integrity": "sha512-PXNdCiPqDqeUou+w1C2eTQbNfxKSuMxqTCuvlmmMsk1NWHL5fRrhY6Pl0qEYYc6+QqGClco1Qj8XnjPego4wfg==",
              "dev": true,
              "dependencies": {
                "is-core-module": "^2.13.0",
                "path-parse": "^1.0.7",
                "supports-preserve-symlinks-flag": "^1.0.0"
              },
              "bin": {
                "resolve": "bin/resolve"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/reusify": {
              "version": "1.0.4",
              "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.0.4.tgz",
              "integrity": "sha512-U9nH88a3fc/ekCF1l0/UP1IosiuIjyTh7hBvXVMHYgVcfGvt897Xguj2UOLDeI5BG2m7/uwyaLVT6fbtCwTyzw==",
              "dev": true,
              "engines": {
                "iojs": ">=1.0.0",
                "node": ">=0.10.0"
              }
            },
            "node_modules/rpc-websockets": {
              "version": "7.5.1",
              "resolved": "https://registry.npmjs.org/rpc-websockets/-/rpc-websockets-7.5.1.tgz",
              "integrity": "sha512-kGFkeTsmd37pHPMaHIgN1LVKXMi0JD782v4Ds9ZKtLlwdTKjn+CxM9A9/gLT2LaOuEcEFGL98h1QWQtlOIdW0w==",
              "dependencies": {
                "@babel/runtime": "^7.17.2",
                "eventemitter3": "^4.0.7",
                "uuid": "^8.3.2",
                "ws": "^8.5.0"
              },
              "funding": {
                "type": "paypal",
                "url": "https://paypal.me/kozjak"
              },
              "optionalDependencies": {
                "bufferutil": "^4.0.1",
                "utf-8-validate": "^5.0.2"
              }
            },
            "node_modules/rpc-websockets/node_modules/uuid": {
              "version": "8.3.2",
              "resolved": "https://registry.npmjs.org/uuid/-/uuid-8.3.2.tgz",
              "integrity": "sha512-+NYs2QeMWy+GWFOEm9xnn6HCDp0l7QBD7ml8zLUmJ+93Q5NF0NocErnwkTkXVFNiX3/fpC6afS8Dhb/gz7R7eg==",
              "bin": {
                "uuid": "dist/bin/uuid"
              }
            },
            "node_modules/run-parallel": {
              "version": "1.2.0",
              "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
              "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
              "dev": true,
              "funding": [
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/feross"
                },
                {
                  "type": "patreon",
                  "url": "https://www.patreon.com/feross"
                },
                {
                  "type": "consulting",
                  "url": "https://feross.org/support"
                }
              ],
              "dependencies": {
                "queue-microtask": "^1.2.2"
              }
            },
            "node_modules/rxjs": {
              "version": "6.6.7",
              "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-6.6.7.tgz",
              "integrity": "sha512-hTdwr+7yYNIT5n4AMYp85KA6yw2Va0FLa3Rguvbpa4W3I5xynaBZo41cM3XM+4Q6fRMj3sBYIR1VAmZMXYJvRQ==",
              "dependencies": {
                "tslib": "^1.9.0"
              },
              "engines": {
                "npm": ">=2.0.0"
              }
            },
            "node_modules/rxjs/node_modules/tslib": {
              "version": "1.14.1",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
              "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
            },
            "node_modules/safe-buffer": {
              "version": "5.2.1",
              "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
              "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
              "funding": [
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/feross"
                },
                {
                  "type": "patreon",
                  "url": "https://www.patreon.com/feross"
                },
                {
                  "type": "consulting",
                  "url": "https://feross.org/support"
                }
              ]
            },
            "node_modules/safe-json-utils": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/safe-json-utils/-/safe-json-utils-1.1.1.tgz",
              "integrity": "sha512-SAJWGKDs50tAbiDXLf89PDwt9XYkWyANFWVzn4dTXl5QyI8t2o/bW5/OJl3lvc2WVU4MEpTo9Yz5NVFNsp+OJQ=="
            },
            "node_modules/safe-stable-stringify": {
              "version": "2.4.3",
              "resolved": "https://registry.npmjs.org/safe-stable-stringify/-/safe-stable-stringify-2.4.3.tgz",
              "integrity": "sha512-e2bDA2WJT0wxseVd4lsDP4+3ONX6HpMXQa1ZhFQ7SU+GjvORCmShbCMltrtIDfkYhVHrOcPtj+KhmDBdPdZD1g==",
              "engines": {
                "node": ">=10"
              }
            },
            "node_modules/safer-buffer": {
              "version": "2.1.2",
              "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
              "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
              "devOptional": true
            },
            "node_modules/scheduler": {
              "version": "0.23.0",
              "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.23.0.tgz",
              "integrity": "sha512-CtuThmgHNg7zIZWAXi3AsyIzA3n4xx7aNyjwC2VJldO2LMVDhFK+63xGqq6CsJH4rTAt6/M+N4GhZiDYPx9eUw==",
              "dependencies": {
                "loose-envify": "^1.1.0"
              }
            },
            "node_modules/scroll-into-view-if-needed": {
              "version": "3.0.10",
              "resolved": "https://registry.npmjs.org/scroll-into-view-if-needed/-/scroll-into-view-if-needed-3.0.10.tgz",
              "integrity": "sha512-t44QCeDKAPf1mtQH3fYpWz8IM/DyvHLjs8wUvvwMYxk5moOqCzrMSxK6HQVD0QVmVjXFavoFIPRVrMuJPKAvtg==",
              "dependencies": {
                "compute-scroll-into-view": "^3.0.2"
              }
            },
            "node_modules/scrypt-js": {
              "version": "3.0.1",
              "resolved": "https://registry.npmjs.org/scrypt-js/-/scrypt-js-3.0.1.tgz",
              "integrity": "sha512-cdwTTnqPu0Hyvf5in5asVdZocVDTNRmR7XEcJuIzMjJeSHybHl7vpB66AzwTaIg6CLSbtjcxc8fqcySfnTkccA=="
            },
            "node_modules/semver": {
              "version": "7.5.4",
              "resolved": "https://registry.npmjs.org/semver/-/semver-7.5.4.tgz",
              "integrity": "sha512-1bCSESV6Pv+i21Hvpxp3Dx+pSD8lIPt8uVjRrxAUt/nbswYc+tK6Y2btiULjd4+fnq15PX+nqQDC7Oft7WkwcA==",
              "dependencies": {
                "lru-cache": "^6.0.0"
              },
              "bin": {
                "semver": "bin/semver.js"
              },
              "engines": {
                "node": ">=10"
              }
            },
            "node_modules/set-blocking": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/set-blocking/-/set-blocking-2.0.0.tgz",
              "integrity": "sha512-KiKBS8AnWGEyLzofFfmvKwpdPzqiy16LvQfK3yv/fVH7Bj13/wl3JSR1J+rfgRE9q7xUJK4qvgS8raSOeLUehw=="
            },
            "node_modules/sha.js": {
              "version": "2.4.11",
              "resolved": "https://registry.npmjs.org/sha.js/-/sha.js-2.4.11.tgz",
              "integrity": "sha512-QMEp5B7cftE7APOjk5Y6xgrbWu+WkLVQwk8JNjZ8nKRciZaByEW6MubieAiToS7+dwvrjGhH8jRXz3MVd0AYqQ==",
              "dependencies": {
                "inherits": "^2.0.1",
                "safe-buffer": "^5.0.1"
              },
              "bin": {
                "sha.js": "bin.js"
              }
            },
            "node_modules/side-channel": {
              "version": "1.0.4",
              "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.0.4.tgz",
              "integrity": "sha512-q5XPytqFEIKHkGdiMIrY10mvLRvnQh42/+GoBlFW3b2LXLE2xxJpZFdm94we0BaoV3RwJyGqg5wS7epxTv0Zvw==",
              "dependencies": {
                "call-bind": "^1.0.0",
                "get-intrinsic": "^1.0.2",
                "object-inspect": "^1.9.0"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/siwe": {
              "version": "2.1.4",
              "resolved": "https://registry.npmjs.org/siwe/-/siwe-2.1.4.tgz",
              "integrity": "sha512-Dke1Qqa3mgiLm3vjqw/+SQ7dl8WV/Pfk3AlQBF94cBFydTYhztngqYrikzE3X5UTsJ6565dfVbQptszsuYZNYg==",
              "dependencies": {
                "@spruceid/siwe-parser": "*",
                "@stablelib/random": "^1.0.1",
                "uri-js": "^4.4.1",
                "valid-url": "^1.0.9"
              },
              "peerDependencies": {
                "ethers": "^5.6.8 || ^6.0.8"
              }
            },
            "node_modules/sonic-boom": {
              "version": "2.8.0",
              "resolved": "https://registry.npmjs.org/sonic-boom/-/sonic-boom-2.8.0.tgz",
              "integrity": "sha512-kuonw1YOYYNOve5iHdSahXPOK49GqwA+LZhI6Wz/l0rP57iKyXXIHaRagOBHAPmGwJC6od2Z9zgvZ5loSgMlVg==",
              "dependencies": {
                "atomic-sleep": "^1.0.0"
              }
            },
            "node_modules/source-map-js": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.0.2.tgz",
              "integrity": "sha512-R0XvVJ9WusLiqTCEiGCmICCMplcCkIwwR11mOSD9CR5u+IXYdiseeEuXCVAjS54zqwkLcPNnmU4OeJ6tUrWhDw==",
              "engines": {
                "node": ">=0.10.0"
              }
            },
            "node_modules/split-on-first": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/split-on-first/-/split-on-first-1.1.0.tgz",
              "integrity": "sha512-43ZssAJaMusuKWL8sKUBQXHWOpq8d6CfN/u1p4gUzfJkM05C8rxTmYrkIPTXapZpORA6LkkzcUulJ8FqA7Uudw==",
              "engines": {
                "node": ">=6"
              }
            },
            "node_modules/split2": {
              "version": "4.2.0",
              "resolved": "https://registry.npmjs.org/split2/-/split2-4.2.0.tgz",
              "integrity": "sha512-UcjcJOWknrNkF6PLX83qcHM6KHgVKNkV62Y8a5uYDVv9ydGQVwAHMKqHdJje1VTWpljG0WYpCDhrCdAOYH4TWg==",
              "engines": {
                "node": ">= 10.x"
              }
            },
            "node_modules/stream-browserify": {
              "version": "3.0.0",
              "resolved": "https://registry.npmjs.org/stream-browserify/-/stream-browserify-3.0.0.tgz",
              "integrity": "sha512-H73RAHsVBapbim0tU2JwwOiXUj+fikfiaoYAKHF3VJfA0pe2BCzkhAHBlLG6REzE+2WNZcxOXjK7lkso+9euLA==",
              "dependencies": {
                "inherits": "~2.0.4",
                "readable-stream": "^3.5.0"
              }
            },
            "node_modules/stream-shift": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/stream-shift/-/stream-shift-1.0.1.tgz",
              "integrity": "sha512-AiisoFqQ0vbGcZgQPY1cdP2I76glaVA/RauYR4G4thNFgkTqr90yXTo4LYX60Jl+sIlPNHHdGSwo01AvbKUSVQ=="
            },
            "node_modules/streamsearch": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/streamsearch/-/streamsearch-1.1.0.tgz",
              "integrity": "sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==",
              "engines": {
                "node": ">=10.0.0"
              }
            },
            "node_modules/strict-uri-encode": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/strict-uri-encode/-/strict-uri-encode-2.0.0.tgz",
              "integrity": "sha512-QwiXZgpRcKkhTj2Scnn++4PKtWsH0kpzZ62L2R6c/LUVYv7hVnZqcg2+sMuT6R7Jusu1vviK/MFsu6kNJfWlEQ==",
              "engines": {
                "node": ">=4"
              }
            },
            "node_modules/string_decoder": {
              "version": "1.3.0",
              "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
              "integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
              "dependencies": {
                "safe-buffer": "~5.2.0"
              }
            },
            "node_modules/string-convert": {
              "version": "0.2.1",
              "resolved": "https://registry.npmjs.org/string-convert/-/string-convert-0.2.1.tgz",
              "integrity": "sha512-u/1tdPl4yQnPBjnVrmdLo9gtuLvELKsAoRapekWggdiQNvvvum+jYF329d84NAa660KQw7pB2n36KrIKVoXa3A=="
            },
            "node_modules/string-width": {
              "version": "4.2.3",
              "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
              "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
              "dependencies": {
                "emoji-regex": "^8.0.0",
                "is-fullwidth-code-point": "^3.0.0",
                "strip-ansi": "^6.0.1"
              },
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/strip-ansi": {
              "version": "6.0.1",
              "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
              "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
              "dependencies": {
                "ansi-regex": "^5.0.1"
              },
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/styled-jsx": {
              "version": "5.1.1",
              "resolved": "https://registry.npmjs.org/styled-jsx/-/styled-jsx-5.1.1.tgz",
              "integrity": "sha512-pW7uC1l4mBZ8ugbiZrcIsiIvVx1UmTfw7UkC3Um2tmfUq9Bhk8IiyEIPl6F8agHgjzku6j0xQEZbfA5uSgSaCw==",
              "dependencies": {
                "client-only": "0.0.1"
              },
              "engines": {
                "node": ">= 12.0.0"
              },
              "peerDependencies": {
                "react": ">= 16.8.0 || 17.x.x || ^18.0.0-0"
              },
              "peerDependenciesMeta": {
                "@babel/core": {
                  "optional": true
                },
                "babel-plugin-macros": {
                  "optional": true
                }
              }
            },
            "node_modules/stylis": {
              "version": "4.3.0",
              "resolved": "https://registry.npmjs.org/stylis/-/stylis-4.3.0.tgz",
              "integrity": "sha512-E87pIogpwUsUwXw7dNyU4QDjdgVMy52m+XEOPEKUn161cCzWjjhPSQhByfd1CcNvrOLnXQ6OnnZDwnJrz/Z4YQ=="
            },
            "node_modules/sucrase": {
              "version": "3.34.0",
              "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.34.0.tgz",
              "integrity": "sha512-70/LQEZ07TEcxiU2dz51FKaE6hCTWC6vr7FOk3Gr0U60C3shtAN+H+BFr9XlYe5xqf3RA8nrc+VIwzCfnxuXJw==",
              "dev": true,
              "dependencies": {
                "@jridgewell/gen-mapping": "^0.3.2",
                "commander": "^4.0.0",
                "glob": "7.1.6",
                "lines-and-columns": "^1.1.6",
                "mz": "^2.7.0",
                "pirates": "^4.0.1",
                "ts-interface-checker": "^0.1.9"
              },
              "bin": {
                "sucrase": "bin/sucrase",
                "sucrase-node": "bin/sucrase-node"
              },
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/sucrase/node_modules/commander": {
              "version": "4.1.1",
              "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
              "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
              "dev": true,
              "engines": {
                "node": ">= 6"
              }
            },
            "node_modules/superstruct": {
              "version": "0.14.2",
              "resolved": "https://registry.npmjs.org/superstruct/-/superstruct-0.14.2.tgz",
              "integrity": "sha512-nPewA6m9mR3d6k7WkZ8N8zpTWfenFH3q9pA2PkuiZxINr9DKB2+40wEQf0ixn8VaGuJ78AB6iWOtStI+/4FKZQ=="
            },
            "node_modules/supports-color": {
              "version": "8.1.1",
              "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-8.1.1.tgz",
              "integrity": "sha512-MpUEN2OodtUzxvKQl72cUF7RQ5EiHsGvSsVG0ia9c5RbWGL2CI4C7EpPS8UTBIplnlzZiNuV56w+FuNxy3ty2Q==",
              "dev": true,
              "dependencies": {
                "has-flag": "^4.0.0"
              },
              "engines": {
                "node": ">=10"
              },
              "funding": {
                "url": "https://github.com/chalk/supports-color?sponsor=1"
              }
            },
            "node_modules/supports-preserve-symlinks-flag": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
              "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
              "dev": true,
              "engines": {
                "node": ">= 0.4"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/tailwindcss": {
              "version": "3.3.3",
              "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.3.3.tgz",
              "integrity": "sha512-A0KgSkef7eE4Mf+nKJ83i75TMyq8HqY3qmFIJSWy8bNt0v1lG7jUcpGpoTFxAwYcWOphcTBLPPJg+bDfhDf52w==",
              "dev": true,
              "dependencies": {
                "@alloc/quick-lru": "^5.2.0",
                "arg": "^5.0.2",
                "chokidar": "^3.5.3",
                "didyoumean": "^1.2.2",
                "dlv": "^1.1.3",
                "fast-glob": "^3.2.12",
                "glob-parent": "^6.0.2",
                "is-glob": "^4.0.3",
                "jiti": "^1.18.2",
                "lilconfig": "^2.1.0",
                "micromatch": "^4.0.5",
                "normalize-path": "^3.0.0",
                "object-hash": "^3.0.0",
                "picocolors": "^1.0.0",
                "postcss": "^8.4.23",
                "postcss-import": "^15.1.0",
                "postcss-js": "^4.0.1",
                "postcss-load-config": "^4.0.1",
                "postcss-nested": "^6.0.1",
                "postcss-selector-parser": "^6.0.11",
                "resolve": "^1.22.2",
                "sucrase": "^3.32.0"
              },
              "bin": {
                "tailwind": "lib/cli.js",
                "tailwindcss": "lib/cli.js"
              },
              "engines": {
                "node": ">=14.0.0"
              }
            },
            "node_modules/tailwindcss/node_modules/object-hash": {
              "version": "3.0.0",
              "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
              "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
              "dev": true,
              "engines": {
                "node": ">= 6"
              }
            },
            "node_modules/text-encoding-utf-8": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/text-encoding-utf-8/-/text-encoding-utf-8-1.0.2.tgz",
              "integrity": "sha512-8bw4MY9WjdsD2aMtO0OzOCY3pXGYNx2d2FfHRVUKkiCPDWjKuOlhLVASS+pD7VkLTVjW268LYJHwsnPFlBpbAg=="
            },
            "node_modules/thenify": {
              "version": "3.3.1",
              "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
              "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
              "dev": true,
              "dependencies": {
                "any-promise": "^1.0.0"
              }
            },
            "node_modules/thenify-all": {
              "version": "1.6.0",
              "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
              "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
              "dev": true,
              "dependencies": {
                "thenify": ">= 3.1.0 < 4"
              },
              "engines": {
                "node": ">=0.8"
              }
            },
            "node_modules/thread-stream": {
              "version": "0.15.2",
              "resolved": "https://registry.npmjs.org/thread-stream/-/thread-stream-0.15.2.tgz",
              "integrity": "sha512-UkEhKIg2pD+fjkHQKyJO3yoIvAP3N6RlNFt2dUhcS1FGvCD1cQa1M/PGknCLFIyZdtJOWQjejp7bdNqmN7zwdA==",
              "dependencies": {
                "real-require": "^0.1.0"
              }
            },
            "node_modules/throttle-debounce": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/throttle-debounce/-/throttle-debounce-5.0.0.tgz",
              "integrity": "sha512-2iQTSgkkc1Zyk0MeVrt/3BvuOXYPl/R8Z0U2xxo9rjwNciaHDG3R+Lm6dh4EeUci49DanvBnuqI6jshoQQRGEg==",
              "engines": {
                "node": ">=12.22"
              }
            },
            "node_modules/through": {
              "version": "2.3.8",
              "resolved": "https://registry.npmjs.org/through/-/through-2.3.8.tgz",
              "integrity": "sha512-w89qg7PI8wAdvX60bMDP+bFoD5Dvhm9oLheFp5O4a2QF0cSBGsBX4qZmadPMvVqlLJBBci+WqGGOAPvcDeNSVg=="
            },
            "node_modules/to-regex-range": {
              "version": "5.0.1",
              "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
              "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
              "dev": true,
              "dependencies": {
                "is-number": "^7.0.0"
              },
              "engines": {
                "node": ">=8.0"
              }
            },
            "node_modules/toggle-selection": {
              "version": "1.0.6",
              "resolved": "https://registry.npmjs.org/toggle-selection/-/toggle-selection-1.0.6.tgz",
              "integrity": "sha512-BiZS+C1OS8g/q2RRbJmy59xpyghNBqrr6k5L/uKBGRsTfxmu3ffiRnd8mlGPUVayg8pvfi5urfnu8TU7DVOkLQ=="
            },
            "node_modules/tr46": {
              "version": "0.0.3",
              "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
              "integrity": "sha512-N3WMsuqV66lT30CrXNbEjx4GEwlow3v6rr4mCcv6prnfwhS01rkgyFdjPNBYd9br7LpXV1+Emh01fHnq2Gdgrw=="
            },
            "node_modules/ts-interface-checker": {
              "version": "0.1.13",
              "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
              "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
              "dev": true
            },
            "node_modules/tslib": {
              "version": "2.5.2",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.5.2.tgz",
              "integrity": "sha512-5svOrSA2w3iGFDs1HibEVBGbDrAY82bFQ3HZ3ixB+88nsbsWQoKqDRb5UBYAUPEzbBn6dAp5gRNXglySbx1MlA=="
            },
            "node_modules/type": {
              "version": "1.2.0",
              "resolved": "https://registry.npmjs.org/type/-/type-1.2.0.tgz",
              "integrity": "sha512-+5nt5AAniqsCnu2cEQQdpzCAh33kVx8n0VoFidKpB1dVVLAN/F+bgVOqOJqOnEnrhp222clB5p3vUlD+1QAnfg=="
            },
            "node_modules/typedarray-to-buffer": {
              "version": "3.1.5",
              "resolved": "https://registry.npmjs.org/typedarray-to-buffer/-/typedarray-to-buffer-3.1.5.tgz",
              "integrity": "sha512-zdu8XMNEDepKKR+XYOXAVPtWui0ly0NtohUscw+UmaHiAWT8hrV1rr//H6V+0DvJ3OQ19S979M0laLfX8rm82Q==",
              "dependencies": {
                "is-typedarray": "^1.0.0"
              }
            },
            "node_modules/typescript": {
              "version": "5.0.4",
              "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.0.4.tgz",
              "integrity": "sha512-cW9T5W9xY37cc+jfEnaUvX91foxtHkza3Nw3wkoF4sSlKn0MONdkdEndig/qPBWXNkmplh3NzayQzCiHM4/hqw==",
              "peer": true,
              "bin": {
                "tsc": "bin/tsc",
                "tsserver": "bin/tsserver"
              },
              "engines": {
                "node": ">=12.20"
              }
            },
            "node_modules/uint8arrays": {
              "version": "3.1.1",
              "resolved": "https://registry.npmjs.org/uint8arrays/-/uint8arrays-3.1.1.tgz",
              "integrity": "sha512-+QJa8QRnbdXVpHYjLoTpJIdCTiw9Ir62nocClWuXIq2JIh4Uta0cQsTSpFL678p2CN8B+XSApwcU+pQEqVpKWg==",
              "dependencies": {
                "multiformats": "^9.4.2"
              }
            },
            "node_modules/update-browserslist-db": {
              "version": "1.0.11",
              "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.0.11.tgz",
              "integrity": "sha512-dCwEFf0/oT85M1fHBg4F0jtLwJrutGoHSQXCh7u4o2t1drG+c0a9Flnqww6XUKSfQMPpJBRjU8d4RXB09qtvaA==",
              "dev": true,
              "funding": [
                {
                  "type": "opencollective",
                  "url": "https://opencollective.com/browserslist"
                },
                {
                  "type": "tidelift",
                  "url": "https://tidelift.com/funding/github/npm/browserslist"
                },
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/ai"
                }
              ],
              "dependencies": {
                "escalade": "^3.1.1",
                "picocolors": "^1.0.0"
              },
              "bin": {
                "update-browserslist-db": "cli.js"
              },
              "peerDependencies": {
                "browserslist": ">= 4.21.0"
              }
            },
            "node_modules/uri-js": {
              "version": "4.4.1",
              "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
              "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
              "dependencies": {
                "punycode": "^2.1.0"
              }
            },
            "node_modules/use-callback-ref": {
              "version": "1.3.0",
              "resolved": "https://registry.npmjs.org/use-callback-ref/-/use-callback-ref-1.3.0.tgz",
              "integrity": "sha512-3FT9PRuRdbB9HfXhEq35u4oZkvpJ5kuYbpqhCfmiZyReuRgpnhDlbr2ZEnnuS0RrJAPn6l23xjFg9kpDM+Ms7w==",
              "dependencies": {
                "tslib": "^2.0.0"
              },
              "engines": {
                "node": ">=10"
              },
              "peerDependencies": {
                "@types/react": "^16.8.0 || ^17.0.0 || ^18.0.0",
                "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
              },
              "peerDependenciesMeta": {
                "@types/react": {
                  "optional": true
                }
              }
            },
            "node_modules/use-sidecar": {
              "version": "1.1.2",
              "resolved": "https://registry.npmjs.org/use-sidecar/-/use-sidecar-1.1.2.tgz",
              "integrity": "sha512-epTbsLuzZ7lPClpz2TyryBfztm7m+28DlEv2ZCQ3MDr5ssiwyOwGH/e5F9CkfWjJ1t4clvI58yF822/GUkjjhw==",
              "dependencies": {
                "detect-node-es": "^1.1.0",
                "tslib": "^2.0.0"
              },
              "engines": {
                "node": ">=10"
              },
              "peerDependencies": {
                "@types/react": "^16.9.0 || ^17.0.0 || ^18.0.0",
                "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
              },
              "peerDependenciesMeta": {
                "@types/react": {
                  "optional": true
                }
              }
            },
            "node_modules/use-sync-external-store": {
              "version": "1.2.0",
              "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.2.0.tgz",
              "integrity": "sha512-eEgnFxGQ1Ife9bzYs6VLi8/4X6CObHMw9Qr9tPY43iKwsPw8xE8+EFsf/2cFZ5S3esXgpWgtSCtLNS41F+sKPA==",
              "peerDependencies": {
                "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
              }
            },
            "node_modules/utf-8-validate": {
              "version": "5.0.10",
              "resolved": "https://registry.npmjs.org/utf-8-validate/-/utf-8-validate-5.0.10.tgz",
              "integrity": "sha512-Z6czzLq4u8fPOyx7TU6X3dvUZVvoJmxSQ+IcrlmagKhilxlhZgxPK6C5Jqbkw1IDUmFTM+cz9QDnnLTwDz/2gQ==",
              "hasInstallScript": true,
              "dependencies": {
                "node-gyp-build": "^4.3.0"
              },
              "engines": {
                "node": ">=6.14.2"
              }
            },
            "node_modules/util": {
              "version": "0.12.5",
              "resolved": "https://registry.npmjs.org/util/-/util-0.12.5.tgz",
              "integrity": "sha512-kZf/K6hEIrWHI6XqOFUiiMa+79wE/D8Q+NCNAWclkyg3b4d2k7s0QGepNjiABc+aR3N1PAyHL7p6UcLY6LmrnA==",
              "dependencies": {
                "inherits": "^2.0.3",
                "is-arguments": "^1.0.4",
                "is-generator-function": "^1.0.7",
                "is-typed-array": "^1.1.3",
                "which-typed-array": "^1.1.2"
              }
            },
            "node_modules/util-deprecate": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
              "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw=="
            },
            "node_modules/uuid": {
              "version": "9.0.0",
              "resolved": "https://registry.npmjs.org/uuid/-/uuid-9.0.0.tgz",
              "integrity": "sha512-MXcSTerfPa4uqyzStbRoTgt5XIe3x5+42+q1sDuy3R5MDk66URdLMOZe5aPX/SQd+kuYAh0FdP/pO28IkQyTeg==",
              "bin": {
                "uuid": "dist/bin/uuid"
              }
            },
            "node_modules/valid-url": {
              "version": "1.0.9",
              "resolved": "https://registry.npmjs.org/valid-url/-/valid-url-1.0.9.tgz",
              "integrity": "sha512-QQDsV8OnSf5Uc30CKSwG9lnhMPe6exHtTXLRYX8uMwKENy640pU+2BgBL0LRbDh/eYRahNCS7aewCx0wf3NYVA=="
            },
            "node_modules/valtio": {
              "version": "1.10.5",
              "resolved": "https://registry.npmjs.org/valtio/-/valtio-1.10.5.tgz",
              "integrity": "sha512-jTp0k63VXf4r5hPoaC6a6LCG4POkVSh629WLi1+d5PlajLsbynTMd7qAgEiOSPxzoX5iNvbN7iZ/k/g29wrNiQ==",
              "dependencies": {
                "proxy-compare": "2.5.1",
                "use-sync-external-store": "1.2.0"
              },
              "engines": {
                "node": ">=12.20.0"
              },
              "peerDependencies": {
                "react": ">=16.8"
              },
              "peerDependenciesMeta": {
                "react": {
                  "optional": true
                }
              }
            },
            "node_modules/viem": {
              "version": "0.3.37",
              "resolved": "https://registry.npmjs.org/viem/-/viem-0.3.37.tgz",
              "integrity": "sha512-17jycP/1Hy9DsDpHlaaI7bbAHBDYGfVYHN6j0ltE7A/S30RXhPVFe4LAPRfmG+xR2QBq8xSUpjO78cRgDLBjZQ==",
              "dependencies": {
                "@adraffy/ens-normalize": "1.9.0",
                "@noble/curves": "1.0.0",
                "@noble/hashes": "1.3.0",
                "@scure/bip32": "1.3.0",
                "@scure/bip39": "1.2.0",
                "@wagmi/chains": "0.3.1",
                "abitype": "0.8.2",
                "isomorphic-ws": "5.0.0",
                "ws": "8.12.0"
              }
            },
            "node_modules/wagmi": {
              "version": "1.0.7",
              "resolved": "https://registry.npmjs.org/wagmi/-/wagmi-1.0.7.tgz",
              "integrity": "sha512-JBTR2Au6AGeFKYDpskaQ2OwHRkD/a+LgGrIqThxREuLKtMbiRlnM3XMr9cTFl0T/yg8TcmZO2IMq3O4yRVitsg==",
              "funding": [
                {
                  "type": "gitcoin",
                  "url": "https://wagmi.sh/gitcoin"
                },
                {
                  "type": "github",
                  "url": "https://github.com/sponsors/wagmi-dev"
                }
              ],
              "dependencies": {
                "@tanstack/query-sync-storage-persister": "^4.27.1",
                "@tanstack/react-query": "^4.28.0",
                "@tanstack/react-query-persist-client": "^4.28.0",
                "@wagmi/core": "1.0.7",
                "abitype": "0.8.1",
                "use-sync-external-store": "^1.2.0"
              },
              "peerDependencies": {
                "react": ">=17.0.0",
                "typescript": ">=4.9.4",
                "viem": "~0.3.35"
              },
              "peerDependenciesMeta": {
                "typescript": {
                  "optional": true
                }
              }
            },
            "node_modules/wagmi/node_modules/abitype": {
              "version": "0.8.1",
              "resolved": "https://registry.npmjs.org/abitype/-/abitype-0.8.1.tgz",
              "integrity": "sha512-n8Di6AWb3i7HnEkBvecU6pG0a5nj5YwMvdAIwPLsQK95ulRy/XS113s/RXvSfTX1iOQJYFrEO3/q4SMWu7OwTA==",
              "peerDependencies": {
                "typescript": ">=4.9.4",
                "zod": "^3 >=3.19.1"
              },
              "peerDependenciesMeta": {
                "zod": {
                  "optional": true
                }
              }
            },
            "node_modules/watchpack": {
              "version": "2.4.0",
              "resolved": "https://registry.npmjs.org/watchpack/-/watchpack-2.4.0.tgz",
              "integrity": "sha512-Lcvm7MGST/4fup+ifyKi2hjyIAwcdI4HRgtvTpIUxBRhB+RFtUh8XtDOxUfctVCnhVi+QQj49i91OyvzkJl6cg==",
              "dependencies": {
                "glob-to-regexp": "^0.4.1",
                "graceful-fs": "^4.1.2"
              },
              "engines": {
                "node": ">=10.13.0"
              }
            },
            "node_modules/webcrypto-core": {
              "version": "1.7.7",
              "resolved": "https://registry.npmjs.org/webcrypto-core/-/webcrypto-core-1.7.7.tgz",
              "integrity": "sha512-7FjigXNsBfopEj+5DV2nhNpfic2vumtjjgPmeDKk45z+MJwXKKfhPB7118Pfzrmh4jqOMST6Ch37iPAHoImg5g==",
              "dependencies": {
                "@peculiar/asn1-schema": "^2.3.6",
                "@peculiar/json-schema": "^1.1.12",
                "asn1js": "^3.0.1",
                "pvtsutils": "^1.3.2",
                "tslib": "^2.4.0"
              }
            },
            "node_modules/webidl-conversions": {
              "version": "3.0.1",
              "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-3.0.1.tgz",
              "integrity": "sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ=="
            },
            "node_modules/websocket": {
              "version": "1.0.34",
              "resolved": "https://registry.npmjs.org/websocket/-/websocket-1.0.34.tgz",
              "integrity": "sha512-PRDso2sGwF6kM75QykIesBijKSVceR6jL2G8NGYyq2XrItNC2P5/qL5XeR056GhA+Ly7JMFvJb9I312mJfmqnQ==",
              "dependencies": {
                "bufferutil": "^4.0.1",
                "debug": "^2.2.0",
                "es5-ext": "^0.10.50",
                "typedarray-to-buffer": "^3.1.5",
                "utf-8-validate": "^5.0.2",
                "yaeti": "^0.0.6"
              },
              "engines": {
                "node": ">=4.0.0"
              }
            },
            "node_modules/websocket/node_modules/debug": {
              "version": "2.6.9",
              "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
              "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
              "dependencies": {
                "ms": "2.0.0"
              }
            },
            "node_modules/websocket/node_modules/ms": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
              "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A=="
            },
            "node_modules/whatwg-url": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-5.0.0.tgz",
              "integrity": "sha512-saE57nupxk6v3HY35+jzBwYa0rKSy0XR8JSxZPwgLr7ys0IBzhGviA1/TUGJLmSVqs8pb9AnvICXEuOHLprYTw==",
              "dependencies": {
                "tr46": "~0.0.3",
                "webidl-conversions": "^3.0.0"
              }
            },
            "node_modules/which-module": {
              "version": "2.0.1",
              "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.1.tgz",
              "integrity": "sha512-iBdZ57RDvnOR9AGBhML2vFZf7h8vmBjhoaZqODJBFWHVtKkDmKuHai3cx5PgVMrX5YDNp27AofYbAwctSS+vhQ=="
            },
            "node_modules/which-typed-array": {
              "version": "1.1.9",
              "resolved": "https://registry.npmjs.org/which-typed-array/-/which-typed-array-1.1.9.tgz",
              "integrity": "sha512-w9c4xkx6mPidwp7180ckYWfMmvxpjlZuIudNtDf4N/tTAUB8VJbX25qZoAsrtGuYNnGw3pa0AXgbGKRB8/EceA==",
              "dependencies": {
                "available-typed-arrays": "^1.0.5",
                "call-bind": "^1.0.2",
                "for-each": "^0.3.3",
                "gopd": "^1.0.1",
                "has-tostringtag": "^1.0.0",
                "is-typed-array": "^1.1.10"
              },
              "engines": {
                "node": ">= 0.4"
              },
              "funding": {
                "url": "https://github.com/sponsors/ljharb"
              }
            },
            "node_modules/wrap-ansi": {
              "version": "6.2.0",
              "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-6.2.0.tgz",
              "integrity": "sha512-r6lPcBGxZXlIcymEu7InxDMhdW0KDxpLgoFLcguasxCaJ/SOIZwINatK9KY/tf+ZrlywOKU0UDj3ATXUBfxJXA==",
              "dependencies": {
                "ansi-styles": "^4.0.0",
                "string-width": "^4.1.0",
                "strip-ansi": "^6.0.0"
              },
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/wrappy": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
              "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ=="
            },
            "node_modules/ws": {
              "version": "8.12.0",
              "resolved": "https://registry.npmjs.org/ws/-/ws-8.12.0.tgz",
              "integrity": "sha512-kU62emKIdKVeEIOIKVegvqpXMSTAMLJozpHZaJNDYqBjzlSYXQGviYwN1osDLJ9av68qHd4a2oSjd7yD4pacig==",
              "engines": {
                "node": ">=10.0.0"
              },
              "peerDependencies": {
                "bufferutil": "^4.0.1",
                "utf-8-validate": ">=5.0.2"
              },
              "peerDependenciesMeta": {
                "bufferutil": {
                  "optional": true
                },
                "utf-8-validate": {
                  "optional": true
                }
              }
            },
            "node_modules/xtend": {
              "version": "4.0.2",
              "resolved": "https://registry.npmjs.org/xtend/-/xtend-4.0.2.tgz",
              "integrity": "sha512-LKYU1iAXJXUgAXn9URjiu+MWhyUXHsvfp7mcuYm9dSUKK0/CjtrUwFAxD82/mCWbtLsGjFIad0wIsod4zrTAEQ==",
              "engines": {
                "node": ">=0.4"
              }
            },
            "node_modules/y18n": {
              "version": "4.0.3",
              "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.3.tgz",
              "integrity": "sha512-JKhqTOwSrqNA1NY5lSztJ1GrBiUodLMmIZuLiDaMRJ+itFd+ABVE8XBjOvIWL+rSqNDC74LCSFmlb/U4UZ4hJQ=="
            },
            "node_modules/yaeti": {
              "version": "0.0.6",
              "resolved": "https://registry.npmjs.org/yaeti/-/yaeti-0.0.6.tgz",
              "integrity": "sha512-MvQa//+KcZCUkBTIC9blM+CU9J2GzuTytsOUwf2lidtvkx/6gnEp1QvJv34t9vdjhFmha/mUiNDbN0D0mJWdug==",
              "engines": {
                "node": ">=0.10.32"
              }
            },
            "node_modules/yallist": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
              "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A=="
            },
            "node_modules/yaml": {
              "version": "2.3.1",
              "resolved": "https://registry.npmjs.org/yaml/-/yaml-2.3.1.tgz",
              "integrity": "sha512-2eHWfjaoXgTBC2jNM1LRef62VQa0umtvRiDSk6HSzW7RvS5YtkabJrwYLLEKWBc8a5U2PTSCs+dJjUTJdlHsWQ==",
              "dev": true,
              "engines": {
                "node": ">= 14"
              }
            },
            "node_modules/yargs": {
              "version": "15.4.1",
              "resolved": "https://registry.npmjs.org/yargs/-/yargs-15.4.1.tgz",
              "integrity": "sha512-aePbxDmcYW++PaqBsJ+HYUFwCdv4LVvdnhBy78E57PIor8/OVvhMrADFFEDh8DHDFRv/O9i3lPhsENjO7QX0+A==",
              "dependencies": {
                "cliui": "^6.0.0",
                "decamelize": "^1.2.0",
                "find-up": "^4.1.0",
                "get-caller-file": "^2.0.1",
                "require-directory": "^2.1.1",
                "require-main-filename": "^2.0.0",
                "set-blocking": "^2.0.0",
                "string-width": "^4.2.0",
                "which-module": "^2.0.0",
                "y18n": "^4.0.0",
                "yargs-parser": "^18.1.2"
              },
              "engines": {
                "node": ">=8"
              }
            },
            "node_modules/yargs-parser": {
              "version": "18.1.3",
              "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-18.1.3.tgz",
              "integrity": "sha512-o50j0JeToy/4K6OZcaQmW6lyXXKhq7csREXcDwk2omFPJEwUNOVtJKvmDr9EI1fAJZUyZcRF7kxGBWmRXudrCQ==",
              "dependencies": {
                "camelcase": "^5.0.0",
                "decamelize": "^1.2.0"
              },
              "engines": {
                "node": ">=6"
              }
            },
            "node_modules/zod": {
              "version": "3.22.4",
              "resolved": "https://registry.npmjs.org/zod/-/zod-3.22.4.tgz",
              "integrity": "sha512-iC+8Io04lddc+mVqQ9AZ7OQ2MrUKGN+oIQyq1vemgt46jwCwLfhq7/pwnBnNXXXZb8VTVLKwp9EDkx+ryxIWmg==",
              "optional": true,
              "peer": true,
              "funding": {
                "url": "https://github.com/sponsors/colinhacks"
              }
            },
            "node_modules/zustand": {
              "version": "4.3.8",
              "resolved": "https://registry.npmjs.org/zustand/-/zustand-4.3.8.tgz",
              "integrity": "sha512-4h28KCkHg5ii/wcFFJ5Fp+k1J3gJoasaIbppdgZFO4BPJnsNxL0mQXBSFgOgAdCdBj35aDTPvdAJReTMntFPGg==",
              "dependencies": {
                "use-sync-external-store": "1.2.0"
              },
              "engines": {
                "node": ">=12.7.0"
              },
              "peerDependencies": {
                "immer": ">=9.0",
                "react": ">=16.8"
              },
              "peerDependenciesMeta": {
                "immer": {
                  "optional": true
                },
                "react": {
                  "optional": true
                }
              }
            }
          },
          "dependencies": {
            "@adraffy/ens-normalize": {
              "version": "1.9.0",
              "resolved": "https://registry.npmjs.org/@adraffy/ens-normalize/-/ens-normalize-1.9.0.tgz",
              "integrity": "sha512-iowxq3U30sghZotgl4s/oJRci6WPBfNO5YYgk2cIOMCHr3LeGPcsZjCEr+33Q4N+oV3OABDAtA+pyvWjbvBifQ=="
            },
            "@alloc/quick-lru": {
              "version": "5.2.0",
              "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
              "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
              "dev": true
            },
            "@ant-design/colors": {
              "version": "7.0.0",
              "resolved": "https://registry.npmjs.org/@ant-design/colors/-/colors-7.0.0.tgz",
              "integrity": "sha512-iVm/9PfGCbC0dSMBrz7oiEXZaaGH7ceU40OJEfKmyuzR9R5CRimJYPlRiFtMQGQcbNMea/ePcoIebi4ASGYXtg==",
              "requires": {
                "@ctrl/tinycolor": "^3.4.0"
              }
            },
            "@ant-design/cssinjs": {
              "version": "1.16.2",
              "resolved": "https://registry.npmjs.org/@ant-design/cssinjs/-/cssinjs-1.16.2.tgz",
              "integrity": "sha512-W+LT6Xm5sEYZn7ocMAIP9LvX99woxGg1aYu15o608/uUAaJDR7LrxBu/5cnMLa6AQK1829zdoKmRnRFOxAgzEg==",
              "requires": {
                "@babel/runtime": "^7.11.1",
                "@emotion/hash": "^0.8.0",
                "@emotion/unitless": "^0.7.5",
                "classnames": "^2.3.1",
                "csstype": "^3.0.10",
                "rc-util": "^5.35.0",
                "stylis": "^4.0.13"
              }
            },
            "@ant-design/icons": {
              "version": "5.2.5",
              "resolved": "https://registry.npmjs.org/@ant-design/icons/-/icons-5.2.5.tgz",
              "integrity": "sha512-9Jc59v5fl5dzmxqLWtRev3dJwU7Ya9ZheoI6XmZjZiQ7PRtk77rC+Rbt7GJzAPPg43RQ4YO53RE1u8n+Et97vQ==",
              "requires": {
                "@ant-design/colors": "^7.0.0",
                "@ant-design/icons-svg": "^4.3.0",
                "@babel/runtime": "^7.11.2",
                "classnames": "^2.2.6",
                "lodash.camelcase": "^4.3.0",
                "rc-util": "^5.31.1"
              }
            },
            "@ant-design/icons-svg": {
              "version": "4.3.0",
              "resolved": "https://registry.npmjs.org/@ant-design/icons-svg/-/icons-svg-4.3.0.tgz",
              "integrity": "sha512-WOgvdH/1Wl8Z7VXigRbCa5djO14zxrNTzvrAQzhWiBQtEKT0uTc8K1ltjKZ8U1gPn/wXhMA8/jE39SJl0WNxSg=="
            },
            "@ant-design/react-slick": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@ant-design/react-slick/-/react-slick-1.0.2.tgz",
              "integrity": "sha512-Wj8onxL/T8KQLFFiCA4t8eIRGpRR+UPgOdac2sYzonv+i0n3kXHmvHLLiOYL655DQx2Umii9Y9nNgL7ssu5haQ==",
              "requires": {
                "@babel/runtime": "^7.10.4",
                "classnames": "^2.2.5",
                "json2mq": "^0.2.0",
                "resize-observer-polyfill": "^1.5.1",
                "throttle-debounce": "^5.0.0"
              }
            },
            "@babel/runtime": {
              "version": "7.22.10",
              "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.22.10.tgz",
              "integrity": "sha512-21t/fkKLMZI4pqP2wlmsQAWnYW1PDyKyyUV4vCi+B25ydmdaYTKXPwCj0BzSUnZf4seIiYvSA3jcZ3gdsMFkLQ==",
              "requires": {
                "regenerator-runtime": "^0.14.0"
              }
            },
            "@coinbase/wallet-sdk": {
              "version": "3.6.6",
              "resolved": "https://registry.npmjs.org/@coinbase/wallet-sdk/-/wallet-sdk-3.6.6.tgz",
              "integrity": "sha512-vX+epj/Ttjo7XRwlr3TFUUfW5GTRMvORpERPwiu7z2jl3DSVL4rXLmHt5y6LDPlUVreas2gumdcFbu0fLRG9Jg==",
              "requires": {
                "@metamask/safe-event-emitter": "2.0.0",
                "@solana/web3.js": "^1.70.1",
                "bind-decorator": "^1.0.11",
                "bn.js": "^5.1.1",
                "buffer": "^6.0.3",
                "clsx": "^1.1.0",
                "eth-block-tracker": "6.1.0",
                "eth-json-rpc-filters": "5.1.0",
                "eth-rpc-errors": "4.0.2",
                "json-rpc-engine": "6.1.0",
                "keccak": "^3.0.1",
                "preact": "^10.5.9",
                "qs": "^6.10.3",
                "rxjs": "^6.6.3",
                "sha.js": "^2.4.11",
                "stream-browserify": "^3.0.0",
                "util": "^0.12.4"
              },
              "dependencies": {
                "clsx": {
                  "version": "1.2.1",
                  "resolved": "https://registry.npmjs.org/clsx/-/clsx-1.2.1.tgz",
                  "integrity": "sha512-EcR6r5a8bj6pu3ycsa/E/cKVGuTgZJZdsyUYHOksG/UHIiKfjxzRxYJpyVBwYaQeOvghal9fcc4PidlgzugAQg=="
                }
              }
            },
            "@ctrl/tinycolor": {
              "version": "3.6.0",
              "resolved": "https://registry.npmjs.org/@ctrl/tinycolor/-/tinycolor-3.6.0.tgz",
              "integrity": "sha512-/Z3l6pXthq0JvMYdUFyX9j0MaCltlIn6mfh9jLyQwg5aPKxkyNa0PTHtU1AlFXLNk55ZuAeJRcpvq+tmLfKmaQ=="
            },
            "@emotion/hash": {
              "version": "0.8.0",
              "resolved": "https://registry.npmjs.org/@emotion/hash/-/hash-0.8.0.tgz",
              "integrity": "sha512-kBJtf7PH6aWwZ6fka3zQ0p6SBYzx4fl1LoZXE2RrnYST9Xljm7WfKJrU4g/Xr3Beg72MLrp1AWNUmuYJTL7Cow=="
            },
            "@emotion/unitless": {
              "version": "0.7.5",
              "resolved": "https://registry.npmjs.org/@emotion/unitless/-/unitless-0.7.5.tgz",
              "integrity": "sha512-OWORNpfjMsSSUBVrRBVGECkhWcULOAJz9ZW8uK9qgxD+87M7jHRcvh/A96XXNhXTLmKcoYSQtBEX7lHMO7YRwg=="
            },
            "@ethersproject/abi": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/abi/-/abi-5.7.0.tgz",
              "integrity": "sha512-351ktp42TiRcYB3H1OP8yajPeAQstMW/yCFokj/AthP9bLHzQFPlOrxOcwYEDkUAICmOHljvN4K39OMTMUa9RA==",
              "requires": {
                "@ethersproject/address": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/constants": "^5.7.0",
                "@ethersproject/hash": "^5.7.0",
                "@ethersproject/keccak256": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/strings": "^5.7.0"
              }
            },
            "@ethersproject/abstract-provider": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/abstract-provider/-/abstract-provider-5.7.0.tgz",
              "integrity": "sha512-R41c9UkchKCpAqStMYUpdunjo3pkEvZC3FAwZn5S5MGbXoMQOHIdHItezTETxAO5bevtMApSyEhn9+CHcDsWBw==",
              "requires": {
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/networks": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/transactions": "^5.7.0",
                "@ethersproject/web": "^5.7.0"
              }
            },
            "@ethersproject/abstract-signer": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/abstract-signer/-/abstract-signer-5.7.0.tgz",
              "integrity": "sha512-a16V8bq1/Cz+TGCkE2OPMTOUDLS3grCpdjoJCYNnVBbdYEMSgKrU0+B90s8b6H+ByYTBZN7a3g76jdIJi7UfKQ==",
              "requires": {
                "@ethersproject/abstract-provider": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0"
              }
            },
            "@ethersproject/address": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/address/-/address-5.7.0.tgz",
              "integrity": "sha512-9wYhYt7aghVGo758POM5nqcOMaE168Q6aRLJZwUmiqSrAungkG74gSSeKEIR7ukixesdRZGPgVqme6vmxs1fkA==",
              "requires": {
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/keccak256": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/rlp": "^5.7.0"
              }
            },
            "@ethersproject/base64": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/base64/-/base64-5.7.0.tgz",
              "integrity": "sha512-Dr8tcHt2mEbsZr/mwTPIQAf3Ai0Bks/7gTw9dSqk1mQvhW3XvRlmDJr/4n+wg1JmCl16NZue17CDh8xb/vZ0sQ==",
              "requires": {
                "@ethersproject/bytes": "^5.7.0"
              }
            },
            "@ethersproject/basex": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/basex/-/basex-5.7.0.tgz",
              "integrity": "sha512-ywlh43GwZLv2Voc2gQVTKBoVQ1mti3d8HK5aMxsfu/nRDnMmNqaSJ3r3n85HBByT8OpoY96SXM1FogC533T4zw==",
              "requires": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/properties": "^5.7.0"
              }
            },
            "@ethersproject/bignumber": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/bignumber/-/bignumber-5.7.0.tgz",
              "integrity": "sha512-n1CAdIHRWjSucQO3MC1zPSVgV/6dy/fjL9pMrPP9peL+QxEg9wOsVqwD4+818B6LUEtaXzVHQiuivzRoxPxUGw==",
              "requires": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "bn.js": "^5.2.1"
              }
            },
            "@ethersproject/bytes": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/bytes/-/bytes-5.7.0.tgz",
              "integrity": "sha512-nsbxwgFXWh9NyYWo+U8atvmMsSdKJprTcICAkvbBffT75qDocbuggBU0SJiVK2MuTrp0q+xvLkTnGMPK1+uA9A==",
              "requires": {
                "@ethersproject/logger": "^5.7.0"
              }
            },
            "@ethersproject/constants": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/constants/-/constants-5.7.0.tgz",
              "integrity": "sha512-DHI+y5dBNvkpYUMiRQyxRBYBefZkJfo70VUkUAsRjcPs47muV9evftfZ0PJVCXYbAiCgght0DtcF9srFQmIgWA==",
              "requires": {
                "@ethersproject/bignumber": "^5.7.0"
              }
            },
            "@ethersproject/contracts": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/contracts/-/contracts-5.7.0.tgz",
              "integrity": "sha512-5GJbzEU3X+d33CdfPhcyS+z8MzsTrBGk/sc+G+59+tPa9yFkl6HQ9D6L0QMgNTA9q8dT0XKxxkyp883XsQvbbg==",
              "requires": {
                "@ethersproject/abi": "^5.7.0",
                "@ethersproject/abstract-provider": "^5.7.0",
                "@ethersproject/abstract-signer": "^5.7.0",
                "@ethersproject/address": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/constants": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/transactions": "^5.7.0"
              }
            },
            "@ethersproject/hash": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/hash/-/hash-5.7.0.tgz",
              "integrity": "sha512-qX5WrQfnah1EFnO5zJv1v46a8HW0+E5xuBBDTwMFZLuVTx0tbU2kkx15NqdjxecrLGatQN9FGQKpb1FKdHCt+g==",
              "requires": {
                "@ethersproject/abstract-signer": "^5.7.0",
                "@ethersproject/address": "^5.7.0",
                "@ethersproject/base64": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/keccak256": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/strings": "^5.7.0"
              }
            },
            "@ethersproject/hdnode": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/hdnode/-/hdnode-5.7.0.tgz",
              "integrity": "sha512-OmyYo9EENBPPf4ERhR7oj6uAtUAhYGqOnIS+jE5pTXvdKBS99ikzq1E7Iv0ZQZ5V36Lqx1qZLeak0Ra16qpeOg==",
              "requires": {
                "@ethersproject/abstract-signer": "^5.7.0",
                "@ethersproject/basex": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/pbkdf2": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/sha2": "^5.7.0",
                "@ethersproject/signing-key": "^5.7.0",
                "@ethersproject/strings": "^5.7.0",
                "@ethersproject/transactions": "^5.7.0",
                "@ethersproject/wordlists": "^5.7.0"
              }
            },
            "@ethersproject/json-wallets": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/json-wallets/-/json-wallets-5.7.0.tgz",
              "integrity": "sha512-8oee5Xgu6+RKgJTkvEMl2wDgSPSAQ9MB/3JYjFV9jlKvcYHUXZC+cQp0njgmxdHkYWn8s6/IqIZYm0YWCjO/0g==",
              "requires": {
                "@ethersproject/abstract-signer": "^5.7.0",
                "@ethersproject/address": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/hdnode": "^5.7.0",
                "@ethersproject/keccak256": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/pbkdf2": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/random": "^5.7.0",
                "@ethersproject/strings": "^5.7.0",
                "@ethersproject/transactions": "^5.7.0",
                "aes-js": "3.0.0",
                "scrypt-js": "3.0.1"
              },
              "dependencies": {
                "aes-js": {
                  "version": "3.0.0",
                  "resolved": "https://registry.npmjs.org/aes-js/-/aes-js-3.0.0.tgz",
                  "integrity": "sha512-H7wUZRn8WpTq9jocdxQ2c8x2sKo9ZVmzfRE13GiNJXfp7NcKYEdvl3vspKjXox6RIG2VtaRe4JFvxG4rqp2Zuw=="
                }
              }
            },
            "@ethersproject/keccak256": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/keccak256/-/keccak256-5.7.0.tgz",
              "integrity": "sha512-2UcPboeL/iW+pSg6vZ6ydF8tCnv3Iu/8tUmLLzWWGzxWKFFqOBQFLo6uLUv6BDrLgCDfN28RJ/wtByx+jZ4KBg==",
              "requires": {
                "@ethersproject/bytes": "^5.7.0",
                "js-sha3": "0.8.0"
              }
            },
            "@ethersproject/logger": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/logger/-/logger-5.7.0.tgz",
              "integrity": "sha512-0odtFdXu/XHtjQXJYA3u9G0G8btm0ND5Cu8M7i5vhEcE8/HmF4Lbdqanwyv4uQTr2tx6b7fQRmgLrsnpQlmnig=="
            },
            "@ethersproject/networks": {
              "version": "5.7.1",
              "resolved": "https://registry.npmjs.org/@ethersproject/networks/-/networks-5.7.1.tgz",
              "integrity": "sha512-n/MufjFYv3yFcUyfhnXotyDlNdFb7onmkSy8aQERi2PjNcnWQ66xXxa3XlS8nCcA8aJKJjIIMNJTC7tu80GwpQ==",
              "requires": {
                "@ethersproject/logger": "^5.7.0"
              }
            },
            "@ethersproject/pbkdf2": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/pbkdf2/-/pbkdf2-5.7.0.tgz",
              "integrity": "sha512-oR/dBRZR6GTyaofd86DehG72hY6NpAjhabkhxgr3X2FpJtJuodEl2auADWBZfhDHgVCbu3/H/Ocq2uC6dpNjjw==",
              "requires": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/sha2": "^5.7.0"
              }
            },
            "@ethersproject/properties": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/properties/-/properties-5.7.0.tgz",
              "integrity": "sha512-J87jy8suntrAkIZtecpxEPxY//szqr1mlBaYlQ0r4RCaiD2hjheqF9s1LVE8vVuJCXisjIP+JgtK/Do54ej4Sw==",
              "requires": {
                "@ethersproject/logger": "^5.7.0"
              }
            },
            "@ethersproject/providers": {
              "version": "5.7.2",
              "resolved": "https://registry.npmjs.org/@ethersproject/providers/-/providers-5.7.2.tgz",
              "integrity": "sha512-g34EWZ1WWAVgr4aptGlVBF8mhl3VWjv+8hoAnzStu8Ah22VHBsuGzP17eb6xDVRzw895G4W7vvx60lFFur/1Rg==",
              "requires": {
                "@ethersproject/abstract-provider": "^5.7.0",
                "@ethersproject/abstract-signer": "^5.7.0",
                "@ethersproject/address": "^5.7.0",
                "@ethersproject/base64": "^5.7.0",
                "@ethersproject/basex": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/constants": "^5.7.0",
                "@ethersproject/hash": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/networks": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/random": "^5.7.0",
                "@ethersproject/rlp": "^5.7.0",
                "@ethersproject/sha2": "^5.7.0",
                "@ethersproject/strings": "^5.7.0",
                "@ethersproject/transactions": "^5.7.0",
                "@ethersproject/web": "^5.7.0",
                "bech32": "1.1.4",
                "ws": "7.4.6"
              },
              "dependencies": {
                "ws": {
                  "version": "7.4.6",
                  "resolved": "https://registry.npmjs.org/ws/-/ws-7.4.6.tgz",
                  "integrity": "sha512-YmhHDO4MzaDLB+M9ym/mDA5z0naX8j7SIlT8f8z+I0VtzsRbekxEutHSme7NPS2qE8StCYQNUnfWdXta/Yu85A==",
                  "requires": {}
                }
              }
            },
            "@ethersproject/random": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/random/-/random-5.7.0.tgz",
              "integrity": "sha512-19WjScqRA8IIeWclFme75VMXSBvi4e6InrUNuaR4s5pTF2qNhcGdCUwdxUVGtDDqC00sDLCO93jPQoDUH4HVmQ==",
              "requires": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0"
              }
            },
            "@ethersproject/rlp": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/rlp/-/rlp-5.7.0.tgz",
              "integrity": "sha512-rBxzX2vK8mVF7b0Tol44t5Tb8gomOHkj5guL+HhzQ1yBh/ydjGnpw6at+X6Iw0Kp3OzzzkcKp8N9r0W4kYSs9w==",
              "requires": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0"
              }
            },
            "@ethersproject/sha2": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/sha2/-/sha2-5.7.0.tgz",
              "integrity": "sha512-gKlH42riwb3KYp0reLsFTokByAKoJdgFCwI+CCiX/k+Jm2mbNs6oOaCjYQSlI1+XBVejwH2KrmCbMAT/GnRDQw==",
              "requires": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "hash.js": "1.1.7"
              }
            },
            "@ethersproject/signing-key": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/signing-key/-/signing-key-5.7.0.tgz",
              "integrity": "sha512-MZdy2nL3wO0u7gkB4nA/pEf8lu1TlFswPNmy8AiYkfKTdO6eXBJyUdmHO/ehm/htHw9K/qF8ujnTyUAD+Ry54Q==",
              "requires": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "bn.js": "^5.2.1",
                "elliptic": "6.5.4",
                "hash.js": "1.1.7"
              }
            },
            "@ethersproject/solidity": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/solidity/-/solidity-5.7.0.tgz",
              "integrity": "sha512-HmabMd2Dt/raavyaGukF4XxizWKhKQ24DoLtdNbBmNKUOPqwjsKQSdV9GQtj9CBEea9DlzETlVER1gYeXXBGaA==",
              "requires": {
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/keccak256": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/sha2": "^5.7.0",
                "@ethersproject/strings": "^5.7.0"
              }
            },
            "@ethersproject/strings": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/strings/-/strings-5.7.0.tgz",
              "integrity": "sha512-/9nu+lj0YswRNSH0NXYqrh8775XNyEdUQAuf3f+SmOrnVewcJ5SBNAjF7lpgehKi4abvNNXyf+HX86czCdJ8Mg==",
              "requires": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/constants": "^5.7.0",
                "@ethersproject/logger": "^5.7.0"
              }
            },
            "@ethersproject/transactions": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/transactions/-/transactions-5.7.0.tgz",
              "integrity": "sha512-kmcNicCp1lp8qanMTC3RIikGgoJ80ztTyvtsFvCYpSCfkjhD0jZ2LOrnbcuxuToLIUYYf+4XwD1rP+B/erDIhQ==",
              "requires": {
                "@ethersproject/address": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/constants": "^5.7.0",
                "@ethersproject/keccak256": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/rlp": "^5.7.0",
                "@ethersproject/signing-key": "^5.7.0"
              }
            },
            "@ethersproject/units": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/units/-/units-5.7.0.tgz",
              "integrity": "sha512-pD3xLMy3SJu9kG5xDGI7+xhTEmGXlEqXU4OfNapmfnxLVY4EMSSRp7j1k7eezutBPH7RBN/7QPnwR7hzNlEFeg==",
              "requires": {
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/constants": "^5.7.0",
                "@ethersproject/logger": "^5.7.0"
              }
            },
            "@ethersproject/wallet": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/wallet/-/wallet-5.7.0.tgz",
              "integrity": "sha512-MhmXlJXEJFBFVKrDLB4ZdDzxcBxQ3rLyCkhNqVu3CDYvR97E+8r01UgrI+TI99Le+aYm/in/0vp86guJuM7FCA==",
              "requires": {
                "@ethersproject/abstract-provider": "^5.7.0",
                "@ethersproject/abstract-signer": "^5.7.0",
                "@ethersproject/address": "^5.7.0",
                "@ethersproject/bignumber": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/hash": "^5.7.0",
                "@ethersproject/hdnode": "^5.7.0",
                "@ethersproject/json-wallets": "^5.7.0",
                "@ethersproject/keccak256": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/random": "^5.7.0",
                "@ethersproject/signing-key": "^5.7.0",
                "@ethersproject/transactions": "^5.7.0",
                "@ethersproject/wordlists": "^5.7.0"
              }
            },
            "@ethersproject/web": {
              "version": "5.7.1",
              "resolved": "https://registry.npmjs.org/@ethersproject/web/-/web-5.7.1.tgz",
              "integrity": "sha512-Gueu8lSvyjBWL4cYsWsjh6MtMwM0+H4HvqFPZfB6dV8ctbP9zFAO73VG1cMWae0FLPCtz0peKPpZY8/ugJJX2w==",
              "requires": {
                "@ethersproject/base64": "^5.7.0",
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/strings": "^5.7.0"
              }
            },
            "@ethersproject/wordlists": {
              "version": "5.7.0",
              "resolved": "https://registry.npmjs.org/@ethersproject/wordlists/-/wordlists-5.7.0.tgz",
              "integrity": "sha512-S2TFNJNfHWVHNE6cNDjbVlZ6MgE17MIxMbMg2zv3wn+3XSJGosL1m9ZVv3GXCf/2ymSsQ+hRI5IzoMJTG6aoVA==",
              "requires": {
                "@ethersproject/bytes": "^5.7.0",
                "@ethersproject/hash": "^5.7.0",
                "@ethersproject/logger": "^5.7.0",
                "@ethersproject/properties": "^5.7.0",
                "@ethersproject/strings": "^5.7.0"
              }
            },
            "@jridgewell/gen-mapping": {
              "version": "0.3.3",
              "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.3.tgz",
              "integrity": "sha512-HLhSWOLRi875zjjMG/r+Nv0oCW8umGb0BgEhyX3dDX3egwZtB8PqLnjz3yedt8R5StBrzcg4aBpnh8UA9D1BoQ==",
              "dev": true,
              "requires": {
                "@jridgewell/set-array": "^1.0.1",
                "@jridgewell/sourcemap-codec": "^1.4.10",
                "@jridgewell/trace-mapping": "^0.3.9"
              }
            },
            "@jridgewell/resolve-uri": {
              "version": "3.1.1",
              "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.1.tgz",
              "integrity": "sha512-dSYZh7HhCDtCKm4QakX0xFpsRDqjjtZf/kjI/v3T3Nwt5r8/qz/M19F9ySyOqU94SXBmeG9ttTul+YnR4LOxFA==",
              "dev": true
            },
            "@jridgewell/set-array": {
              "version": "1.1.2",
              "resolved": "https://registry.npmjs.org/@jridgewell/set-array/-/set-array-1.1.2.tgz",
              "integrity": "sha512-xnkseuNADM0gt2bs+BvhO0p78Mk762YnZdsuzFV018NoG1Sj1SCQvpSqa7XUaTam5vAGasABV9qXASMKnFMwMw==",
              "dev": true
            },
            "@jridgewell/sourcemap-codec": {
              "version": "1.4.15",
              "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.4.15.tgz",
              "integrity": "sha512-eF2rxCRulEKXHTRiDrDy6erMYWqNw4LPdQ8UQA4huuxaQsVeRPFl2oM8oDGxMFhJUWZf9McpLtJasDDZb/Bpeg==",
              "dev": true
            },
            "@jridgewell/trace-mapping": {
              "version": "0.3.19",
              "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.19.tgz",
              "integrity": "sha512-kf37QtfW+Hwx/buWGMPcR60iF9ziHa6r/CZJIHbmcm4+0qrXiVdxegAH0F6yddEVQ7zdkjcGCgCzUu+BcbhQxw==",
              "dev": true,
              "requires": {
                "@jridgewell/resolve-uri": "^3.1.0",
                "@jridgewell/sourcemap-codec": "^1.4.14"
              }
            },
            "@json-rpc-tools/provider": {
              "version": "1.7.6",
              "resolved": "https://registry.npmjs.org/@json-rpc-tools/provider/-/provider-1.7.6.tgz",
              "integrity": "sha512-z7D3xvJ33UfCGv77n40lbzOYjZKVM3k2+5cV7xS8G6SCvKTzMkhkUYuD/qzQUNT4cG/lv0e9mRToweEEVLVVmA==",
              "requires": {
                "@json-rpc-tools/utils": "^1.7.6",
                "axios": "^0.21.0",
                "safe-json-utils": "^1.1.1",
                "ws": "^7.4.0"
              },
              "dependencies": {
                "axios": {
                  "version": "0.21.4",
                  "resolved": "https://registry.npmjs.org/axios/-/axios-0.21.4.tgz",
                  "integrity": "sha512-ut5vewkiu8jjGBdqpM44XxjuCjq9LAKeHVmoVfHVzy8eHgxxq8SbAVQNovDA8mVi05kP0Ea/n/UzcSHcTJQfNg==",
                  "requires": {
                    "follow-redirects": "^1.14.0"
                  }
                },
                "ws": {
                  "version": "7.5.9",
                  "resolved": "https://registry.npmjs.org/ws/-/ws-7.5.9.tgz",
                  "integrity": "sha512-F+P9Jil7UiSKSkppIiD94dN07AwvFixvLIj1Og1Rl9GGMuNipJnV9JzjD6XuqmAeiswGvUmNLjr5cFuXwNS77Q==",
                  "requires": {}
                }
              }
            },
            "@json-rpc-tools/types": {
              "version": "1.7.6",
              "resolved": "https://registry.npmjs.org/@json-rpc-tools/types/-/types-1.7.6.tgz",
              "integrity": "sha512-nDSqmyRNEqEK9TZHtM15uNnDljczhCUdBmRhpNZ95bIPKEDQ+nTDmGMFd2lLin3upc5h2VVVd9tkTDdbXUhDIQ==",
              "requires": {
                "keyvaluestorage-interface": "^1.0.0"
              }
            },
            "@json-rpc-tools/utils": {
              "version": "1.7.6",
              "resolved": "https://registry.npmjs.org/@json-rpc-tools/utils/-/utils-1.7.6.tgz",
              "integrity": "sha512-HjA8x/U/Q78HRRe19yh8HVKoZ+Iaoo3YZjakJYxR+rw52NHo6jM+VE9b8+7ygkCFXl/EHID5wh/MkXaE/jGyYw==",
              "requires": {
                "@json-rpc-tools/types": "^1.7.6",
                "@pedrouid/environment": "^1.0.1"
              }
            },
            "@ledgerhq/connect-kit-loader": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@ledgerhq/connect-kit-loader/-/connect-kit-loader-1.0.2.tgz",
              "integrity": "sha512-TQ21IjcZOw/scqypaVFY3jHVqI7X7Hta3qN/us6FvTol3AY06UmrhhXGww0E9xHmAbdX241ddwXEiMBSQZFr9g=="
            },
            "@lit-labs/ssr-dom-shim": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/@lit-labs/ssr-dom-shim/-/ssr-dom-shim-1.1.1.tgz",
              "integrity": "sha512-kXOeFbfCm4fFf2A3WwVEeQj55tMZa8c8/f9AKHMobQMkzNUfUj+antR3fRPaZJawsa1aZiP/Da3ndpZrwEe4rQ=="
            },
            "@lit/reactive-element": {
              "version": "1.6.1",
              "resolved": "https://registry.npmjs.org/@lit/reactive-element/-/reactive-element-1.6.1.tgz",
              "integrity": "sha512-va15kYZr7KZNNPZdxONGQzpUr+4sxVu7V/VG7a8mRfPPXUyhEYj5RzXCQmGrlP3tAh0L3HHm5AjBMFYRqlM9SA==",
              "requires": {
                "@lit-labs/ssr-dom-shim": "^1.0.0"
              }
            },
            "@metamask/safe-event-emitter": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/@metamask/safe-event-emitter/-/safe-event-emitter-2.0.0.tgz",
              "integrity": "sha512-/kSXhY692qiV1MXu6EeOZvg5nECLclxNXcKCxJ3cXQgYuRymRHpdx/t7JXfsK+JLjwA1e1c1/SBrlQYpusC29Q=="
            },
            "@metamask/utils": {
              "version": "3.6.0",
              "resolved": "https://registry.npmjs.org/@metamask/utils/-/utils-3.6.0.tgz",
              "integrity": "sha512-9cIRrfkWvHblSiNDVXsjivqa9Ak0RYo/1H6tqTqTbAx+oBK2Sva0lWDHxGchOqA7bySGUJKAWSNJvH6gdHZ0gQ==",
              "requires": {
                "@types/debug": "^4.1.7",
                "debug": "^4.3.4",
                "semver": "^7.3.8",
                "superstruct": "^1.0.3"
              },
              "dependencies": {
                "superstruct": {
                  "version": "1.0.3",
                  "resolved": "https://registry.npmjs.org/superstruct/-/superstruct-1.0.3.tgz",
                  "integrity": "sha512-8iTn3oSS8nRGn+C2pgXSKPI3jmpm6FExNazNpjvqS6ZUJQCej3PUXEKM8NjHBOs54ExM+LPW/FBRhymrdcCiSg=="
                }
              }
            },
            "@motionone/animation": {
              "version": "10.15.1",
              "resolved": "https://registry.npmjs.org/@motionone/animation/-/animation-10.15.1.tgz",
              "integrity": "sha512-mZcJxLjHor+bhcPuIFErMDNyrdb2vJur8lSfMCsuCB4UyV8ILZLvK+t+pg56erv8ud9xQGK/1OGPt10agPrCyQ==",
              "requires": {
                "@motionone/easing": "^10.15.1",
                "@motionone/types": "^10.15.1",
                "@motionone/utils": "^10.15.1",
                "tslib": "^2.3.1"
              }
            },
            "@motionone/dom": {
              "version": "10.16.2",
              "resolved": "https://registry.npmjs.org/@motionone/dom/-/dom-10.16.2.tgz",
              "integrity": "sha512-bnuHdNbge1FutZXv+k7xub9oPWcF0hsu8y1HTH/qg6av58YI0VufZ3ngfC7p2xhMJMnoh0LXFma2EGTgPeCkeg==",
              "requires": {
                "@motionone/animation": "^10.15.1",
                "@motionone/generators": "^10.15.1",
                "@motionone/types": "^10.15.1",
                "@motionone/utils": "^10.15.1",
                "hey-listen": "^1.0.8",
                "tslib": "^2.3.1"
              }
            },
            "@motionone/easing": {
              "version": "10.15.1",
              "resolved": "https://registry.npmjs.org/@motionone/easing/-/easing-10.15.1.tgz",
              "integrity": "sha512-6hIHBSV+ZVehf9dcKZLT7p5PEKHGhDwky2k8RKkmOvUoYP3S+dXsKupyZpqx5apjd9f+php4vXk4LuS+ADsrWw==",
              "requires": {
                "@motionone/utils": "^10.15.1",
                "tslib": "^2.3.1"
              }
            },
            "@motionone/generators": {
              "version": "10.15.1",
              "resolved": "https://registry.npmjs.org/@motionone/generators/-/generators-10.15.1.tgz",
              "integrity": "sha512-67HLsvHJbw6cIbLA/o+gsm7h+6D4Sn7AUrB/GPxvujse1cGZ38F5H7DzoH7PhX+sjvtDnt2IhFYF2Zp1QTMKWQ==",
              "requires": {
                "@motionone/types": "^10.15.1",
                "@motionone/utils": "^10.15.1",
                "tslib": "^2.3.1"
              }
            },
            "@motionone/svelte": {
              "version": "10.16.2",
              "resolved": "https://registry.npmjs.org/@motionone/svelte/-/svelte-10.16.2.tgz",
              "integrity": "sha512-38xsroKrfK+aHYhuQlE6eFcGy0EwrB43Q7RGjF73j/kRUTcLNu/LAaKiLLsN5lyqVzCgTBVt4TMT/ShWbTbc5Q==",
              "requires": {
                "@motionone/dom": "^10.16.2",
                "tslib": "^2.3.1"
              }
            },
            "@motionone/types": {
              "version": "10.15.1",
              "resolved": "https://registry.npmjs.org/@motionone/types/-/types-10.15.1.tgz",
              "integrity": "sha512-iIUd/EgUsRZGrvW0jqdst8st7zKTzS9EsKkP+6c6n4MPZoQHwiHuVtTQLD6Kp0bsBLhNzKIBlHXponn/SDT4hA=="
            },
            "@motionone/utils": {
              "version": "10.15.1",
              "resolved": "https://registry.npmjs.org/@motionone/utils/-/utils-10.15.1.tgz",
              "integrity": "sha512-p0YncgU+iklvYr/Dq4NobTRdAPv9PveRDUXabPEeOjBLSO/1FNB2phNTZxOxpi1/GZwYpAoECEa0Wam+nsmhSw==",
              "requires": {
                "@motionone/types": "^10.15.1",
                "hey-listen": "^1.0.8",
                "tslib": "^2.3.1"
              }
            },
            "@motionone/vue": {
              "version": "10.16.2",
              "resolved": "https://registry.npmjs.org/@motionone/vue/-/vue-10.16.2.tgz",
              "integrity": "sha512-7/dEK/nWQXOkJ70bqb2KyNfSWbNvWqKKq1C8juj+0Mg/AorgD8O5wE3naddK0G+aXuNMqRuc4jlsYHHWHtIzVw==",
              "requires": {
                "@motionone/dom": "^10.16.2",
                "tslib": "^2.3.1"
              }
            },
            "@next/env": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/env/-/env-13.5.6.tgz",
              "integrity": "sha512-Yac/bV5sBGkkEXmAX5FWPS9Mmo2rthrOPRQQNfycJPkjUAUclomCPH7QFVCDQ4Mp2k2K1SSM6m0zrxYrOwtFQw=="
            },
            "@next/swc-darwin-arm64": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-darwin-arm64/-/swc-darwin-arm64-13.5.6.tgz",
              "integrity": "sha512-5nvXMzKtZfvcu4BhtV0KH1oGv4XEW+B+jOfmBdpFI3C7FrB/MfujRpWYSBBO64+qbW8pkZiSyQv9eiwnn5VIQA==",
              "optional": true
            },
            "@next/swc-darwin-x64": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-darwin-x64/-/swc-darwin-x64-13.5.6.tgz",
              "integrity": "sha512-6cgBfxg98oOCSr4BckWjLLgiVwlL3vlLj8hXg2b+nDgm4bC/qVXXLfpLB9FHdoDu4057hzywbxKvmYGmi7yUzA==",
              "optional": true
            },
            "@next/swc-linux-arm64-gnu": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-gnu/-/swc-linux-arm64-gnu-13.5.6.tgz",
              "integrity": "sha512-txagBbj1e1w47YQjcKgSU4rRVQ7uF29YpnlHV5xuVUsgCUf2FmyfJ3CPjZUvpIeXCJAoMCFAoGnbtX86BK7+sg==",
              "optional": true
            },
            "@next/swc-linux-arm64-musl": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-musl/-/swc-linux-arm64-musl-13.5.6.tgz",
              "integrity": "sha512-cGd+H8amifT86ZldVJtAKDxUqeFyLWW+v2NlBULnLAdWsiuuN8TuhVBt8ZNpCqcAuoruoSWynvMWixTFcroq+Q==",
              "optional": true
            },
            "@next/swc-linux-x64-gnu": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-13.5.6.tgz",
              "integrity": "sha512-Mc2b4xiIWKXIhBy2NBTwOxGD3nHLmq4keFk+d4/WL5fMsB8XdJRdtUlL87SqVCTSaf1BRuQQf1HvXZcy+rq3Nw==",
              "optional": true
            },
            "@next/swc-linux-x64-musl": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-musl/-/swc-linux-x64-musl-13.5.6.tgz",
              "integrity": "sha512-CFHvP9Qz98NruJiUnCe61O6GveKKHpJLloXbDSWRhqhkJdZD2zU5hG+gtVJR//tyW897izuHpM6Gtf6+sNgJPQ==",
              "optional": true
            },
            "@next/swc-win32-arm64-msvc": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-win32-arm64-msvc/-/swc-win32-arm64-msvc-13.5.6.tgz",
              "integrity": "sha512-aFv1ejfkbS7PUa1qVPwzDHjQWQtknzAZWGTKYIAaS4NMtBlk3VyA6AYn593pqNanlicewqyl2jUhQAaFV/qXsg==",
              "optional": true
            },
            "@next/swc-win32-ia32-msvc": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-win32-ia32-msvc/-/swc-win32-ia32-msvc-13.5.6.tgz",
              "integrity": "sha512-XqqpHgEIlBHvzwG8sp/JXMFkLAfGLqkbVsyN+/Ih1mR8INb6YCc2x/Mbwi6hsAgUnqQztz8cvEbHJUbSl7RHDg==",
              "optional": true
            },
            "@next/swc-win32-x64-msvc": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/@next/swc-win32-x64-msvc/-/swc-win32-x64-msvc-13.5.6.tgz",
              "integrity": "sha512-Cqfe1YmOS7k+5mGu92nl5ULkzpKuxJrP3+4AEuPmrpFZ3BHxTY3TnHmU1On3bFmFFs6FbTcdF58CCUProGpIGQ==",
              "optional": true
            },
            "@noble/curves": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/@noble/curves/-/curves-1.0.0.tgz",
              "integrity": "sha512-2upgEu0iLiDVDZkNLeFV2+ht0BAVgQnEmCk6JsOch9Rp8xfkMCbvbAZlA2pBHQc73dbl+vFOXfqkf4uemdn0bw==",
              "requires": {
                "@noble/hashes": "1.3.0"
              }
            },
            "@noble/hashes": {
              "version": "1.3.0",
              "resolved": "https://registry.npmjs.org/@noble/hashes/-/hashes-1.3.0.tgz",
              "integrity": "sha512-ilHEACi9DwqJB0pw7kv+Apvh50jiiSyR/cQ3y4W7lOR5mhvn/50FLUfsnfJz0BDZtl/RR16kXvptiv6q1msYZg=="
            },
            "@nodelib/fs.scandir": {
              "version": "2.1.5",
              "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
              "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
              "dev": true,
              "requires": {
                "@nodelib/fs.stat": "2.0.5",
                "run-parallel": "^1.1.9"
              }
            },
            "@nodelib/fs.stat": {
              "version": "2.0.5",
              "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
              "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
              "dev": true
            },
            "@nodelib/fs.walk": {
              "version": "1.2.8",
              "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
              "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
              "dev": true,
              "requires": {
                "@nodelib/fs.scandir": "2.1.5",
                "fastq": "^1.6.0"
              }
            },
            "@panva/hkdf": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/@panva/hkdf/-/hkdf-1.1.1.tgz",
              "integrity": "sha512-dhPeilub1NuIG0X5Kvhh9lH4iW3ZsHlnzwgwbOlgwQ2wG1IqFzsgHqmKPk3WzsdWAeaxKJxgM0+W433RmN45GA=="
            },
            "@peculiar/asn1-schema": {
              "version": "2.3.6",
              "resolved": "https://registry.npmjs.org/@peculiar/asn1-schema/-/asn1-schema-2.3.6.tgz",
              "integrity": "sha512-izNRxPoaeJeg/AyH8hER6s+H7p4itk+03QCa4sbxI3lNdseQYCuxzgsuNK8bTXChtLTjpJz6NmXKA73qLa3rCA==",
              "requires": {
                "asn1js": "^3.0.5",
                "pvtsutils": "^1.3.2",
                "tslib": "^2.4.0"
              }
            },
            "@peculiar/json-schema": {
              "version": "1.1.12",
              "resolved": "https://registry.npmjs.org/@peculiar/json-schema/-/json-schema-1.1.12.tgz",
              "integrity": "sha512-coUfuoMeIB7B8/NMekxaDzLhaYmp0HZNPEjYRm9goRou8UZIC3z21s0sL9AWoCw4EG876QyO3kYrc61WNF9B/w==",
              "requires": {
                "tslib": "^2.0.0"
              }
            },
            "@peculiar/webcrypto": {
              "version": "1.4.3",
              "resolved": "https://registry.npmjs.org/@peculiar/webcrypto/-/webcrypto-1.4.3.tgz",
              "integrity": "sha512-VtaY4spKTdN5LjJ04im/d/joXuvLbQdgy5Z4DXF4MFZhQ+MTrejbNMkfZBp1Bs3O5+bFqnJgyGdPuZQflvIa5A==",
              "requires": {
                "@peculiar/asn1-schema": "^2.3.6",
                "@peculiar/json-schema": "^1.1.12",
                "pvtsutils": "^1.3.2",
                "tslib": "^2.5.0",
                "webcrypto-core": "^1.7.7"
              }
            },
            "@pedrouid/environment": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@pedrouid/environment/-/environment-1.0.1.tgz",
              "integrity": "sha512-HaW78NszGzRZd9SeoI3JD11JqY+lubnaOx7Pewj5pfjqWXOEATpeKIFb9Z4t2WBUK2iryiXX3lzWwmYWgUL0Ug=="
            },
            "@rainbow-me/rainbowkit": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@rainbow-me/rainbowkit/-/rainbowkit-1.0.1.tgz",
              "integrity": "sha512-P+2lgHaN5X84K1e+MARUydyhYRS+nStN4H470QloBBWP5UsidHZpSJGd4qi0WFtfR6zBff96N6kmsfJo7PjFhQ==",
              "requires": {
                "@vanilla-extract/css": "1.9.1",
                "@vanilla-extract/dynamic": "2.0.2",
                "@vanilla-extract/sprinkles": "1.5.0",
                "clsx": "1.1.1",
                "qrcode": "1.5.0",
                "react-remove-scroll": "2.5.4"
              },
              "dependencies": {
                "clsx": {
                  "version": "1.1.1",
                  "resolved": "https://registry.npmjs.org/clsx/-/clsx-1.1.1.tgz",
                  "integrity": "sha512-6/bPho624p3S2pMyvP5kKBPXnI3ufHLObBFCfgx+LkeR5lg2XYy2hqZqUf45ypD8COn2bhgGJSUE+l5dhNBieA=="
                }
              }
            },
            "@rainbow-me/rainbowkit-siwe-next-auth": {
              "version": "0.2.0",
              "resolved": "https://registry.npmjs.org/@rainbow-me/rainbowkit-siwe-next-auth/-/rainbowkit-siwe-next-auth-0.2.0.tgz",
              "integrity": "sha512-U0GPPc5tRhNSLgdLb4sU6eha7qxIJmfNbUmcGeQGh7IR/jw3xFdYYKYaHcEG8rB09/yfEMQodwJiV+vrjta6zQ==",
              "requires": {}
            },
            "@rc-component/color-picker": {
              "version": "1.4.1",
              "resolved": "https://registry.npmjs.org/@rc-component/color-picker/-/color-picker-1.4.1.tgz",
              "integrity": "sha512-vh5EWqnsayZa/JwUznqDaPJz39jznx/YDbyBuVJntv735tKXKwEUZZb2jYEldOg+NKWZwtALjGMrNeGBmqFoEw==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "@ctrl/tinycolor": "^3.6.0",
                "classnames": "^2.2.6",
                "rc-util": "^5.30.0"
              }
            },
            "@rc-component/context": {
              "version": "1.3.0",
              "resolved": "https://registry.npmjs.org/@rc-component/context/-/context-1.3.0.tgz",
              "integrity": "sha512-6QdaCJ7Wn5UZLJs15IEfqy4Ru3OaL5ctqpQYWd5rlfV9wwzrzdt6+kgAQZV/qdB0MUPN4nhyBfRembQCIvBf+w==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "rc-util": "^5.27.0"
              }
            },
            "@rc-component/mini-decimal": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/@rc-component/mini-decimal/-/mini-decimal-1.1.0.tgz",
              "integrity": "sha512-jS4E7T9Li2GuYwI6PyiVXmxTiM6b07rlD9Ge8uGZSCz3WlzcG5ZK7g5bbuKNeZ9pgUuPK/5guV781ujdVpm4HQ==",
              "requires": {
                "@babel/runtime": "^7.18.0"
              }
            },
            "@rc-component/mutate-observer": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/@rc-component/mutate-observer/-/mutate-observer-1.1.0.tgz",
              "integrity": "sha512-QjrOsDXQusNwGZPf4/qRQasg7UFEj06XiCJ8iuiq/Io7CrHrgVi6Uuetw60WAMG1799v+aM8kyc+1L/GBbHSlw==",
              "requires": {
                "@babel/runtime": "^7.18.0",
                "classnames": "^2.3.2",
                "rc-util": "^5.24.4"
              }
            },
            "@rc-component/portal": {
              "version": "1.1.2",
              "resolved": "https://registry.npmjs.org/@rc-component/portal/-/portal-1.1.2.tgz",
              "integrity": "sha512-6f813C0IsasTZms08kfA8kPAGxbbkYToa8ALaiDIGGECU4i9hj8Plgbx0sNJDrey3EtHO30hmdaxtT0138xZcg==",
              "requires": {
                "@babel/runtime": "^7.18.0",
                "classnames": "^2.3.2",
                "rc-util": "^5.24.4"
              }
            },
            "@rc-component/tour": {
              "version": "1.8.1",
              "resolved": "https://registry.npmjs.org/@rc-component/tour/-/tour-1.8.1.tgz",
              "integrity": "sha512-CsrQnfKgNArxx2j1RNHVLZgVA+rLrEj06lIsl4KSynMqADsqz8eKvVkr0F3p9PA10948M6WEEZt5a/FGAbGR2A==",
              "requires": {
                "@babel/runtime": "^7.18.0",
                "@rc-component/portal": "^1.0.0-9",
                "@rc-component/trigger": "^1.3.6",
                "classnames": "^2.3.2",
                "rc-util": "^5.24.4"
              }
            },
            "@rc-component/trigger": {
              "version": "1.15.3",
              "resolved": "https://registry.npmjs.org/@rc-component/trigger/-/trigger-1.15.3.tgz",
              "integrity": "sha512-C25WdL8PxX9UrE9S4vZsB2zU920S+pihN9S9mGd/DgfjM5XWYZBonLZfTWAZz54w9cYr5dt/Ln8futCesoBSZA==",
              "requires": {
                "@babel/runtime": "^7.18.3",
                "@rc-component/portal": "^1.1.0",
                "classnames": "^2.3.2",
                "rc-align": "^4.0.0",
                "rc-motion": "^2.0.0",
                "rc-resize-observer": "^1.3.1",
                "rc-util": "^5.33.0"
              }
            },
            "@reduxjs/toolkit": {
              "version": "1.9.5",
              "resolved": "https://registry.npmjs.org/@reduxjs/toolkit/-/toolkit-1.9.5.tgz",
              "integrity": "sha512-Rt97jHmfTeaxL4swLRNPD/zV4OxTes4la07Xc4hetpUW/vc75t5m1ANyxG6ymnEQ2FsLQsoMlYB2vV1sO3m8tQ==",
              "requires": {
                "immer": "^9.0.21",
                "redux": "^4.2.1",
                "redux-thunk": "^2.4.2",
                "reselect": "^4.1.8"
              }
            },
            "@safe-global/safe-apps-provider": {
              "version": "0.15.2",
              "resolved": "https://registry.npmjs.org/@safe-global/safe-apps-provider/-/safe-apps-provider-0.15.2.tgz",
              "integrity": "sha512-BaoGAuY7h6jLBL7P+M6b7hd+1QfTv8uMyNF3udhiNUwA0XwfzH2ePQB13IEV3Mn7wdcIMEEUDS5kHbtAsj60qQ==",
              "requires": {
                "@safe-global/safe-apps-sdk": "7.9.0",
                "events": "^3.3.0"
              },
              "dependencies": {
                "@safe-global/safe-apps-sdk": {
                  "version": "7.9.0",
                  "resolved": "https://registry.npmjs.org/@safe-global/safe-apps-sdk/-/safe-apps-sdk-7.9.0.tgz",
                  "integrity": "sha512-S2EI+JL8ocSgE3uGNaDZCzKmwfhtxXZFDUP76vN0FeaY35itFMyi8F0Vhxu0XnZm3yLzJE3tp5px6GhuQFLU6w==",
                  "requires": {
                    "@safe-global/safe-gateway-typescript-sdk": "^3.5.3",
                    "ethers": "^5.7.2"
                  }
                }
              }
            },
            "@safe-global/safe-apps-sdk": {
              "version": "7.11.0",
              "resolved": "https://registry.npmjs.org/@safe-global/safe-apps-sdk/-/safe-apps-sdk-7.11.0.tgz",
              "integrity": "sha512-RDamzPM1Lhhiiz0O+Dn6FkFqIh47jmZX+HCV/BBnBBOSKfBJE//IGD3+02zMgojXHTikQAburdPes9qmH1SA1A==",
              "requires": {
                "@safe-global/safe-gateway-typescript-sdk": "^3.5.3",
                "ethers": "^5.7.2"
              }
            },
            "@safe-global/safe-gateway-typescript-sdk": {
              "version": "3.7.3",
              "resolved": "https://registry.npmjs.org/@safe-global/safe-gateway-typescript-sdk/-/safe-gateway-typescript-sdk-3.7.3.tgz",
              "integrity": "sha512-O6JCgXNZWG0Vv8FnOEjKfcbsP0WxGvoPJk5ufqUrsyBlHup16It6oaLnn+25nXFLBZOHI1bz8429JlqAc2t2hg==",
              "requires": {
                "cross-fetch": "^3.1.5"
              }
            },
            "@scure/base": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/@scure/base/-/base-1.1.1.tgz",
              "integrity": "sha512-ZxOhsSyxYwLJj3pLZCefNitxsj093tb2vq90mp2txoYeBqbcjDjqFhyM8eUjq/uFm6zJ+mUuqxlS2FkuSY1MTA=="
            },
            "@scure/bip32": {
              "version": "1.3.0",
              "resolved": "https://registry.npmjs.org/@scure/bip32/-/bip32-1.3.0.tgz",
              "integrity": "sha512-bcKpo1oj54hGholplGLpqPHRbIsnbixFtc06nwuNM5/dwSXOq/AAYoIBRsBmnZJSdfeNW5rnff7NTAz3ZCqR9Q==",
              "requires": {
                "@noble/curves": "~1.0.0",
                "@noble/hashes": "~1.3.0",
                "@scure/base": "~1.1.0"
              }
            },
            "@scure/bip39": {
              "version": "1.2.0",
              "resolved": "https://registry.npmjs.org/@scure/bip39/-/bip39-1.2.0.tgz",
              "integrity": "sha512-SX/uKq52cuxm4YFXWFaVByaSHJh2w3BnokVSeUJVCv6K7WulT9u2BuNRBhuFl8vAuYnzx9bEu9WgpcNYTrYieg==",
              "requires": {
                "@noble/hashes": "~1.3.0",
                "@scure/base": "~1.1.0"
              }
            },
            "@solana/buffer-layout": {
              "version": "4.0.1",
              "resolved": "https://registry.npmjs.org/@solana/buffer-layout/-/buffer-layout-4.0.1.tgz",
              "integrity": "sha512-E1ImOIAD1tBZFRdjeM4/pzTiTApC0AOBGwyAMS4fwIodCWArzJ3DWdoh8cKxeFM2fElkxBh2Aqts1BPC373rHA==",
              "requires": {
                "buffer": "~6.0.3"
              }
            },
            "@solana/web3.js": {
              "version": "1.77.1",
              "resolved": "https://registry.npmjs.org/@solana/web3.js/-/web3.js-1.77.1.tgz",
              "integrity": "sha512-YWahzcQtQ3inR2+ZSqWsoJnXBppfd//7mbSFVFpyJWyE+vTtSfljdKVOosCY0ynu6AZaBLV1HYErc2wZOXUdeA==",
              "requires": {
                "@babel/runtime": "^7.12.5",
                "@noble/curves": "^1.0.0",
                "@noble/hashes": "^1.3.0",
                "@solana/buffer-layout": "^4.0.0",
                "agentkeepalive": "^4.2.1",
                "bigint-buffer": "^1.1.5",
                "bn.js": "^5.0.0",
                "borsh": "^0.7.0",
                "bs58": "^4.0.1",
                "buffer": "6.0.3",
                "fast-stable-stringify": "^1.0.0",
                "jayson": "^3.4.4",
                "node-fetch": "^2.6.7",
                "rpc-websockets": "^7.5.1",
                "superstruct": "^0.14.2"
              }
            },
            "@spruceid/siwe-parser": {
              "version": "2.0.2",
              "resolved": "https://registry.npmjs.org/@spruceid/siwe-parser/-/siwe-parser-2.0.2.tgz",
              "integrity": "sha512-9WuA0ios2537cWYu39MMeH0O2KdrMKgKlOBUTWRTXQjCYu5B+mHCA0JkCbFaJ/0EjxoVIcYCXIW/DoPEpw+PqA==",
              "requires": {
                "@noble/hashes": "^1.1.2",
                "apg-js": "^4.1.1",
                "uri-js": "^4.4.1",
                "valid-url": "^1.0.9"
              }
            },
            "@stablelib/aead": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/aead/-/aead-1.0.1.tgz",
              "integrity": "sha512-q39ik6sxGHewqtO0nP4BuSe3db5G1fEJE8ukvngS2gLkBXyy6E7pLubhbYgnkDFv6V8cWaxcE4Xn0t6LWcJkyg=="
            },
            "@stablelib/binary": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/binary/-/binary-1.0.1.tgz",
              "integrity": "sha512-ClJWvmL6UBM/wjkvv/7m5VP3GMr9t0osr4yVgLZsLCOz4hGN9gIAFEqnJ0TsSMAN+n840nf2cHZnA5/KFqHC7Q==",
              "requires": {
                "@stablelib/int": "^1.0.1"
              }
            },
            "@stablelib/bytes": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/bytes/-/bytes-1.0.1.tgz",
              "integrity": "sha512-Kre4Y4kdwuqL8BR2E9hV/R5sOrUj6NanZaZis0V6lX5yzqC3hBuVSDXUIBqQv/sCpmuWRiHLwqiT1pqqjuBXoQ=="
            },
            "@stablelib/chacha": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/chacha/-/chacha-1.0.1.tgz",
              "integrity": "sha512-Pmlrswzr0pBzDofdFuVe1q7KdsHKhhU24e8gkEwnTGOmlC7PADzLVxGdn2PoNVBBabdg0l/IfLKg6sHAbTQugg==",
              "requires": {
                "@stablelib/binary": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "@stablelib/chacha20poly1305": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/chacha20poly1305/-/chacha20poly1305-1.0.1.tgz",
              "integrity": "sha512-MmViqnqHd1ymwjOQfghRKw2R/jMIGT3wySN7cthjXCBdO+qErNPUBnRzqNpnvIwg7JBCg3LdeCZZO4de/yEhVA==",
              "requires": {
                "@stablelib/aead": "^1.0.1",
                "@stablelib/binary": "^1.0.1",
                "@stablelib/chacha": "^1.0.1",
                "@stablelib/constant-time": "^1.0.1",
                "@stablelib/poly1305": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "@stablelib/constant-time": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/constant-time/-/constant-time-1.0.1.tgz",
              "integrity": "sha512-tNOs3uD0vSJcK6z1fvef4Y+buN7DXhzHDPqRLSXUel1UfqMB1PWNsnnAezrKfEwTLpN0cGH2p9NNjs6IqeD0eg=="
            },
            "@stablelib/ed25519": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/@stablelib/ed25519/-/ed25519-1.0.3.tgz",
              "integrity": "sha512-puIMWaX9QlRsbhxfDc5i+mNPMY+0TmQEskunY1rZEBPi1acBCVQAhnsk/1Hk50DGPtVsZtAWQg4NHGlVaO9Hqg==",
              "requires": {
                "@stablelib/random": "^1.0.2",
                "@stablelib/sha512": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "@stablelib/hash": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/hash/-/hash-1.0.1.tgz",
              "integrity": "sha512-eTPJc/stDkdtOcrNMZ6mcMK1e6yBbqRBaNW55XA1jU8w/7QdnCF0CmMmOD1m7VSkBR44PWrMHU2l6r8YEQHMgg=="
            },
            "@stablelib/hkdf": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/hkdf/-/hkdf-1.0.1.tgz",
              "integrity": "sha512-SBEHYE16ZXlHuaW5RcGk533YlBj4grMeg5TooN80W3NpcHRtLZLLXvKyX0qcRFxf+BGDobJLnwkvgEwHIDBR6g==",
              "requires": {
                "@stablelib/hash": "^1.0.1",
                "@stablelib/hmac": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "@stablelib/hmac": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/hmac/-/hmac-1.0.1.tgz",
              "integrity": "sha512-V2APD9NSnhVpV/QMYgCVMIYKiYG6LSqw1S65wxVoirhU/51ACio6D4yDVSwMzuTJXWZoVHbDdINioBwKy5kVmA==",
              "requires": {
                "@stablelib/constant-time": "^1.0.1",
                "@stablelib/hash": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "@stablelib/int": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/int/-/int-1.0.1.tgz",
              "integrity": "sha512-byr69X/sDtDiIjIV6m4roLVWnNNlRGzsvxw+agj8CIEazqWGOQp2dTYgQhtyVXV9wpO6WyXRQUzLV/JRNumT2w=="
            },
            "@stablelib/keyagreement": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/keyagreement/-/keyagreement-1.0.1.tgz",
              "integrity": "sha512-VKL6xBwgJnI6l1jKrBAfn265cspaWBPAPEc62VBQrWHLqVgNRE09gQ/AnOEyKUWrrqfD+xSQ3u42gJjLDdMDQg==",
              "requires": {
                "@stablelib/bytes": "^1.0.1"
              }
            },
            "@stablelib/poly1305": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/poly1305/-/poly1305-1.0.1.tgz",
              "integrity": "sha512-1HlG3oTSuQDOhSnLwJRKeTRSAdFNVB/1djy2ZbS35rBSJ/PFqx9cf9qatinWghC2UbfOYD8AcrtbUQl8WoxabA==",
              "requires": {
                "@stablelib/constant-time": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "@stablelib/random": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@stablelib/random/-/random-1.0.2.tgz",
              "integrity": "sha512-rIsE83Xpb7clHPVRlBj8qNe5L8ISQOzjghYQm/dZ7VaM2KHYwMW5adjQjrzTZCchFnNCNhkwtnOBa9HTMJCI8w==",
              "requires": {
                "@stablelib/binary": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "@stablelib/sha256": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/sha256/-/sha256-1.0.1.tgz",
              "integrity": "sha512-GIIH3e6KH+91FqGV42Kcj71Uefd/QEe7Dy42sBTeqppXV95ggCcxLTk39bEr+lZfJmp+ghsR07J++ORkRELsBQ==",
              "requires": {
                "@stablelib/binary": "^1.0.1",
                "@stablelib/hash": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "@stablelib/sha512": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/sha512/-/sha512-1.0.1.tgz",
              "integrity": "sha512-13gl/iawHV9zvDKciLo1fQ8Bgn2Pvf7OV6amaRVKiq3pjQ3UmEpXxWiAfV8tYjUpeZroBxtyrwtdooQT/i3hzw==",
              "requires": {
                "@stablelib/binary": "^1.0.1",
                "@stablelib/hash": "^1.0.1",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "@stablelib/wipe": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@stablelib/wipe/-/wipe-1.0.1.tgz",
              "integrity": "sha512-WfqfX/eXGiAd3RJe4VU2snh/ZPwtSjLG4ynQ/vYzvghTh7dHFcI1wl+nrkWG6lGhukOxOsUHfv8dUXr58D0ayg=="
            },
            "@stablelib/x25519": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/@stablelib/x25519/-/x25519-1.0.3.tgz",
              "integrity": "sha512-KnTbKmUhPhHavzobclVJQG5kuivH+qDLpe84iRqX3CLrKp881cF160JvXJ+hjn1aMyCwYOKeIZefIH/P5cJoRw==",
              "requires": {
                "@stablelib/keyagreement": "^1.0.1",
                "@stablelib/random": "^1.0.2",
                "@stablelib/wipe": "^1.0.1"
              }
            },
            "@supabase/functions-js": {
              "version": "2.1.1",
              "resolved": "https://registry.npmjs.org/@supabase/functions-js/-/functions-js-2.1.1.tgz",
              "integrity": "sha512-bIR1Puae6W+1/MzPfYBWOG/SCWGo4B5CB7c0ZZksvliNEAzhxNBJ0UFKYINcGdGtxG8ZC+1xr3utWpNZNwnoRw==",
              "requires": {
                "cross-fetch": "^3.1.5"
              }
            },
            "@supabase/gotrue-js": {
              "version": "2.29.0",
              "resolved": "https://registry.npmjs.org/@supabase/gotrue-js/-/gotrue-js-2.29.0.tgz",
              "integrity": "sha512-QJepUxSXpgcyMhDtEusRyGtCcYSqy4wRDf3BQGqLUDaU/sRRclO07NCHW8nBqGW6KZZ6oNLfKX2AQz621dmIPw==",
              "requires": {
                "cross-fetch": "^3.1.5"
              }
            },
            "@supabase/postgrest-js": {
              "version": "1.7.0",
              "resolved": "https://registry.npmjs.org/@supabase/postgrest-js/-/postgrest-js-1.7.0.tgz",
              "integrity": "sha512-wLADHZ5jm7LljF4GigK0H2vc1wGupBY2hGYfb4fVo0UuyMftmA6tOYy+ZpMH/vPq01CUFwXGwvIke6kyqh/QDg==",
              "requires": {
                "cross-fetch": "^3.1.5"
              }
            },
            "@supabase/realtime-js": {
              "version": "2.7.3",
              "resolved": "https://registry.npmjs.org/@supabase/realtime-js/-/realtime-js-2.7.3.tgz",
              "integrity": "sha512-c7TzL81sx2kqyxsxcDduJcHL9KJdCOoKimGP6lQSqiZKX42ATlBZpWbyy9KFGFBjAP4nyopMf5JhPi2ZH9jyNw==",
              "requires": {
                "@types/phoenix": "^1.5.4",
                "@types/websocket": "^1.0.3",
                "websocket": "^1.0.34"
              }
            },
            "@supabase/storage-js": {
              "version": "2.5.1",
              "resolved": "https://registry.npmjs.org/@supabase/storage-js/-/storage-js-2.5.1.tgz",
              "integrity": "sha512-nkR0fQA9ScAtIKA3vNoPEqbZv1k5B5HVRYEvRWdlP6mUpFphM9TwPL2jZ/ztNGMTG5xT6SrHr+H7Ykz8qzbhjw==",
              "requires": {
                "cross-fetch": "^3.1.5"
              }
            },
            "@supabase/supabase-js": {
              "version": "2.25.0",
              "resolved": "https://registry.npmjs.org/@supabase/supabase-js/-/supabase-js-2.25.0.tgz",
              "integrity": "sha512-AEh0suSrjfpQCOhY7hLsgX6gr8XEUWshVkTq9IODiHTnAR6NHiEQ865LTeWu8gqCDf2XH1n20JcSmovIe3Xixw==",
              "requires": {
                "@supabase/functions-js": "^2.1.0",
                "@supabase/gotrue-js": "^2.26.0",
                "@supabase/postgrest-js": "^1.7.0",
                "@supabase/realtime-js": "^2.7.3",
                "@supabase/storage-js": "^2.5.1",
                "cross-fetch": "^3.1.5"
              }
            },
            "@swc/helpers": {
              "version": "0.5.2",
              "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.2.tgz",
              "integrity": "sha512-E4KcWTpoLHqwPHLxidpOqQbcrZVgi0rsmmZXUle1jXmJfuIf/UWpczUJ7MZZ5tlxytgJXyp0w4PGkkeLiuIdZw==",
              "requires": {
                "tslib": "^2.4.0"
              }
            },
            "@tanstack/query-core": {
              "version": "4.29.7",
              "resolved": "https://registry.npmjs.org/@tanstack/query-core/-/query-core-4.29.7.tgz",
              "integrity": "sha512-GXG4b5hV2Loir+h2G+RXhJdoZhJLnrBWsuLB2r0qBRyhWuXq9w/dWxzvpP89H0UARlH6Mr9DiVj4SMtpkF/aUA=="
            },
            "@tanstack/query-persist-client-core": {
              "version": "4.29.7",
              "resolved": "https://registry.npmjs.org/@tanstack/query-persist-client-core/-/query-persist-client-core-4.29.7.tgz",
              "integrity": "sha512-/QahvSq9/f8hetCsCd9MaOy6fAoPn0YDGDcl6TTobqdr9kHMgrM9laP9yKJFg2hm5/jIsrCMDO/iCnxBiUhrqw==",
              "requires": {
                "@tanstack/query-core": "4.29.7"
              }
            },
            "@tanstack/query-sync-storage-persister": {
              "version": "4.29.7",
              "resolved": "https://registry.npmjs.org/@tanstack/query-sync-storage-persister/-/query-sync-storage-persister-4.29.7.tgz",
              "integrity": "sha512-XWys8hez8eFIb9+oYNs0Jumfjz8afEwN52VSrHJEWg7gZO/Y/8ziI80cNlaDNB+60t7s3TaspKXT5z8DNFsCkQ==",
              "requires": {
                "@tanstack/query-persist-client-core": "4.29.7"
              }
            },
            "@tanstack/react-query": {
              "version": "4.29.7",
              "resolved": "https://registry.npmjs.org/@tanstack/react-query/-/react-query-4.29.7.tgz",
              "integrity": "sha512-ijBWEzAIo09fB1yd22slRZzprrZ5zMdWYzBnCg5qiXuFbH78uGN1qtGz8+Ed4MuhaPaYSD+hykn+QEKtQviEtg==",
              "requires": {
                "@tanstack/query-core": "4.29.7",
                "use-sync-external-store": "^1.2.0"
              }
            },
            "@tanstack/react-query-persist-client": {
              "version": "4.29.7",
              "resolved": "https://registry.npmjs.org/@tanstack/react-query-persist-client/-/react-query-persist-client-4.29.7.tgz",
              "integrity": "sha512-KYUeESnthjjcfakpAei9Cz5gsIm1uDAVHrKcIAoARQwksk4j0KAo9ieExoIhL9v4mpTOlE9GsuZ/y06ANmaVaQ==",
              "requires": {
                "@tanstack/query-persist-client-core": "4.29.7"
              }
            },
            "@types/accepts": {
              "version": "1.3.5",
              "resolved": "https://registry.npmjs.org/@types/accepts/-/accepts-1.3.5.tgz",
              "integrity": "sha512-jOdnI/3qTpHABjM5cx1Hc0sKsPoYCp+DP/GJRGtDlPd7fiV9oXGGIcjW/ZOxLIvjGz8MA+uMZI9metHlgqbgwQ==",
              "requires": {
                "@types/node": "*"
              }
            },
            "@types/body-parser": {
              "version": "1.19.2",
              "resolved": "https://registry.npmjs.org/@types/body-parser/-/body-parser-1.19.2.tgz",
              "integrity": "sha512-ALYone6pm6QmwZoAgeyNksccT9Q4AWZQ6PvfwR37GT6r6FWUPguq6sUmNGSMV2Wr761oQoBxwGGa6DR5o1DC9g==",
              "requires": {
                "@types/connect": "*",
                "@types/node": "*"
              }
            },
            "@types/connect": {
              "version": "3.4.35",
              "resolved": "https://registry.npmjs.org/@types/connect/-/connect-3.4.35.tgz",
              "integrity": "sha512-cdeYyv4KWoEgpBISTxWvqYsVy444DOqehiF3fM3ne10AmJ62RSyNkUnxMJXHQWRQQX2eR94m5y1IZyDwBjV9FQ==",
              "requires": {
                "@types/node": "*"
              }
            },
            "@types/content-disposition": {
              "version": "0.5.5",
              "resolved": "https://registry.npmjs.org/@types/content-disposition/-/content-disposition-0.5.5.tgz",
              "integrity": "sha512-v6LCdKfK6BwcqMo+wYW05rLS12S0ZO0Fl4w1h4aaZMD7bqT3gVUns6FvLJKGZHQmYn3SX55JWGpziwJRwVgutA=="
            },
            "@types/cookie": {
              "version": "0.5.1",
              "resolved": "https://registry.npmjs.org/@types/cookie/-/cookie-0.5.1.tgz",
              "integrity": "sha512-COUnqfB2+ckwXXSFInsFdOAWQzCCx+a5hq2ruyj+Vjund94RJQd4LG2u9hnvJrTgunKAaax7ancBYlDrNYxA0g=="
            },
            "@types/cookies": {
              "version": "0.7.7",
              "resolved": "https://registry.npmjs.org/@types/cookies/-/cookies-0.7.7.tgz",
              "integrity": "sha512-h7BcvPUogWbKCzBR2lY4oqaZbO3jXZksexYJVFvkrFeLgbZjQkU4x8pRq6eg2MHXQhY0McQdqmmsxRWlVAHooA==",
              "requires": {
                "@types/connect": "*",
                "@types/express": "*",
                "@types/keygrip": "*",
                "@types/node": "*"
              }
            },
            "@types/debug": {
              "version": "4.1.8",
              "resolved": "https://registry.npmjs.org/@types/debug/-/debug-4.1.8.tgz",
              "integrity": "sha512-/vPO1EPOs306Cvhwv7KfVfYvOJqA/S/AXjaHQiJboCZzcNDb+TIJFN9/2C9DZ//ijSKWioNyUxD792QmDJ+HKQ==",
              "requires": {
                "@types/ms": "*"
              }
            },
            "@types/express": {
              "version": "4.17.17",
              "resolved": "https://registry.npmjs.org/@types/express/-/express-4.17.17.tgz",
              "integrity": "sha512-Q4FmmuLGBG58btUnfS1c1r/NQdlp3DMfGDGig8WhfpA2YRUtEkxAjkZb0yvplJGYdF1fsQ81iMDcH24sSCNC/Q==",
              "requires": {
                "@types/body-parser": "*",
                "@types/express-serve-static-core": "^4.17.33",
                "@types/qs": "*",
                "@types/serve-static": "*"
              }
            },
            "@types/express-serve-static-core": {
              "version": "4.17.35",
              "resolved": "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-4.17.35.tgz",
              "integrity": "sha512-wALWQwrgiB2AWTT91CB62b6Yt0sNHpznUXeZEcnPU3DRdlDIz74x8Qg1UUYKSVFi+va5vKOLYRBI1bRKiLLKIg==",
              "requires": {
                "@types/node": "*",
                "@types/qs": "*",
                "@types/range-parser": "*",
                "@types/send": "*"
              }
            },
            "@types/hoist-non-react-statics": {
              "version": "3.3.1",
              "resolved": "https://registry.npmjs.org/@types/hoist-non-react-statics/-/hoist-non-react-statics-3.3.1.tgz",
              "integrity": "sha512-iMIqiko6ooLrTh1joXodJK5X9xeEALT1kM5G3ZLhD3hszxBdIEd5C75U834D9mLcINgD4OyZf5uQXjkuYydWvA==",
              "requires": {
                "@types/react": "*",
                "hoist-non-react-statics": "^3.3.0"
              }
            },
            "@types/http-assert": {
              "version": "1.5.3",
              "resolved": "https://registry.npmjs.org/@types/http-assert/-/http-assert-1.5.3.tgz",
              "integrity": "sha512-FyAOrDuQmBi8/or3ns4rwPno7/9tJTijVW6aQQjK02+kOQ8zmoNg2XJtAuQhvQcy1ASJq38wirX5//9J1EqoUA=="
            },
            "@types/http-errors": {
              "version": "2.0.1",
              "resolved": "https://registry.npmjs.org/@types/http-errors/-/http-errors-2.0.1.tgz",
              "integrity": "sha512-/K3ds8TRAfBvi5vfjuz8y6+GiAYBZ0x4tXv1Av6CWBWn0IlADc+ZX9pMq7oU0fNQPnBwIZl3rmeLp6SBApbxSQ=="
            },
            "@types/keygrip": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@types/keygrip/-/keygrip-1.0.2.tgz",
              "integrity": "sha512-GJhpTepz2udxGexqos8wgaBx4I/zWIDPh/KOGEwAqtuGDkOUJu5eFvwmdBX4AmB8Odsr+9pHCQqiAqDL/yKMKw=="
            },
            "@types/koa": {
              "version": "2.13.6",
              "resolved": "https://registry.npmjs.org/@types/koa/-/koa-2.13.6.tgz",
              "integrity": "sha512-diYUfp/GqfWBAiwxHtYJ/FQYIXhlEhlyaU7lB/bWQrx4Il9lCET5UwpFy3StOAohfsxxvEQ11qIJgT1j2tfBvw==",
              "requires": {
                "@types/accepts": "*",
                "@types/content-disposition": "*",
                "@types/cookies": "*",
                "@types/http-assert": "*",
                "@types/http-errors": "*",
                "@types/keygrip": "*",
                "@types/koa-compose": "*",
                "@types/node": "*"
              }
            },
            "@types/koa-compose": {
              "version": "3.2.5",
              "resolved": "https://registry.npmjs.org/@types/koa-compose/-/koa-compose-3.2.5.tgz",
              "integrity": "sha512-B8nG/OoE1ORZqCkBVsup/AKcvjdgoHnfi4pZMn5UwAPCbhk/96xyv284eBYW8JlQbQ7zDmnpFr68I/40mFoIBQ==",
              "requires": {
                "@types/koa": "*"
              }
            },
            "@types/mime": {
              "version": "1.3.2",
              "resolved": "https://registry.npmjs.org/@types/mime/-/mime-1.3.2.tgz",
              "integrity": "sha512-YATxVxgRqNH6nHEIsvg6k2Boc1JHI9ZbH5iWFFv/MTkchz3b1ieGDa5T0a9RznNdI0KhVbdbWSN+KWWrQZRxTw=="
            },
            "@types/ms": {
              "version": "0.7.31",
              "resolved": "https://registry.npmjs.org/@types/ms/-/ms-0.7.31.tgz",
              "integrity": "sha512-iiUgKzV9AuaEkZqkOLDIvlQiL6ltuZd9tGcW3gwpnX8JbuiuhFlEGmmFXEXkN50Cvq7Os88IY2v0dkDqXYWVgA=="
            },
            "@types/node": {
              "version": "20.2.4",
              "resolved": "https://registry.npmjs.org/@types/node/-/node-20.2.4.tgz",
              "integrity": "sha512-ni5f8Xlf4PwnT/Z3f0HURc3ZSw8UyrqMqmM3L5ysa7VjHu8c3FOmIo1nKCcLrV/OAmtf3N4kFna/aJqxsfEtnA=="
            },
            "@types/phoenix": {
              "version": "1.6.0",
              "resolved": "https://registry.npmjs.org/@types/phoenix/-/phoenix-1.6.0.tgz",
              "integrity": "sha512-qwfpsHmFuhAS/dVd4uBIraMxRd56vwBUYQGZ6GpXnFuM2XMRFJbIyruFKKlW2daQliuYZwe0qfn/UjFCDKic5g=="
            },
            "@types/prop-types": {
              "version": "15.7.5",
              "resolved": "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.5.tgz",
              "integrity": "sha512-JCB8C6SnDoQf0cNycqd/35A7MjcnK+ZTqE7judS6o7utxUCg6imJg3QK2qzHKszlTjcj2cn+NwMB2i96ubpj7w=="
            },
            "@types/qs": {
              "version": "6.9.7",
              "resolved": "https://registry.npmjs.org/@types/qs/-/qs-6.9.7.tgz",
              "integrity": "sha512-FGa1F62FT09qcrueBA6qYTrJPVDzah9a+493+o2PCXsesWHIn27G98TsSMs3WPNbZIEj4+VJf6saSFpvD+3Zsw=="
            },
            "@types/range-parser": {
              "version": "1.2.4",
              "resolved": "https://registry.npmjs.org/@types/range-parser/-/range-parser-1.2.4.tgz",
              "integrity": "sha512-EEhsLsD6UsDM1yFhAvy0Cjr6VwmpMWqFBCb9w07wVugF7w9nfajxLuVmngTIpgS6svCnm6Vaw+MZhoDCKnOfsw=="
            },
            "@types/react": {
              "version": "18.2.20",
              "resolved": "https://registry.npmjs.org/@types/react/-/react-18.2.20.tgz",
              "integrity": "sha512-WKNtmsLWJM/3D5mG4U84cysVY31ivmyw85dE84fOCk5Hx78wezB/XEjVPWl2JTZ5FkEeaTJf+VgUAUn3PE7Isw==",
              "requires": {
                "@types/prop-types": "*",
                "@types/scheduler": "*",
                "csstype": "^3.0.2"
              }
            },
            "@types/scheduler": {
              "version": "0.16.3",
              "resolved": "https://registry.npmjs.org/@types/scheduler/-/scheduler-0.16.3.tgz",
              "integrity": "sha512-5cJ8CB4yAx7BH1oMvdU0Jh9lrEXyPkar6F9G/ERswkCuvP4KQZfZkSjcMbAICCpQTN4OuZn8tz0HiKv9TGZgrQ=="
            },
            "@types/send": {
              "version": "0.17.1",
              "resolved": "https://registry.npmjs.org/@types/send/-/send-0.17.1.tgz",
              "integrity": "sha512-Cwo8LE/0rnvX7kIIa3QHCkcuF21c05Ayb0ZfxPiv0W8VRiZiNW/WuRupHKpqqGVGf7SUA44QSOUKaEd9lIrd/Q==",
              "requires": {
                "@types/mime": "^1",
                "@types/node": "*"
              }
            },
            "@types/serve-static": {
              "version": "1.15.1",
              "resolved": "https://registry.npmjs.org/@types/serve-static/-/serve-static-1.15.1.tgz",
              "integrity": "sha512-NUo5XNiAdULrJENtJXZZ3fHtfMolzZwczzBbnAeBbqBwG+LaG6YaJtuwzwGSQZ2wsCrxjEhNNjAkKigy3n8teQ==",
              "requires": {
                "@types/mime": "*",
                "@types/node": "*"
              }
            },
            "@types/trusted-types": {
              "version": "2.0.3",
              "resolved": "https://registry.npmjs.org/@types/trusted-types/-/trusted-types-2.0.3.tgz",
              "integrity": "sha512-NfQ4gyz38SL8sDNrSixxU2Os1a5xcdFxipAFxYEuLUlvU2uDwS4NUpsImcf1//SlWItCVMMLiylsxbmNMToV/g=="
            },
            "@types/use-sync-external-store": {
              "version": "0.0.3",
              "resolved": "https://registry.npmjs.org/@types/use-sync-external-store/-/use-sync-external-store-0.0.3.tgz",
              "integrity": "sha512-EwmlvuaxPNej9+T4v5AuBPJa2x2UOJVdjCtDHgcDqitUeOtjnJKJ+apYjVcAoBEMjKW1VVFGZLUb5+qqa09XFA=="
            },
            "@types/websocket": {
              "version": "1.0.5",
              "resolved": "https://registry.npmjs.org/@types/websocket/-/websocket-1.0.5.tgz",
              "integrity": "sha512-NbsqiNX9CnEfC1Z0Vf4mE1SgAJ07JnRYcNex7AJ9zAVzmiGHmjKFEk7O4TJIsgv2B1sLEb6owKFZrACwdYngsQ==",
              "requires": {
                "@types/node": "*"
              }
            },
            "@types/ws": {
              "version": "7.4.7",
              "resolved": "https://registry.npmjs.org/@types/ws/-/ws-7.4.7.tgz",
              "integrity": "sha512-JQbbmxZTZehdc2iszGKs5oC3NFnjeay7mtAWrdt7qNtAVK0g19muApzAy4bm9byz79xa2ZnO/BOBC2R8RC5Lww==",
              "requires": {
                "@types/node": "*"
              }
            },
            "@vanilla-extract/css": {
              "version": "1.9.1",
              "resolved": "https://registry.npmjs.org/@vanilla-extract/css/-/css-1.9.1.tgz",
              "integrity": "sha512-pu2SFiff5jRhPwvGoj8cM5l/qIyLvigOmy22ss5DGjwV5pJYezRjDLxWumi2luIwioMWvh9EozCjyfH8nq+7fQ==",
              "requires": {
                "@emotion/hash": "^0.8.0",
                "@vanilla-extract/private": "^1.0.3",
                "ahocorasick": "1.0.2",
                "chalk": "^4.1.1",
                "css-what": "^5.0.1",
                "cssesc": "^3.0.0",
                "csstype": "^3.0.7",
                "deep-object-diff": "^1.1.0",
                "deepmerge": "^4.2.2",
                "media-query-parser": "^2.0.2",
                "outdent": "^0.8.0"
              },
              "dependencies": {
                "chalk": {
                  "version": "4.1.2",
                  "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
                  "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
                  "requires": {
                    "ansi-styles": "^4.1.0",
                    "supports-color": "^7.1.0"
                  }
                },
                "supports-color": {
                  "version": "7.2.0",
                  "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
                  "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
                  "requires": {
                    "has-flag": "^4.0.0"
                  }
                }
              }
            },
            "@vanilla-extract/dynamic": {
              "version": "2.0.2",
              "resolved": "https://registry.npmjs.org/@vanilla-extract/dynamic/-/dynamic-2.0.2.tgz",
              "integrity": "sha512-U4nKaEQ8Kuz+exXEr51DUpyaOuzo24/S/k1YbDPQR06cYcNjQqvwFRnwWtZ+9ImocqM1wTKtzrdUgSTtLGIwAg==",
              "requires": {
                "@vanilla-extract/private": "^1.0.3"
              }
            },
            "@vanilla-extract/private": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/@vanilla-extract/private/-/private-1.0.3.tgz",
              "integrity": "sha512-17kVyLq3ePTKOkveHxXuIJZtGYs+cSoev7BlP+Lf4916qfDhk/HBjvlYDe8egrea7LNPHKwSZJK/bzZC+Q6AwQ=="
            },
            "@vanilla-extract/sprinkles": {
              "version": "1.5.0",
              "resolved": "https://registry.npmjs.org/@vanilla-extract/sprinkles/-/sprinkles-1.5.0.tgz",
              "integrity": "sha512-W58f2Rzz5lLmk0jbhgStVlZl5wEiPB1Ur3fRvUaBM+MrifZ3qskmFq/CiH//fEYeG5Dh9vF1qRviMMH46cX9Nw==",
              "requires": {}
            },
            "@wagmi/chains": {
              "version": "0.3.1",
              "resolved": "https://registry.npmjs.org/@wagmi/chains/-/chains-0.3.1.tgz",
              "integrity": "sha512-NN5qziBLFeXnx0+3ywdiKKXUSW4H73Wc1jRrygl9GKXVPawU0GBMudwXUfV7VOu6E9vmG7Arj0pVsEwq63b2Ew==",
              "requires": {}
            },
            "@wagmi/connectors": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/@wagmi/connectors/-/connectors-2.0.0.tgz",
              "integrity": "sha512-W7GFLdLaJiqISm65pwoe0DePLjL3klyugCwQwlunFXHNHvYSsoWkzDjb1H5XJwx9g+dTVNwJVg8TE7WfaUdilg==",
              "requires": {
                "@coinbase/wallet-sdk": "^3.6.6",
                "@ledgerhq/connect-kit-loader": "^1.0.1",
                "@safe-global/safe-apps-provider": "^0.15.2",
                "@safe-global/safe-apps-sdk": "^7.9.0",
                "@walletconnect/ethereum-provider": "2.7.4",
                "@walletconnect/legacy-provider": "^2.0.0",
                "@web3modal/standalone": "^2.4.1",
                "abitype": "0.8.1",
                "eventemitter3": "^4.0.7"
              },
              "dependencies": {
                "abitype": {
                  "version": "0.8.1",
                  "resolved": "https://registry.npmjs.org/abitype/-/abitype-0.8.1.tgz",
                  "integrity": "sha512-n8Di6AWb3i7HnEkBvecU6pG0a5nj5YwMvdAIwPLsQK95ulRy/XS113s/RXvSfTX1iOQJYFrEO3/q4SMWu7OwTA==",
                  "requires": {}
                }
              }
            },
            "@wagmi/core": {
              "version": "1.0.7",
              "resolved": "https://registry.npmjs.org/@wagmi/core/-/core-1.0.7.tgz",
              "integrity": "sha512-8TL/OYqHfJa4B79YUf/PVhnPH8Df7o8FoNQ0KfldaoT8d471SBZumzRr5pyNvnBxqvAnn11ZGaQThJs5WrLgrg==",
              "requires": {
                "@wagmi/chains": "0.3.1",
                "@wagmi/connectors": "2.0.0",
                "abitype": "0.8.1",
                "eventemitter3": "^4.0.7",
                "zustand": "^4.3.1"
              },
              "dependencies": {
                "abitype": {
                  "version": "0.8.1",
                  "resolved": "https://registry.npmjs.org/abitype/-/abitype-0.8.1.tgz",
                  "integrity": "sha512-n8Di6AWb3i7HnEkBvecU6pG0a5nj5YwMvdAIwPLsQK95ulRy/XS113s/RXvSfTX1iOQJYFrEO3/q4SMWu7OwTA==",
                  "requires": {}
                }
              }
            },
            "@walletconnect/core": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/@walletconnect/core/-/core-2.7.4.tgz",
              "integrity": "sha512-nDJJZALZJI8l8JvjwZE4UmUzDzQBnTTJlQa/rc5MoGYtir0hfsQEl3sPkPcXbkkW5q+cHiynXsDcgM4740fmNQ==",
              "requires": {
                "@walletconnect/heartbeat": "1.2.1",
                "@walletconnect/jsonrpc-provider": "^1.0.12",
                "@walletconnect/jsonrpc-utils": "^1.0.7",
                "@walletconnect/jsonrpc-ws-connection": "^1.0.11",
                "@walletconnect/keyvaluestorage": "^1.0.2",
                "@walletconnect/logger": "^2.0.1",
                "@walletconnect/relay-api": "^1.0.9",
                "@walletconnect/relay-auth": "^1.0.4",
                "@walletconnect/safe-json": "^1.0.2",
                "@walletconnect/time": "^1.0.2",
                "@walletconnect/types": "2.7.4",
                "@walletconnect/utils": "2.7.4",
                "events": "^3.3.0",
                "lodash.isequal": "4.5.0",
                "uint8arrays": "^3.1.0"
              }
            },
            "@walletconnect/crypto": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/@walletconnect/crypto/-/crypto-1.0.3.tgz",
              "integrity": "sha512-+2jdORD7XQs76I2Odgr3wwrtyuLUXD/kprNVsjWRhhhdO9Mt6WqVzOPu0/t7OHSmgal8k7SoBQzUc5hu/8zL/g==",
              "requires": {
                "@walletconnect/encoding": "^1.0.2",
                "@walletconnect/environment": "^1.0.1",
                "@walletconnect/randombytes": "^1.0.3",
                "aes-js": "^3.1.2",
                "hash.js": "^1.1.7",
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/encoding": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@walletconnect/encoding/-/encoding-1.0.2.tgz",
              "integrity": "sha512-CrwSBrjqJ7rpGQcTL3kU+Ief+Bcuu9PH6JLOb+wM6NITX1GTxR/MfNwnQfhLKK6xpRAyj2/nM04OOH6wS8Imag==",
              "requires": {
                "is-typedarray": "1.0.0",
                "tslib": "1.14.1",
                "typedarray-to-buffer": "3.1.5"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/environment": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@walletconnect/environment/-/environment-1.0.1.tgz",
              "integrity": "sha512-T426LLZtHj8e8rYnKfzsw1aG6+M0BT1ZxayMdv/p8yM0MU+eJDISqNY3/bccxRr4LrF9csq02Rhqt08Ibl0VRg==",
              "requires": {
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/ethereum-provider": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/@walletconnect/ethereum-provider/-/ethereum-provider-2.7.4.tgz",
              "integrity": "sha512-R5hcByY9zIsvyTHFUS+3xqtzs2REezED4tZFyXk0snJjWlnlL2EdeHaCjr5n+SIZDin4CMj1EAFC0ZrM4KoA4Q==",
              "requires": {
                "@walletconnect/jsonrpc-http-connection": "^1.0.4",
                "@walletconnect/jsonrpc-provider": "^1.0.11",
                "@walletconnect/jsonrpc-types": "^1.0.2",
                "@walletconnect/jsonrpc-utils": "^1.0.7",
                "@walletconnect/sign-client": "2.7.4",
                "@walletconnect/types": "2.7.4",
                "@walletconnect/universal-provider": "2.7.4",
                "@walletconnect/utils": "2.7.4",
                "events": "^3.3.0"
              }
            },
            "@walletconnect/events": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@walletconnect/events/-/events-1.0.1.tgz",
              "integrity": "sha512-NPTqaoi0oPBVNuLv7qPaJazmGHs5JGyO8eEAk5VGKmJzDR7AHzD4k6ilox5kxk1iwiOnFopBOOMLs86Oa76HpQ==",
              "requires": {
                "keyvaluestorage-interface": "^1.0.0",
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/heartbeat": {
              "version": "1.2.1",
              "resolved": "https://registry.npmjs.org/@walletconnect/heartbeat/-/heartbeat-1.2.1.tgz",
              "integrity": "sha512-yVzws616xsDLJxuG/28FqtZ5rzrTA4gUjdEMTbWB5Y8V1XHRmqq4efAxCw5ie7WjbXFSUyBHaWlMR+2/CpQC5Q==",
              "requires": {
                "@walletconnect/events": "^1.0.1",
                "@walletconnect/time": "^1.0.2",
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/jsonrpc-http-connection": {
              "version": "1.0.7",
              "resolved": "https://registry.npmjs.org/@walletconnect/jsonrpc-http-connection/-/jsonrpc-http-connection-1.0.7.tgz",
              "integrity": "sha512-qlfh8fCfu8LOM9JRR9KE0s0wxP6ZG9/Jom8M0qsoIQeKF3Ni0FyV4V1qy/cc7nfI46SLQLSl4tgWSfLiE1swyQ==",
              "requires": {
                "@walletconnect/jsonrpc-utils": "^1.0.6",
                "@walletconnect/safe-json": "^1.0.1",
                "cross-fetch": "^3.1.4",
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/jsonrpc-provider": {
              "version": "1.0.13",
              "resolved": "https://registry.npmjs.org/@walletconnect/jsonrpc-provider/-/jsonrpc-provider-1.0.13.tgz",
              "integrity": "sha512-K73EpThqHnSR26gOyNEL+acEex3P7VWZe6KE12ZwKzAt2H4e5gldZHbjsu2QR9cLeJ8AXuO7kEMOIcRv1QEc7g==",
              "requires": {
                "@walletconnect/jsonrpc-utils": "^1.0.8",
                "@walletconnect/safe-json": "^1.0.2",
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/jsonrpc-types": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/@walletconnect/jsonrpc-types/-/jsonrpc-types-1.0.3.tgz",
              "integrity": "sha512-iIQ8hboBl3o5ufmJ8cuduGad0CQm3ZlsHtujv9Eu16xq89q+BG7Nh5VLxxUgmtpnrePgFkTwXirCTkwJH1v+Yw==",
              "requires": {
                "keyvaluestorage-interface": "^1.0.0",
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/jsonrpc-utils": {
              "version": "1.0.8",
              "resolved": "https://registry.npmjs.org/@walletconnect/jsonrpc-utils/-/jsonrpc-utils-1.0.8.tgz",
              "integrity": "sha512-vdeb03bD8VzJUL6ZtzRYsFMq1eZQcM3EAzT0a3st59dyLfJ0wq+tKMpmGH7HlB7waD858UWgfIcudbPFsbzVdw==",
              "requires": {
                "@walletconnect/environment": "^1.0.1",
                "@walletconnect/jsonrpc-types": "^1.0.3",
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/jsonrpc-ws-connection": {
              "version": "1.0.11",
              "resolved": "https://registry.npmjs.org/@walletconnect/jsonrpc-ws-connection/-/jsonrpc-ws-connection-1.0.11.tgz",
              "integrity": "sha512-TiFJ6saasKXD+PwGkm5ZGSw0837nc6EeFmurSPgIT/NofnOV4Tv7CVJqGQN0rQYoJUSYu21cwHNYaFkzNpUN+w==",
              "requires": {
                "@walletconnect/jsonrpc-utils": "^1.0.6",
                "@walletconnect/safe-json": "^1.0.2",
                "events": "^3.3.0",
                "tslib": "1.14.1",
                "ws": "^7.5.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                },
                "ws": {
                  "version": "7.5.9",
                  "resolved": "https://registry.npmjs.org/ws/-/ws-7.5.9.tgz",
                  "integrity": "sha512-F+P9Jil7UiSKSkppIiD94dN07AwvFixvLIj1Og1Rl9GGMuNipJnV9JzjD6XuqmAeiswGvUmNLjr5cFuXwNS77Q==",
                  "requires": {}
                }
              }
            },
            "@walletconnect/keyvaluestorage": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@walletconnect/keyvaluestorage/-/keyvaluestorage-1.0.2.tgz",
              "integrity": "sha512-U/nNG+VLWoPFdwwKx0oliT4ziKQCEoQ27L5Hhw8YOFGA2Po9A9pULUYNWhDgHkrb0gYDNt//X7wABcEWWBd3FQ==",
              "requires": {
                "safe-json-utils": "^1.1.1",
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/legacy-client": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/@walletconnect/legacy-client/-/legacy-client-2.0.0.tgz",
              "integrity": "sha512-v5L7rYk9loVnfvUf0mF+76bUPFaU5/Vh7mzL6/950CD/yoGdzYZ3Kj+L7mkC6HPMEGeQsBP1+sqBuiVGZ/aODA==",
              "requires": {
                "@walletconnect/crypto": "^1.0.3",
                "@walletconnect/encoding": "^1.0.2",
                "@walletconnect/jsonrpc-utils": "^1.0.4",
                "@walletconnect/legacy-types": "^2.0.0",
                "@walletconnect/legacy-utils": "^2.0.0",
                "@walletconnect/safe-json": "^1.0.1",
                "@walletconnect/window-getters": "^1.0.1",
                "@walletconnect/window-metadata": "^1.0.1",
                "detect-browser": "^5.3.0",
                "query-string": "^6.13.5"
              }
            },
            "@walletconnect/legacy-modal": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/@walletconnect/legacy-modal/-/legacy-modal-2.0.0.tgz",
              "integrity": "sha512-jckNd8lMhm4X7dX9TDdxM3bXKJnaqkRs6K2Mo5j6GmbIF9Eyx40jZ5+q457RVxvM6ciZEDT5s1wBHWdWoOo+9Q==",
              "requires": {
                "@walletconnect/legacy-types": "^2.0.0",
                "@walletconnect/legacy-utils": "^2.0.0",
                "copy-to-clipboard": "^3.3.3",
                "preact": "^10.12.0",
                "qrcode": "^1.5.1"
              },
              "dependencies": {
                "qrcode": {
                  "version": "1.5.3",
                  "resolved": "https://registry.npmjs.org/qrcode/-/qrcode-1.5.3.tgz",
                  "integrity": "sha512-puyri6ApkEHYiVl4CFzo1tDkAZ+ATcnbJrJ6RiBM1Fhctdn/ix9MTE3hRph33omisEbC/2fcfemsseiKgBPKZg==",
                  "requires": {
                    "dijkstrajs": "^1.0.1",
                    "encode-utf8": "^1.0.3",
                    "pngjs": "^5.0.0",
                    "yargs": "^15.3.1"
                  }
                }
              }
            },
            "@walletconnect/legacy-provider": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/@walletconnect/legacy-provider/-/legacy-provider-2.0.0.tgz",
              "integrity": "sha512-A8xPebMI1A+50HbWwTpFCbwP7G+1NGKdTKyg8BUUg3h3Y9JucpC1W6w/x0v1Xw7qFEqQnz74LoIN/A3ytH9xrQ==",
              "requires": {
                "@walletconnect/jsonrpc-http-connection": "^1.0.4",
                "@walletconnect/jsonrpc-provider": "^1.0.6",
                "@walletconnect/legacy-client": "^2.0.0",
                "@walletconnect/legacy-modal": "^2.0.0",
                "@walletconnect/legacy-types": "^2.0.0",
                "@walletconnect/legacy-utils": "^2.0.0"
              }
            },
            "@walletconnect/legacy-types": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/@walletconnect/legacy-types/-/legacy-types-2.0.0.tgz",
              "integrity": "sha512-sOVrA7HUdbI1OwKyPOQU0/DdvTSVFlsXWpAk2K2WvP2erTkBWPMTJq6cv2BmKdoJ3p6gLApT7sd+jHi3OF71uw==",
              "requires": {
                "@walletconnect/jsonrpc-types": "^1.0.2"
              }
            },
            "@walletconnect/legacy-utils": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/@walletconnect/legacy-utils/-/legacy-utils-2.0.0.tgz",
              "integrity": "sha512-CPWxSVVXw0kgNCxvU126g4GiV3mzXmC8IPJ15twE46aJ1FX+RHEIfAzFMFz2F2+fEhBxL63A7dwNQKDXorRPcQ==",
              "requires": {
                "@walletconnect/encoding": "^1.0.2",
                "@walletconnect/jsonrpc-utils": "^1.0.4",
                "@walletconnect/legacy-types": "^2.0.0",
                "@walletconnect/safe-json": "^1.0.1",
                "@walletconnect/window-getters": "^1.0.1",
                "@walletconnect/window-metadata": "^1.0.1",
                "detect-browser": "^5.3.0",
                "query-string": "^6.13.5"
              }
            },
            "@walletconnect/logger": {
              "version": "2.0.1",
              "resolved": "https://registry.npmjs.org/@walletconnect/logger/-/logger-2.0.1.tgz",
              "integrity": "sha512-SsTKdsgWm+oDTBeNE/zHxxr5eJfZmE9/5yp/Ku+zJtcTAjELb3DXueWkDXmE9h8uHIbJzIb5wj5lPdzyrjT6hQ==",
              "requires": {
                "pino": "7.11.0",
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/randombytes": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/@walletconnect/randombytes/-/randombytes-1.0.3.tgz",
              "integrity": "sha512-35lpzxcHFbTN3ABefC9W+uBpNZl1GC4Wpx0ed30gibfO/y9oLdy1NznbV96HARQKSBV9J9M/rrtIvf6a23jfYw==",
              "requires": {
                "@walletconnect/encoding": "^1.0.2",
                "@walletconnect/environment": "^1.0.1",
                "randombytes": "^2.1.0",
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/relay-api": {
              "version": "1.0.9",
              "resolved": "https://registry.npmjs.org/@walletconnect/relay-api/-/relay-api-1.0.9.tgz",
              "integrity": "sha512-Q3+rylJOqRkO1D9Su0DPE3mmznbAalYapJ9qmzDgK28mYF9alcP3UwG/og5V7l7CFOqzCLi7B8BvcBUrpDj0Rg==",
              "requires": {
                "@walletconnect/jsonrpc-types": "^1.0.2",
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/relay-auth": {
              "version": "1.0.4",
              "resolved": "https://registry.npmjs.org/@walletconnect/relay-auth/-/relay-auth-1.0.4.tgz",
              "integrity": "sha512-kKJcS6+WxYq5kshpPaxGHdwf5y98ZwbfuS4EE/NkQzqrDFm5Cj+dP8LofzWvjrrLkZq7Afy7WrQMXdLy8Sx7HQ==",
              "requires": {
                "@stablelib/ed25519": "^1.0.2",
                "@stablelib/random": "^1.0.1",
                "@walletconnect/safe-json": "^1.0.1",
                "@walletconnect/time": "^1.0.2",
                "tslib": "1.14.1",
                "uint8arrays": "^3.0.0"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/safe-json": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@walletconnect/safe-json/-/safe-json-1.0.2.tgz",
              "integrity": "sha512-Ogb7I27kZ3LPC3ibn8ldyUr5544t3/STow9+lzz7Sfo808YD7SBWk7SAsdBFlYgP2zDRy2hS3sKRcuSRM0OTmA==",
              "requires": {
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/sign-client": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/@walletconnect/sign-client/-/sign-client-2.7.4.tgz",
              "integrity": "sha512-hZoCB51GB4u32yxzYnxp8dpzXgo6E7ZWUVOgnihmoMPjgJahPtvB/Ip9jYxI3fuV+ZPQYNlxQgEvR9X+2fLz+g==",
              "requires": {
                "@walletconnect/core": "2.7.4",
                "@walletconnect/events": "^1.0.1",
                "@walletconnect/heartbeat": "1.2.1",
                "@walletconnect/jsonrpc-utils": "^1.0.7",
                "@walletconnect/logger": "^2.0.1",
                "@walletconnect/time": "^1.0.2",
                "@walletconnect/types": "2.7.4",
                "@walletconnect/utils": "2.7.4",
                "events": "^3.3.0"
              }
            },
            "@walletconnect/time": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/@walletconnect/time/-/time-1.0.2.tgz",
              "integrity": "sha512-uzdd9woDcJ1AaBZRhqy5rNC9laqWGErfc4dxA9a87mPdKOgWMD85mcFo9dIYIts/Jwocfwn07EC6EzclKubk/g==",
              "requires": {
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/types": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/@walletconnect/types/-/types-2.7.4.tgz",
              "integrity": "sha512-Nagfz8DqLxf0UlVd7xopgBX60EJp1xUEq7J30ALlTbWqEhCHuLK/qPk5vGdJ9Q6+ZDpTW9ShLq1DNf+5nVpVDQ==",
              "requires": {
                "@walletconnect/events": "^1.0.1",
                "@walletconnect/heartbeat": "1.2.1",
                "@walletconnect/jsonrpc-types": "^1.0.2",
                "@walletconnect/keyvaluestorage": "^1.0.2",
                "@walletconnect/logger": "^2.0.1",
                "events": "^3.3.0"
              }
            },
            "@walletconnect/universal-provider": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/@walletconnect/universal-provider/-/universal-provider-2.7.4.tgz",
              "integrity": "sha512-suH3o5LpTX7hlx5lU98oLdEM0Ws5ZysjQ4Zr6EWIK1DVT8EDdWbw49ggJSW9IYRLQ2xG22jDvmTIdFAexYOgng==",
              "requires": {
                "@walletconnect/jsonrpc-http-connection": "^1.0.4",
                "@walletconnect/jsonrpc-provider": "^1.0.11",
                "@walletconnect/jsonrpc-types": "^1.0.2",
                "@walletconnect/jsonrpc-utils": "^1.0.7",
                "@walletconnect/logger": "^2.0.1",
                "@walletconnect/sign-client": "2.7.4",
                "@walletconnect/types": "2.7.4",
                "@walletconnect/utils": "2.7.4",
                "eip1193-provider": "1.0.1",
                "events": "^3.3.0"
              }
            },
            "@walletconnect/utils": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/@walletconnect/utils/-/utils-2.7.4.tgz",
              "integrity": "sha512-2WEeKB9h/FQvyNmIBYwLtjdLm3Oo55EwtJoxkC00SA7xjf8jYxZ8q2y4P/CJP8oO5ruxBK5Ft0smKvPHXsE58Q==",
              "requires": {
                "@stablelib/chacha20poly1305": "1.0.1",
                "@stablelib/hkdf": "1.0.1",
                "@stablelib/random": "^1.0.2",
                "@stablelib/sha256": "1.0.1",
                "@stablelib/x25519": "^1.0.3",
                "@walletconnect/jsonrpc-utils": "^1.0.7",
                "@walletconnect/relay-api": "^1.0.9",
                "@walletconnect/safe-json": "^1.0.2",
                "@walletconnect/time": "^1.0.2",
                "@walletconnect/types": "2.7.4",
                "@walletconnect/window-getters": "^1.0.1",
                "@walletconnect/window-metadata": "^1.0.1",
                "detect-browser": "5.3.0",
                "query-string": "7.1.3",
                "uint8arrays": "^3.1.0"
              },
              "dependencies": {
                "query-string": {
                  "version": "7.1.3",
                  "resolved": "https://registry.npmjs.org/query-string/-/query-string-7.1.3.tgz",
                  "integrity": "sha512-hh2WYhq4fi8+b+/2Kg9CEge4fDPvHS534aOOvOZeQ3+Vf2mCFsaFBYj0i+iXcAq6I9Vzp5fjMFBlONvayDC1qg==",
                  "requires": {
                    "decode-uri-component": "^0.2.2",
                    "filter-obj": "^1.1.0",
                    "split-on-first": "^1.0.0",
                    "strict-uri-encode": "^2.0.0"
                  }
                }
              }
            },
            "@walletconnect/window-getters": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@walletconnect/window-getters/-/window-getters-1.0.1.tgz",
              "integrity": "sha512-vHp+HqzGxORPAN8gY03qnbTMnhqIwjeRJNOMOAzePRg4xVEEE2WvYsI9G2NMjOknA8hnuYbU3/hwLcKbjhc8+Q==",
              "requires": {
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@walletconnect/window-metadata": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/@walletconnect/window-metadata/-/window-metadata-1.0.1.tgz",
              "integrity": "sha512-9koTqyGrM2cqFRW517BPY/iEtUDx2r1+Pwwu5m7sJ7ka79wi3EyqhqcICk/yDmv6jAS1rjKgTKXlEhanYjijcA==",
              "requires": {
                "@walletconnect/window-getters": "^1.0.1",
                "tslib": "1.14.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "@web3modal/core": {
              "version": "2.4.1",
              "resolved": "https://registry.npmjs.org/@web3modal/core/-/core-2.4.1.tgz",
              "integrity": "sha512-v6Y/eQJSI2YfUTv8rGqjFabqdk3ZPjx6Fe7j5Q8fw0ZWF1YRGM3mySG457qtKQ7D7E1kNKA3BHbaOZ3pgQoG6A==",
              "requires": {
                "buffer": "6.0.3",
                "valtio": "1.10.5"
              }
            },
            "@web3modal/standalone": {
              "version": "2.4.1",
              "resolved": "https://registry.npmjs.org/@web3modal/standalone/-/standalone-2.4.1.tgz",
              "integrity": "sha512-ZrI5LwWeT9sd8A3FdIX/gBp3ZrzrX882Ln1vJN0LTCmeP2OUsYcW5bPxjv1PcJ1YUBY7Tg4aTgMUnAVTTuqb+w==",
              "requires": {
                "@web3modal/core": "2.4.1",
                "@web3modal/ui": "2.4.1"
              }
            },
            "@web3modal/ui": {
              "version": "2.4.1",
              "resolved": "https://registry.npmjs.org/@web3modal/ui/-/ui-2.4.1.tgz",
              "integrity": "sha512-x1ceyd3mMJsIHs5UUTLvE+6qyCjhyjL6gB/wVmTDbwASHSQIVyshQJ+s7BwIEMP/pbAsYDg+/M8EiUuE+/E/kg==",
              "requires": {
                "@web3modal/core": "2.4.1",
                "lit": "2.7.4",
                "motion": "10.15.5",
                "qrcode": "1.5.3"
              },
              "dependencies": {
                "qrcode": {
                  "version": "1.5.3",
                  "resolved": "https://registry.npmjs.org/qrcode/-/qrcode-1.5.3.tgz",
                  "integrity": "sha512-puyri6ApkEHYiVl4CFzo1tDkAZ+ATcnbJrJ6RiBM1Fhctdn/ix9MTE3hRph33omisEbC/2fcfemsseiKgBPKZg==",
                  "requires": {
                    "dijkstrajs": "^1.0.1",
                    "encode-utf8": "^1.0.3",
                    "pngjs": "^5.0.0",
                    "yargs": "^15.3.1"
                  }
                }
              }
            },
            "abitype": {
              "version": "0.8.2",
              "resolved": "https://registry.npmjs.org/abitype/-/abitype-0.8.2.tgz",
              "integrity": "sha512-B1ViNMGpfx/qjVQi0RTc2HEFHuR9uoCoTEkwELT5Y7pBPtBbctYijz9BK6+Kd0hQ3S70FhYTO2dWWk0QNUEXMA==",
              "requires": {}
            },
            "aes-js": {
              "version": "3.1.2",
              "resolved": "https://registry.npmjs.org/aes-js/-/aes-js-3.1.2.tgz",
              "integrity": "sha512-e5pEa2kBnBOgR4Y/p20pskXI74UEz7de8ZGVo58asOtvSVG5YAbJeELPZxOmt+Bnz3rX753YKhfIn4X4l1PPRQ=="
            },
            "agentkeepalive": {
              "version": "4.3.0",
              "resolved": "https://registry.npmjs.org/agentkeepalive/-/agentkeepalive-4.3.0.tgz",
              "integrity": "sha512-7Epl1Blf4Sy37j4v9f9FjICCh4+KAQOyXgHEwlyBiAQLbhKdq/i2QQU3amQalS/wPhdPzDXPL5DMR5bkn+YeWg==",
              "requires": {
                "debug": "^4.1.0",
                "depd": "^2.0.0",
                "humanize-ms": "^1.2.1"
              }
            },
            "ahocorasick": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/ahocorasick/-/ahocorasick-1.0.2.tgz",
              "integrity": "sha512-hCOfMzbFx5IDutmWLAt6MZwOUjIfSM9G9FyVxytmE4Rs/5YDPWQrD/+IR1w+FweD9H2oOZEnv36TmkjhNURBVA=="
            },
            "ansi-regex": {
              "version": "5.0.1",
              "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
              "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ=="
            },
            "ansi-styles": {
              "version": "4.3.0",
              "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
              "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
              "requires": {
                "color-convert": "^2.0.1"
              }
            },
            "antd": {
              "version": "5.8.3",
              "resolved": "https://registry.npmjs.org/antd/-/antd-5.8.3.tgz",
              "integrity": "sha512-/DIGg/1UXyPdNLs9FYalfJO1LnnwMv2pnx9DS6ANSJwlo6fDxtb693IJWdaBuRlxgXJfARzxMNsPyFygy9N/Qw==",
              "requires": {
                "@ant-design/colors": "^7.0.0",
                "@ant-design/cssinjs": "^1.16.0",
                "@ant-design/icons": "^5.2.2",
                "@ant-design/react-slick": "~1.0.0",
                "@babel/runtime": "^7.18.3",
                "@ctrl/tinycolor": "^3.6.0",
                "@rc-component/color-picker": "~1.4.0",
                "@rc-component/mutate-observer": "^1.0.0",
                "@rc-component/tour": "~1.8.1",
                "@rc-component/trigger": "^1.15.0",
                "classnames": "^2.2.6",
                "copy-to-clipboard": "^3.2.0",
                "dayjs": "^1.11.1",
                "qrcode.react": "^3.1.0",
                "rc-cascader": "~3.14.0",
                "rc-checkbox": "~3.1.0",
                "rc-collapse": "~3.7.0",
                "rc-dialog": "~9.1.0",
                "rc-drawer": "~6.2.0",
                "rc-dropdown": "~4.1.0",
                "rc-field-form": "~1.36.0",
                "rc-image": "~7.1.0",
                "rc-input": "~1.1.0",
                "rc-input-number": "~8.0.2",
                "rc-mentions": "~2.5.0",
                "rc-menu": "~9.10.0",
                "rc-motion": "^2.7.3",
                "rc-notification": "~5.0.4",
                "rc-pagination": "~3.5.0",
                "rc-picker": "~3.13.0",
                "rc-progress": "~3.4.1",
                "rc-rate": "~2.12.0",
                "rc-resize-observer": "^1.2.0",
                "rc-segmented": "~2.2.0",
                "rc-select": "~14.7.1",
                "rc-slider": "~10.1.0",
                "rc-steps": "~6.0.1",
                "rc-switch": "~4.1.0",
                "rc-table": "~7.32.1",
                "rc-tabs": "~12.9.0",
                "rc-textarea": "~1.3.3",
                "rc-tooltip": "~6.0.0",
                "rc-tree": "~5.7.6",
                "rc-tree-select": "~5.11.0",
                "rc-upload": "~4.3.0",
                "rc-util": "^5.32.0",
                "scroll-into-view-if-needed": "^3.0.3",
                "throttle-debounce": "^5.0.0"
              }
            },
            "antd-img-crop": {
              "version": "4.12.2",
              "resolved": "https://registry.npmjs.org/antd-img-crop/-/antd-img-crop-4.12.2.tgz",
              "integrity": "sha512-xgxR3x2sg+tCBHMfx1gejEfhhvnIL2mpZ4OIPfQDJZTTfm9YpMqaqLF9qWbF9Nf83bXCdaQywYihcVGyw3niDg==",
              "requires": {
                "compare-versions": "6.0.0-rc.1",
                "react-easy-crop": "^4.7.4",
                "tslib": "^2.5.0"
              }
            },
            "any-promise": {
              "version": "1.3.0",
              "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
              "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
              "dev": true
            },
            "anymatch": {
              "version": "3.1.3",
              "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
              "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
              "dev": true,
              "requires": {
                "normalize-path": "^3.0.0",
                "picomatch": "^2.0.4"
              }
            },
            "apg-js": {
              "version": "4.1.3",
              "resolved": "https://registry.npmjs.org/apg-js/-/apg-js-4.1.3.tgz",
              "integrity": "sha512-XYyDcoBho8OpnWPRnedMwyL+76ovCtsESerHZEfY39dO4IrEqN97mdEYkOyHa0XTX5+3+U5FmpqPLttK0f7n6g=="
            },
            "arg": {
              "version": "5.0.2",
              "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
              "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
              "dev": true
            },
            "array-tree-filter": {
              "version": "2.1.0",
              "resolved": "https://registry.npmjs.org/array-tree-filter/-/array-tree-filter-2.1.0.tgz",
              "integrity": "sha512-4ROwICNlNw/Hqa9v+rk5h22KjmzB1JGTMVKP2AKJBOCgb0yL0ASf0+YvCcLNNwquOHNX48jkeZIJ3a+oOQqKcw=="
            },
            "asn1js": {
              "version": "3.0.5",
              "resolved": "https://registry.npmjs.org/asn1js/-/asn1js-3.0.5.tgz",
              "integrity": "sha512-FVnvrKJwpt9LP2lAMl8qZswRNm3T4q9CON+bxldk2iwk3FFpuwhx2FfinyitizWHsVYyaY+y5JzDR0rCMV5yTQ==",
              "requires": {
                "pvtsutils": "^1.3.2",
                "pvutils": "^1.1.3",
                "tslib": "^2.4.0"
              }
            },
            "async-mutex": {
              "version": "0.2.6",
              "resolved": "https://registry.npmjs.org/async-mutex/-/async-mutex-0.2.6.tgz",
              "integrity": "sha512-Hs4R+4SPgamu6rSGW8C7cV9gaWUKEHykfzCCvIRuaVv636Ju10ZdeUbvb4TBEW0INuq2DHZqXbK4Nd3yG4RaRw==",
              "requires": {
                "tslib": "^2.0.0"
              }
            },
            "async-validator": {
              "version": "4.2.5",
              "resolved": "https://registry.npmjs.org/async-validator/-/async-validator-4.2.5.tgz",
              "integrity": "sha512-7HhHjtERjqlNbZtqNqy2rckN/SpOOlmDliet+lP7k+eKZEjPk3DgyeU9lIXLdeLz0uBbbVp+9Qdow9wJWgwwfg=="
            },
            "atomic-sleep": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/atomic-sleep/-/atomic-sleep-1.0.0.tgz",
              "integrity": "sha512-kNOjDqAh7px0XWNI+4QbzoiR/nTkHAWNud2uvnJquD1/x5a7EQZMJT0AczqK0Qn67oY/TTQ1LbUKajZpp3I9tQ=="
            },
            "autoprefixer": {
              "version": "10.4.14",
              "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.14.tgz",
              "integrity": "sha512-FQzyfOsTlwVzjHxKEqRIAdJx9niO6VCBCoEwax/VLSoQF29ggECcPuBqUMZ+u8jCZOPSy8b8/8KnuFbp0SaFZQ==",
              "dev": true,
              "requires": {
                "browserslist": "^4.21.5",
                "caniuse-lite": "^1.0.30001464",
                "fraction.js": "^4.2.0",
                "normalize-range": "^0.1.2",
                "picocolors": "^1.0.0",
                "postcss-value-parser": "^4.2.0"
              }
            },
            "available-typed-arrays": {
              "version": "1.0.5",
              "resolved": "https://registry.npmjs.org/available-typed-arrays/-/available-typed-arrays-1.0.5.tgz",
              "integrity": "sha512-DMD0KiN46eipeziST1LPP/STfDU0sufISXmjSgvVsoU2tqxctQeASejWcfNtxYKqETM1UxQ8sp2OrSBWpHY6sw=="
            },
            "balanced-match": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
              "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
              "dev": true
            },
            "base-x": {
              "version": "3.0.9",
              "resolved": "https://registry.npmjs.org/base-x/-/base-x-3.0.9.tgz",
              "integrity": "sha512-H7JU6iBHTal1gp56aKoaa//YUxEaAOUiydvrV/pILqIHXTtqxSkATOnDA2u+jZ/61sD+L/412+7kzXRtWukhpQ==",
              "requires": {
                "safe-buffer": "^5.0.1"
              }
            },
            "base64-js": {
              "version": "1.5.1",
              "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
              "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA=="
            },
            "bech32": {
              "version": "1.1.4",
              "resolved": "https://registry.npmjs.org/bech32/-/bech32-1.1.4.tgz",
              "integrity": "sha512-s0IrSOzLlbvX7yp4WBfPITzpAU8sqQcpsmwXDiKwrG4r491vwCO/XpejasRNl0piBMe/DvP4Tz0mIS/X1DPJBQ=="
            },
            "bigint-buffer": {
              "version": "1.1.5",
              "resolved": "https://registry.npmjs.org/bigint-buffer/-/bigint-buffer-1.1.5.tgz",
              "integrity": "sha512-trfYco6AoZ+rKhKnxA0hgX0HAbVP/s808/EuDSe2JDzUnCp/xAsli35Orvk67UrTEcwuxZqYZDmfA2RXJgxVvA==",
              "requires": {
                "bindings": "^1.3.0"
              }
            },
            "binary-extensions": {
              "version": "2.2.0",
              "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.2.0.tgz",
              "integrity": "sha512-jDctJ/IVQbZoJykoeHbhXpOlNBqGNcwXJKJog42E5HDPUwQTSdjCHdihjj0DlnheQ7blbT6dHOafNAiS8ooQKA==",
              "dev": true
            },
            "bind-decorator": {
              "version": "1.0.11",
              "resolved": "https://registry.npmjs.org/bind-decorator/-/bind-decorator-1.0.11.tgz",
              "integrity": "sha512-yzkH0uog6Vv/vQ9+rhSKxecnqGUZHYncg7qS7voz3Q76+TAi1SGiOKk2mlOvusQnFz9Dc4BC/NMkeXu11YgjJg=="
            },
            "bindings": {
              "version": "1.5.0",
              "resolved": "https://registry.npmjs.org/bindings/-/bindings-1.5.0.tgz",
              "integrity": "sha512-p2q/t/mhvuOj/UeLlV6566GD/guowlr0hHxClI0W9m7MWYkL1F0hLo+0Aexs9HSPCtR1SXQ0TD3MMKrXZajbiQ==",
              "requires": {
                "file-uri-to-path": "1.0.0"
              }
            },
            "bn.js": {
              "version": "5.2.1",
              "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-5.2.1.tgz",
              "integrity": "sha512-eXRvHzWyYPBuB4NBy0cmYQjGitUrtqwbvlzP3G6VFnNRbsZQIxQ10PbKKHt8gZ/HW/D/747aDl+QkDqg3KQLMQ=="
            },
            "borsh": {
              "version": "0.7.0",
              "resolved": "https://registry.npmjs.org/borsh/-/borsh-0.7.0.tgz",
              "integrity": "sha512-CLCsZGIBCFnPtkNnieW/a8wmreDmfUtjU2m9yHrzPXIlNbqVs0AQrSatSG6vdNYUqdc83tkQi2eHfF98ubzQLA==",
              "requires": {
                "bn.js": "^5.2.0",
                "bs58": "^4.0.0",
                "text-encoding-utf-8": "^1.0.2"
              }
            },
            "brace-expansion": {
              "version": "1.1.11",
              "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz",
              "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
              "dev": true,
              "requires": {
                "balanced-match": "^1.0.0",
                "concat-map": "0.0.1"
              }
            },
            "braces": {
              "version": "3.0.2",
              "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.2.tgz",
              "integrity": "sha512-b8um+L1RzM3WDSzvhm6gIz1yfTbBt6YTlcEKAvsmqCZZFw46z626lVj9j1yEPW33H5H+lBQpZMP1k8l+78Ha0A==",
              "dev": true,
              "requires": {
                "fill-range": "^7.0.1"
              }
            },
            "brorand": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/brorand/-/brorand-1.1.0.tgz",
              "integrity": "sha512-cKV8tMCEpQs4hK/ik71d6LrPOnpkpGBR0wzxqr68g2m/LB2GxVYQroAjMJZRVM1Y4BCjCKc3vAamxSzOY2RP+w=="
            },
            "browserslist": {
              "version": "4.21.10",
              "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.21.10.tgz",
              "integrity": "sha512-bipEBdZfVH5/pwrvqc+Ub0kUPVfGUhlKxbvfD+z1BDnPEO/X98ruXGA1WP5ASpAFKan7Qr6j736IacbZQuAlKQ==",
              "dev": true,
              "requires": {
                "caniuse-lite": "^1.0.30001517",
                "electron-to-chromium": "^1.4.477",
                "node-releases": "^2.0.13",
                "update-browserslist-db": "^1.0.11"
              }
            },
            "bs58": {
              "version": "4.0.1",
              "resolved": "https://registry.npmjs.org/bs58/-/bs58-4.0.1.tgz",
              "integrity": "sha512-Ok3Wdf5vOIlBrgCvTq96gBkJw+JUEzdBgyaza5HLtPm7yTHkjRy8+JzNyHF7BHa0bNWOQIp3m5YF0nnFcOIKLw==",
              "requires": {
                "base-x": "^3.0.2"
              }
            },
            "buffer": {
              "version": "6.0.3",
              "resolved": "https://registry.npmjs.org/buffer/-/buffer-6.0.3.tgz",
              "integrity": "sha512-FTiCpNxtwiZZHEZbcbTIcZjERVICn9yq/pDFkTl95/AxzD1naBctN7YO68riM/gLSDY7sdrMby8hofADYuuqOA==",
              "requires": {
                "base64-js": "^1.3.1",
                "ieee754": "^1.2.1"
              }
            },
            "bufferutil": {
              "version": "4.0.7",
              "resolved": "https://registry.npmjs.org/bufferutil/-/bufferutil-4.0.7.tgz",
              "integrity": "sha512-kukuqc39WOHtdxtw4UScxF/WVnMFVSQVKhtx3AjZJzhd0RGZZldcrfSEbVsWWe6KNH253574cq5F+wpv0G9pJw==",
              "requires": {
                "node-gyp-build": "^4.3.0"
              }
            },
            "busboy": {
              "version": "1.6.0",
              "resolved": "https://registry.npmjs.org/busboy/-/busboy-1.6.0.tgz",
              "integrity": "sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==",
              "requires": {
                "streamsearch": "^1.1.0"
              }
            },
            "call-bind": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/call-bind/-/call-bind-1.0.2.tgz",
              "integrity": "sha512-7O+FbCihrB5WGbFYesctwmTKae6rOiIzmz1icreWJ+0aA7LJfuqhEso2T9ncpcFtzMQtzXf2QGGueWJGTYsqrA==",
              "requires": {
                "function-bind": "^1.1.1",
                "get-intrinsic": "^1.0.2"
              }
            },
            "camelcase": {
              "version": "5.3.1",
              "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
              "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg=="
            },
            "camelcase-css": {
              "version": "2.0.1",
              "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
              "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
              "dev": true
            },
            "caniuse-lite": {
              "version": "1.0.30001519",
              "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001519.tgz",
              "integrity": "sha512-0QHgqR+Jv4bxHMp8kZ1Kn8CH55OikjKJ6JmKkZYP1F3D7w+lnFXF70nG5eNfsZS89jadi5Ywy5UCSKLAglIRkg=="
            },
            "chokidar": {
              "version": "3.5.3",
              "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.5.3.tgz",
              "integrity": "sha512-Dr3sfKRP6oTcjf2JmUmFJfeVMvXBdegxB0iVQ5eb2V10uFJUCAS8OByZdVAyVb8xXNz3GjjTgj9kLWsZTqE6kw==",
              "dev": true,
              "requires": {
                "anymatch": "~3.1.2",
                "braces": "~3.0.2",
                "fsevents": "~2.3.2",
                "glob-parent": "~5.1.2",
                "is-binary-path": "~2.1.0",
                "is-glob": "~4.0.1",
                "normalize-path": "~3.0.0",
                "readdirp": "~3.6.0"
              },
              "dependencies": {
                "glob-parent": {
                  "version": "5.1.2",
                  "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
                  "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
                  "dev": true,
                  "requires": {
                    "is-glob": "^4.0.1"
                  }
                }
              }
            },
            "classnames": {
              "version": "2.3.2",
              "resolved": "https://registry.npmjs.org/classnames/-/classnames-2.3.2.tgz",
              "integrity": "sha512-CSbhY4cFEJRe6/GQzIk5qXZ4Jeg5pcsP7b5peFSDpffpe1cqjASH/n9UTjBwOp6XpMSTwQ8Za2K5V02ueA7Tmw=="
            },
            "client-only": {
              "version": "0.0.1",
              "resolved": "https://registry.npmjs.org/client-only/-/client-only-0.0.1.tgz",
              "integrity": "sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA=="
            },
            "cliui": {
              "version": "6.0.0",
              "resolved": "https://registry.npmjs.org/cliui/-/cliui-6.0.0.tgz",
              "integrity": "sha512-t6wbgtoCXvAzst7QgXxJYqPt0usEfbgQdftEPbLL/cvv6HPE5VgvqCuAIDR0NgU52ds6rFwqrgakNLrHEjCbrQ==",
              "requires": {
                "string-width": "^4.2.0",
                "strip-ansi": "^6.0.0",
                "wrap-ansi": "^6.2.0"
              }
            },
            "color-convert": {
              "version": "2.0.1",
              "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
              "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
              "requires": {
                "color-name": "~1.1.4"
              }
            },
            "color-name": {
              "version": "1.1.4",
              "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
              "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA=="
            },
            "commander": {
              "version": "2.20.3",
              "resolved": "https://registry.npmjs.org/commander/-/commander-2.20.3.tgz",
              "integrity": "sha512-GpVkmM8vF2vQUkj2LvZmD35JxeJOLCwJ9cUkugyk2nuhbv3+mJvpLYYt+0+USMxE+oj+ey/lJEnhZw75x/OMcQ=="
            },
            "compare-versions": {
              "version": "6.0.0-rc.1",
              "resolved": "https://registry.npmjs.org/compare-versions/-/compare-versions-6.0.0-rc.1.tgz",
              "integrity": "sha512-cFhkjbGY1jLFWIV7KegECbfuyYPxSGvgGkdkfM+ibboQDoPwg2FRHm5BSNTOApiauRBzJIQH7qvOJs2sW5ueKQ=="
            },
            "compute-scroll-into-view": {
              "version": "3.0.3",
              "resolved": "https://registry.npmjs.org/compute-scroll-into-view/-/compute-scroll-into-view-3.0.3.tgz",
              "integrity": "sha512-nadqwNxghAGTamwIqQSG433W6OADZx2vCo3UXHNrzTRHK/htu+7+L0zhjEoaeaQVNAi3YgqWDv8+tzf0hRfR+A=="
            },
            "concat-map": {
              "version": "0.0.1",
              "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
              "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
              "dev": true
            },
            "cookie": {
              "version": "0.5.0",
              "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.5.0.tgz",
              "integrity": "sha512-YZ3GUyn/o8gfKJlnlX7g7xq4gyO6OSuhGPKaaGssGB2qgDUS0gPgtTvoyZLTt9Ab6dC4hfc9dV5arkvc/OCmrw=="
            },
            "copy-to-clipboard": {
              "version": "3.3.3",
              "resolved": "https://registry.npmjs.org/copy-to-clipboard/-/copy-to-clipboard-3.3.3.tgz",
              "integrity": "sha512-2KV8NhB5JqC3ky0r9PMCAZKbUHSwtEo4CwCs0KXgruG43gX5PMqDEBbVU4OUzw2MuAWUfsuFmWvEKG5QRfSnJA==",
              "requires": {
                "toggle-selection": "^1.0.6"
              }
            },
            "cross-fetch": {
              "version": "3.1.6",
              "resolved": "https://registry.npmjs.org/cross-fetch/-/cross-fetch-3.1.6.tgz",
              "integrity": "sha512-riRvo06crlE8HiqOwIpQhxwdOk4fOeR7FVM/wXoxchFEqMNUjvbs3bfo4OTgMEMHzppd4DxFBDbyySj8Cv781g==",
              "requires": {
                "node-fetch": "^2.6.11"
              }
            },
            "css-what": {
              "version": "5.1.0",
              "resolved": "https://registry.npmjs.org/css-what/-/css-what-5.1.0.tgz",
              "integrity": "sha512-arSMRWIIFY0hV8pIxZMEfmMI47Wj3R/aWpZDDxWYCPEiOMv6tfOrnpDtgxBYPEQD4V0Y/958+1TdC3iWTFcUPw=="
            },
            "cssesc": {
              "version": "3.0.0",
              "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
              "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg=="
            },
            "csstype": {
              "version": "3.1.2",
              "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.1.2.tgz",
              "integrity": "sha512-I7K1Uu0MBPzaFKg4nI5Q7Vs2t+3gWWW648spaF+Rg7pI9ds18Ugn+lvg4SHczUdKlHI5LWBXyqfS8+DufyBsgQ=="
            },
            "d": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/d/-/d-1.0.1.tgz",
              "integrity": "sha512-m62ShEObQ39CfralilEQRjH6oAMtNCV1xJyEx5LpRYUVN+EviphDgUc/F3hnYbADmkiNs67Y+3ylmlG7Lnu+FA==",
              "requires": {
                "es5-ext": "^0.10.50",
                "type": "^1.0.1"
              }
            },
            "dayjs": {
              "version": "1.11.9",
              "resolved": "https://registry.npmjs.org/dayjs/-/dayjs-1.11.9.tgz",
              "integrity": "sha512-QvzAURSbQ0pKdIye2txOzNaHmxtUBXerpY0FJsFXUMKbIZeFm5ht1LS/jFsrncjnmtv8HsG0W2g6c0zUjZWmpA=="
            },
            "debug": {
              "version": "4.3.4",
              "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.4.tgz",
              "integrity": "sha512-PRWFHuSU3eDtQJPvnNY7Jcket1j0t5OuOsFzPPzsekD52Zl8qUfFIPEiswXqIvHWGVHOgX+7G/vCNNhehwxfkQ==",
              "requires": {
                "ms": "2.1.2"
              }
            },
            "decamelize": {
              "version": "1.2.0",
              "resolved": "https://registry.npmjs.org/decamelize/-/decamelize-1.2.0.tgz",
              "integrity": "sha512-z2S+W9X73hAUUki+N+9Za2lBlun89zigOyGrsax+KUQ6wKW4ZoWpEYBkGhQjwAjjDCkWxhY0VKEhk8wzY7F5cA=="
            },
            "decode-uri-component": {
              "version": "0.2.2",
              "resolved": "https://registry.npmjs.org/decode-uri-component/-/decode-uri-component-0.2.2.tgz",
              "integrity": "sha512-FqUYQ+8o158GyGTrMFJms9qh3CqTKvAqgqsTnkLI8sKu0028orqBhxNMFkFen0zGyg6epACD32pjVk58ngIErQ=="
            },
            "deep-object-diff": {
              "version": "1.1.9",
              "resolved": "https://registry.npmjs.org/deep-object-diff/-/deep-object-diff-1.1.9.tgz",
              "integrity": "sha512-Rn+RuwkmkDwCi2/oXOFS9Gsr5lJZu/yTGpK7wAaAIE75CC+LCGEZHpY6VQJa/RoJcrmaA/docWJZvYohlNkWPA=="
            },
            "deepmerge": {
              "version": "4.3.1",
              "resolved": "https://registry.npmjs.org/deepmerge/-/deepmerge-4.3.1.tgz",
              "integrity": "sha512-3sUqbMEc77XqpdNO7FRyRog+eW3ph+GYCbj+rK+uYyRMuwsVy0rMiVtPn+QJlKFvWP/1PYpapqYn0Me2knFn+A=="
            },
            "delay": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/delay/-/delay-5.0.0.tgz",
              "integrity": "sha512-ReEBKkIfe4ya47wlPYf/gu5ib6yUG0/Aez0JQZQz94kiWtRQvZIQbTiehsnwHvLSWJnQdhVeqYue7Id1dKr0qw=="
            },
            "depd": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
              "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw=="
            },
            "detect-browser": {
              "version": "5.3.0",
              "resolved": "https://registry.npmjs.org/detect-browser/-/detect-browser-5.3.0.tgz",
              "integrity": "sha512-53rsFbGdwMwlF7qvCt0ypLM5V5/Mbl0szB7GPN8y9NCcbknYOeVVXdrXEq+90IwAfrrzt6Hd+u2E2ntakICU8w=="
            },
            "detect-node-es": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/detect-node-es/-/detect-node-es-1.1.0.tgz",
              "integrity": "sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ=="
            },
            "didyoumean": {
              "version": "1.2.2",
              "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
              "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
              "dev": true
            },
            "dijkstrajs": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/dijkstrajs/-/dijkstrajs-1.0.3.tgz",
              "integrity": "sha512-qiSlmBq9+BCdCA/L46dw8Uy93mloxsPSbwnm5yrKn2vMPiy8KyAskTF6zuV/j5BMsmOGZDPs7KjU+mjb670kfA=="
            },
            "dlv": {
              "version": "1.1.3",
              "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
              "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
              "dev": true
            },
            "dom-align": {
              "version": "1.12.4",
              "resolved": "https://registry.npmjs.org/dom-align/-/dom-align-1.12.4.tgz",
              "integrity": "sha512-R8LUSEay/68zE5c8/3BDxiTEvgb4xZTF0RKmAHfiEVN3klfIpXfi2/QCoiWPccVQ0J/ZGdz9OjzL4uJEP/MRAw=="
            },
            "dotenv": {
              "version": "16.0.3",
              "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-16.0.3.tgz",
              "integrity": "sha512-7GO6HghkA5fYG9TYnNxi14/7K9f5occMlp3zXAuSxn7CKCxt9xbNWG7yF8hTCSUchlfWSe3uLmlPfigevRItzQ=="
            },
            "duplexify": {
              "version": "4.1.2",
              "resolved": "https://registry.npmjs.org/duplexify/-/duplexify-4.1.2.tgz",
              "integrity": "sha512-fz3OjcNCHmRP12MJoZMPglx8m4rrFP8rovnk4vT8Fs+aonZoCwGg10dSsQsfP/E62eZcPTMSMP6686fu9Qlqtw==",
              "requires": {
                "end-of-stream": "^1.4.1",
                "inherits": "^2.0.3",
                "readable-stream": "^3.1.1",
                "stream-shift": "^1.0.0"
              }
            },
            "eip1193-provider": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/eip1193-provider/-/eip1193-provider-1.0.1.tgz",
              "integrity": "sha512-kSuqwQ26d7CzuS/t3yRXo2Su2cVH0QfvyKbr2H7Be7O5YDyIq4hQGCNTo5wRdP07bt+E2R/8nPCzey4ojBHf7g==",
              "requires": {
                "@json-rpc-tools/provider": "^1.5.5"
              }
            },
            "electron-to-chromium": {
              "version": "1.4.488",
              "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.4.488.tgz",
              "integrity": "sha512-Dv4sTjiW7t/UWGL+H8ZkgIjtUAVZDgb/PwGWvMsCT7jipzUV/u5skbLXPFKb6iV0tiddVi/bcS2/kUrczeWgIQ==",
              "dev": true
            },
            "elliptic": {
              "version": "6.5.4",
              "resolved": "https://registry.npmjs.org/elliptic/-/elliptic-6.5.4.tgz",
              "integrity": "sha512-iLhC6ULemrljPZb+QutR5TQGB+pdW6KGD5RSegS+8sorOZT+rdQFbsQFJgvN3eRqNALqJer4oQ16YvJHlU8hzQ==",
              "requires": {
                "bn.js": "^4.11.9",
                "brorand": "^1.1.0",
                "hash.js": "^1.0.0",
                "hmac-drbg": "^1.0.1",
                "inherits": "^2.0.4",
                "minimalistic-assert": "^1.0.1",
                "minimalistic-crypto-utils": "^1.0.1"
              },
              "dependencies": {
                "bn.js": {
                  "version": "4.12.0",
                  "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.12.0.tgz",
                  "integrity": "sha512-c98Bf3tPniI+scsdk237ku1Dc3ujXQTSgyiPUDEOe7tRkhrqridvh8klBv0HCEso1OLOYcHuCv/cS6DNxKH+ZA=="
                }
              }
            },
            "embla-carousel": {
              "version": "8.0.0-rc11",
              "resolved": "https://registry.npmjs.org/embla-carousel/-/embla-carousel-8.0.0-rc11.tgz",
              "integrity": "sha512-Toeaug98PGYzSY56p/xsa+u4zbQbAXgGymwEDUc2wqT+1XCnnUsH42MClglhABJQbobwDYxOabhJrfXyJKUMig=="
            },
            "embla-carousel-autoplay": {
              "version": "8.0.0-rc11",
              "resolved": "https://registry.npmjs.org/embla-carousel-autoplay/-/embla-carousel-autoplay-8.0.0-rc11.tgz",
              "integrity": "sha512-Yzy0cW1ggGL/bJUbp1n6csKiQVz8qYiMQLwsx+/k3bD3niZyXikWEQMSiDUeNHLNUksBAaqHwoLDsrP6Ci/ydg==",
              "requires": {}
            },
            "embla-carousel-react": {
              "version": "8.0.0-rc11",
              "resolved": "https://registry.npmjs.org/embla-carousel-react/-/embla-carousel-react-8.0.0-rc11.tgz",
              "integrity": "sha512-hXOAUMOIa0GF5BtdTTqBuKcjgU+ipul6thTCXOZttqnu2c6VS3SIzUUT+onIIEw+AptzKJcPwGcoAByAGa9eJw==",
              "requires": {
                "embla-carousel": "8.0.0-rc11",
                "embla-carousel-reactive-utils": "8.0.0-rc11"
              }
            },
            "embla-carousel-reactive-utils": {
              "version": "8.0.0-rc11",
              "resolved": "https://registry.npmjs.org/embla-carousel-reactive-utils/-/embla-carousel-reactive-utils-8.0.0-rc11.tgz",
              "integrity": "sha512-pDNVJNCn0dybLkHw93My+cMfkRQ5oLZff6ZCwgmrw+96aPiZUyo5ANywz8Lb70SWWgD/TNBRrtQCquvjHS31Sg==",
              "requires": {}
            },
            "emoji-regex": {
              "version": "8.0.0",
              "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
              "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A=="
            },
            "encode-utf8": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/encode-utf8/-/encode-utf8-1.0.3.tgz",
              "integrity": "sha512-ucAnuBEhUK4boH2HjVYG5Q2mQyPorvv0u/ocS+zhdw0S8AlHYY+GOFhP1Gio5z4icpP2ivFSvhtFjQi8+T9ppw=="
            },
            "encoding": {
              "version": "0.1.13",
              "resolved": "https://registry.npmjs.org/encoding/-/encoding-0.1.13.tgz",
              "integrity": "sha512-ETBauow1T35Y/WZMkio9jiM0Z5xjHHmJ4XmjZOq1l/dXz3lr2sRn87nJy20RupqSh1F2m3HHPSp8ShIPQJrJ3A==",
              "devOptional": true,
              "requires": {
                "iconv-lite": "^0.6.2"
              }
            },
            "end-of-stream": {
              "version": "1.4.4",
              "resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.4.tgz",
              "integrity": "sha512-+uw1inIHVPQoaVuHzRyXd21icM+cnt4CzD5rW+NC1wjOUSTOs+Te7FOv7AhN7vS9x/oIyhLP5PR1H+phQAHu5Q==",
              "requires": {
                "once": "^1.4.0"
              }
            },
            "es5-ext": {
              "version": "0.10.62",
              "resolved": "https://registry.npmjs.org/es5-ext/-/es5-ext-0.10.62.tgz",
              "integrity": "sha512-BHLqn0klhEpnOKSrzn/Xsz2UIW8j+cGmo9JLzr8BiUapV8hPL9+FliFqjwr9ngW7jWdnxv6eO+/LqyhJVqgrjA==",
              "requires": {
                "es6-iterator": "^2.0.3",
                "es6-symbol": "^3.1.3",
                "next-tick": "^1.1.0"
              }
            },
            "es6-iterator": {
              "version": "2.0.3",
              "resolved": "https://registry.npmjs.org/es6-iterator/-/es6-iterator-2.0.3.tgz",
              "integrity": "sha512-zw4SRzoUkd+cl+ZoE15A9o1oQd920Bb0iOJMQkQhl3jNc03YqVjAhG7scf9C5KWRU/R13Orf588uCC6525o02g==",
              "requires": {
                "d": "1",
                "es5-ext": "^0.10.35",
                "es6-symbol": "^3.1.1"
              }
            },
            "es6-promise": {
              "version": "4.2.8",
              "resolved": "https://registry.npmjs.org/es6-promise/-/es6-promise-4.2.8.tgz",
              "integrity": "sha512-HJDGx5daxeIvxdBxvG2cb9g4tEvwIk3i8+nhX0yGrYmZUzbkdg8QbDevheDB8gd0//uPj4c1EQua8Q+MViT0/w=="
            },
            "es6-promisify": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/es6-promisify/-/es6-promisify-5.0.0.tgz",
              "integrity": "sha512-C+d6UdsYDk0lMebHNR4S2NybQMMngAOnOwYBQjTOiv0MkoJMP0Myw2mgpDLBcpfCmRLxyFqYhS/CfOENq4SJhQ==",
              "requires": {
                "es6-promise": "^4.0.3"
              }
            },
            "es6-symbol": {
              "version": "3.1.3",
              "resolved": "https://registry.npmjs.org/es6-symbol/-/es6-symbol-3.1.3.tgz",
              "integrity": "sha512-NJ6Yn3FuDinBaBRWl/q5X/s4koRHBrgKAu+yGI6JCBeiu3qrcbJhwT2GeR/EXVfylRk8dpQVJoLEFhK+Mu31NA==",
              "requires": {
                "d": "^1.0.1",
                "ext": "^1.1.2"
              }
            },
            "escalade": {
              "version": "3.1.1",
              "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.1.1.tgz",
              "integrity": "sha512-k0er2gUkLf8O0zKJiAhmkTnJlTvINGv7ygDNPbeIsX/TJjGJZHuh9B2UxbsaEkmlEo9MfhrSzmhIlhRlI2GXnw==",
              "dev": true
            },
            "eth-block-tracker": {
              "version": "6.1.0",
              "resolved": "https://registry.npmjs.org/eth-block-tracker/-/eth-block-tracker-6.1.0.tgz",
              "integrity": "sha512-K9SY8+/xMBi4M5HHTDdxnpEqEEGjbNpzHFqvxyjMZej8InV/B+CkFRKM6W+uvrFJ7m8Zd1E0qUkseU3vdIDFYQ==",
              "requires": {
                "@metamask/safe-event-emitter": "^2.0.0",
                "@metamask/utils": "^3.0.1",
                "json-rpc-random-id": "^1.0.1",
                "pify": "^3.0.0"
              }
            },
            "eth-json-rpc-filters": {
              "version": "5.1.0",
              "resolved": "https://registry.npmjs.org/eth-json-rpc-filters/-/eth-json-rpc-filters-5.1.0.tgz",
              "integrity": "sha512-fos+9xmoa1A2Ytsc9eYof17r81BjdJOUcGcgZn4K/tKdCCTb+a8ytEtwlu1op5qsXFDlgGmstTELFrDEc89qEQ==",
              "requires": {
                "@metamask/safe-event-emitter": "^2.0.0",
                "async-mutex": "^0.2.6",
                "eth-query": "^2.1.2",
                "json-rpc-engine": "^6.1.0",
                "pify": "^5.0.0"
              },
              "dependencies": {
                "pify": {
                  "version": "5.0.0",
                  "resolved": "https://registry.npmjs.org/pify/-/pify-5.0.0.tgz",
                  "integrity": "sha512-eW/gHNMlxdSP6dmG6uJip6FXN0EQBwm2clYYd8Wul42Cwu/DK8HEftzsapcNdYe2MfLiIwZqsDk2RDEsTE79hA=="
                }
              }
            },
            "eth-query": {
              "version": "2.1.2",
              "resolved": "https://registry.npmjs.org/eth-query/-/eth-query-2.1.2.tgz",
              "integrity": "sha512-srES0ZcvwkR/wd5OQBRA1bIJMww1skfGS0s8wlwK3/oNP4+wnds60krvu5R1QbpRQjMmpG5OMIWro5s7gvDPsA==",
              "requires": {
                "json-rpc-random-id": "^1.0.0",
                "xtend": "^4.0.1"
              }
            },
            "eth-rpc-errors": {
              "version": "4.0.2",
              "resolved": "https://registry.npmjs.org/eth-rpc-errors/-/eth-rpc-errors-4.0.2.tgz",
              "integrity": "sha512-n+Re6Gu8XGyfFy1it0AwbD1x0MUzspQs0D5UiPs1fFPCr6WAwZM+vbIhXheBFrpgosqN9bs5PqlB4Q61U/QytQ==",
              "requires": {
                "fast-safe-stringify": "^2.0.6"
              }
            },
            "ethers": {
              "version": "5.7.2",
              "resolved": "https://registry.npmjs.org/ethers/-/ethers-5.7.2.tgz",
              "integrity": "sha512-wswUsmWo1aOK8rR7DIKiWSw9DbLWe6x98Jrn8wcTflTVvaXhAMaB5zGAXy0GYQEQp9iO1iSHWVyARQm11zUtyg==",
              "requires": {
                "@ethersproject/abi": "5.7.0",
                "@ethersproject/abstract-provider": "5.7.0",
                "@ethersproject/abstract-signer": "5.7.0",
                "@ethersproject/address": "5.7.0",
                "@ethersproject/base64": "5.7.0",
                "@ethersproject/basex": "5.7.0",
                "@ethersproject/bignumber": "5.7.0",
                "@ethersproject/bytes": "5.7.0",
                "@ethersproject/constants": "5.7.0",
                "@ethersproject/contracts": "5.7.0",
                "@ethersproject/hash": "5.7.0",
                "@ethersproject/hdnode": "5.7.0",
                "@ethersproject/json-wallets": "5.7.0",
                "@ethersproject/keccak256": "5.7.0",
                "@ethersproject/logger": "5.7.0",
                "@ethersproject/networks": "5.7.1",
                "@ethersproject/pbkdf2": "5.7.0",
                "@ethersproject/properties": "5.7.0",
                "@ethersproject/providers": "5.7.2",
                "@ethersproject/random": "5.7.0",
                "@ethersproject/rlp": "5.7.0",
                "@ethersproject/sha2": "5.7.0",
                "@ethersproject/signing-key": "5.7.0",
                "@ethersproject/solidity": "5.7.0",
                "@ethersproject/strings": "5.7.0",
                "@ethersproject/transactions": "5.7.0",
                "@ethersproject/units": "5.7.0",
                "@ethersproject/wallet": "5.7.0",
                "@ethersproject/web": "5.7.1",
                "@ethersproject/wordlists": "5.7.0"
              }
            },
            "eventemitter3": {
              "version": "4.0.7",
              "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-4.0.7.tgz",
              "integrity": "sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw=="
            },
            "events": {
              "version": "3.3.0",
              "resolved": "https://registry.npmjs.org/events/-/events-3.3.0.tgz",
              "integrity": "sha512-mQw+2fkQbALzQ7V0MY0IqdnXNOeTtP4r0lN9z7AAawCXgqea7bDii20AYrIBrFd/Hx0M2Ocz6S111CaFkUcb0Q=="
            },
            "ext": {
              "version": "1.7.0",
              "resolved": "https://registry.npmjs.org/ext/-/ext-1.7.0.tgz",
              "integrity": "sha512-6hxeJYaL110a9b5TEJSj0gojyHQAmA2ch5Os+ySCiA1QGdS697XWY1pzsrSjqA9LDEEgdB/KypIlR59RcLuHYw==",
              "requires": {
                "type": "^2.7.2"
              },
              "dependencies": {
                "type": {
                  "version": "2.7.2",
                  "resolved": "https://registry.npmjs.org/type/-/type-2.7.2.tgz",
                  "integrity": "sha512-dzlvlNlt6AXU7EBSfpAscydQ7gXB+pPGsPnfJnZpiNJBDj7IaJzQlBZYGdEi4R9HmPdBv2XmWJ6YUtoTa7lmCw=="
                }
              }
            },
            "eyes": {
              "version": "0.1.8",
              "resolved": "https://registry.npmjs.org/eyes/-/eyes-0.1.8.tgz",
              "integrity": "sha512-GipyPsXO1anza0AOZdy69Im7hGFCNB7Y/NGjDlZGJ3GJJLtwNSb2vrzYrTYJRrRloVx7pl+bhUaTB8yiccPvFQ=="
            },
            "fast-glob": {
              "version": "3.3.1",
              "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.1.tgz",
              "integrity": "sha512-kNFPyjhh5cKjrUltxs+wFx+ZkbRaxxmZ+X0ZU31SOsxCEtP9VPgtq2teZw1DebupL5GmDaNQ6yKMMVcM41iqDg==",
              "dev": true,
              "requires": {
                "@nodelib/fs.stat": "^2.0.2",
                "@nodelib/fs.walk": "^1.2.3",
                "glob-parent": "^5.1.2",
                "merge2": "^1.3.0",
                "micromatch": "^4.0.4"
              },
              "dependencies": {
                "glob-parent": {
                  "version": "5.1.2",
                  "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
                  "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
                  "dev": true,
                  "requires": {
                    "is-glob": "^4.0.1"
                  }
                }
              }
            },
            "fast-redact": {
              "version": "3.2.0",
              "resolved": "https://registry.npmjs.org/fast-redact/-/fast-redact-3.2.0.tgz",
              "integrity": "sha512-zaTadChr+NekyzallAMXATXLOR8MNx3zqpZ0MUF2aGf4EathnG0f32VLODNlY8IuGY3HoRO2L6/6fSzNsLaHIw=="
            },
            "fast-safe-stringify": {
              "version": "2.1.1",
              "resolved": "https://registry.npmjs.org/fast-safe-stringify/-/fast-safe-stringify-2.1.1.tgz",
              "integrity": "sha512-W+KJc2dmILlPplD/H4K9l9LcAHAfPtP6BY84uVLXQ6Evcz9Lcg33Y2z1IVblT6xdY54PXYVHEv+0Wpq8Io6zkA=="
            },
            "fast-stable-stringify": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/fast-stable-stringify/-/fast-stable-stringify-1.0.0.tgz",
              "integrity": "sha512-wpYMUmFu5f00Sm0cj2pfivpmawLZ0NKdviQ4w9zJeR8JVtOpOxHmLaJuj0vxvGqMJQWyP/COUkF75/57OKyRag=="
            },
            "fastq": {
              "version": "1.15.0",
              "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.15.0.tgz",
              "integrity": "sha512-wBrocU2LCXXa+lWBt8RoIRD89Fi8OdABODa/kEnyeyjS5aZO5/GNvI5sEINADqP/h8M29UHTHUb53sUu5Ihqdw==",
              "dev": true,
              "requires": {
                "reusify": "^1.0.4"
              }
            },
            "file-uri-to-path": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/file-uri-to-path/-/file-uri-to-path-1.0.0.tgz",
              "integrity": "sha512-0Zt+s3L7Vf1biwWZ29aARiVYLx7iMGnEUl9x33fbB/j3jR81u/O2LbqK+Bm1CDSNDKVtJ/YjwY7TUd5SkeLQLw=="
            },
            "fill-range": {
              "version": "7.0.1",
              "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.0.1.tgz",
              "integrity": "sha512-qOo9F+dMUmC2Lcb4BbVvnKJxTPjCm+RRpe4gDuGrzkL7mEVl/djYSu2OdQ2Pa302N4oqkSg9ir6jaLWJ2USVpQ==",
              "dev": true,
              "requires": {
                "to-regex-range": "^5.0.1"
              }
            },
            "filter-obj": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/filter-obj/-/filter-obj-1.1.0.tgz",
              "integrity": "sha512-8rXg1ZnX7xzy2NGDVkBVaAy+lSlPNwad13BtgSlLuxfIslyt5Vg64U7tFcCt4WS1R0hvtnQybT/IyCkGZ3DpXQ=="
            },
            "find-up": {
              "version": "4.1.0",
              "resolved": "https://registry.npmjs.org/find-up/-/find-up-4.1.0.tgz",
              "integrity": "sha512-PpOwAdQ/YlXQ2vj8a3h8IipDuYRi3wceVQQGYWxNINccq40Anw7BlsEXCMbt1Zt+OLA6Fq9suIpIWD0OsnISlw==",
              "requires": {
                "locate-path": "^5.0.0",
                "path-exists": "^4.0.0"
              }
            },
            "follow-redirects": {
              "version": "1.15.2",
              "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.15.2.tgz",
              "integrity": "sha512-VQLG33o04KaQ8uYi2tVNbdrWp1QWxNNea+nmIB4EVM28v0hmP17z7aG1+wAkNzVq4KeXTq3221ye5qTJP91JwA=="
            },
            "for-each": {
              "version": "0.3.3",
              "resolved": "https://registry.npmjs.org/for-each/-/for-each-0.3.3.tgz",
              "integrity": "sha512-jqYfLp7mo9vIyQf8ykW2v7A+2N4QjeCeI5+Dz9XraiO1ign81wjiH7Fb9vSOWvQfNtmSa4H2RoQTrrXivdUZmw==",
              "requires": {
                "is-callable": "^1.1.3"
              }
            },
            "fraction.js": {
              "version": "4.2.0",
              "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.2.0.tgz",
              "integrity": "sha512-MhLuK+2gUcnZe8ZHlaaINnQLl0xRIGRfcGk2yl8xoQAfHrSsL3rYu6FCmBdkdbhc9EPlwyGHewaRsvwRMJtAlA==",
              "dev": true
            },
            "fs.realpath": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
              "integrity": "sha512-OO0pH2lK6a0hZnAdau5ItzHPI6pUlvI7jMVnxUQRtw4owF2wk8lOSabtGDCTP4Ggrg2MbGnWO9X8K1t4+fGMDw==",
              "dev": true
            },
            "function-bind": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.1.tgz",
              "integrity": "sha512-yIovAzMX49sF8Yl58fSCWJ5svSLuaibPxXQJFLmBObTuCr0Mf1KiPopGM9NiFjiYBCbfaa2Fh6breQ6ANVTI0A=="
            },
            "get-caller-file": {
              "version": "2.0.5",
              "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
              "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg=="
            },
            "get-intrinsic": {
              "version": "1.2.1",
              "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.2.1.tgz",
              "integrity": "sha512-2DcsyfABl+gVHEfCOaTrWgyt+tb6MSEGmKq+kI5HwLbIYgjgmMcV8KQ41uaKz1xxUcn9tJtgFbQUEVcEbd0FYw==",
              "requires": {
                "function-bind": "^1.1.1",
                "has": "^1.0.3",
                "has-proto": "^1.0.1",
                "has-symbols": "^1.0.3"
              }
            },
            "get-nonce": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/get-nonce/-/get-nonce-1.0.1.tgz",
              "integrity": "sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q=="
            },
            "glob": {
              "version": "7.1.6",
              "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.6.tgz",
              "integrity": "sha512-LwaxwyZ72Lk7vZINtNNrywX0ZuLyStrdDtabefZKAY5ZGJhVtgdznluResxNmPitE0SAO+O26sWTHeKSI2wMBA==",
              "dev": true,
              "requires": {
                "fs.realpath": "^1.0.0",
                "inflight": "^1.0.4",
                "inherits": "2",
                "minimatch": "^3.0.4",
                "once": "^1.3.0",
                "path-is-absolute": "^1.0.0"
              }
            },
            "glob-parent": {
              "version": "6.0.2",
              "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
              "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
              "dev": true,
              "requires": {
                "is-glob": "^4.0.3"
              }
            },
            "glob-to-regexp": {
              "version": "0.4.1",
              "resolved": "https://registry.npmjs.org/glob-to-regexp/-/glob-to-regexp-0.4.1.tgz",
              "integrity": "sha512-lkX1HJXwyMcprw/5YUZc2s7DrpAiHB21/V+E1rHUrVNokkvB6bqMzT0VfV6/86ZNabt1k14YOIaT7nDvOX3Iiw=="
            },
            "goober": {
              "version": "2.1.13",
              "resolved": "https://registry.npmjs.org/goober/-/goober-2.1.13.tgz",
              "integrity": "sha512-jFj3BQeleOoy7t93E9rZ2de+ScC4lQICLwiAQmKMg9F6roKGaLSHoCDYKkWlSafg138jejvq/mTdvmnwDQgqoQ==",
              "requires": {}
            },
            "gopd": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.0.1.tgz",
              "integrity": "sha512-d65bNlIadxvpb/A2abVdlqKqV563juRnZ1Wtk6s1sIR8uNsXR70xqIzVqxVf1eTqDunwT2MkczEeaezCKTZhwA==",
              "requires": {
                "get-intrinsic": "^1.1.3"
              }
            },
            "graceful-fs": {
              "version": "4.2.11",
              "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
              "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ=="
            },
            "gsap": {
              "version": "npm:@gsap/shockingly@3.12.2",
              "resolved": "https://npm.greensock.com/@gsap%2fshockingly/-/shockingly-3.12.2.tgz",
              "integrity": "sha512-kYmkwAQ53GzBxs+e8pu/BCzUMrfJoBSEE1JI5HB6wUGDt9yuR/XTwSNfRCBzbuzy/zR9HgqubZnU59LhOiOzwA=="
            },
            "has": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/has/-/has-1.0.3.tgz",
              "integrity": "sha512-f2dvO0VU6Oej7RkWJGrehjbzMAjFp5/VKPp5tTpWIV4JHHZK1/BxbFRtf/siA2SWTe09caDmVtYYzWEIbBS4zw==",
              "requires": {
                "function-bind": "^1.1.1"
              }
            },
            "has-flag": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
              "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ=="
            },
            "has-proto": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/has-proto/-/has-proto-1.0.1.tgz",
              "integrity": "sha512-7qE+iP+O+bgF9clE5+UoBFzE65mlBiVj3tKCrlNQ0Ogwm0BjpT/gK4SlLYDMybDh5I3TCTKnPPa0oMG7JDYrhg=="
            },
            "has-symbols": {
              "version": "1.0.3",
              "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.0.3.tgz",
              "integrity": "sha512-l3LCuF6MgDNwTDKkdYGEihYjt5pRPbEg46rtlmnSPlUbgmB8LOIrKJbYYFBSbnPaJexMKtiPO8hmeRjRz2Td+A=="
            },
            "has-tostringtag": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.0.tgz",
              "integrity": "sha512-kFjcSNhnlGV1kyoGk7OXKSawH5JOb/LzUc5w9B02hOTO0dfFRjbHQKvg1d6cf3HbeUmtU9VbbV3qzZ2Teh97WQ==",
              "requires": {
                "has-symbols": "^1.0.2"
              }
            },
            "hash.js": {
              "version": "1.1.7",
              "resolved": "https://registry.npmjs.org/hash.js/-/hash.js-1.1.7.tgz",
              "integrity": "sha512-taOaskGt4z4SOANNseOviYDvjEJinIkRgmp7LbKP2YTTmVxWBl87s/uzK9r+44BclBSp2X7K1hqeNfz9JbBeXA==",
              "requires": {
                "inherits": "^2.0.3",
                "minimalistic-assert": "^1.0.1"
              }
            },
            "hey-listen": {
              "version": "1.0.8",
              "resolved": "https://registry.npmjs.org/hey-listen/-/hey-listen-1.0.8.tgz",
              "integrity": "sha512-COpmrF2NOg4TBWUJ5UVyaCU2A88wEMkUPK4hNqyCkqHbxT92BbvfjoSozkAIIm6XhicGlJHhFdullInrdhwU8Q=="
            },
            "hmac-drbg": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/hmac-drbg/-/hmac-drbg-1.0.1.tgz",
              "integrity": "sha512-Tti3gMqLdZfhOQY1Mzf/AanLiqh1WTiJgEj26ZuYQ9fbkLomzGchCws4FyrSd4VkpBfiNhaE1On+lOz894jvXg==",
              "requires": {
                "hash.js": "^1.0.3",
                "minimalistic-assert": "^1.0.0",
                "minimalistic-crypto-utils": "^1.0.1"
              }
            },
            "hoist-non-react-statics": {
              "version": "3.3.2",
              "resolved": "https://registry.npmjs.org/hoist-non-react-statics/-/hoist-non-react-statics-3.3.2.tgz",
              "integrity": "sha512-/gGivxi8JPKWNm/W0jSmzcMPpfpPLc3dY/6GxhX2hQ9iGj3aDfklV4ET7NjKpSinLpJ5vafa9iiGIEZg10SfBw==",
              "requires": {
                "react-is": "^16.7.0"
              }
            },
            "humanize-ms": {
              "version": "1.2.1",
              "resolved": "https://registry.npmjs.org/humanize-ms/-/humanize-ms-1.2.1.tgz",
              "integrity": "sha512-Fl70vYtsAFb/C06PTS9dZBo7ihau+Tu/DNCk/OyHhea07S+aeMWpFFkUaXRa8fI+ScZbEI8dfSxwY7gxZ9SAVQ==",
              "requires": {
                "ms": "^2.0.0"
              }
            },
            "iconv-lite": {
              "version": "0.6.3",
              "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
              "integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
              "devOptional": true,
              "requires": {
                "safer-buffer": ">= 2.1.2 < 3.0.0"
              }
            },
            "ieee754": {
              "version": "1.2.1",
              "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.2.1.tgz",
              "integrity": "sha512-dcyqhDvX1C46lXZcVqCpK+FtMRQVdIMN6/Df5js2zouUsqG7I6sFxitIC+7KYK29KdXOLHdu9zL4sFnoVQnqaA=="
            },
            "immer": {
              "version": "9.0.21",
              "resolved": "https://registry.npmjs.org/immer/-/immer-9.0.21.tgz",
              "integrity": "sha512-bc4NBHqOqSfRW7POMkHd51LvClaeMXpm8dx0e8oE2GORbq5aRK7Bxl4FyzVLdGtLmvLKL7BTDBG5ACQm4HWjTA=="
            },
            "inflight": {
              "version": "1.0.6",
              "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
              "integrity": "sha512-k92I/b08q4wvFscXCLvqfsHCrjrF7yiXsQuIVvVE7N82W3+aqpzuUdBbfhWcy/FZR3/4IgflMgKLOsvPDrGCJA==",
              "dev": true,
              "requires": {
                "once": "^1.3.0",
                "wrappy": "1"
              }
            },
            "inherits": {
              "version": "2.0.4",
              "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
              "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ=="
            },
            "invariant": {
              "version": "2.2.4",
              "resolved": "https://registry.npmjs.org/invariant/-/invariant-2.2.4.tgz",
              "integrity": "sha512-phJfQVBuaJM5raOpJjSfkiD6BpbCE4Ns//LaXl6wGYtUBY83nWS6Rf9tXm2e8VaK60JEjYldbPif/A2B1C2gNA==",
              "requires": {
                "loose-envify": "^1.0.0"
              }
            },
            "iron-session": {
              "version": "6.3.1",
              "resolved": "https://registry.npmjs.org/iron-session/-/iron-session-6.3.1.tgz",
              "integrity": "sha512-3UJ7y2vk/WomAtEySmPgM6qtYF1cZ3tXuWX5GsVX4PJXAcs5y/sV9HuSfpjKS6HkTL/OhZcTDWJNLZ7w+Erx3A==",
              "requires": {
                "@peculiar/webcrypto": "^1.4.0",
                "@types/cookie": "^0.5.1",
                "@types/express": "^4.17.13",
                "@types/koa": "^2.13.5",
                "@types/node": "^17.0.41",
                "cookie": "^0.5.0",
                "iron-webcrypto": "^0.2.5"
              },
              "dependencies": {
                "@types/node": {
                  "version": "17.0.45",
                  "resolved": "https://registry.npmjs.org/@types/node/-/node-17.0.45.tgz",
                  "integrity": "sha512-w+tIMs3rq2afQdsPJlODhoUEKzFP1ayaoyl1CcnwtIlsVe7K7bA1NGm4s3PraqTLlXnbIN84zuBlxBWo1u9BLw=="
                }
              }
            },
            "iron-webcrypto": {
              "version": "0.2.8",
              "resolved": "https://registry.npmjs.org/iron-webcrypto/-/iron-webcrypto-0.2.8.tgz",
              "integrity": "sha512-YPdCvjFMOBjXaYuDj5tiHst5CEk6Xw84Jo8Y2+jzhMceclAnb3+vNPP/CTtb5fO2ZEuXEaO4N+w62Vfko757KA==",
              "requires": {
                "buffer": "^6"
              }
            },
            "is-arguments": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/is-arguments/-/is-arguments-1.1.1.tgz",
              "integrity": "sha512-8Q7EARjzEnKpt/PCD7e1cgUS0a6X8u5tdSiMqXhojOdoV9TsMsiO+9VLC5vAmO8N7/GmXn7yjR8qnA6bVAEzfA==",
              "requires": {
                "call-bind": "^1.0.2",
                "has-tostringtag": "^1.0.0"
              }
            },
            "is-binary-path": {
              "version": "2.1.0",
              "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
              "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
              "dev": true,
              "requires": {
                "binary-extensions": "^2.0.0"
              }
            },
            "is-callable": {
              "version": "1.2.7",
              "resolved": "https://registry.npmjs.org/is-callable/-/is-callable-1.2.7.tgz",
              "integrity": "sha512-1BC0BVFhS/p0qtw6enp8e+8OD0UrK0oFLztSjNzhcKA3WDuJxxAPXzPuPtKkjEY9UUoEWlX/8fgKeu2S8i9JTA=="
            },
            "is-core-module": {
              "version": "2.13.0",
              "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.13.0.tgz",
              "integrity": "sha512-Z7dk6Qo8pOCp3l4tsX2C5ZVas4V+UxwQodwZhLopL91TX8UyyHEXafPcyoeeWuLrwzHcr3igO78wNLwHJHsMCQ==",
              "dev": true,
              "requires": {
                "has": "^1.0.3"
              }
            },
            "is-extglob": {
              "version": "2.1.1",
              "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
              "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
              "dev": true
            },
            "is-fullwidth-code-point": {
              "version": "3.0.0",
              "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
              "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg=="
            },
            "is-generator-function": {
              "version": "1.0.10",
              "resolved": "https://registry.npmjs.org/is-generator-function/-/is-generator-function-1.0.10.tgz",
              "integrity": "sha512-jsEjy9l3yiXEQ+PsXdmBwEPcOxaXWLspKdplFUVI9vq1iZgIekeC0L167qeu86czQaxed3q/Uzuw0swL0irL8A==",
              "requires": {
                "has-tostringtag": "^1.0.0"
              }
            },
            "is-glob": {
              "version": "4.0.3",
              "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
              "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
              "dev": true,
              "requires": {
                "is-extglob": "^2.1.1"
              }
            },
            "is-number": {
              "version": "7.0.0",
              "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
              "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
              "dev": true
            },
            "is-typed-array": {
              "version": "1.1.10",
              "resolved": "https://registry.npmjs.org/is-typed-array/-/is-typed-array-1.1.10.tgz",
              "integrity": "sha512-PJqgEHiWZvMpaFZ3uTc8kHPM4+4ADTlDniuQL7cU/UDA0Ql7F70yGfHph3cLNe+c9toaigv+DFzTJKhc2CtO6A==",
              "requires": {
                "available-typed-arrays": "^1.0.5",
                "call-bind": "^1.0.2",
                "for-each": "^0.3.3",
                "gopd": "^1.0.1",
                "has-tostringtag": "^1.0.0"
              }
            },
            "is-typedarray": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/is-typedarray/-/is-typedarray-1.0.0.tgz",
              "integrity": "sha512-cyA56iCMHAh5CdzjJIa4aohJyeO1YbwLi3Jc35MmRU6poroFjIGZzUzupGiRPOjgHg9TLu43xbpwXk523fMxKA=="
            },
            "isomorphic-ws": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/isomorphic-ws/-/isomorphic-ws-5.0.0.tgz",
              "integrity": "sha512-muId7Zzn9ywDsyXgTIafTry2sV3nySZeUDe6YedVd1Hvuuep5AsIlqK+XefWpYTyJG5e503F2xIuT2lcU6rCSw==",
              "requires": {}
            },
            "jayson": {
              "version": "3.7.0",
              "resolved": "https://registry.npmjs.org/jayson/-/jayson-3.7.0.tgz",
              "integrity": "sha512-tfy39KJMrrXJ+mFcMpxwBvFDetS8LAID93+rycFglIQM4kl3uNR3W4lBLE/FFhsoUCEox5Dt2adVpDm/XtebbQ==",
              "requires": {
                "@types/connect": "^3.4.33",
                "@types/node": "^12.12.54",
                "@types/ws": "^7.4.4",
                "commander": "^2.20.3",
                "delay": "^5.0.0",
                "es6-promisify": "^5.0.0",
                "eyes": "^0.1.8",
                "isomorphic-ws": "^4.0.1",
                "json-stringify-safe": "^5.0.1",
                "JSONStream": "^1.3.5",
                "lodash": "^4.17.20",
                "uuid": "^8.3.2",
                "ws": "^7.4.5"
              },
              "dependencies": {
                "@types/node": {
                  "version": "12.20.55",
                  "resolved": "https://registry.npmjs.org/@types/node/-/node-12.20.55.tgz",
                  "integrity": "sha512-J8xLz7q2OFulZ2cyGTLE1TbbZcjpno7FaN6zdJNrgAdrJ+DZzh/uFR6YrTb4C+nXakvud8Q4+rbhoIWlYQbUFQ=="
                },
                "isomorphic-ws": {
                  "version": "4.0.1",
                  "resolved": "https://registry.npmjs.org/isomorphic-ws/-/isomorphic-ws-4.0.1.tgz",
                  "integrity": "sha512-BhBvN2MBpWTaSHdWRb/bwdZJ1WaehQ2L1KngkCkfLUGF0mAWAT1sQUQacEmQ0jXkFw/czDXPNQSL5u2/Krsz1w==",
                  "requires": {}
                },
                "uuid": {
                  "version": "8.3.2",
                  "resolved": "https://registry.npmjs.org/uuid/-/uuid-8.3.2.tgz",
                  "integrity": "sha512-+NYs2QeMWy+GWFOEm9xnn6HCDp0l7QBD7ml8zLUmJ+93Q5NF0NocErnwkTkXVFNiX3/fpC6afS8Dhb/gz7R7eg=="
                },
                "ws": {
                  "version": "7.5.9",
                  "resolved": "https://registry.npmjs.org/ws/-/ws-7.5.9.tgz",
                  "integrity": "sha512-F+P9Jil7UiSKSkppIiD94dN07AwvFixvLIj1Og1Rl9GGMuNipJnV9JzjD6XuqmAeiswGvUmNLjr5cFuXwNS77Q==",
                  "requires": {}
                }
              }
            },
            "jiti": {
              "version": "1.19.1",
              "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.19.1.tgz",
              "integrity": "sha512-oVhqoRDaBXf7sjkll95LHVS6Myyyb1zaunVwk4Z0+WPSW4gjS0pl01zYKHScTuyEhQsFxV5L4DR5r+YqSyqyyg==",
              "dev": true
            },
            "jose": {
              "version": "4.14.4",
              "resolved": "https://registry.npmjs.org/jose/-/jose-4.14.4.tgz",
              "integrity": "sha512-j8GhLiKmUAh+dsFXlX1aJCbt5KMibuKb+d7j1JaOJG6s2UjX1PQlW+OKB/sD4a/5ZYF4RcmYmLSndOoU3Lt/3g=="
            },
            "js-sha3": {
              "version": "0.8.0",
              "resolved": "https://registry.npmjs.org/js-sha3/-/js-sha3-0.8.0.tgz",
              "integrity": "sha512-gF1cRrHhIzNfToc802P800N8PpXS+evLLXfsVpowqmAFR9uwbi89WvXg2QspOmXL8QL86J4T1EpFu+yUkwJY3Q=="
            },
            "js-tokens": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
              "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ=="
            },
            "json-rpc-engine": {
              "version": "6.1.0",
              "resolved": "https://registry.npmjs.org/json-rpc-engine/-/json-rpc-engine-6.1.0.tgz",
              "integrity": "sha512-NEdLrtrq1jUZyfjkr9OCz9EzCNhnRyWtt1PAnvnhwy6e8XETS0Dtc+ZNCO2gvuAoKsIn2+vCSowXTYE4CkgnAQ==",
              "requires": {
                "@metamask/safe-event-emitter": "^2.0.0",
                "eth-rpc-errors": "^4.0.2"
              }
            },
            "json-rpc-random-id": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/json-rpc-random-id/-/json-rpc-random-id-1.0.1.tgz",
              "integrity": "sha512-RJ9YYNCkhVDBuP4zN5BBtYAzEl03yq/jIIsyif0JY9qyJuQQZNeDK7anAPKKlyEtLSj2s8h6hNh2F8zO5q7ScA=="
            },
            "json-stringify-safe": {
              "version": "5.0.1",
              "resolved": "https://registry.npmjs.org/json-stringify-safe/-/json-stringify-safe-5.0.1.tgz",
              "integrity": "sha512-ZClg6AaYvamvYEE82d3Iyd3vSSIjQ+odgjaTzRuO3s7toCdFKczob2i0zCh7JE8kWn17yvAWhUVxvqGwUalsRA=="
            },
            "json2mq": {
              "version": "0.2.0",
              "resolved": "https://registry.npmjs.org/json2mq/-/json2mq-0.2.0.tgz",
              "integrity": "sha512-SzoRg7ux5DWTII9J2qkrZrqV1gt+rTaoufMxEzXbS26Uid0NwaJd123HcoB80TgubEppxxIGdNxCx50fEoEWQA==",
              "requires": {
                "string-convert": "^0.2.0"
              }
            },
            "jsonparse": {
              "version": "1.3.1",
              "resolved": "https://registry.npmjs.org/jsonparse/-/jsonparse-1.3.1.tgz",
              "integrity": "sha512-POQXvpdL69+CluYsillJ7SUhKvytYjW9vG/GKpnf+xP8UWgYEM/RaMzHHofbALDiKbbP1W8UEYmgGl39WkPZsg=="
            },
            "JSONStream": {
              "version": "1.3.5",
              "resolved": "https://registry.npmjs.org/JSONStream/-/JSONStream-1.3.5.tgz",
              "integrity": "sha512-E+iruNOY8VV9s4JEbe1aNEm6MiszPRr/UfcHMz0TQh1BXSxHK+ASV1R6W4HpjBhSeS+54PIsAMCBmwD06LLsqQ==",
              "requires": {
                "jsonparse": "^1.2.0",
                "through": ">=2.2.7 <3"
              }
            },
            "keccak": {
              "version": "3.0.3",
              "resolved": "https://registry.npmjs.org/keccak/-/keccak-3.0.3.tgz",
              "integrity": "sha512-JZrLIAJWuZxKbCilMpNz5Vj7Vtb4scDG3dMXLOsbzBmQGyjwE61BbW7bJkfKKCShXiQZt3T6sBgALRtmd+nZaQ==",
              "requires": {
                "node-addon-api": "^2.0.0",
                "node-gyp-build": "^4.2.0",
                "readable-stream": "^3.6.0"
              }
            },
            "keyvaluestorage-interface": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/keyvaluestorage-interface/-/keyvaluestorage-interface-1.0.0.tgz",
              "integrity": "sha512-8t6Q3TclQ4uZynJY9IGr2+SsIGwK9JHcO6ootkHCGA0CrQCRy+VkouYNO2xicET6b9al7QKzpebNow+gkpCL8g=="
            },
            "lilconfig": {
              "version": "2.1.0",
              "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-2.1.0.tgz",
              "integrity": "sha512-utWOt/GHzuUxnLKxB6dk81RoOeoNeHgbrXiuGk4yyF5qlRz+iIVWu56E2fqGHFrXz0QNUhLB/8nKqvRH66JKGQ==",
              "dev": true
            },
            "lines-and-columns": {
              "version": "1.2.4",
              "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
              "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
              "dev": true
            },
            "lit": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/lit/-/lit-2.7.4.tgz",
              "integrity": "sha512-cgD7xrZoYr21mbrkZIuIrj98YTMw/snJPg52deWVV4A8icLyNHI3bF70xsJeAgwTuiq5Kkd+ZR8gybSJDCPB7g==",
              "requires": {
                "@lit/reactive-element": "^1.6.0",
                "lit-element": "^3.3.0",
                "lit-html": "^2.7.0"
              }
            },
            "lit-element": {
              "version": "3.3.2",
              "resolved": "https://registry.npmjs.org/lit-element/-/lit-element-3.3.2.tgz",
              "integrity": "sha512-xXAeVWKGr4/njq0rGC9dethMnYCq5hpKYrgQZYTzawt9YQhMiXfD+T1RgrdY3NamOxwq2aXlb0vOI6e29CKgVQ==",
              "requires": {
                "@lit-labs/ssr-dom-shim": "^1.1.0",
                "@lit/reactive-element": "^1.3.0",
                "lit-html": "^2.7.0"
              }
            },
            "lit-html": {
              "version": "2.7.4",
              "resolved": "https://registry.npmjs.org/lit-html/-/lit-html-2.7.4.tgz",
              "integrity": "sha512-/Jw+FBpeEN+z8X6PJva5n7+0MzCVAH2yypN99qHYYkq8bI+j7I39GH+68Z/MZD6rGKDK9RpzBw7CocfmHfq6+g==",
              "requires": {
                "@types/trusted-types": "^2.0.2"
              }
            },
            "locate-path": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-5.0.0.tgz",
              "integrity": "sha512-t7hw9pI+WvuwNJXwk5zVHpyhIqzg2qTlklJOf0mVxGSbe3Fp2VieZcduNYjaLDoy6p9uGpQEGWG87WpMKlNq8g==",
              "requires": {
                "p-locate": "^4.1.0"
              }
            },
            "lodash": {
              "version": "4.17.21",
              "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
              "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg=="
            },
            "lodash.camelcase": {
              "version": "4.3.0",
              "resolved": "https://registry.npmjs.org/lodash.camelcase/-/lodash.camelcase-4.3.0.tgz",
              "integrity": "sha512-TwuEnCnxbc3rAvhf/LbG7tJUDzhqXyFnv3dtzLOPgCG/hODL7WFnsbwktkD7yUV0RrreP/l1PALq/YSg6VvjlA=="
            },
            "lodash.isequal": {
              "version": "4.5.0",
              "resolved": "https://registry.npmjs.org/lodash.isequal/-/lodash.isequal-4.5.0.tgz",
              "integrity": "sha512-pDo3lu8Jhfjqls6GkMgpahsF9kCyayhgykjyLMNFTKWrpVdAQtYyB4muAMWozBB4ig/dtWAmsMxLEI8wuz+DYQ=="
            },
            "loose-envify": {
              "version": "1.4.0",
              "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
              "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
              "requires": {
                "js-tokens": "^3.0.0 || ^4.0.0"
              }
            },
            "lru-cache": {
              "version": "6.0.0",
              "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
              "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
              "requires": {
                "yallist": "^4.0.0"
              }
            },
            "media-query-parser": {
              "version": "2.0.2",
              "resolved": "https://registry.npmjs.org/media-query-parser/-/media-query-parser-2.0.2.tgz",
              "integrity": "sha512-1N4qp+jE0pL5Xv4uEcwVUhIkwdUO3S/9gML90nqKA7v7FcOS5vUtatfzok9S9U1EJU8dHWlcv95WLnKmmxZI9w==",
              "requires": {
                "@babel/runtime": "^7.12.5"
              }
            },
            "merge2": {
              "version": "1.4.1",
              "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
              "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
              "dev": true
            },
            "micromatch": {
              "version": "4.0.5",
              "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.5.tgz",
              "integrity": "sha512-DMy+ERcEW2q8Z2Po+WNXuw3c5YaUSFjAO5GsJqfEl7UjvtIuFKO6ZrKvcItdy98dwFI2N1tg3zNIdKaQT+aNdA==",
              "dev": true,
              "requires": {
                "braces": "^3.0.2",
                "picomatch": "^2.3.1"
              }
            },
            "minimalistic-assert": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/minimalistic-assert/-/minimalistic-assert-1.0.1.tgz",
              "integrity": "sha512-UtJcAD4yEaGtjPezWuO9wC4nwUnVH/8/Im3yEHQP4b67cXlD/Qr9hdITCU1xDbSEXg2XKNaP8jsReV7vQd00/A=="
            },
            "minimalistic-crypto-utils": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/minimalistic-crypto-utils/-/minimalistic-crypto-utils-1.0.1.tgz",
              "integrity": "sha512-JIYlbt6g8i5jKfJ3xz7rF0LXmv2TkDxBLUkiBeZ7bAx4GnnNMr8xFpGnOxn6GhTEHx3SjRrZEoU+j04prX1ktg=="
            },
            "minimatch": {
              "version": "3.1.2",
              "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
              "integrity": "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==",
              "dev": true,
              "requires": {
                "brace-expansion": "^1.1.7"
              }
            },
            "motion": {
              "version": "10.15.5",
              "resolved": "https://registry.npmjs.org/motion/-/motion-10.15.5.tgz",
              "integrity": "sha512-ejP6KioN4pigTGxL93APzOnvtLklParL59UQB2T3HWXQBxFcIp5/7YXFmkgiA6pNKKzjvnLhnonRBN5iSFMnNw==",
              "requires": {
                "@motionone/animation": "^10.15.1",
                "@motionone/dom": "^10.15.5",
                "@motionone/svelte": "^10.15.5",
                "@motionone/types": "^10.15.1",
                "@motionone/utils": "^10.15.1",
                "@motionone/vue": "^10.15.5"
              }
            },
            "ms": {
              "version": "2.1.2",
              "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
              "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w=="
            },
            "multiformats": {
              "version": "9.9.0",
              "resolved": "https://registry.npmjs.org/multiformats/-/multiformats-9.9.0.tgz",
              "integrity": "sha512-HoMUjhH9T8DDBNT+6xzkrd9ga/XiBI4xLr58LJACwK6G3HTOPeMz4nB4KJs33L2BelrIJa7P0VuNaVF3hMYfjg=="
            },
            "mz": {
              "version": "2.7.0",
              "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
              "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
              "dev": true,
              "requires": {
                "any-promise": "^1.0.0",
                "object-assign": "^4.0.1",
                "thenify-all": "^1.0.0"
              }
            },
            "nanoid": {
              "version": "3.3.6",
              "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.6.tgz",
              "integrity": "sha512-BGcqMMJuToF7i1rt+2PWSNVnWIkGCU78jBG3RxO/bZlnZPK2Cmi2QaffxGO/2RvWi9sL+FAiRiXMgsyxQ1DIDA=="
            },
            "next": {
              "version": "13.5.6",
              "resolved": "https://registry.npmjs.org/next/-/next-13.5.6.tgz",
              "integrity": "sha512-Y2wTcTbO4WwEsVb4A8VSnOsG1I9ok+h74q0ZdxkwM3EODqrs4pasq7O0iUxbcS9VtWMicG7f3+HAj0r1+NtKSw==",
              "requires": {
                "@next/env": "13.5.6",
                "@next/swc-darwin-arm64": "13.5.6",
                "@next/swc-darwin-x64": "13.5.6",
                "@next/swc-linux-arm64-gnu": "13.5.6",
                "@next/swc-linux-arm64-musl": "13.5.6",
                "@next/swc-linux-x64-gnu": "13.5.6",
                "@next/swc-linux-x64-musl": "13.5.6",
                "@next/swc-win32-arm64-msvc": "13.5.6",
                "@next/swc-win32-ia32-msvc": "13.5.6",
                "@next/swc-win32-x64-msvc": "13.5.6",
                "@swc/helpers": "0.5.2",
                "busboy": "1.6.0",
                "caniuse-lite": "^1.0.30001406",
                "postcss": "8.4.31",
                "styled-jsx": "5.1.1",
                "watchpack": "2.4.0"
              }
            },
            "next-auth": {
              "version": "4.20.1",
              "resolved": "https://registry.npmjs.org/next-auth/-/next-auth-4.20.1.tgz",
              "integrity": "sha512-ZcTUN4qzzZ/zJYgOW0hMXccpheWtAol8QOMdMts+LYRcsPGsqf2hEityyaKyECQVw1cWInb9dF3wYwI5GZdEmQ==",
              "requires": {
                "@babel/runtime": "^7.20.13",
                "@panva/hkdf": "^1.0.2",
                "cookie": "^0.5.0",
                "jose": "^4.11.4",
                "oauth": "^0.9.15",
                "openid-client": "^5.4.0",
                "preact": "^10.6.3",
                "preact-render-to-string": "^5.1.19",
                "uuid": "^8.3.2"
              },
              "dependencies": {
                "uuid": {
                  "version": "8.3.2",
                  "resolved": "https://registry.npmjs.org/uuid/-/uuid-8.3.2.tgz",
                  "integrity": "sha512-+NYs2QeMWy+GWFOEm9xnn6HCDp0l7QBD7ml8zLUmJ+93Q5NF0NocErnwkTkXVFNiX3/fpC6afS8Dhb/gz7R7eg=="
                }
              }
            },
            "next-tick": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/next-tick/-/next-tick-1.1.0.tgz",
              "integrity": "sha512-CXdUiJembsNjuToQvxayPZF9Vqht7hewsvy2sOWafLvi2awflj9mOC6bHIg50orX8IJvWKY9wYQ/zB2kogPslQ=="
            },
            "node-addon-api": {
              "version": "2.0.2",
              "resolved": "https://registry.npmjs.org/node-addon-api/-/node-addon-api-2.0.2.tgz",
              "integrity": "sha512-Ntyt4AIXyaLIuMHF6IOoTakB3K+RWxwtsHNRxllEoA6vPwP9o4866g6YWDLUdnucilZhmkxiHwHr11gAENw+QA=="
            },
            "node-fetch": {
              "version": "2.6.11",
              "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-2.6.11.tgz",
              "integrity": "sha512-4I6pdBY1EthSqDmJkiNk3JIT8cswwR9nfeW/cPdUagJYEQG7R95WRH74wpz7ma8Gh/9dI9FP+OU+0E4FvtA55w==",
              "requires": {
                "whatwg-url": "^5.0.0"
              }
            },
            "node-gyp-build": {
              "version": "4.6.0",
              "resolved": "https://registry.npmjs.org/node-gyp-build/-/node-gyp-build-4.6.0.tgz",
              "integrity": "sha512-NTZVKn9IylLwUzaKjkas1e4u2DLNcV4rdYagA4PWdPwW87Bi7z+BznyKSRwS/761tV/lzCGXplWsiaMjLqP2zQ=="
            },
            "node-releases": {
              "version": "2.0.13",
              "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.13.tgz",
              "integrity": "sha512-uYr7J37ae/ORWdZeQ1xxMJe3NtdmqMC/JZK+geofDrkLUApKRHPd18/TxtBOJ4A0/+uUIliorNrfYV6s1b02eQ==",
              "dev": true
            },
            "normalize-path": {
              "version": "3.0.0",
              "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
              "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
              "dev": true
            },
            "normalize-range": {
              "version": "0.1.2",
              "resolved": "https://registry.npmjs.org/normalize-range/-/normalize-range-0.1.2.tgz",
              "integrity": "sha512-bdok/XvKII3nUpklnV6P2hxtMNrCboOjAcyBuQnWEhO665FwrSNRxU+AqpsyvO6LgGYPspN+lu5CLtw4jPRKNA==",
              "dev": true
            },
            "normalize-wheel": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/normalize-wheel/-/normalize-wheel-1.0.1.tgz",
              "integrity": "sha512-1OnlAPZ3zgrk8B91HyRj+eVv+kS5u+Z0SCsak6Xil/kmgEia50ga7zfkumayonZrImffAxPU/5WcyGhzetHNPA=="
            },
            "oauth": {
              "version": "0.9.15",
              "resolved": "https://registry.npmjs.org/oauth/-/oauth-0.9.15.tgz",
              "integrity": "sha512-a5ERWK1kh38ExDEfoO6qUHJb32rd7aYmPHuyCu3Fta/cnICvYmgd2uhuKXvPD+PXB+gCEYYEaQdIRAjCOwAKNA=="
            },
            "object-assign": {
              "version": "4.1.1",
              "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
              "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
              "dev": true
            },
            "object-hash": {
              "version": "2.2.0",
              "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-2.2.0.tgz",
              "integrity": "sha512-gScRMn0bS5fH+IuwyIFgnh9zBdo4DV+6GhygmWM9HyNJSgS0hScp1f5vjtm7oIIOiT9trXrShAkLFSc2IqKNgw=="
            },
            "object-inspect": {
              "version": "1.12.3",
              "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.12.3.tgz",
              "integrity": "sha512-geUvdk7c+eizMNUDkRpW1wJwgfOiOeHbxBR/hLXK1aT6zmVSO0jsQcs7fj6MGw89jC/cjGfLcNOrtMYtGqm81g=="
            },
            "oidc-token-hash": {
              "version": "5.0.3",
              "resolved": "https://registry.npmjs.org/oidc-token-hash/-/oidc-token-hash-5.0.3.tgz",
              "integrity": "sha512-IF4PcGgzAr6XXSff26Sk/+P4KZFJVuHAJZj3wgO3vX2bMdNVp/QXTP3P7CEm9V1IdG8lDLY3HhiqpsE/nOwpPw=="
            },
            "on-exit-leak-free": {
              "version": "0.2.0",
              "resolved": "https://registry.npmjs.org/on-exit-leak-free/-/on-exit-leak-free-0.2.0.tgz",
              "integrity": "sha512-dqaz3u44QbRXQooZLTUKU41ZrzYrcvLISVgbrzbyCMxpmSLJvZ3ZamIJIZ29P6OhZIkNIQKosdeM6t1LYbA9hg=="
            },
            "once": {
              "version": "1.4.0",
              "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
              "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
              "requires": {
                "wrappy": "1"
              }
            },
            "openid-client": {
              "version": "5.4.2",
              "resolved": "https://registry.npmjs.org/openid-client/-/openid-client-5.4.2.tgz",
              "integrity": "sha512-lIhsdPvJ2RneBm3nGBBhQchpe3Uka//xf7WPHTIglery8gnckvW7Bd9IaQzekzXJvWthCMyi/xVEyGW0RFPytw==",
              "requires": {
                "jose": "^4.14.1",
                "lru-cache": "^6.0.0",
                "object-hash": "^2.2.0",
                "oidc-token-hash": "^5.0.3"
              }
            },
            "outdent": {
              "version": "0.8.0",
              "resolved": "https://registry.npmjs.org/outdent/-/outdent-0.8.0.tgz",
              "integrity": "sha512-KiOAIsdpUTcAXuykya5fnVVT+/5uS0Q1mrkRHcF89tpieSmY33O/tmc54CqwA+bfhbtEfZUNLHaPUiB9X3jt1A=="
            },
            "p-limit": {
              "version": "2.3.0",
              "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.3.0.tgz",
              "integrity": "sha512-//88mFWSJx8lxCzwdAABTJL2MyWB12+eIY7MDL2SqLmAkeKU9qxRvWuSyTjm3FUmpBEMuFfckAIqEaVGUDxb6w==",
              "requires": {
                "p-try": "^2.0.0"
              }
            },
            "p-locate": {
              "version": "4.1.0",
              "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-4.1.0.tgz",
              "integrity": "sha512-R79ZZ/0wAxKGu3oYMlz8jy/kbhsNrS7SKZ7PxEHBgJ5+F2mtFW2fK2cOtBh1cHYkQsbzFV7I+EoRKe6Yt0oK7A==",
              "requires": {
                "p-limit": "^2.2.0"
              }
            },
            "p-try": {
              "version": "2.2.0",
              "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
              "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ=="
            },
            "path-exists": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
              "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w=="
            },
            "path-is-absolute": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
              "integrity": "sha512-AVbw3UJ2e9bq64vSaS9Am0fje1Pa8pbGqTTsmXfaIiMpnr5DlDhfJOuLj9Sf95ZPVDAUerDfEk88MPmPe7UCQg==",
              "dev": true
            },
            "path-parse": {
              "version": "1.0.7",
              "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
              "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
              "dev": true
            },
            "picocolors": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.0.0.tgz",
              "integrity": "sha512-1fygroTLlHu66zi26VoTDv8yRgm0Fccecssto+MhsZ0D/DGW2sm8E8AjW7NU5VVTRt5GxbeZ5qBuJr+HyLYkjQ=="
            },
            "picomatch": {
              "version": "2.3.1",
              "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
              "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
              "dev": true
            },
            "pify": {
              "version": "3.0.0",
              "resolved": "https://registry.npmjs.org/pify/-/pify-3.0.0.tgz",
              "integrity": "sha512-C3FsVNH1udSEX48gGX1xfvwTWfsYWj5U+8/uK15BGzIGrKoUpghX8hWZwa/OFnakBiiVNmBvemTJR5mcy7iPcg=="
            },
            "pino": {
              "version": "7.11.0",
              "resolved": "https://registry.npmjs.org/pino/-/pino-7.11.0.tgz",
              "integrity": "sha512-dMACeu63HtRLmCG8VKdy4cShCPKaYDR4youZqoSWLxl5Gu99HUw8bw75thbPv9Nip+H+QYX8o3ZJbTdVZZ2TVg==",
              "requires": {
                "atomic-sleep": "^1.0.0",
                "fast-redact": "^3.0.0",
                "on-exit-leak-free": "^0.2.0",
                "pino-abstract-transport": "v0.5.0",
                "pino-std-serializers": "^4.0.0",
                "process-warning": "^1.0.0",
                "quick-format-unescaped": "^4.0.3",
                "real-require": "^0.1.0",
                "safe-stable-stringify": "^2.1.0",
                "sonic-boom": "^2.2.1",
                "thread-stream": "^0.15.1"
              }
            },
            "pino-abstract-transport": {
              "version": "0.5.0",
              "resolved": "https://registry.npmjs.org/pino-abstract-transport/-/pino-abstract-transport-0.5.0.tgz",
              "integrity": "sha512-+KAgmVeqXYbTtU2FScx1XS3kNyfZ5TrXY07V96QnUSFqo2gAqlvmaxH67Lj7SWazqsMabf+58ctdTcBgnOLUOQ==",
              "requires": {
                "duplexify": "^4.1.2",
                "split2": "^4.0.0"
              }
            },
            "pino-std-serializers": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/pino-std-serializers/-/pino-std-serializers-4.0.0.tgz",
              "integrity": "sha512-cK0pekc1Kjy5w9V2/n+8MkZwusa6EyyxfeQCB799CQRhRt/CqYKiWs5adeu8Shve2ZNffvfC/7J64A2PJo1W/Q=="
            },
            "pirates": {
              "version": "4.0.6",
              "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.6.tgz",
              "integrity": "sha512-saLsH7WeYYPiD25LDuLRRY/i+6HaPYr6G1OUlN39otzkSTxKnubR9RTxS3/Kk50s1g2JTgFwWQDQyplC5/SHZg==",
              "dev": true
            },
            "pngjs": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/pngjs/-/pngjs-5.0.0.tgz",
              "integrity": "sha512-40QW5YalBNfQo5yRYmiw7Yz6TKKVr3h6970B2YE+3fQpsWcrbj1PzJgxeJ19DRQjhMbKPIuMY8rFaXc8moolVw=="
            },
            "postcss": {
              "version": "8.4.31",
              "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.31.tgz",
              "integrity": "sha512-PS08Iboia9mts/2ygV3eLpY5ghnUcfLV/EXTOW1E2qYxJKGGBUtNjN76FYHnMs36RmARn41bC0AZmn+rR0OVpQ==",
              "requires": {
                "nanoid": "^3.3.6",
                "picocolors": "^1.0.0",
                "source-map-js": "^1.0.2"
              }
            },
            "postcss-import": {
              "version": "15.1.0",
              "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
              "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
              "dev": true,
              "requires": {
                "postcss-value-parser": "^4.0.0",
                "read-cache": "^1.0.0",
                "resolve": "^1.1.7"
              }
            },
            "postcss-js": {
              "version": "4.0.1",
              "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.0.1.tgz",
              "integrity": "sha512-dDLF8pEO191hJMtlHFPRa8xsizHaM82MLfNkUHdUtVEV3tgTp5oj+8qbEqYM57SLfc74KSbw//4SeJma2LRVIw==",
              "dev": true,
              "requires": {
                "camelcase-css": "^2.0.1"
              }
            },
            "postcss-load-config": {
              "version": "4.0.1",
              "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-4.0.1.tgz",
              "integrity": "sha512-vEJIc8RdiBRu3oRAI0ymerOn+7rPuMvRXslTvZUKZonDHFIczxztIyJ1urxM1x9JXEikvpWWTUUqal5j/8QgvA==",
              "dev": true,
              "requires": {
                "lilconfig": "^2.0.5",
                "yaml": "^2.1.1"
              }
            },
            "postcss-nested": {
              "version": "6.0.1",
              "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.0.1.tgz",
              "integrity": "sha512-mEp4xPMi5bSWiMbsgoPfcP74lsWLHkQbZc3sY+jWYd65CUwXrUaTp0fmNpa01ZcETKlIgUdFN/MpS2xZtqL9dQ==",
              "dev": true,
              "requires": {
                "postcss-selector-parser": "^6.0.11"
              }
            },
            "postcss-selector-parser": {
              "version": "6.0.13",
              "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.0.13.tgz",
              "integrity": "sha512-EaV1Gl4mUEV4ddhDnv/xtj7sxwrwxdetHdWUGnT4VJQf+4d05v6lHYZr8N573k5Z0BViss7BDhfWtKS3+sfAqQ==",
              "dev": true,
              "requires": {
                "cssesc": "^3.0.0",
                "util-deprecate": "^1.0.2"
              }
            },
            "postcss-value-parser": {
              "version": "4.2.0",
              "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
              "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
              "dev": true
            },
            "preact": {
              "version": "10.15.0",
              "resolved": "https://registry.npmjs.org/preact/-/preact-10.15.0.tgz",
              "integrity": "sha512-nZSa8M2R2m1n7nJSBlzDpxRJaIsejrTO1vlFbdpFvyC8qM1iU+On2y0otfoUm6SRB5o0lF0CKDFxg6grEFU0iQ=="
            },
            "preact-render-to-string": {
              "version": "5.2.6",
              "resolved": "https://registry.npmjs.org/preact-render-to-string/-/preact-render-to-string-5.2.6.tgz",
              "integrity": "sha512-JyhErpYOvBV1hEPwIxc/fHWXPfnEGdRKxc8gFdAZ7XV4tlzyzG847XAyEZqoDnynP88akM4eaHcSOzNcLWFguw==",
              "requires": {
                "pretty-format": "^3.8.0"
              }
            },
            "pretty-format": {
              "version": "3.8.0",
              "resolved": "https://registry.npmjs.org/pretty-format/-/pretty-format-3.8.0.tgz",
              "integrity": "sha512-WuxUnVtlWL1OfZFQFuqvnvs6MiAGk9UNsBostyBOB0Is9wb5uRESevA6rnl/rkksXaGX3GzZhPup5d6Vp1nFew=="
            },
            "process-warning": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/process-warning/-/process-warning-1.0.0.tgz",
              "integrity": "sha512-du4wfLyj4yCZq1VupnVSZmRsPJsNuxoDQFdCFHLaYiEbFBD7QE0a+I4D7hOxrVnh78QE/YipFAj9lXHiXocV+Q=="
            },
            "proxy-compare": {
              "version": "2.5.1",
              "resolved": "https://registry.npmjs.org/proxy-compare/-/proxy-compare-2.5.1.tgz",
              "integrity": "sha512-oyfc0Tx87Cpwva5ZXezSp5V9vht1c7dZBhvuV/y3ctkgMVUmiAGDVeeB0dKhGSyT0v1ZTEQYpe/RXlBVBNuCLA=="
            },
            "punycode": {
              "version": "2.3.0",
              "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.0.tgz",
              "integrity": "sha512-rRV+zQD8tVFys26lAGR9WUuS4iUAngJScM+ZRSKtvl5tKeZ2t5bvdNFdNHBW9FWR4guGHlgmsZ1G7BSm2wTbuA=="
            },
            "pvtsutils": {
              "version": "1.3.2",
              "resolved": "https://registry.npmjs.org/pvtsutils/-/pvtsutils-1.3.2.tgz",
              "integrity": "sha512-+Ipe2iNUyrZz+8K/2IOo+kKikdtfhRKzNpQbruF2URmqPtoqAs8g3xS7TJvFF2GcPXjh7DkqMnpVveRFq4PgEQ==",
              "requires": {
                "tslib": "^2.4.0"
              }
            },
            "pvutils": {
              "version": "1.1.3",
              "resolved": "https://registry.npmjs.org/pvutils/-/pvutils-1.1.3.tgz",
              "integrity": "sha512-pMpnA0qRdFp32b1sJl1wOJNxZLQ2cbQx+k6tjNtZ8CpvVhNqEPRgivZ2WOUev2YMajecdH7ctUPDvEe87nariQ=="
            },
            "qrcode": {
              "version": "1.5.0",
              "resolved": "https://registry.npmjs.org/qrcode/-/qrcode-1.5.0.tgz",
              "integrity": "sha512-9MgRpgVc+/+47dFvQeD6U2s0Z92EsKzcHogtum4QB+UNd025WOJSHvn/hjk9xmzj7Stj95CyUAs31mrjxliEsQ==",
              "requires": {
                "dijkstrajs": "^1.0.1",
                "encode-utf8": "^1.0.3",
                "pngjs": "^5.0.0",
                "yargs": "^15.3.1"
              }
            },
            "qrcode.react": {
              "version": "3.1.0",
              "resolved": "https://registry.npmjs.org/qrcode.react/-/qrcode.react-3.1.0.tgz",
              "integrity": "sha512-oyF+Urr3oAMUG/OiOuONL3HXM+53wvuH3mtIWQrYmsXoAq0DkvZp2RYUWFSMFtbdOpuS++9v+WAkzNVkMlNW6Q==",
              "requires": {}
            },
            "qs": {
              "version": "6.11.2",
              "resolved": "https://registry.npmjs.org/qs/-/qs-6.11.2.tgz",
              "integrity": "sha512-tDNIz22aBzCDxLtVH++VnTfzxlfeK5CbqohpSqpJgj1Wg/cQbStNAz3NuqCs5vV+pjBsK4x4pN9HlVh7rcYRiA==",
              "requires": {
                "side-channel": "^1.0.4"
              }
            },
            "query-string": {
              "version": "6.14.1",
              "resolved": "https://registry.npmjs.org/query-string/-/query-string-6.14.1.tgz",
              "integrity": "sha512-XDxAeVmpfu1/6IjyT/gXHOl+S0vQ9owggJ30hhWKdHAsNPOcasn5o9BW0eejZqL2e4vMjhAxoW3jVHcD6mbcYw==",
              "requires": {
                "decode-uri-component": "^0.2.0",
                "filter-obj": "^1.1.0",
                "split-on-first": "^1.0.0",
                "strict-uri-encode": "^2.0.0"
              }
            },
            "queue-microtask": {
              "version": "1.2.3",
              "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
              "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
              "dev": true
            },
            "quick-format-unescaped": {
              "version": "4.0.4",
              "resolved": "https://registry.npmjs.org/quick-format-unescaped/-/quick-format-unescaped-4.0.4.tgz",
              "integrity": "sha512-tYC1Q1hgyRuHgloV/YXs2w15unPVh8qfu/qCTfhTYamaw7fyhumKa2yGpdSo87vY32rIclj+4fWYQXUMs9EHvg=="
            },
            "randombytes": {
              "version": "2.1.0",
              "resolved": "https://registry.npmjs.org/randombytes/-/randombytes-2.1.0.tgz",
              "integrity": "sha512-vYl3iOX+4CKUWuxGi9Ukhie6fsqXqS9FE2Zaic4tNFD2N2QQaXOMFbuKK4QmDHC0JO6B1Zp41J0LpT0oR68amQ==",
              "requires": {
                "safe-buffer": "^5.1.0"
              }
            },
            "rc-align": {
              "version": "4.0.15",
              "resolved": "https://registry.npmjs.org/rc-align/-/rc-align-4.0.15.tgz",
              "integrity": "sha512-wqJtVH60pka/nOX7/IspElA8gjPNQKIx/ZqJ6heATCkXpe1Zg4cPVrMD2vC96wjsFFL8WsmhPbx9tdMo1qqlIA==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "classnames": "2.x",
                "dom-align": "^1.7.0",
                "rc-util": "^5.26.0",
                "resize-observer-polyfill": "^1.5.1"
              }
            },
            "rc-cascader": {
              "version": "3.14.1",
              "resolved": "https://registry.npmjs.org/rc-cascader/-/rc-cascader-3.14.1.tgz",
              "integrity": "sha512-fCsgjLIQqYZMhFj9UT+x2ZW4uobx7OP5yivcn6Xto5fuxHaldphsryzCeUVmreQOHEo0RP+032Ip9RDzrKVKJA==",
              "requires": {
                "@babel/runtime": "^7.12.5",
                "array-tree-filter": "^2.1.0",
                "classnames": "^2.3.1",
                "rc-select": "~14.7.0",
                "rc-tree": "~5.7.0",
                "rc-util": "^5.35.0"
              }
            },
            "rc-checkbox": {
              "version": "3.1.0",
              "resolved": "https://registry.npmjs.org/rc-checkbox/-/rc-checkbox-3.1.0.tgz",
              "integrity": "sha512-PAwpJFnBa3Ei+5pyqMMXdcKYKNBMS+TvSDiLdDnARnMJHC8ESxwPfm4Ao1gJiKtWLdmGfigascnCpwrHFgoOBQ==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "classnames": "^2.3.2",
                "rc-util": "^5.25.2"
              }
            },
            "rc-collapse": {
              "version": "3.7.1",
              "resolved": "https://registry.npmjs.org/rc-collapse/-/rc-collapse-3.7.1.tgz",
              "integrity": "sha512-N/7ejyiTf3XElNJBBpxqnZBUuMsQWEOPjB2QkfNvZ/Ca54eAvJXuOD1EGbCWCk2m7v/MSxku7mRpdeaLOCd4Gg==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "classnames": "2.x",
                "rc-motion": "^2.3.4",
                "rc-util": "^5.27.0"
              }
            },
            "rc-dialog": {
              "version": "9.1.0",
              "resolved": "https://registry.npmjs.org/rc-dialog/-/rc-dialog-9.1.0.tgz",
              "integrity": "sha512-5ry+JABAWEbaKyYsmITtrJbZbJys8CtMyzV8Xn4LYuXMeUx5XVHNyJRoqLFE4AzBuXXzOWeaC49cg+XkxK6kHA==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "@rc-component/portal": "^1.0.0-8",
                "classnames": "^2.2.6",
                "rc-motion": "^2.3.0",
                "rc-util": "^5.21.0"
              }
            },
            "rc-drawer": {
              "version": "6.2.0",
              "resolved": "https://registry.npmjs.org/rc-drawer/-/rc-drawer-6.2.0.tgz",
              "integrity": "sha512-spPkZ3WvP0U0vy5dyzSwlUJ/+vLFtjP/cTwSwejhQRoDBaexSZHsBhELoCZcEggI7LQ7typmtG30lAue2HEhvA==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "@rc-component/portal": "^1.1.1",
                "classnames": "^2.2.6",
                "rc-motion": "^2.6.1",
                "rc-util": "^5.21.2"
              }
            },
            "rc-dropdown": {
              "version": "4.1.0",
              "resolved": "https://registry.npmjs.org/rc-dropdown/-/rc-dropdown-4.1.0.tgz",
              "integrity": "sha512-VZjMunpBdlVzYpEdJSaV7WM7O0jf8uyDjirxXLZRNZ+tAC+NzD3PXPEtliFwGzVwBBdCmGuSqiS9DWcOLxQ9tw==",
              "requires": {
                "@babel/runtime": "^7.18.3",
                "@rc-component/trigger": "^1.7.0",
                "classnames": "^2.2.6",
                "rc-util": "^5.17.0"
              }
            },
            "rc-field-form": {
              "version": "1.36.2",
              "resolved": "https://registry.npmjs.org/rc-field-form/-/rc-field-form-1.36.2.tgz",
              "integrity": "sha512-tCF/JjUsnxW80Gk4E4ZH74ONsaQMxVTRtui6XhQB8DJc4FHWLLa5pP8zwhxtPKC5NaO0QZ0Cv79JggDubn6n2g==",
              "requires": {
                "@babel/runtime": "^7.18.0",
                "async-validator": "^4.1.0",
                "rc-util": "^5.32.2"
              }
            },
            "rc-image": {
              "version": "7.1.3",
              "resolved": "https://registry.npmjs.org/rc-image/-/rc-image-7.1.3.tgz",
              "integrity": "sha512-foMl1rcit1F0+vgxE5kf0c8TygQcHhILsOohQUL+JMUbzOo3OBFRcehJudYbqbCTArzCecS8nA1irUU9vvgQbg==",
              "requires": {
                "@babel/runtime": "^7.11.2",
                "@rc-component/portal": "^1.0.2",
                "classnames": "^2.2.6",
                "rc-dialog": "~9.1.0",
                "rc-motion": "^2.6.2",
                "rc-util": "^5.34.1"
              }
            },
            "rc-input": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/rc-input/-/rc-input-1.1.1.tgz",
              "integrity": "sha512-NTR1Z4em681L8/ewb2KR80RykSmN8I2mzqzJDCoUmTrV1BB9Hk5d7ha4TnfgdEPPL148N+603sW2LExSXk1IbA==",
              "requires": {
                "@babel/runtime": "^7.11.1",
                "classnames": "^2.2.1",
                "rc-util": "^5.18.1"
              }
            },
            "rc-input-number": {
              "version": "8.0.4",
              "resolved": "https://registry.npmjs.org/rc-input-number/-/rc-input-number-8.0.4.tgz",
              "integrity": "sha512-TP+G5b7mZtbwXJ/YEZXF/OgbEZ6iqD4+RSuxZJ8VGKGXDcdt0FKIvpFoNQr/knspdFC4OxA0OfsWfFWfN4XSyA==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "@rc-component/mini-decimal": "^1.0.1",
                "classnames": "^2.2.5",
                "rc-input": "~1.1.0",
                "rc-util": "^5.28.0"
              }
            },
            "rc-mentions": {
              "version": "2.5.0",
              "resolved": "https://registry.npmjs.org/rc-mentions/-/rc-mentions-2.5.0.tgz",
              "integrity": "sha512-rERXsbUTNVrb5T/iDC0ki/SRGWJnOVraDy6O25Us3FSpuUZ3uq2TPZB4fRk0Hss5kyiEPzz2sprhkI4b+F4jUw==",
              "requires": {
                "@babel/runtime": "^7.22.5",
                "@rc-component/trigger": "^1.5.0",
                "classnames": "^2.2.6",
                "rc-input": "~1.1.0",
                "rc-menu": "~9.10.0",
                "rc-textarea": "~1.3.0",
                "rc-util": "^5.22.5"
              }
            },
            "rc-menu": {
              "version": "9.10.0",
              "resolved": "https://registry.npmjs.org/rc-menu/-/rc-menu-9.10.0.tgz",
              "integrity": "sha512-g27kpXaAoJh/fkPZF65/d4V+w4DhDeqomBdPcGnkFAcJnEM4o21TnVccrBUoDedLKzC7wJRw1Q7VTqEsfEufmw==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "@rc-component/trigger": "^1.6.2",
                "classnames": "2.x",
                "rc-motion": "^2.4.3",
                "rc-overflow": "^1.3.1",
                "rc-util": "^5.27.0"
              }
            },
            "rc-motion": {
              "version": "2.7.3",
              "resolved": "https://registry.npmjs.org/rc-motion/-/rc-motion-2.7.3.tgz",
              "integrity": "sha512-2xUvo8yGHdOHeQbdI8BtBsCIrWKchEmFEIskf0nmHtJsou+meLd/JE+vnvSX2JxcBrJtXY2LuBpxAOxrbY/wMQ==",
              "requires": {
                "@babel/runtime": "^7.11.1",
                "classnames": "^2.2.1",
                "rc-util": "^5.21.0"
              }
            },
            "rc-notification": {
              "version": "5.0.5",
              "resolved": "https://registry.npmjs.org/rc-notification/-/rc-notification-5.0.5.tgz",
              "integrity": "sha512-uEz2jggourwv/rR0obe7RHEa63UchqX4k+e+Qt2c3LaY7U9Tc+L6ANhzgCKYSA/afm0ebjmNZHoB5Cv47xEOcA==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "classnames": "2.x",
                "rc-motion": "^2.6.0",
                "rc-util": "^5.20.1"
              }
            },
            "rc-overflow": {
              "version": "1.3.1",
              "resolved": "https://registry.npmjs.org/rc-overflow/-/rc-overflow-1.3.1.tgz",
              "integrity": "sha512-RY0nVBlfP9CkxrpgaLlGzkSoh9JhjJLu6Icqs9E7CW6Ewh9s0peF9OHIex4OhfoPsR92LR0fN6BlCY9Z4VoUtA==",
              "requires": {
                "@babel/runtime": "^7.11.1",
                "classnames": "^2.2.1",
                "rc-resize-observer": "^1.0.0",
                "rc-util": "^5.19.2"
              }
            },
            "rc-pagination": {
              "version": "3.5.0",
              "resolved": "https://registry.npmjs.org/rc-pagination/-/rc-pagination-3.5.0.tgz",
              "integrity": "sha512-lUBVtVVUn7gGsq4mTyVpcZQr+AMcljbMiL/HcCmSdFrcsK0iZVKwwbXDxhz2IV0JXUs9Hzepr5sQFaF+9ad/pQ==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "classnames": "^2.2.1",
                "rc-util": "^5.32.2"
              }
            },
            "rc-picker": {
              "version": "3.13.0",
              "resolved": "https://registry.npmjs.org/rc-picker/-/rc-picker-3.13.0.tgz",
              "integrity": "sha512-hJ+1lGkemnvsW+t+PjH9OAehHlj7wdD0G75T1HZj0IeZTqBE/5mmuf8E8MHYATNBqW409lAfk8GwjYm1WVMopg==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "@rc-component/trigger": "^1.5.0",
                "classnames": "^2.2.1",
                "rc-util": "^5.30.0"
              }
            },
            "rc-progress": {
              "version": "3.4.2",
              "resolved": "https://registry.npmjs.org/rc-progress/-/rc-progress-3.4.2.tgz",
              "integrity": "sha512-iAGhwWU+tsayP+Jkl9T4+6rHeQTG9kDz8JAHZk4XtQOcYN5fj9H34NXNEdRdZx94VUDHMqCb1yOIvi8eJRh67w==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "classnames": "^2.2.6",
                "rc-util": "^5.16.1"
              }
            },
            "rc-rate": {
              "version": "2.12.0",
              "resolved": "https://registry.npmjs.org/rc-rate/-/rc-rate-2.12.0.tgz",
              "integrity": "sha512-g092v5iZCdVzbjdn28FzvWebK2IutoVoiTeqoLTj9WM7SjA/gOJIw5/JFZMRyJYYVe1jLAU2UhAfstIpCNRozg==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "classnames": "^2.2.5",
                "rc-util": "^5.0.1"
              }
            },
            "rc-resize-observer": {
              "version": "1.3.1",
              "resolved": "https://registry.npmjs.org/rc-resize-observer/-/rc-resize-observer-1.3.1.tgz",
              "integrity": "sha512-iFUdt3NNhflbY3mwySv5CA1TC06zdJ+pfo0oc27xpf4PIOvfZwZGtD9Kz41wGYqC4SLio93RVAirSSpYlV/uYg==",
              "requires": {
                "@babel/runtime": "^7.20.7",
                "classnames": "^2.2.1",
                "rc-util": "^5.27.0",
                "resize-observer-polyfill": "^1.5.1"
              }
            },
            "rc-segmented": {
              "version": "2.2.2",
              "resolved": "https://registry.npmjs.org/rc-segmented/-/rc-segmented-2.2.2.tgz",
              "integrity": "sha512-Mq52M96QdHMsNdE/042ibT5vkcGcD5jxKp7HgPC2SRofpia99P5fkfHy1pEaajLMF/kj0+2Lkq1UZRvqzo9mSA==",
              "requires": {
                "@babel/runtime": "^7.11.1",
                "classnames": "^2.2.1",
                "rc-motion": "^2.4.4",
                "rc-util": "^5.17.0"
              }
            },
            "rc-select": {
              "version": "14.7.4",
              "resolved": "https://registry.npmjs.org/rc-select/-/rc-select-14.7.4.tgz",
              "integrity": "sha512-qRUpvMVXFy6rdHe+qzHXAqyQAfhErC/oY8dcRtoRjoz0lz2Nx3J+lLL5AnEbjnwlS+/kQTJUZ/65WyCwWwcLwQ==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "@rc-component/trigger": "^1.5.0",
                "classnames": "2.x",
                "rc-motion": "^2.0.1",
                "rc-overflow": "^1.3.1",
                "rc-util": "^5.16.1",
                "rc-virtual-list": "^3.5.2"
              }
            },
            "rc-slider": {
              "version": "10.1.1",
              "resolved": "https://registry.npmjs.org/rc-slider/-/rc-slider-10.1.1.tgz",
              "integrity": "sha512-gn8oXazZISEhnmRinI89Z/JD/joAaM35jp+gDtIVSTD/JJMCCBqThqLk1SVJmvtfeiEF/kKaFY0+qt4SDHFUDw==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "classnames": "^2.2.5",
                "rc-util": "^5.27.0"
              }
            },
            "rc-steps": {
              "version": "6.0.1",
              "resolved": "https://registry.npmjs.org/rc-steps/-/rc-steps-6.0.1.tgz",
              "integrity": "sha512-lKHL+Sny0SeHkQKKDJlAjV5oZ8DwCdS2hFhAkIjuQt1/pB81M0cA0ErVFdHq9+jmPmFw1vJB2F5NBzFXLJxV+g==",
              "requires": {
                "@babel/runtime": "^7.16.7",
                "classnames": "^2.2.3",
                "rc-util": "^5.16.1"
              }
            },
            "rc-switch": {
              "version": "4.1.0",
              "resolved": "https://registry.npmjs.org/rc-switch/-/rc-switch-4.1.0.tgz",
              "integrity": "sha512-TI8ufP2Az9oEbvyCeVE4+90PDSljGyuwix3fV58p7HV2o4wBnVToEyomJRVyTaZeqNPAp+vqeo4Wnj5u0ZZQBg==",
              "requires": {
                "@babel/runtime": "^7.21.0",
                "classnames": "^2.2.1",
                "rc-util": "^5.30.0"
              }
            },
            "rc-table": {
              "version": "7.32.2",
              "resolved": "https://registry.npmjs.org/rc-table/-/rc-table-7.32.2.tgz",
              "integrity": "sha512-2JlUXlsZNLYO5hMb/8GAHBp7+fAvuYHt8ps641DCEDttQWIBe049CGcL2aqol1xHQyDpXWTCWS69gmkKkCwD5w==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "@rc-component/context": "^1.3.0",
                "classnames": "^2.2.5",
                "rc-resize-observer": "^1.1.0",
                "rc-util": "^5.27.1"
              }
            },
            "rc-tabs": {
              "version": "12.9.0",
              "resolved": "https://registry.npmjs.org/rc-tabs/-/rc-tabs-12.9.0.tgz",
              "integrity": "sha512-2HnVowgMVrq0DfQtyu4mCd9E6pXlWNdM6VaDvOOHMsLYqPmpY+7zBqUC6YrrQ9xYXHciTS0e7TtjOHIvpVCHLQ==",
              "requires": {
                "@babel/runtime": "^7.11.2",
                "classnames": "2.x",
                "rc-dropdown": "~4.1.0",
                "rc-menu": "~9.10.0",
                "rc-motion": "^2.6.2",
                "rc-resize-observer": "^1.0.0",
                "rc-util": "^5.16.0"
              }
            },
            "rc-textarea": {
              "version": "1.3.4",
              "resolved": "https://registry.npmjs.org/rc-textarea/-/rc-textarea-1.3.4.tgz",
              "integrity": "sha512-wn0YjTpvcVolcfXa0HtzL+jgV2QcwtfB29RwNAKj8hMgZOju1V24M3TfEDjABeQEAQbUGbjMbISREOX/YSVKhg==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "classnames": "^2.2.1",
                "rc-input": "~1.1.0",
                "rc-resize-observer": "^1.0.0",
                "rc-util": "^5.27.0"
              }
            },
            "rc-tooltip": {
              "version": "6.0.1",
              "resolved": "https://registry.npmjs.org/rc-tooltip/-/rc-tooltip-6.0.1.tgz",
              "integrity": "sha512-MdvPlsD1fDSxKp9+HjXrc/CxLmA/s11QYIh1R7aExxfodKP7CZA++DG1AjrW80F8IUdHYcR43HAm0Y2BYPelHA==",
              "requires": {
                "@babel/runtime": "^7.11.2",
                "@rc-component/trigger": "^1.0.4",
                "classnames": "^2.3.1"
              }
            },
            "rc-tree": {
              "version": "5.7.9",
              "resolved": "https://registry.npmjs.org/rc-tree/-/rc-tree-5.7.9.tgz",
              "integrity": "sha512-1hKkToz/EVjJlMVwmZnpXeLXt/1iQMsaAq9m+GNkUbK746gkc7QpJXSN/TzjhTI5Hi+LOSlrMaXLMT0bHPqILQ==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "classnames": "2.x",
                "rc-motion": "^2.0.1",
                "rc-util": "^5.16.1",
                "rc-virtual-list": "^3.5.1"
              }
            },
            "rc-tree-select": {
              "version": "5.11.1",
              "resolved": "https://registry.npmjs.org/rc-tree-select/-/rc-tree-select-5.11.1.tgz",
              "integrity": "sha512-EDG1rYFu1iD2Y8fg0yEmm0LV3XqWOy+SpgOMvO5396NgAZ67t0zVTNK6FQkIxzdXf5ri742BkB/B8+Ah6+0Kxw==",
              "requires": {
                "@babel/runtime": "^7.10.1",
                "classnames": "2.x",
                "rc-select": "~14.7.0",
                "rc-tree": "~5.7.0",
                "rc-util": "^5.16.1"
              }
            },
            "rc-upload": {
              "version": "4.3.4",
              "resolved": "https://registry.npmjs.org/rc-upload/-/rc-upload-4.3.4.tgz",
              "integrity": "sha512-uVbtHFGNjHG/RyAfm9fluXB6pvArAGyAx8z7XzXXyorEgVIWj6mOlriuDm0XowDHYz4ycNK0nE0oP3cbFnzxiQ==",
              "requires": {
                "@babel/runtime": "^7.18.3",
                "classnames": "^2.2.5",
                "rc-util": "^5.2.0"
              }
            },
            "rc-util": {
              "version": "5.36.0",
              "resolved": "https://registry.npmjs.org/rc-util/-/rc-util-5.36.0.tgz",
              "integrity": "sha512-a4uUvT+UNHvYL+awzbN8H8zAjfduwY4KAp2wQy40wOz3NyBdo3Xhx/EAAPyDkHLoGm535jIACaMhIqExGiAjHw==",
              "requires": {
                "@babel/runtime": "^7.18.3",
                "react-is": "^16.12.0"
              }
            },
            "rc-virtual-list": {
              "version": "3.5.3",
              "resolved": "https://registry.npmjs.org/rc-virtual-list/-/rc-virtual-list-3.5.3.tgz",
              "integrity": "sha512-rG6IuD4EYM8K6oZ8Shu2BC/CmcTdqng4yBWkc/5fjWhB20bl6QwR2Upyt7+MxvfscoVm8zOQY+tcpEO5cu4GaQ==",
              "requires": {
                "@babel/runtime": "^7.20.0",
                "classnames": "^2.2.6",
                "rc-resize-observer": "^1.0.0",
                "rc-util": "^5.15.0"
              }
            },
            "react": {
              "version": "18.2.0",
              "resolved": "https://registry.npmjs.org/react/-/react-18.2.0.tgz",
              "integrity": "sha512-/3IjMdb2L9QbBdWiW5e3P2/npwMBaU9mHCSCUzNln0ZCYbcfTsGbTJrU/kGemdH2IWmB2ioZ+zkxtmq6g09fGQ==",
              "requires": {
                "loose-envify": "^1.1.0"
              }
            },
            "react-dom": {
              "version": "18.2.0",
              "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-18.2.0.tgz",
              "integrity": "sha512-6IMTriUmvsjHUjNtEDudZfuDQUoWXVxKHhlEGSk81n4YFS+r/Kl99wXiwlVXtPBtJenozv2P+hxDsw9eA7Xo6g==",
              "requires": {
                "loose-envify": "^1.1.0",
                "scheduler": "^0.23.0"
              }
            },
            "react-easy-crop": {
              "version": "4.7.5",
              "resolved": "https://registry.npmjs.org/react-easy-crop/-/react-easy-crop-4.7.5.tgz",
              "integrity": "sha512-qKfI4PuhaH1jOLC3DQfQB0cE0z+3N7bfyPkPejQmylXNb8nstfPMH+oHj3gKgpBHLFUiQp/C1rY7sVCVgtjn3Q==",
              "requires": {
                "normalize-wheel": "^1.0.1",
                "tslib": "2.0.1"
              },
              "dependencies": {
                "tslib": {
                  "version": "2.0.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.0.1.tgz",
                  "integrity": "sha512-SgIkNheinmEBgx1IUNirK0TUD4X9yjjBRTqqjggWCU3pUEqIk3/Uwl3yRixYKT6WjQuGiwDv4NomL3wqRCj+CQ=="
                }
              }
            },
            "react-hot-toast": {
              "version": "2.4.1",
              "resolved": "https://registry.npmjs.org/react-hot-toast/-/react-hot-toast-2.4.1.tgz",
              "integrity": "sha512-j8z+cQbWIM5LY37pR6uZR6D4LfseplqnuAO4co4u8917hBUvXlEqyP1ZzqVLcqoyUesZZv/ImreoCeHVDpE5pQ==",
              "requires": {
                "goober": "^2.1.10"
              }
            },
            "react-is": {
              "version": "16.13.1",
              "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
              "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ=="
            },
            "react-redux": {
              "version": "8.1.2",
              "resolved": "https://registry.npmjs.org/react-redux/-/react-redux-8.1.2.tgz",
              "integrity": "sha512-xJKYI189VwfsFc4CJvHqHlDrzyFTY/3vZACbE+rr/zQ34Xx1wQfB4OTOSeOSNrF6BDVe8OOdxIrAnMGXA3ggfw==",
              "requires": {
                "@babel/runtime": "^7.12.1",
                "@types/hoist-non-react-statics": "^3.3.1",
                "@types/use-sync-external-store": "^0.0.3",
                "hoist-non-react-statics": "^3.3.2",
                "react-is": "^18.0.0",
                "use-sync-external-store": "^1.0.0"
              },
              "dependencies": {
                "react-is": {
                  "version": "18.2.0",
                  "resolved": "https://registry.npmjs.org/react-is/-/react-is-18.2.0.tgz",
                  "integrity": "sha512-xWGDIW6x921xtzPkhiULtthJHoJvBbF3q26fzloPCK0hsvxtPVelvftw3zjbHWSkR2km9Z+4uxbDDK/6Zw9B8w=="
                }
              }
            },
            "react-remove-scroll": {
              "version": "2.5.4",
              "resolved": "https://registry.npmjs.org/react-remove-scroll/-/react-remove-scroll-2.5.4.tgz",
              "integrity": "sha512-xGVKJJr0SJGQVirVFAUZ2k1QLyO6m+2fy0l8Qawbp5Jgrv3DeLalrfMNBFSlmz5kriGGzsVBtGVnf4pTKIhhWA==",
              "requires": {
                "react-remove-scroll-bar": "^2.3.3",
                "react-style-singleton": "^2.2.1",
                "tslib": "^2.1.0",
                "use-callback-ref": "^1.3.0",
                "use-sidecar": "^1.1.2"
              }
            },
            "react-remove-scroll-bar": {
              "version": "2.3.4",
              "resolved": "https://registry.npmjs.org/react-remove-scroll-bar/-/react-remove-scroll-bar-2.3.4.tgz",
              "integrity": "sha512-63C4YQBUt0m6ALadE9XV56hV8BgJWDmmTPY758iIJjfQKt2nYwoUrPk0LXRXcB/yIj82T1/Ixfdpdk68LwIB0A==",
              "requires": {
                "react-style-singleton": "^2.2.1",
                "tslib": "^2.0.0"
              }
            },
            "react-style-singleton": {
              "version": "2.2.1",
              "resolved": "https://registry.npmjs.org/react-style-singleton/-/react-style-singleton-2.2.1.tgz",
              "integrity": "sha512-ZWj0fHEMyWkHzKYUr2Bs/4zU6XLmq9HsgBURm7g5pAVfyn49DgUiNgY2d4lXRlYSiCif9YBGpQleewkcqddc7g==",
              "requires": {
                "get-nonce": "^1.0.0",
                "invariant": "^2.2.4",
                "tslib": "^2.0.0"
              }
            },
            "read-cache": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
              "integrity": "sha512-Owdv/Ft7IjOgm/i0xvNDZ1LrRANRfew4b2prF3OWMQLxLfu3bS8FVhCsrSCMK4lR56Y9ya+AThoTpDCTxCmpRA==",
              "dev": true,
              "requires": {
                "pify": "^2.3.0"
              },
              "dependencies": {
                "pify": {
                  "version": "2.3.0",
                  "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
                  "integrity": "sha512-udgsAY+fTnvv7kI7aaxbqwWNb0AHiB0qBO89PZKPkoTmGOgdbrHDKD+0B2X4uTfJ/FT1R09r9gTsjUjNJotuog==",
                  "dev": true
                }
              }
            },
            "readable-stream": {
              "version": "3.6.2",
              "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.2.tgz",
              "integrity": "sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==",
              "requires": {
                "inherits": "^2.0.3",
                "string_decoder": "^1.1.1",
                "util-deprecate": "^1.0.1"
              }
            },
            "readdirp": {
              "version": "3.6.0",
              "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
              "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
              "dev": true,
              "requires": {
                "picomatch": "^2.2.1"
              }
            },
            "real-require": {
              "version": "0.1.0",
              "resolved": "https://registry.npmjs.org/real-require/-/real-require-0.1.0.tgz",
              "integrity": "sha512-r/H9MzAWtrv8aSVjPCMFpDMl5q66GqtmmRkRjpHTsp4zBAa+snZyiQNlMONiUmEJcsnaw0wCauJ2GWODr/aFkg=="
            },
            "redux": {
              "version": "4.2.1",
              "resolved": "https://registry.npmjs.org/redux/-/redux-4.2.1.tgz",
              "integrity": "sha512-LAUYz4lc+Do8/g7aeRa8JkyDErK6ekstQaqWQrNRW//MY1TvCEpMtpTWvlQ+FPbWCx+Xixu/6SHt5N0HR+SB4w==",
              "requires": {
                "@babel/runtime": "^7.9.2"
              }
            },
            "redux-thunk": {
              "version": "2.4.2",
              "resolved": "https://registry.npmjs.org/redux-thunk/-/redux-thunk-2.4.2.tgz",
              "integrity": "sha512-+P3TjtnP0k/FEjcBL5FZpoovtvrTNT/UXd4/sluaSyrURlSlhLSzEdfsTBW7WsKB6yPvgd7q/iZPICFjW4o57Q==",
              "requires": {}
            },
            "regenerator-runtime": {
              "version": "0.14.0",
              "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.14.0.tgz",
              "integrity": "sha512-srw17NI0TUWHuGa5CFGGmhfNIeja30WMBfbslPNhf6JrqQlLN5gcrvig1oqPxiVaXb0oW0XRKtH6Nngs5lKCIA=="
            },
            "require-directory": {
              "version": "2.1.1",
              "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
              "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q=="
            },
            "require-main-filename": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-2.0.0.tgz",
              "integrity": "sha512-NKN5kMDylKuldxYLSUfrbo5Tuzh4hd+2E8NPPX02mZtn1VuREQToYe/ZdlJy+J3uCpfaiGF05e7B8W0iXbQHmg=="
            },
            "reselect": {
              "version": "4.1.8",
              "resolved": "https://registry.npmjs.org/reselect/-/reselect-4.1.8.tgz",
              "integrity": "sha512-ab9EmR80F/zQTMNeneUr4cv+jSwPJgIlvEmVwLerwrWVbpLlBuls9XHzIeTFy4cegU2NHBp3va0LKOzU5qFEYQ=="
            },
            "resize-observer-polyfill": {
              "version": "1.5.1",
              "resolved": "https://registry.npmjs.org/resize-observer-polyfill/-/resize-observer-polyfill-1.5.1.tgz",
              "integrity": "sha512-LwZrotdHOo12nQuZlHEmtuXdqGoOD0OhaxopaNFxWzInpEgaLWoVuAMbTzixuosCx2nEG58ngzW3vxdWoxIgdg=="
            },
            "resolve": {
              "version": "1.22.4",
              "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.4.tgz",
              "integrity": "sha512-PXNdCiPqDqeUou+w1C2eTQbNfxKSuMxqTCuvlmmMsk1NWHL5fRrhY6Pl0qEYYc6+QqGClco1Qj8XnjPego4wfg==",
              "dev": true,
              "requires": {
                "is-core-module": "^2.13.0",
                "path-parse": "^1.0.7",
                "supports-preserve-symlinks-flag": "^1.0.0"
              }
            },
            "reusify": {
              "version": "1.0.4",
              "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.0.4.tgz",
              "integrity": "sha512-U9nH88a3fc/ekCF1l0/UP1IosiuIjyTh7hBvXVMHYgVcfGvt897Xguj2UOLDeI5BG2m7/uwyaLVT6fbtCwTyzw==",
              "dev": true
            },
            "rpc-websockets": {
              "version": "7.5.1",
              "resolved": "https://registry.npmjs.org/rpc-websockets/-/rpc-websockets-7.5.1.tgz",
              "integrity": "sha512-kGFkeTsmd37pHPMaHIgN1LVKXMi0JD782v4Ds9ZKtLlwdTKjn+CxM9A9/gLT2LaOuEcEFGL98h1QWQtlOIdW0w==",
              "requires": {
                "@babel/runtime": "^7.17.2",
                "bufferutil": "^4.0.1",
                "eventemitter3": "^4.0.7",
                "utf-8-validate": "^5.0.2",
                "uuid": "^8.3.2",
                "ws": "^8.5.0"
              },
              "dependencies": {
                "uuid": {
                  "version": "8.3.2",
                  "resolved": "https://registry.npmjs.org/uuid/-/uuid-8.3.2.tgz",
                  "integrity": "sha512-+NYs2QeMWy+GWFOEm9xnn6HCDp0l7QBD7ml8zLUmJ+93Q5NF0NocErnwkTkXVFNiX3/fpC6afS8Dhb/gz7R7eg=="
                }
              }
            },
            "run-parallel": {
              "version": "1.2.0",
              "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
              "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
              "dev": true,
              "requires": {
                "queue-microtask": "^1.2.2"
              }
            },
            "rxjs": {
              "version": "6.6.7",
              "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-6.6.7.tgz",
              "integrity": "sha512-hTdwr+7yYNIT5n4AMYp85KA6yw2Va0FLa3Rguvbpa4W3I5xynaBZo41cM3XM+4Q6fRMj3sBYIR1VAmZMXYJvRQ==",
              "requires": {
                "tslib": "^1.9.0"
              },
              "dependencies": {
                "tslib": {
                  "version": "1.14.1",
                  "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.14.1.tgz",
                  "integrity": "sha512-Xni35NKzjgMrwevysHTCArtLDpPvye8zV/0E4EyYn43P7/7qvQwPh9BGkHewbMulVntbigmcT7rdX3BNo9wRJg=="
                }
              }
            },
            "safe-buffer": {
              "version": "5.2.1",
              "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
              "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ=="
            },
            "safe-json-utils": {
              "version": "1.1.1",
              "resolved": "https://registry.npmjs.org/safe-json-utils/-/safe-json-utils-1.1.1.tgz",
              "integrity": "sha512-SAJWGKDs50tAbiDXLf89PDwt9XYkWyANFWVzn4dTXl5QyI8t2o/bW5/OJl3lvc2WVU4MEpTo9Yz5NVFNsp+OJQ=="
            },
            "safe-stable-stringify": {
              "version": "2.4.3",
              "resolved": "https://registry.npmjs.org/safe-stable-stringify/-/safe-stable-stringify-2.4.3.tgz",
              "integrity": "sha512-e2bDA2WJT0wxseVd4lsDP4+3ONX6HpMXQa1ZhFQ7SU+GjvORCmShbCMltrtIDfkYhVHrOcPtj+KhmDBdPdZD1g=="
            },
            "safer-buffer": {
              "version": "2.1.2",
              "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
              "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
              "devOptional": true
            },
            "scheduler": {
              "version": "0.23.0",
              "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.23.0.tgz",
              "integrity": "sha512-CtuThmgHNg7zIZWAXi3AsyIzA3n4xx7aNyjwC2VJldO2LMVDhFK+63xGqq6CsJH4rTAt6/M+N4GhZiDYPx9eUw==",
              "requires": {
                "loose-envify": "^1.1.0"
              }
            },
            "scroll-into-view-if-needed": {
              "version": "3.0.10",
              "resolved": "https://registry.npmjs.org/scroll-into-view-if-needed/-/scroll-into-view-if-needed-3.0.10.tgz",
              "integrity": "sha512-t44QCeDKAPf1mtQH3fYpWz8IM/DyvHLjs8wUvvwMYxk5moOqCzrMSxK6HQVD0QVmVjXFavoFIPRVrMuJPKAvtg==",
              "requires": {
                "compute-scroll-into-view": "^3.0.2"
              }
            },
            "scrypt-js": {
              "version": "3.0.1",
              "resolved": "https://registry.npmjs.org/scrypt-js/-/scrypt-js-3.0.1.tgz",
              "integrity": "sha512-cdwTTnqPu0Hyvf5in5asVdZocVDTNRmR7XEcJuIzMjJeSHybHl7vpB66AzwTaIg6CLSbtjcxc8fqcySfnTkccA=="
            },
            "semver": {
              "version": "7.5.4",
              "resolved": "https://registry.npmjs.org/semver/-/semver-7.5.4.tgz",
              "integrity": "sha512-1bCSESV6Pv+i21Hvpxp3Dx+pSD8lIPt8uVjRrxAUt/nbswYc+tK6Y2btiULjd4+fnq15PX+nqQDC7Oft7WkwcA==",
              "requires": {
                "lru-cache": "^6.0.0"
              }
            },
            "set-blocking": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/set-blocking/-/set-blocking-2.0.0.tgz",
              "integrity": "sha512-KiKBS8AnWGEyLzofFfmvKwpdPzqiy16LvQfK3yv/fVH7Bj13/wl3JSR1J+rfgRE9q7xUJK4qvgS8raSOeLUehw=="
            },
            "sha.js": {
              "version": "2.4.11",
              "resolved": "https://registry.npmjs.org/sha.js/-/sha.js-2.4.11.tgz",
              "integrity": "sha512-QMEp5B7cftE7APOjk5Y6xgrbWu+WkLVQwk8JNjZ8nKRciZaByEW6MubieAiToS7+dwvrjGhH8jRXz3MVd0AYqQ==",
              "requires": {
                "inherits": "^2.0.1",
                "safe-buffer": "^5.0.1"
              }
            },
            "side-channel": {
              "version": "1.0.4",
              "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.0.4.tgz",
              "integrity": "sha512-q5XPytqFEIKHkGdiMIrY10mvLRvnQh42/+GoBlFW3b2LXLE2xxJpZFdm94we0BaoV3RwJyGqg5wS7epxTv0Zvw==",
              "requires": {
                "call-bind": "^1.0.0",
                "get-intrinsic": "^1.0.2",
                "object-inspect": "^1.9.0"
              }
            },
            "siwe": {
              "version": "2.1.4",
              "resolved": "https://registry.npmjs.org/siwe/-/siwe-2.1.4.tgz",
              "integrity": "sha512-Dke1Qqa3mgiLm3vjqw/+SQ7dl8WV/Pfk3AlQBF94cBFydTYhztngqYrikzE3X5UTsJ6565dfVbQptszsuYZNYg==",
              "requires": {
                "@spruceid/siwe-parser": "*",
                "@stablelib/random": "^1.0.1",
                "uri-js": "^4.4.1",
                "valid-url": "^1.0.9"
              }
            },
            "sonic-boom": {
              "version": "2.8.0",
              "resolved": "https://registry.npmjs.org/sonic-boom/-/sonic-boom-2.8.0.tgz",
              "integrity": "sha512-kuonw1YOYYNOve5iHdSahXPOK49GqwA+LZhI6Wz/l0rP57iKyXXIHaRagOBHAPmGwJC6od2Z9zgvZ5loSgMlVg==",
              "requires": {
                "atomic-sleep": "^1.0.0"
              }
            },
            "source-map-js": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.0.2.tgz",
              "integrity": "sha512-R0XvVJ9WusLiqTCEiGCmICCMplcCkIwwR11mOSD9CR5u+IXYdiseeEuXCVAjS54zqwkLcPNnmU4OeJ6tUrWhDw=="
            },
            "split-on-first": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/split-on-first/-/split-on-first-1.1.0.tgz",
              "integrity": "sha512-43ZssAJaMusuKWL8sKUBQXHWOpq8d6CfN/u1p4gUzfJkM05C8rxTmYrkIPTXapZpORA6LkkzcUulJ8FqA7Uudw=="
            },
            "split2": {
              "version": "4.2.0",
              "resolved": "https://registry.npmjs.org/split2/-/split2-4.2.0.tgz",
              "integrity": "sha512-UcjcJOWknrNkF6PLX83qcHM6KHgVKNkV62Y8a5uYDVv9ydGQVwAHMKqHdJje1VTWpljG0WYpCDhrCdAOYH4TWg=="
            },
            "stream-browserify": {
              "version": "3.0.0",
              "resolved": "https://registry.npmjs.org/stream-browserify/-/stream-browserify-3.0.0.tgz",
              "integrity": "sha512-H73RAHsVBapbim0tU2JwwOiXUj+fikfiaoYAKHF3VJfA0pe2BCzkhAHBlLG6REzE+2WNZcxOXjK7lkso+9euLA==",
              "requires": {
                "inherits": "~2.0.4",
                "readable-stream": "^3.5.0"
              }
            },
            "stream-shift": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/stream-shift/-/stream-shift-1.0.1.tgz",
              "integrity": "sha512-AiisoFqQ0vbGcZgQPY1cdP2I76glaVA/RauYR4G4thNFgkTqr90yXTo4LYX60Jl+sIlPNHHdGSwo01AvbKUSVQ=="
            },
            "streamsearch": {
              "version": "1.1.0",
              "resolved": "https://registry.npmjs.org/streamsearch/-/streamsearch-1.1.0.tgz",
              "integrity": "sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg=="
            },
            "strict-uri-encode": {
              "version": "2.0.0",
              "resolved": "https://registry.npmjs.org/strict-uri-encode/-/strict-uri-encode-2.0.0.tgz",
              "integrity": "sha512-QwiXZgpRcKkhTj2Scnn++4PKtWsH0kpzZ62L2R6c/LUVYv7hVnZqcg2+sMuT6R7Jusu1vviK/MFsu6kNJfWlEQ=="
            },
            "string_decoder": {
              "version": "1.3.0",
              "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
              "integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
              "requires": {
                "safe-buffer": "~5.2.0"
              }
            },
            "string-convert": {
              "version": "0.2.1",
              "resolved": "https://registry.npmjs.org/string-convert/-/string-convert-0.2.1.tgz",
              "integrity": "sha512-u/1tdPl4yQnPBjnVrmdLo9gtuLvELKsAoRapekWggdiQNvvvum+jYF329d84NAa660KQw7pB2n36KrIKVoXa3A=="
            },
            "string-width": {
              "version": "4.2.3",
              "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
              "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
              "requires": {
                "emoji-regex": "^8.0.0",
                "is-fullwidth-code-point": "^3.0.0",
                "strip-ansi": "^6.0.1"
              }
            },
            "strip-ansi": {
              "version": "6.0.1",
              "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
              "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
              "requires": {
                "ansi-regex": "^5.0.1"
              }
            },
            "styled-jsx": {
              "version": "5.1.1",
              "resolved": "https://registry.npmjs.org/styled-jsx/-/styled-jsx-5.1.1.tgz",
              "integrity": "sha512-pW7uC1l4mBZ8ugbiZrcIsiIvVx1UmTfw7UkC3Um2tmfUq9Bhk8IiyEIPl6F8agHgjzku6j0xQEZbfA5uSgSaCw==",
              "requires": {
                "client-only": "0.0.1"
              }
            },
            "stylis": {
              "version": "4.3.0",
              "resolved": "https://registry.npmjs.org/stylis/-/stylis-4.3.0.tgz",
              "integrity": "sha512-E87pIogpwUsUwXw7dNyU4QDjdgVMy52m+XEOPEKUn161cCzWjjhPSQhByfd1CcNvrOLnXQ6OnnZDwnJrz/Z4YQ=="
            },
            "sucrase": {
              "version": "3.34.0",
              "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.34.0.tgz",
              "integrity": "sha512-70/LQEZ07TEcxiU2dz51FKaE6hCTWC6vr7FOk3Gr0U60C3shtAN+H+BFr9XlYe5xqf3RA8nrc+VIwzCfnxuXJw==",
              "dev": true,
              "requires": {
                "@jridgewell/gen-mapping": "^0.3.2",
                "commander": "^4.0.0",
                "glob": "7.1.6",
                "lines-and-columns": "^1.1.6",
                "mz": "^2.7.0",
                "pirates": "^4.0.1",
                "ts-interface-checker": "^0.1.9"
              },
              "dependencies": {
                "commander": {
                  "version": "4.1.1",
                  "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
                  "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
                  "dev": true
                }
              }
            },
            "superstruct": {
              "version": "0.14.2",
              "resolved": "https://registry.npmjs.org/superstruct/-/superstruct-0.14.2.tgz",
              "integrity": "sha512-nPewA6m9mR3d6k7WkZ8N8zpTWfenFH3q9pA2PkuiZxINr9DKB2+40wEQf0ixn8VaGuJ78AB6iWOtStI+/4FKZQ=="
            },
            "supports-color": {
              "version": "8.1.1",
              "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-8.1.1.tgz",
              "integrity": "sha512-MpUEN2OodtUzxvKQl72cUF7RQ5EiHsGvSsVG0ia9c5RbWGL2CI4C7EpPS8UTBIplnlzZiNuV56w+FuNxy3ty2Q==",
              "dev": true,
              "requires": {
                "has-flag": "^4.0.0"
              }
            },
            "supports-preserve-symlinks-flag": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
              "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
              "dev": true
            },
            "tailwindcss": {
              "version": "3.3.3",
              "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.3.3.tgz",
              "integrity": "sha512-A0KgSkef7eE4Mf+nKJ83i75TMyq8HqY3qmFIJSWy8bNt0v1lG7jUcpGpoTFxAwYcWOphcTBLPPJg+bDfhDf52w==",
              "dev": true,
              "requires": {
                "@alloc/quick-lru": "^5.2.0",
                "arg": "^5.0.2",
                "chokidar": "^3.5.3",
                "didyoumean": "^1.2.2",
                "dlv": "^1.1.3",
                "fast-glob": "^3.2.12",
                "glob-parent": "^6.0.2",
                "is-glob": "^4.0.3",
                "jiti": "^1.18.2",
                "lilconfig": "^2.1.0",
                "micromatch": "^4.0.5",
                "normalize-path": "^3.0.0",
                "object-hash": "^3.0.0",
                "picocolors": "^1.0.0",
                "postcss": "^8.4.23",
                "postcss-import": "^15.1.0",
                "postcss-js": "^4.0.1",
                "postcss-load-config": "^4.0.1",
                "postcss-nested": "^6.0.1",
                "postcss-selector-parser": "^6.0.11",
                "resolve": "^1.22.2",
                "sucrase": "^3.32.0"
              },
              "dependencies": {
                "object-hash": {
                  "version": "3.0.0",
                  "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
                  "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
                  "dev": true
                }
              }
            },
            "text-encoding-utf-8": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/text-encoding-utf-8/-/text-encoding-utf-8-1.0.2.tgz",
              "integrity": "sha512-8bw4MY9WjdsD2aMtO0OzOCY3pXGYNx2d2FfHRVUKkiCPDWjKuOlhLVASS+pD7VkLTVjW268LYJHwsnPFlBpbAg=="
            },
            "thenify": {
              "version": "3.3.1",
              "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
              "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
              "dev": true,
              "requires": {
                "any-promise": "^1.0.0"
              }
            },
            "thenify-all": {
              "version": "1.6.0",
              "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
              "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
              "dev": true,
              "requires": {
                "thenify": ">= 3.1.0 < 4"
              }
            },
            "thread-stream": {
              "version": "0.15.2",
              "resolved": "https://registry.npmjs.org/thread-stream/-/thread-stream-0.15.2.tgz",
              "integrity": "sha512-UkEhKIg2pD+fjkHQKyJO3yoIvAP3N6RlNFt2dUhcS1FGvCD1cQa1M/PGknCLFIyZdtJOWQjejp7bdNqmN7zwdA==",
              "requires": {
                "real-require": "^0.1.0"
              }
            },
            "throttle-debounce": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/throttle-debounce/-/throttle-debounce-5.0.0.tgz",
              "integrity": "sha512-2iQTSgkkc1Zyk0MeVrt/3BvuOXYPl/R8Z0U2xxo9rjwNciaHDG3R+Lm6dh4EeUci49DanvBnuqI6jshoQQRGEg=="
            },
            "through": {
              "version": "2.3.8",
              "resolved": "https://registry.npmjs.org/through/-/through-2.3.8.tgz",
              "integrity": "sha512-w89qg7PI8wAdvX60bMDP+bFoD5Dvhm9oLheFp5O4a2QF0cSBGsBX4qZmadPMvVqlLJBBci+WqGGOAPvcDeNSVg=="
            },
            "to-regex-range": {
              "version": "5.0.1",
              "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
              "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
              "dev": true,
              "requires": {
                "is-number": "^7.0.0"
              }
            },
            "toggle-selection": {
              "version": "1.0.6",
              "resolved": "https://registry.npmjs.org/toggle-selection/-/toggle-selection-1.0.6.tgz",
              "integrity": "sha512-BiZS+C1OS8g/q2RRbJmy59xpyghNBqrr6k5L/uKBGRsTfxmu3ffiRnd8mlGPUVayg8pvfi5urfnu8TU7DVOkLQ=="
            },
            "tr46": {
              "version": "0.0.3",
              "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
              "integrity": "sha512-N3WMsuqV66lT30CrXNbEjx4GEwlow3v6rr4mCcv6prnfwhS01rkgyFdjPNBYd9br7LpXV1+Emh01fHnq2Gdgrw=="
            },
            "ts-interface-checker": {
              "version": "0.1.13",
              "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
              "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
              "dev": true
            },
            "tslib": {
              "version": "2.5.2",
              "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.5.2.tgz",
              "integrity": "sha512-5svOrSA2w3iGFDs1HibEVBGbDrAY82bFQ3HZ3ixB+88nsbsWQoKqDRb5UBYAUPEzbBn6dAp5gRNXglySbx1MlA=="
            },
            "type": {
              "version": "1.2.0",
              "resolved": "https://registry.npmjs.org/type/-/type-1.2.0.tgz",
              "integrity": "sha512-+5nt5AAniqsCnu2cEQQdpzCAh33kVx8n0VoFidKpB1dVVLAN/F+bgVOqOJqOnEnrhp222clB5p3vUlD+1QAnfg=="
            },
            "typedarray-to-buffer": {
              "version": "3.1.5",
              "resolved": "https://registry.npmjs.org/typedarray-to-buffer/-/typedarray-to-buffer-3.1.5.tgz",
              "integrity": "sha512-zdu8XMNEDepKKR+XYOXAVPtWui0ly0NtohUscw+UmaHiAWT8hrV1rr//H6V+0DvJ3OQ19S979M0laLfX8rm82Q==",
              "requires": {
                "is-typedarray": "^1.0.0"
              }
            },
            "typescript": {
              "version": "5.0.4",
              "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.0.4.tgz",
              "integrity": "sha512-cW9T5W9xY37cc+jfEnaUvX91foxtHkza3Nw3wkoF4sSlKn0MONdkdEndig/qPBWXNkmplh3NzayQzCiHM4/hqw==",
              "peer": true
            },
            "uint8arrays": {
              "version": "3.1.1",
              "resolved": "https://registry.npmjs.org/uint8arrays/-/uint8arrays-3.1.1.tgz",
              "integrity": "sha512-+QJa8QRnbdXVpHYjLoTpJIdCTiw9Ir62nocClWuXIq2JIh4Uta0cQsTSpFL678p2CN8B+XSApwcU+pQEqVpKWg==",
              "requires": {
                "multiformats": "^9.4.2"
              }
            },
            "update-browserslist-db": {
              "version": "1.0.11",
              "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.0.11.tgz",
              "integrity": "sha512-dCwEFf0/oT85M1fHBg4F0jtLwJrutGoHSQXCh7u4o2t1drG+c0a9Flnqww6XUKSfQMPpJBRjU8d4RXB09qtvaA==",
              "dev": true,
              "requires": {
                "escalade": "^3.1.1",
                "picocolors": "^1.0.0"
              }
            },
            "uri-js": {
              "version": "4.4.1",
              "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
              "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
              "requires": {
                "punycode": "^2.1.0"
              }
            },
            "use-callback-ref": {
              "version": "1.3.0",
              "resolved": "https://registry.npmjs.org/use-callback-ref/-/use-callback-ref-1.3.0.tgz",
              "integrity": "sha512-3FT9PRuRdbB9HfXhEq35u4oZkvpJ5kuYbpqhCfmiZyReuRgpnhDlbr2ZEnnuS0RrJAPn6l23xjFg9kpDM+Ms7w==",
              "requires": {
                "tslib": "^2.0.0"
              }
            },
            "use-sidecar": {
              "version": "1.1.2",
              "resolved": "https://registry.npmjs.org/use-sidecar/-/use-sidecar-1.1.2.tgz",
              "integrity": "sha512-epTbsLuzZ7lPClpz2TyryBfztm7m+28DlEv2ZCQ3MDr5ssiwyOwGH/e5F9CkfWjJ1t4clvI58yF822/GUkjjhw==",
              "requires": {
                "detect-node-es": "^1.1.0",
                "tslib": "^2.0.0"
              }
            },
            "use-sync-external-store": {
              "version": "1.2.0",
              "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.2.0.tgz",
              "integrity": "sha512-eEgnFxGQ1Ife9bzYs6VLi8/4X6CObHMw9Qr9tPY43iKwsPw8xE8+EFsf/2cFZ5S3esXgpWgtSCtLNS41F+sKPA==",
              "requires": {}
            },
            "utf-8-validate": {
              "version": "5.0.10",
              "resolved": "https://registry.npmjs.org/utf-8-validate/-/utf-8-validate-5.0.10.tgz",
              "integrity": "sha512-Z6czzLq4u8fPOyx7TU6X3dvUZVvoJmxSQ+IcrlmagKhilxlhZgxPK6C5Jqbkw1IDUmFTM+cz9QDnnLTwDz/2gQ==",
              "requires": {
                "node-gyp-build": "^4.3.0"
              }
            },
            "util": {
              "version": "0.12.5",
              "resolved": "https://registry.npmjs.org/util/-/util-0.12.5.tgz",
              "integrity": "sha512-kZf/K6hEIrWHI6XqOFUiiMa+79wE/D8Q+NCNAWclkyg3b4d2k7s0QGepNjiABc+aR3N1PAyHL7p6UcLY6LmrnA==",
              "requires": {
                "inherits": "^2.0.3",
                "is-arguments": "^1.0.4",
                "is-generator-function": "^1.0.7",
                "is-typed-array": "^1.1.3",
                "which-typed-array": "^1.1.2"
              }
            },
            "util-deprecate": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
              "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw=="
            },
            "uuid": {
              "version": "9.0.0",
              "resolved": "https://registry.npmjs.org/uuid/-/uuid-9.0.0.tgz",
              "integrity": "sha512-MXcSTerfPa4uqyzStbRoTgt5XIe3x5+42+q1sDuy3R5MDk66URdLMOZe5aPX/SQd+kuYAh0FdP/pO28IkQyTeg=="
            },
            "valid-url": {
              "version": "1.0.9",
              "resolved": "https://registry.npmjs.org/valid-url/-/valid-url-1.0.9.tgz",
              "integrity": "sha512-QQDsV8OnSf5Uc30CKSwG9lnhMPe6exHtTXLRYX8uMwKENy640pU+2BgBL0LRbDh/eYRahNCS7aewCx0wf3NYVA=="
            },
            "valtio": {
              "version": "1.10.5",
              "resolved": "https://registry.npmjs.org/valtio/-/valtio-1.10.5.tgz",
              "integrity": "sha512-jTp0k63VXf4r5hPoaC6a6LCG4POkVSh629WLi1+d5PlajLsbynTMd7qAgEiOSPxzoX5iNvbN7iZ/k/g29wrNiQ==",
              "requires": {
                "proxy-compare": "2.5.1",
                "use-sync-external-store": "1.2.0"
              }
            },
            "viem": {
              "version": "0.3.37",
              "resolved": "https://registry.npmjs.org/viem/-/viem-0.3.37.tgz",
              "integrity": "sha512-17jycP/1Hy9DsDpHlaaI7bbAHBDYGfVYHN6j0ltE7A/S30RXhPVFe4LAPRfmG+xR2QBq8xSUpjO78cRgDLBjZQ==",
              "requires": {
                "@adraffy/ens-normalize": "1.9.0",
                "@noble/curves": "1.0.0",
                "@noble/hashes": "1.3.0",
                "@scure/bip32": "1.3.0",
                "@scure/bip39": "1.2.0",
                "@wagmi/chains": "0.3.1",
                "abitype": "0.8.2",
                "isomorphic-ws": "5.0.0",
                "ws": "8.12.0"
              }
            },
            "wagmi": {
              "version": "1.0.7",
              "resolved": "https://registry.npmjs.org/wagmi/-/wagmi-1.0.7.tgz",
              "integrity": "sha512-JBTR2Au6AGeFKYDpskaQ2OwHRkD/a+LgGrIqThxREuLKtMbiRlnM3XMr9cTFl0T/yg8TcmZO2IMq3O4yRVitsg==",
              "requires": {
                "@tanstack/query-sync-storage-persister": "^4.27.1",
                "@tanstack/react-query": "^4.28.0",
                "@tanstack/react-query-persist-client": "^4.28.0",
                "@wagmi/core": "1.0.7",
                "abitype": "0.8.1",
                "use-sync-external-store": "^1.2.0"
              },
              "dependencies": {
                "abitype": {
                  "version": "0.8.1",
                  "resolved": "https://registry.npmjs.org/abitype/-/abitype-0.8.1.tgz",
                  "integrity": "sha512-n8Di6AWb3i7HnEkBvecU6pG0a5nj5YwMvdAIwPLsQK95ulRy/XS113s/RXvSfTX1iOQJYFrEO3/q4SMWu7OwTA==",
                  "requires": {}
                }
              }
            },
            "watchpack": {
              "version": "2.4.0",
              "resolved": "https://registry.npmjs.org/watchpack/-/watchpack-2.4.0.tgz",
              "integrity": "sha512-Lcvm7MGST/4fup+ifyKi2hjyIAwcdI4HRgtvTpIUxBRhB+RFtUh8XtDOxUfctVCnhVi+QQj49i91OyvzkJl6cg==",
              "requires": {
                "glob-to-regexp": "^0.4.1",
                "graceful-fs": "^4.1.2"
              }
            },
            "webcrypto-core": {
              "version": "1.7.7",
              "resolved": "https://registry.npmjs.org/webcrypto-core/-/webcrypto-core-1.7.7.tgz",
              "integrity": "sha512-7FjigXNsBfopEj+5DV2nhNpfic2vumtjjgPmeDKk45z+MJwXKKfhPB7118Pfzrmh4jqOMST6Ch37iPAHoImg5g==",
              "requires": {
                "@peculiar/asn1-schema": "^2.3.6",
                "@peculiar/json-schema": "^1.1.12",
                "asn1js": "^3.0.1",
                "pvtsutils": "^1.3.2",
                "tslib": "^2.4.0"
              }
            },
            "webidl-conversions": {
              "version": "3.0.1",
              "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-3.0.1.tgz",
              "integrity": "sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ=="
            },
            "websocket": {
              "version": "1.0.34",
              "resolved": "https://registry.npmjs.org/websocket/-/websocket-1.0.34.tgz",
              "integrity": "sha512-PRDso2sGwF6kM75QykIesBijKSVceR6jL2G8NGYyq2XrItNC2P5/qL5XeR056GhA+Ly7JMFvJb9I312mJfmqnQ==",
              "requires": {
                "bufferutil": "^4.0.1",
                "debug": "^2.2.0",
                "es5-ext": "^0.10.50",
                "typedarray-to-buffer": "^3.1.5",
                "utf-8-validate": "^5.0.2",
                "yaeti": "^0.0.6"
              },
              "dependencies": {
                "debug": {
                  "version": "2.6.9",
                  "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
                  "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
                  "requires": {
                    "ms": "2.0.0"
                  }
                },
                "ms": {
                  "version": "2.0.0",
                  "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
                  "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A=="
                }
              }
            },
            "whatwg-url": {
              "version": "5.0.0",
              "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-5.0.0.tgz",
              "integrity": "sha512-saE57nupxk6v3HY35+jzBwYa0rKSy0XR8JSxZPwgLr7ys0IBzhGviA1/TUGJLmSVqs8pb9AnvICXEuOHLprYTw==",
              "requires": {
                "tr46": "~0.0.3",
                "webidl-conversions": "^3.0.0"
              }
            },
            "which-module": {
              "version": "2.0.1",
              "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.1.tgz",
              "integrity": "sha512-iBdZ57RDvnOR9AGBhML2vFZf7h8vmBjhoaZqODJBFWHVtKkDmKuHai3cx5PgVMrX5YDNp27AofYbAwctSS+vhQ=="
            },
            "which-typed-array": {
              "version": "1.1.9",
              "resolved": "https://registry.npmjs.org/which-typed-array/-/which-typed-array-1.1.9.tgz",
              "integrity": "sha512-w9c4xkx6mPidwp7180ckYWfMmvxpjlZuIudNtDf4N/tTAUB8VJbX25qZoAsrtGuYNnGw3pa0AXgbGKRB8/EceA==",
              "requires": {
                "available-typed-arrays": "^1.0.5",
                "call-bind": "^1.0.2",
                "for-each": "^0.3.3",
                "gopd": "^1.0.1",
                "has-tostringtag": "^1.0.0",
                "is-typed-array": "^1.1.10"
              }
            },
            "wrap-ansi": {
              "version": "6.2.0",
              "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-6.2.0.tgz",
              "integrity": "sha512-r6lPcBGxZXlIcymEu7InxDMhdW0KDxpLgoFLcguasxCaJ/SOIZwINatK9KY/tf+ZrlywOKU0UDj3ATXUBfxJXA==",
              "requires": {
                "ansi-styles": "^4.0.0",
                "string-width": "^4.1.0",
                "strip-ansi": "^6.0.0"
              }
            },
            "wrappy": {
              "version": "1.0.2",
              "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
              "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ=="
            },
            "ws": {
              "version": "8.12.0",
              "resolved": "https://registry.npmjs.org/ws/-/ws-8.12.0.tgz",
              "integrity": "sha512-kU62emKIdKVeEIOIKVegvqpXMSTAMLJozpHZaJNDYqBjzlSYXQGviYwN1osDLJ9av68qHd4a2oSjd7yD4pacig==",
              "requires": {}
            },
            "xtend": {
              "version": "4.0.2",
              "resolved": "https://registry.npmjs.org/xtend/-/xtend-4.0.2.tgz",
              "integrity": "sha512-LKYU1iAXJXUgAXn9URjiu+MWhyUXHsvfp7mcuYm9dSUKK0/CjtrUwFAxD82/mCWbtLsGjFIad0wIsod4zrTAEQ=="
            },
            "y18n": {
              "version": "4.0.3",
              "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.3.tgz",
              "integrity": "sha512-JKhqTOwSrqNA1NY5lSztJ1GrBiUodLMmIZuLiDaMRJ+itFd+ABVE8XBjOvIWL+rSqNDC74LCSFmlb/U4UZ4hJQ=="
            },
            "yaeti": {
              "version": "0.0.6",
              "resolved": "https://registry.npmjs.org/yaeti/-/yaeti-0.0.6.tgz",
              "integrity": "sha512-MvQa//+KcZCUkBTIC9blM+CU9J2GzuTytsOUwf2lidtvkx/6gnEp1QvJv34t9vdjhFmha/mUiNDbN0D0mJWdug=="
            },
            "yallist": {
              "version": "4.0.0",
              "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
              "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A=="
            },
            "yaml": {
              "version": "2.3.1",
              "resolved": "https://registry.npmjs.org/yaml/-/yaml-2.3.1.tgz",
              "integrity": "sha512-2eHWfjaoXgTBC2jNM1LRef62VQa0umtvRiDSk6HSzW7RvS5YtkabJrwYLLEKWBc8a5U2PTSCs+dJjUTJdlHsWQ==",
              "dev": true
            },
            "yargs": {
              "version": "15.4.1",
              "resolved": "https://registry.npmjs.org/yargs/-/yargs-15.4.1.tgz",
              "integrity": "sha512-aePbxDmcYW++PaqBsJ+HYUFwCdv4LVvdnhBy78E57PIor8/OVvhMrADFFEDh8DHDFRv/O9i3lPhsENjO7QX0+A==",
              "requires": {
                "cliui": "^6.0.0",
                "decamelize": "^1.2.0",
                "find-up": "^4.1.0",
                "get-caller-file": "^2.0.1",
                "require-directory": "^2.1.1",
                "require-main-filename": "^2.0.0",
                "set-blocking": "^2.0.0",
                "string-width": "^4.2.0",
                "which-module": "^2.0.0",
                "y18n": "^4.0.0",
                "yargs-parser": "^18.1.2"
              }
            },
            "yargs-parser": {
              "version": "18.1.3",
              "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-18.1.3.tgz",
              "integrity": "sha512-o50j0JeToy/4K6OZcaQmW6lyXXKhq7csREXcDwk2omFPJEwUNOVtJKvmDr9EI1fAJZUyZcRF7kxGBWmRXudrCQ==",
              "requires": {
                "camelcase": "^5.0.0",
                "decamelize": "^1.2.0"
              }
            },
            "zod": {
              "version": "3.22.4",
              "resolved": "https://registry.npmjs.org/zod/-/zod-3.22.4.tgz",
              "integrity": "sha512-iC+8Io04lddc+mVqQ9AZ7OQ2MrUKGN+oIQyq1vemgt46jwCwLfhq7/pwnBnNXXXZb8VTVLKwp9EDkx+ryxIWmg==",
              "optional": true,
              "peer": true
            },
            "zustand": {
              "version": "4.3.8",
              "resolved": "https://registry.npmjs.org/zustand/-/zustand-4.3.8.tgz",
              "integrity": "sha512-4h28KCkHg5ii/wcFFJ5Fp+k1J3gJoasaIbppdgZFO4BPJnsNxL0mQXBSFgOgAdCdBj35aDTPvdAJReTMntFPGg==",
              "requires": {
                "use-sync-external-store": "1.2.0"
              }
            }
          }
        }
        ```
      </div>
    </details>
  </div>
</details>



:::

### 过场动画（`HomeLoader`）

我们在用户进入主页面之前添加一个过场动画，以提升趣味性。

在`components/`文件夹下创建新文件`HomeLoader.jsx`，粘贴以下代码并保存：

```jsx
import { useRef } from 'react';
import { gsap, SplitText } from './gsap';
import useLayoutEffect from './use-isomorpphic-layout-effect';

const HomeLoader = () => {
    let el = useRef(null);
    let q = gsap.utils.selector(el);
    const tl = useRef(gsap.timeline());

    useLayoutEffect(() => {
        tl.current.to(
            q('.load-bg'),
            { translateY: '-120vh', duration: 0.8, ease: 'power4.out' },
            2.5
        );
        tl.current.to(
            q('.load-rnd'),
            { scaleY: '0', scaleX: '1.1', duration: 0.8, ease: 'power3.out' },
            2.5
        );
        tl.current.to(
            q('.load-text-wrapper'),
            { opacity: 1, duration: 0 },
            0.3
        );
        const text = new SplitText(q(".load-text"), { type:"chars" });
        const text2 = new SplitText(q(".load-text-2"), { type:"chars" });
        tl.current.fromTo(text.chars, {opacity: 0}, {opacity: 1, duration: 0.4, stagger: 0.01, ease: 'power2.out'}, 0.55);

        tl.current.to(text.chars, {opacity: 0, translateX:40, duration:0.5, stagger: {from: 'end', each: 0.02}, ease: 'power2.out'}, 1.25);
        tl.current.fromTo(text2.chars, {opacity: 0, translateX: -40}, {opacity: 1, duration: 0.5, stagger: {from: 'end', each: 0.02}, translateX: 0, ease: 'power2.out', delay: 1.27}, 0);

        tl.current.to(text2.chars, {opacity: 0, translateY:-30, duration:0.4, stagger: 0.01, ease: 'power2.inOut'}, 2.12);

        tl.current.to(el.current, {autoAlpha: 0, duration: 0, pointerEvents: 'none'}, 3.3);
    }, []);

    return (
        <div
            ref={el}
            className='pointer-events-auto fixed top-0 left-0 min-h-screen w-screen'>
            <div className='load-bg absolute top-0 left-0 z-[100] h-[120vh] w-full origin-top bg-neutral-900'>
                <div className='load-text-wrapper opacity-0'>
                    <p className='load-text text-neutral-100 text-[40px] md:text-[50px] font-silka mr-[10px] tracking-wide whitespace-nowrap absolute top-[37%] left-1/2 -translate-x-1/2'>Hello :&#41;</p>
                    <p className='load-text-2 text-neutral-100 text-[40px] md:text-[50px] font-silka mr-[10px] tracking-wide whitespace-nowrap absolute top-[37%] left-1/2 -translate-x-1/2'>Welcome!</p>
                </div>
                <div className='load-rnd absolute bottom-0 h-[1000px] w-[110%] translate-y-1/2 translate-x-[-5%] rounded-[100%_100%] bg-neutral-900'></div>
            </div>
        </div>
    );
};

export default HomeLoader;

```

将`app`文件夹下的`page.jsx`文件修改为下面的内容：

```jsx
'use client'

import React, { useRef } from "react";

import { ScrollSmoother } from "@/components/gsap";
import useLayoutEffect from "@/components/use-isomorpphic-layout-effect";
import HomeLoader from "@/components/HomeLoader";

const App = () => {

  const smoother = useRef(null)

  useLayoutEffect(() => {
    smoother.current = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      ignoreMobileResize: true,
    }).paused(true);

  }, [])

  return (
    <div>
      <main id="smooth-wrapper">
        <HomeLoader />
      </main>
    </div>
  )
}

export default App;
```

保存之后，刷新前端页面，可以看到如下动画效果：
![gif](./img/gif.gif)

酷😎~

### 其他组件

由于剩下的组件关联性比较大，难以拆开分解介绍，因此统一放在一小节里讲解。

将下列所有文件都编写好之后保存：

```jsx title="TechnologyStack.jsx"
import { useRef } from "react";
import { gsap } from "./gsap";
import useLayoutEffect from "./use-isomorpphic-layout-effect";

const TechnologyStack = () => {
let el = useRef(null);
let q = gsap.utils.selector(el);

useLayoutEffect(() => {
	gsap.to(q('.skills-text'), {translateX: '-20px', scrollTrigger:{trigger: '.skills-text', start: "top bottom", end: "bottom top", scrub: 0.5}});
}, [])

return (
	<div className="w-full text-neutral-900 font-[500] text-[18px] font-silka" ref={el}>
			<div className="w-full h-[1px] bg-neutral-300 mb-16 mt-36 relative">
				<span className="absolute top-[-30px] font-mono font-[500] text-[15px] left-[40px] skills-text will-change-transform">技术栈</span>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10">
					<div className="flex flex-col items-center gap-1">
							<svg className="w-10 h-10" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z"></path>
									<path d="M15.5 8h-7l.5 4h6l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5"></path>
							</svg>
							<p>HTML</p>
					</div>
					<div className="flex flex-col items-center gap-1">
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" clipRule="evenodd">

              <g>
              <title>Redux</title>
              <rect fill="none" id="canvas_background" height="42" width="42" y="-1" x="-1"/>
              </g>
              <g>
              <g stroke="#8bc34a" id="svg_1" fill="#8bc34a" strokeWidth="1.7019" strokeMiterlimit="4">
                <path stroke="#303030" id="svg_2" fill="#2d2d2d" transform="translate(-0.9070000052452087,-0.9470000267028809) scale(0.2558700144290924) " d="m109.99047,108.81842c5.19964,-0.54545 9.14419,-5.0909 8.96489,-10.54544s-4.66174,-9.81817 -10.04068,-9.81817l-0.3586,0c-5.55823,0.18182 -9.86138,4.90909 -9.68208,10.54544c0.1793,2.72727 1.25508,5.0909 2.86876,6.72727c-6.09612,12.18181 -15.41961,21.09089 -29.40484,28.54543c-9.50278,5.0909 -19.36416,6.90908 -29.22554,5.63636c-8.0684,-1.09091 -14.34382,-4.72727 -18.28837,-10.72726c-5.73753,-8.90908 -6.27542,-18.54544 -1.43438,-28.18179c3.40666,-6.90908 8.78559,-11.99999 12.19225,-14.54544c-0.71719,-2.36363 -1.79298,-6.36363 -2.33087,-9.27272c-25.99818,19.09089 -23.30871,44.90905 -15.41961,57.09085c5.91683,9.0909 17.92978,14.72726 31.19782,14.72726c3.58596,0 7.17191,-0.36364 10.75787,-1.27273c22.95012,-4.54545 40.342,-18.36362 50.20338,-38.90905z"/>
                <path stroke="#303030" id="svg_3" fill="#2d2d2d" transform="translate(-0.9070000052452087,-0.9470000267028809) scale(0.2558700144290924) " d="m141.54688,86.27298c-13.62663,-16.1818 -33.70799,-25.09089 -56.6581,-25.09089l-2.86876,0c-1.61368,-3.27272 -5.02034,-5.45454 -8.78559,-5.45454l-0.3586,0c-5.55823,0.18182 -9.86138,4.90909 -9.68208,10.54544c0.1793,5.45454 4.66174,9.81817 10.04068,9.81817l0.3586,0c3.94455,-0.18182 7.35121,-2.72727 8.78559,-6.18181l3.22736,0c13.62663,0 26.53607,4 38.19043,11.81817c8.96489,5.99999 15.41961,13.81817 19.00557,23.27271c3.04806,7.63636 2.86876,15.09089 -0.3586,21.45452c-5.02034,9.63635 -13.44733,14.90908 -24.5638,14.90908c-7.17191,0 -13.98523,-2.18182 -17.57118,-3.81818c-1.97228,1.81818 -5.55823,4.72727 -8.0684,6.54545c7.70981,3.63636 15.59891,5.63636 23.12942,5.63636c17.21259,0 29.94273,-9.63635 34.78377,-19.27271c5.19964,-10.54544 4.84104,-28.72725 -8.60629,-44.18178z"/>
                <path stroke="#303030" id="svg_4" fill="#2d2d2d" transform="translate(-0.9070000052452087,-0.9470000267028809) scale(0.2558700144290924) " d="m50.4636,111.90932c0.1793,5.45454 4.66174,9.81817 10.04068,9.81817l0.3586,0c5.55823,-0.18182 9.86138,-4.90909 9.68208,-10.54544c-0.1793,-5.45454 -4.66174,-9.81817 -10.04068,-9.81817l-0.3586,0c-0.3586,0 -0.89649,0 -1.25508,0.18182c-7.35121,-12.36362 -10.39927,-25.81816 -9.32349,-40.3636c0.71719,-10.90908 4.30315,-20.36362 10.57857,-28.18179c5.19964,-6.72727 15.24031,-9.99999 22.05363,-10.18181c19.00557,-0.36364 27.07397,23.63634 27.61186,33.2727c2.33087,0.54545 6.27542,1.81818 8.96489,2.72727c-2.15157,-29.45452 -20.08135,-44.72723 -37.29394,-44.72723c-16.1368,0 -31.01852,11.81817 -36.93535,29.2727c-8.2477,23.27271 -2.86876,45.63632 7.17191,63.27267c-0.89649,1.27273 -1.43438,3.27272 -1.25508,5.27272z"/>
              </g>
              </g>
            </svg>
							<p>Redux</p>
					</div>
					<div className="flex flex-col items-center gap-1">
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
              <g>
                <title>background</title>
                <rect x="-1" y="-1" width="42" height="42" id="canvas_background" fill="none"/>
              </g>

              <g>
                <title>TailwindCSS</title>
                <path stroke="null" fillRule="evenodd" clipRule="evenodd" d="m20.05038,5.26315c-5.28333,0 -8.58454,3.04599 -9.90596,9.13796c1.98135,-3.04599 4.29266,-4.18801 6.93394,-3.42696c1.50697,0.43411 2.5846,1.69502 3.77636,3.09102c1.94253,2.27323 4.19095,4.90402 9.10084,4.90402c5.28256,0 8.58454,-3.04599 9.90518,-9.13706c-1.98057,3.04599 -4.29188,4.18801 -6.93316,3.42606c-1.50775,-0.43411 -2.58538,-1.69502 -3.77714,-3.09012c-1.94253,-2.27503 -4.19018,-4.90492 -9.10007,-4.90492zm-9.90596,13.70604c-5.28256,0 -8.58454,3.04599 -9.90518,9.13796c1.98135,-3.04599 4.29266,-4.18801 6.93316,-3.42696c1.50775,0.43411 2.58538,1.69502 3.77714,3.09102c1.94253,2.27323 4.19018,4.90402 9.10084,4.90402c5.28256,0 8.58454,-3.04509 9.90518,-9.13706c-1.98135,3.04599 -4.29266,4.18801 -6.93394,3.42696c-1.50697,-0.43501 -2.5846,-1.69592 -3.77636,-3.09102c-1.94253,-2.27323 -4.19095,-4.90492 -9.10084,-4.90492z" fill="#000000" id="svg_1"/>
              </g>
            </svg>
             <p>TailwindCSS</p>
					</div>
					<div className="flex flex-col items-center gap-1">
							<svg className="w-10 h-10" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z"></path>
									<path d="M7.5 8h3v8l-2 -1"></path>
									<path d="M16.5 8h-2.5a0.5 .5 0 0 0 -.5 .5v3a0.5 .5 0 0 0 .5 .5h1.423a0.5 .5 0 0 1 .495 .57l-.418 2.93l-2 .5"></path>
							</svg>
							<p>JavaScript</p>
					</div>
					<div className="flex flex-col items-center gap-1">
							<svg className="w-10 h-10" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M6.357 9c-2.637 .68 -4.357 1.845 -4.357 3.175c0 2.107 4.405 3.825 9.85 3.825c.74 0 1.26 -.039 1.95 -.097"></path>
									<path d="M9.837 15.9c-.413 -.596 -.806 -1.133 -1.18 -1.8c-2.751 -4.9 -3.488 -9.77 -1.63 -10.873c1.15 -.697 3.047 .253 4.974 2.254"></path>
									<path d="M6.429 15.387c-.702 2.688 -.56 4.716 .56 5.395c1.783 1.08 5.387 -1.958 8.043 -6.804c.36 -.67 .683 -1.329 .968 -1.978"></path>
									<path d="M12 18.52c1.928 2 3.817 2.95 4.978 2.253c1.85 -1.102 1.121 -5.972 -1.633 -10.873c-.384 -.677 -.777 -1.204 -1.18 -1.8"></path>
									<path d="M17.66 15c2.612 -.687 4.34 -1.85 4.34 -3.176c0 -2.11 -4.408 -3.824 -9.845 -3.824c-.747 0 -1.266 .029 -1.955 .087"></path>
									<path d="M8 12c.285 -.66 .607 -1.308 .968 -1.978c2.647 -4.844 6.253 -7.89 8.046 -6.801c1.11 .679 1.262 2.706 .56 5.393"></path>
									<path d="M12.26 12.015h-.01c-.01 .13 -.12 .24 -.26 .24a0.263 .263 0 0 1 -.25 -.26c0 -.14 .11 -.25 .24 -.25h-.01c.13 -.01 .25 .11 .25 .24"></path>
							</svg>
							<p>React</p>
					</div>
					<div className="flex flex-col items-center gap-1">
							<svg fill="#000000" viewBox="0 0 16 16" className="w-10 h-10">
									<path d="M 8 1.0234375 C 7.736875 1.0234375 7.4742344 1.0924687 7.2402344 1.2304688 L 2.7402344 3.8789062 C 2.2832344 4.1469063 2 4.642875 2 5.171875 L 2 11.005859 C 2 11.554859 2.29925 12.059266 2.78125 12.322266 L 4.2558594 13.126953 C 4.4828594 13.250953 4.7286094 13.310547 4.9746094 13.310547 C 5.2386094 13.310547 5.4992812 13.239609 5.7382812 13.099609 C 6.1982812 12.826609 6.4726562 12.344594 6.4726562 11.808594 L 6.4726562 5.4648438 L 5.4726562 5.4648438 L 5.4726562 11.808594 C 5.4726562 12.065594 5.3025156 12.195281 5.2285156 12.238281 C 5.1555156 12.281281 4.959375 12.371047 4.734375 12.248047 L 3.2617188 11.445312 C 3.1007187 11.357312 3 11.188859 3 11.005859 L 3 5.171875 C 3 4.995875 3.0940938 4.8302344 3.2460938 4.7402344 L 7.7460938 2.0917969 C 7.9020937 1.9997969 8.0979062 2.0007969 8.2539062 2.0917969 L 12.753906 4.7402344 C 12.904906 4.8302344 13 4.995875 13 5.171875 L 13 11.009766 C 13 11.189766 12.900234 11.359219 12.740234 11.449219 L 8.2402344 13.900391 C 8.0902344 13.980391 7.9097656 13.980391 7.7597656 13.900391 L 6.8808594 13.419922 C 6.7108594 13.629922 6.5 13.810937 6.25 13.960938 C 6.17 14.010938 6.0897656 14.050078 6.0097656 14.080078 L 7.2792969 14.779297 C 7.5092969 14.899297 7.75 14.960938 8 14.960938 C 8.25 14.960938 8.4907031 14.899297 8.7207031 14.779297 L 13.220703 12.320312 C 13.700703 12.060313 14 11.559766 14 11.009766 L 14 5.171875 C 14 4.642875 13.717719 4.1469062 13.261719 3.8789062 L 8.7617188 1.2304688 C 8.5272187 1.0924688 8.263125 1.0234375 8 1.0234375 z M 9.4511719 5.3183594 C 7.8711719 5.3183594 7.0703125 5.8690781 7.0703125 6.9550781 C 7.0703125 8.1850781 8.4869687 8.3680781 9.1679688 8.4550781 C 9.2659688 8.4680781 9.352875 8.4791875 9.421875 8.4921875 L 9.7207031 8.5449219 C 10.760703 8.7189219 11 8.836875 11 9.171875 C 11 9.333875 10.999172 9.8242188 9.4511719 9.8242188 C 8.1381719 9.8242188 7.8691406 9.4346094 7.8691406 8.8496094 L 6.8691406 8.8496094 C 6.8691406 9.7516094 7.3171719 10.824219 9.4511719 10.824219 C 11.557172 10.824219 12 9.925875 12 9.171875 C 12 7.913875 10.777719 7.7076406 9.8867188 7.5566406 L 9.5996094 7.5078125 C 9.5166094 7.4928125 9.4119219 7.4788438 9.2949219 7.4648438 C 8.6589219 7.3828438 8.0703125 7.2650312 8.0703125 6.9570312 C 8.0703125 6.7340313 8.0691719 6.3193594 9.4511719 6.3183594 C 10.370172 6.3183594 10.837891 6.6207969 10.837891 7.2167969 L 11.837891 7.2167969 C 11.837891 6.2997969 11.209172 5.3183594 9.4511719 5.3183594 z"/>
							</svg>
							<p>Node.js</p>
					</div>
					<div className="flex flex-col items-center gap-1">
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" className="fill-current h-full w-auto">
            <title>wagmi</title>

            <g>
              <g id="svg_6">
              <rect fill="none" id="canvas_background" height="7.14139" width="7.14139" y="-1" x="-1"/>
              </g>
              <g stroke="null" id="svg_7">
              <g stroke="null" id="svg_5">
                <path stroke="null" id="svg_1" fill="inherit" d="m40.14095,13.4727c0,0.69748 -0.38473,1.2629 -0.85926,1.2629c-0.47453,0 -0.85926,-0.56542 -0.85926,-1.2629c0,-0.69748 0.38473,-1.2629 0.85926,-1.2629c0.47453,0 0.85926,0.56542 0.85926,1.2629z"/>
                <path stroke="null" id="svg_2" fill="inherit" d="m29.61499,23.26018c0.35595,0 0.64445,-0.42402 0.64445,-0.94717l0,-3.7887c0,-0.52311 0.28849,-0.94717 0.64445,-0.94717l1.2889,0c0.35595,0 0.64445,0.42406 0.64445,0.94717l0,3.7887c0,0.52316 0.28849,0.94717 0.64445,0.94717c0.35595,0 0.64445,-0.42402 0.64445,-0.94717l0,-3.7887c0,-0.52311 0.28849,-0.94717 0.64445,-0.94717l1.2889,0c0.35595,0 0.64445,0.42406 0.64445,0.94717l0,3.7887c0,0.52316 0.28849,0.94717 0.64445,0.94717l1.93334,0c0.35595,0 0.64445,-0.42402 0.64445,-0.94717l0,-5.68306c0,-0.52311 -0.28849,-0.94717 -0.64445,-0.94717c-0.35595,0 -0.64445,0.42406 -0.64445,0.94717l0,4.26228c0,0.26156 -0.14429,0.47359 -0.32222,0.47359c-0.17794,0 -0.32222,-0.21203 -0.32222,-0.47359l0,-4.26228c0,-0.52311 -0.28849,-0.94717 -0.64445,-0.94717l-7.73336,0c-0.35595,0 -0.64445,0.42406 -0.64445,0.94717l0,5.68306c0,0.52316 0.28849,0.94717 0.64445,0.94717l-0.00001,0z"/>
                <path stroke="null" id="svg_3" fill="inherit" d="m1.90378,21.36583c-0.35593,0 -0.64445,-0.42406 -0.64445,-0.94717l0,-3.7887c0,-0.52311 -0.28852,-0.94717 -0.64445,-0.94717c-0.35591,0 -0.64445,0.42406 -0.64445,0.94717l0,5.68306c0,0.52316 0.28852,0.94717 0.64445,0.94717l7.73336,0c0.35595,0 0.64445,-0.42402 0.64445,-0.94717l0,-3.7887c0,-0.52311 0.28849,-0.94717 0.64445,-0.94717l7.41114,0c0.17794,0 0.32222,0.21203 0.32222,0.47359c0,0.26156 -0.14429,0.47359 -0.32222,0.47359l-6.76669,0c-0.35595,0 -0.64445,0.42406 -0.64445,0.94717l0,2.84153c0,0.52316 0.28849,0.94717 0.64445,0.94717l7.73336,0c0.35595,0 0.64445,-0.42402 0.64445,-0.94717l0,-5.68306c0,-0.52311 -0.28849,-0.94717 -0.64445,-0.94717l-9.6667,0c-0.35595,0 -0.64445,0.42406 -0.64445,0.94717l0,3.7887c0,0.52311 -0.28849,0.94717 -0.64445,0.94717l-1.2889,0c-0.35593,0 -0.64445,-0.42406 -0.64445,-0.94717l0,-3.7887c0,-0.52311 -0.28852,-0.94717 -0.64445,-0.94717c-0.35593,0 -0.64445,0.42406 -0.64445,0.94717l0,3.7887c0,0.52311 -0.28852,0.94717 -0.64445,0.94717l-1.2889,0l0.00001,0zm15.46672,-0.47359c0,0.26156 -0.14429,0.47359 -0.32222,0.47359l-5.80002,0c-0.17794,0 -0.32222,-0.21203 -0.32222,-0.47359c0,-0.26156 0.14429,-0.47359 0.32222,-0.47359l5.80002,0c0.17794,0 0.32222,0.21203 0.32222,0.47359z" clipRule="evenodd" fillRule="evenodd"/>
                <path stroke="null" id="svg_4" fill="inherit" d="m19.30384,22.313c0,0.52316 0.28849,0.94717 0.64445,0.94717l6.76669,0c0.17794,0 0.32222,0.21206 0.32222,0.47359c0,0.26152 -0.14429,0.47359 -0.32222,0.47359l-6.76669,0c-0.35595,0 -0.64445,0.42402 -0.64445,0.94717c0,0.52316 0.28849,0.94717 0.64445,0.94717l7.73336,0c0.35595,0 0.64445,-0.42402 0.64445,-0.94717l0,-8.52459c0,-0.52311 -0.28849,-0.94717 -0.64445,-0.94717l-7.73336,0c-0.35595,0 -0.64445,0.42406 -0.64445,0.94717l0,5.68306l0,0.00002zm1.93334,-4.73589c-0.35595,0 -0.64445,0.42406 -0.64445,0.94717l0,1.89436c0,0.52311 0.28849,0.94717 0.64445,0.94717l5.15557,0c0.35595,0 0.64445,-0.42406 0.64445,-0.94717l0,-1.89436c0,-0.52311 -0.28849,-0.94717 -0.64445,-0.94717l-5.15557,0z" clipRule="evenodd" fillRule="evenodd"/>
              </g>
              </g>
            </g>
            </svg>
            <p>Wagmi</p>
					</div>
					<div className="flex flex-col items-center gap-1">
          <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
              <g>
                <title>background</title>
                <rect x="-1" y="-1" width="42" height="42" id="canvas_background" fill="none"/>
              </g>

              <g>
                <title>GSAP</title>
                <g stroke="null" id="svg_1">
                <path stroke="null" d="m7.3083,18.40061c-1.11469,0.48362 -4.06498,2.66066 -4.63321,3.30569c-0.59012,0.64503 -0.76491,-0.36279 -0.153,-2.03582c0.48068,-1.35052 1.7047,-3.18486 3.75897,-4.75705c1.20192,-0.90708 3.84642,-2.21722 5.46357,-2.98328c0.32789,-0.16131 4.56765,-1.81415 8.34851,-2.64058c0.32789,-0.08065 -0.39334,0.50391 -0.50268,0.82642c-0.56823,1.53192 -11.91081,8.10312 -11.91081,8.10312l-0.37135,0.18149z" id="svg_2"/>
                <path stroke="null" d="m23.28388,36.88454c0.19667,1.08847 0.02189,1.16912 -1.20192,1.31024c-1.22391,0.14112 -2.11993,-0.28224 -2.44772,-0.56437c-0.32789,-0.28234 -0.39334,-0.90708 -0.06556,-1.47145c0.19678,-0.36289 0.39345,-0.48382 0.50278,-0.92726c0.10923,-0.42326 0.19667,-0.5241 0.28401,-0.6853c0.08734,-0.14122 0.10933,-0.28234 0.13111,-1.26997c0.02189,-0.98763 0,-2.84216 0.10933,-3.62821c0.10933,-0.80623 3.89019,0.36279 3.89019,0.36279s-0.89613,2.05601 -1.13647,2.55992c-0.24045,0.50401 -0.21856,1.47145 -0.21856,1.67303s-0.08734,0.60465 -0.153,0.62484c-0.06556,0.02009 0.21856,0.54419 0.08734,0.84661c-0.08745,0.28224 0.19667,1.00792 0.21845,1.16912z" id="svg_3"/>
                <path stroke="null" d="m24.72635,6.06443c-0.13122,-0.76596 0,-2.27788 0.17478,-2.51965c0.54645,-0.6854 3.43118,-0.76596 4.0432,0.04028c0.26223,0.36279 0.24034,1.2094 0.19667,1.75369c-0.04367,0.54419 -0.19667,1.71331 -0.21856,2.09639c-0.02178,0.28224 -3.19074,0.72558 -3.89009,-0.04038c-0.19678,-0.20148 -0.30601,-1.33033 -0.30601,-1.33033z" id="svg_4"/>
                <path stroke="null" d="m31.1516,34.92927c1.33314,0.88699 2.36027,1.04819 3.03773,1.37071c0.67746,0.32261 0.50268,0.94745 -0.63379,1.12885c-0.91791,0.16121 -2.36027,-0.16131 -3.32185,-0.16131s-3.1034,0.10084 -3.67163,-0.26195c-0.65557,-0.42326 -0.37156,-1.2095 -0.37156,-1.2095c0.17489,-0.44335 0.6119,-1.43117 0.48079,-2.23741s-0.30601,-1.24968 -0.63379,-1.99555c-0.32779,-0.74577 -0.56813,-2.58001 -0.26212,-2.68085s0.21845,0 0.6119,0.08055c0.39334,0.08055 0.83046,0.20158 1.68281,0.20158s1.79204,-0.12103 2.11993,-0.1814c0.32779,-0.06047 0.59001,-0.12103 0.48068,0.50391c-0.10923,0.62484 -0.43701,1.79396 -0.4589,2.70104c-0.02178,0.90708 -0.02178,1.95527 0.04378,2.13667c0.06545,0.1814 0.54635,0.38298 0.89602,0.60465z" id="svg_5"/>
                <g stroke="null" id="svg_6">
                  <g stroke="null" id="svg_7">
                  <path stroke="null" fill="#939393" d="m26.47472,8.08017c-2.40394,1.91499 -7.05904,2.43899 -13.96497,4.89817c-1.77026,0.62484 -6.49081,2.49946 -7.62728,4.45473c3.82453,-2.03582 5.24511,0.76596 5.55101,3.64839c0.28401,2.70104 1.74837,4.11212 5.50734,4.03137c3.8683,-0.08055 5.04844,1.99555 6.11924,4.43464c2.07616,-9.33281 5.39812,-11.14686 7.53972,-12.73924c4.54587,-3.40663 -1.04892,-9.41346 -3.12507,-8.72806z" id="svg_8"/>
                  <path stroke="null" fill="#939393" d="m26.47472,8.08017c-5.76957,1.85443 -11.47369,2.31806 -18.18295,6.12776c-1.59537,0.90708 -4.961,2.96299 -5.61668,6.89372c2.44761,-2.49956 8.10796,-5.64394 15.03588,-7.63949c3.49674,-1.00792 6.05379,-1.67303 9.15709,-2.78169c-0.21845,-1.29015 -0.21845,-1.79406 -0.39334,-2.6003z" id="svg_9"/>
                  </g>
                  <path stroke="null" d="m33.83966,19.12619c0,0 -0.41523,1.31024 -1.24569,1.7336c0,0 -0.6119,0.20158 -1.83571,-0.42326c-0.34967,-0.1814 -0.6119,-0.80623 -0.59012,-1.00792c0.02189,-0.48382 0.34967,-0.70549 0.34967,-0.70549s0.34978,-0.54429 0.76491,-0.5241c0.41534,0.02009 1.11469,0.08055 1.33325,-0.10084c0.19656,-0.20158 1.26748,0.36279 1.2237,1.02801z" id="svg_10"/>
                  <path stroke="null" d="m24.92302,6.44741c0,0 -0.08734,1.02811 -0.24034,1.67303c-0.02189,0.12103 -0.67746,0.1814 -1.15836,0.36289c0.91791,2.4188 6.44714,2.39862 7.16837,1.2094c-0.34967,-0.22167 -1.04902,-0.56437 -1.37681,-0.6853c-0.32789,-0.12103 -0.30601,-0.10084 -0.32789,-0.66522c-0.02178,-0.56447 -0.06556,-1.61257 -0.10933,-1.89481c-0.04367,-0.28224 -3.43118,-0.28224 -3.95564,0z" id="svg_11"/>
                  <path stroke="null" fill="#EFEFEF" d="m25.14158,6.44741c0,0 0,0.58456 -0.06556,1.14894c-0.02178,0.26205 -0.04367,0.42326 -0.08734,0.62484c-0.02189,0.12103 0.74302,0.60465 0.96158,1.67303c1.04902,2.15676 3.47496,1.08847 4.48021,0.06047c-0.34967,-0.22177 -0.91791,-0.5241 -1.57348,-0.76596c-0.32789,-0.12103 -0.17489,-0.38298 -0.19667,-0.94735c-0.02189,-0.56437 -0.10933,-1.3909 -0.153,-1.69322c-0.04388,-0.30233 -2.84117,-0.38298 -3.36573,-0.10074z" id="svg_12"/>
                  <path stroke="null" d="m24.92302,6.44741c0,0 -0.02189,0.36289 -0.08734,0.78615c0.28401,0.26195 0.65557,0.62484 0.9398,0.84661c0.19667,0.16131 0.67735,0.14112 1.11458,0.14112c0.39334,0 0.74302,0.04028 0.89602,-0.04028c0.34978,-0.16131 0.85235,-0.56437 1.13647,-0.8668c-0.02178,-0.36279 -0.04367,-0.70549 -0.06545,-0.8668c-0.0221,-0.28224 -3.40962,-0.28224 -3.93408,0z" id="svg_13"/>
                  <path stroke="null" d="m26.91184,7.97933c-0.26234,0 -0.56834,-0.02009 -0.80868,-0.06047c-0.10933,-0.02009 -0.21856,-0.08055 -0.30601,-0.12093c-0.153,-0.10084 -0.30601,-0.22167 -0.48068,-0.3427c-0.34978,-0.24186 -0.37156,-0.38298 -0.37156,-0.44335c0.153,-1.26997 -0.04378,-2.33825 -0.04378,-2.33825s-0.153,-0.54429 0.67746,-0.6854s1.33314,-0.16121 1.33314,-0.16121s0.52456,0 1.33314,0.16121c0.83046,0.14112 0.67746,0.6854 0.67746,0.6854s-0.19667,1.06828 -0.04367,2.33825c0,0.06037 -0.02178,0.20148 -0.37156,0.44335c-0.30601,0.20158 -0.54635,0.42326 -0.78669,0.46363c-0.24045,0.04038 -0.54645,0.06047 -0.80857,0.06047z" id="svg_14"/>
                  <path stroke="null" d="m26.91184,3.30293c-1.44237,0 -1.72659,0.36279 -2.14182,0.76596c-0.08734,0.10074 -0.02189,0.70549 0.13122,1.99555l0.19667,0c0,0 -0.13122,-0.36289 -0.10933,-0.78615s0.10933,-0.40307 0.04367,-0.50391c-0.08734,-0.12103 -0.26223,-0.32261 0.13122,-0.5241c0.39334,-0.20158 1.00525,0.16121 1.74837,0.1814c0.74302,-0.02019 1.37681,-0.38298 1.77015,-0.1814c0.39334,0.20148 0.21856,0.40307 0.13122,0.5241c-0.08745,0.12093 0.02178,0.08055 0.04367,0.50391c0.02178,0.42326 -0.10933,0.78615 -0.10933,0.78615l0.19667,0c0.13111,-1.29006 0.21856,-1.85443 0.153,-1.95527c-0.37156,-0.44344 -0.74302,-0.78615 -2.18538,-0.80623z" id="svg_15"/>
                  <path stroke="null" d="m33.83966,19.18666c0,0 -0.41523,1.22959 -1.22381,1.65285c-0.17489,-0.08055 -0.153,-0.20148 -0.30601,-0.38298c-0.04378,-0.06037 -0.19678,-0.10084 -0.26223,-0.16121c-0.06556,-0.06047 -0.04367,-0.16131 -0.153,-0.24186c-0.08745,-0.08065 -0.153,-0.02019 -0.24045,-0.08065c-0.08734,-0.08055 -0.10933,-0.1814 -0.17478,-0.24176c-0.04378,-0.04038 -0.21856,-0.06047 -0.26223,-0.10084c-0.10933,-0.10084 -1.0708,-0.28224 -1.02713,-0.48382c0.08734,-0.30242 0.26223,-0.5241 0.26223,-0.5241s0.41523,-0.56437 0.83036,-0.54429c0.41523,0.02019 0.80868,0.10084 1.02724,-0.08055c0.24045,-0.20168 1.59548,0.54419 1.52981,1.18921z" id="svg_16"/>
                  <path stroke="null" d="m30.9986,10.2773c0,0 1.37681,-0.30242 2.3166,0.5241c0.9398,0.84661 0.87413,1.89471 0.59012,2.53973c0.24034,0.26205 0.67746,0.98763 0.34967,1.85443c1.44237,1.12875 0.80857,2.86235 -0.48079,4.01128c0,0 -0.30601,-1.04819 -1.52981,-1.10866c0.04367,-0.40307 -1.13647,-0.72568 -0.59012,-1.77388c-0.83046,-0.1814 -0.80857,-0.70549 -0.93969,-1.35042c-0.10933,-0.64513 0.28401,-4.69659 0.28401,-4.69659z" id="svg_17"/>
                  <path stroke="null" fill="#EFEFEF" d="m30.49592,10.84167c0,0 1.59537,-0.74577 2.53516,0.10084c0.93969,0.84661 0.67735,1.77378 0.39334,2.4188c0.24034,0.26195 0.80857,1.00792 0.4589,1.89471c-0.06556,0.20158 -0.54635,0.20158 -0.89613,0.72568c0.87413,-0.46373 1.42058,-0.3427 1.61726,0.24176c0.30601,0.90708 -0.37156,1.99555 -0.96158,2.6003c0,-0.02019 -0.02189,-0.04038 -0.02189,-0.06047c-0.08734,0.30242 -0.19667,0.88689 -0.85224,1.53192c-0.32789,0.32251 -0.59012,0.28224 -0.96168,0.20158c-0.43701,-0.10084 -0.59001,-0.28234 -1.20192,-0.58456c-0.34967,-0.1814 -0.153,-0.40317 -0.153,-0.58456c0,-0.04028 0.04367,-0.10084 0.10933,-0.1814c0.04367,-0.10084 0.17478,-0.26195 0.37146,-0.44344c0,0 0.28412,-0.36279 0.69946,-0.3427c0.41523,0.02019 0.85224,-0.06037 0.96158,-0.16121l0,0c0,-0.70549 -0.87413,-0.72568 -0.56823,-1.93508c0.02189,-0.06047 0.13122,-0.16131 0.48079,-0.20158c-0.52456,-0.10084 -0.76491,-0.12103 -1.13647,-0.44344c-0.26223,-0.22167 -0.4589,-0.50391 -0.52456,-0.8667c-0.13101,-0.62484 -0.34957,-3.91044 -0.34957,-3.91044z" id="svg_18"/>
                  <path stroke="null" d="m25.8846,9.57181c-0.13111,-0.16131 -0.80857,-0.96754 -2.09805,-1.29006c-0.37156,-0.10084 -0.6119,0.1814 -0.98336,0.38298c-0.10933,-0.06047 -0.59012,-0.26205 -0.85235,-0.12103s-0.43701,0.28224 -0.69935,0.38298c-0.13122,-0.06047 -0.48079,-0.06047 -0.76491,0.04028c-0.28412,0.08065 -0.72124,0.26205 -1.13647,0.78615c-0.26223,0.8668 4.6331,0.22167 4.6331,0.22167l1.90137,-0.40297z" id="svg_19"/>
                  <path stroke="null" fill="#939393" d="m25.92838,9.57181c-0.69946,-0.22177 -0.59012,-0.96754 -2.14182,-1.08847c-0.30601,-0.02019 -0.50268,0.20148 -0.72124,0.3426c0.10933,0.10084 0.21856,0.26205 0.28412,0.42326c-0.19667,-0.20148 -0.54635,-0.46363 -0.89613,-0.5241c-0.32779,-0.06037 -0.54635,0.16131 -0.89602,0.32261c0.06545,0.06037 0.13111,0.16121 0.21845,0.28224c-0.30601,-0.1814 -0.52446,-0.24186 -0.93969,-0.10084c-0.28412,0.08055 -0.83046,0.30233 -1.24569,0.84661c-0.26223,0.8668 4.41465,-0.10084 4.41465,-0.10084l1.92337,-0.40307z" id="svg_20"/>
                  <path stroke="null" d="m30.03702,9.89432c0,0 0,-0.22177 -0.02189,-0.42326c0,-0.04028 -0.17478,-0.14112 -0.17478,-0.1814l-0.04367,-0.04038c0,0 0.34967,-0.1814 0.6119,-0.08055c0.28401,0.08055 0.43701,0.42326 0.43701,0.42326c0.50268,-0.16121 0.54635,0.02019 0.78679,0.26205c0.52456,-0.10084 0.59001,0.08055 0.91791,0.5241c0,0 -0.39334,-0.06047 -1.15825,0.06037c-0.74312,0.10074 -1.35503,-0.56437 -1.35503,-0.54419z" id="svg_21"/>
                  <path stroke="null" fill="#939393" d="m29.94958,9.79348c0,0 0.13111,-0.10084 0.08734,-0.12103c0.24034,-0.12093 0.56823,-0.26195 0.72124,0.12103c0.50268,-0.16131 0.56823,0.06047 0.80857,0.30242c0.6119,-0.26205 0.65557,0.06037 0.69935,0.20148c-0.19667,0 -0.48068,0.02019 -0.87413,0.06047c-0.74302,0.10084 -1.46425,-0.58456 -1.44237,-0.56437z" id="svg_22"/>
                  <path stroke="null" d="m22.51908,9.28957c0,0 1.24569,0.40307 2.29472,0.3426c1.04902,-0.08055 2.84106,-0.16121 3.80264,0.36289c0,0 0.98347,-0.32261 1.90137,-0.10084c0.91802,0.22167 2.60072,1.67303 2.09815,3.20495c-0.04378,0.10084 -0.32789,0.26205 -0.65568,0.36289c0,0 0.17489,0.6853 -0.13111,1.24968c-0.30601,0.54429 -0.98347,1.59248 -1.00535,3.04374l0,0c-0.02178,0.24186 -0.06545,0.74577 -0.10923,0.98763c-1.7047,-0.06037 -4.3272,-0.64503 -6.90604,-0.60465c0.02178,-0.26195 0.04367,-0.42326 0.06556,-0.6853l0.06545,0c-0.13111,-0.66522 -0.17478,-1.00792 -0.30601,-1.51183c-0.83046,-0.48372 -1.7047,-1.0481 -2.44761,-2.11648c-0.72124,-1.06838 1.33314,-4.53528 1.33314,-4.53528z" id="svg_23"/>
                  <path stroke="null" d="m30.95493,20.17438c0,0 1.35503,4.47492 -0.24034,6.34953c0,0 0.24034,0.8667 -0.30601,1.79396c-0.08745,0.40307 -0.19678,0.76596 -0.26223,1.16903c-0.28412,1.67303 -0.76501,2.37853 -0.89613,5.05938l-1.31136,-0.02009c0,0 -0.153,-1.93508 -0.6119,-2.96309c-0.26212,-0.58446 -1.28947,-1.37071 -1.24559,-2.15676c0.04367,-0.60475 0.17478,-1.10866 1.28947,-1.91499c0.08734,-1.16903 -1.18024,-2.27778 -0.98347,-6.63167l4.56755,-0.6853z" id="svg_24"/>
                  <path stroke="null" fill="#EFEFEF" d="m30.56159,19.99289c0.34967,2.05601 1.15825,5.09976 -0.30601,6.59129c0.06545,0.28224 0.10923,0.6854 0.02178,1.14894c-0.04367,0.24186 -0.13111,0.50391 -0.24034,0.78605c-0.21856,0.48382 -0.30601,1.18931 -0.37156,1.61257c-0.28412,1.67303 -0.28412,1.75379 -0.41523,4.43464l-1.31136,-0.02019c0,0 -0.153,-1.93508 -0.6119,-2.96299c-0.26212,-0.58456 -0.80857,-1.08847 -0.85224,-1.87462c-0.04367,-0.60465 0.41523,-1.81405 1.50803,-1.77378c-0.06556,-2.43899 -1.28947,-1.95527 -1.61726,-7.03484l4.19609,-0.90708z" id="svg_25"/>
                  <path stroke="null" fill="#EFEFEF" d="m22.51908,9.28957c0,0 0.48079,0.14112 1.00525,0.1814c0.52456,0.04028 1.0928,0 1.59537,-0.02019c1.04902,-0.08055 2.53516,-0.1814 3.51863,0.3427c0,0 0.54635,-0.16131 1.13647,-0.12103c0.26223,0.02019 0.52456,0.22177 0.83046,0.30242c0.96158,0.22167 1.87949,1.69312 1.46415,3.02355c-0.04367,0.10084 -0.34967,0 -0.69935,0.10084c0.06545,0.28224 0.10933,0.92726 -0.24045,1.61257c-0.37146,0.6854 -0.85224,1.57229 -0.76491,3.26551c-2.29472,-0.10084 -3.32185,-0.24186 -5.59479,-0.3427c-0.19667,-0.74587 -0.32789,-1.49164 -0.34967,-1.87462c0.30601,-0.14112 0.48068,-0.26195 0.72124,-0.50391c-0.65557,0.10084 -0.91791,0.06047 -1.31136,-0.14112c-0.39334,-0.20158 -1.09269,-0.84661 -1.44237,-1.26987c-0.04367,-0.04038 -0.28401,0.62474 -0.83036,0.64503c-0.19678,-0.26205 0.63368,-1.00792 0.48068,-1.29006c-0.54624,-1.02811 0.481,-3.91054 0.481,-3.91054z" id="svg_26"/>
                  <path stroke="null" d="m30.73626,18.31986c0,0 0.04367,0.72568 0.04367,0.90708c0,0.20158 0.17489,0.80623 0.19667,1.08847c-0.24034,0.38298 -1.28936,1.24978 -3.19074,1.57229c-1.87949,0.36279 -4.37087,-2.35834 -4.37087,-2.35834c0.06556,-0.26205 0.28412,-1.02811 0.43712,-1.43117c0.02189,-0.04028 0.06556,-0.14112 0.06556,-0.1814c0.19678,-0.26205 6.81859,0.40307 6.81859,0.40307z" id="svg_27"/>
                  <path stroke="null" fill="#EFEFEF" d="m30.25558,18.38042c0,0.50391 0.08734,0.8668 0.153,1.18931c0.10923,0.58456 0.28401,0.96754 0.28401,1.35052c0,1.16903 -1.66093,0.96744 -3.05973,1.00782c-1.87949,0.36289 -3.47485,-2.35834 -3.47485,-2.35834c0.13111,-0.46363 0.21856,-0.98763 0.41523,-1.43117l0,0c0.02178,-0.24186 0.06556,-0.54419 0.08734,-0.6853c2.66628,0 4.54576,0.14112 5.63856,0.24176c0.04378,0.22177 0.00011,0.60475 -0.04356,0.6854l0,0z" id="svg_28"/>
                  <path stroke="null" d="m28.15743,20.98062c0,0 -1.15825,-2.37853 -4.63321,-1.67294c-0.83036,2.15676 -1.94504,4.63612 -1.22381,7.31698c-0.72124,0.90708 -1.5517,1.41108 -1.5517,3.08402c0,1.67303 0.08745,1.95527 0.08745,1.95527l2.55695,0.12103c0,0 0.83046,-0.98763 1.15825,-2.05601c0.08745,-0.30242 0.17489,-0.84661 0.10933,-1.47145c0.08734,-0.12093 0.4589,-0.40307 0.50268,-0.94735c0,0 1.24569,-0.60465 1.96693,-2.0761c0.67757,-1.33063 0.50268,-2.47957 1.02713,-4.25344z" id="svg_29"/>
                  <path stroke="null" fill="#EFEFEF" d="m28.15743,20.98062c-0.06545,-0.22167 -0.93969,-2.39862 -4.1742,-1.75369c-1.90127,4.6765 -1.20192,6.61158 -0.91791,7.45809c-1.28947,1.51173 -1.87949,1.83424 -1.61715,4.89817l1.7047,0c0.78669,-1.14894 0.96158,-1.57229 1.00525,-3.08402c0,-0.06047 -0.24034,0.12093 -0.41523,0.32251c0.13122,-0.62484 0.50268,-0.74577 0.78679,-1.12875c0.13111,-0.16131 0.24034,-0.40317 0.24034,-0.72568c1.52981,-0.94735 2.09805,-2.13667 2.42583,-3.36626c0.26234,-0.84651 0.56823,-2.23741 0.96158,-2.62039z" id="svg_30"/>
                  <path stroke="null" d="m22.75942,17.73539c0,0 0.59012,0.02009 1.11469,0.1814c0.50268,0.16121 0.50268,0.26195 0.69935,0.46363s0.67746,0.50391 0.59012,0.80623c-0.04378,0.16131 -0.153,0.20158 -0.30601,0.3427c-0.06556,0.06047 -0.54645,0.54419 -0.65568,0.60465c-0.06556,0.04028 -0.153,0.10084 -0.21856,0.14112c-0.06545,0.04028 -0.26212,0.16131 -0.32779,0.20158c-0.21856,0.10084 -0.37156,0.16131 -0.6119,0.14112c0,0 -0.54635,-0.02019 -0.89613,-0.36279c0,0 -0.04367,-0.16131 0.04378,-0.24186c0,0 -0.45901,-0.36289 -0.59012,-0.60475c-0.13122,-0.24176 -0.13122,-0.58446 -0.04367,-0.76586c0.04367,-0.18159 0.89591,-0.6855 1.20192,-0.90718z" id="svg_31"/>
                  <path stroke="null" d="m23.30587,37.34817l-0.06556,0.50401c0,0 -0.19667,0.22167 -1.66093,0.20158c-1.48614,-0.02019 -1.87949,-0.44344 -2.0106,-0.66522l-0.08734,-0.5241c0,0 0.28412,-0.38298 0.34967,-0.38298c0.48079,0.04028 2.11993,0.64503 3.2564,0.80623c0.10901,0 0.13079,0.04028 0.21835,0.06047z" id="svg_32"/>
                  <path stroke="null" d="m26.47472,36.32016c0,0.22167 -0.02189,0.22167 -0.02189,0.44344c0.26223,0.1814 0.91802,0.28224 2.1636,0.26195c1.81393,-0.04028 3.49674,0.50401 5.55101,0.1814l0.02189,-0.36279l-0.19667,-0.02009l-7.2776,-0.54429l-0.24034,0.04038z" id="svg_33"/>
                  <path stroke="null" d="m28.07009,37.02566c0.17489,0 0.34967,0 0.54635,0c1.18024,-0.04028 2.29482,0.20158 3.49674,0.26205c0.63379,-0.02019 1.42058,-0.16131 1.35503,-0.58456l-6.20669,-0.48382c-0.37156,0.38298 -0.08755,0.70549 0.80857,0.80633z" id="svg_34"/>
                  <path stroke="null" d="m20.94549,28.53955c0.19667,0.12093 1.52981,0.84661 3.69341,0.74577c-0.04378,0.38298 -0.02189,1.12885 -0.98347,2.43899c-0.48079,0.64503 -0.89613,1.77388 -0.98347,3.20505c0.02189,0.32251 0.21856,0.60465 -0.04367,1.02801c0.08734,0.26195 0.43701,0.78605 0.6119,1.10856c0.17478,0.32261 0.26223,0.6854 -0.89613,0.70559c-1.18014,0.02009 -3.08151,-0.10084 -2.81917,-0.94735c0.13122,-0.44344 0.50268,-0.90708 0.54645,-1.08857c0.04367,-0.1814 0.04367,-0.72558 0.41512,-1.08847c0.32789,-1.00782 0.21856,-1.97536 0.15311,-2.88244c-0.10933,-0.94745 -0.13122,-2.45918 0.3059,-3.22514z" id="svg_35"/>
                  <path stroke="null" d="m22.97798,12.11154c1.5517,-1.91499 0.24034,-3.44681 -2.25094,-2.98328c-1.00535,0.1814 -2.0106,0.82652 -2.07626,1.99555c-0.32779,0.04028 -1.0708,0.08055 -1.44237,1.33033c-0.28401,0.96754 -0.43701,1.14894 -0.9398,1.63266c-0.32779,0.3427 0.02189,1.04819 0.26223,1.5522c0.80868,1.7335 3.30007,1.89471 4.98288,3.20495c0.56823,-0.14112 1.15825,-0.72558 1.33314,-1.10856c-1.42058,-1.5522 -1.11469,-2.15685 -1.68292,-2.96309c0.61201,-0.20168 2.01071,-0.98773 1.81404,-2.66076z" id="svg_36"/>
                  <path stroke="null" fill="#EFEFEF" d="m22.67197,11.99061c0.08734,-0.12103 0.24034,-0.38298 0.30601,-0.48382c0.02189,-0.02019 0.26223,0.36279 0.28412,0.3427c0.59001,-0.88699 0.74302,-2.17704 0.06545,-2.29797c-0.153,-0.02019 -0.43701,-0.08055 -0.67746,-0.16131c-0.43701,-0.14112 -0.83036,-0.14112 -1.52981,-0.02009c-0.96158,0.16121 -1.92315,0.80623 -1.92315,1.7335c0,0.06047 0.67735,0.24186 0.87413,0.98773c-0.32789,-0.42335 -0.89613,-0.88699 -1.57359,-0.48382c-0.72124,0.42326 -0.34967,1.3908 -1.31125,2.39862c-0.32789,0.3427 -0.28412,0.74587 0.06545,1.5521c0.56823,1.26997 3.2564,1.95527 4.72066,3.16467c0.34967,-0.14112 0.59001,-0.46363 0.76491,-0.70549c-0.98347,-0.94735 -1.37692,-1.83434 -1.66093,-2.47937c-0.34967,-0.74577 -0.74312,-1.16903 -1.50803,-1.7336c0.39345,0.14112 0.69946,0.28224 0.87413,0.40317c0.19667,0.12093 0.48079,0.14112 0.74312,0.06047c0.9399,-0.30213 1.44258,-1.51163 1.48625,-2.27749z" id="svg_37"/>
                  <path stroke="null" d="m32.17873,12.31312c-0.06556,0.76596 -0.67746,0.38298 -1.00525,0.24186c-0.65568,-0.26205 -1.31136,-0.44344 -2.07626,-0.44344s-1.74837,0.06047 -2.60061,0.26205c-1.18014,0.30233 -1.52992,0.28224 -2.05438,0.04028c-0.52446,-0.26205 -1.44226,-0.90708 -1.44226,-0.90708s-0.02189,0.20158 0.19667,0.46363c0.28401,0.32251 0.91791,0.72568 1.77015,0.98763c0.41523,0.12103 0.74312,0.04028 1.11469,-0.04028c1.94504,-0.44344 3.99931,-0.5241 5.72579,0.44344c0.08745,0.04028 0.39345,-0.08065 0.52456,-0.26205c0.17468,-0.26195 -0.15311,-0.78605 -0.15311,-0.78605z" id="svg_38"/>
                  <path stroke="null" fill="#001423" d="m22.23496,19.99289c0.17478,0.10084 0.39334,0.16131 0.63368,0.3427c0,0 -0.19667,0 -0.28401,-0.08055c-0.10933,-0.06047 -0.32789,-0.24186 -0.34967,-0.26215l0,0z" id="svg_39"/>
                  <path stroke="null" fill="#EFEFEF" d="m28.55088,4.00842c-0.06556,-0.1814 -0.54645,-0.50401 -1.66093,-0.50401c-1.20203,0 -1.5517,0.3427 -1.57348,0.5241c0,0.06047 -0.08745,0.70559 -0.10933,0.96754c0,0 0,0.32251 0.02178,0.80623c0.02189,0.32251 0.10933,0.50391 0.153,0.92726c0.04367,0.44335 0.17489,0.72558 0.41523,1.08847c0.10933,0.06037 0.19667,0.12093 0.30601,0.14112c0.43712,0.08055 1.20203,0.10074 1.61726,0c0.24034,-0.06047 0.54635,-0.44344 0.6119,-0.78615c0.08734,-0.42326 0.17478,-0.72568 0.19667,-0.98763c0.04367,-0.26195 0.06556,-0.84661 0.08734,-1.00792c0.06566,-0.44335 -0.04367,-1.12875 -0.06545,-1.16903z" id="svg_40"/>
                  <path stroke="null" d="m26.25616,28.92253c0,0 1.15836,0.46363 4.02131,0.06047c0,0 -0.80857,3.74924 -0.43701,5.62375c0,0 0.37146,0.48382 3.12518,1.41099c0,0 1.22381,0.28224 1.18014,0.84671c0,0 0.04367,0.12093 -1.44237,0.08055s-2.88484,-0.28224 -3.8683,-0.28224s-2.03249,0.04028 -2.20727,-0.22167c-0.19667,-0.24186 0.04367,-0.8668 0.32779,-1.22969c0.30611,-0.38288 0.21856,-0.66522 0.19678,-1.35042c-0.06577,-1.79396 -1.55191,-3.64839 -0.89623,-4.93845z" id="svg_41"/>
                  <path stroke="null" fill="#939393" d="m26.01571,29.26524c-0.153,0.20158 0.02178,0.96744 0.24034,1.71331c0.21856,0.74577 0.69946,1.18931 0.80868,2.4188c0.10923,1.2094 0.13111,1.37071 -0.24045,2.0761s-0.48079,1.35052 0.80857,1.37071s1.98882,-0.02019 3.30007,0.16131c1.31136,0.1814 1.77026,0.24186 2.4915,0.14112s0.87413,-0.32261 0.56823,-0.5241c-0.30601,-0.20158 -1.57359,-0.42326 -2.11993,-0.82652c-0.52456,-0.36279 -2.0106,-0.96754 -2.03238,-1.12875c-0.06556,-0.54429 -0.08745,-2.51965 0.02178,-3.16467c0.10933,-0.64513 0.26223,-1.57229 0.30601,-1.81415s0.26223,-0.48382 -0.10933,-0.40317c-0.37146,0.08055 -1.77015,0.26205 -2.81917,0.20158c-1.04902,-0.06037 -1.15825,-0.28214 -1.22391,-0.22157z" id="svg_42"/>
                  <path stroke="null" opacity="0.3" d="m26.75884,35.49374c0.37146,0.16121 0.91791,0.28224 1.33314,0.28224c0,0 -0.15311,0.66522 0.08734,1.06828c0.24034,0.40317 -1.74837,0.16131 -1.74837,0.16131l-0.08734,-1.43117l0.41523,-0.08065z" id="svg_43"/>
                  <path stroke="null" opacity="0.3" d="m32.5503,37.22724c0.34967,-0.10084 0.59012,-0.46363 0.30601,-0.80623c-0.30601,-0.3427 -0.56823,-0.40317 -0.17489,-0.42326c0.39345,-0.02019 1.83582,0.78605 1.83582,0.78605l-0.74312,0.62484l-1.22381,-0.1814z" id="svg_44"/>
                  <path stroke="null" opacity="0.3" d="m25.95016,30.05128c0.50268,0.16131 1.26758,0.20158 1.92326,0.1814c0.65557,-0.02009 1.63904,-0.10084 2.27294,-0.30233c0.63368,-0.20158 0.37146,0.22167 0.37146,0.22167l-0.34967,0.30242c0,0 -0.83046,0.30233 -2.18538,0.28224c-1.59537,-0.02019 -2.07626,-0.1814 -2.07626,-0.1814l0.04367,-0.50401z" id="svg_45"/>
                  <path stroke="null" opacity="0.3" d="m25.99383,31.0592c0.50278,0.16131 1.26758,0.20158 1.92326,0.1814c0.65557,-0.02009 1.52981,-0.02009 2.1636,-0.24186c0.26223,-0.08055 0.10933,0.26205 0.10933,0.26205l-0.10933,0.1814c0,0 -0.85235,0.28224 -2.18549,0.26195c-1.59537,-0.02009 -1.87949,-0.14112 -1.87949,-0.14112l-0.02189,-0.50381z" id="svg_46"/>
                  <path stroke="null" fillOpacity="0" d="m26.25616,28.92253c0,0 1.90137,0.62484 4.0432,0.20158c0,0 -0.83046,3.60812 -0.4589,5.46255c0,0 0.37146,0.48372 3.12518,1.41099c0,0 1.22381,0.28224 1.18014,0.84661c0,0 0.04367,0.12103 -1.44237,0.08055c-1.48614,-0.04028 -2.88484,-0.28224 -3.8683,-0.28224s-2.03249,0.04038 -2.20727,-0.22167c-0.19667,-0.24186 0.04367,-0.8668 0.32779,-1.22959c0.30611,-0.38298 0.21856,-0.66522 0.19678,-1.35052c-0.06577,-1.77378 -1.55191,-3.62821 -0.89623,-4.91826z" id="svg_47"/>
                  <path stroke="null" fillOpacity="0" d="m26.25616,28.92253c0,0 1.90137,0.60465 4.0432,0.1814c0,0 -0.83046,3.6283 -0.4589,5.48273c0,0 0.37146,0.48372 3.12518,1.41099c0,0 1.22381,0.28224 1.18014,0.84661c0,0 0.04367,0.12103 -1.44237,0.08055c-1.48614,-0.04028 -2.90673,-0.42326 -3.8683,-0.28224c-1.02713,0.16131 -2.03249,0.10084 -2.20727,-0.22167c-0.153,-0.26195 0.04367,-0.8668 0.32779,-1.22959c0.30611,-0.38298 0.21856,-0.66522 0.19678,-1.35052c-0.06577,-1.77378 -1.55191,-3.62821 -0.89623,-4.91826z" id="svg_48"/>
                  <path stroke="null" d="m24.55146,16.92916c0,0.14112 1.7047,0.92717 2.64439,1.08847c0.9398,0.16121 2.90673,0 3.21263,-0.06047l-0.04378,0.28224c0,0 -2.33839,0.32251 -4.13043,-0.12093c-1.79215,-0.44344 -1.59537,-0.54429 -1.59537,-0.54429l-0.08745,-0.64503z" id="svg_49"/>
                  <g stroke="null" id="svg_50">
                  <path stroke="null" fill="#EFEFEF" d="m20.90171,34.12303c0.26223,0.12103 1.20203,0.3427 1.81393,0.22177c0.08734,-0.02019 0,-1.3909 0.24045,-2.01574c0.34967,-0.8668 0.91791,-1.57229 1.18003,-3.10411c-0.91791,-0.08065 -1.96682,-0.30242 -2.51328,-0.46373c-0.69924,1.97546 -0.45879,3.66858 -0.72113,5.3618z" id="svg_51"/>
                  <path stroke="null" fill="#EFEFEF" d="m22.36608,35.393c0.153,0.04028 0.26223,0.20148 0.30601,0.10084c0.08734,-0.18149 -0.153,-0.5241 -0.17489,-0.76596c0,-0.02019 0,0 0,-0.02019c-0.19667,-0.16121 -1.52981,-0.1814 -1.44237,-0.10084c-0.153,0.26205 -0.39334,0.22177 -0.48068,0.74587c-0.04367,0.26195 0.30601,0.04028 0.63368,0.02009c-0.59001,0.36279 -1.26748,0.82652 -1.37681,1.22959c-0.13111,0.56437 0.08745,0.72568 0.74312,1.02811c0.56823,0.12093 1.24569,0.14112 1.77015,0.12093c0.59012,-0.10084 0.69946,-0.36279 0.52456,-0.72568c-0.26244,-0.54429 -0.43723,-1.24978 -0.50278,-1.63276z" id="svg_52"/>
                  </g>
                  <path stroke="null" d="m22.60642,9.20892c0.72124,0.38298 1.72659,0.28224 2.09805,0.26205c0.08745,0 0.96168,-0.14112 1.00535,-0.12103c0.08734,0.02019 0.08734,0.08065 0.08734,0.08065s-0.32779,0.16121 -1.0708,0.20148c-0.69935,0.04028 -1.52981,0 -1.98871,-0.20148c-0.54645,-0.22167 -0.13122,-0.22167 -0.13122,-0.22167z" id="svg_53"/>
                  <path stroke="null" d="m30.03702,9.5919c0.13111,0.08055 0.98347,0.38298 1.35503,0.74577c0.32779,0.32261 0.153,0.30242 0.08734,0.22177c-0.08734,-0.10084 -0.76491,-0.5241 -1.02713,-0.62484s-0.59012,-0.28224 -0.59012,-0.32251s0.17489,-0.02019 0.17489,-0.02019z" id="svg_54"/>
                  <path stroke="null" fill="#EFEFEF" d="m22.49708,17.95707c0.63379,-0.04028 1.28947,0.10084 1.7047,0.50391c0.21856,0.20158 0.56823,0.42326 0.52456,0.62484c0,0.06047 -0.13122,0.22177 -0.24034,0.3427c-0.06556,0.08055 -0.26223,0.26195 -0.32789,0.32251c-0.08734,0.06047 -0.39334,0.28224 -0.4589,0.32251c-0.06556,0.04038 -0.153,0.14122 -0.21856,0.16131c-0.21845,0.10084 -0.4589,0.02019 -0.67746,-0.08055c-0.21845,-0.10084 0.04378,-0.12103 -0.19667,-0.28224c-0.59001,-0.38298 -0.91791,-0.64513 -0.67746,-1.3909c0.02178,-0.14112 0.26212,-0.30242 0.56802,-0.5241z" id="svg_55"/>
                </g>
                <path stroke="null" opacity="0.4" d="m16.92429,13.34113c-1.96693,0.72568 -6.9717,3.02365 -8.39218,3.72915l0,0c1.18014,0.6853 1.72648,2.33815 1.90137,4.01118c0.02178,0.16131 0.04367,0.30242 0.06556,0.46363c0.02178,0.14112 0.04367,0.24186 0.06545,0.30242c0,0.02019 0,0.06047 0.02189,0.08055c1.28947,-3.24523 5.90069,-6.67195 6.07558,-6.934c0.08734,-0.12093 -0.10933,-0.64503 0.19667,-1.14884c0.39345,-0.64523 1.15846,-0.92746 0.06566,-0.50411z" id="svg_56"/>
                <path stroke="null" opacity="0.4" d="m21.60117,28.55974c1.00525,-1.85443 1.02713,-3.6283 1.00525,-5.70451c0,-0.8668 0.67746,-2.09639 0.32789,-1.75369c-1.31136,1.35042 -4.61132,3.89035 -6.99348,4.03137c3.34374,-0.10074 4.65499,1.45136 5.66034,3.42682z" id="svg_57"/>
                <path stroke="null" d="m6.60885,18.78349c1.24569,-0.82642 7.69283,-3.991 9.24453,-4.43454c1.55159,-0.46363 1.0708,-1.00792 1.0708,-1.00792s-6.29414,2.49946 -10.05311,4.65631" id="svg_58"/>
                <path stroke="null" opacity="0.4" d="m24.96669,12.95815c-0.50268,-0.1814 -0.89602,0.36289 -0.76491,0.88699c0.13122,0.5241 1.31136,1.10856 1.24569,3.02355c-0.04367,1.57229 -0.41523,2.21722 -0.41523,2.21722l-0.83046,-0.96744c0,0 -0.13111,-2.17704 -0.41523,-2.49956c-0.28401,-0.32251 -1.18014,-0.90708 -1.52981,-1.2094c-0.34967,-0.30242 0.39334,-0.70549 0.34967,-1.26997c-0.04367,-0.54419 0.37156,-1.63266 0.37156,-1.63266l1.98871,1.45126z" id="svg_59"/>
                <path stroke="null" opacity="0.4" d="m28.00453,21.54499c-0.04367,1.51173 0.32789,3.74924 0.48079,4.81762c0.153,1.06828 0.34967,1.14894 0,1.63276c-0.34967,0.46363 -0.80857,1.22959 -0.80857,1.22959l-1.50803,-0.12103c0,0 1.20203,-1.41099 1.26748,-1.67303c0.06556,-0.26195 -0.6119,-2.2575 -0.6119,-2.2575l1.18024,-3.6284z" id="svg_60"/>
                <path stroke="null" opacity="0.4" d="m25.09791,7.43514c0.30601,0.62474 0.67746,0.90698 1.26748,1.08847c0.34967,0.12093 1.72648,0.28224 2.27294,-0.28224c0.24034,-0.26205 0.08734,-0.96754 0.08734,-0.96754l-1.24569,0.92717l-1.68281,-0.28214l-0.19667,-0.46363l-0.50257,-0.02009z" id="svg_61"/>
                <path stroke="#000000" fill="#939393" strokeWidth="1.586" strokeLinejoin="round" strokeMiterlimit="10" d="m25.22892,8.82594c0.56823,0.3427 1.98882,0.66522 2.38216,0.72568c0.39334,0.08055 1.02713,-0.38298 1.33314,-0.50391c0.32789,-0.14112 0.89613,-0.22177 1.5517,0.32251c0.06556,0.06047 -0.153,0.32251 -0.153,0.32251c-0.02189,-0.02019 -0.153,-0.02019 -0.32789,-0.10084c-0.17478,-0.08055 -0.32779,-0.14112 -0.59001,-0.12093c-1.0928,0.12093 -1.26758,0.46363 -2.22916,0.26195s-1.20203,-0.36279 -2.14171,-0.32251" id="svg_62"/>
                <path stroke="null" fill="#939393" d="m25.03225,8.8864c0.72124,0.28224 2.11993,0.58456 2.51328,0.66522s1.02713,-0.28224 1.33314,-0.46363c0.54645,-0.32251 1.24569,-0.06047 1.57359,0.28224c0.21845,0.22167 0.30601,0.36279 0.30601,0.42326c0,0.08055 -0.26223,0 -0.26223,0c-0.153,-0.06047 -0.32789,-0.08055 -0.4589,-0.16131c-0.17489,-0.08055 -0.34978,-0.20148 -0.6119,-0.1814c-1.0928,0.12103 -1.31136,0.46363 -2.25105,0.26205c-0.93969,-0.20158 -1.18014,-0.38298 -2.18538,-0.32261" id="svg_63"/>
                <path stroke="null" d="m21.64484,27.71303c-0.04367,-0.04028 0.04367,-0.08055 0,-0.08055c-0.28401,0 -0.67746,-0.20158 -0.89613,-0.48382c-0.93969,-1.24968 -2.3166,-2.0761 -4.80799,-2.01564c-3.73719,0.08055 -5.22333,-1.33033 -5.50734,-4.03137c-0.153,-1.47145 -0.59012,-2.90262 -1.48614,-3.70896l-0.52456,0.30242c1.00525,0.80623 1.33314,2.11648 1.5517,3.91044c0.34967,2.70104 2.70995,3.95082 5.46367,3.9911c2.86295,0.04028 3.89009,0.58456 4.96089,1.91499c0.34967,0.42326 0.74312,0.56437 1.04902,0.62484l0.19689,-0.42345z" id="svg_64"/>
                <path stroke="null" opacity="0.4" d="m31.78539,14.75212c0.06556,0.30233 0.24034,0.88689 0.59001,1.16903c0.15311,0.14112 0.17489,0.1814 0.04378,0.1814c-0.13122,0 -1.0928,-0.04028 -1.0928,-0.04028l-0.26223,-0.42326l0.72124,-0.88689z" id="svg_65"/>
                </g>
              </g>
            </svg>
							<p>GSAP</p>
					</div>
					<div className="flex flex-col items-center gap-1">
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="clip0_14_398">
              <rect id="svg_1" fill="white" height="224" width="615"/>
              </clipPath>
            </defs>
            <g>
              <rect fill="none" id="canvas_background" height="42" width="42" y="-1" x="-1"/>
            </g>
            <g>
              <title>Viem</title>
              <g stroke="null" id="svg_2" clipPath="url(#clip0_14_398)">
              <path stroke="null" id="svg_3" fill="#1E1E20" d="m6.83122,27.44367l3.22861,-9.51184c0.44026,-1.33637 0.60798,-1.46739 1.50948,-1.46739l0,-0.55027l-3.27054,0l0,0.55027c0.8386,0 1.23693,0.05241 1.23693,0.60268c0,0.20963 -0.04193,0.47166 -0.16772,0.86471l-1.86588,5.81716l-2.01264,-5.89577c-0.10482,-0.36685 -0.16772,-0.62888 -0.16772,-0.81231c0,-0.52407 0.39833,-0.57648 1.11114,-0.57648l0,-0.55027l-4.67519,0l0,0.55027c0.85956,0 0.98535,0.20963 1.40465,1.36258l3.54308,9.61666l0.12579,0zm5.46415,-15.2504c0,0.89092 0.60798,1.59841 1.32079,1.59841c0.71281,0 1.29983,-0.70749 1.29983,-1.59841c0,-0.91712 -0.58702,-1.59841 -1.29983,-1.59841c-0.71281,0 -1.32079,0.68129 -1.32079,1.59841zm0.25158,5.68614l0,7.33696c0,1.28397 -0.20965,1.41499 -1.15307,1.41499l0,0.55027l4.5494,0l0,-0.55027c-0.94342,0 -1.15307,-0.13102 -1.15307,-1.41499l0,-9.30222l-3.39633,0l0,0.55027c0.94342,0 1.15307,0.13102 1.15307,1.41499zm7.52939,-1.5198c1.11114,0 1.63527,1.33637 1.69816,3.19682l-3.75273,0c0.16772,-2.09627 0.96439,-3.19682 2.05457,-3.19682zm3.7737,8.56852l-0.27254,-0.31444c-0.56605,0.94332 -1.2579,1.36258 -2.13843,1.36258c-2.0336,0 -3.45922,-2.3059 -3.45922,-5.47652c0,-0.10481 0,-0.20963 0,-0.28824l5.72344,0c0,-2.17488 -1.15307,-4.5594 -3.56405,-4.5594c-2.18036,0 -4.27686,2.59414 -4.27686,6.05299c0,3.38024 2.0336,5.73855 4.50747,5.73855c1.34176,0 2.66255,-0.86471 3.48019,-2.51553zm4.61408,1.70322c-0.94342,0 -1.15307,-0.13102 -1.15307,-1.41499l0,-6.68187c0.3564,-0.83851 0.94342,-1.38878 1.65623,-1.38878c1.09018,0 1.63527,0.89092 1.63527,2.77756l0,5.29309c0,1.28397 -0.20965,1.41499 -1.15307,1.41499l0,0.55027l4.5494,0l0,-0.55027c-0.96439,0 -1.17404,-0.13102 -1.17404,-1.41499l0,-5.73855c0,-0.26203 -0.02096,-0.55027 -0.04193,-0.7861c0.29351,-0.83851 0.92246,-1.546 1.69816,-1.546c1.11114,0 1.65623,0.89092 1.65623,2.77756l0,5.29309c0,1.28397 -0.20965,1.41499 -1.15307,1.41499l0,0.55027l4.5494,0l0,-0.55027c-0.96439,0 -1.17404,-0.13102 -1.17404,-1.41499l0,-5.73855c0,-2.09627 -0.79667,-3.8257 -2.70448,-3.8257c-1.53044,0 -2.55773,1.46739 -2.9351,2.54173c-0.29351,-1.46739 -1.09018,-2.54173 -2.59966,-2.54173c-1.40465,0 -2.39001,1.25776 -2.80931,2.3059l0,-2.04387l-3.39633,0l0,0.55027c0.94342,0 1.15307,0.13102 1.15307,1.41499l0,7.33696c0,1.28397 -0.20965,1.41499 -1.15307,1.41499l0,0.55027l4.5494,0l0,-0.55027z"/>
              </g>
            </g>
            </svg>
						<p>Viem</p>
					</div>
					<div className="flex flex-col items-center gap-1">
							<svg fill="#000000" viewBox="0 0 32 32" className="w-10 h-10">
									<path d="M 22.605469 2.972656 C 22.28125 2.972656 22.164063 2.988281 22.019531 3 C 22.011719 3 22.007813 3 22 3 C 19.125 3 18 4 18 4 C 18.007813 4.007813 18.019531 4.011719 18.027344 4.019531 C 17.886719 4.011719 17.757813 4 17.613281 3.996094 C 17.601563 3.996094 17.589844 3.996094 17.578125 3.996094 C 16.691406 3.996094 15.832031 4.136719 15.023438 4.382813 C 14.292969 3.996094 13.144531 3.527344 11.625 3.25 C 10.960938 3.097656 10.195313 2.992188 9.324219 2.992188 C 9.21875 2.992188 9.113281 2.996094 9.007813 3 C 9.003906 3 9.003906 3 9 3 C 8.976563 3 8.953125 3 8.929688 3 C 7.414063 3.054688 5.691406 3.292969 4.429688 4.671875 C 3.339844 5.859375 2.871094 7.636719 3 10.105469 C 3.050781 10.992188 3.390625 13.863281 4.101563 16.613281 C 4.808594 19.355469 6.089844 23 9 23 C 10.386719 23 12.464844 22.609375 13.992188 21.734375 C 13.996094 21.734375 14 21.730469 14 21.730469 C 14.003906 22.117188 14.003906 22.367188 14 22.984375 C 14 23.035156 14 23.089844 14.003906 23.140625 L 14.050781 23.78125 C 14.09375 24.300781 14.136719 24.84375 14.136719 25.132813 C 14.136719 27.15625 16.1875 29 18.4375 29 C 20.632813 29 23 27.3125 23 23.613281 L 23 22.042969 C 23.148438 22.039063 23.382813 22.039063 23.382813 22.039063 C 24.125 22.078125 25.101563 21.835938 25.671875 21.53125 C 26.902344 20.867188 27.574219 19.835938 26.359375 20.125 C 25.773438 20.265625 25.335938 20.304688 24.964844 20.308594 C 25.816406 19.742188 26.710938 18.753906 27.457031 17.039063 C 28.945313 13.617188 29.566406 7.628906 28.160156 5.519531 C 26.6875 3.304688 24.046875 2.972656 22.605469 2.972656 Z M 22.605469 4.972656 C 23.589844 4.972656 25.53125 5.171875 26.5 6.625 C 27.511719 8.152344 26.859375 15.3125 24.5625 17.996094 C 24.78125 17.582031 24.941406 16.96875 25 16 C 25 15.167969 24.953125 12.382813 25 12 C 25.0625 11.480469 25.019531 10.550781 25 10 C 25.015625 9.925781 25.015625 9.847656 25.015625 9.757813 C 25.015625 8.832031 24.683594 8.019531 24.25 7.324219 C 24.214844 7.257813 24.175781 7.191406 24.132813 7.125 C 24.09375 7.066406 24.058594 7.007813 24.019531 6.953125 C 23.703125 6.476563 23.296875 6.023438 22.785156 5.613281 C 22.34375 5.226563 22 5 22 5 C 22 5 22.234375 4.972656 22.605469 4.972656 Z M 9.324219 4.992188 C 10.632813 4.992188 11.640625 5.277344 12.535156 5.609375 C 12.421875 5.691406 12.304688 5.777344 12.199219 5.867188 C 11.265625 6.433594 10.707031 7.238281 10.390625 8.179688 C 10.140625 8.757813 10 9.371094 10 10 C 10 10.074219 10.011719 10.144531 10.019531 10.21875 C 10.007813 10.476563 10 10.738281 10 11 C 10 11 10 11.003906 10 11.003906 C 10 11.011719 10 11.015625 10 11.019531 C 10 11.109375 10.03125 11.265625 10.03125 11.480469 C 10.03125 12.5 10 14.710938 10 16 C 10 18.199219 12.351563 20.003906 12.964844 20.003906 C 12.976563 20.003906 12.988281 20.003906 13 20 C 11.832031 20.667969 10.082031 21 9 21 C 6.347656 21 5.085938 11.636719 5 10 C 4.769531 5.636719 6.644531 5.082031 9 5 C 9.109375 4.996094 9.21875 4.992188 9.324219 4.992188 Z M 17.578125 5.996094 C 19.332031 6.023438 20.546875 6.453125 21.375 7.046875 C 21.71875 7.328125 22.164063 7.761719 22.519531 8.304688 C 22.859375 8.910156 23 9.523438 23 10 C 21.742188 10.105469 20.695313 10.160156 20.230469 10.898438 C 19.171875 12.585938 19.964844 15.4375 20.707031 16.71875 C 20.785156 16.859375 21.652344 17.675781 22 18 C 22.125 18.117188 21.539063 18.277344 21.421875 18.402344 C 21.085938 18.75 21.089844 19.800781 21.019531 20.984375 C 21.007813 20.996094 21 21 21 21 C 21 21 21.003906 21.109375 21.011719 21.261719 C 21.007813 21.375 21 21.476563 21 21.597656 L 21 23.613281 C 21 26.125 19.601563 27 18.4375 27 C 17.199219 27 16.136719 25.988281 16.136719 25.132813 C 16.136719 24.628906 16.054688 23.769531 16 23 C 16.011719 21.222656 16 20.578125 16 20 C 16 19.441406 15 19 15 19 C 15.125 18.707031 15.53125 18.109375 15.53125 18.109375 C 15.832031 17.351563 15.992188 16.632813 16 15 C 16.003906 14.253906 15.902344 13.441406 15.691406 12.511719 C 15.402344 11.242188 14.441406 10.011719 13 10 L 12.046875 10 C 12.085938 9.59375 12.148438 9.257813 12.234375 8.972656 C 12.492188 8.382813 12.964844 7.828125 13.570313 7.359375 C 13.710938 7.277344 13.84375 7.195313 13.957031 7.085938 C 14.960938 6.433594 16.234375 5.996094 17.578125 5.996094 Z M 12.027344 12 L 12.082031 12 C 12.058594 12.027344 12.03125 12.050781 12.027344 12.078125 C 12.027344 12.054688 12.023438 12.023438 12.027344 12 Z M 23 12.007813 L 23.003906 12.007813 C 22.980469 12.382813 22.972656 13.023438 22.992188 14.933594 C 22.996094 15.378906 23 15.765625 23 16 C 23 16.085938 23.011719 16.128906 23.019531 16.203125 C 22.765625 15.964844 22.480469 15.695313 22.355469 15.566406 C 21.984375 14.851563 21.734375 13.8125 21.730469 12.984375 C 21.820313 13 21.914063 13.003906 22.011719 12.988281 C 22.585938 12.910156 23.027344 12.3125 23 12.089844 C 22.996094 12.058594 22.964844 12.039063 22.945313 12.015625 C 22.964844 12.011719 22.980469 12.007813 23 12.007813 Z M 12.027344 12.136719 C 12.035156 12.382813 12.449219 12.921875 13 13 C 13.269531 13.039063 13.503906 12.941406 13.699219 12.820313 C 13.710938 12.863281 13.730469 12.910156 13.738281 12.953125 C 13.917969 13.730469 14.003906 14.398438 14 14.992188 C 13.996094 16.261719 13.886719 16.777344 13.738281 17.1875 C 13.59375 17.414063 13.425781 17.699219 13.285156 17.96875 C 12.828125 17.648438 12 16.789063 12 16 C 12 15.320313 12.007813 14.386719 12.015625 13.507813 C 12.019531 12.96875 12.023438 12.5625 12.027344 12.136719 Z"/>
							</svg>
							<p>PostgreSQL</p>
					</div>
					<div className="flex flex-col items-center gap-1">
							<svg className="w-10 h-10" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993"></path>
									<path d="M15 12v-3"></path>
							</svg>
							<p>Next.js</p>
					</div>
					<div className="flex flex-col items-center gap-1">
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
              <g>
                <title>Ethereum</title>
                <rect x="-1" y="-1" width="10.4388" height="10.4388" id="canvas_background" fill="none"/>
              </g>

              <g>
                <g id="svg_8">
                <g id="svg_1" stroke="null">
                  <polygon fill="#343434" points="20.210355281829834,2.1096991300582886 19.97627592086792,2.930182099342346 19.97627592086792,26.738693356513977 20.210355281829834,26.97965633869171 30.92714262008667,20.447059750556946 " id="svg_2" stroke="null"/>
                  <polygon fill="#8C8C8C" points="20.210431575775146,2.1096991300582886 9.493645668029785,20.447059750556946 20.210431575775146,26.97974407672882 20.210431575775146,15.42380154132843 " id="svg_3" stroke="null"/>
                  <polygon fill="#3C3C3B" points="20.210355281829834,29.07219707965851 20.078450679779053,29.238020062446594 20.078450679779053,37.71913540363312 20.210355281829834,38.11650860309601 30.933507442474365,22.54288113117218 " id="svg_4" stroke="null"/>
                  <polygon fill="#8C8C8C" points="20.210431575775146,38.11638653278351 20.210431575775146,29.07207691669464 9.493645668029785,22.542762875556946 " id="svg_5" stroke="null"/>
                  <polygon fill="#141414" points="20.210355281829834,26.979629635810852 30.926974773406982,20.447118878364563 20.210355281829834,15.42386257648468 " id="svg_6" stroke="null"/>
                  <polygon fill="#393939" points="9.493721008300781,20.447126507759094 20.21033811569214,26.979637265205383 20.21033811569214,15.423872113227844 " id="svg_7" stroke="null"/>
                </g>
                </g>
              </g>
            </svg>
            <p>Ethereum</p>
					</div>
			</div>
	</div>
)
}

export default TechnologyStack;
```

:::tip

本文件中有关技术栈的所有 Logo 都使用 svg 格式进行展示，虽然有利于图像调整，但是整体代码略显臃肿，实际开发中也可以用 png 或 jpg 等其他格式的图片替代。

:::

```jsx title="About.jsx"
import { useRef } from "react";
import { gsap, SplitText, ScrollTrigger } from "./gsap";
import SectionTitle from "./SectionTitle";
import TechnologyStack from "./TechnologyStack";
import useLayoutEffect from "./use-isomorpphic-layout-effect"

const About = () => {
    let el = useRef(null);
    let q = gsap.utils.selector(el);

    useLayoutEffect(() => {
        document.fonts.ready.then(function () {
            const split = new SplitText(q(".about-text"), {type:"lines,words", linesClass:"split-line"});

            const anim = gsap.from(split.lines,  {
                duration: 0.6,
                autoAlpha: 0,
                translateY: '100%',
                ease: 'circ.out',
                stagger: 0.05,
                paused: true
            });
    
            ScrollTrigger.create({
                trigger: '.about-text',
                start: 'top 80%',
                onEnter: () => anim.play(),
            }); 
        });
    }, [])

    return (
        <div ref={el} id="about" className="pb-40 w-full relative px-[10vw] 2xl:px-[12.5vw] bg-slate-100">
            <SectionTitle title="关于本项目"/>
            <p className="about-text text-neutral-900 text-[clamp(1.4rem,2vw,1.75rem)] text-center font-silka leading-[1.8] will-change-transform">这里用于撰写项目的基本简介。</p>
            <TechnologyStack />
        </div>
    )
}

export default About;
```

```jsx title="ImageCarousel.jsx"
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'

const ImageCarousel = ({images}) => {
	const [emblaRef] = useEmblaCarousel({loop: true}, [Autoplay({delay: 10000, stopOnInteraction: false, stopOnMouseEnter: true})]);

	return (
		<div className='embla overflow-hidden' ref={emblaRef}>
			<div className='embla__container flex'>
				{images.map((e, i) => 
					<div key={i} className="relative flex-[0_0_100%]">
						<img src={e} alt="Project Image" className="rounded max-h-[300px] mx-auto xl:max-h-[320px] xl:mx-0 xl:ml-auto"></img>
					</div>
            	)}
			</div>
		</div>
	);
};

export default ImageCarousel;
```

```jsx title="Feature.jsx"
import { useRef } from 'react';
import { gsap } from './gsap';
import ImageCarousel from './ImageCarousel';
import useLayoutEffect from './use-isomorpphic-layout-effect';

const Feature = ({ name, desc, stack, links, images }) => {
	const el = useRef(null);
	const image = useRef(null);

	useLayoutEffect(() => {
		gsap.fromTo(
			el.current,
			{ opacity: 0, translateX: '-40px' },
			{
				opacity: 1,
				duration: 1,
				ease: 'power2.out',
				translateX: 0,
				scrollTrigger: {
					trigger: el.current,
					start: 'top 83%',
					end: 'top 83%',
				},
			}
		);
		gsap.fromTo(
			image.current,
			{ opacity: 0 },
			{
				opacity: 1,
				duration: 1,
				scrollTrigger: {
					trigger: el.current,
					start: 'top 83%',
					end: 'top 83%',
				},
			}
		);
	}, []);

	return (
		<div className='grid place-items-center gap-y-2 font-silka xl:grid-cols-2 xl:place-items-start xl:gap-x-10 xl:gap-y-0'>
			<div ref={el}>
				<div className='text-center xl:text-left'>
					<h3 className='text-2xl font-[600] xl:text-3xl'>{name}</h3>
					<p className='mt-6 text-[18px] xl:mt-8'>{desc}</p>
				</div>
				<div className='mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[15px] xl:mt-8 xl:justify-start'>
					{stack.map((e, i) => (
						<p key={i}>{e}</p>
					))}
				</div>
				<div className='mt-4 mb-4 flex justify-center gap-x-6 xl:mt-6 xl:mb-0 xl:justify-start'>
					{links[0][1] === null ? null : (
						<a
							href={links[0][1]}
							target='_blank'
							rel='noopener noreferrer'
							aria-label='GitHub Repo'
							className='group p-2'>
							<svg
								className='h-8 w-8 transition group-hover:-translate-y-1 group-hover:stroke-blue-600'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<path
									stroke='none'
									d='M0 0h24v24H0z'
									fill='none'></path>
								<path d='M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5'></path>
							</svg>
						</a>
					)}
					{links[1][1] === null ? null : (
						<a
							href={links[1][1]}
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Project Site'
							className='group p-2'>
							<svg
								className='h-8 w-8 transition group-hover:-translate-y-1 group-hover:stroke-blue-600'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<path
									stroke='none'
									d='M0 0h24v24H0z'
									fill='none'></path>
								<path d='M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5'></path>
								<line x1='10' y1='14' x2='20' y2='4'></line>
								<polyline points='15 4 20 4 20 9'></polyline>
							</svg>
						</a>
					)}
				</div>
			</div>
			<div ref={image} className='xl:ml-auto'>
				<ImageCarousel images={images} />
			</div>
		</div>
	);
};

export default Feature;
```

```jsx title="Features.jsx"
import Project from './Feature';
import SectionTitle from './SectionTitle';

const Features = () => {
	return (
		<div
			id='projects'
			className='relative w-full bg-neutral-100 px-[10vw] pb-36 2xl:px-[12.5vw]'>
			<SectionTitle title='项目特色' />
			<div className='flex flex-col gap-[70px] xl:gap-[90px]'>
				<Project
					name='特色1'
					desc='特色1的描述'
					stack={['技术栈']}
					links={[
						['github', 'https://github.com/iCatGame'],
						['external', 'https://github.com/iCatGame'],
					]}
                    images={['/images/doc.png','/images/doc.png','/images/doc.png']}
				/>
				<div className='my-3 h-[1px] w-full bg-neutral-300'></div>
                <Project
                    name='特色2'
                    desc='特色2的描述'
                    stack={['技术栈']}
                    links={[
                        ['github', 'https://github.com/iCatGame'],
                        ['external', 'https://github.com/iCatGame'],
                    ]}
                    images={['/images/doc.png','/images/doc.png']}
                    />
                <div className='my-3 h-[1px] w-full bg-neutral-300'></div>
                <Project
                    name='特色3'
                    desc='特色3 的描述'
                    stack={['技术栈']}
                    links={[
                        ['github','https://github.com/iCatGame'],
                        ['external', 'https://github.com/iCatGame'],
                    ]}
                    images={['/images/doc.png','/images/doc.png','/images/doc.png']}
                />
                <div className='my-3 h-[1px] w-full bg-neutral-300'></div>
				<Project
					name='特色4'
					desc='特色4的描述'
					stack={[
						'技术栈',
					]}
					links={[
						[
							'github',
							'https://github.com/iCatGame',
						],
						['external', 'https://github.com/iCatGame'],
					]}
                    images={['/images/doc.png','/images/doc.png']}
				/>
			</div>
		</div>
	);
};

export default Features;
```

```jsx title="Navbar.jsx"
import { useRef, useState } from "react";
import { gsap } from "./gsap";
import useLayoutEffect from "./use-isomorpphic-layout-effect";

const NavBar = ({scrollTo, scrollPaused}) => {
    const [open, setOpen] = useState(false);
    let el = useRef(null);
    let q = gsap.utils.selector(el);
    const tl = useRef(gsap.timeline().reverse(1));
    const tl2 = useRef(gsap.timeline());

    useLayoutEffect(() => {
        tl2.current.fromTo(el.current, {autoAlpha: 0, translateY: 100}, {autoAlpha: 1, translateY: 0, duration: 1.5, ease: "power3.out"}, 2.2);

        tl.current.to(q('.nav-side'), {translateX: 0, duration: 0.5, ease: "power2.inOut"}, 0);
        tl.current.to(q('.nav-round'), {scaleX: 0, duration: 0.5, ease: "power2.inOut"}, 0);
        tl.current.to(q('.nav-bg'), {autoAlpha: 0.2, duration: 0.5, ease: "power2.inOut", pointerEvents: 'auto'}, 0);
        tl.current.to(q('.nav-links'), {autoAlpha: 1, duration: 0.4, ease: "power2.inOut"}, 0.1);
    }, [])

    const toggleNav = () => {
        if (tl.current.reversed()) {
            tl.current.play();
            scrollPaused(true);
            setOpen(true);
        } else {
            tl.current.reverse();
            scrollPaused(false);
            setOpen(false);
        }
    }

    const goTo = (id) => {
        scrollTo(id);
        scrollPaused(false);
        tl.current.reverse();
        setOpen(false);
    }

    return (
        <div ref={el} className="fixed top-0 left-0 w-full">
            <div className="nav-bg fixed top-0 left-0 bg-neutral-900 w-full h-screen opacity-0 pointer-events-none"></div>
            <div className="fixed right-0 top-0 w-full md:w-[500px] h-screen pointer-events-none overflow-y-scroll">
                <div className="nav-side bg-neutral-900 w-full h-full translate-x-[140%] relative pointer-events-auto">
                    <div className="nav-round absolute left-0 -translate-x-1/2 h-[110vh] translate-y-[-5vh] rounded-[100%/100%] w-[80%] bg-neutral-900 top-0"></div>
                    <div className="nav-links font-silka text-neutral-100 opacity-0">
                        <div className="text-[clamp(2.5rem,10vw,3.75rem)] absolute top-[45%] -translate-y-1/2 pl-8 lg:pl-10 w-full">
                            <div className="group flex items-center py-[calc(2vh+5px)] cursor-pointer w-full" onClick={() => goTo('#about')}>
                                <div className="w-2 h-2 rounded-full scale-0 group-hover:scale-100 bg-neutral-100 transition"></div>
                                <p className={`group-hover:translate-x-[20px] transition ${open ? '' : 'translate-x-[40px] duration-300'}`}>关于本项目</p>
                            </div>
                            <div className="group flex items-center py-[calc(2vh+5px)] cursor-pointer w-full" onClick={() => goTo('#projects')}>
                                <div className="w-2 h-2 rounded-full scale-0 group-hover:scale-100 bg-neutral-100 transition"></div>
                                <p className={`group-hover:translate-x-[20px] transition ${open ? '' : 'translate-x-[20px] duration-300'}`}>项目特色</p>
                            </div>
                        </div>   
                        <div className="absolute bottom-20 lg:bottom-12 px-[5vw] lg:px-8 flex">
                            <a href="https://github.com/iCatGame" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <div className={`group p-6 w-fit cursor-pointer transition ${open ? '' : 'translate-x-[20px] duration-300'}`}>
                                    <p className="transition group-hover:-translate-y-1 group-hover:text-white">GitHub</p>
                                    <div className="h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition duration-200 origin-center"></div>
                                </div>
                            </a>
                            <a href="https://game-tutorial-beta.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Doc">
                                <div className={`group p-6 w-fit cursor-pointer transition ${open ? '' : 'translate-x-[40px] duration-300'}`}>
                                    <p className="transition group-hover:-translate-y-1 group-hover:text-white">开发文档</p>
                                    <div className="h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition duration-200 origin-center"></div>
                                </div>
                            </a>
                            <a href="mailto:20281128@bjtu.edu.cn" aria-label="Email">
                                <div className={`group p-6 w-fit cursor-pointer transition ${open ? '' : 'translate-x-[80px] duration-300'}`}>
                                    <p className="transition group-hover:-translate-y-1 group-hover:text-white">Email</p>
                                    <div className="h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition duration-200 origin-center"></div>
                                </div>
                            </a>
                        </div>   
                    </div>
                </div>  
            </div>
            <div className="w-[100vw] fixed top-0 left-0 flex items-start pt-10 px-[5vw] justify-between pointer-events-none">
                <p className="bg-neutral-900 text-neutral-100 px-2 py-1 rounded cursor-pointer transition duration-300 hover:bg-neutral-800 font-silka font-[600] tracking-wide pointer-events-auto" onClick={() => goTo('#home')}>iCat区块链游戏</p>
                <div className={`w-16 h-16 bg-neutral-900 rounded relative cursor-pointer grid place-items-center transition duration-300 pointer-events-auto ${open ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-neutral-800'}`} onClick={() => toggleNav()}>
                    <div className={`w-8 h-1 bg-neutral-100 rounded-full absolute [transition:transform_0.5s_cubic-bezier(0.3,1.3,0.6,1)] ${open ? 'rotate-[225deg]' : '-translate-y-[125%]'}`}></div>
                    <div className={`w-8 h-1 bg-neutral-100 rounded-full absolute [transition:transform_0.5s_cubic-bezier(0.3,1.3,0.6,1)] ${open ? 'rotate-[135deg]' : 'translate-y-[125%]'}`}></div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;
```

```jsx title="Footer.jsx"
import { useRef } from "react";
import { gsap } from "./gsap";
import useLayoutEffect from "./use-isomorpphic-layout-effect"

const Footer = () => {
    let el = useRef(null);
    let q = gsap.utils.selector(el);
    const tl = useRef(gsap.timeline())

    useLayoutEffect(() => {
        tl.current.to(q('.footer-round'), {scaleY: 0, scrollTrigger: {trigger: el.current, scrub:0.5, start: "-10% bottom", end: "bottom bottom"}}, 0)
    }, [])

    return (
        <div ref={el} className="w-full h-[250px] bg-transparent px-[5vw] relative overflow-x-clip bg-gray-800">
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <a href="https://github.com/iCat/frontend" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group" data-lag="0.3">
                    <div className="w-[100px] h-[100px] bg-neutral-900 rounded grid place-items-center group-hover:translate-y-[-6px] group-hover:bg-blue-600 transition">
                        <svg className="w-[50px] h-[50px] stroke-neutral-100 transition group-hover:translate-y-[-3px] group-hover:scale-105" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                        </svg>
                    </div>
                </a>
                <a href="https://game-tutorial-beta.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Doc" className="group mx-[5vw]" data-lag="0.5">
                    <div className="w-[100px] h-[100px] bg-neutral-900 rounded grid place-items-center group-hover:translate-y-[-6px] group-hover:bg-blue-600 transition">
                        <svg className="w-[50px] h-[50px] stroke-neutral-100 transition group-hover:translate-y-[-3px] group-hover:scale-105" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                            <line x1="8" y1="11" x2="8" y2="16"></line>
                            <line x1="8" y1="8" x2="8" y2="8.01"></line>
                            <line x1="12" y1="16" x2="12" y2="11"></line>
                            <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
                        </svg>
                    </div>
                </a>
                <a href="mailto:20281128@bjtu,edu.cn" aria-label="Email"  className="group" data-lag="0.7">
                    <div className="w-[100px] h-[100px] bg-neutral-900 rounded grid place-items-center group-hover:translate-y-[-6px] group-hover:bg-blue-600 transition">
                        <svg className="w-[50px] h-[50px] stroke-neutral-100 transition group-hover:translate-y-[-3px] group-hover:scale-105" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                            <polyline points="3 7 12 13 21 7"></polyline>
                        </svg>
                    </div>
                </a>
            </div>
            <div className="footer-round absolute bg-slate-100 w-[120vw] h-[300px] rounded-[100%/100%] top-0 -translate-y-1/2 left-0 -translate-x-[10vw] [clip-path:polygon(0%_45%,100%_45%,100%_100%,0%_100%)]"></div>
        </div>
    )
}

export default Footer;
```

分别编写好上述文件并保存之后，重新运行项目，这时就能看到一个完整漂亮的着陆页啦！

从下一小节开始，我们将开始正式学习如何编写功能页面。