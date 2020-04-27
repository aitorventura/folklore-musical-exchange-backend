import { RequesterRole } from '../enums/requester-role.enum';
import { Expose, Transform } from 'class-transformer';

export class RequesterDto {
  readonly id: number;
  @Transform(value => RequesterRole[value.toUpperCase()])
  readonly role: RequesterRole;

  constructor(partial: Partial<RequesterDto>) {
    Object.assign(this, partial)
  }
}