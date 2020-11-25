import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append("email", this.form.get('email').value);
    formData.append("password", this.form.get('password').value);
    console.log(this.form.value);
    this.http.post('http://172.31.1.57:8000/api/login', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }
}
