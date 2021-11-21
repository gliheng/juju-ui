const Vnodes = {
  props: {
    nodes: {
      type: Function,
      required: true,
    },
  },
  setup(props: any) {
    let { nodes } = props;
    return () => {
      return nodes();
    };
  },
};

export default Vnodes;