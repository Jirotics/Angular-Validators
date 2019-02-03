import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[textInput]'
})
export class textInputDirective {
	@Input() isNullable: boolean = true;
	@Input() rowData: any;
	@Input() field: string;
	originalData: any;

	constructor(private el: ElementRef) {

	}

	ngOnInit() {
		if (this.hasObjectAndField())
			this.originalData = this.rowData[this.field];

	}

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === "Tab")
			this.checkInput();
		if (event.key === "Escape" && this.hasObjectAndField())
			this.rowData[this.field] = this.originalData;
	}

	@HostListener('focusout', ['$event'])
	onfocusout(event: MouseEvent) {
		this.checkInput();
	}

	checkInput() {
		if (this.hasObjectAndField()) {
			this.rowData[this.field] = this.rowData[this.field].trim();
			if (this.isNullable == false && this.rowData[this.field] == '')
				this.rowData[this.field] = this.originalData;
		}
	}

	hasObjectAndField(): boolean {
		return this.rowData != null && this.field != null;
	}

}
