export default function Log({turns}){
    return(
        <ol id='log'>
            {turns.map((turn)=><li key={`${turn.symbol.row}${turn.symbol.col}`}>{turn.player} selected {turn.symbol.row},{turn.symbol.col}</li>)}
        </ol>
    );
}