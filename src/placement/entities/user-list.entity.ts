import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("MemberCentral.dbo.MC_Users")
export class UserListEntity {
    @PrimaryGeneratedColumn()
    ID: string;

    @Column()
    DisplayName: string;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    Email: string;

    @Column()
    UserName: string;

    @Column()
    UserType: string;

    @Column()
    Agency: string;

    @Column()
    UserStatus: string;
}
