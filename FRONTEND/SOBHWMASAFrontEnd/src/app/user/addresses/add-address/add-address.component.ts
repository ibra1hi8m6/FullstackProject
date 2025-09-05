import { Component } from '@angular/core';
import { AddressService } from '../../../shared/services/User/address.service';
import { AuthService } from '../../../shared/services/Authentication/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css'
})
export class AddAddressComponent {
 description = '';
  areaName = '';
  streetName = '';
  buildingNumber = '';
  floorNumber = '';
  flatNumber = '';

  constructor(private addressService: AddressService, private authService: AuthService) {}

  saveAddress() {
    const claims = this.authService.getClaims();
    const dto = {
      description: this.description,
      areaName: this.areaName,
      streetName: this.streetName,
      buildingNumber: this.buildingNumber,
      floorNumber: this.floorNumber,
      flatNumber: this.flatNumber,
      applicationUserID: claims.UserID
    };

    this.addressService.createAddress(dto).subscribe({
      next: () => alert('Address saved successfully'),
      error: (err) => console.error('Failed to save address', err)
    });
  }
}
