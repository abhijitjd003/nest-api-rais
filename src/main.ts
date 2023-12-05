import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';

const whitelistUrls = ['renaissanceins.com', 'http://localhost', 'postman.co'];
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(bodyParser.json({ limit: '60mb' }));
    app.use(bodyParser.urlencoded({ limit: '60mb', extended: true }));
    const configService = app.get(ConfigService);
    if (configService.get<string>('swagger.auth.env') !== "production") {
        const config = new DocumentBuilder().addBearerAuth()
            .setTitle('Membercentral Mean')
            .setDescription('NestJs API documnetation')
            .setVersion('1.0')
            .build();
        const apiUser = configService.get<string>('swagger.auth.user', 'apiuser');
        const apiPass = configService.get<string>('swagger.auth.secret', 'apipass');
        app.use('/swagger-docs', basicAuth({
            challenge: true,
            users: { [apiUser]: apiPass },
        }));
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('swagger-docs', app, document);
    }
    const options = {
        origin: function (origin, callback) {
            let found = !origin || whitelistUrls.some(whitelist => origin.includes(whitelist));
            if (found) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
    };
    app.enableCors(options);
    const port = process.env.PORT || configService.get<number>('http.port', 3000);
    await app.listen(port);
    Logger.log('Application started on port: ' + port);
}
bootstrap();
