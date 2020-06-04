import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../shared/services/data-handler.service';
import {Task} from '../../model/task';
import {Category} from '../../model/category';
import {Priority} from '../../model/priority';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {Status} from '../../model/status';
import {FormControl, Validators} from '@angular/forms';
import {OperType} from '../OperType';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.sass']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, OperType],
    private dataHandlerService: DataHandlerService,
    private dialog: MatDialog
  ) {
  }

  categories: Category[];
  priorities: Priority[];
  statuses: Status[];
  operType: OperType;

  priorityControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  dialogTitle: string;
  task: Task;

  tmpTitle: string;
  tmpCategory: Category;
  tmpPriority: Priority;
  tmpStatus: Status;
  tmpDate: Date;


  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];

    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpStatus = this.task.status;
    this.tmpDate = this.task.date;

    this.dataHandlerService.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandlerService.getAllPriorities().subscribe(items => this.priorities = items);
    this.dataHandlerService.getAllStatuses().subscribe(items => this.statuses = items); // тут буде вивод статусу

  }

  onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.status = this.tmpStatus;
    this.task.date = this.tmpDate;

    this.dialogRef.close(this.task);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm your choose',
        message: `Are you delete task: "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }
}