import { medianInGrayImage } from "./mat_utils";

const {cv}=window;

export default function filterCanny(imgBefore:opencv.Mat):opencv.Mat{
  const imgGray=new cv.Mat();
  cv.cvtColor(imgBefore,imgGray,cv.COLOR_RGBA2GRAY,0);
  const sigma = 0.33;
  const med=medianInGrayImage(imgGray);
  const th1 = Math.floor(Math.max(0, (1-sigma)*med))
  const th2 = Math.floor(Math.min(255, (1+sigma)*med))  

  

  const imgAfterGray=new cv.Mat();
  cv.Canny(imgGray,imgAfterGray,th1,th2);
  const imgAfter=new cv.Mat();
  cv.cvtColor(imgAfterGray,imgAfter,cv.COLOR_GRAY2RGBA,0);
  imgAfterGray.delete();
  imgGray.delete();
  return imgAfter;
}