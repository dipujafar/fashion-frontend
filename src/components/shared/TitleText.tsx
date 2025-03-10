import SlotCounter from "react-slot-counter";

const TitleText = () => {
  return (
    <div>
      <SlotCounter
        value="SUCCESS"
        dummyCharacters={"SUCCESS".split("")}
        duration={2}
      />
    </div>
  );
};

export default TitleText;
