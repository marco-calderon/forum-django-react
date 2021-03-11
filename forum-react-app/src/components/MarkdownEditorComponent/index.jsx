import React, { useState } from 'react';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const MarkdownEditorComponent = ({ value, onChange }) => {
  const [selectedTab, setSelectedTab] = useState('write');

  const handleOnChange = (content) => {
    onChange(content);
  }

  return (
    <ReactMde
        value={value}
        onChange={handleOnChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
  );
}

export default MarkdownEditorComponent;
