const handleDownload = (filePath: string, suggestedName :string) => {
  const link = document.createElement('a');
  link.href = filePath;
  link.download = suggestedName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default handleDownload;