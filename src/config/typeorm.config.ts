import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// import * as config from 'config';

// const dbConfig: any = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '100.25.132.243',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
