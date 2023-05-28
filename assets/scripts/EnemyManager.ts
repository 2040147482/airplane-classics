import {
  _decorator,
  Canvas,
  Component,
  director,
  instantiate,
  Node,
  Prefab,
} from "cc";
import { Enemy } from "./Enemy";
const { ccclass, property } = _decorator;

@ccclass("EnemyManager")
export class EnemyManager extends Component {
  @property(Prefab)
  enemyPre: Prefab;

  /**
   * 以秒为单位的时间间隔
   */
  interval: number = 2;
  /**
   * 时长
   */
  duration: number = 0;

  enemyScript: Enemy = null;
  start() {
    // this.node.getComponent
    //开始每隔2s，创建2个敌机
    this.schedule(this.createEnemy, this.interval);
  }

  update(deltaTime: number) {
    if (this.interval <= 0.08) return;
    this.duration = 30 * deltaTime;
    if (this.duration > 30) {
      this.interval -= 0.02;
      this.enemyScript.setSpeed(this.enemyScript.getSpeed() + 20);
    }
  }

  createEnemy() {
    let enemy = instantiate(this.enemyPre);
    this.enemyScript = enemy.getComponent(Enemy);
    enemy.setParent(this.node.getParent());
    let xEnemy = Math.random() * 480 - 220;
    enemy.setPosition(xEnemy, 420);
  }

  onDestroy() {
    this.unschedule(this.createEnemy);
  }
}
