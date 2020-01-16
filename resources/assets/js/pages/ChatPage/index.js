/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setCurrentUser } from '../../actions/authen'
import MediaHandler from '../../MediaHandler'
import Pusher from 'pusher-js'
import Peer from 'simple-peer'
import NoRoom from './NoRoom'
import './chatPage.scss'
import { setIsChatFlag } from '../../actions/chat'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import uuid from 'react-uuid'
import ChatPageMaskLoader from '../../components/ChatPage/ChatPageMaskLoader'

const APP_KEY = process.env.MIX_PUSHER_APP_KEY
const APP_CLUSTER = process.env.MIX_PUSHER_APP_CLUSTER
const APP_URL = process.env.MIX_APP_URL
const ua = navigator.userAgent.toLowerCase()

class ChatPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hasMedia: false,
      otherUserId: null,
      members: [],
      testFile: '',
      user: null,
      isRoomExists: false,
      isLoading: true,
      atherUserName: '',
      isCallWait: false,
      isTalking: false,
      copyLinkMidalItems: []
    }

    this.peers = {}
    this.mediaHandler = new MediaHandler()
    this.setupPusher = this.setupPusher.bind(this)
    this.callTo = this.callTo.bind(this)
    this.setupPusher = this.setupPusher.bind(this)
    this.startPeer = this.startPeer.bind(this)
    this.initialVideoFunc = this.initialVideoFunc.bind(this)
    this.copyLink = this.copyLink.bind(this)
  }

  componentWillMount () {
    this.props.setIsChatFlag(true)
    axios.post('/roomExistsChk', {
      name: this.props.match.params.roomName
    }).then((res) => {
      console.log(res.data.isExists)
      this.setState({
        isRoomExists: res.data.isExists,
        isLoading: false
      })
      if (res.data.isExists) {
        axios.get('/getCurrentUser').then((res) => {
          this.setState({
            user: res.data.currentUser
          }, () => {
            this.initialVideoFunc()
          })
        }).catch((e) => {
          this.setState({
            user: {
              id: 'af02349dfw',
              name: 'guest',
              stream: null
            }
          }, () => {
            this.initialVideoFunc()
          })
        })
      } else {
        this.setState({
          isRoomExists: false
        })
      }
    })
  }

  componentWillUnmount () {
    this.props.setIsChatFlag(false)
    if (this.state.user && 'stream' in this.state.user) {
      this.state.user.stream.getVideoTracks().forEach((track) => {
        track.stop()
      })
      this.state.user.stream.getAudioTracks().forEach((track) => {
        track.stop()
      })
      this.pusher.unsubscribe(`presence-video-channel-${this.props.match.params.roomName}`)
    }
  }

  copyLink () {
    navigator.clipboard.writeText(`${APP_URL}/chat/${this.props.match.params.roomName}`)
    const array = [uuid()]
    this.setState({
      copyLinkMidalItems: array
    })
  }

  initialVideoFunc () {
    this.mediaHandler.getPermissions().then(stream => {
      this.setState({ hasMedia: true })
      this.state.user.stream = stream

      const video = document.getElementById('test')
      video.setAttribute('playsinline', true)
      video.setAttribute('autoplay', true)
      try {
        this.myVideo.srcObject = stream
      } catch (e) {
        this.myVideo.src = URL.createObjectURL(stream)
      }
      this.setupPusher()
    })
  }

  setupPusher () {
    this.pusher = new Pusher(APP_KEY, {
      authEndpoint: '/pusher/auth',
      cluster: APP_CLUSTER,
      auth: {
        params: this.state.user.id,
        headers: {
          'X-CSRF-Token': window.csrfToken.content
        }
      }
    })
    this.channel = this.pusher.subscribe(`presence-video-channel-${this.props.match.params.roomName}`)
    this.channel.bind('pusher:subscription_succeeded', members => {
      let membersSet = []
      members.each((member) => {
        console.log(member)
        if (member.id != this.state.user.id) {
          console.log('kita')
          this.callTo(member.id)
          this.setState({
            atherUserName: member.info.name,
            isTalking: true
          })
        }
        membersSet = [{ id: member.id, name: member.info.name }, ...membersSet]
      })
      this.setState({
        members: membersSet
      })
    })
    this.channel.bind('pusher:member_added', member => {
      if (member.id != this.state.user.id) {
        this.setState({
          atherUserName: member.info.name
        })
      }
    })
    this.channel.bind(`client-signal-${this.state.user.id}`, signal => {
      let peer = this.peers[signal.userId]
      // if peer is not already exists, its an incoming call.
      if (peer == undefined) {
        this.setState({
          otherUserId: signal.userId
        })
        peer = this.startPeer(signal.userId, false)
      }
      peer.signal(signal.data)
    })
  }

  startPeer (peerId, isInitiator) {
    this.setState({
      isCallWait: true
    })
    const peer = new Peer({
      initiator: isInitiator,
      stream: this.state.user.stream,
      trickle: false
    })

    peer.on('signal', data => {
      console.log(data)
      this.channel.trigger(`client-signal-${peerId}`, {
        type: 'signal',
        userId: this.state.user.id,
        data: data
      })
    })

    peer.on('stream', stream => {
      const video = document.getElementById('test2')
      video.setAttribute('playsinline', true)
      video.setAttribute('autoplay', true)
      try {
        this.userVideo.srcObject = stream
      } catch (e) {
        this.userVideo.src = URL.createObjectURL(stream)
      }
      this.setState({
        isCallWait: false,
        isTalking: true
      })
    })

    peer.on('close', () => {
      const peer = this.peers[peerId]
      if (peer !== undefined) {
        peer.destroy()
      }

      this.peers[peerId] = undefined
    })

    return peer
  }

  callTo (userId) {
    this.peers[userId] = this.startPeer(userId, true)
  }

  render () {
    return (
      this.state.isLoading ? (
        <ChatPageMaskLoader />
      )
        : this.state.isRoomExists
          ? (
            <div className="chat-page-container">
              {
                this.state.copyLinkMidalItems.map(item => {
                  return (
                    <div key={item[0]} className="copy-link-message">リンクをコピーしました。部屋に招待する為にリンクをシェアしましょう。</div>
                  )
                })
              }

              <div className="video-container-wrapper">
                <div className="video-container">
                  <video
                    id="test"
                    className="my-video"
                    muted
                    ref={ref => {
                      this.myVideo = ref
                    }}
                  />
                  <div className="innner-video-user-name">
                    <p>{this.state.user && this.state.user.name} (you)</p>
                  </div>
                </div>
                <div className="video-container">
                  <video
                    id="test2"
                    className="user-video"
                    ref={ref => {
                      this.userVideo = ref
                    }}
                  />
                  {
                    this.state.isCallWait &&
              <Loader
                className="loader"
                type="Oval"
                color="#00BFFF"
                height={100}
                width={100}
              />
                  }
                  {
                    this.state.atherUserName !== '' &&
              <div className="innner-video-user-name">
                <p>{this.state.atherUserName}</p>
              </div>
                  }
                  {
                    !this.state.isTalking && (
                      <React.Fragment>
                        <div className="share-link-title">Share link to start a meeting</div>
                        <div className="input-wrapper">
                          <input className="room-url-input" type="text" readOnly value={`${APP_URL}/chat/${this.props.match.params.roomName}`}/>
                        </div>
                        <button
                          className="copy-link-button"
                          onClick={() => this.copyLink()}
                        >
                      Copy link
                        </button>
                      </React.Fragment>
                    )
                  }
                </div>
              </div>
            </div>)
          : <NoRoom roomName={this.props.match.params.roomName} />
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.authen.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => {
      dispatch(setCurrentUser())
    },
    setIsChatFlag: (flag) => {
      dispatch(setIsChatFlag(flag))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
