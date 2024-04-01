
const {cv}=window;

export default function filterDilate(imgBefore:opencv.Mat):opencv.Mat{

  const imgAfter=new cv.Mat();
  const M = cv.Mat.ones(3, 3, cv.CV_8U);
  const anchor = new cv.Point(-1, -1);
  const borderValue=cv.morphologyDefaultBorderValue();
  cv.dilate(imgBefore, imgAfter, M, anchor, 1, cv.BORDER_CONSTANT, borderValue);
  M.delete();
  return imgAfter;
}