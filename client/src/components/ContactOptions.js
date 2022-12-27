import React from 'react';
import ContactForm from "./ContactForm";
import ContactController from '../controllers/ContactController';
import { TwitterShareButton } from "react-share";
import { TwitterIcon } from "react-share";
import Api from '../Api';
class ContactOptions extends React.Component {

  componentDidMount() {
    this.setState({});
  }

  deleteContact = () => {
    console.log("***delete", this.props.contact.id)
    const id = this.props.contact.id
    Api.deleteItem(id).then((res) => {
      console.log("delete successfull!!", res.data)
      window.location.reload(true)
    }).catch((err) => {
      console.log("delete front err", err)

    })

  }

  render() {
    return (
      <div>
        <ContactForm openText={'update'} contact={this.props.contact} edit={true} />
        <button className='btn btn-danger' onClick={this.deleteContact}>Delete</button>
        <TwitterShareButton
          title={`Contact info: ${this.props.contact.Fname}, ${this.props.contact.Lname}, ${this.props.contact.Phone},${this.props.contact.Email} and more details contacts owner`}
          url={'https://twitter.com'}
          via={'DonaAda'}
          hashtags={['Contact', 'user']}
        >
          <TwitterIcon size={32} round />

        </TwitterShareButton>
      </div>
    );
  }
}

export default ContactOptions;
