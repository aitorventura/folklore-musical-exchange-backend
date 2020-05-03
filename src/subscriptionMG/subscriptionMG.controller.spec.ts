import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionMGController } from './subscriptionMG.controller';

describe('Subscription Controller', () => {
  let controller: SubscriptionMGController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionMGController],
    }).compile();

    controller = module.get<SubscriptionMGController>(SubscriptionMGController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
