export const columns = [{
  label: 'Name',
  field: 'name',
}, {
  label: 'Age',
  field: 'age',
}, {
  label: 'Gender',
  field: 'gender',
}, {
  label: 'Work',
  field: 'work',
}, {
  label: 'Phone',
  field: 'phone',
}, {
  label: 'Address',
  field: 'address',
}, {
  label: 'Action',
  align: 'right',
  render() {
    return <a href="javascript:void(0)">edit</a>;
  },
}];


export const fixedHeaderColumns = [{
  label: 'Name',
  field: 'name',
  width: 100,
}, {
  label: 'Age',
  field: 'age',
  width: 100,
}, {
  label: 'Gender',
  field: 'gender',
  width: 100,
}, {
  label: 'Work',
  field: 'work',
  width: 100,
}, {
  label: 'Phone',
  field: 'phone',
  width: 100,
}, {
  label: 'Address',
  field: 'address',
  width: 100,
}, {
  label: 'Action',
  align: 'right',
  render() {
    return <a href="javascript:void(0)">edit</a>;
  },
}];
