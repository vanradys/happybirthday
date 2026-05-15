declare module "vite" {
  export function defineConfig(config: any): any;
  export interface Plugin {}
  export interface UserConfig {
    [key: string]: any;
  }
}

declare module "@vitejs/plugin-react" {
  const react: any;
  export default react;
}

declare module "@tailwindcss/vite" {
  const plugin: any;
  export default plugin;
}

declare module "@replit/vite-plugin-runtime-error-modal" {
  const plugin: any;
  export default plugin;
}

declare module "@replit/vite-plugin-cartographer" {
  export function cartographer(config: any): any;
}

declare module "@replit/vite-plugin-dev-banner" {
  export function devBanner(): any;
}

declare module "vite/client";

declare module "path" {
  const path: any;
  export default path;
}

declare module "url" {
  export function fileURLToPath(url: string): string;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV?: string;
    PORT?: string;
    REPL_ID?: string;
    BASE_PATH?: string;
    [key: string]: string | undefined;
  }
  export interface Process {
    env: ProcessEnv;
  }
}

declare const process: NodeJS.Process;
