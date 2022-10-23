const Loader = ({ show }) => {
  return show ? (
    <div className="button is-loading is-black is-large">Loader</div>
  ) : null;
};

export default Loader;
