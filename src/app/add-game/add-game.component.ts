import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../_services/user.service';
import {Observable} from 'rxjs';
import {Jeu} from '../_models/jeu';
import {GamesService} from '../_services/games.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  games$: Observable<Jeu>;
  game: Jeu;

  readonly categories: string[] = ['---', 'Escape Game', 'Murder Party', 'Jeu de plateau', 'Jeu de cartes',
    'Cartes à jouer', 'Jeu de rôle', 'Jeu d\'ambiance', 'Jeu de lettres', 'Jeu de dés', 'Jeu de tuiles', 'Jeu de pions', 'Jeu de logique', 'Autres'];
  readonly mecaniques: string[] = ['---', 'Abstrait', 'Humour', 'Jeu de plateau', 'Enquêtes & Mystères', 'Antiquité', 'Western', 'Jeu de Cartes', 'Connaissances', 'jeu de tuiles', 'Lettres', 'Politique', 'Dessin', 'Mime', 'Zombies', 'Contes', 'Observation', 'Bande dessinée', 'Animaux', 'Affrontement', 'Commerce', 'Jeu de rôle', 'Chance & Hasard', 'Cuisine', 'Bourse & finances', 'Divers', 'Histoire', 'choix multiples', 'Jeu d\'Ambiance', 'Chiffres', 'Lettres & chiffres'];
  readonly editeurs: string[] = ['jsp', 'alo', 'test'];
  readonly themes: string[] = ['theme1', 'theme2', 'theme3'];
  readonly langues: string[];

  formulaire = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    theme: new FormControl('', [Validators.required]),
    editeur: new FormControl('', [Validators.required]),
    mecanique: new FormControl('', [Validators.required]),
    url_media: new FormControl('', ),
    categorie: new FormControl('', [Validators.required]),
    regles: new FormControl('', [Validators.required]),
    langue: new FormControl('', [Validators.required]),
    nbJoueur: new FormControl('', [Validators.required, Validators.min(2), Validators.max(8)]),
    ageMin: new FormControl('', [Validators.required, Validators.min(1), Validators.max(16)]),
    poid: new FormControl('', [Validators.required, Validators.min(0.100), Validators.max(5.00)]),
    duree: new FormControl('', [Validators.required])

  });

  constructor(private gameService: GamesService, private route: ActivatedRoute) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.games$ = gameService.list();
  }

  ngOnInit(): void {
    this.games$.subscribe(
      game => {
        this.game = game;
        console.log('Le jeu : ', game);
        console.log('La langue du jeu: ', game.langue);

        if (this.langues.indexOf(game.langue) < 0 ) {this.langues.push(game.langue); }
        if (this.editeurs.indexOf(game.editeur) < 0 ) { this.editeurs.push(game.editeur); }
        if (this.categories.indexOf(game.categorie) < 0 ) { this.categories.push(game.categorie); }
        if (this.themes.indexOf(game.theme) < 0 ) { this.themes.push(game.theme); }
      }
    );
    console.log('liste des langues', this.langues);
  }
  get nom(): AbstractControl {
    return this.formulaire.get('nom');
  }

  get description(): AbstractControl {
    return this.formulaire.get('description');
  }

  get theme(): AbstractControl {
    return this.formulaire.get('theme');
  }

  get mecanique(): AbstractControl {
    return this.formulaire.get('mecanique');
  }

  get url_media(): AbstractControl {
    return this.formulaire.get('url_media');
  }

  get categorie(): AbstractControl {
    return this.formulaire.get('categorie');
  }

  get regles(): AbstractControl {
    return this.formulaire.get('regles');
  }

  get langue(): AbstractControl {
    return this.formulaire.get('langue');
  }

  get nbJoueur(): AbstractControl {
    return this.formulaire.get('nbJoueur');
  }

  get ageMin(): AbstractControl {
    return this.formulaire.get('ageMin');
  }

  get poid(): AbstractControl {
    return this.formulaire.get('poid');
  }

  get duree(): AbstractControl {
    return this.formulaire.get('duree');
  }


  onSubmit(): void {
    console.log('J\'envoie : ', this);
  }
}
