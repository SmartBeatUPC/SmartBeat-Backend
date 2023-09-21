import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('recommendation')
export class Recommendation {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        length: 400
    })
    recommendation: string;

    @Column('int',{
        name: 'medical_record_id'
    })
    medicalRecordId: number;
}
