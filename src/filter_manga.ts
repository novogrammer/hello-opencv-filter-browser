import filterBlur from "./filter_blur";
import filterCanny from "./filter_canny";
import filterDilate from "./filter_dilate";
import filterReduceColors from "./filter_reduce_colors";
import { modifyEachValueByTwo } from "./mat_utils";

// const {cv}=window;

export default function filterManga(imgBefore:opencv.Mat):opencv.Mat{
  const imgCanny = filterCanny(imgBefore);
  const imgCannyDilate = filterDilate(imgCanny);
  imgCanny.delete();
  const imgBlur=filterBlur(imgBefore);
  const imgBlurReduceColors=filterReduceColors(imgBlur);
  imgBlur.delete();

  const imgAfter=modifyEachValueByTwo(imgCannyDilate,imgBlurReduceColors,(value1,value2,channel)=>{
    if(channel==3){
      return value1;
    }
    if(value1==255){
      return 0;
    }
    return value2;
  });
  imgCannyDilate.delete();
  imgBlurReduceColors.delete();
  // img_after = np.where(img_canny_dilate==255, 255-img_canny_dilate, img_blur_reduce_colors)

  return imgAfter;
}