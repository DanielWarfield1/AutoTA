function calculateTextHeight(txt, maxWidth) {
  let lineHeight = textLeading(); // Get the line height (default or custom)
  let paragraphs = txt.split('\n'); // Split text into paragraphs by newline
  let lines = 0;

  for (let p = 0; p < paragraphs.length; p++) {
    let words = paragraphs[p].split(' ');
    let line = '';

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      if (textWidth(testLine) > maxWidth && i > 0) {
        line = words[i] + ' ';
        lines++;
      } else {
        line = testLine;
      }
    }

    // Account for the last line in the paragraph
    if (line.length > 0) {
      lines++;
    }
  }

  return lines * lineHeight;
}