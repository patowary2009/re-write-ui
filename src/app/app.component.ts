import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hida-ui';
  constructor() {
    localStorage.setItem('HIDA-api-token', 'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImFlcmVxdWVzdHNAdGVhbWRyZy5jb20iLCJuYW1lIjoiYWUgcmVxdWVzdCIsInVzZXJuYW1lIjoiYWVyZXF1ZXN0c0B0ZWFtZHJnLmNvbSIsInRlbmFudElkIjoiaGlkYSIsImNvbXBhbnkiOiJBJkUgVGVzdGluZyBBY2NvdW50IiwiY2xpZW50SWQiOiI3Iiwicm9sZXMiOlsiRGlzdHJpYnV0b3IiXSwiaWF0IjoxNjc2MDMxNDkzfQ.nyD73RcG-m9YyDGpgs_tvjZ-8Mvm259hcbPjg2HzIzNt55fyOGNV6P0-uXv2I0mIgMEIKb2ek6xBsrPWO_NvDQ')
  }
}
