import React, { Component } from "react";

class StandarPaginator extends Component {
  constructor(props) {
    super(props);

    this.state = this.initState();
  }

  componentDidMount() {
    if (this.props.pageSetttings) {
      if (!this.props.pageSetttings.paginated) {
        this.initPaginator(this.props.pageSetttings);
      } else {
        this.setState(this.props.pageSetttings);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pageSetttings !== this.props.pageSetttings) {
      this.setState(this.props.pageSetttings);
    }

    if (!this.props.pageSetttings.paginated) {
      this.initPaginator(this.props.pageSetttings);
    }
  }

  initPaginator = settings => {
    if (settings.list) {
      const newlist = settings.list.slice(0, settings.size);
      const newsettings = {
        ...settings,
        paginated: true
      };
      this.props.setActualPage(newlist, newsettings);
    }
  };

  setNewPage = e => {
    const limit = this.state.list.length;
    const newpage = parseInt(e.target.dataset.page);
    const start = newpage * this.state.size;
    const end =
      start + this.state.size > limit ? limit : start + this.state.size;

    const newlist = this.state.list.slice(start, end);
    const newsettings = {
      ...this.state,
      page: newpage,
      paginated: true
    };
    this.props.setActualPage(newlist, newsettings);
  };

  buildPaginator = () => {
    const chunks = Math.ceil(this.state.list.length / this.state.size);
    if (chunks > 1) {
      let list = new Array(chunks);
      for (let i = 0; i < list.length; i++) {
        list[i] = (
          <li
            key={`paginator-${i}-${this.state.id}`}
            className={this.state.page === i ? `active` : null}
          >
            <button onClick={this.setNewPage} data-page={i}>
              {i + 1}
            </button>
          </li>
        );
      }

      return (
        <ul>
          {this.state.page > 0 ? (
            <li>
              <button
                onClick={this.setNewPage}
                data-page={this.state.page - 1}
                className="krt-page-action"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            </li>
          ) : null}
          {list}
          {this.state.page < chunks - 1 ? (
            <li>
              <button
                onClick={this.setNewPage}
                data-page={this.state.page + 1}
                className="krt-page-action"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </li>
          ) : null}
        </ul>
      );
    } else {
      return null;
    }
  };

  initState = () => {
    return {
      id: Math.random(),
      size: 10,
      page: 0,
      list: false,
      paginated: false
    };
  };

  render() {
    return this.state.list ? (
      <div className="krt-standar-paginator">{this.buildPaginator()}</div>
    ) : null;
  }
}

export default StandarPaginator;
