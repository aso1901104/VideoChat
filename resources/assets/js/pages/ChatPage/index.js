import React, { Component, useState } from "react";
import axios from "axios";
import { connect } from 'react-redux'
import { setCurrentUser } from '../../actions/authen'
import MediaHandler from "../../MediaHandler";
import Pusher from "pusher-js";
import Peer from "simple-peer";
import NoRoom from './NoRoom';

const APP_KEY = process.env.MIX_PUSHER_APP_KEY;
const APP_CLUSTER = process.env.MIX_PUSHER_APP_CLUSTER;
const ua = navigator.userAgent.toLowerCase();

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMedia: false,
      otherUserId: null,
      members: [],
      testFile: "",
      user: null,
      isRoomExists: false,
    };

    this.peers = {};
    this.mediaHandler = new MediaHandler();
    this.setupPusher = this.setupPusher.bind(this);
    this.callTo = this.callTo.bind(this);
    this.setupPusher = this.setupPusher.bind(this);
    this.startPeer = this.startPeer.bind(this);
    this.initialVideoFunc = this.initialVideoFunc.bind(this);
  }

  componentWillMount() {
    axios.post('/roomExistsChk', {
      name: this.props.match.params.roomName,
    }).then((res) => {
      console.log(res.data.isExists)
      this.setState({
        isRoomExists: res.data.isExists,
      })
      if (res.data.isExists) {
        axios.get('/getCurrentUser').then((res) => {
          console.log('data', res.data)
          this.setState({
            user: res.data.currentUser,
          }, () => {
            this.initialVideoFunc();
          })
        }).catch ((e) => {
          this.setState({
            user: {
              id: 'af02349dfw',
              name: 'guest',
              stream: null,
            },
          }, () => {
            this.initialVideoFunc();
          })
        })
      } else {
        this.setState({
          isRoomExists: false,
        })
      }
    })
  }

  componentWillUnmount() {
    this.state.user.stream.getVideoTracks().forEach((track) => {
      track.stop()
    })
    this.state.user.stream.getAudioTracks().forEach((track) => {
      track.stop()
    })
  }

  initialVideoFunc() {
    this.mediaHandler.getPermissions().then(stream => {
      this.setState({ hasMedia: true });
      this.state.user.stream = stream;

      const video = document.getElementById("test");
      video.setAttribute("playsinline", true);
      video.setAttribute("autoplay", true);
      try {
        this.myVideo.srcObject = stream;
      } catch (e) {
        this.myVideo.src = URL.createObjectURL(stream);
      }
      this.setupPusher();
    });
  }

  setupPusher() {
    this.pusher = new Pusher(APP_KEY, {
      authEndpoint: "/pusher/auth",
      cluster: APP_CLUSTER,
      auth: {
        params: this.state.user.id,
        headers: {
          "X-CSRF-Token": window.csrfToken.content
        }
      }
    });
    this.channel = this.pusher.subscribe(`presence-video-channel-${this.props.match.params.roomName}`);
    this.channel.bind("pusher:subscription_succeeded", members => {
      let membersSet = [];
      members.each((member) => {
        console.log(member);
        if (member.id != this.state.user.id) {
          this.callTo(member.id)
        }
        membersSet = [{ id: member.id, name: member.info.name }, ...membersSet];
      });
      this.setState({
        members: membersSet
      });
    });
    this.channel.bind(`client-signal-${this.state.user.id}`, signal => {
      let peer = this.peers[signal.userId];
      // if peer is not already exists, its an incoming call.
      if (peer == undefined) {
        this.setState({
          otherUserId: signal.userId
        });

        peer = this.startPeer(signal.userId, false);
      }

      peer.signal(signal.data);
    });
  }

  startPeer(peerId, isInitiator) {
    console.log("押した");
    const peer = new Peer({
      initiator: isInitiator,
      stream: this.state.user.stream,
      trickle: false
    });

    peer.on("signal", data => {
      console.log(data);
      this.channel.trigger(`client-signal-${peerId}`, {
        type: "signal",
        userId: this.state.user.id,
        data: data
      });
    });

    peer.on("stream", stream => {
      const video = document.getElementById("test2");
      video.setAttribute("playsinline", true);
      video.setAttribute("autoplay", true);
      try {
        this.userVideo.srcObject = stream;
      } catch (e) {
        this.userVideo.src = URL.createObjectURL(stream);
      }
      // this.userVideo.play();
    });

    peer.on("close", () => {
      let peer = this.peers[peerId];
      if (peer !== undefined) {
        peer.destroy();
      }

      this.peers[peerId] = undefined;
    });

    return peer;
  }

  callTo(userId) {
    this.peers[userId] = this.startPeer(userId, true);
  }
  render() {
    return (
      this.state.isRoomExists ?
      (<div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {this.state.members.map(member => {
                  return this.state.user.id !== parseInt(member.id) ? (
                    <button
                      key={member.id}
                      onClick={() => this.callTo(member.id)}
                    >
                      Call To {member.name}
                    </button>
                  ) : null;
                })}
                <div className="video-container">
                  <div>
                    <video
                      id="test"
                      className="my-video"
                      muted
                      ref={ref => {
                        this.myVideo = ref;
                      }}
                    />
                    <video
                      id="test2"
                      className="user-video"
                      ref={ref => {
                        this.userVideo = ref;
                      }}
                    />
                  </div>
                  {/*<video id="test" autoPlay className="user-video"/>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)
      :
      <NoRoom roomName={this.props.match.params.roomName} />
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    currentUser: state.authen.currentUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => {
      dispatch(setCurrentUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
