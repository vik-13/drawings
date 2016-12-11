import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
    selector: 'drawing-dialog',
    templateUrl: './drawing-dialog.html'
})

export class DrawingDialogComponent {
    form: FormGroup;

    constructor(public fb: FormBuilder, public dialogRef: MdDialogRef<DrawingDialogComponent>) {
        this.form = fb.group({
            name: '',
            width: 320,
            height: 240
        });
    }

    create(form) {
        this.dialogRef.close(form);
    }
}
