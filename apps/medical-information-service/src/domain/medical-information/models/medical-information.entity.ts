import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('medical-information')
export class MedicalInformation {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('decimal',{
        nullable: true,
        precision: 5,
        scale: 2
    })
    bmi: number;

    @Column('boolean',{
        nullable: true,
    })
    sedentary: boolean;

    @Column('boolean',{
        nullable: true,
    })
    smoke: boolean;

    @Column('boolean',{
        nullable: true,
    })
    alcohol: boolean;

    @Column('int',{
        nullable: false,
    })
    medical_record_id: number;

}
