
const {cv}=window;

export default function filterBlur(imgBefore:opencv.Mat):opencv.Mat{
  const imgAfter=new cv.Mat();
  const size=new cv.Size(5,5);
  cv.GaussianBlur(imgBefore,imgAfter,size,0);
  return imgAfter;

}