import style from "./style.module.scss";

export default [
  {
    name: 'pane-a',
    label: 'Component A',
    render() {
      return <div class={style.box} style={{
        backgroundColor: 'purple',
      }}><span>A</span></div>;
    },
  },
  {
    name: 'pane-b',
    label: 'Component B',
    render() {
      return <div class={style.box} style={{
        backgroundColor: 'crimson',
      }}><span>B</span></div>;
    },
  },
  {
    name: 'pane-c',
    label: 'Component C',
    render() {
      return <div class={style.box} style={{
        backgroundColor: 'blue',
      }}><span>C</span></div>;
    },
  },
  {
    name: 'pane-d',
    label: 'Component D',
    render() {
      return <div class={style.box} style={{
        backgroundColor: 'navy',
      }}><span>D</span></div>;
    },
  },
  {
    name: 'pane-e',
    label: 'Component E',
    render() {
      return <div class={style.box} style={{
        backgroundColor: 'steelblue',
      }}><span>E</span></div>;
    },
  },
];