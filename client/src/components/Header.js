import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Payments from './Payments'

class Header extends Component {

    renderContent() {
        console.log("this.props.auth:",this.props.auth);
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return [<li><a href="/auth/google">Login With Google+</a></li>,
                <li key="1"><Payments /></li>    
                    ];
            default:
                return (
                        [
                        <li key="1"><Payments /></li>,                        
                        <li key="2"><a href="/api/logout">Logout! {this.props.auth.displayName}</a></li>
                        ]
                );
        }
    }
    render() {
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth ? '/surveys' : '/'} 
                        className="left brand-logo">
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({auth}) {
    return { auth };
}
export default connect(mapStateToProps)(Header);