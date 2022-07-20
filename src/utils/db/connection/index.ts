import {
    Sequelize,
    Table,
    BelongsTo,
    HasMany,
    Scopes,
    BelongsToMany,
    Model,
    ForeignKey,
    Column,
} from 'sequelize-typescript';
import * as pg from 'pg';
import UserModel from '@models/user.model';
import ProductModel from '@models/product.model';
import TransactionModel from '@models/transaction.model';

/* Association and Scopes */
// Users
@Scopes(() => ({
    me: {
        attributes: ['student_id', 'name'],
    },
    id: {
        attributes: ['student_id'],
    },
    public: {
        attributes: ['student_id', 'name', 'created_at'],
    },
    summary: {
        attributes: ['revenue', 'deposit', 'withdraw'],
    },
    getPassword: {
        attributes: ['student_id', 'name', 'password'],
    },
    toCheckDebt: {
        attributes: [
            'student_id',
            'name',
            'revenue',
            'deposit',
            'withdraw',
            'debt',
        ],
    },
}))
@Table
export class User extends UserModel {
    @HasMany(() => Product)
    products!: Product[];

    @BelongsToMany(() => Product, () => Cart)
    cart!: Product[];

    @HasMany(() => Transaction)
    transactions!: Transaction[];
}

// Transactions
@Scopes(() => ({
    latestBalance: {
        order: [[`id`, `desc`]],
        limit: 1,
        attributes: ['balance'],
    },
    recentActivity: {
        attributes: ['id', 'total_price', 'deposit', 'withdraw', 'created_at'],
        include: [
            { model: User, as: 'student', attributes: ['student_id', 'name'] },
        ],
    },
    recentUserTransactions: {
        attributes: ['id', 'total_price', 'deposit', 'withdraw', 'flag', 'created_at'],
    },
    full: {
        attributes: [
            'id',
            'total_price',
            'deposit',
            'withdraw',
            'balance',
            'flag',
            'created_at',
        ],
        include: [
            { model: User, as: 'student', attributes: ['student_id', 'name'] },
            { model: Product, paranoid: false },
        ],
    },
}))
@Table
export class Transaction extends TransactionModel {
    @BelongsTo(() => User)
    student!: User;

    @HasMany(() => Product)
    products!: Product[];
}

// Products
@Scopes(() => ({
    list: {
        attributes: ['id', 'name', 'image', 'price', 'created_at'],
        include: {
            model: User,
            as: 'seller',
            attributes: ['student_id', 'name'],
        },
    },
    full: {
        include: {
            model: User,
            as: 'seller',
            attributes: ['student_id', 'name', 'created_at'],
        },
    },
    all: {
        include: {
            model: User,
            as: 'seller',
            attributes: ['student_id', 'name'],
        },
        paranoid: false,
    },
}))
@Table
export class Product extends ProductModel {
    @BelongsTo(() => User)
    seller!: User;

    @BelongsToMany(() => User, () => Cart)
    user_id!: User;

    @BelongsTo(() => Transaction)
    transaction!: Transaction;
}

@Table({
    modelName: 'Cart',
    tableName: 'cart_links',
    timestamps: false,
})
export class Cart extends Model {
    @ForeignKey(() => User)
    @Column
    user_id!: number;

    @ForeignKey(() => Product)
    @Column
    product_id!: number;
}

/* 
CREATE TABLE cart_links (
  user_id int NOT NULL,
  product_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "users"(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (product_id) REFERENCES "products"(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY ("user_id","product_id")
);
*/

const db = new Sequelize({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dialect: 'postgres',
    dialectModule: pg,
    define: {
        freezeTableName: true,
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    models: [User, Product, Transaction, Cart],
    timezone:"+07:00"
});

export default db;
