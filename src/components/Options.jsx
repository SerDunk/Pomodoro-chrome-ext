function Options({ timings, onSelect }) {
  const renderedTimings = timings.map((timing) => {
    return (
      <div
        key={timing.id}
        onClick={() => {
          onSelect(timing);
        }}
      >
        {timing.study}
      </div>
    );
  });
  return <div className="flex gap-5">{renderedTimings}</div>;
}

export default Options;
