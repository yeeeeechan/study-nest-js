import { AfterRemove, AfterUpdate, AfterInsert, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
// import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // @Exclude() // 사용자 인스턴스를 일반 객체로 바꾸고 JSON으로 변환할 때 비밀번호는 제외
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Insert User with Id', this.id)
  }

  @AfterRemove()
  logRemove() {
    console.log('Remove User with Id', this.id)
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Update User with ID', this.id)
  }
}