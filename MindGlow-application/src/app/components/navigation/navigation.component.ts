import {Component} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatTabNav} from "@angular/material/tabs";
import {MatBadge} from "@angular/material/badge";
import {MatLine} from "@angular/material/core";
import {MatCardAvatar} from "@angular/material/card";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        AsyncPipe,
        NgOptimizedImage,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        MatTabNav,
        MatBadge,
        MatLine,
        MatCardAvatar,
    ]
})
export class NavigationComponent {

    constructor(private router: Router) {
    }

    isCurrentRoute(route: string): boolean {
        return this.router.url.endsWith(route);
    }
}
