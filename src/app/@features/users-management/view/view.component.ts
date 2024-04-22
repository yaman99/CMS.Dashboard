import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
IsClicked=false;
  constructor() { }

  ngOnInit() {
  }
TableExpand(){
this.IsClicked=!this.IsClicked;
}


}
