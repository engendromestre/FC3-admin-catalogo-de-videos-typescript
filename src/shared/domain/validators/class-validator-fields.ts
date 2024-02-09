/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateSync } from "class-validator";
import { type FieldsErrors, type IValidatorFields } from "./validator-fields-interface";

export abstract class ClassValidatorFields<PropsValidated> implements IValidatorFields<PropsValidated> {
	errors: FieldsErrors | null = null;
	validatedData: PropsValidated | null = null;

	validate (data: any): boolean {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const errors = validateSync(data);

		if (errors.length > 0) {
			this.errors = {};
			for (const error of errors) {
				const field = error.property;
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-type-assertion
				this.errors[field] = Object.values(error.constraints!);
			}
		} else {
			this.validatedData = data;
		}
		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
		return !errors.length;
	}
}
