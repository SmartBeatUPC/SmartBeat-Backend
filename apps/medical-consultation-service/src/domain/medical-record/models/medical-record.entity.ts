import { MedicalConsultation } from "src/domain/index.domain";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('medical-record')
export class MedicalRecord {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('timestamp',{
        name: 'record_date',
        nullable: true
    })
    recordDate: Date;

    @ManyToOne(
        () => MedicalConsultation,
        ( medical_consultation ) => medical_consultation.medical_records,
    )
    @JoinColumn({ name: 'medical_consultation_id' })
    medical_consultation: MedicalConsultation;
}
