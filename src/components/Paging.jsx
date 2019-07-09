import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class Paging extends React.Component {

    onPageChange = page => event => {
        this.props.onPageChange(page);
    }

    render() {

        const { totalPosts, pageSize, pageNumber } = this.props;
        const totalPages = Math.ceil(totalPosts.length / pageSize);

        return (
            <div>
                <Pagination>
                    <PaginationItem>
                        <PaginationLink
                            first
                            onClick={this.onPageChange(1)}
                        />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink
                            previous
                            disabled={pageNumber === 1 ? true : false}
                            onClick={this.onPageChange(pageNumber - 1)}
                        />
                    </PaginationItem>
                    {pageNumber > 2
                        ? <React.Fragment>
                            <PaginationItem>
                                <PaginationLink onClick={this.onPageChange(1)}>
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink>
                                    ...
                                </PaginationLink>
                            </PaginationItem>
                        </React.Fragment>
                        : null
                    }

                    <PaginationItem active>
                        <PaginationLink>
                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>

                    {totalPages - pageNumber > 1
                        ? <React.Fragment>
                            <PaginationItem>
                                <PaginationLink>
                                    ...
                            </PaginationLink>
                            </PaginationItem>
                        </React.Fragment>
                        : null
                    }

                    {(totalPages > 1 && totalPages !== pageNumber)
                        ? <PaginationItem>
                            <PaginationLink onClick={this.onPageChange(totalPages)}>
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                        : null
                    }

                    <PaginationItem>
                        <PaginationLink
                            next
                            disabled={pageNumber === totalPages ? true : false}
                            onClick={this.onPageChange(pageNumber + 1)}
                        />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink
                            last
                            onClick={this.onPageChange(totalPages)}
                        />
                    </PaginationItem>
                </Pagination>
            </div>
        )
    }
}

export default Paging;