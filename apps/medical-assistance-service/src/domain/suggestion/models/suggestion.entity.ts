import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('recommendation')
export class Suggestion {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        length: 15
    })
    suggestion: string;

    @Column('varchar',{
        length: 15
    })
    alternative: string;

    @Column('number',{
        name: 'medical_record_id'
    })
    medicalRecordId: number;
}
