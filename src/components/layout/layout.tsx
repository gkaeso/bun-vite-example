import { Assets } from '../assets';
import type { PropsWithChildren } from '@kitajs/html';

type LayoutProps = PropsWithChildren & {
    mainContent: JSX.Element;
}

export function Layout({ mainContent }: LayoutProps) {
    return (<>
        {"<!DOCTYPE html>"}
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <Assets />
                <title>App</title>
            </head>
            <body>
                <header>
                    <h1>Home</h1>
                </header>
                <main>
                    {mainContent}
                </main>
                <footer>
                    <p>Footer</p>
                </footer>
            </body>
        </html>
    </>)
}
