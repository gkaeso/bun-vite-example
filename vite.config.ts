import { defineConfig, type Plugin, type ViteDevServer } from "vite";

/*
 * Dev only: renders the shared routes through Vite and reloads the browser
 * when a server-rendered module changes (CSS is hot-swapped by the client entry).
 */
const ssr = (): Plugin => {
    let server: ViteDevServer;
    return {
        name: 'ssr',
        configureServer(s) {
            server = s;
            s.middlewares.use(async (req, res, next) => {
                try {
                    const { routes } = await s.ssrLoadModule('/src/routes.tsx');
                    const route = routes[new URL(req.url ?? '/', 'http://localhost').pathname];
                    if (req.method !== 'GET' || !route) {
                        return next();
                    }
                    const html = await s.transformIndexHtml(req.url!, String(await route()));
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                        .end(html);
                } catch (e) {
                    s.ssrFixStacktrace(e as Error);
                    next(e);
                }
            });
        },
        hotUpdate({ file }) {
            if (this.environment.name === 'ssr' && /\.tsx?$/.test(file)) {
                server.environments.client.hot.send({ type: 'full-reload' });
            }
        },
    };
};

export default defineConfig({
    appType: 'custom',
    build: {
        manifest: true,
        rollupOptions: { input: 'src/client.ts' },
    },
    esbuild: {
        jsx: 'automatic',
        jsxImportSource: '@kitajs/html',
    },
    plugins: [
        ssr(),
    ],
});
