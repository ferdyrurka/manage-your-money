export class CharDatasetShortGraphModel<T> {
  public labels: string[];

  public values: T;

  constructor(labels: string[], values: T) {
    this.labels = labels;
    this.values = values;
  }
}
