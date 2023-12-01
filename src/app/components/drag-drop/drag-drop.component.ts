import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadService } from '../../services/image-upload.service';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../modules/material/material.module';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-drag-drop',
  standalone: true,
  imports: [CommonModule, MaterialModule, ResultsComponent],
  providers: [ImageUploadService, HttpClient],
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.css'
})
export class DragDropComponent {
  image: string | ArrayBuffer | null = null;
  showResults: boolean = false;
  buttonText: string = "Analyze";
  constructor(private imageUploadService: ImageUploadService) { }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    this.handleFile(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    this.handleFile(file);
  }

  handleFile(file: File | undefined): void {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result;
      };
    }
  }

  saveImage(): void {
    this.buttonText = "Analyze Another";
    if (this.image) {
      this.showResults = true;
      const file = this.dataURItoFile(this.image as string, 'testimage.png');
      this.imageUploadService.uploadImage(file).then((response) => {
        console.log('Image uploaded successfully!', response);
        this.image = null; // To reset the image after upload
      }).catch((error) => {
        console.error('Error uploading image:', JSON.stringify(error));
      });
    }
  }
  reload(): void {
    window.location.reload();
  }
  dataURItoFile(dataURI: string, filename: string): File {
    const arr = dataURI.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

}
