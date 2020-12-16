import {Component, Input, OnInit} from '@angular/core';
import {Feature} from '../../../entities/feature';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.css']
})
export class DetailListComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  itemList: Feature[];

  constructor() { }

  ngOnInit(): void {
  }

}
