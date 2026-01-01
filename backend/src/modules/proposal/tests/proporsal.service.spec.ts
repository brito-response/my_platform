import { Test, TestingModule } from '@nestjs/testing';
import { ProporsalService } from '../proposal.service';

describe('ProporsalService', () => {
  let service: ProporsalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProporsalService],
    }).compile();

    service = module.get<ProporsalService>(ProporsalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
