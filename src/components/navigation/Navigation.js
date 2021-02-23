import React from 'react';

class Navigation extends React.Component {
    render() {
      return (
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
                <ul class="nav flex-column">
                    {this.props.menuItems ? this.props.menuItems.forEach(element => {
                        return ( 
                            <li class="nav-item">
                                <a class="nav-link" href={element.link}>
                                    {element.name}
                                </a>
                            </li>
                        )
                    }) : ""}
                </ul>

                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Regions</span>
                </h6>
                <ul class="nav flex-column mb-2">
                    {this.props.regions ? this.props.regions.forEach(element => {
                        return ( 
                            <li class="nav-item">
                                <a class="nav-link" href={element.link}>
                                    {element.name}
                                </a>
                            </li>
                        )
                    }) : ""}
                </ul>
            </div>
        </nav>
      );
    }
}

export default Navigation;
