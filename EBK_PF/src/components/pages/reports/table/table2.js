import React from 'react';
import { TableSimple } from 'react-pagination-table';


const Table = ({Header, data}) =>(
    <div >
        <TableSimple
            // name={name}
            headers={Header}
            //{["TIPO","ORIGEM","DATA","HORA","DESTINO","CIDADE_DESTINO","DURACAO_REAL","CUSTO"]}
            data={data}
            columns="TIPO.ORIGEM.DATA.HORA.DESTINO.CIDADE_DESTINO.DURACAO_REAL.CUSTO"
            arrayOptions={["CUSTO",'all',"R$ "]}/>
            {/* <>{console.log("Properties", name)}</> */}
    </div>
    
)

export default Table;