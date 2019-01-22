import { Component, OnInit } from '@angular/core';
import Business from '../Business';
import { BusinessService } from '../business.service';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {

  businesses: Business[];

  constructor(private bs: BusinessService) { }

  ngOnInit() {
    this.bs
      .getBusinesses()
      .subscribe((data: Business[]) => {
        this.businesses = data;
    });
  }

  updateBusiness(person_name, business_name, business_gst_number) {
    this.route.params.subscribe(params => {
       this.bs.updateBusiness(person_name, business_name, business_gst_number, params['id']);
       this.router.navigate(['business']);
 });
}
