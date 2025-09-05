import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

}
