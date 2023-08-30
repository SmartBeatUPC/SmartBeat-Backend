import { Doctor } from "src/domain/index.domain";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('doctor-center')
export class DoctorCenter {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(
        () => Doctor,
        ( doctor ) => doctor.doctor_centers,
    )
    @JoinColumn({ name: 'doctor_id' })
    doctor: Doctor;
}
