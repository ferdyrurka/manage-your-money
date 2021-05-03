import {CursorDto} from './cursor.dto';
import {TypeDto} from './type.dto';
import {LocationDto} from './location.dto';

export class OperationDto extends CursorDto {
  public id: string;

  public amount: number;

  public balanceAfterSurgery: number;

  public description: string;

  public payAt: string;

  public type: TypeDto | null;

  public location: LocationDto | null;
}
