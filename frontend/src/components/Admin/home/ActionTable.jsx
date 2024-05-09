import { Table } from "antd";
const columns = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    fixed: "left",
  },
  {
    title: "Age",
    width: 100,
    dataIndex: "age",
  },

  {
    title: "Column 3",
    dataIndex: "address",
  },
  {
    title: "Column 4",
    dataIndex: "address",
  },

  {
    title: "Action 1",
    fixed: "right",
    width: 90,
    render: () => <a>action</a>,
  },
  {
    title: "Action 2",
    width: 90,
    render: () => <a>action</a>,
  },
  {
    title: "Action 3",
    fixed: "right",
    width: 90,
    render: () => <a>action</a>,
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York Park",
  },
];
const ActionTable = () => (
  <Table
    columns={columns}
    dataSource={data}
    scroll={{
      x: 1300,
    }}
    pagination={false}
    bordered
  />
);
export default ActionTable;
