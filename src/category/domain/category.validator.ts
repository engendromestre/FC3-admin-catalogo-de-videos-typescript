/* eslint-disable no-mixed-spaces-and-tabs */
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { type Category } from "./category.entity";
import { ClassValidatorFields } from "../../shared/domain/validators/class-validator-fields";

export class CategoryRules {
    // colocar as validações do mais primorial para o mais específico
    // habilitar o comportamento de decorator no tsconfig.json
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
        name!: string;

    @IsString()
    @IsOptional()
    	description!: string | null;

    @IsBoolean()
    @IsNotEmpty()
    	is_active!: boolean;

    constructor({ name, description, is_active }: Category) {
    	// "strictNullChecks": false,
    	Object.assign(this, { name, description, is_active });
    }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
	validate(entity: Category): boolean {
		return super.validate(new CategoryRules(entity));
	}
}

export class CategoryValidatorFactory {
	static create() {
		return new CategoryValidator();
	}
}