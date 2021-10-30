function withTime<P>(Component: React.ComponentType<P>) {
  const getTime = () => {
    let date = new Date();
    return `${date.getDay()}:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  };

  const Container = (props: P) => {
    return <Component {...props as P} getTime={getTime} />;
  };
  return Container;
};

export default withTime;