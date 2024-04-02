import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService], // 기본적으로 private이므로
  exports: [PowerService] // exports 옵션을 사용해 외부에서도 사용할 수 있도록 설정함
})
export class PowerModule { }
