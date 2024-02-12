import "./style.css";

const Loading = () => {
  return (
    <>
      <div className="relative py-32 pb-32">
        <div id="spinner" class="active">
          <span id="first" class="ball"></span>
          <span id="second" class="ball"></span>
          <span id="third" class="ball"></span>
        </div>
      </div>
    </>
  );
};

export default Loading;
