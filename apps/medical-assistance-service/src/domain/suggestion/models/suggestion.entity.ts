import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('recommendation')
export class Suggestion {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        length: 400
    })
    suggestion: string;

    @Column('varchar',{
        length: 400,
        nullable: true
    })
    alternative: string;

    @Column('int',{
        name: 'medical_record_id'
    })
    medicalRecordId: number;
}
