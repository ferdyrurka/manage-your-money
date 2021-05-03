import {Injectable} from '@angular/core';
import {LocationDto} from '../dto/location.dto';

@Injectable()
export class LocationFactory {
  public findAllToResultModels(edges: []): LocationDto[] {
    const result: LocationDto[] = [];

    edges.forEach((location: any) => {
      const model = new LocationDto();

      model.id = location.node.id;
      model.name = location.node.name;

      result.push(model);
    });

    return result;
  }
}
