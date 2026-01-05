import { Test, TestingModule } from '@nestjs/testing';
import { JobfrellasService } from './jobfrellas.service';

describe('JobfrellasService', () => {
  let service: JobfrellasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobfrellasService],
    }).compile();

    service = module.get<JobfrellasService>(JobfrellasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
