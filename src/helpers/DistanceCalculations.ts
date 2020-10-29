import {Position} from '../types/Position';
import { Rect2D } from "../types/Rect2D";

export class DistanceCalculations {


  static RectSize(rect: Rect2D) {
    return {
      w: rect.x2 - rect.x1,
      h: rect.y2 - rect.y1
    };
  }

  static RectCenter(rect: Rect2D) {
    return {
      x: (rect.x1 + rect.x2) / 2,
      y: (rect.y1 + rect.y2) / 2
    };
  }

  static FindRect2DScalarForAmount(rect: Rect2D, amount: number) {
    const currWidth = rect.x2 - rect.x1;
    const endWidth = currWidth + amount * 2;
    return currWidth / endWidth;
  }

  static ScaleRect2D(rect: Rect2D, scalar: number) {
    return {
      x1: rect.x1 * scalar,
      y1: rect.y1 * scalar,
      x2: rect.x2 / scalar,
      y2: rect.y2 / scalar
    };
  }

  static ShrinkRect2DBy(rect: Rect2D, amountX: number, amountY: number, ) {
    return this._EnlargeRect2DBy(rect, amountX, amountY, -1);
  }

  static EnlargeRect2DBy(rect: Rect2D, amountX: number, amountY: number, ) {
    return this._EnlargeRect2DBy(rect, amountX, amountY, 1);

  }

  private static _EnlargeRect2DBy(rect: Rect2D, amountX: number, amountY: number, dir: number) {
    return {
      x1: rect.x1 - amountX * dir,
      y1: rect.y1 - amountY * dir,
      x2: rect.x2 + amountX * dir,
      y2: rect.y2 + amountY * dir
    };
  }



  static DomRectToRect2D(domRect: DOMRect) {
    return {
      x1: domRect.left,
      y1: domRect.top,
      x2: domRect.right,
      y2: domRect.bottom
    };
  }

  static DistPointToPoint(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  static DistCircleToSquare(position: Position, diameter: number, rect: Rect2D) {

    let distance = -1;

    const scaledRect = {
      x1: rect.x1 - diameter / 2,
      y1: rect.y1 - diameter / 2,
      x2: rect.x2 + diameter / 2,
      y2: rect.y2 + diameter / 2
    };

    // Is Below
    if (position.y >= scaledRect.y2) {
      // Is to right
      if (position.x >= scaledRect.x2) {
        distance = this.DistPointToPoint(scaledRect.x2, scaledRect.y2, position.x, position.y);
        // Is to left
      } else if (position.x <= scaledRect.x1) {
        distance = this.DistPointToPoint(scaledRect.x1, scaledRect.y2, position.x, position.y);
        // Is just below
      } else {
        distance = position.y - scaledRect.y2;
      }

      // Is above
    } else if (position.y <= scaledRect.y1) {
      // Is to right
      if (position.x >= scaledRect.x2) {
        distance = this.DistPointToPoint(scaledRect.x2, scaledRect.y1, position.x, position.y);
        // Is to left
      } else if (position.x <= scaledRect.x1) {
        distance = this.DistPointToPoint(scaledRect.x1, scaledRect.y1, position.x, position.y);
        // Is just above
      } else {
        distance = scaledRect.y1 - position.y;
      }

      // Is just to left
    } else if (position.x <= scaledRect.x1) {
      distance = scaledRect.x1 - position.x;
      // Is just to right
    } else if (position.x >= scaledRect.x2) {
      distance =  position.x - scaledRect.x2;
    }

    return distance;
  }

}
