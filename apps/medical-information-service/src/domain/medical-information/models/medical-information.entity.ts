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
    height: number;

    @Column('decimal',{
        nullable: true,
        precision: 5,
        scale: 2
    })
    weight: number;

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
        name: 'medical_record_id'
    })
    medicalRecordId: number;

}
