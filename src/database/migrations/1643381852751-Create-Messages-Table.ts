import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMessagesTable1643381852751 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "messages",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "to",
                    type: "uuid",
                    isNullable: true
                },
                {
                    name: "text",
                    type: "text"
                },
                {
                    name: "room_id",
                    type: "uuid"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                    name: "FKReceiverMessage",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["to"],
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKRoomMessage",
                    referencedTableName: "chat_room",
                    referencedColumnNames: ["id"],
                    columnNames: ["room_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("messages");
    }

}
