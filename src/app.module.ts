import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'; // ✅ הוספה חשובה
import { config } from './configs/config';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
    MongooseModule.forRoot(config.dbUri), // ✅ זה מאפשר ל-Nest לחבר את המודלים
    UsersModule,
  ],
})
export class AppModule {}
