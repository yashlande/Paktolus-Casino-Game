import React from 'react'
import './style.css'
  
function RepeatButton(props) {
  return (
    <button 
      aria-label='Play again.' 
      id='repeatButton' 
      onClick={props.onClick} style={{color:'white'}}>
        Spin
    </button>
  );
}

function WinningSound() {
  return (
  <audio autoPlay="autoplay" className="player" preload="false">
    <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
  </audio>  
  );
}

class Spinnerr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null
    }
    this.finishHandler = this.finishHandler.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }  

  handleClick() { 
    this.setState({ winner: null });
    this.emptyArray();
    this._child1.forceUpdateHandler();
    this._child2.forceUpdateHandler();
    this._child3.forceUpdateHandler();
    this.props.normalSpin();
  }

  static loser = [
    'Not quite', 
    'Stop gambling', 
    'Hey, you lost!', 
    'Ouch! I felt that',      
    'Don\'t beat yourself up',
    'There goes the college fund',
    'I have a cat. You have a loss',
    'You\'re awesome at losing',
    'Coding is hard',
    'Don\'t hate the coder'
  ];

  static matches = [];

  finishHandler(value) {
    // this.matches.push(value);  
    Spinnerr.matches.push(value);
    
    if (Spinnerr.matches.length === 3) {
      const { winner } = this.state;
      const first = Spinnerr.matches[0];
      const second= Spinnerr.matches[1];
      const third= Spinnerr.matches[2];
      let results = Spinnerr.matches.every((match) => {
        match === first
      })
      console.log("First =", first,"Second =",second, "Third =", third, "Results =", results, "Matches = ",Spinner.matches)

      if(results){
        this.props.bigWin();
      }else if(first===second){
        this.props.normalWin();
      }else if(first===third){
        this.props.normalWin();
      }else if(second===third){
        this.props.normalWin();
      }else if(results && first===-564){
        this.props.bigbigwin();
      }


      this.setState({ winner: results });
    }
  }

  emptyArray() {
    Spinnerr.matches = [];
  }

  render() {
    const { winner } = this.state;
    const getLoser = () => {       
      return Spinnerr.loser[Math.floor(Math.random()*Spinnerr.loser.length)]
    }
    let repeatButton = null;
    let winningSound = null;

    if (winner !== null) {
      repeatButton = <RepeatButton onClick={this.handleClick} />
    }
    
    if (winner) {
      winningSound = <WinningSound />
    }

    return (
      <div>
        {winningSound}
        <h1 style={{ color: 'white'}}>
          <span>{winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoser()}</span>
        </h1>

        <div className={`spinner-container`}>
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child1 = child; }} timer="1000" />
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child2 = child; }} timer="1400" />
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child3 = child; }} timer="2200" />
          <div className="gradient-fade"></div>
        </div>
        {this.props.bal>2?repeatButton:null}
        {/* {winner !==null ? <button onClick={()=>this.props.onClose()}>X</button>:null}         */}
      </div>
    );
  }
}  
  
class Spinner extends React.Component {  
  constructor(props){
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  };

  forceUpdateHandler(){
    this.reset();
  }; 

  reset() {
    if (this.timer) { 
      clearInterval(this.timer); 
    }  

    this.start = this.setStartPosition();

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer        
    });

    this.timer = setInterval(() => {
      this.tick()
    }, 100);      
  }

  state = {
    position: 0,
    lastPosition: null
  }
  static iconHeight = 188;
  multiplier = Math.floor(Math.random()*(4-1)+1);

  start = this.setStartPosition();
  speed = Spinner.iconHeight * this.multiplier;    

  setStartPosition() {
    return ((Math.floor((Math.random()*4))) * Spinner.iconHeight)*-1;
  }

  moveBackground() {
    this.setState({ 
      position: this.state.position - this.speed,
      timeRemaining: this.state.timeRemaining - 100
    })
  }

  getSymbolFromPosition() {
    let { position } = this.state;
    const totalSymbols = 4;
    const maxPosition = (Spinner.iconHeight * (totalSymbols-1)*-1);
    let moved = (this.props.timer/100) * this.multiplier
    let startPosition = this.start;
    let currentPosition = startPosition;    

    for (let i = 0; i < moved; i++) {              
      currentPosition -= Spinner.iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = 0;
      }      
    }

    this.props.onFinish(currentPosition);
  }

  tick() {      
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);        
      this.getSymbolFromPosition();    

    } else {
      this.moveBackground();
    }      
  }

  componentDidMount() {
    clearInterval(this.timer);

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer
    });

    this.timer = setInterval(() => {
      this.tick()
    }, 100);
  }

  render() {
    let { position, current } = this.state;   

    return (            
      <div 
        style={{backgroundPosition: '0px ' + position + 'px'}}
        className={`icons`}          
      />
    )
  }
}

export default Spinnerr
