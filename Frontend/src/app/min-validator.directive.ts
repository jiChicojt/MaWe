import {Directive, Input} from '@angular/core';
import {FormControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[appMinValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MinValidatorDirective,
    multi: true
  }]
})
export class MinValidatorDirective implements Validator {

  @Input()
  min: number;

  validate(c: FormControl): {[key: string]: any} {
    const v = c.value;

    return (v < this.min) ? {"min": true} : null;
  }

}
