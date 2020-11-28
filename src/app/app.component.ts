import { Component, OnInit } from '@angular/core';
import { IDataFrame } from './interfaces/interfaces';
import { ScoreManagerService } from './score-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'myBowling';
  public data: IDataFrame[] = [];
  constructor(
    private scoreManager: ScoreManagerService
  ) {}

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
      this.scoreManager.scoreData.push(payload);
    }

    this.data = this.scoreManager.scoreData;
  }
}
