import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages, sendMessage } from '../actions';

class Chat extends Component {
    userName = localStorage.getItem('chat-name');
    state = {
        message: ''
    }

    componentDidMount(){
        if(!this.userName){
            return this.props.history.push('/set-name');
        }

        this.dbRef = this.props.getMessages();
    }

    componentWillUnmount(){
        if(this.dbRef){
            this.dbRef.off();
        }
    }

    handleSendMessage = e => {
        e.preventDefault();

        const message = {
            message: this.state.message,
            name: this.userName
        }

        this.props.sendMessage(message);

        this.setState({message: ''});
    }

    render(){
        const { messages } = this.props;

        const messageElements = Object.keys(messages).map( key => {
            const msg = messages[key];

            return <li key={key} className="collection-item"><b>{msg.name}:</b> {msg.message}</li>;
        });

        return (
            <div>
                <h1 className="center">Chat</h1>

                <div className="right-align">Hello, {this.userName}</div>
                <ul className="collection">
                    {messageElements}
                </ul>

                <form onSubmit={this.handleSendMessage} className="input-field">
                    <input
                        type="text"
                        id="message"
                        onChange={e => this.setState({ message: e.target.value })}
                        value={this.state.message}
                    />
                    <label htmlFor="message">Enter chat message</label>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        messages: state.chat.messages
    };
}

export default connect(mapStateToProps, {
    getMessages,
    sendMessage
})(Chat);
