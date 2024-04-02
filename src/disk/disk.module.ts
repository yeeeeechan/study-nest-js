import { Module } from '@nestjs/common';
import { DiskService } from './disk.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  imports: [PowerModule], // diskModule 안에 있는 것은 뭐든지 PowerModule에서 export되는 것을 import 할 수 있다.
  providers: [DiskService],
  exports: [DiskService]
})
export class DiskModule { }
