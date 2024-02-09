export interface FieldsErrors {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [field: string]: string[] | any;
}

export interface IValidatorFields<PropsValidated> {
    errors: FieldsErrors | null
    validatedData: PropsValidated | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate: (data: any) => boolean
}