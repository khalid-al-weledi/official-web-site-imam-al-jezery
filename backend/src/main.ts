import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // تفعيل CORS ل السماح للواجهة الأمامية بالاتصال بالخادم
  app.enableCors();

  // تعيين بادئة موحدة لجميع مسارات API (مثال: /api/v1)
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 خادم المقرأة يعمل بنجاح على المنفذ: ${port}`);
}
bootstrap();
