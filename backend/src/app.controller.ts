import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    root() {
        return { message: 'API funcionando! Acesse /docs para a documentação.' };
    }
}
