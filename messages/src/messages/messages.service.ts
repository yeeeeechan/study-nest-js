import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable() // DI Container에 등록하는 데코레이터
export class MessagesService {

  constructor(public messagesRepo: MessagesRepository) { }

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll()
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }

}