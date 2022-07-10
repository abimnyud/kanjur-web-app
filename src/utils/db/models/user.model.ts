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
    BeforeCreate,
    PrimaryKey,
    Is,
    DefaultScope,
    BeforeUpdate,
} from 'sequelize-typescript';
import * as argon2 from 'argon2';
import titleCase from '@functions/titleCase';

export interface UserAttributes {
    student_id: string;
    name: string;
    password: string;
    revenue: number;
}
@DefaultScope(() => ({
    attributes: ['student_id', 'name', 'created_at'],
}))
@Table({
    modelName: 'User',
    tableName: 'users',
})
class UserModel extends Model<UserAttributes> {
    @Is(function isValid(value: string): void {
        const strValue = value.toString();

        let sum: number = 0;
        const twoLastDigit: number = parseInt(strValue.slice(-2)); // last two index

        [...strValue.slice(0, 3)].forEach((s) => {
            let n = parseInt(s);
            if (isNaN(n)) throw new Error('Student ID is not valid.');
            sum += n;
        });

        if (sum != twoLastDigit) throw new Error('Student ID is not valid.');
    })
    @Length({ min: 5, max: 5 })
    @PrimaryKey
    @AllowNull(false)
    @Column
    student_id!: number;

    @AllowNull(false)
    @Length({ min: 6, max: 50 })
    @Column
    name!: string;

    @Length({ min: 6, max: 20 })
    @AllowNull(false)
    @Column
    password!: string;

    @Default(0)
    @Column
    revenue!: number;

    @Default(0)
    @Column
    deposit!: number;

    @Default(0)
    @Column
    withdraw!: number;

    @Default(0)
    @Column
    debt!: number;

    @Default(false)
    @Column
    flag!: boolean;

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

    @BeforeCreate
    static async hashPassword(instance: UserModel) {
        instance.password = await argon2.hash(instance.password);
    }

    @BeforeUpdate
    static async setFlag(instance: UserModel) {
        if (instance.debt === 0) {
            instance.flag = false;
        } else {
            instance.flag = true;
        }
    }
}

export default UserModel;

/*
CREATE TABLE users (
  student_id    int NOT NULL,
  name          varchar(50) NOT NULL,
  password      varchar(255) NOT NULL,
  revenue       decimal(12, 2) DEFAULT 0,
  deposit       decimal(12, 2) DEFAULT 0,
  withdraw      decimal(12, 2) DEFAULT 0,
  debt          decimal(12, 2) DEFAULT 0,
  flag          boolean DEFAULT false,
  created_at    timestamp DEFAULT NOW(),
  updated_at    timestamp DEFAULT NOW(),
  deleted_at    timestamp NULL,
  PRIMARY KEY (student_id)
);
*/
