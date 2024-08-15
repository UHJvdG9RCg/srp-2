import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('alias')
export class AliasEntity {
  @PrimaryColumn()
  @Index()
  alias: string;
  @Column()
  url: string;
  @Column({ default: 0 })
  count: number;
}
