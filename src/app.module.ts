import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/public/user.module';
import { VerificationLevelRulesModule } from './workshop-step-ready/compliance/public/verification-level-rules.module';
import { SomeOtherModule } from './workshop-step-ready/some-other-module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    EventEmitterModule.forRoot(),
    VerificationLevelRulesModule,
  ],
  controllers: [AppController],
  providers: [AppService, SomeOtherModule],
})
export class AppModule {}
