import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../modules/material/material.module';
import { ImageUploadService } from '../../services/image-upload.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  providers: [ImageUploadService, HttpClient],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
  metadata: any = null;
  brand: string | null = null;
  colors: string[] | [] = [];
  barcode: string | null = null;

  resultsData: { name: string, result: string | string[] | null }[] = [];
  displayedColumns: string[] = ['variable', 'result'];

  constructor(private imageUploadService: ImageUploadService) { }

  ngOnInit() {
    this.fetchMetadata();
  }

  setupTableData() {
    if (this.brand !== null) {
      this.resultsData.push({ name: 'Brand', result: this.brand });
    }
    if (this.colors.length > 0) {
      this.resultsData.push({ name: 'Color', result: this.colors });
    }
    if (this.barcode !== "null") {
      this.resultsData.push({ name: 'Barcode', result: this.barcode });
    }
  }

  async fetchMetadata(): Promise<void> {
    try {
      this.metadata = await this.imageUploadService.getMetadata();
      console.log(this.metadata);
      this.brand = this.metadata.brand;
      this.barcode = this.metadata.barcode;
      this.colors = this.metadata.colors;
      this.setupTableData();
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  }
}
