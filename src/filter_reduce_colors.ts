import { modifyEachValue } from "./mat_utils";

const {cv}=window;

export default function filterReduceColors(imgBefore:opencv.Mat):opencv.Mat{
  const div = 4;
  const th1 = 255 / div;
  const th2 = 255 / (div-1);
  
  const imgAfter=modifyEachValue(imgBefore,(value,channel)=>{
    if(channel==3){
      return value;
    }
    let result=Math.floor(value/th1)*th2;
    if(255<result){
      result=255;
    }
    return result;
  });
  return imgAfter;

}