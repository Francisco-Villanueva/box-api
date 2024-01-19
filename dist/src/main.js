"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const envCheck_1 = require("../config/envCheck");
const morgan = require("morgan");
const constants_1 = require("./constants");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    await (0, envCheck_1.checkEnvVariables)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors(constants_1.CORS);
    app.use(morgan('tiny'));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Co-Workers Box')
        .setDescription('The Co-Workers Box API - Endpoints & Description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map