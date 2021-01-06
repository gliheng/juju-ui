export default {
  // functional: true,
  props: {
    nodes: Object,
  },
  render(ctx: any) {
    let { nodes } = ctx.$props;
    if (!nodes) return null;
    return nodes;
  },
};
