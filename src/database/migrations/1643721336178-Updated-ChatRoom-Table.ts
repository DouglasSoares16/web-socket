import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdatedChatRoomTable1643721336178 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("chat_room", "users_id", new TableColumn({
            name: "users_id",
            type: "uuid",
            isNullable: true,
            isArray: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("chat_room", "users_id", new TableColumn({
            name: "users_id",
            type: "uuid",
            isNullable: true,
        }));
    }

}
