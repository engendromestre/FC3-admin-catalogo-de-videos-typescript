import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../category.model";
import { CategorySequelizeRepository } from "../category-sequelize.repository";
import { Category } from "../../../../domain/category.entity";

describe('CategorySequelizeRepository Integration Test', () => {
    let sequelize: Sequelize;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let repository: CategorySequelizeRepository;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            models: [CategoryModel],
            logging: false,
            dialectOptions: {
                useUTC: false, // for reading from database
            },
        });

        // vai fazer um create table e com o force: true ele destroi e cria novamente a tabela
        // isso é muito útil em testes pois a todo momento a gente quer limpar e fazer tudo de novo no banco
        await sequelize.sync({ force: true });
        repository = new CategorySequelizeRepository(CategoryModel);
    });

    test('should insert a new category', async () => {
        const category = Category.fake().aCategory().build();
        await repository.insert(category);
        const model = await CategoryModel.findByPk(category.category_id.id);
        expect(model!.toJSON()).toMatchObject({
            category_id: category.category_id.id,
            name: category.name,
            description: category.description,
            is_active: category.is_active,
            created_at: category.created_at,
        });

        const categoryCreated = await repository.findById(category.category_id);
        expect(categoryCreated!.toJSON()).toStrictEqual(category.toJSON());
    });

    // test("should find a entity ")
})