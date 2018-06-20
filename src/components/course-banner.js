import React, {Component} from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {userInfo} from '../actions';

import {hostUrl} from '../../config';

import SignIn from '../auth/signin';

import '../../styles/detail.css';

const numberWithCommas = (x) => {
    let parts = parseInt(x).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};

const styles = {
    dialogRoot: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 0
    },
    dialogContent: {
        position: "relative",
        width: "80vw",
        transform: "",
    },
    dialogBody: {
        paddingBottom: 0
    }
};

class CourseBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            muiTheme: getMuiTheme(),
            open: false
        };
    }

    static childContextTypes = {
        muiTheme: PropTypes.object
    };

    getChildContext() {
        return {muiTheme: this.state.muiTheme};
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if(token) {
            this.props.userInfo();
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    learn = () => {
        if (this.props.logged) {
            const {course} = this.props;
        }
        else {
            this.handleOpen();
        }
    };

    renderDialog = () => {
        return (
            <div>
                <Dialog
                    contentStyle={ styles.dialogContent }
                    bodyStyle={ styles.dialogBody }
                    style={ styles.dialogRoot }
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    repositionOnUpdate={false}
                    autoScrollBodyContent={true}
                >
                    <SignIn redirect={this.handleClose} dialog={true}/>
                    <br/>
                    <br/>
                </Dialog>
            </div>
        );
    };

    renderPicture = (course) => {
        if(course.picture) {
            return (
                <div>
                    <img width="100%" height="100%" src={`${hostUrl}/images/${course.picture}`}/>
                </div>
            );
        }
    };

    renderBanner = () => {
        const {course} = this.props;

        return (
            <div>
                <Paper zDepth={2} style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    backgroundColor: '#FFF',
                    display: 'inline-block'
                }}>
                    <div style={{
                        marginTop:6,
                        marginLeft:6,
                        marginRight:6
                    }}>
                    <div style={{marginBottom:6}}/>
                    <div style={{textAlign: 'center'}}>
                        {this.renderPicture(course)}
                    </div>
                    <div style={{marginBottom:6}}/>
                    <div style={{textAlign: 'center',marginTop: 6}}>
                        <RaisedButton label="Preview the Course" labelStyle={{textTransform: 'none'}} fullWidth={true}/>
                    </div>
                    </div>
                </Paper>
            </div>
        );
    };

    render() {
        return (
            <div>
                {this.renderDialog()}
                {this.renderBanner()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        logged: state.auth.logged,
        user: state.auth.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        userInfo: () => dispatch(userInfo())
    }
};

export default CourseBanner = withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseBanner));
