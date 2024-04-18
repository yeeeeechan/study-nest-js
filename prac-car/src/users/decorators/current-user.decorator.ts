import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// 사용자 decorator 만들기
// createParamDecorator를 사용해 인자로 함수를 넘기고, 반환되는 값이 해당 router handler의 인수로 전달됨
export const CurrentUser = createParamDecorator((data: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  console.log(request.session.userId);
  return request.CurrentUser;
})