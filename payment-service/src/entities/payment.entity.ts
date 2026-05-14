import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

@Entity("payments")
export class PaymentEntity {
  @PrimaryColumn("uuid")
  payment_id: string = "";

  @Column("uuid")
  saga_id: string = "";

  @Column("uuid")
  order_id: string = "";

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number = 0;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus = PaymentStatus.PENDING;

  @Column({ nullable: true })
  transaction_id: string = "";

  @Column({ nullable: true })
  error_message: string = "";

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();
}
