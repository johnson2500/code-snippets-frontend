export default class SaveAudio {
  constructor() {
    this.mediaRecorder = null;
    this.fullAudio = [];
    this.partialAudio = [];
    this.stream = null;
    this.init();
  }

  init() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(this.onStream.bind(this));
  }

  onStream(stream) {
    this.stream = stream;
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.start(2000);

    this.mediaRecorder.ondataavailable = (e) => {
      const blobDataInWebaFormat = e.data; // .weba = webaudio; subset of webm
      const blobDataInWavFormat = new Blob([blobDataInWebaFormat], { type: 'audio/wav; codecs=0' });
      const dataUrl = URL.createObjectURL(blobDataInWavFormat);
    };
    this.recordAndPrint();
  }

  recordAndPrint() {
    this.mediaRecorderPartial = new MediaRecorder(this.stream);

    this.mediaRecorderPartial.ondataavailable = (e) => {
      this.partialAudio.push(e.data);
      if (this.mediaRecorderPartial.state !== 'inactive') {
        this.mediaRecorderPartial.stop();
      }
    };
    this.mediaRecorderPartial.onstop = (e) => {
      const blobDataInWavFormat = new Blob(this.partialAudio, { type: 'audio/wav; codecs=0' });
      const dataUrl = URL.createObjectURL(blobDataInWavFormat);
      console.log(dataUrl);
      this.partialAudio = [];
      this.mediaRecorderPartial.start(10000);
    };

    this.mediaRecorderPartial.start(10000);
  }
}
