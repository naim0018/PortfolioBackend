"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../../modules/Auth/auth.route");
const portfolio_route_1 = require("../../modules/Portfolio/portfolio.route");
const templatePortfolio_route_1 = require("../../modules/TemplatePortfolio/templatePortfolio.route");
const user_route_1 = require("../../modules/User/user.route");
const router = (0, express_1.Router)();
const moduleRoute = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
    {
        path: '/portfolio',
        route: portfolio_route_1.PortfolioRoutes,
    },
    {
        path: '/template-portfolio',
        route: templatePortfolio_route_1.TemplateRoutes,
    },
    {
        path: '/user',
        route: user_route_1.UserRoute,
    },
];
moduleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
//# sourceMappingURL=router.js.map