export class AppConfig {

  public static tenantId = 'HIDA';

  public static appEnvData =
    window[<any> 'env'] && window[<any> 'env'][<any> 'appEnv'] ? window[<any> 'env'][<any> 'appEnv'] : '';

  public static appEnvMapping: { [key: string]: string } = {
    dev: 'dev',
    snapshot: 'dev',
    stable: 'stable',
    production: 'production',
    qa: 'qa',
    staging: 'staging',
    prod: 'prod'
  };

  public static appEnvApiUrlMapping: { [key: string]: string } = {
    local: 'http://localhost:8080/DatavizApiGateway/',
    dev: 'https://data-viz.dev.drg-understand.aws.clarivate.net/DatavizApiGateway/',
    stable: 'https://data-viz.dev.drg-understand.aws.clarivate.net/DatavizApiGateway/',
    production: 'https://data-viz.decisionresourcesgroup.com/DatavizApiGateway/',
    staging: 'https://data-viz-staging.dev.drg-understand.aws.clarivate.net/DatavizApiGateway/',
    prod: 'https://data-viz.decisionresourcesgroup.com/DatavizApiGateway/',
  };

  public static appEnv: any = 'dev';

  public static fetchAppEnv(): string {
    this.appEnv = this.appEnvData;
    return this.appEnvMapping[this.appEnv] || 'dev';
  }

  public static environmentFileConstant(): string {
    return ['environment', this.fetchAppEnv(), 'json']
      .filter(Boolean)
      .join('.');
  }

  public static apiUrl(): string {
    const appEnv = this.appEnvData === '' ?
      'local' : this.fetchAppEnv();
    return this.appEnvApiUrlMapping['dev'];
  }
}
