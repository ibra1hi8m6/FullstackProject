import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddressService } from '../../../shared/services/User/address.service';
import { AuthService } from '../../../shared/services/Authentication/Auth/auth.service';


type AddressVm = {
  id: number;
  description: string;
  areaName?: string;
  streetName?: string;
  buildingNumber?: string;
  floorNumber?: string;
  flatNumber?: string;
};

@Component({
  selector: 'app-manage-addresses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-addresses.component.html',
  styleUrl: './manage-addresses.component.css'
})
export class ManageAddressesComponent implements OnInit {
  addresses: AddressVm[] = [];
  userId: string | null = null;

  // edit state
  editingId: number | null = null;
  editModel: AddressVm = {
    id: 0,
    description: '',
    areaName: '',
    streetName: '',
    buildingNumber: '',
    floorNumber: '',
    flatNumber: ''
  };

  constructor(private addressService: AddressService, private authService: AuthService) {}

  ngOnInit(): void {
    const claims = this.authService.getClaims();
    this.userId = claims ? claims.UserID : null;
    if (this.userId) {
      this.loadAddresses();
    }
  }

  loadAddresses() {
    this.addressService.getAddressesByUser(this.userId!).subscribe((res: any) => {
      this.addresses = res;
    });
  }

  startEdit(address: AddressVm) {
    this.editingId = address.id;
    // shallow copy to avoid mutating the list while editing
    this.editModel = { ...address };
  }

  cancelEdit() {
    this.editingId = null;
  }

  saveEdit() {
    if (!this.userId || this.editingId == null) return;

    const dto = {
      description: this.editModel.description,
      areaName: this.editModel.areaName,
      streetName: this.editModel.streetName,
      buildingNumber: this.editModel.buildingNumber,
      floorNumber: this.editModel.floorNumber,
      flatNumber: this.editModel.flatNumber,
      // your backend UpdateAddressAsync expects AddressCreateDto (includes ApplicationUserID)
      applicationUserID: this.userId
    };

    this.addressService.updateAddress(this.editingId, dto).subscribe({
      next: () => {
        this.editingId = null;
        this.loadAddresses();
      },
      error: (err) => {
        console.error('Failed to update address', err);
        alert('Failed to update address.');
      }
    });
  }

  deleteAddress(id: number) {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addressService.deleteAddress(id).subscribe(() => {
        // if we were editing this one, exit edit mode
        if (this.editingId === id) this.editingId = null;
        this.loadAddresses();
      });
    }
  }

  trackById = (_: number, a: AddressVm) => a.id;
}
