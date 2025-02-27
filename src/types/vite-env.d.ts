interface ImportMetaEnv {
  readonly VITE_WEBSOCKET_URL: string;
  readonly VITE_APP_URL: string;
 
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}