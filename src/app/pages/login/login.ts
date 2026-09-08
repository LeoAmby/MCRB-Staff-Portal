import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})

export class Login {

  // private http = inject(HttpClient);
  // private router = inject(Router);

  loginObj: any = {
    "userName": "",
    "password": ""
  }
  router = inject(Router);


  constructor(private http: HttpClient) {

  }
  onLogin(){
    debugger;
    this.http.post(environment.API_URL + 'login', this.loginObj).subscribe ({
      next: (response:any)=>{
        console.log('API respose:', response);
        if (response.result){
          alert("user found")
          localStorage.setItem('emp_user', JSON.stringify(response.data));
          this.router.navigateByUrl("/admin/dashboard")

        }else {
          alert(response.message);
        }
      },
      error: (err:any)=>{ 
        console.error('API Error:', err)
        alert("API Error")
      }
    })
  }
}
