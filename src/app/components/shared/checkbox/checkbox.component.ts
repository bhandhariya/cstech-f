import { Component, OnInit, Input, forwardRef,ElementRef } from '@angular/core';
// import { Component, Input, forwardRef,ElementRef } from '@angular/core';
import { ControlValueAccessor,  AbstractControl, ValidationErrors,NG_VALUE_ACCESSOR,NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    }
  ]
})
export class CheckboxComponent implements OnInit {


  ngOnInit(): void {
  }
  @Input() 
  set source(value)
  {
    this._source=value;
    let aux=JSON.stringify(value[0]).replace(/[^\w|:|,\s]/gi, '').split(',');
    this._key=aux[0].split(':')[0]
    this._col=aux[1].split(':')[0]
  }
  get source()
  {
    return this._source;
  }
  
  _selectedItems: any[] = [];
  _source:any;
  _key:any;
  _col: any;
  _name:string="";
  _isString:boolean=false;
  _isRequired:boolean=false;
  onChange:any;
  onTouched:any;

  constructor(el:ElementRef) { 
    let name=el.nativeElement.getAttribute('name');
    this._isRequired=el.nativeElement.getAttribute('isRequired')!=null?true:false;
    this._isString=el.nativeElement.getAttribute('isString')!=null?true:false;
    this._name=name?name:"ck";
    
    }
  writeValue(value: any[]|any): void {
    this._selectedItems = this._isString?
       this.propsToBoolean(value?value.split(','):""):this.propsToBoolean(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }
  setValue(value: boolean, index: number) {
    this._selectedItems[index] = value;
    this.onChange(this._isString?this.booleanToProps(this._selectedItems).join(','):this.booleanToProps(this._selectedItems));

  }
  validate(control: AbstractControl): ValidationErrors | null{
    if (!this._isRequired)
      return null;
    if (!this._selectedItems.find((x:any)=>x))
      return {error:"you must select one option at last"}

    return null
  }

  propsToBoolean(props:any): any[] {
    let propsString=props?props.map((x:any)=>''+x):null;
    return props ? this.source.map((x: any) => propsString.indexOf(''+x[this._key]) >= 0)
      : this.source.map((x:any) => false);

  }
  booleanToProps(propsBoolean: boolean[]) {
    let props: any[] = [];
    if (propsBoolean) {
      propsBoolean.forEach((item, index) => {
        if (item)
          props.push(this.source[index][this._key])
      })
    }
    return props;

  }


}
