function GraphCandle({ value ,selected=false}) {
  const percentage = parseInt((value / 6) * 100);
  return (
    <div className="grid grid-rows-12">
      <div className="row-span-10 flex items-end">
        <div
          style={{ height: `${percentage}%` }} // O tailwind só gera classes que existem estáticamente
          className={`${selected?"bg-[#044CF4]":"bg-[#272727]"} rounded-full w-3${selected?"":""}`}
        ></div>
      </div>
      <div className="row-span-1"></div>
      <div className={`${selected?"bg-[#044CF4]":"bg-[#272727]"} row-span-1 flex items-center justify-center rounded-full w-3 h-3`}></div>
    </div>
  );
}
export default GraphCandle;
