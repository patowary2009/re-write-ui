import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const modules = [
  CommonModule,
  MatTabsModule,
  MatInputModule,
  MatFormFieldModule,
];
@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
