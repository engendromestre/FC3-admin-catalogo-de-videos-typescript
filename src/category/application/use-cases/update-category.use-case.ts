/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IUseCase } from "../../../shared/application/use-case.interface";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../domain/category.entity";
import { ICategoryRepository } from "../../domain/category.respository";
import { CategoryOutput, CategoryOutputMapper } from "./common/category-output";


export class UpdateCategoryUseCase
    implements IUseCase<UpdateCategoryOutput, UpdateCategoryOutput>
{
    constructor(private categoryRepo: ICategoryRepository) { }

    async execute(input: UpdateCategoryOutput): Promise<UpdateCategoryOutput> {
        const uuid = new Uuid(input.id);
        const entity = await this.categoryRepo.findById(uuid);

        if (!entity) {
            throw new NotFoundError(input.id, Category);
        }

        input.name && entity.changeName(input.name);

        if (input.description !== undefined) {
            // @ts-ignore
            entity.changeDescription(input.description);
        }

        if (input.is_active === true) {
            entity.activate();
        }

        if (input.is_active === false) {
            entity.deactivate();
        }

        await this.categoryRepo.update(entity);

        return CategoryOutputMapper.toOutput(entity);
    }
}

export type UpdateCategoryOutput = CategoryOutput;