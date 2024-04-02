import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {

  }


  compute(a: number, b: number) {
    console.log('PowerService에서 전력 10watts 끌어오기')
    this.powerService.supplyPower(10);
    return a + b;
  }
}
