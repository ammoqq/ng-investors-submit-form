// create.component.ts

import { Component, OnInit } from '@angular/core';
import { ShareService } from '../share.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import {Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Canada","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine", "United Arab Emirates", "United States of America", "United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  private documentFrontId = '';
  private documentBackId = '';
  angForm: FormGroup;
  progressCompleted1 = false;
  progressCompleted2 = false;
  uploadProgress1: Observable<number>;
  uploadProgress2: Observable<number>;


  constructor(private shareservice: ShareService, private fb: FormBuilder, private database: AngularFirestore, private storage: AngularFireStorage) {

    this.createForm();
   }
  createForm() {
    this.angForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      address1: ['', Validators.required ],
      address2: ['', Validators.required ],
      zipCode: ['', Validators.required ],
      city: ['', Validators.required ],
      state: ['', Validators.required ],
      country: ['', Validators.required ]
   });
  }

  onFile1Changed(event) {
    this.documentFrontId = Math.random().toString(36).substring(2);
    const ref = this.storage.ref(this.documentFrontId);
    const task = ref.put(event.target.files[0]);
    this.uploadProgress1 = task.snapshotChanges()
      .pipe(
        map(s => (s.bytesTransferred / s.totalBytes) * 100),
        filter(progress => progress === 100),
        tap(() => this.progressCompleted1 = true)
      );
  }

  onFile2Changed(event) {
    this.documentBackId = Math.random().toString(36).substring(2);
    const ref = this.storage.ref(this.documentBackId);
    const task = ref.put(event.target.files[0]);
    this.uploadProgress2 = task.snapshotChanges()
      .pipe(
        map(s => (s.bytesTransferred / s.totalBytes) * 100),
        filter(progress => progress === 100),
        tap(() => this.progressCompleted2 = true)
      );
  }

  submitInvestorToVerify() {
    const body = Object.assign({}, this.angForm.value, { documentFrontId: this.documentFrontId, documentBackId: this.documentBackId });
    this.shareservice.submitInvestorToVerify(body);
  }
  ngOnInit() {
  }
}
