import { Module } from '@nestjs/common';
import { ModelsModule } from 'src/main/resources/models/models.module'

@Module({
    imports: [ModelsModule ],

})
export class PostModule {}
