import Router from "./router/Router";

import { HomePage } from "./pages/HomePage/HomePage";

const router = new Router([
    { path: '/', component: HomePage },
    // { path: '/login', component: LoginPage }
])

router.init();