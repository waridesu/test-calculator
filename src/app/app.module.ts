import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvestmentCalculatorComponent } from './components/investment-calculator/investment-calculator.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgOptimizedImage } from "@angular/common";
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { AprPercentComponent } from './components/apr-percent/apr-percent.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    InvestmentCalculatorComponent,
    DropdownComponent,
    ToggleComponent,
    AprPercentComponent,
    TooltipComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
