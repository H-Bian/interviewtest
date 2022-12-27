import React from 'react';
import ContactController from '../controllers/ContactController';
import Api from '../Api';

/**
 * This renders the form for adding/editing a contact.
 * If props.edit is set to true it will attempt to update
 * the contact. If not it will add one.
 */

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.edit && this.props.openText === 'update') {
      this.state = {
        fName: this.props.contact.Fname,
        lName: this.props.contact.Lname,
        email: this.props.contact.Email,
        phone: this.props.contact.Phone,
        imageUrl: this.props.contact.Img,
        id: this.props.contact.id,
        show: false
      };
    } else {
      this.state = {
        fName: '',
        lName: '',
        email: '',
        phone: '',
        imageUrl: "",
        image: "",
        show: false
      };
    }
    this.contacts = new ContactController();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }
  changeImg = (e) => {
    this.setState({ image: e.target.files[0] })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.openText !== 'update') {

      console.log("front $$$$", this.contacts.getAll());
      var Data = new FormData();

      Data.append("photo", this.state.image);
      Data.append("Fname", this.state.fName);
      Data.append("Lname", this.state.lName);
      Data.append("Email", this.state.email);
      Data.append("Phone", this.state.phone);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      Api.addItem(Data, config)
        .then((res) => {
          console.log("inserting data", res.data.result.img)
          this.setState({ imageUrl: res.data.result.img })
          window.location.reload(true)
        })
        .catch(err => {
          console.log("front error~~~", err)
        })
    }
    console.log("open txt", this.props.openText === 'update')
    if (this.props.edit == true && this.props.openText === 'update') {
      console.log("this.props.console.log", this.props.contact.id)

      var Datas = new FormData();

      Datas.append("photo", this.state.image);
      Datas.append("Fname", this.state.fName);
      Datas.append("id", this.props.contact.id);
      Datas.append("Lname", this.state.lName);
      Datas.append("Email", this.state.email);
      Datas.append("Phone", this.state.phone);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      Api.updateItem(Datas, config).then((res) => {
        console.log(res)
        window.location.reload(true)
      }).catch((err) => {
        console.log(err)
      })

    } else {
      this.contacts.add(this.state.fName, this.state.lName, this.state.email, this.state.phone, this.state.imageUrl);
      this.setState({
        fName: '',
        lName: '',
        email: '',
        phone: '',
        imageUrl: "",
        image: "",
      });
    }


    this.hideModal();

  }



  showModal() {
    console.log('show');
    this.setState({
      show: true
    });
  };

  hideModal() {
    this.setState({
      show: false
    });
  };

  render() {

    let modal_title;

    if (this.props.edit) {
      modal_title = 'Update Contact';
    } else {
      modal_title = 'Add Contact';
    }

    let modal;

    if (this.state.show) {
      modal =
        <div className='modal fade show'>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modal_title}</h5>
                <button onClick={this.hideModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">
                      First Name:
                    </label>
                    <input className="form-control" name='fName' type="text" value={this.state.fName} onChange={this.handleChange} />
                  </div>
                  <div>
                    <label>
                      Last Name:
                    </label>
                    <input className="form-control" name='lName' type="text" value={this.state.lName} onChange={this.handleChange} />
                  </div>
                  <div>
                    <label>
                      Email:
                    </label>
                    <input className="form-control" name='email' type="text" value={this.state.email} onChange={this.handleChange} />
                  </div>
                  <div>
                    <label>
                      Phone #:
                    </label>
                    <input className="form-control" name='phone' type="text" value={this.state.phone} onChange={this.handleChange} />
                  </div>
                  <div>
                    <label>
                      Image Url:
                    </label>

                    <input className="form-control" name='imageUrl' type="file" onChange={this.changeImg} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={this.hideModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Save </button>

              </div>
            </div>
          </div>
        </div>;
    }

    return (
      <div>
        <button className='btn btn-primary' onClick={this.showModal}>{this.props.openText}</button>
        {modal}
      </div>
    );
  }
}

export default ContactForm;
