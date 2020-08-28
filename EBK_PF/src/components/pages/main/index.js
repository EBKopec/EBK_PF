import React, {Component} from 'react';
import Data from '../../services/api';
import { Link } from 'react-router-dom';
import Banner from '../../banner/index';
import './styles.css'

export default class Main extends Component{
    state = {
        content: [],
        contentInfo: {},
        page: 1,
    }
    
    componentDidMount(){
        this.loadContent();
    }

    loadContent = async (page = 1) =>{
        const response = await Data.get(`/content?page=${page}`);
        const { docs, ...contentInfo } = response.data;

        this.setState({content: docs, contentInfo, page})

    };

    prevPage = () => {
        const {page} = this.state;
        //contentInfo
        if (page === 1) return;

        const pageNumber = page - 1;
        
        this.loadContent(pageNumber);

    };
    nextPage = () => {
        const {page, contentInfo} = this.state;

        if (page === contentInfo.pages) return;

        const pageNumber = page + 1;

        this.loadContent(pageNumber);

    };


    render(){
        const { content, page, contentInfo} = this.state;
        console.log(contentInfo)
        return (
            
            <div className="box">
                <Banner />
            <div className="content_rules">
                {content.map( content => (
                    <article key={content.id}>
                        <strong>{content.title_content}</strong>
                        <p>{content.subtitle_content}</p>
                        <Link to={`/content/${content.id}`}>Acesse {content.aux_title} {content.title_content}</Link>
                        
                    </article>
                    
                ))}
                
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === contentInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
                </div>
            
            </div>
            
        )
    }
}