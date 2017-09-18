import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import '../App.css';
import './quickAccess.css';
import RSB_Button from '../../components_generic/RSB_Button';
import RSB_Host_Modal from '../host-page/hostPage';
import RSB_Mini_Modal from '../../components_generic/RSB_Info_Modal';


class QuickAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
            modalInfo: this.props.modalInfo,
        }

        //ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself
        this.handleQuickAccess = this.handleQuickAccess.bind(this);
        this.render = this.render.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleSport = this.handleSport.bind(this);
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
        console.log("Host button clicked!");
    }

    handleSport() {
        console.log("sport button clicked!");
    }

    handleBack() {
        this.setState(() => {
            return {
                content: this.toggleQuickAccessButtons(),
            }
        })
        console.log("State", this.state);
    }


    render() {

        let returnable = [];
        this.state.content.forEach((element) => {
            let handleFunction;
            if (element.visible) {
                switch (element.title) {
                    case ("Host"):
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
                    <RSB_Button
                        text={element.title}
                        buttonType={type}
                        onClickFunction={handleFunction}
                        modalName={element.title}
                    />)
            }
        }, this);

        let modalsInPage = [];

        modalsInPage.push(<RSB_Mini_Modal
            modalID="Sport"
            bodyText="You are in Sport!"
        />)
        modalsInPage.push(<RSB_Host_Modal
            modalID="Host"
        />)


        return (
            <div>
                {modalsInPage}
                <div className="btn-group quick-access" id="quick">
                    {/* {console.log("Returnable: ", returnable)} */}
                    {returnable}
                </div>
            </div>
        );
    }
}

export default QuickAccess;
