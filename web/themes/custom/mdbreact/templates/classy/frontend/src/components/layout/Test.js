import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { MDBDataTable } from 'mdbreact'

import { getMachines, addMachine } from '../../actions/machines'
import { getProcessAndScreen } from '../../actions/processandscreen'

export class Test extends Component {

    constructor(props) {
        super(props)
        this.state = {
            machine: 0,
            dateStart: '',
            dateEnd: '',
            comp: '',
            owner: '',
            filter: false,
            filterBtn: "Фильтр",
            dateNow: '',
            active: false,
            load: []
        }
    }

    toggleClass() {
        this.setState({ active: !this.state.active })
    };

    static propTypes = {
        addMachine: PropTypes.func.isRequired,
        getMachines: PropTypes.func.isRequired,
        machines: PropTypes.array.isRequired,
        getProcessAndScreen: PropTypes.func.isRequired,
        processandscreen: PropTypes.array.isRequired,
    }

    onSubmitFilter = e => {
        e.preventDefault()
        if (this.state.filter == false) {
            this.setState({ filter: true, filterBtn: "Убрать фильтр" })
        } else {
            this.setState({ filter: false, filterBtn: "Фильтр" })
        }
    }

    onSubmitAddMachine = e => {
        e.preventDefault()
        this.props.addMachine(this.state.comp, this.state.owner)
        setTimeout(() => {
            this.updateData()
        }, 500);
    }


    onChange = e => this.setState({ [e.target.name]: e.target.value })

    componentDidMount() {
        this.getDateForFilter()
        this.updateData()
    }

    updateData() {
        this.props.getMachines()
        this.setState({ load: this.props.processandscreen })
        this.props.getProcessAndScreen()
        this.getNowDate()
        this.setState({ load: this.props.processandscreen })
    }

