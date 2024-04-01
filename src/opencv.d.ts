
namespace opencv {
  class Mat{
    constructor();
    constructor(rows:number,cols:number,type:number);
    clone():Mat;
    isContinuous():boolean;
    channels():number;
    delete();
    rows:number;
    cols:number;
    data:number[];
    static ones(rows:number,cols:number,type:number):Mat;
  }
  class Point{
    constructor(x:number,y:number);
  }
  class Size{
    constructor(width:number,height:number);
  }
  class Scalar{
  }
  class VideoCapture{
    constructor(player:HTMLVideoElement);
    read(output:Mat):boolean;
  }
  interface CV{
    Mat:typeof Mat;
    Point:typeof Point;
    Size:typeof Size;
    VideoCapture:typeof VideoCapture;
    CV_8UC4:number;
    CV_8U:number;
    COLOR_RGBA2GRAY:number;
    COLOR_GRAY2RGBA:number;
    BORDER_CONSTANT:number;
    BORDER_DEFAULT:number;
    imshow(HTMLCanvasElement,Mat):void;
    cvtColor(src:Mat,dst:Mat,code:number,dstCn:number);
    Canny(src:Mat,dst:Mat,threthold1:number,threthold2:number):void;
    morphologyDefaultBorderValue():Scalar;
    dilate(src:Mat,dst:Mat,kernel:Mat,anchor:Point,iterations:number,borderType:number,borderValue:Scalar):void;
    GaussianBlur(src:Mat,dst:Mat,ksize:Size,sigmaX:number,sigmaY:number=0,borderType:number=BORDER_DEFAULT):void;
    bitwise_not(src:Mat,dst:Mat):void;
    bitwise_or(src1:Mat,src2:Mat,dst:Mat):void;
    bitwise_and(src1:Mat,src2:Mat,dst:Mat):void;
  }

}

declare var cv:opencv.CV;