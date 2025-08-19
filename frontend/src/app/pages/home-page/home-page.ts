import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReclamationService, ReclamationData } from '../../services/reclamation';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss']
})
export class HomePage {
  reclamation: ReclamationData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private reclamationService: ReclamationService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.reclamationService.addReclamation(this.reclamation).subscribe({
        next: (res) => {
          alert('Réclamation envoyée avec succès !');
          form.resetForm();
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de l\'envoi de la réclamation');
        }
      });
    }
  }
}
