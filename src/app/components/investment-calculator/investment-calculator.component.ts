import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-investment-calculator',
  templateUrl: './investment-calculator.component.html',
  styleUrls: ['./investment-calculator.component.scss']
})
export class InvestmentCalculatorComponent implements OnDestroy {

  minAmount: number = 1000;
  maxAmount: number = 1000000;
  step: number = 1000;
  periodValues: number[] = [1, 3, 6, 12, 24];
  searchCurrency: FormControl<string> = new FormControl();
  isShowPeriod: boolean = false;
  isShowCurrency: boolean = false;
  currencies: { name: string, apr: number }[] = [
    {name: 'TUSD (Test US Dollar)', apr: 12},
    {name: 'TEUR (Test Euro)', apr: 13},
    {name: 'TCNY (Test Chinese Yuan)', apr: 20},
    {name: 'TINR (Test Indian Rupee)', apr: 33},
    {name: 'TBRL (Test Brazilian Real)', apr: 21},
    {name: 'TIDR (Test Indonesian Rupiah)', apr: 80}
  ];
  filteredCurrencies: { name: string, apr: number }[] = [...this.currencies];

  private unsubscribeAll: Subject<void> = new Subject<void>();

  [key: string]: boolean | any; // 'any' for other non-boolean properties

  calculatorForm = this.fb.group({
    amount: [1000, [Validators.min(this.minAmount), Validators.max(this.maxAmount)]],
    currency: [this.currencies[0]],
    period: [this.periodValues[0]]
  });

  constructor(private fb: FormBuilder) {
    this.searchCurrency.valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(value => {
        this.filteredCurrencies = [...this.currencies];
        return this.filteredCurrencies = this.filteredCurrencies.filter(el => el.name.includes(value))
      })
  }

  get profit(): number {
    const values = this.calculatorForm.value;
    if (!values || !values.amount || !values.currency || !values.period) {
      return 0;
    }
    // don't know about this formula find here https://www.indeed.com/career-advice/career-development/how-to-calculate-apr
    let rate = values.currency.apr / 100;
    return values.amount * rate * (values.period / 12);
  }

  get profitPercent(): number {
    const values = this.calculatorForm.value;
    if (!values || !values.amount || !values.currency || !values.period) {
      return 0;
    }
    let profit = this.profit;
    return (profit / values.amount) * 100;
  }

  incrementAmount(): void {
    let currentValue = this.calculatorForm.get('amount')?.value;
    if (currentValue && currentValue < this.maxAmount) {
      this.calculatorForm.get('amount')?.setValue(currentValue + this.step);
    }
  }

  decrementAmount(): void {
    let currentValue = this.calculatorForm.get('amount')?.value;
    if (currentValue && currentValue > this.minAmount) {
      this.calculatorForm.get('amount')?.setValue(currentValue - this.step);
    }
  }

  isSelected(control: AbstractControl, item: { name: string; apr: number } | number): boolean {
    return typeof item === 'number' ? control.value === item : control.value.name === item.name;
  }

  setDropdown(control: AbstractControl, item: { name: string; apr: number } | number, showSearches: string) {
    control.setValue(item);
    this[showSearches] = false;
  }

  searchChange($event: boolean, showSearches: string) {
    this[showSearches] = $event;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
