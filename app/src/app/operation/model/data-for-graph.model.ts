export class DataForGraphModel {
  id: string;

  amount: number;

  payAt: string;

  location: {id: string, name: string}|null;

  type: {id: string, name: string}|null;
}
