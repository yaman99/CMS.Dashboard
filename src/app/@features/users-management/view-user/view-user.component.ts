import { Component } from '@angular/core';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent {
  RowClicked= false;
  openDetials(){
   this.RowClicked=!this.RowClicked; 
  }

}
