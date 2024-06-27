import { Component } from '@angular/core';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faSpa } from '@fortawesome/free-solid-svg-icons';
import { faFeather } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  faSeedling = faSeedling;
  faFire = faFire;
  faLeaf = faLeaf
  faSpa = faSpa;
  faFeather = faFeather;

}
