// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';

const isDev = process.env.NODE_ENV === 'development';

const isDeployPreview =
  !!process.env.NETLIFY && process.env.CONTEXT === 'deploy-preview';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '基于AIGC的区块链游戏',
  tagline: '教程文档',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://game-tutorial-bcgame.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'en'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      }
    }
  },

  // plugins: ['@docusaurus/theme-search-algolia'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/iCatGame/tutorial/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/iCatGame/tutorial/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      algolia: {
        appId: 'WDCFZSI80M',
        apiKey: '45663b30a113579d60c5281e29f2a05b',
        indexName: 'game-tutorial-beta',
        // 确保搜索结果与当前语言相关
        contextualSearch: true,
        replaceSearchResultPathname:
          isDev || isDeployPreview
            ? {
                from: /^\/docs\/next/g,
                to: '/docs',
              }
            : undefined,
      },
      navbar: {
        title: '区块链游戏',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '教程',
          },
          {to: '/blog', label: '博客', position: 'left'},
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                type: 'html',
                value: '<hr style="margin: 0.3rem 0;">',
              },
              {
                href: 'https://github.com/BlockchainGameWithAIGC/tutorial/tree/main/i18n',
                label: '翻译为其他语言',
              },
            ],
          },
          {
            href: 'https://github.com/BlockchainGameWithAIGC/tutorial',
            // label: 'GitHub',
            'aria-label': 'Github repository',
            className: 'header-github-link',
            position: 'right',
          },
        ].filter(Boolean),
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '教程',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'github discussion',
                href: 'https://github.com/iCatGame/tutorial/discussions',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '博客',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/BlockchainGameWithAIGC/tutorial',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} iCat, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["solidity", "json", "shell-session"],
      },
    }),
};

module.exports = config;
