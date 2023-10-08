import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('pathology')
export class Pathology {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar')
    pathology: string;

    @Column('int',{
        nullable:false,
        name: 'medical_information_id'
    })
    medicalInformationId: number;
}
