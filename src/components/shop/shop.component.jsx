import React from 'react';
import './shop.styles.css';

class Shop extends React.Component {
    constructor() {
        super();
        this.state = {
            data:   {
                table1: 
                [
                    {
                                id: 0,
                                firstname : "",
                                surname: "",
                                 email: ""
                    },
                    {
                                id: 1,
                                firstname : "Chris",
                                surname: "Ho",
                                email: "chris@hkmouse.com"
                    },
                    {
                                id: 2,
                                firstname : "Yoie",
                                surname: "Cheung",
                                email: "yoie@hkmouse.com"
                    },
                    {
                                id: 3,
                                firstname : "Evellin",
                                surname: "Ho",
                                email: "evellin@hkmouse.com"
                    },
                    {
                                id: 4,
                                firstname : "Jason",
                                surname: "Ho",
                                email: "jason@hkmouse.com"
                                }
                ],
                table2: 
                    [
                      {
                        id: 0,
                        firstname : "",
                        surname: "",
                        email: ""
            },
            {
                        id: 1,
                        firstname : "Chris",
                        surname: "Ho",
                        email: "chris@hkmouse.com"
            },
            {
                        id: 2,
                        firstname : "Yoie",
                        surname: "Cheung",
                        email: "yoie@hkmouse.com"
            } 
                    ]
            },
    user:   {
            currentUser: 'Chris Ho'
            }
            }
            
        }

    onChangeInput = (event, table, row, fieldname) => {
        const { value } = event.target;
        console.log('Start onChangeInput. You are changing table:'+table+" row:"+row+' field:'+fieldname);
        const myData   = this.state.data;
        const myTable = myData[table];
        const item     = myTable[row];
        item[fieldname]     = value;
        this.setState({data: myData});
    };

    onClickButtonDeleteRow = (event, table, index) => {
        console.log('Start onClickButtonDeleteRow. You are deleting '+table+" at index "+index);
        const myData   = this.state.data;
        const myTable  = myData[table];
        myTable.splice(index,1)
        this.setState({data: myData});
    };

    onClickButtonAddRow = (event, table) => {
        console.log('Start onClickButtonDeleteRow. You are adding new row at '+table);
        const myData   = this.state.data;
        const myTable   = myData[table];
        const lastIndex  = myTable.length ;
        // const firstRow = {id: lastIndex, firstname: '', surname: '', email: ''};
        // const firstRow   = myTable[0]; // Shadow Copy.  It's linked.
        const firstRow   = JSON.parse(JSON.stringify(myTable[0])); // Deep Copy
        firstRow.id      = myTable[lastIndex - 1].id + 1 ;
        myTable.push(firstRow);  
        this.setState({data: myData});
    };

    render() {
        console.log('this.state = ', this.state);
        return (
            <div>
                <div>Writen by React</div>
                <br/>
                <div>
                    Current User = {this.state.user.currentUser}
                </div>
                <br/>
                {Object.keys(this.state.data).map((table,index) => {
                        const myTableIndex = index;
                        return (
                                <div key={myTableIndex} >
                                    <div>{table}</div>
                                    <div >
                                        {this.state.data[table].map((data, index) => {
                                                const myRowIndex = index;
                                                return (
                                                    <div key={myRowIndex} className="myTable">
                                                        {Object.keys(this.state.data[table][index]).map((fieldName, index) => {
                                                            const myColIndex = index;
                                                            if (myRowIndex === 0) {
                                                                    return (
                                                                        <div key={myColIndex} className="myHeader">
                                                                            <input className="myHeaderInput"  type='text' name={fieldName} value={fieldName} readOnly></input>
                                                                        </div>
                                                                    )
                                                                    } else {
                                                                    return (
                                                                        <input key={myColIndex} type='text' name={fieldName} value={data[fieldName]} onChange={(event) => this.onChangeInput(event, table, myRowIndex, fieldName)}></input>
                                                                    )
                                                            }
                                                            
                                                        })} 
                                                        <button hidden={myRowIndex === 0} onClick={(event) => this.onClickButtonDeleteRow(event, table, index) }>-</button>
                                                    </div>
                                                )
                                        })}
                                    </div>
                                    <button onClick={(event) => this.onClickButtonAddRow(event, table) }>+</button>
                                    <br/>
                                    <br/>
                                </div>
                        )
                })} {/* End Table Loop */}
            </div>
            )      
    }      
}

export default Shop;

