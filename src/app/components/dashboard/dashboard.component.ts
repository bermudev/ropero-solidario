import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  isMobile = false;
  endpoint: string = environment.API_BASE_URL;
  apiStatusCode = "Offline"

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public authService: AuthService,
    private http: HttpClient
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 991;

    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };

    // The object {observe: 'response'} is what makes the full response object available.
    this.http
      .get(`${this.endpoint}/health`, { observe: 'response' })
      .subscribe((response) => {
        // access status:
        //console.log(response.status);
        // or any other header:
        //console.log(response.headers.get('X-Custom-Header'));

        if (response.status === 200){
          this.apiStatusCode = "Online";
        }
      });
  }

  logout() {
    this.authService.doLogout();
  }
}
