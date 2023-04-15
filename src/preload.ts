// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

try {
  console.log("preload.ts can access __dirname:", __dirname);
} catch (error) {
  console.error("preload.ts cannot access __dirname:", error);
}

import { contextBridge } from "electron";
import child_process from "child_process";
import path from "path";
console.log("preload.ts can import node modules:", { child_process, path }});

const preloadStuff = {
  child_process,
  join: path.join,
} as const;

contextBridge.exposeInMainWorld("fromPreload", preloadStuff);

declare global {
  interface Window {
    fromPreload: typeof preloadStuff;
  }
}
