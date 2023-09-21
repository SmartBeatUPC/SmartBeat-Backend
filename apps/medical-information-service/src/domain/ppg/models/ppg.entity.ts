import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('ppg')
export class Ppg {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('decimal',{
        name: 'blood_pressure_sistolic',
        precision: 5,
        scale: 1
    })
    bloodPressureSistolic: number;

    @Column('decimal',{
        name: 'blood_pressure_diastolic',
        precision: 5,
        scale: 1
    })
    bloodPressureDiastolic: number;

    @Column('int',{
        name: 'heart_rate'
    })
    heartRate: number;

    @Column('int',{
        nullable: true,
    })
    medical_information_id: number;
}
