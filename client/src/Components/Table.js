import React, {Component} from 'react'
import { Cell, Column, Table } from '@blueprintjs/table';

class Table extends Component {
  render(){
    return(
      <Table>
        <Column name="TestColumn"/>
      </Table>
    );
  }
}
