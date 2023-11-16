import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        unique: true
    })
    email: string;

    @Column('varchar',{
        length: 500
    })
    password: string;

    @Column('bool',{
        default: true,
        nullable: true
    })
    enabled: boolean;
    
    @Column('bool',{
        name: 'is_doctor',
        default: false,
        nullable: true
    })
    isDoctor: boolean;
}
