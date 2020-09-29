import React from 'react';

function formatPrompts(prompts, complete) {
  return prompts.map((p) => {
    const { promptId, prompt, responses } = p;
    return (
      <fieldset
        id={promptId}
        key={promptId}
        disabled={complete}
      >
        {prompt}
        {responses.map((r, i) => {
          const id = `${i}-${p.promptId}`;
          return (
            <input
              key={id}
              id={id}
              defaultValue={r}
            />
          );
        })}
      </fieldset>
    );
  });
}

function JournalEntry(props) {
  const { type, saveEntry, entryData } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    const promptFields = e.target.querySelectorAll('fieldset');
    const newPrompts = [];
    promptFields.forEach((p) => {
      const responseFields = p.querySelectorAll('input');
      const responses = [];
      responseFields.forEach((r) => responses.push(r.value));
      newPrompts.push({
        prompt: p.innerText,
        promptId: Number(p.id),
        responses,
      });
    });
    saveEntry(type, newPrompts);
    e.target.reset();
  };

  if (!entryData) {
    return <span>Loading...</span>;
  }
  return (
    <form id={`${type}-form`} onSubmit={handleSubmit}>
      <h3>{type === 'morning' ? 'Morning Intentions' : 'Evening Reflections' }</h3>
      {formatPrompts(entryData.prompts, entryData.complete)}
      <button type="submit" disabled={entryData.complete}>Save</button>
    </form>
  );
}

export default JournalEntry;
