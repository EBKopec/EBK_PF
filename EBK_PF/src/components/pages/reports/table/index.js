import React from 'react';
import './styles.css';


const Head = ({ keys, head }) => {
    const tableHead = head || {}
    return ( <thead className="head_table">
                   <tr className="tr_heads">
                        { keys.map(key => <th key={key}>{tableHead[key] || key}</th>) }
                   </tr>
            </thead>
    )
}

const Row = ({record}) => {
    const keys = Object.keys(record);
    return (
            <tr className="row" key={record.id}>
                { keys.map(key => <td key={key}>{record[key]}</td>) }
            </tr>)
}


const Table = ({data, head}) => {
    console.log("Objects:",Object.keys(data));
    const keys = Object.keys(data[0]);
    
        return (
            <div className="main-div">
                <table className="simple_table">
                    <Head className="theads" keys={keys} head={head}/>
                    <tbody className="tbody">
                        { data.map(record => <Row record={record}/>) }
                    </tbody>
                </table>
            </div>
        )
    
}

export default Table;