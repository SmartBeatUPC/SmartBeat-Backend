import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('health-center')
export class HealthCenter {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', {
        name: 'name_center',
        length: 50
    })
    nameCenter: string;

    @Column('varchar', {
        name: 'address_center',
        length: 80
    })
    addressCenter: string;
}
