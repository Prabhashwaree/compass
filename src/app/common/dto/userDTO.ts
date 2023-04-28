export class UserDTO {
  public venderName!: string;
  public email!: string;
  public contact!: number;
  public nic!: string;
  public venderNo!: string;
  public alternativeName!: string;
  public address!: string;
  public username!: string;
  public password!: string;

  constructor() {}

  public getVenderName(): string {
    return this.venderName;
  }
  // Setter
  public setVenderName(venderName: string) {
    this.venderName = venderName;
  }

  public getEmail(): string {
    return this.email;
  }
  // Setter
  public setEmail(email: string) {
    this.email = email;
  }

  public getContact(): number {
    return this.contact;
  }
  // Setter
  public setContact(contact: number) {
    this.contact = contact;
  }

  public getNic(): string {
    return this.nic;
  }
  // Setter
  public setNic(nic: string) {
    this.nic = nic;
  }


  public getVenderNo(): string {
    return this.venderNo;
  }
  // Setter
  public setVenderNo(venderNo: string) {
    this.venderNo = venderNo;
  }

  public getAlternativeName(): string {
    return this.alternativeName;
  }
  // Setter
  public setAlternativeName(alternativeName: string) {
    this.alternativeName = alternativeName;
  }

  public getAddress(): string {
    return this.address;
  }
  // Setter
  public setAddress(address: string) {
    this.address = address;
  }

  public getUsername(): string {
    return this.username;
  }
  // Setter
  public setUsername(username: string) {
    this.username = username;
  }

  public getPassword(): string {
    return this.password;
  }
  // Setter
  public setPassword(password: string) {
    this.password = password;
  }
}
