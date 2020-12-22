import { Component, OnInit } from '@angular/core';
import {Library} from '../library';
// @ts-ignore
import * as libraries from '../listOfLibraries.json';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  public libraryList: Library[] = (libraries as any).default;

  constructor() { }

  ngOnInit(): void {
  }

}
