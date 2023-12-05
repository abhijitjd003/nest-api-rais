import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('RAISDataModel.dbo.dimLOBCleanup')
export class CleansedLobEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    CleansedLOBCode: string;

    @Column({ length: 100 })
    CleansedLOBDescription: string;

    @Column()
    Active: boolean;

    @CreateDateColumn()
    CreatedDate: Date;

    @UpdateDateColumn()
    DateModified: Date;
}
