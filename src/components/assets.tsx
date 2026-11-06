import { readFileSync } from 'node:fs';

const entry = 'src/client.ts';
let css: string[] | undefined;

export function Assets() { 
    if (import.meta.env.DEV) { // enables stylesheets hmr
        return <script type="module" src={`/${entry}`}></script>;
    }
    css ??= JSON.parse(readFileSync('dist/.vite/manifest.json', 'utf-8'))[entry].css;
    return <>{css?.map(href => <link rel="stylesheet" href={`/${href}`} />)}</>;
}
