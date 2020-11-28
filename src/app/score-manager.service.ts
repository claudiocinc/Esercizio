import { Injectable, OnInit } from '@angular/core';
import { element } from 'protractor';
import { IDataFrame } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ScoreManagerService implements OnInit{

  public scoreData: IDataFrame[];

  constructor() { 
    this.scoreData = new Array();
  }
  ngOnInit(): void {
    for (let i=0; i< 10; i++) {
      let payload = {
        frameId: i,
        frameAttempts: [0, 0, 0, 0],
        frameScore: 0,
        partialScore: 0,
        isStrike: false,
        isSpare: false
      }
      this.scoreData.push(payload);
    }
  }

  public getDataFrame = (id: number): IDataFrame => {
    return this.scoreData.filter((element: IDataFrame) => {
      return element.frameId === id;
    })[0];
  }

  public setDataFrame = (payload: IDataFrame): void => {
    console.log(payload);
    this.scoreData.splice(payload.frameId,1,payload);
    let partialScore = 0;
    this.calculateFrameScore()
  }

  public calculateFrameScore = () => {
    this.scoreData.forEach((score: IDataFrame) => {
      let totalpartialScore = 0;
      if (!!this.scoreData[score.frameId - 1]) {
        totalpartialScore += this.scoreData[score.frameId - 1].frameScore + score.partialScore;
      } else {
        totalpartialScore += score.partialScore;
      }
      // this.scoreData.slice(0, score.frameId+1).forEach((frame: IDataFrame) => {
      //   totalpartialScore += frame.partialScore;
      // });
      if (score.isSpare) {
        if (score.frameId !==9) {
          totalpartialScore += this.scoreData[score.frameId + 1].frameAttempts[0];
        } else {
          totalpartialScore += 0;
        }
      }

      if (score.isStrike) {
        if (score.frameId !==9) {
          totalpartialScore += this.scoreData[score.frameId + 1].frameAttempts[0] + this.scoreData[score.frameId + 1].frameAttempts[1];
        } else {
          totalpartialScore += 0;
        }
      }
      // console.log(this.scoreData.slice(0, score.frameId+1));
      this.scoreData[score.frameId].frameScore = totalpartialScore;
      totalpartialScore = 0;
    })
  }
}
