# Bootx-Platform-Vue3

<p>
 <img src='https://gitee.com/bootx/bootx-platform/badge/star.svg?theme=dark' alt='star'/>
 <img src="https://img.shields.io/badge/Author-Bootx-orange.svg" alt="Build Status">
 <img src="https://img.shields.io/badge/Vue-3.x-blue.svg" alt="Downloads">
 <img src="https://img.shields.io/badge/license-Apache%20License%202.0-green.svg"/>
</p>

## 🍈 项目介绍

基于Spring Boot框架打造，针对单体式应用进行专门设计，提供整套服务模块，努力为打造全方位企业级开发解决方案，
致力将开源版打造成超越商业版后台管理框架的项目。前端分为vue2版和vue3版，vue2使用 [ANTD PRO VUE](https://pro.antdv.com/) 作为脚手架，vue3使用 [Vben-Admin-Next](https://vvbin.cn/doc-next/) 作为脚手架。
移动端使用 [Taro](https://taro.jd.com/) vue3+TS为技术栈。越商业版后台管理框架的项目。

## 前端项目

> 基于 Vben-Admin-Next 前端脚手架

演示地址: [地址](http://v3.platform.bootx.cn/)

使用Vue3 + Vite + TS进行构建开发

## 常见问题
出现以下错误不用管，不影响使用，只在第一次启动时出现，之后就不会再出现
```shell
 ERROR  Error: The following dependencies are imported but could not be resolved:                                                                                         10:06:39

  @vue-macros/reactivity-transform/macros (imported by C:/bootx/dax-pay-ui/src/components/Bootx/SuperQuery/SuperQueryItem.vue?id=0)

Are they installed?
    at file:///C:/bootx/dax-pay-ui/node_modules/.pnpm/vite@4.3.5_jmirrwlmbumocpj2mhzxorzq7e/node_modules/vite/dist/node/chunks/dep-934dbc7c.js:44152:23
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async file:///C:/bootx/dax-pay-ui/node_modules/.pnpm/vite@4.3.5_jmirrwlmbumocpj2mhzxorzq7e/node_modules/vite/dist/node/chunks/dep-934dbc7c.js:43561:38

```
