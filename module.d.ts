declare module '*.vue' {
  import type {DefineComponent} from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.json';

declare module '*.module.css';
declare module '*.css';

declare module '*.gif';
declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
