import React from 'react';
import { TableSimple } from 'react-pagination-table';
import './styles.css'

// "TIPO.ORIGEM.DATA.HORA.DESTINO.CIDADE_DESTINO.DURACAO_REAL.CUSTO"
const Table = ({Header, data, columns}) =>(
    <div >
        <TableSimple
            // name={name}
            headers={Header}
            //{["TIPO","ORIGEM","DATA","HORA","DESTINO","CIDADE_DESTINO","DURACAO_REAL","CUSTO"]}
            data={data}
            columns={columns}
            arrayOptions={["CUSTO",'all',"R$ "]}/>
            {/* <>{console.log("Properties", name)}</> */}
    </div>
    
)

export default Table;