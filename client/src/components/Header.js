import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {

    renderContent() {
        console.log("this.props:",this.props);
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google+</a></li>;
            default:
                return (
                    <div>
                        <li>Welcome! {this.props.auth.displayName} </li>
                        <li><a href="/api/logout">Logout</a></li>
                    </div>
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