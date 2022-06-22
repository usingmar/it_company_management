import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'MamaPapaDimas3452',
    database: 'myDb',
    autoLoadEntities: true
}