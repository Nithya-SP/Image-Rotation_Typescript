import { Component } from '@angular/core';
import { ImageDataRotator } from './ImageDataRotator';

import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rotate';
  arr1:any;
  uploader:any;
  shortLink: string = "";
      loading: boolean = false; // Flag variable
      // file: any ;
  AppComponent() {

  }
  ngOnInit() {

this.files = [];
// image.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==";
// const img = new Image();
// img.crossOrigin = "anonymous";
// img.src = "./assets/rhino.jpg";

// Object canvas:HTMLCanvasElement = document.getElementById("canvas");
// Object ctx:CanvasRenderingContext2D = canvas.getContext("2d");
// img.addEventListener("load", () => {
//   ctx.drawImage(img, 0, 0);
//   img.style.display = "none";
// });
    const arr = [0,0,0,255,0,0,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255];
    this.arr1 = ImageDataRotator.rotate(new ImageData(new Uint8ClampedArray(arr), 2, 3), 90);
  }
  // Uint8ArrayFromBase64(base64)
  // {
  //     return Uint8Array.from(window.atob(base64), (v) => v.charCodeAt(0));
  // }
  convertDataURIToBinary(dataURI:any){
    var i:number;

      var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
      var base64 = dataURI.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var array = new Uint8Array(new ArrayBuffer(rawLength));

      for(i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
 }


  onChange(e: Event) {
    const target = e.target as HTMLInputElement;

   }
  //  convertDataURIToBinary(dataURI:any) {
  //     var i:number;
  //
  //       var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
  //       var base64 = dataURI.substring(base64Index);
  //       var raw = window.atob(base64);
  //       var rawLength = raw.length;
  //       var array = new Uint8Array(new ArrayBuffer(rawLength));
  //
  //       for(i = 0; i < rawLength; i++) {
  //         array[i] = raw.charCodeAt(i);
  //       }
  //       return array;
  // }

  public files: any[];

  onFileChanged(event: any) {
    // this.files = event.target.files;
    // console.log(this.files)
    let file = event.target.files[0];
    let reader = new FileReader();
    let baseValue:any;
    reader.readAsDataURL(file);
    reader.onload = function () {
  //me.modelvalue = reader.result;
    baseValue=reader.result;
    console.log(reader.result);

      // var basetest="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
      var base64Index = baseValue.indexOf(';base64,') + ';base64,'.length;
      var base64 = baseValue.substring(base64Index);

      // const byteCharacters = atob(base64);
      // const byteNumbers = new Array(byteCharacters.length);
      // for (let i = 0; i < byteCharacters.length; i++) {
      //     byteNumbers[i] = byteCharacters.charCodeAt(i);
      // }
      // const byteArray = new Uint8ClampedArray(byteNumbers);
      //
      // console.log(byteArray,'array');
      // let arr1 = ImageDataRotator.rotate(new ImageData(byteArray, 2,3), 60);

          var binstr = atob(base64);
         var buf = new Uint8Array(binstr.length);
         Array.prototype.forEach.call(binstr, function (ch, i) {
           buf[i] = ch.charCodeAt(0);
         });
         console.log(buf,'array');

         const arr2 = [0,0,0,255,0,0,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255];
         // const arr3 = [0,0,0,255,0,0,0,255,255,255,255,255,255,255,0,255,255,255,255,255,255,255,255,255];

         let arr1 = ImageDataRotator.rotate(new ImageData(new Uint8ClampedArray(buf),2,3), 90);
         console.log(arr1,'array');



      // var raw = window.atob(base64);
      // var rawLength = raw.length;
      // var array = new Uint8Array(new ArrayBuffer(rawLength));
      // console.log(array,'array');
      // let arr1 = ImageDataRotator.rotate(new ImageData(new Uint8ClampedArray(array), 2,3), 60);
      // console.log(arr1,'array');

};


    // const reader = new FileReader();
    // let byteArray;
    // var object= new AppComponent();
    // reader.addEventListener("loadend", function (this) {
    //   // convert image file to base64 string
    //   console.log('base64', reader.result);
    //   // preview.src = reader.result;
    //   // object.convertDataURIToBinary(reader.result);
    //   // preview. = reader.result;
    //
    //   byteArray = object.convertDataURIToBinary(reader.result);
    //   console.log('byte array', byteArray);
    // }, false);
  }


  fileChangeListener($event : any) {


    let image = new Image();
    var file:File = $event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    let byteArray;
    var object= new AppComponent();
    reader.addEventListener("loadend", function (this) {
      // convert image file to base64 string
      console.log('base64', reader.result);
      // preview.src = reader.result;
      // object.convertDataURIToBinary(reader.result);
      // preview. = reader.result;

      byteArray = object.convertDataURIToBinary(reader.result);
      console.log('byte array', byteArray);
    }, false);
}

onUpload(event: Event) {
  const input = document.getElementById('avatar1');

  const target = event.currentTarget as HTMLInputElement;
  console.log(target)

  const file =target.files;
  console.log(file);
  const reader = new FileReader();
  let byteArray;
  //
  reader.addEventListener("loadend", function () {
    // convert image file to base64 string
    console.log('base64', reader.result);

    // preview. = reader.result;
    // byteArray = convertDataURIToBinary(reader.result);
    // console.log('byte array', byteArray);
  }, false);
  //
  // if (file) {
  //   reader.readAsDataURL(file);
  // }
}


// convertDataURIToBinary(dataURI) {
//   var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
//   var base64 = dataURI.substring(base64Index);
//   var raw = window.atob(base64);
//   var rawLength = raw.length;
//   var array = new Uint8Array(new ArrayBuffer(rawLength));
//
//   for(i = 0; i < rawLength; i++) {
//       array[i] = raw.charCodeAt(i);
//   }
//   return array;
// }
}
