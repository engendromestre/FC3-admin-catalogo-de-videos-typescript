/* eslint-disable @typescript-eslint/no-explicit-any */
import { Notification } from './notification';

export type FieldsErrors =
    | {
        [field: string]: string[];
    }
    | string;

export interface IValidatorFields {
    validate(notification: Notification, data: any, fields: string[]): boolean;
}