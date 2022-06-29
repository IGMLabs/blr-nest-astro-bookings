import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Express specific
  app.enableCors();

  const PORT = 3000;
  await app.listen(PORT);
}
bootstrap();
