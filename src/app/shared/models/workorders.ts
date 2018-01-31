export class Workorders {
    constructor(
      public workorderId: string,
      public workorderTypeId: number,
      public userId: number,
      public userTypeId: string,
      public workorderDate: string,
      public workordermessage: string,
      public status: string
    ) { }
  }
  