import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChatRoomTable1643379219933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "chat_room",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "users_id",
                    type: "uuid",
                    isNullable: true
                }
            ],
            foreignKeys: [
                {
                    name: "FKUsersChat",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["users_id"],
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("chat_room");
    }

}
