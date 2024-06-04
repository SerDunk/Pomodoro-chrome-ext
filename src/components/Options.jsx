function Options({ timings, onSelect }) {
  const renderedTimings = timings.map((timing) => {
    return (
      <div
        key={timing.id}
        className="cursor-pointer"
        onClick={() => {
          onSelect(timing);
        }}
      >
        {timing.study}
      </div>
    );
  });
  return (
    <div className="flex gap-5 justify-center my-4 text-xl">
      {renderedTimings}
    </div>
  );
}

export default Options;
