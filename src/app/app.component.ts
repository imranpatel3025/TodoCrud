import { Component, ElementRef, ViewChild } from '@angular/core';
import { UuidServiceService } from './service/uuid-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('todoItem') todoName ! : ElementRef
  isEditMode : boolean = false
  todosArr = [
    {
      todoItem : 'Angular',
      todoId : '123'
    },
     {
      todoItem : 'Node',
      todoId : '124'
    },
     {
      todoItem : 'MongoDB',
      todoId : '125'
    }
    
]

  _snacBar = ''

 constructor( private _uuidServiceService: UuidServiceService ) { 
 
 }


 onAddTodo(){
   let todo = {
    todoItem : this.todoName.nativeElement.value,
    todoId : this._uuidServiceService.getuuid()
   }

   this.todosArr.push(todo)
   this.todoName.nativeElement.value = ''
  //  console.log(todo)
  this._uuidServiceService.snackBar(`New Todo Added Successfully!!!`)  
 }
}