    getNowDate() {
        var date;
        date = new Date();
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + (date.getUTCHours() + 5)).slice(-2) + ':' +
            ('00' + (date.getUTCMinutes() - 5)).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);
        this.setState({ dateNow: date })
    }

    getDateForFilter() {
        const date = new Date()
        this.setState({
            dateStart: date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + (('0' + date.getDate()).slice(-2) - 1) + "T00:00:00",
            dateEnd: date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + "T00:00:00"
        })
    }

    setMachine(id) {
        this.setState({ machine: id })
    }

    render() {
        console.log(this.state.load.length + " - " + this.props.processandscreen.map(u => u.process).length)
        const { dateStart, dateEnd, filterBtn, comp, owner } = this.state
        const urlsTableNone = {
            columns: [
                {
                    label: 'Время',
                    field: 'datetime',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Сайт',
                    field: 'url',
                    sort: 'asc',
                    width: 200
                },
            ],
            rows: this.props.processandscreen.filter(uf => this.state.filter == false ?
                uf.type == "url" :
                uf.type == "url" && uf.datetimef >= this.state.dateStart && uf.datetimef <= this.state.dateEnd).
                map(u => ({
                    datetime: u.datetime,
                    url: <a target="_blank" href={"https://" + u.url}>{u.url.split("/")[0]}</a>
                }))
        }

        const urlsTableMachine = {
            columns: [
                {
                    label: 'Время',
                    field: 'datetime',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Сайт',
                    field: 'url',
                    sort: 'asc',
                    width: 200
                },
            ],
            rows: this.props.processandscreen.filter(uf => this.state.filter == false ?
                uf.type == "url" && uf.machine == this.state.machine :
                uf.type == "url" && uf.machine == this.state.machine && uf.datetimef >= this.state.dateStart && uf.datetimef <= this.state.dateEnd).
                map(u => ({
                    datetime: u.datetime,
                    url: <a target="_blank" href={"https://" + u.url}>{u.url.split("/")[0]}</a>
                }))
        }

        const processTableNone = {
            columns: [
                {
                    label: 'Время',
                    field: 'datetime',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Процесс',
                    field: 'process',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Активное окно',
                    field: 'active_window',
                    sort: 'asc',
                    width: 200
                }
            ],
            rows: this.props.processandscreen.filter(uf => this.state.filter == false ?
                uf.type == "process" :
                uf.type == "process" && uf.datetimef >= this.state.dateStart && uf.datetimef <= this.state.dateEnd).
                map(u => ({
                    datetime: u.datetime,
                    process: u.process,
                    active_window: u.active_window.indexOf(' ') == -1 ? u.active_window.substring(10, -10) : u.active_window
                }))
        }

        const processTableMachine = {
            columns: [
                {
                    label: 'Время',
                    field: 'datetime',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Процесс',
                    field: 'process',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Активное окно',
                    field: 'active_window',
                    sort: 'asc',
                    width: 200
                }
            ],
            rows: this.props.processandscreen.filter(uf => this.state.filter == false ?
                uf.type == "process" && uf.machine == this.state.machine :
                uf.type == "process" && uf.machine == this.state.machine && uf.datetimef >= this.state.dateStart && uf.datetimef <= this.state.dateEnd).
                map(u => ({
                    datetime: u.datetime,
                    process: u.process,
                    active_window: u.active_window.indexOf(' ') > 0 ? u.active_window : u.active_window.substr(10, -10)
                }))
        }

        if (this.props.processandscreen.map(u => u.process).length == 0) {
            return (
                <div style={{ width: "100%", height: "100%", top: 0, left: 0, position: "fixed", backgroundColor: "#fff", zIndex: "9999" }}>
                    <img src="https://cdn.dribbble.com/users/829077/screenshots/4634803/flying_clock.gif" className="img-fluid rounded-circle"
                        style={{ position: "absolute", zIndex: "9999", opacity: "1", top: "50%", left: "50%", width: 400, height: 400, margin: "-200px 0 0 -200px" }} />
                </div>
            )
        } else {
            return (
                <Fragment>
                    <header>
                        <nav className="navbar fixed-top navbar-expand-lg navbar-dark white">
                            <div className="nav-btn text-right w-100">
                                <button className="navbar-toggler snavbar float-right grey" onClick={() => this.toggleClass()} type="button" >
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </div>
                        </nav>
                        <div className="logodiv fixed-top waves-effect">
                            <a className="black-text" onClick={() => this.setMachine("0")}>

                                <h3 className="mt-2 ml-5">
                                    Рабочее время
                </h3>

                            </a>
                        </div>
                    </header>
                    <div className={this.state.active ? 'side-nav bg-white ssbar' : 'side-nav bg-white'}>
                        <ul className="custom-scrollbar">
                            <li>

                                <button className="btn btn-sm btn-whine black-text mt-4 ml-5 z-depth-3 waves-effect" onClick={() => this.updateData()}>Обновить</button>

                                <div className="list-group list-group-flush mt-1" id="lgu">
                                    {this.props.machines.map(m => <a className="list-group-item list-group-item-action waves-effect" key={m.id} onClick={() => this.setMachine(m.id)}>
                                        {m.machine} &nbsp;
                                        {this.props.processandscreen.filter(pf => pf.machine == m.id &&
                                            new Date(pf.datetime) >= new Date(this.state.dateNow)).
                                            map(p => p.id).length > 0 ?
                                            <span type="button" className="cg"></span> :
                                            <span type="button" className="cw"></span>
                                        }
                                    </a>)}

                                    <div className="fixed-bottom mb-5 ml-4 pb-4">
                                        <button className="btn btn-white" data-toggle="modal" data-target="#AddMachine">Добавить
                    компьютер</button>
                                        <br />
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="sidenav-bg rgba-blue-strong1"></div>
                    </div>

                    <main className="pt-1 mx-lg-5">
                        <div className="modal fade" id="AddMachine" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <form onSubmit={this.onSubmitAddMachine}>
                                    <div className="modal-content">
                                        <div className="modal-header text-center">
                                            <h4 className="modal-title w-100 font-weight-bold">Добавление машины</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body mx-3">
                                            <div className="md-form mb-5">
                                                <i className="fas fa-envelope prefix grey-text"></i>
                                                <input type="text"
                                                    id="defaultForm-email"
                                                    className="form-control validate"
                                                    name="comp"
                                                    onChange={this.onChange}
                                                    value={comp} />
                                                <label data-error="wrong" data-success="right" htmlFor="defaultForm-email">Имя компьютера</label>
                                            </div>

                                            <div className="md-form mb-4">
                                                <i className="fas fa-lock prefix grey-text"></i>
                                                <input type="text"
                                                    id="defaultForm-pass"
                                                    className="form-control validate"
                                                    name="owner"
                                                    onChange={this.onChange}
                                                    value={owner} />
                                                <label data-error="wrong" data-success="right" htmlFor="defaultForm-pass">Владелец</label>
                                            </div>

                                        </div>
                                        <div className="modal-footer d-flex justify-content-center" data-toggle="modal" data-target="#AddMachine">
                                            <button className="btn btn-white" type="submit">Добавить</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="container-fluid mt-3">
                            <div className="row wow fadeIn">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <form className="col-sm-12" onSubmit={this.onSubmitFilter}>
                                                <div className="md-form input-group mb-4">
                                                    <div className="input-group-append">
                                                        <input type="datetime-local"
                                                            className="form-control"
                                                            name="dateStart"
                                                            onChange={this.onChange}
                                                            value={dateStart} />
                                                    </div>
                                                    <div className="input-group-append">
                                                        <input type="datetime-local"
                                                            className="form-control"
                                                            name="dateEnd"
                                                            onChange={this.onChange}
                                                            value={dateEnd} />
                                                    </div>
                                                    <div className="input-group-append">
                                                        <input className="btn btn-sm btn-black" type="submit" id="filterbtn" value={filterBtn} />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid mt-1">
                            <div className="row wow fadeIn">
                                <div className="col-md-12 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <ul className="nav nav-tabs mb-5" id="myTab" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active black-text" data-toggle="tab" href="#tab1" role="tab" aria-selected="true">Скриншоты</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link  black-text" data-toggle="tab" href="#tab2" role="tab" aria-selected="false">Процессы</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link  black-text" data-toggle="tab" href="#tab3" role="tab" aria-selected="false">Сайты</a>
                                                </li>
                                            </ul>
                                            <div className="tab-content" id="myTabContent">
                                                <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">


                                                    <div className="row">
                                                        {this.state.filter == true ? this.state.machine == 0 ? this.props.processandscreen.filter(pf => pf.type == "screenshot" && pf.datetimef >= this.state.dateStart && pf.datetimef <= this.state.dateEnd).map(p =>
                                                            <div className="col-lg-3 col-md-6 mb-4" key={p.id}>
                                                                <div className="card collection-card z-depth-1-half">
                                                                    <a data-fancybox="gallery" href={p.image}>
                                                                        <img src={p.image} className="img-responsive img-fluid" alt="picture" />
                                                                        <h6 className="black-text text-center">{p.datetime}</h6>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        ) : this.props.processandscreen.filter(pf => pf.type == "screenshot" && pf.machine == this.state.machine && pf.datetimef >= this.state.dateStart && pf.datetimef <= this.state.dateEnd).map(p =>
                                                            <div className="col-lg-3 col-md-6 mb-4" key={p.id}>
                                                                <div className="card collection-card z-depth-1-half">
                                                                    <a data-fancybox="gallery" href={p.image}>
                                                                        <img src={p.image} className="img-responsive img-fluid" alt="picture" />
                                                                        <h6 className="black-text text-center">{p.datetime}</h6>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        ) : this.state.machine == 0 ? this.props.processandscreen.filter(pf => pf.type == "screenshot").map(p =>
                                                            <div className="col-lg-3 col-md-6 mb-4" key={p.id}>
                                                                <div className="card collection-card z-depth-1-half">
                                                                    <a data-fancybox="gallery" href={p.image}>
                                                                        <img src={p.image} className="img-responsive img-fluid" alt="picture" />
                                                                        <h6 className="black-text text-center">{p.datetime}</h6>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        ) : this.props.processandscreen.filter(pf => pf.type == "screenshot" && pf.machine == this.state.machine).map(p =>
                                                            <div className="col-lg-3 col-md-6 mb-4" key={p.id}>
                                                                <div className="card collection-card z-depth-1-half">
                                                                    <a data-fancybox="gallery" href={p.image}>
                                                                        <img src={p.image} className="img-responsive img-fluid" alt="picture" />
                                                                        <h6 className="black-text text-center">{p.datetime}</h6>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                                                    <MDBDataTable
                                                        striped
                                                        bordered
                                                        small
                                                        noBottomColumns
                                                        data={this.state.machine == 0 ? processTableNone : processTableMachine}
                                                    />
                                                </div>
                                                <div className="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                                                    <MDBDataTable
                                                        striped
                                                        bordered
                                                        small
                                                        noBottomColumns
                                                        data={this.state.machine == 0 ? urlsTableNone : urlsTableMachine}
                                                    />
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </Fragment >
            )
        }

    }
}

const mapStateToProps = state => ({
    machines: state.machines.machines,
    processandscreen: state.processandscreen.processandscreen
})

export default connect(mapStateToProps, { getMachines, getProcessAndScreen, addMachine })(Test)