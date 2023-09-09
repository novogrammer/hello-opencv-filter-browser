
const {cv}=window;

export default function filterCanny(imgBefore:opencv.Mat):opencv.Mat{
  const imgGray=new cv.Mat();
  cv.cvtColor(imgBefore,imgGray,cv.COLOR_RGBA2GRAY,0);

  const imgAfter=new cv.Mat();
  cv.Canny(imgGray,imgAfter,100,200);
  imgGray.delete();
  return imgAfter;
}