import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DndDirective } from '../../../common-ui/directives/dnd.directive';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [FormsModule, DndDirective],

  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {

  preview = signal<string>('')
  avatar: File | null = null


  fileBrowserHandler(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file: File = element.files[0];
      this.proccessFile(file)
    }

  }

  onFileDropped(file: File) {
    this.proccessFile(file)
  }

  proccessFile(file: File | undefined) {
    if (!file || !file.type.match('image')) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      this.preview.set(e.target?.result as string);
    }
    reader.readAsDataURL(file);

    this.avatar = file;
  }
}
