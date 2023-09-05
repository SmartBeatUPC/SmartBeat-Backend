import { DoctorCenter } from "src/domain/index.domain";
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";

@Entity('doctor')
export class Doctor {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        length: 15
    })
    name: string;

    @Column('varchar',{
        length: 15
    })
    lastName: string;

    @Column('int')
    age: number;

    @Column('varchar',{
        length: 10
    })
    gender: string;

    @Column('varchar',{
        length: 10
    })
    dni: string;

    @Column('varchar',{
        length: 15,
        nullable: true,
    })
    phone: string;

    @Column('int',{
        name: 'user_id',
        nullable: false
    })
    userId: number;

}
