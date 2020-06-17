import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';

export default class Content extends Component{
    state = {
        content: [],
        contentInfo: {}
    }

    async componentDidMount(){

        const { id } = this.props.match.params;
        const response = await api.get(`/content/${id}`);
        const { docs, ...contentInfo } = response.data;
        
        this.setState({ content: docs, contentInfo});
        //console.log(response);
        
    } 

    render(){
        const { content} = this.state;
        console.log(content);
        //console.log(content);
        return (
            <div className="info">
                <div className="content_info">
                    {content.map( content=> (
                        <article key={content.id}>
                            <p>{content.main_content}</p>
                            <ul>
                                <li>
                                {content.description_content}
                                </li>
                            </ul>
                            <p>{content.aux_content}</p>
                        </article>
                    ))}
                </div>
                <div className="content_info_child">
                    <Link to={`/`}>Voltar</Link>
                </div>
            </div>
        )
    }
}