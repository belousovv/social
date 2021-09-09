const withTime = (Component) => {
  const getTime = () => {
    let date = new Date();
    return `${date.getDay()}:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  };

  const Container = (props) => {
    return <Component {...props} getTime={getTime} />;
  };
  return Container;
};

export default withTime;
