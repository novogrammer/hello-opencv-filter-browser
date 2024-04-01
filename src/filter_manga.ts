import filterBlur from "./filter_blur";
import filterCanny from "./filter_canny";
import filterDilate from "./filter_dilate";
import filterReduceColors from "./filter_reduce_colors";

const {cv}=window;

export default function filterManga(imgBefore:opencv.Mat):opencv.Mat{
  const imgCanny = filterCanny(imgBefore);
  const imgCannyDilate = filterDilate(imgCanny);
  imgCanny.delete();
  const imgBlur=filterBlur(imgBefore);
  const imgBlurReduceColors=filterReduceColors(imgBlur);
  imgBlur.delete();

  const imgCannyDilateGray=new cv.Mat();
  cv.cvtColor(imgCannyDilate,imgCannyDilateGray,cv.COLOR_RGBA2GRAY,0);
  imgCannyDilate.delete();

  const imgCannyDilateGrayNot=new cv.Mat();
  cv.bitwise_not(imgCannyDilateGray,imgCannyDilateGrayNot);
  const imgCannyDilateNot=new cv.Mat();
  cv.cvtColor(imgCannyDilateGrayNot,imgCannyDilateNot,cv.COLOR_GRAY2RGBA,0);

  const imgAfter=new cv.Mat();
  cv.bitwise_and(imgCannyDilateNot,imgBlurReduceColors,imgAfter);

  imgCannyDilateNot.delete();
  imgBlurReduceColors.delete();
  // img_after = np.where(img_canny_dilate==255, 255-img_canny_dilate, img_blur_reduce_colors)

  return imgAfter;
}