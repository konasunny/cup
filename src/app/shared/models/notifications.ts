
export class Notifications {
  constructor(
  public notificationId: string,
  public notificationTypeId: number,
  public userId: number,
  public userTypeId: string,
  public actionDate: string,
  public message: string,
  public active: string,
  public acted: string,
  public read: string,
  public delivered: number
  ) { }
}



