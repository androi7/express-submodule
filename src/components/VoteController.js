import React from 'react';
import PropTypes from 'prop-types';
import VoteList from './VoteList';
import VoteComposer from './VoteComposer';
import {fetchJson} from '../backend/Backend';



export default class VoteController extends React.Component {
    constructor() {
        super();

        this.state = {
            allVotes: []
        };

        this.activateVoteComposer = this.activateVoteComposer.bind(this);
    }

    componentDidMount() {
        document.title = 'Overview - Vote as a Service';
        fetchJson('/api/votes').then(allVotes => {
            this.setState({
                allVotes
            });
        });
    }

    transitionTo(path) {
        //this.context.history.pushState(null, path);
        this.props.history.push(path);
    }

    activateVoteComposer() {
        this.transitionTo('/compose');
    }

    render() {
        const { allVotes } = this.state;

        return (
            <div>
                <VoteList allVotes={allVotes} />
                <VoteComposer active={false}
                              onActivate={this.activateVoteComposer} />
            </div>
        );
    }
}

/*
VoteController.contextTypes = {
    history: PropTypes.object.isRequired
};
*/