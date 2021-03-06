import React from 'react';
import axios from 'axios';
import FriendCard from './FriendCard';

export default class Friend extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            friend: null
        }
    }
    fetchFriend = id => {
        axios
            .get(`http://localhost:5000/friends/${id}`)
            .then(response => { 
                this.setState(() => ({friend: response.data}));
            })
            .catch(err => {
                console.log(err);
            })

    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchFriend(id);
    }

    
    editFriend = (id, friend) => {
        console.log(friend);
        axios
            .put(`http://localhost:5000/friends/${id}`, friend)
            .then(response => { 
                // this.setState({friend: response.data});
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }
    componentWillReceiveProps(newProps){
        if(this.props.match.params.id !== newProps.match.params.id){
          this.fetchFriend(newProps.match.params.id);
        }
    }
    render() {
        if (!this.state.friend) {
            return <div>Loading friend information...</div>;
        }
        const { id, name, age, email } = this.state.friend;
        return(
            
            <div className="friend-card">
                <FriendCard editFriend={this.editFriend} {...this.props} id={id} name={name} age={age} email={email} />
            </div>
        )
    }

}
