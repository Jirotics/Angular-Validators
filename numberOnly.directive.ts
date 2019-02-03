import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[numberOnly]'
})
export class NumberOnlyDirective {
	private regex: RegExp = new RegExp(/^-?[0-9]*(\.[0-9]{0,8}){0,1}$/g);
	@Input() allowDecimal: boolean;
	@Input() allowNegative: boolean;
	@Input() rowData: any;
	@Input() field: string;
	@Input() placesAfterDecimal: number = 3;
	@Input() isNullable: boolean = true;
	originalData: any;

	constructor(private el: ElementRef) {
		
	}

	ngOnInit() {
		if (this.hasObjectAndField())
			this.originalData = this.rowData[this.field];

	}

	@HostListener('keypress', ['$event'])
	onKeyPress(event: KeyboardEvent) {
		if (this.allowDecimal && event.charCode === 46)
			return;
		if (this.allowNegative && event.charCode === 45)
			return;
		if (event.charCode === 8 || event.charCode === 0 || event.charCode === 13  || event.charCode === 127
			|| (event.charCode >= 48 && event.charCode <= 57)) {
			return;
		} else {
			event.preventDefault();
		}
	}

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === "Tab")
			this.checkInput();
		if (event.key === "Escape" && this.hasObjectAndField())
			this.rowData[this.field] = this.originalData;
	}

	@HostListener('keyup', ['$event'])
	onKeyUp(event: KeyboardEvent) {
		let maxLength = this.placesAfterDecimal + 1;
		if (this.hasObjectAndField() && this.rowData[this.field]) {
			let displayString = this.rowData[this.field].toString();
			let dotIndex = displayString.lastIndexOf('.');
			let length = displayString.length;
			if (dotIndex !== -1) {
				if ((dotIndex + maxLength) < length) {
					this.rowData[this.field] = displayString.substring(0, dotIndex + maxLength);
				}
			}
		}
	}

	@HostListener('focusout', ['$event'])
	onfocusout(event: MouseEvent) {
		this.checkInput();
	}

	checkInput() {
		if (this.hasObjectAndField()) {
			if (!String(this.rowData[this.field]).match(this.regex)) {
				this.rowData[this.field] = '';
			}
			if (this.isNullable == false && this.rowData[this.field] == '') {
				this.rowData[this.field] = this.originalData;
			}
		}
	}	

	hasObjectAndField(): boolean{
		return this.rowData != null && this.field != null;
	}

}