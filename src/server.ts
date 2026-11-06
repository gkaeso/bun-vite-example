// Production server (run after `bun run build`). Any runtime can replace it:
// it only needs to call `routes[path]()` and serve the files in dist/.
import { resolve, sep } from 'node:path';
import { routes } from './routes';

const dist = resolve('dist');

const server = Bun.serve({
    port: Number(process.env.PORT ?? 3000),
    async fetch(req) {
        const { pathname } = new URL(req.url);
        const route = routes[pathname];
        if (req.method === 'GET' && route) {
            return new Response(String(await route()), {
                headers: { 'Content-Type': 'text/html; charset=utf-8' },
            });
        }
        const file = resolve(dist, `.${pathname}`);
        if (file.startsWith(dist + sep) && !file.includes(`${sep}.`)) {
            const asset = Bun.file(file);
            if (await asset.exists()) {
                return new Response(asset);
            }
        }
        return new Response('Not Found', { status: 404 });
    },
});

console.log(`Listening on ${server.url}`);
