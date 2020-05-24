import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '@esn/client/core/models';

@Component({
  selector: 'esn-user-search',
  template: `
    <mat-form-field fxFlex="grow">
      <mat-label>Add user</mat-label>
      <input
        matInput
        placeholder="Email address"
        type="search"
        (keyup)="search.emit(userControl.value)"
        [formControl]="userControl"
        [matAutocomplete]="auto"
      />
      <mat-autocomplete
        #auto="matAutocomplete"
        [displayWith]="displayFn"
        (optionSelected)="userSelected.emit($event.option.value)"
      >
        <mat-option *ngFor="let option of userOptions" [value]="option">
          {{ option.email }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
    <mat-spinner
      [class.show]="searching"
      [diameter]="30"
      [strokeWidth]="3"
    ></mat-spinner>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
      }
      .mat-spinner {
        position: relative;
        top: 10px;
        left: 10px;
        visibility: hidden;
      }
      .mat-spinner.show {
        visibility: visible;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchComponent {
  @Input() userOptions: User[];
  @Input() searching: boolean;
  @Output() userSelected = new EventEmitter<User>();
  @Output() search = new EventEmitter<string>();
  userControl = new FormControl('');
  constructor() {}
  displayFn(user: User): string {
    return user && user.email ? user.email : '';
  }
}
