import {
  _decorator,
  Component,
  Node,
  resources,
  Sprite,
  SpriteFrame,
  Texture2D,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Enemy")
export class Enemy extends Component {
  /**
   * 敌机速度
   */
  @property
  private speed: number = 100;

  /**
   * 敌机是否死亡
   */
  isLive: boolean = true;

  start() {}

  update(deltaTime: number) {
    //移动
    const { x, y } = this.node.position;
    // if (this.isLive) {
    let yPos = this.speed * deltaTime;
    this.node.setPosition(x, y - yPos);
    // }
    if (y < -450) {
      this.die();
    }
  }

  /**
   * 敌机死亡
   */
  die() {
    this.isLive = false;
    // 加载敌机死亡图片
    resources.load("enemy_die/spriteFrame", SpriteFrame, (err, sf) => {
      if (!err) {
        this.node.getComponent(Sprite).spriteFrame = sf;
      }
    });
    // let self = this;
    // this.scheduleOnce(() => {
    //   console.log("##", self == this);
    //   this.destroy();
    // }, 1);
    setTimeout(() => {
      this.node?.destroy();
    }, 300);
  }

  setSpeed(speed: number) {
    if (speed < 500) {
      this.speed = speed;
    }
  }

  getSpeed() {
    return this.speed;
  }
}
