import { Test, TestingModule } from '@nestjs/testing';
import { ProporsalController } from '../proposal.controller';
import { ProporsalService } from '../proposal.service';

describe('ProporsalController', () => {
  let controller: ProporsalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProporsalController],
      providers: [ProporsalService],
    }).compile();

    controller = module.get<ProporsalController>(ProporsalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
