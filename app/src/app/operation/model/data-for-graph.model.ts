export class DataForGraphModel {
  id: string;

  amount: number;

  payAt: string;

  location: {name: string}|null;

  type: {name: string}|null;

  categories: {name: string}[]|null;
}
