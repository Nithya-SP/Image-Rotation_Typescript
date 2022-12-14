enum angles {
    None = 0,
    RhsOnce = 90,
    RhsTwice = 180,
    RhsTrice = 270,
    RhsFull = 360,
    LhsOnce = -90,
    LhsTwice = -180,
    LhsTrice = -270,
    LhsFull = -360,
  }

  const rotate90Angles = Object.freeze([angles.RhsOnce, angles.LhsTrice]);
  const rotate180Angles = Object.freeze([angles.RhsTwice, angles.LhsTwice]);
  const rotate270Angles = Object.freeze([angles.RhsTrice, angles.LhsOnce]);
  const noopAngles = Object.freeze([angles.None, angles.RhsFull, angles.LhsFull]);

  declare let ImageData: {
    prototype: ImageData;
    new (width: number, height: number): ImageData;
    new (array: Uint8ClampedArray, width: number, height?: number): ImageData;
  };

  class PixelArrayRotator {
    pixelArray: Uint8Array;
    width: number;
    heigth: number;
    rotatedWidth = 0;
    rotatedHeigth = 0;

    constructor(data: Uint8Array, w: number, h: number) {
      this.pixelArray = data;
      this.width = w;
      this.heigth = h;
    }

    getPixelStartIndexForCoord(x: number, y: number) {
      return (x + y * this.width) * 4;
    }

    private rotate90(): Uint8Array {
      let index: number;
      const rotatedArray = [];

      for (let x = 0; x < this.width; x += 1) {
        for (let y = this.heigth - 1; y >= 0; y -= 1) {
          index = this.getPixelStartIndexForCoord(x, y);
          rotatedArray.push(this.pixelArray[index]);
          rotatedArray.push(this.pixelArray[index + 1]);
          rotatedArray.push(this.pixelArray[index + 2]);
          rotatedArray.push(this.pixelArray[index + 3]);
        }
      }

      return new Uint8Array(rotatedArray);
    }

    private rotate180(): Uint8Array {
      const rotatedArray = this.rotate(90);
      return new PixelArrayRotator(
        rotatedArray,
        this.rotatedWidth,
        this.rotatedHeigth
      ).rotate(90);
    }

    private rotate270(): Uint8Array {
      let index: number;
      const rotatedArray = [];

      for (let x = 0; x < this.width; x += 1) {
        for (let y = 0; y < this.heigth; y += 1) {
          index = this.getPixelStartIndexForCoord(x, y);
          rotatedArray.push(this.pixelArray[index]);
          rotatedArray.push(this.pixelArray[index + 1]);
          rotatedArray.push(this.pixelArray[index + 2]);
          rotatedArray.push(this.pixelArray[index + 3]);
        }
      }

      return new Uint8Array(rotatedArray);
    }
    rotate(degrees = 90): Uint8Array {
      if (!(degrees in angles)) {
        throw new Error(
          `Invalid input; degrees must be in ${Object.values(angles)}`
        );
      }

      if (rotate180Angles.includes(degrees) || noopAngles.includes(degrees)) {
        this.rotatedWidth = this.width;
        this.rotatedHeigth = this.heigth;
      } else if (
        rotate90Angles.includes(degrees) ||
        rotate270Angles.includes(degrees)
      ) {
        this.rotatedWidth = this.heigth;
        this.rotatedHeigth = this.width;
      }

      if (rotate90Angles.includes(degrees)) {
        return this.rotate90();
      }
      if (rotate180Angles.includes(degrees)) {
        return this.rotate180();
      }
      if (rotate270Angles.includes(degrees)) {
        return this.rotate270();
      }

      return this.pixelArray;
    }
  }

  class ImageDataRotator {
    static rotate(image: ImageData, angle: number): ImageData {
      const pixelArrayRotator = new PixelArrayRotator(
        new Uint8Array(Array.from(image.data)),
        image.width,
        image.height
      );
      const rotatedArray = new Uint8ClampedArray(pixelArrayRotator.rotate(angle));

      return new ImageData(
        rotatedArray,
        pixelArrayRotator.rotatedWidth,
        pixelArrayRotator.rotatedHeigth
      );
    }
  }
  // https://stackoverflow.com/questions/50633679/rotating-a-1d-rgba-array

  export { angles, PixelArrayRotator, ImageDataRotator };
