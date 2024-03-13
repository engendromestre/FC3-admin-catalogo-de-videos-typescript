import { IUseCase } from "../../../../shared/application/use-case.interface";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { Category, CategoryId } from "../../../domain/category.entity";
import { ICategoryRepository } from "../../../domain/category.respository";
import { CategoryOutput, CategoryOutputMapper } from "../common/category-output";


export class GetCategoryUseCase
  implements IUseCase<GetCategoryInput, GetCategoryOutput>
{
  constructor(private categoryRepo: ICategoryRepository) { }

  async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
    const categoryId = new CategoryId(input.id);
    const entity = await this.categoryRepo.findById(categoryId);
    if (!entity) {
      throw new NotFoundError(input.id, Category);
    }

    return CategoryOutputMapper.toOutput(entity);
  }
}

export type GetCategoryInput = {
  id: string;
};

export type GetCategoryOutput = CategoryOutput;