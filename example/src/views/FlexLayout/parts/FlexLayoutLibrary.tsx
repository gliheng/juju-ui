export default [
  {
    name: 'pane-a',
    label: 'Component A',
    render() {
      return <div style={{
        backgroundColor: 'purple',
        color: 'white',
        fontSize: '3em',
        flex: 1,
      }}><span>A</span></div>;
    },
  },
  {
    name: 'pane-b',
    label: 'Component B',
    render() {
      return <div style={{
        backgroundColor: 'crimson',
        color: 'white',
        fontSize: '3em',
        flex: 1,
      }}><span>B</span></div>;
    },
  },
  {
    name: 'pane-c',
    label: 'Component C',
    render() {
      return <div style={{
        backgroundColor: 'blue',
        color: 'white',
        fontSize: '3em',
        flex: 1,
      }}><span>C</span></div>;
    },
  },
  {
    name: 'pane-d',
    label: 'Component D',
    render() {
      return <div style={{
        backgroundColor: 'navy',
        color: 'white',
        fontSize: '3em',
        flex: 1,
      }}><span>D</span></div>;
    },
  },
  {
    name: 'pane-e',
    label: 'Component E',
    render() {
      return <div style={{
        backgroundColor: 'steelblue',
        color: 'white',
        fontSize: '3em',
        flex: 1,
      }}><span>E</span></div>;
    },
  },
];