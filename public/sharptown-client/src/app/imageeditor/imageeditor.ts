import { Component } from '@angular/core'
import { MatButton } from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'

@Component({
  selector: 'app-imageeditor',
  imports: [MatButton, MatCardModule],
  templateUrl: './imageeditor.html',
  styleUrl: './imageeditor.css',
})
export class Imageeditor {

}
