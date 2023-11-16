import { DoctorCenter } from "src/domain/index.domain";
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";

@Entity('doctor')
export class Doctor {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        length: 50
    })
    name: string;

    @Column('varchar',{
        length: 50
    })
    lastName: string;

    @Column('int')
    age: number;

    @Column('varchar',{
        length: 20
    })
    gender: string;

    @Column('varchar',{
        length: 20
    })
    dni: string;

    @Column('varchar',{
        length: 20,
        nullable: true,
    })
    phone: string;

    @Column('int',{
        name: 'user_id',
        nullable: false
    })
    userId: number;

}
