import {
    Table,
    Model,
    Length,
    Column,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    Default,
    AllowNull,
    ForeignKey,
    BeforeCreate,
    BeforeUpdate,
} from 'sequelize-typescript';
import UserModel from '@models/user.model';
import TransactionModel from '@models/transaction.model';
import titleCase from '@functions/titleCase';

export interface ProductAttributes {
    name: string;
    image: object;
    description: string;
    student_id: number;
    price: number;
}

@Table({
    modelName: 'Product',
    tableName: 'products',
})
class ProductModel extends Model<ProductAttributes> {
    @Length({ min: 3, max: 50 })
    @AllowNull(false)
    @Column
    name!: string;

    @AllowNull(false)
    @Column
    image!: string;

    @AllowNull(false)
    @Column
    description!: string;

    @AllowNull(false)
    @Column
    price!: number;

    @ForeignKey(() => UserModel)
    @Column
    seller_id!: number;

    @ForeignKey(() => TransactionModel)
    @AllowNull
    @Column
    transaction_id!: number;

    @CreatedAt
    @Column
    created_at!: Date;

    @UpdatedAt
    @Column
    updated_at!: Date;

    @DeletedAt
    @AllowNull
    @Default(null)
    @Column
    deleted_at?: Date;

    @BeforeUpdate
    @BeforeCreate
    static async toTitleCase(instance: UserModel) {
        instance.name = await titleCase(instance.name);
    }
}

export default ProductModel;

/*
CREATE TABLE products (
    id                  serial4 NOT NULL,
    name                varchar NOT NULL,
    image               varchar NOT NULL,
    description         varchar NOT NULL,
    price               decimal(12, 2) NOT NULL,
    seller_id           integer NOT NULL,
    transaction_id      integer NULL,
    created_at          timestamp DEFAULT NOW(),
    updated_at          timestamp DEFAULT NOW(),
    deleted_at          timestamp NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (seller_id) REFERENCES "users"(student_id),
    FOREIGN KEY (transaction_id) REFERENCES "transactions"(id)
);
*/
