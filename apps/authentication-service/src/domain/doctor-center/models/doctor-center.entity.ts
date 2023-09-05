import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('doctor-center')
export class DoctorCenter {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('int', {
        name: 'doctor_id'
    })
    doctorId: number;

    @Column('int', {
        name: 'health_center_id'
    })
    healthCenterId: number;
}
