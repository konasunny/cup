
export class UserProfile {
    constructor(
    public userId: string,
    public providerId: number,    
    public userName: string,
    public firstName: number,
    public lastName: number,
    public password: string,
    public phoneNumber: number,
    public emailId: string,
    public dateOfBirth: string,
    public active: string,
    public acted: string,
    public read: string,
    public delivered: number
    ) { }
  }  