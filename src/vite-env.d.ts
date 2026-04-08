/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_BACKEND: string;
  readonly VITE_APP_STATIC_PREFIX: string;
  readonly VITE_APP_UPLOAD_LIMIT_FILE_SIZE: number;
  readonly VITE_APP_SSO_ISSUER: string;
  readonly VITE_APP_SSO_CLIENT_ID: string;
  readonly VITE_APP_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_APP_FIREBASE_APP_ID: string;
  readonly VITE_APP_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_APP_FIREBASE_PROJECT_ID: string;
  readonly VITE_APP_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_APP_FIREBASE_API_KEY: string;
  readonly VITE_APP_VAPIKEY: string;
  readonly VITE_APP_LOCAL?: string;
  readonly VITE_APP_BACKEND_IDENTITY: string;
  readonly VITE_APP_TENANT_HOST_PATTERN: string;
  readonly VITE_APP_SECURE_LOCAL_STORAGE_HASH_KEY: string;
  readonly VITE_APP_SECURE_LOCAL_STORAGE_IV_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
