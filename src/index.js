import React, {useState}  from 'react';
import ReactDom from 'react-dom';
import './index.css';

var lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6],
];


const Squar = (props) => {

  return(
    <button className='square' onClick={props.onClickevent}>
      {props.value}
    </button>
  );
}


const Board = () => {

  const initialSqures = Array(9).fill(null);
  const [squres, setSqures]=useState(initialSqures);
  const [XisNext, setXisNext] = useState(true); 
  //console.log(squres);
  //const randomNum = Math.floor(Math.random() * (8-0)+0); 
  
  

  const handleClickevent = (i) => {
    // squres[i] = 'X'; we cant do this direct
    const newSqures = [...squres];

    const winnerDec = Boolean(calWinner(newSqures));
    const squreFill = Boolean(newSqures[i]);
    if(winnerDec || squreFill)
    {
      return;
    }

    newSqures[i] = XisNext ? 'X' : 'O';
    /*if(XisNext === true)
    {
      setTimeout(5000);
      var ran = randomNum;
      while(squres[ran] != null)
      {
        var ran = Math.floor(Math.random() * (8-0)+0);
      }
      newSqures[ran] = 'O';
    }*/
    setSqures(newSqures);
    setXisNext(!XisNext);
  };

  const renderSqure = (i) => {
    return(
      <Squar value={squres[i]} onClickevent={() => handleClickevent(i)}/>
    );
  }

  const win = calWinner(squres);
  const status = win ? 
                `winner: ${win}` : 
                `Next Plyer: ${XisNext ? 'X' : 'O'}`;
  
  return(
    <div className='boardBody'>
      <div className='status'>
        {status}
      </div>
      <div className='board-row'>
        {renderSqure(0)}{renderSqure(1)}{renderSqure(2)}
      </div>
      <div className='board-row'>
        {renderSqure(3)}{renderSqure(4)}{renderSqure(5)}
      </div>
      <div className='board-row'>
        {renderSqure(6)}{renderSqure(7)}{renderSqure(8)}
      </div>
      
    </div>
    
  );
}

const Game = () => {
  return (
    <div className='game'>
      Tic-Toc-Toe
      <Board />
    </div>
  );
};

ReactDom.render(
  <Game />,
  document.getElementById('root')
);

function calWinner(squres)
{  
  for(let i=0; i<lines.length; i++)
  {
    const [a, b, c] = lines[i];
    
    if(squres[a] && squres[a]===squres[b] && squres[a]===squres[c])
    {
      
      return squres[a];
    }
  }
  return null;
}