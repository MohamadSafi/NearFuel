import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SponsorModule } from './sponsor/sponsor.module';
import { UserModule } from './user/user.module';
import { NearService } from './near/near.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SponsorModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, NearService],
})
export class AppModule {}
