import { useState } from "react";
import Typography from "./Typography";

interface Options {
  label: string;
  value: number | string | any;
}

interface TagInputProps {
  options: Options[];
  onChange?: any;
  value?: any;
  label?: string;
}

const TagInput = ({ label, value, options, onChange }: TagInputProps) => {
  const handleTagClick = (tagValue) => {
    onChange && onChange(tagValue);
  };

  return (
    <div>
      <div style={styles.tagContainer}>
        {label && <Typography>{label}</Typography>}
        {options?.map((tag, index) => (
          <span
            key={index}
            style={
              value == tag.value
                ? { ...styles.tag, backgroundColor: "#1c4991" }
                : { ...styles.tag, backgroundColor: "#0070f3" }
            }
            onClick={() => handleTagClick(tag.value)}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
};

const styles = {
  tagContainer: {
    marginTop: "10px",
  },
  tag: {
    display: "inline-block",
    padding: "5px 10px",
    margin: "5px",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default TagInput;
