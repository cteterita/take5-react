import React from 'react';

function formatPrompts(prompts, complete) {
  console.log(complete);
  return prompts.map((p, i) => {
    return (
      <fieldset key={i} disabled={complete}>
        {p.prompt}
        {p.responses.map((r, i) => {
          return (
            <input
              key={i}
              defaultValue={r}
            />
          );
        })}
      </fieldset>
    );
  });
}

function JournalEntry(props) {
  if (!props.entryData) {
    return <span>Loading...</span>;
  }
  return (
    <form id={`${props.type}-form`}>
      <h3>{props.type === 'morning' ? 'Morning Intentions' : 'Evening Reflections' }</h3>
        {formatPrompts(props.entryData.prompts, props.entryData.complete)}
      <button type="submit" disabled={props.entryData.complete}>Save</button>
    </form>
  );
}

export default JournalEntry;
