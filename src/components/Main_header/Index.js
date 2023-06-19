import './Index.css';

function Main_header({title, backgorund}) {
    return(
        <div className="header" style={{backgroundColor: backgorund}}>
            <h1>{title}</h1>
        </div>
    );
}

export default Main_header;