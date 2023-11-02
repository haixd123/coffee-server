import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-test-ckeditor',
  templateUrl: './test-ckeditor.component.html',
  styleUrls: ['./test-ckeditor.component.scss']
})
export class TestCkeditorComponent implements OnInit {

  public Editor = ClassicEditor;

  constructor() { }

  ngOnInit(): void {
  }

  // ckeditorContent;
  // public model = {
  //   editorData: '<p>Hello, world!</p>'
  // };

  // title ='ckeditor_project';
}
