import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('diagnostic')
export class Diagnostic {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        length: 300,
        name: 'diagnostic_result'
    })
    diagnosticResult: string;

    @Column('int',{
        name: 'medical_consultation_id'
    })
    medicalConsultationId: number;

}
