import React from 'react';
import API from "../api/API"
import Button from 'react-bootstrap/Button';

class ReservationHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { requestTypes: [] }
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
                            <small className="text-muted">Estimated time: {r.estimationTime}m</small>
                            <div className="btn-group">
                                <Button type="button" className="btn btn-sm">Take a Ticket!</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container below-nav">
                <div className="row">
                    {this.state.requestTypes.map(this.createRequestTypes)}
                </div>
            </div>
        );
    }
}

export default ReservationHistory;