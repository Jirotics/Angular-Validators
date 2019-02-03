import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { CalculationsService } from 'app/calculations/calculations-service';
import { Result } from "app/interfaces/result";

export class ValidateRunName {
	static uniqueRunName(_service: CalculationsService) {
		return (control: AbstractControl) => {
			return Observable.timer(200).switchMap(() => _service.validateName(control.value)).map(
				res => {
					return res.Success ? null : { nameTaken: true };
				}
			);
		};
	}
}
