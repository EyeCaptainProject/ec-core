import { ECColors } from './ECColors';

export class ECAction {
  icon: string;
  color: string;
  callback!: Function | undefined;

  constructor(icon: string, color: string, callback?: Function) {
    this.icon = icon;
    this.color = color;
    this.callback = callback;
  }

  submit(data?: any): void {
    if (this.callback) {
      this.callback(data);
    }
  }
}

export class ECActions {
  public static Close(callback?: Function): ECAction {
    return new ECAction('close', ECColors.ERROR, callback);
  }

  public static Ok(callback?: Function): ECAction {
    return new ECAction('check', ECColors.SUCCESS, callback);
  }

  public static Back(callback?: Function): ECAction {
    return new ECAction('arrow-left', ECColors.WARN, callback);
  }
}
