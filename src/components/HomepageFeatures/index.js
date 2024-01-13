import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '全栈开发',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        本教程提供包括前端、后端、智能合约的全栈开发教程，帮助 Web2 开发人员快速上手 Dapp 开发。
      </>
    ),
  },
  {
    title: '结合 AIGC 技术',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        本教结合今天火热的 AIGC 技术，使用 Midjourney 为区块链开发人员提供快速上手游戏人物形象创造。
      </>
    ),
  },
  {
    title: '使用全新技术栈',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        本教程基于最新最先进的 Wagmi/Viem 以及 RainbowKit 等技术栈，给开发人员提供更优的开发体验，给用户带来更加流畅的游戏体验。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
