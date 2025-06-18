const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return <div className="error">{notification}</div>;
};
export default Notification;
