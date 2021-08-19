import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import InventoryOrder from "./InventoryOrder";

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => InventoryOrder, inventoryOrder => inventoryOrder.product)
    inventoryOrder: InventoryOrder;

    @Column()
    name: string;

    @Column()
    category: string;

    @Column()
    amount: number;

    @CreateDateColumn()
    created_at: Date;
}

export default Product;