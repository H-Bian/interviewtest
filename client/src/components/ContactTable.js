import React from 'react';
import ContactRow from "./ContactRow";
import Api from '../Api';
import ContactController from '../controllers/ContactController';
import ContactOptions from "./ContactOptions";


/**
 * This renders a list of contacts. Upon the event
 * 'contactChange' it will refresh the list.
 */

class ContactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      search: "",
      searchResult: [],
    }
  }


  componentDidMount() {
    Api.showItem().then(res => {
      console.log(res.data.result)
      this.setState({
        entries: res.data.result,
      })
    })
      .catch(error => {
        console.log("front has some erroror", error)
      })

    window.addEventListener('contactChange', this.updateContacts);
  }

  updateContacts = () => {
    this.contactController = new ContactController();
    this.setState(
      {
        contacts: this.contactController.getAll()
      }
    );
    this.contacts = this.contactController.getAll();
  }
  changeSearchVal = (e) => {
    this.setState({
      search: e.target.value
    })
  }
  SearchByName = (e) => {
    e.preventDefault();
    console.log(this.state.search)
    let searchname = this.state.search

    // console.log("search result+++", [...this.state.entries].filter(datas => datas.Email.match(searchname)))
    this.setState({
      searchResult: [...this.state.entries].filter(datas => datas.Email.match(searchname))
    })

  }

  render() {
    return (
      <>
        <h1>search data</h1>
        <input type={'text'} placeholder={'search by email'} onChange={this.changeSearchVal} ></input>
        <button onClick={this.SearchByName}>search</button>

        <table className='table'>
          <thead>
            <tr className="contact-row">
              <th>image</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone #</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.searchResult ? <div>{this.state.searchResult.map((ele, index) => {
                return (
                  <tr data-key={ele.id} className="contact-row">
                    <td>
                      <img alt='User Profile' className='thumbnail' src={`http://localhost:8005/img/${ele.Img}`} />
                    </td>
                    <td>{ele.Fname}</td>
                    <td>{ele.Lname}</td>
                    <td>{ele.Email}</td>
                    <td>{ele.Phone}</td>
                  </tr>

                )
              })

              }</div> : <div>no data</div>
            }
          </tbody>
        </table>
        <h1>show data</h1>
        <table className='table'>

          <thead>
            <tr className="contact-row">
              <th>image</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone #</th>
              <th>options</th>
            </tr>
          </thead>
          <tbody>

            {
              this.state.entries ? this.state.entries.map((ele, index) => {
                return (
                  <tr data-key={ele.id} className="contact-row">
                    <td>
                      <figure>
                        <img alt='User Profile' className='thumbnail' src={`http://localhost:8005/img/${ele.Img}`} />

                      </figure>


                    </td>
                    <td>{ele.Fname}</td>
                    <td>{ele.Lname}</td>
                    <td>{ele.Email}</td>
                    <td>{ele.Phone}</td>

                    <td>
                      <ContactOptions contact={ele} />
                    </td>
                  </tr>

                )
              }) : <div>no data</div>
            }




          </tbody>
        </table>
      </>
    );
  }
}

export default ContactTable;
