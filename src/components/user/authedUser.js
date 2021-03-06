import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import editAuthedUser from '../../actions/editAuthedUser'
import { Link } from 'react-router-dom'

class authedUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.user.name,
            email: this.props.user.email,
            id: this.props.user.id,
            messages: this.props.messages
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    renderErrors() {
        if (!!this.props.messages) {
            return this.props.messages.map((x, i) => {
                return <div className="alert alert-light" key={i}>{x}</div>
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.dispatch(editAuthedUser({ ...this.state, auth: this.props.auth }))
    }

    onDrop = (acceptedFiles) => {
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onloadend = () => {
            console.log('fired', acceptedFiles[0])
            debugger
            const binaryStr = reader.result
            const { messages, ...sendData } = this.state
            this.props.dispatch(editAuthedUser({ ...sendData, auth: this.props.auth, avatar: acceptedFiles[0] }))
        }

        acceptedFiles.forEach(file => reader.readAsBinaryString(file))
        
    }

    render() {
        if (this.props.edit === true) {
            return (
                <div className="card container" style={{ width: "18rem" }}>
                    <div clas="card-body">
                        <h5> Your User Page (Editting) </h5><br></br>
                        {this.renderErrors()}
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} /><br></br>
                            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} /><br></br>
                            <div>Id: {this.props.user.id} <strong>can not be editted</strong></div>
                            <button className="btn btn-light" type="submit">Save Changes</button><br></br>
                            <Link className="badge badge-light" to={`/users/${this.props.user.id}`}>Back to your Homepage</Link>
                        </form>
                    </div><br></br>
                    <Dropzone
                        onDrop={this.onDrop}
                        
                    >
                        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {!isDragActive && 'Click here or drop a file to upload!'}
                                {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                {isDragReject && "File type not accepted, sorry!"}
                            </div>
                        )}
                    </Dropzone>
                </div>)
        } else {
            return (
                <div className="card container" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5> Your User Page </h5><br></br>
                        <br></br>
                        <div>Name: {this.props.user.name}</div>
                        <div>Email: {this.props.user.email}</div>
                        <div>Id: {this.props.user.id}</div><br></br>
                        <Link className="badge badge-light" to={`/users/${this.props.user.id}/edit`}>Edit your Info</Link>
                    </div>
                </div>
            )
        }
    }
}



export default connect(state => { return { user: state.user, auth: state.login.auth, messages: state.messages } })(authedUser)


