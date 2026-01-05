import { Test, TestingModule } from '@nestjs/testing';
import { JobfrellasController } from './jobfrellas.controller';
import { JobfrellasService } from './jobfrellas.service';

describe('JobfrellasController', () => {
  let controller: JobfrellasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobfrellasController],
      providers: [JobfrellasService],
    }).compile();

    controller = module.get<JobfrellasController>(JobfrellasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
