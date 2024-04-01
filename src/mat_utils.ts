

export function modifyEachValue(src:opencv.Mat,callback:(value:number,channel:number)=>number):opencv.Mat{
  if(!src.isContinuous()){
    throw new Error("src is not isContinuous");
  }
  const dst=src.clone();
  for(let row=0;row<src.rows;row++){
    for(let col=0;col<src.cols;col++){
      for(let channel=0;channel<src.channels();channel++){
        const i=row * src.cols * src.channels() + col * src.channels() + channel;
        dst.data[i]=callback(src.data[i],channel);
      }
    }
  }
  return dst;
}

export function modifyEachValueByTwo(src1:opencv.Mat,src2:opencv.Mat,callback:(value1:number,value2:number,channel:number)=>number):opencv.Mat{
  if(!src1.isContinuous()){
    throw new Error("src1 is not isContinuous");
  }
  if(!src2.isContinuous()){
    throw new Error("src2 is not isContinuous");
  }
  if(src1.rows!=src2.rows){
    throw new Error("rows is not equal");
  }
  if(src1.cols!=src2.cols){
    throw new Error("cols is not equal");
  }
  if(src1.channels()!=src2.channels()){
    throw new Error("channels is not equal");
  }
  const dst=src1.clone();
  for(let row=0;row<src1.rows;row++){
    for(let col=0;col<src1.cols;col++){
      for(let channel=0;channel<src1.channels();channel++){
        const i=row * src1.cols * src1.channels() + col * src1.channels() + channel;
        dst.data[i]=callback(src1.data[i],src2.data[i],channel);
      }
    }
  }
  return dst;
}

export function medianInGrayImage(src:opencv.Mat){
  if(src.channels()!=1){
    throw new Error("channels must be 1");
  }
  const grayData=Uint8Array.from(src.data);
  grayData.sort((a,b)=>a-b);
  const half = Math.floor(grayData.length / 2);
  if(grayData.length%2==1){
    return grayData[half];
  }else{
    return (grayData[half-1] + grayData[half])/2;
    
  }


}