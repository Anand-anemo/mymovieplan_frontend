import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shows } from 'src/app/Models/Shows.model';
import { constant } from 'src/app/services/helper';

@Component({
  selector: 'app-showsform',
  templateUrl: './showsform.component.html',
  styleUrls: ['./showsform.component.css']
})
export class ShowsformComponent implements OnInit {
  showForm!: FormGroup;

  auditoriumShows!: Shows[];

  showNames = constant.SHOW_NAMES;

  constructor(private _fb: FormBuilder,
    public _dialog: MatDialogRef<ShowsformComponent>,
    @Inject(MAT_DIALOG_DATA)private _data: Shows[]){
      this._dialog.disableClose = true;

    }
  ngOnInit(): void {

    this.auditoriumShows = this._data;
    this.showForm = this._fb.group({
      name: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required])
    });

    
    
  }

  onCancel(): void {
    this._dialog.close();
  }
  onSubmit(): void {
    this._dialog.close({ show: this.showForm.value });
  }

}
