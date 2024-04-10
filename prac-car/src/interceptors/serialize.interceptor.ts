import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { plainToClass } from "class-transformer";

interface ClassConstructor {
  new(...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) { }

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // reuest handler로 요청이 처리되기 전에 실행될 내용

    return handler.handle().pipe(
      map((data: any) => {
        // response가 나가기 전에 실행되는 내용 (data -> 나가는 응답에 보내는 데이터)
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true //UserDto 인스턴스를 기본 json으로 변환하려고 할 때마다 Expose라고 표시된 속성만 공유, 노출하도록 하는 옵션
        })
      })
    )
  }
}