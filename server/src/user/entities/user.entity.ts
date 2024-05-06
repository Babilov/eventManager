import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Event } from "../../event/entities/event.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@OneToMany(() => Event, event => event.user)
	events: Event[];

	@ManyToMany(() => Event, event => event.participants, { onDelete: "CASCADE" })
	@JoinTable()
	participatedEvents: Event[];
}
