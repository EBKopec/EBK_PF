import React from 'react';
import { TableSimple } from 'react-pagination-table';


const Table = ({Header ,data, columns}) =>(
    <div>
        <TableSimple
            headers={Header}
            //{["TIPO","ORIGEM","DATA","HORA","DESTINO","CIDADE_DESTINO","DURACAO_REAL","CUSTO"]}
            data={data}
            columns="TIPO.ORIGEM.DATA.HORA.DESTINO.CIDADE_DESTINO.DURACAO_REAL.CUSTO"
            arrayOptions={[['DATA','all',',']]}/>
    </div>
)

export default Table;