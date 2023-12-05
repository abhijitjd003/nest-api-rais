import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('RAISDataModel.dbo.dimAgencyConfiguration')
export class AgencyConfigurationEntity {
    @PrimaryGeneratedColumn()
    AgencyDatabaseID: number;

    @Column({ length: 100 })
    LongName: string;

    @Column({ length: 20 })
    Region: string;
}
