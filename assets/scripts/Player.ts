import {
  _decorator,
  Component,
  director,
  EventTouch,
  instantiate,
  Node,
  Prefab,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
  /**
   * 子弹预制体
   */
  @property(Prefab)
  bulletPre: Prefab;

  start() {
    // 移动
    this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);

    // 创建子弹
    this.createBullet();
  }

  /**
   * 控制飞机移动
   * @param event
   */
  onTouchMove(event: EventTouch) {
    const xyDis = event.getLocation();
    this.node.setWorldPosition(xyDis.x, xyDis.y, 0);
  }

  update(deltaTime: number) {}

  /**
   * 创建子弹
   */
  createBullet() {
    // 计时器, 每0.5秒创建
    this.schedule(() => {
      let bullet = instantiate(this.bulletPre);
      //设置父节点
      bullet.setParent(this.node.getParent());
      // 设置子弹位置
      const nodePos = this.node.position;
      bullet.setPosition(nodePos.x, nodePos.y + 63, 0);
    }, 0.2);
  }

  onDestroy() {
    // 暂停所有计时器
    this.unscheduleAllCallbacks();
    this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
  }
}
