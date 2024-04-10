import Stats from "stats.js";
import { cropImage } from "./mat_utils";

type FilterCallback=(imgBefore:opencv.Mat)=>opencv.Mat;

const {cv}=window;


interface RunnerParams{
  player:HTMLVideoElement;
  before:HTMLCanvasElement;
  after:HTMLCanvasElement;
  debug?:HTMLDivElement;
  filter:FilterCallback
}
const VIDEO_WIDTH=480;
const VIDEO_HEIGHT=480;

export default class Runner{
  stats:Stats;
  constructor({player,before,after,debug,filter}:RunnerParams){
    // console.log("Runner");
    // console.log(cv);
    this.stats=new Stats();
    document.body.appendChild( this.stats.dom );
    
    const setupAsync=async ()=>{
      const stream = await navigator.mediaDevices.getUserMedia({
        audio:false,
        video: {
          facingMode: "environment",
          width: { min: VIDEO_WIDTH, ideal: VIDEO_WIDTH },
          height: { min: VIDEO_HEIGHT, ideal: VIDEO_HEIGHT },
        },
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
      before.width=VIDEO_WIDTH;
      before.height=VIDEO_HEIGHT;
      after.width=VIDEO_WIDTH;
      after.height=VIDEO_HEIGHT;


      const cap = new cv.VideoCapture(player);

      setInterval(()=>{
        this.stats.begin();
      
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
        if(debug){
          debug.innerHTML=`
          <p>
            width: ${width}<br>
            height: ${height}<br>
          </p>
          `;
        }
  
        // ctxBefore.drawImage(player,0,0,before.width,before.height);
        const originalImage=new cv.Mat(height, width, cv.CV_8UC4);
        cap.read(originalImage);

        const aspect=width/height;
        let scale=1;
        const videoAspect=VIDEO_WIDTH/VIDEO_HEIGHT;
        // console.log(`${aspect} ${videoAspect}`);
        if(aspect<videoAspect){
          scale=VIDEO_WIDTH/width;
        }else{
          scale=VIDEO_HEIGHT/height;
        }
        console.log(scale);

        let croppedImage:opencv.Mat;
        if(aspect!=videoAspect){
          croppedImage=cropImage(originalImage,Math.floor(VIDEO_WIDTH/scale),Math.floor(VIDEO_HEIGHT/scale));
          originalImage.delete();
  
        }else{
          croppedImage=originalImage;
        }

        let beforeImage:opencv.Mat;
        const dsize=new cv.Size(VIDEO_WIDTH,VIDEO_HEIGHT);
        if(scale!=1){
          beforeImage=new cv.Mat();
          cv.resize(croppedImage,beforeImage,dsize,0,0,cv.INTER_LINEAR);
          croppedImage.delete();
        }else{
          beforeImage=croppedImage;
        }
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