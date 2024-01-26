const ProgressBar = ({ children, bgcolor, completed }) => {
  const containerStyles = {
    width: "95%",
    borderRadius: "5px",
    marginLeft: "10px",
    marginBottom: "12px",
    overflow: "visible",
    position: "relative",
  };

  const fillerStyles = {
    height: "100%",
    width: "100%",
    borderRadius: "inherit",
  };

  const progressStyle = {
    position: "absolute",
    height: "100%",
    minWidth: "0%",
    width: `${completed}%`,
    backgroundColor: "rgba(21, 209, 193,0.35)",
    left: "0",
    top: "0",
    transition: "all 300ms",
  };
  return (
    <div style={containerStyles}>
      <div style={progressStyle}></div>
      <div style={fillerStyles}>{children}</div>
    </div>
  );
};

export default ProgressBar;
