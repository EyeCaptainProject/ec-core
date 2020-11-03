// TODO: MOVE to file

export interface ColorDefinition {
  [key: string]: string;
}

const defaultConfig = {
  gazeTime: 1500,
  gazeThreshold: 100,
  appIconSize: 150,
  buttonSize: 100,
  buttonSpacing: 100,
  recentAppsSidebar: {
    padding: 20,
    backgroundColor: 'rgb(25,31,38)',
    textColor: 'white',
  },
  colors: {
    info: '#17cfd3',
    success: '#3db322',
    notify: '#1558cb',
    warn: '#FF7600',
    warnDark: '#FF7600',
    error: '#e0251a',
  },
  gradients: {
    use: true,
    darken: 20,
  },
};

export class ECCoreConfig {
  constructor() {}

  /**
   * Singleton pattern
   */
  private static instance: ECCoreConfig;

  public gazeThreshold!: number;
  public gazeTime!: number;
  public buttonSize!: number;
  public buttonSpacing!: number;
  public appIconSize!: number;
  public recentAppsSidebar!: {
    padding: number;
    backgroundColor: string;
    textColor: string;
  };

  public colors!: ColorDefinition;
  public gradients!: {
    use: boolean;
    darken: number;
  };

  configuration: any; // TODO: Set to config interface
  public static getInstance(): ECCoreConfig {
    if (!ECCoreConfig.instance) {
      ECCoreConfig.instance = new ECCoreConfig();
      ECCoreConfig.instance.loadConfig();
    }
    return ECCoreConfig.instance;
  }

  private loadConfig(): void {
    Object.assign(this, defaultConfig);
  }
}
