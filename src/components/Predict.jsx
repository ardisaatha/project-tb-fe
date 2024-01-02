import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { predictData, realData } from "../store/actions/predict";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Predict = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(realData(state.areaId));
    dispatch(predictData(state.areaId));
  }, [dispatch, state]);
  const { dataReal, dataPredict } = useSelector(
    (state) => state.predictReducers
  );

  const combinedData = dataPredict?.map((predictedItem) => {
    const realItem = dataReal.find(
      (real) => real.Month === predictedItem.Month
    );
    return {
      Month: predictedItem.Month,
      Kasus: realItem ? realItem.RealValue : null,
      Prediksi_Kasus: Math.round(predictedItem.PredictedValue),
    };
  });

  // Set the combined data to the state
  //   console.log(combinedData);
  return (
    <div className="w-full mt-20 px-52">
      <h2 className="text-2xl font-bold mb-6">Prediksi</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          // width={800}
          // height={500}
          margin={{ bottom: -5 }}
          data={combinedData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Month"
            tick={{ fontSize: 7 }}
            angle={-90}
            padding={{ left: 30, right: 30 }}
            textAnchor="end"
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Kasus"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line strokeWidth={2} type="monotone" dataKey="Prediksi_Kasus" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Predict;
