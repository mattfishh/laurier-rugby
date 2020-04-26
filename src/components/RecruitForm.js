import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import './Recruits.css';

const GOOGLE_FORM_NAME_ID = 'entry.2037508998';
const GOOGLE_FORM_POSITION_ID = 'entry.1900431982';
const GOOGLE_FORM_HEIGHT_ID = 'entry.723380901';
const GOOGLE_FORM_WEIGHT_ID = 'entry.866028589';
const GOOGLE_FORM_HS_ID = 'entry.743645363';
const GOOGLE_FORM_EMAIL_ID = 'entry.534914510';
const GOOGLE_FORM_PROGRAMS_ID = 'entry.1567524117';
const GOOGLE_FORM_MSG_ID = 'entry.2045546776';

const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSf5PE91hDhEeyU_BUw2q52bvxDaIFOozIyHaeJy1z37R-RPJA/formResponse"
class RecruitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInputValue: '',
            positionInputValue: '',
            heightInputValue: '',
            weightInputValue: '',
            highSchoolInputValue: '',
            emailInputValue: '',
            dupEmailInputValue: '',
            interestedInputValue: '',
            personalMsgInputValue: '',
            errorMsgClass: 'cleanInputMsg',
            errorMsgText: ''
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    };

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }
    
    handleSubmit(event) {
        event.preventDefault(); 
        var valid = true;

        const inputTargets =[this.state.nameInputValue.trim(),this.state.positionInputValue.trim(),this.state.heightInputValue.trim(),this.state.weightInputValue.trim(),this.state.highSchoolInputValue.trim(),this.state.emailInputValue.trim(),this.state.emailInputValue.trim(), this.state.dupEmailInputValue.trim(), this.state.interestedInputValue.trim(), this.state.personalMsgInputValue.trim()]
        const inputTargetsLength = 9

        {/*Error handling function for duplicate emails, non-empty fields. Set states for the error message class and text */}
        for (var i = 0; i < inputTargetsLength; i++) {
            if (inputTargets[i] === '') {
                valid = false
            }
        }

        if (valid=== false) {
            this.setState({
                errorMsgClass: 'errorMsg',
                errorMsgText: 'Ensure all form fields are populated.'
            })
        }

        if (this.state.emailInputValue.trim() !== this.state.dupEmailInputValue.trim()) {
            valid = false;
            this.setState({errorMsgClass: 'errorMsg',errorMsgText: 'Inputted e-mails must match.'})
        }

        if (valid) {
            this.setState({errorMsgClass: 'successMsg',errorMsgText: 'Message Sent Successfully'})
            this.sendMessage()
        }
    }

    sendMessage() {
        {/* Create form data object to pas sover inputs, to previously identified entry ids in a google form*/}
        const formData = new FormData()

        formData.append(GOOGLE_FORM_NAME_ID, this.state.nameInputValue)
        formData.append(GOOGLE_FORM_POSITION_ID, this.state.positionInputValue)
        formData.append(GOOGLE_FORM_HEIGHT_ID, this.state.heightInputValue)
        formData.append(GOOGLE_FORM_WEIGHT_ID, this.state.weightInputValue)
        formData.append(GOOGLE_FORM_HS_ID, this.state.highSchoolInputValue)
        formData.append(GOOGLE_FORM_EMAIL_ID, this.state.emailInputValue)
        formData.append(GOOGLE_FORM_PROGRAMS_ID, this.state.interestedInputValue)
        formData.append(GOOGLE_FORM_MSG_ID, this.state.personalMsgInputValue)

        {/* Use axios to send the formData object to the google form*/}
        axios.post(GOOGLE_FORM_ACTION_URL, formData) 

        {/* Reset state values*/}
        this.setState({
            nameInputValue: '',
            positionInputValue: '',
            heightInputValue: '',
            weightInputValue: '',
            highSchoolInputValue: '',
            emailInputValue: '',
            dupEmailInputValue: '',
            interestedInputValue: '',
            personalMsgInputValue: '',
        })
    }

    render() {
        return (
            <div class = "pageContainer">
                <div class="formDiv">  
                    <p class={this.state.errorMsgClass}>{this.state.errorMsgText}</p>
                    <h3 class="formTitle">CONTACT THE COACHES</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label class="formLabel" >Name</label>
                        <input class = "formInput" name="nameInputValue" value={this.state.nameInputValue} onChange={this.handleChange} />
                        <br/>

                        <label class="formLabel">Position</label>
                        <input class = "formInput" name="positionInputValue" value={this.state.positionInputValue} onChange={this.handleChange} />
                        <br/>

                        <label class="formLabel">Height</label>
                        <input class = "formInput" name="heightInputValue" value={this.state.heightInputValue} onChange={this.handleChange} />
                        <br/>

                        <label class="formLabel">Weight</label>
                        <input class = "formInput" name="weightInputValue" value={this.state.weightInputValue} onChange={this.handleChange} />
                        <br/>

                        <label class="formLabel">High School</label>
                        <input class = "formInput" name="highSchoolInputValue" value={this.state.highSchoolInputValue} onChange={this.handleChange} />
                        <br/>

                        <label class="formLabel">Email</label>
                        <input class = "formInput" name="emailInputValue" value={this.state.emailInputValue} onChange={this.handleChange} />
                        <br/>

                        <label class="formLabel">Confirm Email Address</label> 
                        <input class = "formInput" name="dupEmailInputValue" value={this.state.dupEmailInputValue} onChange={this.handleChange} />
                        <br/>

                        <label class="formLabel">Programs of Interest</label>
                        <input class = "formInput" name="interestedInputValue" value={this.state.interestedInputValue} onChange={this.handleChange} />
                        <br/>
            
                        <label class="formLabelTA">Add an introductory message here: </label>
                        <br/>
                        <textarea class = "formTextArea" name="personalMsgInputValue" value={this.state.personalMsgInputValue} onChange={this.handleChange} />

                        <br/>

                        <Button variant="outline-light" type="submit" size="lg" block>Submit</Button>

                    </form>
                </div>
            </div>
        );
    }
}

export default RecruitForm;