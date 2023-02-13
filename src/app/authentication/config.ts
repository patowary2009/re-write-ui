import { AppConfig } from '../config/app_config';

export class Config {
  apiConfig: any;

  constructor() {
    this.setConfig();
  }

  setConfig(): void {
    this.apiConfig = {
      apiUrl: AppConfig.apiUrl(),
      endPoints: {
        login: 'login',
        logout: 'logOut',
        ping: 'ping',
      },
      token: 'jwt-token',
    };
  }

  getConfig(): any {
    return this.apiConfig;
  }
}
