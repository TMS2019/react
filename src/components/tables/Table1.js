import { useTable, useFilters, useGlobalFilter } from "react-table";
import { usePagination, useRowSelect, useSortBy } from "react-table/dist/react-table.development";
import { GlobalFilter, DefaultFilterForColumn } from "./Filter";
import React from "react";
import { Table, TableContainer } from "@mui/material";
import styled from 'styled-components'

const Styles = styled.div`
  padding: 1rem;

  table {
    
    border-spacing: 0;
    border: 1px solid black;

    tr {
      ${'' /* :first-child {
        td {
          border-top: 1px solid black;
        }
      } */}

      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }

    tfoot {
      tr:first-child {
        td {
          border-top: 0px solid black;
        }
      }
      font-weight: bolder;
    }
  }
`
export default function Table1({ columns, data }) {

    // Table component logic and UI come here
    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        footerGroups,
        state,
        visibleColumns,
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        setGlobalFilter,
        preGlobalFilteredRows,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // selectedFlatRows,
        state: { pageIndex, pageSize },//, selectedRowIds },

    } = useTable({
        columns,
        data,
        defaultColumn: { Filter: DefaultFilterForColumn },
    }, useFilters, useGlobalFilter, useSortBy, usePagination, useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        });


    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef()
            const resolvedRef = ref || defaultRef

            React.useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate
            }, [resolvedRef, indeterminate])

            return (
                <>
                    <input type="checkbox" ref={resolvedRef} {...rest} />
                </>
            )
        }
    )
    /* 
      Render the UI for your table
      - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
    */
    return (
        <div style={{ overflow: "auto" }}>
            <Styles>
                <TableContainer>
                    <Table {...getTableProps()}  >
                        <thead>
                            <tr>
                                <th
                                    colSpan={visibleColumns.length}
                                    style={{
                                        textAlign: "left",
                                    }}
                                >
                                    {/* Rendering Global Filter */}
                                    <GlobalFilter
                                        preGlobalFilteredRows={preGlobalFilteredRows}
                                        globalFilter={state.globalFilter}
                                        setGlobalFilter={setGlobalFilter}
                                    />
                                </th>
                            </tr>
                            {headerGroups.map(headerGroup => (
                                <tr  {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                    : ''}
                                            </span>
                                            {/* Rendering Default Column Filter */}
                                            <div>
                                                {column.canFilter ? column.render("Filter")
                                                    : null}
                                            </div>


                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            {footerGroups.map(group => (
                                <tr {...group.getFooterGroupProps()}>
                                    {group.headers.map(column => (
                                        <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                                    ))}
                                </tr>
                            ))}
                        </tfoot>
                    </Table>
                    <div className="pagination box" style={{ width: "600px" }}>
                        <button className="button " onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'<<'}
                        </button>{' '}
                        <button className="button " onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'<'}
                        </button>{' '}
                        <button className="button " onClick={() => nextPage()} disabled={!canNextPage}>
                            {'>'}
                        </button>{' '}
                        <button className="button " onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            {'>>'}
                        </button>{' '}
                        <span >
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                        <span >
                            | Go to page:{' '}
                            <input
                                type="number" className="input"
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(page)
                                }}
                                style={{ width: '100px' }}
                            />
                        </span>{' '}
                        <select className="select"
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedRowIds: selectedRowIds,
                            'selectedFlatRows[].original': selectedFlatRows.map(
                                d => d.original
                            ),
                        },
                        null,
                        2
                    )}
                </code>
            </pre> */}
                </TableContainer>

            </Styles>
        </div>);

}