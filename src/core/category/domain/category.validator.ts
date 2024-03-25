/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */
import { MaxLength } from 'class-validator';
import { type Category } from './category.entity';
import { ClassValidatorFields } from '../../shared/domain/validators/class-validator-fields';
import { Notification } from '../../shared/domain/validators/notification';

export class CategoryRules {
  // colocar as validações do mais primorial para o mais específico
  // habilitar o comportamento de decorator no tsconfig.json
  @MaxLength(255, { groups: ['name'] })
  name!: string;
  /* @IsString()
    @IsNotEmpty()
        name!: string;

    @IsString()
    @IsOptional()
    	description!: string | null;

    @IsBoolean()
    @IsNotEmpty()
    	is_active!: boolean; */

  constructor(entity: Category) {
    // "strictNullChecks": false,
    Object.assign(this, entity);
  }
}

export class CategoryValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields?.length ? fields : ['name'];
    return super.validate(notification, new CategoryRules(data), newFields);
  }
}

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
