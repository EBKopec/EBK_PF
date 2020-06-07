import MuitThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaiseButton from 'material-ui/RaiseButton';
import TextField from 'material-ui/TextField';
import { React, Component } from 'react';

class Login extends Component{
    constructor(propos){
        super(propos);
        this.state = {
            username:'',
            password:''
        }
    }
    render(){
        return (
            <div>
                <MuitThemeProvider>
                    <div>
                        <AppBar title="Login"/>
                        <TextField hintText="Enter your Username" floatingLabelText="Username" 
                        onChange={(event,newValue) => this.setState({username:newValue})}/>
                    <br/>
                        <TextField
                        type="password" hintText="Enter your Password" floatingLabelText="Password"
                        onChange = {(event,newValue) => this.setState({password:newValue})}/>
                    <br/>
                        <RaiseButton label="Submit" primary={true} styles={style} 
                        onClick={(event) => this.handleClick(event)}/>
                </div>
                </MuitThemeProvider>
            </div>
        );
    }
}
const style = {margin:15};
export default Login;