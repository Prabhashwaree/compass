import { Directive, HostListener, HostBinding, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[appDragDrop]',
})


export class DragAndDropDirective {
    constructor() {}

  @Input() private allowed_extensions: Array<string> = [];
  @Output() private filesChangeEmiter: EventEmitter<File[]> = new EventEmitter();
  @Output() private filesInvalidEmiter: EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') private background:any;

  @HostListener('dragover', ['$event']) public onDragOver(evt:any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#d6f3f6';
  }

  
  @HostListener('dragleave', ['$events']) public onDragLeave(evt:any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#b9eaf1';
  }

  @HostListener('drop', ['$event']) public onDrop(evt:any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#b9eaf1';
    const files = evt.dataTransfer.files;
    const valid_files: Array<File> = [];
    const invalid_files: Array<File> = [];
    if (files.length > 0) {
      Array.from(files).forEach((file: any) => {
        const ext = file.name.split('.')[file.name.split('.').length - 1];
        if (this.allowed_extensions.lastIndexOf(ext) !== -1) {
          valid_files.push(file);
        } else {
          invalid_files.push(file);
        }
      });
      this.filesInvalidEmiter.emit(invalid_files);
      if (valid_files.length === 0) {
        return;
      }
      this.filesChangeEmiter.emit(valid_files);
    }
  }

}
