import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  imports: [PowerModule], // PowerModule과 연결
  providers: [CpuService],
  exports: [CpuService]
})
export class CpuModule { }
