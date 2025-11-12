import "./error.scss";

const Error = ({ text }: { text: string }) => {
  return <div className="error-container">{text}</div>;
};

export default Error;
