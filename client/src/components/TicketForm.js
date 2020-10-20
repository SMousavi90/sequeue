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

            // <tr>
            //     <td>{r.brand} - {r.model}</td>
            //     <td>{r.startDate}</td>
            //     <td>{r.endDate}</td>
            //     <td>{r.price} €</td>
            //     <td>{r.driverAge === 0 ? 'Under 25' : r.driverAge === 1 ? '25 - 65' : 'Over 65'}</td>
            //     <td>{r.extraDriver}</td>
            //     <td>{r.kilometer === 0 ? '<50 km/day' : r.kilometer === 1 ? '50 ~ 150 km/day' : '>150 km/day'}</td>
            //     <td>{r.extraInsurance === 0 ? 'Yes' : 'No'}</td>
            //     <td>{r.status === 0 ? (<span className="badge badge-warning">Booked</span>) : r.status === 1 ? (<span className="badge badge-danger">Canceled</span>) : (<span className="badge badge-success">Finished</span>)}</td>
            //     <td>{
            //         //  
            //         (r.status === 0 && r.startDate >= new Date().toISOString().slice(0, 10)) ?
            //             <Button variant="danger" className="ml-2" type="button"
            //                 onClick={() => this.cancelReservation(r.id)}>Cancel</Button> : null
            //     }</td>
            // </tr>
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