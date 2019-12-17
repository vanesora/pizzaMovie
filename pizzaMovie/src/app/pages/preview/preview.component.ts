import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  constructor(
    private router: Router,
    public storageService: StorageService,
  ) { }

  ngOnInit() {
  }

  registro() {
    this.storageService.setValue('page', 'register')
    this.router.navigate(['/register']);
  }
}
