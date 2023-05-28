import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

/**
 * 控制背景移动
 */
@ccclass("MoveBG")
export class MoveBG extends Component {
  start() {}

  update(deltaTime: number) {
    for (const chirldren of this.node.children) {
      let yDis = chirldren.position.y;
      yDis -= 50 * deltaTime;
      chirldren.setPosition(0, yDis);

      if (yDis <= -852) {
        chirldren.setPosition(0, yDis + 852 * 2);
      }
    }
  }
}
