import {COLORS} from '../../shared/helper/colors';

export class Colors {
  public static getStringColor(): string
  {
    const colorsName = Object.keys(COLORS);
    const rand = Math.floor(Math.random() * (colorsName.length + 1));

    return colorsName[rand];
  }

  public static getStringColorByKey(key: number): string
  {
    return Object.keys(COLORS)[key];
  }

  public static getRBGColorByKey(key: number): string
  {
    const rgbColor = Object.values(COLORS)[key];

    return this.buildRGB(rgbColor);
  }

  public static getRBGColorByName(name: string): string
  {
    const rgbColor = COLORS[name];

    return this.buildRGB(rgbColor);
  }

  private static buildRGB(rgbColor: number[]): string
  {
    return 'rgba(' + rgbColor[0] + ',' + rgbColor[1] + ',' + rgbColor[2] + ',0.3)';
  }
}
