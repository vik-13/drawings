import {Component, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'add-layout',
  templateUrl: './add-layout.html',
  styleUrls: ['./add-layout.scss']
})
export class AddLayoutComponent {
  @Output() onAdd = new EventEmitter<string>();

  editMode: boolean = false;

  constructor() {}

  add(field) {
    this.editMode = false;
    this.onAdd.emit(field.value);
  }

  cancel() {
    this.editMode = false;
  }

  toEdit() {
    this.editMode = true;
  }
}
