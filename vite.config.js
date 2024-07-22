import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'process.env.REACT_APP_SERVICE_ID': JSON.stringify(
        env.REACT_APP_SERVICE_ID,
      ),
      'process.env.REACT_APP_TEMPLATE_ID': JSON.stringify(
        env.REACT_APP_TEMPLATE_ID,
      ),
      'process.env.REACT_APP_PUBLIC_KEY': JSON.stringify(
        env.REACT_APP_PUBLIC_KEY,
      ),
    },
    // server: {
    //   host: true,
    // }
  };
});
