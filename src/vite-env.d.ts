/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Centre de beauté 3F — clé gratuite https://web3forms.com pour recevoir les RDV par e-mail */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
