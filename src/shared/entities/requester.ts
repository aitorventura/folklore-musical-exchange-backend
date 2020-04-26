import { RequesterRole } from '../enums/requester-role.enum';

export class Requester {
  readonly id: number;
  readonly role: RequesterRole;


  constructor(partial: Partial<Requester>) {
    Object.assign(this, partial)
  }
}