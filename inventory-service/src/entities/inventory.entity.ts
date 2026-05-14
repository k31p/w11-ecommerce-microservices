import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("inventory")
export class InventoryEntity {
  @PrimaryColumn("uuid")
  product_id: string = "";

  @Column()
  product_name: string = "";

  @Column()
  quantity: number = 0;

  @Column()
  reserved_quantity: number = 0;

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();
}
