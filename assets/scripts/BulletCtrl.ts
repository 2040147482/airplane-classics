import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  Node,
} from "cc";
import { Enemy } from "./Enemy";
const { ccclass, property } = _decorator;

/**
 * 子弹脚本
 */
@ccclass("BulletCtrl")
export class BulletCtrl extends Component {
  /**
   * 子弹速度
   */
  @property
  speed: number = 800;

  isCollision: boolean = false;
  start() {
    //监听碰撞
    let collision = this.getComponent(Collider2D);
    collision.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  update(deltaTime: number) {
    const { x, y } = this.node?.position;
    if (!this.isCollision) {
      let yPos = this.speed * deltaTime;
      this.node?.setPosition(x, y + yPos);
    }
    // 超出屏幕进行销毁
    if (y > 450) {
      this.node?.destroy();
    }
  }

  /**
   * 只在两个碰撞体开始接触时被调用一次
   *
   * @param selfCollider
   * @param otherCollider
   * @param contact
   */
  onBeginContact(
    self: Collider2D,
    other: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (other.node.name == "enemy") {
      this.isCollision = true;
      other.getComponent(Enemy)?.die();
      try {
        this.node.destroy();
      } catch (e) {
        console.log(e);
      }
    }
  }

  onDestroy() {
    let collision = this.getComponent(Collider2D);
    collision.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }
}
