export class CharDatasetShortGraphDto<T> {
  public labels: string[];

  public values: T;

  constructor(labels: string[], values: T) {
    this.labels = labels;
    this.values = values;
  }
}
