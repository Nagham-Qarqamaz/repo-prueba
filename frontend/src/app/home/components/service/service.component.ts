import { Component, Input } from '@angular/core';

@Component({
    selector: 'service',
    standalone: false,
    templateUrl: './service.component.html',
    styleUrl: './service.component.css'
})
export class ServiceComponent {
    @Input() image: string = '';
    @Input() title: string = '';
    @Input() description: string = '';
}
