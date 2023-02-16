import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from './showcase-page/showcase-page.component';
import { NavButtonComponent } from './components/nav-button/nav-button.component';
import { AdvertisementFormComponent } from './components/advertisement-form/advertisement-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShowcasePageComponent,
    NavButtonComponent,
    AdvertisementFormComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ShowcasePageComponent],
})
export class ShowcaseModule {}
