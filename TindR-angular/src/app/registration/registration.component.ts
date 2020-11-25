import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      phone_number:[''],
      password: [''],
      confirm: [''],
      birthdate: [''],
      passion: ['']
    })
  }

  ngOnInit(): void {
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append("name", this.form.get('name').value);
    formData.append("email", this.form.get('email').value);
    formData.append("phone_number", this.form.get('phone_number').value);
    formData.append("password", this.form.get('password').value);
    formData.append("confirm", this.form.get('confirm').value);
    formData.append("birthdate", new Date(this.form.get('birthdate').value).getTime());
    formData.append("passion", this.form.get('passion').value);
  
    this.http.post('http://172.31.1.57:8000/api/register', formData)
    .subscribe((response) => console.log(response),
      (error) => console.log(error)
    )
  }
}
