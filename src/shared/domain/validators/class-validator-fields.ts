import { validateSync } from 'class-validator';
import { IValidatorFields } from './validator-fields-interface';
import { Notification } from './notification';

export abstract class ClassValidatorFields implements IValidatorFields {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(notification: Notification, data: any, fields: string[]): boolean {
    const errors = validateSync(data, {
      groups: fields,
    });
    if (errors.length) {
      for (const error of errors) {
        const field = error.property;
        Object.values(error.constraints!).forEach((message) => {
          notification.addError(message, field);
        });
      }
    }
    return !errors.length;
  }
}