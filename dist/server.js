"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
let server;
async function main() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose_1.default.connect(config_1.default.db);
        console.log('✅ Database connected successfully');
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`🚀 Server is running at http://localhost:${config_1.default.port}`);
        });
    }
    catch (error) {
        console.error('❌ Database connection failed!');
        if (error.message.includes('authentication failed')) {
            console.error('🔑 AUTHENTICATION ERROR: Please check your MongoDB credentials in .env');
        }
        else {
            console.error('Error details:', error.message);
        }
        process.exit(1);
    }
}
main();
process.on('unhandledRejection', (err) => {
    console.log('Unhandled Rejection, shutting down the server ', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('uncaughtRejection', () => {
    console.log('Uncaught Rejection, shutting down the server');
    process.exit(1);
});
//# sourceMappingURL=server.js.map