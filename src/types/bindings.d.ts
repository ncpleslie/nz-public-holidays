export interface Bindings {
  DATABASE_PROXY_URL: string;
  NODE_ENV: string;
}

declare global {
  function getMiniflareBindings(): Bindings;
}
