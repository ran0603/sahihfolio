interface FindProgressProps {
  step?: number;
  currentStep?: number;
}

export default function FindProgress({
  step = 5,
  currentStep = 0,
}: FindProgressProps) {
  const bgColor = (index: number) => {
    if (index < currentStep) {
      return "bg-[#10B981]";
    } else if (index === currentStep) {
      return "bg-[#10B981]/45";
    }
    return "bg-border";
  };
  const steps = Array.from({ length: step }).map((_, index) => {
    return (
      <div key={index} className={`h-full ${bgColor(index)} rounded-full`} />
    );
  });

  return (
    <div>
      <div className="flex flex-col items-start gap-6">
        <div
          className="grid grid-cols-5 gap-2"
          style={{ width: "260px", height: "6px" }}
        >
          {steps}
        </div>
        <span className="cap">Step {currentStep + 1}</span>
      </div>
    </div>
  );
}
