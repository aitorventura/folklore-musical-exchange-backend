export class LoggedUser {
    token: string;
    role: string;
    id: number;
    listMusicalExchanges: string;

    constructor(partial: Partial<LoggedUser>) {
        Object.assign(this, partial)
      }
  }
  