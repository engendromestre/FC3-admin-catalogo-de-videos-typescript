import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { applyGlobalConfig } from '../../global-config';
import { Sequelize } from 'sequelize';
import { getConnectionToken } from '@nestjs/sequelize';

export function startApp() {
  //private property _
  let _app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const sequelize = moduleFixture.get<Sequelize>(getConnectionToken());

    await sequelize.sync({ force: true });

    _app = moduleFixture.createNestApplication();
    applyGlobalConfig(_app);
    await _app.init();
  });

  afterEach(async () => {
    // evitar memory leak
    // ? option chaining - se app retornar undefined a função close não é chamada, evitando um erro
    await _app?.close();
  });

  return {
    get app() {
      return _app;
    },
  };
}
