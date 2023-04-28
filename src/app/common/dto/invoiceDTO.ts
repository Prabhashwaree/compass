export class InvoiceDTO {
  public invoiceId!: string;
  public issueDate!: Date;
  public chequeDate!: Date;
  public quarter!: number;
  public year!: number;
  public datePeriod!: string;
  public venderNo!: string;

  constructor() {}

  public getInvoiceId(): string {
    return this.invoiceId;
  }

  public setInvoiceId(invoiceId: string): void {
    this.invoiceId = invoiceId;
  }

  public getIssueDate(): Date {
    return this.issueDate;
  }

  public setIssueDate(issueDate: Date): void {
    this.issueDate = issueDate;
  }

  public getChequeDate(): Date {
    return this.chequeDate;
  }

  public setChequeDate(chequeDate: Date): void {
    this.chequeDate = chequeDate;
  }

  public getQuarter(): number {
    return this.quarter;
  }

  public setQuarter(quarter: number): void {
    this.quarter = quarter;
  }

  public getYear(): number {
    return this.year;
  }

  public setYear(year: number): void {
    this.year = year;
  }

  public getDatePeriod(): string {
    return this.datePeriod;
  }
  public setDatePeriod(datePeriod: string): void {
    this.datePeriod = datePeriod;
  }

  public getVenderNo(): string {
    return this.venderNo;
  }

  public setVenderNo(venderNo: string): void {
    this.venderNo = venderNo;
  }
}
