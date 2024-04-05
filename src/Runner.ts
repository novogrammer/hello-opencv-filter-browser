import Stats from "stats.js";

type FilterCallback=(imgBefore:opencv.Mat)=>opencv.Mat;

const {cv}=window;


interface RunnerParams{
  player:HTMLVideoElement;
  before:HTMLCanvasElement;
  after:HTMLCanvasElement;
  filter:FilterCallback
}

export default class Runner{
  stats:Stats;
  constructor({player,before,after,filter}:RunnerParams){
    // console.log("Runner");
    // console.log(cv);
    this.stats=new Stats();
    document.body.appendChild( this.stats.dom );
    
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

      const cap = new cv.VideoCapture(player);

      setInterval(()=>{
        this.stats.begin();
        // ctxBefore.drawImage(player,0,0,before.width,before.height);
        const beforeImage=new cv.Mat(height, width, cv.CV_8UC4);
        cap.read(beforeImage);
        const afterImage=filter(beforeImage);

        cv.imshow(before,beforeImage);
        cv.imshow(after,afterImage);
        beforeImage.delete();
        afterImage.delete();

        this.stats.end();
      },1000/60);

    };

    setupAsync().catch((error)=>{
      console.error(error);
    });
  }

}