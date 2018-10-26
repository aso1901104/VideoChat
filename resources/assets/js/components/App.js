import React, {Component} from "react";import axios from 'axios';import MediaHandler from "./../MediaHandler";import Pusher from "pusher-js";import Peer from "simple-peer";const APP_KEY = process.env.MIX_PUSHER_APP_KEY;const APP_CLUSTER = process.env.MIX_PUSHER_APP_CLUSTER;class App extends Component {  constructor() {    super();    this.state = {      hasMedia: false,      otherUserId: null,      members: [],      testFile: '',    };    this.user = window.user;    this.user.stream = null;    this.peers = {};    this.mediaHandler = new MediaHandler();    this.setupPusher = this.setupPusher.bind(this);    this.callTo = this.callTo.bind(this);    this.setupPusher = this.setupPusher.bind(this);    this.startPeer = this.startPeer.bind(this);    this.gogogo = this.gogogo.bind(this);  }  componentWillMount() {    this.setupPusher();    this.mediaHandler.getPermissions().then(stream => {      this.setState({hasMedia: true});      this.user.stream = stream;      const video = document.getElementById('test');      video.setAttribute("playsinline", true);      video.setAttribute("autoplay", true);      try {        this.myVideo.srcObject = stream;      } catch (e) {        this.myVideo.src = URL.createObjectURL(stream);      }      // this.myVideo.play();    });  }  setupPusher() {    this.pusher = new Pusher(APP_KEY, {      authEndpoint: "/pusher/auth",      cluster: APP_CLUSTER,      auth: {        params: this.user.id,        headers: {          "X-CSRF-Token": window.csrfToken.content,        },      },    });    console.log(this.pusher);    this.channel = this.pusher.subscribe("presence-video-channel");    this.channel.bind('pusher:subscription_succeeded', (members) => {      // for example      let membersSet = [];      members.each(function(member) {        console.log(member);        membersSet = [{ id: member.id, name: member.info.name }, ...membersSet]      });      this.setState({        members: membersSet,      });    });    this.channel.bind(`client-signal-${this.user.id}`, (signal) => {      let peer = this.peers[signal.userId];      // if peer is not already exists, its an incoming call.      if (peer == undefined) {        this.setState({          otherUserId: signal.userId,        });        peer = this.startPeer(signal.userId, false);      }      peer.signal(signal.data);    });  }  startPeer(peerId, isInitiator) {    console.log('押した');    const peer = new Peer({      initiator: isInitiator,      stream: this.user.stream,      trickle: false,    });    peer.on("signal", (data) => {      console.log(data);      this.channel.trigger(`client-signal-${peerId}`, {        type: "signal",        userId: this.user.id,        data: data,      });    });    peer.on("stream", (stream) => {      const video = document.getElementById('test2');      const audio = document.getElementById('audio2');      video.setAttribute("playsinline", true);      video.setAttribute("autoplay", true);      // audio.setAttribute("autoplay", true);      audio.src = stream;      try {        this.userVideo.srcObject = stream;      } catch (e) {        this.userVideo.src = URL.createObjectURL(stream);      }      // this.userVideo.play();    });    peer.on("close", () => {      let peer = this.peers[peerId];      if (peer !== undefined) {        peer.destroy();      }      this.peers[peerId] = undefined;    });    return peer;  }  callTo(userId) {    this.peers[userId] = this.startPeer(userId, true);  }  gogogo() {    const formData = new FormData;    formData.append('image', this.state.testFile);    axios.post('/testPdf', formData).then((response) => {      console.log('test', response.data);    });  }  render() {    return (      <div className="container">        <div className="row justify-content-center">          <div className="col-md-12">            <div className="card">              <div className="card-header">My Video Chat Test</div>              <div className="card-body">                {this.state.members.map(member => {                  return this.user.id !== parseInt(member.id) ? <button key={member.id} onClick={() => this.callTo(member.id)}>Call To {member.name}</button> : null;                })}                <div className="video-container">                  <video id="test" className="my-video" muted ref={ref => {this.myVideo = ref;}}/>                  <video id="test2" className="user-video" ref={ref => {this.userVideo = ref;}}/>                  {/*<audio id="audio2" src="" />*/}                  {/*<video id="test" autoPlay className="user-video"/>*/}                </div>                <input type="file" onChange={e => this.setState({ testFile: e.target.files[0] })} />                <div onClick={() => this.gogogo()}>                  GOGOGOGOGO                </div>              </div>            </div>          </div>        </div>      </div>    );  }}export default App;