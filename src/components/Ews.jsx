import React from "react";
// import { getLocationById } from "../store/actions/location";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Ews = () => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // const RADIAN = Math.PI / 180;
  // const renderCustomizedLabel = ({
  //   cx,
  //   cy,
  //   midAngle,
  //   innerRadius,
  //   outerRadius,
  //   percent,
  //   index,
  // }) => {
  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
  //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

  //   return (
  //     <text
  //       x={x}
  //       y={y}
  //       fill="white"
  //       textAnchor={x > cx ? "start" : "end"}
  //       dominantBaseline="central"
  //     >
  //       {`${(percent * 100).toFixed(0)}%`}
  //     </text>
  //   );
  // };
  const { survei, hit } = useSelector((state) => state.locationReducers);
  // console.log(hit);
  const surLiterasi = survei.literasi?.slice(0, 4);
  const surStigma = survei.stigma?.slice(0, 4);
  const surPengetahuan = survei.pengetahuan?.slice(0, 4);
  return (
    <div className="flex min-[240px]:flex-col min-[240px]:px-4 md:px-72 mt-16 gap-5">
      <div className="p-6 rounded-md border-2 bg-white w-full space-y-8">
        <h4 className="font-semibold text-2xl">Literasi</h4>
        <div className="flex">
          <PieChart width={650} height={300}>
            <Pie
              data={surLiterasi}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {surLiterasi?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <div className="place-self-center space-y-4">
            <h2 className="text-[#1CD1A1] text-6xl font-semibold ">
              {Math.round(hit.persentase_literasi * 100)}%
            </h2>
            <h4 className="font-bold">{hit.avg_literasi}</h4>
          </div>
        </div>
      </div>
      <div className="p-6 rounded-md border-2 bg-white w-full space-y-8">
        <h4 className="font-semibold text-2xl">Stigma</h4>
        <div className="flex">
          <PieChart width={650} height={300}>
            <Pie
              data={surStigma}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {surStigma?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <div className="place-self-center space-y-4">
            <h2 className="text-[#1CD1A1] text-6xl font-semibold ">
              {Math.round(hit.persentase_stigma * 100)}%
            </h2>
            <h4 className="font-bold">{hit.avg_stigma}</h4>
          </div>
        </div>
      </div>
      <div className="p-6 rounded-md border-2 bg-white w-full space-y-8">
        <h4 className="font-semibold text-2xl">Pengetahuan</h4>
        <div className="flex">
          <PieChart width={650} height={300}>
            <Pie
              data={surPengetahuan}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {surPengetahuan?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <div className="place-self-center space-y-4">
            <h2 className="text-[#1CD1A1] text-6xl font-semibold ">
              {Math.round(hit.persentase_pengetahuan * 100)}%
            </h2>
            <h4 className="font-bold">{hit.avg_pengetahuan}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ews;
