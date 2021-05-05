import {Component, Input} from '@angular/core';
import {FilterDto} from '../../dto/filter.dto';
import {PayAtFilter} from '../../service/filter/pay-at.filter';

@Component({
  selector: 'app-operation-component-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() filterDto: FilterDto;

  constructor(public payAtFilter: PayAtFilter) {
  }
}
