import style from "./style.module.scss";

function renderPane(name: string, color: string, title: boolean) {
  let titlebar, content;
  if (title) {
    titlebar = <div class={style.titlebar}>{ name }</div>;
    content = <p class={style.content} onPointerdown={e => e.stopPropagation()}>{ name }</p>;
  } else {
    content = <p class={style.content}>{ name }</p>;
  }
  return (
    <div class={style.box} style={{
      backgroundColor: color,
    }}>
      { titlebar }
      { content }
    </div>
  );
}

function makeLibrary(title: boolean) {
  return [
    {
      name: 'pane-a',
      label: 'Component A',
      render: renderPane.bind(null, 'A', 'purple', title),
    },
    {
      name: 'pane-b',
      label: 'Component B',
      render: renderPane.bind(null, 'B', 'crimson', title),
    },
    {
      name: 'pane-c',
      label: 'Component C',
      render: renderPane.bind(null, 'C', 'blue', title),
    },
    {
      name: 'pane-d',
      label: 'Component D',
      render: renderPane.bind(null, 'D', 'navy', title),
    },
    {
      name: 'pane-e',
      label: 'Component E',
      render: renderPane.bind(null, 'E', 'orange', title),
    },
  ];
}

const library = makeLibrary(false);

export default library;

const libraryWithTitlebar = makeLibrary(true);

export { libraryWithTitlebar };
