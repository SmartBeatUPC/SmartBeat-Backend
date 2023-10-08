import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('medical-prescription')
export class MedicalPrescription {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        length: 50
    })
    medicament: string;

    @Column('decimal',{
        precision: 5,
        scale: 2,
    })
    dosage: number;

    @Column('varchar',{
        length: 50,
        nullable: true
    })
    via: string;

    @Column('varchar',{
        length: 50,
        nullable: true
    })
    frequency: string;

    @Column('varchar',{
        length: 50,
        nullable: true
    })
    duration: string;
    
    @Column('int',{
        name: 'diagnostic_id'
    })
    diagnosticId: number;
}
