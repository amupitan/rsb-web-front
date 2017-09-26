import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import '../App.css';
import './style.css';
import RSBButton from '../ui/RSBButton';
import RSBHostModal from '../HostGame';
import RSBMiniModal from '../ui/RSBInfoModal';


class QuickAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
            modalInfo: this.props.modalInfo,
            displayHost: false
        }

        //ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself
        this.handleQuickAccess = this.handleQuickAccess.bind(this);
        this.render = this.render.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleSport = this.handleSport.bind(this);
        this.handleHost = this.handleHost.bind(this);
    }

    toggleQuickAccessButtons() {
        let tempContent = this.props.content;
        tempContent.forEach((element) => {
            element.visible = !element.visible;
        })
        console.log("TempContent: ", tempContent)
        return tempContent;

    }

    updateDisplayAll() {
        return !this.state.displayAll;
    }

    handleQuickAccess() {
        this.setState(() => {
            return {
                content: this.toggleQuickAccessButtons(),
            }
        })
    }

    handleHost() {
        console.log("Clicked HandleHost");
        this.setState(() => {
            return {
                displayHost: !this.state.displayHost
            }
        })
    }



    handleSport() {
        console.log("Handle Sport");
    }

    handleBack() {
        this.setState(() => {
            return {
                content: this.toggleQuickAccessButtons(),
            }
        })
    }


    //TODO: Make this whole thing a whole lot neater. This suuuuuucks
    render() {
        let returnable = [];
        if (this.state.displayHost) {
            returnable.push(<RSBHostModal 
                closeButtonFunction = {this.handleHost}
                key={3}
            />
            );
        } else {
            this.state.content.forEach((element, i) => {
                let handleFunction;
                if (element.visible) {
                    switch (element.title) {
                        case ("Host"):
                            console.log("It is host");
                            handleFunction = this.handleHost;
                            break;
                        case ("Sport"):
                            handleFunction = this.handleSport;
                            break;
                        case ("Back"):
                            handleFunction = this.handleBack;
                            break;
                        case ("Open"):
                            handleFunction = this.handleQuickAccess;
                            break;
                        default:
                            handleFunction = () => {
                                console.log("No function found");
                            }
                    }

                    let type = element.buttonType;
                    returnable.push(
                        <RSBButton
                            key={i}
                            text={element.title}
                            buttonType={type}
                            onClickFunction={handleFunction}
                            modalName={element.title}
                        />)
                }
            }, this);
        }
        let modalsInPage = [];

        modalsInPage.push(<RSBMiniModal
            modalID="Sport"
            bodyText="You are in Sport!"
            key={1}
        />)


        return (
            <div>
                {modalsInPage}
                <div className="btn-group quick-access" id="quick">
                    {console.log("Returnable: ", returnable)}
                    {returnable}
                </div>
            </div>
        );
    }
}

export default QuickAccess;
