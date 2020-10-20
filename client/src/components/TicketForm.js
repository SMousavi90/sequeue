import React from 'react';
import API from "../api/API"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class ReservationHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { requestTypes: [], ticket: null, show: false }
    }

    insertTask(service){
        API.reserveSpot(service)
        .then((res) => {
            console.log(res);
            this.setState({ticket: res, show: true});
        })
        .catch((errorObj) => {
            console.log(errorObj);
        });
    }

    componentDidMount() {
        API.getRequestTypes()
            .then((r) => {
                this.setState({ requestTypes: r });
            })
            .catch((errorObj) => {
                console.log(errorObj);
            });
    }

    createRequestTypes = (r) => {
        return (
            <div className="col-md-12 mt-5">
                <div className="card mb-12 shadow-sm">
                    {/* <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
                    <div className="card-body">
                        <p className="card-text">{r.tagName}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">Service time: {r.estimationTime}m</small>
                            <div className="btn-group">
                                <Button type="button" className="btn btn-sm" onClick={() => this.insertTask(r)}>Take a Ticket!</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleClose = () => this.setState({show: false});

    showTicketModal = () => {
        if (this.state.ticket != null){
        return(
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Your ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Ticket number: {this.state.ticket.TicketId}</h4>
                <p>Estimated waiting time: {this.state.ticket.EstimatedWaitingTime} min</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        );
        }else{
            return <></>;
        }
    }

    render() {
        return (
            <div className="container below-nav">
                {this.showTicketModal()}
                <div className="row">
                    {this.state.requestTypes.map(this.createRequestTypes)}
                    
                </div>
                
            </div>
        );
    }
}

export default ReservationHistory;