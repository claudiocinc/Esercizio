import { Component, Input, OnInit } from '@angular/core';
import { IDataFrame } from '../interfaces/interfaces';
import { ScoreManagerService } from '../score-manager.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {
  @Input() data!: number;
  public ID: number = 0;
  public frameData!: IDataFrame;
  public firstAttempt: number = 0;
  public secondAttempt: number = 0;
  public thirdAttempt: number = 0;
  public forthAttempt: number = 0;

  constructor(
    private scoreManager: ScoreManagerService
  ) {
  }

  ngOnInit(): void {
    this.ID = this.data;
    this.frameData = this.scoreManager.getDataFrame(this.data);
    this.firstAttempt = this.frameData.frameAttempts[0];
    this.secondAttempt = this.frameData.frameAttempts[1];
    this.thirdAttempt = this.frameData.frameAttempts[2];
    this.forthAttempt = this.frameData.frameAttempts[3];
  }

  public isSpare = (): boolean => {
    return (this.secondAttempt + this.firstAttempt === 10) && !this.isStrike()? true : false;
  }

  public isStrike = (): boolean => {
    return this.firstAttempt === 10 ? true : false;
  }

  public isLast = (): boolean => {
    return this.frameData.frameId === 9;
  }

  public changeDataInService = () => {
    let payload = {
      frameId: this.ID,
      frameAttempts: [this.firstAttempt, this.secondAttempt, this.thirdAttempt, this.forthAttempt],
      frameScore: 0,
      partialScore: this.firstAttempt + this.secondAttempt + this.thirdAttempt + this.forthAttempt,
      isStrike: this.isStrike(),
      isSpare: this.isSpare()
    }
    this.scoreManager.setDataFrame(payload);
    console.log(payload);
    this.frameData = this.scoreManager.getDataFrame(this.data);
  }

}
