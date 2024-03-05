/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IUseCase } from "../../../shared/application/use-case.interface";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../domain/category.entity";
import { ICategoryRepository } from "../../domain/category.respository";


export class UpdateCategoryUseCase
    implements IUseCase<UpdateCategoryOutput, UpdateCategoryOutput>
{
    constructor(private categoryRepo: ICategoryRepository) { }

    async execute(input: UpdateCategoryOutput): Promise<UpdateCategoryOutput> {
        const uuid = new Uuid(input.id);
        const category = await this.categoryRepo.findById(uuid);

        if (!category) {
            throw new NotFoundError(input.id, Category);
        }

        input.name && category.changeName(input.name);

        if (input.description !== undefined) {
            // @ts-ignore
            category.changeDescription(input.description);
        }

        if (input.is_active === true) {
            category.activate();
        }

        if (input.is_active === false) {
            category.deactivate();
        }

        await this.categoryRepo.update(category);

        return {
            id: category.category_id.id,
            name: category.name,
            description: category.description,
            is_active: category.is_active,
            created_at: category.created_at,
        };
    }
}

export type UpdateCategoryOutput = {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;
};