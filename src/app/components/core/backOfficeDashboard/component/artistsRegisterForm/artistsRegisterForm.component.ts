import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UserDTO } from 'src/app/common/dto/userDTO';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { ReportDataService } from 'src/app/service/report-data-service/report-data.service';


@Component({
  selector: 'app-artistsRegisterForm',
  templateUrl: './artistsRegisterForm.component.html',
  styleUrls: ['./artistsRegisterForm.component.scss']
})
export class ArtistsRegisterFormComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor( private formBuilder: FormBuilder,private authService:AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      venderName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,]),
      contact: new FormControl('', [Validators.required]),
      nIC: new FormControl('', [Validators.required,]),
      venderNo: new FormControl('', [Validators.required,]),
      alternativeName: new FormControl('', [Validators.required,]),
      address: new FormControl('', [Validators.required,]),
      Username: new FormControl(''),
      password: new FormControl(''),
    });

    this.registerForm.controls['Username'].disable();
    this.registerForm.controls['password'].disable();
  }

  onSubmit(){
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log('form invalid');
      console.log(this.registerForm);
      return;
    }
    this.saveArtistRegister();
  }

  saveArtistRegister(){
    let userDTO= new UserDTO();

    userDTO.setVenderName(this.registerForm.controls['venderName'].value || '');
    userDTO.setEmail(this.registerForm.controls['email'].value || '');
    userDTO.setContact(this.registerForm.controls['contact'].value || '');
    userDTO.setNic(this.registerForm.controls['nIC'].value || '');
    userDTO.setVenderNo(this.registerForm.controls['venderNo'].value || '');
    userDTO.setAlternativeName(this.registerForm.controls['alternativeName'].value || '');
    userDTO.setAddress(this.registerForm.controls['address'].value || '');
    userDTO.setUsername(this.registerForm.controls['Username'].value || '');
    userDTO.setPassword(this.registerForm.controls['password'].value || '');


    let resp = this.authService.saveUser(userDTO);
        resp.subscribe((data: any) => {

          alert(data.message +"\n username :"+data.data.username +"\n password :"+data.data.password);

          this.registerForm.controls['Username'].setValue(data.data.username);
          this.registerForm.controls['password'].setValue(data.data.password);

          this.clear();
        })
  }

  clear(){

    this.registerForm.controls['venderName'].setValue('');
    this.registerForm.controls['email'].setValue('');
    this.registerForm.controls['contact'].setValue('');
    this.registerForm.controls['nIC'].setValue('');
    this.registerForm.controls['venderNo'].setValue('');
    this.registerForm.controls['alternativeName'].setValue('');
    this.registerForm.controls['address'].setValue('');

    this.registerForm.controls['venderName'].setErrors(null);
    this.registerForm.controls['email'].setErrors(null);
    this.registerForm.controls['contact'].setErrors(null);
    this.registerForm.controls['nIC'].setErrors(null);
    this.registerForm.controls['venderNo'].setErrors(null);
    this.registerForm.controls['alternativeName'].setErrors(null);
    this.registerForm.controls['address'].setErrors(null);
    // this.registerForm.controls['Username'].setValue('');
    // this.registerForm.controls['password'].setValue('');
    
  }

  

}
