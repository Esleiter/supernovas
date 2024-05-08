import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

type FirebaseEnv = {
  [key: string]: string | undefined;
}

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const env: FirebaseEnv = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  const newEnv = (env: FirebaseEnv) => {
    return Object.keys(env).reduce((prev, key) => {
      prev[`process.env.${key}`] = JSON.stringify(env[key]);
      return prev;
    }, {} as { [key: string]: string });  
  }

  return defineConfig({
    plugins: [react()],
    define: {
      ...newEnv(env),
    }
  })
}
