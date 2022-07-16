// custom tick component
export default function CustomizedTick(props: { [key: string]: any }) {
  const { x, y, payload } = props;

  const tspans: string[] = payload.value.split(' ');
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} fill="#666">
        {tspans.map((element, i) => {
          return (
            <tspan textAnchor="middle" x="0" dy="15" key={i}>
              {element}
            </tspan>
          );
        })}
      </text>
    </g>
  );
}
