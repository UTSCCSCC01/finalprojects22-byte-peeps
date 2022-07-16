// custom tooltip component
export default function CustomizedTooltip(props: { [key: string]: any }) {
  const { payload } = props;

  if (payload.length !== 0) {
    return (
      <div className="tooltiptext">
        <span>Time: {payload[0].payload.time}</span>
        <br />
        {payload[0].payload.title !== undefined && (
          <span>Title: {payload[0].payload.title}</span>
        )}
      </div>
    );
  }
}
