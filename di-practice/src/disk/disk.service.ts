import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) { }

  getData() {
    console.log('PowerService에서 전력 20watts 끌어오기!')
    this.powerService.supplyPower(20);
    return 'data!';
  }
}
