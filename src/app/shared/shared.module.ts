import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpComponent } from './components/otp/otp.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { SelectComponent } from './components/select/select.component';
import { CamelCasePipe } from './pipes/CamelCase.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    HttpClientModule,
  ],
  exports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    OtpComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    HttpClientModule,
    FormsModule,
    CamelCasePipe,
  ],
  declarations: [
    OtpComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    CamelCasePipe,
  ],
})
export class SharedModule {}
