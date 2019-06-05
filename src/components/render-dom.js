export default {
  functional: true,
  props: {
    name: String,
    renderFunc: Function
  },
  render: (h, ctx) => {
    const { renderFunc, name } = ctx.props;
    return renderFunc(h, name);
  }
};
