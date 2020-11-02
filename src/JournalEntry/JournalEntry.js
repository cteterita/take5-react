import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function JournalEntry(props) {
  const { type, saveEntry, entryData } = props;
  const [currentEntry, setCurrentEntry] = useState(entryData);

  useEffect(() => {
    setCurrentEntry(entryData);
  }, [entryData]);

  const updateValue = (e) => {
    const [promptId, responseId] = e.currentTarget.id.split('-');
    const updatedEntry = { ...currentEntry };
    currentEntry.prompts[promptId - 1].responses[responseId] = e.currentTarget.value;
    setCurrentEntry(updatedEntry);
  };

  const formatPrompts = (prompts, complete) => prompts.map((p) => {
    const { promptId, prompt, responses } = p;
    return (
      <fieldset
        id={promptId}
        key={promptId}
        disabled={complete}
      >
        {prompt}
        {responses.map((r, i) => {
          const id = `${p.promptId}-${i}`;
          return (
            <input
              key={id}
              id={id}
              value={r}
              onChange={(e) => updateValue(e)}
            />
          );
        })}
      </fieldset>
    );
  });

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

  if (!currentEntry) {
    return <span>Loading...</span>;
  }

  return (
    <form id={`${type}-form`} onSubmit={handleSubmit}>
      <h3>{type === 'morning' ? 'Morning Intentions' : 'Evening Reflections' }</h3>
      {formatPrompts(currentEntry.prompts, currentEntry.complete)}
      <button type="submit" disabled={currentEntry.complete}>Save</button>
    </form>
  );
}

JournalEntry.propTypes = {
  type: PropTypes.oneOf(['morning', 'evening']).isRequired,
  saveEntry: PropTypes.func.isRequired,
  entryData: PropTypes.shape({
    complete: PropTypes.bool.isRequired,
    prompts: PropTypes.arrayOf(PropTypes.object),
  }),
};

JournalEntry.defaultProps = {
  entryData: null,
};

export default JournalEntry;
