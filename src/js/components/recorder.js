export default class recorderClass {
  constructor() {
    if (!recorderClass.instance) {
      this.set = {
        start: document.getElementById("start"),
        stop: document.getElementById("stop"),
        pauseAndResume: document.getElementById("pauseAndResume"),
        preview: document.querySelector("#preview"),
        download: document.querySelector("#download"),
        recordingName: document.querySelector("#filename"),
        videoWrapper: document.querySelector(".sh__video--wrp"),
        videoOpacitySheet: document.querySelector(".sh__video--sheet"),
        headerText: document.querySelector(".sh__header"),
        toast: document.getElementById("toast"),
        mime: 'screen-mic', // Set default MIME type
        mediaRecorder: null,
        isRecording: false,
        isPause: false,
        filename: null,
      };
      recorderClass.instance = this;
    }
    return recorderClass.instance;
  }

  getRandomString(length) {
    let randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  appendStatusNotification(actionType) {
    const notificationText = actionType === "start" ? "Started Recording" :
      actionType === "stop" ? "Stopped Recording" :
      actionType === "pause" ? "Paused Recording" :
      actionType === "resume" ? "Resumed Recording" : "";

    this.set.toast.classList.add("active");
    document.getElementById("desc").innerHTML = notificationText;
    setTimeout(() => {
      this.set.toast.classList.remove("active");
    }, 4000);
  }

  createRecorder(stream) {
    let recordedChunks = [];
    this.set.mediaRecorder = new MediaRecorder(stream);

    this.set.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };

    this.set.mediaRecorder.onstop = () => {
      if (this.set.isRecording) this.stopRecording();
      this.bakeVideo(recordedChunks);
      recordedChunks = [];
    };

    this.set.mediaRecorder.stream.oninactive = () => {
      this.stopRecording();
    };

    this.set.mediaRecorder.start(15);
    return this.set.mediaRecorder;
  }

  async recordScreenAndMicrophone() {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" },
      audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 44100 }
    });

    const microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const audioContext = new AudioContext();
    const screenSource = audioContext.createMediaStreamSource(screenStream);
    const microphoneSource = audioContext.createMediaStreamSource(microphoneStream);

    const destination = audioContext.createMediaStreamDestination();
    screenSource.connect(destination);
    microphoneSource.connect(destination);

    const tracks = [...screenStream.getVideoTracks(), ...destination.stream.getAudioTracks()];
    return new MediaStream(tracks);
  }

  async startRecording() {
    let stream = await this.recordScreenAndMicrophone();
    let mimeType = "video/" + this.set.mime;

    this.set.filename = document.getElementById("filename").value;
    this.set.isRecording = true;
    this.set.mediaRecorder = this.createRecorder(stream, mimeType);
    this.set.preview.srcObject = stream;
    this.set.preview.captureStream = this.set.preview.captureStream || this.set.preview.mozCaptureStream;
    this.set.headerText.classList.add("is-recording");
    this.set.preview.classList.add("visible");
    this.set.pauseAndResume.classList.add("visible");
    this.set.stop.classList.add("visible");
    this.appendStatusNotification("start");
  }

  // Include pauseRecording, resumeRecording, stopRecording, and init methods here

  init() {
    // TODO: LOADING ANIMATION
    // const tl = new TimelineLite({ duration: .8, delay: .4, ease: "back.out(2)", opacity: 0 });
    //
    // tl
    //     .to(this.set.progress,  { duration: 7, width: "101vw" } )
    //     .fromTo(this.set.logo, { duration: 1, opacity: 0, xPercent: -50, yPercent: 300 }, { opacity: 1, yPercent: -50, xPercent: -50, scale: .9 }, "<" )
    //     .from(".sh__logo--text .letter", { opacity: 0, x: 20, stagger: { amount: 0.80, from: "start" }}, "<")
    //     .to(this.set.logo, { scale: .7, yPercent: 3, top: "1.5%" }, "-=2")
    //     .from(this.set.themeToggler,{ yPercent: -200 } )
    //     .from(this.set.footer,{ yPercent: 200 }, "<" )
    //     .fromTo(this.set.headerText,{ opacity: 0, y: 30 }, { opacity: 1, y: 0 }, "+=.8" )
    //     .fromTo(this.set.dropdownToggle, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, "-=.7" )

    this.set.dropdownToggle.addEventListener("click", () => {
      this.toggleDropdown();
    });

    document.addEventListener("click", (e) => {
      if (this.set.dropdownToggle.classList.contains("toggled")) {
        if (!e.target.closest(".sh__dropdown--btn")) {
          this.toggleDropdown();
        }
      }
    });

    this.set.dropdownOptions.forEach((el) => {
      el.addEventListener("click", () => {
        this.set.recordingName.classList.add("visible");
        this.set.selectedOption = this.getSelectedValue(el); // Store the selected value
        this.toggleDropdown();
      });
    });

    this.set.start.addEventListener("click", () => {
      if (!this.set.isRecording) this.startRecording();
    });

    this.set.pauseAndResume.addEventListener("click", () => {
      if (!this.set.isPause) this.pauseRecording();
      else if (this.set.isPause) this.resumeRecording();
    });

    this.set.stop.addEventListener("click", () => {
      if (this.set.isRecording) this.stopRecording();
    });
  }
}
