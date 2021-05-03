export class PayAtFilter {
  public filter(input: Date | null): boolean {
    const date = (input || new Date());
    return date < (new Date());
  }
}
