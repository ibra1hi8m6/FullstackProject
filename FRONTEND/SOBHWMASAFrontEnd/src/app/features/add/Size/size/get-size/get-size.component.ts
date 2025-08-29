import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SizeService } from '../../../../../shared/services/Sizes/size.service';

@Component({
  selector: 'app-get-size',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './get-size.component.html',
  styleUrl: './get-size.component.css'
})
export class GetSizeComponent {
Sizes: any[]=[]


constructor(private sizeService: SizeService){

}

 ngOnInit(): void {
    this.loadSizes();
  }

loadSizes(){
this.sizeService.GetAllSizes().subscribe(
  (data)=>{
    this.Sizes=data;
    console.log(this.Sizes)
  },
  (error)=>{
      console.error('Error fetching size', error);
    }
)

}
}
