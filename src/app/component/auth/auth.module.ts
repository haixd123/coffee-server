import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, FormsModule, SharedModule, RouterModule],
})
export class AuthModule {}
