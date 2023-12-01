import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  constructor(private http: HttpClient) { }

  async uploadImage(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const uploadUrl = 'http://localhost:5000/upload';

    try {
      const response = await firstValueFrom(this.http.post(uploadUrl, formData));
      return response;
    } catch (error) {
      throw new Error('Error uploading image: ' + error);
    }
  }

  async getMetadata(): Promise<any> {
    const metadataUrl = 'http://localhost:5000/metadata';

    try {
      const response = await firstValueFrom(this.http.get(metadataUrl));
      return response;
    } catch (error) {
      throw new Error('Error fetching metadata: ' + error);
    }
  }
}
