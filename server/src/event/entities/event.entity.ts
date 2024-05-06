import {
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Event {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ type: "timestamp" }) // Заменяем тип данных на timestamp
	date: Date;

	@Column({ type: "float" })
	xCord: number;

	@Column({ type: "float" })
	yCord: number;

	@Column({ nullable: true })
	address: string;

	@Column({ type: "float" })
	price: number;

	@ManyToOne(() => User, user => user.events, { eager: true })
	user: number;

	@ManyToMany(() => User, user => user.participatedEvents)
	participants: User[];
}
