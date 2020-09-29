import React from 'react';

function formatPrompts(prompts, complete) {
  return prompts.map((p) => {
    return (
      <fieldset
        id={p.promptId}
        key={p.promptId}
        disabled={complete}
      >
        {p.prompt}
        {p.responses.map((r, i) => {
          return (
            <input
              key={`${i}-${p.promptId}`}
              id={`${i}-${p.promptId}`}
              defaultValue={r}
            />
          );
        })}
      </fieldset>
    );
  });
}

function JournalEntry(props) {
  console.log('rendering ', props.type);
  const handleSubmit = (e) => {
    e.preventDefault();
    const promptFields = e.target.querySelectorAll('fieldset');
    const newPrompts = []
    promptFields.forEach(p => {
      const responseFields = p.querySelectorAll('input');
      const responses = [];
      responseFields.forEach((r) => responses.push(r.value));
      newPrompts.push({
        prompt: p.innerText,
        promptId: Number(p.id),
        responses: responses,
      });
      props.saveEntry(props.type, newPrompts);
      e.target.reset();
    });
  }

  if (!props.entryData) {
    return <span>Loading...</span>;
  }
  return (
    <form id={`${props.type}-form`} onSubmit={handleSubmit} >
      <h3>{props.type === 'morning' ? 'Morning Intentions' : 'Evening Reflections' }</h3>
        {formatPrompts(props.entryData.prompts, props.entryData.complete)}
      <button type="submit" disabled={props.entryData.complete}>Save</button>
    </form>
  );
}

export default JournalEntry;
