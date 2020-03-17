import { Test, TestingModule } from '@nestjs/testing';
import { MusicalGroupService } from './musicalgroup.service';

describe('MusicalGroupService', () => {
  let service: MusicalGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicalGroupService],
    }).compile();

    service = module.get<MusicalGroupService>(MusicalGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
