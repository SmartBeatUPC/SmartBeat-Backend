import { MedicalRecord } from "src/domain/index.domain";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('medical-consultation')
export class MedicalConsultation {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('timestamp',{
        name: 'medical_date'
    })
    medicalDate: Date;

    @Column('int',{
        name: 'doctor_id'
    })
    doctorId: number; 

    @Column('int',{
        name: 'patient_id'
    })
    patientId: number;
    
    @OneToMany(
        () => MedicalRecord,
        (medical_record) => medical_record.medical_consultation,
        { cascade: true }
    )
    medical_records: MedicalRecord[];
}
