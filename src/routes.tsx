import { Home } from "./pages/home";

export const routes: Record<string, () => JSX.Element> = {
    "/": () => <Home />,
};
