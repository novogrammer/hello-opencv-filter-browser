
type FilterCallback=(imgBefore:opencv.Mat)=>opencv.Mat;

const {cv}=window;


interface RunnerParams{
  player:HTMLVideoElement;
  before:HTMLCanvasElement;
  after:HTMLCanvasElement;
  filter:FilterCallback
}

export default class Runner{
  constructor({player,before,after,filter}:RunnerParams){
    // console.log("Runner");
    // console.log(cv);
    const setupAsync=async ()=>{
      const stream = await navigator.mediaDevices.getUserMedia({
        audio:false,
        video: { facingMode: "user" },
      });
      player.srcObject = stream;
      const videoTracks=stream.getVideoTracks();
      if(videoTracks.length==0){
        throw new Error("videoTracks.length==0")
      }
      const settings=videoTracks[0].getSettings();
      if(!(settings.width && settings.height)){
        throw new Error("width or height is undefined")
      }
      const {width,height}=settings;
      player.width=width;
      player.height=height;
      before.width=width;
      before.height=height;
      after.width=width;
      after.height=height;

      const ctxBefore=before.getContext("2d")!;
      const ctxAfter=after.getContext("2d")!;

      const cap = new cv.VideoCapture(player);

      setInterval(()=>{
        // ctxBefore.drawImage(player,0,0,before.width,before.height);
        const beforeImage=new cv.Mat(height, width, cv.CV_8UC4);
        cap.read(beforeImage);
        const afterImage=filter(beforeImage);

        cv.imshow(before,beforeImage);
        cv.imshow(after,afterImage);
        beforeImage.delete();
        afterImage.delete();

      },1000/60);

    };

    setupAsync().catch((error)=>{
      console.error(error);
    });
  }

}