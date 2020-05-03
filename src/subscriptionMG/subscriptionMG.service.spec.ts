import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionMGService } from './subscriptionMG.service';

describe('SubscriptionMGService', () => {
  let service: SubscriptionMGService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionMGService],
    }).compile();

    service = module.get<SubscriptionMGService>(SubscriptionMGService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
