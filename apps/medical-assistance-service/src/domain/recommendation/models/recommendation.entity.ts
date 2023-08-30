import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('recommendation')
export class Recommendation {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        length: 15
    })
    recommendation: string;

    @Column('number',{
        name: 'medical_record_id'
    })
    medicalRecordId: number;
}
