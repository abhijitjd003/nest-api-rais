
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService } from 'src/common/services/logger.service';
import { User, UserSchema } from 'src/portico-market-match/entities/user.entity';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';


@Module({
  imports: [
    NestMailerModule.forRoot({
      transport: {
        host: 'internalsmtp.renaissanceins.com',
        port: 25,
        ignoreTLS: true,
        secure: false,
        tls: {
          rejectUnauthorized: false
        }
      },
      template: {
        dir: __dirname + '/../../mailer/template/',
        adapter: new HandlebarsAdapter(),
      },
    }),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema, collection: 'users' }],
      'appdb',
    ),

  ],
  exports: [MailerService],
  controllers: [MailerController],
  providers: [
    LoggerService,
    MailerService
  ],
})
export class MailerModule { }
