import {
    Table,
    Model,
    Column,
    AllowNull,
    ForeignKey,
    Default,
    DefaultScope,
} from 'sequelize-typescript';
import UserModel from '@models/user.model';

export interface TransactionAttributes {
    student_id: number;
    total_price: number;
    deposit: number;
    withdraw: number;
    balance: number;
    flag: boolean;
}
@DefaultScope(() => ({
    attributes: [
        'id',
        'student_id',
        'total_price',
        'deposit',
        'withdraw',
        'balance',
        'created_at',
        'flag',
    ],
}))
@Table({
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: false,
})
class TransactionModel extends Model<TransactionAttributes> {
    @ForeignKey(() => UserModel)
    @Column
    student_id!: number;

    @AllowNull
    @Default(0)
    @Column
    total_price!: number;

    @AllowNull(false)
    @Default(0)
    @Column
    deposit!: number;

    @AllowNull(false)
    @Default(0)
    @Column
    withdraw!: number;

    @AllowNull(false)
    @Default(0)
    @Column
    balance!: number;

    @AllowNull(false)
    @Default(false)
    @Column
    flag!: boolean;

    @Default(new Date())
    @Column
    created_at!: Date;
}

export default TransactionModel;

/*
CREATE TABLE transactions (
    id            serial4 NOT NULL,
    student_id    integer NOT NULL,
    total_price   decimal(12, 2) NULL DEFAULT 0,
    deposit       decimal(12, 2) NULL DEFAULT 0,
    withdraw      decimal(12, 2) NULL DEFAULT 0,
    balance       decimal(12, 2) NULL DEFAULT 0,
    flag          boolean NOT NULL DEFAULT false,
    created_at    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES "users"(student_id)
);
*/
