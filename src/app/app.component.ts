import { Component, ElementRef, ViewChild } from '@angular/core';
import { UuidServiceService } from './service/uuid-service.service';
import { Itodo } from 'src/module/todo.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('todoItem') todoName !: ElementRef
  isEditMode: boolean = false
  todosArr: Array<Itodo> = [
    {
      todoItem: 'Angular',
      todoId: '123'
    },
    {
      todoItem: 'Node',
      todoId: '124'
    },
    {
      todoItem: 'MongoDB',
      todoId: '125'
    }

  ]

  _snacBar = ''
  updateId!: string;

  // updateId: any;
  // ele!: Itodo;

  constructor(private _uuidServiceService: UuidServiceService) {

  }


  onAddTodo() {
    let todo = {
      todoItem: this.todoName.nativeElement.value,
      todoId: this._uuidServiceService.getuuid()
    }

    this.todosArr.push(todo)
    this.todoName.nativeElement.value = ''
    //  console.log(todo)
    this._uuidServiceService.snackBar(`New Todo Added Successfully!!!`)
  }

  onEditTodo(todo: Itodo) {
    let editObj = this.todosArr.find(t => t.todoId === todo.todoId)
    // console.log(editObj)
    this.todoName.nativeElement.value = todo.todoItem

    this.isEditMode = true
    this.updateId = todo.todoId

    // console.log(this.updateId)

  }

  onUpdate(){
    let getInd = this.todosArr.findIndex(td => td.todoId === this.updateId)
    let updateObj = this.todoName.nativeElement.value
    this.todosArr[getInd].todoItem =updateObj
    this.todoName.nativeElement.value = ''
    this.isEditMode = false
    this._uuidServiceService.snackBar(` Todo Upated Successfully!!!`)

  }

  onRemoveTodo(todo : string) {

    let getConfirm = confirm(`Are You Sure, You want to Remove !!!`)
    if(getConfirm){
      let getindx = this.todosArr.findIndex(t => t.todoId === todo)
    console.log(getindx)
    this.todosArr.splice(getindx, 1)
    this._uuidServiceService.snackBar(` Todo Removed Successfully!!!`)

    }
  }

}
