import {Component, Output, EventEmitter} from "@angular/core";
import {MdSnackBar} from "@angular/material";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
    selector: 'add-drawing',
    templateUrl: './add-drawing.html',
    styleUrls: ['./add-drawing.scss']
})

export class AddDrawingComponent {
    @Output() onCancel = new EventEmitter<any>();
    @Output() onCreate = new EventEmitter<any>();

    form: FormGroup;

    constructor(public fb: FormBuilder,
                public snackBar: MdSnackBar) {
        this.form = fb.group({
            name: '',
            width: 320,
            height: 240
        });
    }

    create(form) {
        if (form.valid) {
            this.onCreate.emit(form.value);
        } else {
            this.snackBar.open('All fields are required...', 'Try again', {duration: 10000});
        }
    }

    cancel() {
        this.onCancel.emit();
    }
}
