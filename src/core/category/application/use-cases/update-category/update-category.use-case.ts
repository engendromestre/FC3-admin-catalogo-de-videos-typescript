/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { EntityValidationError } from '../../../../shared/domain/validators/validation.error';
import { Category, CategoryId } from '../../../domain/category.entity';
import { ICategoryRepository } from '../../../domain/category.respository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';
import { UpdateCategoryInput } from './update-categoy.input';

export class UpdateCategoryUseCase
  implements IUseCase<UpdateCategoryInput, UpdateCategoryOutput>
{
  constructor(private categoryRepo: ICategoryRepository) {}

  async execute(input: UpdateCategoryOutput): Promise<UpdateCategoryOutput> {
    const categoryId = new CategoryId(input.id);
    const entity = await this.categoryRepo.findById(categoryId);

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

    if (entity.notification.hasErrors()) {
      throw new EntityValidationError(entity.notification.toJSON());
    }

    await this.categoryRepo.update(entity);

    return CategoryOutputMapper.toOutput(entity);
  }
}

export type UpdateCategoryOutput = CategoryOutput;
