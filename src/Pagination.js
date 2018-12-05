import './ScheduleListPage.scss';
import React, { Component } from 'react';
import { BasePage } from '../base/BasePage';
import 'react-tagsinput/react-tagsinput.css'
import { TableComponent } from '../../components/table/TableComponent';
import { getSchedules, deleteSchedule } from '../../services/ScheduleService';
import Pagination from 'react-js-pagination';

class ScheduleListPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          name: 'emails',
          label: 'Enviar para',
          template: (row) => (
            <div>
              {row.emails.length === 0
                ? (<span>Não informado</span>)
                : (<div>
                  <span>{row.emails[0]}</span>
                  {row.emails.length - 1 > 0
                    ? (<span>e outros {row.emails.length - 1} emails</span>)
                    : ('')}
                </div>)
              }
            </div>
          )
        },
        {
          name: 'emails',
          label: 'As notas das empresas',
          template: (row) => (
            <div>
              {row.cnpjs.length === 0
                ? (<span>Não informado</span>)
                : (<div>
                  <span>{row.cnpjs[0]}</span>
                  {row.cnpjs.length - 1 > 0
                    ? (<span>e outros {row.cnpjs.length - 1} cnpjs</span>)
                    : ('')}
                </div>)
              }
            </div>
          )
        },
        {
          name: 'delete',
          label: 'Excluir',
          template: (row) => (
            <button className="btn-delete" onClick={() => { this.deleteSchedule(row) }}>
              <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 125" x="0px" y="0px">
                <path d="M6,34a8,8,0,0,0,8,8V82A16,16,0,0,0,30,98H70A16,16,0,0,0,86,82V42a8,8,0,0,0,8-8V26a8,8,0,0,0-8-8H70V10a8,8,0,0,0-8-8H38a8,8,0,0,0-8,8v8H14a8,8,0,0,0-8,8ZM78,82a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V42H78ZM38,10H62v8H38ZM14,26H86v8H14Z"></path>
                <path d="M34,82a4,4,0,0,0,4-4V54a4,4,0,0,0-8,0V78A4,4,0,0,0,34,82Z"></path>
                <path d="M50,82a4,4,0,0,0,4-4V54a4,4,0,0,0-8,0V78A4,4,0,0,0,50,82Z"></path>
                <path d="M66,82a4,4,0,0,0,4-4V54a4,4,0,0,0-8,0V78A4,4,0,0,0,66,82Z"></path>
              </svg>
            </button>
          )
        }
      ],
      data: [

      ],
      pagination: {
        activePage: 1,
        pageRangeDisplayed: 10,
        totalItemsCount: 0,
        itemsCountPerPage: 10,
      },
    };
    this.createSchedule = this.createSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
  }

  componentDidMount() {
    this.searchSchedules();
  }

  searchSchedules() {
    getSchedules(this.state.pagination.activePage, this.state.pagination.itemsCountPerPage)
      .then((response) => {
        const pagination = this.state.pagination;
        pagination.totalItemsCount = response.data.totalElements;
        this.setState({ pagination });
        this.setState({ data: response.data.content });
      });
  }

  handlePageChange(pageNumber) {
    const pagination = this.state.pagination;
    pagination.activePage = pageNumber;
    this.setState({ pagination });
    this.searchSchedules();
  }

  deleteSchedule(schedule) {
    deleteSchedule(schedule)
      .then(() => {
        this.searchSchedules();
      })
  }

  createSchedule() {
    this.props.history.push('/schedule');
  }

  render() {
    return (
      <BasePage active="browse" title="Agendamentos" history={this.props.history} buttons={[
        <button className="btn-add" onClick={this.createSchedule}>
          <label>Criar agenda</label>
        </button >
      ]}>
        <div className="schedule-list-wrapper">
          <TableComponent columns={this.state.columns} documents={this.state.data} />
          <Pagination
            hideNavigation={true}
            activePage={this.state.pagination.activePage}
            itemsCountPerPage={this.state.pagination.itemsCountPerPage}
            totalItemsCount={this.state.pagination.totalItemsCount}
            pageRangeDisplayed={this.state.pagination.pageRangeDisplayed}
            onChange={this.handlePageChange} />
        </div>
      </BasePage>
    );
  }
}

export { ScheduleListPage };