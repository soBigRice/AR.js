/*
 * @Author: MrRice wangwei@jlkj.net
 * @Date: 2024-05-13 17:05:08
 * @LastEditors: MrRice 1246333567@qq.com
 * @LastEditTime: 2024-11-12 11:58:46
 * @FilePath: /AR.js/vite.config.ts
 * @Description: 小舟从此逝，江海寄余生
 *
 * Copyright (c) 2024 by MrRice , All Rights Reserved.
 */
//@ts-nocheck
import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";

// 获取目录下的文件名
function getFilesInDirectory(dir) {
  return fs.readdirSync(dir);
}
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      host: "0.0.0.0",
      cors: true,
    },
    base: "./",
    resolve: {
      alias: {
        jsartoolkit: "@ar-js-org/artoolkit5-js",
      },
    },
    build: {
      lib: {
        entry: resolve(__dirname, "three.js/src/index-threex.js"), //入口文件
        name: "THREEXAR",
        fileName: "THREEXAR", //
        formats: ["umd", "es", "iife"], //打包的模式
      },
      rollupOptions: {
        output: {
          dir: "./dist", //打包后输出的文件夹目录
          // entryFileNames: 'THREEXAR.js',//生成的文件的名字（仅限于生成单文件）
          banner: `
            /**
             * build time:${new Date().toLocaleString()}
            */
           `, //你要在打包的文件里额外写入的内容
        },
        external: ["three"], //打包时排除依赖包
      },
      sourcemap: mode === "development",
      minify: mode === "production",
    },
  };
});
