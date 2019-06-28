import React from 'react';
import PropTypes from 'prop-types';
import VotingComponent from './VotingComponent';
import {fetchJson, sendJson} from '../backend/Backend';

export default class SingleVoteController extends React.Component {
    constructor() {
        super();

        this.state = {
            vote: null
        };

        this.registerVote = this.registerVote.bind(this);
        this.routeToMain = this.routeToMain.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.loadVote(nextProps);
    }

    componentDidMount() {
        this.loadVote(this.props);
        document.title = `Vote ${this.props.match.params.id} - Vote as a Service`;
    }

    loadVote(props) {
        const requestedVoteId = props.match.params.id;
        console.log(requestedVoteId);
        if (!requestedVoteId || (this.state.vote && this.state.vote.id === requestedVoteId)) {
            return;
        }

        fetchJson(`/api/votes/${requestedVoteId}`)
            .then(vote => {
                document.title = `${vote.title} - Vote as a Service`;
                this.setState({
                    vote
                });
            });
    }

    registerVote(vote, choice) {
        sendJson('put', `/api/votes/${vote.id}/choices/${choice.id}/vote`, {})
            .then(() => this.routeToMain());
    }

    routeToMain() {
        //this.context.history.pushState(null, '/');
        this.props.history.push('/');
    }

    render() {
        const { vote } = this.state;
        if (vote) {
            return <VotingComponent vote={vote}
                                    onDismissVote={this.routeToMain}
                                    onRegisterChoice={(choice) => {this.registerVote(vote, choice)}}
            />
        } else {
                return null;
        }
    }
}

/*
SingleVoteController.contextTypes = {
        history: PropTypes.object.isRequired
};
*/