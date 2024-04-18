import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) { }

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest()
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      request.CurrentUser = user;
    }

    // 대상 라우트 핸들러를 실행해라
    return handler.handle();
  }

}