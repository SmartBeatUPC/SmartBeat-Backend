import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('suggestion')
export class Suggestion {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar')
    suggestion: string;

    @Column('int',{
        name: 'medical_record_id'
    })
    medicalRecordId: number;
}
