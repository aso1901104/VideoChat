class MediaHandler {
  getPermissions() {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({video: { width: 320 }, audio: false}).then(stream => {
        resolve(stream);
      }).catch(error => {
        throw new Error(`Unable to fetch stream ${error}.`);
      });
    });
  }
}

export default MediaHandler;
