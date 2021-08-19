import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from "./Product";

@Entity('inventoryOrders')
class InventoryOrder {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: 'in' | 'out';

    @ManyToOne(() => Product, product => product.inventoryOrder, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    order_amount: number;

    @CreateDateColumn()
    created_at: Date;
}

export default InventoryOrder;