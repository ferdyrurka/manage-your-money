export class CharSingleDatasetShortGraphDto {
  public label: string;

  public data: number[];

  constructor(label: string, data: number[]) {
    this.label = label;
    this.data = data;
  }
}
