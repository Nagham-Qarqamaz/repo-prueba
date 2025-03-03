import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: false,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    isHamburgerOpen: boolean = false;

    constructor(private elementRef: ElementRef) { }

    public closeHamburger(): void {
        this.isHamburgerOpen = false;
    }

    public toggleHamburger(): void {
        this.isHamburgerOpen = !this.isHamburgerOpen;
    }

    @HostListener('document:click', ['$event'])
    clickOutside(event: Event) {
        if (this.isHamburgerOpen && !this.elementRef.nativeElement.contains(event.target)) {
            this.isHamburgerOpen = false;
        }
    }
}
