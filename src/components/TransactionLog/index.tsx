import React, { useEffect } from 'react'

const $ = require("jquery");
$.DataTable = require("datatables.net-bs4");

const dataSet:Array<any> = [
    {
     id: 1,
     name: "Tiger Nixon",
     position: "System Architect",
     office: "Edinburgh",
     ext: 5421,
     date: "2011/04/25",
     salary: "$320,800",
  },
{
     id: 2,
     name: "Garrett Winters",
     position: "Accountant",
     office: "Tokyo",
     ext: 8422,
     date: "2011/07/25",
     salary: "$170,750",
},
{
    id: 3,
    name: "Ashton Cox",
    position: "Junior Technical Author",
    office: "San Francisco",
    ext: 1562,
    date: "2009/01/12",
    salary: "$86,000",
},
];

export default function TransactionLog(){
    var $el:any = undefined

    useEffect(() => {
        $el.DataTable({
            dom: "<'row'<'col-12'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            data: dataSet,
            columns: [
                { title: "Name", data:'name' },
                { title: "Position", data:'position' },
                { title: "Office", data:'office' },
                { title: "Extn.", data: 'ext' },
                { title: "Start date", data:"date" },
                { title: "Salary", data: 'salary' },                
            ]
        })
    })

    return(
        <div className="mt-4 mx-4">
            <table
                className="table table-striped table-hover"
                id="dataTable"
                ref={(el) => {$el = $(el)}}
            />
        </div>
    )
}