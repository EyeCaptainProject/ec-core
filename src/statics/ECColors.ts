import {ECCoreConfig} from '../config/ECCoreConfig';
import tinycolor from 'tinycolor2';

export class ECColors {

  private static ecCoreConfig = ECCoreConfig.getInstance();


  static get INFO() {
    return this.buildColorType('info');
  }

  static get ERROR() {
    return this.buildColorType('error');
  }

  static get SUCCESS() {
    return this.buildColorType('success');
  }

  static get WARN() {
    return this.buildColorType('success');
  }

  private static buildColorType(name: string) {
    return this.buildColor(this.ecCoreConfig.colors[name]);
  }

  private static buildColor(colorString: string) {
    const color = tinycolor(colorString);
    if (this.ecCoreConfig.gradients.use) {
      const darkerColor = tinycolor(colorString);
      darkerColor.darken(this.ecCoreConfig.gradients.darken);
      return `radial-gradient(circle at top left, ${ color.toRgbString()}, ${ darkerColor.toRgbString() })`;
    } else {
      return color.toRgbString();
    }
  }



}
