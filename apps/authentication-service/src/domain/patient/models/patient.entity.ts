import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('patient')
export class Patient {
    
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
    dni: string;

    @Column('varchar',{
        length: 10
    })
    gender: string;

    @Column('varchar',{
        length: 30
    })
    nationality: string;

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
