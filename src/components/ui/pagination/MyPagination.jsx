import React from 'react';
import {getPagesArray} from "../../../utils/page";
import classes from "./MyPagination.module.css";

const MyPagination = ({totalPages, page, changePage}) => {
    let pageArray = getPagesArray(totalPages);
    return (
        <div className={classes.pageWrapper}>
            {pageArray.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? [classes.page, classes.pageCurrent].join(' ') : classes.page}>
                        {p}
                    </span>
            )}
        </div>
    );
};

export default MyPagination;