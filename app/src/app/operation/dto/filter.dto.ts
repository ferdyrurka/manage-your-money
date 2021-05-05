import {Moment} from 'moment';

export class FilterDto {
  public fromAmount: number;

  public toAmount: number;

  public fromDate: Moment;

  public toDate: Moment;

  public descriptionHave: string;
}
