
namespace opencv {
  class Mat{
    constructor();
    constructor(rows:number,cols:number,type:number);
    clone():Mat;
    delete();
  }
  class VideoCapture{
    constructor(player:HTMLVideoElement);
    read(output:Mat):boolean;
  }
  interface CV{
    Mat:typeof Mat;
    VideoCapture:typeof VideoCapture;
    CV_8UC4:number;
    COLOR_RGBA2GRAY:number;
    imshow(HTMLCanvasElement,Mat):void;
    cvtColor(src:Mat,dst:Mat,code:number,dstCn:number);
    Canny(src:Mat,dst:Mat,threthold1:number,threthold2:number):void;
  }

}

declare var cv:opencv.CV;