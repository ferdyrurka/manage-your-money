export class DataForGraphDto {
  id: string;

  amount: number;

  payAt: string;

  location: {name: string}|null;

  type: {name: string}|null;

  categories: {name: string}[]|null;
}
