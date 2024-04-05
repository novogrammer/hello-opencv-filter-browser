

export function modifyEachValue(src:opencv.Mat,callback:(value:number,channel:number)=>number):opencv.Mat{
  if(!src.isContinuous()){
    throw new Error("src is not isContinuous");
  }
  
  const srcData=new Uint8Array(src.data.length);
  const dstData=new Uint8Array(src.data.length);

  srcData.set(src.data);

  const channels=src.channels();
  for(let i=0;i<srcData.length;i++){
    const channel=i%channels;
    dstData[i]=callback(srcData[i],channel);
  }
  const dst=src.clone();
  dst.data.set(dstData);
  
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
  const src1Data=new Uint8Array(src1.data.length);
  const src2Data=new Uint8Array(src2.data.length);
  const dstData=new Uint8Array(src1.data.length);
  src1Data.set(src1.data);
  src2Data.set(src2.data);
  const channels=src1.channels();
  for(let i=0;i<dstData.length;i++){
    const channel=i%channels;
    dstData[i]=callback(src1Data[i],src2Data[i],channel);
  }
  const dst=src1.clone();
  dst.data.set(dstData);
  return dst;
}

export function medianInGrayImage(src:opencv.Mat){
  if(src.channels()!=1){
    throw new Error("channels must be 1");
  }
  const grayCountList = Array(256).fill(0);
  for(let gray of src.data){
    if(255<gray || gray<0){
      throw new Error("gray is out of bounds");
    }
    grayCountList[gray]+=1;
  }
  const half1 = Math.floor(src.data.length / 2);
  let half2=half1;
  if(src.data.length%2==0){
    half2=half1-1;
  }
  let halfRemain1=half1;
  let median1=0;
  for(let i=0;i<grayCountList.length;i++){
    median1=i;
    halfRemain1-=grayCountList[i];
    if(halfRemain1<=0){
      break;
    }
  }
  let halfRemain2=half2;
  let median2=0;
  for(let i=0;i<grayCountList.length;i++){
    median2=i;
    halfRemain2-=grayCountList[i];
    if(halfRemain2<=0){
      break;
    }
  }
  return (median1 + median2)/2;
}