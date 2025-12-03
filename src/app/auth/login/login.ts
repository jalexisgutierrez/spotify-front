import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, LoginRequest } from '../../services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(private authService: Auth) {}

  submit() {
    this.errorMessage = '';
    this.loading = true;

    const request: LoginRequest = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(request).subscribe({
      next: (res) => {
        this.loading = false;

        // 💾 Guarda el token
        localStorage.setItem('jwt', res.token);

        alert('Login exitoso. Token guardado.');
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Credenciales inválidas.';
      },
    });
  }
}
